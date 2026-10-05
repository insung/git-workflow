# 01 진입점 제거와 현행 참조 정리

Issue: https://github.com/insung/git-workflow/issues/27

| # | 작업 | 완료 | 처리 내용 |
| --- | --- | --- | --- |
| 1 | template-init·agents-init의 SKILL.md와 빈 디렉터리를 제거 | [ ] | - |
| 2 | 현행 README 2종·라우터·workflow-init·검사·테스트를 통합 진입점 기준으로 갱신 | [ ] | - |
| 3 | 0.6.0 CHANGELOG와 이번 릴리즈 노트의 호환 유지 문구를 삭제·전환 안내로 수정 | [ ] | - |

## 보존·범위

skills/workflow-init/references/·assets/·scripts/와 다른 스킬 동작은 보존한다. 과거 docs의 사실과 CHANGELOG 0.5.0은 바꾸지 않는다. docs/05_25의 release-notes는 현재 v0.6.0 발행 본문 정본이므로 갱신한다. AGENTS.md·요청 누락 방지·실제 저장소 설치·원격 라벨은 제외한다.

## 검증

| 사례 | AC | 명령·입력 | 기대 | 결과 |
| --- | --- | --- | --- | --- |
| TC-01 | AC-01·02 | 삭제 경로 존재 확인; 현행 README·skills·scripts의 옛 참조 검색 | 두 스킬 없음, 삭제 경로 링크 없음 | 미실행 |
| TC-02 | AC-03 | node --test tests/package.test.mjs; node scripts/check-package.mjs; python3 tests/label-sync.test.py; git diff --check | 모두 통과, 필수 workflow-init 누락도 탐지 | 미실행 |
| TC-03 | AC-03 | base의 workflow-init references/assets/scripts와 현재 파일 바이트 대조 | 보존 | 미실행 |
| TC-04 | AC-02 | 명시적 템플릿/AGENTS 요청과 일반 초기화 요청의 router·SKILL 대조 | 모두 workflow-init, 부분 범위·일반 선택·승인 규칙 유지 | 미실행 |

구현 소스 커밋과 문서 기록 커밋을 구분하고 handoff에 명령·결과·미실행을 기록한다. commit/push/PR/태그/설치는 조정 세션이 수행하므로 구현자는 변경과 검증만 인계한다.
