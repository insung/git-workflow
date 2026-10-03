# 6개 요청 실행 결과

대상 스냅샷: `<sandbox>/git-workflow-issue11-green` (지정 원본 `bffbcfc335dc04e2606d6c5cfc42c28232f8a2d0`). 입력: `<sandbox>/issue11-independent-inputs.txt`.
GitHub 요청·원본 수정 없이 본문 초안을 작성했다. 임시 템플릿 설치만 별도 Git 저장소에서 실행했다. 아래 Issue 번호·URL·커밋은 입력에 주어진 사례 식별자이며 실물 조회 결과로 확대하지 않는다.

## Case pr-unverified

상태: 본문 초안, review-pending. push·PR 생성·댓글 미실행. 적용 라벨·assignee·실제 PR URL·headRefOid 없음.

제목: `feat(catalog-response): 기존 기본값을 유지하는 선택 응답 필드 제공`

### PR 본문 초안

```markdown
## Issue

- 관련 Issue: https://github.com/example-lab/catalog/issues/42
- 이번 PR의 해결 범위: AC-01~03

## 변경 내용

신규 API 응답에 선택 필드를 제공한다. 기존 클라이언트의 기본값을 유지한다.

## 바뀐 곳

| 파일·폴더 | 무엇이 |
| --- | --- |
| 경로 미제공 | 선택 응답 필드 제공 |
| 경로 미제공 | 기존 클라이언트 기본값 유지 |

## 계획과 검토 근거

- 계획·작업·구현 인계: 미push, 확인된 원격 문서 링크 없음
- 검토한 소스 커밋: `0123456789012345678901234567890123456789`
- base: 미제공
- 최종 리뷰: human-review

## 검증 상태

현재 최종 리뷰는 human-review다. 최신 base 통합 뒤 행동 테스트 재실행이 필요하다.

- 구조 검사: 18/18 통과
- 이전 base의 행동 테스트: 12개 통과, 현재 통합 결과의 증거로 사용 불가
- 최신 base 통합 뒤 행동 테스트: 미실행
- 권한 실패 처리: 미검증
- 실제 운영 로그: 미검증
- 실행 명령·환경·시각과 테스트 실행 커밋: 미제공

## 위험과 전달

권한 실패 처리와 운영 동작은 아직 확인되지 않았다. 최신 base의 행동 검증을 보완한 뒤 검토 결론을 갱신한다. push·PR·댓글 승인은 없다.

## 머지 뒤 조치

- 배포 순서: API 먼저, 클라이언트 나중
- 롤백: API 변경 revert
```

편집: 과거 행동 통과와 현재 미실행을 분리했다. 필수 절을 유지했고 빈 선택 절은 만들지 않았다. 배포 순서·롤백은 읽을 자리가 있는 선택 절에 보존했다. 주어지지 않은 파일명·원격 링크·현재 행동 통과를 만들지 않았다.

## Case issue-existing-template

상태: 요청 범위의 본문 초안. 동일 범위 Issue 없음은 제공된 조사 결과다. Issue·라벨 생성 미실행, 적용 라벨·assignee·새 Issue URL 없음.

제목: `fix(image-preview): 네트워크 타임아웃 후 재시도 허용`

### Issue 본문 초안

```markdown
## 배경

네트워크 타임아웃으로 이미지 미리보기가 실패하면 재시도 버튼을 표시한다. 현재는 타임아웃에서도 버튼이 숨겨진다.

## 영향

- 포함: 네트워크 타임아웃의 재시도 버튼 표시
- 유지: 만료 URL의 기존 만료 안내
- 제외: 자동 재전송
- 데이터 변경: 없음
- 추가 호환성·운영 영향: 미확인

## 완료 기준

- [ ] AC-01: 네트워크 타임아웃에서 재시도 버튼 표시
- [ ] AC-02: 만료 URL에서 기존 만료 안내 유지
```

편집: 기존 절 이름인 배경·영향·완료 기준을 유지했다. 관련 문서는 선택 절이며 확인된 URL이 없어 생략했다. 완료 기준을 관찰 가능한 두 결과로 나눴다. 자동 재전송 제외와 데이터 변경 없음은 영향에 남겼다.

## Case issue-bug-boundary

상태: 본문 초안. 동일 Issue 없음은 제공된 조사 결과다. 원격 생성 미실행, 적용 라벨·assignee·새 Issue URL 없음.

제목: `fix(file-upload): 취소 후 재업로드 버튼 활성 상태 복구`

