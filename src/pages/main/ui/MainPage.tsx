import { useState } from 'react';
import { metadata, getDrawings } from '@entities/drawing';

const drawings = getDrawings(metadata);

export default function MainPage() {
  const [selectedDrawingId, setSelectedDrawingId] = useState<string | null>(null);

  const selectedDrawing = selectedDrawingId
    ? metadata.drawings[selectedDrawingId]
    : null;

  return (
    <div className="flex h-screen">
      <aside className="w-64 border-r border-gray-200 bg-gray-50 p-4">
        <h2 className="mb-3 text-base font-bold text-gray-800">
          {metadata.project.name}
        </h2>
        <ul className="space-y-1 text-sm">
          {drawings.map((drawing) => (
            <li
              key={drawing.id}
              className={`rounded px-2 py-1 cursor-pointer ${
                selectedDrawingId === drawing.id
                  ? 'bg-blue-100 text-blue-800 font-semibold'
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => setSelectedDrawingId(drawing.id)}
            >
              {drawing.name}
            </li>
          ))}
        </ul>
      </aside>
      <main className="flex-1 overflow-auto bg-white p-4">
        {selectedDrawing ? (
          <img
            src={`/drawings/${selectedDrawing.image}`}
            alt={selectedDrawing.name}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            도면을 선택하세요
          </div>
        )}
      </main>
    </div>
  );
}
