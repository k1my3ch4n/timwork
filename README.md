# Timwork 과제

## Phase 0 : 프로젝트 초기 세팅

- Vite + React + TypeScript 프로젝트 생성
- Tailwind CSS v4 설치 및 Vite 플러그인 연동
- ESLint + Prettier 설정
- GitHub Actions CI (빌드 검증)

## Phase 1 : 데이터 모델링 및 파싱

- FSD(Feature-Sliced Design) 디렉토리 구조 적용
- metadata.json 분석 및 TypeScript 타입 정의
- 도면 이미지를 public/drawings 로 배치

## Phase 2 : 도면 뷰어 레이아웃 및 상태 관리

- 메인 페이지 레이아웃 구성 (사이드바 + 메인 영역)
- 도면 목록 사이드바에서 도면 선택 및 이미지 표시
- 공종(건축, 구조, 소방 등) 탭 전환 기능
- 리비전 히스토리 탐색 및 이미지 전환
- Zustand 도입 및 selector 패턴으로 상태 관리 분리

## Phase 3 : 도면 탐색 및 zoom-pan-pinch 적용

- 배치도 위 건물 영역 SVG 폴리곤 오버레이 (hover 하이라이트 + 클릭 진입)
- 브레드크럼 네비게이션으로 현재 도면 위치 표시 및 상위 이동
- react-zoom-pan-pinch 도입으로 도면 확대/축소/드래그 지원
- 줌 컨트롤 버튼 (확대, 축소, 초기화)
