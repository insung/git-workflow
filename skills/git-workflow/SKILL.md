---
name: git-workflow
description: “Issue부터 진행해줘”, “git workflow 진행해줘”처럼 변경의 전체 흐름·단계 선택·계획 구현을 요청할 때 사용한다.
---

# Git 워크플로우

Issue → plan/todo → 구현·테스트·커밋 → PR → 검토 → 사용자 승인 → 머지로 연결한다.
역할은 현재 대화 세션에서도 실행할 수 있다.
스킬은 실행 지침이며 scheduler/정책 validator가 아니다.

## 단계 선택

| 요청/상태 | 적용 스킬 | 다음 입력 |
| --- | --- | --- |
| Issue 없음/부족 | [issue-create](../issue-create/SKILL.md) | Issue, 의도·영향·달성 조건 |
| Issue의 계획·작업 분해 | [plan-create](../plan-create/SKILL.md) | plan/todo, 검증·배포 계획, 결정·승인 범위 |
| plan/todo의 구현 | 아래 구현 진행 + [commit-rule](../commit-rule/SKILL.md) | 코드·테스트·commit·인계 |
| 구현 후 PR 준비 | [pr-create](../pr-create/SKILL.md) | PR, docs 링크, HEAD |
| PR·의도·정책·테스트 검증 | [pr-review](../pr-review/SKILL.md) | review, 검토 HEAD, 증거·판단 |
| 승인·머지 | [pr-merge](../pr-merge/SKILL.md) | 실제 머지 상태와 merge commit |
| 커밋 실행·메시지·범위 검토 요청 | [commit-rule](../commit-rule/SKILL.md) | 승인된 범위의 commit |
| 브랜치 전략·분기·hotfix 요청 | [branch-strategy](../branch-strategy/SKILL.md) | 확정 전략·분기 결과·미정 항목 |
| 릴리즈 요청 | [git-release](../git-release/SKILL.md) | 고정 범위의 노트·발행 상태 |

“커밋 검토”는 메시지·범위·분리라면 commit-rule, 코드 동작·의도·정책·테스트라면 pr-review로 선택한다.
두 종류를 모두 요청하면 각 범위를 적용한다.

개념·상태·이력 질문은 읽기 전용이다.
기존 작업의 late-entry는 현재 상태부터 Issue·plan·증거를 연결한다.
모든 파일을 한 번에 읽지 않고 현재 단계와 관련 기준만 읽는다.

## 실행 기준

[공통 실행 경계](references/execution-boundaries.md)를 적용한다.
제목은 [변경 표기](references/change-conventions.md), 기록은 [문체](references/writing-conventions.md)를 따른다.
Issue/PR 분류와 진행 기록에는 [라벨](references/labels.md)과 [문서 링크](references/document-links.md)를 읽는다.

## 구현 진행

1. Issue의 사용자 의도와 달성 조건을 읽는다.
   plan의 작업 순서·검증·배포 계획을 확인하고 해당 todo부터 진행한다.
   Issue 정보가 부족하면 issue-create로, 계획이 부족하면 plan-create로 반환한다.
2. 준비된 작업만 구현한다.
   계획에서 벗어난 변경은 이유와 영향을 plan에 기록한다.
   다른 세션에 인계하면 실제 문서 위치와 필요한 환경을 전달한다.
3. 의미 있는 테스트와 assertion을 만들고 계획에 정한 명령을 실행한다.
   [todo](../plan-create/references/todos.md)에는 작업별 결과 링크를 연결한다.
   [handoff](../pr-create/references/handoff.md)에는 사례별 기대·실제 결과, 명령·실행 위치·환경·시각과 대상 소스를 기록한다.
   미실행은 미실행으로 남긴다.
4. 커밋까지 요청됐으면 commit-rule로 주제별 변경만 커밋한다.
   커밋하지 않았다면 변경 파일과 patch/digest를 기록한다.
   확인할 수 없는 작업본 상태는 한계를 적는다.
   이후 문서만 바뀌었다면 코드 검증 결과와 구분한다.
5. 최종 검사와 남은 배포 조건을 확인한다.
   실제 구현 결과를 handoff에 기록하고 pr-create로 전달한다.
   Issue에는 요약과 확인된 문서 링크만 게시한다.
   구현 완료와 검토 완료는 구분한다.

[전체 흐름과 한계](../../docs/workflow.md), [로컬 파일럿](../../docs/testing/local-pilot.md)을 참고한다.
