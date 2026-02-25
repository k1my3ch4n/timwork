import { metadata, getDrawings } from '@entities/drawing';

const drawings = getDrawings(metadata);

export default function MainPage() {
  return (
    <div className="flex h-screen">
      <aside className="w-64 border-r border-gray-200 bg-gray-50 p-4">
        <h2 className="mb-3 text-base font-bold text-gray-800">
          {metadata.project.name}
        </h2>
        <ul className="space-y-1 text-sm">
          {drawings.map((drawing) => (
            <li key={drawing.id} className="rounded px-2 py-1 hover:bg-gray-100 cursor-pointer">
              {drawing.name}
            </li>
          ))}
        </ul>
      </aside>
      <main className="flex-1 bg-white p-4">메인 영역</main>
    </div>
  );
}
