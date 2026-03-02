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

## Phase 4 : 공종별 도면 오버레이

- imageTransform (x, y, scale, rotation) 적용하여 공종 도면을 동일 좌표계에 겹쳐 표시
- relativeTo 기준 도면 위에 변환을 적용하는 렌더링 로직
- 오버레이할 공종을 다중 선택할 수 있는 UI (OverlayDisciplineList)
- 레이어별 투명도(opacity) 슬라이더 (OverlayControls)
- 오버레이 전용 상태 관리 분리 (useOverlayStore / overlaySelectors)
- 레이어 미선택 시 빈 상태 안내 화면 (OverlayEmptyState)

## Phase 5 : 공종별 폴리곤 렌더링

- polygon.vertices + polygonTransform 적용하여 도면 위에 공종별 관심 영역 폴리곤 표시
- queries.ts를 drawingQueries, disciplineQueries, polygonQueries로 분리
- DisciplinePolygonOverlay 컴포넌트로 공종/region 폴리곤 렌더링
- hover 시 해당 공종/영역 이름 라벨 표시

## Phase 6 : 리비전 관리 기능

- 리비전 선택을 위한 RevisionDropdown 컴포넌트 생성 및 오버레이 모드 레이어별 독립 리비전 선택 지원
- 선택된 공종의 리비전 이력을 타임라인 형태로 표시
- 같은 공종의 두 리비전을 Side-by-side로 비교하는 ComparisonViewer (좌우 독립 줌/팬)
- Region 폴리곤 클릭으로 해당 영역의 독립 리비전 타임라인 전환 및 이미지 오버레이
- 도면/공종 이동 시 비교 모드 및 Region 선택 자동 초기화

## Phase 7 : 컴포넌트 리팩토링

- 비대한 컴포넌트 분리
- 반복 구조 단순화
- 중복 셀렉터 패턴을 통합
- 조건문 헬퍼 추가
- useRevisionTimeline 내 중첩 삼항연산자를 early return 패턴으로 개선
- 비교 모드에서 오버레이 모드 전환 시 상태 충돌 버그 수정
