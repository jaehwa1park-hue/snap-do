import { LayoutGrid, List } from 'lucide-react';

export default function ViewToggle({ view, onChange }) {
  return (
    <div className="flex border-b border-gray-200 dark:border-gray-800">
      <button
        onClick={() => onChange('feed')}
        className={`flex flex-1 items-center justify-center gap-1.5 py-2.5 text-sm font-medium transition-colors ${
          view === 'feed'
            ? 'border-b-2 border-gray-900 text-gray-900 dark:border-white dark:text-white'
            : 'text-gray-400'
        }`}
      >
        <List size={18} />
      </button>
      <button
        onClick={() => onChange('gallery')}
        className={`flex flex-1 items-center justify-center gap-1.5 py-2.5 text-sm font-medium transition-colors ${
          view === 'gallery'
            ? 'border-b-2 border-gray-900 text-gray-900 dark:border-white dark:text-white'
            : 'text-gray-400'
        }`}
      >
        <LayoutGrid size={18} />
      </button>
    </div>
  );
}
