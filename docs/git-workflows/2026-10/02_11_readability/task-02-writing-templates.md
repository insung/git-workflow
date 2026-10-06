# 02 작성 기준과 템플릿

계획: [단계](plan.md#단계)

## 변경 대상

| 경로 | 변경 |
| --- | --- |
| `skills/git-workflow/references/writing-conventions.md` | 공통 작성·편집 기준 정본 |
| `skills/git-workflow/references/document-links.md` | 맥락·상세 근거 배치 |
| `skills/issue-create/references/issue.md`·`skills/pr-create/references/pr.md` | Issue·PR 정보 단위 |
| `skills/plan-create/references/plan.md`·`todos.md` | 결정·작업·검증 단위 |
| `skills/task-implement/SKILL.md`·`skills/pr-review/references/review.md` | 기록·지적 단위 |
| `skills/template-init/assets/.github/` | 주석·파일명·PR 안내 |
| `skills/template-init/SKILL.md` | 복사 안내·기존 설치 처리 |
| `scripts/check-package.mjs`·`tests/package.test.mjs` | 파일명 계약·참조 검사 |

## 작업

| # | 작업 | 완료 | 처리 내용 |
| --- | --- | --- | --- |
| 1 | 변경 전 작성 시나리오 실행 | [x] | bffbcfc: 공통 작성·역할 정본과 템플릿 계약 적용; 실행 근거는 handoff |
| 2 | 공통 작성·편집 기준 정의 | [x] | bffbcfc: 공통 작성·역할 정본과 템플릿 계약 적용; 실행 근거는 handoff |
| 3 | 5종 문서 지침에 정보 단위·역할별 읽기 순서 적용 | [x] | bffbcfc: 공통 작성·역할 정본과 템플릿 계약 적용; 실행 근거는 handoff |
| 4 | Issue 주석에 작성 기준 안내 | [x] | bffbcfc: 공통 작성·역할 정본과 템플릿 계약 적용; 실행 근거는 handoff |
| 5 | Issue 자산 파일명 대문자 변경 | [x] | bffbcfc: 공통 작성·역할 정본과 템플릿 계약 적용; 실행 근거는 handoff |
| 6 | 변경 경로의 참조·설치·검사 갱신 | [x] | bffbcfc: 공통 작성·역할 정본과 템플릿 계약 적용; 실행 근거는 handoff |
| 7 | 변경 후 같은 입력 재실행 | [x] | bffbcfc: 공통 작성·역할 정본과 템플릿 계약 적용; 실행 근거는 handoff |

## 검증

각 행은 하나의 결과를 판단한다. 구현자는 리포 루트에서 아래 사례를 실행하고 미실행을 통과로 기록하지 않는다.

| 사례 | AC | 확인 방법 | 기대 결과 | 결과 |
| --- | --- | --- | --- | --- |
| <a id="tc-03"></a>TC-03 | AC-03 | 공통 문체와 각 지침 참조 대조 | 공통 기준 정본 한 곳 | 통과: bffbcfc, static·공개 GREEN 3회, handoff 참조 |
| <a id="tc-04"></a>TC-04 | AC-04 | 기능·버그 Issue와 PR 작성 사례 | AC ID·Issue·검증·위험·전달 정보 유지 | 통과: bffbcfc, static·공개 GREEN 3회, handoff 참조 |
| <a id="tc-05"></a>TC-05 | AC-04 | 기존 저장소 템플릿 사례 | 기존 절 이름 우선 | 통과: bffbcfc, static·공개 GREEN 3회, handoff 참조 |
| <a id="tc-06"></a>TC-06 | AC-07 | 5종 문서의 결과물 대조 | 각 문서가 자기 목적에 답함 | 통과: bffbcfc, static·공개 GREEN 3회, handoff 참조 |
| <a id="tc-07"></a>TC-07 | AC-07 | plan 결정·task 작업·검증·review 지적 대조 | 한 항목에서 하나의 판단 가능 | 통과: bffbcfc, static·공개 GREEN 3회, handoff 참조 |
| <a id="tc-08"></a>TC-08 | AC-08 | 두 Issue 자산의 HTML 주석 대조 | 간결한 작성·의미 보존 안내 | 통과: bffbcfc, static·공개 GREEN 3회, handoff 참조 |
| <a id="tc-09"></a>TC-09 | AC-10 | `git ls-files`의 정확한 경로 확인 | FEATURE_REQUEST.md·BUG_REPORT.md만 존재 | 통과: bffbcfc, static·공개 GREEN 3회, handoff 참조 |
| <a id="tc-10"></a>TC-10 | AC-11 | 패키지·링크·복사 안내 대조 | 변경 경로 참조 일치 | 통과: bffbcfc, static·공개 GREEN 3회, handoff 참조 |
| <a id="tc-11"></a>TC-11 | AC-12 | 기존 소문자 설치 파일의 전후 바이트 비교 | 기존 내용 보존 | 통과: bffbcfc, static·공개 GREEN 3회, handoff 참조 |
| <a id="tc-12"></a>TC-12 | AC-12 | 설치 후 파일 목록 대조 | 대소문자만 다른 중복 없음 | 통과: bffbcfc, static·공개 GREEN 3회, handoff 참조 |
| <a id="tc-16"></a>TC-16 | AC-13 | task 결과와 생성된 review 대조 | 독립 판정·조치가 중심이며 task 표 중복 없음 | 통과: bffbcfc, static·공개 GREEN 3회, handoff 참조 |
| <a id="tc-17"></a>TC-17 | AC-14 | 구현·리뷰·조정 역할 인계 시나리오 | 공통 목적·담당 범위·읽기 순서·접근 경계 전달 | 통과: bffbcfc, static·공개 GREEN 3회, handoff 참조 |

## 실행 기준

- 문서 목적·정보 단위·필수 정보·주석·기존 설치·역할 인계 사례는 변경 전후 각 3회 실행
- [실행 주체](../../../../skills/git-workflow/references/execution-boundaries.md#검증-실행-주체)에 따라 새 실행자에게 요청문·대상 스킬만 전달
- 미검증·human-review·미push 링크 사례를 포함하고 허위 통과·가짜 링크 여부 확인
- review는 task 기록의 복사 대신 독립 판정·검증 누락·필요 조치를 요약
- 구현 인계에 독립 입력·기대 지적을 포함하지 않고 공통 목적·사용자 결정은 공유
- 중요한 맥락은 유지하되 Issue의 핵심 사실, plan의 결정 이유, 상세 근거 링크로 배치
- 초안 뒤 불필요·중복·복합 주장을 편집. 쉬운 용어·결론 우선·빈 선택 절 제거 적용
- 사실·AC·재현·미검증·위험·필수 검증·전달 정보는 편집 전후 보존

## 제외 범위

- 과거 원격 기록 일괄 수정
- #6 댓글 정책·#8 정리 기능 구현

RED: 1ddb1a7, S1 편집 기준 전체 충족 0/3, S2 기존 설치 보존 3/3. GREEN: bffbcfc, S1 3/3·S2 3/3. 세부 관찰과 전체 산출물은 [실행 요약](task-03-examples-validation.md#실행-결과-요약)에 보존한다. 독립 리뷰 판정을 뜻하지 않는다.
