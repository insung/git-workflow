# 06 AGENTS.md 초기화 스킬

계획: [plan의 단계 표](plan.md#단계). EXT-01~05는 사용자 요청으로 추가한 로컬 AC이며 원격 Issue AC와 구분한다.

## 변경 대상

| 구분 | 경로 | 이유 |
| --- | --- | --- |
| Create | `skills/agents-init/SKILL.md` | 짧은 선언 제안·승인·추가 절차 |
| Modify | `skills/git-workflow/SKILL.md`, `README.md`, `README.ko.md` | 신규 스킬 선택과 설명 |
| Modify / Test | `scripts/check-package.mjs`, `tests/package.test.mjs` | 신규 진입점 누락 검출 |
| Modify | 이 계획 디렉토리의 plan·task·handoff | 단계 처리와 실행 근거 |

## 작업

| # | 작업 | 완료 | 처리 내용 |
| --- | --- | --- | --- |
| 1 | 현재 추가 범위와 변경 전 신규 스킬 부재를 기록한다. | [x] | 2026-10-02 변경 전 HEAD a1f3919, 작업본 clean, `test ! -e skills/agents-init/SKILL.md` 종료 0. 신규 스킬 부재 baseline이며 없는 스킬의 RED 실행은 하지 않았다. EXT-01~05는 로컬 추가 AC. |
| 2 | skill-creator로 agents-init을 작성한다. 승인 전 실제 파일은 쓰지 않고 추가 전문·경로·위치를 보여주며 승인 후 추가한다. | [x] | `skills/agents-init/SKILL.md`, 소스 637afba. 추가 전문은 짧은 채택 선언·순서만 포함한다. 실제 프로젝트 AGENTS.md에는 적용하지 않았다. |
| 3 | 기존 내용 보존, 파일 신규 생성, 거절·미응답, 중복·충돌 처리를 검증한다. | [x] | TC-10~12 세 실행자 관찰 완료. 신규 파일 승인 후 생성·충돌 처리·승인 후 상태 변경은 지시에 포함하고 구현 세션 행동 검증은 미실행으로 구분한다. 아래 root 독립 검증 결과 인계로 신규 파일 승인 생성까지 확인. 충돌·상태 변경 대응 행동 검증은 미실행. |
| 4 | 패키지와 README·워크플로우 연결을 갱신한다. | [x] | 양언어 README 표·첫 실행·구조, git-workflow 라우팅, requiredSkills와 링크 없이 agents-init 누락을 거부하는 테스트 갱신. |
| 5 | quick_validate·evaluate-skill·패키지 검증 결과와 handoff를 기록한다. | [x] | TC-13 통과·평가 분류와 한계를 handoff 확장 절에 기록. 소스 637afba와 기록 커밋 분리. |

## 검증

| 사례 | AC | 명령·작업 디렉토리 | 기대 결과 | 결과 |
| --- | --- | --- | --- | --- |
| <a id="tc-10"></a>TC-10 | EXT-02, EXT-03 | 임시 저장소에 기존 AGENTS.md를 둔다. 새 실행자에게 초기화를 요청하고 승인 전 상태를 관찰한다. 전문 제시 후 명시적으로 승인하고 재개한다. 기본 3회. | 승인 전 무변경, 승인 후 기존 내용 보존·추가 전문 일치 | 3/3. 제안 전문·절대 경로·끝 위치 제시, 승인 전 기존 바이트 일치, 명시적 승인 후 CRLF 기존 바이트와 승인 전문 exact 일치. |
| <a id="tc-11"></a>TC-11 | EXT-02, EXT-03 | AGENTS.md 없는 임시 저장소에서 새 실행자에게 초기화를 요청한다. 승인 전 파일 부재를 확인하고 거절한다. 기본 3회. | 제안만 생성, 거절 뒤 파일 부재 유지 | 3/3. 각 제안 뒤 무응답 관찰 때 파일 부재, 거절 응답 후에도 부재. |
| <a id="tc-12"></a>TC-12 | EXT-04 | 동일 워크플로우 선언이 이미 있는 임시 저장소에서 새 실행자에게 초기화를 요청한다. 기본 3회. | 중복 추가 없음, 기존 내용 무변경, 상세 규칙 자동 삽입 없음 | 3/3. 영어로 같은 뜻의 채택·전체 순서가 있는 fixture의 원본 바이트와 exact 일치. |
| <a id="tc-13"></a>TC-13 | EXT-01, EXT-05 | 리포 루트: `python3 /Users/bruce/.codex/skills/.system/skill-creator/scripts/quick_validate.py skills/agents-init`; plugin-eval `start`·`analyze`; `node --test tests/package.test.mjs`; `node scripts/check-package.mjs`; `git diff --check` | 구조·링크·패키지 통과, 평가 지적 분류와 처리 기록 | quick_validate valid, node tests 24/24, check-package valid, diff check 0. plugin-eval start→Evaluate Skill, analyze 95/A fail 0 warn 1. 한국어 trigger 영어 검사 오탐으로 유지. |

## 제외 범위

- 실제 프로젝트 AGENTS.md 수정, push·PR·Issue 댓글·머지, 플러그인 설치·갱신.
- 앞선 상세 AGENTS.md 후보 삽입이나 자동 커밋 권한 부여.
- 독립 리뷰 자료 열람.

## 실행 근거와 한계

- 2026-10-02 11:48 UTC에 신규 스킬 부재를 먼저 확인·기록한 뒤 작성했다. 없는 스킬의 RED 실행을 주장하지 않는다.
- 구현용 fixture: `/var/folders/sn/x4mbhkg102s8n2h2shsxt3j80000gn/T/agents-init-run-d1ybmv4u`, `run-1`~`run-3`의 existing·missing·duplicate. 이 작업의 task-06에서 직접 만들었으며 실제 Issue 비공개 입력은 읽지 않았다.
- fresh 실행자 `scenario_1`~`scenario_3`에 fork history 없이 대상 스킬과 사용자 요청만 전달했다. 기존 파일 제안 뒤 승인을 보냈고, 없는 파일 제안 뒤 거절을 보냈다. 기대 결과·판정 기준은 전달하지 않았다. 세 실행자에서 같은 후속 missing·duplicate 요청을 실행했으므로 사례마다 별도 fresh 세션이라는 주장은 하지 않는다.
- existing 원본은 CRLF와 `Do not run paid APIs.`를 포함한다. 바이트 비교에서 세 결과 모두 원본 prefix와 승인한 CRLF 전문만 추가되었다. duplicate는 영어 의미 동일 선언이며 세 결과 모두 원본과 일치했다. missing은 세 결과 모두 파일 부재였다.
- 미응답은 제안 후 후속 입력 전의 관찰 시점 무변경이다. 장시간 대기·새 세션 재개 동작의 증거는 아니다. 신규 파일 승인 후 생성·충돌 보존·승인 전후 concurrent 변경 대응은 구현 지시에 있고 이번 구현 시나리오에서는 미실행이다.
- plugin-eval 분류: 구조 경고 `description-trigger-weak`는 평가기 `src/evaluators/skill.js:160`의 `/use when/i` 영어 검사로 한국어 사용 조건을 인식하지 못했다. 문구는 유지한다. 코드 결함 0, coverage artifacts 없음 정보는 실행 코드 없는 지시 스킬에 적용하지 않는다. static budget 305 tokens, 실제 usage 미측정.
- 표 렌더링: bundled `marked`로 plan의 단계 절 HTML을 생성(`/tmp/agents-init-plan-render.html`), table 1개·data row 6개를 확인했다. 최초 `markdown-it` 실행은 모듈 부재로 실패해 사용 가능한 marked로 재실행했다. HTML 스크린샷 시각 검사는 하지 않았다.
- `.comments` 변경·미추적 추가 없음. 이번 범위에 포함할 새 resolved 코멘트 없음. 기존 코멘트는 변경하지 않는다.

## 독립 검증 결과 인계

2026-10-02 root가 별도 검증 후 제공한 결과만 기록한다. 구현 세션은 실제 검토 기준·고정 입력·원본 review 자료를 조회하지 않았으며 해당 결과를 자체 검증으로 주장하지 않는다.

| 대상 | root 결과 |
| --- | --- |
| 기존 파일 승인 전후와 내용 보존 | 3/3 통과. 실제 바이트와 승인 전문 대조 |
| 거절 | 3/3 통과 |
| 중복 | 3/3 통과 |
| 파일 부재 제안 후 명시적 승인 생성 | 추가 1/1 통과 |
| 검토 동안 소스 상태 | source digest 동일 |
| 정적 검증 | quick_validate valid, node tests 24/24, check-package valid, diff check 0 |
| plugin-eval | 95/A. 한국어 trigger 영어 휴리스틱 경고 1 확인 |

단계 06 독립 검증 완료로 표시한다. 충돌·concurrent 변경 대응 행동 검증과 실제 호스트 로딩은 미실행으로 유지한다. 기존 Issue #4 전체의 human-review 보류를 해소하거나 전체 Issue 통과를 주장하지 않는다.

## 실행 결과 요약

최종 승인 소스 5fec7a8. 패키지 회귀24/24·구조·공백 검사와 agents-init 기존 바이트/승인 전문·거절·중복 사례 확인. 기준 노출·선행 고정 절차 이탈 때문에 전체 독립성이나 자동 pass로 소급하지 않음. 충돌·동시 수정 행동과 호스트 로딩은 미확인.

당시 명령은 저장소 루트의 `node --test tests/package.test.mjs`, `node scripts/check-package.mjs`, `git diff --check`를 중심으로 실행했다. 추가 명령·대상 작업본·실행 시각은 plan의 정리 전 기록에서 확인한다. 현재 HEAD의 재검증 결과로 사용하지 않는다.
