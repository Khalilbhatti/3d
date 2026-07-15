"use client";

import { create } from "zustand";

interface ViewerState {
  open: boolean;
  ids: string[];
  index: number;
}

interface AppState {
  /* Fullscreen navigation menu */
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  toggleMenu: () => void;

  /* An immersive full-screen overlay is open (home focus view). Hides chrome. */
  overlayOpen: boolean;
  setOverlayOpen: (v: boolean) => void;

  /* Current home chapter (for the progress indicator) */
  activeChapter: number;
  chapterCount: number;
  setActiveChapter: (i: number) => void;
  setChapterCount: (n: number) => void;

  /* Fullscreen artwork viewer (lightbox) */
  viewer: ViewerState;
  openViewer: (ids: string[], index?: number) => void;
  closeViewer: () => void;
  viewerNext: () => void;
  viewerPrev: () => void;
  setViewerIndex: (i: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  menuOpen: false,
  setMenuOpen: (v) => set({ menuOpen: v }),
  toggleMenu: () => set((s) => ({ menuOpen: !s.menuOpen })),

  overlayOpen: false,
  setOverlayOpen: (v) => set({ overlayOpen: v }),

  activeChapter: 0,
  chapterCount: 0,
  setActiveChapter: (i) => set({ activeChapter: i }),
  setChapterCount: (n) => set({ chapterCount: n }),

  viewer: { open: false, ids: [], index: 0 },
  openViewer: (ids, index = 0) => set({ viewer: { open: true, ids, index } }),
  closeViewer: () => set((s) => ({ viewer: { ...s.viewer, open: false } })),
  viewerNext: () =>
    set((s) => ({
      viewer: {
        ...s.viewer,
        index: (s.viewer.index + 1) % Math.max(s.viewer.ids.length, 1),
      },
    })),
  viewerPrev: () =>
    set((s) => ({
      viewer: {
        ...s.viewer,
        index:
          (s.viewer.index - 1 + s.viewer.ids.length) %
          Math.max(s.viewer.ids.length, 1),
      },
    })),
  setViewerIndex: (i) => set((s) => ({ viewer: { ...s.viewer, index: i } })),
}));
