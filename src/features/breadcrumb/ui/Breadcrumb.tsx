import { useDrawingStore, useBreadcrumb } from '@entities/drawing';

export default function Breadcrumb() {
  const path = useBreadcrumb();
  const selectDrawing = useDrawingStore((store) => store.selectDrawing);

  if (path.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center gap-1 px-4 py-2 text-sm text-gray-500">
      {path.map((item, index) => {
        const isLast = index === path.length - 1;

        return (
          <span key={item.id} className="flex items-center gap-1">
            {index > 0 && <span className="text-gray-300">/</span>}
            {isLast ? (
              <span className="font-semibold text-gray-800">{item.name}</span>
            ) : (
              <button
                className="hover:text-blue-600 hover:underline"
                onClick={() => selectDrawing(item.id)}
              >
                {item.name}
              </button>
            )}
          </span>
        );
      })}
    </nav>
  );
}
