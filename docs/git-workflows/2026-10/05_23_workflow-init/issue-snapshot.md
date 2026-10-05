# Issue #23

https://github.com/insung/git-workflow/issues/23

## 목표

분리된 template-init과 agents-init을 workflow-init으로 통합해 사용자가 필요한 초기화 항목만 선택·적용할 수 있도록 한다. 사용자 정의 GitHub 라벨과 자동 릴리즈 노트 분류 설정을 초기화 항목에 포함한다.

## 영향 범위

- 포함: workflow-init SKILL.md·참조·자산·라벨 동기화 도구, 기존 두 init의 호환 진입점, 소비자 링크·README·패키지 검사와 회귀 테스트
- 포함: 템플릿, AGENTS.md 선언, 라벨, 자동 릴리즈 노트 설정의 선택 설치
- 제외: 기존 프로젝트에 실제 설치, 원격 라벨 일괄 변경, 버전 갱신·호스트 설치·태그·Release 발행·push·PR·머지
- 호환성: 기존 template-init·agents-init 호출은 각각 해당 항목만 처리하는 진입점으로 유지

## 달성 조건

- [ ] AC-01: 일반 설치 요청에서 템플릿·AGENTS.md·라벨·릴리즈 분류의 선택지를 제시하고 선택 전 쓰기 없음
- [ ] AC-02: 라벨만·템플릿만 등 명시적 부분 요청에서 해당 항목만 적용하고 나머지 항목 변경 없음
- [ ] AC-03: 기존 템플릿의 이름·내용 보존과 AGENTS.md 경로·전문·위치 제시 및 명시적 승인 절차 유지
- [ ] AC-04: 라벨 이름·한국어 설명·색상 정의 제공, 차이 미리보기와 승인된 누락 생성 지원, 기존 메타데이터는 별도 요청 없이 변경 없음
- [ ] AC-05: release.yml에 기능·개선, 수정, 설치·운영, 릴리즈 준비, 문서·사용 안내와 기타 분류 제공, 기존 설정 보존 및 라벨 생성과 분류 설정 구분
- [ ] AC-06: 기존 init 호출의 항목 범위 유지, 참조·자산 정본 이동과 소비자 링크·README·패키지 검사 일치
- [ ] AC-07: 구현 전 독립 검토 기준·입력 고정, 변경 전후 시나리오와 도구 회귀·패키지 검사 및 plugin-eval evaluate-skill 평가 결과 기록

## 지금 알고 있는 것

현재 template-init은 템플릿 복사와 라벨 존재 확인, agents-init은 채택 선언 제안·승인·적용을 담당한다. 자동 분류 설정은 별도 로컬 변경으로 준비돼 있다. 초기화 항목을 모두 기본 설치하면 부분 적용 요청을 넘어서는 변경이 발생한다.

## 참고 링크

- https://github.com/insung/git-workflow/issues/1
- https://github.com/insung/git-workflow/issues/13
- https://docs.github.com/en/repositories/releasing-projects-on-github/automatically-generated-release-notes

계획 문서 링크 준비 중.
