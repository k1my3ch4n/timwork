import type { Drawing, Metadata } from '../type';

export function getDrawings(metadata: Metadata): Drawing[] {
  return Object.values(metadata.drawings).sort((a, b) =>
    Number(a.id) - Number(b.id),
  );
}
