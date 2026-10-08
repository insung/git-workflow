import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, readFileSync, renameSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { validatePackage } from '../scripts/check-package.mjs';

const names = ['git-workflow', 'workflow-init', 'issue-create', 'pr-request', 'pr-review', 'pr-comment-check', 'pr-merge', 'issue-close', 'commit-rule', 'git-release', 'git-history'];
const references = ['git-workflow/references/execution-boundaries.md', 'git-workflow/references/change-conventions.md', 'git-workflow/references/writing-conventions.md', 'git-workflow/references/labels.md', 'git-workflow/references/document-links.md', 'git-workflow/references/issue-link.md', 'issue-create/references/issue.md', 'issue-close/references/closing-comment.md', 'workflow-init/assets/.github/ISSUE_TEMPLATE/FEATURE_REQUEST.md', 'workflow-init/assets/.github/ISSUE_TEMPLATE/BUG_REPORT.md', 'workflow-init/assets/.github/PULL_REQUEST_TEMPLATE.md', 'workflow-init/assets/.github/release.yml', 'workflow-init/assets/labels.yml', 'workflow-init/assets/agents-declaration.md', 'workflow-init/references/templates.md', 'workflow-init/references/agents.md', 'workflow-init/references/labels.md', 'workflow-init/references/release.md', 'workflow-init/references/branch-policy.md', 'workflow-init/references/branch-options.md', 'git-workflow/references/project-branch-policy.md', 'workflow-init/scripts/sync-labels.py', 'issue-create/references/plan.md', 'issue-create/references/sub-issues.md', 'git-workflow/references/review-criteria.md', 'git-workflow/references/implementation.md', 'pr-request/references/pr.md', 'pr-request/references/handoff.md', 'pr-merge/references/post-merge-cleanup.md', 'pr-review/references/review.md', 'pr-review/references/pr-comment.md', 'git-workflow/references/pr-comment-check.md', 'git-workflow/references/pr-comment-reply.md', 'git-workflow/scripts/verify-reply.mjs', 'pr-comment-check/scripts/collect-comments.mjs', 'pr-review/references/spec-it-policy.md', 'commit-rule/references/commit-message.md', 'commit-rule/references/scope.md', 'git-release/references/release-notes.md', 'git-history/references/investigation.md'];
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
  rmSync(join(root, 'skills/issue-create/references/plan.md'));
  assert.ok(validatePackage(root).some(e => e.includes('issue-create/references/plan.md')));
});
test('rejects missing shared label guidance', t => {
  const { root } = fixture(t);
  rmSync(join(root, 'skills/git-workflow/references/labels.md'));
  assert.ok(validatePackage(root).some(e => e.includes('git-workflow/references/labels.md')));
});

for (const path of ['git-workflow/references/execution-boundaries.md', 'git-workflow/references/issue-link.md', 'workflow-init/assets/.github/ISSUE_TEMPLATE/FEATURE_REQUEST.md', 'workflow-init/assets/.github/ISSUE_TEMPLATE/BUG_REPORT.md', 'workflow-init/assets/.github/PULL_REQUEST_TEMPLATE.md', 'pr-review/references/spec-it-policy.md', 'pr-review/references/pr-comment.md']) {
  test(`rejects missing required form or contract: ${path}`, t => {
    const { root } = fixture(t);
    rmSync(join(root, 'skills', path));
    assert.ok(validatePackage(root).some(e => e.includes(`missing reference: skills/${path}`)));
  });
}

test('rejects rediscovery of the removed branch-strategy skill', t => {
  const { root, put } = fixture(t);
  put('skills/branch-strategy/SKILL.md', '---\nname: branch-strategy\ndescription: Retired skill.\n---\n');
  assert.ok(validatePackage(root).includes('removed skill must not be discoverable: branch-strategy'));
});

test('does not ship a branch-strategy discovery entrypoint', () => {
  assert.equal(existsSync(join(import.meta.dirname, '..', 'skills/branch-strategy/SKILL.md')), false);
});

for (const name of ['plan-create', 'task-implement']) {
  test(`rejects rediscovery of the integrated skill: ${name}`, t => {
    const { root, put } = fixture(t);
    put(`skills/${name}/SKILL.md`, `---\nname: ${name}\ndescription: Retired skill.\n---\n`);
    assert.ok(validatePackage(root).includes(`removed skill must not be discoverable: ${name}`));
  });
  test(`does not ship the integrated entrypoint: ${name}`, () => {
    assert.equal(existsSync(join(import.meta.dirname, '..', 'skills', name, 'SKILL.md')), false);
  });
}
for (const path of ['issue-create/references/sub-issues.md', 'git-workflow/references/review-criteria.md', 'git-workflow/references/implementation.md']) {
  test(`rejects missing integrated responsibility: ${path}`, t => {
    const { root } = fixture(t);
    rmSync(join(root, 'skills', path));
    assert.ok(validatePackage(root).includes(`missing reference: skills/${path}`));
  });
}

