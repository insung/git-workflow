# Issue #27 독립 검토

판정: warn (현행 소스). 초기화 진입점 삭제·라우팅 정리와 보존 기준을 충족한다. 정적 evaluator 비용·복잡도 경고를 유지한다. 배포·캐시 AC-04의 원격 증거는 발행 후 종료 기록에서 확인한다.

- 구현 전 고정 기준: review/issue-27의 53b6969
- base: 6d39a17 + 구현 작업본. 제품 소스 patch digest 2ccbb41657c64ed2d07a060c85be5fd06fc6ed540973024c2054b82114e118ea; 릴리즈 검증·전환 안내 문구는 추가 보완 후 diff 대조
- 판정 주체: 조정 세션. 구현자는 비공개 기준 미열람

| AC | 결과·근거 |
| --- | --- |
| AC-01 | pass: 두 디렉터리·SKILL.md 부재. 초기화 discovery가 workflow-init 하나임을 tree test로 확인 |
| AC-02 | pass: 현행 README·라우터·skills·검사에 삭제 경로 없음. 3요청×3 새 실행자 GREEN9/9에서 단일 진입점·부분 범위·제안 전 무쓰기·4항목 선택 유지 |
| AC-03 | pass: 보호한 references/assets/scripts11개 SHA256 동일. 직접 package35/35·label10/10·check-package·diff 검사 재실행 |
| AC-04 | 로컬 pass, 원격 발행 전 미실행: 버전3곳0.6.0, 옛 호출 제거·전환·같은 버전 갱신 안내. tag·Release·캐시는 종료 기록에서 대상 SHA와 파일 바이트 검증 예정 |

RED3회에서는 A/B에 옛 호환 이름이 선택 또는 대안으로 노출됐으며 C의 선택 계약은 유지됐다. GREEN3회에서는 모든 A/B가 workflow-init만 선택했고 C는 선택 전 쓰지 않았다. 각 결과는 evidence/red-*.md·green-*.md에 저장했다. 이 증거는 첫 응답과 예정 행동이며 실제 프로젝트 파일 설치·원격 라벨 생성은 아니다.

최신 evaluate-skill 결과 workflow-init72/100(C), fail1·warn3·info2. active346 tokens 추정. 모든 하위 파일 합산 비용, 한국어 trigger, 복잡도, skill 외부 tests 탐색 경고가 남는다. 실제 토큰 사용 측정이 아니다. 구현 범위 밖의 최적화나 요청 누락 방지 규칙을 추가하지 않는다.

역사 docs의 이전 이름은 정상이다. 0.5.0 CHANGELOG·태그 보존, 미추적 main .github/release.yml 제외. 현재 활성 0.6.0 캐시에 옛 스킬이 남으면 배포 완료로 인정하지 않는다.

## 커밋 대응

제품 소스 커밋 ebe8ae67e874479124dbd28ce846e549a2aeb0fa는 검증한 SKILL·라우터·검사·테스트와 동일하다. 이후 변경은 문서 기록과 릴리즈 평가 문구의 모순 제거뿐이며 제품 소스가 아니다. 검토 기준·입력·evidence는 구현 완료·warn 판정 후 기록 절차에 따라 반입했다.
