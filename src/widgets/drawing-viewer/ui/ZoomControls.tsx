import { useControls } from 'react-zoom-pan-pinch';

export default function ZoomControls() {
  const { zoomIn, zoomOut, resetTransform } = useControls();

  const buttons = [
    { label: '➕', title: '확대', action: zoomIn },
    { label: '➖', title: '축소', action: zoomOut },
    { label: '🔄', title: '원래대로', action: resetTransform },
  ];

  return (
    <div className="absolute top-2 left-2 z-10 flex gap-1">
      {buttons.map((btn) => (
        <button
          key={btn.title}
          className="flex h-7 w-7 items-center justify-center rounded bg-white shadow-sm hover:bg-gray-100 text-sm"
          onClick={() => btn.action()}
          title={btn.title}
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
}
