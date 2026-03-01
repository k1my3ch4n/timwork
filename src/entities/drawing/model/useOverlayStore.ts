import { create } from 'zustand';
import type { OverlayLayer } from '../type';
import { useDrawingStore } from './useDrawingStore';

interface OverlayState {
  isOverlayMode: boolean;
  overlayLayers: OverlayLayer[];

  toggleOverlayMode: () => void;
  toggleOverlayDiscipline: (name: string) => void;
  setOverlayOpacity: (disciplineName: string, opacity: number) => void;
  reset: () => void;
}

export const useOverlayStore = create<OverlayState>((set, get) => ({
  isOverlayMode: false,
  overlayLayers: [],

  toggleOverlayMode: () => {
    const { isOverlayMode } = get();
    const drawingStore = useDrawingStore.getState();

    if (isOverlayMode) {
      const { overlayLayers } = get();
      const baseDiscipline = overlayLayers[0]?.disciplineName ?? null;

      set({ isOverlayMode: false, overlayLayers: [] });

      if (baseDiscipline) {
        drawingStore.selectDiscipline(baseDiscipline);
      }
    } else {
      const layers: OverlayLayer[] = drawingStore.selectedDiscipline
        ? [{ disciplineName: drawingStore.selectedDiscipline, opacity: 1 }]
        : [];

      set({ isOverlayMode: true, overlayLayers: layers });
    }
  },

  toggleOverlayDiscipline: (name) => {
    const { overlayLayers } = get();
    const exists = overlayLayers.some((l) => l.disciplineName === name);

    if (exists) {
      set({ overlayLayers: overlayLayers.filter((l) => l.disciplineName !== name) });
    } else {
      const opacity = overlayLayers.length === 0 ? 1 : 0.5;
      set({ overlayLayers: [...overlayLayers, { disciplineName: name, opacity }] });
    }
  },

  setOverlayOpacity: (disciplineName, opacity) => {
    const { overlayLayers } = get();

    set({
      overlayLayers: overlayLayers.map((l) =>
        l.disciplineName === disciplineName ? { ...l, opacity } : l,
      ),
    });
  },

  reset: () => {
    set({ isOverlayMode: false, overlayLayers: [] });
  },
}));

let prevDrawingId = useDrawingStore.getState().selectedDrawingId;

useDrawingStore.subscribe((state) => {
  if (state.selectedDrawingId !== prevDrawingId) {
    prevDrawingId = state.selectedDrawingId;
    useOverlayStore.getState().reset();
  }
});
