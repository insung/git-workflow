---
name: git-workflow
description: '“Issue #12 작업을 이어서 진행해줘”, “git workflow로 진행해줘”처럼 Issue 기반 변경의 시작·재개와 다음 단계 선택을 요청할 때 사용한다. 준비된 단계의 구현 자체에는 쓰지 않는다.'
---

# Git 워크플로우

Issue의 요청·기준·계획 → 구현·테스트·커밋 → PR → 검토 → 사용자 승인 → 머지 확인 → 안전 정리 → Issue 종료·결과 기록으로 연결한다.
역할은 현재 대화 세션에서도 실행할 수 있다.
단, 검토 기준·검증 입력을 작성하거나 읽은 세션은 그 Issue를 구현하지 않는다 ([보관 위치](../plan-create/references/review-criteria.md#보관-위치)).
스킬은 실행 지침이며 scheduler/정책 validator가 아니다.

## 단계 선택

| 요청/상태 | 적용 스킬 | 다음 입력 |
| --- | --- | --- |
| git-workflow 설치·초기화 또는 선택 항목 설치 | [workflow-init](../workflow-init/SKILL.md) | 항목 선택, 선택한 범위만 적용 |
| 대상 프로젝트 AGENTS.md의 워크플로우 선언 초기화·추가 요청 | [workflow-init](../workflow-init/SKILL.md) | 대상 경로·추가 전문·위치 제안, 명시적 승인 후 추가 |
| Issue 없음/부족 | [issue-create](../issue-create/SKILL.md) | Issue, 의도·영향·달성 조건 |
| Issue의 계획·작업 분해 | [plan-create](../plan-create/SKILL.md) | Issue 본문 계획·필요한 상세 설계, 검증·배포 계획, 결정·승인 범위 |
| 준비된 Issue 계획 또는 기존 plan·todo 구현 | [task-implement](../task-implement/SKILL.md) | 코드·테스트·실제 결과·commit·PR 인계 |
| 구현 후 PR 준비 | [pr-create](../pr-create/SKILL.md) | PR, AC 결과·검증 근거, HEAD |
| PR·의도·정책·테스트 검증 | [pr-review](../pr-review/SKILL.md) | review, 검토 HEAD, 증거·판단 |
| 승인·머지·작업 정리 | [pr-merge](../pr-merge/SKILL.md) | 실제 머지 상태·merge commit과 local/worktree별 정리 결과 |
| 머지 후 Issue 종료·결과 기록, 진행 안 함·중복 종료 | [issue-close](../issue-close/SKILL.md); 미설치면 대화/임시 인계 | 머지·정리 근거와 게시 권한, 실제 state·stateReason과 종료 코멘트, 근거로 충족된 task 체크와 원격 head 정리; 자동 CLOSED Issue도 결과 코멘트 보완 인계 |
| 커밋 실행·메시지·범위 검토 요청 | [commit-rule](../commit-rule/SKILL.md) | 승인된 범위의 commit |
| 프로젝트 브랜치 전략 초기화·기록 요청 | [workflow-init](../workflow-init/SKILL.md) | 기존 관행 요약·전략안·정본 위치와 최소 읽기 연결의 명시적 승인 |
| 브랜치 전략 검토·분기·hotfix 요청 | [공통 브랜치 정책](references/project-branch-policy.md) | 프로젝트 정본 읽기·확정 규칙·분기 결과·미정 항목 |
| 릴리즈 요청 | [git-release](../git-release/SKILL.md) | 고정 범위의 노트·발행 상태 |
| 대상 저장소의 Issue·PR 템플릿 설치 요청 | [workflow-init](../workflow-init/SKILL.md) | 복사한 파일·기존 파일 차이·라벨 상태 |

“커밋 검토”는 메시지·범위·분리라면 commit-rule, 코드 동작·의도·정책·테스트라면 pr-review로 선택한다.
두 종류를 모두 요청하면 각 범위를 적용한다.

개념·상태·이력 질문은 읽기 전용이다.
기존 작업의 late-entry는 현재 상태부터 Issue·plan·증거를 연결한다.
후속 변경은 [issue-create](../issue-create/SKILL.md)의 의도·범위·AC 대조로 열린 동일 범위 Issue를 재사용하고, 닫힌 범위와 다른 요구는 배경 링크를 가진 새 Issue로 분리한다.
종료 코멘트의 양식·게시 검증은 issue-close가 담당하며 이 워크플로우에서 중복 구현하지 않는다.
모든 파일을 한 번에 읽지 않고 현재 단계와 관련 기준만 읽는다.

## 실행 기준

[공통 실행 경계](references/execution-boundaries.md)를 적용한다.
제목은 [변경 표기](references/change-conventions.md), 기록은 [문체](references/writing-conventions.md)를 따른다.
Issue/PR 분류와 진행 기록에는 [라벨](references/labels.md)과 [문서 링크](references/document-links.md)를 읽는다.

[전체 흐름](../../README.ko.md#작동-방식), [로컬 파일럿](../../docs/examples/python-version-upgrade/local-pilot.md)을 참고한다.
