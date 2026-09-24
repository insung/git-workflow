# git-workflow

[English](README.md) · [MIT 라이선스](LICENSE)

Git 작업 트리의 변경을 검토 가능한 커밋, 브랜치, PR 또는 릴리즈 노트로 전달할 때 쓰는 스킬입니다. 실제 저장소 상태를 확인한 뒤 다음 행동을 판단합니다. Codex와 Claude Code 플러그인이 동일한 `skills/git-workflow/` 원본을 읽습니다.

## 왜 필요한가

Git 작업은 `git commit` 한 번으로 끝나지 않습니다. 작업 트리에는 다른 작업의 변경이 섞일 수 있고, 브랜치 이름만으로 실제 배포 경로를 알 수 없으며, 커밋 제목만 나열한 노트는 배포된 결과와 다를 수 있습니다. 이 스킬은 범위와 근거를 먼저 확인하는 반복 가능한 절차를 제공합니다. 이 문제의식은 현재 스킬의 규칙에서 읽은 것이며, 제작 당시의 개인적 동기라고 단정하지 않습니다.

다음 상황에 사용할 수 있습니다.

- 이번 요청의 변경과 다른 미완료 작업을 구분해 커밋할 때
- 저장소의 검토·배포 방식에 맞는 브랜치와 머지 전략을 정할 때
- 실제 변경과 검증 결과로 이슈나 PR 초안을 작성할 때
- 기존 규칙에 맞는 태그·릴리즈 후보를 검토할 때
- 고정된 `base..target` 범위의 이력과 diff로 릴리즈 노트를 쓸 때

## 플러그인 설치

플러그인과 마켓플레이스 이름은 모두 `git-workflow`입니다. 이 저장소에 필요한 파일이 들어 있으며 `ai-workflow`는 필요하지 않습니다.

### Codex

```bash
codex plugin marketplace add insung/git-workflow
codex plugin add git-workflow@git-workflow
```

목록에 바로 나타나지 않으면 새 Codex 작업을 시작합니다. `$git-workflow`로 명시 호출하거나 해당 Git 작업을 설명합니다.

### Claude Code

```bash
claude plugin marketplace add insung/git-workflow
claude plugin install git-workflow@git-workflow
```

필요하면 새 Claude Code 세션을 시작합니다. 플러그인 스킬의 호출 이름은 `/git-workflow:git-workflow`입니다.

루트의 범용 `plugin.json`, Codex 호환 매니페스트·마켓플레이스, Claude Code 매니페스트·마켓플레이스가 모두 같은 [`skills/git-workflow/`](skills/git-workflow/)를 가리킵니다.

## 어떻게 활용하나

**범위를 나눈 커밋**

```text
$git-workflow
현재 작업 트리를 살펴보고 이번 요청의 변경과 다른 작업을 구분해줘.
이번 요청의 변경만 적절한 단위로 커밋해줘.
```

스킬은 저장소 상태와 최근 커밋 규칙을 확인한 뒤 허가된 파일이나 hunk만 stage합니다. 커밋 후 같은 범위를 다시 확인합니다. 커밋 요청만으로 push까지 허가된 것은 아닙니다.

**브랜치 전략**

```text
$git-workflow
현재 브랜치, CI, 릴리즈 주기와 리뷰 경로를 조사해 브랜치 전략을 제안해줘.
긴급 수정이 기본 브랜치로 돌아오는 경로도 설명해줘.
```

제안에는 각 브랜치의 역할, 분기·병합 지점, 릴리즈 기준, 보호 규칙과 도입 비용이 포함됩니다. 브랜치 이름만으로 배포 역할을 추측하지 않으며, 전략 요청만으로 브랜치를 만들거나 설정을 바꾸지 않습니다.

**커밋 이력으로 릴리즈 노트 작성**

```text
$git-workflow
v1.4.0부터 현재 main 커밋까지의 릴리즈 노트를 초안으로 만들어줘.
사용자나 운영자에게 영향을 주는 변경만 실제 diff를 근거로 포함해줘.
```

스킬은 이전 지점이 대상 커밋의 조상인지 확인하고, first-parent 이력·전체 커밋 본문·변경 파일을 대조합니다. 관련 커밋은 하나의 결과로 묶고 초안과 실제 발행을 구분합니다. 이전 배포 지점이 불명확하면 버전과 날짜를 지어내지 않고 `Unreleased` 초안으로 남깁니다.

## 책임 경계

저장소의 명시 규칙이 이 스킬의 기본 커밋 형식이나 브랜치 제안보다 우선합니다. 다른 작업의 변경 소유자를 추측하거나 이슈 번호, 테스트·배포 결과를 만들어내지 않습니다. 노트 작성은 태그나 GitHub Release 발행 권한이 아닙니다. Push, PR, 이슈, 머지, 태그, 릴리즈는 각각 해당 행동에 필요한 권한 안에서 실행합니다.

이 스킬은 작업 지침이며 Git 훅이나 정책 엔진이 아닙니다. spec-it을 쓰는 프로젝트의 고정된 정책은 별도로 적용합니다. 이 스킬은 그 정책을 복사하거나 대체하지 않습니다.

## 파일과 업데이트

정본은 [`skills/git-workflow/SKILL.md`](skills/git-workflow/SKILL.md)입니다. 브랜치와 릴리즈 노트의 상세 기준은 연결된 `references/`에 있습니다. 현재 플러그인 버전은 `0.1.0`이며, 새 버전을 배포할 때 매니페스트 버전을 함께 갱신해야 합니다.

Codex에서 마켓플레이스를 갱신하고 다시 설치하려면 다음 명령을 사용합니다.

```bash
codex plugin marketplace upgrade git-workflow
codex plugin remove git-workflow@git-workflow
codex plugin add git-workflow@git-workflow
```

Claude Code에서는 다음 명령을 사용합니다.

```bash
claude plugin marketplace update git-workflow
claude plugin update git-workflow@git-workflow
```

제거하려면 해당 도구에서 `codex plugin remove git-workflow@git-workflow` 또는 `claude plugin uninstall git-workflow@git-workflow`을 실행합니다.
