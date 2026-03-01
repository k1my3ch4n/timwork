import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import type { Revision } from '@entities/drawing';
import { RevisionDropdown } from '@features/revision-selector';
import ZoomControls from './ZoomControls';

interface ComparisonPanelProps {
  label: string;
  revisions: Revision[];
  selected: string | null;
  onSelect: (version: string) => void;
  imageSrc: string | null;
  alt: string;
  className?: string;
}

export default function ComparisonPanel({
  label,
  revisions,
  selected,
  onSelect,
  imageSrc,
  alt,
  className,
}: ComparisonPanelProps) {
  return (
    <div className={`flex flex-1 flex-col ${className ?? ''}`}>
      <div className="flex items-center gap-2 border-b border-gray-100 bg-white px-3 py-1.5">
        <span className="text-xs font-medium text-gray-500">{label}</span>
        <RevisionDropdown revisions={revisions} selected={selected} onSelect={onSelect} />
      </div>
      <TransformWrapper initialScale={1} minScale={0.5} maxScale={4} centerOnInit centerZoomedOut>
        <div className="relative flex-1">
          <ZoomControls />
          <TransformComponent wrapperClass="h-full">
            {imageSrc && <img src={imageSrc} alt={alt} />}
          </TransformComponent>
        </div>
      </TransformWrapper>
    </div>
  );
}
