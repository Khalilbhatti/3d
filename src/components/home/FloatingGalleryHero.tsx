"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type Artwork } from "@/content/types";
import { getFeaturedArtworks, getArtistById } from "@/content/index";
import { type GalleryLayout } from "@/components/webgl/FloatingGallery";
import { WebGLErrorBoundary } from "@/components/webgl/WebGLErrorBoundary";
import { PlaceholderArt } from "@/components/media/PlaceholderArt";
import { ScrollCue } from "@/components/story/ScrollCue";
import { lockScroll } from "@/components/providers/SmoothScrollProvider";
import { useAppStore } from "@/lib/store";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const GalleryCanvas = dynamic(() => import("@/components/webgl/GalleryCanvas"), { ssr: false });

const LAYOUTS: GalleryLayout[] = ["sphere", "cylinder"];
const TITLE_LINES = ["Smart solutions", "for your business."];

/**
 * The immersive opening. On capable desktops it renders a Three.js floating
 * gallery you can drag to orbit and recompose between a sphere and a cylinder.
 * Clicking a work runs a continuous fly-to-fullscreen morph (in WebGL) and
 * fades in a detail overlay — the Pahari-style card open. Mobile / reduced-motion
 * / no-WebGL get a natural-flow grid + the DOM viewer.
 */
export function FloatingGalleryHero() {
  const reduced = usePrefersReducedMotion();
  const openViewer = useAppStore((s) => s.openViewer);

  // Only featured artworks appear in the hero — no backfill from the rest of
  // the catalogue. Padding out to a fixed count previously meant an
  // under-featured moment would silently pull in whatever was next in
  // artworks.ts declaration order, regardless of curation intent.
  const works = useMemo<Artwork[]>(() => getFeaturedArtworks().slice(0, 14), []);
  const ids = useMemo(() => works.map((w) => w.id), [works]);

  // Decided once at mount and never re-evaluated. This used to depend on
  // [reduced, isMobile] and re-run whenever either changed, so resizing the
  // window across the mobile breakpoint tore down the live WebGL canvas
  // (react-three-fiber) mid-render — its own DOM writes race with React's
  // unmount, crashing the reconciler with "insertBefore/removeChild: not a
  // child of this node" (confirmed via gstack:browse: resize desktop→mobile
  // after the WebGL hero had already rendered). Nothing about this hero
  // needs to live-swap engines mid-session, so freezing the choice at mount
  // removes the teardown race entirely — mobile still never pays for the
  // WebGL canvas in the first place, same as before.
  const [useWebGL, setUseWebGL] = useState(false);

  useEffect(() => {
    let supported = false;
    try {
      const c = document.createElement("canvas");
      supported = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      supported = false;
    }
    const reducedNow = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobileNow = window.matchMedia("(max-width: 767px)").matches;
    setUseWebGL(supported && !reducedNow && !mobileNow);
  }, []);

  const fallback = <FallbackHero works={works} animate={!reduced} onSelect={(i) => openViewer(ids, i)} />;

  if (!useWebGL) return fallback;
  return (
    <WebGLErrorBoundary fallback={fallback}>
      <WebGLHero works={works} />
    </WebGLErrorBoundary>
  );
}

