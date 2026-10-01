# 05 plan·todo 양식 개선

계획: [plan의 단계 표](plan.md#단계)

## 변경 대상

| 구분 | 경로 | 이유 |
| --- | --- | --- |
| Modify | `skills/plan-create/SKILL.md` | 조건 문장을 링크와 번호 단계로 단순화 |
| Modify | `skills/plan-create/references/plan.md` | 디렉토리·프론트메터 규칙, 표 중심 템플릿 |
| Modify | `skills/plan-create/references/todos.md` | 변경 대상·작업·검증 표, 처리 내용 기록 칸 |
| Modify | `docs/examples/python-version-upgrade/plan.md`, `docs/examples/python-version-upgrade/0*-todos-*.md` | 새 양식 예제, 파일 이름 변경 |
| Modify | 옛 앵커 `#경로와-준비-조건`을 쓰던 문서 | `#디렉토리-규칙`으로 변경 |

## 작업

| # | 작업 | 완료 | 처리 내용 |
| --- | --- | --- | --- |
| 1 | plan 양식 재작성: 디렉토리·로컬 파일럿 규칙 번호화, 템플릿 우선, 프론트메터 필드 표, 단계·달성 조건의 todo·TC 링크, 변경 대상을 todo로 이동 | [x] | 코멘트 반영. 프론트메터에서 기준 커밋 제거, `base`·`created` 추가 |
| 2 | todo 양식 재작성: 변경 대상·작업·검증 표, `처리 내용`·`결과` 칸, TC 앵커 | [x] | 작업은 3~7개 단위로 규칙화 |
| 3 | plan-create SKILL.md 단순화와 옛 앵커 링크 변경 | [x] | 링크 11개 파일 변경 |
| 4 | 예제와 이 계획·todo에 새 양식 적용 | [x] | 예제 todo 파일 이름 변경 |
| 5 | 달성 조건·AC ID를 Issue에만 두도록 plan 양식·Issue 템플릿·issue.md 규칙 변경 | [x] | plan 달성 조건 표와 단계 표 AC 열 제거 |

## 검증

| 사례 | AC | 명령·작업 디렉토리 | 기대 결과 | 결과 |
| --- | --- | --- | --- | --- |
| <a id="tc-11"></a>TC-11 | AC-14 | plan·todo 양식과 예제·이 계획의 절 구성 대조, `ls docs/examples/python-version-upgrade`, `grep -rn "경로와-준비-조건\|메타데이터와-상태" skills docs/examples README.md README.ko.md`, 리포 루트 | 절 일치, 새 todo 파일 이름만 존재, 옛 앵커 0 | 통과 (3c80538) |

## 제외 범위

- issue·PR·handoff·review 양식 변경 (01·02 단계)
