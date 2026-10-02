# 구현과 PR 리뷰 인계

- Issue: https://github.com/insung/git-workflow/issues/6 / PR 미생성
- Plan: [plan](plan.md), 단계 01→02→03 자체 완료, review-pending
- Todo: [01](01-todos-comment-contract.md), [02](02-todos-skill-integration.md), [03](03-todos-comment-validation.md)
- base: main / 브랜치: feat/pr-review-comment-rules / 구현·검토 기준 HEAD: e7da6045004289c3f3c9f2b1654d841bc2a90f6b
- 미커밋 구현 7파일 SHA-256: `4654d9f39d414b3c30694cbac3f1fb1a57eac198fc0a3431aebf960bea195e97` / 확인 시각: 2026-10-02T14:23:25.254125+00:00
- digest 방식: 파일 경로를 정렬하고 각 UTF-8 경로 + NUL + 바이트 길이 + NUL + 파일 bytes를 연결해 SHA-256. 아래 구현 7파일 대상이며 plan/todo/handoff·지시문은 제외한다. HEAD만으로 작업본을 식별하지 않는다.
- 실제 담당: 구현 서브에이전트. 자체 규칙 대조만 수행; 부모 독립 검증 대기. 독립 자료 미열람·review.md 미작성.
- spec-it: 미채택(기준 HEAD에 manifest/lock 없음).

## 사용자 의도와 구현 결과

| AC | 구현 경로 | 자체 결과 / 대응 TC |
| --- | --- | --- |
| AC-01 | pr-review·pr-merge 및 pr-comment 담당/시점 | S01·S06·S11·S12, 02 TC-01·02 |
| AC-02 | pr-comment 전용 내용, document-links 증거 commit | S01·S10·S17, 01 TC-01 |
| AC-03 | pr-comment 신규/수정/생략 | S02~S04·S15·S17, 01 TC-02 |
| AC-04 | pr-comment 실행과 확인 | S05·S07·S08·S16, 01 TC-02 |
| AC-05 | document-links 권한, pr-comment 소유·범위 | S04·S06·S09·S15, 01 TC-03 |
| AC-06 | pr-merge 머지 전, pr-comment 불일치 확인 | S11·S12, 02 TC-02 |
| AC-07 | pr-create 기본 기록, 공통 정본·종료 경계 | S10·S13·S14, 01 TC-01·03 / 02 TC-03 |
| AC-08 | 패키지 필수 reference 및 누락 fixture, 아래 자체 사례 | 03 TC-01·02, 22/22 및 구조 검사 통과; 독립 검증·live 미실행 |

## 계획 대비 차이와 판단

승인된 7파일 구현: `scripts/check-package.mjs`, `skills/git-workflow/references/document-links.md`, `skills/pr-create/SKILL.md`, `skills/pr-merge/SKILL.md`, `skills/pr-review/SKILL.md`, `skills/pr-review/references/pr-comment.md`, `tests/package.test.mjs`.
계획 밖 기능·버전·issue-close·원격 정책 채택 없음. Issue #5 원격 본문은 이미 진행됐지만 승인된 worktree HEAD를 유지하고 참조만 했다. 부모 중간 대조에서 머지 확인 댓글의 HEAD 불일치 경로 표현을 지적해 두 HEAD·보류·인계를 기록하도록 보완했다. 기존 fail/human-review·머지 승인·보호 규칙 유지.

## 자체 시나리오

다음은 구현자가 작성한 mock 입력을 **규칙에 직접 대조한 수동 walkthrough**다. 독립 모델의 행동 실행·GitHub 도구 호출 테스트·독립 리뷰 pass가 아니다. A/B/D는 각각 서로 다른 전체 40자리 commit hash를 뜻하고 C1~C3는 mock 댓글 URL/본문/작성 이력이 주어진 기록이다. 기대와 실제 규칙 적용을 아래에 구분했다. 모든 mock 쓰기 응답은 로컬 사례 입력이며 실제 게시하지 않았다.

