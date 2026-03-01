import { create } from 'zustand';
import { metadata } from '../index';
import { getDisciplineNames, getRevisions } from '../lib/disciplineQueries';

interface DrawingState {
  selectedDrawingId: string | null;
  selectedDiscipline: string | null;
  selectedRevision: string | null;

  isComparisonMode: boolean;
  comparisonLeft: string | null;
  comparisonRight: string | null;

  selectDrawing: (id: string) => void;
  selectDiscipline: (name: string) => void;
  selectRevision: (version: string) => void;
  enterComparison: (leftVersion: string, rightVersion: string) => void;
  exitComparison: () => void;
  setComparisonRevision: (side: 'left' | 'right', version: string) => void;
}

export const useDrawingStore = create<DrawingState>((set, get) => ({
  selectedDrawingId: '00',
  selectedDiscipline: null,
  selectedRevision: null,

  isComparisonMode: false,
  comparisonLeft: null,
  comparisonRight: null,

  selectDrawing: (id) => {
    const drawing = metadata.drawings[id];
    const disciplines = drawing ? getDisciplineNames(drawing) : [];
    const firstDiscipline = disciplines.length > 0 ? disciplines[0] : null;
    const revisions = drawing && firstDiscipline ? getRevisions(drawing, firstDiscipline) : [];

    set({
      selectedDrawingId: id,
      selectedDiscipline: firstDiscipline,
      selectedRevision: revisions.length > 0 ? revisions[revisions.length - 1].version : null,
      isComparisonMode: false,
      comparisonLeft: null,
      comparisonRight: null,
    });
  },

  selectDiscipline: (name) => {
    const { selectedDrawingId } = get();
    const drawing = selectedDrawingId ? metadata.drawings[selectedDrawingId] : null;

    if (!drawing) {
      set({
        selectedDiscipline: name,
        selectedRevision: null,
        isComparisonMode: false,
        comparisonLeft: null,
        comparisonRight: null,
      });
      return;
    }

    const revisions = getRevisions(drawing, name);

    set({
      selectedDiscipline: name,
      selectedRevision: revisions.length > 0 ? revisions[revisions.length - 1].version : null,
      isComparisonMode: false,
      comparisonLeft: null,
      comparisonRight: null,
    });
  },

  selectRevision: (version) => {
    set({ selectedRevision: version });
  },

  enterComparison: (leftVersion, rightVersion) => {
    set({
      isComparisonMode: true,
      comparisonLeft: leftVersion,
      comparisonRight: rightVersion,
    });
  },

  exitComparison: () => {
    const { comparisonLeft } = get();
    set({
      isComparisonMode: false,
      selectedRevision: comparisonLeft,
      comparisonLeft: null,
      comparisonRight: null,
    });
  },

  setComparisonRevision: (side, version) => {
    if (side === 'left') {
      set({ comparisonLeft: version });
    } else {
      set({ comparisonRight: version });
    }
  },
}));
