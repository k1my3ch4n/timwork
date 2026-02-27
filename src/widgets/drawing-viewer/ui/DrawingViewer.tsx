import { useSelectedDrawing, useDisplayImage } from '@entities/drawing';
import { RevisionSelector } from '@features/revision-selector';
import ImageViewer from './ImageViewer';

export default function DrawingViewer() {
  const displayImage = useDisplayImage();
  const drawing = useSelectedDrawing();

  const imageSrc = displayImage ? `/drawings/${displayImage}` : null;

  return (
    <div className="relative flex-1 overflow-hidden p-4">
      <RevisionSelector />
      {imageSrc ? (
        <ImageViewer src={imageSrc} alt={drawing?.name ?? ''} />
      ) : (
        <div className="flex h-full items-center justify-center text-gray-400">
          도면을 선택하세요
        </div>
      )}
    </div>
  );
}
