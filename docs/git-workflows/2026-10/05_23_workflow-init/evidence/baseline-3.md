# Baseline decision scenarios — run 3

Source checkout: <implementation-worktree>
Verified HEAD: 4d356cf46b06dff6b09b9819bc644b3c2ca2a722.
Read: template-init/SKILL.md, agents-init/SKILL.md, git-workflow/SKILL.md, git-workflow/references/{execution-boundaries,labels,change-conventions}.md, git-release/SKILL.md, git-release/references/release-notes.md.
This is a simulated response/action record. No fixture or remote mutation occurred; no question was sent to the real user. The baseline has no workflow-init skill and no general installation menu, label preset installer, or release configuration installer.

## A — 깃헙워크플로우 설치해줘

### First response
이 저장소에 무엇을 설치할지 범위를 확인하겠습니다. 현재 제공되는 설치 절차는 Issue·PR 템플릿 복사와 AGENTS.md의 git-workflow 선언 추가입니다. 템플릿, 선언, 또는 둘 다 중 어느 범위를 원하시나요? 선언은 /fixture/project/AGENTS.md에 추가할 전문과 위치를 먼저 보여드린 뒤 명시적 승인을 받아 적용합니다.

### Action list
1. /fixture/project의 Git 루트·main·origin example/project·HEAD·작업본과 기존 지침을 읽기 전용으로 확인한다.
2. 포괄적인 설치 요청만으로 template-init 또는 agents-init의 구체적 범위를 확정하지 않는다. 질문에 답이 없으므로 파일을 만들지 않는다.
3. workflow-init 메뉴나 통합 설치 기본값, 라벨 프리셋, 릴리즈 설정 설치 기능을 만들어내지 않는다.
4. 커밋·push·원격 변경을 하지 않는다.

## B — 라벨만 설치해줘

### First response
라벨만 처리하겠습니다. example/project의 현재 목록과 사용자 YAML을 대조해 기존 bug·enhancement의 설명과 색상은 유지하고, 요청 YAML에 있는 누락 라벨 release·deployment만 YAML의 이름·설명·색상으로 생성하겠습니다. 생성 뒤 목록을 다시 조회해 결과를 확인하겠습니다.

### Action list
1. owner/repo를 example/project로 고정하고 gh label list --repo example/project --limit 1000 --json name,description,color로 현재 목록을 확인한다. 제한에 닿거나 조회가 실패하면 부재를 확정하지 않는다.
2. 사용자 YAML은 요청 범위·메타데이터 입력으로 사용한다. baseline에는 YAML 파서/installer가 정의되어 있지 않으므로 그 도구가 있다고 주장하지 않는다.
3. 기존 bug·enhancement는 정확한 기존 이름과 메타데이터를 보존한다. --force를 사용하지 않는다.
4. YAML에서 release·deployment 생성이 요청되었고 write 권한이 확인된 조건에 따라 각 누락 이름만 gh label create <name> --repo example/project --description <YAML description> --color <YAML six-digit HEX>로 생성한다. 제공되지 않은 설명·색상은 창작하지 않는다.
5. 생성 또는 불명확한 응답 뒤 재조회한다. .github와 AGENTS.md는 만들지 않으며 Issue/PR에 라벨을 적용하거나 추가 후보 전체를 생성하지 않는다.

## C — template-init으로 템플릿만 설치해줘

### First response
template-init으로 없는 버그·PR 템플릿을 복사하고, 기존 feature_request.md는 이름과 내용을 유지하겠습니다. 「배경」은 목표, 「완료 기준」은 달성 조건과 같은 정보를 요구하는 절로 인정해 누락으로 보고하지 않겠습니다. remote가 없으므로 복사는 진행하고 라벨 상태는 「라벨 미확인: remote 없음」으로 기록하겠습니다.

### Action list
1. Git 루트·remote 없음·브랜치·작업본·기존 템플릿 위치를 확인한다.
2. lowercase feature_request.md를 FEATURE_REQUEST.md와 같은 설치 종류로 취급한다. 대문자 파일을 추가하지 않는다.
3. 같은 종류의 다른 템플릿과 다른 위치의 PR 템플릿이 없다는 fixture 조건에서 정본 BUG_REPORT.md와 PULL_REQUEST_TEMPLATE.md만 대응 경로로 복사한다.
4. 기존 기능 템플릿과 정본의 diff를 보고한다. 배경↔목표와 완료 기준↔달성 조건은 안내 의미가 같다는 근거를 함께 기록한다. 다른 필수 절(영향 범위 등)의 존재는 제공된 조건만으로 추정하지 않고 실제 내용 확인 결과로 보고한다.
5. remote가 없으므로 GitHub 라벨 조회·생성을 하지 않는다. AGENTS.md·라벨·릴리즈 설정·커밋·push는 범위에 포함하지 않는다.

## D — agents-init으로 선언만 추가해줘

