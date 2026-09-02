"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { type Artwork } from "@/content/types";
import { PlaceholderArt } from "@/components/media/PlaceholderArt";
import { MReveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

function motifFor(artwork: Artwork): "field" | "portrait" | "manuscript" {
  return artwork.medium.toLowerCase().includes("vellum") ? "manuscript" : "field";
}

/**
 * Closing showcase for /portfolio only: a horizontal accordion of curated
 * featured projects, one expanded at a time via flex-grow. Mobile / reduced-
 * motion fall back to a plain vertical card stack — the same two-branch
 * safety pattern already used by ChapterStack, HorizontalCollections, and
 * ServiceOrbit elsewhere in this codebase. This component has no canvas/GSAP
 * of its own, but decided once on mount and never again for consistency with
 * those siblings, where re-deciding live on resize unmounts an R3F canvas or
 * GSAP-pinned layout mid-session and crashes React's reconciler.
 */
export function FeaturedProjectsSelector({ artworks }: { artworks: Artwork[] }) {
  const [active, setActive] = useState(0);

  const [confirmedFull, setConfirmedFull] = useState(false);
  useEffect(() => {
    const reducedNow = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobileNow = window.matchMedia("(max-width: 767px)").matches;
    setConfirmedFull(!reducedNow && !mobileNow);
  }, []);

  if (artworks.length === 0) return null;

  return (
    <section className="border-t border-line/15 py-20 md:py-28">
      <div className="container-editorial">
        <span className="label text-accent">Featured work</span>
        <h2 className="mt-4 max-w-[16ch] font-display text-display-md leading-[0.98] text-ink">
          A closer look at what we&apos;ve shipped.
        </h2>
      </div>

      {!confirmedFull ? (
        <div className="container-editorial mt-12 space-y-6">
          {artworks.map((artwork, i) => (
            <MReveal key={artwork.id} variant="up" delay={(i % 6) * 0.06}>
              <Link
                href={`/portfolio/${artwork.slug}`}
                className="group flex items-center gap-5 border-b border-line/15 pb-6"
              >
                <div className="relative h-20 w-28 shrink-0 overflow-hidden">
                  {artwork.image ? (
                    <Image
                      src={artwork.image}
                      alt={artwork.alt}
                      fill
                      sizes="112px"
                      quality={90}
                      className="object-cover"
                    />
                  ) : (
                    <PlaceholderArt seed={artwork.seed} palette={artwork.palette} motif={motifFor(artwork)} />
                  )}
                </div>
                <div>
                  <p className="font-display text-lg text-ink transition-colors group-hover:text-accent">
                    {artwork.title}
                  </p>
                  <p className="mt-1 line-clamp-1 text-sm text-ink-soft">{artwork.description}</p>
                </div>
              </Link>
            </MReveal>
          ))}
        </div>
      ) : (
        <div className="container-editorial mt-12">
          <div className="flex h-[440px] w-full items-stretch gap-1 overflow-hidden">
            {artworks.map((artwork, i) => {
              const isActive = i === active;
              return (
                <MReveal
                  key={artwork.id}
                  as="div"
                  variant="left"
                  delay={i * 0.08}
                  className={cn(
                    "group relative min-w-[64px] overflow-hidden transition-[flex-grow] duration-700 ease-editorial",
                    isActive ? "flex-[7_1_0%]" : "flex-[1_1_0%]"
                  )}
                >
                  {/* `absolute inset-0`, not a real width/height, so this Link
                      always exactly fills its MReveal parent regardless of
                      that parent's animated flex-grow — the parent carries
                      the entrance animation, sizing, and the 64px floor
                      (MReveal doesn't forward a `style` prop, so that floor
                      has to be a class on the parent, not inline style here),
                      this only carries content + the click/keyboard interaction. */}
                  <Link
                    href={`/portfolio/${artwork.slug}`}
                    aria-current={isActive ? "true" : undefined}
                    onClick={(e) => {
                      if (e.metaKey || e.ctrlKey || e.shiftKey) return;
                      if (!isActive) {
                        e.preventDefault();
                        setActive(i);
                      }
                    }}
                    className="absolute inset-0 flex flex-col justify-end focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-accent"
                  >
                    <div className="absolute inset-0">
                      {artwork.image ? (
                        <Image
                          src={artwork.image}
                          alt={artwork.alt}
                          fill
                          sizes="(max-width: 1024px) 60vw, 45vw"
                          quality={90}
                          className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-105"
                        />
                      ) : (
                        <PlaceholderArt seed={artwork.seed} palette={artwork.palette} motif={motifFor(artwork)} />
                      )}
                    </div>
                    <div
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink/80 to-transparent transition-opacity duration-500"
                      style={{ opacity: isActive ? 1 : 0.6 }}
                    />
                    <div className="relative z-[1] p-5">
                      <p
                        className={cn(
                          "font-mono text-xs uppercase tracking-label text-paper/70 transition-opacity duration-500",
                          isActive ? "opacity-100" : "opacity-0"
                        )}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      <p
                        className={cn(
                          "font-display text-2xl text-paper transition-all duration-500",
                          isActive ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                        )}
                      >
                        {artwork.title}
                        {!isActive && <span className="sr-only"> — expand</span>}
                      </p>
                      <p
                        className={cn(
                          "mt-1 max-w-xs text-pretty text-sm text-paper/80 transition-all delay-100 duration-500",
                          isActive ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                        )}
                      >
                        {artwork.description}
                      </p>
                    </div>
                  </Link>
                </MReveal>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
