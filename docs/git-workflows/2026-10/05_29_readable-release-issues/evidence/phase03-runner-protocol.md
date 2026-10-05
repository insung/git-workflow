# 실행자 전달 입력

요청 본문은 [pr-self-input](pr-self-input.md)이다. 모든 실행은 같은 요청 파일을 읽는다. 실행자에게 기대 결과·다른 실행 출력·판정 기준을 제공하지 않는다.

실제 전달문:

> 대상 스킬 <경로>/skills/pr-create/SKILL.md를 읽고 연결 참조의 작성 규칙을 적용하세요. 요청 파일 <작업 디렉토리>/evidence/pr-self-input.md의 요청만 수행하고 판정하지 마세요. 출력은 final에 본문과 전달 상태로 반환하세요. final과 동일 원문을 요청파일과 같은 evidence 디렉토리의 pr-self-<단계>-<번호>.md에 저장하세요. 다른 파일 수정은 하지 마세요.

RED1은 실제 변경 전 구현 worktree의 스킬을 읽었다. RED2·3은 동일 HEAD 394e4e2에서 `git archive 394e4e2 skills`로 추출한 스킬 전용 임시 복사본을 읽는다. 문서·review 브랜치·숨긴 자료는 임시 복사본에 포함하지 않는다. RED2·3의 실행 시점은 구현 후이며 변경 전 순서 요건을 충족한 실행으로 소급하지 않는다.

interim GREEN1은 공통 사실 보완 전 스킬을 읽었으며 최종 횟수에서 제외한다. 최종 GREEN은 phase03-implementation.patch와 pr-green-source-sha256의 스킬을 읽는다. 각 호출은 fork_turns=none의 fresh 실행자다. child concurrency 한도로 일부 spawn이 거절됐으나 이전 실행 종료 후 재시도한다.

실행자에게 가상 작업의 원격 동작·파일 수정을 금지한 요청이므로 증거 파일 저장만 별도 허용한다. RED1은 final 반환만 수행했고 구현자가 원문을 증거 파일에 저장했다. 이후 실행자는 동일 final을 지정된 증거 파일에 저장한다.
