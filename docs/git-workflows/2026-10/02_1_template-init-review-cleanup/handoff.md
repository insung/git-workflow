# 구현과 PR 리뷰 인계

- Issue / PR: [insung/git-workflow#1](https://github.com/insung/git-workflow/issues/1) / PR 미생성
- Plan / Todo: [plan](plan.md) (review-pending), [01](01-todos-pr-review-rework.md), [02](02-todos-template-init.md), [03](03-todos-skill-cleanup.md), [04](04-todos-readme-rebuild.md), [05](05-todos-plan-template.md)
- base / 구현 코드 commit / 검토 HEAD / 미커밋 변경 / 확인 시각: `main` (4b75582) / a7e084c~561e491 / 이 문서를 담은 커밋 직전 HEAD 561e491 / 계획 디렉토리의 출처 미확인 미추적 파일 3개(아래 커밋과 문서 상태) / 2026-10-02 KST
- 실제 실행 담당과 검토 방식: 현재 Claude 세션이 구현. 스킬 지시 변경은 sonnet 하위 에이전트 시나리오로 변경 전·후 비교. 리뷰는 미실행
- spec-it: 미채택 (`.architecture/` 없음)

## 사용자 의도와 구현 결과

| AC | 기대 동작 | 구현 경로/commit | 대응 todo/TC | 실제 충족·미확인 |
| --- | --- | --- | --- | --- |
| AC-01 | README 영어·한국어 같은 절 구성 | `README.md`, `README.ko.md` (2ebf196) | 04 / TC-09 | 충족 |
| AC-02 | README에 규칙 재서술 없이 링크만 | 같은 파일 (2ebf196) | 04 / TC-09 | 충족. 검색어 3개 기준. 문장 전체의 재서술 여부는 리뷰 판단 필요 |
| AC-03 | README에 spec-it 역할과 채택·미채택 동작 | 두 README의 spec-it 절 (2ebf196) | 04 / TC-09 | 충족 |
| AC-04 | pr-review가 의도·구현·테스트 중심, 500단어 이하 | `skills/pr-review/SKILL.md` (a7e084c, 74aa5ae) | 01 / TC-01, TC-02 | 충족. 412단어 |
| AC-05 | spec-it 정책 검사가 별도 reference, 채택 프로젝트만 | `skills/pr-review/references/spec-it-policy.md` (a7e084c) | 01 / TC-01, TC-03 | 충족 |
| AC-06 | review 양식에 AC·todo별 테스트 대조 표 | `skills/pr-review/references/review.md` (a7e084c) | 01 / TC-01 | 충족 |
| AC-07 | 없는 spec-it 파일 참조 없음 | pr-review 재작성 (a7e084c) | 01 / TC-03 | 충족 |
| AC-08 | 템플릿 세 개가 정본 하나씩, 필수 항목 포함 | `skills/template-init/assets/.github/` (8cf42c9, 561e491) | 02 / TC-04 | 충족 |
| AC-09 | init 스킬로 복사, 기존 파일은 변경 없이 차이 보고 | `skills/template-init/SKILL.md` (8cf42c9) | 02 / TC-05, TC-F02 | 임시 저장소에서 충족. 설치된 플러그인에서 assets 포함 여부(TC-F02, D2) 미확인 |
| AC-10 | description 간 같은 요청 예시 없음 | SKILL.md description 7개 (74aa5ae) | 03 / TC-06, TC-07 | 충족 |
| AC-11 | Issue 연결 검사·버전 후보가 정본 한 곳 | pr-create·pr-merge·git-release (7049d21) | 03 / TC-08 | 충족 |
| AC-12 | 매니페스트에 Wiki 문구 없음 | 매니페스트 4개 (63cad15) | 03 / TC-08 | 충족 |
| AC-13 | 패키지 테스트·검사 통과, 깨진 링크 없음 | `scripts/check-package.mjs`, `tests/package.test.mjs` | TC-F01 | 충족 (561e491) |
| AC-14 | plan·todo 표 중심, 파일 이름 규칙, AC ID는 Issue에만 | plan-create references (c97f39c) | 05 / TC-11 | 충족 (3c80538) |

## 계획 대비 차이와 판단

- D1: 플러그인 버전 0.3.0 (사용자 결정). 매니페스트 변경과 함께 63cad15에 반영
- commit-rule description 변경은 계획 문서 커밋 3c80538에 이미 들어 있어 분리하지 않음 (사용자 결정). 03 단계에서 판정 결과에 따라 다시 수정
- TC-01 변경 전 실행에서도 테스트 누락 지적은 3/3이었음. 변경 전후 차이는 spec-it 미채택 저장소의 정책 human-review 생성(3/3 → 0/3)으로 확인
- pr-review description을 03 단계에서 다시 한정(T2). 01 todo의 제외 범위와 다름
- TC-06에 더해 경쟁 스킬을 포함한 요청 14개 단일 선택 판정과 브랜치 생성 동작을 측정. 입력은 계획 디렉토리의 출처 미확인 고정 입력 파일을 참고
- 패키지 검사에 spec-it-policy.md, template-init, 템플릿 세 파일, Issue 템플릿 front matter 필드 검사 추가
- 보류 상태의 계획 이탈 행 3개는 사용자 확인이 필요함 (plan의 결정과 변경 기록)

## 검증 요약과 증거

| TC/AC | 사례와 테스트 파일 | 기대 | 실제·상태 | 명령·실행 위치 | 커밋·환경·시각 |
| --- | --- | --- | --- | --- | --- |
| TC-11 / AC-14 | plan·todo 양식과 예제·이 계획의 절 비교, 옛 앵커 검색 | 절 일치, 옛 앵커 0 | pass | `grep '^## '`, `ls`, `grep -rn`, 리포 루트 | 3c80538, 2026-10-02 |
| TC-01 / AC-04~06 | AC-02 테스트를 뺀 가상 PR 저장소(scratchpad) | 변경 후 3회 모두 누락 지적 | pass. 변경 전: 누락 지적 3/3, 미채택 정책 human-review 3/3. 변경 후: 누락 지적 3/3, 정책 human-review 0/3 | sonnet 하위 에이전트 각 3회 | 변경 전 3c80538 스킬 사본, 변경 후 a7e084c. 74aa5ae은 description만 바꿔 본문 절차를 읽는 이 사례는 재실행하지 않음 |
| TC-02 / AC-04 | `wc -w skills/pr-review/SKILL.md` | 500 이하 | pass. 401 (a7e084c), 412 (74aa5ae 이후) | 리포 루트 | 561e491 |
| TC-03 / AC-05, AC-07 | runner 참조 검색 | 결과 없음 | pass | `grep -rn "spec_it_verify\|local-verification" skills docs/examples README.md README.ko.md` | a7e084c |
| TC-04 / AC-08 | issue.md·pr.md 필수 항목과 템플릿 절 대조, `grep -rln "## 목표" skills` | 누락 0, 사본 0 | pass. 결과는 템플릿 두 파일뿐 | 리포 루트 | 8cf42c9, 561e491 |
| TC-05 / AC-09 | 임시 저장소 두 개에 template-init 적용 | 첫째 세 파일 생성, 둘째 기존 PR 템플릿 해시 불변과 차이 보고 | pass (8cf42c9, 561e491 재실행). 첫째 세 파일이 정본과 `diff -r` 동일, 둘째 PR 템플릿 shasum 불변·누락 필수 6절 보고 | sonnet 하위 에이전트, scratchpad 저장소 | 8cf42c9, 561e491 |
| TC-06 / AC-10 | todo의 요청 9개, 해당 스킬 모두 나열 | 요청마다 한 스킬 | pass (74aa5ae) 3/3. 변경 전: R2 두 스킬 1/3, R4 git-release 3/3, R9 해당 없음 3/3. 1차 수정 후 R2 두 스킬 3/3로 실패, commit-rule 문구 두 번 수정 후 통과 | sonnet 하위 에이전트 각 3회 | 변경 전 3c80538, 변경 후 74aa5ae |
| 추가 / AC-10 | 경쟁 스킬 3개를 포함한 요청 14개, 단일 선택 | 기대 스킬 | 변경 전 R5·R12 기대와 다름 3/3. 변경 후 14개 모두 기대 3/3 | sonnet 하위 에이전트 각 3회 | 3c80538 / 74aa5ae |
| 추가 / AC-10 | “dev에서 feature/retry 브랜치를 만들어줘” 동작 | 전략 질문 없이 생성 | 변경 전 생성 3/3, 전략 질문 덧붙임 1/3. 변경 후 생성 3/3, 전략 질문 0/3 | sonnet 하위 에이전트 각 3회, scratchpad 저장소 | 3c80538 / ed8db19 |
| TC-07 / AC-10 | description 예시 중복 검색 | 0 | pass | `grep -o '“[^”]*”' \| sort \| uniq -d`, 리포 루트 | 74aa5ae |
| TC-08 / AC-11, AC-12 | Wiki, 「번호 누락」, 「minor」 검색 | Wiki 0, 규칙은 정본에만 | pass | `grep -rn`, 리포 루트 | 63cad15 |
| TC-09 / AC-01~03 | README 절 비교, 재서술 검색, spec-it 절 | 절 일치, 0건 | pass | `grep '^##'`, `grep -n`, 리포 루트 | e3e78be |
| TC-F01 / AC-13 | 패키지 테스트 19개, 구조 검사, 매니페스트 검증 2개, `git diff --check` | 모두 통과 | pass. 첫 실행(e3e78be)에서 `git diff --check main...HEAD`가 템플릿 줄 끝 공백을 찾아 561e491에서 수정 | 계획의 명령, 리포 루트 | 561e491, Node v23.11.0, 2026-10-02 |
| TC-F02 / AC-09 | 설치된 플러그인의 template-init과 assets | 스킬 10개, 템플릿 존재 | 부분 pass. 0.3.0 설치본의 스킬 10개와 `assets/.github/` 세 파일이 소스와 같음. 새 세션의 스킬 표시는 not-run(헤드리스 세션 인증 만료) | `claude plugin update git-workflow@git-workflow`, `diff -r -q skills <설치 경로>/skills` | 4fff0ca |

- 유닛 테스트 대상 코드는 패키지 검사 스크립트뿐이다. 새 검사(spec-it-policy, template-init, Issue 템플릿 front matter)에 대응하는 테스트를 `tests/package.test.mjs`에 추가했다.
- 하위 에이전트 판정 입력과 결과 메모는 세션 scratchpad에 있고 저장소에는 없다.

## 커밋과 문서 상태

- 구현 커밋: a7e084c, 8cf42c9, 74aa5ae, ed8db19, 7049d21, 63cad15, 2ebf196, e3e78be, 561e491
- 기록 커밋: 3a10e1f, a446316, 87f9634, 45fd679와 이 인계를 담은 커밋
- 미추적 파일: `review-criteria.md`, `tc-01-pr-input.md`, `tc-06-triggers.md` (이 계획 디렉토리). 다른 세션이 만든 리뷰 입력으로 보이며 수정·커밋하지 않음
- 로컬 브랜치와 `origin/feat/issue-review-workflow`가 갈라져 있음. push 미실행

## 위험·배포·롤백

- 서버 배포 없음. 전달은 push → main 대상 PR → 리뷰 → 승인 머지 → 플러그인 갱신 순서
- D2 보류: Claude Code·Codex 설치에서 `assets/.github/`가 빠지면 template-init이 동작하지 않음. TC-F02로 확인
- 하위 에이전트 판정은 description만 준 모의 선택이다. 실제 호스트의 스킬 선택과 다를 수 있음
- 롤백: 머지 전에는 해당 커밋 revert, 머지 후에는 머지 커밋 revert와 0.2.0 재설치

## 다음 검토

- 고정 base/HEAD: `main`(4b75582) / 이 인계를 담은 커밋
- 재현 명령: [plan의 최종 검증](plan.md#최종-검증)의 TC-F01 명령
- 필요한 사람 결정: plan의 보류 행 3개 승인, push·PR 생성, TC-F02용 플러그인 갱신
