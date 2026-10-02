# 01 파일 이름 규칙

계획: [plan의 단계 표](plan.md#단계)

## 변경 대상

| 구분 | 경로 | 이유 |
| --- | --- | --- |
| Modify | `skills/plan-create/references/plan.md` | 디렉토리 규칙의 파일 표·이름 설명·트리 예시·단계 표 템플릿 링크 |
| Modify | `skills/plan-create/references/todos.md` | 파일 이름 안내와 검증 절의 링크 주소 |
| Modify | `skills/plan-create/SKILL.md` | 절차 4의 todo 파일 이름 |
| Modify | `README.md`, `README.ko.md` | 작업 문서 목록의 todo 이름 |
| Delete / Create | `docs/examples/python-version-upgrade/01-todos-runtime-compatibility.md` 등 3개 → `task-01-runtime-compatibility.md` 등 | 예제 todo 파일 이름 변경(`git mv`) |
| Modify | `docs/examples/python-version-upgrade/README.md`, `plan.md`, `handoff.md`, `pr.md` | 바뀐 파일 이름으로 링크 갱신 |

## 작업

| # | 작업 | 완료 | 처리 내용 |
| --- | --- | --- | --- |
| 1 | D3(옛 `{nn}-todos-` 파일 인식 여부) 결정 | [x] | 새 이름만 규칙에 둠 (plan 결정과 변경 기록) |
| 2 | 디렉토리 규칙의 파일 표에 `task-{nn}-{step-title}.md`, `review-criteria.md`, `review-input-<topic>.md` 반영. 검토 기준·검증 입력 행의 작성 단계와 보관 위치 칸은 02에서 채움 | [x] | `plan.md` 파일 표에 세 이름 반영 (99967fb) |
| 3 | plan-create SKILL·todos.md·README 두 개의 이름 표기 변경 | [x] | 모두 `task-{nn}-{step-title}.md` 로 변경 (99967fb) |
| 4 | 예제 todo 파일 3개 이름 변경과 예제 문서 링크 갱신 | [x] | `git mv` 후 예제 문서 링크 갱신 (99967fb) |
| 5 | 검증 실행, 커밋 | [x] | 검증 통과 후 커밋 (99967fb) |

## 검증

| 사례 | AC | 명령·작업 디렉토리 | 기대 결과 | 결과 |
| --- | --- | --- | --- | --- |
| <a id="tc-01"></a>TC-01 | AC-09 | `grep -rn "todos-" skills docs/examples README.md README.ko.md`, `ls docs/examples/python-version-upgrade`, `node scripts/check-package.mjs`, 리포 루트 | 검색 결과 0, 예제 todo 3개가 `task-0n-*.md`, 깨진 링크 0 | 통과 (99967fb) |

## 제외 범위

- `docs/git-workflows/2026-10/02_1_template-init-review-cleanup/`의 파일 이름
- 검토 기준·검증 입력의 양식과 보관 위치 (02 단계)
- 검토 기준·검증 입력 예제 파일 (05 단계)
