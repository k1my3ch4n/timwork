import { getDisciplinePolygon, getRegionPolygons } from '../lib/polygonQueries';
import { useDrawingStore } from './useDrawingStore';
import { useSelectedDrawing } from './drawingSelectors';

export function useDisciplinePolygon() {
  const drawing = useSelectedDrawing();
  const discipline = useDrawingStore((store) => store.selectedDiscipline);

  if (!drawing || !discipline) {
    return { polygon: null, regions: [] };
  }

  return {
    polygon: getDisciplinePolygon(drawing, discipline),
    regions: getRegionPolygons(drawing, discipline),
  };
}
