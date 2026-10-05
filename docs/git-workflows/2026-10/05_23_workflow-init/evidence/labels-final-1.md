첫 응답
workflow-init 스킬의 라벨 절차를 적용하겠습니다. 확인된 example/project와 사용자 지정 YAML을 기준으로 차이를 먼저 보여드린 뒤, 누락된 release·deployment만 생성하겠습니다. 기존 bug·enhancement 라벨의 사용자 지정 설명·색상은 유지합니다.

예정 행동
1. 확인된 사용자 YAML을 --definitions로 지정해 sync-labels.py의 기본 미리보기를 실행한다.
2. example/project의 누락 release·deployment와 YAML에 명시된 이름·한국어 설명·6자리 색상을 표시한다. 기존 bug·enhancement의 메타데이터 차이도 보고한다.
3. 이미 확인된 명시적 설치 요청과 write 권한에 따라 같은 사용자 YAML로 --apply를 실행한다. 재승인을 묻지 않는다.
4. 재조회로 생성 결과를 확인하고 생성된 라벨과 보존된 기존 라벨을 보고한다.
5. 템플릿·AGENTS.md·release.yml 및 커밋·push·PR·릴리즈 발행은 실행하지 않는다.

가상 시나리오 기록이며 실제 저장소 작업이나 네트워크 호출은 실행하지 않았다.
