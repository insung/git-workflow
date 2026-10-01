# 공통 변경 표기 규칙

Issue·PR·커밋 제목을 작성하거나 검토할 때 읽는다. 릴리즈 분류에서는 type을 후보 색인으로만 사용한다. 저장소의 명시적 규칙과 기존 scope가 우선이다.

## 제목

```text
<type>(<scope>): <한국어 요약>
```

scope는 생략하지 않고 소문자 kebab-case로 쓴다. 요약은 결과가 드러나는 한국어 명사형, 약 50자 이내, 마침표 없이 쓴다. 제목·커밋 본문·PR에 개인 이름을 쓰지 않고 역할이나 사건으로 표현한다. 원문 증상의 인용은 [공통 문체](writing-conventions.md)를 따른다.

| type | 뜻 | 릴리즈 노트 후보 | 버전 영향 후보 |
| --- | --- | --- | --- |
| feat | 기능 | 기능 | minor |
| fix | 버그 수정 | 버그 수정 | patch |
| perf | 성능 | 성능 | patch |
| refactor | 동작 변화 없는 구조 개선 | 보통 제외 | 없음 |
| docs | 문서 | 보통 제외 | 없음 |
| test | 테스트 | 보통 제외 | 없음 |
| build | 빌드·의존성 | 보통 제외 | 없음 |
| ci | 파이프라인 | 보통 제외 | 없음 |
| chore | 유지보수 | 보통 제외 | 없음 |
| style | 포맷 | 보통 제외 | 없음 |

type만으로 릴리즈 포함·버전을 확정하지 않는다. 다른 type이어도 설치·운영·호환성을 바꾸면 노트 대상이다. `!`나 `BREAKING CHANGE:`는 자동으로 붙이지 않고 실제 소비자 전환 필요성과 저장소 표기 규칙을 확인한다. [라벨](labels.md)은 별도 분류이며 제목의 type과 동일하지 않다.

## scope 선정

1. `git log --pretty=%s -30`과 기존 Issue/PR 제목을 확인한다.
2. 같은 주제는 기존 scope를 재사용한다. `auth`/`authentication` 같은 동의어를 늘리지 않는다.
3. 새 주제는 사용자가 구별하는 기능·업무 단위로 정한다. `backend`, `frontend`, `common`, `document`, `data` 같은 넓은 레이어/범주를 피한다.
4. 하나의 scope를 고를 수 없으면 커밋 범위를 나눈다. Issue/PR은 변경 전체, 개별 커밋은 각 작업의 성격을 나타낸다.

예를 들어 `feat(search)` Issue/PR 안에 `feat(search)`와 `test(search)` 커밋이 함께 있어도 된다. AI 작업 시스템은 `skill-discovery`, 제품은 `app-ranking`, 문서는 `operations`처럼 주제를 드러낸다. 실제 필요가 생기기 전 scope-enum을 도입하지 않는다.

## 요약의 판단 예

| 피할 표기 | 결과를 드러내는 표기 |
| --- | --- |
| feat(backend): 순위 수집 추가 | feat(app-ranking): Roblox 게임 순위를 수집 대상에 포함 |
| fix: 404 반환하도록 수정 | fix(app-ranking): 앱 ID 누락 시 500 대신 404 응답 |
| fix(navigation): 선택 유지되도록 수정 | fix(navigation): 화면 이동 후에도 선택한 앱 유지 |
| docs(document): 자료 11곳 정리 | docs(document-hub): 원천 자료와 설명 문서 연결 |

type이 이미 뜻하는 추가·수정으로 끝내지 않는다. 단, `feat(dashboard): 위젯을 드래그해 순서 변경`처럼 사용자의 기능 자체를 설명하는 동사는 허용한다. 개수보다 무엇이 달라졌는지 적는다. 커밋 본문·푸터는 [commit-message.md](../../commit-rule/references/commit-message.md)를 따른다.
