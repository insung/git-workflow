import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const requiredSkills = ['git-workflow', 'workflow-init', 'issue-create', 'pr-request', 'pr-review', 'pr-comment-check', 'pr-merge', 'issue-close', 'commit-rule', 'git-release', 'git-history'];
const requiredReferences = ['git-workflow/references/execution-boundaries.md', 'git-workflow/references/change-conventions.md', 'git-workflow/references/writing-conventions.md', 'git-workflow/references/labels.md', 'git-workflow/references/document-links.md', 'git-workflow/references/issue-link.md', 'issue-create/references/issue.md', 'issue-close/references/closing-comment.md', 'workflow-init/assets/.github/ISSUE_TEMPLATE/FEATURE_REQUEST.md', 'workflow-init/assets/.github/ISSUE_TEMPLATE/BUG_REPORT.md', 'workflow-init/assets/.github/PULL_REQUEST_TEMPLATE.md', 'workflow-init/assets/.github/release.yml', 'workflow-init/assets/labels.yml', 'workflow-init/assets/agents-declaration.md', 'workflow-init/references/templates.md', 'workflow-init/references/agents.md', 'workflow-init/references/labels.md', 'workflow-init/references/release.md', 'workflow-init/references/branch-policy.md', 'workflow-init/references/branch-options.md', 'workflow-init/references/milestones.md', 'git-workflow/references/milestones.md', 'git-workflow/references/project-branch-policy.md', 'workflow-init/scripts/sync-labels.py', 'issue-create/references/plan.md', 'issue-create/references/sub-issues.md', 'git-workflow/references/review-criteria.md', 'git-workflow/references/implementation.md', 'pr-request/references/pr.md', 'pr-request/references/handoff.md', 'pr-merge/references/post-merge-cleanup.md', 'pr-review/references/review.md', 'pr-review/references/pr-comment.md', 'git-workflow/references/pr-comment-check.md', 'git-workflow/references/pr-comment-reply.md', 'git-workflow/scripts/verify-reply.mjs', 'pr-comment-check/scripts/collect-comments.mjs', 'pr-review/references/spec-it-policy.md', 'commit-rule/references/commit-message.md', 'commit-rule/references/scope.md', 'git-release/references/release-notes.md', 'git-release/references/release-context.md', 'git-history/references/investigation.md', 'git-history/references/change-impact.md'];
const requiredUsageDocuments = ['docs/guides/code-context-investigation.md', 'docs/examples/code-context-investigation/README.md'];
const issueTemplates = ['workflow-init/assets/.github/ISSUE_TEMPLATE/FEATURE_REQUEST.md', 'workflow-init/assets/.github/ISSUE_TEMPLATE/BUG_REPORT.md'];
const manifests = ['plugin.json', '.codex-plugin/plugin.json', '.claude-plugin/plugin.json'];

