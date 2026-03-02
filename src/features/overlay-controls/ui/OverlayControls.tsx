import type { OverlayRenderLayer } from '@entities/drawing';
import { SidePanel } from '@shared/ui';
import OverlayLayerItem from './OverlayLayerItem';

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
    <SidePanel title="레이어 컨트롤">
      <div className="space-y-3">
        {layers.map((layer) => (
          <OverlayLayerItem
            key={layer.disciplineName}
            layer={layer}
            onOpacityChange={(opacity) => onOpacityChange(layer.disciplineName, opacity)}
            onRevisionChange={(version) => onRevisionChange(layer.disciplineName, version)}
          />
        ))}
      </div>
    </SidePanel>
  );
}
