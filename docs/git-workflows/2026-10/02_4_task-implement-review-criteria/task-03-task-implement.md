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
| 1 | 변경 전 시나리오(RED): 현재 git-workflow 「구현 진행」으로 TC-04·TC-06 실행, 결과 기록 | [ ] | 컨트롤러 실행 대기. RED 스킬은 405b8be. 입력은 scratchpad의 TC-04 고정 저장소 생성 스크립트·실행자 프롬프트, TC-06 프롬프트 생성 스크립트 |
| 2 | task-implement SKILL.md 작성: todo 작업 표 순서 진행, 처리 내용·결과 칸 기록, 스킬 변경 시 RED/GREEN, 단계별 commit-rule 커밋, 계획 이탈 기록, handoff.md 작성, 검토 기준·검증 입력 읽기 금지(D2 위치 참조) | [x] | 입력 표(읽지 않음: `review/issue-{n}`·두 파일, 보관 위치 링크), 절차 8개, 기록 규칙 표. RED/GREEN은 검증 실행 주체 링크. `agents/openai.yaml`은 git-workflow에만 있어 만들지 않음. 필수 스킬 목록 추가 (0ed3594) |
| 3 | git-workflow·todos.md에서 옮긴 절차 제거와 링크 대체, plan-create·pr-create 링크 변경 | [x] | git-workflow 「구현 진행」 제거·단계 선택 표 연결·description에서 구현 제외, todos.md 「진행 규칙」 제거와 링크, `#구현-진행` 2곳 변경. `document-links.md`의 「구현 진행 기록」 문구 변경(계획 이탈) (624febd) |
| 4 | 패키지 검사·테스트·README·매니페스트 버전 갱신 | [x] | README 영어·한국어 흐름도·스킬 표·구조 (de36244), 매니페스트 3개 0.4.0 (709caa2). marketplace.json에는 버전 없음 |
| 5 | 변경 후 시나리오(GREEN) 실행, 커밋 | [ ] | 컨트롤러 실행 대기. GREEN 스킬은 709caa2 |

## 검증

| 사례 | AC | 명령·작업 디렉토리 | 기대 결과 | 결과 |
| --- | --- | --- | --- | --- |
| <a id="tc-04"></a>TC-04 | AC-02, AC-05 | 하위 에이전트에 task-implement 스킬과 scratchpad 저장소의 plan·task 2개(스킬 지시 변경 1개 포함)·검토 기준 파일을 주고 구현 요청 3회. 변경 전·후 각각 | 변경 후 3회 모두: 작업 표 순서 진행, 처리 내용·결과 칸 기록, 스킬 변경 작업에서 RED/GREEN 기록, 단계별 커밋, 계획 이탈 기록, handoff.md 작성, 검토 기준 파일 읽지 않음 | 미실행. 컨트롤러 실행 대기 |
| <a id="tc-05"></a>TC-05 | AC-01, AC-03 | `grep -n "구현 진행\|진행 규칙" skills -r`, `grep -rn "#구현-진행" skills README.md README.ko.md`, 리포 루트 | 구현 절차가 `skills/task-implement/SKILL.md`에만 있음, 옛 앵커 0 | 통과 (709caa2). 첫 명령은 `skills/task-implement/SKILL.md:10` 「구현 진행과 todo 칸 기록 규칙의 정본이다.」 1건, 둘째 명령 0건 |
| <a id="tc-06"></a>TC-06 | AC-01 | 하위 에이전트에 스킬 11개와 경쟁 스킬 3개의 description, 요청문 하나를 주고 단일 선택 3회. 요청: 「Issue #12 작업 이어서 진행해줘」, 「plan의 01 단계를 구현해줘」, 「Issue #12의 구현 계획을 작성해줘」 | 각각 git-workflow, task-implement, plan-create로 3/3 | 미실행. 컨트롤러 실행 대기 |

## 제외 범위

- 검토 기준·검증 입력의 양식과 보관 위치 결정 (02 단계)
- 기존 스킬 이름 변경
