"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { collections, getArtworksByIds, getArtistById } from "@/content/index";
import { PlaceholderArt } from "@/components/media/PlaceholderArt";
import { CollectionCard } from "./CollectionCard";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { paletteIsDark, cn } from "@/lib/utils";

/**
 * "Process"-style horizontal scroll of the collections. The section pins while
 * a track of full-viewport panels slides sideways with vertical scroll (GSAP
 * ScrollTrigger). Each panel's oversized numeral, heading, copy and artwork
 * reveal / parallax as it crosses the viewport — an intro panel, one panel per
 * collection, and a closing panel. Mobile / reduced-motion fall back to a
 * vertical stack so the page stays usable and swipe-scrollable.
 */
export function HorizontalCollections() {
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0); // 0 = intro, 1..n = collection, n+1 = outro

  // Whether the GSAP-pinned experience has been confirmed appropriate for this
  // visitor. Starts false so the very first client render always matches the
  // server-rendered fallback, even when reduced-motion or a mobile viewport is
  // already active at load — `reduced`/`isMobile` can't reflect that until one
  // render after mount, and hydration always renders against the server
  // snapshot first regardless. Promoting straight into a fresh mount is safe;
  // tearing the GSAP-pinned section back down because a value resolved late is
  // what crashed React's reconciler with a removeChild error (the pin-spacer
  // ScrollTrigger inserts moves the section outside what React expects).
  const [confirmedFull, setConfirmedFull] = useState(false);
  const resolvedOnceRef = useRef(false);

  useEffect(() => {
    if (!resolvedOnceRef.current) {
      resolvedOnceRef.current = true;
      const reducedNow = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const mobileNow = window.matchMedia("(max-width: 767px)").matches;
      setConfirmedFull(!reducedNow && !mobileNow);
      return;
    }
    setConfirmedFull(!reduced && !isMobile);
  }, [reduced, isMobile]);

  useIsomorphicLayoutEffect(() => {
    if (!confirmedFull) return;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
      let last = -1;

      const scrollTween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (barRef.current) barRef.current.style.transform = `scaleX(${self.progress})`;
            const total = collections.length + 1; // panels index 0..total
            const i = Math.round(self.progress * total);
            if (i !== last) {
              last = i;
              setActive(i);
            }
          },
        },
      });

      const panels = gsap.utils.toArray<HTMLElement>("[data-panel]");
      panels.forEach((panel) => {
        const items = panel.querySelectorAll<HTMLElement>("[data-anim]");
        if (items.length) {
          gsap.from(items, {
            y: 46,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: panel,
              containerAnimation: scrollTween,
              start: "left 72%",
              toggleActions: "play none none reverse",
            },
          });
        }
        const num = panel.querySelector<HTMLElement>("[data-num]");
        if (num) {
          gsap.fromTo(
            num,
            { yPercent: 26, autoAlpha: 0 },
            {
              yPercent: 0,
              autoAlpha: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: scrollTween,
                start: "left 90%",
                end: "left 45%",
                scrub: true,
              },
            }
          );
        }
        const img = panel.querySelector<HTMLElement>("[data-img]");
        if (img) {
          gsap.fromTo(
            img,
            { xPercent: -12 },
            {
              xPercent: 12,
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: scrollTween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, [confirmedFull]);

  // Vertical fallback.
  if (!confirmedFull) {
    return (
      <div className="space-y-28 pb-28 md:space-y-40">
        {collections.map((c, i) => (
          <CollectionCard key={c.id} collection={c} index={i} />
        ))}
      </div>
    );
  }

  const activeCollection =
    active >= 1 && active <= collections.length ? collections[active - 1] : null;

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-paper/80">
      <div ref={trackRef} className="flex h-[100svh] w-max flex-nowrap will-change-transform">
        {/* Intro panel */}
        <article data-panel className="relative flex h-full w-screen shrink-0 items-center">
          <div className="container-editorial">
            <span data-anim className="label text-accent">Six core disciplines</span>
            <h2 data-anim className="mt-5 max-w-[14ch] font-display text-display-lg leading-[0.98] text-ink">
              Our services, in sequence.
            </h2>
            <p data-anim className="mt-7 max-w-md text-pretty text-lg leading-relaxed text-ink-soft">
              Scroll to move through everything we deliver — from web and app development to CRM automation. Each turns as you go.
            </p>
            <span data-anim className="label mt-10 inline-flex items-center gap-3 text-muted">
              Scroll to advance
              <span aria-hidden className="inline-block h-px w-10 bg-current" />
              →
            </span>
          </div>
        </article>

        {/* Collection panels */}
        {collections.map((collection, i) => {
          const hero = getArtworksByIds(collection.artworkIds)[0];
          const artist = collection.featuredArtistIds
            .map((id) => getArtistById(id))
            .filter(Boolean)[0];
          const dark = paletteIsDark(collection.palette);
          // Only caption with a project attribution when the panel is genuinely
          // showing that project's own photo — not when it's a generic service
          // illustration (which isn't "of" any single case study).
          const showProjectCaption = Boolean(hero && (!collection.image || collection.image === hero.image));
          return (
            <article
              key={collection.id}
              data-panel
              className="relative flex h-full w-screen shrink-0 items-center"
              style={{
                backgroundColor: "rgb(var(--paper) / 0.80)",
                backgroundImage: `radial-gradient(60% 70% at ${i % 2 ? "82%" : "18%"} 30%, ${collection.palette.from}33, transparent 62%)`,
              }}
            >
              <div className="container-editorial grid w-full items-center gap-10 md:grid-cols-12 md:gap-12">
                <div className={cn("relative md:col-span-5", i % 2 ? "md:order-2 md:col-start-8" : "md:order-1")}>
                  <span
                    data-num
                    aria-hidden
                    className="block select-none font-display leading-[0.8] tracking-tighter text-accent/20 text-[clamp(5rem,13vw,11rem)]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span data-anim className="label text-accent">{collection.period}</span>
                  <h2 data-anim className="mt-3 max-w-[14ch] font-display text-display-md leading-[1.02] text-ink">
                    {collection.title}
                  </h2>
                  <p data-anim className="mt-2 font-display text-xl italic text-muted">{collection.subtitle}</p>
                  <p data-anim className="mt-6 max-w-md text-pretty leading-relaxed text-ink-soft">
                    {collection.summary}
                  </p>
                  <div data-anim className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
                    <span className="label">
                      {collection.artworkIds.length}{" "}
                      {collection.artworkIds.length === 1 ? "case study" : "case studies"}
                    </span>
                    {artist ? <span className="label">Led by {artist.name}</span> : null}
                  </div>
                  <Link
                    data-anim
                    href={`/services/${collection.slug}`}
                    className="mt-8 inline-flex items-center gap-3 border border-ink/25 px-6 py-3.5 font-mono text-xs uppercase tracking-label text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                  >
                    Explore service
                    <span aria-hidden>→</span>
                  </Link>
                </div>

                <div className={cn("md:col-span-6", i % 2 ? "md:order-1 md:col-start-1" : "md:order-2 md:col-start-7")}>
                  {collection.image || hero ? (
                    <figure className="relative overflow-hidden shadow-2xl shadow-ink/10" style={{ aspectRatio: "3 / 2" }}>
                      <div data-img className="absolute inset-[-14%]">
                        {collection.image ? (
                          <Image
                            src={collection.image}
                            alt={`${collection.title} — GitzTech ${collection.title.toLowerCase()} service`}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover"
                          />
                        ) : (
                          <PlaceholderArt
                            seed={hero!.seed}
                            palette={hero!.palette}
                            motif={hero!.medium.toLowerCase().includes("vellum") ? "manuscript" : "field"}
                          />
                        )}
                      </div>
                      {showProjectCaption ? (
                        <figcaption className={cn("absolute bottom-3 left-3 rounded-sm px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-label", dark ? "bg-ink/50 text-paper" : "bg-paper/80 text-ink")}>
                          {hero!.title}, {hero!.year}
                        </figcaption>
                      ) : null}
                    </figure>
                  ) : null}
                </div>
              </div>
            </article>
          );
        })}

        {/* Outro panel */}
        <article data-panel className="relative flex h-full w-screen shrink-0 items-center bg-paper/80 text-ink">
          <div className="container-editorial">
            <span data-anim className="label text-accent">Ready when you are</span>
            <h2 data-anim className="mt-5 max-w-[14ch] font-display text-display-lg leading-[0.98] text-ink">
              Let us start the conversation.
            </h2>
            <div data-anim className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-3 border border-ink/30 px-7 py-4 font-mono text-xs uppercase tracking-label text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
              >
                Get a quote
                <span aria-hidden>→</span>
              </Link>
              <Link href="/team" className="link-underline text-ink/80 hover:text-ink">
                Meet the team
              </Link>
            </div>
          </div>
        </article>
      </div>

      {/* Progress + counter (visible during the pin) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5]">
        <div className="container-editorial flex items-center justify-between gap-6 pb-6">
          <span className="label text-ink-soft">
            {activeCollection ? (
              <>
                <span className="text-ink">{String(active).padStart(2, "0")}</span>
                <span className="mx-1 opacity-50">/</span>
                {String(collections.length).padStart(2, "0")} — {activeCollection.title}
              </>
            ) : active === 0 ? (
              "Introduction"
            ) : (
              "Get a quote"
            )}
          </span>
          <span className="label hidden text-muted sm:block">Scroll ↓ to move sideways</span>
        </div>
        <div className="h-[3px] w-full bg-line/10">
          <div ref={barRef} className="h-full origin-left scale-x-0 bg-accent" />
        </div>
      </div>
    </section>
  );
}
