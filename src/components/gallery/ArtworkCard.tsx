import Link from "next/link";
import { type Artwork } from "@/content/types";
import { ArtworkImage } from "@/components/media/ArtworkImage";
import { ArtworkCaption } from "./ArtworkCaption";
import { Reveal } from "@/components/typography/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { cn } from "@/lib/utils";

/**
 * Linked artwork tile used in grids and related-work rails. The image sits in a
 * clipped frame that eases up on hover (frame-expansion feel), the whole card
 * reveals with a mask as it enters view, and a scrim with two quick actions
 * (view the project, get a quote) fades in over the image on hover.
 */
export function ArtworkCard({
  artwork,
  className,
  sizes,
  index = 0,
  motif = "field",
}: {
  artwork: Artwork;
  className?: string;
  sizes?: string;
  index?: number;
  motif?: "field" | "portrait" | "manuscript";
}) {
  return (
    <Reveal variant="up" delay={(index % 3) * 90} className={cn("group", className)}>
      <div className="relative">
        <TiltCard className="relative overflow-hidden">
          <Link
            href={`/portfolio/${artwork.slug}`}
            className="absolute inset-0 z-[1] focus-visible:outline-none"
            aria-label={`${artwork.title} — view detail`}
          />
          <div className="transition-transform duration-[900ms] ease-editorial group-hover:scale-[1.03]">
            <ArtworkImage artwork={artwork} sizes={sizes} motif={motif} />
          </div>

          {/* Hover quick actions — sit above the invisible card-link via z-index,
              so clicking a specific action navigates there instead of the card's
              own detail page. Scrim stays light enough that darker project
              screenshots don't just vanish. */}
          <div className="pointer-events-none absolute inset-0 z-[3] flex flex-col justify-end bg-gradient-to-t from-paper/80 via-paper/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <div className="flex flex-wrap gap-2 p-3.5">
              <Link
                href={`/portfolio/${artwork.slug}`}
                className="pointer-events-auto relative z-[4] inline-flex items-center gap-1.5 bg-ink px-3 py-2 font-mono text-[0.62rem] uppercase tracking-label text-paper transition-colors hover:bg-accent"
              >
                View project
              </Link>
              <Link
                href="/contact"
                className="pointer-events-auto relative z-[4] inline-flex items-center gap-1.5 border border-paper/50 px-3 py-2 font-mono text-[0.62rem] uppercase tracking-label text-paper transition-colors hover:border-accent hover:text-accent"
              >
                Get a quote
              </Link>
            </div>
          </div>
        </TiltCard>
        <Link href={`/portfolio/${artwork.slug}`} className="mt-4 block focus-visible:outline-none">
          <ArtworkCaption artwork={artwork} size="sm" />
        </Link>
      </div>
    </Reveal>
  );
}
