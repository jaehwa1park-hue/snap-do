import Dexie from 'dexie';

const db = new Dexie('SnapDoDB');

db.version(1).stores({
  snaps: '++id, title, category, isCompleted, createdAt',
});

// imageBlob, tasks are stored but not indexed (Dexie best practice for blobs/arrays)

export default db;
