# 커밋 메시지 상세

제목은 [공통 변경 표기](../../git-workflow/references/change-conventions.md), 본문은 [공통 문체](../../git-workflow/references/writing-conventions.md)를 적용한다. 여기서는 커밋 본문·푸터만 정의한다.

## 전체 구조

```text
<type>(<scope>): <요약>
                              ← 빈 줄 1개 (본문이 있을 때 반드시 필요)
<본문>

<푸터>
```

## 본문

본문은 변경 목록보다 **무엇을 이루려는지와 왜 이 방식을 골랐는지**를 설명한다. 변경 자체는 diff에서 볼 수 있지만, 배경과 판단 이유는 코드에 기록되지 않을 수 있다.

### 본문을 쓰는 경우

다음 중 하나에 해당하면 본문을 반드시 쓴다.

- 저장소의 구조나 규칙(디렉토리 구성, 브랜치·커밋·기여 규칙, 설정 기본값)을 정하거나 바꾼다.
- 파일·기능의 제외·이동·삭제가 있고, 그 이유가 diff만으로 드러나지 않는다.
- 배경과 달성하려는 의도가 제목과 diff만으로 전달되지 않는다.

해당하지 않는 사소한 수정에는 제목이나 diff를 반복하는 본문을 쓰지 않는다.

### 본문 첫 문단

관련 Issue가 있으면 첫 문단에 다음을 쓴다.

- 이 변경이 Issue 목표의 어느 부분을 이루는지
- 머지되면 무엇이 끝나고 무엇이 남는지

Issue 제목이나 변경 목록을 다시 쓰지 않는다. 누가 무엇을 바로 할 수 있게 되는지로 쓰면 목표와의 관계가 드러난다. Issue가 없으면 이 변경으로 이루려는 결과를 쓴다.

### 결정과 이유

첫 문단 뒤에 이 변경에 담긴 결정을 `-` 목록으로 쓰고, 항목마다 이유를 붙인다.

- 이유는 사용자가 대화·Issue·PR에서 밝힌 것이나 사용자가 승인한 제안만 쓴다.
- 이유를 확인할 수 없으면 결정만 쓴다. diff나 일반 관행에서 이유를 추측해 쓰지 않는다.
- 사실·결정·가정·미확인의 구별은 [공통 문체](../../git-workflow/references/writing-conventions.md)를 따른다.

### 줄과 목록

- 한 줄 72자 근처에서 줄바꿈한다.
- 여러 항목은 `-` 목록으로 쓴다.
- 필요한 경우 배경과 문제, 감수한 트레이드오프, 영향 범위를 더한다.

### 예

변경 목록만 적은 본문은 이 변경이 Issue 목표에서 무엇을 했는지, 왜 그렇게 정했는지 알 수 없다.

```text
docs(document-hub): 문서 디렉토리 구조와 기여·브랜치·커밋 규칙 안내

- README에 디렉토리 구조와 기여 규칙 추가
- CONTRIBUTING에 브랜치·커밋 규칙 추가

Refs: #1
```

첫 문단에 목표와의 관계를, 목록에 결정과 이유를 쓴다.

```text
docs(document-hub): 문서 디렉토리 구조와 기여·브랜치·커밋 규칙 안내

처음 기여하는 사람이 문서를 둘 위치와 브랜치·커밋 방법을 바로 알 수
있도록, 저장소 초기화(#1) 중 구조와 기여 규칙 부분을 마련한다.
머지되면 디렉토리 구조와 기여 규칙이 정해지고, 기존 문서 이전은 남는다.

- 문서를 주제별 최상위 디렉토리로 구분: 찾는 위치를 하나로 정하기 위함
- 원본 데이터 파일을 저장소에서 제외: 용량이 커서 별도 저장소에서 관리
- main 직접 push 금지와 PR 머지만 허용: 변경 이력을 PR로 추적하기 위함

Refs: #1
```

이 예의 이유는 모두 사용자가 밝히거나 승인한 것이라고 가정한다. 이유를 확인하지 못한 결정은 `- 원본 데이터 파일을 저장소에서 제외`처럼 결정만 쓴다.

Issue가 없는 버그 수정은 첫 문단에 문제와 이루려는 결과를 쓴다.

```text
fix(app-usage): 일별 집계 재실행 시 중복 적재 차단

기존 INSERT 방식은 배치를 재실행하면 같은 날짜 데이터가 중복 적재되어
사용량 지표가 실제보다 높은 값으로 표시됐다.
재실행해도 같은 날짜의 지표가 변하지 않도록 한다.

- (date, app_id) 유니크 키 기준 upsert로 변경
- 이미 적재된 중복 행은 마이그레이션에서 정리
- 재실행이 잦은 크롤링 배치 전반에 같은 방식을 적용할 예정
```

