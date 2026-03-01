import type { Revision } from '@entities/drawing';

interface RevisionDropdownProps {
  revisions: Revision[];
  selected: string | null;
  onSelect: (version: string) => void;
}

export default function RevisionDropdown({ revisions, selected, onSelect }: RevisionDropdownProps) {
  if (revisions.length === 0) {
    return null;
  }

  return (
    <select
      value={selected ?? ''}
      onChange={(e) => onSelect(e.target.value)}
      className="rounded border border-gray-300 bg-white px-2 py-1 text-xs text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none"
    >
      {revisions.map((rev) => (
        <option key={rev.version} value={rev.version}>
          {rev.version} — {rev.date}
        </option>
      ))}
    </select>
  );
}
