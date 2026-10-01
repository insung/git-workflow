# git-workflow

A Codex and Claude Code plugin that connects Issue intent, scope and acceptance criteria to plans, implementation evidence, PR review and approved delivery.

Issue → plan/todos → implementation, tests and scoped commits → PR → spec-it review → approved merge → Wiki.

| Skill | Responsibility |
| --- | --- |
| git-workflow | Stage routing, shared boundaries, plan/todo implementation |
| issue-create | Reuse/create or complete the Issue intent, scope and acceptance criteria |
| plan-create | Write the Issue-based plan, verification/deployment plans and task todos |
| pr-create | Prepare the implemented change and its PR/review handoff |
| pr-review | Review intent, plan/todos, diff/commits, pinned policy and test evidence |
| pr-merge | Match reviewed HEAD, apply human approval, confirm merge and document Wiki |
| commit-rule | Scoped commits, messages, index preservation and branch guidance |
| git-release | Fixed-range release notes, approved tags/releases |

[한국어 안내](README.ko.md) · [Full workflow and forms](docs/workflow.md) · [Local pilot](docs/testing/local-pilot.md)

## Package layout

```text
skills/
├── git-workflow/       # router + shared change/writing conventions, labels and links
├── issue-create/       # Issue form in references/
├── plan-create/        # Plan and focused todo forms in references/
├── pr-create/          # PR and implementation handoff forms
├── pr-review/          # policy and intent review form
├── pr-merge/           # confirmed merge and Wiki form
├── commit-rule/        # commit-message, scope and branch references
└── git-release/        # release-note reference
```

Read the current stage's reference when writing the corresponding output. Forms live in these authoritative references. Feature and bug Issues use separate template files; there is no duplicate root templates/ tree. Existing target-repository templates and policy pins take precedence. GitHub forms are not automatically installed into target repositories.

## Documentation and labels

Store plan.md, todos.md or 01-todos.md, handoff.md and review.md in the target repository's `docs/git-workflows/{yyyy-MM}/{dd}_{issue-number}_{title}/`. Use the actual Issue number after creation; a remote-unavailable local pilot uses `{dd}_draft_{title}` until its Issue exists. Every plan contains the Issue context and original intent, sequenced work units, verification and deployment/rollback plans. Issue/PR updates contain core summaries and verified document links, without copying the full documents.

PR creation and merging require an Issue field verified against an actual remote Issue, its scope and acceptance criteria. PR references, inaccessible or mismatched Issues block those actions; a local-draft is not a substitute. See the [Issue linkage contract](skills/git-workflow/references/issue-link.md).

Use existing repository labels and automation rules. Create only necessary missing labels when creation is authorized and write access is available; never force-update existing labels or provision the entire suggested list. Missing access is a reported limitation, not proof that labels do not exist.

## Installation

Version 0.2.0 is prepared on `feat/issue-review-workflow`. Pin the marketplace to that branch for this version; the default branch is updated only after its merge is approved. These commands install the remote branch after it has been pushed.

```sh
codex plugin marketplace add insung/git-workflow --ref feat/issue-review-workflow
codex plugin add git-workflow@git-workflow
claude plugin marketplace add insung/git-workflow@feat/issue-review-workflow
claude plugin install git-workflow@git-workflow
```

If the marketplace is already registered, verify that its configured ref is `feat/issue-review-workflow`, refresh that marketplace, and update the installed plugin. Follow the installed CLI’s result before claiming that an existing registration changed.

After publishing/updating, verify discovery in a fresh session. Claude's plugin skill form is `/git-workflow:issue-create`; Codex's actual names are verified at host loading time. Use explicit source-file instructions for the current local pilot.

## Validation and limits

```sh
node --test tests/package.test.mjs
node scripts/check-package.mjs
claude plugin validate .claude-plugin/plugin.json
claude plugin validate .claude-plugin/marketplace.json
git diff --check
```

