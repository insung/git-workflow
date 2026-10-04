# 구현과 PR 리뷰 인계

- Issue: https://github.com/insung/git-workflow/issues/17 / PR: 미생성
- Plan / Todo: [plan](plan.md), [task-01](task-01-cleanup-handoff.md)
- base: `main`의 `89175699cf1299046262786d99767b211762e516`
- 변경 전 실행 소스: `48229b89424e664214d903e9259d91c07e05d83f`
- 구현 소스 commit / 검토 대상: `630870d2a9984ecd03a115959b5782b7e29bb2f8`
- 실행 위치: 프로젝트 `.worktree/issue-close-cleanup`의 리포 루트
- 환경: macOS, zsh, Node `v23.11.0`; 확인 시각: 2026-10-03 14:28 UTC
- 실제 실행 담당: 별도 구현 세션과 실행마다 새 하위 실행자; 판정은 구현 세션의 자기 검증; 조정자가 이후 독립 검증 인수
- 독립 리뷰: 조정자의 별도 고정 입력 검증 대기. 비공개 검토 기준·입력 접근 없음
- spec-it: 이 작업 대상에 manifest/lock 없음

## 사용자 의도와 구현 결과

| AC | 기대 동작 | 구현 경로 | 대응 TC | 구현 결과 |
| --- | --- | --- | --- | --- |
| AC-01 | completed 코멘트 전 정리 확인과 승인·안전 충족 시 실행 | issue-close/SKILL.md의 3단계 | TC-01 | 기존 정리 정본 연결 |
| AC-02 | 종료·머지와 삭제 승인 분리, 동일 승인 재사용 | 같은 3단계 | TC-01·02 | 정확한 대상의 기존 승인 재사용과 미승인 보류 |
| AC-03 | dirty·ignored·후속 commit·다른 사용·관리 도구 보호 | post-merge-cleanup 정본 참조 | TC-03 | 정본 수정 없이 기존 조건 적용 |
| AC-04 | 코멘트·출력에 정리 상태와 근거/이유 | closing-comment.md, SKILL.md 출력 | TC-01~05 | 삭제·이미 없음·보류·실패·미확인·해당 없음 구분 |
| AC-05 | CLOSED도 재오픈 없이 확인·결과 보완 | SKILL.md의 4단계 | TC-04 | 정리 확인 후 누락/변경 결과 보완 |
| AC-06 | 정리와 AC·Issue 상태 구분, 기존 차단 유지 | SKILL.md 3단계와 closing-comment.md | TC-02·05 | 정리 보류 자체 차단 없음; 삭제 AC 미충족은 기존 차단 |
| AC-07 | 행동 검증·회귀·패키지 검사 | 아래 검증 기록 | 전체 | 자기 검증과 독립 리뷰 분리 |

## 계획 대비 차이와 판단

- 구현 변경: `skills/issue-close/SKILL.md`, `skills/issue-close/references/closing-comment.md`만 수정
- 정본인 `skills/pr-merge/references/post-merge-cleanup.md`: 기존 내용 유지
- not planned·duplicate 사유와 양식 및 기존 completed 차단 조건: 유지
- 기존 코멘트가 정리 결과를 담지 않거나 현재 결과와 다르면 승인 범위에서 결과 보완; 같은 결과를 이미 담으면 중복 게시 없음
- `.comments/`: 추적된 17개 파일의 변경 없음, 이번 요청에 포함할 resolved 변경 없음
- `해당 없음`은 작업에서 워크트리를 생성·사용하지 않은 경우로 한정; 식별된 기존 대상의 조회상 부재는 `이미 없음`으로 구분
- 계획 이탈: 없음

## 검증 입력과 실행 방식

실행자에게는 대상 `skills/issue-close/SKILL.md`와 그 참조, 다음 가상 요청만 전달했다. plan/task/기대 결과/다른 실행 결과/비공개 리뷰는 전달하지 않았다. 실제 명령·삭제·원격 코멘트 대신 가상 조회 결과를 사용해 ordered actions, completed 코멘트 초안 필드와 최종 출력 필드를 반환하도록 했다. pass/fail 판정은 구현 세션이 수행했다.

