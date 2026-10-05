# 0.5.0 구현과 설치 인계

- Issue: https://github.com/insung/git-workflow/issues/20
- base: 2040a5698a35ce793eabff9b64e90991cda82c8c
- 변경: plugin.json, .codex-plugin/plugin.json, .claude-plugin/plugin.json의 version만 0.5.0으로 갱신. CHANGELOG.md 추가. 마켓플레이스에는 version 필드가 없으므로 추가하지 않음.
- 직접 검증: 회귀 29/29 통과, check-package 구조·manifest·상대 링크 통과, diff --check 통과. skills/ diff 없음.
- 설치: Codex plugin add 성공; Claude plugin update 사용자 범위 0.4.0→0.5.0 성공.
- 사후 확인: 두 호스트 설치 목록에서 0.5.0·enabled 확인(Codex installed도 확인). 캐시의 manifest 3곳과 핵심 스킬/pr-merge·issue-close 및 각 참조 파일 4개의 원본 일치 확인.
- AC-01~04 충족. 기존 스킬 동작을 재검증한 것으로 표현하지 않음.
- 실행 주체: 현재 세션의 명령·파일 비교. 별도 독립 리뷰는 미실행.
- 새 실행 세션의 지침 로딩은 미확인. Claude는 재시작 필요 응답, Codex는 새 채팅에서 사용 권장.
- Codex 목록 조회의 원격 카탈로그 연결 경고는 로컬 설치 항목 확인과 구분. 해당 설치 항목과 캐시 내용은 확인됨.
- 설치된 원본은 검증된 로컬 후보. 원격 main 머지·태그·GitHub Release는 실행하지 않음. PR 머지는 별도 승인 대기.
- .comments 변경 없음.
