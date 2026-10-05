# 구현과 독립 검토 인계

- Issue: https://github.com/insung/git-workflow/issues/23 / PR: https://github.com/insung/git-workflow/pull/24 (Draft)
- Plan: [plan](plan.md), [01](task-01-init-selection.md), [02](task-02-label-sync.md)
- 작업 위치: `.worktree/workflow-init`
- base·HEAD: `4d356cf46b06dff6b09b9819bc644b3c2ca2a722`; 구현 커밋 `315576b`
- 구현 담당: 별도 구현 에이전트 implement_init. 메인이 고정 입력으로 독립 검토. 비공개 review 브랜치·입력·기준을 열지 않음
- 소스 파일별 SHA256: [manifest](evidence/implementation-source-sha256.txt); manifest digest `4d63a4c27ce45b7fdcf3d623a9da54defc630c30acfa09ddec5c5537f00df246`. 문서·평가 증거 제외, 삭제 파일은 DELETED 표기
- 확인 시각: 2026-10-05T13:14:18.267891+09:00
- spec-it: 이번 구현의 정책 파일·채택 변경 없음

## 사용자 의도와 구현 결과

| AC | 구현 | 대응 TC | 상태 |
| --- | --- | --- | --- |
| AC-01·02 | workflow-init 선택 표와 일반 요청 대기·부분 요청 범위 계약 | TC-01 | 구현; 독립 GREEN 판정 대기 |
| AC-03 | 템플릿 3개 이동, 기존 이름·바이트 보존 절차; 채택 선언 정본과 경로·전문·위치 승인 절차 | TC-01·03 | 정본 선언 1486바이트 HEAD fenced block과 동일; 초기 추출 오류를 독립 지적 후 수정 |
| AC-04 | labels.yml과 기본 preview / --apply 누락 생성 도구 | TC-02 | 자체 10/10 통과 |
| AC-05 | 6분류 release.yml 및 release.yaml·release-drafter 보존 절차 | TC-01 | 구현; 독립 판정 대기 |
| AC-06 | scoped 호환 진입점, 소비자 링크·README·필수 패키지 경로 갱신 | TC-03 | 자체 34/34·구조 검사 통과 |
| AC-07 | 자체 회귀, root 독립 시나리오·평가 인계 | TC-F01~03 | 자체 회귀 완료; 시나리오·평가 대기 |

## 계획 대비 차이

자체 YAML은 GitHub 네이티브 설정이 아니므로 assets/labels.yml에 둔다. 릴리즈 설정 절차는 references/release.md로 둔다. plan에 계획 이탈 기록을 추가했다. 기존 소비자 양식 계약은 유지하고 정본 링크만 이동했다. 버전·manifest·기존 프로젝트 AGENTS·실제 원격 라벨은 변경하지 않았다.

## 검증과 증거

| 사례 | 기대 | 실제 | 실행 |
| --- | --- | --- | --- |
| TC-02 | 무변경 preview, 누락만 생성, 기존 메타데이터 보존, 불명 응답 재조회, 조회 실패 중단 | 10/10 통과 | `python3 tests/label-sync.test.py` |
| TC-03 / TC-F01 | 패키지 회귀·상대 링크·자산 정본 존재 | 34/34 통과·Package structure valid | `node --test tests/package.test.mjs`; `node scripts/check-package.mjs` |
| TC-01 | RED·GREEN 3회 일반·부분·호환·선언 시나리오 | 자체 미실행; 메인 별도 실행 인계 | 독립 시나리오 입력·출력은 구현자에게 공개하지 않음 |
| TC-F02 | plugin-eval 결과·한계 | 미실행; 메인 실행 인계 | evaluate-skill |

모든 자체 명령은 위 작업 위치에서 HEAD + manifest의 작업본으로 실행했다. 환경은 macOS, Python 3.14.2, Node v23.11.0; 마지막 자체 실행 시각은 위 확인 시각. fake-gh는 임시 디렉터리만 사용한다. 테스트는 CLI subprocess 효과, pagination, casefold 중복, YAML 안전 파싱, 잘못된 repo·정의에서 gh 미호출, 동시 생성, nonzero 및 TimeoutExpired 뒤 조회, 1000페이지 상한을 확인한다. 패키지 검사는 선언의 핵심 역할/승인 문구와 4개 역할 bullet을 확인해 빈 자산 회귀를 막는다. 도구 테스트 imports는 bytecode 쓰기를 끈다.

## 커밋·전달·위험

구현 커밋 `315576b` 완료. push·PR은 새 요청으로 진행하며 머지·배포·실제 설치는 미실행. 문서는 로컬이다. 실제 인증·권한·GitHub 원격 동작과 호스트 발견은 fake-gh/구조 검사로 입증하지 않는다. 구현 완료와 독립 검토 완료를 구분하며 TC-01·평가 판정은 메인이 추가 기록한다. 롤백은 현재 patch의 승인 범위 파일만 검토해 되돌리고 다른 작업을 reset/clean하지 않는다.

