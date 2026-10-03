---
name: issue-close
description: '“Issue #12를 닫아줘”, “머지된 PR의 Issue에 결과 코멘트를 남겨줘”, “이 Issue는 진행하지 않기로 했으니 닫아줘”처럼 Issue 종료나 종료 결과 기록을 요청할 때 사용한다. Issue 재오픈이나 일괄 정리에는 쓰지 않는다.'
---

# Issue 종료

[공통 실행 경계](../git-workflow/references/execution-boundaries.md)를 적용한다.
기록은 [문체](../git-workflow/references/writing-conventions.md), 원격 요약은 [document-links](../git-workflow/references/document-links.md)를 따른다.
코멘트는 [종료 코멘트 양식](references/closing-comment.md)으로 작성한다.

## 1. 상태 확인

`gh issue view <Issue> --json state,stateReason,body,comments,closedByPullRequestsReferences`로 현재 상태·달성 조건·연결 PR을 조회한다.
연결 PR은 `gh pr view <PR> --json state,mergedAt,mergeCommit,baseRefName`으로 실제 머지를 확인한다.
plan·todo·handoff·review에서 AC별 결과와 근거를 찾는다.

Issue 본문에서 체크하지 않은 task 항목을 찾는다. `- [ ]`뿐 아니라 `* [ ]`, `+ [ ]`, 번호 목록과 들여쓴 task도 확인하고 코드 예시는 task로 세지 않는다.
있으면 종료 전에 항목 원문과 대응하는 근거(충족·미충족·미확인)를 사용자에게 알린다.
근거가 충족을 보여 주고 사용자가 체크를 승인한 항목만 체크한다. 근거 없이 체크하지 않는다.

## 2. 종료 사유 선택

| 관찰한 상태 | 사유 | 명령 |
| --- | --- | --- |
| 모든 AC 충족, 해결 PR 머지 확인 | completed | `gh issue close <Issue> --reason completed` |
| 사람이 진행하지 않기로 결정 | not planned | `gh issue close <Issue> --reason "not planned"` |
| 같은 해결 범위의 다른 Issue가 정본 | duplicate | `gh issue close <Issue> --duplicate-of <정본 Issue>` |

사유는 관찰한 사실로 고른다.
not planned는 사람의 결정이 있어야 한다. 에이전트가 판단하지 않는다.
duplicate는 정본 Issue가 열려 있거나 같은 범위로 해결되었는지 확인한다.

### completed 차단 조건

아래 중 하나라도 해당하면 completed로 닫지 않는다.
상태와 선택지(후속 Issue로 분리 후 종료·보류·not planned)를 사용자에게 제시하고 결정을 받는다.

- 미충족 또는 미확인 AC가 있음
- Issue 본문에 체크하지 않은 task 항목이 남아 있음
- 해결 PR의 `state=MERGED`·merge commit을 확인하지 못함
- AC 결과의 근거 링크(todo·handoff·review 또는 PR)가 없음

## 3. 정리 확인과 코멘트 작성

### completed의 작업 워크트리 정리

completed 종료 또는 이미 CLOSED인 Issue의 completed 결과 보완에서는 코멘트를 작성하기 전에 해당 PR의 작업 워크트리 정리를 확인한다.
정리의 대상 식별·권한·보존 조건·실행·사후 조회는 [머지 후 작업 정리](../pr-merge/references/post-merge-cleanup.md)를 정본으로 적용한다. 실제 `state=MERGED`·`mergedAt`·`mergeCommit` 확인 뒤에만 정리 실행으로 진행한다.

1. pr-merge의 정리 인계가 있으면 대상 식별값과 전후 조회·결과를 받아 현재 상태와 대조한다. 없으면 정본의 대상 대응표부터 확인한다. 이름만 같은 worktree를 해당 작업으로 추정하지 않는다.
2. Issue 종료·코멘트 승인과 삭제 승인을 구분한다. 같은 행동·정확한 대상에 이미 받은 정리 승인은 재사용하고, 빠지거나 불명확한 범위만 확인한다. 승인 없이 삭제하지 않고 조회·보류 이유·다음 행동까지 기록한다. worktree 승인으로 로컬·원격 branch 삭제 권한을 확대하지 않는다.
3. 정본의 안전 조건을 충족하고 승인된 대상이면 코멘트 게시 전에 정리를 실행하고 사후 조회한다. 조건 미충족이면 보존하고 이유와 다음 행동을 기록한다. Codex 관리 대상은 정본의 관리 도구를 사용하며 관리 기능이나 연결이 불명확하면 인계한다.
4. 각 작업 워크트리에 정본의 `삭제`·`이미 없음`·`보류`·`실패`·`미확인` 결과와 식별값·조회 근거 또는 이유·다음 행동을 남긴다. 이 작업에서 워크트리를 생성·사용하지 않은 경우에만 `해당 없음`과 대상 확인 근거를 기록한다. 식별된 작업 워크트리가 실행 전 성공한 조회에서 없으면 `이미 없음`이다. 다른 대상은 각각 구분하고, 제거 명령의 성공 응답만으로 `삭제`라고 쓰지 않는다.

