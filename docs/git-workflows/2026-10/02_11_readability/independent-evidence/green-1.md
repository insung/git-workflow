# 독립 실행 결과 green-1

대상: `<sandbox>/git-workflow-issue11-green`, 제공된 소스 식별자 `bffbcfc335dc04e2606d6c5cfc42c28232f8a2d0`. 입력: `<sandbox>/issue11-independent-inputs.txt`. 원격 행동 없음. 실제 저장소 소스 변경 없음. 아래는 각 요청에 대한 별도 실제 출력이다.

## Case pr-unverified

제목: `feat(catalog-response): 기존 기본값을 유지하는 선택 응답 필드`

상태: `review-pending`, 게시하지 않은 PR 본문 초안. 최종 검토 상태: 입력 자료의 `human-review`.

### PR 본문

## Issue

- 관련 Issue: https://github.com/example-lab/catalog/issues/42
- 이번 PR의 해결 범위: AC-01~03

## 변경 내용

API 응답에 선택 필드를 추가하고 기존 클라이언트의 기본값을 유지한다.

## 바뀐 곳

실제 변경 파일 경로는 입력에 없어 미확인이다. API 응답과 기존 클라이언트 기본값이 이번 변경의 확인된 동작 범위다.

## 계획과 검토 근거

- 검토 소스 커밋: `0123456789012345678901234567890123456789`
- base: 미제공
- 계획·작업·구현 인계: 문서 링크 대기, 미push로 확인된 원격 URL 없음
- AC별 상세 대응과 handoff 계약 대조: 입력 자료 부족

## 검증 상태

현재 통합 상태의 행동 검증은 미실행이다. 권한 실패 처리와 실제 운영 로그의 증거를 보완해야 한다.

- 구조 검사: 18/18 통과
- 이전 base 행동 테스트: 12개 통과, 과거 증거
- 최신 base 통합 뒤 행동 재실행: 미실행
- 최종 리뷰: human-review
- 실제 명령·환경·시각: 미제공

## 위험과 전달

- 권한 실패 처리: 미검증
- 운영 환경 동작: 실제 운영 로그 미검증
- 다음 행동: 최신 base의 행동 검증 재실행과 미검증 증거 보완
- push·PR·댓글: 승인 없음

## 머지 뒤 조치

- 배포 순서: API 먼저, 클라이언트 나중
- 롤백: API 변경 revert

### 반환 정보

실제 PR URL·headRefOid·assignee login은 없다. 라벨 적용은 하지 않았다. 원격 접근과 생성은 이 요청의 범위 밖이다. 위 소스 커밋은 입력에서 전달된 검토 대상이며 실제 PR headRefOid로 재조회한 값이 아니다.

## Case issue-existing-template

제목: `fix(image-preview): 네트워크 타임아웃에서 재시도 버튼 표시`

### Issue 본문

## 배경

네트워크 타임아웃에서 이미지 미리보기를 다시 시도할 수 있어야 한다. 현재는 타임아웃에서도 재시도 버튼이 숨겨진다.

## 영향

- 포함: 네트워크 타임아웃의 재시도 버튼 표시
- 유지: 만료 URL의 기존 만료 안내
- 제외: 자동 재전송
- 데이터 변경: 없음
- 그 밖의 운영 영향: 미확인

## 완료 기준

- [ ] AC-01: 네트워크 타임아웃에서 재시도 버튼 표시
- [ ] AC-02: 만료 URL에서 기존 만료 안내 유지

### 반환 정보

동일 범위 Issue 없음은 제공된 조사 결과다. 관련 문서는 확인된 URL이 없어 선택 절을 생략했다. 실제 Issue 생성·라벨 생성·assignee 지정은 하지 않았다. 본문 초안만 반환하며 실제 URL·번호는 없다.

## Case issue-bug-boundary

제목: `fix(file-upload): 취소 후 재업로드 버튼 활성 상태 복구`

### Issue 본문

## 목표

파일 업로드를 취소한 뒤 다시 업로드할 수 있어야 한다. 현재 확인한 환경에서는 취소 후 버튼이 비활성 상태로 남는다.

## 영향 범위

