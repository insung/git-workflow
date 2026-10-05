# 초기화 요청별 실행 응답

## A. 이 저장소에 Issue·PR 템플릿만 설치해줘.

첫 응답: workflow-init 스킬로 이 저장소의 Issue·PR 템플릿만 설치하겠습니다. 템플릿 절차에 따라 기존 파일을 확인하고, 없는 정본만 복사하겠습니다.

사용할 스킬: skills/workflow-init/SKILL.md. git-workflow의 단계 선택 표도 템플릿 설치를 workflow-init으로 연결한다.

다음 참조: skills/workflow-init/references/templates.md 및 skills/git-workflow/references/execution-boundaries.md.

예정 쓰기 범위: 템플릿 절차에서 지정하는 대상 저장소의 누락된 Issue·PR 템플릿 정본만. 기존 파일은 보존한다. AGENTS.md, 라벨, 릴리즈 설정은 선택 범위에 포함되지 않는다.

## B. AGENTS.md에 git-workflow 채택 선언만 제안해줘.

첫 응답: workflow-init 스킬로 대상 AGENTS.md의 경로, 추가할 선언 전문, 삽입 위치를 확인해 제안하겠습니다. 이번 요청에서는 제안만 작성합니다.

사용할 스킬: skills/workflow-init/SKILL.md. git-workflow의 단계 선택 표도 선언 초기화·추가를 workflow-init으로 연결한다.

다음 참조: skills/workflow-init/references/agents.md 및 skills/git-workflow/references/execution-boundaries.md.

예정 쓰기 범위: 없음. 경로·전문·위치 제안 후 그 추가안에 대한 명시적 승인을 받아야 AGENTS.md에 추가할 수 있다.

## C. 깃헙 워크플로우 설치해줘.

첫 응답: workflow-init 스킬로 설치할 항목을 확인하겠습니다. 선택 가능한 항목은 Issue·PR 템플릿, AGENTS.md 채택 선언, GitHub 라벨, 자동 릴리즈 노트 분류입니다. 어떤 항목을 설치할까요?

사용할 스킬: skills/workflow-init/SKILL.md. git-workflow의 단계 선택 표는 일반 설치·초기화를 workflow-init으로 연결한다.

참조: 항목 선택 전에는 skills/workflow-init/SKILL.md의 선택 절차와 skills/git-workflow/references/execution-boundaries.md. 선택 이후 해당 항목의 references/templates.md, references/agents.md, references/labels.md, references/release.md만 읽는다.

예정 쓰기 범위: 선택 전 없음. 파일·디렉터리·원격 라벨을 만들거나 변경하지 않는다. 메뉴 제시, 기본 전체 설치, 응답 시간 초과를 선택이나 적용 동의로 간주하지 않는다.

이 문서는 지정된 두 SKILL.md만 읽고 작성한 실행 응답 초안이다. 참조 파일은 열지 않았으며 실제 질문, 저장소 변경, 원격 호출을 수행하지 않았다.
