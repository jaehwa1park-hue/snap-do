import { useMemo, useState } from 'react';
import { ArrowDownUp, FileText } from 'lucide-react';
import { getCategoryStyle } from '../utils/categoryStyle';

const SORT_OPTIONS = [
  { key: 'newest', label: '최신순' },
  { key: 'oldest', label: '오래된순' },
  { key: 'category', label: '종류별' },
];

function Thumbnail({ snap }) {
  const url = useMemo(() => {
    if (snap.imageBlob) return URL.createObjectURL(snap.imageBlob);
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snap.id]);

  const badge = getCategoryStyle(snap.category);
  const doneCount = snap.tasks.filter((t) => t.done).length;
  const total = snap.tasks.length;
  const isAllDone = total > 0 && doneCount === total;

  return (
    <div className="group relative aspect-square overflow-hidden bg-gray-100 dark:bg-[#2a2a2a]">
      {url ? (
        <img
          src={url}
          alt={snap.title}
          className={`h-full w-full object-cover ${isAllDone ? 'opacity-50 grayscale' : ''}`}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-1 p-2">
          <FileText size={24} className="text-gray-300 dark:text-gray-600" />
          <span className="line-clamp-2 text-center text-xs font-medium text-gray-500 dark:text-gray-400">
            {snap.title}
          </span>
        </div>
      )}

      {/* Category dot */}
      <div
        className={`absolute right-1.5 top-1.5 h-3 w-3 rounded-full border-2 border-white shadow-sm dark:border-[#121212] ${badge.bg}`}
      />

      {/* Progress pill */}
      <div className="absolute bottom-1.5 left-1.5 rounded-full bg-black/50 px-1.5 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
        {doneCount}/{total}
      </div>

      {/* Done badge */}
      {isAllDone && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-indigo-500 shadow">
            Done
          </span>
        </div>
      )}
    </div>
  );
}

export default function GalleryView({ snaps, onSelect }) {
  const [sortBy, setSortBy] = useState('newest');

  const sortedSnaps = useMemo(() => {
    const copy = [...snaps];
    if (sortBy === 'oldest') {
      copy.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    } else if (sortBy === 'category') {
      copy.sort(
        (a, b) =>
          a.category.localeCompare(b.category) ||
          b.createdAt.localeCompare(a.createdAt),
      );
    }
    // 'newest' is already default order from DB
    return copy;
  }, [snaps, sortBy]);

  // Group headers for category sort
  const categoryGroups = useMemo(() => {
    if (sortBy !== 'category') return null;
    const groups = {};
    sortedSnaps.forEach((snap, idx) => {
      if (!groups[snap.category]) {
        groups[snap.category] = idx;
      }
    });
    return groups;
  }, [sortBy, sortedSnaps]);

  if (snaps.length === 0) return null;

  return (
    <div className="pb-24">
      {/* Sort controls */}
      <div className="flex items-center gap-1.5 px-4 py-3">
        <ArrowDownUp size={14} className="text-gray-400" />
        {SORT_OPTIONS.map((opt) => (
          <button
            key={opt.key}
            onClick={() => setSortBy(opt.key)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              sortBy === opt.key
                ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                : 'bg-gray-100 text-gray-500 dark:bg-[#2a2a2a] dark:text-gray-400'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {sortBy === 'category'
        ? Object.entries(categoryGroups || {}).map(([cat]) => {
            const badge = getCategoryStyle(cat);
            const group = sortedSnaps.filter((s) => s.category === cat);
            return (
              <div key={cat}>
                <div className="px-4 pb-1 pt-3">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${badge.bg} ${badge.text}`}
                  >
                    {badge.label}
                  </span>
                  <span className="ml-2 text-xs text-gray-400">
                    {group.length}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-0.5">
                  {group.map((snap) => (
                    <button key={snap.id} onClick={() => onSelect(snap)}>
                      <Thumbnail snap={snap} />
                    </button>
                  ))}
                </div>
              </div>
            );
          })
        : (
          <div className="grid grid-cols-3 gap-0.5">
            {sortedSnaps.map((snap) => (
              <button key={snap.id} onClick={() => onSelect(snap)}>
                <Thumbnail snap={snap} />
              </button>
            ))}
          </div>
        )}
    </div>
  );
}