test('rejects an issue template without GitHub front matter fields', t => {
  const { root, put } = fixture(t);
  put('skills/workflow-init/assets/.github/ISSUE_TEMPLATE/BUG_REPORT.md', '---\nname: n\nabout: a\n---\n');
  const errors = validatePackage(root);
  assert.ok(errors.some(e => e.includes('missing issue template title')));
  assert.ok(errors.some(e => e.includes('missing issue template labels')));
});
test('rejects an unquoted description that YAML truncates at " #"', t => {
  const { root, put } = fixture(t);
  put('skills/issue-create/SKILL.md', '---\nname: issue-create\ndescription: “Issue #12의 계획을 작성해줘”처럼 요청할 때 사용한다.\n---\n');
  assert.ok(validatePackage(root).some(e => e.includes('truncated')));
});
test('accepts a quoted description containing " #"', t => {
  const { root, put } = fixture(t);
  put('skills/issue-create/SKILL.md', "---\nname: issue-create\ndescription: '“Issue #12의 계획을 작성해줘”처럼 요청할 때 사용한다.'\n---\n");
  assert.deepEqual(validatePackage(root), []);
});

test('workflow-init required-section table matches the template headings', () => {
  const root = join(import.meta.dirname, '..', 'skills', 'workflow-init');
  const rows = readFileSync(join(root, 'references/templates.md'), 'utf8').split('\n').filter(l => /^\| (기능 Issue|버그 Issue|PR) \|/.test(l));
  assert.equal(rows.length, 3);
  const files = ['ISSUE_TEMPLATE/FEATURE_REQUEST.md', 'ISSUE_TEMPLATE/BUG_REPORT.md', 'PULL_REQUEST_TEMPLATE.md'];
  rows.forEach((row, i) => {
    const [, , required, optional] = row.split('|').map(c => c.trim());
    const listed = [...required.split(','), ...optional.split(',')].map(s => s.trim());
    const headings = readFileSync(join(root, 'assets', '.github', files[i]), 'utf8').split('\n').filter(l => /^## /.test(l)).map(l => l.slice(3).trim());
    assert.deepEqual([...listed].sort(), [...headings].sort(), files[i]);
  });
});

test('rejects a missing workflow-init entrypoint without relying on README links', t => {
  const { root } = fixture(t);
  rmSync(join(root, 'skills/workflow-init/SKILL.md'));
  assert.ok(validatePackage(root).includes('missing skill: workflow-init'));
});

// Detect omitted policy even if the router link is absent: packaging must carry it.
test('rejects missing cleanup policy without depending on entrypoint links', t => {
  const { root } = fixture(t);
  rmSync(join(root, 'skills/pr-merge/references/post-merge-cleanup.md'));
  assert.ok(validatePackage(root).includes('missing reference: skills/pr-merge/references/post-merge-cleanup.md'));
});


test('rejects a lowercase-only asset on case-sensitive and insensitive filesystems', t => {
  const { root } = fixture(t);
  const dir = join(root, 'skills/workflow-init/assets/.github/ISSUE_TEMPLATE');
  renameSync(join(dir, 'FEATURE_REQUEST.md'), join(dir, 'feature_request.md'));
  assert.ok(validatePackage(root).some(e => e.includes('exact uppercase name: FEATURE_REQUEST.md')));
  assert.ok(validatePackage(root).some(e => e.includes('noncanonical or duplicate issue asset: feature_request.md')));
});

test('rejects a mixed-case asset instead of silently accepting an alias', t => {
  const { root } = fixture(t);
  const dir = join(root, 'skills/workflow-init/assets/.github/ISSUE_TEMPLATE');
  renameSync(join(dir, 'BUG_REPORT.md'), join(dir, 'Bug_Report.md'));
  assert.ok(validatePackage(root).some(e => e.includes('exact uppercase name: BUG_REPORT.md')));
});

for (const path of ['workflow-init/assets/labels.yml', 'workflow-init/assets/.github/release.yml', 'workflow-init/assets/agents-declaration.md', 'workflow-init/scripts/sync-labels.py', 'workflow-init/references/branch-policy.md', 'workflow-init/references/branch-options.md', 'git-workflow/references/project-branch-policy.md']) {
  test(`rejects missing init capability: ${path}`, t => {
    const { root } = fixture(t);
    rmSync(join(root, 'skills', path));
    assert.ok(validatePackage(root).includes(`missing reference: skills/${path}`));
  });
}

test('canonical adoption declaration carries role separation and approval boundary', () => {
  const declaration = readFileSync(join(import.meta.dirname, '..', 'skills/workflow-init/assets/agents-declaration.md'), 'utf8');
  assert.ok(declaration.startsWith('## Git workflow\n\n이 프로젝트는 git-workflow를 따른다.'));
  assert.equal(declaration.split('\n').filter(line => line.startsWith('- ')).length, 4);
  for (const clause of ['사용자 승인 후 머지', '직접 구현하지 않으며', '이전 대화를 상속하지 않는 별도 구현 에이전트', '비공개 검토 기준·검증 입력은 구현자에게 전달하지 않는다', '읽기 전용 질문·Issue 작성만 요청한 경우에는 구현으로 확대하지 않는다']) {
    assert.ok(declaration.includes(clause), clause);
  }
});

test('ships workflow-init as the sole initialization entrypoint', () => {
  const skills = join(import.meta.dirname, '..', 'skills');
  const discovered = ['workflow-init', 'template-init', 'agents-init'].filter(name =>
    existsSync(join(skills, name, 'SKILL.md')));
  assert.deepEqual(discovered, ['workflow-init']);
});

// Regression: required user-facing information must not silently become optional.
test('Issue templates require the original request, inline plan and reference links', () => {
  const root = join(import.meta.dirname, '..', 'skills', 'workflow-init');
  const rows = readFileSync(join(root, 'references/templates.md'), 'utf8').split('\n').filter(l => /^\| (기능 Issue|버그 Issue) \|/.test(l));
  for (const row of rows) {
    const required = row.split('|')[2].split(',').map(s => s.trim());
    for (const heading of ['사용자 요청 원문', '계획', '참고 링크']) assert.ok(required.includes(heading), `${row.split('|')[1]}: ${heading}`);
  }
});

test('PR reports AC results without requiring separate plan, task or handoff files', () => {
  const asset = readFileSync(join(import.meta.dirname, '..', 'skills/workflow-init/assets/.github/PULL_REQUEST_TEMPLATE.md'), 'utf8');
  assert.match(asset, /^## 완료 조건 확인과 검증 근거$/m);
  assert.doesNotMatch(asset, /^- (계획|작업·테스트 사례|구현 인계):/m);
});

for (const path of ['skills/git-workflow/scripts/verify-reply.mjs', 'skills/git-workflow/references/pr-comment-reply.md', 'skills/pr-comment-check/SKILL.md', 'skills/git-workflow/references/pr-comment-check.md', 'skills/pr-comment-check/scripts/collect-comments.mjs']) {
  test(`rejects missing comment-check capability: ${path}`, t => {
    const { root } = fixture(t);
    rmSync(join(root, path));
    assert.ok(validatePackage(root).some(e => e.includes(path.endsWith('SKILL.md') ? 'pr-comment-check' : path)));
  });
}

// History must remain discoverable even if README/router links are removed.
test('rejects missing git-history entrypoint without README links', t => {
  const { root } = fixture(t);
  rmSync(join(root, 'skills/git-history/SKILL.md'));
  assert.ok(validatePackage(root).includes('missing skill: git-history'));
});
test('rejects missing git-history investigation reference', t => {
  const { root } = fixture(t);
  rmSync(join(root, 'skills/git-history/references/investigation.md'));
  assert.ok(validatePackage(root).includes('missing reference: skills/git-history/references/investigation.md'));
});

test('routes planning and implementation to their combined entrypoints', () => {
  const root = join(import.meta.dirname, '..', 'skills');
  const router = readFileSync(join(root, 'git-workflow/SKILL.md'), 'utf8');
  assert.match(router, /Issue의 계획·작업 분해 \| \[issue-create\]/);
  assert.match(router, /준비된 Issue 계획.*\[공통 구현 절차\]\(references\/implementation.md\)/);
  for (const name of ['plan-create', 'task-implement']) assert.ok(!router.includes(`../${name}/SKILL.md`));
  const issue = readFileSync(join(root, 'issue-create/SKILL.md'), 'utf8');
  assert.ok(issue.includes('계획만 요청됐으면 구성 초안을 반환'));
  assert.ok(issue.includes('Issue 작성만 요청된 경우 계획이나 구현을 자동 시작하지 않는다'));
  const implementation = readFileSync(join(root, 'git-workflow/references/implementation.md'), 'utf8');
  for (const clause of ['작업 위치·기준 브랜치·base/HEAD', '비공개 검토 기준·고정 입력', '변경 전 소스(RED)', '원래 리뷰 스레드']) assert.ok(implementation.includes(clause), clause);
});

test('rejects the previous PR skill alongside pr-request', t => {
  const { root, put } = fixture(t);
  put('skills/pr-create/SKILL.md', '---\nname: pr-create\ndescription: Previous PR skill.\n---\n\n# PR\n');
  assert.ok(validatePackage(root).includes('removed skill must not be discoverable: pr-create'));
});
