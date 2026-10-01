# 02 독립 검토 플로우

계획: [plan의 단계 표](plan.md#단계)

## 변경 대상

| 구분 | 경로 | 이유 |
| --- | --- | --- |
| Create | `skills/plan-create/references/review-criteria.md` | 검토 기준과 검증 입력의 양식·작성 규칙 |
| Modify | `skills/plan-create/SKILL.md` | 구현 전에 검토 기준·검증 입력을 만드는 절차와 보관 위치 |
| Modify | `skills/plan-create/references/plan.md` | 디렉토리 규칙의 검토 기준·검증 입력 행 |
| Modify | `skills/pr-review/SKILL.md` | 검토 기준으로 판정, 검증 입력으로 다시 실행, 구현 세션 결과는 참고로만 사용. `:10` 중첩 호출 문장 정리 |
| Modify | `skills/pr-review/references/review.md` | 고정 입력의 재실행 결과를 적는 칸 |
| Modify | `skills/git-workflow/references/execution-boundaries.md` | 검증 실행 주체(현재 세션·하위 에이전트)의 정의. 위치는 작업 3에서 확정 |
| Modify | `skills/commit-rule/SKILL.md` 또는 `skills/pr-review/SKILL.md` | review.md 기록 뒤 커밋 시점과 범위. 위치는 작업 4에서 확정 |

## 작업

| # | 작업 | 완료 | 처리 내용 |
| --- | --- | --- | --- |
| 1 | D2(보관 위치) 결정 | [x] | 별도 리뷰 브랜치 `review/issue-{n}`. 이번 Issue는 `review/issue-4` (plan 결정과 변경 기록) |
| 2 | 변경 전 시나리오(RED): 현재 pr-review로 TC-02 실행, 결과 기록 | [ ] | |
| 3 | plan-create에 검토 기준·검증 입력 양식과 작성 절차 추가. Issue #1의 `review-criteria.md`·`review-input-*.md`(main의 4fff0ca) 구성을 기준으로 함 | [ ] | |
| 4 | pr-review에 검토 기준·검증 입력 재실행 절차 추가, 중첩 호출 문장과 검증 실행 주체 정리 | [ ] | |
| 5 | review.md 기록 뒤 검토 기준·검증 입력·review.md의 커밋 시점과 범위 정의 | [ ] | |
| 6 | 변경 후 시나리오(GREEN) 실행, 커밋 | [ ] | |

## 검증

| 사례 | AC | 명령·작업 디렉토리 | 기대 결과 | 결과 |
| --- | --- | --- | --- | --- |
| <a id="tc-02"></a>TC-02 | AC-04, AC-05, AC-06 | 하위 에이전트에 pr-review 스킬, 가상 PR(테스트 누락), `review-criteria.md`, `review-input-<topic>.md`, 구현 세션의 다른 결과를 주고 3회 실행. 변경 전·후 각각, scratchpad 저장소 | 변경 후 3회 모두 검토 기준의 AC별 기준으로 판정하고 고정 입력으로 다시 실행. 구현 세션 결과를 판정 근거로 쓰지 않음 | 미실행 |
| <a id="tc-03"></a>TC-03 | AC-07, AC-08 | `grep -rn "중첩 호출\|하위 에이전트" skills`, 커밋 시점 규칙 검색, 리포 루트 | 검증 실행 주체 정의가 정본 한 곳에만 있고 다른 곳은 링크. review.md 커밋 시점·범위 규칙 존재 | 미실행 |

## 제외 범위

- task-implement의 읽기 금지 규칙 (03 단계)
- 예제의 검토 기준·검증 입력 파일 (05 단계)
- 파일 접근의 권한·hook 차단