### 버그 본문 초안

```markdown
## 목표

업로드 취소 뒤 다시 파일을 업로드할 수 있도록 버튼 상태를 복구한다.

## 영향 범위

- 포함: 취소 후 UI 상태 복구
- 제외: 서버 재전송
- 제외: 파일 삭제
- 파일 데이터 마이그레이션: 없음
- 데스크톱 브라우저 재현: 미확인
- 운영 영향: 미확인
- 운영 재현: 미확인

## 재현 절차

1. 모바일 Safari의 staging에서 파일 업로드
2. 업로드 취소
3. 다시 파일 업로드 시도

## 기대 동작

취소 후 재업로드 가능.

## 실제 동작

버튼이 비활성 상태로 남아 페이지 새로고침 전까지 재업로드 불가.

## 확인한 환경

- 확인한 날짜: 2026-10-02
- 배포 환경: staging
- 브라우저: 모바일 Safari
- 구체 화면·API 경로: 미제공
- 배포 버전: 미제공

## 달성 조건

- [ ] AC-01: 업로드 취소 후 재업로드 가능
- [ ] AC-02: 기존 업로드 완료 흐름 유지
```

편집: 기존 일곱 절과 재현 순서를 보존했다. staging 관찰을 운영 장애로 확대하지 않았다. 운영 영향과 운영 재현을 각각 미확인으로 남겼다. 확인하지 않은 화면 경로·버전·링크를 만들지 않았다.

## Case document-boundaries

세 초안은 아래처럼 문서 역할을 나눈다. `plan.md` 등은 초안 간 문서명 참조이며 실재 원격 링크가 아니다. 새 파일을 설치하거나 구현하지 않았다.

### Plan 초안

```markdown
# 재시도 안내 계획

현재 상태: review-pending. 다음 검증은 expired 사례다.

## 요청

- 요청 범위: Issue #42의 AC-01·AC-02 대응
- 원문 요청: 미제공
- 남은 결정: 없음

## 공통 맥락

- 목적: 오류 종류에 맞는 안내 제공
- 유지할 판단: unknown 오류에서 기존 안내 유지
- 결정 이유: 기존 클라이언트 호환성 보존
- 역할별 인계: 구현은 단계별 task, 리뷰는 task 결과와 독립 근거 대조

## 현재 동작과 변경 이유

현재 동작의 상세 소스 근거는 미제공이다. 오류 분류 뒤 안내 화면을 연결한다.

## 범위

- 포함: 오류 분류, 안내 화면 연결
- 추가 소비자·데이터·운영 영향: 미제공

## 단계

| 단계 | 결과 | 선행 조건 |
| --- | --- | --- |
| 01 오류 분류 | 오류별 재시도 여부 반환 | unknown 결정 유지 |
| 02 안내 화면 | 분류 결과의 화면 표시 연결 | 01 분류 결과 |

## 최종 검증

단계를 넘는 통합 검증의 명령·환경은 미제공이다. 단계별 network·expired 결과는 task의 검증 표에 기록한다.

## 전달과 롤백

- 전달·배포 방법: 미제공, 실행 전 확인 필요
- 필요 승인: 외부 게시·파일 수정 요청 없음
- 적용 후 확인: 안내 화면과 분류 결과의 일치
- 롤백 방법: 미제공, 실행 전 확인 필요

## 결정과 변경 기록

| 결정 | 이유 | 관련 단계 |
| --- | --- | --- |
| unknown에서 기존 안내 유지 | 기존 클라이언트 호환성 보존 | 01·02 |
```

편집: Issue의 AC 전문과 조사 로그를 반복하지 않고 ID만 참조했다. unknown 결정 이유는 모든 역할이 찾는 plan의 공통 맥락과 결정 기록에 남겼다. 작업 표나 독립 판단은 복사하지 않았다. 전달·롤백의 미제공 상태를 숨기지 않았다.

### Task 초안

```markdown
# 오류 분류와 안내 연결 작업 기록

계획: plan.md의 공통 맥락·단계 참조

## 변경 대상

구체 소스·테스트 경로는 미제공이다.

## 작업

| 작업 | 완료 | 처리 내용 |
| --- | --- | --- |
| 오류 분류 구현 | 미확인 | 구현 완료 근거 미제공 |
| 표시 연결 | 미확인 | 연결 완료 근거 미제공 |

## 검증

| 사례 | AC | 기대 | 결과 |
| --- | --- | --- | --- |
| TC-01 network | AC-01 | true | 통과, 입력에서 제공된 결과 |
| TC-02 expired | AC-02 | false | 미실행 |

명령·작업 디렉토리·실행 커밋·환경·시각은 미제공이다. unknown 처리 결정은 plan.md의 공통 맥락을 따른다.

## 제외 범위

추가 제외 범위 미제공.
```

