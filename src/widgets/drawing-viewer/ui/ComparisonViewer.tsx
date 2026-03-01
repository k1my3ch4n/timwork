import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { useDrawingStore, useRevisions, useRevisionImage } from '@entities/drawing';
import { RevisionDropdown } from '@features/revision-selector';
import { ChangesList } from '@shared/ui';
import ZoomControls from './ZoomControls';

export default function ComparisonViewer({ alt }: { alt: string }) {
  const revisions = useRevisions();
  const comparisonLeft = useDrawingStore((store) => store.comparisonLeft);
  const comparisonRight = useDrawingStore((store) => store.comparisonRight);
  const setComparisonRevision = useDrawingStore((store) => store.setComparisonRevision);
  const exitComparison = useDrawingStore((store) => store.exitComparison);

  const leftImage = useRevisionImage(comparisonLeft);
  const rightImage = useRevisionImage(comparisonRight);

  const rightRev = revisions.find((revision) => revision.version === comparisonRight);

  const changesDiff = rightRev?.changes ?? [];

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-2">
        <span className="text-sm font-semibold text-gray-700">리비전 비교</span>
        <button
          onClick={exitComparison}
          className="rounded bg-gray-200 px-3 py-1 text-xs text-gray-600 hover:bg-gray-300"
        >
          비교 종료
        </button>
      </div>

      <div className="flex flex-1 min-h-0">
        <div className="flex flex-1 flex-col border-r border-gray-200">
          <div className="flex items-center gap-2 border-b border-gray-100 bg-white px-3 py-1.5">
            <span className="text-xs font-medium text-gray-500">Left</span>
            <RevisionDropdown
              revisions={revisions}
              selected={comparisonLeft}
              onSelect={(v) => setComparisonRevision('left', v)}
            />
          </div>
          <TransformWrapper
            initialScale={1}
            minScale={0.5}
            maxScale={4}
            centerOnInit
            centerZoomedOut
          >
            <div className="relative flex-1">
              <ZoomControls />
              <TransformComponent wrapperClass="h-full">
                {leftImage && <img src={leftImage} alt={`${alt} - ${comparisonLeft}`} />}
              </TransformComponent>
            </div>
          </TransformWrapper>
        </div>

        <div className="flex flex-1 flex-col">
          <div className="flex items-center gap-2 border-b border-gray-100 bg-white px-3 py-1.5">
            <span className="text-xs font-medium text-gray-500">Right</span>
            <RevisionDropdown
              revisions={revisions}
              selected={comparisonRight}
              onSelect={(v) => setComparisonRevision('right', v)}
            />
          </div>
          <TransformWrapper
            initialScale={1}
            minScale={0.5}
            maxScale={4}
            centerOnInit
            centerZoomedOut
          >
            <div className="relative flex-1">
              <ZoomControls />
              <TransformComponent wrapperClass="h-full">
                {rightImage && <img src={rightImage} alt={`${alt} - ${comparisonRight}`} />}
              </TransformComponent>
            </div>
          </TransformWrapper>
        </div>
      </div>

      {changesDiff.length > 0 && (
        <div className="border-t border-gray-200 bg-gray-50 px-4 py-2">
          <p className="mb-1 text-xs font-medium text-gray-500">{comparisonRight} 변경사항</p>
          <ChangesList changes={changesDiff} />
        </div>
      )}
    </div>
  );
}
