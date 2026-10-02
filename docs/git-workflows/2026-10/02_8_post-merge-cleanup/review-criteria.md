# Issue #8 독립 검토 기준

구현 시작 전에 고정한다. 구현자에게 전달하지 않는다. 고정 입력은 [review-input-post-merge.md](review-input-post-merge.md).

## AC별 기준

| AC | 기계 확인 | 판단 질문 | 실패 예 |
| --- | --- | --- | --- |
| AC-01 | S01/S02/S09 | MERGED·timestamp·commit 확인 후 정리인가 | exit 0 또는 queue만으로 삭제 |
| AC-02 | S04/S05/S06 | ref·repository·worktree 대응과 다른 소비자 보호인가 | dev/primary 일괄 삭제 |
| AC-03 | S03/S04/S07 | ignored·staged·후속 커밋·잠금과 squash 보존인가 | clean 또는 ancestor만으로 삭제 허가 |
| AC-04 | S01/S06/S10 | 안전 cwd·일반/Codex 도구 차이가 실질적인가 | managed에 직접 Git 삭제 |
| AC-05 | S08/S09 | 대상별 조회와 머지 완료가 분리되는가 | 조회 실패를 이미 없음으로 단정 |
| AC-06 | S01/S02/S12 | 정리·댓글 범위와 재승인 없는 기존 승인 재사용인가 | 머지 승인만으로 임의 삭제/댓글 |
| AC-07 | S11 및 추가 새 범위 정적 대조 | Issue 크기가 아닌 해결 범위 기준인가 | CLOSED에 별도 개선 편입 |
| AC-08 | S12 | 없는 issue-close와 자동 종료 경로를 안전하게 인계하는가 | 깨진 링크 또는 종료 양식 중복 |
| AC-09 | node --test tests/*.test.mjs; node scripts/check-package.mjs; git diff --check 및 임시 Git 실험 | 현 소스 증거·사례 실행·상대 링크·정본이 일치하는가 | 키워드 테스트만으로 행동 pass |

## 우회 확인

- 구현 전 RED 실제 수행 시각과 기준 커밋을 확인한다. 사후 재현을 변경 전으로 쓰지 않는다.
- task 체크와 구현자 테스트는 참고. 판정 주체가 독립 명령·시나리오 실행한다.
- 고정 입력·기대 결과·검토 기준이 구현자 문맥에 노출되지 않았는지 인계 범위를 확인한다.
- 대상 소스 HEAD 및 전체 patch/digest 고정. 검토 중 변경되면 해당 증거 재실행한다.
- 새 참조 삭제 시 package validation 실패를 관찰한다. 문구 매칭 테스트만 추가하지 않는다.

## 공통 확인

- 실제 다른 작업·원격 branch·worktree는 변경하지 않는다. .comments의 기존 내용을 보존한다.
- 공통 승인·Issue 정본 규칙과 상충하지 않는다. 종료 양식은 #5, PR 검토 댓글은 #6의 책임이다.
- 임시 Git 실험: clean worktree remove 및 branch -d, dirty/locked remove 실패와 바이트 보존, 후속 commit 보존, squash -d 실패와 ref 보존. 실환경 managed archive·원격 삭제 실행 증거는 주장하지 않는다.
- spec-it 미채택은 미채택으로만 보고한다.
- 모든 AC가 행동·문서·회귀 근거로 충족하면 pass. 증거 누락은 human-review 또는 fail을 구분한다.
