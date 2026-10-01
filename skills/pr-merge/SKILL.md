---
name: pr-merge
description: 검토한 PR의 사용자 승인 후 머지, 또는 확인된 머지의 GitHub Wiki 기록·게시를 요청할 때 사용한다. 검토 HEAD와 승인 범위를 확인하고 실제 머지·게시 결과를 구분한다.
---

# Workflow Merge and Wiki

## 사용 조건

“검토한 PR을 머지해줘”, “머지한 기능을 Wiki에 정리해줘” 요청에 적용한다. 리뷰 완료만으로 머지를 시작하지 않으며, 머지와 Wiki 게시의 승인 범위를 각각 확인한다.

## 공통 실행 경계

먼저 [공통 경계](../git-workflow/SKILL.md#공통-실행-경계)를 읽는다. Issue·PR·검토 HEAD·증거·승인 범위를 다음 단계에 전달한다. 이미 승인된 범위는 다시 묻지 않으며 승인 범위를 확대하지 않는다.

## 실제 Issue 연결: 머지 필수 조건

PR 본문의 Issue 항목에서 `#번호`, `owner/repository#번호` 또는 전체 Issue URL을 읽고 [Issue 연결 검사](../git-workflow/references/issue-link.md)를 적용한다. GitHub의 실제 Issue이며 PR이 아닌지, 변경 의도·영향 범위·달성 조건이 이번 PR과 최종 검토 결과에 연결되는지 확인한다.

번호 누락·잘못된 참조·접근 불가·필수 내용 부족·내용 불일치이면 머지를 보류하고 원인을 보고한다. local-draft는 대신할 수 없다. closed Issue는 현재 작업과의 관계로 판단한다. 이 검사 통과는 사용자 머지 승인이 아니다. 머지 직전 최신 본문과 Issue를 확인한다.

## 머지 전

Issue, plan/todo, PR URL, 검토한 HEAD와 결과, docs 증거와 전달/배포 계획을 확인한다. 기록은 [문체](../git-workflow/references/writing-conventions.md), 원격 요약은 [document-links](../git-workflow/references/document-links.md)를 따른다. fail/human-review가 남아 있으면 수정·추가 증거 또는 명시적 인간 결정이 먼저다. 정책 예외가 필요하면 spec-it의 예외 절차로 기록해야 하며 머지 승인만으로 예외를 만들지 않는다.

1. 위 Issue 연결 검사가 통과했는지 확인하고 PR headRefOid를 다시 조회해 검토 HEAD와 일치하는지 확인한다. 바뀌면 재검토하고 새 HEAD에 대한 승인을 받는다.
2. 사용자에게 검토 결과·남은 위험·머지 방식·대상 PR/HEAD·Wiki 발행 범위를 제시한다. PR 생성·리뷰 요청이나 에이전트의 pass는 사용자 머지 승인이 아니다. 이미 같은 범위의 명시 승인이 있으면 다시 묻지 않는다.
3. 승인 범위 안에서 저장소의 머지 방식과 보호 규칙을 따른다. `gh pr merge <PR> --match-head-commit <검토한HEAD> <승인된머지방식>`처럼 HEAD 일치를 실행 시에도 요구한다. 보호 규칙을 우회하거나 관리자 강제 머지를 하지 않는다.
4. 응답이 불명확하면 재실행보다 먼저 PR 상태를 조회한다. 실제 `state=MERGED`, mergedAt, mergeCommit을 확인한다. auto-merge 등록이나 명령 exit 0만으로 머지 완료라 하지 않는다. 미확인이면 merge-unconfirmed로 멈춘다.

## 확인된 머지 후 Wiki

확인된 merge commit과 Issue·PR·docs를 근거로 [Wiki 계약과 양식](references/wiki.md)을 채운다. 기능의 의도·실제 동작·설계 이유·사용/운영 방법·검증 범위·제약·출처를 기록하고 배포 여부를 추측하지 않는다. 기존 Wiki의 페이지 구조·제목·언어를 따른다.

- Wiki 게시까지 명시적으로 승인되었다면 초안을 검토 가능한 상태로 만든 뒤 그 범위에서 게시한다. 머지만 승인되었다면 해당 docs/git-workflows 작업 디렉토리의 wiki.md에 wiki-draft를 만들고 발행 승인 대상으로 반환한다.
- Wiki 활성화·접근·기존 페이지를 먼저 확인한다. 접근 불가나 Wiki 비활성화이면 해당 docs/git-workflows 작업 디렉토리의 wiki.md에 초안과 wiki-unpublished를 남기고 임의로 설정을 켜거나 다른 공개 위치에 게시하지 않는다.
- Wiki는 별도 `<repository>.wiki.git` 저장소다. 명령에 토큰을 넣지 않고 별도 작업 디렉터리에서 승인된 페이지만 변경한다. 전체 Wiki를 덮어쓰거나 개인 clone 경로를 공통 문서에 기록하지 않는다.
- 게시 후 원격 Wiki commit/페이지 내용을 확인하고 실제 URL과 merge commit 출처를 보고한다. 실패하면 로컬 초안을 보존하며 완료라고 하지 않는다. Wiki 재시도는 이미 merged인 PR을 다시 머지하지 않고 기록된 merge commit부터 재개한다.

결과는 merged + wiki-published 또는 merged + wiki-draft/wiki-unpublished다. 머지와 문서 발행이 모두 확인되어야 전체 전달 완료로 보고한다.

머지와 배포는 별도다. plan의 배포·롤백 조건/권한과 실제 배포 workflow를 확인하고 승인된 실행만 진행한다. 배포 승인이 없거나 환경이 미확인이면 필요한 다음 행동을 기록한다. Wiki에는 배포 확인 전 기능이 운영 중이라고 쓰지 않는다.
