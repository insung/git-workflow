# 03 PR 본문 작성·편집

계획: [plan](plan.md#단계)

## 변경 대상

| 구분 | 경로 | 이유 |
| --- | --- | --- |
| Modify | skills/pr-create/SKILL.md | 제시 전 편집 연결 |
| Modify | skills/pr-create/references/pr.md | 결과·검증·위험·행동 작성 절차와 완성 예시 |
| Modify | skills/workflow-init/assets/.github/PULL_REQUEST_TEMPLATE.md | 기존 절의 작성 안내 |
| Modify | skills/git-workflow/references/writing-conventions.md | PR 설명 문장 허용 |
| Modify | docs/examples/readable-records/README.md | PR 전후 예시 |

## 작업

| # | 작업 | 완료 | 처리 내용 |
| --- | --- | --- | --- |
| 1 | PR 설명 문장 기준 | [ ] | |
| 2 | PR 본문 편집과 원문 대조 절차 | [ ] | |
| 3 | 템플릿·예시 반영 | [ ] | |

## 검증

| 사례 | AC | 방법 | 결과 |
| --- | --- | --- | --- |
| <a id="tc-04"></a>TC-04 | AC-08~10 | 별도 입력으로 변경 전후 새 실행자 3회 PR 초안 작성 | 미실행 |
| <a id="tc-05"></a>TC-05 | AC-10 | 기존 절·Issue 연결·승인·미변경 목록 기준 대조 | 미실행 |
| TC-F03 | AC-08~10 | node scripts/check-package.mjs; node --test tests/package.test.mjs; git diff --check | 미실행 |

## 제외 범위

- 머지·Issue 종료·공개 Release 수정
- 기존 규칙의 Issue 연결·승인 경계 변경
- 다른 작업·과거 사실 소급 수정

## 역할과 전달

구현자는 Issue→plan→이 task→handoff 순서로 읽는다. review/issue-29 및 review/issue-29-pr-writing과 review-criteria·review-input 파일은 읽지 않는다. 조정자가 기준·검증 입력을 고정하고 별도 구현자에게 맡긴다. 구현자는 commit·push·PR 변경을 실행하지 않고 조정자에게 인계한다.
