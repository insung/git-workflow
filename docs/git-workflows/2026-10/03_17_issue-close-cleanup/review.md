# Issue #17 독립 검토

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