편집: 작업과 검증을 분리했고 network 통과로 expired까지 통과했다고 쓰지 않았다. 작업 완료 근거가 없어 체크하지 않았다. 결정 이유는 plan 참조로 연결했다. 주어지지 않은 코드 경로·검증 명령을 만들지 않았다.

### Review 초안

```markdown
# 검토 기록 초안

결과: human-review. expired 검증을 실행하고 기존 만료 안내 유지 여부를 확인한다.

- 대상: Issue #42, plan.md·task 초안
- 검토 HEAD·base·미커밋 변경·확인 시각: 미제공
- 의도 출처: Issue AC-01·AC-02와 plan 공통 맥락
- 검토 기준·spec-it: 미제공
- 검토 한계: expired 미실행, 실행 대상 식별 근거 미제공

## 지적과 필요한 조치

- AC-02: expired 사례가 미실행이므로 기존 만료 안내 유지의 실행 근거 부족. 해당 사례 실행과 대상 커밋 근거 보완 필요

## 독립 대조 요약

| 대상 | 제공 근거 | 남은 판단 |
| --- | --- | --- |
| AC-01 | network 검증 통과 | 현재 검토 대상에 해당하는 실행인지 확인 |
| AC-02 | expired 검증 미실행 | 만료 안내 유지 여부 확인 |

plan의 unknown 결정과 호환성 보존 이유를 구현과 대조한다. 실제 diff·assertion은 미제공이므로 독립 대조 완료를 주장하지 않는다.

## 다음 행동

- expired 검증 실행
- 검토 HEAD와 실행 근거 고정 후 재검토
- 머지 승인: 제공되지 않음
```

편집: 제공된 human-review 결론과 다음 행동을 첫 문장에 뒀다. task 실행 목록을 복사하지 않고 판단이 남은 이유를 적었다. 전체 AC와 조사 로그를 모든 문서에 반복할 필요는 없다. 핵심 결정 이유를 삭제하지 않고 plan에 두며 review는 그 결정과 구현을 대조한다.

## Case template-case

실행 저장소: `<sandbox>/issue11-green3-template-4kcrgtzd`.
바이트 원본: `before-bytes/feature_request.md`, `before-bytes/bug_report.md`.

- 복사: `.github/PULL_REQUEST_TEMPLATE.md`
- 유지: `.github/ISSUE_TEMPLATE/feature_request.md`, `.github/ISSUE_TEMPLATE/bug_report.md`
- 기존 두 파일: 각각 `cmp` exit 0, 전후 SHA256 동일
- 이름: 기존 소문자 유지, 대문자 Issue 파일 중복 추가 없음
- 라벨: 미확인, remote 없음
- 원본 스냅샷: Git index의 정확한 이름은 FEATURE_REQUEST.md·BUG_REPORT.md·PULL_REQUEST_TEMPLATE.md
- 참조: template-init 설치 표와 issue-create 기능·버그 참조 모두 대문자 정본 이름 사용
- 원본 갱신·GitHub 게시·커밋·push: 미실행

| 기존 절 | 정본 필수 절 | 동등한 정보의 근거 |
| --- | --- | --- |
| 배경 | 목표 | 현재 문제와 원하는 결과 요구 |
| 영향 | 영향 범위 | 포함·제외·호환성·데이터·운영 영향 요구 |
| 완료 기준 | 달성 조건 | 관찰 가능한 완료 결과 요구 |

기존 버그의 기대 동작·실제 동작·재현 절차·확인한 환경은 정본과 같은 이름이다. 누락 필수 절과 판단 보류 없음. 차이는 front matter의 작성자 명칭·설명·scope, 동등한 절 이름, 안내문과 작성자 추가 문장이다. 선택 절이 없는 것은 누락으로 보지 않는다.

실제 실행 스크립트: `<sandbox>/issue11-green3-template.py`. 실제 명령·결과 전체:

