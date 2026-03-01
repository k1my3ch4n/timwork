import { useDrawingStore, useRevisions } from '@entities/drawing';
import RevisionDropdown from './RevisionDropdown';

export default function RevisionSelector() {
  const revisions = useRevisions();
  const selected = useDrawingStore((store) => store.selectedRevision);
  const selectRevision = useDrawingStore((store) => store.selectRevision);

  if (revisions.length === 0) {
    return null;
  }

  return (
    <div className="absolute left-4 top-4 z-10 rounded-lg bg-white/80 p-1.5 shadow-sm backdrop-blur-sm">
      <RevisionDropdown revisions={revisions} selected={selected} onSelect={selectRevision} />
    </div>
  );
}
