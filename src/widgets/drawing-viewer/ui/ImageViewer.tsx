import { useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { useDrawingStore, useChildDrawings } from '@entities/drawing';
import { PolygonOverlay } from '@features/polygon-overlay';
import ZoomControls from './ZoomControls';

interface ImageViewerProps {
  src: string;
  alt: string;
}

export default function ImageViewer({ src, alt }: ImageViewerProps) {
  const childDrawings = useChildDrawings();
  const selectDrawing = useDrawingStore((store) => store.selectDrawing);

  const [imageSize, setImageSize] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setImageSize({ width: img.naturalWidth, height: img.naturalHeight });
  };

  return (
    <div className="relative h-full">
      <TransformWrapper initialScale={1} minScale={0.5} maxScale={4} centerOnInit centerZoomedOut>
        <ZoomControls />
        <TransformComponent>
          <div className="relative inline-block">
            <img src={src} alt={alt} onLoad={handleImageLoad} />
            {imageSize && childDrawings.length > 0 && (
              <PolygonOverlay
                children={childDrawings}
                imageWidth={imageSize.width}
                imageHeight={imageSize.height}
                onSelect={selectDrawing}
              />
            )}
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}
