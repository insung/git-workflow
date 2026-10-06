---
issue: "#5"
status: in-progress
branch: "feat/issue-close"
base: "main"
created: "2026-10-02"
---

# Issue 종료 스킬 issue-close 계획

## 요청

> 이슈 클로즈 스킬도 필요할까? 이슈를 클로즈할 때는 코멘트가 남았으면 좋겠고, 이슈 해결되었다면 그 결과가 어땟는지 등을 남겼으면 좋겠어. 이러한 이슈 라이프사이클의 베스트 프렉티스는 깃헙 공식 자료에서 찾아서 어떻게 하는게 좋을지 검토해줘. 검토된 내용을 바탕으로 /git-workflow:plan-create 으로 계획 문서 만들어주고, 워크트리를 만들어서 진행해줘.

- 해석: Issue 종료를 별도 스킬로 분리하고, 종료 사유(GitHub의 close reason)와 결과 코멘트를 항상 남기게 한다. pr-merge 뒤의 마지막 단계로 연결한다.
- 남은 결정: 없음. 플러그인 버전 변경은 이 계획에서 제외 (결정과 변경 기록 참고)

## 현재 동작과 변경 이유

| 현재 동작 | 근거 위치 | 바꿀 결과 |
| --- | --- | --- |
| 워크플로우가 머지 확인에서 끝나고 Issue 종료 단계가 없음 | `skills/git-workflow/SKILL.md:21` 「승인·머지 \| pr-merge \| 실제 머지 상태와 merge commit」 | 단계 표에 Issue 종료 행 추가 |
| 머지 뒤 다음 행동이 배포 확인만 다룸 | `skills/pr-merge/SKILL.md:37` 「## 머지 결과와 다음 행동」 | 머지 확인 뒤 issue-close로 인계 |
| `Closes` 키워드는 기본 브랜치 머지에서만 Issue를 닫고, 결과 코멘트를 남기지 않음 | [GitHub 연결 문서](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/linking-a-pull-request-to-an-issue), `skills/git-workflow/references/issue-link.md:27` | 자동 닫기 뒤 결과 코멘트 보완, 비기본 브랜치 머지 뒤 수동 종료 |
| 종료 사유(completed·not planned·duplicate)를 고르는 기준 없음 | `skills/` 전체에 `--reason` 사용 없음 (grep 확인) | 사유별 종료 절차와 코멘트 양식 |
| 결과 상태 표에 종료 미확인 상태 없음 | `skills/git-workflow/references/execution-boundaries.md:31` 「merge-unconfirmed \| … \| pr-merge」 | `close-unconfirmed` 상태 추가 |
| 체크하지 않은 Issue task 항목을 확인하지 않고 닫을 수 있음. #1의 AC 14개와 #2의 AC 6개가 모두 미체크 상태였음 (2026-10-02 조회) | `skills/issue-close/SKILL.md` 「## 1. 상태 확인」에 task 항목 확인 없음 | 종료 전 미체크 항목을 사용자에게 알리고, 남아 있으면 completed 차단 |
| AI 커밋 푸터가 비표준 `Agent: Claude`라서 GitHub이 공동 작성자로 표시하지 않음. 이 브랜치의 최근 커밋 12개가 모두 `Agent: Claude` (`git log` 확인) | `skills/commit-rule/references/commit-message.md:39` 「AI가 작성한 커밋에는 실제 도구를 `Agent:` 트레일러로 기록한다.」 | GitHub 표준 `Co-authored-by:` 트레일러로 Claude·Codex를 공동 작성자로 기록 |
| Issue·PR 생성 예시에 assignee 지정이 없음 | `skills/issue-create/references/issue.md:74` 「gh issue create --title 'feat(app-ranking): 기간을 주 단위로 선택' \」, `skills/pr-create/references/pr.md:114` 「gh pr create --base dev --head feature/app-ranking-weekly-period \」, `skills/` 전체에 `assignee` 사용 없음 (grep 확인) | 생성 시 `--assignee @me`로 실행 계정을 지정 |

## 범위

