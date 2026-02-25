export interface Metadata {
  project: Project;
  disciplines: Discipline[];
  drawings: Record<string, Drawing>;
}

export interface Project {
  name: string;
  unit: string;
}

export interface Discipline {
  name: string;
}

export interface Drawing {
  id: string;
  name: string;
  image: string;
  parent: string | null;
  position: Position | null;
  disciplines?: Record<string, DisciplineData>;
}

export interface Position {
  vertices: [number, number][];
  imageTransform: Transform;
}

export interface Transform {
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

export interface ImageTransform extends Transform {
  relativeTo: string;
}

export interface DisciplineData {
  image?: string;
  imageTransform?: ImageTransform;
  polygon?: Polygon;
  revisions?: Revision[];
  regions?: Record<string, Region>;
}

export interface Polygon {
  vertices: [number, number][];
  polygonTransform: Transform;
}

export interface Revision {
  version: string;
  image: string;
  date: string;
  description: string;
  changes: string[];
  imageTransform?: ImageTransform;
  polygon?: Polygon;
}

export interface Region {
  polygon: Polygon;
  revisions: Revision[];
}
