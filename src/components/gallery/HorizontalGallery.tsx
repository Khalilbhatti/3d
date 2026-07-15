"use client";

import { useEffect, useRef, useState } from "react";
import { type Artwork } from "@/content/types";
import { getArtistById } from "@/content/index";
import { ArtworkImage } from "@/components/media/ArtworkImage";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

/**
 * Horizontal collection gallery. Native scroll-snap for touch swipe + momentum,
 * with wheel-to-horizontal, click-and-drag panning, previous / next buttons, an
 * artwork counter and an animated caption for the centred work. Clicking a work
 * opens the fullscreen viewer at that index. Fully keyboard-scrollable.
 */
export function HorizontalGallery({
  artworks,
  className,
}: {
  artworks: Artwork[];
  className?: string;
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const openViewer = useAppStore((s) => s.openViewer);
  const ids = artworks.map((a) => a.id);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      const atStart = el.scrollLeft <= 0 && e.deltaY < 0;
      const atEnd =
        el.scrollLeft >= el.scrollWidth - el.clientWidth - 1 && e.deltaY > 0;
      if (atStart || atEnd) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let down = false;
    let startX = 0;
    let startLeft = 0;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      down = true;
      startX = e.clientX;
      startLeft = el.scrollLeft;
      el.setPointerCapture(e.pointerId);
      el.style.cursor = "grabbing";
      el.style.scrollSnapType = "none";
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      el.scrollLeft = startLeft - (e.clientX - startX);
    };
    const onUp = (e: PointerEvent) => {
      if (!down) return;
      down = false;
      el.style.cursor = "";
      el.style.scrollSnapType = "";
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {}
    };
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
    };
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const items = Array.from(el.querySelectorAll<HTMLElement>("[data-item]"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.item));
          }
        });
      },
      { root: el, threshold: 0.6 }
    );
    items.forEach((i) => io.observe(i));
    return () => io.disconnect();
  }, [artworks.length]);

  function scrollToItem(i: number) {
    const el = trackRef.current;
    const item = el?.querySelectorAll<HTMLElement>("[data-item]")[i];
    item?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }

  const current = artworks[active];
  const artist = current ? getArtistById(current.artistId) : undefined;

  return (
    <div className={cn("relative", className)}>
      <ul
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 pl-[max(1.25rem,5vw)] pr-[max(1.25rem,5vw)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label="Collection artworks — scroll horizontally"
      >
        {artworks.map((artwork, i) => (
          <li
            key={artwork.id}
            data-item={i}
            className="w-[78vw] shrink-0 snap-center sm:w-[52vw] lg:w-[38vw] xl:w-[30vw]"
          >
            <button
              type="button"
              onClick={() => openViewer(ids, i)}
              className="group block w-full text-left"
              aria-label={`View ${artwork.title} full screen`}
            >
              <div className="relative overflow-hidden">
                <div className="transition-transform duration-[900ms] ease-editorial group-hover:scale-[1.03]">
                  <ArtworkImage
                    artwork={artwork}
                    aspect={artwork.orientation === "portrait" ? "4 / 5" : "3 / 2"}
                    sizes="(max-width: 640px) 78vw, (max-width: 1024px) 52vw, 32vw"
                    motif={artwork.medium.toLowerCase().includes("vellum") ? "manuscript" : "field"}
                  />
                </div>
                <span className="pointer-events-none absolute right-3 top-3 font-mono text-[0.6rem] uppercase tracking-label text-paper/0 transition-colors duration-500 group-hover:text-paper/80">
                  Zoom ⤢
                </span>
              </div>
            </button>
          </li>
        ))}
      </ul>

      <div className="container-editorial mt-6 flex flex-wrap items-center justify-between gap-4">
        {current ? (
          <p key={current.id} className="animate-fade-up text-sm text-ink-soft">
            <span className="italic text-ink">{current.title}</span> · {artist?.name}, {current.year}
          </p>
        ) : (
          <span />
        )}
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs tracking-label text-muted">
            <span className="text-ink">{String(active + 1).padStart(2, "0")}</span>
            <span className="mx-1 opacity-50">/</span>
            {String(artworks.length).padStart(2, "0")}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scrollToItem(Math.max(0, active - 1))}
              aria-label="Previous artwork"
              className="flex h-10 w-10 items-center justify-center border border-line/25 transition-colors hover:border-ink hover:bg-ink hover:text-paper"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scrollToItem(Math.min(artworks.length - 1, active + 1))}
              aria-label="Next artwork"
              className="flex h-10 w-10 items-center justify-center border border-line/25 transition-colors hover:border-ink hover:bg-ink hover:text-paper"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
