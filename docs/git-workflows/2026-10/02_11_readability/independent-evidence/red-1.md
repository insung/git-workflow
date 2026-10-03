# Independent execution 1 — baseline 4287c2f

대상: `<sandbox>/git-workflow-issue11-baseline`. 외부 Issue/PR은 입력의 가상 자료만 사용했다. GitHub 조회·게시, 실제 프로젝트 파일 변경, 구현, 테스트 실행은 하지 않았다. template-case의 임시 파일 조작과 결과 파일 저장만 실행했다. 아래 상태·검증 수치는 입력 자료의 기록이며 이번 실행자가 행동 테스트를 재실행한 결과가 아니다.

## Case pr-unverified

사용 지침: pr-create/SKILL.md, references/pr.md, references/handoff.md 및 공통 문체·표기·문서 링크·실행 경계·라벨.

제목 초안: `feat(api-response): 선택 필드 추가와 기존 기본값 유지`

### PR 본문 초안

```markdown
## Issue

- 관련 Issue: https://github.com/example-lab/catalog/issues/42
- 이번 PR의 해결 범위: AC-01~03

## 변경 내용

신규 API 응답에 optional field를 추가한다. 기존 클라이언트의 기본값은 유지한다.

## 바뀐 곳

| 파일·폴더 | 무엇이 |
| --- | --- |
| 경로 미제공 | 응답 선택 필드와 기존 기본값 유지 |

## 계획과 검토 근거

- 계획·작업·구현 인계: 미push 문서, 원격 링크 준비 중
- base: 미제공
- 검토한 소스 commit: `0123456789012345678901234567890123456789`
- 최종 리뷰: human-review

## 검증 상태

구조 검사 18/18이 통과했다. 행동 테스트 12개 통과는 이전 base에서의 이력이다. 최신 base 통합 뒤 행동 테스트는 재실행하지 않았다.

권한 실패 처리와 실제 운영 로그는 미검증이다. 실제 실행 명령·환경·시각과 AC별 assertion 대응 자료는 제공되지 않았다. 현재 상태는 review-pending이다.

## 위험과 전달

권한 실패 처리와 운영 동작의 증거 보완이 필요하다. API를 먼저 배포하고 클라이언트를 나중에 배포한다. 롤백은 API 변경 revert다.

## 머지 뒤 조치

- 배포 순서: API → 클라이언트
- 롤백: API 변경 revert
```

초안 반환 상태: 본문 초안, review-pending. 원격 PR URL·headRefOid·라벨·assignee는 미적용이다. handoff 파일 존재와 원본 문서 위치가 제공되지 않아 원격 PR 준비 검사는 완료하지 않았다. 승인된 push·PR·댓글이 없어 원격 행동을 실행하지 않았다.

실제 명령/결과: 대상 스킬과 참조 `cat` 읽기만 실행(exit 0). GitHub 명령·행동 테스트 없음.

## Case issue-existing-template

사용 지침: issue-create/SKILL.md, references/issue.md, 기능 자산 및 공통 규칙. 동일 범위 Issue 없음은 입력의 조사 완료 자료를 사용했다. 대상 저장소 절 이름을 유지했다.

제목 초안: `fix(image-preview): 타임아웃에서 재시도 버튼 표시`

### Issue 본문 초안

```markdown
## 배경

이미지 미리보기의 네트워크 타임아웃에서도 재시도 버튼이 숨겨진다. 타임아웃에서는 사용자가 다시 시도할 수 있게 한다.

## 영향

- 포함: 타임아웃 재시도 버튼 표시, 만료 URL의 기존 만료 안내 유지
- 제외: 자동 재전송
- 데이터 변경: 없음
- 그 밖의 호환성·운영 영향: 미확인

## 완료 기준

- [ ] AC-01: 네트워크 타임아웃에서 재시도 버튼 표시
- [ ] AC-02: 만료 URL에서 기존 만료 안내 유지
```

관련 문서 절은 확인된 디자인 URL이나 쓸 내용이 없어 생략했다. 이 생략은 디자인 문서가 존재하지 않는다는 판정이 아니다. 실제 Issue 번호·URL은 생성하지 않았다. 라벨·assignee는 초안 요청 범위라 미적용이며 원격 목록은 조회하지 않았다. 계획·구현을 시작하지 않았다.

