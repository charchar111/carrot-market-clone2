# Carrot Market

## 컨셉

이 프로젝트의 목적은 next js(page-router)를 이용한 풀스택 앱 제작 연습입니다. 프로젝트의 컨셉 설정과 기술스택 및 코드는
노마드 코더 \[풀스택\]캐럿마켓 클론코딩 2022버전에 기반하였습니다.

### 기술 스택

- 스타일링

  - tailwind
  - JSX

- 데이터베이스

  - prisma
  - planet scale,
    - SQL, 서버리스

- 지원 툴

  - typescript

- 데이터 쿼리

  - SWR

- 인증, 쿠키

  - iron-session

- form
  -react-hook-form

- 기타
  - server-side-streaming
  - server-components

## 기능

### 목차

- UI 디자인(tailwind)✅
- authentication✅
- authorize✅
- product 페이지✅
- community 페이지✅
- profile 페이지
- live 페이지
- chat 페이지
- prerender, ssr, isr 알아보기

## 기능 세부사항

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

### product✅

#### 모델

- product
  : 상품 데이터
  : 유저와 가까운 상품을 우선 보여줄 예정이므로, 위치 정보 필드 필요

- record
  : product 레코드와 user 레코드 간의 특수한 관계를 위한 관계용 모델
  : favorite, sale, buy 로 구분(enum)
  - \* 관계용 모델: 레코드에 id, createdAt, updatedAt을 제외한 스칼라 필드가 없이 오로지 관계형 필드만 존재하는 모델

#### 페이지

- "/products/upload
  : 상품을 업로드함

- "/"
  : 모든 상품목록을 보여줌

- "/products/\[id]"
  : 상품의 구체적인 정보
  : 좋아요 기능
  : 유사한 이름의 상품 검색

### 동네생활

#### 모델

- post
  : 글 관련 정보
  : 유저와 가까운 상품을 우선 보여줄 예정이므로, 위치 정보 필드 필요

- answer
  : 글의 답글

- wondering
  : 글의 토글 중 하나,

#### 페이지

- community/write
  : 글 올림
  : 포스트 모델의 레코드 생성 api 요청
  : 위치 정보를 요청해서 허락 여부에 따라 전송

  - community
    : 전체 포스트 리스트를 나열

  - community/\[id]
    : 포스트의 상세 정보
    : 나도 궁금해요 토글과 답변 달기 기능

### 프로파일

- 대시보드
  : 사적인 정보 제공
  : 유저 본인만 접근가능
  : 판매목록, 구매목록, 좋아요 목록

- 프로파일
  : 공적인 정보만 한정 제공
  : 타인도 접근가능
  : 판매목록

- 판매목록
- 구매목록, 좋아요 목록
  : 쿼리스트링으로 api 요청

- 프로파일 편집 페이지
  : 기존 유저 정보를 폼에 입력
  : 폼에 변경사항이 있을 시에만 업데이트
