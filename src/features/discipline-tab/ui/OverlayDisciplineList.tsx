import { useOverlayStore } from '@entities/drawing';

interface OverlayDisciplineListProps {
  disciplines: string[];
}

export default function OverlayDisciplineList({ disciplines }: OverlayDisciplineListProps) {
  const overlayLayers = useOverlayStore((store) => store.overlayLayers);
  const toggleOverlayDiscipline = useOverlayStore((store) => store.toggleOverlayDiscipline);

  const overlayNames = new Set(overlayLayers.map((layer) => layer.disciplineName));

  return (
    <>
      {disciplines.map((name) => {
        const isActive = overlayNames.has(name);

        return (
          <button
            key={name}
            className={`rounded px-3 py-1 text-sm transition-colors ${
              isActive
                ? 'bg-blue-600 text-white font-semibold'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => toggleOverlayDiscipline(name)}
          >
            {isActive && '\u2713 '}
            {name}
          </button>
        );
      })}
    </>
  );
}
