# 리뷰 지적 보완 / Review rework

가상 시나리오이며 실제 Issue·검증·승인·배포 기록이 아니다.

> Python 업그레이드 PR의 실패 응답 회귀 테스트가 부족해. 보완하고 다시 검토해줘.

## 흐름

pr-review: 부족한 사례 발견 → 구현 세션: 테스트/코드 보완 → commit-rule: 새 커밋 → PR 요약·handoff 갱신 → 새 HEAD pr-review → 새 HEAD 사용자 승인 → pr-merge 재확인

## 확인할 경계

- 테스트 결과에는 기대/실제·명령·환경·검토 커밋을 연결한다.
- 검토 HEAD A 이후 새 B가 생기면 A의 pass·승인을 B에 재사용하지 않는다.
- 실제 Issue 연결이 없거나 PR 번호·접근 불가·불일치라면 머지를 보류한다.

다음 세션에는 실제 Issue·plan/todos 위치·브랜치·HEAD·검증 근거·미결정을 전달한다. 상세 문서는 대상 리포의 [plan 경로 정본](../../../skills/plan-create/references/plan.md#디렉토리-규칙)을 따른다. 규칙과 필수 입력은 [한국어 README](../../../README.ko.md#스킬양식과-필수-입력) 및 [English scenarios](../../../README.md#workflow-scenarios)를 참고한다.
