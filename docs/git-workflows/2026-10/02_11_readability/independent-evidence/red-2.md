# 독립 실행 출력 2

대상: `<sandbox>/git-workflow-issue11-baseline`, 제공된 스냅샷 식별자 `4287c2f`.
입력: `<sandbox>/issue11-independent-inputs.txt`의 여섯 요청.
외부 조회·게시·원본 스냅샷 수정 없이 실행했다. 아래 식별자는 입력에서 제공된 예시 저장소와 커밋이다. 원격 자료를 새로 확인한 것은 아니다.

## Case pr-unverified

반환 상태: 본문 초안, review-pending. PR URL·실제 headRefOid·라벨·assignee는 원격 생성 미실행으로 미적용이다. handoff 문서와 base는 입력에 없어 미확인이다. 실제 PR 준비로 진행할 때 task-implement의 handoff와 대조가 필요하다.

제목 초안: `feat(api-response): 선택 필드 제공과 기존 기본값 유지`

```markdown
## Issue

- 관련 Issue: https://github.com/example-lab/catalog/issues/42
- 이번 PR의 해결 범위: AC-01~03

## 변경 내용

API 응답에 선택 필드를 추가하고 기존 클라이언트의 기본값을 유지한다.

## 바뀐 곳

| 파일·폴더 | 무엇이 |
| --- | --- |
| 경로 미확인 | 선택 필드와 기본값 유지 |

## 계획과 검토 근거

- 계획·작업·테스트 사례: 문서 링크 준비 중, 미push
- 구현 인계: handoff 문서 미제공
- base: 미확인
- 검토한 소스: `0123456789012345678901234567890123456789`

## 검증 상태

구조 검사는 18/18 통과했다. 행동 테스트 12개는 이전 base에서 통과했으며 최신 base 통합 뒤 재실행하지 않았다. 이전 결과는 최종 통합 상태의 행동 검증을 대신하지 않는다. 현재 최종 리뷰는 human-review다.

권한 실패 처리와 실제 운영 로그는 미검증이다. 실행 명령·환경·시각과 AC별 근거는 입력에 없어 인계 보완이 필요하다.

## 위험과 전달

권한 실패 처리와 실제 운영 환경의 동작은 추가 증거가 필요하다. push·PR·댓글 승인은 없다.

## 머지 뒤 조치

- 배포 순서: API 먼저, 클라이언트 나중
- 롤백: API 변경 revert
```

실행: 자료 정리만 수행했다. 테스트·push·PR·댓글은 실행하지 않았다.

## Case issue-existing-template

제목 초안: `fix(image-preview): 네트워크 타임아웃에서 재시도 표시`

```markdown
## 배경

이미지 미리보기가 네트워크 타임아웃으로 실패해도 재시도 버튼이 숨겨진다. 사용자가 미리보기를 다시 시도할 수 있도록 버튼을 표시한다.

## 영향

- 포함: 네트워크 타임아웃의 재시도 버튼 표시
- 유지: 만료 URL의 기존 만료 안내
- 제외: 자동 재전송
- 데이터 영향: 변경 없음

## 완료 기준

- [ ] AC-01: 네트워크 타임아웃 발생 시 재시도 버튼 표시
- [ ] AC-02: 만료 URL에서 기존 만료 안내 유지
```

조사 입력에는 동일 범위 Issue가 없다고 명시되어 있다. 기존 필수 절 이름을 유지하고 내용 없는 선택 절인 관련 문서를 생략했다. 확인된 디자인 문서 URL은 없다. 실제 Issue URL·번호와 라벨·assignee는 생성 미실행으로 없다. 남은 생성 결정은 이번 본문 초안 범위 밖이다.

실행: 본문 초안 작성만 수행했다. 외부 접근·Issue 생성·라벨 생성은 실행하지 않았다.

## Case issue-bug-boundary

제목 초안: `fix(file-upload): 취소 뒤 재업로드 버튼 복구`

```markdown
## 목표

파일 업로드를 취소한 뒤 버튼이 비활성 상태로 남아 재업로드할 수 없다. 취소 후 UI 상태를 복구해 다시 업로드할 수 있게 한다.

## 영향 범위

- 포함: 업로드 취소 후 UI 상태 복구
- 제외: 서버 재전송, 파일 삭제
- 데이터 영향: 파일 데이터 마이그레이션 없음
- 운영 영향·운영 재현: 미확인
- 데스크톱 브라우저 재현: 미확인

## 재현 절차

1. 파일 업로드
2. 업로드 취소
3. 다시 업로드 시도

## 기대 동작

업로드 취소 후 다시 업로드할 수 있다.

## 실제 동작

업로드 버튼이 비활성 상태로 남는다. 페이지를 새로고침하기 전까지 재업로드할 수 없다.

## 확인한 환경

- 확인한 날짜: 2026-10-02
- 환경: staging, 모바일 Safari
- 화면 또는 API 경로: 미확인
- 배포 버전 또는 브랜치: 미확인

## 달성 조건

- [ ] AC-01: 업로드 취소 후 재업로드 가능
- [ ] AC-02: 기존 업로드 완료 흐름 유지
```

