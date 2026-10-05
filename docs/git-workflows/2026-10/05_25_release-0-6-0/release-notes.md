# git-workflow 0.6.0

필요한 GitHub 워크플로우 설정만 골라 설치할 수 있습니다. 새 `workflow-init`에서 템플릿, AGENTS.md 선언, GitHub 라벨, 자동 릴리즈 노트 분류를 함께 관리합니다.

## 주요 변화

- **선택 설치:** “깃헙 워크플로우 설치해줘”라고 요청하면 네 항목 중 적용할 대상을 선택합니다. “라벨만 설치해줘”, “템플릿만 설치해줘”처럼 범위를 지정하면 해당 항목만 처리합니다.
- **사용자 정의 라벨:** YAML에서 이름·한국어 설명·색상을 설정합니다. `release`·`deployment`를 포함한 기본 정의를 제공하며, 도구는 차이를 먼저 보여주고 적용 시 없는 라벨만 만듭니다. 기존 라벨의 색상·설명은 보존합니다.
- **자동 릴리즈 노트 분류:** 기능·개선, 수정, 설치·운영, 릴리즈 준비, 문서·사용 안내, 기타 변경으로 PR을 묶는 설정을 제공합니다. 사용자 동작에 영향을 주는 문서 변경도 노트에 포함되도록 `documentation`을 제외하지 않습니다.
- **기존 호출 호환:** `template-init`·`agents-init`은 유지됩니다. 각각 템플릿과 채택 선언만 처리하며 다른 항목을 추가 설치하지 않습니다.

## 업그레이드와 사용 안내

1. 플러그인을 0.6.0으로 업데이트한 뒤 새 세션에서 사용하세요. 이번 배포는 GitHub 태그·Release 발행이며 로컬 Claude Code·Codex 설치를 자동 갱신하지 않습니다.
2. 템플릿 자산을 직접 참조한다면 경로를 `skills/workflow-init/assets/.github/`로 바꾸세요. 기존 설치 파일은 자동 교체하지 않습니다.
3. 라벨 도구를 직접 실행하려면 Python 3, PyYAML, 인증된 GitHub CLI가 필요합니다. 기본은 미리보기이며 실제 저장소·정의를 확인한 적용에만 `--apply`를 사용합니다.

AGENTS.md는 정확한 경로·추가 전문·위치에 대한 승인 후 적용합니다. 기존 템플릿과 릴리즈 설정도 보존합니다. 라벨 생성과 릴리즈 분류 설정 설치는 별도 선택 항목입니다.

## 검증과 알려진 한계

- 패키지 회귀 **34/34**, 라벨 도구 회귀 **10/10**, 패키지 구조·manifest·상대 링크 및 diff 검사 통과. manifest 3곳의 버전은 0.6.0으로 일치합니다.
- PR #24의 독립 라벨 도구 검사는 **11/11** 통과했습니다. 원격 대신 fake backend를 사용했으며, 응답 시나리오 검증은 실제 프로젝트 설치·호스트 자동 호출·GitHub 라벨 생성의 증거와 구분합니다.
- `evaluate-skill` 결과는 workflow-init **72/100(C)**, 기존 두 호환 진입점 각각 **95/100(A)**입니다. 정적 비용·복잡도 등의 경고가 남아 있으며 실제 호출 토큰 사용량은 측정하지 않았습니다.

이번 버전에는 세션 간 요청 누락 방지 규칙 변경을 포함하지 않습니다.

## 변경 근거

- [workflow-init과 선택 설치: PR #24](https://github.com/insung/git-workflow/pull/24)
- [독립 검토 기록](https://github.com/insung/git-workflow/blob/45706666c1a8b4397138f00926ca0e43fcdecbbb/docs/git-workflows/2026-10/05_23_workflow-init/review.md)
- [이전 버전 v0.5.0](https://github.com/insung/git-workflow/releases/tag/v0.5.0)
- [전체 변경: v0.5.0 → v0.6.0](https://github.com/insung/git-workflow/compare/v0.5.0...v0.6.0)
