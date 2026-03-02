import type { Revision } from '@entities/drawing';
import { SidePanel } from '@shared/ui';
import RevisionTimelineItem from './RevisionTimelineItem';

interface RevisionTimelineProps {
  revisions: Revision[];
  selected: string | null;
  onSelect: (version: string) => void;
  onCompare: (version: string) => void;
  title?: string;
  showCompare?: boolean;
  onClose?: () => void;
}

export default function RevisionTimeline({
  revisions,
  selected,
  onSelect,
  onCompare,
  title = '리비전 이력',
  showCompare = true,
  onClose,
}: RevisionTimelineProps) {
  if (revisions.length === 0) {
    return null;
  }

  const canCompare = showCompare && revisions.length > 1;

  return (
    <SidePanel title={title}>
      {onClose && (
        <button
          className="mb-2 flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ← 전체 리비전으로 돌아가기
        </button>
      )}
      <div className="space-y-2">
        {revisions.map((rev, index) => (
          <RevisionTimelineItem
            key={rev.version}
            rev={rev}
            isSelected={rev.version === selected}
            isLast={index === revisions.length - 1}
            showCompare={canCompare}
            onSelect={() => onSelect(rev.version)}
            onCompare={() => onCompare(rev.version)}
          />
        ))}
      </div>
    </SidePanel>
  );
}
