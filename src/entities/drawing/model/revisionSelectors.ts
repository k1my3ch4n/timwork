import { getDisciplineImage, getRevisions } from '../lib/disciplineQueries';
import { useDrawingStore } from './useDrawingStore';
import { useSelectedDrawing } from './drawingSelectors';

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

export function useRevisionImage(version: string | null) {
  const drawing = useSelectedDrawing();
  const discipline = useDrawingStore((store) => store.selectedDiscipline);

  if (!drawing || !discipline || !version) {
    return null;
  }

  const revisions = getRevisions(drawing, discipline);
  const rev = revisions.find((revision) => revision.version === version);
  const filename = rev?.image ?? getDisciplineImage(drawing, discipline);

  return `/drawings/${filename}`;
}