### 요청문 1 — RED1 / GREEN1

```text
Read only target skill skills/issue-close/SKILL.md and its referenced files as needed. Do not read plans, tests, review paths or any other execution results. Simulate skill behavior for each input below, output concrete ordered actions, draft completed comment content and final output fields; use supplied virtual facts as query results, do not execute commands/mutations. Do not judge pass/fail.
A: User authorized Issue #17 completed closure, comment and exact PR worktree cleanup. Issue OPEN, all AC satisfied, no unchecked tasks; PR MERGED with verified mergedAt, mergeCommit and exact head refs; worktree normal linked, clean including ignored, exact approved HEAD, no other users/PRs, protected/base refs excluded. All relevant queries and removal postqueries would succeed.
B: Same facts as A, but user authorized only Issue closure/comment, no cleanup authorization.
C: Issue closure/comment/cleanup authorized, AC fulfilled, PR verified MERGED. Consider separate variants: target worktree dirty; target HEAD gained commits after approved HEAD; shared with other session; Codex managed worktree but unavailable archive tool/metadata. Supply handling for each.
D: Same as A, but Issue already CLOSED with expected COMPLETED reason through automatic merge and lacks completed comment.
E: Issue closure/comment/cleanup authorized, PR MERGED verified. Separate variants: worktree removal errors and postquery shows still present, all AC fulfilled; removal returns ambiguous and postquery fails, all AC fulfilled; one Issue AC explicitly requires worktree removal and target remains present.
```

실행 시 대상 경로는 위 실행 위치 아래의 절대 경로로 지정했다. 공유 문서에는 리포 루트 상대 경로로 표기했다.

### 요청문 2 — RED2 / RED3 / 최종 소스 GREEN

```text
Read only target skill skills/issue-close/SKILL.md and references needed. No plans, tests, review paths or other execution results. Simulate each virtual input; return concrete ordered actions, completed comment draft fields and final output fields. Do not execute commands or judge pass/fail.
A: Completed closure/comment/exact PR worktree cleanup authorized. Issue OPEN, all AC satisfied, no unchecked tasks. PR state MERGED, mergedAt/mergeCommit/head identity verified. Ordinary linked worktree clean incl ignored, exact approved HEAD, no other users/PRs, base/protected refs excluded. Queries, removal, postqueries succeed.
B: A but only closure/comment authorized; cleanup permission absent.
C: Closure/comment/cleanup authorized, AC satisfied and verified merged PR; independently consider dirty worktree, added commits beyond approved HEAD, worktree shared with other session, and Codex managed worktree with absent archive tool/metadata.
D: A but Issue automatically CLOSED with expected COMPLETED reason; completed comment missing.
E: Closure/comment/cleanup authorized, verified merged PR. Independently consider removal command error plus postquery target present and all AC satisfied; removal ambiguous plus failed postquery and all AC satisfied; one explicit removal AC remains unsatisfied because worktree still present.
```

RED3에는 ordered actions, comment/output fields를 간결하게 반환하며 일반 Issue 절차의 상세 설명은 생략하고 판정하지 않도록 출력 길이 지시만 추가했다. 기대 결과는 추가하지 않았다.

## 검증 요약과 증거

