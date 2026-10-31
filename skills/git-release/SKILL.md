---
name: git-release
description: “릴리즈 노트를 작성해줘”, “태그와 Release를 만들어줘”처럼 버전·배포 지점 기준의 릴리즈 노트·태그·GitHub Release 준비나 발행을 요청할 때 사용한다. 릴리즈와 무관한 커밋 이력 요약에는 쓰지 않는다.
---

# 릴리즈

[공통 실행 경계](../git-workflow/references/execution-boundaries.md)를 적용한다.

제목·변경 분류는 [공통 표기](../git-workflow/references/change-conventions.md), 기록은 [공통 문체](../git-workflow/references/writing-conventions.md)를 적용한다.
Issue/PR의 배포 조건과 확인된 검증 근거를 대조하고 필요한 기존 plan을 추가로 읽는다.
대상 저장소의 마일스톤 운영 기준을 읽는다. 마일스톤을 쓰는 릴리즈의 발행 준비 조건·이월·종료는 [범위·100%·이월·종료 절차](../git-workflow/references/milestones.md#릴리즈-범위와-이월)를 따른다.

## 릴리즈 Issue와 추가 작업

Issue 필요 여부, 순수 준비 PR 예외, 릴리즈 중 추가 작업과 개별 수정의 출처는 [릴리즈 기록 기준](references/release-context.md)을 적용한다.

## 태그와 릴리즈

배포 방식과 태그 이름은 저장소마다 다르므로 기존 workflow, 문서와 최근 태그를 먼저 확인한다.

```bash
git tag --sort=-creatordate | head -10
git log --first-parent --pretty=format:'%s' <이전-태그>..<현재-태그>
```

- 검증된 커밋에만 배포 태그를 붙인다.
- type별 버전 후보는 [공통 표기의 type 표](../git-workflow/references/change-conventions.md#제목)를 따른다.
  저장소에 버전 정책이나 자동화가 있으면 그 규칙이 우선이다.
- hotfix 분기·머지는 [공통 브랜치 정책](../git-workflow/references/project-branch-policy.md)을 따른다.

### 릴리즈 노트 작성

커밋 이력에서 릴리즈 노트나 배포 PR의 변경 요약을 만들 때 [release-notes.md](references/release-notes.md)를 적용한다. 완성 형태는 [간결한 공개 노트 예시](references/release-notes-example.md)를 참고한다.

### 발행

1. 대상 commit, 태그 이름, 노트 초안을 사용자에게 제시하고 태그 push와 Release 발행 승인을 받는다.
   마일스톤을 쓰는 릴리즈는 같은 요청에서 마일스톤 종료 승인을 별도 항목으로 묻는다.
   노트 초안 작성 요청은 태그 생성, Release 발행 또는 배포 승인이 아니다.
2. 승인된 태그와 Release만 만든다.
3. 원격 tag/Release의 존재와 대상 commit을 확인한다.
4. 마일스톤 종료와 그 결과 보고는 [범위·100%·이월·종료 절차](../git-workflow/references/milestones.md#릴리즈-범위와-이월)를 따른다.
