# 상위·하위 Issue 의 영향 범위·설계 절 전후

실제 비공개 저장소의 상위 Issue 하나(운영자용 백오피스 구축)와 하위 Issue 다섯 개를 [Issue #109](https://github.com/insung/git-workflow/issues/109) 이전 규칙으로 쓴 본문을, 바뀐 규칙으로 다시 쓴 예시다. 저장소·조직·테이블·코드 이름과 메시지 ID·오류 코드는 같은 역할의 가상 이름으로 바꿨다. 번호 `#10` 은 상위, `#11`~`#15` 는 하위다.

규칙 정본: [동작 표와 영향 범위](../../../skills/issue-create/references/issue.md#동작-표와-영향-범위), [정보 배분](../../../skills/issue-create/references/plan.md#상위하위-issue-의-정보-배분), [설계 절 형식](../../../skills/issue-create/references/plan.md#설계-절-형식).

## 무엇이 읽기 어려웠나

| 사용자가 말한 문제 | 전 본문에서 원인 |
| --- | --- |
| 영향 범위를 알아보기 어렵다 | 「직접 변경」 한 줄에 빌드 파일·Dockerfile·배포 정의·설정·컨트롤러·서비스를 나열했다 |
| 영향 범위와 동작 표의 관계를 모르겠다 | 동작 표에 코드 경로가, 영향 범위에 동작 설명이 섞였다. 어느 대상이 어느 동작 변화를 만드는지 짝이 없다 |
| DB 설계에서 바뀌는 것과 안 바뀌는 것이 구분되지 않는다 | 「그대로」「컬럼 추가(제안)」「새 테이블(제안)」「쓰지 않음」이 한 열에 섞이고, 정렬 기준이 없다 |
| 공통 규칙·오류가 파악하기 어렵다 | 공통 규칙은 글머리와 「근거:」 한 줄, 오류는 메시지 ID 와 오류 코드를 한 문단에 나열했다 |
| 상위가 너무 길다 | 한 하위만 쓰는 응답 필드·오류까지 상위에 있었다. 하위는 「상위가 정본」이라고만 적었다 |

## 1. 영향 범위 (상위 #10)

전:

```markdown
## 영향 범위

- 직접 변경
  - 새 앱 `apps/ops-api`(build.gradle.kts·Dockerfile·deploy 태스크 정의·properties·컨트롤러·ManageService)
  - 새 공용 모듈 `service/auth`: 고객 앱의 리프레시 쿠키·세션 정책·비밀번호 복호화·로그인 헬퍼를 옮긴다
  - `library/token`: 토큰 aud 를 설정으로 고른다(고객 기본값 유지)
  - `domain/member`: 운영 조직 멤버 조회·마지막 멤버 보호·본인 탈퇴 차단
  - `domain/delivery`, `db/migration`: 요청별 다운로드 횟수·기록
  - `settings.gradle.kts`, `.github/deploy-apps.json`, `.github/workflows/deploy.yml`
  - `infra/modules/web-api`, `infra/envs/{shared,dev,prod}`(ECR·대상 그룹·호스트 규칙·Route53·로그 그룹·ECS 서비스·KMS 키·배포 롤)
- 연관 영향: 프론트 백오피스가 새 주소를 부른다
- 제외: 대시보드, 조직 관리, 2단계 인증, 예전 운영 계정 테이블 삭제
```

후(상위는 하위 Issue 표가 영향 범위를 대신한다):

```markdown
## 영향 범위

| 하위 | 결과 | 관련 동작 | 부모 AC | 선행 |
| --- | --- | --- | --- | --- |
| #11 공용 인증 모듈 | 고객 앱 동작 그대로 인증 코드를 두 앱이 함께 씀 | 로그인 | AC-01, AC-03 | 없음 |
| #12 운영 앱 골격과 인프라 | dev 운영 주소가 응답함 | 앱, 주소 | AC-01 | 없음 |
| #13 운영 인증·인가 | 운영 조직 멤버만 데이터 API 사용 | 로그인, 계정 | AC-02, AC-03 | #11, #12 |
| #14 전송 요청 목록과 다운로드 | 요청 목록·조건·CSV·횟수·기록 | 전송 요청 조회, CSV 횟수·만료, 다운로드 기록 | AC-05, AC-06 | #13 |
| #15 멤버·초대 | 초대·재전송·취소·가입·탈퇴 | 멤버·초대 | AC-04 | #13 |

- 연관 영향: 프론트 백오피스가 서버 쪽 프록시로 새 주소를 부른다. 고객 API 의 경로·쿠키·토큰은 바뀌지 않는다
- 제외: 대시보드, 조직 관리, 2단계 인증, 예전 운영 계정 테이블 삭제
```

후(하위 #14 의 대상별 표):

```markdown
## 영향 범위

| 대상 | 바뀌는 것 | 관련 동작 |
| --- | --- | --- |
| DB 마이그레이션(V14) | 요청 테이블 컬럼 추가, 다운로드 기록 테이블 생성 | CSV 횟수·만료, 다운로드 기록 |
| 전송 도메인(`domain/delivery`) | 목록 조회, 조건부 횟수 증가, 받을 수 있는지 판정 | 전송 요청 조회, CSV 횟수·만료 |
| 운영 앱 API(`apps/ops-api`) | 목록·CSV 발급 엔드포인트 두 개 | 전송 요청 조회, 다운로드 기록 |

- 제외: 채널 요청 「실패」 상태 기록, 다운로드 이력 화면, 고객 앱 다운로드 규칙
```

동작 표의 「로그인」「전송 요청 조회」 같은 행 이름이 영향 범위의 「관련 동작」에 그대로 나온다. 동작 표에 있던 코드 위치(토큰 설정 파일과 행 번호)는 「지금 알고 있는 것」으로 옮긴다.

## 2. DB 설계

전(상위):

```markdown
| 테이블 | 변경 | 내용 |
| --- | --- | --- |
| `member` | 그대로 | 운영 멤버도 고객 계정과 같은 행 |
| `organization_member` | 그대로 | 운영 조직 소속 = 운영 멤버 |
| `send_request` | 컬럼 추가(제안) | `download_count`(기본 0, 조건부 UPDATE 로 5회 상한), `last_downloaded_at`, `last_downloaded_by` |
| `download_log` | 새 테이블(제안) | `download_id`(PK) · `request_id`(FK) · `member_id` · `object_key` · `issued_at` · `client_ip` · `user_agent` · `trace_id`. 인덱스 (`request_id`, `issued_at`) |
| `old_admin_member` | 쓰지 않음 | 이번 범위에서 손대지 않는다 |
```

후(상위, 테이블당 한 행):

```markdown
## DB 설계

| 변경 | 테이블 | 무엇을 | 상태 | 담당 |
| --- | --- | --- | --- | --- |
| 새 테이블 | `download_log` | 다운로드 한 건마다 운영자·시각·IP 를 남김 | 제안 | #14 |
| 컬럼 추가 | `send_request` | 요청별 다운로드 횟수와 최근 다운로드 | 제안 | #14 |
| 그대로 사용 | `member` | 운영 멤버도 고객 계정과 같은 행 | 합의 | #13 |
| 그대로 사용 | `organization_member` | 운영 조직 소속 = 운영 멤버 | 합의 | #13 |
| 사용 안 함 | `old_admin_member` | 비어 있고 코드 연결 없음. 삭제는 후속 | 합의 | — |
```

후(하위 #14, 컬럼 상세):

```markdown
## DB 설계

`send_request` 컬럼 추가

| 컬럼 | 타입 | 뜻 | 제약 |
| --- | --- | --- | --- |
| `download_count` | int | 운영자 합산 성공 횟수 | 기본 0, 조건부 UPDATE 로 5 상한 |
| `last_downloaded_at` | datetime | 최근 성공 시각 | null 허용 |
| `last_downloaded_by` | string | 최근 성공 운영자 | null 허용 |

`download_log` 새 테이블

| 컬럼 | 타입 | 뜻 | 제약 |
| --- | --- | --- | --- |
| `download_id` | string | 기록 ID | PK |
| `request_id` | string | 전송 요청 | FK, 인덱스(`request_id`, `issued_at`) |
| `member_id` | string | 받은 운영자 | |
| `issued_at` | datetime | 발급 시각 | |
| `client_ip` · `user_agent` · `trace_id` | string | 발급 출처 | |
```

## 3. 엔드포인트 설계

전(상위):

```markdown
### 목록 공통 규칙(고객 API 와 같음)

- 목록은 `POST …/search`. 요청 본문은 `PageReq` 모양이다: `page`(1부터) · `pageSize`(최대 100) · `searchQuery[{column, operator, value}]` · `sort[{column, order}]`. 모르는 칼럼·연산자는 40001 로 거절한다
- 응답은 `PageRes<T>`: `tableData` · `page` · `pageSize` · `total` · `totalElements`
- 탭 숫자처럼 검색 조건과 무관한 개수는 별도 `GET` 으로 준다
- 근거: `library/database/.../PageModel.kt`, 고객 앱 목록 컨트롤러의 `/search`·`/count`

### 멤버·초대(#15)

(엔드포인트 표, 응답 필드 목록)

오류: 형식 오류(MSG-001)·이미 멤버(MSG-003)·대기 초대 있음(MSG-005)·1분 간격(MSG-038, `data.retryAfterSeconds`)·24시간 5회(MSG-039, `data.availableAt`)는 고객 초대가 쓰는 코드(40001·40901·40902·42901·42902 등)를 그대로 쓴다.
```

후(상위, 공통 규칙과 목록만):

```markdown
## 엔드포인트 설계

| 규칙 | 내용 | 근거 |
| --- | --- | --- |
| 목록 경로 | `POST …/search` | 고객 앱 목록 컨트롤러의 `/search` |
| 목록 요청 | `PageReq`: `page`(1부터) · `pageSize`(최대 100) · `searchQuery[]` · `sort[]` | `library/database/.../PageModel.kt` |
| 모르는 칼럼·연산자 | 40001 로 거절 | 리소스별 검색 칼럼 enum |
| 목록 응답 | `PageRes<T>`. 화면의 「총 N건」은 `totalElements` | `PageModel.kt` |
| 탭 숫자 | 검색 조건과 무관한 개수는 별도 `GET …/counts` | 고객 앱 `/count` |
| 오류 문구 | 서버는 코드만, 프론트가 코드로 문구를 고름 | 프론트 ADR |

| 메서드·경로 | 용도 | 담당 |
| --- | --- | --- |
| POST `/v1/auth/login` · `/refresh` · `/logout` | 로그인·갱신·로그아웃 | #13 |
| POST `/v1/requests/search` · `/v1/requests/{id}/csv` | 전송 요청 목록·CSV 발급 | #14 |
| GET `/v1/members/counts` · POST `/v1/members/search` · DELETE `/v1/members/{id}` | 멤버 수·목록·탈퇴 | #15 |
| POST `/v1/invitations` · `/{no}/resend` · DELETE `/{no}` | 초대·재전송·취소 | #15 |
```

후(하위 #15, 오류 표):

```markdown
### POST `/v1/invitations` 오류

| 상황 | 화면 메시지 ID | 오류 코드 | HTTP | 비고 |
| --- | --- | --- | --- | --- |
| 이메일 형식 오류 | MSG-001 | 40001 | 400 | |
| 이미 멤버 | MSG-003 | 40901 | 409 | 고객 초대 코드 재사용 |
| 대기 초대 있음 | MSG-005 | 40902 | 409 | 고객 초대 코드 재사용 |
| 1분 안 재전송 | MSG-038 | 42901 | 429 | `data.retryAfterSeconds` |
| 24시간 5회 초과 | MSG-039 | 42902 | 429 | `data.availableAt` |
```

요청·응답 필드 표도 이 하위의 엔드포인트마다 둔다. 구현 중 필드가 늘면 이 표를 고치고 #15 결정 기록에 한 줄 남긴다. 상위는 고치지 않는다.

## 4. 하위가 상위 결정을 가리키는 줄

전(하위 #14):

```markdown
부모: #10 (부모 AC-05, AC-06). 공통 설계·결정은 부모 본문을 따른다.
```

후:

```markdown
부모: #10 (부모 AC-05, AC-06). 따르는 부모 결정: #10 D3(다운로드 1회 = URL 발급 1건), #10 D20(고객 다운로드와 따로 셈), #10 D27(목록은 공통 `PageModel`).
```

커밋 `Refs: #14` 에서 출발한 `git-history` 조사는 #14 를 읽고, 부모 #10 의 결정 기록에서 D3·D20·D27 줄을 찾아 「왜 URL 발급 기준으로 세는가」에 답한다.
