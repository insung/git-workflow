# 버전 갱신과 설치

- AC-01: manifest 3곳의 version을 0.5.0으로 변경.
- AC-02: CHANGELOG.md에 새 승인 정책과 보존 조건 기록.
- AC-03: node --test tests/*.test.mjs, node scripts/check-package.mjs, git diff --check. skills/ diff가 없어야 함.
- AC-04: Claude와 Codex의 설치 목록에서 installed/enabled/0.5.0 확인. 캐시의 pr-merge와 issue-close 및 두 참조 파일을 설치 원본과 비교.

설치는 검증된 로컬 후보로 수행하며 원격 main의 머지와 구분한다.

## 실행 결과 요약

세 manifest0.5.0·CHANGELOG와 설치 인계를 준비한 기록. 검증은 현재 세션 명령·파일 대조이며 별도 독립 리뷰 미실행. 당시 발행·설치 상태는 task 기록 시점과 원격 Release/Issue 상태를 구별.

당시 명령은 저장소 루트의 `node --test tests/package.test.mjs`, `node scripts/check-package.mjs`, `git diff --check`를 중심으로 실행했다. 추가 명령·대상 작업본·실행 시각은 plan의 정리 전 기록에서 확인한다. 현재 HEAD의 재검증 결과로 사용하지 않는다.
