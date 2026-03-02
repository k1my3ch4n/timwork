import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { useOverlayStore, useOverlayRenderData } from '@entities/drawing';
import { OverlayControls } from '@features/overlay-controls';
import OverlayEmptyState from './OverlayEmptyState';
import OverlayLayerImage from './OverlayLayerImage';
import ZoomControls from './ZoomControls';

interface OverlayImageViewerProps {
  alt: string;
}

export default function OverlayImageViewer({ alt }: OverlayImageViewerProps) {
  const overlayRenderData = useOverlayRenderData();
  const setOverlayOpacity = useOverlayStore((store) => store.setOverlayOpacity);
  const setLayerRevision = useOverlayStore((store) => store.setLayerRevision);

  if (overlayRenderData.length === 0) {
    return <OverlayEmptyState />;
  }

  return (
    <div className="flex h-full">
      <div className="flex flex-1 flex-col">
        <TransformWrapper initialScale={1} minScale={0.5} maxScale={4} centerOnInit centerZoomedOut>
          <div className="relative flex-1">
            <ZoomControls />
            <TransformComponent wrapperClass="h-full">
              <div className="relative inline-block">
                {overlayRenderData.map((layer) => (
                  <OverlayLayerImage key={layer.disciplineName} layer={layer} alt={alt} />
                ))}
              </div>
            </TransformComponent>
          </div>
        </TransformWrapper>
      </div>
      <OverlayControls
        layers={overlayRenderData}
        onOpacityChange={setOverlayOpacity}
        onRevisionChange={setLayerRevision}
      />
    </div>
  );
}
