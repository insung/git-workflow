# 자동 릴리즈 노트 분류

[release.yml 정본](../assets/.github/release.yml)을 대상 `.github/release.yml`에 설치한다. 설정은 기능·개선, 수정, 설치·운영, 릴리즈 준비, 문서·사용 안내, 기타 변경으로 분류한다. 문서 변경은 제외하지 않고 문서 범주에 유지한다.

대상 저장소 루트와 `.github/release.yml`·`.github/release.yaml` 및 release-drafter 등 기존 릴리즈 자동화 설정을 확인한다. 두 네이티브 파일명은 같은 설정으로 취급한다. 둘 중 하나가 있으면 새 파일을 복사하지 않는다. 둘 다 있으면 중복 상태를 보고하고 임의 삭제·교체하지 않는다. 네이티브 설정이 없고 기존 자동화와 충돌하지 않으면 선택한 정본을 복사한다. 기존 자동화와 충돌 가능성이 있으면 차이와 적용안을 제시하고 사용자 결정 전 복사하지 않는다. 이미 있으면 바이트를 보존하고 차이를 보고한다. 병합·교체는 변경안을 먼저 제시하고 해당 요청·승인을 받은 뒤 처리한다. 다른 릴리즈 자동화 설정도 함께 확인하고 임의 수정하지 않는다.

분류 설정 설치는 라벨 생성이나 Release·태그 발행을 수행하지 않는다. 참조 라벨이 없어도 자동 생성하지 않고 상태를 보고한다. [GitHub 자동 릴리즈 노트](https://docs.github.com/en/repositories/releasing-projects-on-github/automatically-generated-release-notes)의 설정 형식을 따른다.
