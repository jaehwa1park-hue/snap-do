import { Loader2 } from 'lucide-react';

export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 rounded-2xl bg-white px-8 py-6 shadow-xl dark:bg-[#1e1e1e]">
        <Loader2 size={36} className="animate-spin text-indigo-500" />
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
          AI가 이미지를 분석 중입니다...
        </p>
      </div>
    </div>
  );
}
