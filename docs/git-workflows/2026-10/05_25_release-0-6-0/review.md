# 0.6.0 릴리즈 패키지 검토

판정: pass (버전 메타데이터·배포 준비 범위). workflow-init 동작 자체의 이전 warn 판정을 변경하지 않는다.

- base: 004c037c6aab1e244497438dab7a6392fd80253d (PR #24 머지)
- 대상: base + manifest 3곳 version만 변경, CHANGELOG의 0.6.0 절, 이번 릴리즈 문서
- AC-01: 3 manifest JSON version=0.6.0 직접 확인. 다른 필드 변경 없음.
- AC-02: 노트·CHANGELOG를 v0.5.0..base diff 및 PR #24·review와 대조. 요약·사용 방법·전환 안내를 먼저 배치. 기존 v0.5.0 유지·호스트 설치 미실행·fake backend 한계 명시.
- AC-03: node --test tests/package.test.mjs 34/34, python3 tests/label-sync.test.py 10/10, node scripts/check-package.mjs 통과. git diff --check 통과. base 대비 skills/·tests/·scripts/ diff 없음. 세션 간 요청 누락 방지 규칙과 main의 미추적 설정 미반영.
- AC-04: 발행 후 원격 태그·Release·대상 커밋·기존 태그 보존 재조회 예정. 이 항목은 아직 완료로 주장하지 않는다.

새 코드·스킬 동작 변경은 없으며 기계 검사는 현재 세션에서 실행했다. 이전 기능의 독립 행동 검토는 #23 기록에 연결한다. 실제 호스트 설치는 이번 범위에서 제외한다.
