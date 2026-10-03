# 구현과 PR 리뷰 인계

- Issue: [#11](https://github.com/insung/git-workflow/issues/11), PR 미생성
- Plan: [공통 목적·결정·단계](plan.md), task: 01 → 02 → 03
- base: origin/main 4287c2f, 구현 시작: 44761d2, 작업 브랜치 feat/readable-records
- 실행: 구현 세션, 독립 기준·입력 미열람. 판정은 별도 리뷰 세션에 인계
- spec-it: 미채택

## 01 결과

README 두 언어에 상황별 요청 예시와 문서 읽기 순서를 연결했다. 기존 13개 스킬 이름·승인 경계·#6 댓글·#8 정리 정책은 유지했다.

| 사례 | 기대 | 실제 | 근거 |
| --- | --- | --- | --- |
| TC-01 | 13개 역할과 새 스킬 요청 예시 유지 | 양언어 13개 정본 링크와 agents-init·task-implement·issue-close 예시 확인 | 5e32fb2 |
| TC-02 | 양언어 일치·링크 정상 | 수동 대조·패키지 검사 통과 | 5e32fb2 |

명령: 리포 루트에서 `node scripts/check-package.mjs`, `node --test tests/package.test.mjs` (27/27), `git diff --check`. 환경: macOS, 로컬 Node, 2026-10-03. 설치·host loading·사용자 읽기 시간은 미검증이다.

## 공개 시나리오

[고정한 구현 입력](implementation-scenarios.md)은 지시 변경 전에 작성했다. S1은 문서 5종·의미 보존·미검증·역할 인계, S2는 기존 소문자 파일 보존·중복 방지다. 각 RED/GREEN 3회, 실행마다 새 실행자에게 요청·스킬만 전달한다. 상세 결과는 실행 후 추가한다.

## 전달·위험·다음 행동

문서·지시 변경으로 서버 배포는 없다. 기존 설치 템플릿은 보존한다. 롤백은 구현 커밋 revert이며 실행하지 않았다. 원격 문서 미push로 공개 링크를 만들지 않았다. push·PR·머지·Release·설치 갱신은 미승인 범위다. 조정 역할은 최종 HEAD의 독립 검토와 보존 확인 뒤 이번 worktree 정리를 수행한다.

## 02 결과와 공개 실행 근거

공통 작성 정본의 편집 순서와 문서 역할을 각 지침에서 연결했다. review는 독립 판정·지적·조치를 먼저 쓰고 task 실행 표를 복사하지 않도록 했다. 필수 절·AC 추적·미검증·승인·#6 댓글·#8 정리 기능은 유지했다.

| 입력·대상 | 기대 | RED 실제 (1ddb1a7) | GREEN 실제 (bffbcfc) |
| --- | --- | --- | --- |
| S1·TC-04~07·16~17 | 필수 정보 유지, 단일 판단 단위, plan 공통 맥락과 짧은 review·역할 인계 | 전체 편집 기준 0/3: 공통 맥락 진입점 없음, 복합 AC/검증·작업 항목 존재. 필수 정보 보존은 3/3 | 3/3: 단일 AC, task 작업·검증 분리, 공통 맥락 진입점, 결론·조치 중심 review와 역할 범위·읽기 순서 |
| S2·TC-05·11~12 | 기존 절·파일명·바이트 유지, 중복 없음 | 3/3: 소문자 원본 두 개 유지, PR만 복사 | 3/3: 대소문자 무시 비교로 소문자 두 개 유지, 대문자 중복 없음, PR만 복사 |
| TC-03·08 | 공통 기준·주석 유지 | 기존 기본 문체와 필수 항목 확인 | 정본 참조·편집 주석 정적 대조 통과 |
| TC-09~10 | 자산·소비자·복사 계약 대문자 일치 | 소문자 정본 이력 | git 추적 경로·디렉토리 이름 대문자 두 개, 새 설치 복사 바이트 일치 |

변경 전은 회귀 항목까지 모두 실패한 것이 아니다. 기존 설치 보존과 필수 사실 보존은 처음부터 통과했다. 전체 S1 판정은 새 편집 기준까지 모두 만족하는지의 자기 검증이며 독립 AC 판정은 아니다. S1 안의 가상 review는 의도된 AC-02 누락을 fail로 남겼고, 과거 abc1234 통과를 def5678의 현재 증거로 쓰지 않았다.

| 새 실행자 | 대상 commit | 전체 산출물 |
| --- | --- | --- |
| red1 | 1ddb1a7 | [RED 1](implementation-evidence/red-1.md) |
| red2 | 1ddb1a7 | [RED 2](implementation-evidence/red-2.md) |
| red3 | 1ddb1a7 | [RED 3](implementation-evidence/red-3.md) |
| green1 | bffbcfc | [GREEN 1](implementation-evidence/green-1.md) |
| green2 | bffbcfc | [GREEN 2](implementation-evidence/green-2.md) |
| green3 | bffbcfc | [GREEN 3](implementation-evidence/green-3.md) |

총 6개 새 실행자, S1·S2 각각 RED 3회·GREEN 3회 (12개 입력별 결과)다. 같은 요청문과 대상 스킬만 전달했다. 기대 결과·다른 결과·독립 입력은 실행자에게 주지 않았다. 상세 문안과 설치 바이트·파일명은 위 파일에 보존했다. 원본은 로컬 실행 산출물이며 공유본은 머신 절대 경로만 치환하고 원본 digest·저장 시각을 기록했다.

기계 검증: 리포 루트, macOS / Node v23.11.0, 2026-10-03. `node scripts/check-package.mjs` 통과, `node --test tests/package.test.mjs` 29/29, `git diff --check` 통과. 정확한 대문자 이름을 디렉토리 목록으로 검사하며 소문자·혼합 대소문자 자산 회귀 테스트를 추가했다. 파일시스템 별칭을 제거하는 검사이며 여러 OS에서 실제 실행한 증거는 아니다. 새 빈 임시 위치에 자산 3개를 복사한 결과 Issue 이름은 BUG_REPORT.md·FEATURE_REQUEST.md뿐이며 모두 정본 바이트와 같았다. 이 복사 대조는 실제 사용자 저장소 설치가 아니다.
