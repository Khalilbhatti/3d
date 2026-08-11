import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getCaseStudies, getArtworkById } from "@/content/index";
import { PageHeader } from "@/components/ui/PageHeader";
import { MReveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Full case studies behind our work — the strategy, design system, and decisions, not just the finished screens.",
};

export default function CaseStudiesPage() {
  const caseStudies = getCaseStudies();

  return (
    <>
      <PageHeader
        kicker="Our work · Case Studies"
        title="How we actually build it."
        deck="Full walkthroughs of the strategy, design system, and decisions behind our work — not just the finished screens."
      />
      <div className="container-editorial pb-24">
        <div className="grid gap-10 border-t border-line/15 pt-10">
          {caseStudies.map((cs) => {
            const artwork = getArtworkById(cs.artworkId);
            const tags = artwork ? artwork.medium.split(",").map((t) => t.trim()) : [];
            return (
              <MReveal as="article" variant="up" key={cs.id}>
                <div className="grid gap-8 md:grid-cols-2 md:items-center">
                  <div className="relative aspect-[4/3] overflow-hidden bg-paper-deep">
                    <Image
                      src={cs.heroImages[0]}
                      alt={cs.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="label text-accent">{tags[0] ?? "UI/UX Design"}</p>
                    <h2 className="mt-3 font-display text-3xl text-ink md:text-4xl">{cs.title}</h2>
                    <p className="mt-4 max-w-lg text-pretty text-lg leading-relaxed text-ink-soft">
                      {cs.overview.body[0]}
                    </p>
                    {tags.length ? (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <span key={tag} className="chip">
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}
                    <Link
                      href={`/case-studies/${cs.slug}`}
                      className="group mt-8 inline-flex items-center gap-3 border border-line/25 px-5 py-3.5 font-mono text-xs uppercase tracking-label text-ink transition-colors hover:border-accent hover:text-accent"
                    >
                      Case Study
                      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </MReveal>
            );
          })}
        </div>
      </div>
    </>
  );
}
