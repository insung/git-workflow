---
name: branch-strategy
description: “브랜치 전략을 정해줘”, “feature 브랜치를 만들어줘”, “hotfix 경로를 정해줘”처럼 브랜치 정책이나 분기 작업을 요청할 때 사용한다.
---

# 브랜치 전략

[공통 실행 경계](../git-workflow/references/execution-boundaries.md)를 적용한다.

1. [브랜치 전략 정의](references/branch.md)를 읽는다.
   사용자가 확인한 dev와 feature/ 흐름을 대상 저장소의 현재 규칙과 대조한다.
2. 브랜치 역할, 배포 트리거와 hotfix 경로를 문서·workflow·Git 이력에서 확인한다.
   남은 인간 결정만 질문한다.
3. 전략 정의 요청이면 역할과 분기·머지·역반영 경로를 문서로 제안한다.
   미정 항목은 확정된 정책으로 쓰지 않는다.
4. 브랜치 생성이 요청됐으면 확인한 base에서 요청한 브랜치만 만든다.
   전략 검토만으로 브랜치나 보호 설정을 바꾸지 않는다.

결과로 확정한 전략, 근거, 미정 항목과 실제 실행한 작업을 구분해 반환한다.
PR 머지는 [pr-merge](../pr-merge/SKILL.md), 태그와 Release 발행은 [git-release](../git-release/SKILL.md)의 절차를 따른다.