| TC | 기대 | RED1 / RED2 / RED3의 실제 | GREEN1의 실제 |
| --- | --- | --- | --- |
| TC-01 / A | 정확한 승인 대상을 코멘트 전에 정리, 사후 조회 | 3회 모두 삭제 단계와 전용 코멘트/출력 필드 없음 | 대상 밖 checkout에서 제거, 목록·경로 부재 확인 후 게시 |
| TC-02 / B | 미승인 삭제 없음, 이유와 다음 행동 기록 | 3회 모두 삭제 없으나 전용 기록 없음 | 보류·승인 없음·대상 승인 확인 기록, AC 충족 시 종료 |
| TC-03 / C | 보존 조건과 관리 도구 제약에서 보존 | 3회 모두 보존하나 정리 절차·전용 기록 없음 | dirty·후속 commit·공유·관리 제약 각각 보류, 이유·인계 기록 |
| TC-04 / D | 재오픈 없이 정리 확인 후 결과 보완 | 3회 모두 재오픈 없으나 정리 확인 없음 | 정리와 사후 조회 후 보완 코멘트, 재오픈/중복 close 없음 |
| TC-05 / E | 삭제 오류/미확인과 AC 미충족 구분 | 3회 모두 삭제 AC 차단 유지, 정리 처리·전용 기록 없음 | 실패와 미확인 각각 기록, Issue 상태와 구분, 삭제 AC 미충족 차단 |

RED는 5사례 각 3회 모두 새 요건 전체를 충족하지 못해 각 TC 0/3이다. 기존 승인 경계·completed 차단만 유지한 것을 새 요건 전체의 통과와 구분했다. GREEN1은 새 실행자 `green_run1`이 `3e41cfa`의 소스로 실행했으며 각 TC 1/1 통과다. 이 결과는 후속 `해당 없음` 문구 명확화 전 소스의 이력이며 최종 소스 결과로 사용하지 않는다. `630870d` 최종 소스의 새 GREEN 실행은 아래에 별도 기록한다.

### 최종 소스의 GREEN

- 실행자: 새 `green_new1`, `630870d`의 source, 요청문 2로 가상 시나리오 실행
- 시각: 2026-10-03 14:23 UTC 이후 실행, 14:28 UTC 기록; 플랫폼 FINAL 반환 확인
- 출력 길이 지시: ordered actions, comment/output fields의 간결한 반환, 일반 Issue 절차 상세 설명 생략, 판정 금지; 기대 결과 전달 없음
- 결과: A는 대상 밖 checkout에서 안전 재조회 후 제거·목록/경로 사후 확인·코멘트·종료 순서; B는 승인 없음의 보류와 다음 행동을 기록하면서 승인된 종료 진행; C 각 변형은 보존과 관리 도구 인계; D는 재오픈/중복 close 없이 정리 확인 후 댓글 보완; E는 실패/미확인과 Issue 확인 상태를 구분하며 삭제 AC 미충족은 completed 차단
- 판정: TC-01~05 각각 1/1 통과. 기본 3회 중 나머지 2회는 새 실행자 spawn의 `agent thread limit reached`로 미실행; 최종 소스 3/3 통과로 기록하지 않음
- 완료 조건: plan 단계·task 작업 3은 미체크. 소스 구현은 고정했고 필수 실행 보완과 독립 리뷰를 조정자에게 인계
- 과거 실행자 재사용 없음. 슬롯 재시도 중 기대 결과·비공개 입력을 전달하거나 읽지 않음

| 검사 | 명령·위치 | 실제 | 소스·시각 |
| --- | --- | --- | --- |
| TC-F01 | `node --test tests/*.test.mjs`, 리포 루트 | 29/29, exit 0 | `630870d`와 같은 2파일 patch, 2026-10-03 14:23 UTC |
| TC-F02 | `node scripts/check-package.mjs`, 리포 루트 | 패키지·상대 링크 정상, exit 0 | 같은 소스·시각 |
| TC-F02 | `git diff --check`, 리포 루트 | 공백 오류 없음, exit 0 | 같은 소스·시각 |

## 커밋과 문서 상태

- 구현 commit: `3e41cfafd18320333e1d38ac705b3ccca1b4a3ee`
- 상태 구분 명확화 commit: `630870d2a9984ecd03a115959b5782b7e29bb2f8`
- 문서-only 후속 commit: 이 handoff와 plan/task 검증 기록만 별도 커밋; 자기 hash는 이 문서에 넣지 않음
- 확인된 원격 문서: Issue URL만 확인. 구현 문서는 로컬 상태이며 원격 고정 링크 미생성

## 위험·배포·롤백

