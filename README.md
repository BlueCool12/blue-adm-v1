# 🚀 BLUECOOL CMS Project (Front-end)

본 프로젝트는 서비스 운영 효율성을 극대화하기 위해 구축된 **관리자 전용 대시보드**입니다. 단순히 기능을 나열하는 것에 그치지 않고, **확장 가능한 아키텍처(FSD 기반 구조 차용)**와 **복잡한 비즈니스 로직(트리 구조, 리치 텍스트 에디터)**을 해결하는 데 집중했습니다.

---

## 🛠 Tech Stack

* **Framework:** React 19 (Vite)
* **Language:** TypeScript
* **State Management:** React Query (TanStack Query)
* **UI Library:** MUI (Material UI), Emotion
* **Editor:** Lexical (Customized)
* **HTTP Client:** Axios
* **Tooling:** ESLint, Prettier

---

## 🏗 Architecture & Folder Structure

유지보수와 관심사 분리를 위해 **계층형 구조**를 채택하여 설계했습니다.

* **`app/`**: 애플리케이션의 엔트리 포인트. Global Provider, Router, Layout 설정.
* **`shared/`**: 프로젝트 전역에서 재사용되는 공통 자산.
    * `api/`: Axios 인스턴스, QueryClient 설정.
    * `styles/`: MUI 커스텀 테마, 글로벌 스타일.
    * `utils/`, `hooks/`: 전역 유틸리티 및 공통 훅.
* **`features/`**: 독립적인 비즈니스 로직 단위 (Auth, Category, Comment, Post).

---

## ✨ Key Features & Technical Challenges

### 1. 계층형 카테고리 & 댓글 시스템
* **Technical Challenge**: 무제한 깊이의 트리 구조 데이터를 효율적으로 렌더링하고 상태를 관리해야 함.
* **Solution**: 재귀적 컴포넌트 설계를 통해 계층 구조를 시각화하였으며, 부모-자식 간의 데이터 무결성을 보장하는 CRUD 로직을 구현했습니다.

### 2. Lexical 기반 커스텀 리치 텍스트 에디터
* **Technical Challenge**: 기본 에디터 라이브러리의 한계를 넘어 관리자 요구사항에 맞는 커스텀 기능 필요.
* **Solution**: Lexical의 Plugin 시스템을 활용하여 이미지 업로드, 툴바 커스터마이징을 구현했으며, 에디터 상태의 직렬화(Serialization)를 통해 안정적으로 데이터를 서버와 송수신합니다.

### 3. JWT 기반 보안 및 인증 가드 (Auth Guards)
* **Technical Challenge**: 관리자 전용 페이지의 보안 유지 및 토큰 만료 처리.
* **Solution**: 
    * **Axios Interceptors**: `401/419` 에러 감지 시 Silent Refresh 로직을 통한 자동 토큰 갱신.
    * **Protected Routes**: 인증 상태에 따른 접근 제어를 라우터 계층에서 통합 관리.

### 4. 확장 가능한 테마 시스템
* **Technical Challenge**: 다크 모드 및 브랜드 컬러 변경에 유연한 대응 필요.
* **Solution**: MUI의 `ThemeProvider`를 사용하여 `shared` 계층에서 테마를 중앙 집중 관리함으로써 일관된 UI/UX를 제공합니다.

---

## 🚀 Getting Started

```bash
# 의존성 설치
npm install

# 환경 변수 설정 (.env.example 참고)
cp .env.example .env

# 로컬 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
