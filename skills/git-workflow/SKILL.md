---
name: git-workflow
description: Issue 기반 변경의 시작·재개, 다음 단계 선택 또는 준비된 plan/todo의 구현을 요청할 때 사용한다. Issue·계획·PR 등 단일 단계 요청은 해당 스킬로 연결한다.
---

# Git Workflow

## 사용 조건

“이 변경을 Issue부터 진행해줘”, “다음 단계가 뭐야”, “계획대로 구현해줘” 요청에 적용한다. 단계가 지정되어 있으면 아래 표로 해당 스킬을 선택한다.

Issue → plan/todo → 구현·테스트·커밋 → PR → 검토 → 사용자 승인 → 머지 → Wiki로 연결한다. 역할은 현재 대화 세션에서도 실행할 수 있다. 스킬은 실행 지침이며 scheduler/정책 validator가 아니다.

## 단계 선택

| 요청/상태 | 적용 스킬 | 다음 입력 |
| --- | --- | --- |
| Issue 없음/부족 | [issue-create](../issue-create/SKILL.md) | Issue, 의도·영향·달성 조건 |
| Issue의 계획·작업 분해 | [plan-create](../plan-create/SKILL.md) | plan/todo, 검증·배포 계획, 결정·승인 범위 |
| plan/todo의 구현 | 아래 구현 진행 + [commit-rule](../commit-rule/SKILL.md) | 코드·테스트·commit·인계 |
| 구현 후 PR 준비 | [pr-create](../pr-create/SKILL.md) | PR, docs 링크, HEAD |
| PR·의도·정책·테스트 검증 | [pr-review](../pr-review/SKILL.md) | review, 검토 HEAD, 증거·판단 |
| 승인·머지·Wiki | [pr-merge](../pr-merge/SKILL.md) | 실제 merge commit, Wiki 상태 |
| 커밋 메시지·범위·분리 검토 또는 커밋/브랜치 요청 | [commit-rule](../commit-rule/SKILL.md) | 승인된 범위의 commit |
| 릴리즈 요청 | [git-release](../git-release/SKILL.md) | 고정 범위의 노트·발행 상태 |

“커밋 검토”는 메시지·범위·분리라면 commit-rule, 코드 동작·의도·정책·테스트라면 pr-review로 선택한다. 두 종류를 모두 요청하면 각 범위를 적용한다.

개념·상태·이력 질문은 읽기 전용이다. 기존 작업의 late-entry는 현재 상태부터 Issue·plan·증거를 연결한다. 모든 파일을 한 번에 읽지 않고 현재 단계와 관련 기준만 읽는다.

## 공통 실행 경계

- 대상 AGENTS.md, remotes, branch, HEAD, dirty/staged 상태와 인증 계정을 확인한다. 무관한 변경은 보존한다. reset/clean·전체 stage로 소유권을 추측하지 않는다.
- 변경은 의도·영향·달성 조건을 가진 Issue와 실행 가능한 plan/todo에서 시작한다. 원격 불가 로컬 파일럿만 local-draft를 허용하며 원격 PR 전 실제 Issue로 연결한다.
- plan/todo/인계/검토는 대상 `docs/git-workflows/{yyyy-MM}/{dd}_{issue-number}_{title}/`에 기록한다. 실제 번호 확인 후 확정하며 원격 불가 파일럿은 `{dd}_draft_{title}`로 구분한다. 시작 날짜와 작업 이력을 유지한다. raw log·secret·머신 절대 경로는 공통 문서에 넣지 않는다.
- 제목 작성·검토는 [change-conventions](references/change-conventions.md), 기록은 [writing-conventions](references/writing-conventions.md), Issue/PR 분류는 [labels](references/labels.md), 원격 진행 기록은 [document-links](references/document-links.md)를 적용한다.
- 사용자 요청에 포함된 행동과 승인 범위는 지속한다. Issue/PR 생성·진행 댓글·커밋·push·머지·배포·Wiki·tag/Release 권한은 서로 확대하지 않는다. 같은 범위의 승인을 반복 요청하지 않는다. 현재 요청이 읽기 전용이면 문서 수정도 하지 않는다.
- 정책은 대상 manifest/lock과 정확한 pinned spec-it에서 읽는다. 규칙을 복제하거나 최신으로 자동 바꾸지 않는다. 없는 번호·테스트·머지·배포·URL을 만들지 않는다.

## 구현 진행

1. Issue와 plan의 원래 의도·현재 동작·AC, todo의 범위·의존 순서·검증/배포 계획을 읽는다. Issue의 부족한 의도·AC는 issue-create로, 계획·작업 분해의 부족한 결정은 plan-create로 반환한다.
2. 준비된 단위만 구현한다. 계획 이탈과 새 결정은 plan/todo에 이유·영향·승인 상태를 남긴다. 담당이 별도 세션이면 실제 문서 위치와 실행 환경을 인계한다. 스킬 이름만으로 에이전트가 시작되는 것은 아니다.
3. 구현 담당이 의미 있는 테스트 사례·assertion을 만들고 계획의 실제 명령을 실행한다. [todo 계약](../plan-create/references/todos.md)에 작업별 검증 방법과 결과를 연결하고, 상세 사례별 기대/실제·명령/cwd·revision/dirty identity·환경·시각은 구현 인계에 기록한다. 검증 위임/최종 검증 선택이면 not-run과 필요한 입력을 남긴다.
4. 커밋까지 요청되었으면 commit-rule로 단위/주제별 변경만 커밋하고 실제 hash는 인계에 기록하고 todo에서 근거 링크로 연결한다. 커밋 요청이 없으면 미커밋 identity를 기록한다. 코드 검증과 문서-only 후속 변경을 구분한다. commit 요청은 push 요청이 아니다.
5. 최종 검증과 남은 배포 조건을 확인하고 [handoff](../pr-create/references/handoff.md)로 기록한다. 구현 완료와 검토 완료는 다르다. pr-create로 PR 준비를 넘기며 Issue에는 핵심 결과·미확인·접근 가능한 docs 링크만 게시한다.

[전체 흐름과 한계](../../docs/workflow.md), [로컬 파일럿](../../docs/testing/local-pilot.md)을 참고한다.
