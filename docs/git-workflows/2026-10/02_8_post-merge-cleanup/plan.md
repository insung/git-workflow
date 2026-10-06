---
issue: "#8"
status: completed
branch: "feat/post-merge-cleanup"
base: "main"
created: "2026-10-02"
---

# 머지 후 작업 정리 계획

## 요청

> git-workflow 에 pr merge 하면 해당 브랜치 삭제 및 워크트리 삭제되는 것 추가해줘.

- 해석: [Issue #8](https://github.com/insung/git-workflow/issues/8)의 안전 정리·후속 Issue 기준을 구현하고 별도 세션의 고정 입력으로 검증한다.
- 남은 결정: 없음. #5 미머지 상태에서는 issue-close를 필수 파일 링크로 만들지 않고 조건부 인계한다.

## 현재 동작과 변경 이유

| 현재 동작 | 근거 위치 | 바꿀 결과 |
| --- | --- | --- |
| 실제 머지 확인 뒤 배포만 안내 | skills/pr-merge/SKILL.md, 머지 결과와 다음 행동 | 안전 확인·정리·사후 결과·종료 기록 인계 |
| 닫힌 Issue의 같은 범위 여부만 확인 | skills/issue-create/SKILL.md, 절차 1 | 작은 변경에도 별도 후속 범위 분리 |
| issue-close가 main에 없음 | skills 목록, #5 OPEN | #5의 책임을 중복하지 않고 설치 여부에 따른 인계 |

## 범위

| 구분 | 내용 |
| --- | --- |
| 포함 | pr-merge 정리 참조, issue-create·git-workflow·README 연결, 패키지 누락 검사, 공개 자기 검증 사례 |
| 제외 | #5·#6 구현, 자동 삭제 설정 변경, 기존 작업 삭제, push·PR·머지·Release·설치 |
| 미변경 소비자 | 기존 머지 승인·HEAD 일치·독립 검토·배포 경계 |
| 호환성·데이터·운영 | 지침 변경. 파괴적인 실환경 검증 대신 임시 Git 저장소와 읽기 전용 시나리오 사용 |

## 단계

| 단계 | 제목 | 설명 | 검증 사례 | 완료 |
| --- | --- | --- | --- | --- |
| [01](task-01-cleanup-policy.md) | 정리 정책 | 대상·권한·보존·도구·조회 절차 | [TC-01](task-01-cleanup-policy.md#tc-01), [TC-02](task-01-cleanup-policy.md#tc-02) | [x] |
| [02](task-02-workflow-integration.md) | 흐름 연결 | 후속 Issue·종료 인계·README·패키지 회귀 | [TC-03](task-02-workflow-integration.md#tc-03), [TC-04](task-02-workflow-integration.md#tc-04) | [x] |

실행 순서: 01 → 02 → 현재 세션의 독립 검증. 구현 세션은 검토 브랜치와 그 입력을 읽지 않는다.

## 최종 검증

| 사례 | AC | 명령·작업 디렉토리 | 기대 결과 | 필요 승인 | 결과 |
| --- | --- | --- | --- | --- | --- |
| TC-F01 | AC-01~AC-08 | 고정 입력 12종 × 변경 전·후 각각 새 실행자 3명, 판정은 현재 세션 | 정상·실패·경계·유지 행동의 기대 결과 대조 | 현재 검증 요청에 포함 | root 독립: 초기 12종×3 GREEN 36/36; 추가 8종×3 24/24. RED·격리 warn·추가 작성 시점은 review |
| TC-F02 | AC-09 | `node --test tests/*.test.mjs`, `node scripts/check-package.mjs`, `git diff --check`, 작업 루트 | 테스트·구조·상대 링크·공백 검사 통과 | 없음 | root 재실행 464588e: 25/25·package·diff check·quick_validate 3/3 통과 |
| TC-F03 | AC-03~AC-05, AC-09 | 임시 Git 저장소에서 일반·dirty·locked·후속 커밋·squash 사례의 안전 명령 실행 | 임시 대상만 정리, 보존 대상의 바이트·ref 유지 | 임시 저장소에 한정 | root 독립 임시 Git 7사례/21 assertion + lease 2사례/4 assertion 통과; review 근거 |

## 전달과 롤백

| 항목 | 내용 |
| --- | --- |
| 전달 방법 | 로컬 구현 브랜치와 handoff·review 제공. 스킬은 지침이며 서버 배포 없음 |
| 필요 승인 | plan-create의 고정 절차에 필요한 계획·리뷰 기준 로컬 커밋과 구현의 단계별 로컬 커밋만 포함. push·PR·머지·외부 댓글·설치 별도 |
| 적용 후 확인 | 공개 테스트와 독립 실행 증거 대조, 미실행 실환경 항목 별도 표기 |
| 롤백 | 이번 전용 브랜치의 변경 커밋 revert. 다른 worktree·브랜치 변경 없음 |

## 결정과 변경 기록

| 날짜 | 구분 | 내용 | 영향 AC·단계 | 상태 |
| --- | --- | --- | --- | --- |
| 2026-10-02 | 결정 | 최신 origin/main 493720d 기준 전용 worktree. main의 task 파일 이름 규칙을 설치 캐시 0.3.0보다 우선 | 전체 | 승인 |
| 2026-10-02 | 요청 변경 | 사용자가 계획·서브에이전트 구현·현재 세션 독립 검증·최종 진행 표 요청 | 전체 | 승인 |
| 2026-10-02 | 결정 | #5 미머지 시 결과 요약을 로컬 인계하고 issue-close 구현·새 코멘트 양식을 만들지 않음 | AC-08, 02 | 승인 |
| 2026-10-02 | 계획 이탈 | 01·02 소스 커밋 후 공개 GREEN을 최종 source에서 통합 실행하고 기록은 문서 전용 커밋으로 남김. 독립 실행 출력 우발 노출은 handoff에 기록하여 root 판정으로 인계 | 전체, 01·02 | review-pending |
| 2026-10-02 | 결정 | root 독립 GREEN 60/60·회귀25/25·Git25 assertion 확인. 우발 노출은 warn으로 보존하고 추가 입력으로 보강. 로컬 검증·인계 범위 완료, 실환경·원격 전달은 제외 | 전체 | 승인 |
| 2026-10-02 | 요청 변경 | 사용자 PR 준비 요청에 따라 작업 브랜치 push와 초안 PR 생성을 전달 범위에 추가. PR 머지·실제 자원 정리·Issue 종료는 제외 | 전달 | 승인 |
| 2026-10-02 | 결정 | #5가 main에 머지되어 충돌을 보존 통합하고 root가 통합 소스 02390ae의 회귀26/26·종료 인계9/9 재검증. 과거 검토 증거는 유지 | AC-08~09, 전달 | 승인 |
| 2026-10-02 | 전달 | 작업 브랜치 push·원격 HEAD 일치 확인, 초안 PR #10 생성·Issue 연결·라벨·담당자·MERGEABLE 조회 확인. 실제 머지·종료·자원 삭제 미실행 | 전달 | 승인 |

## 기록 정리

2026-10-06 Issue #39의 승인에 따라 전달문·검토 입력·응답 전문·로그·중복 초안을 현재 트리에서 정리했다. 이 문서의 기존 상태·판정·승인은 당시 기록이며 현재 완료 상태로 갱신한 것이 아니다. 필요한 원문은 [정리 전 기록](https://github.com/insung/git-workflow/tree/3993cb36cdb3fca6ff8b2bfee47016eb8a70e959/docs/git-workflows/2026-10/02_8_post-merge-cleanup)에서 조회한다.
