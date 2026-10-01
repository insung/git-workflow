# TC-01 고정 입력: 테스트가 빠진 가상 PR

변경된 pr-review가 의도·구현·테스트 대조로 결함을 찾는지 확인하는 입력이다. 하위 에이전트에 「입력」 절 전체와 pr-review 스킬을 주고 “이 PR을 pr-review로 검토해줘”라고 요청한다. 「기대 지적」 절은 에이전트에게 주지 않는다.

## 입력

### Issue #12 (가상)

```markdown
## 목표
네트워크 일시 오류에도 “재시도 불가”만 표시되는 문제를 고쳐 오류 종류에 맞는 재시도 여부를 반환한다.

## 영향 범위
- 포함: 오류 분류 함수와 유닛 테스트
- 제외: 안내 화면 문구 변경, 결제 요청 자동 재전송

## 달성 조건
- [ ] AC-01: network 오류는 재시도 가능으로 분류
- [ ] AC-02: expired 오류는 재시도 불가로 분류
- [ ] AC-03: 알 수 없는 오류는 재시도 불가로 분류해 기존 안내 유지
```

### plan.md 단계 표

```markdown
| 단계 | 제목 | 설명 | 검증 사례 | 완료 |
| --- | --- | --- | --- | --- |
| [01](01-todos-retry-classification.md) | 오류 분류 | 오류 종류별 재시도 여부 반환과 유닛 테스트 | TC-01<br>TC-02<br>TC-03 | [x] |
```

### 01-todos-retry-classification.md

```markdown
# 01 오류 분류

## 변경 대상

| 구분 | 경로 | 이유 |
| --- | --- | --- |
| Modify | `src/retry.ts` | 오류 종류별 재시도 여부 반환 |
| Test | `tests/retry.test.ts` | 분류 사례 assertion |

## 작업

| # | 작업 | 완료 | 처리 내용 |
| --- | --- | --- | --- |
| 1 | network·expired·unknown 오류 분류 함수 구현 | [x] | `isRetryable` 추가 (a1b2c3d) |
| 2 | 사례별 유닛 테스트 작성 | [x] | 세 사례 assertion 추가 (a1b2c3d) |

## 검증

| 사례 | AC | 명령·작업 디렉토리 | 기대 결과 | 결과 |
| --- | --- | --- | --- | --- |
| TC-01 | AC-01 | `npm test -- tests/retry.test.ts`, 리포 루트 | network 입력에서 true | 통과 (a1b2c3d) |
| TC-02 | AC-02 | 같은 명령 | expired 입력에서 false | 통과 (a1b2c3d) |
| TC-03 | AC-03 | 같은 명령 | unknown 입력에서 false | 통과 (a1b2c3d) |

## 제외 범위

- 안내 화면 문구 변경 (02 단계)
```

### PR diff (a1b2c3d)

```diff
--- a/src/retry.ts
+++ b/src/retry.ts
@@ -1,3 +1,7 @@
-export function isRetryable(): boolean {
-  return false;
-}
+export type ErrorKind = 'network' | 'expired' | 'unknown';
+
+export function isRetryable(kind: ErrorKind): boolean {
+  if (kind === 'network') return true;
+  if (kind === 'expired') return false;
+  return false;
+}
--- /dev/null
+++ b/tests/retry.test.ts
@@ -0,0 +1,9 @@
+import { isRetryable } from '../src/retry';
+
+test('network 오류는 재시도 가능', () => {
+  expect(isRetryable('network')).toBe(true);
+});
+
+test('알 수 없는 오류는 재시도 불가', () => {
+  expect(isRetryable('unknown')).toBe(false);
+});
--- a/src/messages.ts
+++ b/src/messages.ts
@@ -4,1 +4,1 @@
-export const RETRY_FAILED = '재시도할 수 없습니다.';
+export const RETRY_FAILED = '잠시 후 다시 시도해 주세요.';
```

### handoff.md 검증 요약

```markdown
| TC/AC | 사례와 테스트 파일 | 기대 | 실제·상태 | 명령·실행 위치 |
| --- | --- | --- | --- | --- |
| TC-01 / AC-01 | tests/retry.test.ts | true | pass | npm test, 리포 루트 |
| TC-03 / AC-03 | tests/retry.test.ts | false | pass | npm test, 리포 루트 |
```

## 기대 지적

| ID | 지적 | 근거 | 기대 판정 |
| --- | --- | --- | --- |
| F1 | AC-02(expired → false) 테스트 없음 | `tests/retry.test.ts`에 expired assertion 없음 | fail |
| F2 | todo 작업 2의 “세 사례 assertion 추가”와 TC-02 결과 “통과”가 실제 diff·handoff와 맞지 않음 | 테스트는 두 개, handoff에 TC-02 행 없음 | fail 또는 human-review |
| F3 | 제외 범위의 안내 문구 변경이 포함됨 | `src/messages.ts` 변경, todo 제외 범위 “안내 화면 문구 변경 (02 단계)” | fail 또는 warn |

지적하지 않아야 하는 것: `isRetryable`의 분류 로직. 세 AC 모두 코드로는 충족한다.

## 통과 기준

| 기준 | 조건 |
| --- | --- |
| 필수 | 3회 실행 모두 F1과 F3를 지적 |
| 필수 | 3회 중 2회 이상 F2를 지적 |
| 필수 | 분류 로직을 결함으로 지적하지 않음 |
| 참고 | spec-it manifest/lock이 없다는 이유로 정책 판정을 하지 않음 |
