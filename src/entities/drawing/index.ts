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
} from './model/types';

import type { Metadata as MetadataType } from './model/types';
import Metadata from './model/metadata.json';

// todo : [number, number] 타입 때문에 as unknown 사용중, 개선 필요
export const metadata = Metadata as unknown as MetadataType;
