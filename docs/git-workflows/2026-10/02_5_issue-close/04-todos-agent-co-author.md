# 04 에이전트 공동 작성자 트레일러

계획: [plan의 단계 표](plan.md#단계)

## 변경 대상

| 구분 | 경로 | 이유 |
| --- | --- | --- |
| Modify | `skills/commit-rule/references/commit-message.md` | 「## 푸터」의 `Agent:` 트레일러를 `Co-authored-by:` 트레일러로 교체 |
| Modify | `skills/git-workflow/references/writing-conventions.md` | 「커밋의 표준 `Co-authored-by:` 트레일러는 허용한다.」를 commit-message 푸터 링크로 교체. 정본 한 곳 유지 |

## 작업

| # | 작업 | 완료 | 처리 내용 |
| --- | --- | --- | --- |
| 1 | 푸터 규칙을 `Co-authored-by: Claude <noreply@anthropic.com>`, `Co-authored-by: Codex <noreply@openai.com>`로 교체. `Agent:` 트레일러는 언급하지 않음 | [x] | 도구별 표와 예시 작성. `commit-message.md:50`의 「`Agent:` 같은 비표준 트레일러는 GitHub이 인식하지 않으므로 쓰지 않는다.」 문장 삭제 완료 (이번 로컬 구현) |
| 2 | writing-conventions의 트레일러 문장을 정본 링크로 교체 | [x] | `../../commit-rule/references/commit-message.md#푸터` 링크 |
| 3 | 이 브랜치의 첫 커밋에 새 트레일러를 적용하고 push 뒤 GitHub 표시 확인 | [ ] | |

## 검증

| 사례 | AC | 명령·작업 디렉토리 | 기대 결과 | 결과 |
| --- | --- | --- | --- | --- |
| <a id="tc-13"></a>TC-13 | AC-09 | `grep -rn "Agent:" skills`, 리포 루트 | 0건 | 정적 검색 0건. exit 1은 일치 없음 |
| <a id="tc-14"></a>TC-14 | AC-09 | `node scripts/check-package.mjs`와 `node --test tests/package.test.mjs`, 리포 루트 | exit 0, fail 0 | 통과, 22개 (41d78c0 + 미커밋 작업본) |
| <a id="tc-15"></a>TC-15 | AC-09 | push 뒤 `gh api repos/insung/git-workflow/commits/<sha> --jq .commit.message`와 GitHub 커밋 화면 | 트레일러가 메시지 끝에 있고 커밋 화면에 Claude가 공동 작성자로 표시 | 미실행 |

## 제외 범위

- 이미 push된 커밋의 `Agent: Claude` 트레일러 수정 (히스토리 재작성 필요)
- 사람의 Git author·committer 설정 변경

## 현재 작업본 자체 검증 기록

- 실행 시각(UTC): 2026-10-02T02:45:13.298187+00:00; 기준 HEAD `41d78c0093e568317c7cae89e4de7d1f79e2fb6e` + 미커밋 작업본. 실제 커밋 없음.
- 환경: Node v23.11.0, gh 2.101.0. `node scripts/check-package.mjs` exit 0, `node --test tests/package.test.mjs` 22 pass / 0 fail, `git diff --check` exit 0.
- 문서 사례는 정적 대조다. 실제 종료·코멘트·assignee·GitHub 공동 작성자 표시 실행 증거는 아니다. 최종 내용 식별과 파일 목록은 [실행 요약](05-todos-issue-housekeeping.md#실행-결과-요약)에 기록한다.

## PR 준비 후속 기록 — 2026-10-02

주제별 로컬 커밋과 최신 main 통합 완료. 코드 커밋·통합 검사는 [실행 요약](05-todos-issue-housekeeping.md#실행-결과-요약), 독립 검토와 미실행 증거는 [review](review.md)에 기록했다. 통합 후 package 검사 25/25, checker·diff 검사 통과. 실제 원격 적용은 생성 후 조회로 별도 확인한다.