function WebGLHero({ works }: { works: Artwork[] }) {
  const [layout, setLayout] = useState<GalleryLayout>("sphere");
  const [active, setActive] = useState(-1);
  const [focused, setFocused] = useState(-1);
  const setOverlayOpen = useAppStore((s) => s.setOverlayOpen);
  const sectionRef = useRef<HTMLElement>(null);

  // Recede like a card being lifted away as the hero scrolls out — the same
  // shrink-and-fade language `ChapterStack` uses between chapters, so the
  // handoff into the first pinned chapter reads as one continuous system
  // instead of the hero just abruptly scrolling off.
  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.to(section, {
        scale: 0.94,
        opacity: 0.85,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, section);
    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  const activeWork = active >= 0 ? works[active] : null;
  const activeArtist = activeWork ? getArtistById(activeWork.artistId) : null;
  const focusWork = focused >= 0 ? works[focused] : null;
  const focusArtist = focusWork ? getArtistById(focusWork.artistId) : null;
  const isFocused = focused >= 0;

  // Lock scroll, hide chrome, and wire keyboard while a work is open.
  useEffect(() => {
    lockScroll(isFocused);
    setOverlayOpen(isFocused);
    if (!isFocused) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFocused(-1);
      else if (e.key === "ArrowRight") setFocused((f) => (f + 1) % works.length);
      else if (e.key === "ArrowLeft") setFocused((f) => (f - 1 + works.length) % works.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isFocused, works.length, setOverlayOpen]);

  useEffect(() => {
    return () => {
      lockScroll(false);
      setOverlayOpen(false);
    };
  }, [setOverlayOpen]);

  return (
    <section ref={sectionRef} className="relative h-[100svh] min-h-[640px] overflow-hidden bg-paper">
      <GalleryCanvas
        artworks={works}
        layout={layout}
        focused={focused}
        onHover={setActive}
        onSelect={setFocused}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_46%,transparent_52%,rgba(0,0,0,0.16)_100%)]"
      />

      {/* Legibility scrims — the hint/label text below needs to stay readable
          no matter which bright project card the floating gallery happens to
          drift behind at any given moment, so these are always on (not just
          while focused, unlike the vignette above which is purely ambient). */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/45 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/50 to-transparent" />

      {/* Gallery overlay — fades out while a work is focused */}
      <div
        className={cn(
          "container-editorial pointer-events-none absolute inset-0 flex flex-col justify-between pb-8 pt-[calc(var(--header-h)+1.25rem)] transition-opacity duration-500",
          isFocused && "opacity-0"
        )}
      >
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex items-center justify-between"
        >
          {/* The scrim gradients above darken a horizontal band, but the
              floating gallery cards are bright enough that a light-colored
              card drifting directly behind this text can still wash it out
              regardless of any edge shadow — light text loses contrast
              against a light backdrop no matter how it's outlined
              (confirmed via gstack:browse screenshot at ~820px width). A
              real backdrop chip guarantees contrast against any card color,
              not just dark ones. */}
          <span className="label rounded-sm bg-ink/60 px-2 py-1 backdrop-blur-[2px]">Our portfolio · 100+ projects</span>
          {/* Only past 1024px, not sm's 640px — WebGLHero itself never renders
              below 768px, and two full label strings side by side get tight
              right at that point; hide the second until there's room proven
              wide enough rather than guess at exact wrapping. */}
          <span className="label hidden rounded-sm bg-ink/60 px-2 py-1 backdrop-blur-[2px] lg:block">Drag to orbit · click to open</span>
        </motion.div>

        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 1 }}
            className="label text-accent"
          >
            Smart Solutions for Your Business
          </motion.span>
          <h1
            className="mt-4 font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.98] tracking-tight text-accent [text-shadow:0_2px_24px_rgb(0_0_0_/_0.45)]"
          >
            {TITLE_LINES.map((line, li) => (
              <span key={li} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.4 + li * 0.12, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.9 }}
            className="mx-auto mt-6 max-w-md text-pretty text-ink-soft"
          >
            We design, build and grow digital products. Drag to orbit our work, then click a project to open it.
          </motion.p>
        </div>

        <div className="flex items-end justify-between gap-4">
          <div
            className="pointer-events-auto inline-flex border border-ink/20 bg-paper/50 p-1 backdrop-blur-sm"
            role="group"
            aria-label="Gallery layout"
          >
            {LAYOUTS.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLayout(l)}
                aria-pressed={layout === l}
                data-cursor
                className="relative px-4 py-2 font-mono text-[0.65rem] uppercase tracking-label"
              >
                {layout === l ? (
                  <motion.span
                    layoutId="gallery-toggle"
                    className="absolute inset-0 bg-ink"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : null}
                <span className={cn("relative", layout === l ? "text-paper" : "text-ink-soft")}>{l}</span>
              </button>
            ))}
          </div>

          <div className="flex flex-col items-end gap-4">
            <AnimatePresence mode="wait">
              {activeWork ? (
                <motion.div
                  key={activeWork.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="text-right"
                >
                  <p className="font-display text-lg italic text-ink">{activeWork.title}</p>
                  <p className="label">{activeArtist?.name}, {activeWork.year}</p>
                </motion.div>
              ) : (
                <motion.p key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="label hidden rounded-sm bg-ink/60 px-2 py-1 text-right backdrop-blur-[2px] sm:block">
                  Hover a project
                </motion.p>
              )}
            </AnimatePresence>
            <ScrollCue label="Scroll into the story" className="rounded-sm bg-ink/60 px-2 py-1 backdrop-blur-[2px]" />
          </div>
        </div>
      </div>

      {/* Focus detail overlay (transparent — the WebGL plane shows through) */}
      <AnimatePresence>
        {focusWork ? (
          <motion.div
            key="focus-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute inset-0 z-20"
          >
            {/* click anywhere (that isn't a control) to close */}
            <button
              type="button"
              aria-label="Close"
              onClick={() => setFocused(-1)}
              className="absolute inset-0 cursor-zoom-out"
            />

            {/* legibility scrims */}
            <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-paper/85 to-transparent" />
            <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-paper/90 to-transparent" />

            <div className="pointer-events-none relative flex h-full flex-col justify-between text-ink">
              {/* Top bar */}
              <div className="container-editorial flex items-center justify-between pt-[calc(var(--header-h)*0.5)]">
                <span className="label text-ink/70">
                  <span className="text-ink">{String(focused + 1).padStart(2, "0")}</span>
                  <span className="mx-1 opacity-50">/</span>
                  {String(works.length).padStart(2, "0")}
                </span>
                <button
                  type="button"
                  onClick={() => setFocused(-1)}
                  className="pointer-events-auto flex items-center gap-2 border border-ink/30 px-4 py-2 font-mono text-xs uppercase tracking-label transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                >
                  Close ✕
                </button>
              </div>

              {/* Prev / next */}
              <div className="flex items-center justify-between px-4 md:px-8">
                <button
                  type="button"
                  onClick={() => setFocused((f) => (f - 1 + works.length) % works.length)}
                  aria-label="Previous work"
                  className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-ink/30 text-xl transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => setFocused((f) => (f + 1) % works.length)}
                  aria-label="Next work"
                  className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-ink/30 text-xl transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                >
                  →
                </button>
              </div>

              {/* Bottom meta */}
              <div className="container-editorial flex flex-col gap-3 pb-8 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="font-display text-2xl italic leading-tight text-ink md:text-3xl">
                    {focusWork.title}
                  </h2>
                  <p className="mt-1 text-sm text-ink/75">
                    {focusArtist?.name}, {focusWork.year} · {focusWork.medium}
                  </p>
                  <p className="label mt-1 text-ink/45">{focusWork.location}</p>
                </div>
                <div className="flex items-center gap-5">
                  <Link
                    href={`/portfolio/${focusWork.slug}`}
                    className="pointer-events-auto link-underline text-sm text-ink"
                  >
                    View project →
                  </Link>
                  <span className="label hidden text-ink/40 md:block">Esc to close</span>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

function FallbackHero({
  works,
  animate,
  onSelect,
}: {
  works: Artwork[];
  animate: boolean;
  onSelect: (index: number) => void;
}) {
  return (
    <section className="relative min-h-[100svh] bg-paper pb-16 pt-[calc(var(--header-h)+3.5rem)]">
      <div className="container-editorial">
        <span className="label text-accent">Smart Solutions for Your Business</span>
        <h1 className="mt-4 max-w-[14ch] font-display text-[clamp(2.5rem,10vw,4.5rem)] leading-[0.98] tracking-tight text-ink">
          Smart solutions for your business.
        </h1>
        <p className="mt-5 max-w-md text-pretty text-ink-soft">
          Tap any project to open it full screen, then read how we build below.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {works.map((a, i) => (
            <motion.button
              key={a.id}
              type="button"
              onClick={() => onSelect(i)}
              initial={animate ? { opacity: 0, y: 24 } : false}
              whileInView={animate ? { opacity: 1, y: 0 } : undefined}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: (i % 8) * 0.05, duration: 0.6 }}
              className={cn("group relative block overflow-hidden", i % 5 === 0 && "col-span-2 row-span-2")}
              style={{ aspectRatio: i % 5 === 0 ? "3 / 2" : "1 / 1" }}
              aria-label={`View ${a.title}`}
            >
              <div className="h-full w-full transition-transform duration-700 group-hover:scale-105">
                <PlaceholderArt seed={a.seed} palette={a.palette} />
              </div>
            </motion.button>
          ))}
        </div>

        <ScrollCue label="Scroll into the story" className="mt-12" />
      </div>
    </section>
  );
}
