import type { Metadata } from "next";
import Link from "next/link";
import { brand, socialLinks } from "@/config/theme";
import { getTimeline, getArtists, getArtworks, getCollections } from "@/content/index";
import { PageHeader } from "@/components/ui/PageHeader";
import { Timeline } from "@/components/ui/Timeline";
import { ScrollParagraph } from "@/components/typography/ScrollParagraph";
import { Reveal } from "@/components/typography/Reveal";
import { Counter } from "@/components/motion/Counter";
import { Marquee } from "@/components/motion/Marquee";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { AnimatedQuote, Kicker, SectionDivider } from "@/components/typography/primitives";

export const metadata: Metadata = {
  title: "About",
  description: brand.description,
};

export default function AboutPage() {
  const timeline = getTimeline();
  const stats = [
    { value: String(getCollections().length), label: "Collections" },
    { value: String(getArtworks().length), label: "Works catalogued" },
    { value: String(getArtists().length), label: "Contributors" },
    { value: "1719", label: "Earliest work" },
  ];

  return (
    <>
      <PageHeader kicker="About the archive" title="A study of light, kept in one place." deck={brand.tagline} />

      <section className="container-editorial py-12 md:py-20">
        <div className="mx-auto max-w-4xl">
          <ScrollParagraph text="The Auren Archive gathers, conserves and studies the invented painting traditions of a coast that never was — so that the way its makers looked at light might be looked at again." />
        </div>
      </section>

      <section aria-hidden className="relative overflow-hidden border-y border-line/12 py-6 md:py-8">
        <Marquee durationSec={40}>
          {getCollections().map((c) => (
            <span
              key={c.id}
              className="flex items-center gap-8 whitespace-nowrap pr-8 font-display text-2xl italic text-ink-soft/70 md:text-3xl"
            >
              {c.title}
              <span className="not-italic text-accent">✦</span>
            </span>
          ))}
        </Marquee>
      </section>

      <section className="container-editorial pb-20">
        <div className="grid grid-cols-2 gap-px border border-line/15 bg-line/15 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-paper p-8 text-center">
              <div className="font-display text-4xl text-accent md:text-5xl">
                <Counter value={s.value} />
              </div>
              <div className="label mt-3">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-editorial py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-3">
            <Kicker>The method</Kicker>
          </div>
          <div className="md:col-span-8 md:col-start-4">
            <Reveal as="p" className="max-w-2xl font-display text-2xl leading-snug text-ink md:text-3xl">
              This site is a fully working demonstration. Every artwork, artist, date and essay is professional placeholder content — invented to show how a real archive would read.
            </Reveal>
            <Reveal as="p" delay={80} className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink-soft">
              The design system, scroll storytelling, galleries, filtering and fullscreen viewer are all production-ready. To make it yours, swap the imagery and text in a single content folder and re-key the palette from one config file — the layouts adapt automatically.
            </Reveal>
            <Reveal delay={140} className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              <Link href="/collections" className="link-underline text-ink">Browse the collections →</Link>
              <Link href="/archive" className="link-underline text-ink">Search the archive →</Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="container-editorial py-16 md:py-24">
        <AnimatedQuote cite="Livia Okonkwo, custodian">
          Conservation is just the slowest possible way of paying attention.
        </AnimatedQuote>
      </section>

      <section className="container-editorial pb-24 md:pb-32">
        <SectionDivider label="A chronology of the school" className="mb-10" />
        <Timeline entries={timeline} />
      </section>

      <section className="container-editorial pb-28">
        <SectionDivider label="Colophon" className="mb-10" />
        <div className="grid gap-8 md:grid-cols-2">
          <StaggerGroup as="div">
          <dl className="space-y-0">
            {[
              { label: "Institution", value: brand.full },
              { label: "Founded", value: brand.founded },
              { label: "Location", value: brand.location },
              { label: "Enquiries", value: brand.email },
            ].map((row) => (
              <StaggerItem as="div" key={row.label} className="flex items-baseline justify-between gap-6 border-t border-line/15 py-4">
                <dt className="label">{row.label}</dt>
                <dd className="text-right text-ink">{row.value}</dd>
              </StaggerItem>
            ))}
          </dl>
          </StaggerGroup>
          <div>
            <p className="max-w-md text-pretty leading-relaxed text-ink-soft">
              Built with Next.js, GSAP, Lenis and React Three Fiber. Warm-neutral editorial system, configurable accent, museum-inspired typography.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="label transition-colors hover:text-ink">
                  {s.label}
                </a>
              ))}
              <Link href="/contact" className="label transition-colors hover:text-ink">Contact →</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
