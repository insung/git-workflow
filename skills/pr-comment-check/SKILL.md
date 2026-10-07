---
name: pr-comment-check
description: '“PR 댓글에 남은 요청을 확인해줘”, “연결 Issue 코멘트가 반영됐는지 확인해줘”처럼 코멘트 조회와 처리 상태 확인만 요청할 때 사용한다. 전체 PR 리뷰나 댓글 게시·resolve·머지를 대신하지 않는다.'
---

# PR 코멘트 확인

[공통 실행 경계](../git-workflow/references/execution-boundaries.md)를 적용한다.
실제 PR과 연결 Issue를 확인하고 [공통 코멘트 확인](../git-workflow/references/pr-comment-check.md)을 실행한다.

그 절차의 대상·페이지 완전성·HEAD/조회 시각, 코멘트별 요청·반영 근거·합의·남은 판단·다음 행동을 대화로 반환한다. 조회 미완료와 HEAD 변경은 미확인으로 보고하며 코멘트 없음이나 현재 HEAD의 pass를 만들지 않는다.
전체 검토가 필요하면 [pr-review](../pr-review/SKILL.md), 승인된 머지는 [pr-merge](../pr-merge/SKILL.md)로 인계한다. 읽기 요청은 구현·게시·스레드 resolve·머지의 승인이 아니다.
