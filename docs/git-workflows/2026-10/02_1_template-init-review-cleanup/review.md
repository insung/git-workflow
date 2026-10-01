# PR 검토 결과

- Issue / PR / plan / todo: [Issue #1](https://github.com/insung/git-workflow/issues/1) / PR 미생성 / [plan](plan.md) / [01](01-todos-pr-review-rework.md)~[05](05-todos-plan-template.md)
- base / 검토 HEAD / commit 범위 / 미커밋 변경 / 확인 시각: `3c80538` / `31be0db` / `3c80538..31be0db` 14개 / 없음 (검토 기준 파일 3개만 미추적) / 2026-10-02 KST
- 의도 출처: Issue #1 본문 AC-01~AC-14, plan, [검토 기준](review-criteria.md)
- spec-it: 미채택 (`.architecture/` 없음)
- 결과: pass (warn 2건, 미실행 1건)

## AC별 대조

| AC | 기대 시나리오 | 구현 위치 | 테스트·assertion | 실행 결과 | 누락·판단 |
| --- | --- | --- | --- | --- | --- |
| AC-01 | README 영어·한국어 절 일치 | `README.md`, `README.ko.md` (2ebf196) | `##` 제목 비교 | 통과, 8개 절 같은 순서 (31be0db) | 충족 |
| AC-02 | README에 규칙 재서술 없음 | 같음 | 규칙 문장 검색 | 통과, 0건 (31be0db) | 충족 |
| AC-03 | spec-it 역할과 채택·미채택 동작 설명 | `README.md` spec-it 절 | 절 내용 확인 | 통과 (31be0db) | 충족 |
| AC-04 | pr-review가 의도·구현·테스트 대조 중심, 500단어 이하 | `skills/pr-review/SKILL.md` (a7e084c) | `wc -w`, 절 순서, [review-input-missing-test.md](review-input-missing-test.md) 3회 | 통과, 412단어. F1·F2·F3 3/3, 오지적 0/3 (31be0db) | 충족 |
| AC-05 | spec-it 검사가 채택 프로젝트에서만 적용 | `skills/pr-review/SKILL.md:51-52`, `references/spec-it-policy.md` | 같은 입력 3회 | 통과, 정책 판정 생성 0/3. 변경 전 스킬은 1/1 생성 | 충족 |
| AC-06 | review 양식이 AC ID별 대조 중심 | `skills/pr-review/references/review.md` | 양식 확인 | 통과 (31be0db) | 충족 |
| AC-07 | 없는 spec-it 파일 참조 없음 | skills, docs/examples, README | 검색 | 통과, 0건 (31be0db) | 충족 |
| AC-08 | 템플릿 세 정본에 필수 절과 front matter | `skills/template-init/assets/.github/` (8cf42c9, 561e491) | 절·front matter 대조 | 통과 (31be0db) | 충족 |
| AC-09 | 템플릿 없는 저장소에 복사, 기존 템플릿 유지 | `skills/template-init/SKILL.md` | 임시 저장소 두 개에 하위 에이전트 적용 | 통과. 첫째 세 파일 정본과 같음, 둘째 기존 PR 템플릿 해시 불변·누락 절 6개 보고 (31be0db). 설치 확인 TC-F02 미실행 | 충족, warn W1 |
| AC-10 | 요청마다 한 스킬로 수렴 | `skills/*/SKILL.md` description (74aa5ae) | [review-input-triggers.md](review-input-triggers.md) 3회 | 통과, 14개 요청 3/3. 변경 전 description은 R5·R12·R13 불일치 | 충족, warn W2 |
| AC-11 | 같은 규칙이 정본 한 곳에만 | `issue-link.md`, `change-conventions.md`, `execution-boundaries.md` (7049d21) | 검색 | 통과 (31be0db) | 충족 |
| AC-12 | 매니페스트에 Wiki 없음 | 매니페스트 4개 (63cad15) | 검색 | 통과, 0건 (31be0db) | 충족 |
| AC-13 | 패키지 검사 통과 | 전체 | `node --test`, `check-package`, `git diff --check` | 통과, 테스트 19개 (31be0db) | 충족 |
| AC-14 | plan·todo 양식과 파일 이름 규칙 | `skills/plan-create/` (c97f39c) | 절 구성·파일 이름 대조 | 통과 (31be0db) | 충족 |

## 계획 대조

| todo 작업·사례 | 실제 변경 | 판단 |
| --- | --- | --- |
| 01~05 작업의 `[x]` 행 | 처리 내용에 인용한 커밋 16개 모두 존재, 작성자 insung | 일치 |
| 01·03 변경 전 실행(RED) | 01·03 todo와 handoff에 변경 전 결과 기록 | 일치 |
| TC-F02 설치 확인 | 미실행. push와 플러그인 갱신 필요 | 남은 검증 |

## 규칙 외 의견

- TC-01은 변경 전 pr-review도 F1~F3를 모두 찾았다. 이번 재작성의 효과는 정책 소음 제거와 AC별 대조 구조이며, 테스트 누락 탐지력 향상의 근거는 아직 없다.
- `skills/pr-review/SKILL.md:10` “별도 모델을 중첩 호출하지 않는다.”와 plan의 하위 에이전트 시나리오 검증이 같은 문서 체계 안에서 충돌해 보인다. 검증 실행 주체를 Issue #2에서 정한다.

## 다음 행동

- 수정할 todo와 추가할 테스트: 없음. 아래 warn은 Issue #2 범위로 넘긴다.
    - W1: template-init에 Issue 템플릿 필수 절 목록, `ISSUE_TEMPLATE/` 폴더 생성, remote 없는 저장소, 뜻이 같은 절의 판단 기준이 없음
    - W2: 구현 세션이 미추적 검증 입력 `review-input-triggers.md`를 읽고 자기 검증에 사용함. 검증 입력의 독립성 규칙 필요
- 필요한 사람 결정: push(force push 포함)와 PR 생성, TC-F02 실행 시점
- 결과가 적용되는 HEAD와 재검토 조건: `31be0db`. 이후 코드·스킬 변경이 생기면 해당 AC를 다시 검토한다. 이 review.md와 검토 기준 파일의 문서 전용 커밋은 재검토 대상이 아니다.
- 머지 승인 상태: 리뷰 결과는 머지 승인이 아님
