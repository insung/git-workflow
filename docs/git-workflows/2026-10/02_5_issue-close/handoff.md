# Issue #5 로컬 구현 인계

로컬 구현 완료. 독립 검토 최종 pass나 원격 작업 완료를 뜻하지 않는다. 실제 커밋·stage·push·원격 쓰기·설치 없음.

## 대상과 변경 출처

기준 HEAD: `41d78c0093e568317c7cae89e4de7d1f79e2fb6e`, 브랜치 `feat/issue-close`, base `main`. 기존 worktree의 별도 git-dir와 공통 git-dir를 확인했고 submodule 없음. 초기 index 변경 없음. 지정 작업본에는 AGENTS.md가 없으며 제공된 사용자 지침을 적용했다.

초기 dirty: README 2종, checker, commit-message, 라우터, execution-boundaries, writing-conventions, pr-merge, package tests. 초기 untracked: 이 계획 디렉토리와 issue-close. 모두 보존했다.
이번 구현: assignee 4파일 추가 수정, commit-message 잔여 문장 삭제, issue-close task 검색 범위·코멘트 게시 확인 보완, 계획/todo·원격 초안·이 handoff 갱신. 초기 digest와 이번 최종 digest 대조는 외부 실행 보고서에 기록했다.

## AC별 자체 검증

아래 경로는 `skills/` 기준이다. 문서 대조는 행동 실행 증거를 대체하지 않는다.

| AC | 구현 위치 | 자체 검증 |
| --- | --- | --- |
| AC-01 | issue-close/SKILL.md §2 | 세 사유·duplicate-of 정적 대조 |
| AC-02 | issue-close/references/closing-comment.md | PR·merge·전체 AC·배포·후속 항목 대조 |
| AC-03 | issue-close/SKILL.md completed 차단 | 미충족·미확인·merge·링크 차단 |
| AC-04 | issue-close/SKILL.md §4 | 재오픈 없이 코멘트 보완 |
| AC-05 | issue-close/SKILL.md §3·5, execution-boundaries | 게시 확인 후 종료·상태 재조회·close-unconfirmed |
| AC-06 | 라우터·pr-merge·README 2종·checker·tests | checker exit 0; Node 22/22 |
| AC-07 | issue-create·pr-create entrypoint/references | @me 생성·추가·실패 유지·재조회·출력 |
| AC-08 | issue-close/SKILL.md §1·차단·출력 | 목록 task 확인·미체크 차단 |
| AC-09 | commit-rule/references/commit-message.md | Claude·Codex 표준 trailer; skills Agent 검색 0건 |

## 실행 증거

- UTC 2026-10-02T02:45:13.298187+00:00; Node v23.11.0; gh 2.101.0.
- `node scripts/check-package.mjs`: exit 0, 구조·manifest·로컬 링크 유효.
- `node --test tests/package.test.mjs`: 22 pass, 0 fail.
- `git diff --check`: exit 0. 수정 diff와 task·사유별 양식을 직접 읽었다.
- GitHub 읽기 조회: 지정 `GH_TOKEN=$(gh auth token --user insung)` 접두어로 Issue 1·2·5와 PR 3 조회 시도. 토큰 미발견/API 연결 실패. 현재 원격 상태 미확인.

## 미실행과 다음 행동

TC-F03/F04, TC-15~18과 04 실제 커밋/push, 05 제목/코멘트/종료 변경 미실행. [원격 준비 초안](remote-drafts.md)은 근거 미확인 상태다. 다음 담당자는 현재 원격 AC/task/merge와 고정 근거를 확인하고 독립 검토를 진행한다. 권한 범위가 마련된 뒤 commit/push/PR과 원격 기록을 각각 수행한다. 미충족·미확인 AC나 미체크 task가 남으면 completed 종료를 보류한다. 공동 작성자 계정 표시도 원격에서 확인해야 한다.

## 구현 재확인

