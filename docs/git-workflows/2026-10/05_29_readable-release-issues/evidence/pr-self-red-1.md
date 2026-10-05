## 관련 작업

[Issue #48](https://github.com/example/billing/issues/48)의 AC-01 network 안내와 AC-02 expired 안내 유지 범위를 다룬다. Issue 종료는 승인 범위에 없다.

## 변경

network 오류에서 사용자가 재시도 방법을 읽을 수 있도록 안내 문구와 오류 분류를 변경했다. expired 오류의 기존 안내는 유지하는 범위다.

- 중복 결제 위험을 고려해 버튼은 안내만 제공한다는 승인 결정 반영
- 자동 결제 재전송과 서버 변경 제외
- 같은 사용자 결과를 위한 분류·문구·설명 변경을 하나의 변경으로 정리

## 변경 위치

| 파일 | 변경 이유 |
| --- | --- |
| `src/payment/errors.ts` | network 오류 분류 변경 |
| `src/payment/messages.ts` | 재시도 안내 문구 변경 |
| `tests/payment.test.ts` | 결제 오류 검사 관련 변경 |

## 계획·인계

- base / 구현 HEAD: `main` / `def5678`
- 현재 코드 diff: 확인 완료
- `plan.md`, `task-01.md`, `handoff.md`: 로컬 미push, 원격 문서 링크 준비 중
- 상세 실행 명령·환경·시각: 로컬 `handoff.md`에 기록
- 계획 이탈 여부와 개별 구현 커밋 ID: 제공 정보 없음

## 확인

현재 HEAD `def5678`의 테스트 근거는 보완이 필요하다.

| 대상 | 확보된 근거 | 남은 확인 |
| --- | --- | --- |
| AC-01 network 안내 | `abc1234`에서 network→retry 검사 6개 통과 | 문구 변경 후 `def5678` 검사 미실행 |
| AC-02 expired 안내 유지 | 유지 범위로 지정 | 유지 assertion 누락 |
| 실기기 재현 | 미실행 | 사용자 환경에서 안내 확인 |

과거 `abc1234`의 통과 결과는 현재 HEAD의 검증 결과로 사용할 수 없다. 미실행·누락 이유는 제공되지 않았다.

## 운영·다음 작업

- 전달 방식: 앱 업데이트
- 서버 배포·데이터 마이그레이션: 서버 변경이 범위에서 제외돼 해당 없음
- 롤백: 구현 커밋 revert, 실행 미확인
- 다음 작업: 현재 HEAD network 검사, expired 유지 assertion 보완, 실기기 재현, 보완된 근거를 바탕으로 리뷰

---

전달 상태: 본문 초안 작성 완료, `review-pending`. 원격 명령과 파일 수정은 실행하지 않았다. PR URL·원격 headRefOid·적용 라벨·assignee는 원격 PR 미생성으로 확인 대상이 없다. 승인 범위는 작성과 로컬 검토이며, push·PR 생성·댓글·머지·Issue 종료는 미승인이다.
