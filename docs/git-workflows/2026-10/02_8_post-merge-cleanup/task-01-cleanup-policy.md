# 01 정리 정책

계획: [단계](plan.md#단계)

## 변경 대상

| 구분 | 경로 | 이유 |
| --- | --- | --- |
| Create/Modify/Test | `skills/pr-merge/SKILL.md` | 정리 정책 |
| Create/Modify/Test | `skills/pr-merge/references/post-merge-cleanup.md` | 정리 정책 |

## 작업

| # | 작업 | 완료 | 처리 내용 |
| --- | --- | --- | --- |
| 1 | MERGED 확인 이후 정리 참조 연결 | [ ] | |
| 2 | 원격·로컬·worktree 대상 및 보존 조건 정의 | [ ] | |
| 3 | 일반 Git·Codex 관리 worktree 도구와 사후 확인 정의 | [ ] | |

## 검증

| 사례 | AC | 명령·작업 디렉토리 | 기대 결과 | 결과 |
| --- | --- | --- | --- | --- |
| <a id="tc-01"></a>TC-01 | AC-01~AC-06 | 공개 정상·대기·dirty·다른 사용·보호·squash·이미 없음·실패·managed 시나리오를 변경 전후 새 실행자로 각각 3회 실행, 작업 루트 | 안전한 다음 행동과 개별 정리 결과 | 미실행 |
| <a id="tc-02"></a>TC-02 | AC-03~AC-05, AC-09 | 임시 저장소에서 문서의 안전 명령과 보류 조건 실행, 작업 루트 | dirty·후속 커밋·locked 보존, 깨끗한 일반 linked worktree만 정리 | 미실행 |

## 제외 범위

- 다른 단계의 파일과 #5·#6 기능 구현, 기존 작업 정리, 외부 게시
