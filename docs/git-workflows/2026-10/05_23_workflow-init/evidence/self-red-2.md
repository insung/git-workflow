# Baseline decision scenarios — self red 2

Read only baseline `skills/template-init/SKILL.md`, `skills/agents-init/SKILL.md`, and their `execution-boundaries.md` / `labels.md` references. The following are virtual first responses and proposed action lists. No fixture commands or mutations ran, and no questions were sent to a real user.

## Case 1

Input: `git workflow 설치해줘`. Clean Git repository `/fixture/project`, remote `example/project`, no `.github` or `AGENTS.md`, no selection response.

First response:

> 현재 정본에는 Issue·PR 템플릿 설치와 AGENTS.md 채택 선언 초기화가 각각 있습니다. `/fixture/project`에서 어느 범위를 설치할지 확인이 필요합니다. 템플릿, AGENTS.md 선언, 둘 다 중 원하는 범위를 알려주세요. 선언은 추가 전문과 위치를 제시한 뒤 명시적 승인을 받아야 합니다.

Action list:

1. 대상 루트·remote·브랜치·HEAD·작업본과 지침을 읽기 전용으로 확인한다.
2. 범용 `workflow-init` 같은 미존재 스킬이나 통합 설치 기본값을 만들지 않는다.
3. 선택 응답이 없으므로 템플릿 복사, AGENTS.md 생성, 원격 라벨 생성은 진행하지 않는다.
4. 대기 범위는 설치 항목 선택이다. baseline에는 통합 선택 절차나 설치 결과 상태가 정의되어 있지 않다.

## Case 2

Input: `라벨만 설치해줘`. Valid label definitions exist; `release` / `deployment` are absent, existing `bug` has custom metadata, write access confirmed.

First response:

> `/fixture/project`의 라벨 정의와 `example/project`의 실제 라벨 목록을 대조하겠습니다. 요청한 정의에서 누락된 `release`, `deployment`만 정의의 이름·설명·색상으로 생성하고 재조회하겠습니다. 기존 `bug`의 사용자 지정 메타데이터는 유지합니다.

Action list:

1. `labels.md`의 확인·생성 절차를 사용한다. baseline에 별도 라벨 설치 스킬이 있다고 주장하지 않는다.
2. 저장소 라벨 정의와 자동화 설정을 읽고 생성 범위를 누락된 두 라벨로 고정한다.
3. `gh label list --repo example/project --limit 1000 --json name,description,color`를 실행할 계획이다. 조회 실패나 제한 도달을 부재로 해석하지 않는다.
4. `release` / `deployment` 부재가 확인되면 제공된 정의의 메타데이터로 각각 `gh label create`한다. `--force`, 삭제, 기존 라벨 메타데이터 변경은 하지 않는다.
5. 재조회하여 생성과 기존 `bug` 보존을 확인한다. 템플릿·AGENTS.md는 변경하지 않는다.

## Case 3

Input: `template-init으로 템플릿 설치해줘`. Existing `.github/ISSUE_TEMPLATE/feature_request.md`; bug and PR missing; no remote.

First response:

> `template-init`을 적용하겠습니다. 기존 `feature_request.md`는 유지하고 정본과의 차이·필수 절을 확인합니다. 빠진 `BUG_REPORT.md`와 `PULL_REQUEST_TEMPLATE.md`만 복사하겠습니다. 라벨은 `미확인: remote 없음`으로 보고합니다.

Action list:

1. 대상 Git 루트·브랜치·HEAD·작업본과 지침을 확인한다. remote 부재는 복사를 막지 않는다.
2. PR 템플릿의 다른 위치나 폴더도 확인한다. 주어진 사례에서는 다른 PR 템플릿이 없다고 취급한다.
3. 소문자 `feature_request.md`를 기능 템플릿으로 인정한다. 대문자 `FEATURE_REQUEST.md`를 추가하지 않는다.
4. `.github/ISSUE_TEMPLATE/BUG_REPORT.md`와 `.github/PULL_REQUEST_TEMPLATE.md`만 정본에서 복사한다.
5. 기능 템플릿의 diff, 동의 절 근거, 판단 보류·누락 절을 보고한다. 내용이 제공되지 않았으므로 구체적인 차이나 누락을 지어내지 않는다.
6. 원격 라벨 조회·생성은 하지 않는다. AGENTS.md, 커밋, push는 범위에 포함하지 않는다.

## Case 4

Input: `AGENTS.md 선언만 초기화해줘`. Existing other directives, no adoption declaration; exact addition proposal not approved.

First response:

> `agents-init`을 적용합니다. 대상은 `/fixture/project/AGENTS.md`이며, 기존 지침을 유지한 채 파일 끝에 구분용 빈 줄 한 줄과 아래 전문을 추가하는 안입니다. 기존 지침과의 충돌 여부를 먼저 읽기 전용으로 확인합니다. 이 추가안을 승인하시겠어요? 최초 초기화 요청은 추가안 승인으로 간주하지 않으므로 승인 전에는 쓰지 않습니다.

Proposed full addition:

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

1. 기존 AGENTS.md를 읽고 동의 선언·충돌 여부를 확인한다. 제공된 기존 지침 전문이 없으므로 충돌 없음을 단정하지 않는다.
2. 절대 경로·추가 전문·끝 위치·구분 빈 줄을 제시한다.
3. 명시적 추가안 승인을 기다린다. 응답이 없으면 파일·디렉터리를 만들거나 수정하지 않는다.
4. 승인 후에는 다시 읽어 상태를 비교한다. 변경이 있으면 새 제안을 승인받고, 같으면 승인된 추가만 기존 바이트를 보존하여 쓴다.
5. 템플릿·라벨·커밋·push·PR은 실행하지 않는다.
