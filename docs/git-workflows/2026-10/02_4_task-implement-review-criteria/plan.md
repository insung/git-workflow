---
issue: "#4"
status: review-pending
branch: "feat/task-implement"
base: "보류 (D1)"
created: "2026-10-02"
---

# 구현 스킬 task-implement 추가와 구현 전 검토 기준 고정 계획

## 요청

> 배경: Issue #1(docs/git-workflows/2026-10/02_1_template-init-review-cleanup/)을 진행하며 다음이 필요하다고 확인했다.
> 1. 구현 스킬 task-implement 추가 … 2. 검증 기준을 구현 전에 고정 … 3. 파일 이름 규칙 변경 … 4. 검토 기준과 검증 입력의 예제를 docs/examples/python-version-upgrade/에 추가 … 5. template-init 지시 보완: Issue 템플릿 필수 절 목록, ISSUE_TEMPLATE 폴더 생성, remote 없는 저장소, 뜻이 같은 절의 판단 기준

- 해석: 구현 절차를 별도 스킬로 분리하고, 검토 기준·검증 입력을 구현 전에 구현 세션이 보지 않는 위치에 고정해 pr-review가 독립 입력으로 판정하게 한다. 파일 이름 규칙과 template-init의 모호한 지시를 함께 정리한다.
- 남은 결정: D1~D5 (결정과 변경 기록 참고)

## 현재 동작과 변경 이유

| 현재 동작 | 근거 위치 | 바꿀 결과 |
| --- | --- | --- |
| 구현 절차가 git-workflow의 한 절(번호 목록 5개)에만 있음 | `skills/git-workflow/SKILL.md:40-56` 「구현 진행」 | task-implement 스킬이 정본, git-workflow는 링크만 |
| todo 진행 규칙이 구현 절차와 별도 위치에 있음 | `skills/plan-create/references/todos.md:78` 「진행 규칙」 | 구현 진행 규칙의 정본 한 곳 |
| 다른 스킬이 `#구현-진행` 앵커로 연결 | `skills/plan-create/SKILL.md:30`, `skills/pr-create/SKILL.md:14` | task-implement 링크 |
| 검토 기준·검증 입력의 작성 절차와 보관 위치 없음. Issue #1에서는 미추적 파일이라 구현 세션이 읽음 | Issue #1 review.md 「다음 행동」 W2 (062f622) | plan-create가 작성, 구현 세션이 보지 않는 위치에 보관 |
| pr-review가 하위 모델 호출을 금지하나 스킬 변경 검증은 하위 에이전트 시나리오로 실행 | `skills/pr-review/SKILL.md:10` 「별도 모델을 중첩 호출하지 않는다」 | 검증 실행 주체를 한 곳에 정의 |
| todo 파일 이름이 `{nn}-todos-{step-title}.md` | `skills/plan-create/references/plan.md:14`, `:18`, `skills/plan-create/SKILL.md:20`, `README.md:46`, `README.ko.md:46` | `task-{nn}-{step-title}.md` |
| 필수 절 목록 없이 「정본의 필수 절」을 지시 | `skills/template-init/SKILL.md:31-32` | 템플릿별 필수 절 목록 |
| 복사만 지시하고 `.github/ISSUE_TEMPLATE/` 폴더 생성 언급 없음 | `skills/template-init/SKILL.md:28` | 폴더가 없으면 생성 |
| 라벨 조회가 remote를 전제함 | `skills/template-init/SKILL.md:19`, `:33` | remote 없으면 복사는 진행하고 라벨은 미확인 보고 |
| 절 이름이 다른 기존 템플릿의 판정 기준 없음 | `skills/template-init/SKILL.md:29`, `:32` | 뜻이 같은 절의 판단 기준 |

## 범위

| 구분 | 내용 |
| --- | --- |
| 포함 | task-implement 신규, git-workflow·plan-create·pr-create·pr-review 지시, todo·검증 입력 이름 규칙, template-init 지시, python-version-upgrade 예제, README 영어·한국어, 패키지 검사·테스트, 플러그인 매니페스트 버전 |
| 제외 | Issue #1 작업 문서의 파일 이름 변경, 권한·hook으로 파일 접근 차단, 기존 스킬 이름 변경, spec-it 저장소 변경, 템플릿 복사 후 커밋·push 자동 실행 |
| 미변경 소비자 | 설치된 플러그인 캐시, 대상 저장소의 기존 `docs/git-workflows/` 문서(옛 todo 이름) |
| 호환성·데이터·운영 | 스킬 1개 추가. todo 파일 이름 규칙 변경으로 진행 중인 대상 저장소 문서와 이름이 다름(D3) |

