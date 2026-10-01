---
name: commit-rule
description: “커밋해줘”, “커밋을 나눠줘”, “커밋 메시지를 검토해줘”처럼 커밋 실행이나 메시지·변경 범위 검토를 요청할 때 사용한다.
---

# 커밋 규칙

[공통 실행 경계](../git-workflow/references/execution-boundaries.md)를 적용한다.

1. [커밋 범위](references/scope.md)에 따라 이번 요청의 변경과 기존 index를 확인한다.
   혼합·출처 불명 변경은 해당 분리 절차를 적용한다.
2. [공통 변경 표기](../git-workflow/references/change-conventions.md)와 [커밋 메시지](references/commit-message.md)에 따라 주제별 메시지를 준비한다.
   본문 작성 시 [공통 문체](../git-workflow/references/writing-conventions.md)를 따른다.
3. 필요한 검사를 실행하고 staged diff를 확인한다.
   메시지나 범위 검토만 요청됐으면 결과를 반환하고 커밋하지 않는다.
4. 커밋이 요청됐으면 승인된 범위만 커밋한다.
   AGENTS.md에 댓글 포함 규칙이 있으면 댓글 상태와 추적 여부를 확인한다.
   승인되지 않은 열린 스레드의 포함은 사용자에게 확인한다.
5. 실제 커밋 hash와 남은 작업본·index 변경을 확인한다.
   인계 문서에 결과를 기록하고 다른 작업의 변경이 보존됐는지 확인한다.

커밋 요청을 push나 PR 생성 권한으로 확대하지 않는다.
자기 hash를 문서에 넣기 위한 amend 반복은 하지 않는다.
