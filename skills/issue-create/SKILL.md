---
name: issue-create
description: “이슈를 만들어줘”, “이슈 본문을 보완해줘”, “같은 내용의 이슈가 이미 있는지 확인해줘”처럼 새 작업의 GitHub Issue 작성·보완이나 그 전의 중복 확인을 요청할 때 사용한다. 단순 Issue 목록 조회에는 쓰지 않는다.
---

# Issue 작성

## 읽을 기준

[공통 실행 경계](../git-workflow/references/execution-boundaries.md)를 적용한다.
제목은 [change-conventions](../git-workflow/references/change-conventions.md), 기록은 [writing-conventions](../git-workflow/references/writing-conventions.md), 라벨은 [labels](../git-workflow/references/labels.md), 외부 기록은 [document-links](../git-workflow/references/document-links.md)를 읽는다.
목표 버전과 마일스톤은 [공통 마일스톤 절차](../git-workflow/references/milestones.md)를 적용한다. 저장소 기준과 목표가 정해졌으면 생성 시 연결하고, 미정이면 임의 지정하지 않는다. 기존 마일스톤 재사용·승인된 누락 생성·기존 연결 보존·응답 불명 시 재조회와 연결 실패만 재시도를 따른다.

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
   원격 PR 전에는 실제 Issue가 필요하다.
3. 실제 URL/번호·본문·라벨과 assignee login, 실제 마일스톤 연결 또는 미지정 사유를 재확인한다.
   생성 응답이 불명확하면 먼저 조회하여 중복 생성을 피한다.
   Issue가 존재하더라도 의도·영향 범위·달성 조건이 부족하면 보완한다.
4. Issue 작성 이후 계획이 필요하면 [plan-create](../plan-create/SKILL.md)에 실제 Issue 번호와 URL, 본문 계획 준비 상태·남은 결정·요청/승인 범위를 전달한다. 원문·계획·참고 링크 절은 필수이며 정보가 없으면 미확인/미작성 상태를 표시한다.
   Issue 작성만 요청된 경우 계획이나 구현을 자동 시작하지 않는다.

## 출력

Issue URL/번호 또는 local-draft, 변경 의도·영향 범위·달성 조건, 적용 라벨과 실제 assignee login·미적용 사유, 마일스톤 이름·번호·연결 결과 또는 미지정/실패/미확인 사유, 남은 결정을 반환한다.
필수 입력이 없으면 issue-incomplete다.
Issue 존재만으로 구현 준비 완료라 하지 않는다.
후속 계획은 [plan-create](../plan-create/SKILL.md)가 담당한다.