UTC 2026-10-02T09:07:36.670432+00:00: 이전 `final-files.json`과 이번 시작 manifest를 대조해 변경·삭제 0건을 확인했다. AC-01~09와 plan/todo를 다시 대조했고 남은 로컬 기능 구현 없음. 이번에는 plan의 03 완료 표시와 01 todo의 오래된 고정 행 번호 결과만 수정했다. 실행 코드·skills·README 변경 없음.

현재 문서에 `node scripts/check-package.mjs` exit 0, `git diff --check` exit 0. 실행 코드와 테스트 digest가 동일하여 이전 Node 22 pass / 0 fail 로그를 참고했다. 실제 커밋·원격 검증 미실행과 독립 검토 대기는 유지한다.


## AC-05 게시 실패 분기 보완 — 2026-10-02T09:18:03.754378+00:00

독립 행동 검증에서 이미 CLOSED/COMPLETED인 Issue의 결과 코멘트 게시 실패가 정본 상태로 보고되지 않는 사례가 전달되었다. §3 게시 실패·미확인과 §4 이미 닫힌 보완 결과를 §5 재확인에 연결했다. §5는 state·stateReason·게시한 코멘트 중 하나라도 미확인이면 이미 닫힌 Issue에서도 공통 정본 close-unconfirmed로 멈추고 확인하지 못한 항목·게시 오류를 보고한다. 새 상태를 만들지 않았다.

현재 package checker exit 0, diff check exit 0. 문서 분기 정적 대조: CLOSED/COMPLETED + 게시 nonzero + 기존 댓글만 조회 → §3/§4 → §5 → close-unconfirmed. 실제 행동 재검증은 controller 담당으로 미실행이다. 실행 코드 변화 없음; 기존 Node 22/22 로그 참조. 실제 커밋·원격 쓰기 없음.

## 통합 전 미커밋 내용 식별 (과거 기록)

manifest JSON(sort_keys=True) SHA-256: `83014d589981142547f827cfc6aaa3f6bb2e6e59accca06f0c84f52924cb1b22`. handoff 자체는 자기참조 방지를 위해 제외한다. 전체 최종 manifest는 외부 fix-ac05-final-files.json에 보존한다.

