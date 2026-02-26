import { useSelectedDrawing, useDisplayImage } from '@entities/drawing';
import { RevisionSelector } from '@features/revision-selector';

export default function DrawingViewer() {
  const displayImage = useDisplayImage();
  const drawing = useSelectedDrawing();

  return (
    <div className="relative flex-1 overflow-auto p-4">
      <RevisionSelector />
      {displayImage ? (
        <img src={`/drawings/${displayImage}`} alt={drawing?.name ?? ''} />
      ) : (
        <div className="flex h-full items-center justify-center text-gray-400">도면을 선택하세요</div>
      )}
    </div>
  );
}
