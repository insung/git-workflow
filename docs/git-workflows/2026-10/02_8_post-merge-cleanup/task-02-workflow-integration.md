# 02 흐름 연결

계획: [단계](plan.md#단계)

## 변경 대상

| 구분 | 경로 | 이유 |
| --- | --- | --- |
| Create/Modify/Test | `skills/issue-create/SKILL.md` | 흐름 연결 |
| Create/Modify/Test | `skills/git-workflow/SKILL.md` | 흐름 연결 |
| Create/Modify/Test | `README.md` | 흐름 연결 |
| Create/Modify/Test | `README.ko.md` | 흐름 연결 |
| Create/Modify/Test | `scripts/check-package.mjs` | 흐름 연결 |
| Create/Modify/Test | `tests/package.test.mjs` | 흐름 연결 |

## 작업

| # | 작업 | 완료 | 처리 내용 |
| --- | --- | --- | --- |
| 1 | 열린 동일 범위 재사용·닫힌 별도 범위 분리 기준 연결 | [x] | 구현 464588e; [실행 요약](task-02-workflow-integration.md#실행-결과-요약) |
| 2 | issue-close 설치 여부에 따른 조건부 인계와 책임 정의 | [x] | 구현 464588e; [실행 요약](task-02-workflow-integration.md#실행-결과-요약) |
| 3 | README·필수 참조 검사 및 의미 있는 누락 회귀 검사 갱신 | [x] | 구현 464588e; [실행 요약](task-02-workflow-integration.md#실행-결과-요약) |

## 검증

| 사례 | AC | 명령·작업 디렉토리 | 기대 결과 | 결과 |
| --- | --- | --- | --- | --- |
| <a id="tc-03"></a>TC-03 | AC-07~AC-08 | 공개 Issue 재사용·별도 후속·자동 종료·종료 스킬 부재 시나리오를 변경 전후 새 실행자로 각각 3회 실행, 작업 루트 | 새 범위 추적과 기존 종료 책임 재사용 | 공개 RED eff0704 0/3 → GREEN 464588e 3/3; handoff 근거 |
| <a id="tc-04"></a>TC-04 | AC-09 | node --test tests/*.test.mjs; node scripts/check-package.mjs; git diff --check, 작업 루트 | 기존 검사·새 참조 누락 회귀 통과 | 464588e: tests 25/25·package·diff check 통과 |

## 제외 범위

- 다른 단계의 파일과 #5·#6 기능 구현, 기존 작업 정리, 외부 게시

## 실행 결과 요약

안전한 정확한 worktree만 정리하고 dirty·공유·후속 작업·리뷰 worktree를 보존하는 지침 구현. 승인·대상·MERGED·사후 확인과 관리 archive 경계 대조. 구현자의 모의 응답과 실제 삭제 검증을 구별하며 당시 자기 검증 미실행 한계는 review에 유지.

당시 명령은 저장소 루트의 `node --test tests/package.test.mjs`, `node scripts/check-package.mjs`, `git diff --check`를 중심으로 실행했다. 추가 명령·대상 작업본·실행 시각은 plan의 정리 전 기록에서 확인한다. 현재 HEAD의 재검증 결과로 사용하지 않는다.