동일 Issue 없음은 조사 입력의 확인 결과다. 실제 생성·외부 조회는 하지 않았다. 원격 자료 링크는 없다. 정확한 화면·API 경로와 버전은 입력에 없으므로 만들지 않았다.

## Case document-boundaries

### plan 초안

```markdown
---
issue: "#42"
status: review-pending
created: "2026-10-03"
---

# 재시도 안내 계획

## 요청

> 외부 게시·파일 수정 없이 다음 자료를 plan·task·review의 짧은 초안으로 나눠 작성한다. 각 초안 뒤 불필요·중복·복합 주장을 편집한다.

- 해석: 오류 분류 후 안내 화면 연결
- 남은 결정: 없음

## 현재 동작과 변경 이유

현재 동작의 코드 근거 위치는 미확인이다. 변경 결과와 AC의 정본은 Issue #42다.

## 범위

| 구분 | 내용 |
| --- | --- |
| 포함 | 오류 분류, 안내 화면 연결 |
| 미변경 소비자 | 기존 클라이언트 |
| 호환성 | unknown에서 기존 안내 유지 |
| 데이터·운영 영향 | 미확인 |
| 제외 | 입력에 별도 지정 없음 |

## 단계

| 단계 | 제목 | 검증 사례 | 완료 |
| --- | --- | --- | --- |
| 01 | 오류 분류 | task-01-error-classification.md의 TC-01·02 | [ ] |
| 02 | 안내 화면 연결 | 화면 통합 검증 설계 필요 | [ ] |

실행 순서는 01 → 02다.

## 최종 검증

안내 화면 통합 검증의 명령·환경·결과는 미확인이다. network 통과와 expired 미실행은 단계별 task에 기록한다.

## 전달과 롤백

이번 요청의 전달물은 대화 초안이다. 배포·롤백 계획은 입력에 없어 미확인이다. 외부 게시·파일 수정은 요청하지 않았다.

## 결정과 변경 기록

| 날짜 | 구분 | 내용 | 영향 단계 | 상태 |
| --- | --- | --- | --- | --- |
| 날짜 미제공 | 결정 | 기존 클라이언트 호환성 보존을 위해 unknown에서 기존 안내 유지 | 01·02 | 입력에서 확정 |
```

편집: AC 본문과 조사 로그 전문을 반복하지 않았다. 결정 이유는 plan에 남겼다. 분류·표시 구현 완료나 최종 통합 완료는 입력에서 확인되지 않아 주장하지 않았다. branch·base는 정해지지 않아 초안에 임의 값을 넣지 않았다.

### task 초안 01

```markdown
# 01 오류 분류

계획: plan.md의 단계·결정과 변경 기록

## 변경 대상

확인한 파일 경로가 없어 조사 후 기입한다.

## 작업

| # | 작업 | 완료 | 처리 내용 |
| --- | --- | --- | --- |
| 1 | 오류 분류 구현 | [ ] | 구현 완료 근거 미제공 |
| 2 | network 사례 검증 | [x] | 입력의 통과 보고; 실행 커밋 미확인 |
| 3 | expired 사례 검증 | [ ] | 미실행 |

## 검증

| 사례 | AC | 명령·작업 디렉토리 | 기대 결과 | 결과 |
| --- | --- | --- | --- | --- |
| <a id="tc-01"></a>TC-01 | AC-01 | 미제공 | network에서 true | 통과 보고, 실행 근거 미확인 |
| <a id="tc-02"></a>TC-02 | AC-02 | 미제공 | expired에서 false | 미실행 |

## 제외 범위

- 02 단계의 안내 화면 변경
```

편집: unknown 결정의 이유와 전체 AC를 task에 복사하지 않았다. 상세 실행 로그는 handoff에 둘 자료이며 현재 입력에는 없다.

### task 초안 02

