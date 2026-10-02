# 실제 사례: git-workflow v0.3.0 개선 / Real case

이 플러그인 자체를 이 워크플로우로 개선한 실제 기록이다. 가상 예제와 달리 Issue·PR·커밋·릴리즈가 실제로 있다.

| 항목 | 위치 |
| --- | --- |
| Issue | [#1](https://github.com/insung/git-workflow/issues/1) 의도·테스트 중심 리뷰와 템플릿 init, [#2](https://github.com/insung/git-workflow/issues/2) 단계별 스킬 분리(소급) |
| PR | [#3](https://github.com/insung/git-workflow/pull/3), merge commit `8f8c51b` |
| 릴리즈 | [v0.3.0](https://github.com/insung/git-workflow/releases/tag/v0.3.0) |
| 작업 문서 | [plan·todo·handoff·review](../../git-workflows/2026-10/02_1_template-init-review-cleanup/plan.md) |

## 흐름

| # | 단계 | 세션 | 스킬 | 산출물 | 사용자 결정 |
| --- | --- | --- | --- | --- | --- |
| 1 | 스킬 리뷰 | 계획 | superpowers:writing-skills | 트리거 모호 7건, 범위·규칙 불일치 12건 | 수정 방향 |
| 2 | 요구 정리 | 계획 | sideband-comments | 문서 코멘트 확인과 답글 | 불필요한 내용 제거, README 중심 |
| 3 | Issue 작성 | 계획 | issue-create | Issue #1 | 템플릿 init 추가, 트리거 수정 포함 |
| 4 | 계획 | 계획 | plan-create, sideband-comments | plan.md, 단계 todo 5개 | 표 중심 양식, AC ID는 Issue에만 |
| 5 | 검토 기준 고정 | 계획 | - | [검토 기준](../../git-workflows/2026-10/02_1_template-init-review-cleanup/review-criteria.md), 검증 입력 2개 | 구현 세션에 알리지 않음 |
| 6 | 구현 | 구현 | git-workflow, commit-rule, writing-skills | 단계별 커밋, todo 처리 내용, [handoff](../../git-workflows/2026-10/02_1_template-init-review-cleanup/handoff.md) | 버전 0.3.0 |
| 7 | 독립 검토 | 계획 | pr-review | 고정 입력으로 하위 에이전트 재실행, [review](../../git-workflows/2026-10/02_1_template-init-review-cleanup/review.md) | warn은 후속 Issue로 |
| 8 | PR | 계획 | issue-create, pr-create | 소급 Issue #2, PR #3 | 이전 커밋은 소급 Issue로 연결 |
| 9 | 설치 확인 | 계획 | - | description 잘림 발견, 수정과 재검토 | PR에서 수정 후 머지 |
| 10 | 머지·릴리즈 | 계획 | pr-merge, git-release | merge commit, 태그, Release | merge commit 방식 |

계획 세션은 Issue·계획·검토·머지를 맡았고, 구현 세션은 계획 문서만 보고 구현했다. 구현 세션에 준 지시는 계획 문서 위치, 단계 순서, 기록 방식, 하지 말 것(push·PR)이었다.

## 확인된 점

| 관찰 | 근거 | 반영 |
| --- | --- | --- |
| 구현 전에 고정한 검증 입력은 구현자의 자기 검증과 별개 근거가 됨. 미추적 파일로 두자 구현 세션이 읽고 사용함 | [review](../../git-workflows/2026-10/02_1_template-init-review-cleanup/review.md) W2 | 검증 입력 보관 규칙을 후속 Issue로 |
| 원문 description을 준 판정 시험은 YAML 주석 잘림을 잡지 못함. 설치 후 실제 스킬 목록에서 발견 | review의 재검토 절 | 구조 검사에 인용 검사 추가 |
| 변경 전에도 통과한 시험은 개선을 증명하지 못함 | TC-01 변경 전 실행에서 누락 지적 3/3 | 개선 근거를 정책 소음 제거로 한정해 기록 |
| `gh auth switch`는 커밋 작성자를 바꾸지 않음 | 일부 커밋이 다른 작성자로 생성됨 | 폴더별 git `includeIf` 설정 |
| 플러그인 이름을 scope로 쓰면 릴리즈 노트를 스킬별로 묶을 수 없음 | 커밋 18개가 같은 scope | 커밋·Issue·PR 제목 재작성 |
| 문서에 인용한 커밋 hash는 이력 재작성 때 함께 바꿔야 함 | 작성자·제목 재작성 두 번 | 재작성 시 인용 hash 일괄 갱신 |