| 구분 | 내용 |
| --- | --- |
| 포함 | `skills/issue-close/` 신규, 커밋 푸터의 AI 공동 작성자 트레일러 (`skills/commit-rule/references/commit-message.md`, `skills/git-workflow/references/writing-conventions.md`), `execution-boundaries.md` 결과 상태, git-workflow 단계 표, pr-merge 다음 행동, README.ko.md·README.md, `scripts/check-package.mjs`, `tests/package.test.mjs`, Issue·PR 생성 절차의 assignee 지정 (`skills/issue-create/references/issue.md`, `skills/pr-create/references/pr.md`) |
| 제외 | Issue 재오픈 절차, stale Issue 일괄 정리, GitHub Projects 상태 갱신, 플러그인 버전 변경, 실행 계정 외 다른 사람 지정, 기존 Issue·PR의 assignee 일괄 변경 |
| 미변경 소비자 | 설치된 플러그인 캐시, Issue·PR 생성 절차의 제목·본문·라벨 규칙 |
| 호환성·데이터·운영 | 기존 스킬 이름·경로 유지. Issue 닫기·코멘트는 사용자 승인 범위에서만 실행 |

## 단계

| 단계 | 제목 | 설명 | 검증 사례 | 완료 |
| --- | --- | --- | --- | --- |
| [01](01-todos-issue-close-skill.md) | issue-close 스킬 작성 | 종료 사유 선택, 결과 코멘트 양식, 자동 닫기 보완, 종료 재확인 | [TC-01](01-todos-issue-close-skill.md#tc-01)<br>[TC-02](01-todos-issue-close-skill.md#tc-02)<br>[TC-03](01-todos-issue-close-skill.md#tc-03)<br>[TC-04](01-todos-issue-close-skill.md#tc-04)<br>[TC-05](01-todos-issue-close-skill.md#tc-05)<br>[TC-12](01-todos-issue-close-skill.md#tc-12) | [x] |
| [02](02-todos-workflow-wiring.md) | 워크플로우 연결 | 단계 표·pr-merge·README·패키지 검사에 issue-close 연결 | [TC-06](02-todos-workflow-wiring.md#tc-06)<br>[TC-07](02-todos-workflow-wiring.md#tc-07)<br>[TC-08](02-todos-workflow-wiring.md#tc-08) | [x] |
| [03](03-todos-self-assignee.md) | 실행 계정 assignee 지정 | Issue·PR 생성 시 `--assignee @me`, 기존 항목은 `--add-assignee @me`, 지정 실패 처리 | [TC-09](03-todos-self-assignee.md#tc-09)<br>[TC-10](03-todos-self-assignee.md#tc-10)<br>[TC-11](03-todos-self-assignee.md#tc-11) | [x] |

| [04](04-todos-agent-co-author.md) | 에이전트 공동 작성자 트레일러 | `Agent:` 푸터를 `Co-authored-by:`로 교체 | [TC-13](04-todos-agent-co-author.md#tc-13)<br>[TC-14](04-todos-agent-co-author.md#tc-14)<br>[TC-15](04-todos-agent-co-author.md#tc-15) | [ ] |

| [05](05-todos-issue-housekeeping.md) | Issue 정리 | #5 제목 scope 변경, #1·#2를 issue-close 절차로 종료 | [TC-16](05-todos-issue-housekeeping.md#tc-16)<br>[TC-17](05-todos-issue-housekeeping.md#tc-17)<br>[TC-18](05-todos-issue-housekeeping.md#tc-18) | [ ] |

실행 순서: 01 → 02 → 03 → 04 → 05. 검증이 실패하면 해당 단계로 돌아가 같은 사례를 다시 실행한다.

## 최종 검증

| 사례 | AC | 명령·작업 디렉토리 | 기대 결과 | 필요 승인 | 결과 |
| --- | --- | --- | --- | --- | --- |
| <a id="tc-f01"></a>TC-F01 | AC-06 | `node scripts/check-package.mjs`, 리포 루트 | `Package structure valid`, exit 0 | 없음 | 통과 (41d78c0 + 미커밋 작업본) |
| <a id="tc-f02"></a>TC-F02 | AC-06 | `node --test tests/package.test.mjs`, 리포 루트 | fail 0 | 없음 | 통과 (41d78c0 + 미커밋 작업본) |
| <a id="tc-f03"></a>TC-F03 | AC-01, AC-02, AC-05 | 이 Issue(#5) 종료 시 issue-close 절차를 실제로 적용 | completed로 닫히고 결과 코멘트가 남으며 조회 결과 `stateReason=COMPLETED` | Issue 종료 승인 (머지 뒤) | 미실행 |
| <a id="tc-f04"></a>TC-F04 | AC-07 | 이 작업의 PR을 pr-create 절차로 만든 뒤 `gh pr view <PR> --json assignees`, 리포 루트 | assignees에 실행 계정 login 하나 | PR 생성 승인 | 미실행 |

유닛 테스트 대상: 스킬은 실행 지침 문서이므로 동작 테스트 대신 패키지 구조 검사와 TC-F03의 실제 적용으로 확인한다.

## 전달과 롤백

| 항목 | 내용 |
| --- | --- |
| 전달 방법 | `feat/issue-close` → `main` PR. PR 전에 `origin/main`(`e7da604`) 위로 브랜치를 갱신. 배포 없음 (플러그인 저장소) |
| 필요 승인 | 커밋, push, PR 생성, 머지, Issue #5 종료 |
| 적용 후 확인 | 플러그인 재설치 후 `git-workflow:issue-close` 스킬이 목록에 보임 |
| 롤백 | PR revert. 스킬 추가뿐이므로 다른 스킬 동작에 영향 없음 |

## 결정과 변경 기록

| 날짜 | 구분 | 내용 | 영향 AC·단계 | 상태 |
| --- | --- | --- | --- | --- |
| 2026-10-02 | 결정 | pr-merge에 넣지 않고 issue-close를 별도 스킬로 둔다. not planned·duplicate 종료는 PR·머지 없이 일어나기 때문 | AC-01, 01 | 승인 |
| 2026-10-02 | 결정 | base는 `main`이 아니라 `feat/issue-review-workflow`. `main`에 issue-create·pr-merge 등 단계별 스킬이 아직 없음 (PR #3 미머지) | 전달 | 승인 |
| 2026-10-02 | 결정 | 플러그인 버전 변경은 이 계획에서 제외하고 릴리즈 때 git-release로 정한다 | 범위 | 승인 |
| 2026-10-02 | 요청 변경 | AC-06의 테스트 명령을 `node --test tests/`에서 `node scripts/check-package.mjs`와 `node --test tests/package.test.mjs`로 바꿈. 디렉토리 인자 형식은 로컬 Node에서 실패 | AC-06 | 승인 |
| 2026-10-02 | 요청 변경 | Issue·PR의 assignee를 현재 실행하는 사람으로 지정하는 단계 03 추가. 요청 원문: 「이슈 및 pr 에 assignee 는 현재 실행하는 사람으로 정의 가능할까?」 | AC-07, 03 | 승인 |
| 2026-10-02 | 결정 | 「현재 실행하는 사람」은 `gh`가 인증한 계정이며 `@me`로 지정한다. 에이전트가 실행해도 저장소 지침이 정한 인증 계정이 assignee가 된다 | AC-07, 03 | 승인 |
| 2026-10-02 | 결정 | 기존 assignee는 덮어쓰지 않고 `--add-assignee`로 추가만 한다. 지정에 실패해도 Issue·PR 생성은 유지하고 미적용 사유를 보고한다 | AC-07, 03 | 승인 |
| 2026-10-02 | 요청 변경 | 체크하지 않은 Issue task 항목을 종료 전에 사용자에게 알리는 규칙을 01 단계에 추가 (작업 7, TC-12). 요청 원문: 「이슈의 task 항목에 체크되지 않은 게 있어. 만약 이런 항목들이 존재한다면 사용자에게 알릴 수 있도록 스킬에 명시해줘」 | AC-08, 01 | 승인 |
| 2026-10-02 | 결정 | 미체크 항목은 근거(todo·handoff·review)가 충족을 보여 주고 사용자가 승인한 것만 체크한다. 근거 없는 체크는 금지한다 | AC-08, 01 | 승인 |
| 2026-10-02 | 실행 기록 | 사용자 요청으로 #1 AC-01~AC-14, #2 AC-01~AC-06의 체크박스를 체크함. 근거: #1은 `02_1_template-init-review-cleanup/review.md`에서 AC 14개 모두 「충족」, #2는 PR #3 본문 「이번 PR의 해결 범위: #2 AC-01~AC-06」. 본문의 다른 내용은 바꾸지 않음. 두 Issue는 열린 상태 유지 (PR #3 미머지) | 해당 없음 | 승인 |
| 2026-10-02 | 요청 변경 | AI 도구를 GitHub 공동 작성자로 기록하는 단계 04 추가. 요청 원문: 「컨트리뷰터에 클로드나 코덱스가 추가되면 좋을 것 같은데 … 푸터에 Agent: 라고 되어있는 것 같은데 이건 내가 의도한 동작이 아닌 거지?」 | AC-09, 04 | 승인 |
| 2026-10-02 | 결정 | `Agent:` 트레일러는 이전 요청 「푸터에 클로드나 코덱스 에이전트가 작성될 수 있게 해줘」(sideband 코멘트, `skills/commit-rule/references/commit-message.md`)를 비표준 트레일러로 해석한 결과다. GitHub이 인식하는 `Co-authored-by:`로 바꾼다 | AC-09, 04 | 승인 |
| 2026-10-02 | 결정 | 주소는 각 도구의 기본값 `noreply@anthropic.com`, `noreply@openai.com`을 쓴다. GitHub 계정 연결 여부는 미확인이며 TC-15에서 확인한다 | AC-09, 04 | 승인 |
| 2026-10-02 | 결정 | 이미 push된 커밋의 `Agent: Claude`는 고치지 않는다. 열린 PR #3 브랜치의 히스토리 재작성과 force push가 필요하기 때문이다 | 04 | 승인 |
| 2026-10-02 | 보류 | AC-09를 Issue #5 본문에 추가해야 한다. Issue 본문 수정 승인 대기 | AC-09, 04 | 보류 |
| 2026-10-02 | 보류 | AC-08을 Issue #5 본문에 추가해야 한다. Issue 본문 수정 승인 대기 | AC-08, 01 | 보류 |
| 2026-10-02 | 보류 | AC-07을 Issue #5 본문에 추가해야 한다. Issue 본문 수정 승인 대기. 반영 전에는 03 단계를 시작하지 않는다 | AC-07, 03 | 보류 |
| 2026-10-02 | 실행 기록 | 사용자 승인으로 Issue #5 본문에 AC-07~AC-09와 포함 범위 3항목을 추가함. 위 보류 3행 해제 | AC-07, AC-08, AC-09 | 승인 |
| 2026-10-02 | 결정 | PR #3은 `main`에 머지됨 (2026-10-01T18:08:07Z, merge commit `8f8c51b`). base를 `main`으로 바꾼다. 위의 「base는 `feat/issue-review-workflow`」 결정, #1·#2 실행 기록의 「PR #3 미머지」, `Agent: Claude` 결정의 「열린 PR #3 브랜치」는 사실과 다름. Issue #5 「지금 알고 있는 것」도 같은 내용으로 고침 | 전달 | 승인 |
| 2026-10-02 | 결정 | 이미 push된 `Agent: Claude` 커밋은 그대로 둔다 (사용자 확인). PR #3 머지로 `main` 히스토리에 포함되어 재작성 대상이 아님 | 04 | 승인 |
| 2026-10-02 | 요청 변경 | 커밋 규칙에 `Agent:` 트레일러를 금지하는 문장도 쓰지 않는다. 04 작업 1을 미완료로 되돌리고 TC-13 기대 결과를 0건으로 바꿈. 요청 원문: 「아예 불필요한 말조차 작성되지 않도록 삭제해줘」 | AC-09, 04 | 승인 |
| 2026-10-02 | 요청 변경 | 이 세션은 계획 문서 외 파일을 수정하지 않는다. 요청 원문: 「이 세션에서는 계획 문서 외에 다른 파일들은 수정하지 말아줘」. 이 요청 전에 01·02·04 단계로 바꾼 skills·README·scripts·tests 파일은 미커밋 상태로 작업본에 남아 있음. 03 단계와 04 작업 1·3은 구현 세션에서 진행 | 01, 02, 03, 04 | 승인 |
| 2026-10-02 | 보류 | #1·#2는 PR #3 머지 뒤에도 열려 있음. PR 본문이 `Closes`가 아니라 「관련 Issue」로만 연결했기 때문. issue-close 머지 뒤 이 스킬로 종료할지 사용자 결정 대기 | 해당 없음 | 보류 |
| 2026-10-02 | 보류 | Issue #5 제목의 scope가 플러그인 이름(`git-workflow`)임. v0.3.0 사례 문서(`docs/examples/git-workflow-v0.3.0/README.md`)는 「플러그인 이름을 scope로 쓰면 릴리즈 노트를 스킬별로 묶을 수 없음」을 확인함. `feat(issue-close)`로 바꿀지 사용자 결정 대기 | 해당 없음 | 보류 |
| 2026-10-02 | 보류 | PR 검토 댓글 규칙(시점·담당 스킬·양식·재검토·승인 범위)을 이 계획에 넣지 않고 별도 Issue `feat(pr-review)`로 다루는 안을 검토함. 공통 원격 기록 형태는 `skills/git-workflow/references/document-links.md`가 정본이고, issue-close 종료 코멘트는 그 형태를 따름. 사용자 결정 대기 | 해당 없음 | 보류 |
| 2026-10-02 | 결정 | `commit-message.md:50`의 `Agent:` 언급 문장 삭제는 구현 세션에서 처리한다 (04 작업 1) | AC-09, 04 | 승인 |
| 2026-10-02 | 결정 | PR 검토 댓글 규칙은 이 계획에 넣지 않고 별도 Issue `feat(pr-review)`로 새 세션에서 진행한다. 위 PR 검토 댓글 보류 행 해제 | 해당 없음 | 승인 |
| 2026-10-02 | 결정 | Issue #5 제목 scope를 `feat(issue-close)`로 바꾼다. 구현 세션에서 처리 (05 작업 1). 위 scope 보류 행 해제 | 05 | 승인 |
| 2026-10-02 | 결정 | #1·#2는 구현 세션에서 issue-close 절차로 종료한다 (05 작업 2·3). 위 #1·#2 보류 행 해제. 종료 코멘트 게시와 종료는 구현 세션에서 사용자 승인 후 실행 | 05 | 승인 |
| 2026-10-02 | 결정 | 검토 기준은 별도 검토 세션이 구현 전에 작성하고, 구현 세션이 읽지 않는 저장소 밖 위치에 둔다. v0.3.0 사례의 「미추적 파일로 두자 구현 세션이 읽고 사용함」을 피하기 위함. 검토 뒤 이 디렉토리에 `review-criteria.md`·`review.md`로 커밋 | 최종 검증 | 승인 |

## 이번 로컬 구현 결과

01~03 로컬 구현과 04 문서 변경을 완료하고 자체 검사했다. 04의 실제 커밋/push/공동 작성자 표시 및 05 원격 변경은 미실행이다. 과거 「계획 문서만 수정」 제한은 이번 구현 brief로 대체되었다. 독립 검토는 아직 없다. 상세 근거와 다음 행동은 [실행 요약](05-todos-issue-housekeeping.md#실행-결과-요약)를 따른다.

| 2026-10-02 | 실행 기록 | 독립 모의 검증 중 AC-05 보고 누락 1건을 보완하고 관련 범위를 다시 실행했다. 통합 전 고유 시나리오 25개 통과. 전체 판정은 실제 커밋·원격 근거 미확보로 human-review | AC-01~09 | 기록 |
| 2026-10-02 | 요청 변경 | 사용자 “pr 요청해줘”에 따라 PR에 필요한 scoped commit·push·Draft PR 생성 진행. Issue 변경·종료·머지는 별도 범위로 유지 | 전달 | 승인 |
| 2026-10-02 | 실행 기록 | 최신 main `493720d`를 `9999759`로 통합. 다른 세션의 task-implement·agents-init와 버전 0.4.0 보존, package 25/25·checker·diff 검사 통과 | AC-06 | 기록 |
| 2026-10-02 | 결정 | 최신 main의 human-review 공개 범위를 적용해 기준·입력은 저장소 밖에 유지하고 review.md에는 결과와 미확보 근거만 기록. 기존 todo 파일명은 승인된 Issue #5 계획과 링크를 보존 | 최종 검증 | 기록 |

## 기록 정리

2026-10-06 Issue #39의 승인에 따라 전달문·검토 입력·응답 전문·로그·중복 초안을 현재 트리에서 정리했다. 이 문서의 기존 상태·판정·승인은 당시 기록이며 현재 완료 상태로 갱신한 것이 아니다. 필요한 원문은 [정리 전 기록](https://github.com/insung/git-workflow/tree/3993cb36cdb3fca6ff8b2bfee47016eb8a70e959/docs/git-workflows/2026-10/02_5_issue-close)에서 조회한다.
