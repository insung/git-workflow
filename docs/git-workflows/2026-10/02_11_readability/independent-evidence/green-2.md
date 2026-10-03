# 독립 실행 결과 2

대상 지시 스냅샷: bffbcfc335dc04e2606d6c5cfc42c28232f8a2d0 (`<sandbox>/git-workflow-issue11-green`). 입력: `<sandbox>/issue11-independent-inputs.txt`. 아래 번호·커밋은 입력에 주어진 사례 식별자이며 실제 원격 상태를 새로 확인한 값이 아니다. 외부 조회·게시·소스 수정은 실행하지 않았다.

## Case pr-unverified

적용: pr-create, PR 양식, 공통 문체·문서 링크·Issue 연결·인계 계약. 본문 초안만 작성했다. 상태: local-pr-draft, review-pending. handoff 원본과 base·테스트 실행 상세는 제공되지 않아 PR 생성 준비 완료로 보지 않는다. 라벨·assignee는 조회·적용하지 않았다.

제목: `feat(api-response): 선택 필드 제공과 기존 클라이언트 기본값 유지`

```markdown
## Issue

- 관련 Issue: https://github.com/example-lab/catalog/issues/42
- 해결 범위: AC-01~03

## 변경 내용

신규 API 응답에 선택 필드를 추가하고 기존 클라이언트의 기본값을 유지한다.

## 바뀐 곳

| 영역 | 변경 이유 |
| --- | --- |
| API 응답 | 선택 필드 제공 |
| 클라이언트 동작 | 기존 기본값 유지 |

실제 변경 파일 경로는 인계 자료 확인이 필요하다.

## 계획과 검토 근거

- 검토 소스 커밋: `0123456789012345678901234567890123456789`
- base: 제공되지 않음
- 계획·task·handoff 원본: 제공되지 않음
- 문서 링크: 미push로 확인된 원격 URL 없음

## 검증 상태

현재 최종 리뷰는 human-review다. 다음 검토에는 최신 base 통합 뒤 행동 테스트 재실행이 필요하다.

- 구조 검사: 18/18 통과
- 이전 base의 행동 테스트: 12개 통과, 과거 결과
- 최신 base 통합 뒤 행동 재실행: 미실행
- 권한 실패 처리: 미검증
- 실제 운영 로그: 미검증

실행 명령·환경·시각과 AC별 대응 근거는 제공되지 않았다.

## 위험과 전달

- 미검증 권한 실패 처리에 대한 추가 증거 필요
- 운영 로그 확인 전 운영 동작 판단 보류
- push·PR·댓글 승인 없음

## 머지 뒤 조치

- 배포 순서: API 먼저, 클라이언트 나중
- 롤백: API 변경 revert
```

편집: 변경 후 동작을 앞에 배치했다. 과거 행동 테스트와 현재 미실행을 분리했다. 미push 문서의 원격 링크를 만들지 않았다. 기존 필수 절 이름을 유지했다. 배포 순서와 롤백을 별도 항목으로 보존했다.

## Case issue-existing-template

적용: issue-create, Issue 양식, 공통 문체. 제공된 중복 조사 완료 자료를 사용했다. 실제 생성·라벨 생성·적용·assignee 지정은 실행하지 않았다. 기존 제목 이력은 제공되지 않아 scope는 초안이다.

제목: `fix(image-preview): 네트워크 타임아웃 후 재시도 가능`

```markdown
## 배경

네트워크 타임아웃으로 이미지 미리보기가 실패하면 사용자가 다시 시도할 수 있어야 한다. 현재는 타임아웃에서도 재시도 버튼이 숨겨진다.

## 영향

- 포함: 타임아웃 오류의 재시도 버튼 표시
- 유지: 만료 URL의 기존 만료 안내
- 제외: 자동 재전송
- 데이터 변경: 없음

## 완료 기준

- [ ] AC-01: 네트워크 타임아웃으로 미리보기 실패 시 재시도 버튼 표시
- [ ] AC-02: 만료 URL에서 기존 만료 안내 유지
```

