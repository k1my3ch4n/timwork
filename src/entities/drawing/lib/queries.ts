import type { Drawing, Metadata, Revision } from '../type';

export function getDrawings(metadata: Metadata): Drawing[] {
  return Object.values(metadata.drawings).sort((a, b) => Number(a.id) - Number(b.id));
}

export function getChildDrawings(metadata: Metadata, parentId: string): Drawing[] {
  return Object.values(metadata.drawings)
    .filter((data) => data.parent === parentId)
    .sort((a, b) => Number(a.id) - Number(b.id));
}

export function getBreadcrumbPath(
  metadata: Metadata,
  drawingId: string,
): { id: string; name: string }[] {
  const drawing = metadata.drawings[drawingId];

  if (!drawing) {
    return [];
  }

  if (!drawing.parent) {
    return [{ id: drawing.id, name: drawing.name }];
  }

  const parent = metadata.drawings[drawing.parent];

  return [
    { id: parent.id, name: parent.name },
    { id: drawing.id, name: drawing.name },
  ];
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

export function getRevisions(drawing: Drawing, disciplineName: string): Revision[] {
  const disciplineData = drawing.disciplines?.[disciplineName];

  if (!disciplineData) {
    return [];
  }

  return disciplineData.revisions ?? [];
}
