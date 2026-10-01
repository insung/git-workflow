# 05 예제와 README

계획: [plan의 단계 표](plan.md#단계)

## 변경 대상

| 구분 | 경로 | 이유 |
| --- | --- | --- |
| Create | `docs/examples/python-version-upgrade/review-criteria.md` | 검토 기준 예제 |
| Create | `docs/examples/python-version-upgrade/review-input-<topic>.md` | 검증 입력 예제. topic은 예제 plan의 사례에서 정함 |
| Modify | `docs/examples/python-version-upgrade/README.md`, `plan.md`, `review.md` | 새 예제 파일의 링크와 흐름도의 검토 기준 단계 |
| Modify | `README.md`, `README.ko.md` | 작업 문서 목록에 검토 기준·검증 입력 추가. 두 파일의 절 구성 유지 |

## 작업

| # | 작업 | 완료 | 처리 내용 |
| --- | --- | --- | --- |
| 1 | 예제 plan의 AC와 사례로 `review-criteria.md` 작성. 02 단계 양식을 따름 | [x] | review-criteria.md 예제 작성 (ea2b0b0) |
| 2 | `review-input-<topic>.md` 예제 작성. 「입력」과 「기대 지적」을 분리 | [x] | review-input-runtime-compat.md 예제 작성 (ea2b0b0) |
| 3 | 예제 README·plan·review에 링크 추가, D2 보관 위치를 예제에 반영 | [x] | 예제 README·plan·review 링크와 보관 위치 반영, pr.md·resume 예제 보정 (ea2b0b0) |
| 4 | README 영어·한국어 갱신 | [x] | README 영어·한국어 갱신 (482d6a1) |
| 5 | 검증 실행, 커밋 | [x] | 검증 실행, 커밋 (ea2b0b0, 482d6a1) |

## 검증

| 사례 | AC | 명령·작업 디렉토리 | 기대 결과 | 결과 |
| --- | --- | --- | --- | --- |
| <a id="tc-09"></a>TC-09 | AC-10 | `ls docs/examples/python-version-upgrade`, `grep -n "review-criteria\|review-input" docs/examples/python-version-upgrade/README.md docs/examples/python-version-upgrade/plan.md`, `grep '^## ' README.md README.ko.md`, `node scripts/check-package.mjs`, 리포 루트 | 예제 파일 2개 존재, README·plan에서 링크, 두 README 절 수 같음, 깨진 링크 0 | 통과 (ea2b0b0, 482d6a1) |

## 제외 범위

- python-version-upgrade 외 예제
- 스킬 지시 변경 (01~04 단계)