실제 명령/결과: 대상 issue-create 지침 및 자산 읽기(exit 0). 외부 조회·생성 없음.

## Case issue-bug-boundary

사용 지침: issue-create/SKILL.md, references/issue.md, 버그 자산 및 공통 규칙. 재현은 입력으로 확인된 단계만 사용했다.

제목 초안: `fix(file-upload): 취소 후 재업로드 버튼 복구`

### Issue 본문 초안

```markdown
## 목표

파일 업로드를 취소한 뒤 버튼이 비활성 상태로 남는다. 취소 후 다시 업로드할 수 있게 UI 상태를 복구한다.

## 영향 범위

- 포함: 업로드 취소 후 UI 상태 복구
- 제외: 서버 재전송, 파일 삭제
- 파일 데이터 마이그레이션: 없음
- 데스크톱 재현·운영 재현·운영 영향: 미확인
- 그 밖의 호환성 영향: 미확인

## 재현 절차

1. staging의 모바일 Safari에서 파일 업로드
2. 업로드 취소
3. 파일 다시 업로드

## 기대 동작

취소 후 페이지 새로고침 없이 재업로드할 수 있다.

## 실제 동작

버튼이 비활성 상태로 남아 페이지 새로고침 전까지 재업로드할 수 없다.

## 확인한 환경

- 확인 날짜: 2026-10-02
- 배포 환경: staging
- 브라우저: 모바일 Safari
- 화면 또는 API 경로: 미제공
- 배포 버전·Safari 버전: 미제공

## 달성 조건

- [ ] AC-01: 업로드 취소 후 재업로드 가능
- [ ] AC-02: 기존 업로드 완료 흐름 유지
```

원격 자료 링크 절은 생략했다. 동일 Issue 없음은 입력의 조사 자료를 사용했다. 화면/API 경로와 버전은 만들지 않고 미제공으로 표시했다. Issue URL·번호·라벨·assignee는 생성 또는 적용하지 않았다.

실제 명령/결과: 관련 지침·버그 자산 읽기(exit 0). 실제 재현·운영 확인·GitHub 생성 없음.

## Case document-boundaries

사용 지침: 공통 writing-conventions, plan 양식, todos 양식, task-implement의 기록 규칙, pr-review와 review 양식. 아래는 경로·명령·소스 commit이 제공되지 않은 짧은 문서 초안이다.

### Plan 초안

```markdown
---
issue: "#42"
status: review-pending
branch: null
base: null
created: "2026-10-03"
---

# 재시도 안내 계획

## 요청

> 외부 게시·파일 수정 없이 다음 자료를 plan·task·review의 짧은 초안으로 나눠 작성한다. 각 초안 뒤 불필요·중복·복합 주장을 편집한다.

- 해석: Issue #42의 오류 분류와 안내 표시를 단계별 기록으로 정리
- 남은 결정: 전달 방법·롤백, 원본 경로·실행 명령 확인

## 현재 동작과 변경 이유

| 현재 동작 | 근거 위치 | 바꿀 결과 |
| --- | --- | --- |
| 현재 구현 상태 미확인 | 제공 자료의 Issue #42 설명 | 오류 종류에 따른 안내 표시 |

## 범위

| 구분 | 내용 |
| --- | --- |
| 포함 | 오류 분류, 안내 화면 연결 |
| 제외 | 제공 자료 밖의 동작 변경 |
| 미변경 소비자 | 기존 클라이언트 |
| 호환성·데이터·운영 | unknown에서 기존 안내 유지, 데이터·운영 영향 미확인 |

## 단계

| 단계 | 제목 | 설명 | 검증 사례 | 완료 |
| --- | --- | --- | --- | --- |
| [01](task-01-error-classification.md) | 오류 분류 | network·expired 분류 구현 | [TC-01](task-01-error-classification.md#tc-01), [TC-02](task-01-error-classification.md#tc-02) | [ ] |
| [02](task-02-guidance.md) | 안내 화면 | 분류 결과와 안내 표시 연결 | [TC-03](task-02-guidance.md#tc-03), [TC-04](task-02-guidance.md#tc-04) | [ ] |

실행 순서는 01 → 02다. expired 검증은 미실행이다.

## 최종 검증

| 사례 | AC | 명령·작업 디렉토리 | 기대 결과 | 필요 승인 | 결과 |
| --- | --- | --- | --- | --- | --- |
| TC-F01 | AC-01·02 | 미제공 | 분류 결과와 실제 안내 연결 | 실행 환경 확인 필요 | 미실행 |

## 전달과 롤백

| 항목 | 내용 |
| --- | --- |
| 전달 방법 | 미확인 |
| 필요 승인 | 외부 게시·파일 수정 제외, 실제 전달 승인 미확인 |
| 적용 후 확인 | AC-01·02 안내 결과 대조 |
| 롤백 | 미확인 |

## 결정과 변경 기록

| 날짜 | 구분 | 내용 | 영향 AC·단계 | 상태 |
| --- | --- | --- | --- | --- |
| 날짜 미제공 | 결정 | 기존 클라이언트 호환성 보존을 위해 unknown에서 기존 안내 유지 | 01·02 | 제공된 결정 |
```

