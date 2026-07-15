import Link from "next/link";
import { type Artwork } from "@/content/types";
import { getArtistById } from "@/content/index";
import { ArtworkImage } from "@/components/media/ArtworkImage";
import { cn } from "@/lib/utils";

/**
 * Compact catalogue row for the archive's list view. Thumbnail + attribution +
 * catalogue metadata in aligned columns. Links to the full record.
 */
export function ArtworkListRow({
  artwork,
  index = 0,
  className,
}: {
  artwork: Artwork;
  index?: number;
  className?: string;
}) {
  const artist = getArtistById(artwork.artistId);
  return (
    <Link
      href={`/archive/${artwork.slug}`}
      style={{ animationDelay: `${(index % 14) * 35}ms` }}
      className={cn(
        "group grid grid-cols-[3.5rem_1fr_auto] items-center gap-4 border-t border-line/15 py-4 animate-fade-up md:grid-cols-[4.5rem_1.6fr_1fr_1fr_auto] md:gap-6",
        className
      )}
    >
      <div className="w-14 md:w-[4.5rem]">
        <ArtworkImage
          artwork={artwork}
          aspect="1 / 1"
          sizes="72px"
          className="transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="min-w-0">
        <h3 className="truncate font-display text-lg leading-tight text-ink md:text-xl">
          <span className="italic">{artwork.title}</span>
        </h3>
        <p className="truncate text-sm text-muted">{artist?.name}</p>
      </div>
      <p className="hidden truncate text-sm text-ink-soft md:block">{artwork.medium}</p>
      <p className="hidden truncate text-sm text-muted md:block">{artwork.location}</p>
      <span className="label whitespace-nowrap text-ink-soft transition-colors group-hover:text-accent">
        {artwork.year}
      </span>
    </Link>
  );
}