편집: 기존 배경·영향·완료 기준 절 이름을 유지했다. 내용 없는 관련 문서는 선택 절이므로 생략했다. AC에 구현 방법이나 명령을 섞지 않았다. 동일 범위 Issue 없음은 제공된 조사 결과이며 외부 재조회는 하지 않았다. 디자인 문서 URL은 미확인이다. 라벨·assignee는 미적용이다.

## Case issue-bug-boundary

적용: issue-create의 버그 양식, 공통 문체. 동일 Issue 없음은 제공된 조사 결과다. 원격 생성·수정은 실행하지 않았다.

제목: `fix(file-upload): 취소 후 재업로드 가능`

```markdown
## 목표

파일 업로드 취소 후 다시 업로드할 수 있어야 한다. 현재 모바일 Safari에서는 버튼이 비활성 상태로 남는다.

## 영향 범위

- 포함: 취소 후 업로드 UI 상태 복구
- 제외: 서버 재전송
- 제외: 파일 삭제
- 파일 데이터 마이그레이션: 없음
- 데스크톱 브라우저 재현: 미확인
- 운영 재현: 미확인
- 운영 영향: 미확인

## 재현 절차

1. 파일 업로드 시작
2. 업로드 취소
3. 다시 업로드 시도

## 기대 동작

취소 후 재업로드 가능

## 실제 동작

페이지 새로고침 전까지 업로드 버튼이 비활성 상태로 남아 재업로드 불가

## 확인한 환경

- 확인 날짜: 2026-10-02
- 배포 환경: staging
- 브라우저: 모바일 Safari
- 화면/API 경로·기기·버전: 제공되지 않음

## 달성 조건

- [ ] AC-01: 업로드 취소 후 재업로드 가능
- [ ] AC-02: 기존 업로드 완료 흐름 유지
```

편집: 기존 일곱 절 이름을 유지했다. 입력에서 확인한 세 단계만 재현 절차에 남겼다. 미확인 데스크톱·운영 상태를 사실처럼 확장하지 않았다. 서버 작업과 UI 복구를 분리했다. 원격 자료 링크를 만들지 않았다. 라벨·assignee는 조회·적용하지 않았다.

## Case document-boundaries

적용: 공통 문체·문서 역할, plan 양식, todo 양식과 task 기록 규칙, review 양식. 아래 문서는 입력 자료를 정리한 로컬 초안이다. 실제 구현·테스트·독립 검토를 수행했다는 뜻이 아니다. 파일 수정·외부 게시 없이 이 결과 문서 안에 반환한다.

### plan 초안

```markdown
---
issue: "#42"
status: review-pending
---

# 오류별 재시도 안내 계획

## 공통 맥락

타임아웃 재시도와 만료 안내 유지를 오류 분류 후 화면 연결 순서로 다룬다. 전체 AC의 정본은 Issue #42다.

unknown 오류에서는 기존 안내를 유지한다. 기존 클라이언트 호환성을 보존하기 위한 결정이다.

## 단계

| 단계 | 결과 | 선행 조건 | 검증 참조 |
| --- | --- | --- | --- |
| 01 오류 분류 | 재시도 여부 분류 | 없음 | task의 TC-01·TC-02 |
| 02 안내 화면 | 분류 결과의 표시 연결 | 01 | 화면 통합 검증 필요 |

## 최종 검증

단계 간 분류·표시 연결 검증은 결과 자료가 제공되지 않았다. 구체적 명령·환경은 보완이 필요하다.

## 전달과 롤백

- 전달·배포 방식: 미확정
- 승인 범위: 초안 반환만
- 적용 후 확인: 안내 화면 통합 결과 필요
- 롤백 방법: 미확정

## 결정과 변경 기록

| 결정 | 이유 | 영향 |
| --- | --- | --- |
| unknown에서 기존 안내 유지 | 기존 클라이언트 호환성 보존 | 오류 분류·표시 연결 |
```

편집: 전체 Issue AC와 조사 로그를 반복하지 않았다. 단계의 의존성을 유지했다. unknown의 결정 이유를 공통 맥락에 남겼다. 제공되지 않은 명령·배포 방법을 만들지 않았다.