정리 결과와 AC 충족·Issue 종료 상태는 별도로 판단한다. 정리 보류·실패·미확인 자체는 새 completed 차단 사유가 아니다. 다만 worktree 삭제가 Issue의 AC라면 미삭제·미확인은 [기존 completed 차단 조건](#completed-차단-조건)을 적용한다. not planned·duplicate 경로는 기존 사유와 양식을 유지한다.

### 코멘트 작성과 승인

[종료 코멘트 양식](references/closing-comment.md)으로 본문을 만들어 대화에 보여 준다.
Issue 종료와 코멘트 게시는 외부 기록이므로 승인을 받는다. 같은 Issue·같은 사유의 기존 승인은 다시 묻지 않는다.
여러 줄 Markdown을 보존하고 코멘트 URL을 받도록 본문 파일로 먼저 게시하고 게시한 코멘트를 조회하여 본문과 URL을 확인한 뒤 닫는다. 게시 실패·미확인 때는 닫지 않고 [5단계 재확인](#5-재확인)으로 진행한다. 기존에 같은 결과 코멘트가 있고 현재 정리 결과도 담겨 있으면 중복 게시하지 않고 확인한 URL을 사용한다. 정리 결과가 빠졌거나 바뀌었으면 승인 범위에서 그 결과와 근거만 보완하고 게시 결과를 확인한다.

```bash
gh issue comment 12 --body-file /tmp/close-comment.md
gh issue close 12 --reason completed
```

## 4. 이미 닫힌 Issue

`Closes` 키워드는 기본 브랜치 머지에서 Issue를 자동으로 닫지만 결과 코멘트를 남기지 않는다.
이미 닫힌 Issue는 재오픈하지 않는다.
completed 결과를 보완할 때도 [3단계 정리 확인](#completed의-작업-워크트리-정리)을 먼저 적용한다. pr-merge에서 이미 정리했으면 현재 조회로 인계 결과를 확인하고, 남은 대상은 승인·안전 조건에 따라 처리한다. CLOSED 상태만으로 정리 완료를 추정하지 않는다.
`gh issue comment <Issue> --body-file`로 결과 코멘트만 보완한다. 게시 실패·미확인을 포함해 보완 결과는 [5단계 재확인](#5-재확인)으로 확인하고 보고한다.
기존 stateReason이 관찰한 사유와 다르면 바꾸지 않고 차이를 사용자에게 보고한다.
기본 브랜치가 아닌 base로 머지된 PR은 Issue를 닫지 않으므로 2단계부터 진행한다.

## 5. 재확인

응답이 불명확하면 재실행 전에 조회한다.
`gh issue view <Issue> --json state,stateReason,comments`로 `state=CLOSED`, 기대한 stateReason, 게시한 코멘트를 확인한다.
위 항목 중 하나라도 확인하지 못하면 Issue가 이미 닫혀 있어도 [공통 결과 상태](../git-workflow/references/execution-boundaries.md#결과-상태)의 close-unconfirmed로 멈춘다. 상태·사유·코멘트 중 확인하지 못한 항목과 게시 오류를 보고한다.

## 출력

Issue URL, 실제 state·stateReason, 코멘트 URL, AC별 결과 요약, 후속 Issue를 반환한다.
completed 종료·결과 보완에서는 각 작업 워크트리의 정리 결과(`삭제`·`이미 없음`·`보류`·`실패`·`미확인`·`해당 없음`), 정확한 대상, 전후 조회 근거 또는 이유와 다음 행동을 함께 반환한다. 정리 결과를 Issue 종료 성공이나 close-unconfirmed와 혼동하지 않는다.
체크하지 않은 task 항목이 있었으면 항목과 처리 결과(체크·후속 Issue·보류)를 함께 반환한다.
completed를 막은 경우 차단 조건과 사용자에게 요청한 결정을 반환한다.
