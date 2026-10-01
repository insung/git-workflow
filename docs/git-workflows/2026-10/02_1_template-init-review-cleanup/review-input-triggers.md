# TC-06 고정 입력: 트리거 판정

변경된 description이 요청마다 한 스킬로 수렴하는지 확인하는 입력이다. 하위 에이전트에 「후보 스킬」의 이름과 YAML로 파싱한 현재 description, 요청문 하나를 주고 “이 요청에 쓸 스킬 하나를 고르고, 해당하는 스킬이 없으면 없음이라고 답해”라고 묻는다. 「기대 스킬」 열은 에이전트에게 주지 않는다.

## 원래 지적 T1~T7

첫 리뷰 시점(커밋 8b6366b)의 description 문구다.

| ID | 위치와 원래 문구 | 문제 |
| --- | --- | --- |
| T1 | `skills/commit-rule/SKILL.md:3` “커밋 메시지를 검토해줘”, `skills/pr-review/SKILL.md:3` “커밋의 코드와 테스트를 검토해줘” | 둘 다 “커밋 … 검토”. 구분 문장은 `skills/git-workflow/SKILL.md:26`에만 있어 선택 시점에 보이지 않음 |
| T2 | `skills/pr-review/SKILL.md:3` “PR을 리뷰해줘”, “diff를 검증해줘” | 일반 코드 리뷰 스킬(code-review 등)과 겹침 |
| T3 | `skills/git-release/SKILL.md:3` “Git 이력 요약이나 릴리즈 준비·발행” | 일반 커밋 요약에도 릴리즈 스킬이 선택됨. 배포 PR 요약을 git-release와 pr-create가 함께 맡음 |
| T4 | `skills/plan-create/SKILL.md:3` “todo를 만들어줘” | 일반 할 일 목록 요청과 겹침 |
| T5 | `skills/branch-strategy/SKILL.md:3` “feature 브랜치를 만들어줘” | 단순 생성 요청에도 전략 확인 절차가 먼저 실행됨 |
| T6 | `skills/git-workflow/SKILL.md:3` “계획 구현” | plan-create의 계획 작성과 헷갈리고 “재개” 트리거가 없음 |
| T7 | `skills/issue-create/SKILL.md:3` “기존 이슈를 확인해줘” | 단순 조회에도 생성 스킬이 선택됨 |

## 후보 스킬

git-workflow의 10개 스킬(git-workflow, issue-create, plan-create, pr-create, pr-review, pr-merge, commit-rule, branch-strategy, git-release, template-init)과 아래 경쟁 스킬을 함께 준다.

| 경쟁 스킬 | 겹치는 요청 |
| --- | --- |
| code-review | 일반 diff·PR 리뷰 |
| productivity:task-management | 일반 할 일 목록 |
| init | CLAUDE.md 생성 |

## 요청과 기대 스킬

| # | 관련 | 요청문 | 기대 스킬 | 고르면 안 되는 스킬 |
| --- | --- | --- | --- | --- |
| R1 | T1 | 커밋 메시지를 검토해줘 | commit-rule | pr-review |
| R2 | T1 | 이 커밋의 코드와 테스트가 Issue 의도대로인지 검토해줘 | pr-review | commit-rule |
| R3 | T2 | Issue #12 기준으로 PR #34가 계획대로 구현됐는지 리뷰해줘 | pr-review | code-review |
| R4 | T2 | 이 diff의 코드 스타일만 봐줘 | code-review | pr-review |
| R5 | T3 | 최근 커밋 요약해줘 | 없음 | git-release |
| R6 | T3 | v1.2.0 릴리즈 노트 작성해줘 | git-release | pr-create |
| R7 | T4 | 오늘 할 일 todo를 만들어줘 | productivity:task-management | plan-create |
| R8 | T4 | Issue #12 계획의 todo를 만들어줘 | plan-create | productivity:task-management |
| R9 | T5 | dev에서 feature/retry 브랜치를 만들어줘 | branch-strategy | - |
| R10 | T6 | Issue #12 작업 이어서 진행해줘 | git-workflow | plan-create |
| R11 | T7 | 이 작업 전에 같은 내용의 이슈가 있는지 확인해줘 | issue-create | - |
| R12 | T7 | 열린 이슈 목록 보여줘 | 없음 | issue-create |
| R13 | 신규 | 이 프로젝트에 이슈·PR 템플릿 설정해줘 | template-init | init |
| R14 | 신규 | 이 프로젝트에 CLAUDE.md 만들어줘 | init | template-init |

R9는 스킬 선택 외에 동작도 확인한다. 생성만 요청했으므로 base 확인 뒤 바로 브랜치를 만들고 전략 질문을 하지 않아야 한다.

## 통과 기준

| 기준 | 조건 |
| --- | --- |
| 필수 | R1~R14 각각 3회 모두 기대 스킬 |
| 필수 | 변경 전 description으로 실행한 결과(RED)가 함께 기록됨 |
| 참고 | 변경 전 결과에서 T1~T7 관련 요청 중 하나 이상이 기대와 다름. 모두 같다면 해당 지적은 실제 문제가 아니었다고 기록 |
