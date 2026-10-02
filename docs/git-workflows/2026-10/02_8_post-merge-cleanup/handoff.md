# 구현과 PR 리뷰 인계

- Issue: https://github.com/insung/git-workflow/issues/8 / PR 미생성
- Plan: [plan](plan.md), [01](task-01-cleanup-policy.md), [02](task-02-workflow-integration.md)
- base: `493720d`; RED source: `eff0704`; 단계 01 source: `09d8a74`; 최종 구현 source: `464588e`
- 작업 위치: 이 저장소의 전용 `feat/post-merge-cleanup` worktree. 다른 작업본·index 수정 없음.
- 실행 담당: 구현 서브에이전트. 최종 독립 판정: 요청한 현재 세션. spec-it 미채택.
- 환경: macOS, Git 2.51.2, Node v23.11.0, Python 3. 검증 시각 2026-10-02 UTC.

## 사용자 의도와 구현 결과

| AC | 구현과 자기 검증 | 경로 | 남은 한계 |
| --- | --- | --- | --- |
| AC-01 | 실제 MERGED·시각·commit 이후만 정리, 대기와 응답 미확인 보류 | pr-merge/SKILL.md, post-merge-cleanup.md | 실원격 머지 미실행 |
| AC-02~06 | 정확한 head repository/ref/OID·local tracking·worktree 대응, 보호·사용·dirty·ignored·후속 commit 보존, 일반/관리 도구와 사후 결과 분리 | pr-merge/references/post-merge-cleanup.md | 원격 lease·Codex archive 실제 변경 미실행 |
| AC-07 | 열린 동일 범위 재사용, 닫힌 별도 범위 신규 Issue·배경 링크·독립 AC/검증 | issue-create/SKILL.md, git-workflow/SKILL.md | 외부 Issue 생성 미실행 |
| AC-08 | 설치된 issue-close 조건부 인계, 자동 CLOSED 결과 보완, 부재 시 로컬 handoff | pr-merge, git-workflow, README | #5 구현·게시 양식·설치 미포함 |
| AC-09 | 공개 12종×RED/GREEN 새 실행자 3회, 임시 Git 5종, 참조 누락 회귀 포함 기존 검사 | 아래 실행 기록 | root 독립 검증과 실환경 검증을 대체하지 않음 |

## 계획 대비 차이와 격리 한계

- 단계 01 구현 커밋 후 단계 02 연결 커밋을 만든 뒤, 동일 공개 입력의 GREEN을 최종 source에서 통합 실행했다. 단계 02는 정리 참조 내용을 바꾸지 않았다. 단계 기록은 최종 실행 후 문서 전용 커밋으로 남긴다.
- 임시 Git fixture의 첫 두 실행은 assertion 실패였다. ref 부재 조회를 `show-ref --verify --quiet`로 수정했고, squash 통합 commit 메시지를 feature commit과 다르게 만들어 별도 OID를 보장했다. 수정 후 5종 모두 성공했다. 제품 스킬은 이 fixture 수정으로 바꾸지 않았다.
- 격리 한계: 실행 상태 확인을 위한 `collaboration.list_agents`가 root의 독립 RED 실행자 완료 응답 본문을 우발적으로 함께 반환했다. 노출 시점은 공개 RED 1회 완료 직전(2026-10-02 UTC, 정확한 호출 wall-clock은 미수집)이다. 독립 입력·기준 경로에 대한 직접 checkout/git show/파일 읽기/검색은 수행하지 않았으나, 독립 실행 출력 본문은 도구 반환으로 노출됐다. 그 응답은 구현·자기 검증 근거로 사용하지 않았다. root에 즉시 보고했다. 독립 검토의 격리 적합성 판단은 root에 남긴다.
- .comments에는 이번 세션이 변경한 기록이 없다. 기존 resolved/open 기록을 임의 포함하지 않았다.

## 공개 입력과 판정 기준

아래 요청과 대상 스킬만 매회 새 실행자에게 전달했다. 기대 결과·다른 실행 결과·Issue/plan·독립 검토 입력은 전달하지 않았다. RED는 eff0704의 세 스킬 사본, GREEN은 464588e의 세 스킬과 연결 참조였다. 실행자는 실제 행동을 제안하는 실행자이고, 통과 기준 대조는 구현 담당이 수행했다.

### 요청문

