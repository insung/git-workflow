# 02 워크플로우 연결

계획: [plan의 단계 표](plan.md#단계)

## 변경 대상

| 구분 | 경로 | 이유 |
| --- | --- | --- |
| Modify | `skills/git-workflow/SKILL.md` | 단계 표에 Issue 종료 행 추가, 흐름 설명에 종료 단계 추가 |
| Modify | `skills/pr-merge/SKILL.md` | 「## 머지 결과와 다음 행동」에 issue-close 인계 추가 |
| Modify | `README.ko.md`, `README.md` | 흐름도·스킬 표·디렉토리 트리에 issue-close 추가 |
| Modify | `scripts/check-package.mjs` | `requiredSkills`에 `issue-close` 추가 |
| Test | `tests/package.test.mjs` | fixture `names`에 `issue-close` 추가, 누락 시 실패 사례 추가 |

## 작업

| # | 작업 | 완료 | 처리 내용 |
| --- | --- | --- | --- |
| 1 | git-workflow 단계 표와 흐름 문장에 issue-close 연결 | [x] | 단계 표에 issue-close 행, 흐름 문장에 「Issue 종료」 추가 |
| 2 | pr-merge 머지 확인 뒤 issue-close 인계 문장 추가 | [x] | 「## 머지 결과와 다음 행동」에 인계 2문장 추가 |
| 3 | README 두 언어판의 흐름도·스킬 표·트리 갱신 | [x] | 흐름도 노드 J, 스킬 표 행, 트리 행 추가 |
| 4 | 필수 스킬 목록과 테스트 fixture 갱신, issue-close 누락 사례 추가 | [x] | `requiredSkills`·`requiredReferences`와 fixture 갱신, 「rejects a missing issue-close stage」 테스트 추가 |

## 검증

| 사례 | AC | 명령·작업 디렉토리 | 기대 결과 | 결과 |
| --- | --- | --- | --- | --- |
| <a id="tc-06"></a>TC-06 | AC-06 | `grep -n "issue-close" skills/git-workflow/SKILL.md skills/pr-merge/SKILL.md README.ko.md README.md`, 리포 루트 | 네 파일 모두에 있음 | 통과 (41d78c0 + 미커밋 작업본) |
| <a id="tc-07"></a>TC-07 | AC-06 | `node --test tests/package.test.mjs`, 리포 루트 | fail 0, issue-close 누락 사례가 실패를 감지 | 통과 (41d78c0 + 미커밋 작업본) |
| <a id="tc-08"></a>TC-08 | AC-06 | `node scripts/check-package.mjs`, 리포 루트 | exit 0, 로컬 링크 오류 없음 | 통과 (41d78c0 + 미커밋 작업본) |

## 제외 범위

- issue-close 스킬 본문 (01 단계)
- 플러그인 버전 변경

## 현재 작업본 자체 검증 기록

- 실행 시각(UTC): 2026-10-02T02:45:13.298187+00:00; 기준 HEAD `41d78c0093e568317c7cae89e4de7d1f79e2fb6e` + 미커밋 작업본. 실제 커밋 없음.
- 환경: Node v23.11.0, gh 2.101.0. `node scripts/check-package.mjs` exit 0, `node --test tests/package.test.mjs` 22 pass / 0 fail, `git diff --check` exit 0.
- 문서 사례는 정적 대조다. 실제 종료·코멘트·assignee·GitHub 공동 작성자 표시 실행 증거는 아니다. 최종 내용 식별과 파일 목록은 [실행 요약](05-todos-issue-housekeeping.md#실행-결과-요약)에 기록한다.

## PR 준비 후속 기록 — 2026-10-02

주제별 로컬 커밋과 최신 main 통합 완료. 코드 커밋·통합 검사는 [실행 요약](05-todos-issue-housekeeping.md#실행-결과-요약), 독립 검토와 미실행 증거는 [review](review.md)에 기록했다. 통합 후 package 검사 25/25, checker·diff 검사 통과. 실제 원격 적용은 생성 후 조회로 별도 확인한다.
