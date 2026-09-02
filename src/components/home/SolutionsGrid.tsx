import Link from "next/link";
import Image from "next/image";
import { getCollections } from "@/content/index";
import { Kicker } from "@/components/typography/primitives";
import { SplitReveal } from "@/components/typography/SplitReveal";
import { Reveal } from "@/components/typography/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";

/** No dedicated "AI Automation" service slug exists — every AI-automation
 *  project (RAG, WhatsApp agents, voice receptionists, lead-gen engines) is
 *  already filed under svc-web's artworkIds. This card points there, plus a
 *  secondary link to the 10-post AI automation blog series. */
const AI_CARD = {
  title: "AI Automation",
  summary:
    "Custom AI agents, RAG knowledge bases, and WhatsApp or voice automation — wired into the tools you already run.",
  href: "/services/web-app-development",
  secondaryHref: "/blog",
  secondaryLabel: "Read AI automation field notes →",
};

/** Outcome-first framing shown as a small label above each service's real,
 *  SEO'd title — reframes the grid as business solutions without touching
 *  the underlying collection titles/slugs (those stay untouched everywhere
 *  else: /services pages, meta titles, footer). */
const CATEGORY_LABELS: Record<string, string> = {
  "svc-web": "Custom Software Development",
  "svc-wordpress": "Custom Software Development",
  "svc-ghl": "CRM & Business Automation",
  "svc-graphic": "Brand & Design",
  "svc-uiux": "UI/UX Design",
  "svc-marketing": "Digital Growth",
};

/** Real services, reused verbatim from src/content/collections.ts, plus one
 *  hardcoded AI Automation card (see AI_CARD above). */
export function SolutionsGrid() {
  const collections = getCollections();
  return (
    <section id="solutions" className="scroll-mt-[var(--header-h)] container-editorial py-20 md:py-28">
      <Kicker accent>Technology built around your business</Kicker>
      <SplitReveal as="h2" type="lines" className="mt-6 max-w-[20ch] font-display text-display-md text-balance text-ink">
        Solutions, not just services.
      </SplitReveal>

      <div className="mt-14 grid gap-8 md:grid-cols-3">
        {collections.map((c, i) => (
          <Reveal key={c.id} variant="up" delay={(i % 3) * 90}>
            <Link href={`/services/${c.slug}`} className="group block">
              <TiltCard className="relative overflow-hidden" style={{ aspectRatio: "4 / 3" }}>
                {c.image ? (
                  <Image
                    src={c.image}
                    alt={`${c.title} — GitzTech ${c.title.toLowerCase()} service`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    quality={90}
                    className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-105"
                  />
                ) : null}
              </TiltCard>
              {CATEGORY_LABELS[c.id] ? (
                <span className="label mt-4 block text-accent">{CATEGORY_LABELS[c.id]}</span>
              ) : null}
              <h3 className="mt-2 font-display text-xl leading-tight text-ink">
                <span className="link-underline">{c.title}</span>
              </h3>
              <p className="mt-2 max-w-sm text-pretty text-sm leading-relaxed text-ink-soft">{c.summary}</p>
              <span className="label mt-3 inline-block text-accent">Explore →</span>
            </Link>
          </Reveal>
        ))}

        <Reveal variant="up" delay={collections.length * 30}>
          <div className="group relative h-full border border-accent/30 bg-accent/5 p-6 transition-colors hover:border-accent">
            <Link href={AI_CARD.href} className="absolute inset-0" aria-label={AI_CARD.title} />
            <span className="label text-accent">Field-tested, not theoretical</span>
            <h3 className="mt-3 font-display text-xl leading-tight text-ink">
              <span className="link-underline">{AI_CARD.title}</span>
            </h3>
            <p className="mt-2 max-w-sm text-pretty text-sm leading-relaxed text-ink-soft">{AI_CARD.summary}</p>
            <span className="label mt-3 inline-block text-accent">Explore →</span>
            <Link
              href={AI_CARD.secondaryHref}
              className="link-underline relative z-[1] mt-4 block text-sm text-ink-soft hover:text-ink"
            >
              {AI_CARD.secondaryLabel}
            </Link>
          </div>
        </Reveal>
      </div>

      <Link href="/services" className="link-underline mt-14 inline-block text-ink">
        View all services →
      </Link>
    </section>
  );
}