- 실제 자원 삭제·원격 Issue 댓글·push·PR·merge·설치·Release 실행 없음
- 행동 검증은 가상 상태 시뮬레이션이며 실제 GitHub·관리 도구·파일시스템 삭제 실행 근거가 아님
- 구현 세션의 Issue 조회는 insung OAuth token 없음과 네트워크 오류로 실패; 조정자가 확인한 Issue AC 전달을 public plan과 함께 적용
- source commit의 해당 2파일 역패치로 롤백 가능. 다른 작업 보존
- 후속 push·PR·merge·설치·실제 자원 삭제는 별도 승인 범위

## 다음 검토

- 고정 소스 `630870d`에 대한 조정자의 별도 고정 입력과 독립 판정
- 위 로컬 회귀 명령 재현; 최종 문서-only 커밋과 소스 검증을 구분
- 미실행 자기 GREEN 2회와 독립 판정 보완 필요. 슬롯 한도를 우회한 기존 실행자 재사용 없이 새 실행자로 진행

## 조정자 보완

- 인계 base 표기를 실제 작업 base 8917569로 정정했다. 제품 소스는 변경하지 않았다.
- 최종 소스의 독립 검증은 [review.md](review.md)에 기록한다. 구현자 자기 GREEN의 1/3 및 미실행 2회 이력은 유지하며 독립 실행으로 소급하지 않는다.


## 2026-10-04 단계02 추가 인계: 머지 시 기본 작업 worktree 정리

이 항목은 이전 단계의 실행·검토 이력을 보존하는 추가 기록이다. 최신 요청 변경의 승인 의미와 소스는 아래 항목을 적용한다.

- Issue: https://github.com/insung/git-workflow/issues/17; PR 생성·push 없음.
- Plan / Todo: [plan.md](plan.md), [task-02-merge-cleanup-default.md](task-02-merge-cleanup-default.md); 단계02 검증 미완료.
- base: main; 변경 전 소스 `9421fb31c6bfb7560815e5f76ad89c6b6444e3cb`; 최종 소스 `2a78df7cdf2ce8bc0ed7bfbf8fc027cb73417817`.
- 담당: 별도 구현 세션. 비공개 검토 기준·검증 입력 및 review 브랜치를 읽지 않았고 독립 판정을 대신하지 않음.
- 확인 시각: 2026-10-04T00:28:29Z. 실행 위치: 해당 작업 worktree의 리포 루트, macOS/zsh, 기존 node 런타임.

| AC / TC | 기대 | 구현·실제 상태 |
| --- | --- | --- |
| AC-02·08·10 / TC-06 | PR 머지 승인·실제 MERGED·정확한 clean 안전 대상이면 반복 승인 없이 worktree 제거·사후 조회, branch/댓글 별도 | pr-merge 정본과 entrypoint에 구현 `2a78df7`; 행동 실행 미확인 |
| AC-09 / TC-07 | 결과 조회만 또는 명시적 보존 요청이면 삭제 없음 | 동일 소스에 예외 구현; 행동 실행 미확인 |
| AC-03·08 / TC-08 | dirty·후속 커밋·다른 세션 사용·queue는 보존 | 기존 손실 방지 조건을 유지; 행동 실행 미확인 |
| AC-02·07 / TC-09 | 종료만 승인해도 미삭제, 기존 머지 정리 권한 재사용 | issue-close 연결 구현; 행동 실행 미확인, 구조·회귀 통과 |

### 구현자 시나리오 요청과 실행 한계

각 실행은 새 하위 실행자에게 아래 세 파일과 같은 요청문만 전달하도록 구성했다. 기대 결과나 다른 실행 결과를 전달하지 않았다.
대상: `skills/pr-merge/SKILL.md`, `skills/pr-merge/references/post-merge-cleanup.md`, `skills/issue-close/SKILL.md`. 링크 파일·plan·review를 추가로 읽지 않고 가상 행동만 반환, 총 400단어 이하, pass/fail 판단 금지.

