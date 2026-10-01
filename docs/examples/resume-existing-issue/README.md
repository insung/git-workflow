# 기존 Issue 재개 / Resume an existing Issue

가상 시나리오이며 실제 Issue·검증·승인·배포 기록이 아니다.

> Issue #123의 계획을 읽고 남은 Python 업그레이드를 이어서 진행해줘.

## 흐름

Issue 참조 확인 → git-workflow로 현재 단계 선택 → plan/todo와 실제 브랜치·HEAD·테스트 근거 대조 → 미완료 구현·검증 → commit-rule·pr-create → 독립 pr-review → 사용자 승인·pr-merge

## 확인할 경계

- #123은 가상 번호다. 실제 Issue를 조회하며 기존 Issue를 중복 생성하지 않는다.
- 목표 버전과 이전 세션의 미결정이 그대로 남아 있으면 영향받는 작업을 보류한다.
- 완료 체크와 증거가 다르면 실제 증거를 확인하며 필요한 테스트를 다시 수행한다.

다음 세션에는 실제 Issue·plan/todos 위치·브랜치·HEAD·검증 근거·미결정을 전달한다. 상세 문서는 대상 리포의 [plan 경로 정본](../../../skills/plan-create/references/plan.md#디렉토리-규칙)을 따른다. 규칙과 필수 입력은 [한국어 README](../../../README.ko.md#스킬양식과-필수-입력) 및 [English scenarios](../../../README.md#workflow-scenarios)를 참고한다.
