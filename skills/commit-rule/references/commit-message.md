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

본문은 선택이다. 배경과 달성하려는 의도가 제목과 diff만으로 충분히 전달되지 않을 때 쓴다. 사소한 수정에는 제목이나 diff를 반복하는 본문을 붙이지 않는다.

쓸 때는 변경 목록보다 **무엇을 이루려는지와 왜 이 방식을 골랐는지**를 설명한다. 변경 자체는 diff에서 볼 수 있지만, 배경과 판단 이유는 코드에 남지 않을 수 있다.

- 한 줄 72자 근처에서 줄바꿈한다.
- 여러 항목은 `-` 목록으로 쓴다.
- 필요한 경우 배경과 문제, 달성하려는 의도, 선택한 이유, 감수한 트레이드오프, 영향 범위를 담는다.

```text
fix(app-usage): 일별 집계 재실행 시 중복 적재 차단

기존 INSERT 방식은 배치를 재실행하면 같은 날짜 데이터가 중복 적재되어
사용량 지표가 실제보다 크게 표시됐다.
재실행해도 같은 날짜의 지표가 변하지 않도록 한다.

- (date, app_id) 유니크 키 기준 upsert로 변경
- 이미 쌓인 중복 행은 마이그레이션에서 정리
- 재실행이 잦은 크롤링 배치 전반에 같은 방식을 적용할 예정
```

## 푸터

### Issue 출처: Refs

Issue 기반 작업의 새 커밋에는 실제 관련 Issue를 `Refs:` 트레일러로 기록한다. Issue의 요청·의도·합의로 가는 출처이며 PR 본문의 [실제 Issue 연결 검사](../../git-workflow/references/issue-link.md)를 대신하지 않는다. Issue 없는 작업에는 Refs를 요구하지 않는다.

1. 커밋을 게시할 host·저장소와 관련 Issue를 확인한다. 같은 저장소는 `#번호`, 다른 저장소는 `owner/repository#번호` 또는 실제 Issue URL을 쓴다. 다른 host는 전체 URL로 구별한다. `#번호`를 임의의 checkout이나 fork 저장소 기준으로 해석하지 않는다.
2. 참조 대상이 실제 Issue인지 조회한다. Issues API 응답에 `pull_request` 키가 있으면 PR이므로 Issue로 기록하지 않는다. 해당 Issue의 의도·범위와 이번 변경의 관련성을 확인하고, 닫힌 Issue는 현재 작업과의 관계를 확인한다.
3. Issue 기반 작업에서 번호 누락·접근 실패·잘못된 대상·범위 불일치가 있으면 참조 확정과 커밋 실행을 보류하고 필요한 확인을 보고한다. 조회 실패를 부재로 해석하지 않는다. local-draft나 예시 번호를 실제 참조로 만들지 않는다.
4. 단순 출처 기록에는 `Refs:`를 쓴다. 초안에 `Fixes`, `Closes`, `Resolves` 등 자동 종료 키워드가 섞였으면 출처 참조로 고친다. 커밋 작성 승인으로 Issue 종료를 추정하지 않는다. PR의 종료 키워드는 기존 해결 범위·완료·승인 기준을 따른다.

다음은 이 저장소의 실제 [Issue #41](https://github.com/insung/git-workflow/issues/41)을 사용한 표기 예다. 다른 작업에 번호를 복사하지 않고 그 작업의 실제 Issue를 확인한다.

| 커밋을 게시할 저장소 | 참조 표기 |
| --- | --- |
| insung/git-workflow | `Refs: #41` |
| 다른 저장소 | `Refs: insung/git-workflow#41` 또는 `Refs: https://github.com/insung/git-workflow/issues/41` |

```text
feat(commit-rule): Refs 푸터로 사용자 요청 추적 경로 명시

Refs: #41
Co-authored-by: Codex <noreply@openai.com>
```

여러 Issue가 실제 관련되어 있으면 각 Refs 줄로 기록한다. 본문과 빈 줄로 구분하고 Co-authored-by와 함께 마지막 푸터 블록에 둔다. 푸터만 있으면 제목 뒤 빈 줄로 구분한다. 작성한 메시지와 실제 생성한 커밋 메시지를 대조한다. [커밋에서 읽는 순서](../../git-workflow/references/document-links.md#커밋에서-출발하는-읽기-순서)를 따른다.

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

두 도구가 실제 기여한 경우 각 줄로 기록한다. 사용하지 않은 도구를 넣거나 사람의 Git author 설정을 바꾸지 않는다. 사람만 작성한 커밋에는 넣지 않는다. 표의 주소만 쓰고 다른 주소를 만들지 않는다. GitHub이 공동 작성자로 인정하려면 주소가 GitHub 계정에 연결되어 있어야 한다.

BREAKING CHANGE 표기는 실제 호환성 영향과 저장소 규칙을 확인한 경우만 사용한다.
