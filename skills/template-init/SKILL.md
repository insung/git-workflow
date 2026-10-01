---
name: template-init
description: “Issue·PR 템플릿을 설치해줘”, “이 저장소에 GitHub 템플릿을 넣어줘”처럼 대상 저장소에 git-workflow의 Issue·PR 템플릿 설치를 요청할 때 사용한다.
---

# 템플릿 설치

[공통 실행 경계](../git-workflow/references/execution-boundaries.md)를 적용한다.
정본은 이 스킬의 `assets/.github/` 아래 세 파일이다.

| 정본 | 대상 경로 |
| --- | --- |
| `assets/.github/ISSUE_TEMPLATE/feature_request.md` | `.github/ISSUE_TEMPLATE/feature_request.md` |
| `assets/.github/ISSUE_TEMPLATE/bug_report.md` | `.github/ISSUE_TEMPLATE/bug_report.md` |
| `assets/.github/PULL_REQUEST_TEMPLATE.md` | `.github/PULL_REQUEST_TEMPLATE.md` |

## 절차

1. 대상 저장소의 루트, remote, 브랜치, 작업본 상태를 확인한다.
   Git 저장소가 아니면 멈추고 보고한다.
2. 기존 템플릿을 찾는다.

   ```bash
   ls .github/ISSUE_TEMPLATE/ 2>/dev/null
   find . .github docs -maxdepth 1 -iname 'pull_request_template*' 2>/dev/null
   ```

3. 대상 경로에 파일이 없는 정본만 복사한다.
   `.github/ISSUE_TEMPLATE/`에 다른 이름의 템플릿이 있으면 같은 종류가 중복되는지 보고하고, 사용자가 확인한 경우에만 복사한다.
   다른 위치나 `PULL_REQUEST_TEMPLATE/` 폴더에 PR 템플릿이 있으면 PR 정본을 복사하지 않는다.
4. 이미 있는 파일은 바꾸지 않는다.
   `diff -u <정본> <대상>`으로 차이를 보고하고, 정본의 필수 절 중 대상에 없는 절을 적는다.
5. Issue 템플릿 front matter의 라벨(`enhancement`, `bug`)이 대상 저장소에 있는지 [labels](../git-workflow/references/labels.md)의 조회 절차로 확인한다.
   없는 라벨은 보고만 한다. 라벨 생성은 사용자가 요청한 경우에 같은 절차를 따른다.

## 결과

- 복사한 파일
- 유지한 기존 파일과 차이·누락 필수 절
- 라벨 존재 여부와 조회 실패 여부

복사한 파일의 커밋과 push는 요청된 경우에 [commit-rule](../commit-rule/SKILL.md)로 진행한다.
템플릿 절의 작성 기준은 [Issue 양식](../issue-create/references/issue.md)과 [PR 양식](../pr-create/references/pr.md)이다.
