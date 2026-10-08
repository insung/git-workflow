---
name: issue-create
description: '“이슈를 만들어줘”, “이슈 본문을 보완해줘”, “같은 내용의 이슈가 이미 있는지 확인해줘”, “Issue #12의 계획을 작성·보완해줘”, “독립 작업으로 나눠줘”처럼 Issue 작성·중복 확인·계획·작업 분해를 요청할 때 사용한다. 단순 Issue 목록 조회나 구현 자체에는 쓰지 않는다.'
---

# Issue 작성·계획·작업 분해

## 읽을 기준

[공통 실행 경계](../git-workflow/references/execution-boundaries.md)를 적용한다.
제목은 [change-conventions](../git-workflow/references/change-conventions.md), 기록은 [writing-conventions](../git-workflow/references/writing-conventions.md), 라벨은 [labels](../git-workflow/references/labels.md), 외부 기록은 [document-links](../git-workflow/references/document-links.md)를 읽는다.
목표 버전과 마일스톤은 [공통 마일스톤 절차](../git-workflow/references/milestones.md)를 적용한다. 저장소 기준과 목표가 정해졌으면 생성 시 연결하고, 미정이면 임의 지정하지 않는다. 기존 마일스톤 재사용·승인된 누락 생성·기존 연결 보존·응답 불명 시 재조회와 연결 실패만 재시도를 따른다.

릴리즈 중 추가 작업은 [릴리즈 기록 기준](../git-release/references/release-context.md#릴리즈-중-추가-작업)의 같은 Issue 기록·분리와 요청별 출처 연결을 적용한다.

## Issue 확인·작성

1. 변경 크기와 관계없이 기존 Issue의 의도·영향 범위·달성 조건(AC)을 현재 요청과 대조한다.
   열린 동일 해결 범위 Issue는 재사용한다.
   닫힌 Issue의 기존 결과 확인·보완은 그 범위 안에서 다루되, 다른 후속 범위는 새 Issue로 추적한다.
   새 Issue에 이전 Issue/PR을 배경 링크로 연결하고 새 의도·범위·AC와 검증을 기록한다.
   작은 변경이라는 이유로 닫힌 Issue의 AC를 확장하거나 임의 재오픈하지 않는다.
   결과 코멘트만으로 새 요구사항의 AC·검증을 대체하지 않는다.
   없다면 [Issue 상세·양식](references/issue.md)으로 의도·영향/제외 범위·검증 가능한 달성 조건을 작성한다.
   코드·문서에서 알 수 있는 것은 조사하고 인간 결정만 질문한다.
   제시 전 [본문 작성·편집 순서](references/issue.md#본문-작성편집-순서)로 목표·범위·AC·확인된 사실·링크를 구별하고 원문 의미를 대조한다.
2. 생성이 요청 범위에 있고 접근 가능하면 본문 파일로 Issue를 만들고 URL/번호를 확인한다.
   인증 불가인 로컬 파일럿만 local-draft를 허용한다.
   일반 원격 PR 전에는 실제 Issue가 필요하다. [순수 릴리즈 준비 예외](../git-release/references/release-context.md#issue-없는-릴리즈와-준비-pr)는 별도 조건·대체 기록을 적용하며 이슈 생성을 강제하지 않는다.
3. 실제 URL/번호·본문·라벨과 assignee login, 실제 마일스톤 연결 또는 미지정 사유를 재확인한다.
   생성 응답이 불명확하면 먼저 조회하여 중복 생성을 피한다.
   Issue가 존재하더라도 의도·영향 범위·달성 조건이 부족하면 보완한다.
4. 원문·계획·참고 링크 절은 필수이며 정보가 없으면 미확인/미작성 상태를 표시한다. 최초 요청과 후속 주석·확장·승인은 사용자가 실제 말한 문구와 선택한 설명의 맥락을 함께 보존한다. AI의 해석·제안·결정을 원문으로 만들지 않는다.
   Issue 작성만 요청된 경우 계획이나 구현을 자동 시작하지 않는다. 하위 Issue도 자동 생성하지 않는다. 사용자는 스킬명이나 내부 단계 구분을 외울 필요가 없으며 AI가 원하는 결과와 승인 범위에서 필요한 절차를 선택한다.

## 계획 작성·보완

1. 실제 Issue의 요청 원문·목표·영향 범위·제약·AC를 읽고 원문과 현재 범위를 대조한다. 부족한 사실은 조사하고 사람이 정해야 할 결정만 확인한다. 기존 Issue의 계획 요청은 새 Issue 생성 없이 현재 Issue를 보완한다.
2. [Issue 안의 계획](references/plan.md#issue-안의-계획)에 구현 방향·중요한 이유·AC별 검증·전달/배포/롤백을 필요한 만큼 쓴다. 사실·제안·사용자 결정·미확인·보류를 구별하며 신규 plan/task/handoff/review 작업 기록 파일을 만들지 않는다.
3. 기본은 Issue 하나다. [분리 판단](references/plan.md#sub-issue-분리-판단)의 독립 완료·검증과 별도 추적 필요를 모두 확인할 때만 분리 단위·이유·부모 AC 대응을 제시한다. 복잡성·단계·파일·기존 task 수만으로 나누지 않는다. [Sub-issue 절차](references/sub-issues.md)에 따라 작업 분해·생성까지 승인된 범위만 생성·연결·재조회한다. 계획만 요청됐으면 구성 초안을 반환하고 구현하거나 자식을 자동 생성하지 않는다.
4. 구현 전 AC별 판정 기준을 준비한다. 별도 고정 입력이 필요할 때만 [검토 기준·입력](../git-workflow/references/review-criteria.md)을 적용한다. 보관 위치·접근 경계·고정 상태를 인계하고 작성·열람 세션은 해당 Issue를 구현하지 않는다.
5. 초안을 원문 의미와 사실·제안·결정에 대조한다. 중요한 결정이 보류면 해당 단계만 보류한다. 권한이 있는 Issue 갱신만 실행하고 권한이 없으면 대화에 초안을 반환한다. 댓글은 자동 게시하지 않는다.

기존 작업은 [재개 규칙](references/plan.md#기존-작업-재개), 원격 불가는 [로컬 파일럿](references/plan.md#로컬-파일럿-디렉토리-규칙)을 따른다.

## 출력

Issue URL/번호 또는 local-draft, 변경 의도·영향 범위·달성 조건, 적용 라벨과 실제 assignee login·미적용 사유, 마일스톤 이름·번호·연결 결과 또는 미지정/실패/미확인 사유, 남은 결정을 반환한다.
필수 입력이 없으면 issue-incomplete다.
Issue 존재만으로 구현 준비 완료라 하지 않는다.
계획 요청에는 부모·담당 Issue URL, 본문 계획, 분리/미분리 이유·실제 관계·부모 AC 대응, 검증 사례, 독립 기준의 접근 경계·고정 상태, 준비된 범위·남은 결정·승인 범위도 반환한다. 계획 준비는 구현·배포 완료가 아니다. 구현까지 요청되면 [git-workflow](../git-workflow/SKILL.md)의 [공통 구현 절차](../git-workflow/references/implementation.md)에 인계한다.
