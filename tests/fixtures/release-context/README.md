# 릴리즈 준비·복합 이슈 공개 사례

Issue [#56](https://github.com/insung/git-workflow/issues/56)의 공개 계획에 대응하는 입력이다. [scenarios.md](scenarios.md)는 실행자에게 주는 A~D 요청만 담는다. 합성 Issue·PR은 실제 원격 대상이 아니며 게시·변경하지 않는다.

```sh
release_case_dir=$(mktemp -d)
python3 tests/fixtures/release-context/create_fixture.py "$release_case_dir/input"
PYTHONDONTWRITEBYTECODE=1 python3 tests/release-context-fixture.test.py
```

각 실행자에게 대상 소스의 git-release·issue-create·pr-request·git-history SKILL.md와 필요한 연결 참조, scenarios.md, D의 input/repo·github.json만 제공한다. 같은 입력을 변경 전·후 각각 새 실행자 3명에게 전달하며 기대 결과·다른 실행자의 결과·독립 검토 입력을 제공하지 않는다. 실행자는 행동 계획과 실제 Git 조사 근거를 반환하고 pass/fail을 판정하지 않는다. 현재 세션이 Issue AC와 대조한 결과는 준비 PR에 기록한다.

fixture 검사는 Git 객체·변경 범위·원문 보존·생성 안전성을 확인하며 모델의 추적 정확도를 판정하지 않는다. 반복 응답 결과는 실제 GitHub 게시·호스트 탐색·일반 모델 준수를 보장하지 않는다.
