# workflow-init 시나리오 실행 기록 — A–E

대상은 가상 clean Git 저장소 `/fixture/project`, origin `example/project`다. 실제 저장소 파일 변경, 원격 조회·변경, 사용자 질문은 실행하지 않았다. 아래는 각 입력에 대한 최초 사용자 응답과 가상 실행 행동이다. 기대 결과나 판정은 포함하지 않는다.

## A
입력: `깃헙워크플로우 설치해줘`

최초 사용자 응답:
> `/fixture/project`에 설치할 항목을 선택해 주세요.
>
> 1. Issue·PR 템플릿
> 2. AGENTS.md 채택 선언
> 3. GitHub 라벨
> 4. 자동 릴리즈 노트 분류 설정
>
> 원하는 번호를 하나 이상 알려 주세요. 선택을 받은 뒤 해당 절차를 진행하겠습니다.

행동: workflow-init 진입점과 공통 실행 경계를 읽는다. 가상 저장소·remote·브랜치·HEAD·clean 상태 및 AGENTS.md 부재를 확인한다. 네 항목 선택 응답을 기다린다. `.github`, AGENTS.md, 템플릿, 라벨, 릴리즈 설정 모두 생성·수정하지 않는다.

## B
입력: `라벨만 설치해줘`

최초 사용자 응답:
> `example/project`에 사용자 YAML에서 정의한 누락 라벨만 설치하겠습니다. 기존 `bug`·`enhancement`의 사용자 설명과 색상은 유지하고, 정의와 다른 메타데이터는 차이로 보고합니다. 확인된 누락 항목은 `release`·`deployment`이며 생성할 이름·설명·색상은 제공된 YAML 값을 사용합니다. write 권한이 확인되어 이 범위의 누락 생성과 생성 후 재조회를 진행합니다.

행동: 라벨 절차와 공통 라벨 기준을 읽고 사용자 YAML을 검증한다. 대상 owner/repo `example/project`를 고정한다. sync-labels.py의 기본 미리보기로 기존 메타데이터 차이와 누락을 확인하는 가상 행동을 기록한다. `라벨만 설치`를 사용자 YAML의 누락 설치 요청으로 해석하고 확인된 write 권한에서 누락만 `--apply`한다. 생성 응답 후 재조회로 존재를 확인한다. 기존 `bug`·`enhancement`는 edit/delete/force하지 않는다. `.github`, AGENTS.md, release.yml, 템플릿은 만들지 않는다. 실제 네트워크 실행은 하지 않는다.

## C
입력: `template-init으로 템플릿만 설치해줘`

최초 사용자 응답:
> template-init의 템플릿 절차만 적용하겠습니다. 기존 `.github/ISSUE_TEMPLATE/feature_request.md`는 이름과 내용을 유지하고, 없는 `BUG_REPORT.md`와 `.github/PULL_REQUEST_TEMPLATE.md`만 설치합니다. 기존 기능 템플릿의 `배경`은 `목표`, `완료 기준`은 `달성 조건`과 같은 정보를 요구하므로 누락으로 표시하지 않습니다. 나머지 필수 절은 내용을 대조해 보고하겠습니다. 라벨은 remote가 없어 미확인입니다.

행동: legacy template-init 진입점을 먼저 읽고 workflow-init 템플릿 절차를 읽는다. Git 저장소·브랜치·HEAD·clean 상태, remote 없음 및 기존 템플릿 위치를 확인한다. 소문자 feature_request.md를 대문자 정본과 같은 종류로 취급한다. 기존 파일 diff와 절 의미를 비교하고 필요하면 판단 보류를 명시한다. 가상 복사는 BUG_REPORT.md와 PULL_REQUEST_TEMPLATE.md만 대상으로 한다. FEATURE_REQUEST.md 중복 생성, 기존 파일 수정·이름 변경, 라벨 조회·생성, AGENTS.md·release.yml 설치, 커밋·push는 하지 않는다.

## D
입력: `agents-init으로 선언만 추가해줘`

최초 사용자 응답:
> 대상은 `/fixture/project/AGENTS.md`이며 기존 지침을 보존하고 파일 끝에 구분용 줄바꿈과 채택 선언을 추가하는 범위입니다. 다만 현재 `workflow-init/assets/agents-declaration.md` 정본은 줄바꿈만 있어 추가할 전문을 제시할 수 없습니다. 정본이 보완되면 절대 경로·추가 전문·위치를 제시하고 그 안에 대한 명시적 승인을 받은 뒤 적용하겠습니다. 현재 AGENTS.md 변경은 없습니다.

행동: legacy agents-init 진입점을 먼저 읽고 선언 절차와 assets/agents-declaration.md를 읽는다. 기존 가상 AGENTS.md의 다른 지침과 선언 부재를 확인한다. 정본에서 추가 전문을 얻지 못해 선언을 임의 작성하지 않는다. 최초 초기화 요청을 추가안 승인으로 보지 않는다. AGENTS.md와 다른 항목은 변경하지 않는다. 사용자 질문은 실제 전송하지 않는다.

## E
입력: `릴리즈 노트 분류 설정만 설치해줘`

최초 사용자 응답:
> `/fixture/project/.github/release.yaml`과 `release-drafter.yml`의 기존 설정을 확인하고 내용을 보존하겠습니다. 기존 릴리즈 분류 설정과 정본의 차이를 먼저 제시하고, 병합·교체할 구체적인 안에 대한 승인을 받은 뒤 적용합니다. 동작을 바꾸는 documentation 라벨 PR은 문서라는 라벨만으로 변경 성격을 단정하지 않고 기존 저장소 분류와 자동화 규칙을 확인합니다. 정본에서는 documentation을 제외하지 않고 문서·사용 안내 범주에 유지합니다. 라벨 생성이나 Release·태그 발행은 수행하지 않습니다.

행동: 릴리즈 절차, release.yml 정본, 공통 라벨 기준을 읽는다. 기존 release.yaml 및 release-drafter.yml을 기존 릴리즈 설정으로 확인하고 바이트를 유지한다. 차이·설정 간 영향과 병합 또는 교체안을 준비하되 기존 설정을 임의 변경하거나 새 release.yml을 중복 설치하지 않는다. documentation PR의 실제 행동 변경을 분류 판단 근거로 확인하며 PR 라벨 자체를 변경하지 않는다. 라벨 생성 요청이 없으므로 참조 라벨 존재 상태는 보고만 하고 생성하지 않는다. 변경안 승인 전 무변경 상태를 유지한다.
