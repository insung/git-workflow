# 초기화 요청 시나리오

읽은 파일: `<baseline-checkout>/skills/git-workflow/SKILL.md`, `<baseline-checkout>/skills/workflow-init/SKILL.md`.
다음 내용은 가상 첫 응답과 예정 범위이며 실제 질문, 저장소 변경, 원격 호출은 수행하지 않았다.

## A. 이 저장소에 Issue·PR 템플릿만 설치해줘.

첫 응답: “Issue·PR 템플릿만 설치하겠습니다. workflow-init의 템플릿 절차를 적용해 기존 파일을 확인하고, 없는 정본만 복사하겠습니다.”

사용할 스킬: `workflow-init` (선택 항목 설치); `template-init`은 템플릿만 처리하는 호환 진입점.
참조: `skills/workflow-init/references/templates.md`, `skills/git-workflow/references/execution-boundaries.md`를 후속으로 읽을 예정.
예정 쓰기 범위: 현재 저장소의 Issue·PR 템플릿 중 누락된 정본 파일만. 정확한 파일 목록은 템플릿 참조와 기존 파일 확인 뒤 확정. 기존 파일 수정·삭제, AGENTS.md, GitHub 라벨, release.yml은 포함하지 않음.

## B. AGENTS.md에 git-workflow 채택 선언만 제안해줘.

첫 응답: “git-workflow 채택 선언안을 제안하겠습니다. agents-init의 선언 절차에 따라 대상 AGENTS.md 경로, 추가 전문, 삽입 위치를 확인해 제시하겠습니다.”

사용할 스킬: `agents-init` (대상 AGENTS.md 선언 제안 진입점); `workflow-init`의 AGENTS.md 선택 항목 경계를 함께 적용.
참조: `skills/agents-init/SKILL.md`, `skills/workflow-init/references/agents.md`, `skills/git-workflow/references/execution-boundaries.md`를 후속으로 읽을 예정.
예정 쓰기 범위: 없음. 제안만 요청받았으므로 경로·전문·위치만 제시하며 파일 추가는 구체적 추가안의 명시적 승인 이후 범위.

## C. 깃헙 워크플로우 설치해줘.

첫 응답: “workflow-init 스킬로 설치 범위를 먼저 확인하겠습니다. 설치 항목은 ① Issue·PR 템플릿 ② AGENTS.md 채택 선언 ③ GitHub 라벨 ④ 자동 릴리즈 노트 분류입니다. 어떤 항목을 설치할까요?”

사용할 스킬: `workflow-init`.
참조: `skills/git-workflow/references/execution-boundaries.md`; 선택 이후 해당 항목의 `skills/workflow-init/references/templates.md`, `agents.md`, `labels.md`, `release.md`만 후속으로 읽을 예정.
예정 쓰기 범위: 선택 전 없음. 파일·디렉터리·원격 라벨을 만들거나 변경하지 않음. 선택 후 선택된 항목의 대상 경로·저장소가 확인된 범위만 처리. AGENTS.md는 추가안의 별도 명시적 승인을 기다림.
