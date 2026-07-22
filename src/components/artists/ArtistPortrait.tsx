import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { type Artist } from "@/content/types";
import { PlaceholderArt } from "@/components/media/PlaceholderArt";
import { cn } from "@/lib/utils";

const EXTENSIONS = ["jpg", "jpeg", "png", "webp"] as const;

/**
 * Resolves a team photo for an artist, in priority order:
 *   1. an explicit `portrait` path on the record
 *   2. /public/team/<slug>.(jpg|jpeg|png|webp)
 *
 * The lookup runs at build time (these pages are all statically generated), so
 * dropping a file into public/team/ is enough to swap the generated placeholder
 * for a real photo — no code change required. A missing file simply falls back
 * to the placeholder rather than shipping a broken <img>.
 */
function resolvePortrait(artist: Artist): string | undefined {
  if (artist.portrait) return artist.portrait;
  for (const ext of EXTENSIONS) {
    const publicPath = `/team/${artist.slug}.${ext}`;
    if (fs.existsSync(path.join(process.cwd(), "public", publicPath))) {
      return publicPath;
    }
  }
  return undefined;
}

/**
 * A team member's likeness. Fills its (relative, aspect-ratioed) parent exactly
 * like PlaceholderArt does, so the two are interchangeable without layout shift.
 */
export function ArtistPortrait({
  artist,
  sizes = "(max-width: 768px) 50vw, 25vw",
  priority = false,
  className,
}: {
  artist: Artist;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  const src = resolvePortrait(artist);

  if (!src) {
    return <PlaceholderArt seed={artist.seed} palette={artist.palette} motif="portrait" />;
  }

  return (
    <Image
      src={src}
      alt={`${artist.name} — ${artist.role} at GitzTech`}
      fill
      sizes={sizes}
      priority={priority}
      className={cn("object-cover object-top", className)}
    />
  );
}