- 포함: 취소 후 업로드 UI 상태 복구
- 제외: 서버 재전송
- 제외: 파일 삭제
- 파일 데이터 마이그레이션: 없음
- 데스크톱 브라우저 재현: 미확인
- 운영 영향: 미확인
- 운영 재현: 미확인

## 재현 절차

1. 파일 업로드
2. 업로드 취소
3. 파일 재업로드 시도

## 기대 동작

취소 후 재업로드가 가능하다.

## 실제 동작

버튼이 비활성 상태로 남아 페이지를 새로고침하기 전까지 재업로드가 불가능하다.

## 확인한 환경

- 확인한 날짜: 2026-10-02
- 배포 환경: staging
- 브라우저: 모바일 Safari
- 정확한 화면 경로·배포 버전: 미제공

## 달성 조건

- [ ] AC-01: 업로드 취소 후 재업로드 가능
- [ ] AC-02: 기존 업로드 완료 흐름 유지

### 반환 정보

동일 Issue 없음은 제공된 조사 결과다. 원격 자료 링크는 없다. 실제 GitHub 생성·라벨 적용·assignee 지정은 하지 않았다. 실제 Issue URL·번호는 없다.

## Case document-boundaries

### plan 초안

# 재시도 안내 계획

Issue #42의 오류 분류를 먼저 변경하고 안내 화면을 연결한다. AC 정본은 Issue #42다.

## 공통 맥락

- 목적: 오류 종류에 맞는 재시도 안내
- 유지할 결정: unknown 오류에서 기존 안내 유지
- 결정 이유: 기존 클라이언트 호환성 보존
- 상세 작업·사례별 결과: 담당 task

## 단계

| 단계 | 결과 | 선행 조건 |
| --- | --- | --- |
| 01 오류 분류 | 오류별 재시도 여부 분류 | 없음 |
| 02 안내 화면 | 분류 결과와 버튼 표시 연결 | 01 결과 |

## 최종 검증

분류와 화면 연결을 함께 확인하는 통합 검증이 필요하다. AC-01·02를 참조하며 상세 명령·환경·현재 커밋은 미제공이다. 통합 실행 근거도 미제공이다.

## 전달과 롤백

배포 방법과 롤백 지점은 미확인이다. 이 요청은 문서 초안 작성까지이며 실제 배포 실행은 없다. 다음 전달은 expired 검증 결과의 리뷰 반영이다.

## 결정과 변경 기록

| 결정 | 이유 | 영향 |
| --- | --- | --- |
| unknown의 기존 안내 유지 | 기존 클라이언트 호환성 보존 | 오류 분류·화면 연결 |

편집: Issue의 AC 전문과 조사 로그 반복을 제거했다. unknown 결정 이유는 plan의 공통 맥락과 결정 기록에 유지했다. 작업·검증 결과와 검토 판단은 각각 task와 review로 분리했다.

### task 초안

# 오류 분류와 안내 연결

계획: plan의 공통 맥락·단계. 01 분류 뒤 02 화면 연결 순서다.

## 변경 대상

실제 파일 경로는 미제공이다. 담당 범위는 오류 분류와 안내 화면 연결이다.

## 작업

| 작업 | 완료 | 처리 내용 |
| --- | --- | --- |
| 오류 종류별 재시도 여부 분류 | 미확인 | unknown 결정은 plan 참조 |
| 분류 결과와 안내 화면 표시 연결 | 미확인 | 구현 증거 미제공 |

## 검증

| 사례 | AC | 명령·환경 | 기대 | 결과 |
| --- | --- | --- | --- | --- |
| TC-01 network | AC-01 | 미제공 | true | 제공 자료상 통과 |
| TC-02 expired | AC-02 | 미제공 | false | 미실행 |

상세 실행 대상 커밋과 실제 값은 미제공이다. 다음 작업은 expired 검증이다.

편집: 분류 구현과 표시 연결을 별도 작업으로 나눴다. network 통과와 expired 미실행을 분리했다. AC 전문·조사 로그·unknown 결정 이유를 반복하지 않고 plan의 공통 맥락으로 연결했다.

### review 초안

# 검토 결과

결과: human-review. expired 검증을 실행하고 AC-02의 유지 동작을 확인해야 한다.

