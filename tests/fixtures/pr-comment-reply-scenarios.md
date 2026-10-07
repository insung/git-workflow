# 수정 결과 회신의 공개 모의 입력

대상 스킬과 연결된 관련 참조만 읽고 각 사례의 실행 순서·사용자 반환 및 필요한 답글 초안을 작성한다. 수정·실제 원격 조회/게시/resolve/머지는 하지 않는다. 아래 자료는 모의 API 응답이며 URL도 fixture다. 입력 밖 URL·commit·시각·검증·작성 AI를 만들지 않는다. 평가는 하지 않는다. 출력은 사례별 행동·사용할 대상·확인할 근거·최종 반환의 한 표와 1~3의 짧은 답글 초안이다.

모든 사례: repo example/repo, PR 7. 리뷰 최상위 코멘트 100(URL https://github.com/example/repo/pull/7#discussion_r100), thread T100. reply 101에는 in_reply_to_id 100. 조회된 실행 계정 insung. A=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa, B=bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb. AI 도구 Codex 확인, 모델명 미확인. 원문 '원고 구조를 네 단계로 바꾸고 문장을 다듬어줘'. HEAD A. 원격 commit A(URL https://github.com/example/repo/commit/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa)와 현재 원고 링크 https://github.com/example/repo/blob/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/chapter.md는 조회 성공. 해당 원고에서 네 단계와 문장 수정 확인. 검증은 HEAD A 원고 검사 42/42·앵커 검사3/3, 모의조회 시각 2026-10-07T10:00:00Z. 독립 리뷰 없음. resolve/머지 승인은 없음. 입력에 없으면 증거 없음.

| 사례 | 사용자 요청과 도구 응답 |
| --- | --- |
| 1 반영과 회신 | 반영하고 원래 스레드에 결과 회신해줘. 새 답글 승인. 댓글·답글 모든 페이지 조회 완료 기존 회신 없음. POST 응답 id101 URL https://github.com/example/repo/pull/7#discussion_r101. 이후 GET는 준비한 본문·author insung·in_reply_to_id100·PR7 정확히 반환 |
| 2 부분 반영 | 부분 반영 상태와 다음 판단도 회신해줘. 구조 네 단계만 현재 원고·commit A에서 확인; 문장 변경 미반영. 검증은 구조42/42, 문장 의미 검토 미실행. 이유: 표현 방향 사용자 결정 필요. 기존 답글 없음, 게시·read-back 성공 |
| 3 미반영 | 이번에는 수정하지 못한 이유를 스레드에 알려줘. 충돌한 두 요구의 우선순위 미합의로 변경 없음. 반영 commit·원고 변경 링크·실행 검증 없음. 현재 PR HEAD A는 여전히 확인. 기존 회신 없음, 게시·read-back 성공 |
| 4 동일 회신 | 반영과 회신 요청. 모든 페이지 조회, 동일 스레드·HEAD A·요청 범위·결과·근거·확인된 작성주체 Codex의 기존 reply101 본문이 의미상 동일. 기존URL도 확인. 차이는 공백만 |
| 5 같은 계정 인간 답글 | 반영과 회신 요청, 인간이 작성한 reply101 author insung '나중에 다시 보자'. Codex 작성 이력 없음. 작성 계정은 동일. 원고 변경·검증은 공통 자료대로. 새 회신 게시/read-back 성공. 기존 인간댓글 수정승인 없음 |
| 6 게시 timeout이나 저장 확인 | 회신 승인. POST timeout. 재조회 모든 페이지에서 대상·HEAD·본문·작성주체가 일치하는 reply101 및 URL 확인. GET 저장본문도 일치 |
| 7 게시·재조회 모두 불명 | 회신 승인. POST timeout. 재조회 스레드 두 번째 페이지 timeout, reply GET 불가. 게시 여부 확인 불가 |
| 8 HEAD 변경 | 수정 결과 회신 승인 대상 HEAD A. 게시 직전 HEAD B. B 내용·검증 없음. 원래스레드 유지, 새HEAD 승인 없음 |
| 9 read-back 불일치 | 회신 승인. POST201 id101·URL 반환. GET 저장 본문은 요청한 본문과 다름(부분 반영인데 '전부 완료'로 저장됨). 추가 수정 승인 없음 |
| 10 읽기·머지만 요청 | 독립적으로 (a)코멘트만 확인해줘 (b)PR A를 승인한 방식으로 머지해줘. 회신/댓글 게시 승인 없음. A 구현·검증은 공통자료, 새중요요청 없음. 두 요청 각각 회신 절차의 허용 행동·반환을 적되 이 모의 실행에서는 머지도 실제 실행하지 않음 |
