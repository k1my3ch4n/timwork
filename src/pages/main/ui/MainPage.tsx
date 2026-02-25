import { metadata } from '@entities/drawing';

export default function MainPage() {
  return (
    <div className="flex h-screen">
      <aside className="w-64 border-r border-gray-200 bg-gray-50 p-4">
        <h2 className="text-base font-bold text-gray-800">
          {metadata.project.name}
        </h2>
      </aside>
      <main className="flex-1 bg-white p-4">메인 영역</main>
    </div>
  );
}
