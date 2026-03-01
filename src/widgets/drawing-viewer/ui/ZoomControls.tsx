import { useControls } from 'react-zoom-pan-pinch';

export default function ZoomControls() {
  const { zoomIn, zoomOut, resetTransform } = useControls();

  return (
    <div className="absolute top-2 left-2 z-10 flex gap-1">
      <button
        className="flex h-7 w-7 items-center justify-center rounded bg-white text-sm shadow-sm hover:bg-gray-100"
        onClick={() => zoomIn()}
        title="확대"
      >
        +
      </button>
      <button
        className="flex h-7 w-7 items-center justify-center rounded bg-white text-sm shadow-sm hover:bg-gray-100"
        onClick={() => zoomOut()}
        title="축소"
      >
        &minus;
      </button>
      <button
        className="flex h-7 w-7 items-center justify-center rounded bg-white text-xs shadow-sm hover:bg-gray-100"
        onClick={() => resetTransform()}
        title="원래대로"
      >
        1:1
      </button>
    </div>
  );
}
