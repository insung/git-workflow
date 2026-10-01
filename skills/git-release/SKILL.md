---
name: git-release
description: 태그·GitHub Release 준비 및 발행, 또는 지정한 Git 이력 범위의 릴리즈 노트 작성을 요청할 때 사용한다. 실제 커밋 범위와 승인된 발행 행동을 확인한다.
---

# Git Release

## 사용 조건

“릴리즈 노트를 작성해줘”, “이 버전의 태그와 Release를 만들어줘” 요청에 적용한다. 일반 커밋 메시지와 PR 본문은 각각 commit-rule과 pr-create가 담당한다.

## 공통 실행 경계

먼저 [공통 경계](../git-workflow/SKILL.md#공통-실행-경계)를 읽는다. Issue·PR·검토 HEAD·증거·승인 범위를 다음 단계에 전달한다. 이미 승인된 범위는 다시 묻지 않으며 승인 범위를 확대하지 않는다.

제목·변경 분류는 [공통 표기](../git-workflow/references/change-conventions.md), 기록은 [공통 문체](../git-workflow/references/writing-conventions.md)를 적용한다. plan의 배포 조건과 Issue/PR·확인된 docs 증거도 대조한다.

## 태그와 릴리즈

배포 방식과 태그 이름은 저장소마다 다르므로 기존 workflow, 문서와 최근 태그를 먼저 확인한다.

```bash
git tag --sort=-creatordate | head -10
git log --first-parent --pretty=format:'%s' <이전-태그>..<현재-태그>
```

- 검증된 커밋에만 배포 태그를 붙인다.
- `feat`는 minor, `fix`와 `perf`는 patch 후보로 본다. 호환성 영향은 실제 변경을 확인해 별도로 판단한다.
- 실제 버전 정책과 자동화가 다르면 저장소 규칙을 따른다.
- hotfix는 현재 배포 지점에서 분기하고 배포 뒤 기본·통합 브랜치에도 반영한다.

### 릴리즈 노트 작성

커밋 이력에서 릴리즈 노트나 배포 PR의 변경 요약을 만들 때 [release-notes.md](references/release-notes.md)를 읽는다. 이전 배포 지점과 이번 대상 지점을 확인하고, 해당 범위의 커밋·PR·실제 변경을 대조해 사용자에게 의미 있는 결과로 묶는다. 릴리즈 노트 작성은 태그 생성, GitHub Release 발행 또는 배포 권한을 포함하지 않는다.


실제 발행 후 원격 tag/Release의 존재와 대상 commit을 확인한다. 노트 초안은 발행 승인이 아니다.
