---
name: pr-review
description: “PR이 Issue 계획대로 구현됐는지 리뷰해줘”, “이 커밋의 코드와 테스트가 의도대로인지 검토해줘”처럼 Issue·plan 기준으로 의도 충족과 테스트 누락의 검토를 요청할 때 사용한다. 의도와 무관한 코드 스타일 검토에는 쓰지 않는다.
---

# PR 검토

[공통 실행 경계](../git-workflow/references/execution-boundaries.md)를 적용한다.
Issue의 현재 기준·계획과 필요한 연결 문서로 사용자 의도를 먼저 파악하고, 구현과 테스트가 그 의도를 채우는지 교차 확인한다.
판정과 하위 에이전트 사용은 [검증 실행 주체](../git-workflow/references/execution-boundaries.md#검증-실행-주체)를 따른다.

## 1. 검토 대상 고정

1. base, 검토 HEAD, commit 범위를 확인한다.
2. 작업본 diff, index의 변경, 미추적 파일을 각각 확인한다.
3. GitHub PR이면 실제 headRefOid가 로컬 검토 대상과 같은지 확인한다.
4. 검토 중 HEAD나 관련 소스가 바뀌면 이전 증거는 과거 기록으로 두고 바뀐 범위를 다시 검토한다.

## 2. 의도 파악

1. 담당 Issue의 원문·목표·영향·제약·달성 조건(AC ID)·현재 계획을 읽고, 부모·선행 관계가 있으면 공통 기준·AC 대응·선행 상태를 추가로 읽는다. 연결된 상세 plan·task와 기존 작업 기록은 필요한 범위에서 추가로 읽는다. 파일 부재 자체를 누락으로 판정하지 않는다.
2. AC마다 해당하는 정상·실패·경계·유지 시나리오를 대조한다. 기대를 추측하거나 네 종류를 억지로 모두 만들지 않는다.
3. [리뷰 전용 위치](../plan-create/references/review-criteria.md#보관-위치)의 고정 상태를 확인하고, 별도 기준이 있으면 읽고 AC별 기준으로 판정한다.
4. Issue가 없거나 의도가 부족하면 PR·요청자 설명의 확인된 부분과 추정을 구별하고 의도 부족을 기록한다. plan 파일이 없다는 이유로 의도를 추정으로 바꾸지 않는다.

PR 제목·본문을 검토하면 [표기](../git-workflow/references/change-conventions.md)와 [문체](../git-workflow/references/writing-conventions.md)를 읽는다.

## 2.1. PR·연결 Issue의 코멘트 확인

GitHub PR이면 [공통 코멘트 확인](../git-workflow/references/pr-comment-check.md)으로 일반 댓글·리뷰 본문·파일별 코멘트와 답글·연결 Issue 댓글을 전체 조회한다. 요청별 현재 HEAD의 반영 근거·후속 합의·완료 조건 영향을 구현 대조와 최종 판정에 포함한다. COMMENTED·resolved·outdated나 이전 pass만으로 요청을 처리했다고 하지 않는다. 조회 미완료는 미확인·필요한 재조회로 보고하며 모든 unresolved 댓글을 자동 fail로 만들지 않는다.

사용자가 수정 결과 회신을 요청했으면 [공통 수정 결과 회신](../git-workflow/references/pr-comment-reply.md)을 재사용한다. 이미 같은 결과로 회신했으면 URL을 반환하고 중복 게시하지 않는다. 구현자 결과와 이 검토의 판정을 구별하며 답글 게시·resolve·머지 권한을 따로 확인한다.

## 3. 구현 대조

1. diff의 변경을 AC와 공개 계획의 작업에 양방향으로 대응시킨다.
2. 계획 밖 파일·기능, 빠진 작업, 미변경 소비자에 미치는 영향을 확인한다.
3. 이번 변경이 만든 문제와 변경 밖의 기존 문제를 구분한다.

todo 체크, handoff의 완료 주장, 테스트 내부의 일관성은 의도 충족의 증거가 아니다.

## 4. 테스트 누락 확인

1. AC 기대 시나리오마다 테스트 파일과 assertion을 찾는다.
   대응 assertion이 없는 시나리오는 테스트 누락이다.
2. Issue의 AC ID 중 본문 계획 또는 연결된 검증 계획 어디에도 대응 사례가 없는 ID는 계획의 검증 누락이다.
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
기본은 대화로 반환하고 게시가 요청됐으면 PR 리뷰/댓글에 기록한다. 신규 review.md 작업 기록은 만들지 않는다.
최초 검토·재검토는 검토 HEAD와 결과를 고정한 뒤, 댓글 신규 게시·수정이 요청된 경우에만 [PR 댓글](references/pr-comment.md)의 양식·승인·조회·중복 방지·사후 확인 절차를 따른다.
댓글 요청이 없으면 위 대화 반환으로 끝낸다. PR 생성·검토·머지 승인은 댓글 승인으로 확대하지 않는다.
Issue 원격 요약은 요청된 경우 [document-links](../git-workflow/references/document-links.md), 라벨은 [labels](../git-workflow/references/labels.md)를 따른다.

fail은 구현 담당에게 수정을 인계하고, 수정 후 새 HEAD를 다시 검토한다.
pass도 머지 승인이 아니다. 다음 단계는 [pr-merge](../pr-merge/SKILL.md)다.

## 7. 검토 기록 보존

대상 HEAD·판정·AC별 근거·조치·한계를 대화 또는 요청된 PR 리뷰 기록에 남긴다. 신규 review.md·docs 작업 기록 파일과 결과 보존 전용 커밋을 만들지 않는다. 임시 결과가 원격 검토 근거를 대신하면 안 된다.

비공개 기준·고정 입력은 [보관 기준](../plan-create/references/review-criteria.md#보관-위치)에 따라 유지하고 pass·warn이어도 자동 반입하지 않는다. fail·human-review의 공개 범위는 [review 작성 규칙](references/review.md#작성-규칙)을 따른다.

요청된 문서-only 기록 커밋이 있으면 검토 코드 HEAD와 보존 commit을 구별한다. 공개 검토 기록만 추가했고 소스·테스트·계획이 바뀌지 않았으면 기존 판정을 유지하되 머지에서는 실제 최신 HEAD를 확인한다. 그 밖의 변경은 영향받는 범위를 다시 검토한다.
