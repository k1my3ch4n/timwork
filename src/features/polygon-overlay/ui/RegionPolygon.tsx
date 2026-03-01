import type { Polygon } from '@entities/drawing';
import { toSvgPoints, toSvgTransform } from '../lib/geometry';
import PolygonLabel from './PolygonLabel';

interface RegionPolygonProps {
  region: { name: string; polygon: Polygon };
  color: string;
  isSelected: boolean;
  isHovered: boolean;
  onHover: (hovered: boolean) => void;
  onSelect: () => void;
}

export default function RegionPolygon({
  region,
  color,
  isSelected,
  isHovered,
  onHover,
  onSelect,
}: RegionPolygonProps) {
  return (
    <g transform={toSvgTransform(region.polygon.polygonTransform)}>
      <polygon
        points={toSvgPoints(region.polygon.vertices)}
        className="cursor-pointer transition-all duration-200"
        fill={isSelected || isHovered ? color : 'transparent'}
        stroke={color}
        strokeWidth={isSelected ? 4 : isHovered ? 3 : 2}
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
      />
      {(isSelected || isHovered) && (
        <PolygonLabel vertices={region.polygon.vertices} name={`Region ${region.name}`} />
      )}
    </g>
  );
}
