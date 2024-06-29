# 스마트 공유 보관함 (Shared Locker)

### 프로젝트 참여자

 - 20213846 주재현

이 프로젝트는 공유 보관함 서비스의 프론트 엔드를 담당합니다.

서버 프로젝트는 [여기](https://github.com/deepbluewarn/sharedlocker-server)에서 볼 수 있습니다.

## 프로젝트 개요

이 프로젝트는 기존 보관함의 단점을 보완하고 추가적인 기능을 제공합니다.

이 프로젝트는 다수의 사용자가 하나의 보관함을 함께 공유할 수 있는 서비스를 제공합니다.

## 주요 기능

- 보관함 신청 및 공유: 사용자는 원하는 보관함을 등록하고 다른 사용자와 공유할 수 있습니다.

- 보관함 등록 및 관리: 사용자는 보관함을 등록하고 관리할 수 있습니다. 보관함의 위치, 크기, 용도 등의 정보를 입력하여 등록합니다.

- QR 코드 생성: 보관함을 이용하기 위해 QR 코드를 생성할 수 있습니다. 사용자는 QR 코드를 인식하여 보관함의 잠금을 해제할 수 있습니다. 

## 기술 스택

- 백엔드: Node.js, Express.js
- 데이터베이스: MongoDB, Redis
- 인증 및 보안: Passport.js, JWT
- 프론트엔드: React.js, React Native
- UI: [react-native-paper](https://github.com/callstack/react-native-paper)

## 개발 환경 구성

이 프로젝트는 React Native 를 기반으로 작성되었습니다. [React Native 환경 설정](https://reactnative.dev/docs/environment-setup)을 참고하세요.

## 사용법

시작 전 프로젝트 루트 위치에 .env 파일을 생성하고 아래 항목을 작성합니다.

|값|설명|
|---|---|
|APP_BASE_URL| [SharedLocker-Server](https://github.com/Deepbluewarn/SharedLocker-Server) 에서 제공하는 Node.js 기반의 API 서버 주소.

Node.js 설치 후 아래 명령어를 실행합니다.

```bash
npm i
npm run start
```
