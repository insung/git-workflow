# 구현 서브에이전트 지시문 초안

상태: 2026-10-02 사용자 승인으로 구현 실행 대기 해제. 로컬 구현 및 부모 독립 검증만 승인되었으며 커밋·push·PR·원격 댓글은 제외. 구현 인계 및 부모의 로컬 독립 대조 완료. 결과는 review.md에 기록.

```text
Issue #6의 PR 검토 댓글 규칙을 구현한다.

작업 디렉토리:
git-workflow 프로젝트의 .worktree/pr-review-comment-rules (로컬 작업 위치)
작업 브랜치: feat/pr-review-comment-rules
PR 대상 브랜치: main
Issue: https://github.com/insung/git-workflow/issues/6
계획: docs/git-workflows/2026-10/02_6_pr-review-comments/plan.md

먼저 대상 worktree의 skills/git-workflow/SKILL.md, 공통 execution-boundaries,
현재 Issue 본문, plan과 01→02→03 todo를 읽는다. 설치 캐시나 다른 작업 브랜치의
스킬 규칙으로 대체하지 않는다. Issue 읽기용 gh는 반드시
GH_TOKEN=$(gh auth token --user insung) 접두사를 사용한다. gh auth switch 금지.

작업 시작 전 branch·HEAD·staged/unstaged·untracked를 확인한다.
계획 문서는 부모 세션이 만든 입력이다. 기존 dirty/index와 다른 세션 작업을 보존한다.
다른 worktree는 수정하지 않는다. feat/issue-close의 closing-comment.md는
Issue #5와의 경계 확인을 위해 읽기만 허용한다.

01→02→03 순서로 승인된 계획 범위의 스킬/reference와 검사 파일을 수정한다.
공통 원격 기록 형태의 정본은 document-links.md 하나에 둔다.
PR 전용 양식은 skills/pr-review/references/pr-comment.md에 두고 스킬에서 연결한다.
현재 main에 없는 issue-close 파일을 필수 링크로 추가하지 않는다.
PR 생성·머지 승인으로 댓글 승인을 추정하지 않는다.

각 단계 검증은 자체 시나리오로 수행한다. 변경 전·후 동작과 유지 동작을 구분하고
실행 안 한 결과를 pass로 적지 않는다. 댓글 도구 응답은 mock으로 제공하며
실제 GitHub 게시·수정·머지·PR 생성은 실행하지 않는다.
기존 패키지 검사·node --test tests/package.test.mjs·git diff --check를 실행한다.
신규 reference 누락 테스트는 완전 fixture와 누락 fixture를 대조한다.
패키지 통과만으로 댓글 규칙의 의미 검증이 끝났다고 하지 않는다.

리뷰 전용 디렉토리·review-criteria.md·review-input-* 파일은 읽거나 수정하지 않는다.
부모가 보관한 기준·입력은 독립 리뷰용이다. 자체 입력 결과만 handoff에 기록한다.
별도 에이전트·모델 호출, 재위임도 하지 않는다.

todo의 처리 내용·검증 결과와 plan의 상태·결정/이탈 기록을 갱신한다.
완료한 작업에는 미커밋 상태와 작업본 digest를 적고 가짜 commit을 만들지 않는다.
handoff.md는 skills/pr-create/references/handoff.md를 따라 실제 변경·AC별 근거·
명령·cwd·HEAD·미커밋 변경 patch/digest·환경·시각·결과·미확인을 기록한다.
독립 review.md를 작성하거나 리뷰 pass를 스스로 선언하지 않는다.
plan은 구현 인계 시 review-pending으로 두며 completed로 표시하지 않는다.

금지: 커밋, push, PR 생성, GitHub Issue/PR 본문·댓글·라벨 쓰기, 머지,
배포, Release, 버전 변경, 다른 세션 파일 reset/clean, 독립 리뷰 자료 접근.
중대한 새 설계 결정이나 계획 밖 변경이 필요하면 해당 단계만 보류하고 부모에게 알린다.

반환: 변경 파일, AC별 자체 검증 결과, 실행 증거, 미실행·위험·계획 이탈,
로컬 handoff 경로, 현재 HEAD·작업본 digest·git status.
```
