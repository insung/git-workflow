# 로컬 시험 / Local pilot

이 플러그인 checkout의 소스 파일을 새 세션에서 명시한다. 다른 대상 리포면 플러그인 checkout과 대상 리포의 위치를 모두 제공한다. 설치 캐시는 미발행 작업본을 자동으로 읽지 않는다.

## 읽기 전용 조사 / Read-only investigation

```text
skills/issue-create/SKILL.md와 skills/plan-create/SKILL.md를 읽어줘.
대상: <dmp.crawler의 실제 경로>. Python 버전 업그레이드의 현재 실행 경로와
목표 버전 결정에 필요한 내용을 조사해줘. 파일 수정·Issue 게시·구현·커밋·
유료 API 호출·배포는 하지 마. 부족한 정보와 예상 문서 흐름만 알려줘.
```

기대: 사실·미확인을 구분하고 필요한 결정과 의도·영향·달성 조건을 반환한다. Issue나 plan이 생성됐다고 하지 않는다.

## 로컬 초안 작성 / Local draft only

```text
skills/git-workflow/SKILL.md, skills/issue-create/SKILL.md,
skills/plan-create/SKILL.md를 읽어줘. 대상: <시험용 리포 경로>.
요청: Python을 <확정 목표 버전>으로 올리되 <수집 동작 계약>을 유지한다.
Issue 초안과 plan/todos만 작성해줘. 실제 대상 리포의 plan 경로 규칙을 따르고
단위별 테스트·배포/롤백 계획을 포함해줘. GitHub 게시·구현·커밋·배포는 하지 마.
```

기대: local-draft·미확정 항목·not-run을 기록한다. 원격 Issue 번호/URL을 만들지 않는다. 구현·원격 PR·머지 시험은 별도 요청과 실제 권한·연결 Issue가 필요하다.

구조 검사: `node --test tests/package.test.mjs`, `node scripts/check-package.mjs`, `git diff --check`. 통과해도 자동 선택·정책 정확도·실제 GitHub 실행이 입증되는 것은 아니다.