## 평가 참고와 마지막 수정

메인 중간 evaluate-skill 보고는 workflow-init 68/100, 호환 진입점 각각 95/100이다. workflow-init의 deferred budget는 모든 조건별 references·assets·script를 합산한 4105 추정 토큰이며 실제 한 항목 실행에서 모두 읽는 것은 아니다. description-trigger는 영어 Use when 정규식을 기대해 한국어 설명을 경고한다. tests-missing은 스킬 폴더 밖의 tests/label-sync.test.py를 발견하지 못한 한계다. 실제 자체 테스트 10/10과 구분한다. 점수만 위해 안내를 삭제하거나 테스트를 중복하지 않았다.

중간 평가의 코드 복잡도·긴 줄 지적 후 텍스트/색상/원격 메타데이터 검증 helper를 분리하고 긴 Python 조건을 정리했다. 소스 수정 후 python 회귀 10/10·패키지 구조 검사 재통과. 최종 평가·독립 소스 재검증은 메인 인계.

독립 GREEN 지적 후 명시적 라벨 설치 요청의 지정/확인된 대상·정의 범위 누락 생성은 권한 재질문 없이 미리보기 후 적용하도록 조건을 명확히 했다. 일반 메뉴만으로 생성하지 않으며 미확인 범위만 질문한다. AGENTS.md 추가안 승인은 유지한다. 해당 라벨 시나리오 독립 재실행 인계.

## 메인 최종 검증 결과

현재 소스 manifest의 파일별 SHA256과 manifest digest 4d63a4c27ce45b7fdcf3d623a9da54defc630c30acfa09ddec5c5537f00df246를 대조했다. HEAD 4d356cf + 이 미커밋 소스가 검증 대상이다.

공개 요청문 RED/GREEN 각 3회 기록을 evidence/self-red-{1,2,3}.md와 self-green-{1,2,3}.md에 보관한다. 라벨 권한의 해석 차이 수정 뒤에는 self-labels-final-{1,2}.md와 세 번째 self-green의 PUBLIC2를 최종 결과로 사용한다. 공개 4조건 12/12 충족. 최초 선언 추출 실패와 라벨 승인 해석 차이는 독립 검토에서 발견해 수정했다. 고정 입력의 기대 결과·입력 자체는 구현 브랜치로 복사하지 않는다.

메인은 현재 라벨 도구를 별도 fake-gh 회귀 11/11로 재검증했다. 기존 패키지 회귀 34/34, 구현자 도구 회귀 10/10, 패키지 구조·원문 이동 바이트 대조·release.yml 분류 검사는 통과했다. 실제 호스트 선택·파일 설치·원격 API mutation은 시나리오 결정 또는 fake backend로 입증하지 않는다.

최종 evaluate-skill: workflow-init 72/100(C), template-init 95/100(A), agents-init 95/100(A). [평가 상세](evidence/eval-workflow-init-final.md). workflow-init은 정적 비용 fail 1개, 한국어 trigger 인식·Python 복잡도·폴더 밖 테스트 탐색 warn 3개. 선택별 참조를 모두 합산한 정적 비용과 실제 사용량은 다르며 실사용 토큰 로그 없음. 실제 테스트가 있어도 스킬 폴더 밖 테스트는 평가기가 탐색하지 못한다. 품질 경고를 보존하며 평가 점수를 행동 통과 근거로 쓰지 않는다.

## PR 생성 인계

사용자가 2026-10-05 pr-create를 호출해 해당 변경의 커밋·push·PR 생성을 요청했다. 기존 plan의 제외 범위 중 해당 행동만 이번 요청으로 갱신한다. 제품 구현 commit315576b, 검토 소스 manifest digest4d63a4c27ce45b7fdcf3d623a9da54defc630c30acfa09ddec5c5537f00df246 동일. base main45e2517을 원격 재조회했다. 기존 PR 없고 Issue#23은 실제 OPEN Issue, 라벨 enhancement·assignee insung 확인했다. 원격 문서 링크는 push 후 접근 확인하며 댓글·reviewer 지정·머지는 실행하지 않는다.

검토 기록은 [review](review.md), 고정 기준은 [review-criteria](review-criteria.md)에 연결한다. 자료 반입은 구현 종료와 독립 warn 판정 뒤 수행했다. evaluate-skill 결과는72/100, 정적 비용 fail1·warn3을 PR에 보존한다.

PR 준비 시 구현 commit315576b에서 패키지34/34·도구10/10·독립11/11·구조·diff 검사를 다시 실행했다. 제품 파일은 앞선 manifest와 동일하며 검토 기록 반입만 추가했다.

PR#24를 main ← codex/workflow-init으로 생성했다. 실제 OPEN/Draft·enhancement·assignee insung 및 본문 Issue항목 Closes#23을 재조회했다. 최초 PR HEAD31859b9 확인. 이후 이 기록 보완 커밋은 문서만 변경하며 source manifest와 구현commit315576b는 동일하다.
