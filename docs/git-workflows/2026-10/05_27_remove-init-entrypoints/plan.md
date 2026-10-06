---
issue: "#27"
status: ready
branch: "codex/remove-init-entrypoints"
base: "main"
created: "2026-10-05"
---

# 초기화 진입점 완전 통합

## 요청

> 삭제하고 그것을 0.6.0 에 포함되도록 해줘.

선행 질문의 대상은 template-init·agents-init이다. 호환 진입점 유지 결정은 폐기한다. workflow-init의 템플릿·AGENTS 부분 선택은 유지한다.

## 공통 맥락과 범위

목적은 사용자가 호출하는 초기화 스킬을 하나로 만드는 것이다. 기존 절차·자산·라벨 도구·보존·AGENTS 승인 규칙은 바꾸지 않는다. 요청 누락 방지 규칙과 main의 미추적 .github/release.yml은 제외한다. 역사 문서는 당시 사실로 남긴다.

조정 세션은 Issue·계획·독립 기준·검토·PR·배포를 담당하며 구현은 별도 구현자에 맡긴다. 구현자는 Issue → plan → task → handoff를 읽고 review/issue-27·비공개 기준·입력을 읽지 않는다.

## 단계

| 단계 | 제목 | 검증 사례 | 완료 |
| --- | --- | --- | --- |
| 01 | [진입점 제거와 현행 참조 정리](task-01-remove-entrypoints.md) | 삭제·경로·자산 보존·패키지·라벨 회귀 | [x] |
| 02 | 검토·PR 머지·0.6.0 갱신과 호스트 설치 | 대상 SHA·노트·설치 discovery 트리 대조 | [ ] |

## 최종 검증과 전달

node --test tests/package.test.mjs; python3 tests/label-sync.test.py; node scripts/check-package.mjs; git diff --check. 사용자 관찰 결과는 옛 두 호출 대신 workflow-init의 명시적 템플릿/AGENTS 부분 요청으로 안내하는 것이다.

사용자는 두 스킬 삭제와 0.6.0 포함을 승인했다. 이를 위해 해당 수정 commit/push·PR 머지·v0.6.0 태그 갱신·Release 노트 수정·두 호스트 재설치를 수행한다. 현재 공개 태그 OID 9767073e1879befea60ce0ac3b46875974ea30d3와 대상 1f6d0da를 기록하고 조건부 갱신한다. v0.5.0은 유지한다. 다른 source 변경이 생기면 재검토한다.

롤백은 이번 변경 범위와 보존한 태그 OID를 근거로 별도 승인 하에 수행한다. 공개 태그 이력을 삭제하거나 다른 작업을 reset/clean하지 않는다.

## 기록 정리

2026-10-06 Issue #39의 승인에 따라 전달문·검토 입력·응답 전문·로그·중복 초안을 현재 트리에서 정리했다. 이 문서의 기존 상태·판정·승인은 당시 기록이며 현재 완료 상태로 갱신한 것이 아니다. 필요한 원문은 [정리 전 기록](https://github.com/insung/git-workflow/tree/3993cb36cdb3fca6ff8b2bfee47016eb8a70e959/docs/git-workflows/2026-10/05_27_remove-init-entrypoints)에서 조회한다.
