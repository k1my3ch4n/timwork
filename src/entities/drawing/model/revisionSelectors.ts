import type { Revision } from '../type';
import { getDisciplineImage, getRevisions } from '../lib/disciplineQueries';
import { useDrawingStore } from './useDrawingStore';
import { useSelectedDisciplineData } from './drawingSelectors';

export function useRevisions() {
  const { drawing, discipline } = useSelectedDisciplineData();

  if (!drawing || !discipline) {
    return [];
  }

  return getRevisions(drawing, discipline);
}

export function useDisplayImage() {
  const { drawing, discipline } = useSelectedDisciplineData();
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

export function useRegionRevisions(): Revision[] {
  const { drawing, discipline } = useSelectedDisciplineData();
  const selectedRegion = useDrawingStore((store) => store.selectedRegion);

  if (!drawing || !discipline || !selectedRegion) {
    return [];
  }

  return drawing.disciplines?.[discipline]?.regions?.[selectedRegion]?.revisions ?? [];
}

export function useComparisonChanges(): { changes: string[]; label: string } | null {
  const revisions = useRevisions();
  const comparisonLeft = useDrawingStore((store) => store.comparisonLeft);
  const comparisonRight = useDrawingStore((store) => store.comparisonRight);

  const leftIndex = revisions.findIndex((revision) => revision.version === comparisonLeft);
  const rightIndex = revisions.findIndex((revision) => revision.version === comparisonRight);

  if (leftIndex < 0 || rightIndex < 0) return null;

  const [olderIndex, newerIndex] =
    leftIndex <= rightIndex ? [leftIndex, rightIndex] : [rightIndex, leftIndex];

  const changes = revisions
    .slice(olderIndex + 1, newerIndex + 1)
    .flatMap((revision) => revision.changes);

  if (changes.length === 0) {
    return null;
  }

  return {
    changes,
    label: `${revisions[olderIndex].version} → ${revisions[newerIndex].version} 변경사항`,
  };
}

export function useRevisionImage(version: string | null) {
  const { drawing, discipline } = useSelectedDisciplineData();

  if (!drawing || !discipline || !version) {
    return null;
  }

  const revisions = getRevisions(drawing, discipline);
  const rev = revisions.find((revision) => revision.version === version);
  const filename = rev?.image ?? getDisciplineImage(drawing, discipline);

  return `/drawings/${filename}`;
}
