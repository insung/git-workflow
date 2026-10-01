> 작업 이력 / Historical record: 당시 구현·검증 기록을 보존한다. 현재 실행 상태나 사용 예시가 아니다. 현재 사용 방식은 [README](../../../../README.ko.md)를 따른다.

# Issue 기반 Git 워크플로우 최소 설계

> 이전 후보의 기록이다. 현재 정본과 양식은 [전체 흐름](../../../../README.ko.md#사용-시나리오) 및 새 docs/git-workflows 계획·검증 기록을 따른다. 아래 이전 절차와 결과를 현재 실행 증거로 재사용하지 않는다.

## 목적과 성공 기준

사용자의 네 단계 메커니즘을 기존 문서형 git-workflow 플러그인에 반영한다. 현재 세션에서 직접 실행하고 별도 에이전트로 넘길 때도 동일한 입력·결과·승인 경계를 사용한다.

## 구성

- git-workflow: 기존 호출 이름을 유지하는 라우터와 공통 안전 경계
- issue-create: 변경 의도·영향 범위·달성 조건의 Issue 준비
- pr-create: Issue 기반 구현, docs 기록, 리뷰 가능한 PR 준비
- pr-review: diff 우선 spec-it 검토, 원래 의도 및 테스트 증거 검토
- pr-merge: 사용자 승인, 검토한 HEAD의 실제 머지, Wiki 작성·발행
- commit-rule: 기존 커밋 범위·메시지와 브랜치 기준
- git-release: 기존 태그·릴리즈·이력 기반 노트

스킬은 instruction이며 자동 scheduler나 범용 정책 validator가 아니다. 공통 참조는 기존 skills/git-workflow/references/에 남기며 단계 스킬에서 명시 링크로 읽는다. 템플릿은 해당 단계의 templates/에 둔다.

## 입력과 기록

모든 변경 작업은 GitHub Issue에서 시작한다. 원격 접근이 안 되는 로컬 파일럿만 docs/issues/의 local-draft를 허용하며 번호·URL을 지어내지 않는다. 원격 PR을 만들기 전 실제 Issue와 연결한다. 개념 질문이나 이력 조회만으로 Issue 생성이나 변경을 시작하지 않는다. 기존 변경의 사후 진입은 late-entry로 표시한다.

대상 리포 docs/에 계획·중요 판단·인계·검증 요약을 기록한다. raw 로그·토큰·인증 파일은 기록하지 않는다. 기존 문서 구조를 우선하며 임시 로그는 문서와 구분한다.

## 검토와 종료

리뷰 기준은 대상 리포가 채택한 manifest/lock과 pinned rule source이다. 정책을 복사하거나 최신으로 자동 갱신하지 않는다. 없으면 shadow assessment/human-review이다. 변경 동작은 유닛 테스트 유무, 사례별 기대/실제 결과, 명령·실행 commit·환경을 요구하고 부족하면 human-review로 남긴다. 문서 전용 변경은 테스트 제외 이유와 대체 검사를 기록한다. AI 내부 설명의 일관성만으로 원래 목적을 충족했다고 하지 않는다.

머지 승인은 PR과 검토 HEAD에 묶는다. HEAD 변경 시 재검토하고 새 승인을 받는다. fail/human-review는 해결이나 명시적 인간 결정 전 머지하지 않는다. 승인된 머지·Wiki 발행 범위가 이미 있으면 다시 묻지 않는다. 실제 merged 상태와 merge commit을 확인한 뒤 기능 Wiki 초안을 만들고 승인된 범위에서 게시한다. Wiki가 비활성화되거나 접근 불가이면 docs/wiki/ 초안과 미발행 상태를 남기고 별도 권한 없이 설정을 켜지 않는다. merged commit부터 Wiki 인계까지 출처를 기록한다.

## 제약

- 외부 패키지 의존성 추가 없음; 검사기는 Node.js 18 이상과 built-in 모듈 사용
- 공통 스킬·문서에 머신 절대경로·개인 인증 정보 기록 금지
- 기존 무관한 변경·staged 상태 보존; commit/push/원격 게시를 자동 실행하지 않음
- 플러그인 후보 버전 0.2.0; 기존 진입 이름 git-workflow 유지
- docs의 패키지 검사는 의미 검토나 실제 런타임 합격 증명이 아님
