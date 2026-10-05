# Baseline decision scenarios — run 2

Source checkout: `<implementation-worktree>`, verified HEAD `4d356cf`.
Read: `skills/template-init/SKILL.md`, `skills/agents-init/SKILL.md`, `skills/git-workflow/references/{labels,execution-boundaries,change-conventions}.md`, `skills/git-release/SKILL.md`.
This is a virtual decision execution. No real repository, GitHub, file installation, label creation, or user question was executed. Only this result file was saved. Virtual target: `/fixture/project`, clean `main`, origin `example/project` except C remote absent. The baseline has no workflow-init skill or unified installation contract.

## A — 깃헙워크플로우 설치해줘

First response:
“대상은 `/fixture/project`로 확인했습니다. 기존 스킬에는 Issue·PR 템플릿 설치와 AGENTS.md 채택 선언 추가가 각각 있습니다. 어떤 설치를 뜻하는지 먼저 확인하겠습니다. 템플릿 설치인지, 채택 선언 추가인지, 둘 다인지 알려주세요.”

Action list:
1. Read-only target/status and existing `.github`/AGENTS check.
2. Report available existing entrypoints; broad wording does not select either action definitively.
3. Wait for scope clarification; with no answer, no installation or AGENTS proposal approval inferred.
4. No invented default selection, numbered unified installer menu, label bundle, release classification assets, commit, or push.

Finding: baseline offers separate entrypoints but does not define a unified item-selection flow. Clarifying broad installation intent is a conservative decision, not a baseline-prescribed workflow-init procedure.

## B — 라벨만 설치해줘

First response:
“제공한 라벨 YAML과 `example/project`의 현재 라벨을 대조하겠습니다. 기존 `bug`·`enhancement`의 이름·설명·색상은 유지하고, YAML에서 요청한 라벨 중 없는 항목만 생성하겠습니다. write 권한은 확인됐습니다.”

Action list:
1. Read YAML to determine requested names, descriptions, six-digit colors and exact creation scope. Baseline defines no YAML schema/import tool; valid supplied data can be used as input to existing label creation procedure.
2. Query `gh label list --repo example/project --limit 1000 --json name,description,color`; do not treat failure or a capped page as absence.
3. Reuse existing bug/enhancement with their custom metadata; do not force-update metadata.
4. For absent `release`/`deployment`, create only if present in supplied requested YAML. Absence alone is not a mandate to create them. Other YAML entries follow the same requested-scope/absence rule.
5. Use individual `gh label create ... --description ... --color ...`, never `--force`; requery to verify creations or resolve ambiguous outcomes.
6. No `.github` or AGENTS files, no unrelated labels, no Issue/PR label attachment.

Finding: labels.md supports requested missing-label creation with write access and preserves existing metadata. It does not supply an installer-owned canonical label YAML, required release/deployment bundle, or bulk import contract. The prompt alone does not expose YAML contents, so exact names created cannot be asserted.

## C — template-init으로 템플릿만 설치해줘

First response:
“`template-init`을 적용하겠습니다. 기존 `feature_request.md`는 이름과 내용을 유지하고, 없는 버그·PR 템플릿만 복사하겠습니다. ‘배경’은 ‘목표’, ‘완료 기준’은 ‘달성 조건’과 같은 정보를 요구하는 절로 확인합니다. remote가 없으므로 라벨은 ‘미확인: remote 없음’으로 기록하겠습니다.”

Action list:
1. Confirm Git root, branch/status, no remote; absence of remote does not block local copying.
2. Search Issue/PR template locations including alternate PR locations/folders.
3. Treat lowercase feature_request.md as installed feature kind; preserve it and do not add uppercase duplicate.
4. Diff existing feature content against canonical; list equivalent heading pairs with evidence. Background/acceptance headings are not missing. Only genuinely absent other mandatory sections, if any, are reported; do not assume their absence without file content.
5. Create necessary directories and copy canonical BUG_REPORT.md and PULL_REQUEST_TEMPLATE.md, given stated missing kinds and no alternative PR template found.
6. Skip remote label query; report label unconfirmed because no remote. No label creation, AGENTS write, commit, push.

Finding: this entire local installation path, case-insensitive duplicate prevention, semantic heading comparison, and no-remote handling are explicitly supported by template-init.

