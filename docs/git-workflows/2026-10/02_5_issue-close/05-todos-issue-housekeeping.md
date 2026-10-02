# 05 Issue 정리

계획: [plan의 단계 표](plan.md#단계)

## 변경 대상

| 구분 | 경로 | 이유 |
| --- | --- | --- |
| 원격 | Issue #5 제목 | scope를 플러그인 이름에서 스킬 이름으로 변경 |
| 원격 | Issue #1, #2 | PR #3 머지(`8f8c51b`) 뒤에도 열려 있음. issue-close 절차로 종료 |

## 작업

| # | 작업 | 완료 | 처리 내용 |
| --- | --- | --- | --- |
| 1 | Issue #5 제목을 `feat(issue-close): Issue 종료 스킬 추가와 결과 코멘트 기준 정의`로 변경 | [ ] | |
| 2 | #1에 `skills/issue-close/SKILL.md` 1~5단계 적용: 상태·미체크 task 확인, 종료 코멘트 초안을 사용자에게 보여 주고 승인 후 게시, completed로 종료, 재확인 | [ ] | |
| 3 | #2에 같은 절차 적용. AC별 근거가 PR #3 본문뿐이므로 「completed 차단 조건」의 근거 링크 조건을 확인하고, 부족하면 닫지 말고 사용자 결정 요청 | [ ] | |

01~04 단계의 스킬 변경이 커밋되기 전이라도 작업본의 `skills/issue-close/`를 절차로 읽는다. 설치된 플러그인 캐시에는 issue-close가 없다.

## 검증

| 사례 | AC | 명령·작업 디렉토리 | 기대 결과 | 결과 |
| --- | --- | --- | --- | --- |
| <a id="tc-16"></a>TC-16 | 해당 없음 | `gh issue view 5 --json title`, 리포 루트 | 제목이 `feat(issue-close):`로 시작 | 미실행 |
| <a id="tc-17"></a>TC-17 | AC-01, AC-02, AC-05, AC-08 | `gh issue view 1 --json state,stateReason,comments`, 리포 루트 | `CLOSED`, `COMPLETED`, 마지막 코멘트가 [종료 코멘트 양식](../../../../skills/issue-close/references/closing-comment.md#completed)의 completed 절을 따름 | 미실행 |
| <a id="tc-18"></a>TC-18 | AC-01, AC-02, AC-03, AC-05 | `gh issue view 2 --json state,stateReason,comments`, 리포 루트 | TC-17과 같음. 근거 부족으로 막았으면 열린 상태와 사용자에게 요청한 결정 기록 | 미실행 |

## 제외 범위

- #1·#2 본문 변경 (체크박스는 이미 처리됨)
- PR 검토 댓글 규칙 (별도 Issue)

## 이번 로컬 구현 인계

원격 쓰기는 실행하지 않았다. #1·#2·#5와 PR #3 읽기 조회를 지정 계정 접두어로 시도했으나 토큰 미발견과 api.github.com 연결 실패로 확인하지 못했다. 제목 변경안과 종료 결과 코멘트 준비 상태는 [원격 작업 초안](remote-drafts.md)에 기록했다. 작업 1~3과 TC-16~18은 승인·현재 근거 확인 대기이며 완료로 체크하지 않는다.

## 현재 작업본 자체 검증 기록

- 실행 시각(UTC): 2026-10-02T02:45:13.298187+00:00; 기준 HEAD `41d78c0093e568317c7cae89e4de7d1f79e2fb6e` + 미커밋 작업본. 실제 커밋 없음.
- 환경: Node v23.11.0, gh 2.101.0. `node scripts/check-package.mjs` exit 0, `node --test tests/package.test.mjs` 22 pass / 0 fail, `git diff --check` exit 0.
- 문서 사례는 정적 대조다. 실제 종료·코멘트·assignee·GitHub 공동 작성자 표시 실행 증거는 아니다. 최종 내용 식별과 파일 목록은 [handoff](handoff.md)에 기록한다.
