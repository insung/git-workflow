# 02 라벨 도구와 검증

계획: [단계 표](plan.md#단계)

## 변경 대상

| 구분 | 경로 | 이유 |
| --- | --- | --- |
| Create | skills/workflow-init/scripts/sync-labels.py | 원격 라벨 차이 확인·누락 생성 |
| Create | tests/label-sync.test.py | fake gh 기반 의미 있는 회귀 |

## 작업

| # | 작업 | 완료 | 처리 내용 |
| --- | --- | --- | --- |
| 1 | 기본 미리보기와 명시적 적용 옵션 구현 | [x] | 미커밋 구현. 자체 회귀와 [실행 요약](task-02-label-sync.md#실행-결과-요약) 기록 |
| 2 | 입력 검증·조회 실패·누락 생성·기존 보존·재조회 처리 구현 | [x] | 미커밋 구현. 자체 회귀와 [실행 요약](task-02-label-sync.md#실행-결과-요약) 기록 |
| 3 | fake gh로 실제 도구 회귀·기존 패키지 검사 실행 | [x] | 미커밋 구현. 자체 회귀와 [실행 요약](task-02-label-sync.md#실행-결과-요약) 기록 |
| 4 | handoff에 변경 식별·검증·한계 기록 | [x] | 미커밋 구현. 자체 회귀와 [실행 요약](task-02-label-sync.md#실행-결과-요약) 기록 |

## 검증

| 사례 | AC | 명령·작업 디렉토리 | 기대 결과 | 결과 |
| --- | --- | --- | --- | --- |
| <a id="tc-02"></a>TC-02 | AC-04·07 | python3 tests/label-sync.test.py, 리포 루트 | 기본 무변경, 누락만 생성, 기존 보존, 오류·응답 불명 처리 | 통과 10/10; HEAD 4d356cf + 미커밋 소스 |
| TC-03 | AC-06·07 | node --test tests/package.test.mjs; node scripts/check-package.mjs | 회귀·구조·상대 링크 통과 | 통과 34/34·패키지 유효; HEAD 4d356cf + 미커밋 소스 |

## 제외 범위

- 실제 GitHub 라벨 변경·전체 교체·삭제·강제 갱신

## 실행 결과 요약

구현315576b에서 패키지34/34·라벨10/10·구조·공백 검사 통과. 조정자의 독립 fake-gh11/11·응답 사례는 별도 근거. 평가72/100(C), 비용·복잡도 경고 유지. fake backend·가상 응답은 실제 설치/원격 라벨/호스트 자동 호출 증거가 아님.

당시 명령은 저장소 루트의 `node --test tests/package.test.mjs`, `node scripts/check-package.mjs`, `git diff --check`를 중심으로 실행했다. 추가 명령·대상 작업본·실행 시각은 plan의 정리 전 기록에서 확인한다. 현재 HEAD의 재검증 결과로 사용하지 않는다.
