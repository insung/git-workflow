---
name: git-release
description: “릴리즈 노트를 작성해줘”, “태그와 Release를 만들어줘”처럼 버전·배포 지점 기준의 릴리즈 노트·태그·GitHub Release 준비나 발행을 요청할 때 사용한다. 릴리즈와 무관한 커밋 이력 요약에는 쓰지 않는다.
---

# 릴리즈

[공통 실행 경계](../git-workflow/references/execution-boundaries.md)를 적용한다.

제목·변경 분류는 [공통 표기](../git-workflow/references/change-conventions.md), 기록은 [공통 문체](../git-workflow/references/writing-conventions.md)를 적용한다.
Issue/PR의 배포 조건과 확인된 검증 근거를 대조하고 필요한 기존 plan을 추가로 읽는다.
대상 저장소의 마일스톤 운영 기준을 읽고 [범위·100%·이월·종료 절차](../git-workflow/references/milestones.md#릴리즈-범위와-이월)를 적용한다. 마일스톤을 사용하는 릴리즈는 확정 범위 완료·100%와 실제 태그 포함을 발행 준비 조건으로 확인한다. 열린 필수 작업·미승인 이월·포함 범위 미확인은 발행을 보류한다. 마일스톤을 사용하지 않는 저장소에 생성을 강제하지 않는다.

## 릴리즈 Issue와 추가 작업

[릴리즈 기록 기준](references/release-context.md)을 적용한다. 태그·Release 작업 자체는 별도 Issue를 강제하지 않으며, 순수 준비 PR의 예외 조건과 대체 기록은 해당 기준을 따른다. 새 동작·정책·문서 정리 등의 추가 작업은 같은 완료·전달 단위면 릴리즈 Issue에 기록할 수 있고, 독립 추적이 필요하면 기존 분리 기준으로 연결한다. 복합 이슈의 개별 요청·결정과 실제 수정의 대응을 남긴다.

## 태그와 릴리즈

배포 방식과 태그 이름은 저장소마다 다르므로 기존 workflow, 문서와 최근 태그를 먼저 확인한다.

```bash
git tag --sort=-creatordate | head -10
git log --first-parent --pretty=format:'%s' <이전-태그>..<현재-태그>
```

- 검증된 커밋에만 배포 태그를 붙인다.
- type별 버전 후보는 [공통 표기의 type 표](../git-workflow/references/change-conventions.md#제목)를 따른다.
  저장소에 버전 정책이나 자동화가 있으면 그 규칙이 우선이다.
- hotfix 분기·반영은 [공통 브랜치 정책](../git-workflow/references/project-branch-policy.md)을 따른다.

### 릴리즈 노트 작성

커밋 이력에서 릴리즈 노트나 배포 PR의 변경 요약을 만들 때 [release-notes.md](references/release-notes.md)를 읽는다.
이전 배포 지점과 이번 대상 지점을 확인하고, 해당 범위의 커밋·PR·실제 변경을 대조해 사용자에게 의미 있는 결과로 묶는다.
초안을 제시하기 전에 [결과 중심 초안과 편집](references/release-notes.md#결과-중심-초안과-편집)의 제목·변경 선정·전환 안내와 원문 대조 절차를 적용한다.
공개 제목·본문 첫 H2와 [GitHub CLI 참고 기본 구성](references/release-notes.md#github-cli-참고-기본-구성)을 적용한다. 상세 근거는 연결하고 필요한 전환·승인·검증 한계를 보존한다.
릴리즈 노트 작성은 태그 생성, GitHub Release 발행 또는 배포 권한을 포함하지 않는다.

### 발행

1. 대상 commit, 태그 이름, 노트 초안을 사용자에게 제시하고 태그 push와 Release 발행 승인을 받는다.
   마일스톤을 쓰는 릴리즈는 대상 마일스톤의 이름·번호·완료율을 함께 제시하고, 발행 확인 후 그 마일스톤을 닫을지 별도 항목으로 승인을 묻는다.
   같은 대상에 대한 승인이 이미 있으면 다시 묻지 않는다.
   노트 초안 작성 요청은 발행 승인이 아니다.
2. 승인된 태그와 Release만 만든다.
3. 원격 tag/Release의 존재와 대상 commit을 확인한다.
4. 발행 확인 후 종료 승인이 있는 마일스톤만 닫고 실제 상태를 재조회한다. Release 발행과 마일스톤 종료 결과를 구분한다. 100%만으로 발행 완료를 판단하거나 발행 승인으로 종료 권한을 추정하지 않는다. 종료 실패 시 발행을 반복하지 않는다. 종료 승인을 받지 못하면 마일스톤을 닫지 않고, 결과 보고에 열린 마일스톤과 「마일스톤 종료 승인 대기」를 다음 행동으로 남긴다.
