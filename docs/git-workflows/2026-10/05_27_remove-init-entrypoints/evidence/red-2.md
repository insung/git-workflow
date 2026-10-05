# 요청 A

요청: 이 저장소에 Issue·PR 템플릿만 설치해줘.

첫 응답: 이 저장소의 Issue·PR 템플릿만 설치하겠습니다. 기존 템플릿을 확인하고, 없는 정본 파일만 복사하겠습니다.

사용할 스킬: git-workflow의 단계 선택에 따라 workflow-init의 템플릿 항목. 대상 저장소 템플릿 설치에 대한 template-init 호환 진입점도 명시되어 있다.

읽을 참조: skills/git-workflow/references/execution-boundaries.md, skills/workflow-init/references/templates.md. template-init 진입점으로 처리할 경우 skills/template-init/SKILL.md.

예정 쓰기 범위: 이 저장소의 Issue·PR 템플릿 중 없는 정본 파일만. 정확한 파일 경로는 templates.md를 읽고 기존 파일을 확인한 뒤 정한다. 기존 파일 수정·삭제, AGENTS.md, 원격 라벨, release.yml은 포함하지 않는다.

# 요청 B

요청: AGENTS.md에 git-workflow 채택 선언만 제안해줘.

첫 응답: AGENTS.md의 대상 경로, 추가할 선언 전문, 삽입 위치를 확인해 제안하겠습니다.

사용할 스킬: git-workflow의 AGENTS.md 선언 경로에 따라 agents-init. workflow-init에서는 AGENTS.md 채택 선언 항목만 해당한다.

읽을 참조: skills/git-workflow/references/execution-boundaries.md, skills/agents-init/SKILL.md, skills/workflow-init/references/agents.md, 대상 AGENTS.md.

예정 쓰기 범위: 없음. 제안만 요청받았으며, 실제 추가는 경로·전문·위치 추가안의 명시적 승인 후에 가능하다.

# 요청 C

요청: 깃헙 워크플로우 설치해줘.

첫 응답: 설치할 항목을 선택해 주세요: Issue·PR 템플릿, AGENTS.md 채택 선언, GitHub 라벨, 자동 릴리즈 노트 분류. 필요한 항목을 여러 개 선택할 수 있습니다.

사용할 스킬: git-workflow의 설치·초기화 경로에 따라 workflow-init.

읽을 참조: 공통 실행 경계인 skills/git-workflow/references/execution-boundaries.md. 항목 선택 뒤 해당하는 skills/workflow-init/references/templates.md, agents.md, labels.md, release.md만 읽는다.

예정 쓰기 범위: 선택 전 없음. 선택 뒤에는 선택한 항목과 확인한 대상만 적용한다. AGENTS.md 추가는 별도의 구체적 추가안 승인 후, 라벨은 대상·정의·권한 범위를 확인해 처리한다.
