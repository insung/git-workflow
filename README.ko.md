# git-workflow

**하나의 변경을 Issue의 의도부터 승인된 머지까지 같은 근거로 잇는다.**

[English](README.md) · **한국어** · [0.8.0 릴리즈 준비](docs/releases/v0.8.0.md)

git-workflow는 Issue 기반 변경을 위한 Codex·Claude Code 플러그인이다. 요청자가 원하는 결과를 Issue의 달성 조건으로 기록하고, Issue에 실행 계획을 작성하고, 그 ID를 구현·테스트·PR·검토까지 잇는다. 새 작업의 계획·설계는 Issue에 두고 독립 추적이 필요한 결과만 sub-issue로 나눈다. 각 단계는 기억에 의존한 요약 대신 이전 단계의 의도와 실제 결과를 읽는다.

이 플러그인은 지시 모음이며 CI 서비스가 아니다. 한 chat에서 전체 흐름을 조정할 수 있다. 독립 검토 기준이나 입력을 작성·열람한 세션은 해당 변경을 구현하지 않으며 별도 구현 세션에 인계한다.

## 왜 쓰는가

- **의도와 근거가 이어진다** — Issue의 달성 조건 ID를 본문 계획, 테스트 사례, PR 결과와 검토가 참조한다.
- **검토가 빠진 테스트를 교차 확인한다** — pr-review는 달성 조건의 시나리오마다 구현과 assertion을 대응시키고, 테스트가 없는 시나리오를 보고한다.
- **위험한 단계마다 승인이 따로 있다** — 커밋·push·PR·머지·배포·릴리즈는 각각 다른 행동이며, 한 승인이 다른 행동이나 새 HEAD로 넘어가지 않는다.
- **대상 저장소가 같은 양식을 쓴다** — workflow-init이 스킬이 요구하는 항목을 갖춘 Issue·PR 템플릿을 설치한다.

## 다음 요청 선택

원하는 결과부터 요청한다. git-workflow는 Issue와 작업 기록을 읽고 다음 단계를 선택한다. 스킬을 직접 지정해도 된다.

| 현재 상황 | 요청 예시 | 스킬 |
| --- | --- | --- |
| 새 저장소 | “이 저장소에 Issue·PR 템플릿을 설치해줘.” | workflow-init: 템플릿 |
| 버전별 작업 범위 | “마일스톤 운영 기준과 v0.9.0 초기 생성을 설정해줘.” | workflow-init: 마일스톤 |
| 워크플로 채택 | “AGENTS.md에 git-workflow 채택 선언을 제안해줘.” | workflow-init: AGENTS.md; 추가 전 명시적 승인 |
| 새 변경 | “만료 안내는 유지하고 재시도 안내를 위한 Issue를 만들어줘.” | issue-create |
| 준비된 Issue | “Issue #12의 구현 계획을 작성해줘.” | issue-create |
| 준비된 단계 | “Issue #12의 01 단계를 구현하고 검증 결과를 기록해줘.” | git-workflow |
| 구현 완료 | “Issue #12의 인계와 PR을 준비해줘.” | pr-request |
| 검토 필요 | “이 PR을 Issue·plan·실제 검증 근거와 대조해줘.” | pr-review |
| 검토된 HEAD | “승인된 PR을 합의한 방식으로 머지해줘.” | pr-merge; 해당 PR·HEAD에 대한 승인 |
| 작업 종료 | “확인된 결과와 종료 이유로 Issue #12를 닫아줘.” | issue-close; 종료·댓글의 별도 범위 |

범위를 정한 커밋은 commit-rule, 전략 초기화는 workflow-init, 릴리즈는 git-release에 요청한다. 일반 브랜치·PR·hotfix 작업은 [프로젝트 정책](skills/git-workflow/references/project-branch-policy.md)을 읽고 따른다. 각 요청이 다른 행동까지 자동 승인하지 않는다. 아래 스킬 표에서 정본 규칙을 읽는다.

