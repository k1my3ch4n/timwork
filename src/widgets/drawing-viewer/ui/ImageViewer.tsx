import { useDrawingStore, useOverlayStore } from '@entities/drawing';
import NormalImageViewer from './NormalImageViewer';
import OverlayImageViewer from './OverlayImageViewer';
import ComparisonViewer from './ComparisonViewer';

interface ImageViewerProps {
  src: string;
  alt: string;
}

export default function ImageViewer({ src, alt }: ImageViewerProps) {
  const isComparisonMode = useDrawingStore((store) => store.isComparisonMode);
  const isOverlayMode = useOverlayStore((store) => store.isOverlayMode);

  if (isComparisonMode) {
    return <ComparisonViewer alt={alt} />;
  }

  if (isOverlayMode) {
    return <OverlayImageViewer alt={alt} />;
  }

  return <NormalImageViewer src={src} alt={alt} />;
}
