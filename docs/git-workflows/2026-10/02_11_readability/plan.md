---
issue: "https://github.com/insung/git-workflow/issues/11"
status: ready
branch: "docs/readability-plan"
base: "main"
created: "2026-10-02"
---

# README와 Issue·PR 가독성 개선 계획

## 요청

> 1. git-workflow 에 README 문서를 개선 + 추가된 스킬 업데이트
> 2. 깃헙 이슈, PR 의 내용이 사람이 읽기가 힘든데 개선 방법 있는지 검토
> 3. 이 작업은 새로운 워크트리 생성하여 진행해주고, 완료된 워크트리는 삭제 처리

- 해석: 호출된 issue-create·plan-create에 따라 이번 세션은 Issue 생성, 현황·개선안 검토, 구현 계획과 고정 검토 입력 준비까지 진행
- 남은 결정: 구현·push·PR·머지 요청은 별도 단계. 준비된 01~03 구현 방식의 보류 사항 없음. 2026-10-03 요청으로 문서 5종의 작성·편집 규칙과 Issue 템플릿 주석·파일명 변경 포함

## 현재 동작과 변경 이유

조사 기준은 원격 main의 `a0be2fac9e750a71c91e70344eebd4681c6921b6`이다. 원본·개선 방향·실제 기록의 전후 예시는 [가독성 검토](readability-assessment.md)를 참조한다.

| 현재 동작 | 근거 위치 | 바꿀 결과 |
| --- | --- | --- |
| README 두 언어판에 13개 스킬과 새 스킬 3개 연결 존재 | README.md·README.ko.md의 스킬 표·흐름·첫 실행 | 신규 목록 중복 추가 대신 사용자가 요청 예시로 스킬 선택 |
| 전체 흐름은 있으나 새 스킬별 구체 요청 예시가 부족 | README의 작동 방식·첫 실행·예제 | 시작·구현·종료 상황의 짧은 사용 예시와 정본 링크 |
| 기록 문체와 요약·링크 규칙은 있으나 독자의 정보 우선순위 기준 부족 | writing-conventions.md·document-links.md | 쉬운 결과 요약 뒤 필수 판단·근거 배치 |
| Issue #8은 긴 범위 목록, PR #9는 내부 용어와 상세 이력 병렬 나열 | 실제 GitHub 본문, 검토 문서의 출처 링크 | 미확인·위험을 유지하면서 본문 판단과 상세 증거 분리 |

## 범위

| 구분 | 내용 |
| --- | --- |
| 포함 | README 두 언어판, 공통 작성 기준, issue-create·pr-create·plan-create·task-implement·pr-review 지침, 템플릿 주석과 대문자 파일명, 필요한 template-init 필수 절 연결, 예시·검증 |
| 제외 | 기존 Issue·PR·댓글 소급 편집, #6 댓글 게시 정책·#8 자동 정리 기능 구현, 스킬 이름·승인·판정·AC 추적 규칙 변경, 릴리즈·설치 |
| 미변경 소비자 | 기존 대상 리포의 템플릿·AGENTS.md·작업 기록, 다른 작업 브랜치·워크트리 |
| 호환성·데이터·운영 | 서버·데이터 영향 없음. 기존 템플릿 절 우선, 새 양식은 이후 작성부터 적용 |

## 단계

