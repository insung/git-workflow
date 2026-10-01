# 파이썬 버전 업그레이드 / Python version upgrade

가상 요청: “dmp.crawler 프로젝트 파이썬 버전 업그레이드가 필요해. issue-create와 plan-create로 준비하고 진행해줘.” 목표 버전·현재 버전·파일 경로·배포 환경은 미확인이다. 이 문서는 실제 변경·테스트 통과·승인 증거가 아니다.

```mermaid
flowchart TD
    A[현재 버전·호환성 사전 조사] --> B[issue-create: Issue 재사용/생성]
    B --> C[plan-create: plan·01/02/03 todos]
    C --> D[구현 세션: dev에서 feature 분기]
    D --> E[런타임·의존성 수정과 테스트]
    E --> F[commit-rule·pr-create: dev PR과 handoff]
    F --> G[리뷰 세션: pr-review·review]
    G -->|보완 필요| E
    G -->|검토 완료| H[사용자 HEAD·방식 승인]
    H --> I[pr-merge: Issue·HEAD 재확인과 실제 머지]
```

| 문서 | 작성 시점과 용도 |
| --- | --- |
| [issue.md](issue.md) | 의도·영향 범위·달성 조건을 원격 Issue에 요약할 초안 |
| [plan.md](plan.md) | Issue 기반 맥락·작업 순서·검증·배포/롤백 계획 |
| [01-todos.md](01-todos.md) | 현재 실행 경로와 목표 버전 호환성 조사 |
| [02-todos.md](02-todos.md) | 런타임·의존성 구현과 테스트 |
| [03-todos.md](03-todos.md) | 배포 준비·PR 인계·독립 검토 |
| [handoff.md](handoff.md) | 실제 구현 커밋·테스트 결과를 리뷰 세션에 인계 |
| [pr.md](pr.md) | 실제 Issue 연결과 변경/검증 요약·docs 링크 |
| [review.md](review.md) | 검토 HEAD·의도·정책·테스트 근거 판단 |
| [local-pilot.md](local-pilot.md) | 실제 변경 없이 또는 로컬 초안만 작성해 시험하는 요청 |

예시의 `issue: null`은 원격 Issue가 없는 상태다. 실제 실행에서는 조회·생성한 Issue 번호를 plan에 기록하고 [경로 정본](../../../skills/plan-create/references/plan.md#경로와-준비-조건)에 따라 문서를 둔다. 이 예제 위치를 실제 작업 위치로 사용하지 않는다. 목표 버전 결정 전 영향받는 구현 단위는 보류한다.

Issue/PR에는 의도·현재 결과·남은 일과 확인한 docs 링크만 남긴다. 문서가 push되기 전에는 원격 링크 준비 중으로 기록한다. 다른 세션에는 Issue·문서 위치·브랜치·실제 HEAD·테스트 근거·미결정을 전달한다. 머지 이후 배포·릴리즈는 별도 범위이며 Wiki는 현재 범위에 없다.
