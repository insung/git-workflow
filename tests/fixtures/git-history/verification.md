# git-history 재현과 검증

Issue: [#46](https://github.com/insung/git-workflow/issues/46). 기준 main: `b9a49034b79c13b1e5616ea9ff1c7267f851d593`. 구현 전 공개 계획의 사례로 fixture를 만들고, 스킬 없는 조사와 신규 스킬 조사를 각각 새 실행자 3명에게 수행시켰다. 별도 비공개 리뷰 기준이나 독립 pr-review 결과는 아니다.

## 재현 입력

```sh
history_case_dir=$(mktemp -d)
python3 tests/fixtures/git-history/create_fixture.py "$history_case_dir/input"
python3 tests/git-history-fixture.test.py
```

생성 자료는 INPUT.md(경계), requests.json(12개 질문·revision·코드 대상), repo/(실제 Git 객체), github.json(모의 원격 응답·본문·댓글·diff·검색 결과)이다. 모든 저장소·URL·Issue·PR은 합성 자료다. 원격 접근·GitHub 수정 없이 실행하며 fixture의 작업 파일·index·refs를 수정하지 않는다. 생성 대상이 이미 존재하면 덮어쓰지 않고 실패한다.

각 실행자에게 준 요청은 다음과 같다. 변경 전에는 첫 문장의 스킬 사용 지시만 생략했고 기대 결과·다른 실행 결과는 전달하지 않았다.

> git-history/SKILL.md의 스킬을 사용해 INPUT.md와 requests.json, github.json, repo/의 실제 Git 이력으로 S01~S12 모두 조사한다. 읽기 전용·오프라인 제약을 따른다. ID별 조사 결과와 실제 사용 명령/근거 경로, 미확인과 추가 자료 요청을 보고한다. 기대 답이나 pass/fail 판정은 하지 않는다. 결과 보고서만 별도 임시 위치에 작성한다.

실행 결과는 현재 세션이 Issue AC와 아래 관찰 지점으로 대조한다. 횟수만으로 품질을 판정하지 않는다. 같은 입력을 재실행하면 모델 출력은 달라질 수 있다.

| ID | 입력 | 대조 지점 |
| --- | --- | --- |
| S01 | direct/policy.py 함수 | 1/3 도입 diff, Refs #11 → PR #21 및 부하 급증 방지 요청, 테스트는 당시 보고 |
| S02 | no-refs/server.py 함수 | Refs 없음에도 커밋별 PR #22 → Issue #12의 2 선택 이유 |
| S03 | squash/batch.py | squash SHA와 원 SHA 구별, 비조상 원 커밋과 동일 코드/PR #23 → Issue #13 |
| S04 | merge/worker.py | 두 부모와 첫 부모 diff, 구현 커밋·PR #24·Issue #14; 빈 combined diff로 변경 부정 금지 |
| S05 | format/retry.py 함수 | 포맷·if 전개·100% rename 거슬러 policy.py의 1/3 도입과 Issue #11 발견 |
| S06 | later/retry.py | 원 요청 1/3과 후속 2/3 및 Issue #15·PR #25 구별 |
| S07 | cross/partner.py | fixture/design#7을 service#7과 구별, 다른 host #9의 403을 맥락 미확인으로 표시 |
| S08 | search/session.py | Workflow 없이 README·결정 문서의 INC-77 → 후보 검색 → PR #28 SHA/diff·Issue #16의 7 요청 |
| S09 | orphan/legacy.py | 8 도입 확인, commit→PR 200 빈 목록·문서·검색 경로와 맥락 미발견 한계, 필요한 자료 하나 |
| S10 | private/private.py | 9 도입, Refs #99의 404·commit PR의 403을 기록 부재로 확정하지 않음, 필요한 자료 하나 |
| S11 | search/session.py, #17 주장 | 유사 제목 #17의 UI 요청·PR #29 dashboard diff 제외, 실제 #16·PR #28 경로 |
| S12 | later/retry.py 1~4행, dirty | OID 코드의 2/3과 미커밋 99 구별, 작업본 보존 |

## 결과

현재 세션이 변경 전·후의 전체 보고서를 읽고 공개 AC와 대조했다. fixture 무결성 검사와 스킬 행동 검증, 실제 원격 읽기 증거는 서로 다른 확인이다.

- 패키지 RED: 신규 필수 스킬/reference 누락 검사를 먼저 추가한 상태에서 40/42 통과, 새 두 검사는 실패
- 패키지 GREEN: 필수 스킬/reference 연결 후 42/42 통과
- Git fixture 무결성: 8/8 통과. squash 비조상·merge 부모·rename·dirty 분리·잘못된 검색 후보 등의 원자료를 확인하며 모델 행동을 판정하지 않음
- 기존 라벨 10/10, 템플릿 교체 8/8 통과. 패키지 구조/상대 링크·skill-creator quick_validate·git diff --check 통과
- 스킬 SHA256: SKILL.md `ba4c83ba814490224be5c778eb63a907abee54df850daacded4f300270d47d6a`, investigation.md `2a4eb8251ab8896ec6b3539d808de7fe033f9bae58c1de6cc00d618d0990a6f6`

| 사례 | 스킬 없는 실행 1/2/3 | 신규 스킬 실행 1/2/3 |
| --- | --- | --- |
| S01~S06 | 각각 6/6 | 각각 6/6 |
| S07~S12 | 각각 6/6 | 각각 6/6 |
| 전체 핵심 기준 | 36/36 | 36/36 |

핵심 통과는 연결·코드/당시 요청 대조·한계·자료 하나·읽기 전용 보존을 뜻한다. 다음 좁은 관찰은 전반적 정확도 개선 주장과 구별한다.

- 변경 전 S02의 추가 요구: 실행 1은 「해당 reconnect 허용도를 검증한 backend 실험 기록」, 실행 2는 「해당 backend 재연결 시험 기록」, 실행 3은 「정량적 근거까지 필요하면 … reconnect 측정 자료」. 원 요청의 선택 이유를 이미 확인한 질문에 새 검증 요구/선택 안내가 반복됨
- 변경 후 S02: 실행 1 「추가 자료: 해당 없음」, 실행 2 「질문에 필요한 추가 자료 없음」, 실행 3 「추가 자료 요청은 해당 없음」. S03~S06·S08·S11·S12도 세 실행 모두 이유/기준 설명이 충분하면 추가 요구 없음
- 변경 후 S07·S09·S10: 세 실행 모두 각 사례의 미확인 공백과 접근 가능한 원문/결정 문서 한 건 제시
- merge는 세 실행 모두 두 부모 diff, squash는 비조상 원 SHA와 유입 코드 대조, 이동·리팩터는 초기 요청까지 추적. 유사 제목 #17은 세 실행 모두 UI 범위/diff로 제외
- 시작·종료 fixture 상태 ` M retry.py`, index 변경 없음, 고정 later 2/3과 미커밋 99 분리. 실제 네트워크·권한 변경·repo 수정 없음

변경 전 3회 모두 핵심 연결·기원·접근 한계를 처리했다. 따라서 이 사례에서 신규 스킬이 탐색 정확도를 개선했다고 주장하지 않는다. 반복 재현과 명시적 실행 지침을 제공하는 것이 이번 결과다. 변경 전에는 이유 연결이 충분한 S02~S06 등에도 backend 측정·운영 성과 자료를 추가 요청하는 양상이 있었다. 새 스킬은 조사 질문에 필요한 맥락과 범위 밖 새 검증을 구별하도록 안내한다.

## 실제 GitHub 읽기 증거 — 2026-10-07

실제 원격 기록은 별도로 읽기 전용 재조회했다.

- [be43577의 Refs #41](https://github.com/insung/git-workflow/commit/be43577660efe649b945043a73f4aaeac0292ed3) 및 commit PR API → [PR #42](https://github.com/insung/git-workflow/pull/42)
- [Refs 없는 3344dbd](https://github.com/insung/git-workflow/commit/3344dbd9fcad9171fd93b4d17e555a4e13ee8033) → commit PR API의 [PR #38](https://github.com/insung/git-workflow/pull/38) → PR 본문의 [Issue #36](https://github.com/insung/git-workflow/issues/36) → 사용자 요청 원문 절. PR #38 논의 코멘트 조회 결과는 0개

새 스킬의 모의 403/404는 실제 비공개 권한 검사 증거가 아니다. Git fixture의 squash/merge는 실제 Git 그래프 증거이며 GitHub 원격 squash/merge 실행 증거가 아니다. 설치 호스트 자동 선택·전체 런타임 호출 동작·효과/탐색 시간 비교·독립 리뷰는 미실행이다. 소스 정적 확인과 기록된 테스트 보고를 직접 재실행·배포 증거로 사용하지 않는다.

합성 fixture의 S08 결정 문서는 초기 커밋부터 후속 PR 번호를 포함한다. 한 실행자가 이 시점 불일치를 지적했다. 그래서 문서 단독으로 당시 의도를 확정하지 않고 PR SHA/diff와 Issue 요청을 교차 확인한 결과로 판정했다. 이 fixture는 문서 작성·편집 시각의 진위나 실제 역사 복원을 증명하지 않는다.
