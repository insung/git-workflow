# 01 발행 패키지

계획: [plan](plan.md). AC-01·02 담당.

| 작업 | 대상 | 완료 | 처리 내용 |
| --- | --- | --- | --- |
| 버전 갱신 | plugin.json·.claude-plugin/plugin.json·.codex-plugin/plugin.json 0.7.0 | [x] | 세 JSON 0.7.0 동일성 확인; 미커밋 digest 기록 |
| 노트 작성 | CHANGELOG.md 0.7.0 추가·이 디렉토리 release-notes.md | [x] | PR30 사용자 결과·전환·원문 한계 대조 완료 |
| 검증·인계 | 구조·기존35테스트·diff·원문대조, handoff.md | [x] | 구조·35/35·diff 통과; skills45파일 HEAD byte 보존; handoff 작성 |

PR30 근거는 docs/git-workflows/2026-10/05_29_readable-release-issues의 공개 plan/task/handoff/review만 읽는다. 이전 태그 e79013a부터 이번 f0ce36a까지 사용자 영향은 PR30 한 건이다. 결과 중심 작성·복합 항목 편집·Issue/PR 템플릿 안내·완결된 설명 문장 허용·메타데이터 명사형 보존·과거노트는 초안만·실행순서warn·호스트재설치/새세션 필요를 보존한다. 기존 스킬 동작을 추가 변경하지 않는다. 제목은 v0.7.0 — 릴리즈·Issue·PR 작성 기준 통일. 검증 전 성공 주장 금지. 구현자는 커밋/push/발행/설치를 하지 않고 조정자에게 인계한다. review/issue-31·검토 기준/입력 파일 읽기 금지.


## 검증 결과

| TC | AC | 결과 |
| --- | --- | --- |
| TC-01 | AC-01 | 0.7.0 동일성·패키지 구조·35/35·diff 통과. HEAD eb68afd와 미커밋 패키지 digest 기준, [실행 요약](task-01-release-package.md#실행-결과-요약) |
| TC-02 | AC-02 | PR30 공개 기록·실제 작성 지시 대조 완료; 공개 v0.6.0 이후 PR30만 선정, warn·실행순서·초안·설치 한계 보존. [실행 요약](task-01-release-package.md#실행-결과-요약) |

단계02의 TC-03·04는 발행·설치 전 대기·미실행이다. 기존 skills 지시 변경이 없어 새 모델 RED/GREEN은 해당 없음이다. commit·push·발행·설치는 조정자가 담당한다.

## 실행 결과 요약

eb68afd 기반 패키지의 세 버전0.7.0·회귀35/35·구조·공백 검사와 기존skills45파일 바이트 보존 확인(2026-10-05, macOS/Node v23.11.0). 공개v0.6.0=e79013a 이후PR30 결과만 선정. 당시 발행·두 호스트 설치는 대기이며 준비 pass가 배포 완료를 뜻하지 않음.

당시 명령은 저장소 루트의 `node --test tests/package.test.mjs`, `node scripts/check-package.mjs`, `git diff --check`를 중심으로 실행했다. 추가 명령·대상 작업본·실행 시각은 plan의 정리 전 기록에서 확인한다. 현재 HEAD의 재검증 결과로 사용하지 않는다.