```text
$ git init -q
(empty output)
exit: 0
repo: <sandbox>/issue11-green3-template-4kcrgtzd
$ git rev-parse --show-toplevel
<sandbox>/issue11-green3-template-4kcrgtzd
exit: 0
$ git remote -v
(empty output)
exit: 0
$ git branch --show-current
main
exit: 0
$ git status --short
?? .github/
?? before-bytes/
exit: 0
$ ls .github/ISSUE_TEMPLATE/
bug_report.md
feature_request.md
exit: 0
$ find . .github docs -maxdepth 1 -iname pull_request_template*
find: docs: No such file or directory
exit: 1
$ case-insensitive existing-kind detection, then copy absent canonical files
kept: feature_request.md
kept: bug_report.md
$ cp <sandbox>/PULL_REQUEST_TEMPLATE.md <sandbox>/PULL_REQUEST_TEMPLATE.md
(empty output)
exit: 0
$ diff -u <sandbox>/FEATURE_REQUEST.md <sandbox>/feature_request.md
--- <sandbox>/FEATURE_REQUEST.md	2026-10-03 11:33:23
+++ <sandbox>/feature_request.md	2026-10-03 11:45:03
@@ -1,47 +1,17 @@
 ---
-name: 기능 요청
-about: 새 기능이나 기존 동작의 개선 요청
-title: "feat(<scope>): "
+name: 기존 기능 요청
+about: 작성자 기능 양식
+title: "feat(preview): "
 labels: enhancement
 ---

-<!-- 작성 후 편집: 결론 우선, 한 항목 한 결과, 반복 제거. 사실·AC·재현·미검증·위험·중요한 결정 이유 보존 -->
+## 배경
+현재 문제와 원하는 결과를 작성한다.

-## 목표
+## 영향
+포함·제외·호환성·데이터·운영 영향을 작성한다.

-<!-- 현재 문제와 이 Issue로 이루려는 결과. 한두 문장 -->
+## 완료 기준
+관찰 가능한 완료 결과를 작성한다.

-## 영향 범위
-
-<!-- 포함: 바뀌는 기능·화면·API와 관련 소비자 -->
-<!-- 제외: 이번에 하지 않는 것 -->
-<!-- 호환성·데이터·운영 영향. 없으면 없음 -->
-
-포함
-
--
-
-제외
-
--
-
-호환성·운영 영향
-
--
-
-## 달성 조건
-
-<!-- 한 항목에 하나의 완료 결과. 구현·검증 절차는 plan/task로 연결. AC-01부터 순서대로 ID 부여. Issue를 고쳐도 기존 ID 재사용 금지 -->
-
-- [ ] AC-01:
-- [ ] AC-02:
-
-<!-- 선택 절: 실제 내용이 있을 때만 남김. 없으면 절 전체 삭제 -->
-
-## 지금 알고 있는 것
-
-<!-- 확인한 조사 결과. 미확정 내용은 미확정으로 표시 -->
-
-## 참고 링크
-
-<!-- 관련 기획·조사 문서, 논의 스레드, 기존 Issue/PR -->
+작성자 추가 문장: 기존 고객의 입력 방식을 보존한다.
exit: 1
$ cmp <sandbox>/feature_request.md <sandbox>/feature_request.md
(empty output)
exit: 0
before SHA256: feature_request.md ff59fb37c709114255072afc738eec4767c277b8b703ebee4c6485b1bada3f60
after SHA256: feature_request.md ff59fb37c709114255072afc738eec4767c277b8b703ebee4c6485b1bada3f60
$ diff -u <sandbox>/BUG_REPORT.md <sandbox>/bug_report.md
--- <sandbox>/BUG_REPORT.md	2026-10-03 11:33:23
+++ <sandbox>/bug_report.md	2026-10-03 11:45:03
@@ -1,67 +1,29 @@
 ---
-name: 버그 보고
-about: 기대와 다르게 동작하는 문제 보고
-title: "fix(<scope>): "
+name: 기존 버그 보고
+about: 작성자 버그 양식
+title: "fix(upload): "
 labels: bug
 ---

-<!-- 작성 후 편집: 결론 우선, 한 항목 한 결과, 반복 제거. 사실·AC·재현·미검증·위험·중요한 결정 이유 보존 -->
+## 배경
+문제와 원하는 결과를 작성한다.

-## 목표
-
-<!-- 무엇이 잘못 동작하고 어떤 상태가 되어야 하는가. 한두 문장 -->
-
 ## 기대 동작
+정상 결과를 작성한다.

-<!-- 정상이라면 나와야 하는 결과 -->
-
 ## 실제 동작
+관찰한 결과를 작성한다.

-<!-- 실제로 나온 결과. 오류 메시지는 원문 그대로 인용 -->
-
 ## 재현 절차
+확인한 순서를 작성한다.

-<!-- 목격한 사람이 확인한 절차만 기록. 확인하지 못한 단계는 비워 두고 미확인으로 표시 -->
-
-1.
-2.
-3.
-
 ## 확인한 환경
+날짜·브라우저·버전을 작성한다.

-- 확인한 날짜:
-- 화면 또는 API 경로:
-- 배포 버전 또는 브랜치:
+## 영향
+포함·제외·호환성·데이터·운영 영향을 작성한다.

-## 영향 범위
+## 완료 기준
+관찰 가능한 완료 결과를 작성한다.

-<!-- 포함·제외 범위, 영향받는 사용자·소비자, 호환성·데이터·운영 영향 -->
-
-포함
-
--
-
-제외
-
--
-
-호환성·운영 영향
-
--
-
-## 달성 조건
-
-<!-- 한 항목에 하나의 수정 후 결과. 구현·검증 절차는 plan/task로 연결. AC-01부터 순서대로 ID 부여. 기존 정상 동작의 유지 조건도 포함 -->
-
-- [ ] AC-01:
-- [ ] AC-02:
-
-<!-- 선택 절: 실제 내용이 있을 때만 남김. 없으면 절 전체 삭제 -->
-
-## 지금 알고 있는 것
-
-<!-- 확인한 원인 후보·로그 위치. 미확정 내용은 미확정으로 표시 -->
-
-## 참고 링크
-
-<!-- 관련 Issue/PR, 장애 기록, 논의 스레드 -->
+작성자 추가 문장: 목격한 정보만 기록한다.
exit: 1
$ cmp <sandbox>/bug_report.md <sandbox>/bug_report.md
(empty output)
exit: 0
before SHA256: bug_report.md 0d6293537a724885418f741b1a994706c847413dedb677f1d0a0912c7714a805
after SHA256: bug_report.md 0d6293537a724885418f741b1a994706c847413dedb677f1d0a0912c7714a805
$ git add .github
(empty output)
exit: 0
$ git ls-files .github
.github/ISSUE_TEMPLATE/bug_report.md
.github/ISSUE_TEMPLATE/feature_request.md
.github/PULL_REQUEST_TEMPLATE.md
exit: 0
label status: 라벨 미확인: remote 없음; no GitHub requests
snapshot exact names:
.github/ISSUE_TEMPLATE/BUG_REPORT.md
.github/ISSUE_TEMPLATE/FEATURE_REQUEST.md
.github/PULL_REQUEST_TEMPLATE.md
reference lines:
skills/template-init/SKILL.md:13:| `assets/.github/ISSUE_TEMPLATE/FEATURE_REQUEST.md` | `.github/ISSUE_TEMPLATE/FEATURE_REQUEST.md` |
skills/template-init/SKILL.md:14:| `assets/.github/ISSUE_TEMPLATE/BUG_REPORT.md` | `.github/ISSUE_TEMPLATE/BUG_REPORT.md` |
skills/issue-create/references/issue.md:29:[기능 Issue 템플릿](../../template-init/assets/.github/ISSUE_TEMPLATE/FEATURE_REQUEST.md)을 읽어 본문을 작성한다. 대상 저장소에 같은 종류의 템플릿이 있으면 그 절 이름을 따르고 빠진 필수 항목만 보완한다. 달성 조건은 “사용성 개선” 대신 “앱 상세에서 기간을 주 단위로 선택 가능”처럼 검증 가능한 결과로 쓴다.
skills/issue-create/references/issue.md:33:[버그 Issue 템플릿](../../template-init/assets/.github/ISSUE_TEMPLATE/BUG_REPORT.md)을 읽어 기대·실제 동작과 재현 절차·확인한 환경을 작성한다. 필요한 재현 정보는 아래 조사 기준을 따른다.
$ git -C <sandbox>/git-workflow-issue11-green ls-files skills/template-init/assets/.github
skills/template-init/assets/.github/ISSUE_TEMPLATE/BUG_REPORT.md
skills/template-init/assets/.github/ISSUE_TEMPLATE/FEATURE_REQUEST.md
skills/template-init/assets/.github/PULL_REQUEST_TEMPLATE.md
exit: 0
```

