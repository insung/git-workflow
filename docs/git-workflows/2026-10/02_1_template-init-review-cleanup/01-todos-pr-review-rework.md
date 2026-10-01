# 01 pr-review 재구성과 spec-it 분리

계획: [plan의 단계 표](plan.md#단계)

## 변경 대상

| 구분 | 경로 | 이유 |
| --- | --- | --- |
| Create | `skills/pr-review/references/spec-it-policy.md` | manifest/lock이 있는 프로젝트 전용 정책 검사 |
| Modify | `skills/pr-review/SKILL.md` | 의도 파악 → 구현 대조 → 테스트 누락 확인 순서, description 한정(T2) |
| Modify | `skills/pr-review/references/review.md` | AC·todo별 테스트 대조 표 중심 |
| Modify | `skills/pr-create/references/handoff.md`, `skills/git-workflow/references/execution-boundaries.md`, `skills/pr-merge/SKILL.md`, `docs/examples/python-version-upgrade/review.md` | spec-it 항목 조건부 표기 |

## 작업

| # | 작업 | 완료 | 처리 내용 |
| --- | --- | --- | --- |
| 1 | 테스트 하나를 뺀 가상 PR 입력을 만들고 현재 pr-review로 기준 동작 기록 (TC-01 변경 전) | [ ] | |
| 2 | SKILL.md를 검토 대상 고정 → 의도 파악 → 구현 대조 → 테스트 누락 확인 → 조건부 정책 검사 → 결과 순서로 재작성. Issue·plan 없는 검토와 review.md 작성 주체는 조건 하나씩으로 정리 | [ ] | |
| 3 | spec-it 절차를 spec-it-policy.md로 분리하고 없는 runner 참조 제거 | [ ] | |
| 4 | review.md 양식을 Issue AC ID별 기대 시나리오·구현 위치·테스트·결과·누락 표 중심으로 개편. Issue의 AC ID 중 todo 검증에 없는 ID를 테스트 누락으로 판정 | [ ] | |
| 5 | 다른 문서의 spec-it 항목을 채택 프로젝트 조건부로 변경 | [ ] | |

## 검증

| 사례 | AC | 명령·작업 디렉토리 | 기대 결과 | 결과 |
| --- | --- | --- | --- | --- |
| <a id="tc-01"></a>TC-01 | AC-04, AC-05, AC-06 | 하위 에이전트에 같은 가상 PR 입력과 pr-review를 주고 변경 전·후 각 3회 실행 | 변경 후 3회 모두 빠진 실패 사례 테스트를 지적 | 미실행 |
| <a id="tc-02"></a>TC-02 | AC-04 | `wc -w skills/pr-review/SKILL.md`, 리포 루트 | 500 이하 | 미실행 |
| <a id="tc-03"></a>TC-03 | AC-05, AC-07 | `grep -rn "spec_it_verify\|local-verification" skills docs/examples README.md README.ko.md`, 리포 루트 | 결과 없음 | 미실행 |

## 제외 범위

- template-init과 README 변경 (02·04 단계)
- spec-it 저장소 수정