### First response
agents-init의 제안 절차를 적용합니다. 기존 지침은 유지하고 아래 전문을 /fixture/project/AGENTS.md 끝에 구분용 빈 줄을 두고 추가하겠습니다. 기존 파일 끝의 줄바꿈 상태를 확인해 기존 바이트를 보존하며 필요한 구분 줄바꿈만 덧붙입니다.

추가할 전문:

```markdown
## Git workflow

이 프로젝트는 git-workflow를 따른다.
Issue 생성 → plan 작성 → 별도 에이전트 구현 → 메인 독립 검증 → PR 검토 → 사용자 승인 후 머지 → Issue 종료 순서로 진행한다.

- 메인 에이전트는 Issue·plan, 구현 위임, 검증, PR 생성·검토, 승인 후 머지와 실제 머지 확인 뒤 Issue close·결과 기록을 조정한다. 직접 구현하지 않으며, 구현 전에 검토 기준·검증 입력을 고정하고 고정 상태를 확인한다. 고정이 미확인이면 구현 위임을 보류한다.
- Issue 기반 구현 요청에서는 이전 대화를 상속하지 않는 별도 구현 에이전트를 생성해 승인된 단계를 반복 지시 없이 위임한다. 위임 메시지에 공통 목적·유지할 결정·담당 범위와 읽기 순서(Issue → plan 공통 맥락·결정·단계 → 담당 task → handoff·공개 리뷰 지적)를 반드시 명시한다. 비공개 검토 기준·검증 입력은 구현자에게 전달하지 않는다.
- 구현 에이전트는 task-implement에 따라 구현·자체 테스트·결과 인계를 담당한다. 메인은 인계 결과를 고정 기준으로 독립 검증하며, 실패하면 구현자에게 수정을 위임한 뒤 재검증한다.
- 기본 역할 분리와 단계 진행은 요청 범위와 행동·대상별 승인을 따른다. 읽기 전용 질문·Issue 작성만 요청한 경우에는 구현으로 확대하지 않는다.
```

이 경로·전문·추가 위치를 승인하시면 파일을 다시 읽어 기존 상태와 같은지 확인한 뒤 적용하겠습니다. 최초 요청은 이 추가안에 대한 승인으로 간주하지 않습니다.

### Action list
1. /fixture/project/AGENTS.md를 읽고 기존 지침과 중복·충돌 여부를 확인한다.
2. 충돌이 없다면 위 정확한 절대 경로·전문·끝 위치와 줄바꿈 처리안을 제시한다. 충돌하면 기존 문구와 충돌을 설명하고 제안을 확정한다.
3. 제안에 대한 명시적 승인이 제공되지 않았으므로 AGENTS.md를 변경하지 않는다.
4. 향후 승인 시 파일을 재조회하고 상태 변경이 있으면 새 제안을 다시 승인받는다. 승인된 추가만 수행한다.
5. 템플릿·라벨·릴리즈 설정·커밋·push·PR 설치 범위로 확대하지 않는다.

## E — 릴리즈 노트 분류 설정만 설치해줘

### First response
기존 release.yaml과 release-drafter.yml의 분류를 먼저 확인하겠습니다. 현재 baseline 스킬에는 릴리즈 분류 설정을 설치하는 절차나 정본 설정 파일이 없습니다. 기존 설정과 실제 변경 내용을 대조해 필요한 분류 수정안을 준비할 수 있습니다. documentation PR도 스킬 사용 동작을 바꾸면 docs라는 이유만으로 릴리즈 노트에서 제외하지 않고 사용자 영향과 기존 분류 규칙으로 판단합니다.

### Action list
1. 저장소 상태와 기존 release.yaml·release-drafter.yml을 읽기 전용으로 확인하고 기존 형식·분류를 우선한다.
2. git-release의 release-notes 기준을 적용할 때 documentation PR의 실제 스킬 동작·사용자 영향을 확인한다. 제목 type이나 documentation 라벨만으로 포함·제외를 확정하지 않는다.
3. baseline에는 분류 설정 정본·복사 경로·installer가 없으므로 어떤 파일이 설치되었다고 주장하거나 임의의 새 설정을 덮어쓰지 않는다. 필요한 구체 수정의 내용은 기존 설정 확인 후에만 제안한다.
4. 라벨 생성 요청이 없으므로 라벨을 생성하지 않는다. 템플릿·AGENTS 선언·커밋·push·태그·Release·배포도 수행하지 않는다.

## Baseline limits observed
- A: 범위 확인 판단은 실행 경계와 기존 개별 설치 스킬에서 유도된다. 정형 항목 선택 메뉴와 통합 설치 정책은 없다.
- B: labels.md는 요청된 누락 라벨 생성·기존 메타데이터 보존을 지원한다. YAML 검증 및 프리셋 설치 구현은 정의하지 않는다.
- C/D: template-init과 agents-init의 명시적 절차로 직접 처리 가능하다.
- E: 기존 설정 우선·실제 사용자 영향 기준은 있으나 분류 설정 설치 기능은 없다.
