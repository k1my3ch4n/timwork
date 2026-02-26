import { useDrawingStore, useRevisions } from '@entities/drawing';

export default function RevisionSelector() {
  const revisions = useRevisions();
  const selected = useDrawingStore((store) => store.selectedRevision);
  const selectRevision = useDrawingStore((store) => store.selectRevision);

  if (revisions.length === 0) {
    return null;
  }

  return (
    <div className="absolute left-4 top-4 z-10 flex gap-1 rounded-lg bg-white/80 p-1.5 shadow-sm backdrop-blur-sm">
      {revisions.map((rev) => (
        <button
          key={rev.version}
          className={`rounded px-2 py-1 text-xs transition-colors ${
            selected === rev.version
              ? 'bg-blue-600 text-white font-semibold'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          onClick={() => selectRevision(rev.version)}
        >
          {rev.version}
        </button>
      ))}
    </div>
  );
}
