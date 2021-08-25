# AI기반 스마트 비행 스케줄링 체계-DEMO
## 2021 공군 해커톤 참가작 (PLAN_B 팀)

### 목차
1. 개요
2. Prerequisite
3. 설치법
4. 사용법

### 1. 개요
2021 공군 해커톤 PLAN_B 팀 DEMO 소스코드 입니다.

### 2. Prerequisite
 - Google Chrome 버전 92.0.4515.159(64비트) 에서 테스트 되었습니다.
 - 로컬 서버 작동을 위해 Python3가 필요합니다.

### 3. 설치법(Windows)
1. 레파지토리의 소스코드를 clone합니다.
2. cmd를 실행하고 clone된 디렉토리로 이동합니다.
3. 다음 커맨드를 입력하여 로컬 서버를 실행합니다.

```
python3 -m http.server 5500
```
4. http://127.0.0.1:5500/home.html 에 접속하여 DEMO를 실행할 수 있습니다. (CORS 정책으로 localhost로 접속시 DB로딩에 문제가 발생할 수 있습니다.)

### 4. 사용법