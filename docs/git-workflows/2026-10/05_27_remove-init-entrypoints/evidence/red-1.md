# 요청 A

사용자 요청: 이 저장소에 Issue·PR 템플릿만 설치해줘.

첫 응답: Issue·PR 템플릿만 설치하겠습니다. 템플릿 절차와 저장소의 기존 파일을 확인한 뒤, 기존 파일을 보존하고 없는 정본만 복사하겠습니다.

사용할 스킬: workflow-init의 Issue·PR 템플릿 항목. template-init은 템플릿만 처리하는 호환 진입점으로 선택할 수 있습니다.

읽을 참조: skills/git-workflow/references/execution-boundaries.md, skills/workflow-init/references/templates.md. 템플릿 정본과 대상 기존 파일은 해당 절차에서 지정한 범위를 확인합니다.

예정 쓰기 범위: <baseline-checkout>에서 템플릿 절차가 지정한 Issue·PR 템플릿 중 없는 파일만 복사. 기존 파일은 유지. AGENTS.md, GitHub 라벨, release.yml, 커밋·push·PR·릴리즈 발행·호스트 플러그인 설치는 포함하지 않습니다.

# 요청 B

사용자 요청: AGENTS.md에 git-workflow 채택 선언만 제안해줘.

첫 응답: AGENTS.md 채택 선언 절차와 대상 파일을 확인해, 추가할 경로·전문·위치를 제안하겠습니다. 제안 단계에서는 파일을 수정하지 않습니다.

사용할 스킬: agents-init 또는 workflow-init의 AGENTS.md 채택 선언 항목. 이 시나리오에서는 workflow-init의 선언 항목을 적용합니다.

읽을 참조: skills/git-workflow/references/execution-boundaries.md, skills/workflow-init/references/agents.md. 해당 절차에 따라 대상 AGENTS.md와 필요한 선언 정본을 확인합니다.

예정 쓰기 범위: 없음. 대상 경로·추가 전문·위치를 제안하는 응답만 작성. 이후 해당 추가안의 명시적 승인 시 승인된 AGENTS.md 위치에 선언을 추가할 수 있습니다.

# 요청 C

사용자 요청: 깃헙 워크플로우 설치해줘.

첫 응답: git-workflow 초기화는 필요한 항목을 선택해 설치할 수 있습니다. ① Issue·PR 템플릿 ② AGENTS.md 채택 선언 ③ GitHub 라벨 ④ 자동 릴리즈 노트 분류 중 어떤 항목을 설치할까요? 여러 항목을 선택할 수 있습니다.

사용할 스킬: workflow-init.

읽을 참조: skills/git-workflow/references/execution-boundaries.md. 선택 뒤에는 선택한 항목에 한해 skills/workflow-init/references/templates.md, references/agents.md, references/labels.md, references/release.md를 읽습니다.

예정 쓰기 범위: 선택 전 없음. 파일·디렉터리·원격 라벨을 만들거나 변경하지 않고 선택을 기다립니다. 선택 후에도 선택한 항목과 확인된 대상 범위만 적용하며, AGENTS.md는 경로·전문·위치 추가안의 명시적 승인을 기다립니다.
