# 03 실행 계정 assignee 지정

계획: [plan의 단계 표](plan.md#단계)

## 변경 대상

| 구분 | 경로 | 이유 |
| --- | --- | --- |
| Modify | `skills/issue-create/references/issue.md` | 「## 이슈를 만드는 절차」의 생성 명령에 `--assignee @me`, 재사용 Issue에 `--add-assignee @me` |
| Modify | `skills/pr-create/references/pr.md` | 생성 예시 `gh pr create`에 `--assignee @me` |
| Modify | `skills/pr-create/SKILL.md`, `skills/issue-create/SKILL.md` | 출력에 실제 assignee 확인 결과 추가 |

## 작업

| # | 작업 | 완료 | 처리 내용 |
| --- | --- | --- | --- |
| 1 | Issue 생성 명령에 `--assignee @me` 추가, 기존 Issue 재사용 시 `gh issue edit --add-assignee @me` 절차 추가 | [x] | 생성·추가 지정, 실패 시 유지·재조회, 실제 login 출력 구현 |
| 2 | PR 생성 명령에 `--assignee @me` 추가 | [x] | 생성·추가 지정, 실패 시 유지·재조회, 실제 login 출력 구현 |
| 3 | 지정 실패 처리 작성: 생성은 유지, `--json assignees`로 재조회, 미적용 사유 보고. 기존 assignee는 제거하지 않음 | [x] | 생성·추가 지정, 실패 시 유지·재조회, 실제 login 출력 구현 |
| 4 | 두 스킬의 출력에 실제 assignee login 추가 | [x] | 생성·추가 지정, 실패 시 유지·재조회, 실제 login 출력 구현 |

## 검증

| 사례 | AC | 명령·작업 디렉토리 | 기대 결과 | 결과 |
| --- | --- | --- | --- | --- |
| <a id="tc-09"></a>TC-09 | AC-07 | `grep -n "@me" skills/issue-create/references/issue.md skills/pr-create/references/pr.md`, 리포 루트 | 두 파일의 생성 명령에 `--assignee @me`가 있고, issue.md에 `--add-assignee @me`가 있음 | 정적 대조 통과; checker exit 0, Node 22/22. 실제 원격 지정은 미실행 |
| <a id="tc-10"></a>TC-10 | AC-07 | `skills/issue-create/references/issue.md`, `skills/pr-create/references/pr.md` 읽기 | 지정 실패 시 생성 유지·재조회·미적용 보고 규칙이 있고, 기존 assignee 제거 명령이 없음 | 정적 대조 통과; checker exit 0, Node 22/22. 실제 원격 지정은 미실행 |
| <a id="tc-11"></a>TC-11 | AC-07 | `node scripts/check-package.mjs`와 `node --test tests/package.test.mjs`, 리포 루트 | exit 0, fail 0 | 정적 대조 통과; checker exit 0, Node 22/22. 실제 원격 지정은 미실행 |

## 제외 범위

- 실행 계정 외 다른 사람 지정
- 이미 만든 Issue·PR의 assignee 일괄 변경
- issue-close의 종료 시 assignee 변경

## 현재 작업본 자체 검증 기록

- 실행 시각(UTC): 2026-10-02T02:45:13.298187+00:00; 기준 HEAD `41d78c0093e568317c7cae89e4de7d1f79e2fb6e` + 미커밋 작업본. 실제 커밋 없음.
- 환경: Node v23.11.0, gh 2.101.0. `node scripts/check-package.mjs` exit 0, `node --test tests/package.test.mjs` 22 pass / 0 fail, `git diff --check` exit 0.
- 문서 사례는 정적 대조다. 실제 종료·코멘트·assignee·GitHub 공동 작성자 표시 실행 증거는 아니다. 최종 내용 식별과 파일 목록은 [handoff](handoff.md)에 기록한다.

## PR 준비 후속 기록 — 2026-10-02

주제별 로컬 커밋과 최신 main 통합 완료. 코드 커밋·통합 검사는 [인계](handoff.md#pr-생성-인계--2026-10-02), 독립 검토와 미실행 증거는 [review](review.md)에 기록했다. 통합 후 package 검사 25/25, checker·diff 검사 통과. 실제 원격 적용은 생성 후 조회로 별도 확인한다.
