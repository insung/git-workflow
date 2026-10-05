# Baseline scenario responses — self-red-3

Source checkout: `<repo>`, branch `main`, HEAD `45e2517587d31c45491c88588e7083b4c2d1f5ad`.
Read only: current `skills/template-init/SKILL.md`, `skills/agents-init/SKILL.md`, `skills/git-workflow/SKILL.md`, relevant execution-boundaries.md and labels.md. No implementation worktree, review branch, hidden criteria, or real target mutations accessed. These are virtual first responses/action lists; not executed installations or pass/fail judgments.

## Case 1
Input: “git workflow 설치해줘”; virtual `/fixture/project`, origin `example/project`, clean Git repo; `.github` and `AGENTS.md` absent; item-selection response absent.

First response:
“`/fixture/project`에 설치할 범위를 확인하겠습니다. Issue·PR 템플릿, AGENTS.md 워크플로우 선언, 또는 에이전트 스킬 설치 중 어떤 범위인가요? 현재 요청만으로 설치 대상을 확정하기 어려워 파일은 만들지 않았습니다.”

Action list:
- Verify root, origin, branch/HEAD, worktree/index and applicable existing directives read-only.
- Scope remains unresolved. Await item/scope selection; no directory, template, declaration, or remote label creation.
- Baseline router explicitly distinguishes template-init from agents-init. It provides no integrated “git workflow 설치” item-selection protocol; above clarification is a conservative interpretation of uncertain scope, not a baseline-mandated menu.

## Case 2
Input: “라벨만 설치해줘”; valid user label YAML lacks release/deployment; existing custom bug label; write permission confirmed.

First response:
“`example/project`의 기존 라벨과 제공한 YAML을 대조하겠습니다. 기존 `bug`의 이름·설명·색상은 유지하고, 요청한 목록에서 필요한 누락 라벨만 생성하겠습니다. YAML에 없는 `release`·`deployment`를 추가하는 근거는 현재 스킬에 없습니다.”

Action list:
- Fix target `example/project`; query `gh label list --repo example/project --limit 1000 --json name,description,color` (handle list cap and query failure without assuming absence).
- Read provided YAML as the user-requested label scope; inspect project classification/automation first, reuse same-meaning existing labels.
- Preserve existing custom bug label including metadata; no `--force`, delete, or bulk replacement.
- Create needed absent labels explicitly in requested YAML using specified name/description/color and verified permission; re-query actual results.
- Do not create templates or edit AGENTS.md. Do not invent release/deployment defaults, schema, or YAML contents.
- Baseline supports needed-label creation via labels.md, but has no label-install skill, YAML schema, canonical complete install set, or release/deployment guarantee. Exact create list cannot be stated because this scenario gives no concrete YAML entries.

## Case 3
Input: “template-init으로 템플릿 설치해줘”; existing lowercase `feature_request.md`, bug/PR templates absent, no remote.

First response:
“기존 `feature_request.md`는 같은 종류의 설치 파일로 유지하고 차이와 필수 절을 확인하겠습니다. 없는 버그·PR 템플릿 두 파일을 복사하겠습니다. 라벨은 ‘라벨 미확인: remote 없음’으로 기록하겠습니다.”

Action list:
- Verify root, Git state and remote absence; remote absence does not stop copies.
- Check all known Issue/PR template locations for alternate same-kind templates.
- Preserve `.github/ISSUE_TEMPLATE/feature_request.md` filename and contents; never create additional uppercase `FEATURE_REQUEST.md` or rename existing file.
- Copy canonical assets to `/fixture/project/.github/ISSUE_TEMPLATE/BUG_REPORT.md` and `/fixture/project/.github/PULL_REQUEST_TEMPLATE.md` if alternate same-kind templates are absent as stipulated.
- Compare existing feature template with canonical file; report semantic equivalent required headings, uncertainty and actual missing sections without rewriting it.
- Skip remote label query and creation; report “라벨 미확인: remote 없음”. No AGENTS.md edit, commit or push.

## Case 4
Input: “AGENTS.md 선언만 초기화해줘”; existing other directives, workflow declaration absent; exact addition not shown or approved.

First response:
“`/fixture/project/AGENTS.md`의 기존 지침을 보존하고 파일 끝에 아래 선언을 추가하는 안을 제시합니다. 기존 끝과 선언 사이에 빈 줄 하나가 되도록 구분 줄바꿈을 추가합니다. 이 전문·경로·위치에 대한 명시적 승인 전에는 파일을 변경하지 않습니다.”

Proposed exact addition:

```markdown
## Git workflow

이 프로젝트는 git-workflow를 따른다.
Issue 생성 → plan 작성 → 별도 에이전트 구현 → 메인 독립 검증 → PR 검토 → 사용자 승인 후 머지 → Issue 종료 순서로 진행한다.

- 메인 에이전트는 Issue·plan, 구현 위임, 검증, PR 생성·검토, 승인 후 머지와 실제 머지 확인 뒤 Issue close·결과 기록을 조정한다. 직접 구현하지 않으며, 구현 전에 검토 기준·검증 입력을 고정하고 고정 상태를 확인한다. 고정이 미확인이면 구현 위임을 보류한다.
- Issue 기반 구현 요청에서는 이전 대화를 상속하지 않는 별도 구현 에이전트를 생성해 승인된 단계를 반복 지시 없이 위임한다. 위임 메시지에 공통 목적·유지할 결정·담당 범위와 읽기 순서(Issue → plan 공통 맥락·결정·단계 → 담당 task → handoff·공개 리뷰 지적)를 반드시 명시한다. 비공개 검토 기준·검증 입력은 구현자에게 전달하지 않는다.
- 구현 에이전트는 task-implement에 따라 구현·자체 테스트·결과 인계를 담당한다. 메인은 인계 결과를 고정 기준으로 독립 검증하며, 실패하면 구현자에게 수정을 위임한 뒤 재검증한다.
- 기본 역할 분리와 단계 진행은 요청 범위와 행동·대상별 승인을 따른다. 읽기 전용 질문·Issue 작성만 요청한 경우에는 구현으로 확대하지 않는다.
```

Action list:
- Read existing file, confirm target path and that no equivalent declaration or conflicting directives exist; conflicts require explanation and resolved addition approval.
- Show absolute path, full addition above, append placement, and separator; retain existing directives and byte content.
- Await explicit approval of this concrete proposal. Initial initialization request is explicitly not proposal approval.
- With no response, do not write, create directories, or assume timeout approval.
- Only after approval re-read file; if changed, propose and obtain approval for revised state; otherwise append only approved text and verify preservation.
- No templates, labels, commit, push, PR, or broader installation.