- Issue: #42
- 근거: 담당 task의 사례별 검증 결과
- 검토 대상 HEAD·base·시각: 미제공
- 한계: expired 미실행, 현재 HEAD의 실행 증거 미제공

## 필요한 조치

AC-02의 만료 안내 유지가 확인되지 않았다. 담당 task의 expired 검증 결과를 보완해야 한다.

## 대조 요약

| AC | 현재 근거 | 판단 |
| --- | --- | --- |
| AC-01 | network 검증 통과 자료 | 대상 커밋 대조 필요 |
| AC-02 | expired 검증 미실행 | 미검증 |

## 다음 행동

expired 검증 후 같은 검토 대상의 증거를 대조한다. 대상 소스가 바뀌면 적용 HEAD를 다시 확인한다.

편집: 실행 작업 목록과 조사 로그 반복을 제거했다. review에는 현재 판단·근거 한계·필요 조치를 남겼다. unknown 결정 이유는 삭제하지 않고 plan의 공통 맥락에 보존했다.

## Case template-case

### 실제 설치 명령

실행: `python3 <sandbox>/issue11-green-1-template-install.py`

```python
from pathlib import Path
import subprocess, hashlib, shutil
root=Path('<sandbox>/issue11-green-1-template-path.txt').read_text(); p=Path(root)
source=Path('<sandbox>/.github')
log=[]
def run(args):
 r=subprocess.run(args,cwd=p,text=True,capture_output=True)
 log.append('$ '+' '.join(args)+'\nexit='+str(r.returncode)+'\n'+r.stdout+r.stderr)
 return r
for args in [['git','rev-parse','--show-toplevel'],['git','remote','-v'],['git','branch','--show-current'],['git','status','--short'],['ls','.github/ISSUE_TEMPLATE/'],['find','.','.github','docs','-maxdepth','1','-iname','pull_request_template*']]:run(args)
existing=list((p/'.github/ISSUE_TEMPLATE').iterdir());before={x.name:x.read_bytes() for x in existing}
snapshot=Path('<sandbox>/issue11-green-1-template-before');snapshot.mkdir(exist_ok=True)
for x in existing:shutil.copyfile(x,snapshot/x.name)
for name in ['FEATURE_REQUEST.md','BUG_REPORT.md']:
 matches=[x for x in existing if x.name.lower()==name.lower()]
 if matches:log.append('preserve '+matches[0].name+'; canonical copy skipped')
 else:
  shutil.copyfile(source/'ISSUE_TEMPLATE'/name,p/'.github/ISSUE_TEMPLATE'/name);log.append('copy '+name)
 for x in matches:run(['diff','-u',str(source/'ISSUE_TEMPLATE'/name),str(x)])
if not list(p.glob('**/[Pp][Uu][Ll][Ll]_[Rr][Ee][Qq][Uu][Ee][Ss][Tt]_[Tt][Ee][Mm][Pp][Ll][Aa][Tt][Ee]*')):
 shutil.copyfile(source/'PULL_REQUEST_TEMPLATE.md',p/'.github/PULL_REQUEST_TEMPLATE.md');log.append('copy assets/.github/PULL_REQUEST_TEMPLATE.md -> .github/PULL_REQUEST_TEMPLATE.md')
for x in existing:
 after=x.read_bytes();log.append(x.name+' before-sha256='+hashlib.sha256(before[x.name]).hexdigest()+' after-sha256='+hashlib.sha256(after).hexdigest()+' bytes-identical='+str(before[x.name]==after))
run(['find','.github','-type','f'])
run(['git','status','--short'])
log.append('라벨 미확인: remote 없음. 네트워크 조회·라벨 생성 없음.')
Path('<sandbox>/issue11-green-1-template-results.txt').write_text('\n\n'.join(log))
print('\n\n'.join(log))
```

### 실행 결과

기존 lowercase Issue 템플릿 두 파일을 유지하고 없는 PR 템플릿만 복사했다. 기존 파일은 설치 전 바이트를 별도 보관했다.

- 유지: `.github/ISSUE_TEMPLATE/feature_request.md`
- 유지: `.github/ISSUE_TEMPLATE/bug_report.md`
- 복사: `.github/PULL_REQUEST_TEMPLATE.md`
- 대문자 Issue 파일 추가: 없음
- 설치 갱신·원격 게시·커밋: 없음
- 라벨 미확인: remote 없음