| 사례 / AC | mock 입력 | 기대 | 실제 규칙 적용 | 변경/유지 |
| --- | --- | --- | --- | --- |
| S01 / AC-01·02 | 최초 검토 A(40자), pass, AC-01~08 충족, 댓글 신규 요청, 목록=[] | 고정 결과 후 새 검토 댓글 | 신규 초안; 모든 AC·HEAD·warn 없음·근거·머지 미승인 표시 | 변경 |
| S02 / AC-03 | 기존 A/pass 자기 댓글 C1, 새 B/fail 검토, 신규 요청 | C1 보존·이전 URL 연결 | 신규 댓글, 이전 pass는 B에 재사용 안 함 | 변경 |
| S03 / AC-03 | A 동일, 새 실행 증거로 fail→pass, 신규 요청 | 이전 기록 보존 | 실질 변경 신규·C1 연결 | 변경 |
| S04 / AC-03·05 | A 동일, 오탈자/같은 증거 링크 주소 보정, 자기 C1, 수정 요청 | 자기 C1 수정 | 수정, 판정·증거 의미 유지 | 변경 |
| S05 / AC-04 | A/종류/판정/근거 같음, C1 조회됨, 재실행 요청 | 중복 쓰기 없음 | C1 URL 반환·생략 | 변경 |
| S06 / AC-01·05 | 검토만 요청, 또는 PR 생성/머지 승인만 있음 | 댓글 없음 | 대화/요청된 review.md, 원격 쓰기 0 | 유지·명확화 |
| S07 / AC-04 | 신규 응답 timeout, 재조회=[의도한 A 댓글 C2] | 즉시 재시도 없음 | C2 실제 URL/본문 일치 확인 후 신규 결과 반환 | 변경 |
| S08 / AC-04 | 응답 불명, 재조회 불가 | 중복 추정 금지 | 미확인 중단, 재시도 0·필요 조회 보고 | 변경 |
| S09 / AC-05 | 같은 계정 작성이나 다른 작업의 C3, 수정 요청 | C3 보존 | 소유 이력 불명은 수정 보류 | 변경 |
| S10 / AC-02·07 | 근거 untracked/미push/접근 불가, 댓글 요청 | 거짓 permalink 없음 | 링크 대기/접근 제한, 로컬 경로 없음·자동 push 없음 | 유지·명확화 |
| S11 / AC-06 | merge 확인 A=실제 A, pass·위험·승인 확인, 댓글 미요청 | 댓글 부재 비차단 | 대화 확인, 기존 보호/승인 검사 유지 | 유지 |
| S12 / AC-06 | merge 확인 검토 A≠실제 B, 확인 댓글 신규 요청 | 머지 보류·재검토, 불일치 확인 기록 가능 | 두 HEAD·보류·pr-review 인계 기록; A/pass는 과거 결과, B 판정 미작성 | 변경 |
| S13 / AC-07 | pr-create 생성만 요청 | 본문/handoff 기본 | 별도 댓글 없음; 검토 판정 생성 없음 | 유지·명확화 |
| S14 / AC-07 | pr-create 별도 인계 댓글 요청 | 필요성 확인 후 공통 기록 | 인계 요약만, 종료 사유/merge commit/배포 필드 강제 없음 | 변경 |
| S15 / AC-03·04 | 신규 요청만 있고 동일 HEAD 표현 보정이 필요 | 수정 권한으로 확대 금지 | 로컬 보정 초안·필요 수정 행동 반환 | 변경 |
| S16 / AC-04 | 댓글 목록 페이지 조회 불완전, 또는 쓰기 후 URL만 있고 실제 본문 조회 불가 | 중복 없음/성공 추정 금지 | 앞 경우 쓰기 보류, 뒤 경우 결과 미확인 | 변경 |
| S17 / AC-02·03 | 문서-only 증거 commit D≠검토 A; 링크 대기→새 증거로 판단 변경 | 검토 A와 증거 D 분리, 실질 변경 신규 | D permalink·문서 속 실행 A 대조, 이전 기록 보존 | 변경 |

## 검증 요약과 증거

