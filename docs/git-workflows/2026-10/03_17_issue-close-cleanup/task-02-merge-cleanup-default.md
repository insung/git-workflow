# 02 머지 시 기본 워크트리 정리

계획: [공통 맥락과 요청 변경](plan.md#공통-맥락). Issue AC-02 최신 요청과 AC-08~10을 적용한다. 과거 검토 결과는 이전 소스의 이력이며 이번 승인 의미에 적용하지 않는다.

## 변경 대상

| 구분 | 경로 | 이유 |
| --- | --- | --- |
| Modify | skills/pr-merge/references/post-merge-cleanup.md | 머지 승인에 작업 worktree 정리 포함 |
| Modify | skills/pr-merge/SKILL.md | 실제 MERGED 뒤 기본 정리 명시 |
| Modify | skills/issue-close/SKILL.md | 머지에서 받은 정리 권한 재사용 연결 |

## 작업

| # | 작업 | 완료 | 처리 내용 |
| --- | --- | --- | --- |
| 1 | 머지 승인으로 해당 PR의 안전한 작업 worktree 정리, 같은 삭제 승인 반복 질문 없음 | [x] | `2a78df7`, 정리 정본과 pr-merge/issue-close 권한 연결 |
| 2 | 결과 조회·명시 보존은 삭제 없음, branch/댓글 권한 별도 유지 | [x] | `2a78df7`, 조회·보존 예외 및 종료만 승인 미삭제 유지 |
| 3 | 변경 전후 시나리오와 패키지·회귀 검증, handoff 기록 | [ ] | RED/GREEN 각각 3회 미실행: 새 실행자 생성 한도. 회귀 29/29·패키지·공백 통과, handoff에 한계 기록 |

## 검증

| 사례 | AC | 명령·작업 | 기대 결과 | 결과 |
| --- | --- | --- | --- | --- |
| <a id="tc-06"></a>TC-06 | AC-02·08·10 | 가상 pr-merge 시나리오 | 머지 승인·실제 MERGED·clean 정확한 대상이면 별도 질문 없이 worktree 제거·사후 조회, branch/댓글 없음 | RED `9421fb3`·GREEN `2a78df7` 각각 3회 미실행(새 실행자 한도) |
| <a id="tc-07"></a>TC-07 | AC-09 | 같은 방식 | 결과 조회만 또는 보존 요청이면 삭제 없음 | RED `9421fb3`·GREEN `2a78df7` 각각 3회 미실행(새 실행자 한도) |
| <a id="tc-08"></a>TC-08 | AC-03·08 | 같은 방식 | dirty·후속·다른 세션 사용·queue 대기이면 삭제 없음 | RED `9421fb3`·GREEN `2a78df7` 각각 3회 미실행(새 실행자 한도) |
| <a id="tc-09"></a>TC-09 | AC-02·07 | 같은 방식 및 node --test tests/*.test.mjs, node scripts/check-package.mjs | 종료만 승인해도 삭제 없음, 머지 정리 승인 재사용, 검사 통과 | 행동 RED/GREEN 각각 3회 미실행(새 실행자 한도); 회귀 29/29·패키지·공백 통과, `2a78df7` |

## 제외 범위

실제 기존 자원 삭제·push·PR·머지·설치. 기존 force 금지·관리 도구·정확한 대응 및 사후 조회 규칙 변경 없음.
