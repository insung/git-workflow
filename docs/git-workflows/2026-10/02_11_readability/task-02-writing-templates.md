# 02 기록 기준과 템플릿

계획: [plan의 단계 표](plan.md#단계)

## 변경 대상

| 구분 | 경로 | 이유 |
| --- | --- | --- |
| Modify | `skills/git-workflow/references/writing-conventions.md` | 읽기 쉬운 기록 기준 정본 |
| Modify | `skills/git-workflow/references/document-links.md` | 요약·상세 근거 배치 연결 |
| Modify | `skills/issue-create/references/issue.md·skills/pr-create/references/pr.md` | 작성 기준 참조와 필수 항목 연결 |
| Modify | `skills/template-init/assets/.github/` | 기능·버그 Issue·PR 템플릿 안내 개선 |
| Modify | `skills/template-init/SKILL.md` | 필수 절 판단과 변경 템플릿 정합성 확인 |

## 작업

| # | 작업 | 완료 | 처리 내용 |
| --- | --- | --- | --- |
| 1 | 변경 전 Issue·PR 작성 시나리오 실행·원문과 결과 보존 | [ ] | |
| 2 | 공통 문체에 결과 우선·용어 설명·중복 제거 기준 정의 | [ ] | |
| 3 | 각 작성 지침을 정본 링크로 연결하고 필수 항목 유지 | [ ] | |
| 4 | 기능·버그 Issue·PR 템플릿 안내·배치 개선 | [ ] | |
| 5 | 변경 후 같은 입력 시나리오 실행·필수 판단 노출 대조 | [ ] | |

## 검증

| 사례 | AC | 명령·작업 디렉토리 | 기대 결과 | 결과 |
| --- | --- | --- | --- | --- |
| <a id="tc-03"></a>TC-03 | AC-03 | 공통 문체·연결 참조 직접 대조, 리포 루트 | 공통 규칙 정본 한 곳, 빈 절·중복·불필요 전문 제거 | 미실행 |
| <a id="tc-04"></a>TC-04 | AC-04 | 기능·버그 Issue·PR와 기존 템플릿 시나리오, RED/GREEN 각 3회, 리포 루트 | AC ID·Issue 참조·검증·위험·전달·확인된 링크 유지, 기존 절 우선 | 미실행 |
| <a id="tc-05"></a>TC-05 | AC-04, AC-05 | 미검증·human-review·링크 미준비 시나리오, RED/GREEN 각 3회, 리포 루트 | 미검증과 사람 판단을 펼친 본문에 노출, 가짜 링크·통과 주장 없음 | 미실행 |

시나리오 실행 주체는 [공통 실행 경계](../../../../skills/git-workflow/references/execution-boundaries.md#검증-실행-주체)를 따른다. 새 실행자에게 요청문·대상 스킬만 주며 기대 결과는 전달하지 않는다. 실행 불가 시 미실행으로 기록한다.

## 제외 범위

- #6 댓글 게시 규칙
- #8 정리 기능
- 과거 원격 본문 수정
