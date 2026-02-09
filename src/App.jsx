import { useState, useEffect, useCallback, useMemo } from 'react';
import { Sun, Moon } from 'lucide-react';
import db from './db';
import { generateSnap } from './utils/mockAI';
import { resizeImage } from './utils/imageResize';
import Layout from './components/Layout';
import AddButton from './components/AddButton';
import InputModal from './components/InputModal';
import EditModal from './components/EditModal';
import FilterTabs from './components/FilterTabs';
import Dashboard from './components/Dashboard';
import TaskList from './components/TaskList';
import GalleryView from './components/GalleryView';
import ViewToggle from './components/ViewToggle';
import LoadingOverlay from './components/LoadingOverlay';

function App() {
  const [snaps, setSnaps] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [editingSnap, setEditingSnap] = useState(null);
  const [viewMode, setViewMode] = useState('feed');
  const [scrollToId, setScrollToId] = useState(null);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem('snapdo-theme') === 'dark',
  );

  // Apply dark class to html element
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('snapdo-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const filteredSnaps = useMemo(
    () =>
      activeFilter === 'All'
        ? snaps
        : snaps.filter((s) => s.category === activeFilter),
    [snaps, activeFilter],
  );

  const loadSnaps = useCallback(async () => {
    const all = await db.snaps.orderBy('createdAt').reverse().toArray();
    setSnaps(all);
  }, []);

  useEffect(() => {
    loadSnaps();
  }, [loadSnaps]);

  const handleSubmit = async ({ keyword, imageFile }) => {
    setModalOpen(false);
    setLoading(true);
    try {
      const { title, category, tasks } = await generateSnap(keyword);

      let imageBlob = null;
      if (imageFile) {
        imageBlob = await resizeImage(imageFile);
      }

      await db.snaps.add({
        imageBlob,
        title,
        category,
        tasks,
        isCompleted: false,
        createdAt: new Date().toISOString(),
      });

      await loadSnaps();
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTask = async (snapId, taskId) => {
    const snap = await db.snaps.get(snapId);
    if (!snap) return;

    const updatedTasks = snap.tasks.map((t) =>
      t.id === taskId ? { ...t, done: !t.done } : t,
    );
    const isCompleted = updatedTasks.every((t) => t.done);

    await db.snaps.update(snapId, { tasks: updatedTasks, isCompleted });
    await loadSnaps();
  };

  const handleEditSave = async (snapId, updates) => {
    await db.snaps.update(snapId, updates);
    await loadSnaps();
  };

  const handleDelete = async (snapId) => {
    await db.snaps.delete(snapId);
    await loadSnaps();
  };

  return (
    <Layout>
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-sm dark:bg-[#1a1a1a]/80">
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 dark:border-gray-800">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            SnapDo
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-[#333]"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
        <FilterTabs active={activeFilter} onChange={setActiveFilter} />
        <ViewToggle view={viewMode} onChange={setViewMode} />
      </header>
      <Dashboard snaps={snaps} />
      {viewMode === 'feed' ? (
        <TaskList
          snaps={filteredSnaps}
          onToggleTask={handleToggleTask}
          onEdit={setEditingSnap}
          onDelete={handleDelete}
          scrollToId={scrollToId}
          onScrolled={() => setScrollToId(null)}
        />
      ) : (
        <GalleryView
          snaps={filteredSnaps}
          onSelect={(snap) => {
            setScrollToId(snap.id);
            setViewMode('feed');
          }}
        />
      )}
      <AddButton onClick={() => setModalOpen(true)} />
      {modalOpen && (
        <InputModal
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmit}
          isLoading={loading}
        />
      )}
      {editingSnap && (
        <EditModal
          snap={editingSnap}
          onSave={handleEditSave}
          onClose={() => setEditingSnap(null)}
        />
      )}
      {loading && <LoadingOverlay />}
    </Layout>
  );
}

export default App;