편집: Issue 전체 AC를 plan에 복사하지 않고 AC ID와 단계별 검증 링크만 남겼다. 전체 조사 로그를 제거하고 현재 상태와 근거 미확인을 구분했다. unknown 처리 이유는 구현 선택의 맥락이므로 plan의 결정 기록에 남겼다. network 통과와 expired 미실행을 하나의 완료 주장으로 합치지 않았다.

### Task 초안 — 01 오류 분류

```markdown
# 01 오류 분류

계획: [단계와 결정](plan.md#단계)

## 변경 대상

| 구분 | 경로 | 이유 |
| --- | --- | --- |
| Modify / Test | 미확인 | 오류 분류와 대응 검증 위치 조사 필요 |

## 작업

| # | 작업 | 완료 | 처리 내용 |
| --- | --- | --- | --- |
| 1 | 분류 구현·검증 경로 확인 | [ ] | 경로 미제공 |
| 2 | 오류 분류 구현 | [ ] | 실제 변경 근거 미제공 |
| 3 | 분류 사례 검증 | [ ] | network 통과 자료, expired 미실행 |

## 검증

| 사례 | AC | 명령·작업 디렉토리 | 기대 결과 | 결과 |
| --- | --- | --- | --- | --- |
| <a id="tc-01"></a>TC-01 | AC-01 | 미제공 | network에서 true | 제공 자료상 통과, 실행 commit 미제공 |
| <a id="tc-02"></a>TC-02 | AC-02 | 미제공 | expired에서 false | 미실행 |

## 제외 범위

- 안내 화면 변경: 02 단계
```

편집: 전체 Issue AC와 조사 로그를 반복하지 않았다. unknown 결정의 이유는 plan을 참조한다. 작업 완료와 검증 통과를 구분했으며 처리 내용에 근거 없는 commit을 만들지 않았다.

### Task 초안 — 02 안내 화면

```markdown
# 02 안내 화면

계획: [단계와 결정](plan.md#단계)

## 변경 대상

| 구분 | 경로 | 이유 |
| --- | --- | --- |
| Modify / Test | 미확인 | 안내 연결과 화면 검증 위치 조사 필요 |

## 작업

| # | 작업 | 완료 | 처리 내용 |
| --- | --- | --- | --- |
| 1 | 안내 화면·검증 위치 확인 | [ ] | 경로 미제공 |
| 2 | 분류 결과와 표시 연결 | [ ] | 실제 변경 근거 미제공 |
| 3 | 안내 표시 검증 | [ ] | 화면 검증 근거 미제공 |

## 검증

| 사례 | AC | 명령·작업 디렉토리 | 기대 결과 | 결과 |
| --- | --- | --- | --- | --- |
| <a id="tc-03"></a>TC-03 | AC-01 | 미제공 | network에서 재시도 표시 | 화면 실행 근거 미제공 |
| <a id="tc-04"></a>TC-04 | AC-02 | 미제공 | expired에서 기존 만료 안내 | 미실행 |

## 제외 범위

- 오류 분류 구현: 01 단계
```

