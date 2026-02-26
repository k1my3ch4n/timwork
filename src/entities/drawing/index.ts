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
} from './type';

import type { Metadata as MetadataType } from './type';
import Metadata from './model/metadata.json';

// todo : [number, number] 타입 때문에 as unknown 사용중, 개선 필요
export const metadata = Metadata as unknown as MetadataType;

export { getDrawings, getDisciplineNames } from './lib/queries';
