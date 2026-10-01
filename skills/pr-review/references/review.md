# PR 검토 결과 계약

검토 대상 identity를 먼저 고정하고 review.md를 작성한다. 읽기 전용 검토 요청이면 대화로 결과를 반환한다. 실제 문서 기록·GitHub 게시를 자동으로 시작하지 않는다. 사례별 결과와 policy 원문은 복제하지 않고 근거 링크로 연결한다.

```markdown
# PR 검토 결과

- Issue / PR / plan / 관련 todos:
- base / 검토 HEAD / commit 범위 / dirty identity / 확인 시각:
- 테스트 실행 identity와 검토 identity의 관계:
- spec-it version·manifest/lock·규칙 원문 위치·접근 상태:
- 검토 범위·접근 불가·미변경 소비자:
- 결과: <pass / warn / fail / human-review; 정책 미채택은 shadow assessment>

## 사용자 의도와 계획 충족

| AC/Todo | 원래 의도/선택 배경 | 실제 commit·구현 위치 | 사례/증거 | 판단·누락·계획 이탈 |
| --- | --- | --- | --- | --- |

## 정책 지적

| Rule ID | 적용 계기·위치·관찰 | 사용자/프로젝트 영향 | 상태 | 필요한 결정·증거·수정 |
| --- | --- | --- | --- | --- |

## 테스트와 배포 계획

- 의미 있는 assertion·정상/실패/경계/유지 사례:
- 기대/실제·명령/cwd·revision/환경/시각·최종 검증:
- 배포/롤백 계획의 조건·확인된 상태·미확인:

## 규칙 외 의견

<!-- advisory를 pinned 정책 위반과 구분 -->

## 다음 행동

- 수정할 todo·필요한 사람 결정·재검증 범위:
- 현재 결과가 적용되는 HEAD와 새 변경 시 재검토 조건:
- 머지 승인 상태: <리뷰 pass가 승인이 아님>
```

예: H0의 unit pass와 H1의 코드 변경이 있으면 H0 결과는 이력으로 유지한다. H1에 영향을 받는 사례 재검증이 없으면 human-review로 남긴다. todo completed 표시로 H1 pass를 만들지 않는다.
