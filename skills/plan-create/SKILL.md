---
name: plan-create
description: '“Issue #12의 구현 계획을 작성해줘”, “이 Issue 계획의 todo를 보완해줘”처럼 GitHub Issue에 대한 plan·todo 작성이나 보완을 요청할 때 사용한다. Issue와 무관한 개인 할 일 목록에는 쓰지 않는다.'
---

# 계획과 Todo 작성

[공통 실행 경계](../git-workflow/references/execution-boundaries.md)를 적용한다.
문체는 [writing-conventions](../git-workflow/references/writing-conventions.md), 원격 기록은 [document-links](../git-workflow/references/document-links.md)를 읽는다.

## 계획 작성

1. 실제 Issue의 의도·영향 범위·달성 조건을 읽는다.
   부족하면 [issue-create](../issue-create/SKILL.md)로 반환한다.
   코드와 문서로 확인 가능한 내용은 먼저 조사한다.
2. [디렉토리 규칙](references/plan.md#디렉토리-규칙)에 따라 작업 디렉토리를 만든다.
   원격 Issue를 쓸 수 없으면 [로컬 파일럿 디렉토리 규칙](references/plan.md#로컬-파일럿-디렉토리-규칙)을 따른다.
3. [plan.md 템플릿](references/plan.md#planmd-템플릿)을 채운다.
   단계는 독립적으로 검증할 수 있는 단위로 나누고 검증과 전달·롤백을 포함한다.
4. 단계마다 [todo 양식](references/todos.md)으로 `task-{nn}-{step-title}.md`를 만든다.
5. 구현 방식에 영향을 주는 미결정은 결정과 변경 기록에 `보류`로 남기고 그 단계만 보류한다.
6. Issue에는 핵심 계획·남은 결정·확인된 문서 링크만 남긴다.
   댓글 게시는 요청 범위에서만 수행한다.

## 출력과 인계

plan의 상태는 [status 값](references/plan.md#프론트메터-규칙)을 따른다.
Issue 식별자와 문서 경로, plan/todo 링크, 준비된 작업과 보류 이유, 승인 범위를 반환한다.
계획 작성 완료와 구현 완료를 구분한다.
준비된 단위의 구현은 [git-workflow](../git-workflow/SKILL.md#구현-진행)에 전달한다.
