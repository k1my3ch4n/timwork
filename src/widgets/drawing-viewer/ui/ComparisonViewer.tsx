import {
  useDrawingStore,
  useRevisions,
  useRevisionImage,
  useComparisonChanges,
} from '@entities/drawing';
import { ChangesList } from '@shared/ui';
import ComparisonPanel from './ComparisonPanel';

export default function ComparisonViewer({ alt }: { alt: string }) {
  const revisions = useRevisions();
  const comparisonLeft = useDrawingStore((store) => store.comparisonLeft);
  const comparisonRight = useDrawingStore((store) => store.comparisonRight);
  const setComparisonRevision = useDrawingStore((store) => store.setComparisonRevision);
  const exitComparison = useDrawingStore((store) => store.exitComparison);

  const leftImage = useRevisionImage(comparisonLeft);
  const rightImage = useRevisionImage(comparisonRight);
  const comparisonChanges = useComparisonChanges();

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
        <ComparisonPanel
          label="Left"
          revisions={revisions}
          selected={comparisonLeft}
          onSelect={(v) => setComparisonRevision('left', v)}
          imageSrc={leftImage}
          alt={`${alt} - ${comparisonLeft}`}
          className="border-r border-gray-200"
        />
        <ComparisonPanel
          label="Right"
          revisions={revisions}
          selected={comparisonRight}
          onSelect={(v) => setComparisonRevision('right', v)}
          imageSrc={rightImage}
          alt={`${alt} - ${comparisonRight}`}
        />
      </div>

      {comparisonChanges && (
        <div className="border-t border-gray-200 bg-gray-50 px-4 py-2">
          <p className="mb-1 text-xs font-medium text-gray-500">{comparisonChanges.label}</p>
          <ChangesList changes={comparisonChanges.changes} />
        </div>
      )}
    </div>
  );
}
