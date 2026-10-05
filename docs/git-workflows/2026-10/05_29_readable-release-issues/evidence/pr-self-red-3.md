## 관련 작업

- [Issue #48](https://github.com/example/billing/issues/48): AC-01 network 오류의 재시도 안내, AC-02 expired 오류의 기존 안내 유지
- Issue 종료: 승인 범위 밖

## 변경

network 오류에서 사용자가 재시도 방법을 읽을 수 있도록 오류 분류와 안내 문구를 변경했다. 분류·문구·설명 보완 커밋은 이 사용자 결과를 위한 변경이다.

- expired 오류: 기존 안내 유지 범위
- 버튼: 중복 결제 위험을 고려한 안내만 제공 결정 승인
- 제외 범위: 자동 결제 재전송, 서버 변경

## 변경 위치

| 파일 | 변경 목적 |
| --- | --- |
| `src/payment/errors.ts` | network 오류 분류 변경 |
| `src/payment/messages.ts` | 재시도 안내 문구 변경 |
| `tests/payment.test.ts` | network→retry 검사 관련 변경 |

## 계획·인계

- base / 구현 HEAD: `main` / `def5678`
- 현재 코드 diff: 확인 완료
- `plan.md`, `task-01.md`, `handoff.md`: 로컬 미push, 확인된 원격 문서 링크 대기
- 실행 상세 명령·환경·시각: 로컬 `handoff.md`에 기록, 제공된 요청에 상세값 없음
- 개별 구현 커밋 ID·task 사례 ID·계획 이탈 여부·미커밋 변경: 제공 정보 없음

## 확인

현재 HEAD `def5678`의 network 안내와 expired 안내 유지에는 검증 증거 보완이 필요하다.

| 대상 | 근거와 한계 | 필요한 확인 |
| --- | --- | --- |
| AC-01 network 안내 | `abc1234`의 network→retry 검사 6개 통과. 이후 `def5678`에서 문구 재변경, 현재 HEAD 검사 미실행 | `def5678`의 network 검사 재실행 |
| AC-02 expired 안내 유지 | 유지 assertion 누락 | 유지 assertion 보완 및 실행 |
| 실기기 재현 | 미실행 | 실기기 재현 실행 |

검사 미실행과 assertion 누락의 이유는 제공되지 않았다. 과거 검사 결과는 현재 HEAD의 통과 근거로 사용할 수 없다.

## 운영·다음 작업

- 전달 방식: 앱 업데이트
- 서버 배포·데이터 마이그레이션: 서버와 데이터 변경이 제외 범위이므로 해당 없음
- 롤백: 구현 커밋 revert, 실행 미확인
- 남은 작업: 현재 HEAD 검증 보완 및 로컬 리뷰
- 승인 범위: 작성·로컬 검토
- 미승인 행동: push·PR 생성·댓글·머지·Issue 종료

전달 상태: `review-pending`. 본문 초안만 반환하며 원격 명령은 실행하지 않았다. PR URL·실제 원격 headRefOid·적용 라벨·assignee login은 원격 PR 미생성으로 확인되지 않았다. 저장소 라벨과 필수 정책도 제공 정보가 없다.
