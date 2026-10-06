# 01 통합 초기화와 선택 설치

계획: [단계 표](plan.md#단계)

## 변경 대상

| 구분 | 경로 | 이유 |
| --- | --- | --- |
| Create | skills/workflow-init/ | 진입점·references·assets 생성 |
| Modify | skills/template-init/SKILL.md, skills/agents-init/SKILL.md | 해당 항목만 처리하는 호환 진입점 |
| Modify | README.md, README.ko.md, skills/git-workflow/SKILL.md, skills/issue-create/references/issue.md, skills/pr-create/references/pr.md | 새 정본 연결 |
| Modify | scripts/check-package.mjs, tests/package.test.mjs | 이동된 자산과 호환 계약 검사 |

## 작업

| # | 작업 | 완료 | 처리 내용 |
| --- | --- | --- | --- |
| 1 | 일반 요청에서 항목을 선택하고 부분 요청에서 범위를 유지하는 진입점 작성 | [x] | 미커밋 구현. [실행 요약](task-02-label-sync.md#실행-결과-요약)에 경로·소스 digest 기록 |
| 2 | 템플릿·AGENTS 선언 정본 이동과 보존 계약 유지 | [x] | 미커밋 구현. [실행 요약](task-02-label-sync.md#실행-결과-요약)에 경로·소스 digest 기록 |
| 3 | 라벨·릴리즈 분류 자산과 조건별 참조 작성 | [x] | 미커밋 구현. [실행 요약](task-02-label-sync.md#실행-결과-요약)에 경로·소스 digest 기록 |
| 4 | 기존 호출·소비자 링크·README·검사 갱신 | [x] | 미커밋 구현. [실행 요약](task-02-label-sync.md#실행-결과-요약)에 경로·소스 digest 기록 |

## 검증

| 사례 | AC | 명령·작업 디렉토리 | 기대 결과 | 결과 |
| --- | --- | --- | --- | --- |
| <a id="tc-01"></a>TC-01 | AC-01·02·03·05·06 | 새 실행자 3회씩 변경 전·후 요청문 시나리오: 일반 설치, 라벨만, 기존 템플릿 호출, AGENTS만 | 선택 전 무변경·부분 범위·기존 보존·선언 승인 유지 | 공개 RED/GREEN 3회씩 기록; 최종 12/12 충족, 라벨 재실행 포함; HEAD 4d356cf + source digest |

## 제외 범위

- 기존 프로젝트에 실제 설치, 비공개 검토 입력 접근
