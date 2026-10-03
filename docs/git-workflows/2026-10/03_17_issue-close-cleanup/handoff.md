# 구현과 PR 리뷰 인계

- Issue: https://github.com/insung/git-workflow/issues/17 / PR: 미생성
- Plan / Todo: [plan](plan.md), [task-01](task-01-cleanup-handoff.md)
- base: `main`의 `9bc8d1724a8bc2dee6a4643ec146906cbe9b37bd`
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
