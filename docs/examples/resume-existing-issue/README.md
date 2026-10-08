# 기존 Issue 재개 / Resume an existing Issue

> Issue #123의 계획을 읽고 남은 Python 업그레이드를 이어서 진행해줘.

## 흐름

Issue 참조 확인 → git-workflow로 현재 단계 선택 → plan/todo와 실제 브랜치·HEAD·테스트 근거 대조 → git-workflow의 공통 구현 절차로 미완료 구현·검증 → commit-rule·pr-request → 독립 pr-review → 사용자 승인·pr-merge

## 확인할 경계

- 기존 Issue를 조회해 이어서 쓰고 새 Issue를 만들지 않는다.
- 목표 버전과 이전 세션의 미결정이 그대로 남아 있으면 영향받는 작업을 보류한다.
- 완료 체크와 증거가 다르면 실제 증거를 확인하며 필요한 테스트를 다시 수행한다.