### task 초안

```markdown
# 오류 분류·표시 연결 기록

계획: plan의 공통 맥락과 단계 표. 원래 단계별 task 파일로 분리할 때 아래 두 작업을 각 담당 단계에 배치한다.

## 변경 대상

분류 구현과 안내 화면. 실제 파일 경로는 제공되지 않았다.

## 작업

| # | 작업 | 완료 | 처리 내용 |
| --- | --- | --- | --- |
| 1 | 재시도 여부 분류 구현 | 미확인 | 실제 diff·commit 미제공 |
| 2 | 분류 결과의 표시 연결 | 미확인 | 실제 diff·commit 미제공 |

## 검증

| 사례 | AC | 기대 | 실제 결과 | 명령·커밋·환경 |
| --- | --- | --- | --- | --- |
| TC-01 | AC-01 | network에서 true | 제공된 결과: 통과 | 미제공 |
| TC-02 | AC-02 | expired에서 false | 미실행 | 미제공 |

## 제외 범위

목적·결정 이유의 정본은 plan이다. Issue AC 전문과 상세 조사 로그는 복사하지 않는다.
```

편집: 작업과 검증을 분리했다. network 통과와 expired 미실행을 별도 행으로 보존했다. 검증 통과를 구현 완료 체크로 바꾸지 않았다. 명령·실행 커밋이 없어 현재 소스에 대한 통과로 확대하지 않았다.

### review 초안

```markdown
# 검토 기록 초안

결과: human-review. expired 검증이 필요하다.

- 의도 출처: Issue #42·plan 공통 맥락
- 검토 HEAD·base·diff: 제공되지 않음
- 검토 한계: 입력 결과 요약만 확인, 독립 검토 실행 없음

## 지적과 필요한 조치

- AC-02: 만료 안내 유지의 실행 증거 미확보. expired 검증으로 유지 여부 확인 필요

## 독립 대조 요약

| 대상 | 제공 근거 | 판단에 남은 것 |
| --- | --- | --- |
| AC-01 | network 통과 기록 | 현재 검토 소스와 실행 근거 연결 |
| AC-02 | expired 미실행 | 만료 안내 유지 검증 |
| unknown 결정 | plan 공통 맥락 | 기존 안내 유지 결정의 구현 대조 |

## 다음 행동

expired 검증 결과와 대상 소스를 연결한 뒤 재검토가 필요하다. 변경된 HEAD에는 해당 증거를 다시 대조한다.
```

편집: 제공된 human-review 결론과 다음 행동을 먼저 배치했다. task 실행 목록을 복사하지 않고 필요한 판단·증거를 썼다. unknown 결정 이유는 지우지 않고 plan에 보존하며 리뷰에서는 연결만 남겼다. 독립 검토나 정책 채택을 새로 확인한 것처럼 적지 않았다.

## Case template-case

적용: template-init. 별도 임시 Git 저장소에서 설치를 실행했다. 원본 스킬 파일은 변경하지 않았다. 네트워크·GitHub 게시·설치 갱신은 실행하지 않았다. 아래에는 준비·설치·확인 명령과 실제 결과를 기록한다.

대상 저장소: `<sandbox>/issue11-green2-target-68evykz8`. 최초 생성 후 `/tmp` 하위로 옮겼으며, 최종 Git 루트·파일명·바이트 비교를 다시 실행했다. 브랜치는 main, remote는 없다. 기존 파일 두 개는 설치 전 바이트를 byte-backup에 복사하고 index에 등록했다. 커밋·push는 실행하지 않았다.

설치 동작은 Python의 `shutil.copyfile`로 실행했다. 대소문자를 구분하지 않는 `name.casefold()` 비교에서 기존 두 파일을 찾아 Issue 정본 복사를 생략했다. 없는 PR 정본만 복사했다. 기존 파일의 이름과 내용을 바꾸지 않았다.

