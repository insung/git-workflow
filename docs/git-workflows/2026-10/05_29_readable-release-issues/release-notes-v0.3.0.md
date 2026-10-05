# v0.3.0 — 단계별 스킬과 Issue 기반 검토 도입

> 개정 초안. 공개 원문은 release-source.json 스냅샷 기준이며, 사용자 검토 승인 완료. 공개 반영은 별도 진행. 과거 버전의 동작·검증 기록.

Issue의 변경 의도부터 계획·구현·검토·머지까지 같은 근거로 잇는 단계별 스킬로 재구성한 첫 공개 릴리즈다.

## 기능·개선

- **단계별 스킬**: 하나였던 지침을 git-workflow(라우터), issue-create, plan-create, pr-create, pr-review, pr-merge, commit-rule, branch-strategy, git-release로 분리한다. ([Issue #2](https://github.com/insung/git-workflow/issues/2))
- **pr-review**: Issue·plan·todo로 의도를 파악한 뒤 구현과 테스트 누락을 교차 확인한다. Issue의 AC ID 중 todo 검증에 없는 ID를 테스트 누락으로 판정한다. ([Issue #1](https://github.com/insung/git-workflow/issues/1))
- spec-it 정책 검사는 `.architecture/manifest.yaml`·`lock.yaml`이 있는 프로젝트에서만 적용한다. ([Issue #1](https://github.com/insung/git-workflow/issues/1))
- **template-init**: 기능·버그 Issue와 PR 템플릿을 대상 저장소 `.github/`에 설치한다. ([Issue #1](https://github.com/insung/git-workflow/issues/1))
- 기존 템플릿은 바꾸지 않고 차이만 보고한다. ([Issue #1](https://github.com/insung/git-workflow/issues/1))
- **plan-create**: 표 중심 plan·todo 양식과 작업별 처리 내용·결과 기록 칸을 제공한다. ([Issue #1](https://github.com/insung/git-workflow/issues/1))
- 달성 조건과 AC ID는 Issue에만 둔다. ([Issue #1](https://github.com/insung/git-workflow/issues/1))
- **branch-strategy**: dev·feature·prod·hotfix 역할과 역반영 경로를 안내한다. ([Issue #2](https://github.com/insung/git-workflow/issues/2))
- PR 생성과 머지 전에 실제 원격 Issue 연결을 검사한다. ([Issue #2](https://github.com/insung/git-workflow/issues/2))

## 수정

- 스킬 description을 각 스킬의 고유 요청으로 한정해 비슷한 요청이 엉뚱한 스킬로 가지 않도록 한다. ([Issue #1](https://github.com/insung/git-workflow/issues/1))
- git-workflow·plan-create description이 YAML 주석으로 잘려 선택되지 않던 문제를 수정한다. ([Issue #1](https://github.com/insung/git-workflow/issues/1))
- 앞 단계의 승인이 다른 행동으로 넘어가지 않도록 승인 범위를 행동·대상 기준으로 정리한다. ([Issue #1](https://github.com/insung/git-workflow/issues/1))
- 커밋 메시지에 호환성 표기를 강제하지 않고 본문에 배경과 의도를 쓰도록 안내한다. ([Issue #2](https://github.com/insung/git-workflow/issues/2))

## 전환 안내

- todo 파일 이름: `{nn}-todos-{step-title}.md`
- Issue·PR 템플릿 정본 위치: `skills/template-init/assets/.github/`
- 이미 작성된 대상 저장소의 `docs/git-workflows/` 문서와 `.github/` 템플릿은 바꾸지 않는다.
- pr-merge의 Wiki 작성 절차를 제거한다.

## 설치 안내

Claude Code는 마켓플레이스를 갱신한 뒤 플러그인을 0.3.0으로 갱신하고 재시작한다. 명령은 README의 Installation 절을 따른다.

## 변경 근거

- [첫 공개 릴리즈: PR #3](https://github.com/insung/git-workflow/pull/3)