뜻이 같은 절은 `목표 ↔ 배경`, `달성 조건 ↔ 완료 기준`이다. 기존 파일의 안내 주석이 각각 현재 문제·원하는 결과와 관찰 가능한 완료 결과를 요구하므로 같은 필수 정보를 받는다. 나머지 필수 절은 정본과 동일하다. 누락 필수 절과 판단 보류는 없다. 작성자가 추가한 문장을 유지했다.

정확한 소스 Git 파일명:

- `skills/template-init/assets/.github/ISSUE_TEMPLATE/FEATURE_REQUEST.md`
- `skills/template-init/assets/.github/ISSUE_TEMPLATE/BUG_REPORT.md`
- `skills/template-init/assets/.github/PULL_REQUEST_TEMPLATE.md`

`git ls-files`에서 위 이름을 확인했다. issue-create의 기능·버그 양식 참조와 template-init의 자산 표는 대문자 정본을 참조했다. 아래에 실제 설치 명령과 출력, 바이트 대조 결과를 기록했다.

$ git rev-parse --show-toplevel
exit=0
<sandbox>/issue11-green-1-template-3xryy856


$ git remote -v
exit=0


$ git branch --show-current
exit=0
main


$ git status --short
exit=0
?? .github/


$ ls .github/ISSUE_TEMPLATE/
exit=0
bug_report.md
feature_request.md


$ find . .github docs -maxdepth 1 -iname pull_request_template*
exit=1
find: docs: No such file or directory


preserve feature_request.md; canonical copy skipped

$ diff -u <sandbox>/FEATURE_REQUEST.md <sandbox>/feature_request.md
exit=1
--- <sandbox>/FEATURE_REQUEST.md	2026-10-03 11:33:23
+++ <sandbox>/feature_request.md	2026-10-03 11:36:31
@@ -7,7 +7,7 @@

 <!-- 작성 후 편집: 결론 우선, 한 항목 한 결과, 반복 제거. 사실·AC·재현·미검증·위험·중요한 결정 이유 보존 -->

-## 목표
+## 배경

 <!-- 현재 문제와 이 Issue로 이루려는 결과. 한두 문장 -->

@@ -29,7 +29,7 @@

 -

-## 달성 조건
+## 완료 기준

 <!-- 한 항목에 하나의 완료 결과. 구현·검증 절차는 plan/task로 연결. AC-01부터 순서대로 ID 부여. Issue를 고쳐도 기존 ID 재사용 금지 -->

@@ -45,3 +45,5 @@
 ## 참고 링크

 <!-- 관련 기획·조사 문서, 논의 스레드, 기존 Issue/PR -->
+
+작성자가 추가한 문장: 기존 프로젝트 안내 유지.


preserve bug_report.md; canonical copy skipped

$ diff -u <sandbox>/BUG_REPORT.md <sandbox>/bug_report.md
exit=1
--- <sandbox>/BUG_REPORT.md	2026-10-03 11:33:23
+++ <sandbox>/bug_report.md	2026-10-03 11:36:31
@@ -7,7 +7,7 @@

 <!-- 작성 후 편집: 결론 우선, 한 항목 한 결과, 반복 제거. 사실·AC·재현·미검증·위험·중요한 결정 이유 보존 -->

-## 목표
+## 배경

 <!-- 무엇이 잘못 동작하고 어떤 상태가 되어야 하는가. 한두 문장 -->

@@ -49,7 +49,7 @@

 -

-## 달성 조건
+## 완료 기준

 <!-- 한 항목에 하나의 수정 후 결과. 구현·검증 절차는 plan/task로 연결. AC-01부터 순서대로 ID 부여. 기존 정상 동작의 유지 조건도 포함 -->

@@ -65,3 +65,5 @@
 ## 참고 링크

 <!-- 관련 Issue/PR, 장애 기록, 논의 스레드 -->
+
+작성자가 추가한 문장: 기존 프로젝트 안내 유지.


copy assets/.github/PULL_REQUEST_TEMPLATE.md -> .github/PULL_REQUEST_TEMPLATE.md

