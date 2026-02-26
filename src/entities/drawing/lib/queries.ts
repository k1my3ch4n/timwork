import type { Drawing, Metadata } from '../type';

export function getDrawings(metadata: Metadata): Drawing[] {
  return Object.values(metadata.drawings).sort((a, b) => Number(a.id) - Number(b.id));
}

export function getDisciplineNames(drawing: Drawing): string[] {
  if (!drawing.disciplines) {
    return [];
  }

  return Object.keys(drawing.disciplines);
}

export function getDisciplineImage(drawing: Drawing, disciplineName: string): string {
  const disciplineData = drawing.disciplines?.[disciplineName];

  return disciplineData?.image ?? drawing.image;
}