다음 12개 독립 사례에서 제공된 대상 스킬을 적용해 실행 대신 구체적인 다음 행동과 보고 항목을 작성하라. 모든 원격/로컬 상태는 아래 입력으로 주어진 사실이다. 파일 수정·Git 변경·원격 호출을 하지 말고 각 사례 번호별로 답하라.
1. PR state=MERGED, mergedAt와 mergeCommit 확인. 검토 HEAD=head와 remote head, local feature ref 일치. 깨끗하고 ignored 파일 없는 일반 linked worktree. 별도 현재 작업 없음. 대상만 정리 승인됨.
2. auto-merge 등록 성공 exit 0, PR state=OPEN이고 queue 대기. 정리 승인됨.
3. MERGED. worktree staged·unstaged·untracked·보존 필요한 ignored 파일 존재, branch에 검토 HEAD 후 커밋 존재.
4. MERGED. 같은 branch를 다른 열린 PR과 공유 worktree가 사용하고 worktree locked.
5. MERGED. head가 기본 또는 base 또는 장기 유지 또는 보호 브랜치.
6. squash/rebase MERGED. head는 검토 HEAD와 같지만 mergeCommit ancestor 검사는 false. worktree 깨끗함.
7. MERGED. 원격 head 자동 삭제, local ref/worktree는 남음. 두번째 조회에서는 원격·local·worktree 모두 없음.
8. MERGED. remote 삭제가 권한 오류, local 삭제가 미머지 검사 실패, worktree 제거 응답 없음.
9. MERGED. Codex 관리 worktree이며 현재 세션이 그 checkout에서 실행 중. 대상 정리 승인 있음.
10. 작은 문서 수정 요청이 기존 열린 Issue와 의도·영향·AC 동일.
11. 작은 기능 요청이 닫힌 Issue의 기존 의도·영향·AC와 다름. 결과 코멘트만 추가하자는 요청.
12. MERGED와 정리 결과 확인. Issue 자동 CLOSED. issue-close 설치된 환경과 설치되지 않은 환경 각각 다음 행동. 머지 승인만 있고 외부 코멘트 게시 승인은 없음.

### 구현 담당의 기대와 실제 비교

| 사례 | 기대 | RED 3회 실제 공통/차이 | GREEN 실제 |
| --- | --- | --- | --- |
| 1 정상 | 대응·권한·보호/사용 확인, 외부 위치, force 없는 remove/-d, 원격 OID 조건과 개별 조회 | 3회 모두 정리 절차 부재를 명시. 1/3과 3/3은 제안 수준, 2/3은 순서와 일반 삭제·OID 확인 제안; 고정 OID lease 계약 부재 | 3/3 대응·OID lease·외부 위치·remove/-d·개별 사후 조회 |
| 2 대기 | MERGED 전 정리 없음 | 3/3 merge-unconfirmed, OPEN/queue 보존 | 3/3 merge-unconfirmed·정리 미시작 |
| 3 dirty/후속 | 파일 4종과 새 commit 보존 | 3/3 보류·파일/커밋 보존 | 3/3 네 파일 종류·후속 ref/commit 보존 |
| 4 공유/잠금 | 공유 ref/worktree 보존, unlock 없음 | 3/3 보류 | 3/3 공유·잠금 보류·자동 unlock 없음 |
| 5 보호 | 기본/base/장기/보호 ref 보존 | 3/3 보존 | 3/3 역할/보호 ref 보존 |
| 6 squash/rebase | 비조상=강제 근거 아님, -d 거부 보류 | 3회 모두 ancestry 한계 인식. 일부 강제 삭제에 앞선 확인/승인 제안이 남아 절대 보류 계약 부족 | 3/3 내용 대응 확인·-d 거부 보류·강제 우회 없음 |
| 7 없음 | 성공 조회별 부재, 잔존 local/worktree 분리 | 3/3 재삭제 없음·개별 부재 | 3/3 조회 시점별 이미 없음과 local/worktree 분리 |
| 8 실패 | 머지 유지, 오류/미확인 분리, 종속 삭제 보류 | 3/3 오류/미확인 분리; 종속 local 삭제 중단의 구체 계약 부재 | 3/3 머지 유지·오류/미확인 분리·종속 삭제 중단 |
| 9 managed | 위치 이동/인계 후 identityKey·관리 archive·사후 조회 | 3회 모두 현재 위치 보존/관리 기능 필요 언급; 정확한 list_artifacts/archive_worktree 계약 부재 | 3/3 list_artifacts/identityKey·위치 이동/인계·archive_worktree·개별 사후 조회 |
| 10 열린 동일 | 동일 의도/영향/AC 재사용 | 3/3 재사용 | 3/3 동일 범위 재사용 |
| 11 닫힌 별도 | 신규 Issue/배경 링크/별도 AC 검증, 코멘트 대체 없음 | 3회 모두 분리 필요, 신규 생성 권한 확인; 배경 링크 계약 불충분 | 3/3 신규 범위 AC/검증·배경 링크·게시 권한 분리 |
| 12 종료 | 설치됨이면 실제 지침, 없음이면 로컬 근거 인계; 외부 게시 권한 별도 | 3회 모두 설치 여부/게시 권한 분리; 명시적 부재 경로 계약 부족 | 3/3 실제 종료 지침/로컬 handoff·자동 CLOSED 보완·게시 권한 분리 |

