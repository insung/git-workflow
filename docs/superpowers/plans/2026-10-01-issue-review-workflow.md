# Issue Review Workflow Implementation Plan

> 이전 후보의 기록이다. 현재 정본과 양식은 [전체 흐름](../../workflow.md) 및 새 docs/git-workflows 계획·검증 기록을 따른다. 아래 이전 절차와 결과를 현재 실행 증거로 재사용하지 않는다.

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Issue부터 구현·spec-it 리뷰·승인 후 머지/Wiki까지 개별 호출 가능한 최소 플러그인을 제공한다.

**Architecture:** 기존 git-workflow 이름을 라우터로 보존하고 네 단계 및 커밋·릴리즈 스킬을 분리한다. 정책은 spec-it에서 읽으며 복제하지 않는다. 로컬 파일 호출과 구조 검사를 제공하고 원격 자동 실행은 구현하지 않는다.

**Tech Stack:** Markdown, JSON plugin manifests, Node.js 18+ built-in test runner.

**Spec:** docs/superpowers/specs/2026-10-01-issue-review-workflow-design.md

## Global Constraints

- 외부 패키지 의존성 추가 없음; 검사기는 Node.js 18 이상과 built-in 모듈 사용
- 공통 스킬·문서에 머신 절대경로·개인 인증 정보 기록 금지
- 기존 무관한 변경·staged 상태 보존; commit/push/원격 게시를 자동 실행하지 않음
- 플러그인 후보 버전 0.2.0; 기존 진입 이름 git-workflow 유지
- docs의 패키지 검사는 의미 검토나 실제 런타임 합격 증명이 아님

## Review Focus

- Issue 필수 입력 누락: 구현 시작 전에 부족한 내용을 보고한다.
- GitHub 인증 불가: local-draft를 실제 Issue로 표시하지 않는다.
- 정책·테스트 증거 부재 및 HEAD 변경: shadow/human-review 또는 재검토로 남긴다.
- PR 생성 승인만 있음: 머지와 Wiki 게시 권한으로 확대하지 않는다.
- 머지 결과 미확인 또는 Wiki 비활성화: Wiki 발행·전체 완료를 주장하지 않는다.

---

### Task 1: 단계별 스킬과 인계 템플릿

**Files:**
- Modify: skills/git-workflow/SKILL.md, skills/git-workflow/references/issue.md, skills/git-workflow/references/pr.md, skills/git-workflow/references/scope.md
- Create: skills/{issue-create,pr-create,pr-review,pr-merge,commit-rule,git-release}/SKILL.md
- Create: skills/issue-create/templates/issue.md, skills/pr-create/templates/handoff.md, skills/pr-review/templates/review.md, skills/pr-merge/templates/wiki.md
- Test: docs/testing/issue-review-scenarios.md

**Interfaces:**
- Consumes: 사용자 요청, 기존 Git 참조, 대상 프로젝트의 spec-it pin과 증거
- Produces: Issue 필수 계약, docs 인계 문서, 리뷰 HEAD/status, merged commit/Wiki 발행 상태

- [x] **Step 1:** 기존 스킬로 Review Focus 다섯 시나리오를 별도 에이전트에서 관찰한다.
  Expected: 현 스킬의 누락과 충족 항목을 근거로 구분한 baseline 보고서.
- [x] **Step 2:** 라우터와 여섯 하위 스킬, 네 템플릿을 작성하고 기존 참조의 모순을 수정한다.
- [x] **Step 3:** 같은 시나리오를 새 스킬로 검토하고 결과를 docs/testing/에 기록한다.
  Expected: 다섯 경우에서 안전한 다음 행동과 명시적인 미완료 상태.
- [x] **Step 4:** `claude plugin validate .`를 실행한다.
  Expected: valid. 호스트 로딩이나 의미 검토 성공까지 주장하지 않는다.
- [x] **Step 5:** 변경을 작업본에 유지한다. 승인 없는 commit/push는 수행하지 않는다.

### Task 2: 패키지 검사와 로컬 시험 안내

**Files:**
- Create: scripts/check-package.mjs, tests/package.test.mjs, docs/testing/local-pilot.md
- Modify: README.md, README.ko.md, plugin.json, .codex-plugin/plugin.json, .claude-plugin/plugin.json, .claude-plugin/marketplace.json

**Interfaces:**
- Consumes: Task 1의 스킬 파일·상대 링크·manifest discovery 경로
- Produces: `validatePackage(root: string): string[]`, 직접 실행 시 오류 있으면 exit 1/없으면 exit 0

- [x] **Step 1:** 임시 fixture 패키지를 만드는 node:test를 작성한다. 정상 패키지 허용, 누락 단계 거부, 이름 불일치 거부, 버전 불일치 거부, 끊긴 상대 링크 거부를 assert한다.
- [x] **Step 2:** `node --test tests/package.test.mjs`를 실행한다.
  Expected: 검사기 구현 전 실패. 첫 실패 원인은 구현 파일 없음이다.
- [x] **Step 3:** built-in fs/path/url만으로 validatePackage를 구현한다. 외부 링크는 fetch하지 않는다. 스킬 집합·frontmatter·host manifest 버전/skills 경로·로컬 Markdown 링크를 검사한다.
- [x] **Step 4:** `node --test tests/package.test.mjs`와 `node scripts/check-package.mjs`를 실행한다.
  Expected: 모든 단위 테스트 통과, 실제 패키지 오류 0.
- [x] **Step 5:** README와 0.2.0 후보 metadata, 설치 변경 없이 소스 파일을 읽어 시험하는 안내를 갱신한다.
- [x] **Step 6:** 전체 검사와 fresh-context 리뷰를 수행한다.
  Run: `node --test tests/package.test.mjs`, `node scripts/check-package.mjs`, `claude plugin validate .`, `git diff --check`
  Expected: 모두 exit 0. 리뷰의 중요한 문제는 한 차례 수정하고 재검증한다.
- [x] **Step 7:** 변경은 미커밋으로 유지하고 파일럿 호출 방법과 미검증 원격 범위를 보고한다.

## 계획 자체 검토

네 요청 단계는 Task 1, 분리·호환성과 로컬 시험은 Task 2에 대응한다. 사용자 요청의 빠른 구현 지시에 따라 계획 승인 재질문 없이 이 세션에서 실행한다. 커밋·배포·클라우드 runner·자동 Wiki 게시 시스템은 이 후보의 범위가 아니다.
