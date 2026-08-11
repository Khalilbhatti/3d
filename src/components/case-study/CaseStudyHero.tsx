"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { MReveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/typography/SplitReveal";
import { Kicker } from "@/components/typography/primitives";
import { MetaList } from "@/components/ui/MetaList";
import { type CaseStudy } from "@/content/types";

const CaseStudyHero3D = dynamic(
  () => import("./CaseStudyHero3D").then((m) => m.CaseStudyHero3D),
  { ssr: false }
);

/**
 * Cover section: eyebrow, title, tagline, project-details metadata, and a
 * WebGL hero on capable desktops (a flat animated image everywhere else —
 * mobile, reduced-motion, no-WebGL). Reads matchMedia/WebGL support directly
 * inside the effect on every invocation — see Global Constraints in the plan
 * for why a "resolved once" gated flag is not safe here.
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
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <CaseStudyHero3D images={caseStudy.heroImages} />
        </div>
      ) : null}
      <div className="container-editorial relative">
        <Kicker accent>{caseStudy.eyebrow}</Kicker>
        <SplitReveal as="h1" type="lines" immediate className="mt-6 max-w-[16ch] font-display text-display-lg text-balance text-ink">
          {caseStudy.title}
        </SplitReveal>
        <MReveal as="p" variant="up" delay={0.15} className="mt-4 max-w-md font-display text-2xl italic text-ink-soft">
          {caseStudy.tagline}
        </MReveal>
        <div className="mt-14 max-w-2xl">
          <MetaList items={caseStudy.projectDetails.map((d) => ({ label: d.label, value: d.value }))} columns={2} />
        </div>
        {!useWebGL ? (
          <MReveal
            variant="scale"
            delay={0.2}
            className="relative mt-12 aspect-[16/9] w-full overflow-hidden bg-paper-deep"
          >
            <Image src={caseStudy.heroImages[0]} alt={caseStudy.title} fill sizes="100vw" className="object-cover" priority />
          </MReveal>
        ) : null}
      </div>
    </header>
  );
}