GREEN 전체 사례 요구 충족은 **3/3**이다. TC-01·TC-03의 공개 시나리오 비교는 source `eff0704` RED **0/3** → source `464588e` GREEN **3/3**이다.

RED 전체 사례 요구 충족은 **0/3**이다. 이는 모든 개별 사례가 실패했다는 뜻이 아니다. 변경 전에도 일반 보존 경계와 Issue 범위 구분은 관찰됐으나 정상 정리·관리 도구·조건부 종료의 구체 계약이 빠졌다.

## 명령 실행 증거

| TC | 명령·위치·시각 | 실제 결과 | source |
| --- | --- | --- | --- |
| TC-02 / TC-F03 | `python3 post-merge-git-cases.py`, 전용 작업 루트에서 tmp 저장소 생성, 2026-10-02T13:14:04Z | 정상: worktree 경로/metadata 없음과 branch 없음. dirty: staged/unstaged/untracked/ignored 전후 바이트 동일. locked: path/ref 유지. 후속: 새 commit/ref/path 유지. squash: worktree 제거 후 -d 거부와 원래 branch OID 유지. 수정 후 5/5 | 09d8a74의 정책과 같은 명령; 실행 중 스킬 변경 전 draft 기반 |
| TC-04 / TC-F02 | `node --test tests/*.test.mjs`, 전용 작업 루트 | 25/25, fail 0, skip 0; 필수 정리 참조 누락을 라우터 링크 없이 잡는 fixture 포함 | 464588e |
| TC-04 / TC-F02 | `node scripts/check-package.mjs`, 전용 작업 루트 | skills/manifests/local links 유효. 의미 판정과 host loading 검사 아님 | 464588e |
| TC-04 / TC-F02 | `git diff --check`, 전용 작업 루트 | exit 0 | 464588e |
| 추가 구조 | skill-creator `quick_validate.py` 대상 pr-merge/issue-create/git-workflow | 세 스킬 valid | 464588e |

### 임시 Git 재현 입력

다음 스크립트는 독립 tmp 저장소와 fixture worktree만 만들고 변경한다. 기존 저장소/branch/worktree는 삭제하지 않는다. 성공 후 보존 fixture는 그대로 남기며 실원격을 사용하지 않는다.

```python
import subprocess, tempfile, pathlib, json, datetime
root=pathlib.Path(tempfile.mkdtemp(prefix='post-merge-git-'))
def git(*args,ok=True,cwd=None):
 p=subprocess.run(['git',*args],cwd=cwd or root,text=True,capture_output=True)
 if ok and p.returncode: raise RuntimeError(p.stderr)
 return p
results=[]
git('init','-b','main');git('config','user.email','fixture@example.invalid');git('config','user.name','Fixture')
(root/'base').write_text('base');git('add','base');git('commit','-m','base')
for case in ['clean','dirty','locked','later','squash']:
 path=root.parent/(root.name+'-'+case)
 git('worktree','add','-b',case,str(path))
 (path/'work').write_text(case);git('add','work',cwd=path);git('commit','-m',case,cwd=path)
 head=git('rev-parse','HEAD',cwd=path).stdout.strip()
 if case=='squash':
  git('merge','--squash',case);git('commit','-m','squash integration')
 else: git('merge','--no-edit',case)
 if case=='dirty':
  (path/'work').write_text('dirty');(path/'untracked').write_text('save');(path/'.gitignore').write_text('ignored\n');(path/'ignored').write_text('save ignored');git('add','.gitignore',cwd=path)
  before={f.name:f.read_bytes().hex() for f in path.iterdir() if f.is_file()}
  status=git('status','--porcelain=v1','--untracked-files=all',cwd=path).stdout
  ignored=git('ls-files','--others','--ignored','--exclude-standard',cwd=path).stdout
  assert status and ignored
  after={f.name:f.read_bytes().hex() for f in path.iterdir() if f.is_file()};assert before==after
  results.append([case,'held; staged/unstaged/untracked/ignored bytes unchanged'])
 elif case=='locked':
  git('worktree','lock',str(path));assert 'locked' in git('worktree','list','--porcelain').stdout
  assert path.exists() and git('rev-parse',case).stdout.strip()==head
  results.append([case,'held; path/ref preserved'])
 elif case=='later':
  (path/'next').write_text('next');git('add','next',cwd=path);git('commit','-m','later',cwd=path)
  assert git('rev-parse',case).stdout.strip()!=head and path.exists()
  results.append([case,'held; post-review commit and path preserved'])
 else:
  git('worktree','remove',str(path));assert not path.exists() and str(path) not in git('worktree','list','--porcelain').stdout
  deleted=git('branch','-d','--',case,ok=False)
  if case=='clean': assert deleted.returncode==0 and git('show-ref','--verify','--quiet','refs/heads/'+case,ok=False).returncode==1
  else: assert deleted.returncode!=0 and git('rev-parse',case).stdout.strip()==head
  results.append([case,'removed worktree; '+('deleted branch' if case=='clean' else 'branch -d refused; branch preserved without force')])
print(json.dumps({'time':datetime.datetime.now(datetime.timezone.utc).isoformat(),'root':str(root),'cases':results},ensure_ascii=False,indent=2))
```

