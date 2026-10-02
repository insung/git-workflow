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
