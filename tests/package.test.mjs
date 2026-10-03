import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, readFileSync, renameSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { validatePackage } from '../scripts/check-package.mjs';

const names = ['git-workflow', 'agents-init', 'issue-create', 'plan-create', 'task-implement', 'pr-create', 'pr-review', 'pr-merge', 'issue-close', 'commit-rule', 'branch-strategy', 'git-release', 'template-init'];
const references = ['git-workflow/references/execution-boundaries.md', 'git-workflow/references/change-conventions.md', 'git-workflow/references/writing-conventions.md', 'git-workflow/references/labels.md', 'git-workflow/references/document-links.md', 'git-workflow/references/issue-link.md', 'issue-create/references/issue.md', 'issue-close/references/closing-comment.md', 'template-init/assets/.github/ISSUE_TEMPLATE/FEATURE_REQUEST.md', 'template-init/assets/.github/ISSUE_TEMPLATE/BUG_REPORT.md', 'template-init/assets/.github/PULL_REQUEST_TEMPLATE.md', 'plan-create/references/plan.md', 'plan-create/references/todos.md', 'plan-create/references/review-criteria.md', 'pr-create/references/pr.md', 'pr-create/references/handoff.md', 'pr-merge/references/post-merge-cleanup.md', 'pr-review/references/review.md', 'pr-review/references/pr-comment.md', 'pr-review/references/spec-it-policy.md', 'commit-rule/references/commit-message.md', 'commit-rule/references/scope.md', 'branch-strategy/references/branch.md', 'git-release/references/release-notes.md'];
function fixture(t) {
  const root = mkdtempSync(join(tmpdir(), 'git-workflow-package-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  function put(path, data) {
    const dest = join(root, path);
    mkdirSync(join(dest, '..'), { recursive: true });
    writeFileSync(dest, data);
  }
  for (const name of names) put(`skills/${name}/SKILL.md`, `---\nname: ${name}\ndescription: Use when testing ${name}.\n---\n\n# Skill\n`);
  for (const path of references) put(`skills/${path}`, path.includes('ISSUE_TEMPLATE') ? '---\nname: n\nabout: a\ntitle: "t"\nlabels: l\n---\n' : '# Reference\n');
  for (const path of ['plugin.json', '.codex-plugin/plugin.json', '.claude-plugin/plugin.json'])
    put(path, JSON.stringify({ name: 'git-workflow', version: '0.2.0', ...(path.includes('codex') ? { skills: './skills/' } : {}) }));
  put('.claude-plugin/marketplace.json', JSON.stringify({ name: 'git-workflow', plugins: [{ name: 'git-workflow', source: '.' }] }));
  return { root, put };
}
test('accepts a complete dual-host package', t => {
  const { root } = fixture(t);
  assert.deepEqual(validatePackage(root), []);
});
test('rejects a missing workflow stage', t => {
  const { root } = fixture(t);
  rmSync(join(root, 'skills/pr-review'), { recursive: true });
  assert.ok(validatePackage(root).some(e => e.includes('pr-review')));
});
test('rejects a missing issue-close stage', t => {
  const { root } = fixture(t);
  rmSync(join(root, 'skills/issue-close'), { recursive: true });
  assert.ok(validatePackage(root).some(e => e.includes('issue-close')));
});
test('rejects a skill name that does not match its discovery directory', t => {
  const { root, put } = fixture(t);
  put('skills/pr-review/SKILL.md', '---\nname: wrong-name\ndescription: Use when reviewing.\n---\n');
  assert.ok(validatePackage(root).some(e => e.includes('name mismatch')));
});
test('rejects versions that differ between plugin hosts', t => {
  const { root, put } = fixture(t);
  put('.claude-plugin/plugin.json', JSON.stringify({ name: 'git-workflow', version: '0.1.0' }));
  assert.ok(validatePackage(root).some(e => e.includes('version mismatch')));
});
test('rejects broken relative handoff links', t => {
  const { root, put } = fixture(t);
  put('README.md', '[review](skills/missing/SKILL.md)');
  assert.ok(validatePackage(root).some(e => e.includes('broken link')));
});
test('allows external URLs and local fragments without fetching them', t => {
  const { root, put } = fixture(t);
  put('README.md', '[web](https://example.invalid/x) [anchor](#test) [issue](skills/issue-create/SKILL.md#input)');
  assert.deepEqual(validatePackage(root), []);
});
test('rejects a Codex manifest that loads the wrong skill directory', t => {
  const { root, put } = fixture(t);
  put('.codex-plugin/plugin.json', JSON.stringify({ name: 'git-workflow', version: '0.2.0', skills: './missing/' }));
  assert.ok(validatePackage(root).some(e => e.includes('skills root')));
});
test('returns a readable error for malformed JSON', t => {
  const { root, put } = fixture(t);
  put('plugin.json', '{broken');
  assert.ok(validatePackage(root).some(e => e.includes('invalid manifest')));
});
test('rejects an absent plan form even when no link points to it', t => {
  const { root } = fixture(t);
  rmSync(join(root, 'skills/plan-create/references/plan.md'));
  assert.ok(validatePackage(root).some(e => e.includes('plan-create/references/plan.md')));
});
test('rejects missing shared label guidance', t => {
  const { root } = fixture(t);
  rmSync(join(root, 'skills/git-workflow/references/labels.md'));
  assert.ok(validatePackage(root).some(e => e.includes('git-workflow/references/labels.md')));
});

for (const path of ['git-workflow/references/execution-boundaries.md', 'branch-strategy/references/branch.md', 'git-workflow/references/issue-link.md', 'template-init/assets/.github/ISSUE_TEMPLATE/FEATURE_REQUEST.md', 'template-init/assets/.github/ISSUE_TEMPLATE/BUG_REPORT.md', 'template-init/assets/.github/PULL_REQUEST_TEMPLATE.md', 'pr-review/references/spec-it-policy.md', 'pr-review/references/pr-comment.md']) {
  test(`rejects missing required form or contract: ${path}`, t => {
    const { root } = fixture(t);
    rmSync(join(root, 'skills', path));
    assert.ok(validatePackage(root).some(e => e.includes(`missing reference: skills/${path}`)));
  });
}

test('rejects a missing branch-strategy entrypoint even when its reference remains', t => {
  const { root } = fixture(t);
  rmSync(join(root, 'skills/branch-strategy/SKILL.md'));
  assert.ok(validatePackage(root).some(e => e.includes('missing skill: branch-strategy')));
});

test('rejects a missing task-implement entrypoint', t => {
  const { root } = fixture(t);
  rmSync(join(root, 'skills/task-implement/SKILL.md'));
  assert.ok(validatePackage(root).some(e => e.includes('missing skill: task-implement')));
});

test('rejects an issue template without GitHub front matter fields', t => {
  const { root, put } = fixture(t);
  put('skills/template-init/assets/.github/ISSUE_TEMPLATE/BUG_REPORT.md', '---\nname: n\nabout: a\n---\n');
  const errors = validatePackage(root);
  assert.ok(errors.some(e => e.includes('missing issue template title')));
  assert.ok(errors.some(e => e.includes('missing issue template labels')));
});
test('rejects an unquoted description that YAML truncates at " #"', t => {
  const { root, put } = fixture(t);
  put('skills/plan-create/SKILL.md', '---\nname: plan-create\ndescription: “Issue #12의 계획을 작성해줘”처럼 요청할 때 사용한다.\n---\n');
  assert.ok(validatePackage(root).some(e => e.includes('truncated')));
});
test('accepts a quoted description containing " #"', t => {
  const { root, put } = fixture(t);
  put('skills/plan-create/SKILL.md', "---\nname: plan-create\ndescription: '“Issue #12의 계획을 작성해줘”처럼 요청할 때 사용한다.'\n---\n");
  assert.deepEqual(validatePackage(root), []);
});

test('template-init required-section table matches the template headings', () => {
  const root = join(import.meta.dirname, '..', 'skills', 'template-init');
  const rows = readFileSync(join(root, 'SKILL.md'), 'utf8').split('\n').filter(l => /^\| (기능 Issue|버그 Issue|PR) \|/.test(l));
  assert.equal(rows.length, 3);
  const files = ['ISSUE_TEMPLATE/FEATURE_REQUEST.md', 'ISSUE_TEMPLATE/BUG_REPORT.md', 'PULL_REQUEST_TEMPLATE.md'];
  rows.forEach((row, i) => {
    const [, , required, optional] = row.split('|').map(c => c.trim());
    const listed = [...required.split(','), ...optional.split(',')].map(s => s.trim());
    const headings = readFileSync(join(root, 'assets', '.github', files[i]), 'utf8').split('\n').filter(l => /^## /.test(l)).map(l => l.slice(3).trim());
    assert.deepEqual([...listed].sort(), [...headings].sort(), files[i]);
  });
});

test('rejects a missing agents-init entrypoint without relying on README links', t => {
  const { root } = fixture(t);
  rmSync(join(root, 'skills/agents-init/SKILL.md'));
  assert.ok(validatePackage(root).includes('missing skill: agents-init'));
});

// Detect omitted policy even if the router link is absent: packaging must carry it.
test('rejects missing cleanup policy without depending on entrypoint links', t => {
  const { root } = fixture(t);
  rmSync(join(root, 'skills/pr-merge/references/post-merge-cleanup.md'));
  assert.ok(validatePackage(root).includes('missing reference: skills/pr-merge/references/post-merge-cleanup.md'));
});


test('rejects a lowercase-only asset on case-sensitive and insensitive filesystems', t => {
  const { root } = fixture(t);
  const dir = join(root, 'skills/template-init/assets/.github/ISSUE_TEMPLATE');
  renameSync(join(dir, 'FEATURE_REQUEST.md'), join(dir, 'feature_request.md'));
  assert.ok(validatePackage(root).some(e => e.includes('exact uppercase name: FEATURE_REQUEST.md')));
  assert.ok(validatePackage(root).some(e => e.includes('noncanonical or duplicate issue asset: feature_request.md')));
});

test('rejects a mixed-case asset instead of silently accepting an alias', t => {
  const { root } = fixture(t);
  const dir = join(root, 'skills/template-init/assets/.github/ISSUE_TEMPLATE');
  renameSync(join(dir, 'BUG_REPORT.md'), join(dir, 'Bug_Report.md'));
  assert.ok(validatePackage(root).some(e => e.includes('exact uppercase name: BUG_REPORT.md')));
});
