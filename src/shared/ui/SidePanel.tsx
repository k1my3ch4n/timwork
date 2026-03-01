interface SidePanelProps {
  title: string;
  children: React.ReactNode;
}

export default function SidePanel({ title, children }: SidePanelProps) {
  return (
    <div className="w-64 shrink-0 overflow-y-auto border-l border-gray-200 bg-gray-50 p-3">
      <h3 className="mb-3 text-xs font-semibold text-gray-500">{title}</h3>
      {children}
    </div>
  );
}
