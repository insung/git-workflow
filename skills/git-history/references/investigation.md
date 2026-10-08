# Git·GitHub 탐색

대상 코드의 OID를 고정한 뒤 단계에 맞는 명령만 선택한다. 아래 변수는 조사로 확인한 값의 자리 표시자다. 사용자 입력·검색어를 셸 코드로 이어 붙이지 않고 인자로 인용한다. 경로에는 `--`와 필요 시 `--literal-pathspecs`를 사용한다.

## Git에서 동작 기원 찾기

```sh
git -C "$repo" rev-parse --show-toplevel
git -C "$repo" remote -v
git -C "$repo" status --short
git -C "$repo" rev-parse --verify "${revision}^{commit}"
git -C "$repo" show "$oid:$path"
git -C "$repo" --literal-pathspecs blame -L "$start,$end" "$oid" -- "$path"
git -C "$repo" --literal-pathspecs log --follow -p "$oid" -- "$path"
git -C "$repo" show --format=fuller --stat "$commit"
git -C "$repo" --literal-pathspecs show "$commit" -- "$path"
```

범위를 모르면 함수 정의·호출·설정의 실제 위치를 먼저 찾는다. 기준 트리 검색은 `git grep -n <term> <OID> -- <paths>`를 사용하며 작업본 검색과 구별한다. 줄 범위를 제한하지 않은 blame도 가능하다. 미커밋 대상은 `git diff`와 `git diff --cached`를 기준 코드와 나란히 보며 커밋으로 귀속하지 않는다.

| 상황 | 추가 조사와 해석 |
| --- | --- |
| 포맷 수정 | 일반 blame/diff와 `blame -w`를 비교. 공백 무시 결과도 의미 변경 여부를 diff로 확인 |
| 파일 이동·복사 | `log --follow -p`(단일 파일), `show -M -C --name-status <commit>`, `blame -M -C`로 이전 경로 후보 확인. 해당 부모의 이전 경로를 `show <parent>:<old-path>`로 직접 대조 |
| 함수 이동·리팩터링 | `log -L <start>,<end>:<path> <OID>` 또는 Git이 인식하는 함수의 `log -L :<function>:<path> <OID>`. `-L`과 `--follow`/pathspec을 한 명령에 합치지 않음. 경로가 끊기면 이전 파일로 전환하고 `log -S <literal>`/`log -G <regex>` 후보의 실제 diff·호출 동작 대조 |
| merge | `show -s --format='%H %P%n%B' <commit>`로 부모 확인, `diff <commit>^1 <commit> -- <path>`와 다른 부모의 diff·이력 대조. combined diff가 비어도 무변경이 아님. 충돌 해결에서 생긴 동작은 merge 자체가 기원일 수 있음 |
| squash | 기준 SHA의 관련 PR과 merge SHA·PR diff 확인. 원 커밋과 squash SHA 불일치·원 커밋의 비조상 관계는 예상 가능. 원 커밋을 찾았으면 변경 전후 blob/diff로 실제 유입 범위 대조 |
| 후속 동작 변경 | 도입 커밋→기준 OID의 diff·log를 이전 경로까지 대조. 한 경로에서는 `log --ancestry-path <intro>..<OID> -- <path>`를 후보 색인으로 사용. rename·merge의 다른 부모를 놓칠 수 있어 이것만으로 완료 판정하지 않음 |
| shallow·객체 누락 | `rev-parse --is-shallow-repository`, 누락된 객체/경로·로그 범위를 기록. fetch/deepen을 자동 실행하지 않음. 접근 가능한 원격 commit diff로 보완하고 여전히 끊기면 필요한 자료/이력만 요청 |

blame은 줄의 마지막 귀속이고 `-w/-M/-C`는 탐색 보조다. 제목의 style/refactor, rename 감지, 동일 반환값만으로 전체 동작 보존을 확정하지 않는다. 영향을 받는 호출·설정·분기와 실제 diff를 대조한다. 여러 동작이 섞이면 질문과 관련된 변경들을 각각 연결한다.

## 커밋 → 원격 기록

remote가 fork·여러 host를 가리키면 커밋의 게시 저장소와 PR base 저장소를 구별한다. 불명확한 `#번호`는 임의의 origin이나 현재 checkout에 귀속하지 않는다. `owner/repo#번호`는 저장소를, 전체 URL은 host까지 유지한다. Refs뿐 아니라 본문·종료 키워드·PR URL도 **읽기 단서**로 취급하며 현재 기록을 종료/수정하지 않는다.

GitHub CLI가 있으면 대상 host와 저장소를 고정해 읽는다. 없거나 접근이 안 되면 가능한 Git·공개 웹·제공 문서로 이어가며 설치·로그인 전환을 강제하지 않는다. 저장소 인증 지침을 따르고 자격 증명을 출력하지 않는다.

