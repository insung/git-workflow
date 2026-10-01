# 머지 후 Wiki 작성 계약

PR의 실제 MERGED 상태·mergedAt·mergeCommit 확인 후 작성한다. 기존 Wiki 제목/언어/구조가 우선이다. 소스는 Issue, plan/todo, commit, handoff, review다. 내부 계획을 전문 복사하지 않고 사용자에게 필요한 기능 설명으로 정리한다.

```markdown
# <기능 이름>

- 문서 상태: <draft / unpublished / published>
- 기준: <확인된 merge commit>
- 배포 상태: <확인된 환경·version·시각 또는 미확인/미배포>

## 목적과 배경

<해결한 문제와 사용자에게 필요한 결과>

## 실제 동작과 사용 방법

<사용 조건·입력·출력·실패 처리·구체 사용 예. 코드에서 확인한 동작>

## 설계 판단과 영향

<선택 이유·대안/제약·호환성/데이터/소비자 영향>

## 검증과 운영

<실제 사례·검증 환경·결과 요약, 미확인 환경·배포 후 확인·롤백 조건>

## 출처

- Issue / PR:
- merge commit:
- plan / 관련 todo / review의 확인된 원격 링크:
```

게시 승인이 없거나 Wiki 접근 불가면 같은 docs 작업 디렉토리 wiki.md에 초안을 보존하고 미발행으로 반환한다. Wiki를 임의 활성화하지 않는다. 승인된 게시 뒤 페이지와 원격 commit을 확인한다. 실패 재시도는 이미 머지한 PR을 다시 머지하지 않고 확인된 merge commit에서 Wiki만 재개한다.
