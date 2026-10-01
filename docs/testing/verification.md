# 로컬 후보 검증 결과

> 이전 후보의 기록이다. 현재 정본과 양식은 [전체 흐름](../workflow.md) 및 새 docs/git-workflows 계획·검증 기록을 따른다. 아래 이전 절차와 결과를 현재 실행 증거로 재사용하지 않는다.

2026-10-01, `feat/issue-review-workflow`의 미커밋 작업본을 검증했다. 후보 버전은 0.2.0이다.

## 확인 결과

| 검사 | 결과 | 확인 범위 |
| --- | --- | --- |
| `node --test tests/package.test.mjs` | 8/8 통과 | 정상 패키지와 누락 단계·이름·버전·링크·discovery 경로·JSON 오류 처리 |
| `node scripts/check-package.mjs` | exit 0 | 현재 스킬·manifest·상대 링크 구조 |
| `claude plugin validate .claude-plugin/plugin.json` | 통과 | Claude plugin manifest |
| `claude plugin validate .claude-plugin/marketplace.json`, `claude plugin validate .` | 통과 | marketplace 구조 |
| `git diff --check` | exit 0 | tracked diff의 공백 오류 |
| 별도 에이전트의 지시 시나리오 검토 | 8개 기대 행동 확인 | [시나리오 기록](issue-review-scenarios.md)의 가상 다음 행동 |

독립 최종 리뷰에서 같은 파일의 다른 세션 staged hunk를 덮어쓸 위험을 발견했다. 해당 경로의 staged 변경이 없을 때만 HEAD 재구성 절차를 허용하고, 기존 staged 변경이 있거나 검사에 실패하면 index를 보존하도록 수정했다. 후속 읽기 전용 시나리오에서 `git add`와 같은 파일의 무조건적인 `git commit --only`가 보류되는 것을 확인했다. 실제 index 변경 테스트는 수행하지 않았다. 오래된 스킬 내부 참조와 머지 시 전체 작업이 끝난다는 문구도 수정했다. 위 명령 검사는 수정 후 다시 통과했다.

## 실행 중 판단과 범위

- 사용자가 최소 범위의 빠른 구현을 요청했으므로 계획을 기록한 뒤 로컬 구현을 진행했다. 반복적인 계획 승인 질문은 하지 않았다.
- GitHub 계정 전환과 인증 확인이 실패해 실제 Issue를 만들지 않았다. [로컬 초안](../issues/2026-10-01-issue-review-workflow.md)으로 범위를 기록했다.
- 앱의 worktree 생성은 대화 루트가 Git 저장소가 아니라 실패했다. 깨끗한 git-workflow checkout에서 별도 feature branch를 만들었다. 완료 시까지 무관한 변경은 발견하지 않았다.
- 변경은 미커밋이므로 기준 HEAD와 현재 작업본 diff 및 새 파일을 함께 리뷰했다. base..HEAD만으로 검토하지 않았다.
- spec-it의 기존 미커밋 runner 후보는 읽기만 했다. 정책과 runner를 복제하거나 수정하지 않았으며 선택적으로 현재 정본 계약을 확인하도록 연결했다.
- 설치 캐시, 원격 저장소, Issue/PR/Wiki, AWS 환경은 변경하지 않았다. 커밋과 push도 수행하지 않았다.

## 남은 실제 파일럿 확인

이 결과는 스킬 지시와 패키지 구조의 검증이다. 설치 호스트의 실제 discovery, 모델의 정책 판정 정확도, 별도 spec-it runner 실행, 실제 PR 리뷰·머지·Wiki 게시를 확인한 것은 아니다. [로컬 시험 안내](local-pilot.md)의 소스 파일 호출로 사용자가 현재 세션에서 시험할 수 있다. 원격 마켓플레이스 설치 명령은 발행된 소스를 읽으므로 이 작업본을 자동으로 반영하지 않는다.
