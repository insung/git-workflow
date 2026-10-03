# 독립 검증 상세 근거

판정 정본: [review](review.md). 이 문서는 상세 추적용이며 실행 이력을 요약 본문에 복제하지 않는다.

## 대상과 실행 경계

- 기준·입력 고정: `review/issue-11` / `604cfb7`; 구현자는 미열람
- 비교 스냅샷: main `4287c2f`; 변경 지시: `bffbcfc`
- 최종 검토: `9d36f60`; skills/scripts/tests 트리의 지시 대상과 동일함을 exit 0으로 확인
- 최종 README·예시 소스: `6006dc9`, 원문·양언어·필수 정보·접근 경계를 직접 대조
- root 판정, 각 회차는 새 실행자. 입력 절·소스만 제공; 기준과 다른 출력은 미제공
- 최종 명령·환경·시각·결과: [기계 기록](independent-evidence/final-checks.json)

독립 RED는 구현 후 baseline 스냅샷을 재구성한 비교 실행이다. 실제 변경 전 실행이라는 주장을 하지 않는다. 구현 담당의 변경 전 공개 RED 기록은 [handoff](handoff.md#공개-시나리오)에 별도로 남아 있다. baseline 패키지 27개 테스트는 [이력](independent-evidence/baseline-checks.json)이며 최종 29개 결과를 대신하지 않는다.

## 고정 입력별 대조

| 입력 | 기대·보존 대상 | GREEN 관찰 (각 3회) | 판정 |
| --- | --- | --- | --- |
| [PR 미검증](review-input-pr-unverified.md) | 현재 human-review·과거 통과·미실행·배포 순서·롤백·확인된 링크 | 현재 상태와 과거 증거 분리, 미검증 노출, 가짜 링크·외부 실행 없음 | 충족 |
| [기존 Issue 절](review-input-issue-existing-template.md) | 기존 절·timeout 재시도·expired 유지·자동 재전송 제외 | 기존 절 유지, 결과별 AC 분리 | 충족 |
| [버그 경계](review-input-issue-bug-boundary.md) | 재현 순서·staging/Safari·운영 미확인·기존 정상 흐름 | 환경과 목격한 정보 유지, 운영 장애로 확대하지 않음 | 충족 |
| [문서 경계](review-input-document-boundaries.md) | 목적·결정 이유·단계·기대/실제·짧은 독립 판단 | plan 공통 맥락, task 결과 분리, review 필요한 판단·조치·한계 | 충족 |
| [파일명](review-input-template-case.md) | 정본 대문자·기존 소문자 이름/바이트·중복 없음·필수 절 | 임시 저장소 실제 복사, 원본 두 파일 cmp exit 0·SHA 동일, PR만 추가 | 충족 |
| [역할 인계](review-input-role-handoff.md) | 공통 목적·결정·소스·범위·읽기 순서·입력 접근 제외 | 모든 역할 공통 맥락 연결, 미실행 보존, 구현자 독립 입력 제외 | 충족 |

PR/Issue의 안전 정보와 기존 설치 보존은 baseline에서도 상당 부분 유지됐다. 이를 새 변경이 처음 만든 성공으로 표현하지 않는다. 새 편집·역할 구조와 정본 대문자 경로를 별도로 대조했다.

출력 전체: [GREEN 1](independent-evidence/green-1.md), [GREEN 2](independent-evidence/green-2.md), [GREEN 3](independent-evidence/green-3.md). 비교 이력: [RED 1](independent-evidence/red-1.md), [RED 2](independent-evidence/red-2.md), [RED 3](independent-evidence/red-3.md). 총 6회 세션·36개 입력별 출력, 현재 GREEN 18개를 판정했다.

## AC별 구현·검사 대응

| AC | 시나리오 | 구현·assertion 근거 | 실행·대조 | 판정 |
| --- | --- | --- | --- | --- |
| 01 | 정상·유지 | README 두 언어의 같은 13개 스킬·요청 흐름·읽기 순서 | 최종 양언어 수동 대조·패키지 링크 검사 | 충족 |
| 02 | 정상·유지 | assessment의 #8/#9 예시·5종 최종 예시의 원문 보존 표 | 실제 상태와 생성 당시 상태 구분, 범위/AC/위험/미검증 보존 대조 | 충족 |
| 03 | 정상 | writing-conventions 편집 정본·document-links 역할·각 참조 링크 | 최종 diff·링크 검사 | 충족 |
| 04 | 경계·유지 | issue/pr/plan/task/review 필수 정보·기존 템플릿 우선 | PR·기존 Issue·버그·설치 입력 각각 3회 | 충족 |
| 05 | 정상·실패 | package.test의 29 assertion, 공개 변경 전후 기록 | 최종 검사와 고정 입력 GREEN 18개 | 충족 |
| 06 | 유지 | 보존 ref·내보내기·clean/ignored 확인·정리 전후 목록 | 구현 워크트리 제거, 다른 8개 동일·[정리 기록](independent-evidence/implementation-cleanup.json) | 충족 |
| 07 | 정상·경계 | 문체 정본·5종 문서 역할·예시 | 문서 경계 입력 3회, 복합 결과 분리·중요 정보 유지 | 충족 |
| 08 | 정상·유지 | FEATURE_REQUEST/BUG_REPORT HTML 편집·AC 주석 | 최종 원문 주석 대조: 결론/한 결과/중복 제거/의미 보존 | 충족 |
| 10 | 정상·실패 | checker readdir 정확한 이름, lowercase/mixed-name 회귀 assertion | git 추적 이름·디렉토리 검사·29개 테스트 | 충족 |
| 11 | 정상 | issue-create/template-init 참조·복사 계약 | 패키지 링크 검사·임시 설치 입력 3회 | 충족 |
| 12 | 경계·유지 | template-init 대소문자 무시 비교·기존 이름/내용 유지 | 임시 설치 입력 3회, SHA·cmp·파일 목록 | 충족 |
| 13 | 정상·경계 | review 양식의 판정/근거/한계·task 표 비복제·enum 유지 | 문서 경계·역할 인계 각각 3회 | 충족 |
| 14 | 정상·경계 | plan 공통 맥락·document-links 읽기 순서/반환/접근 경계 | 역할 인계 입력 3회·구현 종료 전 비공개 자료 미전달 | 충족 |

문서 정책에는 유닛 assertion이 없어 고정 작성 입력과 정적 의미 대조를 대체 검사로 사용했다. 이를 코드 런타임 검증으로 확대하지 않는다. 모든 AC는 task TC-01~17 및 TC-F01~03으로 연결되며 빠진 계획 ID는 없다. 계획 밖 README의 독립 역할 설명 보완은 plan 변경 기록에 이유가 남아 있다. #6 댓글·#8 정리 규칙 소스는 변경하지 않았다.

## 로그 해석과 한계

- 임시 저장소의 `find` exit 1은 docs 디렉토리 없음; `diff` exit 1은 기존 템플릿과 정본 내용 차이. 기존 파일 `cmp`는 모두 exit 0
- baseline 첫 실행의 git index 없음은 초기 환경 문제. 이후 스냅샷 index를 준비하고 정확한 경로를 재확인. 원본 저장소 history는 전달하지 않음
- 실제 설치 실행은 macOS 임시 저장소. Linux 환경 실행·실제 사용자 저장소 설치·호스트 로딩·사용자 이해도 측정 없음
- 상세 산출물의 머신 절대 경로를 sandbox/파일명으로 치환하고 줄 끝 공백을 제거. 원본/공유본 SHA는 [manifest](independent-evidence/manifest.json)에 보존
- 원격 push·PR·댓글·Release·설치 갱신은 실행하지 않음. Issue #11 현황 갱신과 최종 리뷰용 워크트리 정리는 외부 종료 보고서에서 재조회
