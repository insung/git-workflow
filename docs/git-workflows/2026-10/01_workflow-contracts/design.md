# Issue 기반 작업 문서와 스킬 계약

2026-10-01 사용자 요청의 1–8 항목과 Sideband 코멘트 3개를 대상으로 한다. 이전 후보는 단계 분리만 제공했고 계획·todo 경로, 제목 규칙의 정본, 상세 양식과 문서 링크, 라벨 선택 계약이 부족했다.

## 승인된 방향

- 플러그인 git-workflow를 유지한다. 정식 스킬은 git-workflow, issue-create, plan-create, pr-create, pr-review, pr-merge, commit-rule, git-release다.
- 공통 type·scope는 skills/git-workflow/references/change-conventions.md, 공통 문체는 writing-conventions.md에 둔다. 사용자의 최신 본문 경로를 코멘트의 루트 references 제안보다 우선한다.
- issue-create는 기존 Issue 조회·보완·생성을, plan-create는 계획/todo 작성을 담당한다. git-workflow는 계획/todo에 따라 구현·테스트·commit-rule 적용을 조율한다. pr-create는 구현 후 PR 준비를 담당한다. 새 구현 전용 스킬은 추가하지 않는다.
- 대상 리포 docs/git-workflows/{yyyy-MM}/{dd}_{issue-number}_{title}/에 plan.md와 todos.md 또는 01-todos.md 등을 기록한다. 구현 배경과 사용자 의도, 단계 흐름, 검증 및 배포·롤백 계획을 필수화한다. 배포가 없으면 이유와 플러그인 발행 등 실제 전달 절차를 적는다.
- 테스트와 완료 증거는 작성자 주장 대신 실제 diff·commit·실행 identity와 대조한다. 정책은 대상 프로젝트가 고정한 spec-it을 읽으며 복제하지 않는다.
- 기존 상세 references에 양식을 통합한다. 얕은 templates/ 파일은 제거한다. plan/todo와 구현 인계·리뷰·Wiki의 작성 계약은 각 담당 스킬의 references/로 제공한다.
- Issue/PR 진행 기록은 핵심 요약과 접근 가능한 문서 링크로 작성한다. untracked 문서에는 확인되지 않은 GitHub URL을 붙이지 않는다. 댓글 게시도 사용자 요청에 포함된 범위에서 수행한다.
- 라벨은 저장소의 기존 이름과 자동화 분류를 먼저 확인하고, 필요한 변경 성격과 보류 사유만 선택한다. 없는 라벨은 필요·생성 범위·권한을 확인해 만들며 강제 갱신하거나 전체 목록을 일괄 생성하지 않는다.
- .superpowers/는 임시 실행 자료이며 추적 파일이 없으므로 루트 ignore에 추가한다. 공유 계획·결정·증거는 docs/에 보존한다.

## 호환성과 범위

2026-10-01 후속 요청에 따라 이동된 옛 파일과 호환 안내를 제거한다. skills/git-commit/SKILL.md와 skills/git-workflow/references/issue.md는 삭제하며 정식 skills/commit-rule/SKILL.md를 유지한다. plan/todo 정본은 새 plan-create로 분리한다. 댓글 답변 이벤트는 보존하지만 Sideband는 파일 경로 이관을 지원하지 않아 이동 전 경로의 댓글 앵커는 파일 없음으로 남을 수 있다. 기존 예시는 README에 유지한다.

이번 변경은 instruction 패키지와 로컬 검증만 포함한다. 자동 실행기·CI 강제·클라우드 배포·실제 GitHub 게시·설치 캐시 갱신은 포함하지 않는다. 커밋까지 처리하는 향후 시나리오는 지원하지만 이번 프로젝트 변경 자체의 커밋·push는 별도 요청이 없으므로 수행하지 않는다.
