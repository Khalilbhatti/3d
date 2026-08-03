"use client";

import { useEffect, useRef } from "react";
import { chapters } from "@/content/chapters";
import { useAppStore } from "@/lib/store";
import { paletteIsDark } from "@/lib/utils";
import { FloatingGalleryHero } from "@/components/home/FloatingGalleryHero";
import { Chapter } from "./Chapter";
import { ExploreCollection } from "./ExploreCollection";
import { ContactChapter } from "./ContactChapter";

/**
 * Orchestrates the home story: renders the opening floating gallery, every
 * chapter, and the animated services showcase + closing Contact chapter
 * (<ExploreCollection>, <ContactChapter>) in their own narrative slots.
 * Tracks which chapter is centred in the viewport (for the header kicker +
 * progress counter) with a single IntersectionObserver — no scroll hijacking.
 * Chapter type theme (light/dark) is computed here so it is stable between
 * server and client renders.
 */
export function HomeStory() {
  const rootRef = useRef<HTMLDivElement>(null);
  const setActiveChapter = useAppStore((s) => s.setActiveChapter);
  const setChapterCount = useAppStore((s) => s.setChapterCount);

  useEffect(() => {
    setChapterCount(chapters.length);
    return () => {
      setChapterCount(0);
      setActiveChapter(0);
    };
  }, [setChapterCount, setActiveChapter]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const sections = Array.from(root.querySelectorAll<HTMLElement>("[data-chapter]"));
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const i = Number((entry.target as HTMLElement).dataset.chapter);
            if (!Number.isNaN(i)) setActiveChapter(i);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [setActiveChapter]);

  return (
    <div ref={rootRef}>
      <FloatingGalleryHero />
      {chapters.slice(0, 2).map((chapter, i) => (
        <Chapter key={chapter.id} chapter={chapter} index={i} dark={paletteIsDark(chapter.palette)} />
      ))}
      {/* The animated services showcase takes the "Our Services" narrative
          slot; the rest of the chapters continue after it. */}
      <ExploreCollection />
      {chapters.slice(2).map((chapter, i) => (
        <Chapter key={chapter.id} chapter={chapter} index={i + 2} dark={paletteIsDark(chapter.palette)} />
      ))}
      <ContactChapter />
    </div>
  );
}