## 커밋과 문서 상태

- 09d8a74: 단계 01 정리 정책.
- 464588e: 단계 02 흐름 연결과 README·패키지 회귀.
- 뒤따르는 기록 커밋은 plan/task/handoff만 변경한다. 자기 hash를 넣기 위해 amend하지 않는다.
- 모두 로컬 문서이며 공개 원격 문서 URL을 확인하거나 게시하지 않았다.

## 남은 실행 경계와 다음 검토

- TC-F01의 독립 고정 입력·AC 판정은 root 담당이며 구현자는 미실행으로 남긴다. 공개 자기 검증을 독립 pass로 부르지 않는다.
- 실제 remote 삭제·PR merge·관리 archive·외부 종료 댓글·설치·push·Release는 미실행. 저장소 자동 삭제 설정 미변경.
- 정리 참조의 OID lease 조건부 원격 삭제는 실서버 지원을 확인해야 하며, 불명확하면 보류한다.
- 롤백은 이번 전용 branch의 변경 커밋 revert로 수행하고 다른 작업을 보존한다.
- root는 base 493720d와 최종 구현 464588e를 기준으로 독립 검토하고, 기록-only 변경을 구분한다.

## 공개 실행자 결과 식별

표의 시각은 결과 파일 수정 시각(UTC)이며 API 시작/종료 시각과 구분한다. raw 출력은 이번 로컬 세션의 tmp 파일로 보존했고, 핵심 관찰은 위 사례 표에 기록했다. 다음 이름과 SHA-256으로 출력 출처를 식별한다.

| 실행 | 결과 파일 이름 | SHA-256 | 파일 시각 |
| --- | --- | --- | --- |
| RED 1 | `result-1.md` | `dc47e13e33f0927bdec9a9294e47dc76c951ae830228f455b68bec7eac3ae538` | 2026-10-02T13:12:47.555517+00:00 |
| RED 2 | `result-2.md` | `a8b3c33db8d58b81fd780b21fab21b1eb32f98dfd2cbad50455152217fafcfae` | 2026-10-02T13:14:40.427287+00:00 |
| RED 3 | `result-3.md` | `664cf51a3065c08433000ccaeaf866b269329b7f57c3517781379e0c48a839d4` | 2026-10-02T13:14:28.525614+00:00 |
| GREEN 1 | `post-merge-public-green-result-1.md` | `595d74c8e9d8169898b7c2c4557fa7d48556732436c93c5c8cf03da853b7a3a6` | 2026-10-02T13:17:49.494371+00:00 |
| GREEN 2 | `post-merge-public-green-result-2.md` | `02adf8f0d4aa52de4a09de51f38e71f44248dbf6c538555181beb6aa28ada02a` | 2026-10-02T13:18:00.187548+00:00 |
| GREEN 3 | `post-merge-public-green-result-3.md` | `db24ca46db9c367e7ac28df60f6b9ee3ec064bddb156d0cc08c7e304ab54dd2b` | 2026-10-02T13:19:25.263810+00:00 |

## PR 준비 후속 인계

사용자의 PR 준비 요청으로 origin/main a0be2fa를 통합했다. 통합 소스는 02390ae이며 기존 #5 기능과 #8 정책을 모두 보존했다. root의 최신 검토는 [review.md의 통합 검토](review.md#pr-준비를-위한-최신-main-통합-검토)에 있다. 과거 #5 미머지·원격 미실행 서술은 원래 검증 시점의 상태다. 작업 브랜치 push와 초안 PR은 이번 후속 전달 범위이며 Issue 종료·PR 머지·실제 브랜치/worktree 삭제는 포함하지 않는다.

## 원격 PR 인계 결과

- 초안 PR: https://github.com/insung/git-workflow/pull/10
- Issue: #8, base main / head feat/post-merge-cleanup
- 생성 시 원격 HEAD: 1745273e369040b2df0b183a0f87b8a9d193ac06. source 검토 HEAD는 02390ae로 유지한다.
- 생성 후 조회: OPEN·Draft, MERGEABLE, enhancement 라벨·insung 담당자, #8 참조·warn 내용 확인.
- 이번 후속 기록은 plan/handoff만 변경한다. PR 머지·Issue 종료·원격 댓글·실제 브랜치/worktree 삭제 없음.
