# 구현과 PR 리뷰 인계

- Issue / PR: [Issue #4](https://github.com/insung/git-workflow/issues/4) / PR 미생성 (push·PR 미승인)
- Plan / Todo: [plan.md](plan.md) (status `review-pending`), [task-01](task-01-file-naming.md) · [task-02](task-02-independent-review.md) · [task-03](task-03-task-implement.md) · [task-04](task-04-template-init.md) · [task-05](task-05-examples-readme.md) 모두 완료 표시
- base / 구현 코드 commit / 검토 HEAD / 미커밋 변경: base `origin/main` 8f8c51b, 구현 코드 마지막 commit cee2254(template-init), 예제 마지막 수정 af57a04, 최종 리뷰 수정 b673beb~669db22, 검토 HEAD는 이 문서를 담은 `docs(work-record)` 커밋, 미커밋 변경 없음 (669db22 시점 `git status` 비어 있음)
- 확인 시각: 2026-10-02 04:10 (TC-F01 재실행)
- 실제 실행 담당과 검토 방식: 구현·최종 검증은 구현 세션이 실행. RED/GREEN 시나리오는 컨트롤러가 하위 에이전트로 실행. 독립 검토는 별도 세션의 pr-review가 담당하며 이 문서 작성 시점에는 미실행
- spec-it: 미채택
- 독립성 (역할별 감사 결과, 2026-10-02): 소스 구현 작업자는 별도 하위 에이전트였으며, 독립 검토 담당의 원본 역할별 로그 감사에서 실제 Issue #4의 비공개 검토 기준·검증 입력 파일에 접근한 도구 기록을 발견하지 못했다. 이는 감사한 기록의 관찰이며 접근 차단 장치의 증명이 아니다.
- 컨트롤러 노출 한계: 원래 컨트롤러 세션 `63f6900e-f9ad-497b-a516-e8d750ed59a3`에는 별도 기준 작성자의 완료 요약이 전달되었고 일부 기준 관련 내용이 포함되어 있었다. 따라서 전체 세션의 완전한 비노출을 주장할 수 없다. 이번 기록 보완은 전달받은 공개 가능한 감사 결과만 사용하며 원본 요약·본문과 비공개 기준을 열지 않았다.
- 독립성 판단: 역할별 관찰과 컨트롤러 노출 한계를 분리해 기록한다. 독립성 관련 보류 판단을 승인하거나 해소한 것으로 간주하지 않는다.

## 사용자 의도와 구현 결과

| AC | 기대 동작 | 구현 경로/commit | 대응 task/TC | 실제 충족·미확인 |
| --- | --- | --- | --- | --- |
| AC-01 | task-implement 존재, git-workflow는 링크만 | `skills/task-implement/SKILL.md` (0ed3594), `skills/git-workflow/SKILL.md` 「구현 진행」 절 제거 (624febd) | task-03 / TC-05, TC-06 | 충족. 옛 앵커 0건, 구현 절차 정본 1곳 |
| AC-02 | 작업 표 순서·칸 기록·RED/GREEN·단계 커밋·계획 이탈·handoff 절차 | `skills/task-implement/SKILL.md` 절차 1~8과 「기록 규칙」 (0ed3594, da98ced) | task-03 / TC-04 | 충족. GREEN 3/3. 실행자의 task-02 시나리오는 자기 실행 한계 |
| AC-03 | 구현 진행 규칙 정본 1곳, 나머지는 링크 | `skills/plan-create/references/todos.md`·`plan-create/SKILL.md`·`pr-create/SKILL.md` 링크 대체 (624febd) | task-03 / TC-05 | 충족. 단 `document-links.md` 문구 변경은 계획 이탈로 사용자 결정 대기 |
| AC-04 | plan-create의 검토 기준·검증 입력 작성 절차와 양식 | `skills/plan-create/references/review-criteria.md`, `plan-create/SKILL.md` 절차 5 (6af0fb7) | task-02 / TC-02 | 충족 |
| AC-05 | 보관 위치 결정, 구현 세션 읽기 금지 | `review-criteria.md` 「보관 위치」(6af0fb7), `task-implement/SKILL.md` 「입력」·반환 표 (0ed3594, b4e38af), 검토 기준 접촉 세션의 구현 금지 (b673beb) | task-02, task-03 / TC-02, TC-04 | 충족. 읽기 금지는 지시이며 기계적 차단 없음 (범위 제외) |
| AC-06 | pr-review가 검토 기준으로 판정, 고정 입력 재실행, 구현 세션 결과는 참고 | `skills/pr-review/SKILL.md`, `pr-review/references/review.md` (a6a16be, 9060122, f6871dd) | task-02 / TC-02 | 충족 (GREEN 3/3, f6871dd 전 실행). 실제 Issue #4 입력으로 실행은 미확인 (TC-F02) |
| AC-07 | 검증 실행 주체를 한 곳에 정의 | `skills/git-workflow/references/execution-boundaries.md` 「검증 실행 주체」 (a6a16be), pr-review는 링크 | task-02 / TC-03 | 충족. `중첩 호출` 0건 |
| AC-08 | review.md 기록 뒤 커밋 시점·범위 | `skills/pr-review/SKILL.md` 「7. 기록 커밋」 (a6a16be, 9060122), pr-merge 링크 | task-02 / TC-03 | 충족 |
| AC-09 | `task-{nn}-{step-title}.md`, `review-input-<topic>.md`, 옛 이름 0 | `plan-create` 문서·README·예제 이름 변경 (99967fb) | task-01 / TC-01 | 충족. `grep -rn "todos-" skills docs/examples README.md README.ko.md` 0건 (af57a04) |
| AC-10 | 예제 검토 기준·검증 입력, README·plan에서 링크 | `docs/examples/python-version-upgrade/review-criteria.md`, `review-input-runtime-compat.md` (ea2b0b0), 재실행 횟수 정정 (af57a04), README 작업 문서 (482d6a1) | task-05 / TC-09 | 충족 |
| AC-11 | template-init 필수 절 목록 | `skills/template-init/SKILL.md` 「필수 절」 표, `tests/package.test.mjs` 구조 검사 (cee2254) | task-04 / TC-08 | 충족. 목록과 정본 `##` 절 일치 (기능 5·버그 9·PR 10) |
| AC-12 | `.github/ISSUE_TEMPLATE/` 생성과 복사 | `skills/template-init/SKILL.md` 절차 1·3 (cee2254) | task-04 / TC-07 | 충족 (GREEN 3/3). RED도 3/3이라 효과는 지시 명시화로만 확인 |
| AC-13 | remote 없는 저장소의 복사 진행, 라벨 미확인 보고 | `skills/template-init/SKILL.md` 절차 5 (cee2254) | task-04 / TC-07 | 충족 (GREEN 3/3, 사유 「라벨 미확인: remote 없음」) |
| AC-14 | 절 이름이 다를 때 같은 뜻 판정 기준 | `skills/template-init/SKILL.md` 절차 4 (cee2254) | task-04 / TC-07 | 충족 (GREEN 3/3, 「배경」=목표) |
| AC-15 | 패키지 테스트·검사·diff check 통과, 깨진 링크 0 | 전체 | TC-F01 | 충족 (669db22, 테스트 23개). 호스트 로딩과 의미 검토는 미확인 |

## 계획 대비 차이와 판단

| 날짜 | 구분 | 내용 | 영향 AC·단계 | 상태 |
| --- | --- | --- | --- | --- |
| 2026-10-02 | 요청 변경 | 독립성 규칙을 「구현 세션이 보지 않음」으로 강화, 보관 위치·pr-review 중첩 호출 문장·review.md 커밋 시점을 범위에 추가 | AC-05, AC-07, AC-08, 02·03 | 승인 |
| 2026-10-02 | 결정 | 이름 규칙 `task-{nn}-{step-title}.md`, `review-input-<topic>.md`, `review-criteria.md` | AC-09, 01 | 승인 |
| 2026-10-02 | 결정 | 이 계획의 todo도 새 이름 사용 | 01 | 승인 |
| 2026-10-02 | 결정 | D1 PR 대상 브랜치 | 전달 | 보류 |
| 2026-10-02 | 결정 | 단계별 로컬 커밋 승인, push·PR 미승인 | 전달 | 승인 |
| 2026-10-02 | 결정 | PR #3 머지(8f8c51b)로 base 변경, `git rebase --onto origin/main 2801e41` | 전달 | 승인 |
| 2026-10-02 | 결정 | D2 보관 위치는 별도 브랜치 `review/issue-{n}` | AC-05, 02·03 | 승인 |
| 2026-10-02 | 결정 | D3 새 이름만 규칙에 둠, 옛 이름 인식 미언급 | AC-09, 01 | 승인 |
| 2026-10-02 | 결정 | D4 버전 0.4.0 | 전달, 03 | 승인 |
| 2026-10-02 | 결정 | D5 Issue #4 검토 기준·검증 입력은 다른 세션이 `review/issue-4`에 작성 | AC-05, TC-F02 | 승인 |
| 2026-10-02 | 계획 이탈 | 03 단계에서 `skills/git-workflow/references/document-links.md`의 「구현 진행 기록」을 「구현 기록」으로 변경. 동작 변경 없음 | AC-03, 03 | 보류, 사용자 결정 필요 |
| 2026-10-02 | 계획 이탈 | I-1 검토 기준을 쓰거나 읽은 세션의 구현 금지 (b673beb, b4e38af, 2639c3d) | AC-05, 02·03 | 보류 |
| 2026-10-02 | 계획 이탈 | M-1 fail·human-review review.md 전체의 고정 입력 비공개 (f6871dd) | AC-06, AC-08, 02 | 보류 |
| 2026-10-02 | 계획 이탈 | M-2 RED 필수 행을 스킬 지시 변경에 한정 (b673beb, 669db22) | AC-04, AC-10, 02·05 | 보류 |
| 2026-10-02 | 계획 이탈 | M-3 task-implement 진입점 누락 테스트, M-4 입력 표 보완 (b4e38af) | AC-05, AC-15, 03 | 보류 |

- 사용자 결정 필요: 위 계획 이탈 행. I-1·M-1~M-4는 최종 리뷰 지적의 수정이며 시나리오(RED/GREEN)는 다시 실행하지 않았다. 승인하면 유지, 거부하면 `document-links.md`를 되돌리고 TC-05 검색 기대를 조정한다.
- todo에 없던 변경: 예제 `review.md`의 재실행 횟수를 「입력마다 1회」에서 「입력마다 3회」로 정정(af57a04). 검증 입력의 통과 기준 「결함이 있으면 3회 모두 F1 지적」과 맞추기 위함. 최종 검증 전 발견한 예제 불일치.
- 제외 범위 유지: Issue #1 문서 이름, 권한·hook 차단, 기존 스킬 이름, spec-it, 템플릿 복사 후 커밋·push.

## 검증 요약과 증거

| TC/AC | 사례와 테스트 파일 | 기대 | 실제·상태 | 명령·실행 위치 | 커밋·환경·시각 |
| --- | --- | --- | --- | --- | --- |
| TC-01 / AC-09 | 옛 이름 검색, 예제 todo 이름 | 검색 0건, 예제 3개 `task-0n-*` | pass | `grep -rn "todos-" ...`, `ls`, `check-package`, 리포 루트 | 99967fb |
| TC-02 / AC-04~06 | 하위 에이전트 pr-review 3회, 테스트 누락 가상 PR | 검토 기준 판정, 고정 입력 재실행, 구현 결과는 참고 | pass. GREEN 3/3 (`"2h"` RangeError 재현, F1 fail, F2). RED(d36e2aa) E2 0/3, E1 완전 충족 0/3. F1 탐지는 RED도 3/3이라 변경 효과의 근거가 아님 | 컨트롤러가 하위 에이전트로 실행, scratchpad 저장소 | GREEN 9eafa94. 9060122 수정 전 실행, 재실행 없음 |
| TC-03 / AC-07, AC-08 | `grep` 검색 | 정의 1곳, 커밋 규칙 존재 | pass. `execution-boundaries.md:21-31` 1곳, `중첩 호출` 0건 | `grep -rn "중첩 호출\|하위 에이전트" skills`, 리포 루트 | 9060122 |
| TC-04 / AC-02, AC-05 | 하위 에이전트 task-implement 구현 요청 3회 | E1~E7 충족 | pass. GREEN 3/3. RED(405b8be) E5 `계획 이탈` 형식 0/3, E3 3/3 누락. 6회 모두 `package.json`에 test 스크립트를 추가함(고정 저장소의 `npm test` 없음, 스킬 결과 아님). 실행자는 하위 에이전트를 만들 수 없어 task-02 시나리오 자기 실행 | 컨트롤러 실행 | GREEN 709caa2. da98ced 수정 전 실행, 재실행 없음 |
| TC-05 / AC-01, AC-03 | `grep` 검색 | 정본 1곳, 옛 앵커 0 | pass. `task-implement/SKILL.md:10` 1건, 옛 앵커 0건 | `grep -n "구현 진행\|진행 규칙" skills -r`, 리포 루트 | da98ced |
| TC-06 / AC-01 | description 선택 3회 × 요청 5개 | 기대 스킬 선택 | pass. GREEN 15/15. RED(405b8be)는 구현 요청 R2·R4가 git-workflow 3/3. R4·R5는 컨트롤러가 추가한 다른 표현 | 컨트롤러 실행 | GREEN 709caa2. da98ced 수정 전 실행 |
| TC-07 / AC-12~14 | template-init 3개 저장소 × 3회 | (a)(b)(c) 3/3 | pass. GREEN 3/3. RED(ac9d1a4)는 (c)「배경」3/3 판단 보류, 1/3은 제외·호환성을 누락 보고. (a)(b) 복사 동작은 RED도 3/3 | 컨트롤러 실행, scratchpad 임시 저장소 | GREEN cee2254 |
| TC-08 / AC-11 | 필수 절 목록과 정본 `##` 대조 | 일치 | pass. `node --test` 22/22 | `node --test tests/package.test.mjs`, 리포 루트 | cee2254 작업본 |
| TC-09 / AC-10 | 예제·README 링크, 절 수 | 파일 2개, 링크, 절 수 동일 | pass | `ls`, `grep`, `check-package`, 리포 루트 | ea2b0b0, 482d6a1 |
| TC-F01 / AC-15 | 최종 검증 5개 명령 | 모두 통과 | pass. `node --test` 23/23, `check-package` 통과, `claude plugin validate` 두 매니페스트 통과, `git diff --check` 0 | 리포 루트 (worktree), Node v23.11.0, macOS | 669db22, 2026-10-02 04:10. 이전: af57a04 22/22, 04:00 |
| TC-F02 / AC-05, AC-06 | 실제 Issue #4 검토 기준·검증 입력으로 pr-review | review.md에 재실행 결과 | not-run. 구현 세션은 `review/issue-4`를 읽지 않으므로 실행할 수 없음 | 다른 세션의 pr-review | 미실행 |

- 의미 있는 unit test: `tests/package.test.mjs` 23개. task-implement 진입점 누락 거부(b4e38af) 포함. template-init 필수 절 표와 정본 `##` 절의 일치, 따옴표 없는 description 거부, 필수 스킬 목록 포함을 검사한다. 스킬 지시의 효과는 RED/GREEN 시나리오가 검증한다.
- 시나리오 한계: 최종 리뷰 수정(b673beb~669db22)은 시나리오를 다시 실행하지 않았다. GREEN은 각각 마지막 수정 커밋 전에 실행해 재실행하지 않았다. 02의 GREEN(9eafa94)은 9060122 전, 03의 GREEN(709caa2)은 da98ced 전. 03 실행자는 하위 에이전트를 만들 수 없어 task-02 시나리오를 자기 실행했다. 고정 저장소 fixture에 `npm test`가 없어 6회 모두 `package.json`을 수정했다.
- 최종 통합·회귀: TC-F01 통과. 호스트(설치된 플러그인 캐시)에서의 스킬 로딩은 미확인. 새 세션 확인 항목은 아래 위험 표에 둔다.
- 커밋 이후 문서만 바뀐 부분: 이 `docs(work-record)` 커밋은 plan·handoff만 바꾼다. 코드 검증 결과는 669db22 기준이다.

## RED 실행 순서 정정 (2026-10-02)

원래 controller log `63f6900e-f9ad-497b-a516-e8d750ed59a3`에서 Agent 호출의 timestamp·name·description 메타데이터를 추출하고, `git show -s --format='%h %cI %s' 6af0fb7 a6a16be 0ed3594 cee2254`로 공개 커밋 시각을 확인했다. 검토 기준·고정 입력 및 실행자의 본문·출력을 이번 정정 근거로 열지 않았다. 아래 시각은 UTC다.

| 사례 | 구현 커밋·시각 | RED 첫 호출 시각 | 실행 순서 판단 |
| --- | --- | --- | --- |
| TC-02 | `6af0fb7`·`a6a16be`, `2026-10-01T18:25:58Z` | `2026-10-01T18:30:58.773Z` | 구현 후 옛 스냅샷 재생 |
| TC-04 | `0ed3594`, `2026-10-01T18:42:34Z` | `2026-10-01T18:44:55.749Z` | 구현 후 옛 스냅샷 재생 |
| TC-06 | `0ed3594`, `2026-10-01T18:42:34Z` | `2026-10-01T18:45:41.805Z` | 구현 후 옛 스냅샷 재생 |
| TC-07 | `cee2254`, `2026-10-01T18:53:14Z` | `2026-10-01T18:53:59.858Z` | 구현 후 옛 스냅샷 재생 |

- 기존 RED/GREEN 통과 횟수와 관찰 결과는 유지한다. 이 기록은 옛 소스와 새 소스를 구현 후 재생한 비교이며, 지시 변경 전에 RED를 실행했다는 증거가 아니다.
- 당시 절차 이탈: plan의 「스킬 지시를 바꾸는 단계(02·03·04)는 변경 전 지시로 같은 시나리오를 먼저 실행」하는 순서를 지키지 않았다. task-02·03·04의 처리 내용과 실행 순서 확인에 이를 명시했다. 완료 표시는 기존 비교 실행이 끝났다는 기록이며 해당 순서의 충족을 보증하지 않는다.
- 현재의 독립 검증도 구현 후 재생이다. 과거 RED 선행 실행으로 소급하지 않으며, 독립 검토 완료로 해석하지 않는다.
- 이번 보완은 실행 순서·증거 한계 기록만 변경한다. 기존 계획 이탈과 사용자 결정의 보류 상태는 유지한다. 새 스킬 지시·검증 결과·승인을 추가하지 않는다.
- 문서 수정 대상 HEAD: `d3544f0df020433f06f20cc690f65a4de778245c`. 변경 파일은 task-02·03·04와 handoff.md 네 개다. 로컬 work-record 커밋 뒤 실제 커밋 hash는 인계 보고에 남긴다.
- 문서 보완 검사: `git diff --check`와 네 파일의 시각·커밋·한계 문구 대조. 패키지 테스트·전체 구조 검사는 구현 역할의 금지 파일 접근 경계 때문에 이번 보완에서 미실행이다. 기존 코드 검증 결과를 이번 문서 변경의 새 코드 검증 결과로 주장하지 않는다.

## 커밋과 문서 상태

| 구분 | 커밋 |
| --- | --- |
| 계획 | 6f8fdff |
| 01 파일 이름 규칙 | 99967fb, d36e2aa(기록) |
| 02 독립 검토 플로우 | 6af0fb7, a6a16be, 9060122, 9eafa94(기록), 405b8be(결과 기록) |
| 03 task-implement | 0ed3594, 624febd, de36244, 709caa2(버전), da98ced(리뷰 수정), 7f6da8c·ac9d1a4(기록) |
| 04 template-init | cee2254, c2c5e84(기록), f9512e7(결과 기록) |
| 05 예제와 README | ea2b0b0, 482d6a1, 14f7b85(기록) |
| 최종 | af57a04(예제 정정), d6ae14e(기록) |
| 최종 리뷰 수정 | b673beb(plan-create), b4e38af(task-implement), 2639c3d(git-workflow), f6871dd(pr-review), 669db22(examples), 이 문서의 `docs(work-record)` 커밋 |

- 미커밋 변경: 없음. 원격에 올라간 문서: 없음 (모두 로컬).

## 위험·배포·롤백

| 항목 | 내용 |
| --- | --- |
| 버전 | 플러그인 0.4.0 (`plugin.json`, `.claude-plugin/plugin.json`, `.codex-plugin/plugin.json`). `marketplace.json`에는 버전 없음 |
| 전달 상태 | push·PR 미실행. 승인 필요: push, PR 생성, 머지 각각 |
| PR 대상 브랜치 | D1 보류. `feat/issue-review-workflow`는 머지되어 후보에서 제외, `main`이 남은 후보 |
| 미변경 소비자 | 설치된 플러그인 캐시, 대상 저장소의 옛 `{nn}-todos-` 문서 (D3로 인식 규칙 없음) |
| 적용 후 확인 | 새 세션에서 task-implement 표시, 구현 요청이 task-implement로 선택됨 |
| 롤백 | 머지 전: 커밋 revert. 머지 후: 머지 커밋 revert와 이전 버전(0.3.0) 재설치 |
| 사용자 결정 | `document-links.md` 문구 변경(계획 이탈 보류 행) |

## 다음 검토

1. [review-criteria.md](../../../../skills/plan-create/references/review-criteria.md#보관-위치)의 보관 위치 규칙에 따라 pr-review가 `review/issue-4`에서 검토 기준과 검증 입력을 읽는다.
2. 고정 HEAD는 이 문서를 담은 `docs(work-record)` 커밋, base는 `origin/main` 8f8c51b. 재현 명령은 TC-F01의 다섯 개 명령.
3. 고정 입력으로 TC-F02를 실행해 review.md의 고정 입력 재실행 절을 채운다. 이 handoff의 구현 세션 결과는 참고로만 쓴다.
4. review.md 기록 뒤 `skills/pr-review/SKILL.md`의 「7. 기록 커밋」을 따른다.
5. 사용자 결정: `document-links.md` 계획 이탈 승인 여부, D1 PR 대상 브랜치, push·PR 승인.
