import type { Drawing } from '@entities/drawing';
import { toSvgPoints } from '../lib/geometry';
import PolygonLabel from './PolygonLabel';

interface BuildingPolygonProps {
  drawing: Drawing;
  isHovered: boolean;
  onHover: (hovered: boolean) => void;
  onSelect: () => void;
}

export default function BuildingPolygon({
  drawing,
  isHovered,
  onHover,
  onSelect,
}: BuildingPolygonProps) {
  if (!drawing.position) {
    return null;
  }

  return (
    <g>
      <polygon
        points={toSvgPoints(drawing.position.vertices)}
        className="cursor-pointer transition-all duration-200"
        fill={isHovered ? 'rgba(59, 130, 246, 0.3)' : 'transparent'}
        stroke={isHovered ? 'rgba(59, 130, 246, 0.8)' : 'rgba(59, 130, 246, 0.3)'}
        strokeWidth={isHovered ? 3 : 1.5}
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
        onClick={onSelect}
      />
      {isHovered && <PolygonLabel vertices={drawing.position.vertices} name={drawing.name} />}
    </g>
  );
}
