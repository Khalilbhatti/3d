import Link from "next/link";
import type { Metadata } from "next";
import { primaryNav } from "@/config/theme";
import { getFeaturedArtworks } from "@/content/index";
import { ArtworkCard } from "@/components/gallery/ArtworkCard";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Kicker } from "@/components/typography/primitives";

export const metadata: Metadata = {
  title: "Not found",
  robots: { index: false, follow: false },
};

/** Custom 404 — kept editorial and useful, offering a way back into the site. */
export default function NotFound() {
  const suggestions = getFeaturedArtworks().slice(0, 4);
  return (
    <div className="container-editorial pb-24 pt-[calc(var(--header-h)+5rem)]">
      <div className="grid items-end gap-8 border-b border-line/15 pb-14 md:grid-cols-12">
        <div className="md:col-span-7">
          <Kicker accent>Error 404 · Page not found</Kicker>
          <h1 className="mt-6 font-display text-display-lg leading-[0.95] text-ink">
            This page didn&rsquo;t ship.
          </h1>
          <p className="mt-6 max-w-md text-pretty text-lg text-ink-soft">
            The page you were looking for isn’t on this site — it may have been
            moved, or the link may be mistaken. Let’s find your way back.
          </p>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            <MagneticButton>
              <Link
                href="/"
                className="inline-flex items-center gap-3 bg-ink px-7 py-4 font-mono text-xs uppercase tracking-label text-paper transition-colors hover:bg-accent"
              >
                Return home →
              </Link>
            </MagneticButton>
            <Link href="/portfolio" className="link-underline self-center text-ink">
              Browse our portfolio
            </Link>
          </div>
        </div>
        <nav aria-label="Site sections" className="md:col-span-4 md:col-start-9">
          <span className="label">Or continue to</span>
          <ul className="mt-4 space-y-2">
            {primaryNav.slice(1).map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-underline text-ink-soft hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mt-14">
        <span className="label">From our portfolio</span>
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {suggestions.map((a, i) => (
            <ArtworkCard key={a.id} artwork={a} index={i} sizes="(max-width: 768px) 45vw, 22vw" />
          ))}
        </div>
      </div>
    </div>
  );
}
