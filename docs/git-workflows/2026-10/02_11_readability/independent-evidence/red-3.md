# 독립 실행 결과 3

소스: `<sandbox>/git-workflow-issue11-baseline` (요청에서 지정한 archive 4287c2f). 입력: `<sandbox>/issue11-independent-inputs.txt`. 각 Case는 해당 입력만으로 별도 초안을 작성했다. 원격 조회·게시, 소스 변경, 구현은 실행하지 않았다. 입력의 example-lab 및 #42는 시나리오 식별자다. 아래 human-review는 입력이 제공한 현재 상태를 옮긴 것이며 실행자의 판정이 아니다.

## Case pr-unverified

적용: pr-create, PR 양식, handoff 계약, 공통 문체·링크·Issue 연결 규칙.

출력 상태: 본문 초안 / review-pending. 승인된 원격 행동 없음. handoff.md·plan/todo 원문·base와 상세 실행 근거가 제공되지 않아 PR 생성 준비 완료를 주장하지 않는다. 다음은 요청된 필수 절을 유지한 초안이다.

제목 초안: `feat(api-response): 선택 필드 추가와 기존 기본값 유지`

```markdown
## Issue

- 관련 Issue: https://github.com/example-lab/catalog/issues/42
- 이번 PR의 해결 범위: AC-01~03

## 변경 내용

신규 API 응답에 optional field를 추가한다. 기존 클라이언트의 기본값은 유지한다.

## 바뀐 곳

변경 파일 경로는 제공되지 않았다. 실제 diff 확인 후 파일·폴더와 변경 이유를 연결한다.

## 계획과 검토 근거

- 검토 소스: 0123456789012345678901234567890123456789
- base: 미확인
- 계획·작업·구현 인계: 원문 미제공, 문서 미push로 원격 링크 준비 중
- 최종 리뷰: human-review

## 검증 상태

구조 검사 18/18이 통과했다. 행동 테스트 12개는 이전 base에서 통과한 이력이며, 최신 base 통합 뒤 행동 테스트는 재실행하지 않았다. 권한 실패 처리와 실제 운영 로그는 미검증이다.

검사 명령·환경·시각과 각 실행 커밋은 제공되지 않았다. 최신 통합 소스의 행동 검증과 미검증 증거 보완이 필요하다.

## 위험과 전달

권한 실패 처리와 운영 동작의 증거가 남아 있다. API를 먼저 배포하고 클라이언트를 뒤이어 배포한다. 롤백은 API 변경 revert다. push·PR 생성·댓글 게시는 승인되지 않았다.

## 머지 뒤 조치

- 배포 순서: API → 클라이언트
- 롤백: API 변경 revert
```

PR URL·headRefOid·적용 라벨·assignee: 생성하지 않아 해당 없음. 라벨 목록은 조회하지 않았다. 없는 문서 URL을 만들지 않았다.

## Case issue-existing-template

적용: issue-create, Issue 양식, 공통 문체. 중복 없음은 제공된 조사 자료로 사용했다. 기존 필수 절 이름을 유지하며, 내용이 없는 선택 절인 관련 문서는 생략했다.

제목 초안: `fix(image-preview): 타임아웃에서 재시도 버튼 표시`

```markdown
## 배경

이미지 미리보기가 네트워크 타임아웃으로 실패해도 재시도 버튼이 숨겨진다. 사용자가 타임아웃에서 다시 시도할 수 있도록 버튼을 표시한다.

## 영향

- 포함: 미리보기 오류 분류와 재시도 버튼 표시
- 유지: 만료 URL의 기존 만료 안내
- 제외: 자동 재전송
- 데이터 변경: 없음

## 완료 기준

- [ ] AC-01: 네트워크 타임아웃에서 재시도 버튼 표시
- [ ] AC-02: 만료 URL에서 기존 만료 안내 유지
```

본문 초안만 반환했다. 원격 Issue 생성·라벨 생성·라벨 적용·assignee 지정은 실행하지 않았다. 확인된 디자인 URL이 없어 링크를 추가하지 않았다.

## Case issue-bug-boundary

적용: issue-create의 버그 양식 및 재현 정보 규칙. 대상 기존 절 이름을 유지했다.

제목 초안: `fix(file-upload): 취소 후 재업로드 버튼 복구`

