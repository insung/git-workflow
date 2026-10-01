# Issue #1 검토 기준

구현 전에 고정한 pr-review 입력이다. 구현 세션은 이 파일과 `review-input-missing-test.md`, `review-input-triggers.md`를 수정하지 않는다.

## 사용 방법

1. handoff.md와 각 todo의 처리 내용·결과를 읽는다.
2. 아래 AC별 기준으로 판정한다. 기계 확인은 직접 다시 실행한다.
3. TC-01은 [review-input-missing-test.md](review-input-missing-test.md), TC-06은 [review-input-triggers.md](review-input-triggers.md)의 고정 입력으로 다시 실행한다. 구현 세션이 만든 입력의 결과는 참고로만 본다.
4. 우회 확인과 공통 확인을 거친 뒤 review.md에 기록한다.

## AC별 기준

| AC | 기계 확인 (리포 루트) | 판단 질문 | 실패로 보는 예 |
| --- | --- | --- | --- |
| AC-01 | README.md·README.ko.md의 `##` 제목 수와 순서 비교 | 두 파일의 각 절이 같은 정보를 담는가 | 한쪽에만 있는 시나리오·명령 |
| AC-02 | `grep -nE "local-draft\|--force\|번호 누락\|match-head-commit\|limit 1000" README.md README.ko.md` 결과 0 | README 문장이 스킬 규칙을 다시 적지 않고 정본 링크로 연결하는가 | Issue 연결 검사·라벨 생성 조건 나열 |
| AC-03 | README에 `manifest.yaml`·`lock.yaml`과 spec-it 저장소 링크 존재 | spec-it의 역할, 채택 판단 조건, 채택 시 추가 동작, 미채택 시 정책 판정을 하지 않는다는 것이 모두 있는가 | 단계 이름으로만 언급 |
| AC-04 | `wc -w skills/pr-review/SKILL.md` 500 이하 | 본문 순서가 검토 대상 고정 → 의도 파악 → 구현 대조 → 테스트 누락 확인 → 조건부 정책 검사 → 결과인가. Issue의 AC ID 중 어느 todo 검증에도 없는 ID를 누락으로 판정하는 규칙이 있는가 | 단어 수만 줄고 spec-it 서술 비중이 그대로 |
| AC-05 | `skills/pr-review/references/spec-it-policy.md` 존재 | SKILL.md가 manifest/lock 존재 조건에서만 이 문서를 읽게 하는가. SKILL.md 본문에 spec-it 설치·대체 경로 절차가 없는가 | 조건 없이 항상 읽음 |
| AC-06 | review.md 양식에 AC ID 열이 있는 표 존재 | AC ID별로 기대 시나리오·구현 위치·테스트·실행 결과·누락을 한 행에 적는가. spec-it 절이 채택 시에만 작성되는가 | 정책 지적 표가 중심 |
| AC-07 | `grep -rn "spec_it_verify\|local-verification" skills docs/examples README.md README.ko.md` 결과 0 | - | - |
| AC-08 | 템플릿 세 파일 존재, `skills/issue-create/references/feature-issue.md`·`bug-issue.md` 없음, `grep -rln "## 재현 절차" skills`가 버그 템플릿 하나 | 기능: 목표·영향 범위·AC ID 달성 조건·선택 절. 버그: 추가로 기대 동작·실제 동작·재현 절차·확인한 환경. PR: Issue·변경 내용·바뀐 곳·계획과 검토 근거·검증 상태·위험과 전달. Issue 템플릿 front matter에 name·about·title·labels | pr.md에 PR 본문 코드 블록 잔존 |
| AC-09 | 임시 저장소 두 개에 직접 적용(템플릿 없음·기존 PR 템플릿 있음) | 없는 파일만 만들고 기존 파일은 해시가 같은가. 차이와 라벨 상태를 보고하는가. 커밋·push를 하지 않는가. description이 기본 `/init`과 구분되는가 | 기존 템플릿 덮어쓰기 |
| AC-10 | [review-input-triggers.md](review-input-triggers.md) 3회 실행 | 요청마다 기대 스킬로 수렴하는가 | 한 요청이 두 스킬로 갈림 |
| AC-11 | `grep -rln "번호 누락" skills`가 `skills/git-workflow/references/issue-link.md` 하나, `grep -rln "minor" skills`가 `skills/git-workflow/references/change-conventions.md` 하나 | issue-incomplete·local-pr-draft·merge-unconfirmed가 한 곳에 정의되는가 | 링크와 재서술이 함께 남음 |
| AC-12 | `grep -rn "Wiki" plugin.json .claude-plugin .codex-plugin` 결과 0 | - | - |
| AC-13 | `node --test tests/package.test.mjs`, `node scripts/check-package.mjs`, `git diff --check` 통과 | - | - |
| AC-14 | todo 파일 이름이 모두 `{nn}-todos-{step-title}.md` | plan 양식·예제 plan·이 plan의 절 구성이 같은가. plan에 달성 조건 표가 없는가 | - |

