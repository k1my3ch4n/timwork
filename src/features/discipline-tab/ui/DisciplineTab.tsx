import { useDrawingStore, useDisciplineNames } from '@entities/drawing';

export default function DisciplineTab() {
  const disciplines = useDisciplineNames();
  const selected = useDrawingStore((store) => store.selectedDiscipline);
  const selectDiscipline = useDrawingStore((store) => store.selectDiscipline);

  if (disciplines.length === 0) {
    return null;
  }

  return (
    <nav className="flex gap-1 border-b border-gray-200 bg-gray-50 px-4 py-2">
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
    </nav>
  );
}
