---
issue: "#13"
status: ready
branch: "docs/agents-init-plan"
base: "main"
created: "2026-10-03"
---

# agents-init 역할 분리 계획

## 요청

> agent-init 스킬을 수정해야할 것 같아. 이슈 생성, plan, 검증, pr 검토 머지 이슈 삭제 까지는 메인 에이전트의 역할이 될 것이고 구현은 별도 에이전트에서 동작할 수 있게 코멘트를 살짝 수정해줘. 알아서 동작이 가능하게.

- 해석: 짧은 AGENTS.md 선언으로 메인 조정·별도 구현의 기본 동작 연결
- 남은 결정: 없음. Issue 삭제는 close로 해석한 기존 판단 유지

## 공통 맥락

- 목적: Issue 기반 구현 요청에서 반복 지시 없이 역할을 분리해 진행
- 유지할 판단: 스킬은 지시 모음이며 스케줄러가 아님. 기본 위임은 승인 경계를 확대하지 않음
- 사용자 결정: 메인은 계획·판정 담당, 구현은 별도 에이전트 담당. 기존 프로젝트 AGENTS.md 자동 변경은 제외
- 역할별 인계: 구현자는 Issue → 이 절·결정·단계 → 담당 task → handoff·공개 리뷰 지적 순서로 읽음. 조정·리뷰는 별도 review/issue-13의 비공개 기준·입력도 읽음
- 접근 경계: 구현자는 review/issue-13 브랜치·작업본·기준·고정 입력을 열람하지 않음. 이전 대화 없이 공개 입력만 인계

## 현재 동작과 변경 이유

| 현재 동작 | 근거 위치 | 바꿀 결과 |
| --- | --- | --- |
| 채택 선언·진행 순서만 제안 | skills/agents-init/SKILL.md 추가 전문 | 메인 조정과 별도 구현 연결 |
| 기준 작성·열람자는 구현 금지 | skills/plan-create/references/review-criteria.md 보관 위치 | 선언에서 해당 정본 연결 |
| plan 공통 맥락·역할별 인계 도입 | skills/plan-create/references/plan.md, skills/git-workflow/references/document-links.md | 선언의 인계 지시와 최신 규칙 정합성 |
| 프로젝트 본문 변경 없음 | main e053a4cab0981b7200267e162c80be88ceafbfbe | 변경 전후 행동 비교 기준 |

## 범위

| 구분 | 내용 |
| --- | --- |
| 포함 | agents-init 선언·대상별 표현, README 사용 안내, 공개 행동 사례·검증·인계 |
| 제외 | 기존 프로젝트 AGENTS.md 적용, 승인 정책 변경, Issue 삭제, 설치·Release·실제 머지 |
| 미변경 소비자 | 기존 단일 단계 요청과 task-implement·pr-review·issue-close 상세 절차 |
| 호환성·데이터·운영 | 선언의 기본 역할 변경. 서버·데이터 변경 없음 |

## 단계

| 단계 | 제목 | 설명 | 검증 사례 | 완료 |
| --- | --- | --- | --- | --- |
| [01](task-01-role-declaration.md) | 역할 선언 | 메인·구현·승인 경계를 짧은 문구로 연결 | [TC-01](task-01-role-declaration.md#tc-01)~[TC-05](task-01-role-declaration.md#tc-05) | [ ] |
| [02](task-02-initialization-guidance.md) | 초기화·안내 | 대상별 표현과 기존 초기화 계약·README 연결 | [TC-06](task-02-initialization-guidance.md#tc-06)~[TC-10](task-02-initialization-guidance.md#tc-10) | [ ] |
| [03](task-03-validation-handoff.md) | 검증·인계 | 실행 근거와 패키지 검사, 독립 검토 인계 | [TC-11](task-03-validation-handoff.md#tc-11)~[TC-12](task-03-validation-handoff.md#tc-12) | [ ] |

실행 순서: 01 → 02 → 03. 실패는 담당 구현 에이전트에 수정 위임 후 동일 사례 재검증. 구현 전에 plan 커밋과 별도 review/issue-13의 기준·입력 고정이 선행한다.

## 최종 검증

| 사례 | AC | 명령·작업 디렉토리 | 기대 결과 | 필요 승인 | 결과 |
| --- | --- | --- | --- | --- | --- |
| <a id="tc-f01"></a>TC-F01 | AC-17 | 리포 루트: node --test tests/package.test.mjs, node scripts/check-package.mjs, git diff --check | 기존 검사·상대 링크 통과 | 없음 | 미실행 |
| <a id="tc-f02"></a>TC-F02 | AC-01~16, AC-18 | 리뷰 주체가 review/issue-13 고정 입력으로 새 실행자 각 3회 | 공개 자체 결과와 구분한 독립 판정 | 시나리오는 격리된 임시 저장소만 사용 | 미실행 |

유닛 실행 코드 신규 대상 없음. 패키지 회귀 검사와 선언을 채택한 에이전트 행동 시나리오로 검증한다. 기존 통과는 이번 동작의 통과로 사용하지 않는다.

## 전달과 롤백

| 항목 | 내용 |
| --- | --- |
| 전달 방법 | 로컬 계획 브랜치를 별도 구현자에게 전달. 계획 단계에서 설치·배포 없음 |
| 필요 승인 | 이번 요청은 Issue·plan 갱신과 기준 고정용 로컬 커밋. 구현·push·PR·머지·기존 AGENTS.md 적용은 별도 범위 |
| 적용 후 확인 | 구현 소스·검토 HEAD와 행동 결과 대조. 설치 시 캐시·새 세션 확인 별도 |
| 롤백 | 구현 커밋의 해당 변경만 되돌림. 동시 작업 reset 금지 |

## 결정과 변경 기록

| 날짜 | 구분 | 내용 | 영향 AC·단계 | 상태 |
| --- | --- | --- | --- | --- |
| 2026-10-03 | 결정 | 이슈 삭제를 이력 보존 close로 해석 | AC-14·01 | 승인 |
| 2026-10-03 | 요청 변경 | 직접 스킬 수정은 되돌리고 Issue 기반 진행으로 전환 | 전체 | 승인 |
| 2026-10-03 | 요청 변경 | 최신 main e053a4c의 작성·인계 기준에 맞춰 Issue·plan 갱신 | 전체 | 승인 |
| 2026-10-03 | 결정 | 복합 AC의 번호 의미를 유지하며 추가 번호로 결과 분리 | 전체 | 승인 |
| 2026-10-03 | 결정 | 기존 Issue #13 plan이 없어 최신 양식으로 최초 작성 | 전체 | 승인 |
