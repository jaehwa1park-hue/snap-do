import { useState, useRef } from 'react';
import { X, ImagePlus, Loader2 } from 'lucide-react';

export default function InputModal({ onClose, onSubmit, isLoading }) {
  const [keyword, setKeyword] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (preview) URL.revokeObjectURL(preview);
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    if (!keyword.trim() || isLoading) return;
    onSubmit({ keyword: keyword.trim(), imageFile });
  };

  const handleClose = () => {
    if (isLoading) return;
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-[480px] space-y-4 rounded-t-2xl bg-white p-6 dark:bg-[#1e1e1e]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">
            새 스냅 만들기
          </h2>
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="text-gray-400 hover:text-gray-600 disabled:opacity-50 dark:hover:text-gray-200"
          >
            <X size={24} />
          </button>
        </div>

        {/* Image upload */}
        <div
          onClick={() => !isLoading && fileRef.current?.click()}
          className="flex h-40 cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-gray-300 transition-colors hover:border-indigo-400 dark:border-gray-600 dark:hover:border-indigo-400"
        >
          {preview ? (
            <img
              src={preview}
              alt="preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-gray-400">
              <ImagePlus size={32} />
              <span className="text-sm">이미지 업로드</span>
            </div>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        {/* Keyword input */}
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="키워드를 입력하세요 (예: 운동, 공부, 여행)"
          disabled={isLoading}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 dark:border-gray-600 dark:bg-[#2a2a2a] dark:text-white dark:placeholder-gray-500"
        />

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={isLoading || !keyword.trim()}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 py-3 font-semibold text-white transition-colors hover:bg-indigo-600 disabled:bg-gray-300 dark:disabled:bg-gray-700"
        >
          {isLoading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              AI가 분석 중...
            </>
          ) : (
            '등록'
          )}
        </button>
      </div>
    </div>
  );
}
