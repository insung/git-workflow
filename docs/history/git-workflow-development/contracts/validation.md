> 작업 이력 / Historical record: 당시 구현·검증 기록을 보존한다. 현재 실행 상태나 사용 예시가 아니다. 현재 사용 방식은 [README](../../../../README.ko.md)를 따른다.

# 로컬 후보 검증 기록

2026-10-01, feat/issue-review-workflow의 미커밋 작업본. 기준 HEAD는 4b75582d3a3ea82c6e473ec01c435afb3bc58f00이며 실제 검토는 작업본 diff와 신규 파일을 포함한다. 아직 커밋/원격 발행/설치 갱신은 없다.

## 시나리오 관찰

별도 읽기 전용 에이전트가 이전 계약과 새 계약을 같은 입력에 적용했다. 지시의 가상 다음 행동을 관찰했으며 실제 원격 실행이나 장기 준수/정책 정확도 실험은 아니다.

| 입력 | 이전 누락 또는 기존 보호 | 새 지시 적용 결과 |
| --- | --- | --- |
| 긴급 PR, Issue 없음 | 날짜 경로·의도 슬롯·단위 todo·검증/배포 계획 부족 | Issue 조사, plan/todo의 필수 칸, 미확정 단위 blocked, 원격 PR 전 실제 Issue |
| completed todo, test H0, 현재 H1 | HEAD 보호는 있었으나 todo/commit 연결 부족 | 행동 체크와 검증 분리, H0 이력 보존, H1 재검증·human-review |
| 누락 라벨, 권한 없음 | 생성/실패 처리 계약 부족 | create/force 미실행, 기존 라벨 대안·미적용 사유, 자동화 필수면 초안 |
| untracked 문서, 전문 복사로 빨리 PR | 링크 접근·원격 commit 확인 계약 부족 | 요약+링크 준비 중, 전문 복사 없음, 미승인 push 없음 |
| 읽기 전용 계획 개선, 이후 commit 요청 | 문서 변경 경계 암묵적 | 무수정 검토, 이후 실제 diff·승인 범위만 commit, push로 확대 없음 |
| 검토/승인 A, 실제 B, auto-merge exit 0 | 이미 HEAD·실제 머지 확인 보호 | 기존 보호 유지, 배포 상태도 별도 |
| 릴리즈 type만으로 판정 | 이미 실제 영향/범위 조사 | 기존 보호 유지, release-drafter 설정 단정 제거 |

가상 출력에서 plan의 사용자 의도·AC-01↔01/TC-01, todo의 H0 과거 결과와 H1 not-run, review의 human-review, 원격 요약의 링크 대기/누락 라벨 사유가 구분되었다. 구현된 양식이 진짜 업무에서 매번 지켜진다는 보장은 아니다.

## 검사기 RED

새 7개 스킬과 reference 양식 fixture에 이전 검사기를 적용해 10개 중 5개 실패했다. 실패는 이전 이름 요구·새 누락 경로 미검출이었다. 새 정본 이름과 필수 reference 계약으로 검사기를 갱신한다.

## 판단과 실행 범위

- 최신 본문의 skills/git-workflow/references 경로를 이전 코멘트의 루트 references 제안보다 우선했다. 공통 규칙 정본은 하나만 둔다.
- 별도 구현 스킬을 늘리지 않고 git-workflow가 plan/todo 구현을 조율하며 pr-create는 구현 후 PR을 담당한다.
- 최초 구현에서는 Sideband 파일 경로 이관을 도구가 지원하지 않아 댓글이 있는 옛 파일 두 개를 짧은 호환 안내로 남겼다. 아래 후속 요청에 따라 이 결정을 변경하고 삭제했다. 잘못된 중복 규칙을 유지하는 대신 정본으로 연결한다.
- .superpowers/ 추적 파일은 없으며 임시 실행 기록만 무시한다. 공유 문서와 결정은 docs/에 보존한다.
- GitHub 계정 전환 실패로 실제 Issue/PR/라벨 생성·게시를 수행하지 않았다. 권한 있는 대상 리포의 향후 실행 지침만 구현했다.
- 플러그인 후보 0.2.0을 유지한다. 실제 발행 시 최종 버전 확정·원격·캐시·새 세션 로딩 검증이 필요하다.

## 이전 실행 증거: 후속 스킬 보완 전

2026-10-01 16:05 KST, Node.js 로컬 환경에서 아래 결과를 확인했다. 코드·패키지 소스 35개 파일의 SHA-256 identity는 `e8873a0510a0dc5dbcd60220892dc1a4191422906dfc9b197424b304b9ef31e9`다. 범위는 skills/·scripts/·tests/·README·manifest·.gitignore·docs/workflow.md이며 이 검증 문서와 계획/todo의 후속 완료 기록은 제외한다. unit fixture 검사는 원격/모델 실행이 아니다.

