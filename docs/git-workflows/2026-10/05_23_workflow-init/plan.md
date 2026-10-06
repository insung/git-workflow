---
issue: "#23"
status: completed
branch: "codex/workflow-init"
base: "main"
created: "2026-10-05"
---

# 선택 가능한 통합 초기화 계획

## 요청

> 스킬을 호출할때 부분적으로 적용될 수 있게 해줘. 예를들어 깃헙워크플로우 설치해줘 했을때, 라벨 설치와 템플릿 설치를 사용자가 선택할 수 있게 해줘.

- 해석: workflow-init에 템플릿·AGENTS.md·라벨·릴리즈 분류 선택 설치 제공
- 남은 결정: 없음

## 공통 맥락

- 목적: 사용자가 선택한 초기화 항목만 적용하고 기존 저장소 설정 보존
- 유지할 판단: 일반 설치 요청에서는 항목 선택 전 쓰기 없음. 명시적 부분 요청은 해당 항목으로 한정. 기존 template-init·agents-init 호출은 각각의 항목만 처리
- 역할별 인계: 메인이 Issue·계획·기준 고정·독립 검증 담당. 구현은 이전 대화를 상속하지 않는 별도 에이전트가 담당. Issue → plan → task → handoff 순서로 읽음. 비공개 review 브랜치·입력은 읽지 않음

## 현재 동작과 변경 이유

| 현재 동작 | 근거 위치 | 바꿀 결과 |
| --- | --- | --- |
| 템플릿 설치와 채택 선언이 별도 진입점 | skills/template-init, skills/agents-init | 통합 진입점과 부분 선택 |
| 라벨은 존재 확인만 제공 | template-init/SKILL.md | 정의 자산과 차이 확인·누락 생성 |
| 자동 분류 설치 항목 없음 | skills/git-release | release.yml 선택 설치 |

## 범위

| 구분 | 내용 |
| --- | --- |
| 포함 | workflow-init, 호환 진입점, 링크·README·검사·회귀, 라벨 도구 |
| 제외 | 기존 프로젝트 설치, 원격 라벨 변경, 버전·설치·Release·push·PR·머지 |
| 미변경 소비자 | issue-create·pr-create의 템플릿 계약, 기존 init 호출 |
| 호환성·데이터·운영 | 기존 파일·원격 라벨 보존, 외부 동작은 승인된 항목만 |

## 단계

| 단계 | 제목 | 설명 | 검증 사례 | 완료 |
| --- | --- | --- | --- | --- |
| [01](task-01-init-selection.md) | 통합 진입점과 선택 설치 | 정본 이동·참조·자산·소비자 연결 | [TC-01](task-01-init-selection.md#tc-01) | [x] |
| [02](task-02-label-sync.md) | 라벨 도구와 검증 | 차이·누락 생성과 회귀·패키지 확인 | [TC-02](task-02-label-sync.md#tc-02) | [x] |

실행 순서: 01 → 02. 실패 시 해당 단계로 돌아가 재검증.

## 최종 검증

| 사례 | AC | 명령·작업 디렉토리 | 기대 결과 | 필요 승인 | 결과 |
| --- | --- | --- | --- | --- | --- |
| TC-F01 | AC-06·07 | node --test tests/package.test.mjs; node scripts/check-package.mjs, 리포 루트 | 회귀와 링크·정본 검사 통과 | 없음 | 통과 34/34·패키지 유효; HEAD 4d356cf + 미커밋 소스 |
| TC-F02 | AC-07 | plugin-eval analyze skills/workflow-init --format markdown | 구조·예산·코드 결과와 한계 기록 | 없음 | 완료; handoff의 대상 source digest와 증거 참조 |
| TC-F03 | AC-01~07 | 독립 고정 입력 시나리오 및 라벨 도구 재실행 | 범위 선택·보존·승인 조건 일치 | 없음 | 완료; handoff의 대상 source digest와 증거 참조 |

## 전달과 롤백

| 항목 | 내용 |
| --- | --- |
| 전달 방법 | 로컬 구현·검증과 보고. 원격 발행과 호스트 설치는 제외 |
| 필요 승인 | 계획·독립 입력 고정을 위한 로컬 커밋은 호출된 plan-create 절차로 수행. 구현은 미커밋 patch·digest로 인계. push·PR·머지 별도 |
| 적용 후 확인 | 현재 소스의 패키지·회귀·스킬 평가 및 독립 시나리오 대조 |
| 롤백 | 계획 커밋 기준으로 이번 변경만 검토해 되돌림. 다른 작업본을 reset/clean하지 않음 |

## 결정과 변경 기록

| 날짜 | 구분 | 내용 | 영향 AC·단계 | 상태 |
| --- | --- | --- | --- | --- |
| 2026-10-05 | 결정 | 선택 설치와 기존 진입점 호환 유지 | AC-01·02·06, 01 | 승인 |
| 2026-10-05 | 결정 | 라벨 정의는 자체 YAML, 원격 생성은 CLI 도구, release.yml은 GitHub 네이티브 설정 | AC-04·05, 02 | 승인 |
| 2026-10-05 | 계획 이탈 | 자체 라벨 스키마는 GitHub 네이티브 파일과 구분해 assets/labels.yml에 보관. 조건별 릴리즈 설치 절차는 references/release.md로 명명 | AC-04·05·06, 01·02 | 승인 |
| 2026-10-05 | 요청 변경 | pr-create 호출로 이 변경의 커밋·push·PR 생성 허용. 머지·댓글·호스트 설치는 제외 유지 | AC-01~07, 전달 | 승인 |

## 기록 정리

2026-10-06 Issue #39의 승인에 따라 전달문·검토 입력·응답 전문·로그·중복 초안을 현재 트리에서 정리했다. 이 문서의 기존 상태·판정·승인은 당시 기록이며 현재 완료 상태로 갱신한 것이 아니다. 필요한 원문은 [정리 전 기록](https://github.com/insung/git-workflow/tree/3993cb36cdb3fca6ff8b2bfee47016eb8a70e959/docs/git-workflows/2026-10/05_23_workflow-init)에서 조회한다.