공개 요청문: 모든 사례의 공통 사실은 검토한 PR17 HEAD h17, 정확한 일반 linked worktree `/fiction/project/.worktree/pr17` at h17, 올바른 PR/remote 대응, ignored 파일 없음, 다른 보존 조건 충족, 보존된 checkout에서 실행이다. A: 머지 명시 승인, MERGED+mergedAt+mergeCommit, clean 대상, 별도 정리 표현 없음. B: 결과 조회만 요청, 같은 MERGED+clean. C: 머지 승인과 worktree 명시 보존, 같은 MERGED+clean. D: 머지 승인+MERGED, staged/untracked 변경. E: 머지 승인+MERGED, 후속 h18. F: 머지 승인+MERGED, 다른 세션 사용. G: 머지 승인, queue 등록만 확인. H: completed Issue 종료/댓글만 승인, 이전 MERGED, 머지/정리 승인 없음. I: issue-close에 정확한 PR/HEAD 머지 및 worktree 정리 권한 인계, MERGED+clean+안전, 종료/댓글 별도 승인. 각 사례의 worktree·local/remote branch·댓글 행동을 반환한다.

- RED `9421fb3`: 기본 3회 모두 미실행. 첫 실행자 신규 spawn을 세 번 시도했으나 모두 `agent thread limit reached`. 조정자가 완료 실행자 interrupt 후 재시도해도 동일. 실행자가 생성되지 않았으므로 통과/실패 횟수를 만들지 않음.
- GREEN `2a78df7`: 기본 3회 모두 미실행. 첫 신규 spawn도 같은 한도로 실패. 이전 실행자를 재사용하지 않음.
- 계획 이탈: 행동 검증이 환경 한도로 미실행이므로 작업3·단계02 완료 체크를 하지 않고 root의 별도 독립 입력 실행에 인계. 구현자의 자기 반복 완료로 소급하지 않음.

### 명령 검증과 소스 동결

| 명령 | 실제 결과 | 대상 |
| --- | --- | --- |
| `node --test tests/*.test.mjs` | 29/29 pass, fail 0 | 최종 3파일 작업본, 바로 뒤 소스 `2a78df7`로 동결 |
| `node scripts/check-package.mjs` | Package structure valid; semantic review/host loading은 검사하지 않음 | 동일 소스 |
| `git diff --check` | exit 0, 공백 오류 없음 | 동일 소스 |

소스 커밋은 세 대상 파일만 포함한다. 기존 tracked `.comments`에 변경이 없어 추가 대상이 없었다. 이후 변경은 plan/task/handoff 기록뿐이며 소스를 다시 바꾸지 않았다. 실제 자원 삭제·머지·push·PR·네트워크 댓글·설치 없음. 원격 docs 링크는 게시되지 않은 로컬 문서 상태다. 후속 독립 검증과 사용자 승인 후 머지는 조정자에 인계한다. 롤백은 해당 3파일 변경만 역패치한다.

## 요청 변경의 독립 검토 인계

