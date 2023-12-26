# Carrot Market

## 컨셉

이 프로젝트는 next js(page-router)를 이용한 풀스택 앱 제작 연습이 목적입니다. 프로젝트의 진행은 노마드 코더 \[풀스택\]캐럿마켓 클론코딩 2022버전에 기반하였습니다.

### 기술 스택

- 스타일링

  - tailwind
  - JSX

- 데이터베이스

  - planet scale, prisma
    - SQL, 서버리스

- 지원 툴

  - typescript

- 기타
  - React 18버전 hook
    - server-side-streaming
    - server-components

## 작업

[tailwind(ui 디자인)](#tailwind)

## 기능 구현

### tailwind ✅

- 페이지
- 재사용 컴포넌트

### db ✅

- prisma, planetscale 사용

### authentication

- 1차 인증

  - 클라이언트 ✅

    - address(email, phone) 선택, 로그인 시도

  - api
    - db 내 addrress 탐색, 없을 시 생성 ✅
    - 임시 토큰 부여
    - 토큰을 address로 발송
      - phone: twillo
      - email: nodemailer

- 2차 인증

  - 클라이언트
    - 임시 토큰 제출
  - api
    - db 내 토큰 탐색, 존재할 시 쿠키 부여

### authorize

- 유저의 로그인 성공 시, 세션에 유저 id 저장

  - iron- session 사용

- 유저의 로그인 여부 확인
  - SWR : 데이터 패치, 업데이트 기능, 리엑트 쿼리보다 가벼움

### api

- 유효성 검사
  - 모든 api는 요청의 기본 유효성 검사를 위해 withAPIhander 함수 사용
    - lib/server/withAPIhander.ts

### product

#### 모델

- product✅
  : 상품 데이터
  : 유저와 가까운 상품을 우선 보여줄 예정이므로, 위치 정보 필드 필요

- record✅
  : product 레코드와 user 레코드 간의 특수한 관계를 위한 관계용 모델
  : favorite, sale, buy 로 구분(enum)
  - \* 관계용 모델: 레코드에 id, createdAt, updatedAt을 제외한 스칼라 필드가 없이 오로지 관계형 필드만 존재하는 모델

#### 페이지

- "/products/upload
  : 상품을 업로드함
  : (임시) react-hook-form, useMutation, api 요청, 중복 요청 방지, 리다이렉트
  : (임시) 백엔드, 유효성 검사, 모델 쿼리

- "/"
  : 모든 상품목록을 보여줌
  : product

- "/products/\[id]"
  : 상품의 상세 정보
  : (임시)

- 좋아요 기능
  : "/products/\[id]"
  : 상품에 좋아요 누르기
  : swr의 mutation 이용

### 동네생활

#### 모델

- post
  : 글 관련 정보
  : 유저와 가까운 상품을 우선 보여줄 예정이므로, 위치 정보 필드 필요

- answer
  : 글의 답글

- wondering
  : 글의 토글 중 하나,

### 프로파일

#### 모델

- review
  : 거래자에 대한 리뷰 문자열
  : 리뷰 등록자, 리뷰 피등록자
