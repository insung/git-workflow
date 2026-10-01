---
name: pr-review
description: “PR이 Issue 계획대로 구현됐는지 리뷰해줘”, “이 커밋의 코드와 테스트가 의도대로인지 검토해줘”처럼 Issue·plan 기준으로 의도 충족과 테스트 누락의 검토를 요청할 때 사용한다. 의도와 무관한 코드 스타일 검토에는 쓰지 않는다.
---

# PR 검토

[공통 실행 경계](../git-workflow/references/execution-boundaries.md)를 적용한다.
Issue·plan·todo로 사용자 의도를 먼저 파악하고, 구현과 테스트가 그 의도를 채우는지 교차 확인한다.
판정과 하위 에이전트 사용은 [검증 실행 주체](../git-workflow/references/execution-boundaries.md#검증-실행-주체)를 따른다.

## 1. 검토 대상 고정

1. base, 검토 HEAD, commit 범위를 확인한다.
2. 작업본 diff, index의 변경, 미추적 파일을 각각 확인한다.
3. GitHub PR이면 실제 headRefOid가 로컬 검토 대상과 같은지 확인한다.
4. 검토 중 HEAD나 관련 소스가 바뀌면 이전 증거는 과거 기록으로 두고 바뀐 범위를 다시 검토한다.

## 2. 의도 파악

1. Issue의 목표·영향 범위·달성 조건(AC ID), plan의 결정과 변경 기록, 모든 관련 todo의 작업·검증 표를 읽는다.
2. AC마다 기대 시나리오를 정상·실패·경계·유지 동작으로 나눠 적는다.
3. [리뷰 브랜치](../plan-create/references/review-criteria.md#보관-위치)에 검토 기준이 있으면 읽고 AC별 기준으로 판정한다.
4. Issue나 plan이 없으면 PR 본문과 요청자 설명으로 의도를 정리하고, 결과에 추정이라고 적는다.

PR 제목·본문을 검토하면 [표기](../git-workflow/references/change-conventions.md)와 [문체](../git-workflow/references/writing-conventions.md)를 읽는다.

## 3. 구현 대조

1. diff의 변경을 AC와 todo 작업에 양방향으로 대응시킨다.
2. 계획 밖 파일·기능, 빠진 작업, 미변경 소비자에 미치는 영향을 확인한다.
3. 이번 변경이 만든 문제와 변경 밖의 기존 문제를 구분한다.

todo 체크, handoff의 완료 주장, 테스트 내부의 일관성은 의도 충족의 증거가 아니다.

## 4. 테스트 누락 확인

1. AC 기대 시나리오마다 테스트 파일과 assertion을 찾는다.
   대응 assertion이 없는 시나리오는 테스트 누락이다.
2. Issue의 AC ID 중 todo 검증 표에 없는 ID는 계획의 테스트 누락이다.
3. assertion이 동작을 고정하는지 확인한다.
   해당 구현을 지워도 통과하는 테스트는 그 시나리오를 검증하지 않는다.
4. 실행 증거로 명령·실행 커밋·환경·시각·결과를 확인한다.
   없거나 검토 HEAD와 다르면 미검증이다.
5. 검증 입력(`review-input-<topic>.md`)이 있으면 그 고정 입력으로 다시 실행한다.
   구현 세션의 입력·결과는 판정 근거가 아닌 참고다.

유닛 테스트 대상이 없는 변경이면 이유와 링크·구조 같은 대체 검사를 확인한다.
프로젝트가 허용한 저비용 명령만 실행한다.
live·유료·credential 실행은 해당 승인이 있을 때만 하고, 실행하지 않은 명령은 미실행으로 적는다.

## 5. 정책 검사

대상 저장소에 `.architecture/manifest.yaml`과 `.architecture/lock.yaml`이 있으면 [spec-it 정책 검사](references/spec-it-policy.md)를 적용한다.
없으면 결과에 「spec-it 미채택」만 적고 정책 판정·human-review 항목을 만들지 않는다.

## 6. 결과

[검토 양식](references/review.md)으로 결과를 반환한다.

| 상태 | 조건 |
| --- | --- |
| fail | 테스트 누락, 의도 미충족, 이번 변경의 결함 |
| human-review | 사람의 결정이나 확보할 수 없는 증거가 필요함 |
| warn | 머지를 막지 않는 위험 |
| pass | 모든 AC 시나리오가 구현·테스트·실행 증거로 확인됨 |

AC·todo·정책 근거가 없는 의견은 advisory로 분리한다.
review.md 기록을 요청받았으면 대상 작업 디렉토리의 review.md에 쓰고, 아니면 대화로 반환한다.
Issue/PR 댓글과 라벨은 요청된 경우에 [document-links](../git-workflow/references/document-links.md)와 [labels](../git-workflow/references/labels.md)를 따른다.

fail은 구현 담당에게 수정을 인계하고, 수정 후 새 HEAD를 다시 검토한다.
pass도 머지 승인이 아니다. 다음 단계는 [pr-merge](../pr-merge/SKILL.md)다.

## 7. 기록 커밋

1. review.md 기록 뒤 PR 머지 전에 작업 브랜치에 docs 커밋 하나를 만든다. 커밋 승인은 별도다.
2. pass·warn이면 검토 기준·검증 입력을 `git checkout <리뷰 브랜치> -- <경로>`로 가져와 같은 커밋에 넣는다.
3. fail·human-review이면 review.md만 커밋한다.
4. 검토 HEAD 뒤 커밋이 이 기록 커밋 하나이고 작업 디렉토리의 review.md·검토 기준·검증 입력만 바꿨으면 재검토하지 않는다. 머지의 HEAD 일치 확인에는 기록 커밋을 쓴다.
