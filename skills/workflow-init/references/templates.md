# 템플릿 설치와 갱신

[공통 실행 경계](../../git-workflow/references/execution-boundaries.md)를 적용한다.
템플릿 설치·갱신은 없는 파일을 추가하고, 기존 파일을 정본 전체로 교체한다. 갱신은 기존 사용자 정의 내용과 front matter도 교체하는 동작이다. 누락 절만 보완하는 방식으로 대신하지 않는다.

## 적용 소스

사용자가 로컬 작업공간을 지정하면 그 작업공간의 `skills/workflow-init/SKILL.md`, 이 참조와 `assets/.github/`를 읽는다. 설치된 플러그인 캐시의 자산으로 대체하지 않는다. 소스를 지정하지 않으면 현재 호출한 workflow-init의 자산을 사용한다. 지정한 소스가 없거나 정본을 읽을 수 없으면 다른 소스로 자동 대체하지 않고 해당 파일을 보류한다.

정본은 선택한 소스의 아래 세 파일이다. 결과에는 실제 소스 위치와 대상 경로를 함께 적는다.

| 정본 | 기존 파일이 없을 때 대상 경로 |
| --- | --- |
| `../assets/.github/ISSUE_TEMPLATE/FEATURE_REQUEST.md` | `.github/ISSUE_TEMPLATE/FEATURE_REQUEST.md` |
| `../assets/.github/ISSUE_TEMPLATE/BUG_REPORT.md` | `.github/ISSUE_TEMPLATE/BUG_REPORT.md` |
| `../assets/.github/PULL_REQUEST_TEMPLATE.md` | `.github/PULL_REQUEST_TEMPLATE.md` |

## 요청 범위

| 요청 | 기존 템플릿 처리 |
| --- | --- |
| 일반 설치·초기화 | 항목 선택 전 쓰기 없음. 템플릿 항목은 설치·갱신과 전체 교체 영향을 안내하고 선택 뒤 적용 |
| 템플릿 설치 | 없는 파일 설치, 기존 파일은 차이 안내 후 정본 전체로 교체 |
| 템플릿 갱신·업데이트·교체 | 선택한 종류의 기존 파일을 정본 전체로 교체. 없는 파일은 설치 |
| 차이 확인·검토만 | 읽기 전용. 설치·갱신 없음 |
| 기존 내용 보존·없는 파일만 설치 | 기존 파일은 보존·차이 보고, 없는 종류만 설치 |

템플릿 설치·갱신 항목 선택 또는 명시적인 템플릿 설치·갱신 요청은 해당 종류의 기존 내용 교체 권한이다. 차이와 교체할 경로를 먼저 안내한 뒤 같은 권한을 다시 묻지 않고 적용한다. 「기존 팀 내용 보존」과 「정본 전체 교체」를 함께 요구하면 해당 파일은 쓰지 않고 충돌하는 요구만 확인한다. 일반 초기화 요청만으로 템플릿 항목이 선택됐다고 보지 않는다.

## 필수 절

기존 내용 보존을 요청한 경우 빠진 정보를 찾는 기준이다. 전체 교체는 절별 병합 없이 정본 전체를 사용한다.

| 템플릿 | 필수 `##` 절 | 선택 `##` 절 | front matter |
| --- | --- | --- | --- |
| 기능 Issue | 목표, 사용자 요청 원문, 현재 동작과 변경 후 동작, 영향 범위, 달성 조건, 계획, 참고 링크 | 제약 사항, 지금 알고 있는 것, 남은 결정 | name, about, title, labels |
| 버그 Issue | 목표, 사용자 요청 원문, 기대 동작, 실제 동작, 재현 절차, 확인한 환경, 영향 범위, 달성 조건, 계획, 참고 링크 | 제약 사항, 지금 알고 있는 것, 남은 결정 | name, about, title, labels |
| PR | Issue와 해결 범위, 변경 내용, 완료 조건 확인과 검증 근거, 위험·배포·다음 조치 | 중요한 결정과 계획 대비 차이, 화면 | 없음 |

