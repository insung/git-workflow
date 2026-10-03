# 02 기록 기준과 템플릿

계획: [plan의 단계 표](plan.md#단계)

## 변경 대상

| 구분 | 경로 | 이유 |
| --- | --- | --- |
| Modify | `skills/git-workflow/references/writing-conventions.md` | 문서별 정보 경계·작성·편집 기준 정본 |
| Modify | `skills/git-workflow/references/document-links.md` | 요약·상세 근거 배치 연결 |
| Modify | `skills/issue-create/references/issue.md·skills/pr-create/references/pr.md` | 작성 기준 참조와 필수 항목 연결 |
| Modify / Rename | `skills/template-init/assets/.github/ISSUE_TEMPLATE/feature_request.md` → `FEATURE_REQUEST.md`, `bug_report.md` → `BUG_REPORT.md` | Issue 작성 주석과 대문자 파일명 |
| Modify | `skills/template-init/assets/.github/PULL_REQUEST_TEMPLATE.md` | PR 작성 안내 |
| Modify | `skills/plan-create/references/plan.md`·`todos.md`, `skills/task-implement/SKILL.md`, `skills/pr-review/references/review.md` | plan·task·review 정보 경계와 작성 후 편집 |
| Modify / Test | `scripts/check-package.mjs`·`tests/package.test.mjs` | 대문자 파일명 검사와 참조·기존 설치 보존 검증 |
| Modify | `skills/template-init/SKILL.md` | 필수 절 판단과 변경 템플릿 정합성 확인 |

## 작업

| # | 작업 | 완료 | 처리 내용 |
| --- | --- | --- | --- |
| 1 | 변경 전 Issue·PR 작성 시나리오 실행·원문과 결과 보존 | [ ] | |
| 2 | 공통 문체에 문서별 질문·한 항목 한 주장·결론 우선·중복 제거·작성 후 편집 기준 정의 | [ ] | |
| 3 | Issue·PR·plan·task·review 지침에 정보 경계를 적용하고 정본 링크·필수 정보 유지 | [ ] | |
| 4 | 기능·버그 Issue에 짧은 작성 원칙 HTML 주석 추가, PR 안내 정합성 유지 | [ ] | |
| 5 | Issue 파일명 대문자 변경·참조·복사 안내·검사 갱신, 기존 소문자 설치 템플릿 중복 생성 방지 | [ ] | |
| 6 | 변경 후 같은 입력 시나리오 실행·필수 판단 노출 대조 | [ ] | |

## 검증

| 사례 | AC | 명령·작업 디렉토리 | 기대 결과 | 결과 |
| --- | --- | --- | --- | --- |
| <a id="tc-03"></a>TC-03 | AC-03, AC-07 | 공통 문체·연결 참조 직접 대조, 리포 루트 | 공통 규칙 정본 한 곳, 빈 절·중복·불필요 전문 제거 | 미실행 |
| <a id="tc-04"></a>TC-04 | AC-04, AC-08 | 기능·버그 Issue·PR와 기존 템플릿 시나리오, RED/GREEN 각 3회, 리포 루트 | AC ID·Issue 참조·검증·위험·전달·확인된 링크 유지, 기존 절 우선 | 미실행 |
| <a id="tc-05"></a>TC-05 | AC-04, AC-05, AC-07, AC-08 | 미검증·human-review·링크 미준비 시나리오, RED/GREEN 각 3회, 리포 루트 | 미검증과 사람 판단을 펼친 본문에 노출, 가짜 링크·통과 주장 없음 | 미실행 |

| <a id="tc-08"></a>TC-08 | AC-09 | `git ls-files`의 정확한 파일명·대소문자 확인, 패키지·참조 검사; 기존 소문자 설치 사례 | 자산은 FEATURE_REQUEST.md·BUG_REPORT.md만 존재, 깨진 참조 없음, 기존 설치 내용 보존·중복 생성 없음 | 미실행 |

시나리오 실행 주체는 [공통 실행 경계](../../../../skills/git-workflow/references/execution-boundaries.md#검증-실행-주체)를 따른다. 새 실행자에게 요청문·대상 스킬만 주며 기대 결과는 전달하지 않는다. 실행 불가 시 미실행으로 기록한다.

## 제외 범위

- #6 댓글 게시 규칙
- #8 정리 기능
- 과거 원격 본문 수정
