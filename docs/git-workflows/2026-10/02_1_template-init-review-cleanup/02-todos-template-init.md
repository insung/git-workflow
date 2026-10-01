# 02 GitHub 템플릿 정본화와 template-init

계획: [plan의 단계 표](plan.md#단계)

## 변경 대상

| 구분 | 경로 | 이유 |
| --- | --- | --- |
| Create | `skills/template-init/SKILL.md` | 대상 프로젝트에 템플릿 복사 |
| Create | `skills/template-init/assets/.github/ISSUE_TEMPLATE/feature_request.md` | 기능 Issue 템플릿 정본 |
| Create | `skills/template-init/assets/.github/ISSUE_TEMPLATE/bug_report.md` | 버그 Issue 템플릿 정본 |
| Create | `skills/template-init/assets/.github/PULL_REQUEST_TEMPLATE.md` | PR 템플릿 정본 |
| Delete | `skills/issue-create/references/feature-issue.md`, `skills/issue-create/references/bug-issue.md` | 정본으로 이동 |
| Modify | `skills/issue-create/references/issue.md`, `skills/pr-create/references/pr.md` | 템플릿 링크로 대체 |
| Test | `scripts/check-package.mjs`, `tests/package.test.mjs` | template-init과 템플릿 필수 파일 |

## 작업

| # | 작업 | 완료 | 처리 내용 |
| --- | --- | --- | --- |
| 1 | 기능 Issue 템플릿 작성: front matter(`title: "feat(<scope>): "`, `labels: enhancement`), 목표·영향 범위·`AC-01` ID를 붙인 달성 조건, 선택 절, 절별 작성 안내 | [x] | front matter·목표·영향 범위·AC 달성 조건·선택 절 작성 (8cf42c9) |
| 2 | 버그 Issue 템플릿 작성: front matter(`title: "fix(<scope>): "`, `labels: bug`), 목표·기대 동작·실제 동작·재현 절차·확인한 환경·영향 범위·`AC-01` ID를 붙인 달성 조건 | [x] | 기대·실제 동작, 번호 재현 절차, 확인한 환경 포함 (8cf42c9) |
| 3 | PR 템플릿 작성: Issue·변경 내용·바뀐 곳·계획과 검토 근거·검증 상태·위험과 전달, 선택 절은 작성 조건 주석 | [x] | 필수 6절과 선택 4절, 선택 절 작성 조건 주석 (8cf42c9) |
| 4 | 기존 Issue 템플릿 삭제, issue.md·pr.md를 정본 링크로 변경, 패키지 검사에 새 파일 반영 | [x] | 옛 템플릿 2개 삭제, issue.md·pr.md 정본 링크, pr.md의 양식 코드 블록 제거. 패키지 검사에 템플릿 front matter 필드 검사 추가 (8cf42c9) |
| 5 | template-init 작성: 대상 저장소 확인 → 기존 템플릿 조회 → 없는 파일만 복사 → 있는 파일은 차이 보고 → 라벨 존재 보고 | [x] | 5단계 절차와 결과 항목. 다른 위치·폴더의 PR 템플릿이 있으면 복사하지 않음 (8cf42c9) |

사내 템플릿의 구현 방식·구현 작업 단계·버그 해결 방안 절은 plan이 담당하므로 템플릿에 넣지 않는다.

## 검증

| 사례 | AC | 명령·작업 디렉토리 | 기대 결과 | 결과 |
| --- | --- | --- | --- | --- |
| <a id="tc-04"></a>TC-04 | AC-08 | issue.md 필수 항목·재현 질문, pr.md 필수 절과 템플릿 세 개를 항목별 대조. `grep -rln "## 목표" skills`, 리포 루트 | 누락 0, 정본 외 사본 0 | 통과 (8cf42c9) |
| <a id="tc-05"></a>TC-05 | AC-09 | scratchpad 임시 Git 저장소 두 개(템플릿 없음·기존 PR 템플릿 있음)에 template-init 적용 | 첫째는 세 파일 생성, 둘째는 기존 파일 해시 불변과 차이 보고 | 통과 (8cf42c9, 561e491 재실행). 첫째 세 파일 정본과 동일, 둘째 PR 템플릿 shasum 불변·누락 필수 6절 보고 |

## 제외 범위

- 대상 프로젝트의 커밋·push
- 기존 대상 프로젝트 템플릿 덮어쓰기