편집: 분류 검증의 network 통과를 화면 검증 통과로 확대하지 않았다. 결정 맥락과 전체 조사 로그는 plan·handoff에 맡겼다.

### Review 초안

```markdown
# PR 검토 결과

- Issue: #42
- plan / task: 위 로컬 초안
- base / 검토 HEAD / commit 범위 / 작업본 근거 / 확인 시각: 미제공
- 의도 출처: 제공된 Issue·계획 자료
- 검토 기준·spec-it 상태: 미제공
- 결과: human-review (제공된 검토 결론)

## AC별 대조

| AC | 기대 시나리오 | 구현 위치 | 테스트·assertion | 실행 결과 | 누락·판단 |
| --- | --- | --- | --- | --- | --- |
| AC-01 | network의 재시도 표시 | 미제공 | network에서 true, 파일·assertion 미제공 | 제공 자료상 통과, 실행 commit 미제공 | 실제 안내 연결과 실행 대상 근거 확인 필요 |
| AC-02 | expired의 기존 안내 유지 | 미제공 | expired에서 false, 파일·assertion 미제공 | 미실행 | expired 검증 증거 필요 |

## 계획 대조

| todo 작업·사례 | 실제 변경 | 판단 |
| --- | --- | --- |
| 01 분류·02 표시 연결 | 변경 경로·commit 미제공 | 계획 순서와 실제 구현 대응 미확인 |

## 다음 행동

- expired 사례 검증과 실행 근거 확보
- network 결과의 실행 대상과 실제 안내 연결 확인
- 검토 HEAD 확정 뒤 결과 대조
- 머지 승인 상태: 미제공, 리뷰 결과와 별도
```

편집: 전체 조사 로그와 결정 이유를 리뷰에 복사하지 않았다. 판단 근거의 위치는 plan이고 리뷰에는 충족 여부와 남은 증거만 남겼다. 결과와 다음 행동을 따로 표현했다.

실제 명령/결과: 대상 지침과 양식 읽기(exit 0). 제공된 network 결과를 직접 재실행하지 않았다. expired 검증도 실행하지 않았다.

## Case template-case

사용 지침: template-init/SKILL.md의 기존 템플릿 유지·필수 절 의미 대조·없는 파일만 복사 절차.

임시 Git 리포는 별도로 만들었다. 테스트용 기존 파일은 입력이 구체 바이트를 제공하지 않아 아래 보관 로그의 내용으로 구성했다. 기존 소문자 파일과 작성자 문장을 먼저 `before-bytes/`에 복사했다. 최초 시스템 임시 디렉토리에서 실행한 뒤 전체 리포를 `<sandbox>/issue11-red1-template-case`로 옮겼다. 원본 snapshot은 수정하지 않았다.

### 설치 결과

- 복사: `.github/PULL_REQUEST_TEMPLATE.md`
- 유지: `.github/ISSUE_TEMPLATE/feature_request.md`, `.github/ISSUE_TEMPLATE/bug_report.md`
- 차이: 기존 파일의 about, 작성자 문장, 제목·안내 문구, 선택 절 구성이 자산과 다름
- 뜻이 같은 절: 배경 ↔ 목표 (현재 문제와 원하는 결과 요구), 완료 기준 ↔ 달성 조건 (관찰 가능한 완료 조건 요구)
- 누락 필수 절: 없음
- 판단 보류 절: 없음
- 라벨: 미확인, remote 없음
- 커밋·push·라벨 생성: 미실행

### 자산 파일명·참조 검사

실행 명령:

```text
git -C <sandbox>/git-workflow-issue11-baseline ls-files skills/template-init/assets
```

최초 결과: exit 128, `fatal: not a git repository (or any of the parent directories): .git`.

실행 환경에서 archive snapshot의 로컬 Git index가 초기화되었다는 안내 뒤 같은 명령을 다시 실행했다. 재실행 결과: exit 0.

```text
skills/template-init/assets/.github/ISSUE_TEMPLATE/bug_report.md
skills/template-init/assets/.github/ISSUE_TEMPLATE/feature_request.md
skills/template-init/assets/.github/PULL_REQUEST_TEMPLATE.md
```

