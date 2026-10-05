# task-01-writing-rules.md

계획: [plan](plan.md)

## 작업

| # | 작업 | 완료 | 처리 내용 |
| --- | --- | --- | --- |
| 1 | 공통 편집·문장 기준 | [x] | Issue·릴리즈 문장형 허용, 결과·승인·보존·한계 편집; 미커밋 digest·handoff |
| 2 | 릴리즈·Issue 작성 순서 | [x] | 필수 편집 참조·제목·type 후보·전환·필드 구별·예시; 미커밋 digest |
| 3 | 템플릿·예시 반영 | [x] | 2개 Issue 주석만 변경·기능/버그/릴리즈 예시; main .github 미변경 |

## 검증

| 사례 | AC | 방법 | 결과 |
| --- | --- | --- | --- |
| TC-01 | AC-01·02·03·07 | 릴리즈 작성 변경 전후 3회 | RED e79013a 제목 0/3·의미 3/3, GREEN 동일 HEAD+소스 digest 제목·의미 3/3; handoff |
| TC-02 | AC-06·07 | 기능·버그 Issue 작성 변경 전후 3회 | RED e79013a 의미·필드 3/3, GREEN 소스 digest 의미·필드 3/3·문장형 허용 확인; handoff |

## 제외 범위

- 공개 Release와 태그 변경
