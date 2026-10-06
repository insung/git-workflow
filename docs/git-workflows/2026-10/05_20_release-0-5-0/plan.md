---
issue: "#20"
status: ready
branch: "chore/release-0.5.0"
base: "main"
created: "2026-10-05"
---

# 0.5.0 버전과 설치 계획

요청: 버전 업데이트하고 클로드, 코덱스 플러그인 설치.

PR #18의 기존 동작을 유지하며 manifest 3곳만 0.5.0으로 올린다. 마켓플레이스 항목은 별도 version 필드가 없으므로 새 필드를 추가하지 않는다.

1. [버전 갱신](task-01-version-install.md): 변경 내역 작성, 3 manifest 버전 일치·스킬 파일 무변경·패키지 검사와 회귀 확인.
2. 검증한 로컬 원본으로 두 호스트 설치. 설치·enabled·버전과 핵심 스킬의 SHA-256 일치 확인.
3. 변경을 커밋하고 Draft PR로 인계. PR 머지·태그·GitHub Release는 별도 승인 대기.

롤백: 버전 메타데이터 변경을 되돌리고 이전 검증 원본으로 재설치. 사용자 데이터 삭제는 없음.

## 기록 정리

2026-10-06 Issue #39의 승인에 따라 전달문·검토 입력·응답 전문·로그·중복 초안을 현재 트리에서 정리했다. 이 문서의 기존 상태·판정·승인은 당시 기록이며 현재 완료 상태로 갱신한 것이 아니다. 필요한 원문은 [정리 전 기록](https://github.com/insung/git-workflow/tree/3993cb36cdb3fca6ff8b2bfee47016eb8a70e959/docs/git-workflows/2026-10/05_20_release-0-5-0)에서 조회한다.