| 검사 | 실제 결과 | 증명하는 범위 |
| --- | --- | --- |
| node --test tests/package.test.mjs | 10/10 pass, exit 0 | 정상 패키지·누락 단계/plan/labels·이름/버전·상대 링크·discovery 경로·잘못된 JSON 처리 |
| node scripts/check-package.mjs | exit 0 | 현재 문서와 새 파일을 포함한 정본/상대 링크 구조 |
| claude plugin validate .claude-plugin/plugin.json | 통과 | plugin manifest 구조 |
| claude plugin validate .claude-plugin/marketplace.json | 통과 | marketplace 구조 |
| git diff --check | exit 0 | tracked diff의 공백 오류 |
| git ls-files .superpowers | 출력 없음 | 기존 추적 파일 없음 |
| git check-ignore -v .superpowers/sdd/plan/progress.md | .gitignore:6 적용 | 루트 .superpowers/ ignore |
| Sideband list·reanchor·reply·재조회 | 3개 open, anchor resolved, 마지막 답변 Codex | 공식 도구로 댓글 위치 보존과 답변; 작성자의 종료 상태는 유지 |

## 최종 리뷰와 수정

독립 최종 리뷰는 Critical 0, Important 0, Minor 1을 보고했다. 설계 문서가 임시 호환 파일을 정식 commit-rule 경로로 잘못 적은 문제다. 잘못된 정리 작업에서 정식 스킬을 삭제할 수 있으므로 실행자는 효과 기준으로 Important로 보고, 실제 임시 경로 git-commit만 제거 후보이며 commit-rule은 유지한다고 수정했다. 수정 전/후 문구를 확인했고 실제 삭제는 실행하지 않았다. 이 문서 수정에는 구현을 그대로 복사하는 새 unit test를 만들지 않았으며 기존 필수 스킬 누락 거부 테스트와 전체 10/10·패키지·diff 검사를 다시 통과했다. 남은 지적은 없다.

최종 리뷰가 판단하지 않은 실제 호스트 discovery·설치, 원격 Issue/PR/라벨/머지/Wiki 실행, spec-it 의미 판정 정확도, 장기 모델 준수는 이번 결과에서도 미확인이다. 공유 todo의 verified는 로컬 계약·구조·지시 시나리오 검증 범위이며 실제 외부 기능 실행 완료가 아니다.

현재 브랜치와 작업본을 유지했다. 커밋·push·발행은 없으며 설치된 플러그인과 spec-it·참고 track 원본은 수정하지 않았다.

## 후속 검증: skill-creator와 새 Sideband 코멘트

2026-10-01T16:48:17+09:00, 같은 브랜치의 미커밋 작업본. 이전 시나리오 관찰과 독립 리뷰는 변경 전 기록이며 이번 보완에 새로 실행한 독립 모델 검증으로 주장하지 않는다. 이번 소스 35개 파일의 SHA-256 identity는 `07e68e5a314687eb2e6fd3b47f41a8241d72cf99737638b1a4f18dcd6f352fff`다. 범위는 skills/·scripts/·tests/·README·manifest·.gitignore·workflow/local-pilot 안내이며 이 검증 문서와 계획의 후속 기록은 제외한다.

- 정식 스킬 8개: git-workflow, issue-create, plan-create, pr-create, pr-review, pr-merge, commit-rule, git-release
- description에 한글 적용 요청을 명시하고 본문에 사용 조건 추가. 지원되지 않는 triggers YAML 키나 명시 호출 전용 설정은 추가하지 않음
- issue-create는 Issue 작성·보완, plan-create는 plan/todo 생성·보완으로 분리. plan/todo 정본을 plan-create/references/로 이동
- 계획 경로는 실제 Issue 번호 확인 후 확정. 생성 전 번호 예측 금지, 원격 불가 파일럿은 draft 경로와 null 번호 사용
- plan 메타데이터는 프런트매터, todo는 구체 작업·하위 task·검증 중심. 상세 사례별 실행 근거는 handoff에 기록하고 링크로 연결
- 이동된 옛 issue 참조·git-commit 안내 파일 삭제. 기존 이력 문서의 당시 결과는 보존

