import { useDrawingStore, useOverlayStore, useDisciplineNames } from '@entities/drawing';
import { RevisionSelector } from '@features/revision-selector';
import OverlayDisciplineList from './OverlayDisciplineList';

export default function DisciplineTab() {
  const disciplines = useDisciplineNames();
  const selected = useDrawingStore((store) => store.selectedDiscipline);
  const selectDiscipline = useDrawingStore((store) => store.selectDiscipline);
  const isOverlayMode = useOverlayStore((store) => store.isOverlayMode);
  const toggleOverlayMode = useOverlayStore((store) => store.toggleOverlayMode);

  if (disciplines.length === 0) {
    return null;
  }

  return (
    <nav className="flex items-center gap-1 border-b border-gray-200 bg-gray-50 px-4 py-2">
      {isOverlayMode ? (
        <OverlayDisciplineList disciplines={disciplines} />
      ) : (
        <>
          {disciplines.map((name) => (
            <button
              key={name}
              className={`rounded px-3 py-1 text-sm transition-colors ${
                selected === name
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => selectDiscipline(name)}
            >
              {name}
            </button>
          ))}
          <RevisionSelector />
        </>
      )}

      <button
        className={`ml-auto rounded px-3 py-1 text-sm transition-colors ${
          isOverlayMode
            ? 'bg-orange-500 text-white font-semibold'
            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
        }`}
        onClick={toggleOverlayMode}
      >
        {isOverlayMode ? '오버레이 해제' : '오버레이'}
      </button>
    </nav>
  );
}