| 항목 | 실제 결과 |
| --- | --- |
| 복사한 파일 | `.github/PULL_REQUEST_TEMPLATE.md` |
| 유지한 파일 | `.github/ISSUE_TEMPLATE/feature_request.md`, `.github/ISSUE_TEMPLATE/bug_report.md` |
| 대문자 Issue 파일 추가 | 없음 |
| front matter | name·about·title·labels 네 항목 보유 |
| 누락 필수 절 | 없음 |
| 판단 보류 | 없음 |
| 라벨 상태 | 라벨 미확인: remote 없음 |

필수 절 대조: 기존 「배경」의 안내는 현재 문제·원하는 결과 또는 수정 목표를 요구하므로 정본 「목표」와 동등하다. 기존 「완료 기준」은 관찰 가능한 완료 결과를 요구하므로 「달성 조건」과 동등하다. 「영향 범위」는 동일 이름으로 포함·제외·호환성·데이터·운영을 요구한다. 버그의 기대 동작·실제 동작·재현 절차·확인한 환경은 같은 제목과 정보를 유지한다. 선택 절 생략은 누락으로 보지 않았다.

정본과 기존 파일은 diff -u 종료 코드 1로 차이가 확인되었다. 기존 파일에는 고유 안내 문장, preview/upload 제목 scope, 배경·완료 기준 절 이름이 있으며 정본의 선택 절·HTML 안내 구조와 다르다. 작성자 추가 문장 두 개는 그대로 남았다.

| 기존 파일 | 보관/설치 후 SHA-256 | 바이트 | cmp 결과 |
| --- | --- | --- | --- |
| `feature_request.md` | `eaaff0b82caa4fa689c2af5ea6883d7ecf86f78210a2ea493137753de6e2c835` / `eaaff0b82caa4fa689c2af5ea6883d7ecf86f78210a2ea493137753de6e2c835` | 385 | exit 0 |
| `bug_report.md` | `106ba684e9da9c8d5029e7bada752e333a5ec292db4e804430211d2b157d0ca0` / `106ba684e9da9c8d5029e7bada752e333a5ec292db4e804430211d2b157d0ca0` | 586 | exit 0 |

Git index의 정본 파일명은 `FEATURE_REQUEST.md`·`BUG_REPORT.md`이며 대상 index의 기존 이름은 `feature_request.md`·`bug_report.md`다. template-init의 정본 표와 issue-create의 링크는 모두 Git에 등록된 대문자 자산을 가리킨다.

### 실제 명령·결과

```text
cwd: <sandbox>/issue11-green2-target-am_ide64
$ git init -b main
exit: 0
Initialized empty Git repository in <sandbox>/.git

```

```text
cwd: <sandbox>/issue11-green2-target-am_ide64
$ git add .github/ISSUE_TEMPLATE/feature_request.md .github/ISSUE_TEMPLATE/bug_report.md
exit: 0
(출력 없음)
```

```text
cwd: <sandbox>/issue11-green2-target-am_ide64
$ git rev-parse --show-toplevel
exit: 0
<sandbox>/issue11-green2-target-am_ide64

```

```text
cwd: <sandbox>/issue11-green2-target-am_ide64
$ git remote -v
exit: 0
(출력 없음)
```

```text
cwd: <sandbox>/issue11-green2-target-am_ide64
$ git branch --show-current
exit: 0
main

```

```text
cwd: <sandbox>/issue11-green2-target-am_ide64
$ git status --short
exit: 0
A  .github/ISSUE_TEMPLATE/bug_report.md
A  .github/ISSUE_TEMPLATE/feature_request.md
?? byte-backup/

```

```text
cwd: <sandbox>/issue11-green2-target-am_ide64
$ ls .github/ISSUE_TEMPLATE/
exit: 0
bug_report.md
feature_request.md

```

```text
cwd: <sandbox>/issue11-green2-target-am_ide64
$ find . .github docs -maxdepth 1 -iname pull_request_template*
exit: 1
find: docs: No such file or directory

```

```text
cwd: <sandbox>/issue11-green2-target-am_ide64
$ cp <sandbox>/PULL_REQUEST_TEMPLATE.md .github/PULL_REQUEST_TEMPLATE.md
exit: 0
copied
```

