import { CATEGORY_CONFIG } from '../utils/categoryStyle';

const TABS = [
  { key: 'All', label: '전체' },
  ...Object.entries(CATEGORY_CONFIG).map(([key, { label }]) => ({
    key,
    label,
  })),
];

export default function FilterTabs({ active, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto px-4 py-3">
      {TABS.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`flex-shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            active === tab.key
              ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
              : 'bg-white text-gray-500 hover:bg-gray-100 dark:bg-[#2a2a2a] dark:text-gray-400 dark:hover:bg-[#333]'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
