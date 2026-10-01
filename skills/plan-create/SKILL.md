---
name: plan-create
description: “이슈의 계획을 작성해줘”, “todo를 만들어줘”, “검증·배포 계획을 보완해줘”처럼 Issue 기반 작업 계획을 요청할 때 사용한다.
---

# 계획과 Todo 작성

[공통 실행 경계](../git-workflow/references/execution-boundaries.md)를 적용한다.
문체는 [writing-conventions](../git-workflow/references/writing-conventions.md), 원격 기록은 [document-links](../git-workflow/references/document-links.md)를 읽는다.

## 계획 작성

1. 실제 Issue 또는 명시된 로컬 파일럿의 local-draft를 읽고 의도·영향 범위·달성 조건을 확인한다.
   부족하면 [issue-create](../issue-create/SKILL.md)로 반환한다.
   코드와 문서로 확인 가능한 내용은 먼저 조사한다.
2. [plan의 경로·준비 조건](references/plan.md#경로와-준비-조건)을 읽고 plan.md를 만든다.
   원격 접근이 회복되면 그 절차에 따라 실제 Issue를 확인하고 작업 경로와 참조를 갱신한다.
3. Issue 맥락·사용자 의도·현재 동작과 수정 이유를 기록하고 독립 검증 가능한 01/02 작업 단위로 나눈다.
   단위 간 실행 흐름, 검증 시점과 최종 검사, 배포·전달 및 롤백 계획을 포함한다.
   문서 전용이면 배포가 필요 없는 이유와 전달 방법을 쓴다.
4. [todo 양식](references/todos.md)으로 `todos.md` 또는 `01-todos.md`, `02-todos.md`를 만든다.
   각 파일은 해당 plan 섹션에 연결하며 구체 작업·하위 task·검증 방법에 집중한다.
   맥락과 기준 커밋은 plan에 둔다.
5. 구현 방식에 영향을 주는 미결정이 있으면 그 작업만 보류한다.
   프로젝트의 계획 승인 경계를 따르되 이미 같은 범위의 승인이 있으면 반복 질문하지 않는다.
   실행하지 않은 테스트는 미실행으로 남긴다.
6. Issue에는 핵심 계획·남은 결정·확인된 docs 링크만 남긴다.
   전문은 복사하지 않으며 링크 준비가 안 됐으면 준비 중이라고 표시한다.
   댓글 게시도 요청 범위에서 수행한다.

## 출력과 인계

plan의 상태는 [상태 정의](references/plan.md#메타데이터와-상태)를 따른다.
Issue 식별자와 문서 경로, plan/todo 링크, 준비된 작업과 보류 이유, 승인 범위를 반환한다.
계획 작성 완료와 구현 완료를 구분한다.
준비된 단위의 구현은 [git-workflow](../git-workflow/SKILL.md#구현-진행)에 전달한다.