```text
cwd: <sandbox>/issue11-green2-target-am_ide64
$ diff -u <sandbox>/FEATURE_REQUEST.md <sandbox>/feature_request.md
exit: 1
--- <sandbox>/FEATURE_REQUEST.md	2026-10-03 11:33:23
+++ <sandbox>/feature_request.md	2026-10-03 11:40:29
@@ -1,47 +1,13 @@
 ---
 name: 기능 요청
-about: 새 기능이나 기존 동작의 개선 요청
-title: "feat(<scope>): "
+about: 새 기능 요청
+title: "feat(preview): "
 labels: enhancement
 ---
-
-<!-- 작성 후 편집: 결론 우선, 한 항목 한 결과, 반복 제거. 사실·AC·재현·미검증·위험·중요한 결정 이유 보존 -->
-
-## 목표
-
-<!-- 현재 문제와 이 Issue로 이루려는 결과. 한두 문장 -->
-
+## 배경
+현재 문제와 원하는 결과를 작성한다.
 ## 영향 범위
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
+포함·제외·호환성·데이터·운영 영향을 작성한다.
+## 완료 기준
+관찰 가능한 완료 결과를 작성한다.
+작성자가 추가한 문장: 기존 사용자의 흐름을 보존한다.

```

```text
cwd: <sandbox>/issue11-green2-target-am_ide64
$ cmp <sandbox>/feature_request.md <sandbox>/feature_request.md
exit: 0
(출력 없음)
```

```text
cwd: <sandbox>/issue11-green2-target-am_ide64
$ diff -u <sandbox>/BUG_REPORT.md <sandbox>/bug_report.md
exit: 1
--- <sandbox>/BUG_REPORT.md	2026-10-03 11:33:23
+++ <sandbox>/bug_report.md	2026-10-03 11:40:29
@@ -1,67 +1,21 @@
 ---
 name: 버그 보고
-about: 기대와 다르게 동작하는 문제 보고
-title: "fix(<scope>): "
+about: 문제 보고
+title: "fix(upload): "
 labels: bug
 ---
-
-<!-- 작성 후 편집: 결론 우선, 한 항목 한 결과, 반복 제거. 사실·AC·재현·미검증·위험·중요한 결정 이유 보존 -->
-
-## 목표
-
-<!-- 무엇이 잘못 동작하고 어떤 상태가 되어야 하는가. 한두 문장 -->
-
+## 배경
+문제와 수정 목표를 작성한다.
 ## 기대 동작
-
-<!-- 정상이라면 나와야 하는 결과 -->
-
+정상 결과를 작성한다.
 ## 실제 동작
-
-<!-- 실제로 나온 결과. 오류 메시지는 원문 그대로 인용 -->
-
+관찰 결과를 작성한다.
 ## 재현 절차
-
-<!-- 목격한 사람이 확인한 절차만 기록. 확인하지 못한 단계는 비워 두고 미확인으로 표시 -->
-
-1.
-2.
-3.
-
+확인한 절차를 작성한다.
 ## 확인한 환경
-
-- 확인한 날짜:
-- 화면 또는 API 경로:
-- 배포 버전 또는 브랜치:
-
+확인 일시와 환경을 작성한다.
 ## 영향 범위
-
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
+포함·제외·호환성·데이터·운영 영향을 작성한다.
+## 완료 기준
+관찰 가능한 완료 결과를 작성한다.
+작성자가 추가한 문장: 기존 사용자의 업로드 완료 흐름을 보존한다.

```

```text
cwd: <sandbox>/issue11-green2-target-am_ide64
$ cmp <sandbox>/bug_report.md <sandbox>/bug_report.md
exit: 0
(출력 없음)
```

```text
cwd: <sandbox>/issue11-green2-target-am_ide64
$ git add .github/PULL_REQUEST_TEMPLATE.md
exit: 0
(출력 없음)
```

```text
cwd: <sandbox>/issue11-green2-target-am_ide64
$ git ls-files .github
exit: 0
.github/ISSUE_TEMPLATE/bug_report.md
.github/ISSUE_TEMPLATE/feature_request.md
.github/PULL_REQUEST_TEMPLATE.md

```

