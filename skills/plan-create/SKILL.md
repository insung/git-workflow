---
name: plan-create
description: '“Issue #12의 구현 계획을 작성해줘”, “이 Issue 계획을 보완해줘”처럼 Issue의 실행 방향·검증·전달 계획 작성이나 보완을 요청할 때 사용한다. 개인 할 일 목록에는 쓰지 않는다.'
---

# Issue의 계획 작성

[공통 실행 경계](../git-workflow/references/execution-boundaries.md), [문체](../git-workflow/references/writing-conventions.md), [기록 위치](../git-workflow/references/document-links.md)를 적용한다.

1. 실제 Issue의 요청 원문·목표·영향 범위·제약·달성 조건을 읽는다. 부족한 사실은 조사하고, 사람이 정해야 할 의도·범위는 질문한다. 미합의 목표나 AC를 확정하지 않는다. 부족하면 [issue-create](../issue-create/SKILL.md)로 반환한다.
2. [계획 양식](references/plan.md#issue-안의-계획)에 따라 Issue의 `계획` 절 초안을 작성한다. 구현 방향과 중요한 이유, AC별 예상 검증, 전달·배포·롤백을 판단에 필요한 만큼 쓴다. 미확인과 보류는 구별한다.
3. [상세 plan 생성 조건](references/plan.md#상세-plan-생성-조건)을 대조한다. Issue 안에서 실행할 수 있으면 파일을 만들지 않는다. 분리가 필요하면 이유와 진입 링크를 Issue에 남기고 plan 하나부터 만든다. 단계 task·handoff·review·evidence를 일괄 생성하지 않는다.
4. 구현 전에 AC별 판정 기준을 준비한다. 별도 고정 입력이 필요한 경우에만 [검토 기준·입력](references/review-criteria.md)을 만든다. 구현자가 볼 수 없는 위치와 고정 상태를 확인하고 인계한다. 작성·열람 세션은 그 Issue를 구현하지 않는다.
5. 초안을 사실·제안·사용자 결정과 원문 의미에 대조한다. 핵심 구현 결정이 보류면 해당 단계만 보류한다. 권한이 있는 Issue 갱신만 실행하며, 갱신 권한이 없으면 대화에 초안을 반환한다. 댓글을 자동 게시하지 않는다.

## 출력과 인계

Issue URL, 본문 계획 또는 필요한 상세 plan 위치와 분리 이유, 검증 사례, 독립 검토 기준의 접근 경계·고정 상태, 준비된 범위·남은 결정·승인 범위를 반환한다. 계획 준비는 구현·배포 완료가 아니다. 구현은 [task-implement](../task-implement/SKILL.md)에 인계한다.

기존 plan/task 작업은 [재개 규칙](references/plan.md#기존-작업-재개)을 따른다. 원격 불가이면 [로컬 파일럿](references/plan.md#로컬-파일럿-디렉토리-규칙)으로 구분한다.
