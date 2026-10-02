# Issue #8 독립 검토 결과

- Issue: https://github.com/insung/git-workflow/issues/8 / PR: 미생성
- 계획: [plan.md](plan.md), 작업: [01](task-01-cleanup-policy.md) · [02](task-02-workflow-integration.md), 구현자 기록: [handoff.md](handoff.md)
- base: `493720dfa45ed694233a996cc6541261487f3008`
- 검토 소스 HEAD: `464588ec03c351bb255fb01e03947aa1374c98af`; 작업 브랜치 기록 HEAD: `1152a637aa1cfd0b9c58fb43d4416507fd90d217`
- 464588e 이후 1152a63은 plan/task/handoff만 변경. 검토 시 작업본·index clean, .comments 변경 없음.
- 검토 기준: 구현 전 고정 `17e6ea0`, RED 기록 `16b20a1`, 추가 경계 입력 `a98d91d`, review/issue-8 브랜치. 추가 입력은 구현 후 작성했으며 구현 전 고정으로 소급하지 않는다.
- 판정 주체: 현재 세션(root), 구현: 별도 서브에이전트. 시나리오 실행자는 판정하지 않음.
- 결과: **warn**. AC-01~09의 로컬 지침·행동·회귀 검증 충족. 초기 RED 실행자 응답의 우발 노출로 완전한 비노출 검증을 주장하지 않음.
- spec-it: 미채택
- 확인 시각: 2026-10-02 22:25 KST 부근. 정확한 실행 출력 파일 시각은 아래 UTC 기록과 구분한다.

## AC별 대조

| AC | 기대 시나리오 | 구현 위치 | 테스트·실행 근거 | 결과·판단 |
| --- | --- | --- | --- | --- |
| AC-01 | 정상·실패: 실제 MERGED 이후만 정리 | pr-merge/SKILL.md:43, post-merge-cleanup.md:3 | S01/S02/S09 각 3회, 소스 464588e | 충족. OPEN·queue/오류로 삭제 완료 추정 없음 |
| AC-02 | 경계·유지: ref/저장소 대응, 다른 사용·보호·기본 보존 | post-merge-cleanup.md:15~21 | S04/S05/S06/T01/T03 각 3회, 로컬 bare ref 실험 4 assertion | 충족. fork와 base 동명 ref 구분, 갱신 OID 삭제 없음 |
| AC-03 | 경계: staged/untracked/ignored·후속·locked·squash/rebase | post-merge-cleanup.md:25~28 | S03/S04/S07/T02/T07 각 3회; 임시 Git dirty/ignored/locked/후속/squash | 충족. 비조상·-d 거부 뒤 강제 우회 없음 |
| AC-04 | 정상·경계: 안전 위치, 일반/관리 도구 분리 | post-merge-cleanup.md:32~38 | S01/S06/S10/T05 각 3회; clean 임시 remove/ref 부재 | 충족. managed 도구 부재는 인계, 일반 제거로 대체 없음 |
| AC-05 | 실패·유지: 이미 없음/오류/미확인 분리 | post-merge-cleanup.md:34~49 | S08/S09 각 3회 및 정확한 ref·경로 사후 조회 임시 실험 | 충족. 정리 오류가 실제 머지를 취소하지 않음 |
| AC-06 | 정상·경계: 기존 승인 재사용·빠진 권한만 확인 | post-merge-cleanup.md:9~11 | S01/S02/S12/T04 각 3회 | 충족. 머지 요청만으로 삭제·댓글 게시 없음 |
| AC-07 | 정상·유지: 열린 동일 범위 재사용, 닫힌 별도 범위 분리 | issue-create/SKILL.md:15~20, git-workflow/SKILL.md | S11/T06/T08 각 3회 | 충족. 기존 CLOSED의 같은 결과 기록 보정은 기존 Issue 유지 |
| AC-08 | 경계: 자동 CLOSED·종료 스킬 부재·댓글 권한 | post-merge-cleanup.md:51, pr-merge·git-workflow | S12 각 3회, #5 미머지 대응 정적 검사 | 충족. 로컬 근거 인계와 종료 기록 책임 분리, 새 종료 양식·깨진 필수 링크 없음 |
| AC-09 | 전체: 지침 시나리오·누락 회귀·상대 링크 | scripts/check-package.mjs, tests/package.test.mjs 및 변경 스킬 | 독립 GREEN 60/60 기대 행동, 회귀 25/25, package/quick_validate/diff 검사, Git 9사례/25 assertion | 로컬 범위 충족. 실제 GitHub 삭제·Codex archive·게시·host loading 미실행 |