| 검사 | 실제 결과 | 범위 |
| --- | --- | --- |
| skill-creator quick_validate.py, 모든 SKILL.md | 8/8 valid, exit 0 | YAML 프런트매터·이름·기본 형식 |
| description·본문·라우팅 표 직접 대조 | 8개 적용 요청·출력·다음 단계 확인 | 지시 내용 검토; 실제 자동 선택 실험 아님 |
| 새 plan 경로 fixture에 이전 검사기 적용 | 10개 중 3개 실패 | 이전 plan 참조 요구·이동된 form 누락 미검출 확인 |
| node --test tests/package.test.mjs, 검사기 갱신 후 | 10/10 pass, exit 0 | 필수 스킬·새 참조·누락·manifest·로컬 링크 검사 |
| node scripts/check-package.mjs | exit 0 | 현재 새 파일 포함 패키지 구조·정본·상대 링크 |
| claude plugin validate, plugin/marketplace | 각 통과 | manifest 구조 |
| git diff --check | exit 0 | tracked diff 공백 오류 |
| git check-ignore .superpowers/example.md | 해당 경로 출력 | 임시 자료 ignore 유지 |
| Sideband 공식 reanchor·reply·재조회 | 14개 최신 답변 Codex; 8 resolved, 6 missing-file | 답변 이벤트 보존, 사용자 종료 상태 유지 |

Sideband는 파일 경로 변경을 지원하지 않는다. 이동 전 plan/todo에 답변하고 앵커를 확인했으나 파일 이동 후 그 6개 앵커는 missing-file이다. 안내 파일을 남기지 말라는 후속 요청을 우선하여 원본 경로에 복사본·별칭을 남기지 않았다.

새 세션의 자동 스킬 선택과 설치 로딩, 실제 Issue/PR/Wiki·원격 발행, spec-it 의미 판정 정확도는 이번 구조 검사로 확인되지 않았다. 로컬 시험은 명시적 소스 파일 경로로 수행한다. 커밋·push·설치 캐시 변경·유료 API 실행은 없다.

## 후속 검증: 실제 Issue 연결과 범위 검토

2026-10-01T17:40:19+09:00, 같은 브랜치의 미커밋 작업본. 소스 38개 파일의 SHA-256 identity는 `6a87157588c63321923b77bac8ea0f1e306c9e70a6e922eac38d9b2357cc4b55`다. 범위는 이전 후속 검증과 같으며 추가한 Issue 연결 계약·기능/버그 템플릿을 포함한다. 이 문서와 후속 계획 기록은 제외한다.

- PR 생성 전과 머지 전의 실제 Issue 연결 검사 정본은 skills/git-workflow/references/issue-link.md 한 곳이다. 각각의 SKILL.md에서 필수 읽기와 보류 조건을 명시하고 PR 본문 양식에 Issue 항목을 추가했다.
- 같은 저장소·다른 저장소·전체 URL과 PR base 저장소 기준 해석, API의 pull_request 키 구분, 의도/영향/AC·리뷰 결과 대조, closed 관계 확인을 지시에서 대조했다. 실제 원격 API 실행 결과는 아니다.
- 기존 staged 변경 존재와 작성자 판단을 분리했다. 출처 불명도 scope 읽기 조건이며 확인 전 index 덮어쓰기와 자동 포함을 금지한다.
- 메시지·범위·분리 검토는 commit-rule, 코드 동작·의도·정책·테스트 검토는 pr-review로 구분했다. 커밋 Refs는 선택이며 PR 본문의 Issue는 필수다.
- 기능·버그 Issue 템플릿을 별도 파일로 추출했다. plan의 issue는 따옴표로 감싼 한 값 또는 null로 단순화했고 관리 필드를 제거했다. status enum은 plan 정본 한 곳에서 정의하고 원격 접근 회복 시 Issue 재사용/생성·실제 번호 확인·문서 경로 갱신을 명시했다.
- 문서 전수 검색 후 불필요한 소개·비교 내용을 제거했다. 설치 명령의 실제 저장소 좌표만 유지했으며 .comments 이벤트와 패키지 메타데이터는 수정 대상 문서와 구분했다.

| 검사 | 실제 결과 | 범위 |
| --- | --- | --- |
| skill-creator quick_validate.py, 모든 SKILL.md | 8/8 valid, exit 0 | 프런트매터·이름·기본 형식 |
| plan 양식의 YAML 파싱 | 통과 | issue 문자열 보존, issue/status/baseline 필드만 존재 |
| node --test tests/package.test.mjs | 13/13 pass, exit 0 | 기존 구조 검사와 새 연결 계약·두 템플릿의 누락 거부 |
| node scripts/check-package.mjs | exit 0 | 현재 정본·상대 링크·manifest 구조 |
| claude plugin validate, plugin/marketplace | 각 통과 | manifest 구조 |
| git diff --check | exit 0 | tracked diff 공백 오류 |
| Sideband 공식 도구 답변·재조회 | 새 5개 답변 확인 | 정상 경로 댓글 앵커와 답변 |
| 이전 경로 plan의 새 댓글 5개 | 현재 정본에 모두 반영; 직접 답변 미실행 | missing-file 스레드에 답변하는 동작은 도구가 허용하지 않음 |

