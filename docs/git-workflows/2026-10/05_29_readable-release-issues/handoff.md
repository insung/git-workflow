# 구현과 PR 리뷰 인계

- Issue: https://github.com/insung/git-workflow/issues/29; PR 미생성
- Plan / Task: [plan](plan.md), [01](task-01-writing-rules.md), [02](task-02-release-drafts.md)
- base / 구현 HEAD: e79013a65dae27898a88f7c29032fb81d48b3edd, codex/readable-release-issues; 미커밋 작업본
- 구현 파일: 승인된 9개 규칙·자산·예시, 릴리즈 개정 초안 3개; 아래 증거 digest로 식별
- 담당: 별도 구현 에이전트 implement_issue29; 독립 검토는 조정자 담당
- spec-it: 이번 변경에 새 정책 채택 없음

## 사용자 의도와 구현 결과

| AC | 기대 | 구현 위치 | 자기 확인·독립 검토 상태 |
| --- | --- | --- | --- |
| AC-01 | v버전 — 핵심 변화 제목 | release-notes 지시·3개 개정 초안 | 자기 시나리오 RED 제목 0/3; 최종 GREEN 3/3 |
| AC-02·03 | 요약·결과 분류·전환 분리 | release-notes, 공통 편집, agents-init 전후 예시, 3초안 | 결과·조건·승인·보존·한계 구별 확인; 독립 판정 대기 |
| AC-04·05 | 공개 범위 변경 선정·원문 보존 | [원문 보존 대조](release-preservation.md)·release-source.json·3초안 | 원문 body의 의미 있는 모든 행 대조; 공개 반영 미실행 |
| AC-06 | 목표·범위·관찰 AC·확인된 사실 구별 | issue-create·Issue 주석·기능/버그 예시 | RED 3/3 의미 보존·필드 분리; 최종 GREEN 3/3 |
| AC-07 | 설명 문장형 허용·제목/짧은 값/AC 명사형 | writing-conventions | Issue·릴리즈에 한정, 다른 소비자 목록 기준 유지 |

## 계획 대비 차이와 판단

- plan과 독립 기준은 커밋되지 않은 상태로 시작; 커밋 승인 대기 때문에 plan 선행 커밋 요건 이탈. 조정자가 구현 밖에서 review 기준·입력을 sha256으로 고정했다고 인계; 구현자는 원문·digest 내용을 열지 않음
- RED는 지시 변경 전에 HEAD e79013a 원문으로 새 실행자 3회 실행. 과거 RED 재구성 없음
- 최초 GREEN 1회 후 공개 검토 지적에 따라 SKILL 중복 규칙을 참조로 축소하고 복합 항목 예시·Markdown 간격·BUG 주석 보완; 해당 결과는 interim으로 보존하고 최종 지시에서 새 실행자 3회 재실행
- 조정자의 독립 baseline 출력 경향 설명 메시지 수신; 해당 출력·비공개 기대·기준은 구현과 자기 판정 근거로 사용하지 않음
- 공개 검토 지적과 조정자 사실 인계 사용: v0.3 원문의 #1/#2는 PR이 아닌 Issue. 조정자의 gh api 재조회(pull_request:null) 인계에 따라 Issue 링크로 정정, PR #3 유지
- 원문 보존표와 실행 증거 추가는 인계 근거; 역사적 문서·release-source.json·공개 Release·태그·manifest·main의 .github 변경 없음

## 시나리오 요청과 실행 근거

요청문은 [self-input](evidence/self-input.md)이다. 실행자에게 요청 사실과 대상 스킬·연결 참조만 제공하고 기대 결과·다른 실행 결과는 제공하지 않았다. 매 실행은 fresh 하위 에이전트이며, RED·GREEN 각각 같은 사실·조건의 세 요청(릴리즈·기능 Issue·버그 Issue) 수행이다. 각 실행자는 판정하지 않았고 구현자가 출력과 작성 요구를 대조했다.

