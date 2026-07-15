"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent as ReactWheelEvent,
} from "react";
import { useAppStore } from "@/lib/store";
import { lockScroll } from "@/components/providers/SmoothScrollProvider";
import { getArtworkById, getArtistById } from "@/content/index";
import { ASPECT } from "@/components/media/ArtworkImage";
import { PlaceholderArt } from "@/components/media/PlaceholderArt";
import { clamp, cn } from "@/lib/utils";

const MIN = 1;
const MAX = 4;

/**
 * Fullscreen artwork viewer (lightbox). Driven by the Zustand store, so any card
 * anywhere can open it with a list of ids + a start index.
 *
 * Opening animates: the backdrop fades and the artwork springs up from a smaller
 * scale (continuing the 3D card's fly-toward-you focus). Controls: zoom (buttons
 * / wheel / double-click), pan (drag when zoomed), previous / next (buttons /
 * arrows / horizontal swipe), thumbnail nav, and full keyboard support.
 */
export function FullscreenViewer() {
  const { open, ids, index } = useAppStore((s) => s.viewer);
  const { closeViewer, viewerNext, viewerPrev, setViewerIndex } = useAppStore();

  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const closeRef = useRef<HTMLButtonElement>(null);
  const pointer = useRef<{ id: number; x: number; y: number; moved: number } | null>(null);
  const downX = useRef(0);

  const artwork = getArtworkById(ids[index] ?? "");
  const artist = artwork ? getArtistById(artwork.artistId) : undefined;
  const zoomed = scale > 1.001;

  const resetTransform = useCallback(() => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }, []);

  useEffect(() => resetTransform(), [index, ids, resetTransform]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    lockScroll(open);
    if (!open) return;
    const t = setTimeout(() => closeRef.current?.focus(), 80);
    const onKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          closeViewer();
          break;
        case "ArrowRight":
          viewerNext();
          break;
        case "ArrowLeft":
          viewerPrev();
          break;
        case "+":
        case "=":
          setScale((s) => clamp(+(s + 0.5).toFixed(2), MIN, MAX));
          break;
        case "-":
          setScale((s) => {
            const next = clamp(+(s - 0.5).toFixed(2), MIN, MAX);
            if (next === 1) setOffset({ x: 0, y: 0 });
            return next;
          });
          break;
        case "0":
          resetTransform();
          break;
        case "Home":
          setViewerIndex(0);
          break;
        case "End":
          setViewerIndex(ids.length - 1);
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, ids.length, closeViewer, viewerNext, viewerPrev, setViewerIndex, resetTransform]);

  function onWheel(e: ReactWheelEvent) {
    e.preventDefault();
    setScale((s) => {
      const next = clamp(+(s - e.deltaY * 0.0015).toFixed(3), MIN, MAX);
      if (next === 1) setOffset({ x: 0, y: 0 });
      return next;
    });
  }
  function handleDown(e: ReactPointerEvent) {
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    downX.current = e.clientX;
    pointer.current = { id: e.pointerId, x: e.clientX, y: e.clientY, moved: 0 };
  }
  function onPointerMove(e: ReactPointerEvent) {
    const p = pointer.current;
    if (!p || p.id !== e.pointerId) return;
    const dx = e.clientX - p.x;
    const dy = e.clientY - p.y;
    p.moved += Math.abs(dx) + Math.abs(dy);
    p.x = e.clientX;
    p.y = e.clientY;
    if (zoomed) setOffset((o) => ({ x: o.x + dx, y: o.y + dy }));
  }
  function handleUp(e: ReactPointerEvent) {
    const dx = e.clientX - downX.current;
    pointer.current = null;
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    if (!zoomed && Math.abs(dx) > 70) {
      dx < 0 ? viewerNext() : viewerPrev();
    }
  }

  const ratio = artwork ? ASPECT[artwork.orientation] : "1 / 1";

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Artwork viewer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[90] flex flex-col bg-paper/[0.98] text-ink backdrop-blur-sm"
        >
          {/* Top bar */}
          <div className="relative z-10 flex items-center justify-between gap-4 px-5 py-4 md:px-8">
            <span className="label text-ink/60">
              {ids.length ? (
                <>
                  <span className="text-ink">{String(index + 1).padStart(2, "0")}</span>
                  <span className="mx-1 opacity-50">/</span>
                  {String(ids.length).padStart(2, "0")}
                </>
              ) : null}
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setScale((s) => {
                    const n = clamp(+(s - 0.5).toFixed(2), MIN, MAX);
                    if (n === 1) setOffset({ x: 0, y: 0 });
                    return n;
                  })
                }
                aria-label="Zoom out"
                className="flex h-9 w-9 items-center justify-center border border-ink/25 text-lg transition-colors hover:border-ink hover:bg-ink hover:text-paper"
              >
                −
              </button>
              <span className="w-12 text-center font-mono text-xs text-ink/60">
                {Math.round(scale * 100)}%
              </span>
              <button
                type="button"
                onClick={() => setScale((s) => clamp(+(s + 0.5).toFixed(2), MIN, MAX))}
                aria-label="Zoom in"
                className="flex h-9 w-9 items-center justify-center border border-ink/25 text-lg transition-colors hover:border-ink hover:bg-ink hover:text-paper"
              >
                +
              </button>
              <button
                ref={closeRef}
                type="button"
                onClick={closeViewer}
                aria-label="Close viewer"
                className="ml-2 flex items-center gap-2 border border-ink/25 px-4 py-2 font-mono text-xs uppercase tracking-label transition-colors hover:border-ink hover:bg-ink hover:text-paper"
              >
                Close ✕
              </button>
            </div>
          </div>

          {/* Stage */}
          <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-4">
            <button
              type="button"
              onClick={viewerPrev}
              aria-label="Previous artwork"
              className="absolute left-3 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center border border-ink/25 text-xl transition-colors hover:border-ink hover:bg-ink hover:text-paper md:flex"
            >
              ←
            </button>

            <div
              className="relative flex h-full w-full touch-none select-none items-center justify-center"
              onWheel={onWheel}
              onPointerDown={handleDown}
              onPointerMove={onPointerMove}
              onPointerUp={handleUp}
              onPointerCancel={() => (pointer.current = null)}
              onDoubleClick={() => (zoomed ? resetTransform() : setScale(2.4))}
              style={{ cursor: zoomed ? "grab" : "zoom-in" }}
            >
              {artwork ? (
                <motion.div
                  key={artwork.id}
                  initial={{ opacity: 0, scale: 0.82, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 190, damping: 24 }}
                  className="relative shadow-2xl shadow-black/50"
                  style={{ aspectRatio: ratio, height: "min(80vh, 82vw)", maxWidth: "94vw" }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${scale})`,
                      transition: pointer.current ? "none" : "transform 0.35s cubic-bezier(0.22,1,0.36,1)",
                    }}
                  >
                    {artwork.image ? (
                      <Image
                        src={artwork.image}
                        alt={artwork.alt}
                        fill
                        sizes="94vw"
                        quality={90}
                        className="object-contain"
                        priority
                      />
                    ) : (
                      <PlaceholderArt
                        seed={artwork.seed}
                        palette={artwork.palette}
                        motif={artwork.medium.toLowerCase().includes("vellum") ? "manuscript" : "field"}
                      />
                    )}
                  </div>
                </motion.div>
              ) : null}
            </div>

            <button
              type="button"
              onClick={viewerNext}
              aria-label="Next artwork"
              className="absolute right-3 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center border border-ink/25 text-xl transition-colors hover:border-ink hover:bg-ink hover:text-paper md:flex"
            >
              →
            </button>
          </div>

          {/* Bottom: metadata + thumbnails */}
          {artwork ? (
            <div className="relative z-10 border-t border-ink/12 px-5 py-4 md:px-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="font-display text-xl leading-tight text-ink md:text-2xl">
                    <span className="italic">{artwork.title}</span>
                  </h2>
                  <p className="mt-1 text-sm text-ink/70">
                    {artist?.name}, {artwork.year} · {artwork.medium} · {artwork.dimensions}
                  </p>
                  <p className="label mt-1 text-ink/45">{artwork.location}</p>
                </div>
                <Link
                  href={`/archive/${artwork.slug}`}
                  onClick={closeViewer}
                  className="link-underline shrink-0 text-sm text-ink"
                >
                  Open full record →
                </Link>
              </div>

              {ids.length > 1 ? (
                <div className="mt-4 flex gap-2 overflow-x-auto pb-1" data-lenis-prevent>
                  {ids.map((id, i) => {
                    const a = getArtworkById(id);
                    if (!a) return null;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setViewerIndex(i)}
                        aria-label={`View ${a.title}`}
                        aria-current={i === index}
                        className={cn(
                          "relative h-14 w-14 shrink-0 overflow-hidden border transition-opacity",
                          i === index
                            ? "border-ink opacity-100"
                            : "border-transparent opacity-45 hover:opacity-80"
                        )}
                      >
                        <PlaceholderArt seed={a.seed} palette={a.palette} />
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </div>
          ) : null}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
