# Next-SNS

## 소개

게시글, 댓글, 팔로우, 채팅이 가능한 SNS

## 진행 기간

2024.06 ~ 2024.07 (4주)

## 배포 링크

[next-sns](https://next-sns-eight.vercel.app/)

## 테스트 계정

> email: qwe@e.mail  
> password: qweqweqwe

## 실행 방법

```sh
git clone https://github.com/Chun-gu/next-sns.git
cd next-sns
pnpm install
pnpm dev
```

## 🛠 기술스택

<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"> <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white"> <img src="https://img.shields.io/badge/Tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">

<img src="https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=Zustand&logoColor=white"> <img src="https://img.shields.io/badge/Tanstack Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"> <img src="https://img.shields.io/badge/React Hook Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white">

<img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white"> <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=netlify&logoColor=white">

## 주요기능

### 인증/인가

- 이메일
- 소셜(구글)

### 게시글

- CRUD
- 좋아요
- 이미지 업로드

### 댓글

- CRUD
- 좋아요
- 이미지 업로드

### 팔로우

### 검색

- 유저 검색

### 실시간 채팅

- 구매
- 결제
- 관리자 페이지
- 통계 페이지
- 신고

## 성능 최적화

## 트러블 슈팅

## 의사결정 과정

- 디자인 최적화
- 트러블 슈팅
- 성능 최적화

## 아키텍쳐

## 폴더구조

```
📦src
 ┣ 📂app
 ┃ ┣ 📂(private)
 ┃ ┃ ┣ 📂chats
 ┃ ┃ ┣ 📂feeds
 ┃ ┃ ┣ 📂posts
 ┃ ┃ ┃ ┣ 📂new
 ┃ ┃ ┃ ┣ 📂[postId]
 ┃ ┃ ┃ ┃ ┣ 📂edit
 ┃ ┃ ┣ 📂users
 ┃ ┃ ┃ ┣ 📂me
 ┃ ┃ ┃ ┣ 📂[nickname]
 ┃ ┣ 📂(public)
 ┃ ┃ ┣ 📂login
 ┃ ┃ ┣ 📂register
 ┣ 📂components
 ┃ ┣ 📂auth
 ┃ ┣ 📂comment
 ┃ ┣ 📂image
 ┃ ┣ 📂post
 ┣ 📂features
 ┃ ┣ 📂comment
 ┃ ┣ 📂image
 ┃ ┣ 📂post
 ┃ ┣ 📂user
 ┣ 📂repositories
 ┃ ┣ 📂post
 ┃ ┗ 📂user
 ┣ 📂resources
 ┃ ┣ 📂chat
 ┃ ┣ 📂comment
 ┃ ┣ 📂image
 ┃ ┣ 📂post
 ┃ ┣ 📂user
 ┣ 📂services
 ┣ 📂shared
 ┃ ┣ 📂config
 ┃ ┣ 📂lib
 ┃ ┗ 📂ui
 ┗ 📜middleware.ts
```
