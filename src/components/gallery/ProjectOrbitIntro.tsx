"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { type Artwork } from "@/content/types";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useIsMobile } from "@/hooks/useMediaQuery";

type Phase = "scatter" | "line" | "circle";
type Target = { x: number; y: number; rotation: number; scale: number; opacity: number };

const CARD_W = 68;
const CARD_H = 92;
/** Scroll distance (× viewport height) the circle → arc morph plays out over, pinned. */
const PIN_DISTANCE = 1.4;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function ProjectCard({ artwork, target }: { artwork: Artwork; target: Target }) {
  return (
    <motion.div
      animate={{ x: target.x, y: target.y, rotate: target.rotation, scale: target.scale, opacity: target.opacity }}
      transition={{ type: "spring", stiffness: 42, damping: 16 }}
      style={{ position: "absolute", width: CARD_W, height: CARD_H, transformStyle: "preserve-3d" }}
      className="group"
    >
      <Link
        href={`/portfolio/${artwork.slug}`}
        aria-label={`View ${artwork.title}`}
        className="block h-full w-full focus-visible:outline-none"
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div
          className="relative h-full w-full"
          style={{ transformStyle: "preserve-3d" }}
          whileHover={{ rotateY: 180 }}
          whileFocus={{ rotateY: 180 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 overflow-hidden rounded-lg border border-line/15 shadow-lg"
            style={{ backfaceVisibility: "hidden" }}
          >
            <Image src={artwork.image!} alt={artwork.title} fill sizes="120px" className="object-cover" />
            <div className="absolute inset-0 bg-ink/15 transition-colors group-hover:bg-transparent" />
          </div>
          {/* Back */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-1 overflow-hidden rounded-lg border border-line/20 bg-ink p-2 text-center"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <p className="font-display text-[0.62rem] italic leading-tight text-paper">{artwork.title}</p>
            <p className="font-mono text-[0.5rem] uppercase tracking-label text-accent">View →</p>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

/**
 * Portfolio opener: every project starts scattered, resolves into a line,
 * then a ring — and as the visitor scrolls, the ring unrolls into a bottom
 * arc they can shuffle through, each card flipping to its title on hover.
 * Same formation language as the reference "scroll-morph-hero" component,
 * adapted three ways: real project images/links instead of stock photos and
 * placeholder flip-text, sized to however many projects actually exist
 * instead of a fixed 20, and — the one that matters architecturally — the
 * circle→arc morph is driven by GSAP ScrollTrigger's pinned scrub instead of
 * a raw `wheel`-event listener with `preventDefault()`. This site already
 * runs Lenis smooth-scroll + ScrollTrigger globally; a second system
 * capturing the same wheel input would fight it on every scroll tick.
 * Desktop + motion-ok only — mobile/reduced-motion visitors go straight to
 * the functional grid below, which already lists every project accessibly.
 */
export function ProjectOrbitIntro({ artworks }: { artworks: Artwork[] }) {
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLDivElement>(null);

  const works = useMemo(() => artworks.filter((a) => a.image), [artworks]);
  const count = works.length;

  const [size, setSize] = useState({ w: 0, h: 0 });
  const [phase, setPhase] = useState<Phase>("scatter");
  const [morph, setMorph] = useState(0); // 0 = ring, 1 = fully unrolled arc
  const [rotate, setRotate] = useState(0); // 0..1 shuffle progress along the arc

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) setSize({ w: e.contentRect.width, h: e.contentRect.height });
    });
    ro.observe(el);
    setSize({ w: el.offsetWidth, h: el.offsetHeight });
    return () => ro.disconnect();
  }, []);

  // Scatter → line → ring: a fixed-time intro, not scroll-linked, so it plays
  // once on mount regardless of scroll position.
  useEffect(() => {
    const t1 = setTimeout(() => setPhase("line"), 400);
    const t2 = setTimeout(() => setPhase("circle"), 1600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Ring → arc morph + arc shuffle: driven by real page scroll, pinned for a
  // fixed distance, same mechanism ChapterStack/HorizontalCollections use.
  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || isMobile) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${PIN_DISTANCE * window.innerHeight}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          setMorph(Math.min(1, self.progress / 0.4));
          setRotate(Math.max(0, (self.progress - 0.4) / 0.6));
        },
      });
    }, section);
    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [isMobile, count]);

  // Spring-smooth those scroll-driven values for silky motion.
  const morphSpring = useSpring(0, { stiffness: 60, damping: 20 });
  const rotateSpring = useSpring(0, { stiffness: 60, damping: 20 });
  const [morphValue, setMorphValue] = useState(0);
  const [rotateValue, setRotateValue] = useState(0);
  useEffect(() => {
    morphSpring.set(morph);
  }, [morph, morphSpring]);
  useEffect(() => {
    rotateSpring.set(rotate);
  }, [rotate, rotateSpring]);
  useEffect(() => {
    const u1 = morphSpring.on("change", setMorphValue);
    const u2 = rotateSpring.on("change", setRotateValue);
    return () => {
      u1();
      u2();
    };
  }, [morphSpring, rotateSpring]);

  // Cursor parallax on the arc.
  const parallaxSpring = useSpring(0, { stiffness: 30, damping: 20 });
  const [parallax, setParallax] = useState(0);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || isMobile) return;
    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      parallaxSpring.set(nx * 70);
    };
    section.addEventListener("mousemove", onMove);
    return () => section.removeEventListener("mousemove", onMove);
  }, [isMobile, parallaxSpring]);
  useEffect(() => parallaxSpring.on("change", setParallax), [parallaxSpring]);

  const scatter = useMemo(
    () =>
      works.map(() => ({
        x: (Math.random() - 0.5) * 860,
        y: (Math.random() - 0.5) * 480,
        rotation: (Math.random() - 0.5) * 140,
        scale: 0.6,
        opacity: 0,
      })),
    [count] // eslint-disable-line react-hooks/exhaustive-deps -- stable per mount, not per artworks identity
  );

  if (reduced || isMobile || count === 0) return null;

  const narrow = size.w > 0 && size.w < 900;
  const minDim = Math.min(size.w, size.h) || 1;
  const circleRadius = Math.min(minDim * 0.34, 300);
  const baseRadius = Math.min(size.w, size.h * 1.5) || 1;
  const arcRadius = baseRadius * (narrow ? 1.3 : 1.05);
  const arcApexY = size.h * (narrow ? 0.34 : 0.24);
  const arcCenterY = arcApexY + arcRadius;
  const spreadAngle = narrow ? 100 : 140;
  const startAngle = -90 - spreadAngle / 2;
  const step = count > 1 ? spreadAngle / (count - 1) : 0;
  const maxRotation = spreadAngle * 0.7;
  const boundedRotation = -rotateValue * maxRotation;

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-paper"
      aria-label="Portfolio projects, arranged as a scroll-driven orbit"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(60% 55% at 50% 12%, rgb(var(--accent) / 0.12), transparent 62%)",
        }}
      />

      <motion.p
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === "circle" && morphValue < 0.5 ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className="pointer-events-none absolute left-1/2 top-[18%] z-10 -translate-x-1/2 text-center font-mono text-xs uppercase tracking-label text-muted"
      >
        {count} projects — scroll to bring one forward
      </motion.p>

      <div className="relative flex h-full w-full items-center justify-center">
        {works.map((artwork, i) => {
          let target: Target;

          if (phase === "scatter") {
            target = scatter[i];
          } else if (phase === "line") {
            const lineSpacing = 76;
            const lineX = i * lineSpacing - ((count - 1) * lineSpacing) / 2;
            target = { x: lineX, y: 0, rotation: 0, scale: 1, opacity: 1 };
          } else {
            const circleAngle = (i / count) * 360;
            const circleRad = (circleAngle * Math.PI) / 180;
            const circlePos = {
              x: Math.cos(circleRad) * circleRadius,
              y: Math.sin(circleRad) * circleRadius,
              rotation: circleAngle + 90,
            };

            const currentArcAngle = startAngle + i * step + boundedRotation;
            const arcRad = (currentArcAngle * Math.PI) / 180;
            const arcPos = {
              x: Math.cos(arcRad) * arcRadius + parallax,
              y: Math.sin(arcRad) * arcRadius + arcCenterY,
              rotation: currentArcAngle + 90,
              scale: narrow ? 1.3 : 1.6,
            };

            target = {
              x: lerp(circlePos.x, arcPos.x, morphValue),
              y: lerp(circlePos.y, arcPos.y, morphValue),
              rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
              scale: lerp(1, arcPos.scale, morphValue),
              opacity: 1,
            };
          }

          return <ProjectCard key={artwork.id} artwork={artwork} target={target} />;
        })}
      </div>
    </section>
  );
}
