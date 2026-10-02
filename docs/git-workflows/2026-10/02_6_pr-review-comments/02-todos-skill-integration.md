# 02 담당 스킬 연결

계획: [plan의 단계 표](plan.md#단계)

## 변경 대상

| 구분 | 경로 | 이유 |
| --- | --- | --- |
| Modify | `skills/pr-review/SKILL.md` | 검토·재검토 결과 댓글 시점과 전용 reference 연결 |
| Modify | `skills/pr-merge/SKILL.md` | 머지 직전 확인 댓글 및 HEAD 변경 시 인계 |
| Modify | `skills/pr-create/SKILL.md` | 본문·handoff와 요청된 댓글 책임 경계 |

## 작업

| # | 작업 | 완료 | 처리 내용 |
| --- | --- | --- | --- |
| 1 | pr-review는 검토 결과 고정 후 요청된 최초·재검토 댓글을 전용 reference에 따라 작성 | [x] | 고정 결과 후 요청된 최초/재검토만 전용 규칙 적용 |
| 2 | pr-merge는 동일 검토 HEAD·현재 결과·남은 위험·승인 상태 확인 후 요청된 확인 결과만 기록 | [x] | 머지 직전 확인만 기록; 불일치면 두 HEAD·보류/인계 기록 |
| 3 | HEAD 변경은 pr-review로 인계하고 이전 pass·승인을 새 HEAD에 재사용하지 않음 | [x] | 새 HEAD에 이전 pass·승인 재사용 금지 |
| 4 | pr-create는 본문·handoff를 기본 기록으로 사용하고 검토 결과를 만들어 게시하지 않음. 요청된 인계 댓글은 공통 기록 규칙 적용 | [x] | 본문/handoff 기본, 별도 인계 요청만 공통 규칙 적용 |
| 5 | 댓글 부재만으로 머지를 차단하지 않으며 기존 fail/human-review·승인·보호 규칙 유지 | [x] | 댓글 부재 비차단; fail/human-review/승인/보호 유지 |
| 6 | 모든 스킬이 공통 양식·링크·승인 정본과 일치하는지 대조 | [x] | 3스킬·공통/전용 규칙 자체 대조 |

## 검증

| 사례 | AC | 명령·작업 디렉토리 | 기대 결과 | 결과 |
| --- | --- | --- | --- | --- |
| <a id="tc-01"></a>TC-01 | AC-01·AC-05 | 검토 요청만/댓글 포함 요청/재검토 요청을 자체 fixture로 대조 | 담당·시점 일치, 요청 없으면 대화나 요청된 review.md로 반환 | 자체 대조 완료 — [handoff](handoff.md#자체-시나리오) 참조; 독립 검토 아님 |
| <a id="tc-02"></a>TC-02 | AC-06 | 머지 직전 동일 HEAD와 변경 HEAD fixture 대조 | 동일 HEAD 확인, 변경 시 재검토 인계, 댓글 부재만으로 차단 없음 | 자체 대조 완료 — [handoff](handoff.md#자체-시나리오) 참조; 독립 검토 아님 |
| <a id="tc-03"></a>TC-03 | AC-07 | pr-create PR 작성·댓글 별도 요청 fixture와 #5 양식 대조 | 본문·handoff 기본 기록, 종료 코멘트·검토 결과 책임 침범 없음 | 자체 대조 완료 — [handoff](handoff.md#자체-시나리오) 참조; 독립 검토 아님 |

## 제외 범위

- 원격 PR·머지 실행
- 새 issue-close 스킬
- 브랜치·버전 변경
