export default function OverlayEmptyState() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3">
      <svg
        className="h-16 w-16 text-gray-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
      <div className="text-center">
        <p className="text-gray-500">오버레이할 공종을 선택하세요</p>
        <p className="mt-1 text-sm text-gray-400">
          상단 탭에서 공종을 클릭하여 레이어를 추가합니다
        </p>
      </div>
    </div>
  );
}
