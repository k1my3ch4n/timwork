import { useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { useDrawingStore, useChildDrawings, useDisciplinePolygon } from '@entities/drawing';
import { RevisionTimeline } from '@features/revision-timeline';
import { PolygonOverlay, DisciplinePolygonOverlay } from '@features/polygon-overlay';
import { useRevisionTimeline } from '../hooks/useRevisionTimeline';
import ZoomControls from './ZoomControls';

interface NormalImageViewerProps {
  src: string;
  alt: string;
}

export default function NormalImageViewer({ src, alt }: NormalImageViewerProps) {
  const childDrawings = useChildDrawings();
  const selectDrawing = useDrawingStore((store) => store.selectDrawing);
  const selectedDiscipline = useDrawingStore((store) => store.selectedDiscipline);
  const selectedRegion = useDrawingStore((store) => store.selectedRegion);
  const selectRegion = useDrawingStore((store) => store.selectRegion);

  const { polygon, regions } = useDisciplinePolygon();
  const { timelineProps, regionOverlay } = useRevisionTimeline();

  const [imageSize, setImageSize] = useState<{ width: number; height: number } | null>(null);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setImageSize({ width: img.naturalWidth, height: img.naturalHeight });
  };

  return (
    <div className="flex h-full">
      <div className="flex flex-1 flex-col">
        <TransformWrapper initialScale={1} minScale={0.5} maxScale={4} centerOnInit centerZoomedOut>
          <div className="relative flex-1">
            <ZoomControls />
            <TransformComponent wrapperClass="h-full">
              <div className="relative inline-block">
                <img src={src} alt={alt} onLoad={handleImageLoad} />
                {regionOverlay && (
                  <img
                    src={regionOverlay.src}
                    alt={regionOverlay.alt}
                    className="absolute left-0 top-0"
                    style={{ transformOrigin: '0 0', transform: regionOverlay.css }}
                  />
                )}
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
                    selectedRegion={selectedRegion}
                    onRegionSelect={selectRegion}
                  />
                )}
              </div>
            </TransformComponent>
          </div>
        </TransformWrapper>
      </div>
      {timelineProps.revisions.length > 0 && <RevisionTimeline {...timelineProps} />}
    </div>
  );
}