답변을 추가하지 못한 스레드는 7a673ca2-b898-4cad-9aaf-5fe15831f9b2, 8063d878-0119-4c39-81f9-a2eccae862b0, 21652b35-17de-4d93-9298-5fc840e4e011, 7ab03fb0-79ab-4a75-aedc-1333ab7ad2b1, 50af0aab-ee27-4f53-b51e-7d7a33f0595e다. 이동된 경로에 파일을 복원하거나 댓글 JSONL을 직접 수정하지 않았다.

구조 검사와 지시 대조는 모델의 자동 선택·실제 Issue 의미 판단·머지 실행을 증명하지 않는다. 시험용 가상 입력은 docs/examples/python-version-upgrade/local-pilot.md에 추가했다. GitHub 계정 전환은 인증 문제로 실패하여 성공으로 주장하지 않는다. 실제 원격 조회·Issue/PR 생성·머지·커밋·push·발행·설치 캐시 변경은 수행하지 않았다.

## 후속 검증: 브랜치 전략과 정본 정리

2026-10-01T23:30:46+09:00, 기준 HEAD `e16b11391384105ef8ccfbebaeace2834ffe59ed`의 작업본을 확인했다. 이전 작업은 현재 HEAD에 들어 있으며 이번에는 그 위의 로컬 수정과 신규 스킬·이동 파일을 검증했다. 이전 실행 증거는 당시 결과로 유지한다.

- branch-strategy를 분리하고 dev 개발·통합, prod 운영 배포, feature의 dev 분기/머지, dev에서 prod로 배포 대상 반영을 기록했다. hotfix는 기본적으로 prod에서 분기해 prod 반영·배포 후 dev에 역반영한다. 릴리즈 대상 커밋에 태그와 릴리즈를 남긴다. 실제 브랜치·배포 설정은 바꾸지 않았다.
- 공통 실행 경계는 execution-boundaries.md에, 문서 경로는 plan reference에만 정의했다. 개별 단계는 라우터 전체를 읽지 않고 해당 reference를 읽는다. 실제 런타임 토큰 사용량은 측정하지 않았다.
- 작업 문서를 draft 경로로 옮기고 문서 링크를 갱신했다. README의 산출물 목록에 wiki.md를 추가했다.
- 설치되지 않은 spec-it 스킬은 프로젝트의 고정 정책 소스에서 직접 읽을 수 있다. 설치와 소스가 모두 없으면 일반 영향 조사는 계속하고 미확인 정책 검사를 human-review로 반환한다. 설치 성공·정책 준수는 주장하지 않았다.
- PR의 검증 상태는 필수 요약이며 확인 절은 선택 상세 재현이다. 예시 브랜치와 제목을 같은 주제로 맞췄다. README의 설명·예시는 영어로 통일했다.

| 검사 | 실제 결과 | 한계 |
| --- | --- | --- |
| skill-creator quick_validate.py | 9/9 valid | 프런트매터·이름·형식; 자동 선택 실험 아님 |
| node --test tests/package.test.mjs | 16/16 pass | 필수 정본·새 스킬 누락과 기존 패키지 구조 검사 |
| node scripts/check-package.mjs | exit 0 | 실제 파일·manifest·로컬 링크 구조 |
| claude plugin validate plugin/marketplace | 각각 통과 | manifest 구조 |
| git diff --check | exit 0 | tracked diff 공백 오류 |
| Sideband 공식 reanchor·reply·재조회 | 새 5개 답변; 바뀐 기존 앵커도 재연결 | 사용자만 스레드를 종료함 |

기존의 이동 전 plan 경로 5개 댓글은 내용이 정본에 반영되어 있으나 missing-file 때문에 추가 답변을 하지 않았다. 댓글 이벤트를 직접 수정하거나 옛 파일을 복원하지 않았다. 사용자에게 커밋을 요청받지 않았으므로 .comments를 stage하거나 미해결 스레드 포함 여부를 질문하지 않았다. 실제 원격 조회·커밋·push·브랜치 조작·설치 캐시 변경은 없다.

## 후속 검증: Wiki 기능 보류

Sideband 요청에 따라 pr-merge의 Wiki 트리거·작성·게시 절차와 전용 reference를 제거했다. README·워크플로우 흐름도·라우터·계획 양식·패키지 필수 파일 목록을 승인된 PR 머지 범위에 맞췄다. 위의 Wiki 관련 기록은 이전 구현 상태이며, 현재 Wiki 작성은 추후 별도 스킬 작업으로 보류한다.

- node --test tests/package.test.mjs: 16/16 pass.
- node scripts/check-package.mjs: 구조·manifest·로컬 링크 검사 통과.
- skill-creator quick_validate.py: 변경한 pr-merge와 git-workflow 모두 valid. 자동 선택·실제 머지 실행 검증은 아니다.
- git diff --check: 통과.
- 실제 Issue 연결, 검토·승인 HEAD 일치, 사용자 머지 승인과 실제 MERGED 상태 확인 조건은 유지했다.