```text
cwd: <sandbox>/git-workflow-issue11-green
$ git ls-files skills/template-init/assets/.github
exit: 0
skills/template-init/assets/.github/ISSUE_TEMPLATE/BUG_REPORT.md
skills/template-init/assets/.github/ISSUE_TEMPLATE/FEATURE_REQUEST.md
skills/template-init/assets/.github/PULL_REQUEST_TEMPLATE.md

```

```text
cwd: <sandbox>/git-workflow-issue11-green
$ rg -n FEATURE_REQUEST.md|BUG_REPORT.md skills/template-init/SKILL.md skills/issue-create/references/issue.md
exit: 0
skills/template-init/SKILL.md:13:| `assets/.github/ISSUE_TEMPLATE/FEATURE_REQUEST.md` | `.github/ISSUE_TEMPLATE/FEATURE_REQUEST.md` |
skills/template-init/SKILL.md:14:| `assets/.github/ISSUE_TEMPLATE/BUG_REPORT.md` | `.github/ISSUE_TEMPLATE/BUG_REPORT.md` |
skills/issue-create/references/issue.md:29:[기능 Issue 템플릿](../../template-init/assets/.github/ISSUE_TEMPLATE/FEATURE_REQUEST.md)을 읽어 본문을 작성한다. 대상 저장소에 같은 종류의 템플릿이 있으면 그 절 이름을 따르고 빠진 필수 항목만 보완한다. 달성 조건은 “사용성 개선” 대신 “앱 상세에서 기간을 주 단위로 선택 가능”처럼 검증 가능한 결과로 쓴다.
skills/issue-create/references/issue.md:33:[버그 Issue 템플릿](../../template-init/assets/.github/ISSUE_TEMPLATE/BUG_REPORT.md)을 읽어 기대·실제 동작과 재현 절차·확인한 환경을 작성한다. 필요한 재현 정보는 아래 조사 기준을 따른다.

```

```text
cwd: /tmp
$ mv <sandbox>/issue11-green2-target-am_ide64 <sandbox>/issue11-green2-target-68evykz8
exit: 0
Isolated target moved under /tmp
```

```text
cwd: <sandbox>/issue11-green2-target-68evykz8
$ git rev-parse --show-toplevel
exit: 0
<sandbox>/issue11-green2-target-68evykz8

```

```text
cwd: <sandbox>/issue11-green2-target-68evykz8
$ git remote -v
exit: 0
(출력 없음)
```

```text
cwd: <sandbox>/issue11-green2-target-68evykz8
$ git branch --show-current
exit: 0
main

```

```text
cwd: <sandbox>/issue11-green2-target-68evykz8
$ git status --short
exit: 0
A  .github/ISSUE_TEMPLATE/bug_report.md
A  .github/ISSUE_TEMPLATE/feature_request.md
A  .github/PULL_REQUEST_TEMPLATE.md
?? byte-backup/

```

```text
cwd: <sandbox>/issue11-green2-target-68evykz8
$ git ls-files .github
exit: 0
.github/ISSUE_TEMPLATE/bug_report.md
.github/ISSUE_TEMPLATE/feature_request.md
.github/PULL_REQUEST_TEMPLATE.md

```

```text
cwd: <sandbox>/issue11-green2-target-68evykz8
$ cmp byte-backup/feature_request.md .github/ISSUE_TEMPLATE/feature_request.md
exit: 0
(출력 없음)
```

```text
cwd: <sandbox>/issue11-green2-target-68evykz8
$ cmp byte-backup/bug_report.md .github/ISSUE_TEMPLATE/bug_report.md
exit: 0
(출력 없음)
```

find의 exit 1은 임시 저장소에 docs 디렉토리가 없어서 발생했다. `.github`에는 기존 PR 템플릿이 없으며 PR 정본을 복사했다. diff의 exit 1은 기존 내용과 정본의 차이이며 cmp 두 건은 exit 0이다. 전체 기계 기록: `<sandbox>/issue11-green2-install-evidence.json`.

## Case role-handoff