## 단계

| 단계 | 제목 | 설명 | 검증 사례 | 완료 |
| --- | --- | --- | --- | --- |
| [01](task-01-file-naming.md) | 파일 이름 규칙 | todo·검토 기준·검증 입력 이름 규칙을 디렉토리 규칙에 반영, 예제 todo 파일 이름 변경 | [TC-01](task-01-file-naming.md#tc-01) | [x] |
| [02](task-02-independent-review.md) | 독립 검토 플로우 | plan-create의 검토 기준·검증 입력 양식, 보관 위치, pr-review 재실행 절차, 검증 실행 주체, 커밋 시점 | [TC-02](task-02-independent-review.md#tc-02)<br>[TC-03](task-02-independent-review.md#tc-03) | [x] |
| [03](task-03-task-implement.md) | task-implement 스킬 | 구현 진행 절차와 todo 진행 규칙을 새 스킬로 이동, 링크·패키지 검사 갱신 | [TC-04](task-03-task-implement.md#tc-04)<br>[TC-05](task-03-task-implement.md#tc-05)<br>[TC-06](task-03-task-implement.md#tc-06) | [x] |
| [04](task-04-template-init.md) | template-init 지시 보완 | 필수 절 목록, 폴더 생성, remote 없는 저장소, 뜻이 같은 절 판단 기준 | [TC-07](task-04-template-init.md#tc-07)<br>[TC-08](task-04-template-init.md#tc-08) | [x] |
| [05](task-05-examples-readme.md) | 예제와 README | python-version-upgrade에 검토 기준·검증 입력 예제 추가, README 스킬 표와 작업 문서 설명 갱신 | [TC-09](task-05-examples-readme.md#tc-09) | [x] |

실행 순서: 01 → 02 → 03 → 04 → 05 → 최종 검증. 02가 정한 보관 위치(D2)를 03의 읽기 금지 규칙이 참조한다. 05는 01~04의 최종 규칙을 예제로 보여 주므로 마지막에 둔다. 검증이 실패하면 해당 단계로 돌아가 같은 사례를 다시 실행한다.

스킬 지시를 바꾸는 단계(02·03·04)는 변경 전 지시로 같은 시나리오를 먼저 실행(RED)하고, 변경 후 결과(GREEN)와 함께 기록한다.

## 최종 검증

| 사례 | AC | 명령·작업 디렉토리 | 기대 결과 | 필요 승인 | 결과 |
| --- | --- | --- | --- | --- | --- |
| <a id="tc-f01"></a>TC-F01 | AC-15 | `node --test tests/package.test.mjs`, `node scripts/check-package.mjs`, `claude plugin validate .claude-plugin/plugin.json`, `claude plugin validate .claude-plugin/marketplace.json`, `git diff --check`, 리포 루트 | 모두 통과 | 없음 | 통과 (af57a04, 2026-10-02). `node --test` 22/22, `check-package` 통과, `claude plugin validate` 두 매니페스트 통과, `git diff --check` 종료 코드 0. 미커밋 변경 없음 |
| <a id="tc-f02"></a>TC-F02 | AC-05, AC-06 | Issue #4의 `review-criteria.md`·`review-input-<topic>.md`로 pr-review 실행 | 고정 입력으로 다시 실행한 결과가 review.md에 기록 | 검토 기준 작성 세션 지정(D5) | 미실행. 구현 세션은 `review/issue-4`의 검토 기준·검증 입력을 읽지 않으므로(task-implement 입력 규칙) 실행할 수 없음. 다른 세션의 pr-review가 실행 |

문서·지시 변경이라 유닛 테스트 대상 코드는 패키지 검사 스크립트뿐이다. 구조는 패키지 테스트로, 지시의 효과는 하위 에이전트 시나리오의 변경 전·후 비교로 확인한다.

## 전달과 롤백

| 항목 | 내용 |
| --- | --- |
| 전달 방법 | 서버 배포 없음. 단계별 커밋 → push → PR(대상 브랜치 D1) → 리뷰 → 승인 머지 → 사용자가 플러그인 갱신 |
| 필요 승인 | 커밋, push, PR 생성, 머지 각각. 현재 승인은 Issue 생성과 계획 작성까지 |
| 적용 후 확인 | 새 세션에서 task-implement 표시, 구현 요청이 task-implement로 선택됨 |
| 롤백 | 머지 전: 해당 커밋 revert. 머지 후: 머지 커밋 revert와 이전 버전 재설치 |

## 결정과 변경 기록

| 날짜 | 구분 | 내용 | 영향 AC·단계 | 상태 |
| --- | --- | --- | --- | --- |
| 2026-10-02 | 요청 변경 | 독립성 규칙을 「수정 금지」에서 「구현 세션이 보지 않음」으로 강화. 보관 위치 결정, pr-review 중첩 호출 문장 정리, review.md 커밋 시점·범위 결정을 범위에 추가 | AC-05, AC-07, AC-08, 02·03 | 승인 |
| 2026-10-02 | 결정 | 단계 todo 이름 `task-{nn}-{step-title}.md`, 검증 입력 이름 `review-input-<topic>.md`, 검토 기준 이름 `review-criteria.md` | AC-09, 01 | 승인 |
| 2026-10-02 | 결정 | 이 계획의 todo도 새 이름 규칙 사용 | 01 | 승인 |
| 2026-10-02 | 결정 | D1 PR 대상 브랜치. 이 브랜치는 `feat/issue-review-workflow`에서 분기함. 후보: `main`, `feat/issue-review-workflow` | 전달 | 보류 |
| 2026-10-02 | 결정 | D2 검토 기준·검증 입력의 보관 위치 | AC-05, 02·03 | 보류, 02 작업 1에서 결정 |
| 2026-10-02 | 결정 | D3 대상 저장소에 남은 옛 `{nn}-todos-` 파일의 인식 여부 | AC-09, 01·03 | 보류, 01 작업 1에서 결정 |
| 2026-10-02 | 결정 | D4 플러그인 버전. 현재 0.3.0, 스킬 추가로 0.4.0 제안 | 전달, 03 | 보류, 첫 커밋 전 결정 |
| 2026-10-02 | 결정 | D5 Issue #4 자체의 `review-criteria.md`·`review-input-<topic>.md`. 계획 세션에서는 만들지 않음. D2 결정 뒤 구현과 다른 세션이 작성 | AC-05, 03·TC-F02 | 보류, 02 완료 후 03 시작 전 |
| 2026-10-02 | 결정 | 단계별 로컬 커밋 승인. push·PR은 미승인 | 전달 | 승인 |
| 2026-10-02 | 결정 | Issue #1 PR #3 머지(8f8c51b)로 base 변경. `feat/task-implement`를 `git rebase --onto origin/main 2801e41`로 이동. 2801e41 뒤 커밋이 없어 내용 변경 없음. D1 후보 중 `feat/issue-review-workflow`는 머지되어 의미가 없어짐 | 전달 | 승인 |
| 2026-10-02 | 결정 | D2 검토 기준·검증 입력은 별도 리뷰 브랜치 `review/issue-4`에만 커밋. 구현 브랜치에는 두지 않음. pr-review가 그 브랜치에서 읽음 | AC-05, 02·03 | 승인 |
| 2026-10-02 | 결정 | D3 새 이름 `task-{nn}-{step-title}.md`만 규칙에 둠. 옛 `{nn}-todos-` 파일의 인식은 언급하지 않음 | AC-09, 01 | 승인 |
| 2026-10-02 | 결정 | D4 플러그인 버전 0.4.0 | 전달, 03 | 승인 |
| 2026-10-02 | 결정 | D5 Issue #4의 검토 기준·검증 입력은 01 시작 전에 구현과 다른 세션이 `review/issue-4` 브랜치에 작성. 양식은 Issue #1의 검토 기준 파일을 따르고, 02 완료 후 새 양식과 다르면 리뷰 세션이 맞춤 | AC-05, TC-F02 | 승인 |
| 2026-10-02 | 계획 이탈 | 03 단계에서 변경 대상에 없던 `skills/git-workflow/references/document-links.md`의 「구현 진행 기록」을 「구현 기록」으로 변경. TC-05 검색에서 구현 절차가 아닌 문구가 잡히지 않게 함. 동작 변경 없음 | AC-03, 03 | 보류 |