```markdown
# 02 안내 화면 연결

계획: plan.md의 단계·결정과 변경 기록

## 변경 대상

안내 화면 파일 경로 미확인이다.

## 작업

| # | 작업 | 완료 | 처리 내용 |
| --- | --- | --- | --- |
| 1 | 오류 분류와 표시 연결 | [ ] | 구현 완료 근거 미제공 |
| 2 | AC-01 화면 동작 확인 | [ ] | 화면 검증 미제공 |
| 3 | AC-02 화면 유지 확인 | [ ] | 화면 검증 미제공 |

## 검증

| 사례 | AC | 명령·작업 디렉토리 | 기대 결과 | 결과 |
| --- | --- | --- | --- | --- |
| <a id="tc-03"></a>TC-03 | AC-01 | 미확인 | 타임아웃에서 재시도 표시 | 미실행 |
| <a id="tc-04"></a>TC-04 | AC-02 | 미확인 | 만료 안내 유지 | 미실행 |

## 제외 범위

- 01 단계의 오류 분류 구현
```

편집: 분류 함수 결과를 화면 검증 결과로 합치지 않았다. 기대 동작은 AC 참조와 해당 단계의 사례로만 표현했다.

### review 초안

```markdown
# PR 검토 결과

- Issue: #42
- plan / todo: 위 초안
- base / 검토 HEAD / 확인 시각: 미제공
- 의도 출처: Issue·plan 입력
- 검토 기준·spec-it: 입력 미제공
- 결과: human-review (입력의 현재 결론)

## AC별 대조

| AC | 기대 시나리오 | 구현·assertion | 실행 결과 | 누락·판단 |
| --- | --- | --- | --- | --- |
| AC-01 | network에서 true | 위치 미제공 | 통과 보고, 실행 커밋 미확인 | 현재 소스 증거 대조 필요 |
| AC-02 | expired에서 false | 위치 미제공 | 미실행 | 만료 안내 유지 여부 판단 보류 |

## 계획 대조

오류 분류 후 안내 화면을 연결하는 순서는 plan에 있다. 구현 위치와 화면 통합 결과가 없어 실제 변경 대조는 미완료다.

## 다음 행동

- expired 검증 결과 확보
- 결과 적용 HEAD 고정과 실행 근거 대조
- 현재 human-review 유지; 머지 승인과 별도
```

편집: 리뷰에 전체 Issue·조사 로그와 plan의 결정 이유를 반복하지 않았다. 리뷰에는 결론·판단 제한·다음 행동을 남겼다. unknown의 기존 안내 유지 이유는 삭제하지 않고 plan으로 연결했다.

실행: 문서 초안만 반환했다. 실제 검증이나 문서 파일 수정은 수행하지 않았다.

## Case template-case

대상 임시 Git 저장소: `<sandbox>/issue11-red2-template-v7lhe9yj`.
초기 파일을 만들어 바이트 사본을 `original-bytes/`에 보관했다. 기존 lowercase 두 파일은 정본에서 「목표」를 「배경」, 「달성 조건」을 「완료 기준」으로 바꾸고 작성자 문장을 추가한 fixture다. 같은 필수 정보를 요구하는 안내 문구는 유지했다.

baseline의 template-init 절차대로 기존 Issue 템플릿 두 파일은 유지하고 없는 PR 템플릿만 복사했다. Git 파일명 관찰을 위해 임시 저장소의 `.github`만 index에 추가했다. commit·push·GitHub 게시·라벨 생성은 하지 않았다.

결과:

- 복사: `.github/PULL_REQUEST_TEMPLATE.md`
- 유지: `.github/ISSUE_TEMPLATE/feature_request.md`, `.github/ISSUE_TEMPLATE/bug_report.md`
- 동등한 절: 목표 ↔ 배경, 달성 조건 ↔ 완료 기준. 본문 안내가 같은 정보를 요구함
- 차이: 위 제목 두 개와 작성자가 추가한 문장
- 누락 필수 절: 없음
- 라벨: 미확인, remote 없음

요청에는 새 자산명을 `FEATURE_REQUEST.md`·`BUG_REPORT.md`로 지정했다. 대상 스냅샷의 실제 Git 추적명과 스킬 참조는 아래처럼 lowercase다. 파일명을 새로 고치거나 원본 자산을 수정하지 않았다.

```text
$ git ls-files skills/template-init/assets
skills/template-init/assets/.github/ISSUE_TEMPLATE/bug_report.md
skills/template-init/assets/.github/ISSUE_TEMPLATE/feature_request.md
skills/template-init/assets/.github/PULL_REQUEST_TEMPLATE.md

$ rg -n 'FEATURE_REQUEST|BUG_REPORT|feature_request|bug_report' skills/template-init skills/issue-create
skills/template-init/SKILL.md:13: assets/.github/ISSUE_TEMPLATE/feature_request.md → .github/ISSUE_TEMPLATE/feature_request.md
skills/template-init/SKILL.md:14: assets/.github/ISSUE_TEMPLATE/bug_report.md → .github/ISSUE_TEMPLATE/bug_report.md
skills/issue-create/references/issue.md:29: 기능 템플릿 참조 feature_request.md
skills/issue-create/references/issue.md:33: 버그 템플릿 참조 bug_report.md
```

