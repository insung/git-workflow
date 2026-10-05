# Issue #27 구현 전 검토 기준

| AC | 기계 확인 | 판단 질문 | 실패 예 |
| --- | --- | --- | --- |
| AC-01 | skills/template-init·agents-init 부재 및 git tree discovery 확인 | 새 설치가 workflow-init만 노출하는가 | 검사 목록에서만 빼고 파일은 남김 |
| AC-02 | 현행 README·skills·scripts의 옛 경로 없음, package 검사 | 명시적 템플릿·AGENTS 요청이 올바른 부분 선택 절차로 연결되는가 | 일반 설치를 전부 설치로 바꿈 |
| AC-03 | base와 references/assets/scripts 전체 바이트 동일, 패키지·라벨 회귀 | 승인·파일 보존을 약화시키지 않았는가 | 선언 자산이나 기존 파일 덮어쓰기 규칙 변경 |
| AC-04 | 3 manifest 0.6.0, 원격 tag·Release 본문·캐시 파일 대조 | 옛 호출 제거 및 교체 방법을 알렸는가 | 노트는 여전히 호환 유지, 같은 버전 캐시만 확인 |

현재 소스 HEAD와 실제 검증 결과를 기록한다. 이전 0.6.0 OID 보존, tag 조건부 갱신, v0.5.0 불변을 확인한다. 옛 cache path가 존재하는 사실은 비활성 과거 보존일 수 있으므로 현재 설치 경로의 discovery tree를 기준으로 판정한다. 요청 누락 방지나 추가 기능은 fail이다.
