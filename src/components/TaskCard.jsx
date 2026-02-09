import { useMemo, useState } from 'react';
import { format } from 'date-fns';
import {
  CheckCircle2,
  Circle,
  Check,
  MoreHorizontal,
  Pencil,
  Trash2,
} from 'lucide-react';
import { getCategoryStyle } from '../utils/categoryStyle';

export default function TaskCard({ snap, onToggleTask, onEdit, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const thumbnailUrl = useMemo(() => {
    if (snap.imageBlob) return URL.createObjectURL(snap.imageBlob);
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snap.id]);

  const badge = getCategoryStyle(snap.category);
  const doneCount = snap.tasks.filter((t) => t.done).length;
  const total = snap.tasks.length;
  const progress = total > 0 ? doneCount / total : 0;
  const isAllDone = total > 0 && doneCount === total;

  const handleEdit = () => {
    setMenuOpen(false);
    onEdit(snap);
  };

  const handleDelete = () => {
    setMenuOpen(false);
    if (window.confirm('정말 삭제하시겠습니까?')) {
      onDelete(snap.id);
    }
  };

  const ProgressBar = () => (
    <div className="h-1 w-full bg-gray-200 dark:bg-gray-700">
      <div
        className={`h-full transition-all duration-500 ease-out ${isAllDone ? 'bg-indigo-500' : 'bg-indigo-400'}`}
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-[#1e1e1e]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${badge.bg} ${badge.text}`}
        >
          {badge.label}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">
            {format(new Date(snap.createdAt), 'yyyy.MM.dd HH:mm')}
          </span>
          {/* More menu */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-[#333] dark:hover:text-gray-200"
            >
              <MoreHorizontal size={18} />
            </button>
            {menuOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setMenuOpen(false)}
                />
                <div className="absolute right-0 top-8 z-20 min-w-[120px] overflow-hidden rounded-xl bg-white py-1 shadow-lg dark:bg-[#2a2a2a]">
                  <button
                    onClick={handleEdit}
                    className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-[#333]"
                  >
                    <Pencil size={14} />
                    수정
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                  >
                    <Trash2 size={14} />
                    삭제
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Image + completion overlay */}
      {thumbnailUrl ? (
        <div className="relative">
          <div className="aspect-[4/5] w-full bg-gray-100 dark:bg-gray-800">
            <img
              src={thumbnailUrl}
              alt={snap.title}
              className={`h-full w-full object-cover transition-all duration-500 ${isAllDone ? 'grayscale' : ''}`}
            />
          </div>
          {isAllDone && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <div className="flex flex-col items-center gap-1">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white">
                  <Check
                    size={32}
                    className="text-indigo-500"
                    strokeWidth={3}
                  />
                </div>
                <span className="mt-1 text-lg font-bold text-white">Done</span>
              </div>
            </div>
          )}
          <ProgressBar />
        </div>
      ) : (
        <ProgressBar />
      )}

      {/* Body */}
      <div className="px-4 pb-4 pt-3">
        <h3 className="text-base font-bold text-gray-900 dark:text-white">
          {snap.title}
        </h3>
        <p className="mt-1 text-xs text-gray-400">
          {doneCount}/{total} 완료
        </p>

        {/* Task checklist */}
        <div className="mt-3 space-y-2">
          {snap.tasks.map((task) => (
            <button
              key={task.id}
              onClick={() => onToggleTask(snap.id, task.id)}
              className="flex w-full items-center gap-2.5 text-left"
            >
              {task.done ? (
                <CheckCircle2
                  size={20}
                  className="flex-shrink-0 text-indigo-500"
                />
              ) : (
                <Circle
                  size={20}
                  className="flex-shrink-0 text-gray-300 dark:text-gray-600"
                />
              )}
              <span
                className={`text-sm leading-snug ${task.done ? 'text-gray-400 line-through' : 'text-gray-700 dark:text-gray-300'}`}
              >
                {task.text}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
