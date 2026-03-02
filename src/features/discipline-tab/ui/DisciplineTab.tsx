import { useDrawingStore, useOverlayStore, useDisciplineNames } from '@entities/drawing';
import DisciplineButton from './DisciplineButton';
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
        disciplines.map((name) => (
          <DisciplineButton
            key={name}
            name={name}
            active={selected === name}
            onClick={() => selectDiscipline(name)}
          />
        ))
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
