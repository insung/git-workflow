import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';

// Read-only transport. gh handles REST Link pagination; GraphQL cursors below
// are independent for the thread list and every thread's comments.
export function ghRequest({ host, endpoint, query, variables }) {
  const args = ['api', '--hostname', host];
  if (endpoint) args.push('--method', 'GET', endpoint, '--paginate', '--slurp');
  else {
    args.push('graphql', '-f', `query=${query}`);
    for (const [key, value] of Object.entries(variables)) {
      if (value !== null && value !== undefined) args.push(typeof value === 'number' ? '-F' : '-f', `${key}=${value}`);
    }
  }
  const result = JSON.parse(execFileSync('gh', args, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }));
  if (result.errors?.length) throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
  return result;
}
const commentFields = 'id url body author { login } createdAt updatedAt path line originalLine diffHunk commit { oid } originalCommit { oid } replyTo { id } pullRequestReview { state }';
function connection(value, label) {
  if (!value || !Array.isArray(value.nodes) || !value.pageInfo || typeof value.pageInfo.hasNextPage !== 'boolean')
    throw new Error(`Incomplete connection: ${label}`);
  if (value.nodes.some(x => !x)) throw new Error(`Null node: ${label}`);
  if (value.pageInfo.hasNextPage && !value.pageInfo.endCursor) throw new Error(`Missing cursor: ${label}`);
  return value;
}
export async function collect({ repo, number, host = 'github.com', issues = [] }, request = ghRequest) {
  if (!/^[\w.-]+\/[\w.-]+$/.test(repo) || !Number.isInteger(number) || number < 1) throw new Error('Invalid repo/PR');
  const [owner, name] = repo.split('/');
  const startedAt = new Date().toISOString();
  const rest = async endpoint => {
    const pages = await request({ host, endpoint });
    if (!Array.isArray(pages) || !pages.length) throw new Error(`Missing REST pages: ${endpoint}`);
    return pages;
  };
  const object = async endpoint => {
    const pages = await rest(endpoint);
    if (pages.length !== 1 || !pages[0] || Array.isArray(pages[0])) throw new Error(`Invalid object: ${endpoint}`);
    return pages[0];
  };
  const list = async endpoint => {
    const pages = await rest(`${endpoint}?per_page=100`);
    if (pages.some(p => !Array.isArray(p))) throw new Error(`Invalid list: ${endpoint}`);
    return pages.flat();
  };
  const gql = async (query, variables) => {
    const result = await request({ host, query, variables });
    if (result.errors?.length || !result.data) throw new Error(`GraphQL incomplete: ${JSON.stringify(result.errors ?? [])}`);
    return result.data;
  };
  async function paginate(fetch, label) {
    const nodes = [], seen = new Set();
    let cursor = null;
    for (;;) {
      const page = connection(await fetch(cursor), label);
      nodes.push(...page.nodes);
      if (!page.pageInfo.hasNextPage) return nodes;
      cursor = page.pageInfo.endCursor;
      if (seen.has(cursor)) throw new Error(`Repeated cursor: ${label}`);
      seen.add(cursor);
    }
  }
  const prPath = `repos/${repo}/pulls/${number}`;
  const pr = await object(prPath);
  if (!pr.head?.sha || !pr.base?.sha || !pr.html_url) throw new Error('PR metadata incomplete');
  const general = await list(`repos/${repo}/issues/${number}/comments`);
  const reviews = await list(`${prPath}/reviews`);
  const fileComments = await list(`${prPath}/comments`);
  const variables = { owner, name, number };
  const threads = await paginate(async cursor => {
    const data = await gql('query($owner:String!,$name:String!,$number:Int!,$cursor:String){repository(owner:$owner,name:$name){pullRequest(number:$number){reviewThreads(first:100,after:$cursor){nodes{id isResolved isOutdated} pageInfo{hasNextPage endCursor}}}}}', { ...variables, cursor });
    return data.repository?.pullRequest?.reviewThreads;
  }, 'reviewThreads');
  for (const thread of threads) {
    thread.comments = await paginate(async cursor => {
      const data = await gql(`query($id:ID!,$cursor:String){node(id:$id){... on PullRequestReviewThread{comments(first:100,after:$cursor){nodes{${commentFields}} pageInfo{hasNextPage endCursor}}}}}`, { id: thread.id, cursor });
      return data.node?.comments;
    }, `thread.comments:${thread.id}`);
  }
  const restIds = new Set(fileComments.map(c => c.node_id));
  const graphComments = threads.flatMap(t => t.comments);
  const states = new Set(['PENDING', 'COMMENTED', 'APPROVED', 'CHANGES_REQUESTED', 'DISMISSED']);
  if (graphComments.some(c => !c.id || !states.has(c.pullRequestReview?.state)))
    throw new Error('File comment review state incomplete');
  // Own draft-review comments can be visible through GraphQL but absent in REST.
  // Exempt only explicitly verified PENDING nodes; every published node must match.
  const pendingComments = graphComments.filter(c => c.pullRequestReview.state === 'PENDING');
  const pendingIds = new Set(pendingComments.map(c => c.id));
  const graphIds = new Set(graphComments.filter(c => !pendingIds.has(c.id)).map(c => c.id));
  for (const id of pendingIds) restIds.delete(id);
  if (restIds.has(undefined) || graphIds.has(undefined) || restIds.size !== graphIds.size || [...restIds].some(id => !graphIds.has(id)))
    throw new Error('File comment sources differ; retry complete snapshot');
  const linked = await paginate(async cursor => {
    const data = await gql('query($owner:String!,$name:String!,$number:Int!,$cursor:String){repository(owner:$owner,name:$name){pullRequest(number:$number){closingIssuesReferences(first:100,after:$cursor){nodes{number url repository{nameWithOwner}} pageInfo{hasNextPage endCursor}}}}}', { ...variables, cursor });
    return data.repository?.pullRequest?.closingIssuesReferences;
  }, 'closingIssuesReferences');
  const refs = new Set([...linked.map(i => `${i.repository.nameWithOwner}#${i.number}`), ...issues]);
  const linkedIssues = [];
  for (const ref of refs) {
    const match = /^([\w.-]+\/[\w.-]+)#([1-9]\d*)$/.exec(ref);
    if (!match) throw new Error(`Invalid Issue ref (same host only): ${ref}`);
    const path = `repos/${match[1]}/issues/${match[2]}`;
    const issue = await object(path);
    if (issue.pull_request || !issue.html_url) throw new Error(`Not an accessible Issue: ${ref}`);
    linkedIssues.push({ ref, issue, comments: await list(`${path}/comments`) });
  }
  const latest = await object(prPath);
  if (pr.head.sha !== latest.head?.sha || pr.base.sha !== latest.base?.sha || pr.body !== latest.body)
    throw new Error('HEAD/base/PR body changed during collection; retry');
  const sources = { general, reviews, fileComments, threads, pendingComments, linkedIssues };
  const fingerprint = createHash('sha256').update(JSON.stringify(sources)).digest('hex');
  return { complete: true, issueDiscovery: 'closing-links-and-explicit-only', host, repo, number,
    url: pr.html_url, head: pr.head.sha, base: pr.base.sha, prBody: pr.body,
    startedAt, completedAt: new Date().toISOString(), fingerprint, ...sources };
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const options = { issues: [] };
    for (let i = 2; i < process.argv.length; i += 2) {
      const key = process.argv[i], value = process.argv[i + 1];
      if (!value || !['--repo', '--pr', '--host', '--issue'].includes(key)) throw new Error('Usage: --repo OWNER/REPO --pr N [--host HOST] [--issue OWNER/REPO#N]');
      if (key === '--issue') options.issues.push(value);
      else options[key === '--pr' ? 'number' : key.slice(2)] = key === '--pr' ? Number(value) : value;
    }
    console.log(JSON.stringify(await collect(options), null, 2));
  } catch (error) {
    console.error(JSON.stringify({ complete: false, error: error.message }));
    process.exitCode = 1;
  }
}
