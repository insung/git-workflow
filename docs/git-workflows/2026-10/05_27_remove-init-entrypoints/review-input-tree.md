# 고정 입력: 배포 트리와 삭제 경로

## 입력

- 공개 v0.6.0 tree의 skills/template-init/SKILL.md·skills/agents-init/SKILL.md, 기본 workflow-init 자산·참조 전체
- 변경 후보의 skills tree·README 2종·scripts/check-package.mjs·tests/package.test.mjs·CHANGELOG·release-notes
- 설치 직전 및 이후 두 호스트의 활성 cache 경로

## 기대 지적

삭제된 디렉터리 부재와 현행 링크 폐쇄를 직접 검사한다. 필수 workflow-init을 임시 fixture에서 제거하면 패키지 검사가 실패해야 한다. 정본 자산·참조가 바뀌면 실패. 현재 cache에 옛 스킬이 있거나 릴리즈 노트가 호환 유지로 말하면 실패. 역사 문서에 당시 이름이 남는 것은 정상.

## 통과 기준

기계 검사를 판정 주체가 실행하고 실제 변경 파일·대상 SHA·호스트 목록과 트리를 근거로 판정한다. 모델 응답 시나리오를 실행하지 않으면 행동 실증으로 주장하지 않는다.
