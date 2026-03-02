import type {
  Revision,
  ImageTransform,
  DisciplineData,
  OverlayLayer,
  OverlayRenderLayer,
} from '../type';
import { computeRelativeTransform, toCssTransform } from '../lib/transform';
import { useOverlayStore } from './useOverlayStore';
import { useSelectedDrawing } from './drawingSelectors';

function resolveLayerRevision(layer: OverlayLayer, revisions: Revision[]): Revision | null {
  if (layer.selectedRevision) {
    return revisions.find((rev) => rev.version === layer.selectedRevision) ?? null;
  }

  return revisions.length > 0 ? revisions[revisions.length - 1] : null;
}

function resolveLayerCssTransform(
  layerTransform: ImageTransform | undefined,
  baseTransform: ImageTransform | undefined,
  isBase: boolean,
): string {
  if (isBase || !baseTransform || !layerTransform) {
    return 'none';
  }

  return toCssTransform(computeRelativeTransform(baseTransform, layerTransform));
}

export function useOverlayRenderData(): OverlayRenderLayer[] {
  const drawing = useSelectedDrawing();
  const overlayLayers = useOverlayStore((store) => store.overlayLayers);

  if (!drawing || !drawing.disciplines || overlayLayers.length === 0) {
    return [];
  }

  const baseTransform = drawing.disciplines[overlayLayers[0].disciplineName]?.imageTransform;

  return overlayLayers.map((layer, index) => {
    const discData: DisciplineData | undefined = drawing.disciplines![layer.disciplineName];
    const revisions = discData?.revisions ?? [];
    const selectedRev = resolveLayerRevision(layer, revisions);
    const imageSrc = selectedRev?.image ?? discData?.image ?? drawing.image;
    const cssTransform = resolveLayerCssTransform(
      selectedRev?.imageTransform ?? discData?.imageTransform,
      baseTransform,
      index === 0,
    );

    return {
      disciplineName: layer.disciplineName,
      imageSrc: `/drawings/${imageSrc}`,
      opacity: layer.opacity,
      cssTransform,
      isBase: index === 0,
      revisions,
      selectedRevision: selectedRev?.version ?? null,
    };
  });
}
