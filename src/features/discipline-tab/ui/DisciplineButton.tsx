interface DisciplineButtonProps {
  name: string;
  active: boolean;
  onClick: () => void;
  prefix?: string;
}

export default function DisciplineButton({
  name,
  active,
  onClick,
  prefix = '',
}: DisciplineButtonProps) {
  return (
    <button
      className={`rounded px-3 py-1 text-sm transition-colors ${
        active ? 'bg-blue-600 text-white font-semibold' : 'bg-white text-gray-700 hover:bg-gray-100'
      }`}
      onClick={onClick}
    >
      {prefix}
      {name}
    </button>
  );
}
