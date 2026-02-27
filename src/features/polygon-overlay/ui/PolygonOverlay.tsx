import { useState } from 'react';
import type { Drawing } from '@entities/drawing';
import { toSvgPoints } from '../lib/geometry';
import PolygonLabel from './PolygonLabel';

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
      {children.map((drawing) => {
        if (!drawing.position) {
          return null;
        }

        const points = toSvgPoints(drawing.position.vertices);
        const isHovered = hoveredId === drawing.id;

        return (
          <g key={drawing.id}>
            <polygon
              points={points}
              className="cursor-pointer transition-all duration-200"
              fill={isHovered ? 'rgba(59, 130, 246, 0.3)' : 'transparent'}
              stroke={isHovered ? 'rgba(59, 130, 246, 0.8)' : 'rgba(59, 130, 246, 0.3)'}
              strokeWidth={isHovered ? 3 : 1.5}
              onMouseEnter={() => setHoveredId(drawing.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => onSelect(drawing.id)}
            />
            {isHovered && <PolygonLabel vertices={drawing.position.vertices} name={drawing.name} />}
          </g>
        );
      })}
    </svg>
  );
}
