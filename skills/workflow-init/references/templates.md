# 템플릿 설치

[공통 실행 경계](../../git-workflow/references/execution-boundaries.md)를 적용한다.
정본은 workflow-init의 `../assets/.github/` 아래 세 파일이다.

| 정본 | 대상 경로 |
| --- | --- |
| `../assets/.github/ISSUE_TEMPLATE/FEATURE_REQUEST.md` | `.github/ISSUE_TEMPLATE/FEATURE_REQUEST.md` |
| `../assets/.github/ISSUE_TEMPLATE/BUG_REPORT.md` | `.github/ISSUE_TEMPLATE/BUG_REPORT.md` |
| `../assets/.github/PULL_REQUEST_TEMPLATE.md` | `.github/PULL_REQUEST_TEMPLATE.md` |

## 필수 절

대상에서 빠진 절을 찾는 기준이다. 정본의 `##` 절 이름과 같다.

| 템플릿 | 필수 `##` 절 | 선택 `##` 절 | front matter |
| --- | --- | --- | --- |
| 기능 Issue | 목표, 사용자 요청 원문, 현재 동작과 변경 후 동작, 영향 범위, 달성 조건, 계획, 참고 링크 | 제약 사항, 지금 알고 있는 것, 남은 결정 | name, about, title, labels |
| 버그 Issue | 목표, 사용자 요청 원문, 기대 동작, 실제 동작, 재현 절차, 확인한 환경, 영향 범위, 달성 조건, 계획, 참고 링크 | 제약 사항, 지금 알고 있는 것, 남은 결정 | name, about, title, labels |
| PR | Issue와 해결 범위, 변경 내용, 완료 조건 확인과 검증 근거, 위험·배포·다음 조치 | 중요한 결정과 계획 대비 차이, 화면 | 없음 |

선택 절이 없는 것은 누락이 아니다. 기존 PR의 Issue·검증 상태·위험과 전달도 대응 정보를 요구하면 같은 뜻으로 취급한다. 기능의 As-Is/To-Be와 버그의 실제/기대 동작은 같은 역할이며 중복 표를 요구하지 않는다.

## 절차

1. 대상 저장소의 루트, remote, 브랜치, 작업본 상태를 확인한다.
   Git 저장소가 아니면 멈추고 보고한다.
   remote가 없어도(`git remote` 출력이 비어 있어도) 복사는 진행한다.
2. 기존 템플릿을 찾는다.

   ```bash
   ls .github/ISSUE_TEMPLATE/ 2>/dev/null
   find . .github docs -maxdepth 1 -iname 'pull_request_template*' 2>/dev/null
   ```

3. 같은 종류의 기존 파일을 먼저 확인하고 없는 정본만 복사한다.
   `.github/ISSUE_TEMPLATE/`의 파일명은 대소문자를 구분하지 않고 비교한다. 기존 `feature_request.md`·`bug_report.md`나 혼합 대소문자 이름은 각각 대문자 정본과 같은 설치 파일로 취급한다. 기존 이름·내용을 유지하고 대문자 파일을 추가하지 않는다. 두 이름이 모두 있으면 기존 중복을 보고하며 임의 삭제·이름 변경을 하지 않는다.
   대소문자를 구분하는 파일시스템에서도 동일하게 처리한다. 정본 대문자 파일은 해당 종류가 없을 때만 복사한다.
   `.github/ISSUE_TEMPLATE/`나 `.github/`가 없으면 `mkdir -p .github/ISSUE_TEMPLATE`로 만든 뒤 복사한다.
   `.github/ISSUE_TEMPLATE/`에 다른 이름의 템플릿이 있으면 같은 종류가 중복되는지 보고하고, 사용자가 확인한 경우에만 복사한다.
   다른 위치나 `PULL_REQUEST_TEMPLATE/` 폴더에 PR 템플릿이 있으면 PR 정본을 복사하지 않는다.
4. 이미 있는 파일은 바꾸지 않는다.
   `diff -u <정본> <대상>`으로 차이를 보고하고, [필수 절](#필수-절) 중 대상에 없는 절을 적는다.
   대상의 절 이름이 정본과 달라도, 제목이나 안내 문구가 같은 정보를 요구하면 그 필수 절로 본다.
   예: 「배경」은 목표, 「완료 기준」·「Acceptance Criteria」는 달성 조건이다.
   뜻이 같은 쌍은 누락으로 보고하지 않고, 두 제목을 함께 적은 근거와 함께 보고한다.
   같은 뜻인지 확신하지 못하면 누락으로 적지 않고 두 제목과 함께 「판단 보류」로 보고한다.
   어느 경우에도 파일은 바꾸지 않는다.
5. Issue 템플릿 front matter의 라벨(`enhancement`, `bug`)이 대상 저장소에 있는지 [labels](../../git-workflow/references/labels.md)의 조회 절차로 확인한다.
   remote가 없으면 조회하지 않고 「라벨 미확인: remote 없음」으로 보고한다.
   없는 라벨은 보고만 한다. 라벨 생성은 사용자가 요청한 경우에 같은 절차를 따른다.

## 결과

- 복사한 파일
- 유지한 기존 파일과 차이
- 뜻이 같은 절 쌍과 근거, 판단 보류, 누락 필수 절
- 라벨 존재 여부, 조회 실패 여부, 라벨 미확인 사유

복사한 파일의 커밋과 push는 요청된 경우에 [commit-rule](../../commit-rule/SKILL.md)로 진행한다.
템플릿 절의 작성 기준은 [Issue 양식](../../issue-create/references/issue.md)과 [PR 양식](../../pr-create/references/pr.md)이다.
