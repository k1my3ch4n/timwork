import type { Drawing, Metadata } from '../type';

const byIdAsc = (a: Drawing, b: Drawing) => Number(a.id) - Number(b.id);

export function getDrawings(metadata: Metadata): Drawing[] {
  return Object.values(metadata.drawings).sort(byIdAsc);
}

export function getChildDrawings(metadata: Metadata, parentId: string): Drawing[] {
  return Object.values(metadata.drawings)
    .filter((data) => data.parent === parentId)
    .sort(byIdAsc);
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

  if (!parent) {
    return [{ id: drawing.id, name: drawing.name }];
  }

  return [
    { id: parent.id, name: parent.name },
    { id: drawing.id, name: drawing.name },
  ];
}
