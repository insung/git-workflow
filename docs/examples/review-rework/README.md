# 리뷰 지적 보완 / Review rework

> Python 업그레이드 PR의 실패 응답 회귀 테스트가 부족해. 보완하고 다시 검토해줘.

## 흐름

pr-review: 부족한 사례 발견 → 구현 세션: 테스트/코드 보완 → commit-rule: 새 커밋 → PR 요약·handoff 갱신 → 새 HEAD pr-review → 새 HEAD 사용자 승인 → pr-merge 재확인

## 확인할 경계

- 테스트 결과에는 기대/실제·명령·환경·검토 커밋을 연결한다.
- 검토 HEAD A 이후 새 B가 생기면 A의 pass·승인을 B에 재사용하지 않는다.
