---
name: pr-review
description: “PR을 리뷰해줘”, “diff를 검증해줘”, “커밋의 코드와 테스트를 검토해줘”처럼 구현 동작·의도·정책·테스트 근거의 검토를 요청할 때 사용한다.
---

# PR 검토

[공통 실행 경계](../git-workflow/references/execution-boundaries.md)를 적용한다.

## 읽기 전용 검토 입력

Issue 원문과 변경 의도·영향 범위·달성 조건, plan, 모든 관련 todo, PR/로컬 diff와 commit 범위, docs 인계, 기준 commit과 검토 HEAD, 테스트 증거를 받는다.
제목·본문을 검토할 때 [표기](../git-workflow/references/change-conventions.md)와 [문체](../git-workflow/references/writing-conventions.md)를 읽는다.
기준 커밋과 검토할 커밋을 확인한다.
작업본 diff와 index에 올라간 변경을 각각 확인한다.
GitHub PR을 검토할 때 실제 PR의 headRefOid와 로컬 검토 대상이 같은지 확인한다.
미추적 파일은 diff 외에서 따로 확인한다.

## diff 우선, 배경까지 검토

1. 변경된 코드·파일·계약을 diff에서 확인하고 관련 미변경 소비자까지 영향 경로를 조사한다.
   변경 밖의 기존 문제와 이번에 도입한 문제를 구분한다.
2. 원래 Issue와 승인된 plan 결정 → todo/AC/기대 시나리오 → 실제 commit·구현 → 검증 증거를 양방향으로 대조한다.
   todo 체크 완료와 작성자의 completed 주장은 증거가 아니다.
   계획 밖 파일/기능·빠진 작업·검증/배포 계획의 실행 여부와 배경을 확인한다.
   코드가 선택한 정책·실패 처리·호환성의 배경을 확인한다.
   작성자의 설명이나 테스트 내부 일관성만으로 원래 의도의 충족을 판정하지 않는다.
3. 대상 AGENTS.md, `.architecture/manifest.yaml`, `.architecture/lock.yaml`, 예외와 정확한 pinned 규칙 원문을 읽는다.
   spec-it-check의 사용 가능한 설치 진입점 또는 고정된 정책 소스의 SKILL.md를 읽어 적용한다.

   영향 조사가 필요하면 설치된 spec-it-impact가 있는지 확인한다.
   설치되어 있지 않으면 대상 프로젝트의 manifest/lock이나 제공된 경로가 가리키는 정책 소스에서 `skills/spec-it-impact/SKILL.md`를 확인하고 직접 읽는다.
   `../spec-it/skills/`는 후보 위치이며 모든 환경에 있다고 가정하지 않는다.

   설치와 고정 소스 모두 접근할 수 없으면 이 스킬의 diff·소비자 영향 조사를 수행하고 검사하지 못한 정책 범위를 human-review로 남긴다.
   임의 설치나 설정 변경을 하지 않는다.
   스킬 호출 성공을 꾸미지 않는다.
   규칙을 복제하거나 새로운 의무를 만들지 않는다.
4. manifest/lock이 없으면 shadow assessment로 후보 기준만 제안하고 정책 준수/위반 판정은 하지 않는다.
   규칙별 상태는 pass/warn/fail/not-applicable/human-review를 사용한다.
   결정·증거 부재나 미구현 검사는 pass가 아니다.

## 테스트 증거

변경 동작에 대한 유닛 테스트 파일과 사례별 기대/실제 결과를 요구한다.
정상·실패·경계·관련 유지 동작을 달성 조건에 대응시킨다.
명령, 실행 커밋과 미커밋 변경 근거, 환경, 실행일, 통과/실패/미실행, 누락 범위를 확인한다.
테스트 존재나 녹색 결과만으로 의미를 충족했다고 하지 않는다.

문서 전용 등 유닛 테스트가 적용되지 않으면 이유와 링크·구조 등 대체 검사를 기록한다.
테스트가 없거나 결과가 오래됐거나 환경 증거가 부족하면 human-review와 필요한 재검증을 보고한다.
프로젝트에서 허용한 저비용 명령만 실행하고 live/유료/credential 실행은 해당 승인 없이는 하지 않는다.
실행하지 않은 명령은 미실행으로 남긴다.

PR HEAD나 관련 소스가 검토 중/후 바뀌면 이전 증거는 과거 상태의 기록이며 현재 변경의 pass로 재사용하지 않는다.
변경된 범위와 필요한 검사를 재검토한다.

## 결과와 실행 방식

[검토 계약과 양식](references/review.md)으로 결과를 반환한다.
규칙 지적은 ID·적용 계기·위치·구체 관찰·프로젝트 영향·추가 증거/조치와 묶는다.
고정 규칙에 없는 의견은 advisory로 분리한다.
대상 docs/git-workflows 작업 디렉토리의 review.md에는 호출자/구현 담당이 승인된 문서 범위에서 결과를 기록한다.
Issue/PR에는 [document-links](../git-workflow/references/document-links.md)에 따라 핵심 결과와 검토 HEAD·남은 증거·확인된 문서 링크만 남긴다.
댓글 게시와 상태 라벨 갱신은 승인 범위를 확인하며 라벨은 [labels](../git-workflow/references/labels.md)를 따른다.
spec-it 검사기는 대상 코드·정책을 수정하지 않는다.
정책 JSON을 저장할 때는 canonical spec-it의 스키마와 허용 위치를 따른다.

현재 세션 또는 이미 위임된 리뷰 에이전트가 직접 수행할 수 있다.
별도 모델을 중첩 호출하지 않는다.
사용자가 독립 검증 실행을 명시한 경우에만 canonical spec-it의 `tools/spec_it_verify.py`와 `docs/local-verification.md` 존재·현재 계약을 확인하고 사용한다.
후보 runner가 없으면 직접 스킬 검토로 진행하고 실행되지 않은 runner를 주장하지 않는다.
API 키 인증이나 유료 요청으로 자동 전환하지 않는다.

fail은 구현 담당에게 수정 인계, human-review는 결정·증거 요청으로 반환한다.
수정 후에는 새 HEAD와 영향 범위를 재검토한다.
pass/warn도 머지 승인이 아니다.
다음 단계는 [pr-merge](../pr-merge/SKILL.md)다.
