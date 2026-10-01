---
issue: "#1"
status: in-progress
branch: "feat/issue-review-workflow"
base: "main"
created: "2026-10-02"
---

# 템플릿 init 추가와 의도·테스트 중심 리뷰 정리 계획

## 요청

> 내 생각에 문서들에 불필요한 내용들이 섞여있는 것 같아. 이는 스킬의 내용도 마찬가지로 보여. 그리고 pr-review 할 때 spec-it 관련 내용은 어떻게하면 개선할 수 있을까? … pr-review 는 plan 과 todos 를 기반으로 사용자 의도를 파악한 후 구현된 내용에서 테스트케이스나 유닛 테스트 등이 빠진 건 없는지 확인하고 의도대로 구현되었는지 크로스 체크하는 것을 위주로 작성되면 좋을 것 같아. README 의 내용이 git-workflow 의 핵심 설명이될 수 있게 개선되어야 할 것 같아.

- 해석: 문서·스킬에서 규칙이 아닌 내용을 줄이고, pr-review를 의도·구현·테스트 교차 확인 중심으로 바꾸고, README를 플러그인 소개 문서로 만든다.
- 남은 결정: D1·D2 (결정과 변경 기록 참고)

## 현재 동작과 변경 이유

| 현재 동작 | 근거 위치 | 바꿀 결과 |
| --- | --- | --- |
| pr-review 525단어, spec-it 설치·runner 절차가 큰 비중 | `skills/pr-review/SKILL.md:28-39`, `:69-73` | 의도·구현·테스트 대조 중심, 500단어 이하 |
| 없는 spec-it 파일 참조 | `skills/pr-review/SKILL.md:71` | 참조 제거 |
| README가 spec-it을 이름으로만 언급 | `README.md:5` | spec-it 역할과 채택 여부별 동작 설명 |
| Issue 템플릿에 GitHub front matter 없음, 버그 템플릿에 기대·실제 동작 없음 | `skills/issue-create/references/feature-issue.md`, `bug-issue.md` | 필수 항목을 갖춘 GitHub 템플릿 |
| PR 양식이 코드 블록으로만 존재 | `skills/pr-create/references/pr.md` | 독립 PR 템플릿 파일 |
| README에 규칙 재서술·반복 면책·내부 메모 | `README.md:36-44`, `:48`, `:71`, `:75`, `:177`, `:179` | 소개 중심 README |

## 범위

| 구분 | 내용 |
| --- | --- |
| 포함 | README 영어·한국어, pr-review, GitHub 템플릿과 template-init, 스킬 description, 중복 규칙·조건 없는 지시, 플러그인 매니페스트, docs/examples 반복 문구, plan·todo 양식 |
| 제외 | Wiki·구현 단계 분리 스킬, 기존 스킬 이름 변경, spec-it 저장소 변경, 자동 선택 정확도 측정 도구, 대상 프로젝트 커밋·push 자동 실행 |
| 미변경 소비자 | 설치된 플러그인 캐시, 대상 리포의 기존 `docs/git-workflows/` 문서와 `.github/` 템플릿 |
| 호환성·데이터·운영 | 스킬 이름·디렉토리 유지. 템플릿 정본 위치와 todo 파일 이름 규칙 변경 |

## 단계

