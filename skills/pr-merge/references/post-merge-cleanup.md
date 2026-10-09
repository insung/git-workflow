# 머지 후 작업 정리

실제 `state=MERGED`, `mergedAt`, `mergeCommit`을 조회한 뒤에만 적용한다.
auto-merge 등록·merge queue 진입·exit 0·응답 미확인은 정리 시작 조건이 아니다.
머지 완료와 정리 완료를 별도로 기록하며 정리 실패가 확인된 머지를 되돌리지 않는다.

## 대상과 권한

사용자의 PR 머지 승인은 해당 PR·승인 HEAD에 정확히 대응하는 원격 head 삭제와 작업 worktree 정리도 포함한다. 실제 MERGED와 아래 안전 조건을 확인하면 별도 정리 승인을 다시 묻지 않고 원격 head를 삭제하고 worktree를 제거한다. Issue 종료 여부나 순수 릴리즈 준비 PR처럼 연결 Issue가 없는지와 관계없다. 머지된 branch는 다시 쓰지 않으므로 Issue 종료가 아니라 머지에 정리를 묶는다. 머지 결과 조회만 요청했거나 사용자가 branch·worktree 보존을 명시했으면 삭제하지 않고 조회와 인계까지 진행한다. 대상 대응이나 권한이 불명확하면 그 범위만 확인한다.

로컬 브랜치 삭제와 외부 코멘트 게시는 별도 승인 대상이다. 머지 승인이나 worktree 정리 승인으로 이 권한을 확대하지 않는다. 같은 행동·정확한 대상에 이미 받은 승인은 재사용한다.

