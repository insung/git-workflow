---
name: task-implement
description: '“plan의 01 단계를 구현해줘”, “Issue #12 todo를 이어서 구현해줘”처럼 준비된 plan·todo의 단계 구현을 요청할 때 사용한다. 계획 작성에는 쓰지 않는다.'
---

# 단계 구현

[공통 실행 경계](../git-workflow/references/execution-boundaries.md)를 적용한다.
기록은 [문체](../git-workflow/references/writing-conventions.md), 커밋은 [commit-rule](../commit-rule/SKILL.md)을 따른다.
구현 진행과 todo 칸 기록 규칙의 정본이다.

## 입력

| 구분 | 대상 |
| --- | --- |
| 읽음 | Issue의 의도·달성 조건, plan.md(단계 표·결정과 변경 기록·전달과 롤백), 현재 단계의 `task-{nn}-{step-title}.md`, 기존 handoff.md |
| 읽지 않음 | `review/issue-{n}` 브랜치와 그 worktree, `review-criteria.md`, `review-input-<topic>.md` ([보관 위치](../plan-create/references/review-criteria.md#보관-위치)) |

읽지 않음 대상은 checkout·`git show`·`git diff`·grep·목록 조회로도 열지 않는다.
대화로 그 내용을 받으면 구현과 자기 검증의 근거로 쓰지 않고 handoff.md에 그 사실을 기록한다.

| 상태 | 반환 |
| --- | --- |
| Issue에 의도·영향 범위·달성 조건 부족 | [issue-create](../issue-create/SKILL.md) |
| plan·task 파일 없음, 작업·검증 표 부족 | [plan-create](../plan-create/SKILL.md) |
| 구현 방식에 영향을 주는 결정이 `보류` | 그 단계만 보류하고 사용자에게 결정 요청 |

## 절차

1. 대상 확인
   - 브랜치·HEAD·staged·미커밋 변경을 확인한다.
   - plan 단계 표의 순서대로 진행한다. 요청 단계 앞에 미완료 단계가 있으면 그 상태를 보고하고 진행 여부를 확인한다.
2. 작업 진행
   - task 파일 작업 표의 `#` 순서대로 한 행씩 진행한다.
   - 준비된 작업만 구현한다. 다른 단계의 변경 대상과 제외 범위는 바꾸지 않는다.
   - 의미 있는 테스트와 assertion을 만들고 검증 표의 명령을 실행한다.
3. 스킬 지시 변경의 시나리오 (변경 대상이 `SKILL.md`·`references/`·`assets/`의 지시일 때)
   - 변경 전(RED): 지시를 바꾸기 전 커밋의 스킬로 검증 표의 시나리오를 실행한다.
   - 변경 후(GREEN): 바꾼 커밋의 스킬로 같은 입력의 시나리오를 실행한다.
   - 실행 주체와 실행자에게 주는 입력은 [검증 실행 주체](../git-workflow/references/execution-boundaries.md#검증-실행-주체)의 구현 세션 행을 따른다.
   - 기록: 처리 내용에 RED·GREEN 각각의 스킬 커밋과 통과 횟수(예: 0/3, 3/3). 실행하지 못하면 `미실행`과 이유.
4. 기록: 아래 [기록 규칙](#기록-규칙)에 따라 task 파일과 plan을 갱신한다.
5. 커밋: 커밋이 요청·승인됐으면 commit-rule로 단계마다 주제별로 커밋한다.
   - 구현 커밋과 task 파일·plan 기록만 바꾸는 커밋을 나눈다. scope는 [scope 선정](../git-workflow/references/change-conventions.md#scope-선정)을 따른다.
   - 커밋하지 않았다면 변경 파일과 patch 또는 digest를 기록한다. 확인할 수 없는 작업본 상태는 한계를 적는다.
6. 계획 이탈: plan과 다르게 처리한 변경은 plan 결정과 변경 기록에 구분 `계획 이탈` 행을 추가한다.
   - 내용: 바꾼 것·이유·영향 AC·단계. 기존 행은 수정하지 않는다.
   - task 파일 처리 내용에도 이유를 쓴다.
7. handoff.md: 단계를 마칠 때마다 [handoff 계약](../pr-create/references/handoff.md)으로 plan의 작업 디렉토리에 작성하거나 갱신한다. handoff.md 작성의 정본이다.
   - 사례별 기대·실제 결과, 명령·실행 위치·환경·시각, 대상 소스와 커밋.
   - 커밋 이후 문서만 바뀌었다면 코드 검증 결과와 구분한다.
8. 완료와 인계
   - 모든 단계 뒤 plan의 최종 검증을 실행하고 남은 배포 조건을 확인한다.
   - [pr-create](../pr-create/SKILL.md)로 전달한다. 다른 세션에 인계하면 실제 문서 위치와 필요한 환경을 전달한다.
   - Issue에는 승인 범위에서 요약과 확인된 문서 링크만 게시한다.
   - 구현 완료와 검토 완료를 구분한다.

## 기록 규칙

| 대상 | 시점 | 기록 |
| --- | --- | --- |
| 작업 표 `완료`·`처리 내용` | 작업을 마칠 때 | `[x]`, 한 줄 요약과 커밋. 계획과 다르게 처리했으면 이유 |
| 검증 표 `결과` | 사례를 실행할 때 | 통과·실패와 실행 커밋. 실행하지 않은 사례는 `미실행`. 완료 표시는 실행 증거가 아님 |
| 검증 표 `결과` | 소스가 다시 바뀔 때 | 영향받는 사례를 `미실행`으로 되돌림. 이전 결과는 handoff.md에 해당 커밋의 이력으로 남김 |
| handoff.md | 사례를 실행할 때 | 명령 출력 요약·환경·시각 등 상세 실행 근거 |
| plan 단계 표 `완료` | 단계의 모든 작업과 검증이 끝날 때 | `[x]` |
| plan 결정과 변경 기록 | 계획 이탈이 생길 때 | `계획 이탈` 행 추가 |

커밋 hash는 다음 커밋에서 기록한다. 자기 hash를 같은 커밋 파일에 넣으려고 amend를 반복하지 않는다.