| 단계 | 제목 | 설명 | 검증 사례 | 완료 |
| --- | --- | --- | --- | --- |
| [01](01-todos-pr-review-rework.md) | pr-review 재구성과 spec-it 분리 | 의도 파악 → 구현 대조 → 테스트 누락 확인 순서로 재작성. spec-it 정책 검사는 채택 프로젝트 전용 reference로 분리 | [TC-01](01-todos-pr-review-rework.md#tc-01)<br>[TC-02](01-todos-pr-review-rework.md#tc-02)<br>[TC-03](01-todos-pr-review-rework.md#tc-03) | [x] |
| [02](02-todos-template-init.md) | GitHub 템플릿 정본화와 template-init | 기능·버그·PR 템플릿을 스킬 필수 항목과 일치. 대상 프로젝트에 복사하는 template-init 추가 | [TC-04](02-todos-template-init.md#tc-04)<br>[TC-05](02-todos-template-init.md#tc-05) | [x] |
| [03](03-todos-skill-cleanup.md) | description·중복 규칙·조건 정리 | 트리거 T1~T7 한정, 중복 규칙 링크화, 조건 없는 지시 정리, 매니페스트 Wiki 제거 | [TC-06](03-todos-skill-cleanup.md#tc-06)<br>[TC-07](03-todos-skill-cleanup.md#tc-07)<br>[TC-08](03-todos-skill-cleanup.md#tc-08) | [x] |
| [04](04-todos-readme-rebuild.md) | README 재구성과 예제 정리 | sideband-comments README 구성 기준 재작성, spec-it 절 추가, 예제 반복 문구 정리 | [TC-09](04-todos-readme-rebuild.md#tc-09) | [ ] |
| [05](05-todos-plan-template.md) | plan·todo 양식 개선 | 디렉토리·프론트메터 규칙 번호화, 템플릿 우선 배치, 표 중심 양식, todo 파일 이름 규칙 | [TC-11](05-todos-plan-template.md#tc-11) | [x] |

실행 순서: 05 → 01 → 02 → 03 → 04 → 최종 검증. 05는 사용자 코멘트에 따라 계획 작성 중 먼저 반영했다. 04는 01~03의 최종 스킬 구성을 설명하므로 마지막에 둔다. 검증이 실패하면 해당 단계로 돌아가 같은 사례를 다시 실행한다.

## 최종 검증

| 사례 | AC | 명령·작업 디렉토리 | 기대 결과 | 필요 승인 | 결과 |
| --- | --- | --- | --- | --- | --- |
| <a id="tc-f01"></a>TC-F01 | AC-13 | `node --test tests/package.test.mjs`, `node scripts/check-package.mjs`, `claude plugin validate .claude-plugin/plugin.json`, `claude plugin validate .claude-plugin/marketplace.json`, `git diff --check`, 리포 루트 | 모두 통과 | 없음 | 미실행 |
| <a id="tc-f02"></a>TC-F02 | AC-09 | 로컬 소스로 플러그인 갱신 후 새 세션에서 template-init과 assets 확인 | 스킬 10개, 템플릿 파일 존재 | 플러그인 갱신 승인 | 미실행 |

문서·지시 변경이라 유닛 테스트 대상 코드가 없다. 구조는 패키지 테스트로, 지시의 효과는 하위 에이전트 시나리오의 변경 전·후 비교로 확인한다.

## 전달과 롤백

| 항목 | 내용 |
| --- | --- |
| 전달 방법 | 서버 배포 없음. 단계별 커밋 → push → main 대상 PR → 리뷰 → 승인 머지 → 사용자가 플러그인 갱신 |
| 필요 승인 | 커밋, push, PR 생성, 머지 각각. 현재 승인은 Issue 생성과 계획 작성까지 |
| 적용 후 확인 | 새 세션에서 template-init과 변경된 pr-review 표시 |
| 롤백 | 머지 전: 해당 커밋 revert. 머지 후: 머지 커밋 revert와 이전 ref 재설치. 대상 프로젝트에 복사된 템플릿은 각 프로젝트에서 되돌림 |

## 결정과 변경 기록

| 날짜 | 구분 | 내용 | 영향 AC·단계 | 상태 |
| --- | --- | --- | --- | --- |
| 2026-10-02 | 요청 변경 | 이슈·버그·PR 템플릿 복사 init 스킬 추가, 템플릿을 스킬 정의와 사내 템플릿 기준으로 보완 | AC-08, AC-09, 02 | 승인 |
| 2026-10-02 | 결정 | 트리거 수정 T1~T7을 이번 범위에 포함 | AC-10, 03 | 승인 |
| 2026-10-02 | 결정 | docs/examples는 시나리오 5개 유지, 면책·중복만 정리 | AC-02, 04 | 승인 |
| 2026-10-02 | 결정 | init 스킬 이름 template-init. 기본 `/init`과 트리거 충돌 회피 | AC-09, 02 | 승인 |
| 2026-10-02 | 결정 | 템플릿 정본 위치 `skills/template-init/assets/.github/` | AC-08, 02 | 승인 |
| 2026-10-02 | 결정 | Issue 템플릿 제목 형식 `feat(<scope>): `·`fix(<scope>): ` | AC-08, 02 | 승인 |
| 2026-10-02 | 결정 | 계획 문서를 이 저장소에 추적하고 완료 후 유지 | 전달 | 승인 |
| 2026-10-02 | 요청 변경 | plan·todo 양식을 표 중심으로 바꾸고 todo 파일 이름을 `{nn}-todos-{step-title}.md`로 변경. 프론트메터에서 기준 커밋 제거 | AC-14, 05 | 승인 |
| 2026-10-02 | 요청 변경 | 변경 대상을 각 todo로 이동, todo를 표 형식으로 바꾸고 작업별 처리 내용 칸 추가, 단계·달성 조건 표에 todo·TC 링크 | AC-14, 05 | 승인 |
| 2026-10-02 | 요청 변경 | 달성 조건과 AC ID를 Issue 본문에만 두고 plan의 달성 조건 표·단계 표 AC 열 제거. todo 검증 표는 Issue AC ID를 참조 | AC-06, AC-08, AC-14, 01·02·05 | 승인 |
| 2026-10-02 | 결정 | D1 플러그인 버전: 0.2.0 유지 또는 0.3.0. 같은 버전이면 설치 캐시가 갱신되지 않을 수 있음 | 전달 | 보류, 첫 커밋 전 결정 |
| 2026-10-02 | 결정 | D2 `assets/.github`가 플러그인 설치에서 누락되면 `assets/github/`로 변경하고 복사 시 이름 변환 | AC-09, 02 | 보류, TC-05·설치 확인 결과로 결정 |
| 2026-10-02 | 결정 | D1 플러그인 버전 0.3.0. 스킬 추가와 지시 변경이 있고 설치 캐시 갱신이 필요함. 매니페스트 버전은 03 단계 작업 6에서 함께 변경 | 전달, 03 | 승인 |
| 2026-10-02 | 계획 이탈 | commit-rule description 변경이 계획 문서 커밋(3c80538)에 이미 포함됨. 분리하지 않고 03 단계 작업 2에서 T1 기준으로 다시 확인 | AC-10, 03 | 승인 |
| 2026-10-02 | 계획 이탈 | TC-01 변경 전 실행에서 테스트 누락 지적은 이미 3/3이었음. 변경 전후 차이를 spec-it 미채택 저장소의 정책 human-review 생성 여부로 함께 측정. 패키지 검사에 spec-it-policy.md 필수 파일 추가 | AC-05, 01 | 보류, 사용자 확인 대기 |
| 2026-10-02 | 계획 이탈 | pr-review description을 03 단계에서 다시 한정(T2). 일반 코드 리뷰 요청과의 겹침을 03 판정에서 함께 확인하기 위함 | AC-10, 01·03 | 보류, 사용자 확인 대기 |
| 2026-10-02 | 계획 이탈 | TC-06에 더해 경쟁 스킬을 포함한 요청 14개 단일 선택 판정과 브랜치 생성 동작(전략 질문 여부)을 변경 전·후 3회씩 확인. 입력은 계획 디렉토리의 미추적 고정 입력 파일을 참고하고 그 파일은 수정·커밋하지 않음 | AC-10, 03 | 보류, 사용자 확인 대기 |
