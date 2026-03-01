import { useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import {
  useDrawingStore,
  useOverlayStore,
  useChildDrawings,
  useDisciplinePolygon,
} from '@entities/drawing';
import { PolygonOverlay, DisciplinePolygonOverlay } from '@features/polygon-overlay';
import ZoomControls from './ZoomControls';
import OverlayImageViewer from './OverlayImageViewer';

interface ImageViewerProps {
  src: string;
  alt: string;
}

export default function ImageViewer({ src, alt }: ImageViewerProps) {
  const childDrawings = useChildDrawings();
  const selectDrawing = useDrawingStore((store) => store.selectDrawing);
  const selectedDiscipline = useDrawingStore((store) => store.selectedDiscipline);
  const isOverlayMode = useOverlayStore((store) => store.isOverlayMode);
  const { polygon, regions } = useDisciplinePolygon();

  const [imageSize, setImageSize] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setImageSize({ width: img.naturalWidth, height: img.naturalHeight });
  };

  if (isOverlayMode) {
    return <OverlayImageViewer alt={alt} />;
  }

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
            {imageSize && selectedDiscipline && (polygon || regions.length > 0) && (
              <DisciplinePolygonOverlay
                polygon={polygon}
                regions={regions}
                imageWidth={imageSize.width}
                imageHeight={imageSize.height}
                disciplineName={selectedDiscipline}
              />
            )}
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}
