import type { OverlayRenderLayer } from '@entities/drawing';

interface OverlayControlsProps {
  layers: OverlayRenderLayer[];
  onOpacityChange: (disciplineName: string, opacity: number) => void;
}

export default function OverlayControls({ layers, onOpacityChange }: OverlayControlsProps) {
  if (layers.length === 0) {
    return null;
  }

  return (
    <div className="absolute bottom-4 left-4 z-10 rounded-lg bg-white/90 p-4 shadow-md backdrop-blur-sm">
      <h3 className="mb-3 text-sm font-semibold text-gray-600">레이어 투명도</h3>
      <div className="space-y-3">
        {layers.map((layer) => (
          <div key={layer.disciplineName} className="flex items-center gap-2">
            <span className="w-24 truncate text-sm text-gray-700">
              {layer.disciplineName}
              {layer.isBase && (
                <span className="ml-1 inline-block rounded-full bg-blue-100 px-1.5 py-0.5 text-xs text-blue-700">
                  기준
                </span>
              )}
            </span>
            <input
              type="range"
              min="0"
              max="100"
              value={Math.round(layer.opacity * 100)}
              onChange={(e) => onOpacityChange(layer.disciplineName, Number(e.target.value) / 100)}
              className="h-2 w-32 accent-blue-600"
            />
            <span className="w-10 text-right text-sm text-gray-500">
              {Math.round(layer.opacity * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
