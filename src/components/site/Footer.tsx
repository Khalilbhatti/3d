import Link from "next/link";
import { brand, primaryNav, socialLinks } from "@/config/theme";
import { collections } from "@/content/collections";
import { BackToTop } from "./BackToTop";
import { MReveal } from "@/components/motion/reveal";
import { SectionDivider } from "@/components/typography/primitives";

/** Editorial footer: colophon, wayfinding, credits. Server-rendered. */
export function Footer() {
  const year = brand.founded;
  return (
    <footer className="relative border-t border-line/12 bg-paper-deep/40">
      <div className="container-editorial py-16 md:py-24">
        <MReveal as="div" variant="up" className="grid gap-12 lg:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <p className="font-display text-4xl leading-none tracking-tight text-ink md:text-5xl">
              {brand.name}
              <span className="text-accent">.</span>
            </p>
            <p className="mt-6 max-w-sm text-pretty text-sm leading-relaxed text-muted">{brand.description}</p>
            <p className="label mt-8">{brand.location} · {brand.hours}</p>
          </div>

          <nav aria-label="Footer — explore">
            <span className="label">Explore</span>
            <ul className="mt-4 space-y-2.5">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-underline text-ink-soft hover:text-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer — services">
            <span className="label">Services</span>
            <ul className="mt-4 space-y-2.5">
              {collections.map((c) => (
                <li key={c.id}>
                  <Link href={`/services/${c.slug}`} className="link-underline text-ink-soft hover:text-ink">
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="label transition-colors hover:text-ink">
                  {s.label}
                </a>
              ))}
            </div>
          </nav>
        </MReveal>

        <SectionDivider className="mt-16" />

        <div className="mt-6 flex flex-col items-start justify-between gap-4 text-xs text-muted md:flex-row md:items-center">
          <p className="label">© {year} {brand.full}. All rights reserved.</p>
          <BackToTop className="label transition-colors hover:text-ink" />
        </div>
      </div>
    </footer>
  );
}
