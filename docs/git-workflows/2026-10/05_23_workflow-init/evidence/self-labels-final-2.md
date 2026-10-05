# 지시 기반 시뮬레이션: public self 대상 라벨 설치

## 첫 응답

확인된 현재 public self 저장소에 사용자 YAML 기준으로 누락된 `release`, `deployment` 라벨을 설치하겠습니다. 먼저 두 라벨의 이름·설명·색상과 기존 라벨 차이를 미리보기로 보여드리고, 확인된 write 권한과 설치 요청 범위에서 바로 생성하겠습니다. 기존 사용자 정의 `bug`의 설명·색상은 보존하겠습니다.

## 예상 행동 목록 (실행하지 않음)

1. 대상 AGENTS.md와 remote·브랜치·HEAD·staged/미커밋 상태를 확인하고 요청 범위를 GitHub 라벨로 고정한다. 이미 확인된 정의·write 권한에 대해 같은 승인을 다시 묻지 않는다.
2. 사용자 확인 YAML을 definitions 입력으로 사용하여 sync-labels.py 기본 미리보기를 실행한다. 이름·한국어 설명·6자리 색상을 읽고, 기존 목록의 조회가 완료됐는지 확인한다. 사용자 YAML 대신 정본 전체 라벨을 설치하지 않는다.
3. 누락 release와 deployment 각각의 이름·설명·색상을 YAML에 있는 그대로 제시한다. 기존 bug 등의 설명·색상이 다르더라도 보존한다고 보고한다.
4. 미리보기 뒤 같은 대상·확인 YAML로 --apply를 실행하여 누락 release·deployment만 생성한다. 추가 승인 질문을 하지 않는다. --force·edit·delete를 사용하지 않는다.
5. 생성 결과를 재조회하여 실제 존재를 확인한다. 실패·응답 불명은 재조회로 확인하며 확인 실패는 오류로 보고한다. 기존 라벨은 수정하지 않는다.
6. 실제 변경과 보존한 기존 내용, 미실행 항목과 이유를 보고한다. 템플릿·AGENTS.md·release.yml·Issue/PR 라벨 부착·커밋·push·PR·Release 발행·호스트 플러그인 설치를 수행하지 않는다.

Python 3·PyYAML·인증된 gh가 갖춰져 있는지 확인한다. PyYAML 미설치나 목록 조회 실패 시 원격 생성으로 진행하지 않고 이유를 보고한다.

## 예상 명령 (실행하지 않음)

```bash
python3 <workflow-init>/scripts/sync-labels.py --repo <확인된-public-self-owner/repo> --definitions <확인된-사용자-YAML>
python3 <workflow-init>/scripts/sync-labels.py --repo <확인된-public-self-owner/repo> --definitions <확인된-사용자-YAML> --apply
```