Node.js 18+; no dependencies. Structural checks do not prove semantic review accuracy or actual host loading. The package provides instructions, not an Actions/EC2 executor or automatic CI enforcement. Merge, deployment and Wiki publishing are separate states and permissions. `.superpowers/` is ignored execution scratch; shared plans and evidence remain in docs/.

## Examples (illustrative)

아래 입력과 결과는 설명을 위한 가상 사례다. 실제 파일 소유권, 검증 결과, 배포 상태나 실행 권한의 근거로 사용하지 않는다.

### 1. 다른 작업이 섞인 트리에서 커밋

사용자가 `src/retry.ts`와 `tests/retry.test.ts`를 이번 요청의 변경으로, `docs/team-plan.md`를 별도 작업으로 지정했다. `git status --short`는 다음과 같다.

```text
 M src/retry.ts
 M tests/retry.test.ts
 M docs/team-plan.md
```

두 파일의 diff와 기존 커밋 형식을 확인하고, 커밋 묶음과 제목을 제시한다. 사용자가 그 범위의 커밋을 승인했다면 두 파일만 stage한다.

```bash
git add -- src/retry.ts tests/retry.test.ts
git diff --cached --check
git diff --cached
```

저장소가 요구하는 관련 검증을 실행하고 실제 결과를 기록한 뒤 승인된 커밋을 만든다. 예시 제목은 `feat(retry): 일시 오류의 재시도 안내`다. 이후 `git status --short`에서 `docs/team-plan.md`가 남아 있는지 확인한다. 같은 파일에 다른 작업의 hunk가 있으면 파일 전체를 stage하지 않고 [scope.md](skills/commit-rule/references/scope.md)에 따라 분리한다.

### 2. 관찰한 운영 방식으로 브랜치 전략 제안

가상의 저장소 문서와 CI 설정에서 다음 사실을 확인했다고 가정한다.

| 확인한 사실 | 제안에 반영할 내용 |
| --- | --- |
| `main`에 병합되면 CI 검증 후 배포 후보를 만든다 | `main`을 통합 기준으로 유지 |
| 모든 변경은 PR 검토를 거친다 | 짧게 유지되는 작업 브랜치와 PR 사용 |
| 릴리즈는 확정된 태그에서 시작한다 | 태그가 가리키는 커밋을 배포 기준으로 기록 |
| 긴급 수정은 현재 배포 커밋에서 분기한다 | 배포 뒤 같은 수정을 `main`에도 반영 |

이 경우 기본안은 `main`과 짧은 작업 브랜치다. 별도 장기 `develop` 브랜치의 필요성은 확인된 배포 흐름으로 판단한다. 제안에는 브랜치 보호 규칙과 도입 비용을 덧붙이고, 전략 검토 요청만으로 브랜치를 만들지 않는다.

### 3. 커밋 목록을 사용자 중심 릴리즈 노트로 바꾸기

대상 제품의 이전 배포 지점이 `v1.4.0`, 이번 후보가 `main`의 특정 커밋이라고 확인했다고 가정한다. 먼저 두 지점을 고정하고 조상 관계, 통합 이력, 전체 본문과 변경 파일을 대조한다.

```bash
git merge-base --is-ancestor v1.4.0 <target>
git log --first-parent --format='%h %s' v1.4.0..<target>
git log --format='%H %s%n%b' v1.4.0..<target>
git diff --name-status v1.4.0 <target>
```

두 커밋이 각각 “실패 사유 표시”와 “만료 오류 분기”를 다뤘고, 실제 diff에서 일시 오류에는 재시도 가능 안내가 표시되고 만료 오류에는 재시도를 권하지 않는 동작이 확인되었다고 가정한다. 하나의 사용자 결과로 묶으면 초안 항목은 다음처럼 쓸 수 있다.

> 요청이 일시적으로 실패하면 재시도 가능 여부를 안내하고, 만료된 요청에는 다시 시도하라는 안내를 표시하지 않는다.

확인되지 않은 테스트 통과, 배포 완료, 버전 날짜는 붙이지 않는다. `target`이 실제 배포 지점인지 확인되지 않았다면 노트는 `Unreleased` 초안으로 표시한다.
