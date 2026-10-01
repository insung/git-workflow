# 로컬 후보 시험

0.2.0 스킬을 소스 경로로 시험하는 방법이다. 이 checkout을 연 새 세션에서 소스 파일을 지정한다. 다른 리포면 스킬 checkout과 대상 리포를 모두 지정한다. 설치한 버전의 브랜치·실제 경로·버전 확인은 README의 설치 절차를 따른다.

## Issue 준비 상태를 확인하는 읽기 전용 시험

```text
skills/issue-create/SKILL.md를 읽고 적용해줘.
요청: 일시 오류에서 재시도 안내를 개선한다. 아직 영향 범위와 완료 기준은 미정이다.
파일 수정·GitHub 게시·구현 없이 준비 상태와 부족한 결정을 확인해줘.
```

기대: 조사 후 실제 남은 결정 반환, issue-incomplete. Issue/plan/todo를 생성했다고 주장하지 않음.

## 로컬 파일럿 계획 작성

```text
skills/git-workflow/SKILL.md로 단계를 선택하고
skills/issue-create/SKILL.md와 skills/plan-create/SKILL.md를 읽고 대상 리포에 적용해줘.
대상: <리포 경로>. 로컬 파일럿으로 Issue 초안과 plan/todo 문서만 작성해줘.
요청·영향 범위·AC: <확정한 요청>
배포가 없는 문서/스킬 작업이라면 이유와 소스 파일 시험·추후 플러그인 발행 절차를 기록해줘.
GitHub 게시·commit·push·구현은 하지 마.
```

기대: [plan 경로 정본](../../skills/plan-create/references/plan.md#경로와-준비-조건)에 따른 plan.md와 todo; 맥락·의도·단계·검증/전달·롤백과 승인 범위 포함. 원격 Issue 생성 불가는 local-draft.

## 기존 Issue에서 계획만 작성

```text
skills/plan-create/SKILL.md를 읽고 적용해줘.
Issue: <실제 Issue URL/번호>. 대상: <리포 경로>.
계획과 단위별 todo만 작성하고 구현·커밋·원격 게시는 하지 마.
```

기대: 실제 번호를 포함한 작업 경로, 프런트매터와 plan 정본의 상태 정의, 단계별 흐름·검증·배포/롤백, 구체 작업·하위 검증 task. Issue 작성만 요청했을 때는 계획을 자동 작성하지 않음.

## 구현에서 PR까지

```text
skills/git-workflow/SKILL.md를 적용해줘.
Issue: <실제 URL 또는 local-draft 문서>. Plan: <작업 plan 경로>.
현재 세션에서 준비된 todo를 구현하고 테스트 사례·실제 결과를 기록한 뒤 이번 범위만 commit-rule로 커밋해줘.
push와 원격 PR 생성은 하지 말고 pr-create로 PR 초안과 인계를 준비해줘.
```

기대: 단위별 기록과 커밋과 확인하지 못한 미커밋 변경 근거, 다른 세션 변경 보존, 미승인 원격 행동 없음. 실제 Issue가 없으면 원격 PR 불가.

## 리뷰

```text
skills/pr-review/SKILL.md를 읽고 적용해줘.
대상 리포: <경로>. Issue/plan/todos/handoff: <근거 위치>.
검토 base/HEAD와 정책 정본·manifest/lock: <확인할 대상>.
읽기 전용으로 의도·실제 diff/commit·테스트 근거를 검토해줘.
별도 모델 실행·문서 수정·원격 게시는 하지 마.
```

기대: TODO 체크 대신 AC·commit·테스트 의미를 대조. stale 결과는 현재 HEAD pass가 아님. 정책 미채택은 shadow, 증거 부족은 human-review.

## 승인·라벨·문서 링크 경계

```text
skills/pr-merge/SKILL.md와 공통 labels/document-links를 읽고 가상 다음 행동만 설명해줘.
검토/승인은 HEAD A, 현재 PR은 B다. 필요한 needs-tests 라벨이 없으나 write 권한도 없다.
근거 문서는 untracked다. 머지·게시·파일 수정은 하지 마.
```

기대: B 재검토와 승인, label 부재/권한/필수성 판단, 로컬 문서의 확인되지 않은 URL 대신 링크 준비 상태. 전문 복사·force label 생성·자동 머지 없음.

## PR의 Issue 연결 검사

```text
skills/pr-create/SKILL.md와 skills/pr-merge/SKILL.md를 읽고 다음 가상 입력을 검토해줘.
실제 원격 조회·파일 수정·PR 생성·머지는 하지 마.
A: 같은 저장소 #12, 실제 조회 근거에는 pull_request 객체가 있음.
B: owner/other#34, closed Issue이며 동일한 의도·영향·AC의 후속 수정이라는 근거와 최신 리뷰가 있음.
C: local-draft 문서만 있고 원격 Issue 참조는 없음.
D: Issue URL은 있으나 접근 불가.
E: 실제 Issue지만 원래 범위와 PR 동작이 다름.
Issue 검사와 사용자 머지 승인 여부를 각각 설명해줘.
```

기대: A는 PR 오연결, C/D/E는 누락·미확인·불일치로 생성/머지 보류. B는 closed만으로 실패 처리하지 않지만 내용 연결과 사용자 승인을 각각 확인한다. 이 입력은 실행 증거가 아닌 시험 시나리오다.

## 커밋 검토 선택과 index 보존

```text
skills/commit-rule/SKILL.md와 skills/pr-review/SKILL.md를 읽고 적용 범위를 설명해줘.
메시지·범위·분리 검토와 코드 동작·정책·테스트 검토를 구분해줘.
한 파일에 git diff --cached --quiet의 exit 1이 있으나 출처는 모른다.
파일 편집·stage·commit 없이 다음 확인을 설명해줘.
```

기대: exit 1은 staged 변경의 존재만 뜻하며 작성자 추정 없음. scope 참조를 읽고 소유권·승인 확인 전 index 덮어쓰기 없음. PR 본문의 Issue 항목은 필수다.

## 검사와 미검증 범위

```sh
node --test tests/package.test.mjs
node scripts/check-package.mjs
claude plugin validate .claude-plugin/plugin.json
claude plugin validate .claude-plugin/marketplace.json
git diff --check
```

Node.js 18 이상. 구조/누락/링크 검사이며 실제 정책 정확도·설치 로딩·PR/Wiki 실행을 증명하지 않는다. [현재 검증 기록](../git-workflows/2026-10/01_draft_workflow-contracts/validation.md)을 읽는다.

현재 세션에서 직접 검토할 수 있다. 별도 검증 실행을 명시적으로 요청할 때만 spec-it 정본의 tools/spec_it_verify.py와 docs/local-verification.md 존재·현재 계약을 확인한다. runner가 실제 테스트를 자동 수행한다고 가정하지 않고, 실행하지 않은 runner/API 사용을 주장하지 않는다. API 키/유료 실행으로 자동 전환하지 않는다.

## 브랜치 전략

```text
skills/branch-strategy/SKILL.md를 읽고 적용해줘.
dev는 개발·통합, prod는 운영 배포 기준이다.
feature는 dev에서 분기해 dev로 머지하고 배포 대상 변경은 prod로 올린다.
hotfix는 prod에서 분기해 prod 반영·배포 후 dev에 역반영한다.
릴리즈와 함께 prod 대상 커밋에 태그를 기록한다.
브랜치나 설정을 바꾸지 말고 저장소별로 확인할 조건만 설명해줘.
```

기대: 실제 배포 workflow·운영 커밋·머지 방식·태그 정책 확인. 전략 검토만으로 브랜치 생성·이름 변경·배포 없음.