이 index는 4287c2f archive의 파일명 목록이며 원본 commit 이력을 조회한 결과는 아니다.

`rg --files --hidden <sandbox>/assets`도 같은 세 자산을 반환했다.

`rg -n 'FEATURE_REQUEST|BUG_REPORT|feature_request|bug_report' <sandbox>/skills` 결과:

```text
skills/issue-create/references/issue.md:29: .../ISSUE_TEMPLATE/feature_request.md
skills/issue-create/references/issue.md:33: .../ISSUE_TEMPLATE/bug_report.md
skills/template-init/SKILL.md:13: assets/.github/ISSUE_TEMPLATE/feature_request.md → .github/ISSUE_TEMPLATE/feature_request.md
skills/template-init/SKILL.md:14: assets/.github/ISSUE_TEMPLATE/bug_report.md → .github/ISSUE_TEMPLATE/bug_report.md
```

요청에서 언급한 신규 대문자 자산 `FEATURE_REQUEST.md`·`BUG_REPORT.md`는 이 snapshot의 Git 파일명 목록에 없다. 실제 자산과 관련 참조는 소문자다. 이번 설치 결과에도 소문자 Issue 파일만 남았고 대문자 파일을 생성하지 않았다.

바이트 대조 결과:

| 파일 | before / after SHA-256 | cmp exit |
| --- | --- | --- |
| feature_request.md | bb743dade4822da112637ba9208b852f54eed456901b18a2631ebdbe7f5f7e81 | 0 |
| bug_report.md | bf12f38e30ecfd037ccf9199127716339450d5ab52b64502369b584a358fb431 | 0 |

전체 관찰 바이트와 명령별 stdout·stderr·exit는 아래 로그에 포함했다.

