import Link from "next/link";
import { type Artist } from "@/content/types";
import { getArtworksByArtist } from "@/content/index";
import { ArtistPortrait } from "@/components/artists/ArtistPortrait";
import { MReveal } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { cn } from "@/lib/utils";

/** Contributor tile for the artists index. Portrait placeholder + attribution. */
export function ArtistCard({
  artist,
  index = 0,
  className,
}: {
  artist: Artist;
  index?: number;
  className?: string;
}) {
  const count = getArtworksByArtist(artist.id).length;
  return (
    <MReveal variant="blur" delay={(index % 3) * 0.09} className={cn("group", className)}>
      <Link href={`/artists/${artist.slug}`} className="block">
        <TiltCard className="relative overflow-hidden" style={{ aspectRatio: "4 / 5" }}>
          <div className="h-full w-full transition-transform duration-[900ms] ease-editorial group-hover:scale-[1.03]">
            <ArtistPortrait artist={artist} />
          </div>
          {count > 0 ? (
            <span className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] bg-gradient-to-t from-paper/80 to-transparent p-4 font-mono text-[0.6rem] uppercase tracking-label text-ink/0 transition-colors duration-500 group-hover:text-ink/80">
              {count} {count === 1 ? "project" : "projects"} delivered
            </span>
          ) : null}
        </TiltCard>
        <div className="mt-4">
          <h3 className="font-display text-xl leading-tight text-ink md:text-2xl">{artist.name}</h3>
          <p className="mt-1 text-sm text-ink-soft">{artist.role}</p>
          <p className="label mt-2">{artist.lifespan}</p>
        </div>
      </Link>
    </MReveal>
  );
}
