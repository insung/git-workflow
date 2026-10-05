# Baseline decision scenarios — self-red-1

Read only baseline `skills/template-init/SKILL.md`, `skills/agents-init/SKILL.md`, `skills/git-workflow/references/execution-boundaries.md`, and `skills/git-workflow/references/labels.md`. No virtual repository operations were executed. Actions below are simulations, not executed commands. No review branches or files were read.

## 1. Request: git workflow 설치해줘

First response supported by baseline: “대상 저장소의 상태와 기존 템플릿을 확인하겠습니다.” If routed to template-init, baseline proceeds to copying missing templates; if routed to agents-init, baseline instead presents a declaration proposal and waits for its explicit approval. The two supplied skills do not define a single workflow-install entry point, component selection response, or a default selection for this broad request. Therefore a unique integrated first response cannot be derived from the baseline alone.

Simulated template-init actions: inspect `/fixture/project` Git root, remote `example/project`, branch and worktree; create `.github/ISSUE_TEMPLATE`; copy FEATURE_REQUEST.md, BUG_REPORT.md and PULL_REQUEST_TEMPLATE.md; query enhancement/bug existence and report missing labels without creating them because this request does not expressly request label creation. No commit or push. Simulated agents-init actions, if separately invoked: show `/fixture/project/AGENTS.md`, the exact declaration and new-file placement; wait for explicit proposal approval and write nothing while no response is available. Baseline has no instruction requiring a component selection before template copying.

## 2. Request: 라벨만 설치해줘

First response: “example/project의 현재 라벨을 조회하고 필요한 누락 라벨과 생성 범위를 확인하겠습니다.”

Simulated actions: `gh label list --repo example/project --limit 1000 --json name,description,color`; inspect the provided valid definition and repository conventions; preserve the custom bug label and reuse its exact name if semantically equivalent; do not force-update or delete it. If release/deployment are required by that provided definition, their exact names/descriptions/colors and creation scope are fixed, and write rights are confirmed, create only those missing labels without `--force`, then requery to confirm. Baseline does not itself define a complete installable label set or designate release/deployment as mandatory; their creation is conditional on the supplied definition establishing need. No template or AGENTS changes. No question is required for already requested necessary missing label creation with confirmed rights.

## 3. Request: template-init으로 템플릿 설치해줘

First response: “기존 feature_request.md는 유지하고, 없는 버그·PR 템플릿을 설치하겠습니다.”

Simulated actions: inspect Git state and existing templates; compare feature_request.md case-insensitively against FEATURE_REQUEST.md and do not add an uppercase duplicate; read and diff the existing feature template, report actual differences and required-section evidence without changing it; create needed directories and copy BUG_REPORT.md and PULL_REQUEST_TEMPLATE.md if no other PR template location exists. Continue copying despite no remote. Report “라벨 미확인: remote 없음”; do not query or create labels. No AGENTS proposal or changes, commit or push. Contents of the existing feature template are unspecified, so specific missing sections cannot be asserted.

## 4. Request: AGENTS.md 선언만 초기화해줘

First response: present `/fixture/project/AGENTS.md`, the exact “추가 전문” from agents-init (the individual-project first sentence), and “기존 파일 끝에 구분용 줄바꿈을 두고 추가”; request explicit approval of that exact proposal. Existing other directives must first be read for conflicts; if they conflict, explain the conflicting text and ask whether to add rather than resolving it unilaterally.

Simulated actions: read existing AGENTS; preserve all directives, assume no conflict only if reading confirms it; show the complete declaration below verbatim from baseline. Initial request is expressly not proposal approval. With no exact proposal approval, do not create directories or modify AGENTS. After a later explicit approval, reread and compare state; if unchanged append only the approved declaration while preserving existing bytes. No templates, labels, commit, push, PR, or installation of other components.

### Exact declaration proposed in scenario 4

```markdown
## Git workflow

이 프로젝트는 git-workflow를 따른다.
Issue 생성 → plan 작성 → 별도 에이전트 구현 → 메인 독립 검증 → PR 검토 → 사용자 승인 후 머지 → Issue 종료 순서로 진행한다.

- 메인 에이전트는 Issue·plan, 구현 위임, 검증, PR 생성·검토, 승인 후 머지와 실제 머지 확인 뒤 Issue close·결과 기록을 조정한다. 직접 구현하지 않으며, 구현 전에 검토 기준·검증 입력을 고정하고 고정 상태를 확인한다. 고정이 미확인이면 구현 위임을 보류한다.
- Issue 기반 구현 요청에서는 이전 대화를 상속하지 않는 별도 구현 에이전트를 생성해 승인된 단계를 반복 지시 없이 위임한다. 위임 메시지에 공통 목적·유지할 결정·담당 범위와 읽기 순서(Issue → plan 공통 맥락·결정·단계 → 담당 task → handoff·공개 리뷰 지적)를 반드시 명시한다. 비공개 검토 기준·검증 입력은 구현자에게 전달하지 않는다.
- 구현 에이전트는 task-implement에 따라 구현·자체 테스트·결과 인계를 담당한다. 메인은 인계 결과를 고정 기준으로 독립 검증하며, 실패하면 구현자에게 수정을 위임한 뒤 재검증한다.
- 기본 역할 분리와 단계 진행은 요청 범위와 행동·대상별 승인을 따른다. 읽기 전용 질문·Issue 작성만 요청한 경우에는 구현으로 확대하지 않는다.
```

Simulated approval prompt: “위 전문을 /fixture/project/AGENTS.md 끝에 구분용 줄바꿈을 두고 추가해도 될까요?” No real user question was sent.