```json
{
  "root": "<sandbox>/issue11-red1-template-case",
  "observed_before_bytes": {
    "feature_request.md": "---\nname: 기능 요청\nabout: 사용자 기능 요청\ntitle: \"feat(<scope>): \"\nlabels: enhancement\n---\n\n## 배경\n\n현재 문제와 원하는 결과를 기록한다.\n작성자 추가 문장: 사용자 업무 맥락을 함께 기록한다.\n\n## 영향 범위\n\n포함과 제외, 호환성·데이터·운영 영향을 기록한다.\n\n## 완료 기준\n\n관찰 가능한 완료 조건을 기록한다.\n",
    "bug_report.md": "---\nname: 버그 보고\nabout: 재현 가능한 문제 보고\ntitle: \"fix(<scope>): \"\nlabels: bug\n---\n\n## 배경\n\n현재 문제와 원하는 결과를 기록한다.\n작성자 추가 문장: 실제 목격한 결과를 기록한다.\n\n## 기대 동작\n\n## 실제 동작\n\n## 재현 절차\n\n## 확인한 환경\n\n## 영향 범위\n\n포함과 제외, 호환성·데이터·운영 영향을 기록한다.\n\n## 완료 기준\n\n관찰 가능한 완료 조건을 기록한다.\n"
  },
  "commands": [
    {
      "command": [
        "git",
        "init",
        "-q"
      ],
      "cwd": "<sandbox>/issue11-red1-template-b2lh2pi1",
      "exit": 0,
      "stdout": "",
      "stderr": ""
    },
    {
      "command": [
        "git",
        "rev-parse",
        "--show-toplevel"
      ],
      "cwd": "<sandbox>/issue11-red1-template-b2lh2pi1",
      "exit": 0,
      "stdout": "<sandbox>/issue11-red1-template-b2lh2pi1\n",
      "stderr": ""
    },
    {
      "command": [
        "git",
        "remote",
        "-v"
      ],
      "cwd": "<sandbox>/issue11-red1-template-b2lh2pi1",
      "exit": 0,
      "stdout": "",
      "stderr": ""
    },
    {
      "command": [
        "git",
        "branch",
        "--show-current"
      ],
      "cwd": "<sandbox>/issue11-red1-template-b2lh2pi1",
      "exit": 0,
      "stdout": "main\n",
      "stderr": ""
    },
    {
      "command": [
        "git",
        "status",
        "--short"
      ],
      "cwd": "<sandbox>/issue11-red1-template-b2lh2pi1",
      "exit": 0,
      "stdout": "?? .github/\n?? before-bytes/\n",
      "stderr": ""
    },
    {
      "command": [
        "ls",
        ".github/ISSUE_TEMPLATE/"
      ],
      "cwd": "<sandbox>/issue11-red1-template-b2lh2pi1",
      "exit": 0,
      "stdout": "bug_report.md\nfeature_request.md\n",
      "stderr": ""
    },
    {
      "command": [
        "find",
        ".",
        ".github",
        "docs",
        "-maxdepth",
        "1",
        "-iname",
        "pull_request_template*"
      ],
      "cwd": "<sandbox>/issue11-red1-template-b2lh2pi1",
      "exit": 1,
      "stdout": "",
      "stderr": "find: docs: No such file or directory\n"
    },
    {
      "command": [
        "diff",
        "-u",
        "<sandbox>/feature_request.md",
        "<sandbox>/feature_request.md"
      ],
      "cwd": "<sandbox>/issue11-red1-template-b2lh2pi1",
      "exit": 1,
      "stdout": "--- <sandbox>/feature_request.md\t2026-10-03 10:13:53\n+++ <sandbox>/feature_request.md\t2026-10-03 11:23:56\n@@ -1,45 +1,19 @@\n ---\n name: 기능 요청\n-about: 새 기능이나 기존 동작의 개선 요청\n+about: 사용자 기능 요청\n title: \"feat(<scope>): \"\n labels: enhancement\n ---\n \n-## 목표\n+## 배경\n \n-<!-- 현재 문제와 이 Issue로 이루려는 결과. 한두 문장 -->\n+현재 문제와 원하는 결과를 기록한다.\n+작성자 추가 문장: 사용자 업무 맥락을 함께 기록한다.\n \n ## 영향 범위\n \n-<!-- 포함: 바뀌는 기능·화면·API와 관련 소비자 -->\n-<!-- 제외: 이번에 하지 않는 것 -->\n-<!-- 호환성·데이터·운영 영향. 없으면 없음 -->\n+포함과 제외, 호환성·데이터·운영 영향을 기록한다.\n \n-포함\n+## 완료 기준\n \n--\n-\n-제외\n-\n--\n-\n-호환성·운영 영향\n-\n--\n-\n-## 달성 조건\n-\n-<!-- 완료를 관찰·검증할 수 있는 결과. AC-01부터 순서대로 ID 부여. Issue를 고쳐도 기존 ID 재사용 금지 -->\n-\n-- [ ] AC-01:\n-- [ ] AC-02:\n-\n-<!-- 선택 절: 실제 내용이 있을 때만 남김. 없으면 절 전체 삭제 -->\n-\n-## 지금 알고 있는 것\n-\n-<!-- 확인한 조사 결과. 미확정 내용은 미확정으로 표시 -->\n-\n-## 참고 링크\n-\n-<!-- 관련 기획·조사 문서, 논의 스레드, 기존 Issue/PR -->\n+관찰 가능한 완료 조건을 기록한다.\n",
      "stderr": ""
    },
    {
      "command": [
        "diff",
        "-u",
        "<sandbox>/bug_report.md",
        "<sandbox>/bug_report.md"
      ],
      "cwd": "<sandbox>/issue11-red1-template-b2lh2pi1",
      "exit": 1,
      "stdout": "--- <sandbox>/bug_report.md\t2026-10-03 10:13:53\n+++ <sandbox>/bug_report.md\t2026-10-03 11:23:56\n@@ -1,65 +1,27 @@\n ---\n name: 버그 보고\n-about: 기대와 다르게 동작하는 문제 보고\n+about: 재현 가능한 문제 보고\n title: \"fix(<scope>): \"\n labels: bug\n ---\n \n-## 목표\n+## 배경\n \n-<!-- 무엇이 잘못 동작하고 어떤 상태가 되어야 하는가. 한두 문장 -->\n+현재 문제와 원하는 결과를 기록한다.\n+작성자 추가 문장: 실제 목격한 결과를 기록한다.\n \n ## 기대 동작\n \n-<!-- 정상이라면 나와야 하는 결과 -->\n-\n ## 실제 동작\n \n-<!-- 실제로 나온 결과. 오류 메시지는 원문 그대로 인용 -->\n-\n ## 재현 절차\n \n-<!-- 목격한 사람이 확인한 절차만 기록. 확인하지 못한 단계는 비워 두고 미확인으로 표시 -->\n-\n-1.\n-2.\n-3.\n-\n ## 확인한 환경\n \n-- 확인한 날짜:\n-- 화면 또는 API 경로:\n-- 배포 버전 또는 브랜치:\n-\n ## 영향 범위\n \n-<!-- 포함·제외 범위, 영향받는 사용자·소비자, 호환성·데이터·운영 영향 -->\n+포함과 제외, 호환성·데이터·운영 영향을 기록한다.\n \n-포함\n+## 완료 기준\n \n--\n-\n-제외\n-\n--\n-\n-호환성·운영 영향\n-\n--\n-\n-## 달성 조건\n-\n-<!-- 수정 후 관찰할 결과. AC-01부터 순서대로 ID 부여. 기존 정상 동작의 유지 조건도 포함 -->\n-\n-- [ ] AC-01:\n-- [ ] AC-02:\n-\n-<!-- 선택 절: 실제 내용이 있을 때만 남김. 없으면 절 전체 삭제 -->\n-\n-## 지금 알고 있는 것\n-\n-<!-- 확인한 원인 후보·로그 위치. 미확정 내용은 미확정으로 표시 -->\n-\n-## 참고 링크\n-\n-<!-- 관련 Issue/PR, 장애 기록, 논의 스레드 -->\n+관찰 가능한 완료 조건을 기록한다.\n",
      "stderr": ""
    },
    {
      "action": "copy absent PR template",
      "source": "<sandbox>/PULL_REQUEST_TEMPLATE.md",
      "target": "<sandbox>/PULL_REQUEST_TEMPLATE.md"
    },
    {
      "command": [
        "cmp",
        "-s",
        "<sandbox>/feature_request.md",
        "<sandbox>/feature_request.md"
      ],
      "cwd": "<sandbox>/issue11-red1-template-b2lh2pi1",
      "exit": 0,
      "stdout": "",
      "stderr": ""
    },
    {
      "file": "feature_request.md",
      "before_sha256": "bb743dade4822da112637ba9208b852f54eed456901b18a2631ebdbe7f5f7e81",
      "after_sha256": "bb743dade4822da112637ba9208b852f54eed456901b18a2631ebdbe7f5f7e81"
    },
    {
      "command": [
        "cmp",
        "-s",
        "<sandbox>/bug_report.md",
        "<sandbox>/bug_report.md"
      ],
      "cwd": "<sandbox>/issue11-red1-template-b2lh2pi1",
      "exit": 0,
      "stdout": "",
      "stderr": ""
    },
    {
      "file": "bug_report.md",
      "before_sha256": "bf12f38e30ecfd037ccf9199127716339450d5ab52b64502369b584a358fb431",
      "after_sha256": "bf12f38e30ecfd037ccf9199127716339450d5ab52b64502369b584a358fb431"
    },
    {
      "command": [
        "git",
        "status",
        "--short"
      ],
      "cwd": "<sandbox>/issue11-red1-template-b2lh2pi1",
      "exit": 0,
      "stdout": "?? .github/\n?? before-bytes/\n",
      "stderr": ""
    },
    {
      "command": [
        "find",
        ".github",
        "-type",
        "f"
      ],
      "cwd": "<sandbox>/issue11-red1-template-b2lh2pi1",
      "exit": 0,
      "stdout": ".github/PULL_REQUEST_TEMPLATE.md\n.github/ISSUE_TEMPLATE/feature_request.md\n.github/ISSUE_TEMPLATE/bug_report.md\n",
      "stderr": ""
    }
  ],
  "relocation": {
    "from": "<sandbox>/issue11-red1-template-b2lh2pi1",
    "to": "<sandbox>/issue11-red1-template-case"
  }
}
```