## 고정 입력 재실행

[초기 입력](review-input-post-merge.md)의 입력 절만 변경 전 새 실행자 3명에게 제공했다. 구현 시작 전 실행을 실제로 완료했고, 기대 결과·다른 실행 결과는 제공하지 않았다. 독립 RED에서 S01 정상 정리와 S10 관리 정리의 절차 부재가 관찰됐다. S07에서는 한 실행자가 -d 거부 후 강제 삭제를 제안했다. 이 결과는 사후 RED 재현이 아니다.

변경 후에는 소스 464588e의 고정 archive를 제공했다. 전체 archive SHA-256은 `0c8f1ea56df6d47df09ca0e5d01e9842318765d4e8761325a0d3f5e2c2f91c24`다. [추가 입력](review-input-supplement.md)은 초기 RED 출력의 우발 노출을 보완하기 위한 별도 입력이다. 기대 절·기준·다른 결과는 GREEN 실행자에게 전달하지 않았다. 구현자 종료 후 실행했으며 구현자에게 추가 입력을 전달하지 않았다.

| 사례 | 핵심 실제 행동 | 새 실행자 결과 |
| --- | --- | --- |
| S01 | 대상/OID·안전 cwd·remove→-d·lease·개별 조회 | 3/3 |
| S02 | OPEN/queue에서 정리 미시작 | 3/3 |
| S03 | staged/untracked/ignored 자료 보존 전 보류 | 3/3 |
| S04 | 검토 뒤 미push 커밋과 local/worktree 보존 | 3/3 |
| S05 | 다른 PR·세션 사용 대상 보존 | 3/3 |
| S06 | dev·primary·base 보존 | 3/3 |
| S07 | squash 반영과 ancestry 구분, -d 거부 뒤 -D 없음 | 3/3 |
| S08 | 성공 조회 부재, 추가 삭제 없음 | 3/3 |
| S09 | 머지 유지, worktree 실패/local 보류/remote 미확인 | 3/3 |
| S10 | identityKey·list_artifacts·archive·개별 조회 | 3/3 |
| S11 | 같은 OPEN #20 재사용, CLOSED #19 유지 | 3/3 |
| S12 | 자동 CLOSED, 종료 스킬 없음, 로컬 인계·미승인 댓글 없음 | 3/3 |
| T01 | fork head와 base 동명 origin ref 구분 | 3/3 |
| T02 | status clean이어도 가치 미상 ignored 파일 보존 | 3/3 |
| T03 | 원격 OID 갱신 시 삭제 중단, 새 OID로 lease 치환 없음 | 3/3 |
| T04 | 머지 승인만 있을 때 조회·보고·인계 범위 | 3/3 |
| T05 | managed 도구 없으면 일반 Git 삭제로 fallback 없음 | 3/3 |
| T06 | 별도 새 범위는 새 Issue·배경 링크·독립 AC, 정보 부족도 정직하게 표시 | 3/3 |
| T07 | rebase 비조상·-d 거부를 강제 삭제로 우회하지 않음 | 3/3 |
| T08 | CLOSED 기존 결과 URL 보정은 기존 Issue 안에서 처리 | 3/3 |

이 숫자는 읽기 전용 가상 상태에서 제안한 행동의 기대 충족 횟수다. 실제 원격·관리 작업의 성공 횟수가 아니다. 구현자의 공개 입력 RED/GREEN 3회 비교는 참고로만 읽었다. 위 판정은 root의 독립 입력 결과와 직접 명령 실행에 근거한다.

## 명령 재실행과 결과

