import test from 'node:test';
import assert from 'node:assert/strict';
import { collect, ghRequest } from '../skills/pr-comment-check/scripts/collect-comments.mjs';
const A = 'a'.repeat(40), B = 'b'.repeat(40);
const page = (nodes, next = null) => ({ nodes, pageInfo: { hasNextPage: next !== null, endCursor: next } });
function fixture(overrides = {}) {
  const calls = [], pr = { head: { sha: A }, base: { sha: B }, html_url: 'https://github.com/o/r/pull/1', body: 'Refs #3' };
  let heads = 0;
  const request = async req => {
    calls.push(req);
    const { endpoint, query, variables: v } = req;
    if (overrides.fail?.(req)) throw new Error('403/timeout');
    if (endpoint === 'repos/o/r/pulls/1') {
      heads++;
      return [{ ...pr, head: { sha: heads > 1 && overrides.headChange ? B : A } }];
    }
    if (endpoint?.includes('/reviews?')) return [[{ id: 9, state: 'COMMENTED', body: 'See inline', html_url: 'R9' }]];
    if (endpoint?.includes('/pulls/1/comments?')) return [[{ id: 11, node_id: 'C11', in_reply_to_id: null }], [{ id: 12, node_id: 'C12', in_reply_to_id: 11 }]];
    if (endpoint === 'repos/o/r/issues/3') return [{ number: 3, html_url: 'I3', body: 'AC', ...(overrides.notIssue ? { pull_request: {} } : {}) }];
    if (endpoint?.includes('/issues/3/comments?')) return [[], [{ id: 30, html_url: 'I30', body: 'Defer' }]];
    if (endpoint?.includes('/issues/1/comments?')) return [[], [{ id: 20, html_url: 'C20', body: 'Request' }]];
    if (query?.includes('reviewThreads(first:')) return { data: { repository: { pullRequest: { reviewThreads:
      v.cursor ? page([{ id: 'T2', isResolved: false, isOutdated: true }]) : page([{ id: 'T1', isResolved: true, isOutdated: false }], 'threads-next') } } } };
    if (query?.includes('PullRequestReviewThread')) {
      if (overrides.graphErrors) return { data: {}, errors: [{ message: 'Forbidden' }] };
      if (overrides.missingCursor) return { data: { node: { comments: { nodes: [], pageInfo: { hasNextPage: true, endCursor: null } } } } };
      const nodes = v.id === 'T2' ? [] : [{ id: v.cursor ? 'C12' : 'C11', body: v.cursor ? 'reply' : 'request', pullRequestReview: { state: 'COMMENTED' } }];
      return { data: { node: { comments: page(nodes, v.id === 'T1' && !v.cursor ? 'reply-next' : null) } } };
    }
    if (query?.includes('closingIssuesReferences')) return { data: { repository: { pullRequest: { closingIssuesReferences:
      v.cursor ? page([{ number: 3, repository: { nameWithOwner: 'o/r' } }]) : page([], 'issue-next') } } } };
    throw new Error(`Unexpected request ${JSON.stringify(req)}`);
  };
  return { request, calls };
}
test('collects all sources, nested reply and Issue pages without resolving or classifying', async () => {
  const f = fixture();
  const result = await collect({ repo: 'o/r', number: 1, issues: ['o/r#3'] }, f.request);
  assert.equal(result.complete, true);
  assert.equal(result.head, A);
  assert.equal(result.general[0].id, 20);
  assert.equal(result.reviews[0].state, 'COMMENTED');
  assert.equal(result.fileComments.length, 2);
  assert.deepEqual(result.threads[0].comments.map(c => c.id), ['C11', 'C12']);
  assert.equal(result.threads[0].isResolved, true);
  assert.equal(result.threads[1].isOutdated, true);
  assert.equal(result.linkedIssues.length, 1);
  assert.equal(result.linkedIssues[0].comments[0].body, 'Defer');
  assert.ok(result.startedAt <= result.completedAt);
  assert.equal(result.fingerprint.length, 64);
  assert.equal(result.issueDiscovery, 'closing-links-and-explicit-only');
  assert.ok(f.calls.some(r => r.variables?.cursor === 'threads-next'));
  assert.ok(f.calls.some(r => r.variables?.cursor === 'reply-next'));
  assert.ok(f.calls.some(r => r.variables?.cursor === 'issue-next'));
  assert.ok(f.calls.every(r => !r.query?.includes('mutation')));
});
for (const [label, overrides, message] of [
  ['failed nested page', { fail: r => r.variables?.cursor === 'reply-next' }, /403\/timeout/],
  ['Issue permission denied', { fail: r => r.endpoint?.includes('/issues/3/comments') }, /403\/timeout/],
  ['GraphQL partial error', { graphErrors: true }, /GraphQL incomplete/],
  ['missing cursor', { missingCursor: true }, /Missing cursor/],
  ['HEAD changed', { headChange: true }, /HEAD\/base\/PR body changed/],
  ['Issue ref actually PR', { notIssue: true }, /Not an accessible Issue/],
]) test(`does not return an empty success for ${label}`, async () => {
  await assert.rejects(collect({ repo: 'o/r', number: 1 }, fixture(overrides).request), message);
});
test('rejects file-comment omission between REST and GraphQL', async () => {
  const f = fixture();
  const request = async r => r.endpoint?.includes('/pulls/1/comments?') ? [[{ id: 11, node_id: 'C11' }]] : f.request(r);
  await assert.rejects(collect({ repo: 'o/r', number: 1 }, request), /sources differ/);
});
test('rejects repeated GraphQL cursor', async () => {
  const f = fixture();
  const request = async r => r.query?.includes('reviewThreads(first:') ? { data: { repository: { pullRequest: { reviewThreads: page([], 'same') } } } } : f.request(r);
  await assert.rejects(collect({ repo: 'o/r', number: 1 }, request), /Repeated cursor/);
});
test('same HEAD edited feedback changes fingerprint', async () => {
  const f = fixture(), g = fixture();
  const before = await collect({ repo: 'o/r', number: 1 }, f.request);
  const after = await collect({ repo: 'o/r', number: 1 }, async r => {
    const response = await g.request(r);
    if (r.endpoint?.includes('/issues/1/comments?')) response[1][0].body = 'Changed request';
    return response;
  });
  assert.equal(before.head, after.head);
  assert.notEqual(before.fingerprint, after.fingerprint);
});
test('requires explicit body-only Issue refs in addition to closing links', async () => {
  const f = fixture();
  const request = async r => {
    if (r.endpoint === 'repos/other/repo/issues/7') return [{ html_url: 'I7', body: 'AC' }];
    if (r.endpoint?.startsWith('repos/other/repo/issues/7/comments')) return [[{ id: 70, body: 'Withdrawal' }]];
    return f.request(r);
  };
  const result = await collect({ repo: 'o/r', number: 1, issues: ['other/repo#7'] }, request);
  assert.deepEqual(result.linkedIssues.map(i => i.ref), ['o/r#3', 'other/repo#7']);
});

