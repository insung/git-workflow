# 03 description·중복 규칙·조건 정리

계획: [plan의 단계 표](plan.md#단계)

## 변경 대상

| 구분 | 경로 | 이유 |
| --- | --- | --- |
| Modify | `skills/commit-rule/SKILL.md`, `skills/git-release/SKILL.md`, `skills/plan-create/SKILL.md`, `skills/branch-strategy/SKILL.md`, `skills/git-workflow/SKILL.md`, `skills/issue-create/SKILL.md` | description 한정(T1, T3~T7) |
| Modify | `skills/git-workflow/SKILL.md` | 단계 선택 표에 template-init 행 |
| Modify | `skills/git-workflow/references/execution-boundaries.md` | 승인 문장 수정, 결과 상태 정의 |
| Modify | `skills/commit-rule/SKILL.md`, `skills/git-release/SKILL.md`, `skills/branch-strategy/SKILL.md`, `skills/branch-strategy/references/branch.md` | 조건 없는 지시, 승인 단계, 개인 관례 서술 |
| Modify | `skills/pr-merge/SKILL.md`, `skills/pr-create/SKILL.md` | Issue 연결 검사 재서술을 링크로 대체 |
| Modify | `plugin.json`, `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, `.codex-plugin/plugin.json` | Wiki 문구 제거 |

## 작업

| # | 작업 | 완료 | 처리 내용 |
| --- | --- | --- | --- |
| 1 | 요청문 9개로 현재 description의 트리거 판정 기록 (TC-06 변경 전) | [ ] | |
| 2 | description 6개를 각 스킬 고유 조건으로 한정하고 라우터 표에 template-init 추가 | [ ] | |
| 3 | 승인 문장을 같은 행동·같은 대상 기준으로 수정하고 조건 없는 지시에 조건 추가, git-release 발행 전 승인 단계 추가 | [ ] | |
| 4 | branch-strategy의 “사용자” 표현을 기본 제안 흐름으로 변경 | [ ] | |
| 5 | Issue 연결 검사·버전 후보 재서술을 정본 링크로 대체하고 결과 상태를 한 곳에 정의 | [ ] | |
| 6 | 매니페스트 4개에서 Wiki 문구 제거 | [ ] | |

판정 요청문: “커밋 메시지를 검토해줘”, “이 커밋의 코드와 테스트를 검토해줘”, “PR을 리뷰해줘”, “최근 커밋 요약해줘”, “todo를 만들어줘”, “feature 브랜치를 만들어줘”, “Issue #1 이어서 진행해줘”, “기존 이슈가 있는지 확인해줘”, “이 프로젝트에 이슈 템플릿 설정해줘”

## 검증

| 사례 | AC | 명령·작업 디렉토리 | 기대 결과 | 결과 |
| --- | --- | --- | --- | --- |
| <a id="tc-06"></a>TC-06 | AC-10 | 하위 에이전트에 전체 description과 판정 요청문을 주고 변경 전·후 각 3회 실행 | 변경 후 요청마다 한 스킬로 수렴 | 미실행 |
| <a id="tc-07"></a>TC-07 | AC-10 | description의 요청 예시를 스킬 간 대조 | 같은 예시 0 | 미실행 |
| <a id="tc-08"></a>TC-08 | AC-11, AC-12 | `grep -rn "Wiki" plugin.json .claude-plugin .codex-plugin`, “번호 누락”·“minor” 문장 검색, 리포 루트 | Wiki 0, 규칙 문장은 정본에만 존재 | 미실행 |

## 제외 범위

- 스킬 이름 변경
- pr-review description (01 단계)
