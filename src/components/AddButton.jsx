import { Plus } from 'lucide-react';

export default function AddButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-500 text-white shadow-lg transition-colors hover:bg-indigo-600 active:bg-indigo-700"
    >
      <Plus size={28} />
    </button>
  );
}
