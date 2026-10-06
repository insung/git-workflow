# 01 issue-close 스킬 작성

계획: [plan의 단계 표](plan.md#단계)

## 변경 대상

| 구분 | 경로 | 이유 |
| --- | --- | --- |
| Create | `skills/issue-close/SKILL.md` | 종료 사유 선택·승인·종료·재확인 절차 |
| Create | `skills/issue-close/references/closing-comment.md` | 사유별 종료 코멘트 양식 |
| Modify | `skills/git-workflow/references/execution-boundaries.md` | 결과 상태 표에 `close-unconfirmed` 추가 |

## 작업

| # | 작업 | 완료 | 처리 내용 |
| --- | --- | --- | --- |
| 1 | 종료 사유 판정 기준 작성: 모든 AC 충족 → completed, 진행하지 않기로 결정 → not planned, 같은 해결 범위의 Issue 존재 → duplicate | [x] | `SKILL.md` 「## 2. 종료 사유 선택」 표 |
| 2 | 완료 코멘트 양식 작성: 해결 PR·merge commit, AC별 충족 여부와 근거 링크, 배포 상태, 후속 Issue | [x] | `references/closing-comment.md` 「## completed」 |
| 3 | not planned(결정 사유·결정 주체·대안)와 duplicate(정본 Issue·옮긴 정보) 코멘트 양식 작성 | [x] | `references/closing-comment.md` 「## not planned」「## duplicate」 |
| 4 | 종료 차단 조건 작성: 미충족 AC, 머지 미확인, 근거 링크 없음 → completed 금지, 사용자 결정 요청 | [x] | `SKILL.md` 「### completed 차단 조건」 |
| 5 | 이미 닫힌 Issue 처리 작성: 재오픈 없이 `gh issue comment`로 결과 보완, 사유가 다르면 보고 | [x] | `SKILL.md` 「## 4. 이미 닫힌 Issue」 |
| 6 | 종료 뒤 `gh issue view --json state,stateReason,comments` 재확인과 `close-unconfirmed` 상태 정의 | [x] | `SKILL.md` 「## 5. 재확인」, 결과 상태 표에 `close-unconfirmed` 추가 |
| 7 | 체크하지 않은 task 항목(`- [ ]`) 확인: 종료 전 항목과 근거를 사용자에게 알리고, 근거와 승인이 있는 항목만 체크. 남아 있으면 completed 차단 | [x] | `SKILL.md` 「## 1. 상태 확인」 3문장, 「### completed 차단 조건」 1항목, 「## 출력」 1문장 추가 |

## 검증

| 사례 | AC | 명령·작업 디렉토리 | 기대 결과 | 결과 |
| --- | --- | --- | --- | --- |
| <a id="tc-01"></a>TC-01 | AC-01 | `grep -n -- "--reason\|--duplicate-of" skills/issue-close/SKILL.md`, 리포 루트 | completed·not planned·duplicate 세 사유의 명령이 모두 있음 | 통과 (41d78c0 + 미커밋 작업본) |
| <a id="tc-02"></a>TC-02 | AC-02 | `skills/issue-close/references/closing-comment.md` 읽기 | 완료 양식에 PR·merge commit·AC별 결과·배포 상태·후속 Issue 항목이 있음 | 통과 (41d78c0 + 미커밋 작업본) |
| <a id="tc-03"></a>TC-03 | AC-03 | `skills/issue-close/SKILL.md` 읽기 | 미충족 AC·머지 미확인일 때 completed로 닫지 않고 사용자 결정을 요청하는 규칙이 있음 | 통과 (41d78c0 + 미커밋 작업본) |
| <a id="tc-04"></a>TC-04 | AC-04 | `skills/issue-close/SKILL.md` 읽기 | 이미 닫힌 Issue에 재오픈 없이 코멘트만 보완하는 절차가 있음 | 통과 (41d78c0 + 미커밋 작업본) |
| <a id="tc-05"></a>TC-05 | AC-05 | `grep -n "close-unconfirmed" skills/issue-close/SKILL.md skills/git-workflow/references/execution-boundaries.md`, 리포 루트 | 두 파일 모두에 있음, 재확인 명령이 SKILL.md에 있음 | 통과 (41d78c0 + 미커밋 작업본) |
| <a id="tc-12"></a>TC-12 | AC-08 | `grep -n "체크하지 않은 task" skills/issue-close/SKILL.md`, 리포 루트 | 「## 1. 상태 확인」, 「### completed 차단 조건」, 「## 출력」 세 곳에 있음 | 초기 초안 정적 대조 통과. 현재 목록 표기·들여쓰기와 코드 예시 제외까지 보완; 현재 근거는 handoff 참조 |

## 제외 범위

- 단계 표·pr-merge·README·패키지 검사 연결 (02 단계)
- Issue 재오픈 절차

## 현재 작업본 자체 검증 기록

- 실행 시각(UTC): 2026-10-02T02:45:13.298187+00:00; 기준 HEAD `41d78c0093e568317c7cae89e4de7d1f79e2fb6e` + 미커밋 작업본. 실제 커밋 없음.
- 환경: Node v23.11.0, gh 2.101.0. `node scripts/check-package.mjs` exit 0, `node --test tests/package.test.mjs` 22 pass / 0 fail, `git diff --check` exit 0.
- 문서 사례는 정적 대조다. 실제 종료·코멘트·assignee·GitHub 공동 작성자 표시 실행 증거는 아니다. 최종 내용 식별과 파일 목록은 [실행 요약](05-todos-issue-housekeeping.md#실행-결과-요약)에 기록한다.

## AC-05 게시 실패 분기 보완 — 2026-10-02T09:18:03.754378+00:00

독립 행동 검증에서 이미 CLOSED/COMPLETED인 Issue의 결과 코멘트 게시 실패가 정본 상태로 보고되지 않는 사례가 전달되었다. §3 게시 실패·미확인과 §4 이미 닫힌 보완 결과를 §5 재확인에 연결했다. §5는 state·stateReason·게시한 코멘트 중 하나라도 미확인이면 이미 닫힌 Issue에서도 공통 정본 close-unconfirmed로 멈추고 확인하지 못한 항목·게시 오류를 보고한다. 새 상태를 만들지 않았다.

현재 package checker exit 0, diff check exit 0. 문서 분기 정적 대조: CLOSED/COMPLETED + 게시 nonzero + 기존 댓글만 조회 → §3/§4 → §5 → close-unconfirmed. 실제 행동 재검증은 controller 담당으로 미실행이다. 실행 코드 변화 없음; 기존 Node 22/22 로그 참조. 실제 커밋·원격 쓰기 없음.

## PR 준비 후속 기록 — 2026-10-02

주제별 로컬 커밋과 최신 main 통합 완료. 코드 커밋·통합 검사는 [실행 요약](05-todos-issue-housekeeping.md#실행-결과-요약), 독립 검토와 미실행 증거는 [review](review.md)에 기록했다. 통합 후 package 검사 25/25, checker·diff 검사 통과. 실제 원격 적용은 생성 후 조회로 별도 확인한다.
