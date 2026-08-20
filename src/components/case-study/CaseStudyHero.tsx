"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { MReveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/typography/SplitReveal";
import { Kicker } from "@/components/typography/primitives";
import { MetaList } from "@/components/ui/MetaList";
import { type CaseStudy } from "@/content/types";
import { LottiePulse } from "./effects";

const CaseStudyHero3D = dynamic(
  () => import("./CaseStudyHero3D").then((m) => m.CaseStudyHero3D),
  { ssr: false }
);

/**
 * Cover section: eyebrow, title, tagline, project-details metadata, and a
 * WebGL hero on capable desktops (a flat animated image everywhere else —
 * mobile, reduced-motion, no-WebGL). Decided once on mount and never
 * re-evaluated: re-deciding live on every viewport/preference change would
 * unmount the WebGL canvas mid-session, racing react-three-fiber's own DOM
 * writes against React's reconciler (the same "removeChild/insertBefore:
 * not a child of this node" crash confirmed elsewhere in this codebase via
 * gstack:browse, e.g. FloatingGalleryHero). Nothing here needs to
 * live-swap mid-session, so this only ever resolves once.
 */
export function CaseStudyHero({ caseStudy }: { caseStudy: CaseStudy }) {
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

  return (
    <header className="relative min-h-[85vh] overflow-hidden bg-paper pb-16 pt-[calc(var(--header-h)+3rem)]">
      {useWebGL ? (
        <>
          <div aria-hidden className="absolute inset-0">
            <CaseStudyHero3D images={caseStudy.heroImages} aspect={caseStudy.heroAspect ?? 4 / 3} />
          </div>
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/50 to-transparent" />
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/55 to-transparent" />
          {/* Parko-only motif: a hand-authored radar-pulse Lottie loop, echoing the
              product's own "locate a space" moment. Gated by slug so Thornton's
              already-reviewed hero renders through the exact same, untouched path. */}
          {caseStudy.slug === "parko" ? (
            <LottiePulse className="absolute right-8 top-24 hidden sm:block md:right-16" size={80} />
          ) : null}
        </>
      ) : null}
      {/* pointer-events-none: this text/metadata column has no interactive
          children (no links/buttons), and its block-level box otherwise
          spans the full hero width/height in normal flow — sitting on top
          of the absolutely-positioned canvas and intercepting hover across
          ~75% of the hero (verified via elementFromPoint), which kept the
          "tilt toward pointer" effect dead everywhere except a thin sliver
          top/bottom. Matches the same pattern FloatingGalleryHero.tsx uses
          for its own non-interactive overlay chrome. */}
      <div className="container-editorial relative pointer-events-none">
        <Kicker accent>{caseStudy.eyebrow}</Kicker>
        <SplitReveal
          as="h1"
          type="lines"
          immediate
          className="mt-6 max-w-[16ch] font-display text-display-lg text-balance text-ink [text-shadow:0_2px_24px_rgb(0_0_0_/_0.45)]"
        >
          {caseStudy.title}
        </SplitReveal>
        <MReveal
          as="p"
          variant="up"
          delay={0.15}
          className="mt-4 max-w-md font-display text-2xl italic text-ink-soft [text-shadow:0_2px_20px_rgb(0_0_0_/_0.4)]"
        >
          {caseStudy.tagline}
        </MReveal>
        <div className="mt-14 max-w-2xl [text-shadow:0_1px_16px_rgb(0_0_0_/_0.5)]">
          <MetaList items={caseStudy.projectDetails.map((d) => ({ label: d.label, value: d.value }))} columns={2} />
        </div>
        {!useWebGL ? (
          <MReveal variant="scale" delay={0.2} className="mt-12 w-full overflow-hidden bg-paper-deep">
            {/* MReveal doesn't forward `style` (see ColorPaletteBoard's note) — the
                dynamic aspect ratio goes on this plain inner div instead. */}
            <div className="relative w-full" style={{ aspectRatio: caseStudy.heroAspect ?? 4 / 3 }}>
              <Image src={caseStudy.heroImages[0]} alt={caseStudy.title} fill sizes="100vw" className="object-cover" priority />
            </div>
          </MReveal>
        ) : null}
      </div>
    </header>
  );
}