```markdown
## 목표

파일 업로드를 취소한 뒤 다시 업로드할 수 있도록 버튼 상태를 복구한다.

## 영향 범위

- 포함: 업로드 취소 후 UI 상태 복구
- 제외: 서버 재전송·파일 삭제
- 파일 데이터 마이그레이션: 없음
- 운영 영향·운영 재현: 미확인

## 재현 절차

1. staging의 모바일 Safari에서 파일 업로드
2. 업로드 취소
3. 다시 업로드 시도

## 기대 동작

취소 후 다시 업로드할 수 있다.

## 실제 동작

버튼이 비활성 상태로 남아 페이지를 새로고침하기 전까지 다시 업로드할 수 없다.

## 확인한 환경

- 확인 날짜: 2026-10-02
- 환경: staging, 모바일 Safari
- 화면·API 경로 및 배포 버전: 미제공
- 데스크톱 브라우저 재현: 미확인

## 달성 조건

- [ ] AC-01: 취소 후 재업로드 가능
- [ ] AC-02: 기존 업로드 완료 흐름 유지
```

본문 초안만 반환했다. 관찰되지 않은 데스크톱·운영 재현을 만들지 않았으며 원격 링크도 추가하지 않았다.

## Case document-boundaries

적용: 공통 문체, plan 양식, todo 양식, task-implement 기록 규칙, review 양식. 요청 범위는 짧은 초안이므로 검토 기준 작성이나 구현은 수행하지 않았다. 미제공 경로·명령·커밋은 만들지 않았다.

### plan 초안

```markdown
---
issue: "#42"
status: review-pending
---

# 재시도 안내 계획

## 요청

> 외부 게시·파일 수정 없이 다음 자료를 plan·task·review의 짧은 초안으로 나눠 작성한다. 각 초안 뒤 불필요·중복·복합 주장을 편집한다.

- 해석: Issue #42의 오류 분류와 안내 화면 변경 기록
- 남은 결정: 전달·롤백 방법과 최종 검증 명령 미제공

## 현재 동작과 변경 이유

타임아웃 재시도 표시와 만료 안내 유지를 Issue #42의 AC-01·02에 맞춘다. 현행 코드 근거 위치는 미제공이다.

## 범위

오류 분류와 안내 화면을 변경한다. unknown 오류는 기존 안내를 유지한다.

## 단계

| 단계 | 작업 | 검증 | 완료 |
| --- | --- | --- | --- |
| 01 | 오류 분류 | task-01의 TC-01·02 | [ ] |
| 02 | 안내 화면 변경 | 화면 연결 검증 자료 미제공 | [ ] |

실행 순서는 01 → 02다.

## 최종 검증

단계 간 안내 화면 통합 검증의 명령·결과는 미제공이다.

## 전달과 롤백

전달·롤백 방법은 미제공이다. 이 요청은 초안 반환까지이며 외부 게시·파일 수정은 수행하지 않는다.

## 결정과 변경 기록

| 구분 | 결정 | 근거 |
| --- | --- | --- |
| 결정 | unknown에서 기존 안내 유지 | 기존 클라이언트 호환성 보존 |
```

편집: 전체 AC 문장은 Issue를 정본으로 두고 재복사하지 않았다. 조사 로그도 반복하지 않았다. unknown 결정과 호환성 이유는 구현 판단의 맥락이므로 plan에 남겼다. 단계 완료와 일부 검증 통과를 하나의 완료 주장으로 합치지 않았다.

### task 초안

```markdown
# 01 오류 분류

계획: plan의 단계 및 결정과 변경 기록

## 변경 대상

오류 분류 코드·테스트 경로는 미제공이다. 경로를 조사한 뒤 기록한다.

## 작업

| # | 작업 | 완료 | 처리 내용 |
| --- | --- | --- | --- |
| 1 | network·expired 오류 분류 구현 | [ ] | 구현 완료 근거 미제공 |
| 2 | unknown의 기존 안내 유지 연결 | [ ] | plan의 결정 참조 |
| 3 | 분류 결과의 표시 연결 | [ ] | 02 단계 인계 대상 |

## 검증

| 사례 | AC | 기대 결과 | 결과 |
| --- | --- | --- | --- |
| <a id="tc-01"></a>TC-01 | AC-01 | network에서 true | 통과; 명령·실행 커밋 미제공 |
| <a id="tc-02"></a>TC-02 | AC-02 | expired에서 false | 미실행 |

## 제외 범위

- 02 단계 안내 화면 변경
```

편집: 결정 이유의 전문은 task에 반복하지 않고 plan으로 연결했다. 작업 완료 표시를 검증 통과로 대신하지 않았다. 구현 경로·실행 명령과 완료 근거는 자료 부족으로 분리했다.

