export type {
  Transform,
  ImageTransform,
  Polygon,
  Revision,
  Region,
  DisciplineData,
  Position,
  Drawing,
  Discipline,
  Project,
  Metadata,
  OverlayLayer,
  OverlayRenderLayer,
} from './type';

import type { Metadata as MetadataType } from './type';
import Metadata from './model/metadata.json';

// todo : [number, number] 타입 때문에 as unknown 사용중, 개선 필요
export const metadata = Metadata as unknown as MetadataType;

export { getDrawings, getChildDrawings, getBreadcrumbPath } from './lib/drawingQueries';
export { getDisciplineNames, getDisciplineImage, getRevisions } from './lib/disciplineQueries';
export { getDisciplinePolygon, getRegionPolygons } from './lib/polygonQueries';

export { useDrawingStore } from './model/useDrawingStore';
export { useOverlayStore } from './model/useOverlayStore';

export {
  useSelectedDrawing,
  useDisciplineNames,
  useChildDrawings,
  useBreadcrumb,
} from './model/drawingSelectors';
export { useRevisions, useDisplayImage, useRevisionImage } from './model/revisionSelectors';
export { useDisciplinePolygon } from './model/polygonSelectors';
export { useOverlayRenderData } from './model/overlaySelectors';
