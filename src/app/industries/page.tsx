import Link from "next/link";
import { industries } from "@/content/industries";
import { collections, getArtworksByIds } from "@/content/index";
import { ArtworkCard } from "@/components/gallery/ArtworkCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { Kicker } from "@/components/typography/primitives";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Industries",
  description:
    "How GitzTech builds AI automation, CRM and custom software for healthcare, real estate, e-commerce, professional services, B2B and startups.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHeader
        kicker="Who we build for · Industries"
        title="Solutions shaped by your industry."
        deck="Every vertical sells differently. Here's how our services map to the businesses we've already shipped for."
      />
      <div className="container-editorial pb-28">
        {industries.map((industry, i) => {
          const evidence = getArtworksByIds(industry.evidenceArtworkIds);
          const services = collections.filter((c) => industry.relatedServiceSlugs.includes(c.slug));
          return (
            <section
              key={industry.id}
              id={industry.id}
              className="scroll-mt-[var(--header-h)] border-t border-line/15 py-14 first:border-t-0"
            >
              <div className="grid gap-8 md:grid-cols-12">
                <div className="md:col-span-4">
                  <Kicker>{String(i + 1).padStart(2, "0")}</Kicker>
                  <h2 className="mt-4 font-display text-3xl text-ink">{industry.name}</h2>
                  <p className="mt-4 max-w-sm text-pretty leading-relaxed text-ink-soft">{industry.body}</p>
                  <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                    {services.map((s) => (
                      <Link key={s.slug} href={`/services/${s.slug}`} className="link-underline text-sm text-ink">
                        {s.title} →
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:col-span-8">
                  {evidence.map((a, idx) => (
                    <ArtworkCard key={a.id} artwork={a} index={idx} sizes="(max-width: 768px) 45vw, 30vw" />
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
