# 03 task-implement 스킬

계획: [plan의 단계 표](plan.md#단계)

## 변경 대상

| 구분 | 경로 | 이유 |
| --- | --- | --- |
| Create | `skills/task-implement/SKILL.md` | 구현 진행 절차의 정본 |
| Create | `skills/task-implement/agents/openai.yaml` | `skills/git-workflow/agents/openai.yaml`과 같은 형식이 필요한지 작업 1에서 확인 |
| Modify | `skills/git-workflow/SKILL.md` | 단계 선택 표의 구현 행을 task-implement로 연결, 「구현 진행」 절 제거 |
| Modify | `skills/plan-create/references/todos.md` | 「진행 규칙」 절을 task-implement로 옮기고 링크로 대체 |
| Modify | `skills/plan-create/SKILL.md`, `skills/pr-create/SKILL.md` | `#구현-진행` 링크를 task-implement로 변경 |
| Modify | `scripts/check-package.mjs`, `tests/package.test.mjs` | 필수 스킬 목록에 task-implement 추가 |
| Modify | `README.md`, `README.ko.md` | 스킬 표와 작동 방식 흐름도에 task-implement 추가 |
| Modify | `plugin.json`, `.claude-plugin/plugin.json`, `.codex-plugin/plugin.json` | 버전(D4) |

## 작업

| # | 작업 | 완료 | 처리 내용 |
| --- | --- | --- | --- |
| 1 | 변경 전 시나리오(RED): 현재 git-workflow 「구현 진행」으로 TC-04·TC-06 실행, 결과 기록 | [x] | 405b8be 스킬로 컨트롤러가 실행. TC-04 RED 3회, TC-06 RED 요청 5개 각 3회 (검증 표). 구현 후 옛 스냅샷 재생이며 변경 전 선행 실행 아님 |
| 2 | task-implement SKILL.md 작성: todo 작업 표 순서 진행, 처리 내용·결과 칸 기록, 스킬 변경 시 RED/GREEN, 단계별 commit-rule 커밋, 계획 이탈 기록, handoff.md 작성, 검토 기준·검증 입력 읽기 금지(D2 위치 참조) | [x] | 입력·반환 표, 절차 8개, 기록 규칙 표 작성. `agents/openai.yaml`은 git-workflow에만 있어 미작성 (0ed3594). 리뷰 지적의 실행자 입력 출처·handoff 작성 주체·scope 수정 (da98ced) |
| 3 | git-workflow·todos.md에서 옮긴 절차 제거와 링크 대체, plan-create·pr-create 링크 변경 | [x] | 옮긴 절차 제거와 링크 대체 (624febd). 계획 이탈: `document-links.md`의 「구현 진행 기록」을 「구현 기록」으로 변경. TC-05 검색에 구현 절차가 아닌 문구가 잡히지 않게 하려는 이유 (plan 결정과 변경 기록, 보류) |
| 4 | 패키지 검사·테스트·README·매니페스트 버전 갱신 | [x] | README 영어·한국어 흐름도·스킬 표·구조 (de36244), 매니페스트 3개 0.4.0 (709caa2). marketplace.json에는 버전 없음 |
| 5 | 변경 후 시나리오(GREEN) 실행, 커밋 | [x] | 709caa2 스킬로 컨트롤러가 실행. TC-04 GREEN 3/3, TC-06 GREEN 15/15. da98ced 수정 전 실행, 재실행 없음 |

## 검증

| 사례 | AC | 명령·작업 디렉토리 | 기대 결과 | 결과 |
| --- | --- | --- | --- | --- |
| <a id="tc-04"></a>TC-04 | AC-02, AC-05 | 하위 에이전트에 task-implement 스킬과 scratchpad 저장소의 plan·task 2개(스킬 지시 변경 1개 포함)·검토 기준 파일을 주고 구현 요청 3회. 변경 전·후 각각 | 변경 후 3회 모두: 작업 표 순서 진행, 처리 내용·결과 칸 기록, 스킬 변경 작업에서 RED/GREEN 기록, 단계별 커밋, 계획 이탈 기록, handoff.md 작성, 검토 기준 파일 읽지 않음 | 통과 (GREEN 709caa2). GREEN 3/3 E1~E7 충족: 표 순서, 칸 기록, task-02 RED/GREEN 기록(자기 실행 한계 명시), 단계별 커밋, `계획 이탈` 행, handoff.md, 검토 기준 브랜치 열람·캐너리 0건. RED(405b8be): E5 `계획 이탈` 형식 0/3, E3 변경 전 대상 커밋·task-02 기록 누락 3/3, red-2 E2 작업 미완 표시. E7은 RED도 3/3. 6회 모두 `package.json`에 test 스크립트를 추가함: 고정 저장소의 `npm test`에 스크립트가 없는 고정 입력 결함이며 스킬 결과 아님. 실행자는 하위 에이전트를 만들 수 없어 task-02 시나리오는 자기 실행. da98ced 수정 전 실행, 재실행 없음 |
| <a id="tc-05"></a>TC-05 | AC-01, AC-03 | `grep -n "구현 진행\|진행 규칙" skills -r`, `grep -rn "#구현-진행" skills README.md README.ko.md`, 리포 루트 | 구현 절차가 `skills/task-implement/SKILL.md`에만 있음, 옛 앵커 0 | 통과 (da98ced). 첫 명령은 `skills/task-implement/SKILL.md:10` 「구현 진행과 todo 칸 기록 규칙의 정본이다.」 1건, 둘째 명령 0건 |
| <a id="tc-06"></a>TC-06 | AC-01 | 하위 에이전트에 스킬 11개와 경쟁 스킬 3개의 description, 요청문 하나를 주고 단일 선택 3회. 요청: 「Issue #12 작업 이어서 진행해줘」, 「plan의 01 단계를 구현해줘」, 「Issue #12의 구현 계획을 작성해줘」 | 각각 git-workflow, task-implement, plan-create로 3/3 | 통과 (GREEN 709caa2). GREEN 15/15. 요청 3개가 description 예시와 같아 컨트롤러가 다른 표현의 요청 R4 「todo 02에 적힌 작업들 코드로 옮기고 단계별로 커밋해줘」(기대 task-implement), R5 「Issue #12 지금 어디까지 됐고 다음에 뭘 해야 해?」(기대 git-workflow)를 추가. RED(405b8be): 구현 요청 R2·R4가 git-workflow 3/3, 나머지는 기대와 같음. da98ced 수정 전 실행, 재실행 없음 |

## 실행 순서 확인

원래 controller log `63f6900e-f9ad-497b-a516-e8d750ed59a3`의 Agent 호출 메타데이터와 공개 커밋 시각을 대조했다. TC-04 RED 첫 호출은 `2026-10-01T18:44:55.749Z`, TC-06 RED 첫 호출은 `2026-10-01T18:45:41.805Z`이며 task-implement 구현 커밋 `0ed3594`의 `2026-10-01T18:42:34Z`보다 늦다. 옛 소스 `405b8be`와 새 소스를 구현 후 재생한 비교 결과는 유지한다. 당시 지시 변경 전에 RED를 실행하는 계획 순서는 지키지 않았으며, 현재 재실행으로 소급 충족할 수 없다. 실제 비교 통과와 RED 선행 순서 충족은 구분한다.

## 제외 범위

- 검토 기준·검증 입력의 양식과 보관 위치 결정 (02 단계)
- 기존 스킬 이름 변경
