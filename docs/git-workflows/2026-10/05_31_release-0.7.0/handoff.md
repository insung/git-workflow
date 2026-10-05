# 구현과 PR 리뷰 인계

- Issue: https://github.com/insung/git-workflow/issues/31; PR 미생성
- Plan / Task: [plan](plan.md), [01](task-01-release-package.md); 단계 01 완료·단계 02 대기
- base / HEAD: eb68afd7441364dbacccd1130be8c9bed0538731; 브랜치 codex/release-0.7.0
- 실제 실행 담당: 별도 구현 에이전트 prepare_v070; 독립 검토 미판정
- spec-it: 새 정책 채택 없음

## 사용자 의도와 구현 결과

| AC | 기대 | 구현 경로 | 실제·미확인 |
| --- | --- | --- | --- |
| AC-01 | 세 manifest 0.7.0·최상단 CHANGELOG | plugin.json·.claude-plugin/plugin.json·.codex-plugin/plugin.json·CHANGELOG.md | 갱신·TC-01 통과 |
| AC-02 | 범위와 원문 의미 보존 | [발행 노트](release-notes.md) | PR30 결과·전환·한계 대조 완료; 독립 검토 대기 |
| AC-03 | 검증된 merge commit·공개 v0.7.0 일치 | 조정자의 단계02 | 발행 전 대기·미실행 |
| AC-04 | 두 호스트 installed/enabled 0.7.0·캐시 일치 | 조정자의 단계02 | 설치 전 대기·미실행 |

## 계획 대비 차이와 판단

- 사용자 영향 범위: 공개 v0.6.0=e79013a65dae27898a88f7c29032fb81d48b3edd 이후 PR30=f0ce36a; eb68afd는 이번 발행 계획 기록만 추가
- 원문 대조: PR30의 공개 handoff·review·phase03-review와 실제 작성 지시 diff; 비공개 review/issue-31·검토 기준·입력 내용 미열람
- 보존 정보: 결과 중심 분류·복합 항목 편집·원문 대조·Issue/PR 템플릿 안내·설명 문장형 허용·명사형 메타데이터·승인 경계
- 전환·한계: 두 호스트 재설치·새 세션 필요, 이미 설치한 프로젝트 템플릿 자동 갱신 없음, 과거 Release 개정은 초안만 포함, 기존 warn·RED 후시점 실행·당시 설치/호스트 호출/공개 반영 미실행 보존
- 기존 skills 지시·references·assets 변경 없음. 새 모델 RED/GREEN과 구현을 따라 쓰는 새 테스트 제외
- plan 범위 이탈 없음

## 검증 요약과 증거

| TC / AC | 기대 | 실제·상태 | 명령·위치 | 대상·환경·시각 |
| --- | --- | --- | --- | --- |
| TC-01 / AC-01 | 세 버전 0.7.0·구조·35/35·공백 | 0.7.0 동일·구조 통과·35/35·exit0 | node scripts/check-package.mjs; node --test tests/package.test.mjs; git diff --check; git-workflow linked 구현 worktree | HEAD eb68afd + [패키지 digest](evidence/package-source-sha256.txt); macOS zsh·Node v23.11.0; 2026-10-05T12:23:50Z |
| TC-01 유지 | 기존 스킬 전체 바이트 보존 | skills 추적45파일 45/45 HEAD byte 일치, 새 미추적 skills 0 | git ls-tree -r -z HEAD skills + git cat-file blob와 작업본 read_bytes 대조 | 같은 HEAD·환경·시각 |
| TC-02 / AC-02 | 공개 범위·원문 의미 보존 | 공개 v0.6.0 이후 PR30만 선정·결과별 수동 대조 완료 | git log e79013a..eb68afd; 승인 작성 지시 diff·공개 handoff/review/phase03-review | e79013a→f0ce36a; 자기 확인, 독립 판정 대기 |
| TC-03 / AC-03 | tag·Release·merge commit 일치 | 발행 전 대기·미실행 | 단계02 조정자 담당 | 원격 검증 미실행 |
| TC-04 / AC-04 | 두 호스트 버전·활성·cache 일치 | 설치 전 대기·미실행 | 단계02 조정자 담당 | 호스트 검증 미실행 |

[실제 출력](evidence/verification.txt)에 명령·exit·35개 테스트 결과를 보존했다. 초기 패키지 검사는 아직 생성하지 않은 handoff.md 링크 때문에 exit1이었다. 인계 파일 생성 후 재실행 통과. 새 테스트는 추가하지 않았으며 구조·회귀 검사로 문장 품질·발행·설치·모델 자동 호출을 증명하지 않는다. 검증 후 문서 결과 기록만 갱신했고 기존 skills 소스는 동일하다.

## 커밋과 문서 상태

- 미커밋 패키지: 세 manifest·CHANGELOG.md·release-notes.md
- 미커밋 기록: plan.md·task-01-release-package.md·handoff.md·evidence
- commit·push·PR·머지·태그·Release·두 호스트 설치 미실행; 조정자 담당
- 현재 기록은 로컬 파일이며 원격 문서 링크 미확인

## 위험·배포·롤백

사용자의 발행·재설치 승인은 조정자에게 인계됐다. 독립 검토 뒤 버전 PR 머지→annotated tag push→GitHub Release→두 호스트 설치→원격·캐시 재조회 순서로 진행한다. 기존 캐시·과거 Release·태그·다른 설정 보존. 발행 이후 태그 이동·삭제 대신 별도 수정 릴리즈 적용. 실제 모델 자동 호출은 별도 미검증이다.

## 다음 검토

조정자는 eb68afd 기반의 미커밋 패키지를 독립 검토한다. 패키지 검사·기존 35개 테스트·diff check를 재현하고 원격 발행·설치 증거를 단계02에 추가한다. 구현 완료를 발행·설치 완료로 표현하지 않는다.
