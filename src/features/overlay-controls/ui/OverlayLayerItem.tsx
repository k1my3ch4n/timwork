import type { OverlayRenderLayer } from '@entities/drawing';
import { RevisionDropdown } from '@features/revision-selector';

interface OverlayLayerItemProps {
  layer: OverlayRenderLayer;
  onOpacityChange: (opacity: number) => void;
  onRevisionChange: (version: string) => void;
}

export default function OverlayLayerItem({
  layer,
  onOpacityChange,
  onRevisionChange,
}: OverlayLayerItemProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-1">
        <span className="truncate text-sm font-medium text-gray-700">{layer.disciplineName}</span>
        {layer.isBase && (
          <span className="shrink-0 rounded-full bg-blue-100 px-1.5 py-0.5 text-xs text-blue-700">
            기준
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <input
          type="range"
          min="0"
          max="100"
          value={Math.round(layer.opacity * 100)}
          onChange={(e) => onOpacityChange(Number(e.target.value) / 100)}
          className="h-1.5 flex-1 accent-blue-600"
        />
        <span className="w-8 text-right text-xs text-gray-500">
          {Math.round(layer.opacity * 100)}%
        </span>
      </div>
      {layer.revisions.length > 0 && (
        <RevisionDropdown
          revisions={layer.revisions}
          selected={layer.selectedRevision}
          onSelect={onRevisionChange}
        />
      )}
    </div>
  );
}
