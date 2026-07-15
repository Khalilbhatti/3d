import Link from "next/link";
import { type Artwork } from "@/content/types";
import { ArtworkImage } from "@/components/media/ArtworkImage";
import { ArtworkCaption } from "./ArtworkCaption";
import { Reveal } from "@/components/typography/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { cn } from "@/lib/utils";

/**
 * Linked artwork tile used in grids and related-work rails. The image sits in a
 * clipped frame that eases up on hover (frame-expansion feel), and the whole
 * card reveals with a mask as it enters view.
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
      <Link
        href={`/archive/${artwork.slug}`}
        className="block focus-visible:outline-none"
        aria-label={`${artwork.title} — view detail`}
      >
        <TiltCard className="relative overflow-hidden">
          <div className="transition-transform duration-[900ms] ease-editorial group-hover:scale-[1.03]">
            <ArtworkImage artwork={artwork} sizes={sizes} motif={motif} />
          </div>
          <span className="pointer-events-none absolute right-3 top-3 z-[3] font-mono text-[0.6rem] uppercase tracking-label text-paper/0 transition-colors duration-500 group-hover:text-paper/80">
            View →
          </span>
        </TiltCard>
        <ArtworkCaption artwork={artwork} className="mt-4" size="sm" />
      </Link>
    </Reveal>
  );
}
