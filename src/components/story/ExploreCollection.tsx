import Link from "next/link";
import { collections } from "@/content/collections";
import { SplitReveal } from "@/components/typography/SplitReveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Kicker } from "@/components/typography/primitives";
import { ServiceOrbit } from "./ServiceOrbit";

/**
 * The home story's "Our Services" chapter: a WebGL orbit of every service
 * revolving around a glowing hub, plus a call-to-action into the collections
 * and the searchable archive.
 */
export function ExploreCollection() {
  return (
    <section
      id="our-services"
      data-chapter={collections.length + 6}
      className="relative scroll-mt-[var(--header-h)] overflow-hidden bg-paper/80 py-28 text-ink md:py-40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(65% 60% at 12% 0%, rgb(var(--accent) / 0.22), transparent 60%), radial-gradient(55% 55% at 92% 100%, rgb(var(--accent) / 0.14), transparent 62%)",
        }}
      />
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

        <ServiceOrbit collections={collections} />

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
          <span className="label ml-auto text-ink/40">100+ projects delivered</span>
        </div>
      </div>
    </section>
  );
}
