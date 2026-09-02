import Link from "next/link";
import Image from "next/image";
import { getArtworkById } from "@/content/index";
import { Kicker } from "@/components/typography/primitives";
import { SplitReveal } from "@/components/typography/SplitReveal";
import { Reveal } from "@/components/typography/Reveal";

/** Each bucket maps to real, shipped portfolio work — no generic "we serve
 *  every industry" claim. "Startups" is the weakest-evidenced bucket (the
 *  only real proxy is a SaaS funnel build), so it's labeled "Startups & SaaS"
 *  rather than a bare, harder-to-back "Startups" claim. */
const INDUSTRIES = [
  { name: "Healthcare", artworkId: "prj-medical-funnel" },
  { name: "Real Estate", artworkId: "prj-realestate-funnel" },
  { name: "E-commerce", artworkId: "prj-food" },
  { name: "Professional Services", artworkId: "prj-financial-advisor-funnel" },
  { name: "B2B", artworkId: "prj-wholesale" },
  { name: "Startups & SaaS", artworkId: "prj-saas-funnel" },
];

export function IndustriesGrid() {
  return (
    <section id="industries" className="scroll-mt-[var(--header-h)] container-editorial py-20 md:py-28">
      <Kicker accent>Who we build for</Kicker>
      <SplitReveal as="h2" type="lines" className="mt-6 max-w-[20ch] font-display text-display-md text-balance text-ink">
        Solutions for different business operations.
      </SplitReveal>
      <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3">
        {INDUSTRIES.map((ind, i) => {
          const artwork = getArtworkById(ind.artworkId);
          if (!artwork) return null;
          return (
            <Reveal key={ind.name} variant="up" delay={(i % 3) * 90}>
              <Link href={`/portfolio/${artwork.slug}`} className="group relative block overflow-hidden" style={{ aspectRatio: "4 / 3" }}>
                {artwork.image ? (
                  <Image
                    src={artwork.image}
                    alt={`${ind.name} — ${artwork.title}`}
                    fill
                    sizes="(max-width: 768px) 45vw, 30vw"
                    quality={90}
                    className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-105"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-paper/90 via-paper/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <span className="font-display text-lg text-ink">{ind.name}</span>
                  <p className="mt-1 line-clamp-1 text-xs text-ink-soft">{artwork.title}</p>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
      <Link href="/industries" className="link-underline mt-14 inline-block text-ink">
        Explore by industry →
      </Link>
    </section>
  );
}
