interface ChangesListProps {
  changes: string[];
}

export default function ChangesList({ changes }: ChangesListProps) {
  if (changes.length === 0) {
    return null;
  }

  return (
    <ul className="mt-1 space-y-0.5">
      {changes.map((change) => (
        <li key={change} className="text-xs text-gray-500">
          · {change}
        </li>
      ))}
    </ul>
  );
}
