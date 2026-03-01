import { useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import {
  useDrawingStore,
  useChildDrawings,
  useDisciplinePolygon,
  useRevisions,
} from '@entities/drawing';
import { RevisionTimeline } from '@features/revision-timeline';
import { PolygonOverlay, DisciplinePolygonOverlay } from '@features/polygon-overlay';
import ZoomControls from './ZoomControls';

interface NormalImageViewerProps {
  src: string;
  alt: string;
}

export default function NormalImageViewer({ src, alt }: NormalImageViewerProps) {
  const childDrawings = useChildDrawings();
  const selectDrawing = useDrawingStore((store) => store.selectDrawing);
  const selectedDiscipline = useDrawingStore((store) => store.selectedDiscipline);
  const selectedRevision = useDrawingStore((store) => store.selectedRevision);
  const selectRevision = useDrawingStore((store) => store.selectRevision);
  const enterComparison = useDrawingStore((store) => store.enterComparison);
  const revisions = useRevisions();
  const { polygon, regions } = useDisciplinePolygon();

  const [imageSize, setImageSize] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;

    setImageSize({ width: img.naturalWidth, height: img.naturalHeight });
  };

  const handleCompare = (version: string) => {
    const left = selectedRevision ?? revisions[revisions.length - 1]?.version;

    if (left) {
      enterComparison(left, version);
    }
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
          </div>
        </TransformWrapper>
      </div>
      {revisions.length > 0 && (
        <RevisionTimeline
          revisions={revisions}
          selected={selectedRevision}
          onSelect={selectRevision}
          onCompare={handleCompare}
        />
      )}
    </div>
  );
}
