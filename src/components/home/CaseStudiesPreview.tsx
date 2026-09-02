import Link from "next/link";
import Image from "next/image";
import { getCaseStudies } from "@/content/index";
import { type CaseStudy } from "@/content/types";
import { Kicker } from "@/components/typography/primitives";
import { SplitReveal } from "@/components/typography/SplitReveal";
import { Reveal } from "@/components/typography/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";

/** Every case study's projectDetails already carries an "Industry" (or,
 *  for Parko, "Category") entry — surfaced here rather than adding a new
 *  data field. */
function industryOf(cs: CaseStudy): string | undefined {
  return cs.projectDetails.find((d) => d.label === "Industry" || d.label === "Category")?.value;
}

/** Challenge/Solution/Outcome preview built entirely from real fields already
 *  on each CaseStudy record — Challenge = problem.coreQuestion, Solution =
 *  the first painPoints entries (already {problem,solution} pairs), Outcome
 *  = the first outcome[] items. Nothing here is invented or cherry-picked
 *  beyond taking the first few real entries of each array. */
export function CaseStudiesPreview() {
  const caseStudies = getCaseStudies();
  return (
    <section id="case-studies" className="scroll-mt-[var(--header-h)] container-editorial py-20 md:py-28">
      <Kicker accent>Real problems. Real products. Real outcomes.</Kicker>
      <SplitReveal as="h2" type="lines" className="mt-6 max-w-[20ch] font-display text-display-md text-balance text-ink">
        Case studies, not just a portfolio.
      </SplitReveal>

      <div className="mt-14 grid gap-10 md:grid-cols-2">
        {caseStudies.map((cs, i) => (
          <Reveal key={cs.id} variant="up" delay={i * 90}>
            <Link href={`/case-studies/${cs.slug}`} className="group block">
              <TiltCard className="relative overflow-hidden" style={{ aspectRatio: "16 / 10" }}>
                <Image
                  src={cs.heroImages[0]}
                  alt={cs.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={90}
                  className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-105"
                />
              </TiltCard>
              <span className="label mt-4 block text-accent">
                {cs.eyebrow}
                {industryOf(cs) ? ` · ${industryOf(cs)}` : ""}
              </span>
              <h3 className="mt-2 font-display text-2xl leading-tight text-ink">
                <span className="link-underline">{cs.title}</span>
              </h3>
              <p className="mt-1 font-display text-lg italic text-ink-soft">{cs.tagline}</p>
            </Link>

            <div className="mt-6 space-y-4 border-t border-line/15 pt-6">
              <div>
                <span className="label">Challenge</span>
                <p className="mt-1 text-pretty text-sm leading-relaxed text-ink-soft">{cs.problem.coreQuestion}</p>
              </div>
              <div>
                <span className="label">Solution</span>
                <ul className="mt-1 space-y-1">
                  {cs.painPoints.slice(0, 2).map((p) => (
                    <li key={p.problem} className="text-pretty text-sm leading-relaxed text-ink-soft">
                      {p.solution}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="label">Outcome</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {cs.outcome.slice(0, 4).map((o) => (
                    <span key={o} className="border border-line/20 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-label text-ink-soft">
                      {o}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <Link href={`/case-studies/${cs.slug}`} className="link-underline mt-6 inline-block text-ink">
              View case study →
            </Link>
          </Reveal>
        ))}
      </div>

      <Link href="/case-studies" className="link-underline mt-14 inline-block text-ink">
        View all case studies →
      </Link>
    </section>
  );
}
