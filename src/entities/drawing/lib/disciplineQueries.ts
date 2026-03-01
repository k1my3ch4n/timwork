import type { Drawing, Revision } from '../type';

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

export function getRevisions(drawing: Drawing, disciplineName: string): Revision[] {
  const disciplineData = drawing.disciplines?.[disciplineName];

  if (!disciplineData) {
    return [];
  }

  return disciplineData.revisions ?? [];
}
