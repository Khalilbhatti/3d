import Image from "next/image";
import Link from "next/link";
import { getStories, getArtworkById } from "@/content/index";
import { PlaceholderArt } from "@/components/media/PlaceholderArt";
import { Reveal } from "@/components/typography/Reveal";

/**
 * Visual "browse by category" grid on the Blog listing — one tile per
 * category that actually has a published post, using that post's own cover
 * image (or its generated placeholder) rather than borrowing service
 * imagery, and linking straight through to the post.
 */
export function BlogCategoryShowcase() {
  const stories = getStories();
  const categories = Array.from(new Set(stories.map((s) => s.category)));

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      {categories.map((category, i) => {
        const post = stories.find((s) => s.category === category)!;
        const cover = post.relatedArtworkIds[0] ? getArtworkById(post.relatedArtworkIds[0]) : undefined;
        return (
          <Reveal key={category} delay={(i % 6) * 60} variant="scale">
            <Link href={`/blog/${post.slug}`} className="group relative block overflow-hidden">
              <div className="relative aspect-square">
                {cover?.image ? (
                  <Image
                    src={cover.image}
                    alt={`${category} — GitzTech blog category`}
                    fill
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 16vw"
                    className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-110"
                  />
                ) : (
                  <PlaceholderArt seed={post.seed} palette={post.palette} motif="field" />
                )}
                <div
                  className="absolute inset-0"
                  style={{ background: `linear-gradient(to top, ${post.palette.to}CC, transparent 60%)` }}
                />
              </div>
              <span className="absolute inset-x-0 bottom-0 p-3 font-mono text-[0.65rem] uppercase tracking-label text-paper transition-colors group-hover:text-accent">
                {category}
              </span>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
