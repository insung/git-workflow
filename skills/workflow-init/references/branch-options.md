# 선택 가능한 브랜치 전략

아래는 제안 후보이며 프로젝트의 기존 승인 정책을 대체하지 않는다. 실제 브랜치 이름·머지 방식·배포 트리거는 조사와 사용자 결정으로 확정한다. `main`·`develop`·`prod` 이름이 같아도 운영 커밋은 다를 수 있다. 긴급 수정은 실제 운영 기준과 미출시 변경 포함 여부를 확인한 뒤 분기한다.

| 후보 | 일반 작업 흐름 | 긴급 수정·역반영 | 적용 조건 |
| --- | --- | --- | --- |
| 기존 관행 유지 | 조사한 base·이름·PR 대상 유지 | 확인한 운영 기준·첫 반영·역반영 경로 유지, 미확인만 질문 | 이미 쓰는 규칙이 유효하며 전환보다 명문화가 필요한 프로젝트 |
| GitHub Flow | 최신 main → 짧은 작업 브랜치 → main PR | 운영 기준이 main과 일치하면 main → 수정 브랜치 → main. 배포 버전이 다르면 배포 커밋에서 수정하는 예외와 main 반영 순서를 승인 후 기록 | 하나의 통합 브랜치, 작은 PR와 빈번한 배포. main 병합이 실제 배포인지 별도 확인 |
| Trunk 기반 | 최신 trunk(main) → 매우 짧은 작업 브랜치 → trunk, 보호 정책과 검사를 통한 빠른 통합 | 운영 trunk와 일치하면 trunk에 빠르게 수정·검증. 운영 release가 따로 있으면 trunk 수정 → 필요한 release에 검증된 수정 cherry-pick; 직접 release 수정 예외는 trunk 역반영 명시 | 빠른 자동 검사와 작은 변경, 미완성 기능 분리 수단(예: feature flag). trunk 직접 push를 기본 허가하지 않음 |
| Release Flow | main → 짧은 작업 브랜치 → main; 출시할 main 커밋에서 release/<버전> 분기 | 기본 main에서 수정·검증 → 영향받는 release에 필요한 커밋 cherry-pick. main의 미출시 변경 전체를 release에 머지하지 않음. release 선행 수정 예외라면 main 반영을 명시 | main 개발을 계속하면서 특정 버전의 출시·유지보수가 필요한 프로젝트 |
| Gitflow | develop → feature → develop; develop → release → main과 develop, main의 출시 커밋 태그 | 실제 운영 main/태그 → hotfix → main과 develop; 진행 중인 release에도 필요한 수정 반영 경로 확인 | 개발 통합·출시 준비·운영을 분리하고 계획된 버전 출시에 비용을 감수하는 프로젝트 |
| 기존 dev·feature·prod·hotfix | dev → feature/<scope>-<주제> → dev → prod | 실제 운영 prod/커밋 → hotfix/<scope>-<주제> → prod 반영·배포 → dev 역반영 | 개발과 운영 두 장기 브랜치를 사용하는 기존 dev/prod 흐름. 별도 release 브랜치가 있는 Gitflow와 구별 |

역반영은 자동 머지 권한이 아니다. PR 대상·머지 방식·충돌 처리·보호 정책은 프로젝트 문서와 별도 승인 범위를 따른다. 배포·태그 발행도 전략 기록과 별개다. 기존 dev/prod 후보의 세부 흐름은 아래 정의를 참고한다.

## 공식 자료와 해석 범위

- [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow): 작업 브랜치·PR 검토·기본 브랜치 통합 흐름. 특정 회사 전체의 운영 정책으로 일반화하지 않는다.
- [Microsoft의 Release Flow](https://learn.microsoft.com/en-us/devops/develop/how-microsoft-develops-devops): main의 짧은 작업 브랜치와 release 유지, main에서 수정 후 release에 필요한 변경을 가져오는 방식의 공개 사례.
- [AWS의 브랜치 전략 선택](https://docs.aws.amazon.com/prescriptive-guidance/latest/choosing-git-branch-approach/git-branching-strategies.html): Trunk·GitHub Flow·Gitflow 비교와 선택 안내. AWS 전체 내부 정책을 증명하지 않는다.
- [OpenAI Agents SDK 기여 규칙](https://github.com/openai/openai-agents-python/blob/main/CONTRIBUTING.md): AGENTS.md 읽기를 요구하는 공개 저장소 사례. OpenAI 회사 내부의 통일된 브랜치 전략은 확인되지 않았다.
- [React 공식 legacy 기여 가이드](https://legacy.reactjs.org/docs/how-to-contribute.html): main 중심 기여 흐름의 공개 사례. 업데이트 중단된 legacy 문서이며 Meta 전체 내부 정책으로 일반화하지 않는다.
- [Codex의 AGENTS.md 지침 탐색](https://developers.openai.com/codex/guides/agents-md): AI 진입 지침의 예. README·BRANCH-STRATEGY.md 자체의 자동 로드를 보장하지 않는다.

선택 시 최신 공식 자료를 확인하고 문서 사례와 회사 전체 정책을 구별한다. 위 hotfix 경로 중 자료가 규정하지 않은 운영 예외는 프로젝트에서 승인받을 설계 후보다.

## 기존 dev/prod 후보 상세

이 후보를 명시적으로 선택할 때만 적용한다. 실제 기존 브랜치 이름을 자동 변경하지 않는다.

| 브랜치 | 역할·흐름 |
| --- | --- |
| dev | 개발·통합 기준; feature의 분기·PR 대상 |
| feature/<scope>-<주제> | dev에서 분기하고 dev를 대상으로 변경 PR 준비 |
| prod | 운영 배포 기준; 승인된 dev의 배포 대상 변경을 반영 |
| hotfix/<scope>-<주제> | 실제 운영 prod/커밋에서 분기; prod 반영·배포 후 dev에 역반영 |

일반 변경은 `dev → feature/… → dev → prod`, 긴급 수정은 `prod → hotfix/… → prod → dev 역반영` 흐름이다. prod의 현재 커밋이 실제 운영 버전과 일치하는지, 미출시 변경을 함께 배포하지 않는지 확인한다. 실제 배포 트리거·커밋·태그·롤백은 프로젝트 승인안에서 확정한다. 머지 방식과 보호 규칙은 자동 선택하지 않는다.
