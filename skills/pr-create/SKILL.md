---
name: pr-create
description: “PR을 만들어줘”, “PR 본문을 작성해줘”처럼 구현한 변경의 PR 생성·본문·리뷰 인계를 요청할 때 사용한다.
---

# PR 작성

[공통 실행 경계](../git-workflow/references/execution-boundaries.md)를 적용한다.
제목·본문·라벨·문서 링크는 라우터 references의 [표기](../git-workflow/references/change-conventions.md), [문체](../git-workflow/references/writing-conventions.md), [labels](../git-workflow/references/labels.md), [document-links](../git-workflow/references/document-links.md)를 읽는다.

1. 실제 Issue, plan, todo, 구현 diff/commit, 테스트 결과를 확인한다.
   PR 본문에 Issue 항목을 넣고 [Issue 연결 검사](../git-workflow/references/issue-link.md)를 적용한다.
   보류 조건에 해당하면 원격 PR 생성을 보류하고 원인을 기록한 local-pr-draft로 반환한다.
   구현이 아직이면 [task-implement](../task-implement/SKILL.md)로 돌아간다.
   테스트 미실행/부족은 review-pending이며 초안에 그대로 기록한다.
   필요한 저장소 검사를 우회해 ready로 만들지 않는다.
2. [handoff 계약](references/handoff.md)으로 구현 결과를 docs 작업 디렉토리에 기록한다.
   계획 이탈·AC별 구현과 테스트·commit·위험·배포/롤백 입력을 연결한다.
   todo 완료 주장과 실제 파일/증거를 대조한다.
3. [PR 상세·양식](references/pr.md)을 따른다.
   대상의 기존 PR template 절 이름을 유지하고 필수 인계만 보완한다.
   plan/todo 전문 대신 변경·검증·위험 요약과 확인된 링크를 쓴다.
4. 기존 PR을 조회해 중복을 피한다.
   base/head·요청 범위·필요 라벨을 확인하고 승인된 push/PR 생성/리뷰 요청만 실행한다.
   실제 URL/headRefOid와 본문의 Issue 항목·라벨을 재확인한다.
   생성 응답 불명은 재조회한다.
   접근 불가면 local-pr-draft로 반환한다.
5. [pr-review](../pr-review/SKILL.md)에 Issue·plan/todo·handoff·검토 base/HEAD·테스트 근거·정책 위치를 인계한다.
   대화 내 검토/별도 세션은 선택 사항이다.
   GitHub reviewer 지정·검토 댓글은 승인 범위를 확인한다.
   PR 생성 승인은 머지 승인이 아니다.
