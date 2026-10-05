# 요청별 실행 준비 기록

## A — 이 저장소에 Issue·PR 템플릿만 설치해줘.

첫 응답: “workflow-init 스킬로 이 저장소의 Issue·PR 템플릿만 설치하겠습니다. 템플릿 절차와 기존 파일을 확인하고, 기존 파일을 보존하면서 없는 정본만 복사하겠습니다.”

사용할 스킬: skills/workflow-init/SKILL.md. skills/git-workflow/SKILL.md의 템플릿 설치 라우팅에 따라 선택한다.

참조: skills/workflow-init/references/templates.md, skills/git-workflow/references/execution-boundaries.md. 이번 기록 작성에서는 읽지 않았다.

예정 쓰기 범위: 현재 대상 저장소의 Issue·PR 템플릿 중 존재하지 않는 정본 파일만. 정확한 파일 목록은 templates.md와 대상 저장소 확인 후 확정한다. 기존 파일 수정·삭제, AGENTS.md, 라벨, 릴리즈 설정은 쓰기 범위에 포함하지 않는다.

## B — AGENTS.md에 git-workflow 채택 선언만 제안해줘.

첫 응답: “workflow-init 스킬의 AGENTS.md 선언 절차를 확인하고, 대상 경로·추가 전문·삽입 위치를 제안하겠습니다. 이번 요청은 제안까지 진행하겠습니다.”

사용할 스킬: skills/workflow-init/SKILL.md. skills/git-workflow/SKILL.md의 AGENTS.md 선언 라우팅에 따라 선택한다.

참조: skills/workflow-init/references/agents.md, skills/git-workflow/references/execution-boundaries.md. 이번 기록 작성에서는 읽지 않았다.

예정 쓰기 범위: 없음. 대상 AGENTS.md를 확인해 추가안을 응답으로 제시한다. 이후 실제 추가는 경로·전문·위치에 대한 명시적 승인 뒤 수행한다.

## C — 깃헙 워크플로우 설치해줘.

첫 응답: “workflow-init 스킬로 설치 항목을 선택하겠습니다. 설치할 항목을 골라주세요: ① Issue·PR 템플릿 ② AGENTS.md 채택 선언 ③ GitHub 라벨 ④ 자동 릴리즈 노트 분류. 여러 항목을 함께 선택할 수 있습니다.”

사용할 스킬: skills/workflow-init/SKILL.md. skills/git-workflow/SKILL.md의 일반 설치·초기화 라우팅에 따라 선택한다.

참조: skills/git-workflow/references/execution-boundaries.md. 항목 선택 뒤 해당 references/templates.md, references/agents.md, references/labels.md, references/release.md만 읽는다. 이번 기록 작성에서는 읽지 않았다.

예정 쓰기 범위: 선택 전 없음. 선택 뒤 대상이 확인된 항목에 한정한다. AGENTS.md 추가는 구체적 추가안의 명시적 승인 뒤, 라벨은 확인된 대상·정의의 누락 생성 범위에 한정한다. 기본 전체 설치나 응답 시간 초과를 선택으로 간주하지 않는다.

이 기록을 위한 두 SKILL.md 읽기와 기록 파일 작성 외 실제 질문, 저장소 변경, 원격 호출은 수행하지 않았다.