## 푸터

### Issue 출처: Refs

Issue 기반 작업의 새 커밋에는 실제 관련 Issue를 `Refs:` 트레일러로 기록한다. Issue의 요청·의도·합의로 가는 출처이며 PR 본문의 [실제 Issue 연결 검사](../../git-workflow/references/issue-link.md)를 대신하지 않는다. Issue 없는 작업에는 Refs를 요구하지 않는다.

1. 참조 표기(같은 저장소 `#번호`, 다른 저장소 `owner/repository#번호` 또는 실제 Issue URL)와 실제 Issue인지의 확인은 [필수 확인](../../git-workflow/references/issue-link.md#필수-확인)을 따른다. 커밋에서는 `#번호`를 커밋을 푸시할 host·저장소 기준으로 해석하며 임의의 checkout이나 fork 저장소 기준으로 해석하지 않는다.
2. 해당 Issue의 의도·범위와 이번 변경의 관련성을 확인하고, 닫힌 Issue는 현재 작업과의 관계를 확인한다.
3. Issue 기반 작업에서 번호 누락·접근 실패·잘못된 대상·범위 불일치가 있으면 참조 확정과 커밋 실행을 보류하고 필요한 확인을 보고한다. [local-draft](../../git-workflow/references/execution-boundaries.md#결과-상태)(원격 Issue를 만들거나 조회할 수 없을 때의 로컬 초안)나 예시 번호를 실제 참조로 만들지 않는다.
4. 단순 출처 기록에는 `Refs:`를 쓴다. 초안에 `Fixes`, `Closes`, `Resolves` 등 자동 종료 키워드가 포함됐으면 출처 참조로 고친다. 커밋 작성 승인으로 Issue 종료를 추정하지 않는다. PR의 기본 연결과 자동 종료 예외는 [참조와 종료](../../git-workflow/references/issue-link.md#참조와-종료)를 따른다.

다음은 이 저장소의 실제 [Issue #41](https://github.com/insung/git-workflow/issues/41)을 사용한 표기 예다. 다른 작업에 번호를 복사하지 않고 그 작업의 실제 Issue를 확인한다.

| 커밋을 푸시할 저장소 | 참조 표기 |
| --- | --- |
| insung/git-workflow | `Refs: #41` |
| 다른 저장소 | `Refs: insung/git-workflow#41` 또는 `Refs: https://github.com/insung/git-workflow/issues/41` |

```text
feat(commit-rule): Refs 푸터로 사용자 요청 추적 경로 명시

Refs: #41
Co-authored-by: Codex <noreply@openai.com>
```

여러 Issue가 실제 관련되어 있으면 각 Refs 줄로 기록한다. 본문과 빈 줄로 구분하고 Co-authored-by와 함께 마지막 푸터 블록에 작성한다. 푸터만 있으면 제목 뒤 빈 줄로 구분한다. 작성한 메시지와 실제 생성한 커밋 메시지를 대조한다. [커밋에서 읽는 순서](../../git-workflow/references/document-links.md#커밋에서-출발하는-읽기-순서)를 따른다.

Refs는 탐색 경로를 명시하는 규칙이다. 실제 탐색 시간·이해도 개선의 측정 결과는 없다. 참조 표기와 자동 종료 동작은 [GitHub 공식 연결 문서](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/linking-a-pull-request-to-an-issue)를 참조한다.

### AI 기여: Co-authored-by

AI가 작성한 커밋에는 실제 도구를 GitHub 표준 `Co-authored-by:` 트레일러로 기록한다. GitHub은 이 트레일러로 커밋의 공동 작성자를 표시한다. 본문과 빈 줄로 구분해 끝에 적는다.

| 도구 | 트레일러 |
| --- | --- |
| Claude | `Co-authored-by: Claude <noreply@anthropic.com>` |
| Codex | `Co-authored-by: Codex <noreply@openai.com>` |

```text
Co-authored-by: Claude <noreply@anthropic.com>
```

두 도구가 실제 기여한 경우 각 줄로 기록한다. 사용하지 않은 도구를 기록하거나 사람의 Git author 설정을 바꾸지 않는다. 사람만 작성한 커밋에는 `Co-authored-by:` 트레일러를 기록하지 않는다. 표의 주소만 쓰고 다른 주소를 만들지 않는다. GitHub이 공동 작성자로 인정하려면 주소가 GitHub 계정에 연결되어 있어야 한다.

BREAKING CHANGE 표기는 실제 호환성 영향과 저장소 규칙을 확인한 경우만 사용한다.
