import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { brand, socialLinks } from "@/config/theme";
import { getTimeline, getCollections } from "@/content/index";
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
  alternates: { canonical: "/about" },
  openGraph: { title: "About", description: brand.description },
  twitter: { title: "About", description: brand.description },
};

const values = [
  {
    title: "Excellence in Every Byte",
    body: "We sweat the smallest details, holding every line of code, pixel, and campaign to a standard we'd proudly put our own name on.",
  },
  {
    title: "Client Partnership",
    body: "Your goals become our goals, and we work as a transparent extension of your team from kickoff to long after launch.",
  },
  {
    title: "Innovation First",
    body: "We embrace cutting-edge tools and proven strategies to solve real business challenges, not just to chase trends.",
  },
  {
    title: "Reliable Delivery",
    body: "Clear timelines, honest communication, and consistent results, so you always know exactly where your project stands.",
  },
];

export default function AboutPage() {
  const timeline = getTimeline();
  const stats = [
    { value: "4 Years", label: "Years Experience" },
    { value: "2k+", label: "Happy Customers" },
    { value: "200+", label: "Completed Projects" },
    { value: "5+", label: "Awards Won" },
  ];

  return (
    <>
      <PageHeader
        kicker="Who we are"
        title="One team, one mindset."
        deck={brand.tagline}
      />

      <section className="container-editorial py-12 md:py-20">
        <div className="mx-auto max-w-4xl">
          <ScrollParagraph text="GitzTech is a Lahore-based digital agency built on a simple promise: every byte in excellence. We don't just complete projects — we partner with businesses to streamline operations, elevate brands, and fuel sustainable growth." />
        </div>
      </section>

      <section aria-hidden className="relative overflow-hidden border-y border-line/12 py-8 md:py-10">
        <Marquee durationSec={44}>
          {getCollections().map((c) => (
            <span key={c.id} className="flex items-center gap-5 whitespace-nowrap pr-12">
              {c.image ? (
                <span className="relative block h-14 w-20 shrink-0 overflow-hidden rounded-sm md:h-16 md:w-24">
                  <Image
                    src={c.image}
                    alt=""
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </span>
              ) : null}
              <span className="font-display text-2xl italic text-ink-soft/70 md:text-3xl">{c.title}</span>
              <span className="text-accent">✦</span>
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
            <Kicker>Who we are</Kicker>
          </div>
          <div className="md:col-span-8 md:col-start-4">
            <Reveal as="p" className="max-w-2xl font-display text-2xl leading-snug text-ink md:text-3xl">
              Over four years, our team has delivered 200+ projects and earned the trust of 2,000+ happy customers across the globe.
            </Reveal>
            <Reveal as="p" delay={80} className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink-soft">
              We bring together developers, designers, marketers, and CRM specialists who share one mindset — turning ambitious ideas into reliable, results-driven digital products. From web and app development to GoHighLevel automation, we work as one connected unit, owning every detail from first concept to final launch.
            </Reveal>
            <Reveal delay={140} className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              <Link href="/services" className="link-underline text-ink">Explore our services →</Link>
              <Link href="/portfolio" className="link-underline text-ink">See our portfolio →</Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="container-editorial pb-8 md:pb-12">
        <SectionDivider label="What we stand for" className="mb-10" />
        <StaggerGroup as="div" className="grid gap-x-12 gap-y-2 md:grid-cols-2">
          {values.map((v) => (
            <StaggerItem as="div" key={v.title} className="border-t border-line/15 py-6">
              <h3 className="font-display text-2xl leading-tight text-ink">{v.title}</h3>
              <p className="mt-3 max-w-md text-pretty leading-relaxed text-ink-soft">{v.body}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <section className="container-editorial py-16 md:py-24">
        <AnimatedQuote cite="Our promise">
          Every byte in excellence.
        </AnimatedQuote>
      </section>

      <section className="container-editorial pb-24 md:pb-32">
        <SectionDivider label="Our development process" className="mb-10" />
        <Timeline entries={timeline} />
      </section>

      <section className="container-editorial pb-28">
        <SectionDivider label="Company details" className="mb-10" />
        <div className="grid gap-8 md:grid-cols-2">
          <StaggerGroup as="div">
          <dl className="space-y-0">
            {[
              { label: "Company", value: brand.full },
              { label: "Location", value: brand.location },
              { label: "Phone", value: brand.phone },
              { label: "Email", value: brand.email },
              { label: "Hours", value: brand.hours },
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
              We provide custom software solutions for any industry — creating high-value software and technology that drives real business results. Ready to take your business to the next level?
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="label transition-colors hover:text-ink">
                  {s.label}
                </a>
              ))}
              <Link href="/contact" className="label transition-colors hover:text-ink">Get a quote →</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
