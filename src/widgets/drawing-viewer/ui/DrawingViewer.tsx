import { useState } from 'react';
import {
  useDrawingStore,
  useSelectedDrawing,
  useDisplayImage,
  useChildDrawings,
} from '@entities/drawing';
import { RevisionSelector } from '@features/revision-selector';
import { PolygonOverlay } from '@features/polygon-overlay';

export default function DrawingViewer() {
  const displayImage = useDisplayImage();
  const drawing = useSelectedDrawing();
  const children = useChildDrawings();
  const selectDrawing = useDrawingStore((store) => store.selectDrawing);

  const [imageSize, setImageSize] = useState<{ width: number; height: number } | null>(null);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setImageSize({ width: img.naturalWidth, height: img.naturalHeight });
  };

  return (
    <div className="relative flex-1 overflow-auto p-4">
      <RevisionSelector />
      {displayImage ? (
        <div className="relative inline-block">
          <img
            src={`/drawings/${displayImage}`}
            alt={drawing?.name ?? ''}
            onLoad={handleImageLoad}
          />

          {imageSize && children.length > 0 && (
            <PolygonOverlay
              children={children}
              imageWidth={imageSize.width}
              imageHeight={imageSize.height}
              onSelect={selectDrawing}
            />
          )}
        </div>
      ) : (
        <div className="flex h-full items-center justify-center text-gray-400">
          도면을 선택하세요
        </div>
      )}
    </div>
  );
}
