# 크롤러 시작 장애 hotfix / Production startup hotfix

> 운영 크롤러 시작 오류를 Issue와 hotfix 브랜치로 수정해줘.

## 흐름

장애 조사·Issue → plan/todos·재현/회귀/배포 계획 → prod에서 hotfix/crawler-startup → 최소 수정·테스트·prod PR → pr-review·승인·pr-merge → 승인된 배포·상태 확인 → dev 역반영 PR·충돌/회귀 확인·리뷰·승인·머지

## 확인할 경계

- prod 머지가 자동 배포를 시작한다면 머지 승인 전에 그 영향을 제시한다.
- dev 역반영은 충돌 해결과 검증을 포함하며 조용히 강제 머지하지 않는다.
- git-release는 실제 선택한 prod 릴리즈 커밋에 승인된 태그·Release를 남긴다.
