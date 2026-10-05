## 관련 작업

[Issue #48](https://github.com/example/billing/issues/48)의 AC-01 network 안내와 AC-02 expired 안내 유지 범위를 다룬다. Issue 종료는 승인 범위에 없다.

## 변경

network 오류에서 사용자가 재시도 방법을 읽을 수 있도록 안내한다. 이를 위해 오류 분류와 안내 문구를 변경했다. expired 오류는 기존 안내를 유지하는 범위다.

- 중복 결제 위험 때문에 버튼은 안내만 제공한다는 승인 결정을 유지한다.
- 자동 결제 재전송과 서버 변경은 제외한다.

## 변경 위치

| 파일·폴더 | 변경 이유 |
| --- | --- |
| `src/payment/errors.ts` | network 오류 분류 변경 |
| `src/payment/messages.ts` | network 재시도 안내 문구 변경 |
| `tests/payment.test.ts` | 결제 오류 검사 변경 |

## 계획·인계

- base / 구현 HEAD: main / def5678
- 현재 코드 diff: 확인
- 계획·작업·인계: 로컬 `plan.md`·`task-01.md`·`handoff.md`, 미push
- 원격 문서 링크: 확인된 링크 없음, 링크 준비 중
- 분류 수정·문구 수정·설명 보완 커밋: 같은 사용자 결과를 위한 변경, 개별 커밋 식별자는 미제공

## 확인

현재 HEAD def5678의 network 검사는 미실행이며 expired 안내 유지 assertion이 누락됐다. 실기기 재현도 미실행이다. 미실행·누락 이유는 제공되지 않았다.

abc1234에서 network→retry 검사 6개가 통과했으나 이후 def5678에서 문구를 다시 변경했다. 이 통과는 과거 이력이며 현재 HEAD의 통과 근거가 아니다. 상세 명령·환경·시각은 로컬 `handoff.md`에 기록돼 있다.

## 운영·다음 작업

앱 업데이트로 전달한다. 서버 배포·데이터 마이그레이션은 변경 범위에 없어 해당하지 않는다. 롤백은 구현 커밋 revert이며 실행은 미확인이다.

현재 문구의 network 안내와 expired 안내 유지에 대한 검증 근거가 부족하다. 다음 행동은 아래와 같다.

- 현재 HEAD의 network 검사를 실행한다.
- expired 안내 유지 assertion을 보완하고 실행한다.
- 실기기 재현 결과를 확보한다.
- 보완한 검증 근거와 로컬 계획·작업·인계 문서로 리뷰한다.

작성과 로컬 검토만 승인됐다. push·PR 생성·댓글·머지·Issue 종료는 승인되지 않았다.

전달 상태: 본문 초안, review-pending. 원격 PR은 생성하지 않았다. PR URL과 원격 headRefOid는 없으며 구현 HEAD는 제공된 def5678이다. 적용 라벨·assignee는 없고 저장소 라벨 목록·인증 계정은 미확인이다. 현재 HEAD 검증 보완과 리뷰가 남아 있다.
