---
name: pr-create
description: “PR을 만들어줘”, “PR 본문을 작성해줘”처럼 구현한 변경의 PR 생성·본문·리뷰 인계를 요청할 때 사용한다.
---

# PR 작성

[공통 실행 경계](../git-workflow/references/execution-boundaries.md), [표기](../git-workflow/references/change-conventions.md), [문체](../git-workflow/references/writing-conventions.md), [라벨](../git-workflow/references/labels.md), [기록 위치](../git-workflow/references/document-links.md)를 따른다.

PR base/head 결정 전에 [프로젝트 전략 정본](../git-workflow/references/project-branch-policy.md)을 읽고 요청과 대조한다. 정책의 PR 대상과 요청이 충돌하거나 필요한 대상이 미정이면 해당 결정·생성을 보류하고 확인한다.

1. 실제 담당·부모 Issue·현재 계획·부모 AC 대응·diff/commit·검증 결과를 확인한다. 별도 plan/task/handoff가 없다는 이유로 거절하지 않는다. 기존 연결 문서는 읽되 실제 결과와 대조한다. [Issue 연결 검사](../git-workflow/references/issue-link.md)가 부족하면 local-pr-draft를 반환한다.
2. AC별 실제 구현·검증·미실행과 중요한 결정·차이·위험·배포/롤백을 [인계 정보](references/handoff.md)와 대조한다. 결과가 부족하면 [git-workflow의 공통 구현 절차](../git-workflow/references/implementation.md)로 증거 보완을 인계한다. 테스트 부족은 review-pending이며 ready로 만들지 않는다.
3. [본문 규칙](references/pr.md#본문-작성편집-순서)과 대상의 같은 뜻 템플릿 절을 따른다. Issue 기준은 연결하고 실제 결과만 기록한다. 새 자산과 절 이름이 다르다는 이유로 기존 템플릿을 교체하지 않는다.
4. 기존 동일 PR·base/head·라벨·승인 범위를 확인하고 승인된 push/PR 생성만 실행한다. 본문 파일을 사용한다. 실제 URL·headRefOid·본문·Issue 참조·라벨·assignee login을 재확인한다. 응답 불명은 재조회로 중복을 피한다. 접근 불가이면 local-pr-draft다.
5. pr-review에 실제 담당·부모 Issue·공개 계획·base/HEAD·diff·AC 결과·근거와 독립 기준의 보관 위치를 인계한다. PR 본문이 기본 인계이며 별도 파일/댓글을 자동 생성하지 않는다. GitHub reviewer 지정·댓글 신규 게시/수정은 그 행동이 요청된 경우만 실행한다. PR 생성 승인은 댓글이나 머지 승인이 아니다.

## 출력

PR URL·실제 headRefOid·라벨·assignee login·검증 상태·남은 검토·미적용 사유를 반환한다.
