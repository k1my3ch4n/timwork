import { getCentroid } from '../lib/geometry';

interface PolygonLabelProps {
  vertices: [number, number][];
  name: string;
}

export default function PolygonLabel({ vertices, name }: PolygonLabelProps) {
  const { x, y } = getCentroid(vertices);

  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      dominantBaseline="central"
      className="pointer-events-none select-none fill-blue-800 text-[28px] font-bold"
      stroke="white"
      strokeWidth={4}
      paintOrder="stroke"
    >
      {name}
    </text>
  );
}