| 단계 | 실행 주체 | 결과 | 근거 |
| --- | --- | --- | --- |
| RED | red1·red2·red3 | release 제목 형식 0/3; 사용자 결과·docs/refactor·전환/승인/검증 한계 보존 3/3; 기능·버그 필드/관찰 AC/재현 보존 3/3 | self-red-1..3.md; red-source-sha256 |
| interim GREEN | green1 | 후속 지시 변경으로 최종 통과 횟수에서 제외 | self-interim-green-1.md |
| 최종 GREEN | finalgreen1·finalgreen2·finalgreen3 | release 제목·선정·전환/승인/한계 보존 3/3; 기능·버그 구별·관찰 AC·재현 보존 3/3 | self-green-1..3.md; green-source-sha256 |

RED의 모든 의미 동작이 실패했다고 해석하지 않는다. 제목 형식과 명사형 설명 경향이 관찰됐고 기존 의미·AC 분리는 이미 보존됐다. 설명 문장형은 허용 규칙이며 모든 설명을 문장으로 강제하는 통과 기준은 아니다. 이 시나리오는 제한된 작성 입력의 반응이며 실제 호스트 자동 선택·원격 실행·모든 스킬 행동의 증거가 아니다.

## 검증 요약과 증거

| TC / AC | 기대 | 실제 | 명령·근거 |
| --- | --- | --- | --- |
| TC-01 / AC-01·02·03·07 | 릴리즈 RED·GREEN 각 fresh 3회 | RED 완료·최종 GREEN 3/3 | 위 시나리오와 evidence |
| TC-02 / AC-06·07 | 기능·버그 RED·GREEN 각 fresh 3회 | RED 완료·최종 GREEN 3/3 | 위 시나리오와 evidence |
| TC-03 / AC-04·05 | 원문 모든 의미 행·공개 구간 보존 | 대조 완료 | release-preservation.md; v0.3..v0.5, v0.5..v0.6 통합 이력 및 공개 스킬 diff 대조 |
| TC-F01 / AC-01..07 | 구조·회귀·공백 이상 없음 | 구조 통과·회귀 35/35·diff 이상 없음 | check-package.txt·package-tests.txt·diff-check.txt |
| TC-F02 / AC-01..07 | 시나리오·원문 의미 | 원문 대조 완료·최종 시나리오 3/3 | 자체 입력이며 조정자의 독립 고정 입력은 별도 |

실행 위치는 git-workflow의 구현 linked worktree, 환경은 macOS zsh·Node v23.11.0이다. 명령 시각·exit·출력은 evidence의 각 txt에 기록했다. 구조 검사는 의미·호스트 로딩을 검사하지 않는다고 출력한다. 새 구현을 따라 쓰는 테스트는 추가하지 않았다.

## 커밋과 문서 상태

- 구현·기록 미커밋; stage·commit·push·PR 없음
- [구현 patch](evidence/implementation.patch), [RED 소스](evidence/red-source-sha256.txt), [최종 GREEN 소스](evidence/green-source-sha256.txt); [최종 출력 digest](evidence/final-output-sha256.txt)로 9개 파일·3초안·source·보존표 식별. 실행 후 지시 소스 sha256 재대조 일치; 기록 문서·증거 자체는 순환 digest 방지를 위해 이 목록에서 제외
- 작업 문서는 로컬이며 확인된 원격 docs 링크 없음; 공개 Issue 링크 외 계획 링크 준비 중
- 릴리즈 초안의 검증 수·설치 사실은 release-source.json 당시 기록이며 이번 구현 검증과 구분

## 위험·전달·롤백과 다음 검토

- 공개 Release 수정은 검토·별도 승인 대기; 새 버전·태그·설치 없음
- 조정자는 고정 HEAD + patch/digest의 독립 검토와 고정 입력 검증 수행
- 커밋·push·PR·머지·공개 수정은 각각 남은 승인 범위
- 롤백은 이번 승인 파일의 개별 patch 역적용·다른 작업 보존; 실행 미실행

## 승인된 전달 준비

- 구현 커밋: dbe78c3ca30b0b7d3b7fc3aac74369d3bd86626e
- 사용자 결과·커밋·push·PR 생성 승인에 따라 원격 전달 준비
- 검토: [독립 검토](review.md), [사전 기준](review-criteria.md) 및 독립 실행 evidence 반입. 과거 미커밋 상태·이탈 기록은 당시 사실로 유지
- 기록 커밋은 계획·인계·검토·증거만 추가하며 작성 지시 9개 파일을 변경하지 않음
- PR 머지·Issue completed 종료는 실제 MERGED 확인 후 진행; 공개 Release 본문 반영은 별도 작업