## Case role-handoff

사용 지침: git-workflow 역할 라우팅, task-implement 입력 제한·기록 규칙, pr-review와 review 양식, handoff 계약·문서 링크 규칙. 독립 검토 브랜치의 실제 내용은 읽지 않았다.

### 역할별 인계 안내

| 역할 | 읽을 자료 | 인계 안내 |
| --- | --- | --- |
| 구현 | Issue #42, plan의 단계·결정·전달 계획, 현재 task, handoff, 작업 브랜치의 공개 review | 소스 `abcdef0123456789abcdef0123456789abcdef01`의 파일명 변경·링크 검사 결과를 실제 명령과 연결한다. 기존 설치 파일 보존 검증은 미실행으로 유지하고 필요한 증거를 보완한다. 독립 기준·입력과 `review/issue-42` 브랜치는 읽지 않는다. |
| 리뷰 | Issue, plan, task, handoff, 고정 소스·diff 및 `review/issue-42`의 기준·입력 | 파일명·링크 검사 결과와 가독성 의도를 대조한다. 결론·다음 행동을 쉽게 찾는지, 미검증·위험·결정 이유가 유지되는지 판단한다. 설치 파일 보존 증거가 없는 한 그 충족을 주장하지 않는다. 기준·입력을 읽은 뒤 해당 Issue를 구현하지 않는다. |
| 조정 | 현재 결과·근거 위치·남은 증거·승인 범위 요약 | 구현 인계와 독립 검토를 연결하고 기존 설치 파일 보존 증거 확보를 다음 행동으로 정한다. push·PR·댓글은 승인되지 않은 상태로 기록한다. |

