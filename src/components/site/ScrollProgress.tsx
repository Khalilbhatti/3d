"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useAppStore } from "@/lib/store";

/**
 * Thin reading-progress bar fixed to the top of the viewport, plus (on the
 * home story) a live chapter counter. Uses a rAF-throttled scroll read.
 */
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const activeChapter = useAppStore((s) => s.activeChapter);
  const chapterCount = useAppStore((s) => s.chapterCount);
  const overlayOpen = useAppStore((s) => s.overlayOpen);
  const isHome = pathname === "/";

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        const p = max > 0 ? doc.scrollTop / max : 0;
        if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  if (overlayOpen) return null;

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[80] h-[2px] bg-transparent">
        <div ref={bar} className="h-full origin-left scale-x-0 bg-accent will-change-transform" />
      </div>
      {isHome && chapterCount > 0 && activeChapter >= 0 && activeChapter < chapterCount ? (
        <div className="pointer-events-none fixed bottom-6 right-5 z-[70] hidden font-mono text-xs tracking-label text-muted md:block">
          <span className="text-ink">{String(activeChapter + 1).padStart(2, "0")}</span>
          <span className="mx-1 opacity-50">/</span>
          <span>{String(chapterCount).padStart(2, "0")}</span>
        </div>
      ) : null}
    </>
  );
}
