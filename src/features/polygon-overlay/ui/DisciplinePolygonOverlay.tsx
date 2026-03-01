import { useState } from 'react';
import type { Polygon } from '@entities/drawing';
import { toSvgPoints, toSvgTransform } from '../lib/geometry';
import PolygonLabel from './PolygonLabel';

const REGION_COLORS = ['rgba(234, 88, 12, 0.6)', 'rgba(22, 163, 74, 0.6)'];

interface DisciplinePolygonOverlayProps {
  polygon: Polygon | null;
  regions: { name: string; polygon: Polygon }[];
  imageWidth: number;
  imageHeight: number;
  disciplineName: string;
  selectedRegion?: string | null;
  onRegionSelect?: (name: string | null) => void;
}

export default function DisciplinePolygonOverlay({
  polygon,
  regions,
  imageWidth,
  imageHeight,
  disciplineName,
  selectedRegion = null,
  onRegionSelect,
}: DisciplinePolygonOverlayProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  if (!polygon && regions.length === 0) {
    return null;
  }

  return (
    <svg
      viewBox={`0 0 ${imageWidth} ${imageHeight}`}
      className="absolute left-0 top-0 h-full w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      {polygon && (
        <g transform={toSvgTransform(polygon.polygonTransform)}>
          <polygon
            points={toSvgPoints(polygon.vertices)}
            className="transition-all duration-200"
            fill={hoveredId === 'discipline' ? 'rgba(59, 130, 246, 0.15)' : 'transparent'}
            stroke="rgba(59, 130, 246, 0.5)"
            strokeWidth={2}
            strokeDasharray="8 4"
            onMouseEnter={() => setHoveredId('discipline')}
            onMouseLeave={() => setHoveredId(null)}
          />
          {hoveredId === 'discipline' && (
            <PolygonLabel vertices={polygon.vertices} name={disciplineName} />
          )}
        </g>
      )}

      {regions.map((region, index) => {
        const color = REGION_COLORS[index % REGION_COLORS.length];
        const isSelected = selectedRegion === region.name;
        const isHovered = hoveredId === region.name;

        return (
          <g key={region.name} transform={toSvgTransform(region.polygon.polygonTransform)}>
            <polygon
              points={toSvgPoints(region.polygon.vertices)}
              className="cursor-pointer transition-all duration-200"
              fill={isSelected || isHovered ? color : 'transparent'}
              stroke={color}
              strokeWidth={isSelected ? 4 : isHovered ? 3 : 2}
              onMouseEnter={() => setHoveredId(region.name)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={(e) => {
                e.stopPropagation();
                onRegionSelect?.(isSelected ? null : region.name);
              }}
            />
            {(isSelected || isHovered) && (
              <PolygonLabel vertices={region.polygon.vertices} name={`Region ${region.name}`} />
            )}
          </g>
        );
      })}
    </svg>
  );
}