| 명령 / 작업 위치 | 실제 결과 | 환경 / 대상 / 시각 |
| --- | --- | --- |
| `node scripts/check-package.mjs` / 이 worktree 리포 루트 `.` | exit 0, Package structure valid; 상대 링크·필수 reference 확인 | Node v23.11.0, 위 HEAD+7파일 digest, 2026-10-02 UTC |
| `node --test tests/package.test.mjs` / 동일 루트 | exit 0, 22 tests / 22 pass / 0 fail | 동일 환경·대상·시각 |
| `git diff --check` / 동일 루트 | exit 0, 공백 오류 없음 | 동일 환경·대상·시각 |
| `GH_TOKEN=$(gh auth token --user insung) gh issue view 6 --json title,body,url` 및 #5 body 조회 / 동일 루트 | sandbox 기본 읽기 실패 후 승인된 읽기 escalation 성공; AC·경계 확인 | 현재 원격 읽기만, 쓰기 없음 |

완전 fixture는 `accepts a complete dual-host package`에서 오류 배열 `[]` 확인, pr-comment 하나를 삭제한 fixture는 `missing reference: skills/pr-review/references/pr-comment.md` 탐지를 assertion으로 확인했다. 누락 검사는 정상 fixture와 대조되며 링크가 없어도 필수 파일을 검사한다. 이 결과가 댓글 의미를 자동 검증한 것은 아니다. S01~S17은 문서 지시의 자체 적용 대조이며 규칙 문자열 테스트로 의미 pass를 주장하지 않는다. 변경 전에는 pr-comment 필수 검사가 없었고 담당·재검토·불명 응답 절차가 정의되지 않았다. 변경 후 구조 검사는 전용 reference 존재를 요구한다. 기존 패키지·본문/handoff 기본 경로·댓글 미요청·머지 보호 동작을 유지했다.

## 커밋과 문서 상태

커밋 미승인으로 새 commit 없음. 구현 7파일과 이 docs 디렉토리는 미커밋이며 docs는 최초 입력부터 미추적 상태였다. plan/todo·지시문 승인 상태를 갱신했다. review/독립 입력은 읽거나 만들지 않았다. 문서-only 후속 commit 없음. 원격 문서 permalink는 준비되지 않았고 로컬 인계만 존재한다. 코드 digest는 자체 참조 방지를 위해 인계 문서를 포함하지 않는다.

## 위험·배포·롤백

스킬 문서는 지침이며 자동 validator나 실행 봇이 아니다. 실제 호스트의 규칙 준수·댓글 게시/수정 API·runtime loading은 미검증이다. 사용자 승인 범위는 로컬 구현·부모 독립 검증. commit/push/PR/원격 댓글/머지/배포/Release는 실행하지 않았다. 서비스 배포 없음. 되돌릴 경우 이 작업의 7파일 변경과 새 reference만 대조해 복구하고 다른 세션 파일·index는 보존한다.

## 다음 검토

위 HEAD와 구현 7파일 digest를 기준으로 원본 Issue AC 및 plan/todo를 독립 대조한다. 재현 명령은 위 표와 같다. 소스가 바뀌면 digest를 다시 고정한다. 독립 검토 미실행이며 그 결과 전에 completed나 독립 pass로 표시하지 않는다.

## PR 준비 통합 인계

- 사용자의 PR 요청으로 커밋·push·PR 생성 범위 승인. 원격 댓글·머지·Release는 제외
- 통합 기준: 최신 origin/main `2331c54`. 기존 자체 결과는 초기 e7da604 기록으로 보존
- 현 작업본 7파일 digest: `e449837b4ceec388d47c8967fcda62333cd6e9d6620b37663aa8a90311a5e463` (위와 같은 경로/NUL/길이/NUL/bytes 방식)
- 최신 main의 task-implement·assignee·issue-close·post-merge-cleanup·기록 커밋 정책 유지. 기록 커밋 예외를 PR 댓글의 HEAD 판단에서도 적용
- 부모 독립 재실행: package exit 0, 27 tests / 27 pass / 0 fail, git diff --check exit 0
- 최신 정책의 3회 독립 실행자 검증 결과와 최종 검토 상태는 review.md에 기록. 과거 수동 walkthrough를 모델 행동 실행으로 재분류하지 않음