관련 참조 네 개는 실제 lowercase 자산을 가리켰다. 스냅샷의 uppercase 자산 추적명은 관찰되지 않았다.

### 바이트 보존 결과

| 파일 | 바이트 | 전후 SHA-256 | 동일 바이트 |
| --- | --- | --- | --- |
| bug_report.md | 1353 | `95b7c962efb385c7c3b926829366e6b759e7669d6b2165e733a6a8d9c43f3ed9` | True |
| feature_request.md | 1012 | `601d4a8047a5bda1ab165aa15031689294922d718c589e3563e422886853eaab` | True |

### 실제 명령과 결과

초기 임시 경로에서 설치한 뒤 `/tmp` 아래로 이동했다. 처음 실행한 명령 출력의 작업 경로는 이동 전 경로다. 마지막 두 명령은 이동 후 저장소에서 실행했다.

```text
$ git init -q
exit=0
```

```text
$ git rev-parse --show-toplevel
exit=0
<sandbox>/issue11-red2-template-v7lhe9yj
```

```text
$ git remote -v
exit=0
```

```text
$ git branch --show-current
exit=0
main
```

```text
$ git status --short
exit=0
?? .github/
?? original-bytes/
```

```text
$ ls .github/ISSUE_TEMPLATE/
exit=0
bug_report.md
feature_request.md
```

```text
$ find . .github docs -maxdepth 1 -iname pull_request_template*
exit=1
find: docs: No such file or directory
```

```text
$ diff -u <sandbox>/feature_request.md <sandbox>/feature_request.md
exit=1
--- <sandbox>/feature_request.md	2026-10-03 10:13:53
+++ <sandbox>/feature_request.md	2026-10-03 11:28:34
@@ -5,7 +5,7 @@
 labels: enhancement
 ---

-## 목표
+## 배경

 <!-- 현재 문제와 이 Issue로 이루려는 결과. 한두 문장 -->

@@ -27,7 +27,7 @@

 -

-## 달성 조건
+## 완료 기준

 <!-- 완료를 관찰·검증할 수 있는 결과. AC-01부터 순서대로 ID 부여. Issue를 고쳐도 기존 ID 재사용 금지 -->

@@ -43,3 +43,5 @@
 ## 참고 링크

 <!-- 관련 기획·조사 문서, 논의 스레드, 기존 Issue/PR -->
+
+작성자가 추가한 문장: 이 저장소의 기존 사용자 안내 유지.
```

```text
$ diff -u <sandbox>/bug_report.md <sandbox>/bug_report.md
exit=1
--- <sandbox>/bug_report.md	2026-10-03 10:13:53
+++ <sandbox>/bug_report.md	2026-10-03 11:28:34
@@ -5,7 +5,7 @@
 labels: bug
 ---

-## 목표
+## 배경

 <!-- 무엇이 잘못 동작하고 어떤 상태가 되어야 하는가. 한두 문장 -->

@@ -47,7 +47,7 @@

 -

-## 달성 조건
+## 완료 기준

 <!-- 수정 후 관찰할 결과. AC-01부터 순서대로 ID 부여. 기존 정상 동작의 유지 조건도 포함 -->

@@ -63,3 +63,5 @@
 ## 참고 링크

 <!-- 관련 Issue/PR, 장애 기록, 논의 스레드 -->
+
+작성자가 추가한 문장: 이 저장소의 기존 사용자 안내 유지.
```

```text
$ git add .github
exit=0
```

```text
$ git ls-files .github
exit=0
.github/ISSUE_TEMPLATE/bug_report.md
.github/ISSUE_TEMPLATE/feature_request.md
.github/PULL_REQUEST_TEMPLATE.md
```

```text
$ git rev-parse --show-toplevel
exit=0
<sandbox>/issue11-red2-template-v7lhe9yj
```

```text
$ git ls-files .github
exit=0
.github/ISSUE_TEMPLATE/bug_report.md
.github/ISSUE_TEMPLATE/feature_request.md
.github/PULL_REQUEST_TEMPLATE.md
```