`find`의 exit 1은 임시 저장소에 `docs` 디렉토리가 없다는 출력이다. 기존 PR 템플릿 탐색 결과가 없었고 PR 정본만 복사했다. `diff`의 exit 1은 위에 보존한 기존 내용 차이이며 기존 파일을 수정하지 않았다. `git add .github`는 임시 저장소에서 정확한 Git index 이름 확인에만 사용했다.

## Case role-handoff

### 구현 역할 인계

Issue #42 → plan의 공통 맥락·결정·단계 → 담당 task → handoff·공개 리뷰 지적 순서로 읽는다. 목적은 결론·다음 행동을 쉽게 찾는 것이며 미검증·위험·결정 이유를 보존한다. 담당 범위는 템플릿 파일명과 링크, 기존 설치 보존이다. 소스 `abcdef0123456789abcdef0123456789abcdef01`에서 파일명 변경·링크 검사는 task에 기록됐고 기존 설치 보존 검증은 미실행이다. 독립 기준·입력은 전달하지 않는다. 다음 행동은 기존 설치 보존 검증 근거 보완이다. push·PR·댓글 승인은 없다.

### 리뷰 역할 인계

Issue #42 → plan 공통 맥락 → 소스 diff·task·handoff → `review/issue-42`의 독립 기준·입력 순서로 읽는다. 검토 대상은 `abcdef0123456789abcdef0123456789abcdef01`이다. 파일명 변경·링크 검사 기록을 현재 diff와 대조하고, 기존 설치 파일 보존의 미실행 근거와 가독성 목적·중요한 맥락 보존을 독립적으로 판단한다. 구현자가 독립 기준을 읽지 않았다는 입력의 경계를 유지한다. 현재 실행 자료만으로 독립 검토 완료를 주장하지 않는다. push·PR·댓글은 실행하지 않는다.

