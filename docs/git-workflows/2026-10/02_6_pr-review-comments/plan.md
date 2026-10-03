---
issue: "#6"
status: review-pending
branch: "feat/pr-review-comment-rules"
base: "main"
created: "2026-10-02"
---

# PR 검토 댓글 규칙 계획

## 요청

> git-workflow 저장소에서 PR 검토 댓글 규칙을 정하는 Issue를 만들고 계획을 작성해줘. /git-workflow:issue-create 다음 /git-workflow:plan-create 를 쓴다.
>
> 배경: v0.3.0 작업(PR #3)에서 머지 전에 PR에 검토 요약 댓글을 남겼다. 지금 스킬에는 PR 댓글 규칙이 pr-review의 「Issue/PR 댓글과 라벨은 요청된 경우에 document-links와 labels를 따른다」 한 줄뿐이라, 언제·무엇을·어떻게 남길지 정해져 있지 않다.
> - 실제 사례: https://github.com/insung/git-workflow/pull/3#issuecomment-5937495899
> - 사례 문서: main의 docs/examples/git-workflow-v0.3.0/README.md
>
> 정할 것
> 1. 댓글을 남기는 시점과 담당 스킬: pr-review 검토 결과, 재검토 결과, pr-merge 직전 확인. pr-create가 남길 것이 있는지도 검토
> 2. 댓글 양식: 검토 HEAD, 결과, AC별 요약, warn·남은 일, 고정 링크(permalink)로 건 근거 문서. skills/git-workflow/references/document-links.md의 「원격 기록 형태」와 맞춘다
> 3. 재검토 때 새 댓글을 달지 기존 댓글을 고칠지, 중복 방지 규칙
> 4. 게시 승인 범위: 이미 승인된 PR이라도 댓글 게시 요청이 있을 때만 게시
> 5. Issue #5(issue-close)의 종료 코멘트 양식과 겹치지 않게 한다. #5 본문과 feat/issue-close 작업본의 skills/issue-close/references/closing-comment.md를 읽는다. 공통 형태의 정본은 document-links.md 한 곳에 둔다
>
> 진행 방식
> - 새 worktree를 origin/main에서 만든다. 스킬 규칙은 그 worktree의 skills/ 아래 파일을 직접 읽는다
> - Issue 제목의 scope는 플러그인 이름 대신 스킬·기능 단위로 쓴다 (예: feat(pr-review))
> - Issue 본문 초안과 plan 파일 구성은 쓰기 전에 나에게 보여 주고 승인받는다
> - PR 대상 브랜치는 main이다
> 하지 말 것
> - 구현, push, PR 생성

- 해석: [Issue #6](https://github.com/insung/git-workflow/issues/6)의 PR 댓글 책임·양식·재검토·게시 경계를 정의하는 변경 설계
- 남은 결정: 구현 인계 완료, 부모의 독립 검증 대기. 커밋·push·PR·원격 댓글은 미승인

## 현재 동작과 변경 이유

| 현재 동작 | 근거 위치 | 바꿀 결과 |
| --- | --- | --- |
| 요청된 댓글은 공통 링크 규칙을 따른다는 한 줄 안내 | `skills/pr-review/SKILL.md`의 결과 절 | 검토·재검토 댓글의 시점과 책임 명시 |
| 머지 직전 HEAD·승인 확인만 정의 | `skills/pr-merge/SKILL.md`의 머지 전 절 | 요청된 확인 댓글의 최소 내용과 재검토 인계 |
| PR 본문·handoff와 리뷰 인계, 댓글 승인 확인 | `skills/pr-create/SKILL.md` 3~5 | 별도 댓글 자동 게시 없이 본문·handoff를 기본 기록으로 사용 |
| 공통 요약·근거·남은 일과 permalink 규칙 | `skills/git-workflow/references/document-links.md` | 공통 형태의 정본 유지, 승인 문장의 PR 댓글 해석 명확화 |
| Issue 종료 양식은 완료·미진행·중복 사유와 최종 결과 | Issue #5와 feat/issue-close의 `skills/issue-close/references/closing-comment.md` | 종료 책임은 issue-close, 검토 책임은 pr-review |
| 기존 #1은 검토 절차 전반, #4는 구현·독립 검증, #5는 종료 코멘트 | 2026-10-02 전체 Issue 4건 본문 조회 | 같은 해결 범위 없음, #4·#5와 경계만 연결 |

## 범위

| 구분 | 내용 |
| --- | --- |
| 포함 | 공통 document-links, PR 전용 comment reference, pr-review·pr-merge·pr-create 연결, 검사와 검증 사례 |
| 제외 | issue-close 구현, 공식 Review 제출, 인라인 댓글, 자동 봇, 소급 댓글 수정, 버전·Release 변경 |
| 미변경 소비자 | issue-create·plan-create·git-workflow의 기존 원격 요약, #4의 구현·검증 양식, #5의 종료 절차 |
| 호환성·데이터·운영 | 스킬 지시 변경. 댓글 요청이 없으면 원격 쓰기 없음. 실행 서비스·데이터 변경·배포 없음 |

## 단계

| 단계 | 제목 | 설명 | 검증 사례 | 완료 |
| --- | --- | --- | --- | --- |
| [01](01-todos-comment-contract.md) | 댓글 계약 | 공통 정본과 전용 양식, 변경·승인·중복 방지 | [TC-01](01-todos-comment-contract.md#tc-01), [TC-02](01-todos-comment-contract.md#tc-02), [TC-03](01-todos-comment-contract.md#tc-03) | [x] |
| [02](02-todos-skill-integration.md) | 담당 스킬 연결 | 검토·머지 직전·생성 단계 책임과 인계 | [TC-01](02-todos-skill-integration.md#tc-01), [TC-02](02-todos-skill-integration.md#tc-02), [TC-03](02-todos-skill-integration.md#tc-03) | [x] |
| [03](03-todos-comment-validation.md) | 검증과 인계 | 자체 시나리오·패키지 검사·handoff | [TC-01](03-todos-comment-validation.md#tc-01), [TC-02](03-todos-comment-validation.md#tc-02) | [x] |

실행 순서: 01 → 02 → 03. 검증 실패 시 해당 단계로 돌아가 보완한다.
AC의 정본은 Issue 본문이며 이 계획에 다시 정의하지 않는다.
현재 review-pending은 승인된 로컬 구현과 자체 검증을 인계한 상태다. 독립 검토 완료를 뜻하지 않는다.

## 최종 검증

| 사례 | AC | 명령·작업 디렉토리 | 기대 결과 | 필요 승인 | 결과 |
| --- | --- | --- | --- | --- | --- |
| <a id="tc-f01"></a>TC-F01 | AC-08 | `node scripts/check-package.mjs`, 리포 루트 | 패키지·상대 링크 유효 | 구현 실행 승인 | 부모 독립 재실행 통과 — [review](review.md) 참조 |
| <a id="tc-f02"></a>TC-F02 | AC-08 | `node --test tests/package.test.mjs`, 리포 루트 | 기존 회귀 및 신규 reference 누락 검사 통과 | 구현 실행 승인 | 부모 독립 재실행 통과 — [review](review.md) 참조 |
| <a id="tc-f03"></a>TC-F03 | AC-01~08 | 별도 검토 주체가 고정 기준·입력으로 재대조 및 시나리오 실행 | 모든 AC 충족, 무승인 게시·중복 없음 | 부모 독립 검증 승인 | 부모 고정 RV-01~17 직접 대조 통과 — [review](review.md); 모델 행동시험·live 미실행 |
| <a id="tc-f04"></a>TC-F04 | AC-07·AC-08 | `git diff --check`, 범위 diff·미추적 파일 대조, 리포 루트 | 공백 오류·깨진 링크·중복 정본·범위 밖 변경 없음 | 구현 실행 승인 | 부모 독립 재실행 통과 — [review](review.md) 참조 |

스킬 지시에는 실행 로직 유닛 테스트 대상이 없다. 규칙 문구와 같은 문자열을 검사하는 테스트로 의미 충족을 주장하지 않는다.
의미 검증은 정상·실패·경계·유지 시나리오로 수행하고, 신규 reference 필수성은 기존 패키지 검사의 누락 fixture로 확인한다.
실제 GitHub 댓글 게시·수정·머지는 검증에 포함하지 않는다. 읽기·쓰기 도구 응답은 로컬 fixture로 제공한다.

## 전달과 롤백

| 항목 | 내용 |
| --- | --- |
| 전달 방법 | 로컬 구현·handoff·부모 review 전달 완료. 스킬 문서 변경으로 서비스 배포 없음. 원격 전달은 미승인 |
| 필요 승인 | Issue 생성·계획·리뷰 검증 자료, 로컬 구현 및 부모 독립 검증 승인. 커밋·push·PR·댓글 게시·머지·Release는 미승인 |
| 적용 후 확인 | 구현 범위, AC별 실행 근거, 현재 작업본 digest, 독립 검토 결과 확인 |
| 롤백 | 수정 전 diff 보존 후 이 작업에 귀속된 변경만 되돌림. reset/clean·다른 세션 변경 삭제 금지. 승인된 커밋 이후라면 해당 커밋 revert 별도 결정 |

## 결정과 변경 기록

| 날짜 | 구분 | 내용 | 영향 AC·단계 | 상태 |
| --- | --- | --- | --- | --- |
| 2026-10-02 | 결정 | origin/main에서 새 worktree, base main, 스킬·기능 scope | 전체 | 승인 |
| 2026-10-02 | 결정 | 새 HEAD·실질적 판단 변경은 새 댓글, 같은 HEAD의 표현·링크 보정은 자기 댓글 수정, 동일 결과 재게시 생략 | AC-03·AC-04 / 01 | 승인 |
| 2026-10-02 | 결정 | pr-create는 본문·handoff 기본 기록, 검토 결과 작성은 pr-review. 요청된 별도 인계 댓글만 필요성 검토 | AC-07 / 02 | 승인 |
| 2026-10-02 | 결정 | 승인 문장의 기존 Issue/PR 승인은 댓글 권한으로 확대하지 않음. 동일 댓글 행동·대상·범위 요청만 유지 | AC-05 / 01·02 | 승인 |
| 2026-10-02 | 요청 변경 | 중복 재확인 후 Issue 생성·계획 및 구현 검증 가능한 리뷰 자료 작성 요청. 서브에이전트 지시문 확인 후 승인 예정 | 전체 | 승인 |
| 2026-10-02 | 결정 | Issue #4의 새 규칙은 main 미반영이므로 현재 worktree의 plan/todo 이름 유지. #5 작업본 변경 금지 | AC-07 / 전체 | 승인 |
| 2026-10-02 | 결정 | 리뷰 기준·고정 입력은 구현 worktree 밖에 보관. 구현 에이전트는 읽기·수정·기준 재작성 금지. 기계적 접근 차단은 아님 | AC-08 / 03 | 승인 |
| 2026-10-02 | 결정 | 구현 서브에이전트 실행 대기. 커밋·push·PR·GitHub 댓글은 현재 범위 밖 | 전체 | 보류 |
| 2026-10-02 | 결정 | 사용자: 구현 서브에이전트 실행 및 부모 독립 검증 승인. 커밋·push·PR·원격 댓글은 계속 제외 | 전체 | 승인 |
| 2026-10-02 | 결정 | 01→02→03 로컬 구현·자체 검증 완료, 미커밋. 부모의 규칙 대조로 HEAD 불일치 확인 댓글 표현 보완. 원격 #5 진행 상태는 변경됐으나 고정 HEAD의 정책 유지, pull/rebase/merge 없음 | 전체 | 승인 |
| 2026-10-02 | 결정 | 부모가 고정 사례 직접 적용과 패키지·22개 테스트·범위를 독립 대조하여 로컬 검토 pass 기록. 별도 모델 행동시험·live 게시 제외, 로컬 전달 완료로 completed | 전체 | 승인 |

## PR 준비와 최신 main 통합

- 사용자 PR 생성 요청으로 필요한 커밋·push·PR 생성 승인 범위 확장. PR 검토 댓글·머지·Release는 미승인
- 최신 main `2331c54`로 fast-forward 후 보존한 작업본 재적용. 충돌은 최신 필수 스킬/reference·assignee·기록 커밋·Issue 종료/정리 인계를 유지하며 해결
- 기존 작업 문서 이름은 시작 당시 규칙의 역사적 입력으로 유지. 새 공통 양식 자체의 이름 규칙은 수정하지 않음
- 기록 커밋 예외를 pr-comment와 pr-merge에서 같은 정본으로 연결. 그 밖의 HEAD 변경은 재검토 및 이전 결과 재사용 금지 유지
- worktree를 프로젝트 `.worktree/pr-review-comment-rules`로 이동. clone-local exclude에 `.worktree/` 추가, 다른 작업본은 수정하지 않음
- 통합 작업본 패키지 검사·테스트 27개·공백 검사 통과. 필수 시나리오 3회 검증 상태는 최종 review.md 참조
- plan은 최종 리뷰 보완 대기로 review-pending. 과거 completed는 이전 고정 HEAD의 직접 대조 범위만 의미
