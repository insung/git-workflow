# 종료 코멘트 양식

Issue를 닫거나 이미 닫힌 Issue에 결과를 보완할 때 읽는다. 코멘트는 결과 요약과 근거 링크만 담는다. plan·todo·handoff 전문은 복사하지 않는다. 링크 규칙은 [document-links](../../git-workflow/references/document-links.md)를 따른다.

## completed

```markdown
## 종료 결과

<무엇이 바뀌었는지 한두 문장>

- 해결 PR: <PR URL>
- merge commit: <hash>
- 배포 상태: <배포 완료 / 배포 대기와 이유 / 배포 없음과 이유>

## 달성 조건 결과

| AC | 결과 | 근거 |
| --- | --- | --- |
| AC-01 | 충족 | <todo·handoff·review 또는 PR의 고정 링크> |

## 후속 작업

- <후속 Issue URL과 한 줄 설명. 없으면 없음>
```

AC 표에는 Issue 본문의 모든 AC ID를 쓴다. 결과는 충족만 허용한다. 미충족·미확인 AC가 있으면 completed로 닫지 않는다 ([차단 조건](../SKILL.md#completed-차단-조건)).

## not planned

```markdown
## 종료 사유

<진행하지 않기로 한 이유>

- 결정: <결정한 역할과 결정 위치(대화·회의록·댓글 링크)>
- 대안: <대신 진행하는 Issue·방법. 없으면 없음>
- 다시 열 조건: <상황이 바뀌면 다시 검토할 조건. 없으면 없음>
```

## duplicate

```markdown
## 종료 사유

#<정본 Issue>와 해결 범위가 같아 그 Issue에서 진행한다.

- 옮긴 정보: <이 Issue에만 있던 재현 정보·요구사항. 정본 Issue에 옮긴 댓글 링크. 없으면 없음>
```

`--duplicate-of`가 타임라인에 중복 관계를 남긴다. 이 Issue에만 있던 정보는 닫기 전에 정본 Issue로 옮긴다.

## 작성 기준

- 개인 이름 대신 역할을 쓴다.
- 확인하지 못한 배포·테스트 결과는 미확인으로 쓴다.
- 링크는 원격에서 접근 가능한 것만 쓴다. 로컬 경로를 쓰지 않는다.