test('preserves verified own pending-review comments absent in REST', async () => {
  const f = fixture();
  const result = await collect({ repo: 'o/r', number: 1 }, async r => {
    const response = await f.request(r);
    if (r.endpoint?.includes('/pulls/1/comments?')) return [[]];
    if (r.query?.includes('PullRequestReviewThread'))
      for (const c of response.data.node.comments.nodes) c.pullRequestReview.state = 'PENDING';
    return response;
  });
  assert.equal(result.complete, true);
  assert.equal(result.fileComments.length, 0);
  assert.deepEqual(result.pendingComments.map(c => c.id), ['C11', 'C12']);
  assert.equal(result.threads[0].comments.length, 2);
});
test('does not excuse published omissions alongside a pending comment', async () => {
  const f = fixture();
  await assert.rejects(collect({ repo: 'o/r', number: 1 }, async r => {
    const response = await f.request(r);
    if (r.endpoint?.includes('/pulls/1/comments?')) return [[]];
    if (r.query?.includes('PullRequestReviewThread'))
      for (const c of response.data.node.comments.nodes) if (c.id === 'C11') c.pullRequestReview.state = 'PENDING';
    return response;
  }), /sources differ/);
});
test('missing review state is unknown rather than assumed pending', async () => {
  const f = fixture();
  await assert.rejects(collect({ repo: 'o/r', number: 1 }, async r => {
    const response = await f.request(r);
    if (r.query?.includes('PullRequestReviewThread'))
      for (const c of response.data.node.comments.nodes) delete c.pullRequestReview;
    return response;
  }), /review state incomplete/);
});
