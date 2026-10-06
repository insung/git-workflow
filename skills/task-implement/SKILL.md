---
name: task-implement
description: '“Issue #12의 준비된 계획을 구현해줘”, “plan의 01 단계를 구현해줘”처럼 합의된 실행 계획의 구현을 요청할 때 사용한다. 계획 작성에는 쓰지 않는다.'
---

# 준비된 계획 구현

[공통 실행 경계](../git-workflow/references/execution-boundaries.md), [문체](../git-workflow/references/writing-conventions.md), [커밋](../commit-rule/SKILL.md)을 따른다.

## 입력

Issue의 요청·목표·영향·제약·AC·현재 계획을 읽는다. 연결된 상세 plan이나 담당 task가 있으면 추가로 읽는다. 기존 작업은 [재개 규칙](../plan-create/references/plan.md#기존-작업-재개)을 따른다. plan/task/handoff 파일 부재 자체는 입력 부족이 아니다.

읽지 않음: 독립 리뷰 브랜치·worktree·리뷰 전용 위치의 기준·고정 입력·기대 지적. 목록·검색·checkout·git show·diff로도 읽지 않는다. 공개된 실패 지적은 읽되 숨은 입력은 읽지 않는다. 이 Issue의 비공개 기준을 작성/열람했으면 구현하지 않고 별도 구현 역할로 인계한다 ([보관 위치](../plan-create/references/review-criteria.md#보관-위치)).

의도·범위·AC가 부족하면 issue-create, 실행 방향·검증·전달 준비가 부족하면 plan-create로 반환한다. 구현 결과에 영향을 주는 인간 결정이 보류면 해당 단계만 보류한다. 조사로 알 수 있는 내용을 사용자에게 떠넘기지 않는다.

## 절차

1. 브랜치·HEAD·index·미커밋 변경과 담당 경계를 확인한다. 독립 검토 기준·입력의 고정 상태를 인계에서 확인한다. 미확인이면 구현 준비 부족으로 기록한다.
2. Issue 계획의 준비된 단위를 실행한다. 선택적 task나 기존 표가 있으면 그 순서를 따른다. 목적·제약·유지 조건을 실제 변경과 대조한다.
3. 의미 있는 정상·실패·경계·유지 검증 중 해당 사례를 실행한다. SKILL.md·references·assets의 지시 변경이면 변경 전 소스(RED)와 변경 후 소스(GREEN)의 같은 시나리오를 [새 실행자](../git-workflow/references/execution-boundaries.md#검증-실행-주체)로 실행한다. 변경 전에도 통과한 항목은 개선을 입증했다고 하지 않는다. 미실행이면 이유를 남긴다.
4. 결과는 PR 본문 준비용 대화/임시 초안에 AC별 기대·실제·명령/방법·대상 commit·환경·시각·미실행 이유를 남긴다. 현재 소스가 바뀌면 영향받는 검증을 다시 확인한다. 과거 통과는 이력이다.
5. 중요한 선택·계획 이탈·범위 밖 발견을 구분한다. 승인되지 않은 의도·범위 변경은 제안으로 남긴다. 범위 밖 문제를 자동 구현하거나 후속 Issue로 자동 게시하지 않는다.
6. 커밋이 요청·승인된 범위이면 주제별로 커밋한다. 커밋이 없으면 파일·patch/digest를 식별한다. 결과 기록을 위한 handoff·task·docs 전용 커밋은 필수가 아니다.
7. 합의된 최종 검증과 전달 조건을 확인하고 [pr-create](../pr-create/SKILL.md)에 Issue·결과·근거·남은 조치를 인계한다. 복잡한 환경 인계가 필요할 때만 [선택적 handoff](../pr-create/references/handoff.md)를 만든다.

## 기록 규칙

실제 실행 결과와 독립 판정을 구별한다. 기존 task의 완료·처리 내용·결과 칸은 계속 갱신하고 완료 표시는 근거가 있을 때만 한다. 기존 plan의 단계·결정 기록도 합의된 범위에서 이어간다. 새 방식에서는 같은 내용을 Issue·task·handoff에 반복하지 않는다. [증거 수명](../git-workflow/references/document-links.md#증거와-실행-로그)을 적용하며 임시 파일을 공유 가능한 결과로 대신하지 않는다. 실제 Issue/PR 갱신과 댓글은 승인 범위에서만 실행한다.
