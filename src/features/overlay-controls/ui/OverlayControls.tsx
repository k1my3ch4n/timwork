import type { OverlayRenderLayer } from '@entities/drawing';
import { RevisionDropdown } from '@features/revision-selector';

interface OverlayControlsProps {
  layers: OverlayRenderLayer[];
  onOpacityChange: (disciplineName: string, opacity: number) => void;
  onRevisionChange: (disciplineName: string, version: string) => void;
}

export default function OverlayControls({
  layers,
  onOpacityChange,
  onRevisionChange,
}: OverlayControlsProps) {
  if (layers.length === 0) {
    return null;
  }

  return (
    <div className="w-56 shrink-0 overflow-y-auto border-l border-gray-200 bg-gray-50 p-3">
      <h3 className="mb-3 text-xs font-semibold text-gray-500">레이어 컨트롤</h3>
      <div className="space-y-3">
        {layers.map((layer) => (
          <div key={layer.disciplineName} className="space-y-1.5">
            <div className="flex items-center gap-1">
              <span className="truncate text-sm font-medium text-gray-700">
                {layer.disciplineName}
              </span>
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
                onChange={(e) =>
                  onOpacityChange(layer.disciplineName, Number(e.target.value) / 100)
                }
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
                onSelect={(version) => onRevisionChange(layer.disciplineName, version)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
