import Image from "next/image";
import Link from "next/link";
import { collections } from "@/content/collections";
import { PlaceholderArt } from "@/components/media/PlaceholderArt";
import { getArtworksByIds } from "@/content/index";
import { Reveal } from "@/components/typography/Reveal";

/**
 * Visual "browse by category" grid on the Insights listing — one image tile
 * per discipline (story categories map 1:1 to service periods), linking
 * through to that service's own page.
 */
export function CategoryShowcase() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      {collections.map((c, i) => {
        const hero = getArtworksByIds(c.artworkIds)[0];
        return (
          <Reveal key={c.id} delay={(i % 6) * 60} variant="scale">
            <Link href={`/services/${c.slug}`} className="group relative block overflow-hidden">
              <div className="relative aspect-square">
                {c.image ? (
                  <Image
                    src={c.image}
                    alt={`${c.title} — GitzTech ${c.title.toLowerCase()} category`}
                    fill
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 16vw"
                    className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-110"
                  />
                ) : hero ? (
                  <PlaceholderArt seed={hero.seed} palette={hero.palette} motif="field" />
                ) : null}
                <div
                  className="absolute inset-0"
                  style={{ background: `linear-gradient(to top, ${c.palette.to}CC, transparent 60%)` }}
                />
              </div>
              <span className="absolute inset-x-0 bottom-0 p-3 font-mono text-[0.65rem] uppercase tracking-label text-paper transition-colors group-hover:text-accent">
                {c.period}
              </span>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
