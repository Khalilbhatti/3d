import Link from "next/link";
import Image from "next/image";
import { brand, socialLinks } from "@/config/theme";
import { collections } from "@/content/collections";
import { industries } from "@/content/industries";
import { BackToTop } from "./BackToTop";
import { MReveal } from "@/components/motion/reveal";
import { SectionDivider } from "@/components/typography/primitives";

const COMPANY_LINKS = [
  { label: "About", href: "/about" },
  { label: "Our Team", href: "/team" },
  { label: "Portfolio", href: "/portfolio" },
];

const RESOURCE_LINKS = [
  { label: "Blog", href: "/blog" },
  { label: "Case Studies", href: "/case-studies" },
];

/** Editorial footer: colophon, wayfinding, credits. Server-rendered. */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-line/12 bg-paper-deep/40">
      <div className="container-editorial py-16 md:py-24">
        <MReveal as="div" variant="up" className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_repeat(5,1fr)]">
          <div className="sm:col-span-2 lg:col-span-1">
            <Image
              src="/logo.png"
              alt={brand.full}
              width={1536}
              height={1024}
              quality={90}
              sizes="180px"
              className="h-20 w-auto md:h-24"
            />
            <p className="mt-6 max-w-sm text-pretty text-sm leading-relaxed text-muted">{brand.description}</p>
            <p className="label mt-8">{brand.location} · {brand.hours}</p>
          </div>

          <nav aria-label="Footer — company">
            <span className="label">Company</span>
            <ul className="mt-4 space-y-2.5">
              {COMPANY_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-underline text-ink-soft hover:text-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer — solutions">
            <span className="label">Solutions</span>
            <ul className="mt-4 space-y-2.5">
              {collections.map((c) => (
                <li key={c.id}>
                  <Link href={`/services/${c.slug}`} className="link-underline text-ink-soft hover:text-ink">
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer — industries">
            <span className="label">Industries</span>
            <ul className="mt-4 space-y-2.5">
              {industries.map((ind) => (
                <li key={ind.id}>
                  <Link href={`/industries#${ind.id}`} className="link-underline text-ink-soft hover:text-ink">
                    {ind.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer — resources">
            <span className="label">Resources</span>
            <ul className="mt-4 space-y-2.5">
              {RESOURCE_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-underline text-ink-soft hover:text-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer — contact">
            <span className="label">Contact</span>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a href={`tel:${brand.phone.replace(/[^\d+]/g, "")}`} className="link-underline text-ink-soft hover:text-ink">
                  {brand.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${brand.email}`} className="link-underline text-ink-soft hover:text-ink">
                  {brand.email}
                </a>
              </li>
              <li>
                <Link href="/contact" className="link-underline text-ink-soft hover:text-ink">
                  Book a Free Strategy Call
                </Link>
              </li>
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