| 검증 | 환경·명령 | 결과 |
| --- | --- | --- |
| 회귀 | Node v23.11.0, `node --test tests/*.test.mjs`, 전용 작업 루트 | 25/25, fail 0 |
| 누락 변이 | 새 정리 참조를 제거한 fixture의 validatePackage assertion | 라우터 링크가 없어도 missing reference 검출 |
| 패키지 | `node scripts/check-package.mjs` | 구조·manifests·상대 링크 통과 |
| 공백/출처 | `git diff 493720d HEAD --check`, source 이후 diff와 .comments diff 대조 | exit 0, source 이후 변경은 기록만, 댓글 변경 없음 |
| 스킬 구조 | skill-creator quick_validate, pr-merge/issue-create/git-workflow | 3/3 valid; 행동 검증과 구분 |
| 독립 Git 보존 | Git 2.51.2, review/issue-8에 보관한 review-git-experiments.py | 7사례/21 assertion 통과: clean 제거, dirty·ignored·locked·후속 보존, squash 대응과 -d 거부/ref 유지 |
| 독립 remote 명령 | 로컬 bare 저장소, review-lease-experiment.py | 2사례/4 assertion 통과: stale OID 삭제 거부·갱신 ref 유지, matching OID 삭제·부재 조회 |

독립 Git 스크립트는 리뷰 브랜치의 같은 작업 문서 디렉토리에 보관했다. 임시 fixture 저장소만 변경했으며 실제 프로젝트/원격 자원 삭제 없음.

## 계획 대조와 한계

- 01 정리 참조·router와 02 Issue/README/패키지 변경은 예정 범위 안이다. 기존 승인·HEAD 확인·배포 경계 유지.
- 구현자는 GREEN을 두 단계 소스 커밋 후 통합 실행했다. RED는 변경 전에 실행됐다. 단계별 문서 상태를 최종 통합 실행 소스로 기록했으며 사후 RED로 대체하지 않았다.
- **격리 warn:** 구현자가 내부 list_agents 결과에서 root/red_3 응답을 우발적으로 봤다. 기준·기대 파일은 열지 않았다는 보고와 출력 비사용 주장을 함께 기록한다. 비노출의 절대 보장은 하지 않는다. root는 구현하지 않았고 새 비노출 입력 T01~T08의 실행 결과를 직접 판정했다. 추가 입력은 구현 이후 작성한 검증 보강이며 초기 계획의 구현 전 고정 조건을 소급 충족했다고 말하지 않는다.
- 기존 plan 이탈 행의 상태 값 review-pending는 계획 문서 상태를 기록한 표기다. 이 검토에서는 해당 이탈의 결과를 위와 같이 수용하되 기존 이력을 덮어쓰지 않는다.
- 실제 GitHub ref 삭제·Codex 관리 archive·종료 코멘트 게시·설치·push·PR·머지·Release는 이번 범위에서 제외됐다. 로컬 검사 성공을 publication 또는 live 동작 증거로 쓰지 않는다.

## 다음 행동

- 코드 결함·필수 로컬 검증 누락 없음. 현재 요청의 계획·구현·독립 검증·로컬 인계를 완료한다.
- PR 준비·push는 후속 범위다. 리뷰 warn과 격리 한계를 PR 인계에서도 유지한다.
- 리뷰 결과는 머지 승인이 아니다. 실환경 정리는 실제 대상과 승인 범위를 확인한 후 별도 수행한다.

## 독립 GREEN 결과 식별

원시 응답은 이번 세션의 로컬 결과 파일과 대화 실행자 응답으로 보존했다. 다음은 결과 파일 SHA-256과 UTC 수정 시각이다. 수정 시각을 API 실행 시작/종료 시각으로 대체하지 않는다.

| 실행자 | 결과 파일 이름 | SHA-256 | UTC 수정 시각 |
| --- | --- | --- | --- |
| root/green_1 | issue8-green-1.md | 3499ac39e0e55ff79438a8e08dd8280ce4033455413162f02f00263aeb0b394c | 2026-10-02T13:23:22.763364+00:00 |
| root/green_2 | issue8-green-2.md | 0e32c194a538e833dfa7b93f4c0701fd8ca64addd32173f16f7cead6cc40ce77 | 2026-10-02T13:23:26.430743+00:00 |
| root/green_3 | issue8-green-3.md | 21fd4b5fccce9ffd3a6cc4ded828bf0b5d102a9fed02ad911f1328f8fffe6e99 | 2026-10-02T13:23:30.157100+00:00 |
