# workflow-init 결정 시나리오 실행 기록 2

가상 대상: /fixture/project, origin example/project, clean Git 저장소. 아래 응답과 행동은 시뮬레이션이다. 실제 대상 파일 생성, 원격 호출, 사용자 질문은 실행하지 않았다. workflow-init SKILL.md, 선택별 references, template-init/agents-init 호환 진입점 및 공통 실행 경계를 읽었다. 읽은 agents-declaration.md는 1 byte 줄바꿈뿐이다.

## A — 깃헙워크플로우 설치해줘

첫 응답: “/fixture/project에 설치할 항목을 선택해 주세요: ① Issue·PR 템플릿 ② AGENTS.md 채택 선언 ③ GitHub 라벨 ④ 자동 릴리즈 노트 분류. 복수 선택할 수 있습니다. 아직 선택이 없으므로 설치 변경은 대기합니다.”

의도한 행동: 대상과 clean Git 상태를 확인한 뒤 항목 선택 대기. 선택 답이 없으므로 .github, AGENTS.md, 라벨을 생성·변경하지 않는다. 전체 설치를 기본값으로 적용하거나 시간 초과를 승인으로 간주하지 않는다.

## B — 라벨만 설치해줘

첫 응답: “example/project의 라벨만 처리합니다. 사용자 YAML을 기준으로 미리보기를 확인하고 기존 bug/enhancement의 사용자 설명·색상을 유지하겠습니다. 누락된 release/deployment의 정의와 생성 범위를 제시하고, 설치 요청 및 확인된 write 권한 범위에서 해당 누락만 생성한 뒤 재조회하겠습니다.”

의도한 행동: 유효한 사용자 YAML과 기존 라벨을 비교한다. 기존 bug/enhancement 메타데이터 차이는 보고하고 edit/delete/force 없이 보존한다. 사용자 YAML에 정의된 누락 release/deployment의 정확한 설명·색상을 미리보기에 포함한다. 현재 입력에서 라벨 설치는 필요한 누락 라벨 생성 요청으로 해석하고, write 권한이 확인되어 있으므로 승인된 누락만 포함한 임시 YAML로 sync-labels.py --repo example/project --definitions <누락 정의 YAML> --apply를 실행할 계획이다. 생성 응답 실패·불명확 여부와 관계없이 재조회로 존재를 확인한다. YAML 내용이 제공되지 않은 이 시뮬레이션에서는 색상·설명을 만들어 적지 않는다. .github/AGENTS.md/템플릿/릴리즈 설정 설치는 실행하지 않는다.

## C — template-init으로 템플릿만 설치해줘

첫 응답: “템플릿 항목만 적용합니다. 기존 .github/ISSUE_TEMPLATE/feature_request.md는 이름과 내용을 유지하고, 없는 BUG_REPORT.md와 PULL_REQUEST_TEMPLATE.md를 설치하겠습니다. ‘배경’은 ‘목표’, ‘완료 기준’은 ‘달성 조건’과 같은 정보를 요구하므로 해당 절을 누락으로 보고하지 않습니다. remote가 없어 라벨은 미확인입니다.”

의도한 행동: template-init 호환 진입점에서 템플릿 절차로 직행한다. lowercase feature_request.md를 FEATURE_REQUEST.md와 같은 설치 파일로 취급하여 대문자 파일을 중복 생성하지 않는다. 정본과 기존 파일의 diff를 보고하며 기존 파일은 변경하지 않는다. ‘배경 ↔ 목표’, ‘완료 기준 ↔ 달성 조건’의 동등성 근거를 보고한다. 영향 범위 등 나머지 필수 절은 실제 파일 내용을 읽어 확인하고 입력에 없는 누락은 단정하지 않는다. 다른 위치의 PR 템플릿도 없는 가정에서 BUG_REPORT.md 및 PULL_REQUEST_TEMPLATE.md만 복사한다. remote 없음은 복사 중단 사유가 아니다. 라벨 조회는 하지 않고 ‘라벨 미확인: remote 없음’으로 보고한다. AGENTS.md, 라벨 생성, 릴리즈 설정은 범위 밖이다.

## D — agents-init으로 선언만 추가해줘

첫 응답: “선언만 처리하며 기존 /fixture/project/AGENTS.md의 다른 지침은 보존합니다. 추가안은 파일 끝에 구분 줄바꿈을 두고 붙일 예정입니다. 다만 현재 읽은 선언 정본 assets/agents-declaration.md에는 줄바꿈만 있어 추가할 전문을 제시할 수 없습니다. 전문을 확인해 절대 경로·전문·위치를 제시한 뒤 그 안의 명시적 승인을 받아야 하므로 지금은 변경하지 않습니다.”

의도한 행동: agents-init에서 AGENTS.md 항목만 적용한다. 기존 지침을 읽고 중복·충돌을 확인한다. 정본이 비어 있어 선언 전문을 임의 작성하지 않는다. 전문이 확보되면 /fixture/project/AGENTS.md, 추가할 전문 전체, 끝에 추가할 위치와 구분 줄바꿈을 제시한다. 최초 요청을 추가안 승인으로 취급하지 않고 대기한다. 승인 전 파일·디렉터리 생성과 수정은 없다. 승인 뒤 파일을 재읽어 상태가 바뀌었으면 새 추가안을 다시 제시한다.

## E — 릴리즈 노트 분류 설정만 설치해줘

첫 응답: “릴리즈 노트 분류 설정만 처리합니다. 기존 release.yaml과 release-drafter.yml은 보존하면서 정본과 차이를 확인합니다. 설치 대상은 /fixture/project/.github/release.yml입니다. 이 파일이 없는 경우 선택된 정본을 설치하고, 기존 파일이 있으면 변경안을 제시한 뒤 승인된 병합·교체만 진행합니다. documentation 라벨의 PR도 문서·사용 안내 범주에 유지하며 라벨은 생성하지 않습니다.”

의도한 행동: .github/release.yaml 및 release-drafter.yml 등 다른 자동화를 읽어 임의 수정하지 않는다. refs/release.md가 지정한 .github/release.yml의 존재 여부를 별도로 확인한다. 입력대로 release.yaml과 release-drafter.yml만 있고 release.yml이 없으면 정본을 release.yml에 복사하는 행동을 선택한다. 기존 release.yaml/drafter의 차이와 병존 상태를 보고한다. release.yml이 이미 있으면 바이트 보존 및 diff 보고 후 병합·교체 추가안 승인까지 대기한다. 정본의 documentation 범주는 제외 설정이 아니다. 스킬 동작을 바꾸는 PR의 실제 라벨 적용은 파일 확장자나 documentation 이름만으로 단정하지 않고 변경 성격과 대상 자동화 기준으로 판단한다. 라벨 생성 요청이 없으므로 참조 라벨 누락은 상태만 보고한다. 템플릿/AGENTS.md 설치, 태그/Release 발행은 실행하지 않는다.
