# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SnapDo is a mobile-first personal task management web app. Users upload an image + keyword, a mock AI generates a title and 3 todo items, and everything is persisted client-side in IndexedDB via Dexie.js. Supports dark mode, category filtering, CRUD, and image optimization.

## Commands

- **Dev server:** `npm run dev`
- **Build:** `npm run build` (outputs to `dist/`)
- **Lint:** `npm run lint`
- **Preview:** `npm run preview`

No test framework configured.

## Tech Stack

- **React 19** (JSX, no TypeScript)
- **Vite 7** with `@tailwindcss/vite` plugin
- **Tailwind CSS 4** — `@import "tailwindcss"` + `@custom-variant dark` for class-based dark mode
- **Dexie.js** for IndexedDB (images as Blobs)
- **date-fns**, **lucide-react**, **uuid**, **clsx + tailwind-merge**

## Architecture

### Data layer
- `src/db.js` — Dexie `SnapDoDB`, single `snaps` table. Indexed: `++id, title, category, isCompleted, createdAt`. Stored: `imageBlob` (Blob), `tasks` (`{id, text, done}[]`)
- `src/utils/mockAI.js` — `generateSnap(keyword)` → `{title, category, tasks}` after 2s delay. Categories: `Work`/`Personal`/`Study`/`Etc` (random). Korean keyword templates with generic fallback
- `src/utils/imageResize.js` — Canvas resize to max 1080px + JPEG 85% compression
- `src/utils/categoryStyle.js` — Per-category badge color map (blue/green/purple/orange)

### Components
- `Layout` — Mobile container (max-w-480px, centered, shadow on desktop, dark/light bg)
- `Dashboard` — SVG circular progress chart for overall completion %
- `FilterTabs` — Category filter pills (All/Work/Personal/Study/Etc)
- `TaskCard` — Instagram feed-style card: header → 4:5 image → progress bar → title → checklist. Has "..." dropdown menu for edit/delete. Done state: grayscale + overlay
- `TaskList` — Renders cards or empty state with CameraOff icon
- `InputModal` — Bottom sheet for image upload + keyword
- `EditModal` — Bottom sheet for editing snap title and task texts
- `LoadingOverlay` — Full-screen spinner with backdrop blur during AI analysis
- `AddButton` — Fixed FAB at bottom center
- `App` — Orchestrates all state: snaps, filter, dark mode (localStorage-persisted), modals, CRUD handlers

## ESLint Notes

- `no-unused-vars` ignores names matching `^[A-Z_]`
- `react-hooks/set-state-in-effect` enforced — use `useMemo`, conditional rendering, or event handlers instead of `setState` in effects

## Dark Mode

Class-based via `@custom-variant dark` in `index.css`. Toggled by adding/removing `.dark` on `<html>`. State persisted in `localStorage('snapdo-theme')`. Colors: bg `#121212`, cards `#1e1e1e`, inputs `#2a2a2a`.
