import { useState } from 'react';
import type { Drawing } from '@entities/drawing';
import BuildingPolygon from './BuildingPolygon';

interface PolygonOverlayProps {
  children: Drawing[];
  imageWidth: number;
  imageHeight: number;
  onSelect: (id: string) => void;
}

export default function PolygonOverlay({
  children,
  imageWidth,
  imageHeight,
  onSelect,
}: PolygonOverlayProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <svg
      viewBox={`0 0 ${imageWidth} ${imageHeight}`}
      className="absolute left-0 top-0 h-full w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      {children.map((drawing) => (
        <BuildingPolygon
          key={drawing.id}
          drawing={drawing}
          isHovered={hoveredId === drawing.id}
          onHover={(hovered) => setHoveredId(hovered ? drawing.id : null)}
          onSelect={() => onSelect(drawing.id)}
        />
      ))}
    </svg>
  );
}
