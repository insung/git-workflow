# PR 작성 자기 시나리오 요청

아래 가상 기록으로 PR 본문 초안을 작성해줘. 원격 명령·파일 수정 없이 본문과 전달 상태만 반환해줘. 제공한 사실을 사용하고 부족한 정보는 그대로 표시해줘.

가상 저장소의 기존 PR 템플릿 절 이름은 `관련 작업`, `변경`, `변경 위치`, `계획·인계`, `확인`, `운영·다음 작업`이다. 실제 원격 Issue https://github.com/example/billing/issues/48 을 확인했고 이 PR은 AC-01 network 안내와 AC-02 expired 안내 유지 범위를 다룬다. Issue 종료는 현재 승인 범위에 없다.

network 오류에서는 사용자가 재시도 방법을 읽을 수 있도록 안내 문구와 오류 분류를 변경했다. expired 오류에서는 기존 안내를 유지하는 범위다. 자동 결제 재전송과 서버 변경은 제외했다. 중복 결제 위험 때문에 버튼은 안내만 제공한다는 결정이 승인됐다. 분류 수정·문구 수정·설명 보완 커밋이 각각 있으나 같은 사용자 결과를 위한 변경이다. 변경 위치는 src/payment/errors.ts, src/payment/messages.ts, tests/payment.test.ts다.

base는 main, 현재 구현 HEAD는 def5678이다. abc1234에서 network→retry 검사 6개가 통과했으나 def5678에서는 문구가 다시 변경됐다. 현재 HEAD network 검사는 미실행이고 expired 유지 assertion은 누락이다. 실기기 재현도 미실행이다. plan.md/task-01.md/handoff.md는 로컬 미push이므로 확인된 원격 문서 링크가 없다. 상세 명령·환경·시각은 로컬 handoff.md에 기록돼 있다. 현재 코드 diff는 확인했다.

전달은 앱 업데이트다. 서버 배포·데이터 마이그레이션은 변경 범위에 없어 해당하지 않는다. 롤백은 구현 커밋 revert이며 실행 미확인이다. 작성과 로컬 검토만 승인됐고 push·PR 생성·댓글·머지·Issue 종료는 승인되지 않았다.
