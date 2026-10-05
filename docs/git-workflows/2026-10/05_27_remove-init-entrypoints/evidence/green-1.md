# 읽기 전용 시나리오 응답

## A — 이 저장소에 Issue·PR 템플릿만 설치해줘.

첫 응답:
> workflow-init 스킬의 템플릿 절차를 적용하겠습니다. 대상 저장소의 기존 Issue·PR 템플릿을 확인하고, 기존 파일을 보존하면서 없는 정본만 설치하겠습니다.

사용할 스킬: `workflow-init` (git-workflow의 템플릿 설치 단계에서 연결).
참조: `skills/workflow-init/references/templates.md`, `skills/git-workflow/references/execution-boundaries.md`. 이번 시나리오에서는 참조를 읽지 않았으며, 실제 실행 시 선택된 템플릿 절차만 읽습니다.
예정 쓰기 범위: 대상 저장소의 누락된 Issue·PR 정본 템플릿 파일만. 구체적인 파일명·경로는 templates.md와 기존 파일을 확인한 뒤 확정합니다. 기존 파일 수정·삭제, AGENTS.md 선언, 라벨, release.yml은 포함하지 않습니다.

## B — AGENTS.md에 git-workflow 채택 선언만 제안해줘.

첫 응답:
> workflow-init 스킬의 선언 절차를 적용하겠습니다. 대상 AGENTS.md를 확인한 뒤 정확한 경로, 추가할 선언 전문, 삽입 위치를 제안하겠습니다. 제안만 요청하셨으므로 파일은 변경하지 않습니다.

사용할 스킬: `workflow-init` (git-workflow의 AGENTS.md 선언 단계에서 연결).
참조: `skills/workflow-init/references/agents.md`, `skills/git-workflow/references/execution-boundaries.md`. 이번 시나리오에서는 참조를 읽지 않았으며, 실제 제안 시 선언 절차만 읽습니다.
예정 쓰기 범위: 없음. 경로·전문·위치 추가안에 대한 명시적 승인을 받은 후에만 해당 AGENTS.md에 승인된 선언을 추가할 수 있습니다.

## C — 깃헙 워크플로우 설치해줘.

첫 응답:
> workflow-init 스킬로 설치 범위를 먼저 확인하겠습니다. 설치할 항목을 선택해주세요: ① Issue·PR 템플릿 ② AGENTS.md 채택 선언 ③ GitHub 라벨 ④ 자동 릴리즈 노트 분류. 여러 항목을 선택할 수 있습니다. 대상 저장소가 현재 저장소와 다르면 경로 또는 owner/repo도 알려주세요.

사용할 스킬: `workflow-init` (git-workflow의 일반 설치·초기화 단계에서 연결).
참조: 현재는 두 SKILL.md의 항목 선택 지침만 적용. 선택 후 해당 항목의 `references/templates.md`, `references/agents.md`, `references/labels.md`, `references/release.md` 중 필요한 절차와 `skills/git-workflow/references/execution-boundaries.md`를 읽습니다.
예정 쓰기 범위: 선택 전 없음. 선택과 명확한 대상 확인 후 선택된 항목만 적용하며 AGENTS.md는 구체적 추가안의 별도 명시적 승인까지 쓰지 않습니다. 메뉴 제시나 응답 시간 초과는 선택으로 간주하지 않습니다.

이 파일은 시나리오 응답 기록이며 실제 질문, 저장소 변경, 원격 호출을 실행하지 않았습니다.
