# 03 검증과 인계

계획: [plan의 단계 표](plan.md#단계)

## 변경 대상

| 구분 | 경로 | 이유 |
| --- | --- | --- |
| Modify | `scripts/check-package.mjs` | PR 전용 reference 필수 검사 |
| Test | `tests/package.test.mjs` | 완전한 fixture 갱신과 신규 reference 누락 회귀 |
| Modify | `docs/git-workflows/2026-10/02_6_pr-review-comments/plan.md` | 단계 완료·결정과 이탈 기록 |
| Modify | `docs/git-workflows/2026-10/02_6_pr-review-comments/01-todos-comment-contract.md` | 실제 처리·검증 결과 기록 |
| Modify | `docs/git-workflows/2026-10/02_6_pr-review-comments/02-todos-skill-integration.md` | 실제 처리·검증 결과 기록 |
| Modify | `docs/git-workflows/2026-10/02_6_pr-review-comments/03-todos-comment-validation.md` | 실제 처리·검증 결과 기록 |
| Create | `docs/git-workflows/2026-10/02_6_pr-review-comments/handoff.md` | 실행 근거와 미확인 사항 인계 |

## 작업

| # | 작업 | 완료 | 처리 내용 |
| --- | --- | --- | --- |
| 1 | 신규 reference의 필수성은 누락 fixture 실패·완전 fixture 성공으로 검증 | [x] | 완전 fixture 성공과 pr-comment 누락 오류 탐지, 22/22 |
| 2 | 기존 패키지 검사·전체 테스트·공백 검사 실행 | [x] | 패키지·전체 22테스트·diff 공백 검사 실행 |
| 3 | 구현자 자체 fixture로 최초·재검토·중복·무승인·HEAD 변경·링크 대기·응답 불명 시나리오 확인 | [x] | handoff S01~S17 mock 입력 직접 규칙 대조 |
| 4 | 실제 명령·위치·HEAD·미커밋 변경 digest·환경·시각·결과를 handoff에 기록. 미실행은 그대로 유지 | [x] | handoff에 HEAD·7파일 digest·명령·환경·시각 기록 |
| 5 | 단계 todo의 처리 내용·결과와 plan 상태 갱신. 커밋 미승인으로 작업본 상태 명시 | [x] | todo 완료, plan review-pending; 미커밋 |
| 6 | 독립 검토 입력을 읽지 않고 결과를 원래 계획과 AC별로 인계. 검토 결과 파일은 작성하지 않음 | [x] | 독립 자료 미열람; 독립 review 미작성 |

## 검증

| 사례 | AC | 명령·작업 디렉토리 | 기대 결과 | 결과 |
| --- | --- | --- | --- | --- |
| <a id="tc-01"></a>TC-01 | AC-08 | node scripts/check-package.mjs; node --test tests/package.test.mjs (각각 실행), 리포 루트 | 정상 패키지 통과, 신규 reference 누락 사례 실패 탐지 | 패키지 exit 0; 테스트 22/22, 완전/누락 fixture 대조 성공 — [handoff](handoff.md#검증-요약과-증거) 참조 |
| <a id="tc-02"></a>TC-02 | AC-01~08 | 자체 시나리오·git diff --check·정본/상대 링크 검사, 리포 루트 | 요구 동작과 기록 일치, 로컬 실행 증거만 주장, 독립 검토는 미실행 유지 | 자체 대조 완료 — [handoff](handoff.md#자체-시나리오) 참조; 독립 검토 아님 |

## 제외 범위

- 독립 리뷰 기준·입력 열람 또는 수정
- review.md 작성·리뷰 pass 자체 선언
- 커밋·push·PR·게시·머지