### 조정 역할 인계

Issue #42 → plan → 구현·리뷰 결과 순서로 읽는다. plan의 결론·다음 행동 발견과 미검증·위험·결정 이유 보존을 공통 목표로 연결한다. 구현 역할은 기존 설치 보존 검증을 보완하고, 리뷰 역할은 같은 소스 커밋과 보완 증거를 독립 대조한다. 현재 통합 상태는 검증 보완 대기다. 다음 행동은 보존 검증 결과의 수집과 재검토 인계다. push·PR·댓글은 각각 승인되지 않았다.

### 짧은 리뷰 기록 초안

```markdown
# 문서 가독성 검토 기록 초안

결과: human-review. 기존 설치 파일 보존의 실행 근거를 보완한 뒤 독립 대조한다.

- Issue: #42
- plan·task·handoff: 사례에서 제공된 문서 역할, 구체 경로 미제공
- 검토할 소스: `abcdef0123456789abcdef0123456789abcdef01`
- base·미커밋 변경·확인 시각: 미제공
- 독립 기준·입력 위치: `review/issue-42`, 내용 미열람
- 의도 출처: plan의 공통 맥락
- spec-it: 미제공
- 검토 한계: 기존 설치 보존 검증 미실행, 실제 diff·실행 로그 미제공

## 필요한 판단

- 기존 템플릿의 이름과 바이트가 설치 이후에도 유지되는지 판단할 실행 근거 필요
- 파일명과 링크 변경이 결론·다음 행동을 찾는 데 도움이 되는지 독립 대조 필요
- 축약 과정에서 미검증·위험·중요한 결정 이유가 보존되는지 독립 대조 필요

## 근거와 한계

파일명 변경과 링크 검사 통과는 task 기록에 있다. 이 기록만으로 기존 설치 보존이나 문서 목적 충족을 확정할 수 없다. 독립 검토 기준·입력은 구현자의 접근 범위에서 제외한다.

## 다음 행동

- 구현 역할: 기존 설치 보존 검증 근거 보완
- 리뷰 역할: 같은 소스와 보완 근거를 독립 대조
- 조정 역할: 역할별 결과 연결, 승인 범위 확인
- 적용 대상: 위 소스 커밋, 대상이 바뀌면 다시 대조
- 머지 승인: 제공되지 않음
```

편집: 역할마다 자료 전문을 복사하지 않고 공통 목적은 plan, 실제 결과는 task·handoff, 독립 판단은 review로 연결했다. 리뷰 기록은 실행 이력을 반복하지 않고 필요한 판단과 부족한 근거를 먼저 썼다. 독립 입력의 내용은 구현 인계에 넣지 않았다.
