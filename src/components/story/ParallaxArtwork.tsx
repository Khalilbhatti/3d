"use client";

import Image from "next/image";
import { useRef } from "react";
import { type Artwork } from "@/content/types";
import { ASPECT } from "@/components/media/ArtworkImage";
import { PlaceholderArt } from "@/components/media/PlaceholderArt";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

/**
 * An artwork inside a clipped frame whose inner layer drifts vertically as the
 * frame is scrolled through — layered parallax depth. The inner layer is over-
 * sized (inset -10%) so no gaps ever show. Falls back to a static image for
 * reduced-motion, and dampens the movement on mobile.
 */
export function ParallaxArtwork({
  artwork,
  className,
  aspect,
  sizes = "(max-width: 768px) 100vw, 55vw",
  motif = "field",
  priority = false,
  amount = 10,
  fit = "cover",
}: {
  artwork: Artwork;
  className?: string;
  aspect?: string;
  sizes?: string;
  motif?: "field" | "portrait" | "manuscript";
  priority?: boolean;
  amount?: number;
  /** "contain" shows the whole image, unclipped — for real imagery (e.g. a
   *  marketing screenshot) where the default oversized parallax crop would
   *  cut off content near the edges. Default "cover" is unchanged. */
  fit?: "cover" | "contain";
}) {
  const frame = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const ratio = aspect ?? ASPECT[artwork.orientation];

  useIsomorphicLayoutEffect(() => {
    if (fit === "contain" || reduced || !frame.current || !inner.current) return;
    const travel = isMobile ? amount * 0.45 : amount;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        inner.current,
        { yPercent: -travel },
        {
          yPercent: travel,
          ease: "none",
          scrollTrigger: {
            trigger: frame.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, frame);
    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [reduced, isMobile, amount, fit]);

  return (
    <div
      ref={frame}
      className={cn("relative overflow-hidden bg-paper-deep", className)}
      style={{ aspectRatio: ratio }}
    >
      <div ref={inner} className={fit === "contain" ? "absolute inset-0" : "absolute inset-[-10%]"}>
        {artwork.image ? (
          <Image
            src={artwork.image}
            alt={artwork.alt}
            fill
            sizes={sizes}
            priority={priority}
            quality={90}
            placeholder={artwork.blurDataURL ? "blur" : "empty"}
            blurDataURL={artwork.blurDataURL}
            className={fit === "contain" ? "object-contain" : "object-cover"}
          />
        ) : (
          <PlaceholderArt seed={artwork.seed} palette={artwork.palette} motif={motif} />
        )}
      </div>
    </div>
  );
}
