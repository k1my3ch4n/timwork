import { metadata, getDrawings, useDrawingStore } from '@entities/drawing';

const drawings = getDrawings(metadata);

export default function DrawingSelector() {
  const selectedDrawingId = useDrawingStore((store) => store.selectedDrawingId);
  const selectDrawing = useDrawingStore((store) => store.selectDrawing);

  return (
    <aside className="w-64 overflow-y-auto border-r border-gray-200 bg-gray-50 p-4">
      <h2 className="mb-3 text-base font-bold text-gray-800">{metadata.project.name}</h2>

      <ul className="space-y-1 text-sm">
        {drawings.map((drawing) => (
          <li
            key={drawing.id}
            className={`rounded px-2 py-1 cursor-pointer ${
              selectedDrawingId === drawing.id
                ? 'bg-blue-100 text-blue-800 font-semibold'
                : 'hover:bg-gray-100'
            }`}
            onClick={() => selectDrawing(drawing.id)}
          >
            {drawing.name}
          </li>
        ))}
      </ul>
    </aside>
  );
}
