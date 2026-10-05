---
issue: "#31"
status: in-progress
branch: "codex/release-0.7.0"
base: "main"
created: "2026-10-05"
---
# 0.7.0 발행 계획

## 요청과 공통 맥락

사용자 요청: 0.7.0 버전 갱신·릴리즈 발행·Claude Code와 Codex 재설치. Issue #31이 정본이며 닫힌 Issue #29는 배경이다. 공개 v0.6.0=e79013a 이후 PR #30=f0ce36a를 새 버전으로 구분한다. 과거 Release·태그와 미추적 설정 보존. 남은 결정 없음. 구현자는 이 plan→task→기존 PR30 근거를 읽고 review/issue-31 및 검토 기준·입력은 읽지 않는다.

## 단계

| 단계 | 목표 | 검증 | 완료 |
| --- | --- | --- | --- |
| [01](task-01-release-package.md) | 세 manifest·CHANGELOG·발행 노트 | TC-01·02 | [x] |
| 02 | 검토·버전 PR 머지·태그·Release·두 호스트 설치 | TC-03·04 | [ ] |

## 최종 검증

| TC | AC | 검증 | 기대 |
| --- | --- | --- | --- |
| TC-01 | AC-01 | JSON 버전 동일성·node scripts/check-package.mjs·node --test tests/package.test.mjs·diff check | 0.7.0·구조·35/35·공백 통과 |
| TC-02 | AC-02 | v0.6.0..target와 PR30·원문 사실 대조 | 결과·전환·한계 보존, 범위 밖 제외 |
| TC-03 | AC-03 | 원격 tag dereference·Release 조회 | 검증된 merge commit·공개 v0.7.0 일치 |
| TC-04 | AC-04 | 호스트 list·cache byte 비교 | 양쪽 installed/enabled 0.7.0·전체스킬+3manifest 일치 |

## 결정과 변경 기록

- 사용자 지정 버전 0.7.0과 발행·설치 승인 적용
- 발행 대상은 버전 PR을 main에 merge한 commit, 태그 v0.7.0, 제목 v0.7.0 — 릴리즈·Issue·PR 작성 기준 통일
- 세션 내 선언·AGENTS.md·템플릿 실제 설치·과거 Release 개정 제외

## 현재 결과

단계01 로컬 구현·자기 검증 완료. TC-01 구조·35/35·diff 검사와 스킬45파일 바이트 보존 통과. TC-02 공개 v0.6.0 이후 PR30 결과·전환·한계 대조 완료. 미커밋 패키지는 [digest](evidence/package-source-sha256.txt), 실행 상세는 [handoff](handoff.md) 참조. TC-03·04 발행·설치 전 대기이며 독립 검토는 미판정.

## 전달과 롤백

머지→annotated tag push→GitHub Release→두 호스트 install→재조회. 기존 0.6.0 캐시는 보존. 새 세션에서 규칙 로딩, 실제 모델 자동 호출 검증은 별도. 발행된 태그/Release를 임의 이동·삭제하지 않고 문제 발생 시 별도 수정 릴리즈로 대응.
