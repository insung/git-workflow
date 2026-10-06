---
name: pr-merge
description: “검토한 PR을 머지해줘”, “PR 머지 결과를 확인해줘”처럼 검토한 PR의 사용자 승인 후 머지나 실제 머지 결과 확인을 요청할 때 사용한다.
---

# PR 머지

[공통 실행 경계](../git-workflow/references/execution-boundaries.md)를 적용한다.

## 실제 Issue 연결: 머지 필수 조건

PR 본문의 Issue 항목에 [Issue 연결 검사](../git-workflow/references/issue-link.md)를 최종 검토 결과까지 포함해 적용한다.
보류 조건에 해당하면 머지를 보류하고 원인을 보고한다.
이 검사 통과는 사용자 머지 승인이 아니다.
머지 직전 최신 본문과 Issue를 다시 확인한다.

## 머지 전

[프로젝트 전략 정본](../branch-strategy/references/project-policy.md)의 PR 대상과 hotfix 역반영 경로를 실제 PR과 대조한다. 정책 충돌·미정은 관련 머지 전에 확인하며 역반영도 별도 대상의 승인 범위를 따른다.

Issue의 현재 계획, 필요한 연결 문서, PR URL, 검토한 HEAD와 결과, 검증 근거와 전달/배포 계획을 확인한다.
기록은 [문체](../git-workflow/references/writing-conventions.md), 원격 요약은 [document-links](../git-workflow/references/document-links.md)를 따른다.
fail/human-review가 남아 있으면 수정·추가 증거 또는 명시적 인간 결정이 먼저다.
spec-it을 채택한 프로젝트에서 정책 예외가 필요하면 spec-it의 예외 절차로 기록하며, 머지 승인만으로 예외를 만들지 않는다.

1. 위 Issue 연결 검사가 통과했는지 확인하고 PR headRefOid를 다시 조회해 검토 HEAD와 일치하는지 확인한다.
   검토 HEAD 뒤 커밋은 [기록 커밋](../pr-review/SKILL.md#7-기록-커밋) 규칙으로 판단한다.
   그 밖의 변경이면 [pr-review](../pr-review/SKILL.md)로 재검토를 인계하고 새 HEAD에 대한 승인을 받는다. 이전 pass·승인을 새 소스 HEAD에 재사용하지 않는다.
2. 사용자에게 검토 결과·남은 위험·머지 방식·대상 PR/HEAD를 제시한다.
   PR 생성·리뷰 요청이나 에이전트의 pass는 사용자 머지 승인이 아니다.
   이미 같은 범위의 명시 승인이 있으면 다시 묻지 않는다.
3. 검토 HEAD와 실제 PR HEAD의 일치 여부·기록 커밋 해당 여부·현재 결과·남은 위험·머지 승인 상태를 확인한 뒤, 댓글 게시/수정 요청이 있으면 [PR 댓글](../pr-review/references/pr-comment.md)에 따라 머지 직전 확인 결과만 기록한다.
   요청이 없으면 대화로 반환한다. 댓글 부재만으로 머지를 막지 않으며, 기존 fail/human-review·승인·보호 규칙은 유지한다.
   기록 커밋으로 인정되지 않은 HEAD 불일치도 요청된 확인 결과로 기록할 수 있다. 검토 HEAD와 실제 PR HEAD를 모두 적고 머지 보류·pr-review 인계를 기록한다. 이전 pass·승인을 새 소스 HEAD에 적용하거나 새 판정을 만들지 않는다.
   댓글 요청과 머지 승인은 별개이고, 확인 댓글은 새 검토나 머지 완료를 뜻하지 않는다.
4. 승인 범위 안에서 저장소의 머지 방식과 보호 규칙을 따른다.
   `gh pr merge <PR> --match-head-commit <확인한HEAD> <승인된머지방식>`처럼 HEAD 일치를 실행 시에도 요구한다.
   보호 규칙을 우회하거나 관리자 강제 머지를 하지 않는다.
5. 응답이 불명확하면 재실행보다 먼저 PR 상태를 조회한다.
   실제 `state=MERGED`, mergedAt, mergeCommit을 확인한다.
   auto-merge 등록이나 명령 exit 0만으로 머지 완료라 하지 않는다.
   미확인이면 merge-unconfirmed로 멈춘다.

## 머지 결과와 다음 행동

실제 머지가 확인되면 PR URL, mergedAt, mergeCommit과 검토·승인한 HEAD를 보고한다.
머지가 확인되지 않으면 merge-unconfirmed와 확인이 필요한 항목을 반환한다.
실제 MERGED 확인 뒤 [머지 후 작업 정리](references/post-merge-cleanup.md)를 읽어
정확한 대상·권한·보존 조건을 확인한다. PR 머지 승인은 해당 작업 worktree 정리도 포함하므로 안전 조건을 충족하면 별도 질문 없이 제거하고 사후 조회한다. 머지 결과 조회만 요청했거나 명시적 보존 요청이 있으면 제거하지 않는다. 로컬·원격 브랜치 삭제와 댓글 게시는 별도 승인 범위로 유지하고 원격/local/worktree 결과를 각각 보고한다.
설치된 [issue-close](../issue-close/SKILL.md)에 연결 Issue의 종료·결과 코멘트와 머지·정리 근거를 인계하고, 미설치면 대화 또는 작업용 임시 인계에 남긴다.
`Closes`로 자동 종료된 Issue도 결과 코멘트 보완 경로로 인계한다.

머지와 배포는 별도다.
Issue/PR의 배포·롤백 조건/권한과 실제 배포 workflow를 확인한다.
배포 승인이 없거나 환경이 미확인이면 필요한 다음 행동을 기록한다.
승인된 배포가 필요하면 해당 실행 절차로 인계하고, 배포 결과를 머지 완료와 구분한다.