```sh
# host는 github.com 또는 확인한 GitHub Enterprise host
# owner_repo는 owner/repository이며 해당 커밋이 게시된 저장소다.
gh api --hostname "$host" --paginate \
  "repos/$owner_repo/commits/$commit/pulls"
gh pr view "$pr" --repo "$host/$owner_repo" \
  --json url,body,comments,reviews,commits,files,mergeCommit,baseRefOid,headRefOid
# view의 요약·개수 제한이나 리뷰 대화 누락을 보완한다.
gh api --hostname "$host" --paginate "repos/$owner_repo/pulls/$pr/commits"
gh api --hostname "$host" --paginate "repos/$owner_repo/pulls/$pr/files"
gh api --hostname "$host" --paginate "repos/$owner_repo/issues/$pr/comments"
gh api --hostname "$host" --paginate "repos/$owner_repo/pulls/$pr/reviews"
gh api --hostname "$host" --paginate "repos/$owner_repo/pulls/$pr/comments"
gh api --hostname "$host" "repos/$issue_repo/issues/$issue"
gh api --hostname "$host" --paginate "repos/$issue_repo/issues/$issue/comments"
```

Issues API의 `pull_request` 키가 있으면 PR이다. 실제 종류를 확인하고 PR을 Issue 원문이라고 기록하지 않는다. PR 커밋 목록의 포함, merge SHA, 기준 코드와 diff, Issue의 요청 범위·관련 코멘트를 조합해 연결한다. 커밋 관련 PR API는 기본 브랜치의 도입 PR을 제공하며 기본 브랜치에 없는 커밋에는 열린·머지 PR도 반환할 수 있다. 여러 결과는 각각 범위를 대조하고 열린 PR을 기준 코드의 반영 증거로 쓰지 않는다. GitHub 이외 host의 URL이면 해당 기록 방식과 제공 도구로 읽으며 GitHub API에 강제로 대입하지 않는다.

PR 본문은 계획·변경 설명, diff는 구현, 코멘트·실행 링크는 당시 검증 보고의 근거다. 리뷰 의견은 채택·해결 또는 후속 diff가 확인돼야 결정으로 연결한다. 연결된 원문·ADR·계획·문서 허브에서 질문에 필요한 부분을 읽는다. 현재 본문이 사후 편집됐거나 문서가 개정됐다면 created/updated 시각·고정 revision을 구별하고 당시 원문 복원 불가는 한계로 남긴다.

## 직접 연결이 없을 때

1. 저장소의 README·CONTRIBUTING·AGENTS·ADR·CHANGELOG, docs의 관련 문서와 링크를 확인한다. 필요하면 도입 시점 트리도 비교한다. 정해진 Workflow 절·경로가 없다고 초기화하거나 거절하지 않는다.
2. 실제 코드 변경의 용어·이전 이름·동작과 커밋 시기로 검색한다. 저장소 문서의 도메인 용어·사건 번호를 우선 사용하고 날짜 범위는 후보를 줄이는 보조로 쓴다. 커밋·PR·Issue의 생성/머지 시점이 달라질 수 있어 좁은 날짜 무결과를 전체 무결과로 쓰지 않는다.
3. 열린·닫힌 Issue 제목과 PR 제목/본문을 조사한다. 다음은 시작 쿼리다. 결과가 부족하면 용어·범위를 바꾼다.

```sh
gh issue list --repo "$host/$owner_repo" --state all \
  --search "$terms in:title" --limit 100 --json number,title,body,url
gh pr list --repo "$host/$owner_repo" --state all \
  --search "$terms in:title,body" --limit 100 --json number,title,body,url
```

4. 후보의 본문·댓글·파일/diff·SHA·실제 링크를 읽고 질문의 변경과 관련성을 대조한다. 용어가 비슷해도 다른 동작·파일·시점이고 연결이 없으면 후보 제외. 직접 링크 없이 내용만 맞으면 관련 가능성으로 남기며 확정 연결을 만들지 않는다.
5. 충분한 문맥이 확보되면 답한다. 부족하면 조사 범위·검색어·시점·페이지/개수 제한과 누락된 연결을 설명하고, 그 공백을 가장 많이 줄이는 자료 하나만 요청한다.

## 조회 결과와 한계

| 결과 | 보고할 사실 |
| --- | --- |
| 200 빈 목록·검색 무결과 | 해당 저장소·SHA·검색 조건에서 연결을 찾지 못함. 기록 전체의 부재 아님 |
| 401·403 | 현재 인증/권한 또는 rate limit 등의 접근 제한. 응답의 이유와 가능한 대체 조사 표시 |
| 404 | 잘못된 대상·삭제·비공개 비가시 등의 가능성. 다른 근거 없이 부재 확정 금지 |
| 네트워크·도구 오류 | 조회 미완료. 빈 결과와 구별 |
| 페이지·검색/파일 제한, 잘린 patch | 확인 범위가 부분적임을 표시. 가능한 추가 페이지/로컬 diff로 보완 |
| 연결된 자료만 없고 코드 확인 가능 | 동작·변경은 확인, 요청·결정 이유는 미확인. 커밋 설명은 출처를 표시한 단서로 제시 |

조사 질문에 답하는 데 불필요한 운영 측정·새 테스트·권한 확대를 요구하지 않는다. “필요하면 추가 조사할 수 있음”과 “질문에 답하기 위해 자료가 필요함”을 구별한다.

공식 명령 의미: [Git blame](https://git-scm.com/docs/git-blame), [Git log](https://git-scm.com/docs/git-log), [GitHub 커밋 관련 PR API](https://docs.github.com/en/rest/commits/commits#list-pull-requests-associated-with-a-commit).
