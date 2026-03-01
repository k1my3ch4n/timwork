import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { useOverlayStore, useOverlayRenderData } from '@entities/drawing';
import { OverlayControls } from '@features/overlay-controls';
import OverlayEmptyState from './OverlayEmptyState';
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
    <div className="flex h-full flex-col">
      <TransformWrapper initialScale={1} minScale={0.5} maxScale={4} centerOnInit centerZoomedOut>
        <div className="relative flex-1">
          <ZoomControls />
          <TransformComponent wrapperClass="h-full">
          <div className="relative inline-block">
            {overlayRenderData.map((layer) => (
              <img
                key={layer.disciplineName}
                src={layer.imageSrc}
                alt={`${alt} - ${layer.disciplineName}`}
                style={{
                  opacity: layer.opacity,
                  ...(layer.isBase
                    ? {}
                    : {
                        position: 'absolute' as const,
                        left: 0,
                        top: 0,
                        transformOrigin: '0 0',
                        transform: layer.cssTransform !== 'none' ? layer.cssTransform : undefined,
                      }),
                }}
              />
            ))}
          </div>
        </TransformComponent>
        </div>
      </TransformWrapper>
      <OverlayControls
        layers={overlayRenderData}
        onOpacityChange={setOverlayOpacity}
        onRevisionChange={setLayerRevision}
      />
    </div>
  );
}
