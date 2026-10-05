# 버전 갱신과 설치

- AC-01: manifest 3곳의 version을 0.5.0으로 변경.
- AC-02: CHANGELOG.md에 새 승인 정책과 보존 조건 기록.
- AC-03: node --test tests/*.test.mjs, node scripts/check-package.mjs, git diff --check. skills/ diff가 없어야 함.
- AC-04: Claude와 Codex의 설치 목록에서 installed/enabled/0.5.0 확인. 캐시의 pr-merge와 issue-close 및 두 참조 파일을 설치 원본과 비교.

설치는 검증된 로컬 후보로 수행하며 원격 main의 머지와 구분한다.