제품 소스 2a78df7의 root 직접 회귀 29/29·패키지·diff 검사와 고정 입력 독립 GREEN 21/21은 [review.md 최신 절](review.md#2026-10-04-머지-시-기본-정리-검토)에 기록한다. 구현자 자기 RED/GREEN 0/3 미실행을 덮어쓰지 않는다.


## 단계03 종료 삭제 확인 인계 (2026-10-04)

- Issue: https://github.com/insung/git-workflow/issues/17
- PR: https://github.com/insung/git-workflow/pull/18 (이미 생성된 PR, 이번 단계 원격 변경 없음)
- Plan / Todo: [plan](plan.md), [단계03](task-03-close-cleanup-prompt.md)
- base / 변경 전 / 소스 동결: main / `46124e495676268a05fac68ab06ecb6d7802034a` / `8d4e544defdec58d89cbad8b74de9c25d552af98`
- 실행 담당: 단계03 별도 구현 세션. 비공개 검토 기준·입력·리뷰 파일/브랜치 미열람

| AC / TC | 구현 결과 | 실제 검증 |
| --- | --- | --- |
| AC-11 / TC-10 | 안전한 정확한 존재 대상에 정리 권한이 없으면 식별값·안전 상태 제시 후 삭제 질문 | 행동 미실행 |
| AC-12 / TC-11 | yes 이후 실행 직전 재확인, no는 보류·삭제 거절, 무응답은 보류·승인 대기 | 행동 미실행 |
| AC-02·03·12 / TC-12 | 같은 대상 승인 재사용, 이미 없음 질문 생략, 보존 제약 우회 없음 | 행동 미실행 |
| AC-07 / TC-F03 | 회귀·구조·공백 검사 | 29/29·패키지·공백 통과 |

### 구현자 행동 실행 요청과 한계

RED 새 실행자 생성은 1회 시도했고 `agent thread limit reached`로 실패했다. RED `46124e4`의 3회와 GREEN `8d4e544`의 3회는 모두 미실행이다. 재시도·실행자 재사용·자기 행동 판정으로 대체하지 않았다. 단계03 완료 체크는 유지하지 않는다.

실행자에게 준비한 입력은 다음과 같다. 기대 결과나 다른 실행 결과는 전달하지 않았다.

> 스킬 행동 실행만 수행하고 판정하지 않는다. issue-close 스킬과 연결된 공통 경계·정리·코멘트 참조만 읽는다. 다른 문서나 review 파일/브랜치는 읽지 않는다. 실제 도구/삭제/원격 변경을 실행하지 않고 다음 가상 입력에 대한 응답과 행동 순서를 반환한다. Issue #71 모든 AC 충족, 작업 삭제는 AC 아님, PR #72의 MERGED·mergedAt·mergeCommit 확인 완료. 종료·결과 댓글만 승인됐으며 머지나 정리 승인은 없다. 일반 linked worktree는 `/tmp/demo/project/.worktree/fix-71`, branch fix/71, HEAD abc123이며 PR 승인 HEAD와 정확히 대응한다. 보호·소유·사용·dirty·ignored·안전 위치 및 대응 조회가 모두 성공했고 안전하며 대상이 존재한다. 이후 yes·no·무응답 각각의 다음 행동도 작성한다. 별도 사례: 같은 정확한 대상의 정리 승인이 이미 있거나 부재 조회가 성공한 경우, dirty 또는 대상 대응 미확인 경우의 행동.

### 명령 근거와 다음 검토

2026-10-04 KST, 대상 작업 worktree 루트에서 Node의 기존 `tests/*.test.mjs`를 실행했다. 소스 변경 후 커밋 직전 작업본(동결 소스 `8d4e544`와 동일)에서 `node --test tests/*.test.mjs`는 29/29, `node scripts/check-package.mjs`는 구조·상대 링크 통과, `git diff --check`는 통과했다. 구조 검사는 스킬 행동·호스트 로딩을 증명하지 않는다.

소스 커밋에는 issue-close SKILL과 closing-comment만 포함했다. .comments 변경은 없었다. pr-merge 정본·기본 정리 권한은 수정하지 않았다. 실제 삭제·설치·push·PR 수정·원격 댓글은 실행하지 않았다. 이후 변경은 plan·task·handoff의 문서 기록뿐이다.

PR #18 후속 본문 인계: 안전한 미승인 worktree는 정확한 대상 삭제 여부를 질문하고 답변 전 보류한다. 명시적 승인 뒤 안전 상태를 재확인하고, 거절·무응답은 보존과 이유를 기록한다. 같은 승인·이미 없음은 반복 질문하지 않는다. 로컬 회귀 29/29와 패키지·공백 통과, 행동 RED/GREEN 미실행을 함께 명시한다. 원격 본문 반영은 조정자 후속 범위다.

독립 검토는 소스 `8d4e544`를 기준으로 TC-10~12 행동을 별도 실행해야 한다. 문서-only 커밋은 소스 검증 대상을 변경하지 않는다. 롤백은 이 소스 커밋의 두 파일 변경만 역패치하며 다른 작업을 보존한다.
