# 독립 결과의 Sub-issue

분리 여부는 [계획의 분리 판단](plan.md#sub-issue-분리-판단)이 정한다. task 파일마다 Issue를 만들지 않는다. 기존 todo·task는 [재개 규칙](plan.md#기존-작업-재개)으로 지원한다.

## 작업 계약

담당 하위 Issue에는 다음을 기록한다. 공통 원문·설계 전문은 복사하지 않고 부모 Issue에 연결한다. 하위 Issue를 만든 실제 요청은 해당 Issue의 원문 절에 보존한다.

- 부모 URL·해결에 기여하는 부모 AC ID
- 독립 결과·직접/제외 범위·관찰 가능한 하위 AC
- 구현 방향·입력·선행 조건·검증 방법·전달/롤백·남은 결정
- 필요한 담당자·관련 PR 링크

부모는 전체 목표·최종 AC·통합 검증을 유지한다. 하위 AC를 모두 만족해도 부모 전체 AC·통합 검증·필수 전달을 별도로 확인한다. 하위 Issue 종료 수나 진행률만으로 부모를 닫지 않는다. 취소·부분 완료도 실제 결과와 남은 범위를 대조한다.

## 생성·연결 절차

1. 실제 부모·담당 저장소·기존 열린/닫힌 Issue의 의도·범위·AC와 계층을 조회한다. 동일 열린 결과는 재사용하고 임의 재부모화하지 않는다.
2. 계획만 요청됐으면 구성 초안을 반환한다. Issue 생성과 작업 분해까지 승인된 요청이면 그 범위의 자식 생성·연결을 실행한다. 애매하면 해당 원격 변경만 보류한다. 번호·계층·미합의 AC를 만들어 넣지 않는다.
3. [issue-create](../../issue-create/SKILL.md)의 본문·라벨·assignee 규칙으로 필요한 결과만 생성한다. 기존 Issue 연결도 권한 범위에서 수행한다.
4. 부모·하위 Issue URL/번호·본문·AC 대응·관계·라벨·assignee를 재조회한다. 응답이 불명확하면 목록·계층을 먼저 다시 읽어 중복 생성을 피한다. 일부 실패면 확인된 생성·미연결·남은 작업을 구별하고 이미 생성된 Issue를 다시 만들지 않는다.

Sub-issue는 포함 관계다. 실행 선행 조건은 별도의 blocked by / blocking 관계로 설정하고 재조회한다. 계층·순서만으로 선행 관계가 설정됐다고 하지 않는다.

## CLI와 API

대상 환경의 `gh issue create/edit/view --help`에서 지원 여부를 먼저 확인한다. 부모당 100개·8단계는 플랫폼 한도이며 분해 목표가 아니다. 가급적 직접 자식으로 표현하고 추가 중첩은 독립 추적 필요를 다시 판단한다.

```bash
# 실제 번호·본문·승인 범위 확인 후. 계정 설정은 AGENTS.md 적용
 gh issue create --repo OWNER/REPO --parent PARENT --title TITLE --body-file BODY
 gh issue edit PARENT --repo OWNER/REPO --add-sub-issue CHILD
 gh issue edit CHILD --repo OWNER/REPO --add-blocked-by PREDECESSOR
 gh issue view PARENT --repo OWNER/REPO --json url,parent,subIssues,subIssuesSummary
 gh issue view CHILD --repo OWNER/REPO --json url,parent,blockedBy,blocking
```

지원하지 않는 CLI는 `gh api`로 [공식 sub-issue REST API](https://docs.github.com/en/rest/issues/sub-issues)를 사용할 수 있다. 조회·연결에 필요한 실제 issue ID와 번호를 구별하며, 접근·권한 실패를 기능 부재로 단정하지 않는다. 대체 경로도 같은 승인·중복 방지·사후 확인 기준을 적용한다. 연결 불가이면 초안과 미확인 관계를 반환한다.

[GitHub sub-issue 안내](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/adding-sub-issues)와 [Issue 의존성](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/creating-issue-dependencies)을 따른다.
