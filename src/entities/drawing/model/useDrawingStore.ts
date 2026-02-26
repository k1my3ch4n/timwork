import { create } from 'zustand';
import { metadata } from '../index';
import { getRevisions } from '../lib/queries';

interface DrawingState {
  selectedDrawingId: string | null;
  selectedDiscipline: string | null;
  selectedRevision: string | null;

  selectDrawing: (id: string) => void;
  selectDiscipline: (name: string) => void;
  selectRevision: (version: string) => void;
}

export const useDrawingStore = create<DrawingState>((set, get) => ({
  selectedDrawingId: '00',
  selectedDiscipline: null,
  selectedRevision: null,

  selectDrawing: (id) => {
    set({ selectedDrawingId: id, selectedDiscipline: null, selectedRevision: null });
  },

  selectDiscipline: (name) => {
    const { selectedDrawingId } = get();
    const drawing = selectedDrawingId ? metadata.drawings[selectedDrawingId] : null;

    if (!drawing) {
      set({ selectedDiscipline: name, selectedRevision: null });
      return;
    }

    const revisions = getRevisions(drawing, name);

    set({
      selectedDiscipline: name,
      selectedRevision: revisions.length > 0 ? revisions[revisions.length - 1].version : null,
    });
  },

  selectRevision: (version) => {
    set({ selectedRevision: version });
  },
}));
