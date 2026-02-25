export default function MainPage() {
  return (
    <div className="flex h-screen">
      <aside className="w-64 border-r border-gray-200 bg-gray-50 p-4">
        사이드바
      </aside>
      <main className="flex-1 bg-white p-4">메인 영역</main>
    </div>
  );
}
