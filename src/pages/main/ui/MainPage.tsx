import { useState } from 'react';
import {
  metadata,
  getDrawings,
  getDisciplineNames,
  getDisciplineImage,
  getRevisions,
} from '@entities/drawing';

const drawings = getDrawings(metadata);

export default function MainPage() {
  const [selectedDrawingId, setSelectedDrawingId] = useState<string | null>(null);
  const [selectedDiscipline, setSelectedDiscipline] = useState<string | null>(null);
  const [selectedRevision, setSelectedRevision] = useState<string | null>(null);

  const selectedDrawing = selectedDrawingId ? metadata.drawings[selectedDrawingId] : null;

  const disciplineNames = selectedDrawing ? getDisciplineNames(selectedDrawing) : [];

  const revisions =
    selectedDrawing && selectedDiscipline ? getRevisions(selectedDrawing, selectedDiscipline) : [];

  const selectedRevisionData =
    revisions.find((revision) => revision.version === selectedRevision) ?? null;

  const displayImage = selectedDrawing
    ? selectedRevisionData
      ? selectedRevisionData.image
      : selectedDiscipline
        ? getDisciplineImage(selectedDrawing, selectedDiscipline)
        : selectedDrawing.image
    : null;

  const handleDrawingClick = (id: string) => {
    setSelectedDrawingId(id);
    setSelectedDiscipline(null);
    setSelectedRevision(null);
  };

  const handleDisciplineClick = (name: string) => {
    setSelectedDiscipline(name);

    if (!selectedDrawing) {
      return;
    }

    const revs = getRevisions(selectedDrawing, name);

    setSelectedRevision(revs.length > 0 ? revs[revs.length - 1].version : null);
  };

  return (
    <div className="flex h-screen">
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
              onClick={() => handleDrawingClick(drawing.id)}
            >
              {drawing.name}
            </li>
          ))}
        </ul>
      </aside>
      <main className="flex flex-1 flex-col overflow-hidden bg-white">
        {disciplineNames.length > 0 && (
          <nav className="flex gap-1 border-b border-gray-200 bg-gray-50 px-4 py-2">
            {disciplineNames.map((name) => (
              <button
                key={name}
                className={`rounded px-3 py-1 text-sm transition-colors ${
                  selectedDiscipline === name
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => handleDisciplineClick(name)}
              >
                {name}
              </button>
            ))}
          </nav>
        )}
        {revisions.length > 0 && (
          <nav className="flex gap-1 border-b border-gray-200 px-4 py-2">
            {revisions.map((rev) => (
              <button
                key={rev.version}
                className={`rounded px-2 py-1 text-xs transition-colors ${
                  selectedRevision === rev.version
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedRevision(rev.version)}
              >
                {rev.version}
              </button>
            ))}
          </nav>
        )}
        <div className="flex-1 overflow-auto p-4">
          {selectedDrawing && displayImage ? (
            <img src={`/drawings/${displayImage}`} alt={selectedDrawing.name} />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400">
              도면을 선택하세요
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