- 전달용 패치는 승인된 작성 지시·예시 9개 파일의 무문맥 diff로 다시 내보냈다. 기준 e79013a→dbe78c3이며 적용 시 `git apply --unidiff-zero` 사용. 기존 실제 소스·시나리오 결과는 변경하지 않음


## 단계 03: PR 본문 작성 범위 확장

- Issue #29 / 기존 PR #30: 이번 단계의 원격 본문 반영·검토는 조정자 담당
- 읽기 순서: issue-snapshot → plan → task-03 → 기존 handoff, 필요한 원본 작성·실행 규칙
- 구현 담당: implement_pr_writing; review/issue-29·review/issue-29-pr-writing 및 review 기준·고정 입력 접근 없음
- 구현 커밋: 536549cbc3ddabf19199076692b45052933495aa, 기준 394e4e2cc9c565e8e585d16e95cd38d2b1fef1c0
- 변경: 승인된 PR 작성 SKILL·pr 참조·공통 문체·PR 템플릿·전후 예시의 5개 파일만 포함

### 결과와 보존

| AC | 결과·위치 | 확인·한계 |
| --- | --- | --- |
| AC-08 | 변경 후 동작을 먼저 쓰고 같은 결과의 커밋을 묶는 절차·SKILL 연결 | 작성 절차·공통 원문 기반 예시, 자기 시나리오 별도 |
| AC-09 | 현재 검토 HEAD의 결론·과거 통과·미검증·위험·다음 행동 구별 | 상세 이력은 handoff로 연결; 실행 근거·미검증 보존 |
| AC-10 | PR 설명 목록의 문장 허용·기존 절/Issue/승인 경계 유지 | 제목·짧은 표 값·AC·체크박스와 plan/task/review/commit 목록 명사형 유지 |

요약 3문장·바뀐 곳 30자 기준·선택 절 조건은 변경하지 않았다. 서버 동작·패키지 manifest·태그·설치·공개 Release는 변경 범위에 없다. 기존 단계 01/02 기록은 당시 이력으로 보존했다.

### 자기 시나리오의 입력과 실행

요청은 [pr-self-input](evidence/pr-self-input.md), 전달문과 대상 소스는 [실행 프로토콜](evidence/phase03-runner-protocol.md)이다. 실행자는 기대·다른 결과·숨긴 입력을 받지 않고 요청을 수행했다. 각 호출은 fork_turns=none의 fresh 하위 에이전트다. 구현자가 공개 AC·자기 요청 사실과 출력을 대조한다.

동시 실행자 한도 때문에 RED2·3 spawn이 거절됐다. RED1은 실제 변경 전에 실행했다. 나머지 RED2·3은 구현 후 `git archive 394e4e2 skills`의 스킬 전용 원본 복사본에서 실행했다. 동일 이전 지시를 확인했지만 변경 전 순서 요건 충족으로 소급하지 않는다. 원본 복사본은 skills만 포함하며 문서·review·비공개 입력을 포함하지 않는다.

공개 검토 지적을 받아 pr.md 예시 앞에 공통 원문 사실을 보완했다. 보완 전 GREEN1은 [interim 출력](evidence/pr-self-interim-green-1.md)으로 보존하고 최종 통과 횟수에서 제외했다. 최종 작성 소스는 구현 커밋 536549c로 동결했다.

### 기계 검사와 보존 확인

| TC | 기대 | 실제 | 근거 |
| --- | --- | --- | --- |
| TC-05 | 기존 절·Issue 연결·승인·명사형 소비자 보존 | 대조 통과; 요약 3문장·표 30자 유지 | [보존 대조](evidence/phase03-preservation-check.txt) |
| TC-F03 | 구조·회귀·공백 검사 통과 | 구조 통과·35/35·diff 이상 없음 | [구조](evidence/phase03-check-package.txt), [회귀](evidence/phase03-package-tests.txt), [공백](evidence/phase03-diff-check.txt) |