## 03 단계의 원래 지적

| ID | 원래 지적 | 확인할 결과 |
| --- | --- | --- |
| S1 | `execution-boundaries.md`의 “사용자가 승인한 범위는 다음 단계에서도 유지한다.”가 앞 단계 승인이 넘어가는 것으로 읽힘 | 같은 행동·같은 대상의 승인만 유지 |
| S2 | commit-rule의 인계 문서 기록이 조건 없이 적용됨 | Issue 기반 작업일 때만 |
| S3 | commit-rule의 “댓글”이 GitHub 댓글인지 `.comments`인지 불명 | `.comments` 사이드밴드 댓글로 명시 |
| S4 | git-release의 plan 대조가 plan 없는 저장소에도 적용됨 | plan이 있을 때만 |
| S5 | git-release에 태그 push·Release 발행 전 승인 단계 없음 | 대상 commit·태그명·노트를 제시하고 승인 확인 |
| S9 | branch-strategy가 개인 관례를 “사용자”의 흐름으로 서술 | 플러그인의 기본 제안 흐름으로 서술 |
| S11 | 결과 상태 이름이 정의 없이 쓰이고 review-pending이 plan 상태값과 겹침 | 한 곳에 정의, pr-create는 다른 표현 |

## 우회 확인

| 확인 | 방법 |
| --- | --- |
| 단어 수를 내용 이동으로만 맞췄는가 | pr-review SKILL.md에서 빠진 문장이 reference에 그대로 옮겨졌는지 diff로 대조 |
| 템플릿 사본이 남았는가 | 템플릿 절 제목으로 `grep -rn` 해 정본 외 위치 확인 |
| 완료 표시에 근거가 있는가 | todo의 `[x]` 행마다 처리 내용의 커밋에 실제 변경이 있는지 `git show`로 확인 |
| 검증 결과가 실행 근거와 맞는가 | 결과 칸의 실행 커밋과 handoff의 명령·출력이 같은 HEAD인지 확인 |
| RED 없이 GREEN만 기록했는가 | 01·03 todo와 handoff에 변경 전 시나리오 결과가 있는지 확인 |

## 공통 확인

| 확인 | 기준 |
| --- | --- |
| 글쓰기 | 산문 대신 표·번호 목록. 규칙이 아닌 설명·면책·이력 문장 없음. 관리가 필요한 필드 추가 없음 |
| 정본 | 같은 규칙이 한 파일에만 있고 다른 곳은 링크 |
| 커밋 | 작성자 `insung <imissyoubrad@gmail.com>`, 단계·주제별 분리, push·PR·Issue 댓글 없음 |
| 기록 | todo 처리 내용·결과 칸 작성, 미실행은 미실행, 계획 이탈은 plan 결정과 변경 기록에 존재, handoff.md 작성 |
