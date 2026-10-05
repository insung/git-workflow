## 관련 작업

[Issue #48](https://github.com/example/billing/issues/48)의 AC-01 network 재시도 안내와 AC-02 expired 기존 안내 유지 범위를 다룬다. Issue 종료는 승인 범위에 없다.

## 변경

network 오류에서 사용자가 재시도 방법을 읽을 수 있도록 오류 분류와 안내 문구를 변경했다. expired 오류의 기존 안내는 유지하는 범위다.

- 분류·문구·설명 보완 커밋: 같은 재시도 안내 결과를 위한 변경
- 버튼: 중복 결제 위험 때문에 안내만 제공하는 승인된 결정 유지
- 제외 범위: 자동 결제 재전송, 서버 변경

## 변경 위치

| 파일 | 변경 목적 |
| --- | --- |
| `src/payment/errors.ts` | network 오류 분류 변경 |
| `src/payment/messages.ts` | 재시도 안내 문구 변경 |
| `tests/payment.test.ts` | 결제 오류 검사 관련 변경 |

## 계획·인계

- base / 구현 HEAD: `main` / `def5678`
- 현재 코드 diff: 확인 완료
- `plan.md`, `task-01.md`, `handoff.md`: 로컬 미push, 원격 링크 준비 대기
- 실행 명령·환경·시각: 로컬 `handoff.md`에 기록
- 개별 구현 커밋 ID, 문서 세부 위치, 테스트 변경 상세: 제공 정보 부족

리뷰는 Issue → plan의 공통 맥락·승인 결정 → 현재 diff·task·handoff 순서로 진행한다. 문서의 원격 링크는 아직 확인되지 않았다.

## 확인

현재 HEAD `def5678`의 검증 근거는 부족하다. 이전 커밋의 통과 결과를 현재 HEAD의 통과로 사용할 수 없다.

| AC·사례 | 근거 | 현재 상태·필요 조치 |
| --- | --- | --- |
| AC-01 network→retry | `abc1234`에서 검사 6개 통과 | `def5678` 문구 변경 후 미실행, 현재 HEAD 재검증 필요 |
| AC-02 expired 안내 유지 | 유지 assertion 누락 | assertion 보완 및 실행 필요 |
| 실기기 재현 | 미실행 | 실기기 재현 근거 보완 필요 |

미실행·누락 이유는 제공되지 않았다. 상세 실행 기록은 로컬 `handoff.md`에 있으며, 현재 HEAD 결과가 확보되면 그 근거를 갱신해야 한다.

## 운영·다음 작업

- 전달 방식: 앱 업데이트, 실행 상태 미확인
- 서버 배포·데이터 마이그레이션: 서버·데이터 변경이 없어 해당 없음
- 위험: 중복 결제, 자동 재전송 제외와 안내 전용 버튼 결정 유지 여부 검토 필요
- 롤백: 구현 커밋 revert, 실행 미확인
- 다음 작업: 현재 HEAD network 검증, expired 유지 assertion 보완·실행, 실기기 재현, 로컬 문서와 diff 대조 리뷰
- 승인 범위: 작성·로컬 검토
- 미승인 행동: push, PR 생성, 댓글, 머지, Issue 종료

전달 상태: `review-pending`. PR 본문 초안만 작성했으며 원격 작업은 실행하지 않았다. PR URL과 원격 `headRefOid`는 없고, 제공된 구현 HEAD는 `def5678`이다. 적용 라벨·assignee는 없으며 저장소 라벨과 인증 login은 미확인이다. 현재 HEAD 검증과 리뷰가 남아 있다.
