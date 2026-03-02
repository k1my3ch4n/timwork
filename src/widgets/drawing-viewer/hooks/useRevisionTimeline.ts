import { useState } from 'react';
import type { Revision } from '@entities/drawing';
import {
  useDrawingStore,
  useSelectedDrawing,
  useRevisions,
  useRegionRevisions,
} from '@entities/drawing';
import { computeRelativeTransform, toCssTransform } from '@entities/drawing/lib/transform';

export interface TimelineProps {
  revisions: Revision[];
  selected: string | null;
  onSelect: (version: string) => void;
  onCompare: (version: string) => void;
  title?: string;
  showCompare: boolean;
  onClose?: () => void;
}

export interface RegionOverlay {
  src: string;
  alt: string;
  css: string | undefined;
}

export function useRevisionTimeline(): {
  timelineProps: TimelineProps;
  regionOverlay: RegionOverlay | null;
} {
  const drawing = useSelectedDrawing();
  const selectedDiscipline = useDrawingStore((store) => store.selectedDiscipline);
  const selectedRevision = useDrawingStore((store) => store.selectedRevision);
  const selectRevision = useDrawingStore((store) => store.selectRevision);
  const selectedRegion = useDrawingStore((store) => store.selectedRegion);
  const selectRegion = useDrawingStore((store) => store.selectRegion);
  const enterComparison = useDrawingStore((store) => store.enterComparison);
  const revisions = useRevisions();
  const regionRevisions = useRegionRevisions();

  const [regionRevOverride, setRegionRevOverride] = useState<{
    region: string;
    version: string;
  } | null>(null);

  const handleCompare = (version: string) => {
    const left = selectedRevision ?? revisions[revisions.length - 1]?.version;
    if (left) {
      enterComparison(left, version);
    }
  };

  if (!selectedRegion) {
    return {
      timelineProps: {
        revisions,
        selected: selectedRevision,
        onSelect: selectRevision,
        onCompare: handleCompare,
        showCompare: true,
      },
      regionOverlay: null,
    };
  }

  const regionRevVersion =
    regionRevOverride?.region === selectedRegion
      ? regionRevOverride.version
      : (regionRevisions[regionRevisions.length - 1]?.version ?? null);

  const regionRevData = regionRevisions.find((r) => r.version === regionRevVersion) ?? null;

  const discData = drawing?.disciplines?.[selectedDiscipline ?? ''];
  const baseTransform = discData?.imageTransform;

  let regionOverlayCss: string | undefined;

  if (regionRevData?.imageTransform && baseTransform) {
    const rel = computeRelativeTransform(baseTransform, regionRevData.imageTransform);
    const css = toCssTransform(rel);
    regionOverlayCss = css !== 'none' ? css : undefined;
  }

  return {
    timelineProps: {
      revisions: regionRevisions,
      selected: regionRevVersion,
      onSelect: (version: string) => setRegionRevOverride({ region: selectedRegion, version }),
      onCompare: handleCompare,
      title: `Region ${selectedRegion} 리비전`,
      showCompare: false,
      onClose: () => selectRegion(null),
    },
    regionOverlay: regionRevData
      ? {
          src: `/drawings/${regionRevData.image}`,
          alt: `Region ${selectedRegion} - ${regionRevVersion}`,
          css: regionOverlayCss,
        }
      : null,
  };
}