// Structural checks only: this does not execute skills or judge spec-it compliance.
export function validatePackage(root) {
  root = resolve(root);
  const errors = [];
  function json(path) {
    try {
      const data = JSON.parse(readFileSync(join(root, path), 'utf8'));
      if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('expected object');
      return data;
    } catch (error) {
      errors.push(`invalid manifest ${path}: ${error.message}`);
      return null;
    }
  }
  const records = manifests.map(path => [path, json(path)]);
  const version = records[0][1]?.version;
  for (const [path, data] of records) {
    if (!data) continue;
    if (data.name !== 'git-workflow') errors.push(`plugin name mismatch: ${path}`);
    if (typeof data.version !== 'string' || !/^\d+\.\d+\.\d+$/.test(data.version)) errors.push(`invalid version: ${path}`);
    if (data.version !== version) errors.push(`version mismatch: ${path}`);
  }
  const codex = records[1][1];
  if (codex && codex.skills !== './skills/') errors.push('Codex skills root must be ./skills/');
  const marketplace = json('.claude-plugin/marketplace.json');
  if (marketplace && (!Array.isArray(marketplace.plugins) || !marketplace.plugins.some(p => p?.name === 'git-workflow' && p.source === '.'))) {
    errors.push('marketplace must expose git-workflow from .');
  }
  for (const name of requiredSkills) {
    if (!existsSync(join(root, 'skills', name, 'SKILL.md'))) errors.push(`missing skill: ${name}`);
  }
  for (const name of ['branch-strategy', 'plan-create', 'task-implement', 'pr-create']) {
    if (existsSync(join(root, 'skills', name, 'SKILL.md')))
      errors.push(`removed skill must not be discoverable: ${name}`);
  }
  for (const path of requiredReferences) {
    if (!existsSync(join(root, 'skills', path))) errors.push(`missing reference: skills/${path}`);
  }
  for (const path of requiredUsageDocuments) {
    if (!existsSync(join(root, path))) errors.push(`missing usage document: ${path}`);
  }
  const issueDir = join(root, 'skills/workflow-init/assets/.github/ISSUE_TEMPLATE');
  const assetNames = existsSync(issueDir) ? readdirSync(issueDir) : [];
  for (const name of ['FEATURE_REQUEST.md', 'BUG_REPORT.md']) {
    if (!assetNames.includes(name)) errors.push(`issue asset must use exact uppercase name: ${name}`);
    for (const found of assetNames) {
      if (found !== name && found.toLowerCase() === name.toLowerCase())
        errors.push(`noncanonical or duplicate issue asset: ${found}`);
    }
  }
  for (const path of issueTemplates) {
    const file = join(root, 'skills', path);
    if (!existsSync(file)) continue;
    const frontmatter = readFileSync(file, 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)?.[1] ?? '';
    for (const key of ['name', 'about', 'title', 'labels']) {
      if (!new RegExp(`^${key}:\\s*\\S`, 'm').test(frontmatter)) errors.push(`missing issue template ${key}: skills/${path}`);
    }
  }
  function scan(dir) {
    if (!existsSync(dir)) return;
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (['.git', '.superpowers', '.worktrees', 'node_modules', '.venv'].includes(entry.name)) continue;
      const path = join(dir, entry.name);
      if (entry.isDirectory()) scan(path);
      else if (entry.isFile() && entry.name.endsWith('.md')) checkMarkdown(path);
    }
  }
  function checkMarkdown(path) {
    const source = readFileSync(path, 'utf8');
    const label = path.slice(root.length + 1);
    if (path.endsWith('/SKILL.md')) {
      const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)?.[1];
      const name = frontmatter?.match(/^name:\s*([^\r\n]+)$/m)?.[1]?.trim();
      const expected = dirname(path).split(/[\\/]/).at(-1);
      if (name !== expected) errors.push(`skill name mismatch: ${label}`);
      if (!frontmatter?.match(/^description:\s*\S.+$/m)) errors.push(`missing skill description: ${label}`);
      const description = frontmatter?.match(/^description:[ \t]*([^\r\n]*)$/m)?.[1] ?? '';
      if (!/^['"]/.test(description) && /\s#/.test(description)) errors.push(`unquoted description truncated at " #": ${label}`);
    }
    const prose = source.replace(/^(```|~~~)[^\n]*\n[\s\S]*?^\1[^\n]*(?:\n|$)/gm, '');
    for (const match of prose.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
      const target = match[1].trim().replace(/^<|>$/g, '');
      if (/^(?:[a-z][a-z0-9+.-]*:|#)/i.test(target)) continue;
      const local = target.split(/[?#]/)[0];
      if (!local) continue;
      let decoded;
      try { decoded = decodeURIComponent(local); }
      catch { errors.push(`invalid link: ${label} -> ${target}`); continue; }
      if (!existsSync(resolve(dirname(path), decoded))) errors.push(`broken link: ${label} -> ${target}`);
    }
  }
  scan(root);
  return errors;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const errors = validatePackage(process.argv[2] || resolve(dirname(fileURLToPath(import.meta.url)), '..'));
  if (errors.length) {
    for (const error of errors) console.error(error);
    process.exitCode = 1;
  } else console.log('Package structure valid (skills, manifests, local links). Semantic review and host loading not checked.');
}
