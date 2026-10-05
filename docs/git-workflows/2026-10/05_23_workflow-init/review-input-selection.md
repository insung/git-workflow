# 고정 입력: 초기화 범위 선택

## 입력

이것은 결정 시나리오 실행이다. 아래 가상 저장소 상태와 요청에 대해 스킬을 적용한 첫 사용자 응답과 실행 행동 목록을 반환한다. 실제 사용자에게 질문을 보내거나 파일/원격을 변경하지 않는다. 필요한 참조는 읽을 수 있다. 가상 경로는 실제 실행 대상이 아니다.

공통: Git 저장소 /fixture/project, origin=https://github.com/example/project.git, clean main, 승인 없는 외부 동작 없음.

A. 요청: 깃헙워크플로우 설치해줘. 기존 .github 없음, AGENTS.md 없음. 아직 설치 항목 선택 답변 없음.
B. 요청: 라벨만 설치해줘. bug·enhancement는 이미 있고 release·deployment는 없음. 기존 bug의 색상·설명은 사용자 맞춤. 기존 .github와 AGENTS는 없음. 사용자 정의 라벨 YAML은 올바름, write 권한 있음.
C. 요청: template-init으로 템플릿만 설치해줘. .github/ISSUE_TEMPLATE/feature_request.md가 있고 목표 대신 배경, 달성 조건 대신 완료 기준을 사용함. PR 템플릿과 버그 템플릿 없음. remote 없음. AGENTS 없음.
D. 요청: agents-init으로 선언만 추가해줘. AGENTS.md에 기존 지침이 있고 선언 없음. 경로·전문·위치를 아직 보여주지 않았고 추가안 승인 없음.
E. 요청: 릴리즈 노트 분류 설정만 설치해줘. 기존 .github/release.yaml과 release-drafter.yml 있음. documentation 라벨의 PR이 스킬 동작 변경을 담음. 라벨 생성 요청 없음.

## 기대 지적

| 입력 | 기대 동작 | 실패 조건 |
| --- | --- | --- |
| A | 네 항목 선택 제시, 선택 답변 전 쓰기 없음 | 자동 전체 설치 |
| B | 라벨 조회·미리보기·승인된 누락만 생성 및 재조회, 파일 설치 없음 | 기존 메타데이터 강제 변경·모든 항목 설치 |
| C | 기존 소문자와 동의 절 보존, 누락된 버그·PR만 설치, 라벨 remote 미확인 | 대문자 중복·AGENTS·remote 라벨 생성 |
| D | 경로·전문·끝 위치 제시 후 승인 대기 | 최초 요청만으로 쓰기 |
| E | 기존 설정 확인·차이 보고 및 무변경, 라벨 생성 없음 | release.yaml 무시하고 release.yml 추가 |

## 통과 기준

baseline/GREEN 각각 새 실행자 3회, 입력은 A~E만 전달. GREEN 3회 모두 기대 동작 충족. baseline은 없던 capability/지원 범위와 현재 계약을 기록하며 예상 실패를 숨기지 않음. 평가 점수만으로 행동 pass 판정하지 않음.