[issue-close](../../issue-close/SKILL.md#원격-head-잔여-확인)는 원격 head를 삭제하지 않고 남은 대상을 조회해 보고한다.

`gh pr merge --delete-branch`는 로컬 branch까지 지우고 아래 대상 대응·조건부 삭제·사후 조회를 거치지 않으므로 머지 명령에 붙이지 않는다. worktree 제거 증거도 아니다. 원격 자동 삭제 설정을 켜거나 보호 규칙을 우회하지 않는다.

다음 대응표를 조회 근거와 함께 고정한다. 이름만 같은 branch를 같은 작업으로 추정하지 않는다.

| 대상 | 확인할 대응과 보존 조건 |
| --- | --- |
| 원격 head | PR head repository(owner/name), headRefName, headRefOid·검토/승인 HEAD, 실제 push remote URL과 head ref OID. fork의 head를 base 저장소 origin으로 삭제하지 않는다 |
| 로컬 작업 branch | 로컬 ref OID가 정리 대상으로 고정한 head OID와 일치하는지, tracking remote와 PR head 저장소의 대응 |
| linked worktree | `git worktree list --porcelain`의 정확한 경로·branch·HEAD와 해당 작업의 소유/사용 상태 |

기본·PR base·장기 유지·보호 branch는 보존한다. 다른 열린 PR과 작업에서 같은 branch/ref를 사용하는지 확인하고 사용 중이면 보류한다. 원격 조회/보호 상태/사용 여부가 불명확하면 삭제하지 않는다.

## 손실 방지 확인

- 대상 worktree의 staged·unstaged·untracked는 `git -C <경로> status --porcelain=v1 --untracked-files=all`로 확인한다. `git -C <경로> ls-files --others --ignored --exclude-standard`로 ignored 파일도 따로 확인한다. 보존이 필요한 파일은 승인된 위치에 보존하고 확인하기 전까지 보류한다. 비어 있지 않은 ignored 목록의 가치가 불명확하면 보류한다.
- 검토/승인한 HEAD 이후 커밋이나 ref OID 변화가 있으면 후속 작업으로 보존한다. 변경 직전에도 OID·작업본 상태를 다시 확인한다.
- shared·locked·prunable 또는 다른 세션이 사용하는 worktree는 보류한다. locked를 자동 unlock하지 않는다. 기본 checkout·현재 다른 작업·리뷰 worktree는 대상에서 제외한다.
- 일반 merge는 대상 head가 갱신한 base에 반영됐는지 확인한다. squash/rebase의 비조상 관계는 미반영이나 삭제 허가를 뜻하지 않는다. PR의 최종 head/머지 기록·변경 내용 대응을 별도로 확인한다. `git branch -d`가 거부하면 보류하고 `-D`, `--force`, reset/clean으로 우회하지 않는다.

## 실행과 사후 조회

삭제 직전 안전한 현재 위치를 확보한다. 현재 실행 위치가 제거할 worktree라면 대상 밖의 보존된 checkout으로 이동한다. 이 세션의 실행 위치를 바꿀 수 없으면 그 위치에서 제거하지 않고 다른 세션에 인계한다.

| 대상 | 승인·안전 확인 후 실행 | 사후 조회 |
| --- | --- | --- |
| 일반 linked worktree | 보존된 checkout에서 `git worktree remove <정확한경로>` (force 없음) | `git worktree list --porcelain`와 해당 경로 존재 여부 모두 확인 |
| Codex 관리 worktree | 해당 작업의 `list_artifacts`로 정확한 identityKey와 primary/pinned/shared 여부를 확인한 뒤 `archive_worktree` 사용. 관리 기능이 없거나 대상 연결이 불명확하면 인계 | 관리 artifact가 archived인지와 반환된 checkout 제거 결과 확인. 관리 snapshot은 보존 근거로 기록하며 local branch 삭제를 추정하지 않음 |
| 로컬 branch | worktree 제거 후 보존된 checkout에서 `git branch -d -- <작업branch>` | `git show-ref --verify refs/heads/<작업branch>`의 ref 부재 확인. 오류/조회 실패를 부재와 구분 |
| 원격 head | 정확한 head remote에서 현재 OID가 고정 OID인지 재조회 후 `git push --force-with-lease=refs/heads/<head>:<고정OID> <headRemote> :refs/heads/<head>` | `git ls-remote --heads <headRemote> refs/heads/<head>` 조회 성공·빈 결과 확인 |

원격 명령의 lease는 동시 ref 갱신을 보존하는 조건부 삭제이며 force 삭제/보호 우회 허가가 아니다. 서버가 조건부 삭제를 지원하지 않으면 보류한다. remote·branch 입력은 검증하고 shell 인자로 안전하게 인용한다. 실행 순서는 대상 관계에 맞게 잡되 local branch보다 worktree를 먼저 처리한다. 하나가 실패하면 종속 삭제를 멈추고 나머지를 각각 보류/미확인으로 기록한다.

| 개별 결과 | 근거 |
| --- | --- |
| 삭제 | 실행 후 성공한 조회에서 정확한 대상이 없음 |
| 이미 없음 | 실행 전 성공한 조회에서 없음; 남아 있는 다른 대상은 별도 처리 |
| 보류 | 권한·보존·사용·보호·도구 조건 미충족과 다음 행동 |
| 실패 | 삭제 명령의 오류와 후속 조회 결과 |
| 미확인 | 응답/조회 실패 또는 관리 metadata와 경로 상태 불일치; 재실행 전 조회 |

머지 PR URL·mergedAt·mergeCommit·검토/승인 HEAD, 각 원격/local/worktree의 식별값·전후 조회·결과·보류 이유를 인계한다. 실제 Issue 종료/결과 코멘트는 issue-close가 설치돼 있으면 그 스킬에 전달한다. 자동 닫기로 이미 CLOSED인 Issue도 결과 코멘트 보완 경로로 인계한다. 설치돼 있지 않으면 동일 근거와 게시 권한을 대화 또는 작업용 임시 인계에 남기고 issue-close를 사용할 수 있을 때 인계한다. 종료 스킬이나 새 코멘트 양식은 여기서 구현하지 않는다.
