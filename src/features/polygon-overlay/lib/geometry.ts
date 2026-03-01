import type { Transform } from '@entities/drawing';

export function toSvgPoints(vertices: [number, number][]): string {
  return vertices.map(([x, y]) => `${x},${y}`).join(' ');
}

export function getCentroid(vertices: [number, number][]): { x: number; y: number } {
  if (vertices.length === 0) {
    return { x: 0, y: 0 };
  }

  const x = vertices.reduce((sum, [vx]) => sum + vx, 0) / vertices.length;
  const y = vertices.reduce((sum, [, vy]) => sum + vy, 0) / vertices.length;

  return { x, y };
}

export function toSvgTransform(transform: Transform): string {
  const deg = transform.rotation * (180 / Math.PI);
  const { x, y, scale } = transform;

  return `translate(${x}, ${y}) rotate(${deg}) scale(${scale}) translate(${-x}, ${-y})`;
}
