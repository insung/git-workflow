# Issue #17 독립 검토

최신 요청 변경의 검토는 [종료 시 삭제 확인 질문](#2026-10-04-종료-시-삭제-확인-질문-검토) 절이다. 아래 초기 결과는 630870d 소스의 이력이다.

- Issue: https://github.com/insung/git-workflow/issues/17; PR 미생성
- 계획: [plan](plan.md), 작업: [task](task-01-cleanup-handoff.md), 구현 인계: [handoff](handoff.md)
- base: `89175699cf1299046262786d99767b211762e516`
- 제품 소스: `630870d2a9984ecd03a115959b5782b7e29bb2f8`; 검토 시 HEAD 01460e1은 문서만 추가
- 구현 전 고정 기준: `51a90b9`, 리뷰 브랜치 review/issue-17
- 초기 [고정 입력](review-input-close-cleanup.md) 7개는 구현 전 작성. [부재 추가 입력](review-input-absence.md)은 구현 후 166e026에서 고정했으며 초기 고정으로 소급하지 않음
- 판정: root; 구현: 별도 에이전트. 시나리오 실행자는 판정하지 않음
- 결과: **warn**. 제품 AC의 독립 검증 충족. 구현자의 최종 자기 GREEN은 기본 3회 중 1회만 실행, 2회는 슬롯 한도로 미실행. root가 별도의 새 실행자 3명으로 최종 소스의 고정 행동 입력을 실행했으며 자기 GREEN 3/3으로 표현하지 않음
- spec-it 미채택

## AC별 대조

| AC | 근거 | 판정 |
| --- | --- | --- |
| AC-01 | issue-close 3단계의 정본 연결과 실행·사후 확인, S01 | 충족 |
| AC-02 | 종료/댓글과 정확한 삭제 승인 분리, 동일 승인 재사용, S01·02 | 충족 |
| AC-03 | 기존 정본 불변, S03·07에서 보존과 관리 도구 인계 | 충족 |
| AC-04 | 코멘트 정리 표·출력에 각 결과와 근거·다음 행동, S01~05·08 | 충족 |
| AC-05 | CLOSED 경로에서 동일 정리 확인, S04 | 충족 |
| AC-06 | 기존 차단 조건 불변, 정리 보류와 종료 구분, S02·05·06 | 충족 |
| AC-07 | 최종 독립 24/24 기대 행동, 회귀29/29·패키지·링크·공백 검사 | 충족. 자기 반복 미실행 한계는 유지 |

## 독립 실행

제품 소스 630870d의 skills archive와 입력 절만 새 실행자 issue17_final1~3에 제공했다. 기대 절·검토 기준·다른 응답·구현 handoff는 제공하지 않았다. root가 응답을 고정 기준과 대조했다. 모두 가상 상태의 다음 행동이며 실제 삭제/댓글/종료 성공 횟수가 아니다.

| 사례 | 실제 행동 | 결과 |
| --- | --- | --- |
| S01 | 정리 실행·사후 조회·코멘트·종료 순서 | 3/3 |
| S02 | 미승인 삭제 보류와 종료 결과 분리 | 3/3 |
| S03 | dirty·ignored·후속·다른 사용 보존 | 3/3 |
| S04 | 자동 CLOSED 정리 확인·재오픈 없음 | 3/3 |
| S05 | 삭제 오류와 사후 조회 실패 미확인 | 3/3 |
| S06 | 삭제 AC 미충족·미체크 task 차단 | 3/3 |
| S07 | 관리 도구 없을 때 일반 Git 우회 없음 | 3/3 |
| S08 | 해당 없음과 이미 없음 구분 | 3/3 |


초기 소스 3e41cfa의 7개 입력 1회 응답도 기대를 충족했지만 부재 표현 보완 전 이력으로만 보관하고 최종 24건에 합산하지 않는다.

| 원시 응답 식별 | SHA-256 |
| --- | --- |
| issue17-final1-result.md | 7f3156de4b629ca88aeaefc3af044c0eab4007cd8a7268451f34c05074bb8985 |
| issue17-final2-result.md | 75f66eedc7894f9e461a02ef58a5df845cfc972cb3de8f0145749eeb059cedf5 |
| issue17-final3-result.md | 7ccdca87429576f1466e385cb469638ad06aeb5a6bd9f77faafdd897d24faffb |


## 직접 검사와 범위

- root: 최종 제품 소스에서 node --test tests/*.test.mjs 29/29, node scripts/check-package.mjs 구조·상대 링크 통과, git diff --check 통과
- 제품 변경은 issue-close/SKILL.md와 references/closing-comment.md 두 파일. 기존 pr-merge 정리 정본·삭제 명령·보호 조건·not planned/duplicate 양식 불변
- .comments 변경 없음. 다른 worktree와 primary checkout 수정 없음
- 단순 문자열 일치 테스트를 새로 만들지 않고 독립 행동 입력으로 지침 변경 검증
- 실제 외부 삭제·게시·설치·host loading은 미실행. push·PR·머지 미실행
- 구현자 자기 GREEN 두 반복은 독립 결과로 덮어쓰지 않음. 검토 위험은 이 실행 절차 이탈이며 추가 제품 결함 없음

## 다음 단계

로컬 지침 변경과 검토 결과 인계. 승인된 후속 PR 전달에서 warn과 각 검증 주체·횟수를 보존한다. 이 결과는 머지·자원 삭제 승인이 아니다.

## 2026-10-04 머지 시 기본 정리 검토

- 사용자 요청: pr-merge할 때 해당 작업 워크트리도 삭제, 기존 승인 분리 문구 위치 제공
- 최신 Issue AC-02 및 AC-08~10, [task-02](task-02-merge-cleanup-default.md) 적용
- 검토 base: `9421fb3`; 제품 소스: `2a78df7cdf2ce8bc0ed7bfbf8fc027cb73417817`. HEAD 0f0ed25는 인계 기록만 변경
- 이번 요청 변경 전 고정 기준: review/issue-17의 `a43ba4f`, [고정 입력](review-input-merge-cleanup-default.md)
- root 직접 diff 대조: pr-merge 승인 규칙·후속 실행과 issue-close 인계의 3파일만 제품 변경. 이전 머지/정리 분리 규칙은 최신 요청으로 대체. 기존 보호·보존·일반/관리 도구·사후 조회 규칙은 그대로 유지
- root 실행: node --test tests/*.test.mjs 29/29, node scripts/check-package.mjs 구조·상대 링크 통과, git diff 9421fb3 2a78df7 --check 통과
- 독립 새 실행자 merge_default_check1~3에 source archive와 입력 절만 전달. 기대/기준·다른 응답·구현 인계는 전달하지 않음. root가 판정

| 사례 | 실제 행동 | 기대 충족 |
| --- | --- | --- |
| M01 | 머지 승인에 worktree 제거 포함·추가 승인 질문 없음 | 3/3 |
| M02 | 머지 결과 조회만이면 제거 없음 | 3/3 |
| M03 | 명시 보존 요청 우선 | 3/3 |
| M04 | dirty·후속·다른 세션·관리 도구 제약 보존 | 3/3 |
| M05 | OPEN/queue에서는 정리 시작 없음 | 3/3 |
| M06 | Issue 종료만 승인해도 삭제 권한으로 확대 없음 | 3/3 |
| M07 | 사후 조회 실패를 미확인으로 보고·branch/댓글 미실행 | 3/3 |


- 최종 독립 GREEN 21/21 기대 행동 충족. 최신 AC-02·08~10 충족, 안전·상태 분리 유지 사례로 AC-03·07도 재확인
- 판정 **warn**: 구현자의 변경 전 RED·변경 후 GREEN은 새 실행자 슬롯 한도로 각 0/3 미실행. root의 독립 최종 실행은 별도이며 자기 검증이나 RED 실행으로 소급하지 않음. 제품 결함은 확인되지 않았으나 실행 절차의 한계 유지
- 630870d의 이전 독립 24건은 이전 소스 결과로 유지하며 이번 소스에서 24건 전체 재실행을 주장하지 않음
- 가상 행동 검증이며 실제 merge/삭제/게시 성공 횟수가 아님. .comments 변경 없음. 기존 워크트리 실제 삭제·push·PR·설치 미실행

원시 응답 SHA-256:

- merge-check1: `94c6c19887b122cc93e3f3789122f09dc0181b6ac17155e1aeeae1f5c448cd7b`
- merge-check2: `4088093703b5ff0b45684948e3f4aa81ec4f46a97b2c4096e7ba8efc232d47a6`
- merge-check3: `482fe59d63a3263e243988b57d2619af9a370f381509b01af1f36c011fbb577c`

## 2026-10-04 종료 시 삭제 확인 질문 검토

- PR: https://github.com/insung/git-workflow/pull/18. 사용자 요청대로 a359fc1의 현재 변경을 먼저 Draft PR로 만들고 후속 질문 보완 실행
- 최신 Issue AC-11·12, [task-03](task-03-close-cleanup-prompt.md) 적용
- 제품 소스: `8d4e544defdec58d89cbad8b74de9c25d552af98`; 검토 시 HEAD 0c9df57은 인계 문서만 변경
- 구현 전 기준: review/issue-17 `a0a09a9`, [고정 입력](review-input-close-cleanup-prompt.md)
- root diff 대조: issue-close 지침과 코멘트 기록의 2파일만 변경. pr-merge의 기본 정리 권한과 기존 보존·관리·실행 규칙 불변
- root 직접 검사: node --test tests/*.test.mjs 29/29, node scripts/check-package.mjs 구조·상대 링크 통과, git diff 46124e4 8d4e544 --check 통과. .comments 변경 없음
- 새 실행자 close_prompt_check1~3에 입력 절과 고정 source skills archive만 전달. 기대 절·검토 기준·다른 결과·구현 인계 미전달. 판정은 root

| 사례 | 실제 행동 | 기대 충족 |
| --- | --- | --- |
| Q01 | 안전한 미승인 정확한 대상에 구체적 삭제 질문·답변 전 미삭제 | 3/3 |
| Q02 | 동의 후 재조회·제거·사후확인, 거절/무응답 보존과 사유 구분 | 3/3 |
| Q03 | 동일 PR/HEAD의 기존 승인 재사용·반복 질문 없음 | 3/3 |
| Q04 | 실행 전 부재 대상 이미 없음·질문 없음 | 3/3 |
| Q05 | dirty·ignored·다른 사용 보존·승인 질문으로 제약 우회 없음 | 3/3 |
| Q06 | 대응 불명확 후보는 식별 확인부터·임의 삭제 질문 없음 | 3/3 |


- 최신 AC-11·12 충족. 기존 승인 재사용·보존·권한 분리의 AC-02·03 유지 확인. 새 행동의 독립 GREEN 18/18
- 판정 **warn** 유지: 구현자 자기 RED/GREEN 각 0/3은 새 실행자 생성 한도로 미실행. 독립 실행을 구현자 실행이나 RED로 소급하지 않음
- 이전 630870d의24건과 2a78df7의21건은 각각 그 소스의 이력. 이번 최종 소스에서 이전 전체를 재실행한 것으로 표현하지 않음
- 시뮬레이션은 가상 행동이며 실제 삭제·게시·close 성공 근거가 아님. 이번 실제 원격 행동은 승인된 push·Draft PR 생성/본문 갱신뿐이며 실제 삭제·merge·설치 미실행
- 다음 검토: Draft PR에서 전체 변경과 누적 warn 검토, 머지는 사용자 승인 후 진행

원시 응답 SHA-256:

- close-prompt-check1: `20540e4b2899f61e2156543860f50b7436e8ee2fa642c1e474537c0202b71909`
- close-prompt-check2: `1b2abc43c5c515a8efb62a9de1ea20e2014e3396c45268221379d6b2e4a6df06`
- close-prompt-check3: `0514671ed61cdae021146fec330fb72a4be50c57e5b3116e9960b3a638453c0e`
