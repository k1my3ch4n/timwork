import type { OverlayRenderLayer } from '../type';
import { computeRelativeTransform, toCssTransform } from '../lib/transform';
import { useOverlayStore } from './useOverlayStore';
import { useSelectedDrawing } from './selectors';

export function useOverlayRenderData(): OverlayRenderLayer[] {
  const drawing = useSelectedDrawing();
  const overlayLayers = useOverlayStore((store) => store.overlayLayers);

  if (!drawing || !drawing.disciplines || overlayLayers.length === 0) {
    return [];
  }

  const baseLayer = overlayLayers[0];
  const baseData = drawing.disciplines[baseLayer.disciplineName];
  const baseTransform = baseData?.imageTransform;

  return overlayLayers.map((layer, index) => {
    const discData = drawing.disciplines![layer.disciplineName];

    const revisions = discData?.revisions ?? [];
    const latestRevision = revisions.length > 0 ? revisions[revisions.length - 1] : null;
    const imageSrc = latestRevision?.image ?? discData?.image ?? drawing.image;

    let cssTransform = 'none';

    if (index > 0 && baseTransform && discData?.imageTransform) {
      const rel = computeRelativeTransform(baseTransform, discData.imageTransform);
      cssTransform = toCssTransform(rel);
    }

    return {
      disciplineName: layer.disciplineName,
      imageSrc: `/drawings/${imageSrc}`,
      opacity: layer.opacity,
      cssTransform,
      isBase: index === 0,
    };
  });
}
