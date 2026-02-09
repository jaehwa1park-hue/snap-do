export default function Layout({ children }) {
  return (
    <div className="min-h-dvh bg-gray-300 dark:bg-[#0a0a0a]">
      <div className="relative mx-auto min-h-dvh max-w-[480px] bg-gray-50 shadow-xl dark:bg-[#121212] dark:shadow-[0_0_40px_rgba(0,0,0,0.5)]">
        {children}
      </div>
    </div>
  );
}
