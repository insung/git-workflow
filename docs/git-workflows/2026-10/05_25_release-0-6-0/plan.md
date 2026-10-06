---
issue: "#25"
status: ready
branch: "codex/release-0.6.0"
base: "main"
created: "2026-10-05"
---

# git-workflow 0.6.0 릴리즈 계획

## 요청

> 0.6.0 으로 해줘. 그러면 0.5.0 이슈는 클로즈하고 새로운 버전으로 배포해줘.

선행 요청의 릴리즈 노트 개선과 #24 머지 결과를 반영한다. 세션 간 요청 누락 방지 규칙은 사용자 지시에 따라 제외한다. 기존 v0.5.0 태그·Release는 유지한다.

## 범위

manifest 3곳 버전·CHANGELOG·릴리즈 근거 기록·v0.6.0 태그·GitHub Release만 갱신한다. 추가 스킬 동작, 호스트 설치, 실제 라벨 생성, main의 미추적 .github/release.yml은 변경하지 않는다.

## 단계와 검증

| 단계 | 작업 | AC | 검증 |
| --- | --- | --- | --- |
| 01 | 버전과 변경 내역 갱신 | AC-01·02 | manifest 3곳 0.6.0 일치, 노트와 v0.5.0..target diff 대조 |
| 02 | 패키지·라벨 도구 검사와 범위 검토 | AC-03 | node --test tests/package.test.mjs, python3 tests/label-sync.test.py, node scripts/check-package.mjs, git diff --check, skills/ diff 없음 |
| 03 | 버전 변경 PR 머지와 태그·Release 발행 | AC-04 | 실제 MERGED, 원격 태그 대상=검증 main, Release 공개·본문 일치, v0.5.0 태그 유지 |

## 전달·권한·롤백

사용자의 새 버전 배포 요청에 필요한 버전 commit/push·release PR·머지·새 태그 push·Release 발행을 수행한다. 보호 규칙을 우회하지 않는다. 추가 동작 변경·다른 작업 삭제 권한으로 확대하지 않는다.

실패 시 공개 전 단계에서 중단하고 상태를 재조회한다. 기존 v0.5.0을 변경하거나 새 릴리즈의 성공을 추측하지 않는다. 공개 후 롤백은 별도 판단으로 기록한다.

## 기록 정리

2026-10-06 Issue #39의 승인에 따라 전달문·검토 입력·응답 전문·로그·중복 초안을 현재 트리에서 정리했다. 이 문서의 기존 상태·판정·승인은 당시 기록이며 현재 완료 상태로 갱신한 것이 아니다. 필요한 원문은 [정리 전 기록](https://github.com/insung/git-workflow/tree/3993cb36cdb3fca6ff8b2bfee47016eb8a70e959/docs/git-workflows/2026-10/05_25_release-0-6-0)에서 조회한다.

## 실행 결과 요약

PR #24의 선택 초기화·라벨 도구를0.6.0으로 구분. 후속 #27에서 template-init/agents-init 제거와35개 회귀 기준으로 같은 버전 노트를 정정. 이전34개 준비 검토와 후속35개 검증은 각 시점 결과이며 실제 발행·재설치는 원격 종료 기록과 구별.

당시 명령은 저장소 루트의 `node --test tests/package.test.mjs`, `node scripts/check-package.mjs`, `git diff --check`를 중심으로 실행했다. 추가 명령·대상 작업본·실행 시각은 plan의 정리 전 기록에서 확인한다. 현재 HEAD의 재검증 결과로 사용하지 않는다.
