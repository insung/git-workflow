다음 입력으로 GitHub Release의 공개 제목과 노트 본문을 한국어로 작성하라. 원격 쓰기는 하지 말고 결과를 실행자가 지정한 출력 파일에 저장하라. 릴리즈 작성은 지정한 release-notes.md 지침을 적용하라.

프로젝트: demo-tool (합성 사례). 공개 이전 태그 v1.0.0, 대상 v1.1.0. 저장소 https://github.com/example/demo-tool (합성 URL). 프로젝트의 별도 제목·노트 규칙은 없음.
포함 변경:
- PR #10 https://github.com/example/demo-tool/pull/10: retry-guide 추가. 일시 오류에서 재시도 방법 확인. 자동 재전송은 하지 않음.
- PR #11 https://github.com/example/demo-tool/pull/11: retry-help 이름을 retry-guide로 전환. 이전 호환 진입점 없음. 설정의 이전 호출을 갱신해야 함.
- PR #12 https://github.com/example/demo-tool/pull/12: expired 오류의 기존 안내 유지.
- PR #13 https://github.com/example/demo-tool/pull/13: 설치 안내의 참조 경로 수정. 플러그인 갱신으로 소비 프로젝트 설정을 자동 변경하지 않음. AGENTS.md 변경은 경로·내용·위치의 별도 승인 필요.
검증: 제공된 회귀 검사 8/8 통과. 실제 호스트 호출과 독립 PR 리뷰는 미실행. 효과 측정은 없음.
