import { DrawingSelector } from '@features/drawing-selector';
import { DisciplineTab } from '@features/discipline-tab';
import { Breadcrumb } from '@features/breadcrumb';
import { DrawingViewer } from '@widgets/drawing-viewer';

export default function MainPage() {
  return (
    <div className="flex h-screen">
      <DrawingSelector />
      <main className="flex flex-1 flex-col overflow-hidden bg-white">
        <Breadcrumb />
        <DisciplineTab />
        <DrawingViewer />
      </main>
    </div>
  );
}
