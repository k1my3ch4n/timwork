import type { OverlayRenderLayer } from '@entities/drawing';

interface OverlayLayerImageProps {
  layer: OverlayRenderLayer;
  alt: string;
}

export default function OverlayLayerImage({ layer, alt }: OverlayLayerImageProps) {
  const transform = layer.cssTransform !== 'none' ? layer.cssTransform : undefined;

  return (
    <img
      src={layer.imageSrc}
      alt={`${alt} - ${layer.disciplineName}`}
      className={layer.isBase ? '' : 'absolute left-0 top-0 origin-top-left'}
      style={{ opacity: layer.opacity, transform }}
    />
  );
}