복사는 Python `shutil.copyfile`로 정본 PR 템플릿을 대상의 없는 경로에 복사했다. 기존 Issue 파일에는 쓰기를 하지 않았다. 보존 검사는 byte equality와 SHA-256으로 수행했다. 위 diff exit 1은 파일 차이이며 `find` exit 1은 없는 docs 경로의 오류다.

## Case role-handoff

### 구현 역할 인계

`task-implement`로 연결한다. Issue #42, plan의 단계·결정과 변경 기록, 현재 task, handoff, 작업 브랜치의 human-review 기록을 읽는다. 목적은 결론과 다음 행동을 쉽게 찾게 하는 것이며 미검증·위험·선택 이유는 보존한다. 전체 자료를 역할별로 복사하지 않고 정본 위치와 남은 작업만 전달한다.

기록된 완료는 템플릿 파일명 변경과 링크 검사다. 기존 설치 파일의 보존 증거를 보완한다. 현재 소스는 `abcdef0123456789abcdef0123456789abcdef01`이다. `review/issue-42`, 독립 기준과 고정 입력은 열지 않는다. 구현자가 독립 기준을 읽지 않았다는 입력 사실을 유지한다. 소스 변경 후 영향받는 검증을 갱신하고 handoff에 실제 근거를 남긴다.

### 리뷰 역할 인계

`pr-review`로 연결한다. Issue·plan·task·handoff·실제 diff와 검토 소스를 대조하고 `review/issue-42`의 독립 기준·입력을 읽는다. 입력에는 검토 기준 브랜치 이름만 있으므로 실제 경로·커밋은 리뷰 담당이 확인한다.

판단할 것은 파일명 변경·링크 검사만으로 독자의 결론·다음 행동 파악이 쉬워졌다고 볼 수 있는지, 미검증·위험·결정 이유가 보존되는지, 기존 설치 파일이 유지되는지다. 구현자의 결과는 참고이고 독립 입력의 재실행과 대조가 필요하다. 전체 조사 자료를 복사하지 않고 판단 근거 문서를 연결한다.

### 조정 역할 인계

`git-workflow`로 현재 단계와 경계를 조정한다. 검토 대상은 `abcdef0123456789abcdef0123456789abcdef01`로 고정한다. 기존 설치 파일 보존 증거와 독립 검토가 남았으므로 검증 인계 후 리뷰로 연결한다. 기준·입력을 읽은 세션은 Issue #42를 구현하지 않는다.

push·PR·댓글은 승인되지 않았다. 초안·로컬 검토 결과만 전달하고 원격 행동으로 확대하지 않는다. 자료 전체를 복사하지 않고 실제 문서 위치, 소스 식별자, 현재 결론과 남은 증거를 역할에 맞게 전달한다.

### 짧은 리뷰 기록

```markdown
# PR 검토 결과

- Issue: #42
- PR: 생성 미실행
- plan / task / handoff: 경로 미제공
- 검토 소스: `abcdef0123456789abcdef0123456789abcdef01`
- base / commit 범위 / 미커밋 변경 / 확인 시각: 미확인
- 의도 출처: Issue·plan 입력
- 독립 검토 기준·입력: `review/issue-42`, 커밋·경로 미확인
- spec-it: 입력 미제공
- 결과: human-review, 기존 설치 파일 보존 증거 미확보

## AC별 대조

AC ID와 원문은 입력에 없어 Issue와의 실제 대조가 필요하다. task의 파일명 변경·링크 검사 통과는 입력에서 보고된 결과이며 검토 소스·명령·환경·시각의 대조는 미완료다.

## 계획 대조

| 계획 의도 | 확인한 근거 | 필요한 판단 |
| --- | --- | --- |
| 결론·다음 행동을 쉽게 찾는 구성 | task의 파일명 변경·링크 검사 보고 | 독자가 필요한 결론과 행동을 찾을 수 있는지 |
| 미검증·위험·결정 이유 보존 | plan의 보존 결정 | 실제 출력에서 보존 여부 |
| 기존 설치 파일 유지 | 보존 검증 미실행 | 설치 뒤 기존 파일 바이트 유지 여부 |

## 다음 행동

기존 설치 파일 보존 증거와 독립 입력의 재실행 결과로 의도 충족을 판단한다. 소스가 바뀌면 새 소스의 증거를 대조한다. push·PR·댓글 승인은 없으며 리뷰 결과는 머지 승인을 대신하지 않는다.
```

실행: 역할별 안내와 리뷰 초안만 작성했다. 독립 기준·입력 내용은 읽지 않았고 실제 리뷰 판정이나 재실행을 수행하지 않았다. 위 human-review는 요청 자료에 남은 증거를 나타내는 초안 상태다.
