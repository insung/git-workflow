# 03 예시와 통합 검증

계획: [plan의 단계 표](plan.md#단계)

## 변경 대상

| 구분 | 경로 | 이유 |
| --- | --- | --- |
| Modify | `docs/examples/README.md` | 새 예시 안내 |
| Create | `docs/examples/readable-records/README.md` | 의미 보존한 전후 예시 |
| Modify | `docs/git-workflows/2026-10/02_11_readability/` | 작업·검증·인계 기록 |
| Test | `tests/package.test.mjs·scripts/check-package.mjs` | 기존 검사 실행. 깨진 계약 검출 필요 시에만 의미 있는 테스트 보완 |

## 작업

| # | 작업 | 완료 | 처리 내용 |
| --- | --- | --- | --- |
| 1 | Issue·PR·plan·task·review 각 1개를 목적에 맞게 다시 쓰고 전후 예시·핵심 보존 항목 기록 | [ ] | |
| 2 | 필수 정보가 사라진 압축 예시와 정상 예시 대조 | [ ] | |
| 3 | 패키지·상대 링크·diff와 최종 HEAD 기록 | [ ] | |
| 4 | handoff에 사례별 결과·미실행·필요 승인 기록 | [ ] | |
| 5 | 결과 보존 확인 뒤 이번 완료 worktree만 제거·사후 확인 | [ ] | |

## 검증

| 사례 | AC | 명령·작업 디렉토리 | 기대 결과 | 결과 |
| --- | --- | --- | --- | --- |
| <a id="tc-06"></a>TC-06 | AC-02, AC-05, AC-07, AC-08, AC-09 | 원문과 전후 예시 대조 및 패키지 검사, 리포 루트 | 의도·범위·AC·미검증·위험 보존, 기존 검사 통과 | 미실행 |
| <a id="tc-07"></a>TC-07 | AC-06 | `git status --short`, 보존 필요 ignored 파일 확인, `git worktree list --porcelain`, 리포 루트, 리포 루트 | 결과 커밋 보존 후 이번 완료 worktree 제거, 다른 작업 그대로 | 미실행 |

시나리오 실행 주체는 [공통 실행 경계](../../../../skills/git-workflow/references/execution-boundaries.md#검증-실행-주체)를 따른다. 새 실행자에게 요청문·대상 스킬만 주며 기대 결과는 전달하지 않는다. 실행 불가 시 미실행으로 기록한다.

## 제외 범위

- 실제 과거 본문 변경
- 요청하지 않은 push·PR·머지·Release
- 다른 작업 worktree·브랜치 삭제
