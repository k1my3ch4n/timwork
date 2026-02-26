export function toSvgPoints(vertices: [number, number][]): string {
  return vertices.map(([x, y]) => `${x},${y}`).join(' ');
}

export function getCentroid(vertices: [number, number][]): { x: number; y: number } {
  const x = vertices.reduce((sum, [vx]) => sum + vx, 0) / vertices.length;
  const y = vertices.reduce((sum, [, vy]) => sum + vy, 0) / vertices.length;

  return { x, y };
}
