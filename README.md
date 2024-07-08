## 1. 브랜치 네이밍 규칙

### 종류

- `main`: 제품 출시 브랜치
    - `hotfix`: 출시 버전에서 발생한 버그 수정 브랜치
- `develop`: 출시를 위해 개발하는 브랜치
    - `feature`: 새로운 기능을 개발하는 브랜치
    - `release`: 이번 출시 버전을 준비하는 브랜치

***→ 상위 브랜치로부터 분기 ex)* `hotfix`*는* `main`으로부터 분기**

→ cf> **브랜치 네임은 케밥케이스로 작성 *ex)*** `feature/loginApi`***(X)***  `feature/login-api` ***(O)***

### 예시

- Feature 브랜치 네이밍 예
    - 어떤 이름도 가능하나, `master`, `develop`, `release-...`, `hotfix-...` 같은 이름은 사용 X
    - **기능 추가**: `feature/login`
    - 이슈 기능 추가할 때 방법: `feature/#14-login-update`
    - **버그 수정**: `fix/user-login-bug`
    - **리팩토링**: `refactor/payment-module`
- Release 브랜치 네이밍 예
    - `release-1.1` ← 현재 버전 + 0.1 추가
- hotfix 브랜치 네이밍 예
    - `hotfix-1.2.1` ← 현재 버전 + 0.0.1 추가
    - [**버전 참고**](https://devdesigner.tistory.com/21)

## 2. Git 전략 + 주의사항

### Git flow 전략

[A successful Git branching model](https://nvie.com/posts/a-successful-git-branching-model/)

### Merge 전략

- `feature` → `develop` 머지 시 `Squash and Merge`
- `develop` → `main` 머지 시 `Rebase and Merge`

### 주의사항

- `feature` → `develop`으로 merge / `main`에 merge 안 하도록 유의

## 3. 커밋 컨벤션

### Commit Type

| Tag Name | Description |
| --- | --- |
| feat | 새로운 기능을 추가 |
| fix | 버그 수정 |
| design | CSS 등 사용자 UI 디자인 변경 |
| style | 코드 포맷 변경, 세미 콜론 누락, 코드 수정이 없는 경우 |
| chore | 빌드 업무 수정, 패키지 매니저 수정, 패키지 관리자 구성 등 업데이트, Production Code 변경 없음 |
| refactor | 프로덕션 코드 리팩토링 |
| rename | 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우 |
| remove | 파일을 삭제하는 작업만 수행한 경우 |
| comment | 필요한 주석 추가 및 변경 |
| docs | 문서 수정 |
| test | 테스트 코드, 리펙토링 테스트 코드 추가, Production Code(실제로 사용하는 코드) 변경 없음 |

### Commit Message Convention

- Subject(Title)
    - 마침표 및 특수기호 사용 X
    - 영문으로 작성하는 경우 동사(원형)을 가장 앞에 명령어로 작성
- Body
    - 부연설명이 필요하거나 커밋의 이유를 설명할 경우 작성 (선택)
    - Title과 Body는 **빈 행으로 구분**
- 커밋메시지 영어로
     - 첫 글자 대문자, 이후 소문자

## 4. 파일명 / 변수명 컨벤션

### Folder & File

- 폴더명, 파일명 -> 전부 케밥케이스
    - ex> `setting/editprofile`(x) -> `setting/edit-profile`(o)
    - cf> 하나의 단위, 통용되는 영단어와 같은 특이 케이스는 열외 가능 (ex> mypage)

### Variables, Functions

- 변수명, 함수명 -> 카멜케이스
    - ex> `ProfileImageView` (x) → `profileImageView` (o)
    - ex> `GetAge()` (x) →  `getAge()` (o)
- 하드 코딩된 값의 별칭으로 사용되는 상수 → 대문자 + 밑줄
    - ex> 컬러값, 폰트값, 실행 이전 정해진 상수 등..
    - ex> `COLOR_WHITE = "#ffffff";`

### 이외 규칙

- component → 파스칼 케이스로 작성
    - ex> `DeleteButton.tsx`
- custom hook → use로 시작 + 카멜 케이스로 작성
    - ex> `useOnlineStatus.ts`
- 개발시 되도록 줄임말 사용x → btn(x) button(o)

### cf> 카멜 케이스 / 케밥 케이스 / 파스칼 케이스란

- `camelCase`: 소문자로 시작하고 대문자로 시작하는 모든 후속 단어
- `PascalCase`: 모든 단어는 대문자로 시작
- `kebab-case`: 하이픈으로 구분된 단어
- 참고 문헌
    
    https://k1005.github.io/2021/07/31/naming-rules/
    
