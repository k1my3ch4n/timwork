import { DrawingSelector } from '@features/drawing-selector';
import { DisciplineTab } from '@features/discipline-tab';
import { DrawingViewer } from '@widgets/drawing-viewer';

export default function MainPage() {
  return (
    <div className="flex h-screen">
      <DrawingSelector />
      <main className="flex flex-1 flex-col overflow-hidden bg-white">
        <DisciplineTab />
        <DrawingViewer />
      </main>
    </div>
  );
}