## D — agents-init으로 선언만 추가해줘

First response:
“`agents-init`을 적용해 기존 지침을 보존하고 `/fixture/project/AGENTS.md` 끝에 추가할 선언을 제시하겠습니다. 기존 마지막 줄 뒤에 구분용 빈 줄을 넣고 다음 전문을 추가합니다. 제시한 안의 명시적 승인 전에는 파일을 변경하지 않습니다.”

Proposed exact text (part of first response):
```markdown
## Git workflow

이 프로젝트는 git-workflow를 따른다.
Issue 생성 → plan 작성 → 별도 에이전트 구현 → 메인 독립 검증 → PR 검토 → 사용자 승인 후 머지 → Issue 종료 순서로 진행한다.

- 메인 에이전트는 Issue·plan, 구현 위임, 검증, PR 생성·검토, 승인 후 머지와 실제 머지 확인 뒤 Issue close·결과 기록을 조정한다. 직접 구현하지 않으며, 구현 전에 검토 기준·검증 입력을 고정하고 고정 상태를 확인한다. 고정이 미확인이면 구현 위임을 보류한다.
- Issue 기반 구현 요청에서는 이전 대화를 상속하지 않는 별도 구현 에이전트를 생성해 승인된 단계를 반복 지시 없이 위임한다. 위임 메시지에 공통 목적·유지할 결정·담당 범위와 읽기 순서(Issue → plan 공통 맥락·결정·단계 → 담당 task → handoff·공개 리뷰 지적)를 반드시 명시한다. 비공개 검토 기준·검증 입력은 구현자에게 전달하지 않는다.
- 구현 에이전트는 task-implement에 따라 구현·자체 테스트·결과 인계를 담당한다. 메인은 인계 결과를 고정 기준으로 독립 검증하며, 실패하면 구현자에게 수정을 위임한 뒤 재검증한다.
- 기본 역할 분리와 단계 진행은 요청 범위와 행동·대상별 승인을 따른다. 읽기 전용 질문·Issue 작성만 요청한 경우에는 구현으로 확대하지 않는다.
```

Approval explanation in first response: “`skills/agents-init/SKILL.md`의 ‘최초 초기화 요청은 추가안 승인으로 간주하지 않는다’ 규칙에 따라 위 경로·전문·위치에 대한 승인이 필요합니다.”

Action list:
1. Read full existing AGENTS and check conflict/partial declaration; other unrelated instructions alone do not block proposal.
2. Show absolute path, exact source declaration and append placement/newline separation.
3. Wait for explicit approval. Current case lacks approval, so no file changes.
4. If subsequently approved, reread to ensure unchanged state; changed state requires revised proposal/approval. Preserve all old bytes.
5. No template/label/release installation or commit/push expansion.

Finding: original “선언만 추가” request is insufficient to write under this explicit agents-init approval gate. Proposal then wait is supported behavior.

## E — 릴리즈 노트 분류 설정만 설치해줘

First response:
“현재 baseline에는 릴리즈 노트 분류 설정을 설치하는 스킬이나 정본 설정 파일이 없습니다. 기존 `release.yaml`과 `release-drafter.yml`을 먼저 확인해 적용 중인 분류를 정리하겠습니다. 문서 PR도 스킬 동작을 바꾸면 제목 type만으로 릴리즈 대상에서 제외할 수 없습니다. 기존 설정을 임의로 덮어쓰거나 라벨을 생성하지 않겠습니다.”

Action list:
1. Read existing release.yaml/release-drafter.yml and repository release policy; precedence belongs to existing settings.
2. Inspect actual documentation PR behavior change when assessing classification; docs is “usually excluded” candidate only, not definitive exclusion. Consumer-relevant installation/operation/compatibility changes may belong in notes.
3. Report absence of baseline installation assets/procedure. Existing git-release prepares notes/tags/releases, not release classification config installation.
4. No overwrite, invented canonical categories, blanket documentation exclusion, label creation, tag, Release, deployment, commit, push.

Finding: baseline supports interpreting existing release classification and actual effects, but cannot claim a completed configuration installation. A concrete config-change task would require additional supplied desired rules; no new skill is invented here.