| 단계 | 제목 | 설명 | 검증 사례 | 완료 |
| --- | --- | --- | --- | --- |
| [01](task-01-readme-guidance.md) | README 사용 안내 | 영어·한국어 역할·흐름·요청 예시 일치 | [TC-01](task-01-readme-guidance.md#tc-01), [TC-02](task-01-readme-guidance.md#tc-02) | [ ] |
| [02](task-02-writing-templates.md) | 기록 기준과 템플릿 | 문서별 정보 경계·작성 후 편집·주석·대문자 파일명 | [TC-03](task-02-writing-templates.md#tc-03), [TC-04](task-02-writing-templates.md#tc-04), [TC-05](task-02-writing-templates.md#tc-05), [TC-08](task-02-writing-templates.md#tc-08) | [ ] |
| [03](task-03-examples-validation.md) | 예시와 통합 검증 | 의미 보존 전후 예시·패키지·인계·정리 | [TC-06](task-03-examples-validation.md#tc-06), [TC-07](task-03-examples-validation.md#tc-07) | [ ] |

실행 순서: 01 → 02 → 03. 구현 세션은 작업 표 순서대로 진행한다. 지시 변경 전 시나리오를 먼저 실행하고 변경 후 같은 입력으로 재실행한다. 실패 시 해당 단계로 돌아간다.

## 최종 검증

| 사례 | AC | 명령·작업 디렉토리 | 기대 결과 | 필요 승인 | 결과 |
| --- | --- | --- | --- | --- | --- |
| <a id="tc-f01"></a>TC-F01 | AC-01, AC-04, AC-05, AC-08, AC-09 | `node scripts/check-package.mjs` 및 `node --test tests/package.test.mjs`, 리포 루트 | 구조·상대 링크·기존 테스트 통과 | 없음 | 구현 후 미실행 |
| <a id="tc-f02"></a>TC-F02 | AC-02, AC-03, AC-04, AC-05, AC-07, AC-08, AC-09 | 독립 pr-review에서 고정 입력 재실행, review/issue-11 | 의미 손실·미검증 은폐·규칙 중복 없음 | 없음 | 구현 후 미실행 |
| <a id="tc-f03"></a>TC-F03 | AC-06 | 결과 커밋·작업본·ignored 파일·worktree 대응 확인 후 작업 위치 밖에서 `git worktree remove <이번 경로>`; 재조회 | 결과 브랜치 유지, 이번 완료 worktree만 제거, 다른 작업 보존 | 이번 완료 worktree 삭제 요청 있음 | 구현 worktree 미실행 |

문서·지시 변경이므로 서버 단위 테스트 대상은 없다. 패키지·링크 검사와 독립 작성 시나리오로 대체한다. 이번 계획 작성 단계의 검사는 구현 완료 증거가 아니다.

## 전달과 롤백

| 항목 | 내용 |
| --- | --- |
| 전달 방법 | 계획·검토 문서는 로컬 커밋으로 보존. 구현은 검토 입력을 읽지 않은 별도 세션에 plan·task·Issue 전달. 서버 배포 없음 |
| 검토 기준 | plan 커밋에서 분기한 `review/issue-11`에만 보관. 구현 세션은 읽지 않음 |
| 필요 승인 | 호출된 계획 절차의 로컬 문서 커밋·요청한 이번 worktree 삭제. push·PR·머지·Release·설치·과거 본문 편집은 별도 요청 필요 |
| 적용 후 확인 | 최종 HEAD의 README 양언어·필수 정보 보존·패키지·작성 시나리오 결과, 실제 대상 리포 반영은 별도 구분 |
| 롤백 | 구현 커밋 revert 또는 이전 ref 사용. 다른 작업 reset·clean·force 삭제 없음 |

## 결정과 변경 기록

| 날짜 | 구분 | 내용 | 영향 AC·단계 | 상태 |
| --- | --- | --- | --- | --- |
| 2026-10-02 | 결정 | 기존 #6·#8과 해결 범위가 달라 #11 생성, documentation·enhancement 적용, assignee insung | 전체 | 승인 |
| 2026-10-02 | 결정 | 최신 main에 새 스킬 연결이 있어 README 작업은 사용 안내·예시 중심으로 구성 | AC-01·01 | 승인 |
| 2026-10-02 | 결정 | Markdown 유지. 필수 정보는 펼친 본문, 상세는 링크 우선·필요할 때 details. Issue Forms 전환은 제외 | AC-03, AC-04·02 | 승인 |
| 2026-10-02 | 결정 | 사용자가 Issue·검토·계획까지 진행으로 확정. 구현 전 검토 입력을 고정하고 별도 세션에 인계 | 전체 | 승인 |

| 2026-10-03 | 요청 변경 | 문서별 정보 경계·한 항목 한 주장·결론 우선·중복 제거·작성 후 편집을 적용. Issue 템플릿 HTML 주석 안내와 FEATURE_REQUEST.md·BUG_REPORT.md로 파일명 변경 및 참조·검사·기존 템플릿 보존 검증 포함 | AC-07~09·02~03 | 승인 |
