import Link from "next/link";
import { collections } from "@/content/collections";
import { getArtworks } from "@/content/index";
import { SplitReveal } from "@/components/typography/SplitReveal";
import { Reveal } from "@/components/typography/Reveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Kicker } from "@/components/typography/primitives";

/**
 * Closing chapter of the home story: a dark call-to-action inviting the reader
 * out of the narrative and into the collections and the searchable archive.
 */
export function ExploreCollection() {
  const total = getArtworks().length;
  return (
    <section
      id="contact"
      data-chapter={collections.length + 6}
      className="relative scroll-mt-[var(--header-h)] overflow-hidden bg-paper py-28 text-ink md:py-40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <div className="container-editorial relative">
        <Kicker className="text-ink/60">Let us start the conversation</Kicker>
        <SplitReveal
          as="h2"
          type="lines"
          className="mt-6 max-w-[14ch] font-display text-display-lg text-ink"
        >
          Ready to take your business to the next level?
        </SplitReveal>

        <div className="mt-16 grid gap-x-12 gap-y-2 border-t border-ink/15 md:grid-cols-2">
          {collections.map((c, i) => (
            <Reveal key={c.id} delay={(i % 2) * 90} className="border-b border-ink/12">
              <Link
                href={`/services/${c.slug}`}
                className="group flex items-baseline justify-between gap-6 py-6"
              >
                <span className="flex items-baseline gap-4">
                  <span className="font-mono text-xs text-ink/40">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display text-2xl leading-tight text-ink transition-colors group-hover:text-accent md:text-3xl">
                    {c.title}
                  </span>
                </span>
                <span className="label hidden shrink-0 text-ink/40 sm:block">{c.period}</span>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4">
          <MagneticButton>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 border border-ink/30 px-7 py-4 font-mono text-xs uppercase tracking-label text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
            >
              Get a quote
              <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </Link>
          </MagneticButton>
          <Link href="/services" className="link-underline text-ink/80 hover:text-ink">
            Browse all services
          </Link>
          <span className="label ml-auto text-ink/40">{total} projects delivered</span>
        </div>
      </div>
    </section>
  );
}
