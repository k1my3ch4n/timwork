import { useOverlayStore } from '@entities/drawing';
import DisciplineButton from './DisciplineButton';

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
          <DisciplineButton
            key={name}
            name={name}
            active={isActive}
            prefix={isActive ? '✔ ' : ''}
            onClick={() => toggleOverlayDiscipline(name)}
          />
        );
      })}
    </>
  );
}
