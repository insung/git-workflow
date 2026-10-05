# Issue #29 확장 범위

## 목표

릴리즈 제목과 본문을 GitHub CLI를 참고한 핵심 요약·변경 분류 형식으로 통일하고, Issue·PR 본문에도 결과 중심 작성·편집 기준을 적용한다. 여러 결과와 적용 조건이 섞인 항목을 편집해 독자가 달라진 동작과 필요한 조치를 이해하도록 한다.

## 영향 범위

포함

- 공통 문체의 결과 중심 편집 절차와 Issue·릴리즈 설명 목록의 완결된 문장 허용
- `git-release`의 제목·변경 선정·문장 편집 기준과 작성 예시
- `issue-create`의 본문 작성·편집 절차, 기능·버그 템플릿 안내와 예시
- `pr-create`의 변경 결과·검증 결론·위험·다음 행동을 구별하는 편집 절차, PR 템플릿 안내와 예시
- PR 설명 목록의 완결된 문장 허용과 PR #30 본문의 해당 기준 적용
- v0.3.0·v0.5.0·v0.6.0 릴리즈 노트의 개정 초안
- 커밋·PR·실제 변경을 대조한 기능·개선, 수정, 전환 안내 분류

제외

- 스킬의 기능·승인 절차 변경
- 태그 변경, 새 버전 발행, 플러그인 설치
- 개정 초안 검토 전 공개 Release 본문 수정
- 다른 세션의 미추적 `.github/` 설정 수정

호환성·운영 영향

- 문서 편집에 따른 동작 변경 없음. 과거 버전의 설명은 해당 버전 당시 동작을 유지한다.

## 달성 조건

- [x] AC-01: 제목이 `v버전 — 핵심 변화` 형식으로 일관되게 작성됨
- [x] AC-02: 본문에서 핵심 요약, 변경 종류별 결과, 필요한 전환 조치를 구별할 수 있음
- [x] AC-03: 각 항목의 핵심 결과가 먼저 드러나고, 독립적인 결과·승인 조건·보존 동작이 뒤섞이지 않음
- [x] AC-04: 선정한 배포 범위의 사용자 영향 변경이 누락·중복 없이 담기고 관련 PR 또는 변경 비교로 추적 가능함
- [x] AC-05: 세 버전의 개정 초안에서 기존 승인 조건·호환성 안내·검증 한계를 보존하며, 검토와 공개 반영 상태를 구분할 수 있음

- [x] AC-06: Issue 본문에서 목표·포함/제외 범위·달성 조건·확인된 사실을 구별할 수 있고, 구현 방법이나 실행 절차가 달성 조건과 혼재하지 않음
- [x] AC-07: Issue·릴리즈의 설명 목록은 완결된 문장으로 작성 가능하고, 제목·표의 짧은 값·AC는 기존 명사형 기준 유지

- [ ] AC-08: PR 본문에서 변경 후 동작을 먼저 이해할 수 있고, 핵심 결과와 적용 조건·보존 동작이 구별됨
- [ ] AC-09: PR 본문에서 현재 검토 대상의 검증 결론·미검증·위험·다음 행동을 구별할 수 있고, 상세 실행 이력은 근거 링크로 추적 가능함
- [ ] AC-10: PR 설명 목록은 완결된 문장으로 작성 가능하며, 기존 템플릿의 절 이름·필수 인계·Issue 연결·승인 경계와 제목·짧은 표 값·AC의 명사형 기준 유지

## 지금 알고 있는 것

- 사용자는 GitHub CLI를 참고한 형식을 선택했다.
- 커밋 type은 변경 후보를 찾는 기준으로 사용한다. `docs`·`refactor`도 사용자 동작이나 호출 방법에 영향을 주면 포함한다.
- 한 기능의 여러 커밋은 결과 단위로 묶는다. 관련 조건은 짧은 설명으로 붙이고, 별도로 판단할 정보는 항목을 나눈다.
- v0.4.0 공개 Release가 없으므로 v0.5.0의 공개 릴리즈 비교 범위는 v0.3.0부터 확인한다.
- 개정 초안 사용자 검토 승인 완료. 공개 Release 반영은 별도 작업이다. PR #30의 기존 AC-01~07은 검증 완료이며, 추가 AC-08~10은 구현·검증 대기다. 추가 범위 완료 전 PR 머지와 Issue 종료는 보류한다.

## 참고 링크

- [GitHub CLI 릴리즈](https://github.com/cli/cli/releases)
- [GitHub 자동 릴리즈 노트](https://docs.github.com/en/repositories/releasing-projects-on-github/automatically-generated-release-notes)
- [v0.5.0 릴리즈](https://github.com/insung/git-workflow/releases/tag/v0.5.0)
- [v0.6.0 릴리즈](https://github.com/insung/git-workflow/releases/tag/v0.6.0)

- [구현 PR #30](https://github.com/insung/git-workflow/pull/30)
- [계획](https://github.com/insung/git-workflow/blob/1dffee8ef9338e6761485bc77bfdc999c2cafd30/docs/git-workflows/2026-10/05_29_readable-release-issues/plan.md)
- [구현·검증 인계](https://github.com/insung/git-workflow/blob/1dffee8ef9338e6761485bc77bfdc999c2cafd30/docs/git-workflows/2026-10/05_29_readable-release-issues/handoff.md)
- [독립 검토와 AC 대조](https://github.com/insung/git-workflow/blob/1dffee8ef9338e6761485bc77bfdc999c2cafd30/docs/git-workflows/2026-10/05_29_readable-release-issues/review.md)
- [원문 보존 대조](https://github.com/insung/git-workflow/blob/1dffee8ef9338e6761485bc77bfdc999c2cafd30/docs/git-workflows/2026-10/05_29_readable-release-issues/release-preservation.md)
