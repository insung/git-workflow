# 초기화 진입점 제거 구현 인계

- Issue: https://github.com/insung/git-workflow/issues/27
- Plan/task: [plan](plan.md), [task01](task-01-remove-entrypoints.md)
- base·HEAD: `6d39a17e21ebd11e501ba1964e3e616722a87460`; branch `codex/remove-init-entrypoints`; 작업 위치 `.worktree/remove-init-entrypoints`
- 구현 담당: implement_init 별도 에이전트. review/issue-27·review-init-removal·비공개 검토 기준/입력 접근 없음
- 구현은 미커밋; [소스 patch](implementation.patch) SHA256 `2ccbb41657c64ed2d07a060c85be5fd06fc6ed540973024c2054b82114e118ea`. patch는 문서 기록 갱신 전 아래 10개 파일 변경이며 이후 plan/task/handoff 기록은 제외
- 확인 시각: 2026-10-05T15:13:07.648846+09:00; Python 3.14.2·Node v23.11.0

## 변경과 보존

두 초기화 스킬 SKILL.md와 빈 디렉터리를 삭제했다. README 두 언어·라우터는 템플릿/AGENTS 부분 요청 모두 workflow-init으로 연결하고 workflow-init의 호환 안내를 제거했다. 패키지 필수 목록과 누락 검사도 workflow-init으로 바꿨다. 실제 tree에서 초기화 진입점이 하나인지 확인하는 회귀를 추가했다. CHANGELOG 0.6.0과 현재 릴리즈 노트에 제거·부분 요청 전환을 안내했다.

| 파일 | 변경 |
| --- | --- |
| `CHANGELOG.md` | 현행 호출·검사·전환 안내 정리 |
| `README.ko.md` | 현행 호출·검사·전환 안내 정리 |
| `README.md` | 현행 호출·검사·전환 안내 정리 |
| `docs/git-workflows/2026-10/05_25_release-0-6-0/release-notes.md` | 현행 호출·검사·전환 안내 정리 |
| `scripts/check-package.mjs` | 현행 호출·검사·전환 안내 정리 |
| `skills/agents-init/SKILL.md` | 삭제 |
| `skills/git-workflow/SKILL.md` | 현행 호출·검사·전환 안내 정리 |
| `skills/template-init/SKILL.md` | 삭제 |
| `skills/workflow-init/SKILL.md` | 현행 호출·검사·전환 안내 정리 |
| `tests/package.test.mjs` | 현행 호출·검사·전환 안내 정리 |

workflow-init의 references/assets/scripts 11개는 `git ls-tree -r HEAD` 목록과 각 `git show HEAD:<path>` 바이트를 현재 파일에 대조해 모두 동일했다. AGENTS.md·요청 누락 방지 규칙·기타 기능·manifest·버전·CHANGELOG 0.5.0·역사 문서는 수정하지 않았다. docs/05_25 release-notes만 현재 v0.6.0 정본으로 승인 범위에서 변경했다.

## 검증

| 사례 | 기대 | 실제·명령 |
| --- | --- | --- |
| TC-01 | 두 스킬·현행 삭제 링크 없음 | 두 디렉터리 absent. `rg -n 'template-init|agents-init' README.md README.ko.md skills scripts tests/package.test.mjs`는 제거 확인 테스트의 두 이름만 반환 |
| TC-02 | 패키지·라벨·정본·링크·diff 통과 | `node --test tests/package.test.mjs`: 35/35; `python3 tests/label-sync.test.py`: 10/10; `node scripts/check-package.mjs`: Package structure valid; `git diff --check`: 종료 0 |
| TC-03 | 하위 절차·자산·라벨 도구 보존 | 11개 파일 HEAD 대비 byte-identical |
| TC-04 | 세 요청 모두 workflow-init 라우팅, 부분 범위·선택·승인 유지 | README/라우터/entrypoint 텍스트 대조 통과. 명시적 라벨 처리·AGENTS 경로/전문/위치 승인을 가진 하위 절차는 바이트 보존 |

명령은 `.worktree/remove-init-entrypoints`에서 HEAD + patch 상태로 실행했다. 라벨 테스트는 fake gh만 사용하며 실제 원격 변경이 없다. 스킬 응답 RED/GREEN은 fresh 실행자가 확보되지 않아 미실행이다. 텍스트 대조와 기계 테스트는 실행자 실제 응답 증거가 아니며 별도 조정 세션 검증으로 인계한다.

## 전달과 한계

구현 완료와 독립 검토·배포 완료를 구분한다. commit/push/PR/Release/태그 갱신/호스트 재설치는 구현자가 하지 않았다. 원격/설치 discovery는 미확인이다. 조정 세션은 소스 patch와 base를 고정해 검토하고 승인된 배포를 수행한다. 기존 두 이름을 호출하던 사용자는 workflow-init의 템플릿만/AGENTS 선언만 요청으로 전환한다.

## 릴리즈 노트 정정 인계

- 확인 시각: 2026-10-05T15:15:27.998663+09:00
- 대상: docs/05_25_release-0-6-0/release-notes.md만 추가 수정. 패키지35/35로 정정하고 삭제된 호환 스킬95/100 문구를 제거했다. workflow-init72/100은 PR #24 당시 평가로 한정했다. 같은 버전0.6.0 수정 배포와 기존 설치자의 재설치·새 세션을 안내한다.
- [릴리즈 노트 patch](release-notes-rework.patch) SHA256 `e5a11e41a99d5153dc98a7aa384d41bffb1f9ab32feb07e82bda953dc23f0150`. 이 patch는 HEAD 대비 해당 노트의 누적 변경이며 기존 implementation.patch의 노트 변경 부분을 대체한다. 나머지 9개 소스 변경과 위 검증 결과는 유지된다.
- 소스·스킬·테스트는 이번 정정에서 바꾸지 않았다. 현재 소스 평가 수치는 조정 세션의 별도 재실행 결과로 기록한다. 문서만 변경했으므로 회귀를 반복하지 않고 패키지 링크·diff를 확인한다. commit·원격 작업 미실행.

## 조정 세션의 독립 확인

제품 소스 커밋 ebe8ae6. 조정 세션은 package35/35·label10/10·구조·diff·11개 보호 파일을 직접 재검증했다. RED3/GREEN3의 세 요청 응답을 독립 실행하여 단일 진입점 GREEN9/9와 선택·승인 유지 확인. 이는 실제 설치가 아닌 첫 응답·예정 행동의 근거다. workflow-init 재평가72/100(C), 정적비용fail1·warn3 유지. 검토 기록에서 대상과 한계를 확인한다.