Issue는 원문·동작 차이·영향·제약·AC·계획·필수 참고 링크, PR은 실제 결과·검증·배포 상태의 진입점이다. 새 작업은 별도 plan/task/handoff/review 파일 없이 진행한다. 공통 설계는 부모 Issue, 독립 추적이 필요한 결과는 sub-issue에 기록한다. 독립 검토 입력은 구현자에게 전달하지 않는다. [문서 역할과 인계](skills/git-workflow/references/document-links.md)를 참조한다.

Issue 기반 커밋은 [Refs 푸터](skills/commit-rule/references/commit-message.md#issue-출처-refs)로 실제 Issue를 연결한다. 코드에서 시작할 때는 [커밋 → Issue의 원문·판단 → PR의 실제 결과](skills/git-workflow/references/document-links.md#커밋에서-출발하는-읽기-순서)를 읽는다. Squash를 사용하면 [최종 메시지의 Refs](skills/pr-merge/SKILL.md#squash-최종-메시지)를 확인한다.

## 작동 방식

```mermaid
flowchart TD
    A[요청] --> B[issue-create: 달성 조건을 갖춘 Issue]
    B --> C[issue-create: Issue 계획·필요한 sub-issue]
    C --> D[git-workflow: 단계별 구현·테스트·기록·커밋]
    D --> E[pr-request: 실제 결과와 PR]
    E --> F[pr-review: 의도·구현·테스트 교차 확인]
    F -->|fail 또는 근거 부족| D
    F -->|pass| G[사용자가 PR·HEAD·머지 방식 승인]
    G --> H[pr-merge: 머지와 MERGED 확인]
    H --> J[승인 범위와 보존 조건을 확인한 작업 정리]
    J --> K[issue-close: 종료 사유와 결과 코멘트]
    H -. 별도 승인 .-> I[git-release: 노트·태그·Release]
```

pr-merge는 로컬 브랜치·worktree 결과를 각각 보고하고, 원격 head는 issue-close가 Issue를 닫을 때 삭제한다. issue-close는 근거로 충족된 task 항목을 승인 없이 체크한다. dirty·공유·잠금·보호·검토 후 작업은 보존하고 Codex 관리 worktree는 관리 기능으로 아카이브한다. [정리 정책](skills/pr-merge/references/post-merge-cleanup.md)을 적용한다. 종료 코멘트는 설치된 issue-close가 담당하며 없으면 로컬 handoff로 남긴다. 작은 후속 변경도 의도·범위·AC가 같은 열린 Issue만 재사용하고, 닫힌 범위와 다른 변경은 연결된 새 Issue로 추적한다.

코드가 왜 현재 형태가 되었는지 조사하려면 [git-history](skills/git-history/SKILL.md)에 파일·함수·구간·동작을 요청한다. Refs나 Workflow 양식이 없어도 Git·GitHub·저장소 문서에서 조사하고, 확인된 의도와 추정·접근 제한을 구별한다.

| 스킬 | 쓰는 때 |
| --- | --- |
| [git-workflow](skills/git-workflow/SKILL.md) | Issue 기반 변경의 시작·재개·구현·검증과 다음 단계 선택 |
| [workflow-init](skills/workflow-init/SKILL.md) | 선택한 템플릿·AGENTS.md·라벨·릴리즈 분류·프로젝트 브랜치 전략·마일스톤 운영 초기화 |
| [issue-create](skills/issue-create/SKILL.md) | Issue 작성·보완·중복 확인·계획·작업 분해 |
| [pr-request](skills/pr-request/SKILL.md) | AC별 구현·검증 결과와 PR 작성 |
| [pr-review](skills/pr-review/SKILL.md) | 변경이 Issue 의도를 채우는지와 빠진 테스트 확인 |
| [pr-comment-check](skills/pr-comment-check/SKILL.md) | PR·연결 Issue의 코멘트 확인·처리·원래 스레드 회신과 적용 결과 보고 |
| [pr-merge](skills/pr-merge/SKILL.md) | 승인된 머지 확인·안전한 작업 정리·종료 근거 인계 |
| [issue-close](skills/issue-close/SKILL.md) | 종료 사유 선택과 결과 코멘트를 남기는 Issue 종료 |
| [commit-rule](skills/commit-rule/SKILL.md) | 주제별 커밋과 커밋 메시지 작성 |
| [git-release](skills/git-release/SKILL.md) | 릴리즈 노트·태그·GitHub Release 준비 |
| [git-history](skills/git-history/SKILL.md) | 코드에서 Git 이력·PR·Issue·문서로 당시 요청·결정·검증을 읽기 전용 추적 |

새 작업은 Issue·PR 본문에 계획·상세 설계·결과·검토를 기록하고 plan/task/handoff/review 파일을 만들지 않는다. 기본은 하나의 Issue다. [분리 기준](skills/issue-create/references/plan.md#sub-issue-분리-판단)의 독립 완료·검증과 별도 추적 필요가 모두 있을 때만 AI가 sub-issue를 제안한다. 복잡함·단계·파일·기존 task 수만으로 나누지 않는다. [관계 생성·확인](skills/issue-create/references/sub-issues.md)과 [증거 수명·기존 기록 보존](skills/git-workflow/references/document-links.md)을 따른다. [단일·독립 결과 예시](docs/examples/issue-centered-records/README.md)를 참조한다. 비공개 독립 입력은 구현 전 고정하고 [리뷰 전용 위치](skills/git-workflow/references/review-criteria.md#보관-위치)에 유지한다.

PR과 연결 Issue의 코멘트를 확인·처리·회신할 때는 [pr-comment-check](skills/pr-comment-check/SKILL.md)를 사용한다. pr-review·pr-merge도 같은 [조회·반영 확인 절차](skills/git-workflow/references/pr-comment-check.md)를 재사용한다. COMMENTED·resolved·outdated는 반영 근거가 아니며, 처리·회신을 맡긴 작업은 승인된 구현·회신까지 이어가고 적용 결과를 보고한다. 내용만 확인하는 요청은 읽기로 제한하며, 처리·회신도 스레드 resolve·머지 승인이 아니다. PENDING 리뷰는 보고만 하고 Submit 후 처리하며, 이미 게시된 PR·Issue 일반 댓글에는 별도 Submit을 요구하지 않는다.

수정 결과를 회신해 달라는 요청에는 git-workflow·pr-review·pr-merge가 [공통 회신 절차](skills/git-workflow/references/pr-comment-reply.md)를 재사용한다. 원래 스레드에 반영 근거·검증·남은 판단과 작성 AI를 표시하고, 기존 답글과 중복을 확인한 뒤 게시된 URL·본문을 다시 읽는다. 회신·resolve·머지 권한은 각각 구별한다.

## 마일스톤 운영

[workflow-init](skills/workflow-init/SKILL.md)의 여섯 번째 선택 항목으로 버전별 작업 범위를 설정한다. 저장소 기존 규칙을 우선하며, 없으면 태그와 같은 `vX.Y.Z` 이름·Issue 중심 연결·합의된 기한만 설정하는 안을 제시한다. 목표 버전이 정해진 Issue는 생성 시 연결하고, 미정이면 비워 둔다. 초기화 미선택 시 관련 파일·마일스톤을 변경하지 않는다.

[git-release](skills/git-release/SKILL.md)는 확정 범위의 모든 Issue 완료·마일스톤 100%를 발행 준비 조건으로 확인하고 실제 태그 포함과 검증을 대조한다. 미완료 필수 작업은 발행을 보류하고 연기 가능한 작업은 사용자 결정 후 차기 마일스톤으로 이월한다. 이미 머지된 코드는 마일스톤 이동만으로 빠지지 않는다. 100%와 Release 발행 완료는 구분하며, 발행 확인과 종료 승인 후 마일스톤을 닫는다. [공통 절차](skills/git-workflow/references/milestones.md)를 따른다.

## spec-it

[spec-it](https://github.com/insung/spec-it)은 프로젝트의 아키텍처·제품 정책을 고정하는 별도 플러그인이다. 프로젝트는 `.architecture/manifest.yaml`과 `.architecture/lock.yaml`을 커밋해 spec-it을 채택한다. git-workflow는 spec-it 없이도 동작한다.

| 프로젝트 상태 | pr-review 동작 |
| --- | --- |
| 채택(manifest·lock 있음) | 의도·구현·테스트 교차 확인 뒤 고정된 규칙으로 [spec-it 정책 검사](skills/pr-review/references/spec-it-policy.md)를 적용하고 규칙 ID별 판정을 기록 |
| 미채택 | 의도·구현·테스트 교차 확인만 하고 「spec-it 미채택」을 기록. 정책 판정 없음 |

## 설치

### Claude Code

```sh
claude plugin marketplace add insung/git-workflow
claude plugin install git-workflow@git-workflow
```

### Codex

```sh
codex plugin marketplace add insung/git-workflow
codex plugin add git-workflow@git-workflow
```

설치하거나 갱신한 뒤에는 새 세션을 시작한다. Claude Code에서는 스킬이 `/git-workflow:<스킬>`로 보인다.

### 대상 저장소 첫 실행

「git workflow 설치해줘」는 [workflow-init](skills/workflow-init/SKILL.md)으로 여섯 항목을 제시하고 선택을 기다린다. 「라벨만 설치해줘」 등 부분 요청은 해당 항목만 적용한다. 라벨은 기본 차이 미리보기와 승인된 누락 생성, release.yml은 기존 파일 보존을 따른다.

PR 작성 스킬 이름은 `pr-create`에서 `pr-request`로 변경되었다. 이후 호출에는 `pr-request`를 사용한다. PR 작성과 리뷰 인계 절차는 유지한다. 설치된 환경에는 플러그인을 갱신한 뒤 새 세션에서 적용한다. workflow-init은 프로젝트 설정을 초기화·갱신하며 플러그인의 스킬을 업데이트하지 않는다.

branch-strategy 스킬은 제거되었다. 이전 스킬 호출은 전략 기록이라면 workflow-init의 브랜치 전략 항목, 실제 브랜치 작업이라면 일반 요청과 공통 정책 읽기로 전환한다. 기존 프로젝트 정책 문서는 보존한다.

브랜치 전략도 독립 선택 항목이다. 기존 관행을 먼저 확인하고 GitHub Flow·Trunk·Release Flow·Gitflow·기존 dev/prod 후보에서 필요한 전략을 제안한다. 승인한 단일 프로젝트 문서에 기록하고 AGENTS.md에는 최소 읽기 연결을 제안한다. README 기존 내용 수정은 별도 승인하며, 적용 직전 파일이 바뀌면 재승인한다. 문서 생성만으로 AI 준수를 보장하지 않으며 일반 브랜치·PR·hotfix 요청으로 검증한다. [전략 초기화](skills/workflow-init/references/branch-policy.md)와 [후보·공식 출처](skills/workflow-init/references/branch-options.md)를 참고한다.

에이전트에게 GitHub 템플릿 설치를 요청한다. 예: 「이 저장소에 git-workflow의 Issue·PR 템플릿을 설치해줘」. workflow-init의 템플릿 설치·갱신 항목을 선택하거나 템플릿 설치·갱신을 명시적으로 요청하면 없는 파일은 설치하고 기존 내용은 정본 전체로 교체한다. 기존 내용 보존이나 차이 확인만 요청한 경우에는 교체하지 않는다. 기존 파일명·경로를 유지하며 같은 내용이면 다시 쓰지 않는다. 로컬 작업공간을 지정하면 설치본 대신 그 소스의 정본을 사용한다.

「이 프로젝트의 AGENTS.md를 git-workflow용으로 초기화해줘」라고 요청하면 [workflow-init](skills/workflow-init/SKILL.md)이 개별 프로젝트·다중 프로젝트 루트에 맞는 선언을 제안하고, 명시적 승인 후 기존 바이트를 보존하며 추가한다. 선언을 채택하면 메인이 승인된 단계를 조정하고 별도 구현자의 결과를 독립 검증한다. 전문은 스킬에서, 공통 맥락과 인계는 [역할별 읽기 순서](skills/git-workflow/references/document-links.md#문서별-역할과-읽기-순서)에서 확인한다.

브랜치 전략 초기화와 이후 작업의 정책 적용 순서는 [간략한 워크플로우](skills/workflow-init/references/branch-policy.md#간략한-워크플로우)를 참조한다.

## 구조

```text
skills/
├── git-history/       코드 변경 맥락 조사와 Git·GitHub 탐색
├── git-workflow/      라우터, 실행 경계, 표기·문체, 라벨, 문서 링크
├── issue-create/      Issue 본문 규칙
├── pr-request/         PR 규칙과 구현 인계 양식
├── pr-review/         검토 양식과 spec-it 정책 검사
├── pr-merge/          승인된 머지
├── issue-close/       종료 사유와 종료 코멘트 양식
├── commit-rule/       커밋 메시지·범위 규칙
├── git-release/       릴리즈 노트
└── workflow-init/     선택 설치·정본 자산·라벨 도구
```

규칙마다 정본 파일은 하나다. SKILL.md는 reference를 다시 쓰지 않고 링크한다.

## 개발

요구 사항: Node.js 18 이상. 의존성 없음.

```sh
node --test tests/package.test.mjs
node scripts/check-package.mjs
claude plugin validate .claude-plugin/plugin.json
claude plugin validate .claude-plugin/marketplace.json
git diff --check
```

이 검사는 패키지 구조, 매니페스트, 필수 파일, 상대 링크를 확인한다. 스킬 선택이나 검토 품질은 측정하지 않는다. 스킬 변경은 시나리오의 변경 전·후 비교로 확인하며, 실행 주체는 [검증 실행 주체](skills/git-workflow/references/execution-boundaries.md#검증-실행-주체)를 따른다.

git-history의 Git 그래프·오프라인 GitHub 사례와 변경 전·후 결과는 [검증 재현](tests/fixtures/git-history/verification.md)에 있다. `python3 tests/git-history-fixture.test.py`는 fixture의 원자료를 검사하며 모델 행동을 판정하지 않는다.

## 예제

[문서 개선 전후](docs/examples/readable-records/README.md)는 의미를 보존하며 결론과 다음 행동을 쉽게 찾는 편집 예시다.

[예제](docs/examples/README.md)는 채운 문서 세트와 흐름을 보여준다.

| 예제 | 흐름 |
| --- | --- |
| [Issue 중심 기록](docs/examples/issue-centered-records/README.md) | 별도 작업 파일 없이 요청·계획·실제 결과 연결 |
| [git-workflow v0.3.0 개선 (실제 사례)](docs/examples/git-workflow-v0.3.0/README.md) | 리뷰, Issue, 계획과 코멘트, 검토 기준 고정, 구현 세션 분리, 독립 검토, 머지와 릴리즈 |
| [파이썬 버전 업그레이드](docs/examples/python-version-upgrade/README.md) | Issue, plan, 단계별 todo, 구현 인계, PR, 검토 |
| [기존 Issue 재개](docs/examples/resume-existing-issue/README.md) | 다른 세션의 작업을 문서에서 이어받음 |
| [리뷰 보완](docs/examples/review-rework/README.md) | 검토 지적 수정과 새 HEAD 검토 |
| [크롤러 시작 장애 hotfix](docs/examples/crawler-startup-hotfix/README.md) | prod에서 수정하고 dev에 역반영 |
| [운영 릴리즈](docs/examples/production-release/README.md) | dev → prod, 배포와 릴리즈 노트 |
| [로컬 파일럿](docs/examples/python-version-upgrade/local-pilot.md) | GitHub 접근 없이 문서 준비 |

## 라이선스

[MIT](LICENSE)

사용자는 원하는 결과를 요청하면 된다. issue-create는 Issue·계획·작업 분해를, git-workflow는 승인된 구현·검증·결과 인계를 담당한다. plan-create·task-implement 호출 스킬은 제거한다.