### review 초안

```markdown
# PR 검토 결과

- Issue: #42
- base·검토 HEAD·commit 범위: 미제공
- 의도 출처: Issue와 plan
- 결과: human-review (제공된 현재 결론)

## AC별 대조

| AC | 검증 사례 | 실행 결과 | 남은 판단 |
| --- | --- | --- | --- |
| AC-01 | network에서 true | 통과; 실행 커밋 미제공 | 현재 검토 소스에 적용되는 증거 확인 |
| AC-02 | expired에서 false | 미실행 | 기존 만료 안내 유지 여부 확인 |

## 계획 대조

unknown의 기존 안내 유지 결정은 plan에 남아 있다. 구현 위치와 대응 assertion은 미제공이므로 실제 반영 여부는 확인하지 못했다.

## 다음 행동

- expired 검증과 실행 근거 기록
- 검토 HEAD를 고정한 뒤 결과 적용 범위 확인
- 머지 승인 상태: 별도 승인 없음
```

편집: network 통과와 expired 미실행을 별도 행으로 나눴다. 전체 Issue·조사 로그·plan의 결정 이유를 review에 반복하지 않았다. review에는 남은 증거와 다음 행동을 남겼다.

## Case template-case

적용: template-init. 격리 Git 저장소 `<sandbox>/issue11-red3-template.tNfoup`에서 실행했다. remote는 없으며 작업 브랜치는 초기 기본 브랜치다. 기존 파일의 작성자 문장과 동등한 필수 절을 준비하고 복사 전 바이트를 `before/`에 저장했다.

실제 명령 전문과 stdout·stderr·종료 코드는 같은 저장소의 `commands.log`에 있다. 주요 실제 명령은 다음과 같다.

```sh
git init
cp <sandbox>/feature_request.md <sandbox>/feature_request.md
cp <sandbox>/bug_report.md <sandbox>/bug_report.md
git rev-parse --show-toplevel
git remote -v
git branch --show-current
git status --short
ls .github/ISSUE_TEMPLATE/
find . .github docs -maxdepth 1 -iname 'pull_request_template*'
diff -u <sandbox>/feature_request.md <sandbox>/feature_request.md
diff -u <sandbox>/bug_report.md <sandbox>/bug_report.md
cp <sandbox>/PULL_REQUEST_TEMPLATE.md .github/PULL_REQUEST_TEMPLATE.md
cmp <sandbox>/feature_request.md <sandbox>/feature_request.md
cmp <sandbox>/bug_report.md <sandbox>/bug_report.md
git status --short
```

`find`는 없는 docs 경로에 대한 오류를 반환했다. 기존 PR 템플릿 검색 출력은 비어 있었으며 `.github/PULL_REQUEST_TEMPLATE.md`만 새로 복사했다. diff는 기존 작성자 양식과 정본의 차이를 반환했다. 두 cmp 종료 코드는 모두 0이다.

| 대상 | 처리 | 절 대응 |
| --- | --- | --- |
| `.github/ISSUE_TEMPLATE/feature_request.md` | 기존 바이트 유지 | 배경 ↔ 목표, 영향 ↔ 영향 범위, 완료 기준 ↔ 달성 조건 |
| `.github/ISSUE_TEMPLATE/bug_report.md` | 기존 바이트 유지 | 영향 ↔ 영향 범위, 완료 기준 ↔ 달성 조건; 나머지 필수 절 동일 |
| `.github/PULL_REQUEST_TEMPLATE.md` | 정본 복사 | PR 템플릿 없음 확인 후 복사 |

영향 절은 포함·제외 및 호환성·데이터·운영을 요구하고, 완료 기준은 관찰 가능한 완료 결과를 요구하므로 동등 절로 기록했다. 선택 절 부재는 누락으로 적지 않았다. 라벨은 remote가 없어 미확인이다. 라벨 조회·생성은 실행하지 않았다.

바이트 SHA-256:

- feature_request.md 전·후: `9616145038b34f7645cf8a18fbabd4b115201aa0de051d1725fd5e22a84d925c`
- bug_report.md 전·후: `535da285ecdcd787ac89c4c40cc1ef0ae7cbf09789d4cb540e749defc6555117`

소스의 Git index를 `git ls-files skills/template-init/assets/.github`로 확인한 정확한 자산 파일명:

