# Issue·PR 라벨

Issue/PR 생성·변경 시 읽는다. 라벨은 저장소별 분류이며 대상 저장소의 현재 목록·문서·release-drafter 등 자동화 설정이 우선이다. 제목 type으로 라벨을 단정하지 않는다.

## 선택

| 관찰한 변경/상태 | 기존 동의 라벨이 없을 때 후보 |
| --- | --- |
| 버그 | bug |
| 기능·개선 | enhancement |
| 문서 | documentation |
| 구조·테스트·성능·CI | refactor / test / performance / ci |
| 사람 결정·외부 의존으로 보류 | needs-decision / blocked |
| 테스트 증거 부족·리뷰 대기 | needs-tests / needs-review |
| 실제 호환성 변경 | breaking-change |

기본적으로 변경 성격과 실제 필요한 보류 사유만 선택한다. priority:*는 저장소 우선순위가 정해졌을 때만 붙인다. question, duplicate, invalid, wontfix, help wanted, good first issue, accessibility도 실제 요청과 저장소 용도에 맞을 때만 선택한다. 작은 작업이라는 이유만으로 good first issue를 자동 적용하지 않는다.

## 확인·생성·적용

1. 대상 owner/repo를 고정하고 `gh label list --repo <owner/repo> --limit 1000 --json name,description,color`로 조회한다. 1000개 제한에 닿으면 추가 페이지를 조회하기 전에는 부재를 판정하지 않는다. 조회 실패도 부재가 아니다.
2. 의미가 같은 기존 라벨을 정확한 이름으로 재사용한다. 자동화가 이름을 요구하면 그 설정을 따른다. 단순 type→label 표로 기존 분류를 덮어쓰지 않는다.
3. 필요한 라벨이 없으면 이름·설명·색상과 생성 범위를 정한다. 사용자가 필요한 누락 라벨 생성까지 요청했고 write 권한이 확인되면 그 범위에서 생성한다. 그렇지 않으면 필요한 라벨과 승인/권한 부족을 보고한다. 제안 목록 전체를 미리 생성하지 않는다.
4. `gh label create <name> --repo <owner/repo> --description <설명> --color <6자리HEX>`로 생성한다. `--force`는 기존 메타데이터를 바꾸므로 사용하지 않는다. 동시 생성·응답 불명은 재조회로 확인하며 기존 라벨을 삭제하지 않는다.
5. 존재가 확인된 이름만 Issue/PR 생성의 `--label` 또는 해당 edit의 `--add-label`로 적용하고 실제 결과를 확인한다. 누락 라벨 생성 실패 시 확인된 기존 라벨만 사용하고 미적용 사유를 보고한다. 저장소 자동화가 필수로 요구하는 라벨을 못 붙이면 원격 생성 대신 초안으로 반환한다.
6. needs-tests 등 상태 라벨은 증거가 보완된 뒤 해당 워크플로우가 붙인 것만 승인된 범위에서 제거한다. 다른 작업의 라벨은 일괄 교체하지 않는다.

```bash
gh label list --repo owner/repo --limit 1000 --json name,description,color
# 필요·생성 범위·권한 확인 후, 이 라벨이 없을 때만
gh label create needs-tests --repo owner/repo --description '테스트 근거 보완 필요' --color D4C5F9
```

GitHub은 저장소 write 권한으로 생성, triage 권한으로 적용/해제를 허용한다. 기본 라벨도 나중에 삭제·변경할 수 있으므로 존재를 가정하지 않는다. [공식 라벨 문서](https://docs.github.com/en/issues/using-labels-and-milestones-to-track-work/managing-labels), [CLI label create](https://cli.github.com/manual/gh_label_create), [CLI label list](https://cli.github.com/manual/gh_label_list)를 참조한다.
