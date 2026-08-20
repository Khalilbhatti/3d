"use client";

import { useEffect, useRef, useState } from "react";
import { type Chapter as ChapterType } from "@/content/types";
import { Chapter } from "./Chapter";
import { ExploreCollection } from "./ExploreCollection";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useAppStore } from "@/lib/store";
import { paletteIsDark, cn } from "@/lib/utils";
import { registerChapterScrollTarget, unregisterChapterScrollTarget } from "@/lib/chapterScrollTargets";

/**
 * A run of chapters pinned into one viewport, crossfading from one to the
 * next as the visitor scrolls — the same "one card replaces the last" scroll
 * language `HorizontalCollections` uses for the services panels, adapted here
 * to a vertical stack (with progress dots + a scroll hint instead of a
 * sideways track). Mobile / reduced-motion fall back to the plain flowing
 * chapter list — same safety pattern as `HorizontalCollections`.
 */
export function ChapterStack({
  chapters,
  startIndex,
}: {
  chapters: ChapterType[];
  startIndex: number;
}) {
  const setActiveChapter = useAppStore((s) => s.setActiveChapter);

  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const barRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // The very first client render must match the server-rendered fallback
  // (starts false, only ever promotes into the pinned layout once confirmed
  // on mount) and, once decided, is never re-evaluated. This used to depend
  // on [reduced, isMobile] and re-run whenever either changed after mount —
  // which meant resizing the window across the mobile breakpoint flipped
  // `confirmedFull` back to false and unmounted a live GSAP ScrollTrigger
  // pin mid-session. ScrollTrigger's `pin: true` inserts its own pin-spacer
  // wrapper divs directly into the DOM, outside React's tracking; tearing
  // that down while React's own reconciler is mid-commit is what crashed it
  // with "removeChild: not a child of this node" (confirmed via
  // gstack:browse: resize desktop→mobile after the pinned stack had already
  // mounted). Nothing about this component needs to live-swap between the
  // pinned and flow layouts mid-session, so freezing the decision at mount
  // removes the teardown race entirely.
  const [confirmedFull, setConfirmedFull] = useState(false);

  useEffect(() => {
    const reducedNow = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobileNow = window.matchMedia("(max-width: 767px)").matches;
    setConfirmedFull(!reducedNow && !mobileNow);
  }, []);

  const canStack = chapters.length > 1;

  useIsomorphicLayoutEffect(() => {
    if (!confirmedFull || !canStack) return;
    const section = sectionRef.current;
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!section || cards.length !== chapters.length) return;

    const ctx = gsap.context(() => {
      let last = -1;
      gsap.set(cards[0], { autoAlpha: 1, y: 0, scale: 1, rotate: 0 });
      gsap.set(cards.slice(1), { autoAlpha: 0, y: 130, scale: 0.94, rotate: 1.4 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${(chapters.length - 1) * window.innerHeight}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (barRef.current) barRef.current.style.transform = `scaleX(${self.progress})`;
            const i = Math.round(self.progress * (chapters.length - 1));
            if (i !== last) {
              last = i;
              setActive(i);
              setActiveChapter(startIndex + i);
            }
          },
        },
      });

      // Each outgoing card lifts up and recedes (shrinks + tilts away, like a
      // card being pulled off the top of a stack) while the next one rises in
      // from below and settles flat. The two tweens are deliberately staggered
      // (incoming starts partway through outgoing's fade, and both finish
      // faster than the full slot) rather than sharing the whole duration —
      // these are dense text panels stacked exactly on top of each other, so
      // a full-length simultaneous crossfade leaves both readable at once
      // (their paragraphs visibly overlapping) instead of one handing off to
      // the other.
      cards.slice(0, -1).forEach((card, i) => {
        tl.to(
          card,
          { autoAlpha: 0, y: -150, scale: 0.92, rotate: -1.4, duration: 0.6, ease: "power2.in" },
          i
        ).to(
          cards[i + 1],
          { autoAlpha: 1, y: 0, scale: 1, rotate: 0, duration: 0.6, ease: "power2.out" },
          i + 0.4
        );
      });

      // Every card in the stack shares the same `absolute inset-0` box, so a
      // plain `getElementById` + `getBoundingClientRect` (what nav links use
      // everywhere else) always resolves to the top of the whole pin no
      // matter which chapter's id is requested. Register the real scroll-Y
      // for each chapter — derived from this ScrollTrigger's own resolved
      // start/end — so `smoothScrollToId` can land on the right one.
      const n = chapters.length - 1;
      chapters.forEach((chapter, i) => {
        registerChapterScrollTarget(chapter.id, () => {
          const st = tl.scrollTrigger;
          if (!st) return null;
          return n > 0 ? st.start + (i / n) * (st.end - st.start) : st.start;
        });
      });
    }, section);

    return () => {
      chapters.forEach((chapter) => unregisterChapterScrollTarget(chapter.id));
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [confirmedFull, canStack, chapters, startIndex, setActiveChapter]);

  if (!confirmedFull || !canStack) {
    return (
      <>
        {chapters.map((chapter, i) =>
          chapter.kind === "services" ? (
            <ExploreCollection key={chapter.id} chapter={chapter} index={startIndex + i} variant="flow" />
          ) : (
            <Chapter
              key={chapter.id}
              chapter={chapter}
              index={startIndex + i}
              dark={paletteIsDark(chapter.palette)}
            />
          )
        )}
      </>
    );
  }

  return (
    <div ref={sectionRef} className="relative h-[100svh] overflow-hidden">
      {chapters.map((chapter, i) => (
        <div
          key={chapter.id}
          ref={(el) => {
            cardRefs.current[i] = el;
          }}
          className="absolute inset-0"
        >
          {chapter.kind === "services" ? (
            <ExploreCollection
              chapter={chapter}
              index={startIndex + i}
              variant="panel"
              active={active === i}
            />
          ) : (
            <Chapter
              chapter={chapter}
              index={startIndex + i}
              dark={paletteIsDark(chapter.palette)}
              variant="panel"
            />
          )}
        </div>
      ))}

      {/* Progress dots */}
      <div className="pointer-events-none absolute right-5 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-3 lg:flex xl:right-10">
        {chapters.map((chapter, i) => (
          <span
            key={chapter.id}
            aria-hidden
            className={cn(
              "w-1.5 rounded-full transition-all duration-500 ease-editorial",
              i === active ? "h-7 bg-accent" : "h-1.5 bg-ink/20"
            )}
          />
        ))}
      </div>

      {/* Scroll hint + progress bar */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5]">
        <div className="container-editorial flex items-center justify-between gap-6 pb-6">
          <span className="label text-muted">
            <span className="text-ink">{String(active + 1).padStart(2, "0")}</span>
            <span className="mx-1 opacity-50">/</span>
            {String(chapters.length).padStart(2, "0")}
          </span>
          <span className="label hidden text-muted sm:block">Scroll — one chapter at a time</span>
        </div>
        <div className="h-[3px] w-full bg-line/10">
          <div ref={barRef} className="h-full origin-left scale-x-0 bg-accent" />
        </div>
      </div>
    </div>
  );
}
