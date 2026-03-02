import { getDisciplinePolygon, getRegionPolygons } from '../lib/polygonQueries';
import { useSelectedDisciplineData } from './drawingSelectors';

export function useDisciplinePolygon() {
  const { drawing, discipline } = useSelectedDisciplineData();

  if (!drawing || !discipline) {
    return { polygon: null, regions: [] };
  }

  return {
    polygon: getDisciplinePolygon(drawing, discipline),
    regions: getRegionPolygons(drawing, discipline),
  };
}