```text
skills/template-init/assets/.github/ISSUE_TEMPLATE/bug_report.md
skills/template-init/assets/.github/ISSUE_TEMPLATE/feature_request.md
skills/template-init/assets/.github/PULL_REQUEST_TEMPLATE.md
```

template-init의 매핑 표와 issue-create 양식 링크도 `bug_report.md`, `feature_request.md`를 사용한다. 입력은 새 자산을 FEATURE_REQUEST.md·BUG_REPORT.md라고 설명하지만 지정된 스냅샷에는 그 정확한 Git 이름이 없다. 스냅샷의 실제 정본과 참조를 사용했으며 대문자 자산이나 중복 Issue 템플릿을 만들지 않았다. 설치 갱신과 GitHub 게시도 하지 않았다.

실제 출력 이름은 기존 두 소문자 Issue 파일과 `.github/PULL_REQUEST_TEMPLATE.md`다. 이름·참조 검사 결과는 `names-and-references.txt`에 저장했다.

## Case role-handoff

적용: git-workflow의 역할 라우팅, task-implement의 입력 경계, PR handoff 계약, pr-review 양식. 인계 안내만 작성하고 독립 기준·입력은 열지 않았다.

### 구현 역할 안내

Issue #42의 plan·현재 task·handoff를 기준으로 `abcdef0123456789abcdef0123456789abcdef01`의 기존 설치 파일 보존 증거를 보완한다. 목적은 결론과 다음 행동을 쉽게 찾게 하는 것이며 미검증·위험·결정 이유를 보존한다. 템플릿 파일명 변경과 링크 검사 통과는 task의 제공된 기록이다. 기존 설치 파일 보존 검증은 미실행이다. `review/issue-42` 및 독립 기준·입력은 읽지 않는다. push·PR·댓글은 승인되지 않았다.

### 리뷰 역할 안내

검토 소스는 `abcdef0123456789abcdef0123456789abcdef01`이다. Issue·plan·task·handoff와 `review/issue-42`에 보관된 독립 기준·입력을 연결해 가독성 목표, 위험·미검증·결정 이유 보존, 기존 설치 파일 보존을 검토한다. task의 링크 검사 통과만으로 독립 검토를 완료하지 않는다. 기준을 읽은 리뷰 세션은 구현하지 않는다. 실제 게시 없이 리뷰 결과를 반환한다.

### 조정 역할 안내

기존 설치 파일 보존 증거 보완은 task-implement, 고정 소스의 의도·증거 검토는 pr-review로 연결한다. 구현과 독립 검토의 입력 경계를 유지하고, 검토 완료 뒤 PR 준비가 필요한 경우 pr-create로 넘긴다. push·PR 생성·댓글은 각각 승인 범위를 확인한다.

자료 전체를 역할마다 복사하지 않는다. Issue는 의도·AC, plan은 판단 맥락, task는 실제 작업·사례 결과, handoff는 상세 증거를 정본으로 연결하고 각 역할에는 담당 행동·소스·미확인·승인 범위만 전달한다.

### 짧은 리뷰 기록 초안

```markdown
# PR 검토 결과

- Issue: #42
- 검토 소스: abcdef0123456789abcdef0123456789abcdef01
- base·commit 범위·작업본 근거: 미제공
- 의도 출처: Issue와 plan
- 검토 기준: review/issue-42에 보관, 이 초안 작성에서는 미열람
- 현재 상태: 독립 판단 미수행

## 계획 대조

| 판단 대상 | 제공된 근거 | 남은 판단 |
| --- | --- | --- |
| 결론·다음 행동의 발견 용이성 | plan의 목적 | 실제 문서가 목적을 충족하는지 대조 |
| 미검증·위험·결정 이유 보존 | plan의 보존 조건 | 편집 과정에서 의미가 사라졌는지 확인 |
| 파일명·링크 | task의 변경·검사 통과 기록 | 검토 소스와 증거 대상 일치 확인 |
| 기존 설치 파일 보존 | 검증 미실행 | 기존 사용자 파일을 유지하는지 증거 확보 |

## 다음 행동

- 기존 설치 파일 보존 증거 보완 후 독립 검토
- Issue AC ID와 구현·assertion 대응 확인; 구체 AC는 미제공
- 결과 적용 소스 고정 및 변경 시 재검토
- 머지 승인 상태: 별도 승인 없음
```

이 기록은 실행 목록 대신 의도·보존·증거 적용 범위에 필요한 판단을 표현한다. 입력에 없는 AC·기준 커밋·파일 경로·독립 검토 결과는 만들지 않았다.
