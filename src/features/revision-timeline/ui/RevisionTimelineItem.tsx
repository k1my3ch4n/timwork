import type { Revision } from '@entities/drawing';
import { ChangesList } from '@shared/ui';

interface RevisionTimelineItemProps {
  rev: Revision;
  isSelected: boolean;
  isLast: boolean;
  showCompare: boolean;
  onSelect: () => void;
  onCompare: () => void;
}

export default function RevisionTimelineItem({
  rev,
  isSelected,
  isLast,
  showCompare,
  onSelect,
  onCompare,
}: RevisionTimelineItemProps) {
  return (
    <div className="relative pl-4">
      {!isLast && <div className="absolute top-4 left-1.5 h-full w-px bg-gray-300" />}
      <div
        className={`absolute top-1.5 left-0 h-3 w-3 rounded-full border-2 ${
          isSelected ? 'border-blue-600 bg-blue-600' : 'border-gray-400 bg-white'
        }`}
      />
      <button
        className={`w-full rounded-md p-2 text-left transition-colors ${
          isSelected ? 'bg-blue-50 ring-1 ring-blue-200' : 'hover:bg-gray-100'
        }`}
        onClick={onSelect}
      >
        <div className="flex items-center gap-1.5">
          <span
            className={`text-xs font-semibold ${isSelected ? 'text-blue-700' : 'text-gray-700'}`}
          >
            {rev.version}
          </span>
          <span className="text-xs text-gray-400">{rev.date}</span>
        </div>
        <p className="mt-0.5 text-xs text-gray-600">{rev.description}</p>

        <ChangesList changes={rev.changes} />

        {showCompare && (
          <button
            className="mt-1.5 rounded bg-gray-200 px-2 py-0.5 text-xs text-gray-600 hover:bg-gray-300"
            onClick={(e) => {
              e.stopPropagation();
              onCompare();
            }}
          >
            비교
          </button>
        )}
      </button>
    </div>
  );
}
