---
name: branch-strategy
description: “브랜치 전략을 정해줘”, “dev에서 feature 브랜치를 만들어줘”, “hotfix 경로를 정해줘”처럼 브랜치 역할·분기·역반영 규칙의 결정이나 브랜치 생성을 요청할 때 사용한다.
---

# 브랜치 전략

[공통 실행 경계](../git-workflow/references/execution-boundaries.md)를 적용한다.

먼저 [프로젝트 정책 읽기](references/project-policy.md)를 적용한다. 승인된 프로젝트 정본은 패키지 기본 후보보다 우선하며, 충돌·미정은 관련 행동 전에 확인한다. 지속적인 전략 초기화·기록은 [workflow-init](../workflow-init/SKILL.md)의 전략 항목으로 연결한다.

## 브랜치 생성만 요청한 경우

요청과 승인된 프로젝트 정책에서 base와 브랜치 이름을 결정한다. 요청에 base가 없어도 정책이 명확히 정하면 그 정책을 적용하며 다시 묻지 않는다.
결정된 base의 커밋과 작업본 상태를 확인하고 요청한 브랜치만 만든다. 정책과 충돌하지 않으면 불필요한 전략 질문은 하지 않는다.
요청이 정책과 다르거나 정책에도 없거나 모호한 항목만 확인한다.
세부 기준은 [브랜치 작업](references/branch.md#브랜치-작업을-요청받은-경우)을 따른다.

## 전략을 정하거나 검토하는 경우

1. [프로젝트 정본](references/project-policy.md)을 먼저 읽고 [전략 후보](../workflow-init/references/branch-options.md)를 현재 규칙과 대조한다. dev/prod는 선택 후보이며 자동 기본값이 아니다.
2. 브랜치 역할, 배포 트리거와 hotfix 경로를 문서·workflow·Git 이력에서 확인한다.
   남은 인간 결정만 질문한다.
3. 역할과 분기·머지·역반영 경로를 문서로 제안한다.
   미정 항목은 확정된 정책으로 쓰지 않는다.
4. 전략 검토만으로 브랜치나 보호 설정을 바꾸지 않는다.

결과로 확정한 전략, 근거, 미정 항목과 실제 실행한 작업을 구분해 반환한다.
PR 머지는 [pr-merge](../pr-merge/SKILL.md), 태그와 Release 발행은 [git-release](../git-release/SKILL.md)의 절차를 따른다.
