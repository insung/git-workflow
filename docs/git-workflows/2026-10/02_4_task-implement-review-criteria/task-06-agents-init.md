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
| 1 | 현재 추가 범위와 변경 전 신규 스킬 부재를 기록한다. | [ ] | |
| 2 | skill-creator로 agents-init을 작성한다. 승인 전 실제 파일은 쓰지 않고 추가 전문·경로·위치를 보여주며 승인 후 추가한다. | [ ] | |
| 3 | 기존 내용 보존, 파일 신규 생성, 거절·미응답, 중복·충돌 처리를 검증한다. | [ ] | |
| 4 | 패키지와 README·워크플로우 연결을 갱신한다. | [ ] | |
| 5 | quick_validate·evaluate-skill·패키지 검증 결과와 handoff를 기록한다. | [ ] | |

## 검증

| 사례 | AC | 명령·작업 디렉토리 | 기대 결과 | 결과 |
| --- | --- | --- | --- | --- |
| <a id="tc-10"></a>TC-10 | EXT-02, EXT-03 | 임시 저장소에 기존 AGENTS.md를 둔다. 새 실행자에게 초기화를 요청하고 승인 전 상태를 관찰한다. 전문 제시 후 명시적으로 승인하고 재개한다. 기본 3회. | 승인 전 무변경, 승인 후 기존 내용 보존·추가 전문 일치 | 미실행 |
| <a id="tc-11"></a>TC-11 | EXT-02, EXT-03 | AGENTS.md 없는 임시 저장소에서 새 실행자에게 초기화를 요청한다. 승인 전 파일 부재를 확인하고 거절한다. 기본 3회. | 제안만 생성, 거절 뒤 파일 부재 유지 | 미실행 |
| <a id="tc-12"></a>TC-12 | EXT-04 | 동일 워크플로우 선언이 이미 있는 임시 저장소에서 새 실행자에게 초기화를 요청한다. 기본 3회. | 중복 추가 없음, 기존 내용 무변경, 상세 규칙 자동 삽입 없음 | 미실행 |
| <a id="tc-13"></a>TC-13 | EXT-01, EXT-05 | 리포 루트: `python3 /Users/bruce/.codex/skills/.system/skill-creator/scripts/quick_validate.py skills/agents-init`; plugin-eval `start`·`analyze`; `node --test tests/package.test.mjs`; `node scripts/check-package.mjs`; `git diff --check` | 구조·링크·패키지 통과, 평가 지적 분류와 처리 기록 | 미실행 |

## 제외 범위

- 실제 프로젝트 AGENTS.md 수정, push·PR·Issue 댓글·머지, 플러그인 설치·갱신.
- 앞선 상세 AGENTS.md 후보 삽입이나 자동 커밋 권한 부여.
- 독립 리뷰 자료 열람.
