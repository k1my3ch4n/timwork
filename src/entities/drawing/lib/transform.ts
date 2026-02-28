import type { ImageTransform } from '../type';

export interface RelativeTransform {
  dx: number;
  dy: number;
  scale: number;
  rotation: number;
}

export function computeRelativeTransform(
  base: ImageTransform,
  overlay: ImageTransform,
): RelativeTransform {
  return {
    dx: overlay.x - base.x,
    dy: overlay.y - base.y,
    scale: overlay.scale / base.scale,
    rotation: overlay.rotation - base.rotation,
  };
}

export function toCssTransform(rel: RelativeTransform): string {
  const parts: string[] = [];

  if (rel.dx !== 0 || rel.dy !== 0) {
    parts.push(`translate(${rel.dx}px, ${rel.dy}px)`);
  }

  if (rel.rotation !== 0) {
    parts.push(`rotate(${rel.rotation}rad)`);
  }

  if (rel.scale !== 1) {
    parts.push(`scale(${rel.scale})`);
  }

  return parts.length > 0 ? parts.join(' ') : 'none';
}
