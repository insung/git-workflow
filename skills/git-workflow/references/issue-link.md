# PR의 실제 Issue 연결 검사

일반 연결 전에 [경미한 정합성 보완 예외](outcome-scope.md#경미한-정합성-보완의-issue-없는-pr)를 대조한다. 모든 조건이 충족되고 실제 관련 Issue가 없으면 Issue 항목 대신 요청 근거와 해결 범위를 검사한다. 실제 Issue가 있으면 재사용하고 아래 일반 검사를 적용한다. 저장소 강제 정책·조회 실패를 예외로 우회하지 않는다. 단순 배경과 실제 관계·출처의 링크는 [공통 기준](outcome-scope.md#관계와-배경-링크)을 따른다.

pr-request는 원격 PR 생성 전에, pr-merge는 현재 PR 본문과 최신 검토 결과를 기준으로 머지 전에 이 계약을 적용한다. 생성 시에는 계획·구현·테스트 근거를, 머지 시에는 최종 검토 결과까지 대조한다.

## 순수 릴리즈 준비 예외

관련 Issue가 없는 순수 릴리즈 준비 PR은 [정본의 조건·대체 기록](../../git-release/references/release-context.md#issue-없는-릴리즈와-준비-pr)을 먼저 대조한다. 모든 조건이 충족되면 아래 Issue 필드를 만들지 않고 PR의 요청 근거와 범위·검증을 생성·검토·머지마다 확인한다. 해당 없음의 이유만으로 통과시키지 않는다. 실제 관련 Issue가 있거나 새 기능·정책 변경 등이 포함되면 아래 일반 검사를 적용한다.

## 필수 확인

1. PR 본문의 Issue 항목에서 관련 Issue 참조를 확인한다. 기존 템플릿에 동등한 항목이 있으면 유지하고 없으면 `## Issue와 해결 범위`를 추가한다. 단순 문서 링크나 커밋 메시지만으로 대신하지 않는다.
2. 같은 저장소는 `#123`, 다른 저장소는 `owner/repository#123` 또는 `https://github.com/owner/repository/issues/123`을 허용한다. 전체 Issue URL은 같은 저장소에도 사용할 수 있다. 번호는 실제 확인한 값이며 여러 Issue가 있으면 각각 이번 PR의 해결 범위를 적는다.
3. `#번호`는 PR의 대상 저장소(base repository) 기준으로 해석한다. fork나 현재 checkout의 저장소를 자동 기준으로 쓰지 않는다. 다른 저장소 참조와 URL은 해당 host·owner·repository·번호를 확인한다.
4. GitHub에서 참조 대상이 실제 Issue인지 확인한다. `/pull/번호` URL은 Issue 참조로 인정하지 않는다. Issues API를 쓰면 `pull_request` 키가 있는 응답은 PR이므로 거부한다. API 요청 성공이나 번호 존재만으로 통과하지 않는다.
5. Issue 본문의 변경 의도·영향 범위·달성 조건과 이번 PR의 실제 diff·Issue 본문 계획·필요한 상세 설계·테스트 근거를 연결한다. 머지 단계에서는 검토 결과가 같은 Issue와 현재 PR 범위를 다뤘는지도 확인한다. 전문을 복사하지 않고 대응 요약과 근거 링크를 기록한다.
6. Issue가 closed여도 자동 실패 처리하지 않는다. 완료 뒤 보완·후속 수정 등 현재 작업과의 관계를 확인한다. 관계가 불분명하거나 범위가 다르면 보류하며 임의 재오픈하지 않는다.
7. 번호 누락, 잘못된 참조(PR 포함), 접근 불가, 필수 내용 부족 또는 의도·범위·달성 조건 불일치이면 원격 PR 생성 또는 머지를 보류한다. 참조·문제·필요한 수정/결정을 보고한다. 조회 실패를 Issue가 없다는 증거로 취급하지 않는다. 로컬 PR 초안에는 미확인 상태를 기록할 수 있다.
8. local-draft는 실제 원격 Issue를 대신하지 않는다. 검사 통과는 사용자 머지 승인이나 배포 승인을 대신하지 않는다.

## GitHub 조회 예시

PR의 현재 본문과 base 저장소를 확인한 뒤, 해석한 Issue를 조회한다. 아래 값은 실제로 확인한 host·저장소·번호로 바꾼다.

```bash
gh api --hostname HOST repos/OWNER/REPOSITORY/issues/NUMBER \
  --jq '{number, title, body, state, html_url, is_pr: has("pull_request")}'
```

`is_pr`가 false인 실제 Issue의 본문을 읽고 의도·영향·달성 조건을 대조한다. 권한·네트워크 문제나 조회 실패 시 보류한다. 필요한 검토 근거는 승인된 docs 인계/검토 기록에 Issue URL·연결된 AC·검토 HEAD·판단으로 기록한다. 머지 직전 PR 본문과 Issue를 다시 읽으며 참조나 의도가 바뀌었으면 기존 검토의 적용 여부를 재확인한다.

GitHub Issues API가 PR도 반환하고 `pull_request` 키로 구분한다는 점은 [공식 API 문서](https://docs.github.com/en/rest/issues/issues#get-an-issue)에 따른다.

## 참조와 종료

PR의 기본 연결은 `Refs: #123`이다. 다른 저장소는 `Refs: owner/repository#123` 또는 실제 Issue URL을 쓴다. Refs는 출처·해결 범위의 참조이며 이슈 자동 종료를 요청하지 않는다. AC 충족, 배포 불필요, PR 생성·검토·머지 승인만으로 종료 승인을 추정하지 않는다.

기본 순서는 머지 확인 → [issue-close](../../issue-close/SKILL.md)의 본문 최종 갱신·조회 → 결과 댓글 게시·조회 → 승인된 종료 → 사후 조회다. `Closes`·`Fixes`·`Resolves`와 그 변형은 사용자가 해당 Issue를 **머지 시 자동 종료**하도록 명시적으로 요청한 경우만 예외로 사용한다. 이때도 전체 AC·필수 전달 조건이 충족돼야 하며, 남은 배포 뒤 확인이나 부모 전체 범위가 있으면 예외를 적용하지 않는다. 종료 승인만 있는 경우에도 자동 종료 방식을 임의 선택하지 않는다.

생성·머지 전에 PR 본문, 포함될 커밋 메시지와 최종 머지 메시지, Development의 수동 연결 등 자동 종료 경로를 확인한다. 의도하지 않은 자동 종료가 있으면 해당 원인과 필요한 수정을 제시하고, 승인된 수정·재조회 뒤 진행한다. 공개 커밋 이력을 임의 재작성하지 않는다. Refs만 썼다는 이유로 다른 종료 경로가 없다고 가정하지 않는다.

키워드의 저장소 표기·기본 브랜치 조건과 수동 연결 동작은 [공식 연결 문서](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/linking-a-pull-request-to-an-issue)를 따른다.