최종 기계 검사 대상은 536549c이며 작성 소스는 clean, task·plan·handoff·evidence만 후속 변경이다. 실행 위치는 git-workflow linked implementation worktree, macOS zsh·Node v23.11.0이며 상세 시각·exit·원문 출력은 evidence에 기록했다. 구조·회귀 검사는 의미·호스트 로딩·모든 상황의 작성 품질을 증명하지 않는다. 구현을 그대로 따라 쓰는 새 테스트는 추가하지 않았다.

### 전달 상태와 다음 검토

[구현 patch](evidence/phase03-implementation.patch)는 394e4e2→536549c의 승인 5파일 무문맥 diff다. 적용 시 `git apply --unidiff-zero`를 사용한다. hunk header 끝 공백만 제거했으며 추가 소스 행은 보존했다. [patch digest](evidence/phase03-patch-sha256.txt), [RED 소스 digest](evidence/pr-red-source-sha256.txt), [최종 GREEN 소스 digest](evidence/pr-green-source-sha256.txt)로 식별한다. 기록·evidence는 소스 digest에서 제외한다.

조정자는 독립 고정 입력 검증과 PR #30 실제 본문 반영을 담당한다. 구현자는 commit·push·PR 수정·머지·Issue 종료·공개 Release 수정 명령을 실행하지 않았다. 커밋은 조정자가 승인 범위에서 수행했다. 머지·Issue 종료·공개 Release 반영은 별도 확인 대상이다. 롤백은 이번 5파일 patch 개별 역적용이며 실행 미확인이다.


### 단계 03 최종 시나리오 결과

| 단계·실행 주체 | 대상 | 실제·근거 |
| --- | --- | --- |
| RED1 / pr_red1 | 변경 전 394e4e2 worktree | [원문](evidence/pr-self-red-1.md); 핵심 결과·검증 경계 보존 |
| RED2·3 / pr_red2·pr_red3 | 후시점의 394e4e2 skills-only archive | [RED2](evidence/pr-self-red-2.md), [RED3](evidence/pr-self-red-3.md); 핵심 결과·검증 경계 보존 |
| interim / pr_green1 | 공통 사실 보완 전 작업본 | 최종 횟수 제외; [원문](evidence/pr-self-interim-green-1.md) |
| GREEN1·2·3 / pr_final_green1·2·3 | 최종 구현 536549c | [GREEN1](evidence/pr-self-green-1.md), [GREEN2](evidence/pr-self-green-2.md), [GREEN3](evidence/pr-self-green-3.md); 요청 의미·상태 구분 3/3 보존 |

[자기 대조](evidence/phase03-self-assessment.md)에 사례별 기대와 실제를 기록했다. RED도 의미·현재/과거 검증·승인 경계를 3/3 보존했고 명사형 설명 목록 경향을 보였다. 최종 GREEN에서는 변경 후 동작 우선·관련 변경 묶음·설명 문장형·현재 검증 결론·다음 행동을 3/3 확인했다. 허용 규칙을 모든 목록의 문장형 강제로 해석하지 않는다. RED3의 테스트 파일 설명을 network 검사 관련으로 좁힌 추론은 별도 한계로 남겼다.

TC-04는 동일 이전·최종 지시의 fresh 실행 3회씩 완료했으나 변경 전 시간 순서 준수는 RED1의 1/3이다. 동시 실행 한도 해소 뒤 이전 소스에서 나머지를 실행한 계획 이탈이며 소급 RED·새 GREEN의 완전한 순서 준수로 표현하지 않는다. 구현 작업과 자기 대조는 완료했으며 독립 검토와 이 실행 순서 한계의 수용 여부는 조정자가 판단한다.

기록 파일까지 [공백 검사](evidence/phase03-record-diff-check.txt)로 추적/미추적 파일을 대조했다. 원문·소스 digest를 최종 재대조했고 작성 지시 5파일은 구현 커밋과 일치한다. 출력 digest는 phase03-final-output-sha256.txt로 식별한다.

조정자로부터 독립 RED/GREEN의 진행·집계 상태 메시지를 수신했다. 숨긴 입력·기준·출력 원문은 열지 않았고 이 집계는 구현 또는 자기 대조의 근거로 사용하지 않았다.
