import { useControls } from 'react-zoom-pan-pinch';

export default function ZoomControls() {
  const { zoomIn, zoomOut, resetTransform } = useControls();

  return (
    <div className="absolute right-3 top-3 z-10 flex flex-col gap-1">
      <button
        className="flex h-8 w-8 items-center justify-center rounded bg-white shadow hover:bg-gray-100"
        onClick={() => zoomIn()}
        title="확대"
      >
        +
      </button>
      <button
        className="flex h-8 w-8 items-center justify-center rounded bg-white shadow hover:bg-gray-100"
        onClick={() => zoomOut()}
        title="축소"
      >
        &minus;
      </button>
      <button
        className="flex h-8 w-8 items-center justify-center rounded bg-white text-xs shadow hover:bg-gray-100"
        onClick={() => resetTransform()}
        title="원래대로"
      >
        1:1
      </button>
    </div>
  );
}
