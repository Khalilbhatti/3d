import Link from "next/link";
import { type ArtPalette } from "@/content/types";
import { gradientFrom } from "@/lib/utils";
import { Kicker } from "@/components/typography/primitives";

/**
 * Large "what's next" navigation block used at the foot of detail pages
 * (next collection / next artwork). A full-bleed field derived from the target
 * palette with an oversized title that slides on hover.
 */
export function NextLink({
  eyebrow,
  title,
  href,
  palette,
  meta,
}: {
  eyebrow: string;
  title: string;
  href: string;
  palette: ArtPalette;
  meta?: string;
}) {
  return (
    <Link
      href={href}
      className="group relative block overflow-hidden text-paper"
      style={{ backgroundColor: palette.to }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-90 transition-transform duration-[1200ms] ease-editorial group-hover:scale-105"
        style={{ backgroundImage: gradientFrom(palette, 155) }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_120%,transparent_40%,rgba(0,0,0,0.6)_100%)]"
      />
      <div className="container-editorial relative flex flex-col gap-6 py-20 md:flex-row md:items-end md:justify-between md:py-32">
        <div>
          <Kicker className="text-paper/70">{eyebrow}</Kicker>
          <h2 className="mt-5 max-w-[14ch] font-display text-display-md leading-[0.98] text-paper">{title}</h2>
          {meta ? <p className="label mt-5 text-paper/70">{meta}</p> : null}
        </div>
        <span
          aria-hidden
          className="font-display text-5xl leading-none text-paper transition-transform duration-500 ease-editorial group-hover:translate-x-3 md:text-7xl"
        >
          &rarr;
        </span>
      </div>
    </Link>
  );
}