자료 전체를 역할마다 복사하지 않는다. Issue는 의도·AC, plan은 결정 이유, task는 처리·검증, handoff는 실행 근거의 정본으로 유지한다. 각 역할에는 원본 위치와 필요한 부분의 요약을 전달한다. 현재 입력은 문서의 정확한 경로·원격 링크를 제공하지 않아 이를 만들지 않았다. 독립 검토 기준과 입력은 리뷰 역할에만 전달한다.

### 리뷰 기록 초안

```markdown
# PR 검토 결과

- Issue: #42, 문서 가독성 개선
- PR: 미생성
- plan / task / handoff: 실제 경로 미제공
- base / commit 범위 / 작업본 근거 / 확인 시각: 미제공
- 검토 대상 소스: `abcdef0123456789abcdef0123456789abcdef01`
- 의도 출처: 제공된 Issue·plan
- 독립 검토 기준·입력: `review/issue-42`, commit·파일 경로 미제공
- 구현자의 독립 기준 접근: 읽지 않음 (제공 자료)
- 결과: human-review, 설치 파일 보존 증거와 독립 검토 결과 필요

## 계획 대조

| 계획의 의도·경계 | 현재 근거 | 필요한 판단 |
| --- | --- | --- |
| 결론·다음 행동을 쉽게 찾는 문서 | 파일명 변경·링크 검사 통과의 task 기록 | 읽는 사람이 결론과 다음 행동을 쉽게 찾는지 |
| 미검증·위험·결정 이유 보존 | 본문 변경·독립 실행 결과 미제공 | 간결하게 편집한 뒤에도 판단에 필요한 맥락이 남는지 |
| 기존 설치 파일 유지 | 보존 검증 미실행 | 사용자 파일의 바이트와 작성자 문장이 유지되는지 |

AC ID·정본 문구가 제공되지 않아 AC별 판정표는 아직 채우지 않는다. task의 검사 통과 기록만으로 plan 의도 충족을 확정하지 않는다.

## 다음 행동

- 기존 설치 파일 보존의 실행 증거 확보
- 고정 소스와 독립 기준·입력으로 검토한 뒤 충족 여부 기록
- 소스 변경 시 영향 범위 재검토
- 원격 행동 승인 상태: push·PR·댓글 미승인
- 머지 승인 상태: 미승인, 리뷰 결과와 별도
```

실제 명령/결과: 대상 역할 지침·양식 읽기(exit 0). 다른 브랜치, 독립 기준·입력의 실제 내용, 구현 작업본 또는 다른 실행 결과는 읽지 않았다. 검토 대상 소스 실행·독립 검토·원격 행동 없음.
