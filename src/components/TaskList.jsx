import { useEffect, useRef } from 'react';
import { CameraOff } from 'lucide-react';
import TaskCard from './TaskCard';

export default function TaskList({
  snaps,
  onToggleTask,
  onEdit,
  onDelete,
  scrollToId,
  onScrolled,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (scrollToId && containerRef.current) {
      const el = containerRef.current.querySelector(
        `[data-snap-id="${scrollToId}"]`,
      );
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      onScrolled?.();
    }
  }, [scrollToId, onScrolled]);

  if (snaps.length === 0) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center px-6">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-100 dark:bg-[#1e1e1e]">
          <CameraOff size={40} className="text-gray-300 dark:text-gray-600" />
        </div>
        <p className="mt-5 text-center text-lg font-semibold text-gray-500 dark:text-gray-400">
          첫 번째 사진을 찍어
          <br />
          할 일을 추가해보세요!
        </p>
        <p className="mt-2 text-center text-sm text-gray-400 dark:text-gray-500">
          하단의 + 버튼을 눌러 시작하세요
        </p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="space-y-4 p-4 pb-24">
      {snaps.map((snap) => (
        <div key={snap.id} data-snap-id={snap.id}>
          <TaskCard
            snap={snap}
            onToggleTask={onToggleTask}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      ))}
    </div>
  );
}
