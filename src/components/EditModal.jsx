import { useState } from 'react';
import { X } from 'lucide-react';
import { CATEGORY_CONFIG } from '../utils/categoryStyle';

export default function EditModal({ snap, onSave, onClose }) {
  const [title, setTitle] = useState(snap.title);
  const [category, setCategory] = useState(snap.category);
  const [tasks, setTasks] = useState(snap.tasks.map((t) => ({ ...t })));

  const handleTaskChange = (id, text) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, text } : t)));
  };

  const handleSave = () => {
    if (!title.trim()) return;
    onSave(snap.id, {
      title: title.trim(),
      category,
      tasks: tasks.map((t) => ({ ...t, text: t.text.trim() })),
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[480px] space-y-4 rounded-t-2xl bg-white p-6 dark:bg-[#1e1e1e]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">
            스냅 수정
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X size={24} />
          </button>
        </div>

        {/* Title */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-600 dark:text-gray-400">
            제목
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-[#2a2a2a] dark:text-white"
          />
        </div>

        {/* Category */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-600 dark:text-gray-400">
            분류
          </label>
          <div className="flex gap-2">
            {Object.entries(CATEGORY_CONFIG).map(([key, cfg]) => (
              <button
                key={key}
                onClick={() => setCategory(key)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  category === key
                    ? `${cfg.bg} ${cfg.text} ring-2 ring-indigo-400 ring-offset-1 dark:ring-offset-[#1e1e1e]`
                    : 'bg-gray-100 text-gray-400 dark:bg-[#2a2a2a] dark:text-gray-500'
                }`}
              >
                {cfg.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tasks */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-600 dark:text-gray-400">
            할 일 목록
          </label>
          <div className="space-y-2">
            {tasks.map((task, i) => (
              <input
                key={task.id}
                type="text"
                value={task.text}
                onChange={(e) => handleTaskChange(task.id, e.target.value)}
                placeholder={`할 일 ${i + 1}`}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-[#2a2a2a] dark:text-white"
              />
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-gray-300 py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-[#2a2a2a]"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            disabled={!title.trim()}
            className="flex-1 rounded-xl bg-indigo-500 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-600 disabled:bg-gray-300"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