feature_request.md before-sha256=d17a87eb0ffc67dc71ad760771aa42fa53f2105a48ffbe15def016dda53b47e6 after-sha256=d17a87eb0ffc67dc71ad760771aa42fa53f2105a48ffbe15def016dda53b47e6 bytes-identical=True

bug_report.md before-sha256=7b7561b67830d2178c220a716935d349b1e58cd29b4d4f3f8443e8627eb26fb6 after-sha256=7b7561b67830d2178c220a716935d349b1e58cd29b4d4f3f8443e8627eb26fb6 bytes-identical=True

$ find .github -type f
exit=0
.github/PULL_REQUEST_TEMPLATE.md
.github/ISSUE_TEMPLATE/feature_request.md
.github/ISSUE_TEMPLATE/bug_report.md


$ git status --short
exit=0
?? .github/


라벨 미확인: remote 없음. 네트워크 조회·라벨 생성 없음.
## Case role-handoff

### 구현 역할 인계

Issue #42 → plan의 공통 맥락·결정·단계 → 담당 task → handoff·공개 리뷰 지적 순서로 읽는다. 목적은 결론과 다음 행동을 쉽게 찾는 것이며 미검증·위험·결정 이유를 보존한다는 plan의 판단을 유지한다.

담당 범위는 템플릿 파일명 변경과 링크 검사다. 소스는 `abcdef0123456789abcdef0123456789abcdef01`이다. task의 파일명 변경·링크 검사 통과 기록을 실제 변경 근거와 연결하고, 미실행인 기존 설치 파일 보존 검증 결과를 보완한다. 독립 검토 기준·입력은 전달하지 않는다. 구현자는 이를 읽지 않은 상태를 유지한다. push·PR·댓글은 승인되지 않았다.

### 리뷰 역할 인계

Issue #42 → plan의 공통 맥락 → diff·task·handoff → `review/issue-42`의 독립 기준·입력 순서로 읽는다. 대상 소스는 `abcdef0123456789abcdef0123456789abcdef01`이다.

글자 수 감소보다 결론·다음 행동의 접근성과 미검증·위험·결정 이유 보존을 대조한다. 파일명 변경·링크 검사 기록과 기존 설치 파일 보존의 증거 부족을 구분한다. 독립 기준·입력은 구현자에게 공개하지 않는다. 검토 대상·판정·문제·조치·근거·한계를 반환한다. 원격 게시 승인은 없다.

### 조정 역할 인계

Issue #42 → plan → 구현·리뷰 결과 순서로 읽는다. 공통 목적과 유지할 판단의 정본은 plan이다. 소스 `abcdef0123456789abcdef0123456789abcdef01` 기준으로 구현 근거와 독립 검토 결과를 연결한다.

현재 전달된 상태는 파일명 변경·링크 검사 기록과 기존 설치 파일 보존 검증 미실행이다. 다음 행동은 보존 검증 증거 보완과 독립 리뷰다. 구현자에게 독립 기준을 전달하지 않으며 push·PR·댓글 승인 범위를 확대하지 않는다.

### 짧은 리뷰 기록

# Issue #42 검토 기록

기존 설치 파일 보존의 실행 증거가 없어 최종 판단은 보류한다. 해당 증거 보완 뒤 소스 `abcdef0123456789abcdef0123456789abcdef01`에 적용되는 독립 검토가 필요하다.

- 목적·유지할 판단: plan 공통 맥락
- 구현 근거: task의 파일명 변경·링크 검사 기록
- 독립 기준·입력: 리뷰 역할만 `review/issue-42`에서 확인
- 검토 한계: 기존 설치 파일 보존 검증 미실행, 실제 diff·검사 출력은 이번 입력에 미제공

## 판단이 필요한 것

- 가독성: 결론과 다음 행동을 쉽게 찾으면서 미검증·위험·결정 이유를 보존했는지 대조
- 설치 호환성: 기존 설치 파일의 이름과 내용이 보존되는지 증거 보완
- 증거 적용 범위: task의 통과 기록이 검토 소스에 대응하는지 확인

전체 자료를 역할마다 복사하지 않는다. 공통 목적과 결정은 plan으로 연결하고 역할별 담당 범위·완료와 미실행·접근 경계·다음 행동만 인계한다. 검토 결과는 머지 승인으로 취급하지 않는다. push·PR·댓글은 승인되지 않았다.
