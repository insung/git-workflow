---
name: issue-create
description: GitHub Issue 생성·보완이나 기존 Issue 확인을 요청할 때 사용한다. 변경 의도·영향 범위·달성 조건을 정리하고, 구현 계획 작성은 plan-create로 연결한다.
---

# Issue 작성

## 사용 조건

“이슈를 만들어줘”, “기존 이슈가 있는지 확인해줘”, “이슈의 의도와 영향 범위를 보완해줘” 요청에 적용한다. plan/todo 작성은 plan-create가 담당한다.

## 읽을 기준

[공통 실행 경계](../git-workflow/SKILL.md#공통-실행-경계)를 적용한다. 제목은 [change-conventions](../git-workflow/references/change-conventions.md), 기록은 [writing-conventions](../git-workflow/references/writing-conventions.md), 라벨은 [labels](../git-workflow/references/labels.md), 외부 기록은 [document-links](../git-workflow/references/document-links.md)를 읽는다.

## Issue 확인·작성

1. 기존 Issue를 찾아 일치하면 재사용한다. 닫힌 Issue라면 현재 요청이 같은 해결 범위인지 확인한다. 없다면 [Issue 상세·양식](references/issue.md)으로 의도·영향/제외 범위·검증 가능한 달성 조건을 작성한다. 코드·문서에서 알 수 있는 것은 조사하고 인간 결정만 질문한다.
2. 생성이 요청 범위에 있고 접근 가능하면 본문 파일로 Issue를 만들고 URL/번호를 확인한다. 인증 불가인 로컬 파일럿만 local-draft를 허용한다. 원격 PR 전에는 실제 Issue가 필요하다.
3. 실제 URL/번호·본문·라벨을 재확인한다. 생성 응답이 불명확하면 먼저 조회하여 중복 생성을 피한다. Issue가 존재하더라도 의도·영향 범위·달성 조건이 부족하면 보완한다.
4. Issue 작성 이후 계획이 필요하면 [plan-create](../plan-create/SKILL.md)에 실제 Issue 번호와 URL, 남은 결정, 요청·승인 범위를 전달한다. Issue 작성만 요청된 경우 계획이나 구현을 자동 시작하지 않는다.

## 출력

Issue URL/번호 또는 local-draft, 변경 의도·영향 범위·달성 조건, 적용 라벨과 미적용 사유, 남은 결정을 반환한다. 필수 입력이 없으면 issue-incomplete다. Issue 존재만으로 구현 준비 완료라 하지 않는다. 후속 계획은 [plan-create](../plan-create/SKILL.md)가 담당한다.