선택 절이 없는 것은 누락이 아니다. 기존 PR의 Issue·검증 상태·위험과 전달도 대응 정보를 요구하면 같은 뜻으로 취급한다. 기능의 As-Is/To-Be와 버그의 실제/기대 동작은 같은 역할이며 중복 표를 요구하지 않는다.

## 대상 확인

1. 대상 저장소의 루트, remote, 브랜치, 작업본 상태를 확인한다. Git 저장소가 아니면 멈추고 보고한다. remote가 없어도 로컬 설치·갱신은 진행한다.
2. `.github/ISSUE_TEMPLATE/`의 전체 파일과 저장소 루트·`.github/`·`docs/`의 `pull_request_template*`, 각 위치의 `PULL_REQUEST_TEMPLATE/` 폴더를 대소문자 구분 없이 확인한다.
3. 기능·버그 Issue의 정본과 같은 파일명은 대소문자 구분 없이 찾는다. 기존 `feature_request.md`·`Bug_Report.md`도 대응 대상이다. 설치·갱신 모두 기존 이름을 유지하며 대문자 파일을 중복 생성하지 않는다. 두 대응 파일이나 다른 이름의 같은 종류가 함께 있으면 자동 삭제·추측 교체하지 않고 정확한 대상을 확인한다.
4. PR 템플릿이 다른 지원 위치에 하나 있으면 그 경로에서 처리하고 `.github/PULL_REQUEST_TEMPLATE.md`를 추가하지 않는다. 복수 PR 템플릿이나 폴더형 템플릿은 대상 선택 전 교체하지 않는다. 종류·대상이 불명확한 파일만 보류하고 명확한 나머지는 진행한다.
5. 선택한 대상 외의 staged·미커밋·미추적 파일을 보존한다. 대상 템플릿 자체에 다른 작업의 변경이 있으면 일반 갱신 요청으로 그 변경까지 승인됐다고 보지 않고 해당 파일의 교체 범위를 확인한다. 대상과 저장소 루트 아래 상위 경로의 심볼릭 링크는 따라가서 쓰지 않고 보류한다. 대상이 확인한 저장소 루트 밖이면 보류한다.

## 없는 파일 설치와 기존 내용 보존

없는 종류는 정본을 복사한다. 필요한 경우에만 `.github/ISSUE_TEMPLATE/`를 만든다. 기존 파일은 아래 갱신 절차로 전체 교체한다. 다만 기존 내용 보존이나 없는 파일만 설치를 요청했다면 기존 파일은 바꾸지 않고 `diff -u <정본> <대상>`의 차이와 빠진 필수 정보를 보고한다.

절 이름이 달라도 제목이나 안내 문구가 같은 정보를 요구하면 동등한 절로 인정한다. 예: 「배경」은 목표, 「완료 기준」·「Acceptance Criteria」는 달성 조건이다. 동등한 두 제목과 판단 근거를 적고 누락으로 보고하지 않는다. 확신할 수 없으면 누락으로 단정하지 않고 「판단 보류」로 보고한다. 갱신이 필요하면 「템플릿을 새 정본으로 갱신해줘」라는 요청 경로를 안내한다.

## 기존 파일 갱신

1. 실제 소스·기존 대상 경로와 `diff -u <대상> <정본>`을 안내한다. `diff`의 exit 1은 내용 차이이며 읽기 오류와 구별한다. 기존 팀 전용 절·라벨 등도 정본으로 교체된다는 영향을 적는다.
2. 바이트가 같으면 「이미 최신」으로 보고하고 쓰지 않는다. 다르면 새 정본을 대상과 같은 디렉터리의 임시 파일로 복사해 바이트를 확인한다. 기존 파일을 먼저 `rm`하지 않는다.
3. 적용 직전 대상이 확인 당시 내용과 같은지 재확인한다. 다른 세션이 바꿨으면 해당 파일만 보류한다. 준비된 새 파일을 기존 경로로 교체하고 정본과 바이트가 같은지 확인한다. 복사·확인 실패 시 기존 파일을 그대로 두고 실패를 보고한다.
4. 임시 파일은 해당 실행이 만든 것만 정리한다. 기존 이름·경로를 유지하고, 대소문자 중복 파일·다른 위치의 PR 템플릿을 추가하지 않는다. 재실행은 바이트 대조부터 하여 이미 적용된 파일을 다시 교체하지 않는다.

