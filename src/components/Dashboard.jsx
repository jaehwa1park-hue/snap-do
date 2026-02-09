import { Trophy } from 'lucide-react';

const RADIUS = 36;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function Dashboard({ snaps }) {
  const totalTasks = snaps.reduce((sum, s) => sum + s.tasks.length, 0);
  const doneTasks = snaps.reduce(
    (sum, s) => sum + s.tasks.filter((t) => t.done).length,
    0,
  );
  const percent =
    totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;
  const strokeOffset = CIRCUMFERENCE - (percent / 100) * CIRCUMFERENCE;

  if (snaps.length === 0) return null;

  return (
    <div className="mx-4 mb-1 mt-3 flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-[#1e1e1e]">
      {/* Circular progress */}
      <div className="relative flex-shrink-0">
        <svg width="80" height="80" className="-rotate-90">
          <circle
            cx="40"
            cy="40"
            r={RADIUS}
            fill="none"
            className="stroke-gray-200 dark:stroke-gray-700"
            strokeWidth="6"
          />
          <circle
            cx="40"
            cy="40"
            r={RADIUS}
            fill="none"
            stroke={percent === 100 ? '#6366f1' : '#818cf8'}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={strokeOffset}
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-gray-800 dark:text-white">
            {percent}%
          </span>
        </div>
      </div>

      {/* Stats text */}
      <div className="flex-1">
        <div className="flex items-center gap-1.5">
          <Trophy size={16} className="text-indigo-500" />
          <span className="text-sm font-semibold text-gray-800 dark:text-white">
            오늘의 성취도
          </span>
        </div>
        <p className="mt-1 text-xs text-gray-400">
          전체 {totalTasks}개 중 {doneTasks}개 완료
        </p>
        {percent === 100 && (
          <p className="mt-1 text-xs font-semibold text-indigo-500">
            모든 할 일을 완료했어요!
          </p>
        )}
      </div>
    </div>
  );
}
