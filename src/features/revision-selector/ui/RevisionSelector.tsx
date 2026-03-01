import { useDrawingStore, useRevisions } from '@entities/drawing';
import RevisionDropdown from './RevisionDropdown';

export default function RevisionSelector() {
  const revisions = useRevisions();
  const selected = useDrawingStore((store) => store.selectedRevision);
  const selectRevision = useDrawingStore((store) => store.selectRevision);

  if (revisions.length === 0) {
    return null;
  }

  return <RevisionDropdown revisions={revisions} selected={selected} onSelect={selectRevision} />;
}
