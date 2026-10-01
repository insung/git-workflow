---
name: pr-merge
description: “검토한 PR을 머지해줘”, “PR 머지 결과를 확인해줘”처럼 검토한 PR의 사용자 승인 후 머지나 실제 머지 결과 확인을 요청할 때 사용한다.
---

# PR 머지

[공통 실행 경계](../git-workflow/references/execution-boundaries.md)를 적용한다.

## 실제 Issue 연결: 머지 필수 조건

PR 본문의 Issue 항목에서 `#번호`, `owner/repository#번호` 또는 전체 Issue URL을 읽고 [Issue 연결 검사](../git-workflow/references/issue-link.md)를 적용한다.
GitHub의 실제 Issue이며 PR이 아닌지, 변경 의도·영향 범위·달성 조건이 이번 PR과 최종 검토 결과에 연결되는지 확인한다.

번호 누락·잘못된 참조·접근 불가·필수 내용 부족·내용 불일치이면 머지를 보류하고 원인을 보고한다.
local-draft는 대신할 수 없다.
closed Issue는 현재 작업과의 관계로 판단한다.
이 검사 통과는 사용자 머지 승인이 아니다.
머지 직전 최신 본문과 Issue를 확인한다.

## 머지 전

Issue, plan/todo, PR URL, 검토한 HEAD와 결과, docs 증거와 전달/배포 계획을 확인한다.
기록은 [문체](../git-workflow/references/writing-conventions.md), 원격 요약은 [document-links](../git-workflow/references/document-links.md)를 따른다.
fail/human-review가 남아 있으면 수정·추가 증거 또는 명시적 인간 결정이 먼저다.
spec-it을 채택한 프로젝트에서 정책 예외가 필요하면 spec-it의 예외 절차로 기록하며, 머지 승인만으로 예외를 만들지 않는다.

1. 위 Issue 연결 검사가 통과했는지 확인하고 PR headRefOid를 다시 조회해 검토 HEAD와 일치하는지 확인한다.
   바뀌면 재검토하고 새 HEAD에 대한 승인을 받는다.
2. 사용자에게 검토 결과·남은 위험·머지 방식·대상 PR/HEAD를 제시한다.
   PR 생성·리뷰 요청이나 에이전트의 pass는 사용자 머지 승인이 아니다.
   이미 같은 범위의 명시 승인이 있으면 다시 묻지 않는다.
3. 승인 범위 안에서 저장소의 머지 방식과 보호 규칙을 따른다.
   `gh pr merge <PR> --match-head-commit <검토한HEAD> <승인된머지방식>`처럼 HEAD 일치를 실행 시에도 요구한다.
   보호 규칙을 우회하거나 관리자 강제 머지를 하지 않는다.
4. 응답이 불명확하면 재실행보다 먼저 PR 상태를 조회한다.
   실제 `state=MERGED`, mergedAt, mergeCommit을 확인한다.
   auto-merge 등록이나 명령 exit 0만으로 머지 완료라 하지 않는다.
   미확인이면 merge-unconfirmed로 멈춘다.

## 머지 결과와 다음 행동

실제 머지가 확인되면 PR URL, mergedAt, mergeCommit과 검토·승인한 HEAD를 보고한다.
머지가 확인되지 않으면 merge-unconfirmed와 확인이 필요한 항목을 반환한다.

머지와 배포는 별도다.
plan의 배포·롤백 조건/권한과 실제 배포 workflow를 확인한다.
배포 승인이 없거나 환경이 미확인이면 필요한 다음 행동을 기록한다.
승인된 배포가 필요하면 해당 실행 절차로 인계하고, 배포 결과를 머지 완료와 구분한다.
