import { metadata } from '../index';
import {
  getDisciplineNames,
  getDisciplineImage,
  getRevisions,
  getChildDrawings,
  getBreadcrumbPath,
} from '../lib/queries';
import { useDrawingStore } from './useDrawingStore';

export function useSelectedDrawing() {
  const id = useDrawingStore((store) => store.selectedDrawingId);

  return id ? metadata.drawings[id] : null;
}

export function useDisciplineNames() {
  const drawing = useSelectedDrawing();

  return drawing ? getDisciplineNames(drawing) : [];
}

export function useRevisions() {
  const drawing = useSelectedDrawing();
  const discipline = useDrawingStore((store) => store.selectedDiscipline);

  if (!drawing || !discipline) {
    return [];
  }

  return getRevisions(drawing, discipline);
}

export function useDisplayImage() {
  const drawing = useSelectedDrawing();
  const discipline = useDrawingStore((store) => store.selectedDiscipline);
  const revision = useDrawingStore((store) => store.selectedRevision);

  if (!drawing) {
    return null;
  }

  const revisions = drawing.disciplines?.[discipline ?? '']?.revisions ?? [];
  const revisionData = revisions.find((rev) => rev.version === revision) ?? null;

  if (revisionData) {
    return revisionData.image;
  }

  if (discipline) {
    return getDisciplineImage(drawing, discipline);
  }

  return drawing.image;
}

export function useChildDrawings() {
  const drawing = useSelectedDrawing();

  return drawing ? getChildDrawings(metadata, drawing.id) : [];
}

export function useBreadcrumb() {
  const id = useDrawingStore((store) => store.selectedDrawingId);

  return id ? getBreadcrumbPath(metadata, id) : [];
}
