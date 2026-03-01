import type { Drawing, Polygon, Revision } from '../type';

export function getDisciplinePolygon(drawing: Drawing, disciplineName: string): Polygon | null {
  return drawing.disciplines?.[disciplineName]?.polygon ?? null;
}

export function getRegionPolygons(
  drawing: Drawing,
  disciplineName: string,
): { name: string; polygon: Polygon; revisions: Revision[] }[] {
  const regions = drawing.disciplines?.[disciplineName]?.regions;

  if (!regions) {
    return [];
  }

  return Object.entries(regions).map(([name, region]) => ({
    name,
    polygon: region.polygon,
    revisions: region.revisions,
  }));
}
