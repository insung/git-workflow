# 01 진입점 제거와 현행 참조 정리

Issue: https://github.com/insung/git-workflow/issues/27

| # | 작업 | 완료 | 처리 내용 |
| --- | --- | --- | --- |
| 1 | template-init·agents-init의 SKILL.md와 빈 디렉터리를 제거 | [x] | 미커밋 구현; [실행 요약](task-01-remove-entrypoints.md#실행-결과-요약)의 patch·검증 근거 참조 |
| 2 | 현행 README 2종·라우터·workflow-init·검사·테스트를 통합 진입점 기준으로 갱신 | [x] | 미커밋 구현; [실행 요약](task-01-remove-entrypoints.md#실행-결과-요약)의 patch·검증 근거 참조 |
| 3 | 0.6.0 CHANGELOG와 이번 릴리즈 노트의 호환 유지 문구를 삭제·전환 안내로 수정 | [x] | 미커밋 구현; [실행 요약](task-01-remove-entrypoints.md#실행-결과-요약)의 patch·검증 근거 참조 |

## 보존·범위

skills/workflow-init/references/·assets/·scripts/와 다른 스킬 동작은 보존한다. 과거 docs의 사실과 CHANGELOG 0.5.0은 바꾸지 않는다. docs/05_25의 release-notes는 현재 v0.6.0 발행 본문 정본이므로 갱신한다. AGENTS.md·요청 누락 방지·실제 저장소 설치·원격 라벨은 제외한다.

## 검증

| 사례 | AC | 명령·입력 | 기대 | 결과 |
| --- | --- | --- | --- | --- |
| TC-01 | AC-01·02 | 삭제 경로 존재 확인; 현행 README·skills·scripts의 옛 참조 검색 | 두 스킬 없음, 삭제 경로 링크 없음 | 통과; 실제 두 디렉터리 없음·현행 참조 0건 |
| TC-02 | AC-03 | node --test tests/package.test.mjs; node scripts/check-package.mjs; python3 tests/label-sync.test.py; git diff --check | 모두 통과, 필수 workflow-init 누락도 탐지 | 통과; package 35/35·label 10/10·구조·diff 검사 |
| TC-03 | AC-03 | base의 workflow-init references/assets/scripts와 현재 파일 바이트 대조 | 보존 | 통과; HEAD 대비 11개 바이트 동일 |
| TC-04 | AC-02 | 명시적 템플릿/AGENTS 요청과 일반 초기화 요청의 router·SKILL 대조 | 모두 workflow-init, 부분 범위·일반 선택·승인 규칙 유지 | 텍스트 대조 통과; 실제 fresh executor RED/GREEN 미실행 |

구현 소스 커밋과 문서 기록 커밋을 구분하고 handoff에 명령·결과·미실행을 기록한다. commit/push/PR/태그/설치는 조정 세션이 수행하므로 구현자는 변경과 검증만 인계한다.

## 실행 결과 요약

제품 소스 ebe8ae6에서 패키지35/35·라벨10/10·구조·공백 검사, 보호 references/assets/scripts11파일 바이트 동일. 세 요청의 독립 GREEN9/9로 단일 초기화 진입점 확인. 평가72/100(C)의 비용fail1·warn3 유지. 당시 원격/설치 discovery는 미확인.

당시 명령은 저장소 루트의 `node --test tests/package.test.mjs`, `node scripts/check-package.mjs`, `git diff --check`를 중심으로 실행했다. 추가 명령·대상 작업본·실행 시각은 plan의 정리 전 기록에서 확인한다. 현재 HEAD의 재검증 결과로 사용하지 않는다.