기존 파일 하나를 교체하는 예제다. 실제 확인한 정본·대상·저장소 루트를 세 인자로 전달한다. 경로는 확인한 실제 경로를 사용한다. 여러 파일을 한 번에 삭제하는 명령은 사용하지 않는다.

```bash
python3 - '<정본 경로>' '<기존 대상 경로>' '<저장소 루트>' <<'PY'
from pathlib import Path
import os
import sys
import tempfile

source, target, root = map(Path, sys.argv[1:])
root = root.resolve(strict=True)
target = Path(os.path.abspath(target))

def check_target():
    try:
        target.relative_to(root)
    except ValueError:
        raise SystemExit('보류: 대상이 저장소 루트 밖임')
    for component in (target, *target.parents):
        if component == root:
            break
        if component.is_symlink():
            raise SystemExit('보류: 대상 또는 상위 경로가 심볼릭 링크임')
    if not target.is_file():
        raise SystemExit('보류: 대상은 기존 일반 파일이어야 함')

check_target()
new, old = source.read_bytes(), target.read_bytes()
if new == old:
    print('이미 최신:', target)
    raise SystemExit(0)
fd, temporary = tempfile.mkstemp(prefix='.git-workflow-template-', dir=target.parent)
try:
    with os.fdopen(fd, 'wb') as stream:
        stream.write(new)
    os.chmod(temporary, target.stat().st_mode & 0o777)
    if Path(temporary).read_bytes() != new:
        raise SystemExit('실패: 복사 검증 불일치, 기존 파일 유지')
    check_target()
    if target.read_bytes() != old:
        raise SystemExit('보류: 대상 변경 감지, 기존 파일 유지')
    os.replace(temporary, target)
    if target.read_bytes() != new:
        raise SystemExit('미확인: 교체 후 정본 일치 확인 실패')
    print('갱신:', target)
finally:
    if os.path.exists(temporary):
        os.unlink(temporary)
PY
```

이 예제는 파일 교체만 수행한다. 항목 선택·대상 발견·권한·미커밋 변경 확인은 앞 절차를 먼저 적용한다. 한 파일의 교체는 원자적으로 수행하지만 세 파일 전체를 하나의 트랜잭션으로 처리하지 않으므로 개별 성공·실패를 보고한다.

## 라벨 확인과 결과

Issue 템플릿 front matter의 라벨(`enhancement`, `bug`)이 대상 저장소에 있는지 [labels](../../git-workflow/references/labels.md)의 조회 절차로 확인한다. remote가 없으면 「라벨 미확인: remote 없음」으로 보고한다. 없는 라벨은 보고만 하고 생성은 사용자가 요청한 범위에서만 진행한다.

- 실제 소스와 대상 경로, 선택한 모드·종류
- 설치·갱신·이미 최신·보존·보류·실패·미확인과 이유
- 갱신 파일의 정본 바이트 일치, 보존 모드의 차이·동등한 절·판단 보류·누락 필수 정보
- 라벨 존재 여부와 조회 실패·미확인 사유
- 템플릿 외 항목의 미실행 상태

커밋·push는 요청된 경우에 [commit-rule](../../commit-rule/SKILL.md)로 진행한다. 로컬 정본 갱신은 플러그인 버전 발행·호스트 재설치가 아니다.
템플릿 절의 작성 기준은 [Issue 양식](../../issue-create/references/issue.md)과 [PR 양식](../../pr-create/references/pr.md)이다.
