import { metadata } from '../index';
import { getChildDrawings, getBreadcrumbPath } from '../lib/drawingQueries';
import { getDisciplineNames } from '../lib/disciplineQueries';
import { useDrawingStore } from './useDrawingStore';

export function useSelectedDrawing() {
  const id = useDrawingStore((store) => store.selectedDrawingId);

  return id ? metadata.drawings[id] : null;
}

export function useDisciplineNames() {
  const drawing = useSelectedDrawing();

  return drawing ? getDisciplineNames(drawing) : [];
}

export function useChildDrawings() {
  const drawing = useSelectedDrawing();

  return drawing ? getChildDrawings(metadata, drawing.id) : [];
}

export function useBreadcrumb() {
  const id = useDrawingStore((store) => store.selectedDrawingId);

  return id ? getBreadcrumbPath(metadata, id) : [];
}
