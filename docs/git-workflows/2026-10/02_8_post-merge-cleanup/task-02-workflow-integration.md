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
| 1 | 열린 동일 범위 재사용·닫힌 별도 범위 분리 기준 연결 | [ ] | |
| 2 | issue-close 설치 여부에 따른 조건부 인계와 책임 정의 | [ ] | |
| 3 | README·필수 참조 검사 및 의미 있는 누락 회귀 검사 갱신 | [ ] | |

## 검증

| 사례 | AC | 명령·작업 디렉토리 | 기대 결과 | 결과 |
| --- | --- | --- | --- | --- |
| <a id="tc-03"></a>TC-03 | AC-07~AC-08 | 공개 Issue 재사용·별도 후속·자동 종료·종료 스킬 부재 시나리오를 변경 전후 새 실행자로 각각 3회 실행, 작업 루트 | 새 범위 추적과 기존 종료 책임 재사용 | 미실행 |
| <a id="tc-04"></a>TC-04 | AC-09 | node --test tests/*.test.mjs; node scripts/check-package.mjs; git diff --check, 작업 루트 | 기존 검사·새 참조 누락 회귀 통과 | 미실행 |

## 제외 범위

- 다른 단계의 파일과 #5·#6 기능 구현, 기존 작업 정리, 외부 게시
