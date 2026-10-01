> 작업 이력 / Historical record: 당시 구현·검증 기록을 보존한다. 현재 실행 상태나 사용 예시가 아니다. 현재 사용 방식은 [README](../../../../README.ko.md)를 따른다.

# 단계별 압박 시나리오 관찰

> 이전 후보의 기록이다. 현재 정본과 양식은 [전체 흐름](../../../../README.ko.md#사용-시나리오) 및 새 docs/git-workflows 계획·검증 기록을 따른다. 아래 이전 절차와 결과를 현재 실행 증거로 재사용하지 않는다.

2026-10-01, 로컬 미발행 후보의 지시 적합성을 읽기 전용 에이전트로 관찰했다. 원격 실행·host loading·런타임 enforcement 테스트가 아니다.

## RED: 기존 스킬

기존 git-workflow는 목표·달성 조건과 원격 작성 승인은 요구했지만, 의도·영향 범위를 구현 시작 조건으로 삼지 않았다. local Issue와 docs 인계 의무, 테스트 결과/리뷰 HEAD 연결, spec-it pin, 머지 확인 이후 Wiki와 재시도 규칙도 없었다. 이 누락은 현 계약을 충족하지 못한다는 뜻이며 실제 에이전트가 무단 실행했다는 증거가 아니다.

## GREEN: 단계별 스킬을 읽은 가상 운영 결과

| 시나리오 | 기대와 관찰한 다음 행동 | 상태 |
| --- | --- | --- |
| Issue에 의도·영향 범위 없음 | 조사·보완하고 남은 결정을 반환; 구현 보류 | issue-incomplete |
| 원격 인증 없이 대화 요청만 있음 | docs/issues/ local 초안과 원격 미생성 표시; 로컬 파일럿만 허용 | local-draft |
| HEAD A의 녹색 테스트, 현재 B, manifest/lock 없음 | B diff 재검토, 정책 채택 전 shadow assessment | human-review |
| PR 생성만 승인, 리뷰 pass | 머지 대상 HEAD와 Wiki 발행 범위에 대한 명시 승인 확인 | 머지 승인 대기 |
| 머지 응답 불명, Wiki 비활성화 | 먼저 merged 상태 재조회; 미확인 중단 또는 확인 후 docs/wiki/ 초안 | merge-unconfirmed 또는 wiki-unpublished |
| 유닛 테스트 통과만 있고 사례별 결과 없음 | 기대/실제·명령·revision·환경·누락 확인 | human-review |
| A 머지 승인 후 HEAD B로 변경 | B 재검토 및 새 HEAD 승인 | 재검토·승인 대기 |
| 머지 확인 후 Wiki 실패, 재시도 | merge commit부터 Wiki만 재개; PR 재머지 금지 | merged + wiki-unpublished |

8개 모두 기대한 상태와 행동을 구분했다. 같은 지시의 실제 세션 적용은 local-pilot을 사용한다. 정책 판정 정확도와 실제 GitHub 변경은 별도 파일럿 증거가 필요하다.
