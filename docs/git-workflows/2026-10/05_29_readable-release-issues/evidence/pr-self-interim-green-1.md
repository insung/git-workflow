## 관련 작업

[Issue #48](https://github.com/example/billing/issues/48)의 AC-01 network 안내와 AC-02 expired 안내 유지 범위다. 제공 기록에서 실제 원격 Issue가 확인됐다. Issue 종료는 승인 범위에 없다.

## 변경

network 오류에서 사용자가 재시도 방법을 읽을 수 있도록 오류 분류와 안내 문구를 변경했다. expired 오류는 기존 안내를 유지하는 범위다.

- 중복 결제 위험 때문에 버튼은 안내만 제공한다는 승인 결정을 적용한다.
- 자동 결제 재전송과 서버 변경은 제외한다.

분류 수정·문구 수정·설명 보완 커밋은 같은 재시도 안내 결과를 위한 변경이다.

## 변경 위치

| 파일·폴더 | 변경 이유 |
| --- | --- |
| `src/payment/errors.ts` | network 오류 분류 변경 |
| `src/payment/messages.ts` | 재시도 안내 문구 변경 |
| `tests/payment.test.ts` | 결제 오류 검사 변경 |

## 계획·인계

- base / 구현 HEAD: `main` / `def5678`
- 계획·작업·인계: 로컬 `plan.md`·`task-01.md`·`handoff.md`, 미push
- 원격 문서 링크: 미확인, 링크 준비 중
- 현재 코드 diff: 제공 기록에서 확인 완료
- 개별 구현 커밋 ID·계획 이탈 여부·handoff 계약 충족 여부: 제공 정보 부족으로 미확인

상세 명령·환경·시각은 로컬 `handoff.md`에 기록돼 있다. 원격 문서 링크는 문서가 전달된 뒤 확인해야 한다.

## 확인

현재 HEAD `def5678`의 network 검사는 미실행이며 expired 안내 유지 assertion이 누락됐다. 실기기 재현도 미실행이다. 미실행·누락 이유는 제공되지 않았다.

문구가 다시 변경되기 전 `abc1234`에서 network→retry 검사 6개가 통과했다. 이 결과는 과거 이력이며 현재 HEAD의 통과 근거가 아니다. AC-01의 현재 안내와 AC-02의 기존 안내 유지에 대한 검증 증거 보완이 필요하다.

## 운영·다음 작업

앱 업데이트로 전달한다. 서버 배포·데이터 마이그레이션은 변경 범위에 없어 해당하지 않는다. 롤백은 구현 커밋 revert이며 실행은 미확인이다.

- 현재 HEAD에서 network 검사를 실행한다.
- expired 안내 유지 assertion을 보완하고 실행한다.
- 실기기 재현 결과를 확보한다.
- 보완한 증거를 로컬 handoff에 연결하고 현재 HEAD를 대상으로 리뷰한다.

작성과 로컬 검토만 승인됐다. push·PR 생성·댓글·머지·Issue 종료는 승인되지 않았다.

전달 상태: `review-pending`인 로컬 PR 본문 초안이다. 원격 명령은 실행하지 않았다. PR URL·원격 headRefOid·적용 라벨·실제 assignee login은 PR 미생성으로 확인되지 않았다. 현재 HEAD 검증 보완과 리뷰가 남아 있다.
