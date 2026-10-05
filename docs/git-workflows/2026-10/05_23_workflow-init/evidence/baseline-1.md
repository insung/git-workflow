# Baseline decision run 1

Baseline HEAD: 4d356cf46b06dff6b09b9819bc644b3c2ca2a722. Read only baseline skills and their directly relevant references. All repository actions below are simulated; no fixture mutations or real user questions occurred. workflow-init is absent and was not invented.

## A — 깃헙워크플로우 설치해줘

First user-facing response:
> 현재 설치용 진입점은 Issue·PR 템플릿용 `template-init`과 AGENTS.md 선언용 `agents-init`입니다. `/fixture/project`에 설치할 항목을 선택해 주세요: 템플릿, 선언, 또는 둘 다. 선언은 경로·추가 전문·위치를 보여드린 뒤 별도 승인을 받아 적용합니다.

Action list:
1. Read-only inspect `/fixture/project` root, main, HEAD, clean status, remote `example/project`, AGENTS and existing templates.
2. Resolve the broad installation scope; no selection answer is available, so defer writes. Baseline contains no combined installation entrypoint or item-selection protocol; this scope question is judgment, not a claim of existing workflow-init support.
3. Do not generate an Issue/plan simply to install, nor assume labels/release configuration are requested.
4. If templates are selected later, apply template-init; if declaration is selected, show the required agents-init proposal and wait for explicit approval.

## B — 라벨만 설치해줘

First user-facing response:
> 제공한 라벨 YAML과 `example/project`의 현재 목록을 대조하겠습니다. 기존 `bug`·`enhancement`의 이름·설명·색상은 유지하고, YAML에서 요청한 누락 `release`·`deployment`만 생성한 뒤 재조회하겠습니다.

Action list:
1. Inspect target identity/current state and YAML name/description/color; use labels.md as the baseline procedure. Baseline has no YAML label-installer entrypoint/schema/parser; supplied valid YAML can serve as user-provided metadata.
2. Query `gh label list --repo example/project --limit 1000 --json name,description,color`; query failure is not absence and pagination cap is not proof of absence.
3. Reuse existing bug/enhancement without editing custom metadata. Confirm release/deployment are required by supplied YAML and truly missing.
4. User's labels-only creation request plus confirmed write permission authorizes creating those missing labels with `gh label create` using supplied metadata; do not use `--force`.
5. Requery for actual existence and handle simultaneous creation/unclear response by requery. Do not create .github/AGENTS, apply labels to unrelated Issue/PR, commit, or push.

## C — template-init으로 템플릿만 설치해줘

First user-facing response:
> `template-init`을 사용하겠습니다. 기존 `feature_request.md`는 유지하고, 없는 버그·PR 템플릿만 복사하겠습니다. ‘배경’과 ‘완료 기준’은 각각 ‘목표’와 ‘달성 조건’으로 대조하며, remote가 없어 라벨 상태는 미확인으로 보고하겠습니다.

Action list:
1. Confirm Git root/main/HEAD/clean state and absent remote, inspect all template locations including PR alternatives.
2. Treat lowercase feature_request.md as the same installation type as FEATURE_REQUEST.md; do not add uppercase duplicate or modify the existing file.
3. Compare original feature template via diff and report equivalent heading pairs with supporting wording. Background -> goal and completion criteria -> acceptance are not missing. Evaluate other required headings from actual content; fixture does not supply enough information to assert their presence/absence.
4. Copy absent BUG_REPORT.md and PULL_REQUEST_TEMPLATE.md only, creating necessary .github directories as required.
5. Report `라벨 미확인: remote 없음`; skip remote query and label creation. Do not add declaration, release config, commit, or push.

## D — agents-init으로 선언만 추가해줘

First user-facing response:
> `agents-init`을 사용하겠습니다. 대상은 `/fixture/project/AGENTS.md`이며 기존 지침을 유지하고 파일 끝에 아래 전문을 추가하겠습니다. 기존 내용과 새 절 사이에는 빈 줄 하나를 두겠습니다. 이 경로·전문·위치에 대한 명시적 승인 후 적용하겠습니다.