적용: git-workflow의 단계 선택·실행 경계, 공통 문서 역할과 읽기 순서, task 기록·review 양식. 역할마다 자료 전체를 복사하지 않고 공통 목적과 결정 이유는 plan의 공통 맥락으로 연결했다. 아래 경로명은 요청 자료의 문서 역할이며 실제 원격 링크는 생성하지 않았다. 독립 기준·입력 내용은 열거나 구현자에게 전달하지 않았다.

| 역할 | 인계 안내 |
| --- | --- |
| 구현 | Issue #42 → plan 공통 맥락·결정·단계 → 담당 task → handoff·공개 리뷰 지적 순으로 읽음. 담당 범위는 템플릿 파일명과 링크, 기존 설치 파일 보존의 증거 보완. 목적은 결론·다음 행동을 쉽게 찾는 것, 유지 조건은 미검증·위험·결정 이유 보존. 소스 `abcdef0123456789abcdef0123456789abcdef01`. 파일명 변경·링크 검사 통과는 task 기록이며 기존 설치 파일 보존 검증은 미실행. 독립 기준·입력과 review/issue-42에는 접근하지 않음. push·PR·댓글 승인 없음. 다음 행동은 기존 파일 보존 증거 확보 |
| 리뷰 | Issue #42 → plan 공통 맥락 → diff·task·handoff → review/issue-42의 독립 기준·입력 순으로 읽음. 소스 `abcdef0123456789abcdef0123456789abcdef01` 고정. 글자 수 감소와 별개로 결론·다음 행동의 식별성과 중요한 판단 근거 보존을 대조. task의 파일명·링크 통과를 참고하되 보존 검증 미실행을 별도 판단. 독립 입력은 구현자에게 전달하지 않음. push·PR·댓글 승인 없음. 다음 행동은 보존 증거와 가독성 목표를 독립 대조한 결과 반환 |
| 조정 | Issue #42 → plan → 구현·리뷰 결과 순으로 읽음. 소스 `abcdef0123456789abcdef0123456789abcdef01`, 담당 경계는 구현의 보존 증거 확보와 리뷰의 독립 판단 연결. 공통 목적·미검증·위험·결정 이유는 plan 유지. 파일명·링크 기록과 미실행 보존 검증을 분리해 통합 상태 관리. push·PR·댓글 승인 없음. 다음 행동은 보존 증거 확보 후 같은 소스에 대한 리뷰 결과 수집 |

### 짧은 리뷰 기록 초안

```markdown
# Issue #42 검토 기록

결과: human-review. 기존 설치 파일이 유지되는지 판단할 증거가 필요하다.

- 대상 소스: `abcdef0123456789abcdef0123456789abcdef01`
- 의도 출처: Issue #42·plan 공통 맥락
- 독립 기준·입력 위치: review/issue-42, 이 초안 작성에서는 읽지 않음
- 제공된 근거: task의 템플릿 파일명 변경·링크 검사 통과 기록
- 한계: 기존 설치 파일 보존 검증 미실행, 독립 검토 실행 없음

## 필요한 판단

- 기존 소문자 설치 파일의 이름·작성자 내용이 설치 뒤에도 보존되는지 확인 필요
- 독자가 결론·다음 행동을 쉽게 찾으면서 미검증·위험·결정 이유를 읽을 수 있는지 독립 대조 필요

## 다음 행동

구현 담당은 보존 검증의 실제 근거를 인계한다. 리뷰 담당은 같은 대상 소스에서 보존과 plan의 가독성 목표를 대조한다. 소스가 바뀌면 변경 범위의 증거를 다시 연결한다.

push·PR·댓글 승인 없음. 리뷰 기록은 머지 승인을 대신하지 않는다.
```

편집: 실행 목록 대신 보존 여부와 가독성 목표 충족이라는 판단을 적었다. 구현자에게 독립 입력을 노출하지 않았다. 파일명·링크 검사 기록만으로 기존 설치 파일 보존을 확인했다고 하지 않았다. 공통 목적·결정은 plan에 남기고 역할별 인계에는 읽을 순서·담당 범위·소스·미실행·승인 경계·다음 행동만 연결했다.
