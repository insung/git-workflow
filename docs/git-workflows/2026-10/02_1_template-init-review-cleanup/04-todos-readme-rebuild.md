# 04 README 재구성과 예제 정리

계획: [plan의 단계 표](plan.md#단계)

## 변경 대상

| 구분 | 경로 | 이유 |
| --- | --- | --- |
| Modify | `README.md`, `README.ko.md` | sideband-comments README 구성 기준 재작성, spec-it 절 추가 |
| Modify | `docs/examples/README.md`, `docs/examples/*/README.md` | 반복 면책 문구·규칙 재서술 정리 |

## 작업

| # | 작업 | 완료 | 처리 내용 |
| --- | --- | --- | --- |
| 1 | README.md를 아래 절 구성으로 재작성 | [ ] | |
| 2 | README.ko.md를 같은 절 순서·내용으로 재작성 | [ ] | |
| 3 | 가상 예제 안내를 `docs/examples/README.md`에 한 번만 두고 각 예제의 면책 문장과 규칙 재서술 제거 | [ ] | |

| sideband-comments 절 | git-workflow 절 |
| --- | --- |
| 한 줄 가치·도입 문단 | Issue 의도부터 머지까지 같은 근거로 잇는다는 한 줄과 도입 문단 |
| Why | 의도·근거 연결, 테스트 누락 교차 확인, 단계별 승인 분리, 대상 리포 템플릿 정렬 |
| How it works | 흐름도와 단계별 스킬 표(template-init 포함) |
| (없음) | spec-it: 역할, 채택·미채택 시 pr-review 동작 차이, 저장소 링크 |
| Installation | Claude Code·Codex 설치와 template-init 첫 실행 |
| Architecture | 패키지 구조 |
| Development | 검증 명령과 구조 검사의 한계 |
| (없음) | 사용 시나리오와 예제 링크 |

제거 대상: 규칙 재서술, 반복 면책 문구, 특정 브랜치 고정 설치 안내, `.superpowers/` 메모, Wiki 안내, 자동 설치 불가 문장

## 검증

| 사례 | AC | 명령·작업 디렉토리 | 기대 결과 | 결과 |
| --- | --- | --- | --- | --- |
| <a id="tc-09"></a>TC-09 | AC-01, AC-02, AC-03 | README.md·README.ko.md `##` 제목 비교, “local-draft”·“--force”·“번호 누락” 검색, spec-it 절 확인, 리포 루트 | 절 일치, 재서술 0, spec-it 절에 역할·채택·미채택 동작 존재 | 미실행 |

## 제외 범위

- 스킬 본문 규칙 변경 (01~03 단계)
- 시나리오 추가·삭제