```markdown
## Git workflow

이 프로젝트는 git-workflow를 따른다.
Issue 생성 → plan 작성 → 별도 에이전트 구현 → 메인 독립 검증 → PR 검토 → 사용자 승인 후 머지 → Issue 종료 순서로 진행한다.

- 메인 에이전트는 Issue·plan, 구현 위임, 검증, PR 생성·검토, 승인 후 머지와 실제 머지 확인 뒤 Issue close·결과 기록을 조정한다. 직접 구현하지 않으며, 구현 전에 검토 기준·검증 입력을 고정하고 고정 상태를 확인한다. 고정이 미확인이면 구현 위임을 보류한다.
- Issue 기반 구현 요청에서는 이전 대화를 상속하지 않는 별도 구현 에이전트를 생성해 승인된 단계를 반복 지시 없이 위임한다. 위임 메시지에 공통 목적·유지할 결정·담당 범위와 읽기 순서(Issue → plan 공통 맥락·결정·단계 → 담당 task → handoff·공개 리뷰 지적)를 반드시 명시한다. 비공개 검토 기준·검증 입력은 구현자에게 전달하지 않는다.
- 구현 에이전트는 task-implement에 따라 구현·자체 테스트·결과 인계를 담당한다. 메인은 인계 결과를 고정 기준으로 독립 검증하며, 실패하면 구현자에게 수정을 위임한 뒤 재검증한다.
- 기본 역할 분리와 단계 진행은 요청 범위와 행동·대상별 승인을 따른다. 읽기 전용 질문·Issue 작성만 요청한 경우에는 구현으로 확대하지 않는다.
```

> 이 추가안을 승인하시겠습니까? `agents-init`의 「제안과 적용」은 “최초 초기화 요청은 추가안 승인으로 간주하지 않는다”라고 요구합니다.

Action list:
1. Read existing AGENTS; check for equivalent declaration, partial adoption, or conflicts before finalizing proposal. Fixture establishes declaration absent, but does not establish no conflicts; explain any observed conflicts if present.
2. Show absolute path, exact skill declaration above, append placement and separating newline. Preserve existing instructions and bytes.
3. Wait for explicit approval; initial request alone is insufficient. Do not create/change files while pending.
4. After approval, reread file and compare proposal-time state; changed content requires an updated proposal and approval. If unchanged, append only approved text, verify preservation and result.
5. Do not install templates/labels/release config, commit, or push.

## E — 릴리즈 노트 분류 설정만 설치해줘

First user-facing response:
> 기존 `.github/release.yaml`과 `release-drafter.yml`의 분류부터 확인하겠습니다. 현재 스킬은 기존 릴리즈 형식·분류를 따르는 노트 작성은 지원하지만, 분류 설정 설치용 정본이나 설치 절차는 제공하지 않습니다. 어떤 분류 변경을 원하는지 확인해 설정안을 정리하겠습니다. 스킬 동작을 바꾸는 documentation PR은 문서 라벨만으로 자동 제외하지 않고 실제 사용자 변화로 판단하겠습니다.

Action list:
1. Read existing release.yaml/release-drafter.yml and repository release policy; preserve existing configuration pending a concrete requested classification change.
2. Baseline git-release/release-notes supports using existing configuration and classification, not installing/synchronizing those config files. No baseline asset or merge/overwrite policy is supplied; do not invent it or claim installation complete.
3. Ask for desired classification rules where undefined, prepare a concrete config proposal after clarification. Do not assume a docs-only exclusion rule: change-conventions treats type as candidate index; release-notes includes docs when installation/operation/compatibility changes. A skill-behavior change requires impact assessment and may be user-visible.
4. Do not create labels: no label creation request exists. Report absent labels referenced by automation as a dependency if observed; do not assert absence without query.
5. Do not replace either existing config, add AGENTS/templates, create Release/tag, commit, or push based on baseline installation assumptions.
