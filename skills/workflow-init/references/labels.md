# 라벨 초기화

정의 정본은 [labels.yml](../assets/labels.yml)이다. 이름·한국어 설명·6자리 색상을 읽고 대상 `owner/repo`를 명시한다. 템플릿이나 release.yml 설치는 라벨 생성 권한이 아니다.

```bash
python3 <workflow-init>/scripts/sync-labels.py --repo owner/repo --definitions <workflow-init>/assets/labels.yml
```

기본은 미리보기다. 기존 이름과 메타데이터 차이, 누락 목록을 보고하고 생성할 이름·설명·색상과 범위를 제시한다. 사용자가 「라벨만 설치해줘」·「이 정의의 누락 라벨을 만들어줘」처럼 명시적으로 설치·생성을 요청했고 대상 owner/repo·정의가 지정되거나 확인됐으며 write 권한이 확인되면, 미리보기 결과를 보고한 뒤 그 범위에서 `--apply`로 실행한다. 이미 받은 누락 생성 권한을 재확인하지 않는다. 일반 메뉴 제시만으로 생성하지 않으며, 대상·정의·부분 범위 중 빠진 정보가 있으면 그 정보만 확인한 뒤 진행한다. 일부 라벨만 승인하면 승인된 정의만 담은 YAML을 별도 임시 파일로 만들고 그 파일을 지정한다.

```bash
python3 <workflow-init>/scripts/sync-labels.py --repo owner/repo --definitions approved-labels.yml --apply
```

Python 3·PyYAML·인증된 gh가 필요하다. PyYAML 미설치 오류는 의존성 부족으로 보고하며 원격 동작을 진행하지 않는다. 조회 실패는 부재가 아니다. 도구는 API 페이지를 최대 1000회 조회하고 상한 도달 시 멈춘다. 기존 라벨은 설명·색상 차이가 있어도 보존한다. `--force`·edit·delete는 지원하지 않는다. 생성 응답이 실패하거나 불명확해도 재조회로 존재를 확인하며 확인 실패는 오류로 보고한다. [공통 라벨 기준](../../git-workflow/references/labels.md)으로 실제 Issue/PR 적용 범위를 판단한다.
