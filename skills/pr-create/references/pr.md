# PR 본문 상세

[pr-create](../../pr-create/SKILL.md)의 PR 준비 절차에 이어 본문과 자리별 작성 기준을 정리한다.

## 공통 규칙

제목은 [change-conventions](../../git-workflow/references/change-conventions.md), 본문은 [writing-conventions](../../git-workflow/references/writing-conventions.md), 라벨은 [labels](../../git-workflow/references/labels.md), 요약과 링크는 [document-links](../../git-workflow/references/document-links.md)를 적용한다.

## 본문과 필수 리뷰 인계

변경 PR은 실제 Issue·변경 내용·바뀐 곳·docs 인계와 검증 상태를 연결한다. 테스트를 실행하지 않았으면 미실행과 이유·필요한 증거를 명시한다.

본문 양식은 [PR 템플릿](../../template-init/assets/.github/PULL_REQUEST_TEMPLATE.md)이다. 필수 절은 `## Issue`, `## 변경 내용`, `## 바뀐 곳`, `## 계획과 검토 근거`, `## 검증 상태`, `## 위험과 전달`이다. 선택 절은 [쓸 내용이 있을 때만 만드는 자리](#쓸-내용이-있을-때만-만드는-자리)의 조건에 해당할 때만 남긴다.

## Issue 항목의 필수 검사

[Issue 연결 검사](../../git-workflow/references/issue-link.md)를 적용한다. 생성 전 실제 원격 Issue를 확인하고 생성 후 본문에 같은 참조가 있는지 다시 확인한다. 기존 템플릿의 Issue/관련 작업 항목은 유지하며 해당 항목이 없을 때만 `## Issue`를 추가한다. Closes만 적고 Issue 항목을 생략하지 않는다. 닫힌 Issue는 이번 PR과의 관계를 확인한다.

## 쓸 내용이 있을 때만 만드는 자리

| 절 | 만드는 조건 | 없으면 어떻게 읽히는가 |
| --- | --- | --- |
| `## 유심히 볼 곳` | 일부러 그렇게 둔 선택이나 임시로 남긴 것이 있을 때 | 특별히 볼 곳이 없다 |
| `## 확인` | 재실행할 상세 명령·환경·실행 결과를 본문에 제공할 필요가 있을 때 | 검증 상태와 근거 링크를 읽음; 미실행을 뜻하지 않음 |
| `## 화면` | 화면이 바뀔 때 | 화면이 바뀌지 않는다 |
| `## 머지 뒤 조치` | 환경변수·마이그레이션·배포 순서·되돌리기에 걸리는 것이 있을 때 | 추가 배포·운영 조치 없음 |

**「없음」으로 채우지 않고 절을 통째로 지운다.** 빈 절이 넷 붙어 있으면 읽는 사람이 본문 전체를 건너뛴다.

## 「바뀐 곳」 표

**파일 이름이 아니라 그 파일이 왜 바뀌었는지를 적는다.** 파일 목록 자체는 GitHub의 Files changed 탭이 이미 보여준다.

```markdown
| 파일·폴더 | 무엇이 |
| --- | --- |
| `src/chart/axis.ts` | 축 눈금 계산을 주 단위까지 다룸 |
| `src/chart/__tests__/` | 주 단위 눈금 케이스 추가 |
| `pnpm-lock.yaml` | 의존성 갱신 |
```

- **파일이 많으면 폴더로 묶는다.** 한 폴더 안에서 같은 이유로 바뀐 파일은 폴더 한 줄이다.
- **한 줄은 30자 이내로 쓴다.** 넘으면 그 설명은 「변경 내용」이나 「유심히 볼 곳」으로 갈 내용이다.
- **자동 생성 파일은 한 줄로 묶는다.** lock 파일, 빌드 산출물, 포맷만 바뀐 파일이 여기 해당한다.
- 표가 열 줄을 넘으면 파일 단위를 폴더 단위로 한 단계 올린다.

## 리뷰 인계 필수 내용

Issue의 변경 의도·영향 범위·달성 조건과 docs 계획/인계 문서를 연결한다. 검토 HEAD, 단위 테스트 유무, 사례별 기대/실제 결과, 명령·실행 커밋·환경·시각, 미실행·부족한 증거를 기록한다. 문서 전용 변경은 유닛 테스트 제외 이유와 대체 검사를 기록한다.

## 검증 상태와 확인 절

`## 검증 상태`는 항상 작성한다. 핵심 결과와 미실행·누락·제외 이유, handoff 링크를 요약한다.

`## 확인`은 리뷰어에게 상세 재현 명령과 환경을 본문에서 제공해야 할 때만 추가한다. 실제 실행한 명령과 결과를 적는다. 같은 결과를 두 절에 반복하지 않는다. handoff 링크로 충분하면 이 선택 절은 생략한다. 선택 절이 없다는 사실로 테스트 미실행을 판단하지 않는다.

## 「머지 뒤 조치」를 diff에서 찾는 방법

| 무엇을 찾는가 | 어디를 보는가 |
| --- | --- |
| 환경변수 | `.env.example` · `.env.sample` 변경, 코드에 새로 등장한 `process.env.*` · `os.environ[*]` |
| 마이그레이션 | `migrations/` · `alembic/` · `prisma/migrations/` 아래 새 파일 |
| 배포 순서 | 다른 저장소의 API 응답 형식에 맞춘 변경 — 두 저장소가 함께 나가야 한다 |
| 되돌리기 | 되돌릴 수 없는 변경(데이터 삭제, 형식 변환)이 있으면 그 변경을 적는다 |

위 경로를 실제로 확인했고 걸리는 것이 없으면 이 절을 만들지 않는다.

## 배포 PR 본문

통합 브랜치에서 배포 브랜치로 올리는 PR이다. 개별 변경 설명 대신 **이번에 무엇이 함께 나가는가**를 적는다.

```markdown
## 배포 목적

## 포함된 변경

<!-- git log --first-parent <이전 배포 지점>..<이번 지점> --pretty='- %s' 로 뽑는다 -->

### ✨ 기능
### 🐛 버그 수정
### ⚡ 성능

## 배포 시 유의사항

## 되돌리기
```

분류는 저장소의 릴리즈 방식과 [release-notes.md](../../git-release/references/release-notes.md)의 포함 기준을 따른다. 변경의 type만으로 배포 영향이 없다고 판정하지 않는다. 빈 분류는 지운다.

## 저장소에 이미 PR 템플릿 파일이 있을 때

`.github/PULL_REQUEST_TEMPLATE.md` 파일이나 `.github/PULL_REQUEST_TEMPLATE/` 폴더가 있으면 **그 파일의 절 이름을 그대로 쓴다.** 이 문서의 절 이름으로 바꾸지 않는다 — 같은 저장소의 PR들이 서로 다른 형태가 되면 나중에 읽을 때 어느 쪽이 기준인지 알 수 없다.

없는 절만 아래에 덧붙인다.

```bash
ls .github/PULL_REQUEST_TEMPLATE.md .github/PULL_REQUEST_TEMPLATE/ 2>/dev/null
```

`.github/PULL_REQUEST_TEMPLATE/` 폴더 안의 파일은 GitHub이 자동으로 채우지 않는다. 그 본문을 쓰려면 PR 생성 주소에 `template` 질의 문자열을 붙여야 한다.

```text
https://github.com/<owner>/<repo>/compare/<base>...<head>?expand=1&template=release.md
```

## PR을 여는 절차

1. 붙일 label을 확인한다 — 아래 「릴리즈 노트가 label로 만들어질 때」를 먼저 읽는다
2. Issue 항목의 실제 참조·연결 검사를 완료하고 의도·변경 결과·테스트 요약과 확인된 문서 링크를 포함한 본문 초안을 준비한다
3. 기존 생성 승인을 확인하고, 없으면 승인받는다
4. 파일로 저장해 `--body-file`로 넘긴다 — 본문에 백틱과 줄바꿈이 있어 `--body`로 넘기면 셸이 깨뜨린다

```bash
gh pr create --base dev --head feature/app-ranking-weekly-period \
  --title 'feat(app-ranking): 기간을 주 단위로 선택' \
  --label 'enhancement' \
  --assignee @me \
  --body-file /tmp/pr-body.md
```

**승인 없이 실행하지 않는다. 이미 승인된 범위는 다시 묻지 않는다.** [공통 실행 경계](../../git-workflow/references/execution-boundaries.md)의 원격 행동 승인 기준을 따른다.

## 릴리즈 노트가 label로 만들어질 때

release-drafter를 쓰면 실제 설정의 categories·version-resolver·기본값·autolabeler를 읽어 분류와 버전 영향을 확인한다. label이 없는 PR의 포함 여부와 기본 버전도 설정에 따라 다르므로 빠진다고 단정하지 않는다.

```bash
ls .github/*drafter*.yml 2>/dev/null   # 설정 파일이 있는지
gh label list                          # 그 저장소에 있는 label 이름
```

설정 파일의 `categories` 항목에 적힌 label 이름을 **그대로** 쓴다. 이모지와 띄어쓰기까지 같아야 한다.

커밋 type과 label을 잇는 표는 저장소마다 다르므로 만들어 두지 않는다. 설정 파일을 읽고 그때 고른다.

본문/링크/라벨은 원격 생성 이후 실제 PR과 대조한다. 생성 응답 불명은 PR 재조회로 중복을 피한다. 예시 base dev와 label enhancement는 대상 저장소에서 확인한 경우에만 사용한다.

## 실행 계정 assignee 확인

생성 시 `--assignee @me`로 실제 인증 계정을 지정한다. 기존 assignee는 제거하지 않는다.
생성 뒤 `gh pr view <PR> --json assignees`로 실제 login을 확인한다.
지정에 실패해도 이미 생성된 PR은 유지한다. 오류나 응답 불명 때는 먼저 생성 여부와 assignees를 조회하며, 삭제하거나 중복 생성하지 않는다. 생성이 확인되었고 지정이 승인 범위에 있으면 `gh pr edit <PR> --add-assignee @me`로 추가만 재시도한다. 재조회 뒤 실제 assignee login과 미적용 사유(권한·인증 오류 또는 미확인)를 보고한다.

## 작성 후 점검

[공통 편집 순서](../../git-workflow/references/writing-conventions.md#정보-단위와-작성-후-편집)를 적용한다. 첫 문장은 변경 후 동작, 검증 상태는 현재 HEAD의 결론과 미검증, 위험과 전달은 남은 조치에 답한다. 한 항목에 하나의 결과 또는 위험을 담고 실행 이력은 handoff로 연결한다. 기존 저장소 템플릿의 절 이름을 우선하며 필수 정보를 같은 뜻의 항목에 배치한다. 중요한 선택 이유·필수 검증·배포·롤백은 줄이기 위해 삭제하지 않는다.
