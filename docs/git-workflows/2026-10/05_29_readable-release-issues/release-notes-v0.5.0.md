# v0.5.0 — 승인한 머지 뒤 안전한 작업 정리와 Issue 종료

> 개정 초안. 공개 원문은 release-source.json 스냅샷 기준이며, 사용자 검토 승인 완료. 공개 반영은 별도 진행. 과거 버전의 동작·검증 기록.

승인한 PR 머지 뒤 안전한 구현 워크트리를 정리하고 Issue 종료 결과를 확인할 수 있다. 구현·독립 검토의 역할과 각 행동의 승인 경계도 분명해진다. 마지막 공개 Release v0.3.0 이후의 사용자 영향 변경을 포함한다.

## 배포 범위

공개 릴리즈 비교 범위는 v0.3.0 → v0.5.0이다. v0.4.0 태그·Release는 발행되지 않았다. 0.4.0 버전 갱신 커밋 [`709caa2`](https://github.com/insung/git-workflow/commit/709caa2)는 내부 이력을 나누는 기준이며 공개 배포 지점이 아니다.

이번 대상은 PR #21 머지 커밋 [`45e2517`](https://github.com/insung/git-workflow/commit/45e2517587d31c45491c88588e7083b4c2d1f5ad)이다. 검증·설치 후보 `6416dcd`와 전체 파일 트리가 동일하다. 아래 결과는 `709caa2..45e2517`의 통합 이력·실제 diff와 선행 구간 `v0.3.0..709caa2`를 함께 대조했으며, 선행 변경은 별도로 표시한다.

## 기능·개선

### AGENTS.md 채택과 구현·검토 역할 분리

`agents-init`으로 개별 프로젝트 또는 여러 프로젝트의 루트에 git-workflow 채택 선언을 제안할 수 있다.

- 승인: 정확한 경로·추가 전문·위치를 보여주고 명시적 승인 후 추가한다.
- 확인: 기존 선언과의 중복·충돌을 먼저 확인한다.
- 보존: 기존 AGENTS.md 내용은 유지한다.
- 메인 에이전트는 Issue·plan·구현 위임·독립 검증·PR·승인된 머지·Issue 종료를 조정하고, 구현은 이전 대화를 상속하지 않는 별도 에이전트에 맡기는 선언을 제공한다.
- 구현 전 검토 기준·입력 고정을 확인하고, 미확인이면 위임을 보류한다.
- 인계에는 공통 목적·유지할 결정·담당 범위와 Issue→plan→task→handoff·공개 리뷰 지적의 읽기 순서를 명시한다.
- 검토 기준이나 비공개 검증 입력을 작성·읽은 세션은 같은 변경을 구현하지 않는다.
- 재작업 시 공개된 fail/human-review 지적은 전달하되 비공개 입력 경계를 유지한다.
- 근거: [PR #7](https://github.com/insung/git-workflow/pull/7), [PR #15](https://github.com/insung/git-workflow/pull/15), [PR #19](https://github.com/insung/git-workflow/pull/19).

### Issue 종료와 결과 기록

- `issue-close`를 추가한다. AC·미체크 task·연결 PR의 실제 머지와 근거를 확인한 뒤 completed, not planned, duplicate 사유를 구분한다.
- 미충족·미확인 AC, 남은 미체크 task, 머지 미확인 또는 근거 부족은 completed 종료를 차단한다.
- not planned는 사람의 결정에 따른다.
- 결과 코멘트를 먼저 게시·조회한 뒤 닫고, CLOSED·stateReason·코멘트를 재확인한다.
- 자동 종료된 Issue는 재오픈 없이 결과를 보완한다.
- 종료 시 해당 작업 워크트리의 삭제·이미 없음·보류·실패·미확인·해당 없음과 근거·다음 행동을 기록한다.
- 자원 정리 결과와 Issue 완료를 별도로 판단한다.
- 근거: [PR #9](https://github.com/insung/git-workflow/pull/9), [PR #18](https://github.com/insung/git-workflow/pull/18).

### 읽기 쉬운 기록과 템플릿 보존

- Issue·PR은 결론과 필요한 행동을 먼저, plan은 공통 목적·결정·단계, task는 실제 작업·검증 결과, handoff는 상세 근거, review는 독립 판정을 기록하도록 역할을 정리한다.
- 한 항목에 하나의 결과를 담고 미실행·위험·전달 정보와 중요한 선택 이유는 보존한다.
- 원격 본문은 요약과 검증된 고정 링크를 사용하고 로컬 경로·문서 전문 복사를 피한다.
- README에 요청별 스킬 선택과 읽기 순서를 추가한다.
- 닫힌 Issue 이후의 다른 후속 범위는 새 연결 Issue로 추적한다.
- `template-init`의 필수 절·동등한 의미의 절·기존 파일 보존·누락 디렉터리 생성·remote 없는 경우의 기준을 보완한다.
- 자산 이름을 FEATURE_REQUEST.md·BUG_REPORT.md로 통일하고 대소문자 별칭·중복을 검사한다.
- Python 업그레이드 등 예제와 실제 워크플로우 기록·계획·검증 인계를 갱신한다.
- 근거: [PR #7](https://github.com/insung/git-workflow/pull/7), [PR #14](https://github.com/insung/git-workflow/pull/14).

### 담당자·공동 작성자·패키지

- Issue·PR 생성 후 실제 assignee login을 확인한다.
- AI 기여 표기는 `Agent:`에서 표준 `Co-authored-by:`로 바뀐다. 실제 기여한 도구만 기록하며 사람의 Git author 설정은 바꾸지 않는다.
- agents-init·issue-close·정리·댓글 정책을 필수 패키지 검사에 포함하고 자산 이름·템플릿 절 일치·필수 파일 누락 회귀 검사를 보강한다.
- 일반·Codex·Claude manifest 3곳의 버전을 0.5.0으로 일치시키고 CHANGELOG와 설치 인계를 추가한다.
- 근거: [PR #9](https://github.com/insung/git-workflow/pull/9), [PR #14](https://github.com/insung/git-workflow/pull/14), [PR #21](https://github.com/insung/git-workflow/pull/21).

## 수정

### 머지 후 안전한 워크트리 정리와 승인 변경

- 정리는 실제 MERGED·mergedAt·mergeCommit을 확인한 후 시작한다.
- PR 머지 승인은 해당 PR·승인 HEAD에 정확히 대응하는 안전한 구현 워크트리 정리까지 포함한다.
- 머지 결과 조회만 요청했거나 보존을 명시했다면 삭제하지 않는다.
- Issue 종료만 요청했고 안전한 정확한 대상의 삭제 승인이 없다면 삭제 여부를 묻는다. 동의 후 상태를 재확인하며, 거절·무응답이면 보존한다.
- staged·unstaged·untracked·보존 필요 ignored·후속 커밋·다른 세션 사용·shared·locked·보호 대상과 불명확한 대상은 보존한다.
- 기본 checkout·다른 작업·리뷰 워크트리는 기본 정리 대상에서 제외한다.
- 일반 linked worktree는 강제 옵션 없이 제거하고 경로와 등록 목록에서 부재를 확인한다.
- Codex 관리 worktree는 정확한 관리 identity를 확인해 archive 도구를 사용한다.
- 로컬·원격 브랜치 삭제와 외부 댓글 게시는 별도 승인이 필요하다. 워크트리 제거만으로 브랜치 삭제를 추정하지 않는다.
- 정리 실패·미확인과 확인된 머지 완료는 따로 기록한다.
- 근거: [PR #10](https://github.com/insung/git-workflow/pull/10), [PR #18](https://github.com/insung/git-workflow/pull/18).

### PR 검토 댓글과 HEAD별 근거

- 최초 검토·재검토·머지 직전 확인의 담당·시점·양식을 정의한다. 모든 AC ID, 검토 HEAD, 판정·근거·위험·승인 상태를 요약한다.
- 댓글 요청이 없으면 대화 또는 요청된 문서로 반환한다.
- 댓글 게시 승인과 검토·머지 승인을 구분한다.
- 새 HEAD의 근거가 없으면 이전 pass를 재사용하거나 새 pass를 만들지 않고 미확인·재검토 필요로 반환한다.
- 머지 직전 불일치 기록에는 검토 HEAD와 실제 PR HEAD를 구분한다.
- 기존 댓글의 소유·종류·HEAD·본문을 확인해 신규·수정·생략을 결정하고, 응답 불명확 시 재조회하여 중복 게시를 방지한다.
- 일반 대화 댓글 규칙이며 공식 Review 제출이나 인라인 댓글과 구분한다.
- 근거: [PR #12](https://github.com/insung/git-workflow/pull/12), [PR #16](https://github.com/insung/git-workflow/pull/16).

## 기능·개선: 공개 v0.3.0 이후 선행 변경

v0.4.0 공개 Release가 없으므로 다음 선행 변경도 함께 받는다. 이 항목들은 v0.4.0 기준 뒤에 새로 추가된 것으로 중복 분류하지 않는다.

- `task-implement` 단계와 단계별 task·검증·handoff 흐름을 도입한다.
- 구현 전 독립 검토 기준·고정 입력, 리뷰 전 별도 review 브랜치 보관, 역할별 입력 경계 및 검증 실행 주체를 도입한다.
- 작업 파일명을 `task-{nn}-{title}.md`로 통일하고 관련 README·Python 업그레이드 예제를 연결한다.
- 비교: [v0.3.0 → 0.4.0 버전 커밋](https://github.com/insung/git-workflow/compare/v0.3.0...709caa2).

## 전환 안내

- 기존 프로젝트 AGENTS.md 선언과 기존 템플릿은 자동 교체하지 않는다. 채택 선언의 추가·변경은 제안 후 승인을 받아 적용한다.
- 작업 워크트리를 남기려면 머지 요청에 보존 의사를 명시한다. 자동 정리가 머지 승인에 포함되는 범위로 바뀌었기 때문이다.
- 브랜치·리뷰 워크트리 삭제는 여전히 별도 요청 범위다.

## 검증과 알려진 한계

- 0.5.0 후보에서 기존 회귀 29/29와 패키지 구조·manifest·상대 링크·공백 검사가 통과했다. 모든 스킬의 새 행동을 검증한 결과는 아니다.
- Claude Code·Codex에 0.5.0 설치·활성화를 확인하고 핵심 스킬·참조 4개와 manifest의 원본 일치를 확인했다. 기존 채팅의 새 지침 재로딩은 미확인이다. Claude 재시작·Codex 새 채팅을 권장한다.
- PR #18의 독립 행동 검증과 구현자 자기 검증 미실행 한계는 [해당 검토 기록](https://github.com/insung/git-workflow/blob/1f6dac2cca3516d556c03fe02a8c3345e97799a2/docs/git-workflows/2026-10/03_17_issue-close-cleanup/review.md)에 유지한다. 한 버전의 모든 행동을 실제 자원 삭제로 검증한 것으로 표현하지 않는다.

## 변경 근거

**공개 변경 비교:** [v0.3.0 → v0.5.0](https://github.com/insung/git-workflow/compare/v0.3.0...v0.5.0)

**내부 구간 근거:** [0.4.0 버전 커밋 → v0.5.0](https://github.com/insung/git-workflow/compare/709caa2...v0.5.0)
