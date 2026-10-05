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
