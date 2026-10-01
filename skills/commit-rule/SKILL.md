---
name: commit-rule
description: 커밋 실행·변경 범위 분리·커밋 메시지·범위·분리 검토나 Git 브랜치 규칙 적용을 요청할 때 사용한다. 다른 세션의 변경을 보존하고 실제 작성 에이전트를 푸터로 기록한다.
---

# Commit Rule

## 사용 조건

“변경을 커밋해줘”, “커밋을 나눠줘”, “메시지 규칙을 확인해줘”, “브랜치 전략을 적용해줘” 요청에 적용한다. “커밋을 검토해줘” 중 메시지·범위·분리 검토는 이 스킬, 코드 동작·의도·정책·테스트 검토는 [pr-review](../pr-review/SKILL.md)를 적용한다. 둘 다 요청됐으면 각 범위를 함께 검토한다. PR 머지와 태그·릴리즈는 해당 스킬로 연결한다.

[공통 경계](../git-workflow/SKILL.md#공통-실행-경계)를 적용한다. 제목 작성·검토는 [change-conventions](../git-workflow/references/change-conventions.md), 본문은 [writing-conventions](../git-workflow/references/writing-conventions.md), 본문·푸터 상세는 [commit-message](references/commit-message.md)를 읽는다. 공통 표기를 여기 복사하지 않는다.

## 범위 확인

1. 현재 저장소를 우선하고 이번 작업이 실제 수정한 형제 저장소만 추가한다. 무관한 상위·홈 전체를 스캔하지 않는다. remotes·branch·HEAD·status·staged/unstaged diff와 plan/todo를 확인한다.
2. 저장소별 미커밋 파일과 이번 세션 변경을 대조해 범위표·주제별 묶음·제목 초안을 준비한다. 출처 불명은 범위 점검 결과에만 표시하고 자동으로 커밋하지 않는다. 사용자가 명시한 다른 변경을 포함할 때도 실제 diff를 확인한다.
3. 커밋 범위를 준비할 때 같은 파일에 여러 작업의 변경이 섞였거나, 기존 staged 변경이 있거나, 변경 출처를 확정할 수 없으면 [scope](references/scope.md)를 먼저 읽는다. 출처가 불명확한 변경은 자동으로 포함하지 않는다. 파일 전체 stage/unstage로 다른 작업을 덮어쓰지 않는다. 같은 경로의 git commit --only도 파일 전체를 담으므로 무조건 사용하지 않는다.

## 커밋과 인계

- 커밋까지 요청된 구현 흐름이면 plan/todo 범위의 검증된 주제별 묶음에 적용한다. 같은 승인 범위를 반복 질문하지 않는다. 미승인 변경/새 커밋 범위는 새 결정 대상으로 남긴다.
- 실제 필요한 검증과 staged diff를 확인하고 승인된 묶음만 한 번 커밋한다. 미실행 검증을 통과했다고 쓰지 않는다. Refs는 선택이며 사용할 때는 실제 Issue만 참조한다.
- 커밋 뒤 hash·변경 파일·남은 dirty/staged를 다시 확인해 인계에 기록하고 todo의 검증 근거 링크로 연결한다. 다른 세션 변경의 보존을 재확인하기 전 완료를 주장하지 않는다.
- commit 요청은 push·PR·머지 권한을 포함하지 않는다. 문서에 자기 hash를 넣기 위한 amend 반복 대신 후속 기록과 문서-only 변경 identity를 구분한다.

## 브랜치

전략·분기·merge·hotfix를 다룰 때 [branch](references/branch.md)를 읽는다. 기존 정책과 실제 배포 흐름을 우선하고 이름만으로 환경을 추측하지 않는다. 공유 브랜치 rebase/force push를 하지 않는다. 전략 검토만으로 브랜치·설정을 바꾸지 않는다. PR 머지는 [pr-merge](../pr-merge/SKILL.md)의 승인·HEAD 경계를 따른다.
