# git-workflow

변경 요청을 Issue의 의도·영향 범위·달성 조건으로 정리하고, 계획·구현·테스트·PR 검토·머지까지 같은 근거로 이어가는 Codex·Claude Code용 플러그인이다. 작업 기록은 docs/에 두고, 각 단계가 이전 단계의 의도와 실제 결과를 확인한다.

Issue → plan/todo → 구현·테스트·커밋 → PR → spec-it 검토 → 사용자 승인 → 머지 → Wiki로 연결한다.

| 스킬 | 역할 |
| --- | --- |
| git-workflow | 전체 단계 선택·공통 경계·plan/todo 구현 조율 |
| issue-create | 기존 Issue 확인·생성/보완, 의도·영향·달성 조건 |
| plan-create | Issue 기반 계획·단위 todo·검증·배포/롤백 계획 |
| pr-create | 구현 후 PR 본문과 검토 인계 |
| pr-review | 사용자 의도·plan/todo·diff/commit·정책·테스트 증거 검토 |
| pr-merge | 승인된 HEAD의 머지 확인과 Wiki 기록 |
| commit-rule | 범위·메시지·index 보존·브랜치 규칙 |
| git-release | 태그·릴리즈·이력 기반 노트 |

[흐름도·필수 조건·양식](docs/workflow.md), [로컬 시험](docs/testing/local-pilot.md), [사용 가상 사례](README.md#examples-illustrative)를 참고한다. 상세와 양식의 정본은 각 스킬 references/에 있다. 기능·버그 Issue는 별도 템플릿을 사용한다. 공통 type·scope·문체는 git-workflow/references/에서 참조한다. 이동된 옛 파일과 안내용 별칭은 남기지 않는다.

## 작업 문서와 외부 기록

대상 리포 `docs/git-workflows/{yyyy-MM}/{dd}_{issue-number}_{title}/`에 plan.md, todos.md 또는 01-todos.md 등을 기록한다. 실제 Issue 번호 확인 후 경로를 확정하며 원격 불가 파일럿은 `{dd}_draft_{title}`로 구분한다. 계획에는 Issue 맥락·사용자 의도·단위 실행 흐름·검증·배포/롤백이 필수다. unit test와 사례별 실제 결과는 구현 담당이 기록하고 리뷰 담당이 AC·코드·commit과 대조한다.

PR 생성·머지 전에 본문의 Issue 항목을 실제 원격 Issue와 대조한다. PR 오연결·접근 불가·내용 불일치이면 보류하며 local-draft는 대신할 수 없다.

Issue/PR에는 전문을 복사하지 않고 핵심 결과·판단·남은 일과 확인된 문서 링크를 남긴다. 라벨은 저장소의 기존 분류를 우선하고 필요한 누락 라벨만 승인·권한 범위에서 생성한다. 전체 라벨 목록을 미리 만들지 않는다.

## 시험과 설치

0.2.0은 `feat/issue-review-workflow` 작업 브랜치에서 제공한다. 브랜치가 push된 뒤 [README의 브랜치 지정 명령](README.md#installation)으로 Codex·Claude에 설치한다. 기존 마켓플레이스가 있으면 등록된 ref와 설치 버전을 확인하고 해당 마켓플레이스·플러그인만 갱신한다. 기본 브랜치 반영은 머지 승인 후 별도 단계다. 새 세션에서 설치된 스킬을 확인하며, 미발행 로컬 변경 시험은 실제 소스 파일 경로를 지정한다.

현재 세션에서 단계별 실행할 수 있으며 별도 에이전트는 필수가 아니다. 스킬만으로 자동 트리거·강제 검증·무오류를 보장하지 않는다. commit·push·PR·머지·배포·Wiki는 각각 요청된 범위에서 실행한다. 공유 계획은 docs/에, 임시 실행 자료는 git ignore된 .superpowers/에 둔다.