| 파일 | SHA-256 |
| --- | --- |
| `README.ko.md` | `75a7e67302b0ea047a651246dc2eefc3059eb6ada9cc49862d15b8b1e31b1d4b` |
| `README.md` | `b0f7bee342ea8a406dca95ae3075ecf3cad241c09ec5f8082bb28eaa8fb84737` |
| `docs/git-workflows/2026-10/02_5_issue-close/01-todos-issue-close-skill.md` | `e928f4420b382263886f5dc0fbf469a8f6a15c9fb2a5b030d99def82472b2295` |
| `docs/git-workflows/2026-10/02_5_issue-close/02-todos-workflow-wiring.md` | `7a5ab550febc28d40db4c0e16b542a77c3338ce679614c86343061f5aa50cff9` |
| `docs/git-workflows/2026-10/02_5_issue-close/03-todos-self-assignee.md` | `88fc2cc86006792ef23b9b5b3178f7f09a4ab9195dd8c39a4f473d3665fac7fc` |
| `docs/git-workflows/2026-10/02_5_issue-close/04-todos-agent-co-author.md` | `28303ff2369ccbdc6d4de717385079566874efac777277526eaef2eba4f01ad2` |
| `docs/git-workflows/2026-10/02_5_issue-close/05-todos-issue-housekeeping.md` | `f786ab969a5c78f5adc7cbfc734eeb1098ef527f09bac23c24e108d58aab16c3` |
| `docs/git-workflows/2026-10/02_5_issue-close/plan.md` | `abaf9c66907e2b656cc5426d5743acfd0cca0fe5c3a75cbdc6436c5bc1d316cf` |
| `docs/git-workflows/2026-10/02_5_issue-close/remote-drafts.md` | `467a66e981ef18fed4479e11cc8fe51985f3cd70f1c24dae096e9cad38671606` |
| `scripts/check-package.mjs` | `8367e8f7311359ba3940d2f19d5d55eaa3335f4daba408db8995c80cba3a1274` |
| `skills/commit-rule/references/commit-message.md` | `f6993537e461db48b22e64041b2439e46c825abee8bee5e75b5d5b03fad0a12a` |
| `skills/git-workflow/SKILL.md` | `e97e97e8d3ea95a7dcdd08a43347fd4709f133d9efb7aad66aff237ec17b628d` |
| `skills/git-workflow/references/execution-boundaries.md` | `51a416fe9a1d33f10e60b6aa2df9aebb94205091e7e72f7b38fc7b65088d7287` |
| `skills/git-workflow/references/writing-conventions.md` | `e03affbb186dbc8a04c7bd464b94153ac1828b634d4c8764caed833277af5146` |
| `skills/issue-close/SKILL.md` | `c78987186732604447fa10ff63d8b6bb918f374fc0fd59aa0be96f745c70b3db` |
| `skills/issue-close/references/closing-comment.md` | `d014e7b335e19eccf08a1144cbc2ee0a94de4b4aca6efb9816ed564a496b2b1c` |
| `skills/issue-create/SKILL.md` | `07c08e9f81dbb4ef202f85037b217efd299488986da39d687d2c234f7951b665` |
| `skills/issue-create/references/issue.md` | `3c5e845e186b214a24858b96791173fe6b79574aa8672b8356ba93b005dd5093` |
| `skills/pr-create/SKILL.md` | `f30b3637163b86a2b4fe7e2e4bddacbf75defc9f41540c4be20b782dd3a28d04` |
| `skills/pr-create/references/pr.md` | `47d9c9073915f99e321bff8dd8eec4f1c3e9a40a249a1e1241b84000c3abc91c` |
| `skills/pr-merge/SKILL.md` | `cc4f05ffb5ca74419de57c64481b0c6e004cc03b93bca357779b191b5403da55` |
| `tests/package.test.mjs` | `e81345c36ba55baf0029b23158daea12c242fc2c332d0b3950a214bcccd6201a` |

## PR 생성 인계 — 2026-10-02

이 절은 위 로컬 구현·재확인 기록의 후속 상태다. 사용자 PR 생성 요청으로 필요한 커밋·push·PR 생성을 진행한다. Issue 변경·종료·머지는 요청 범위에 포함하지 않는다.

| 항목 | 현재 근거 |
| --- | --- |
| Issue 종료 구현 | `b8607c8b8a3e1281df05703652cbbf76999071fc` |
| 실행 계정 담당자 | `2a2f136e3611f009af94161b1c2fd9f3c74f3044` |
| 공동 작성자 규칙 | `9c40286767ce182a23b673c362c909d420698c16` |
| 최신 main 통합 | `9999759ac67f7e3f304e1027b9d1943a31c73c80` — main `493720d`, 버전 0.4.0 유지 |
| 통합 검사 | checker·diff 검사 통과, Node v23.11.0에서 테스트 25 pass / 0 fail |
| 독립 검토 | [공개 검토 결과](review.md): human-review. 통합 전 모의 고유 25개 시나리오 통과, AC-05 보완 후 관련 재실행 통과 |
| 남은 근거 | 통합 HEAD 시나리오 재실행, 실제 GitHub 공동 작성자 표시, Issue 종료/코멘트, 호스트 로딩 |

숨겨진 검토 기준·입력은 처음 승인한 저장소 밖 위치에 보관한다. 최신 main의 검토 기록 공개 규칙에 따라 human-review 문서에는 입력 값·기대 지적·통과 기준을 반입하지 않는다. 과거 기록의 “미실행”은 당시 상태이며 현재 단계의 검사·커밋 결과는 이 절을 따른다.
