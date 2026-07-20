import type { Metadata } from "next";
import { getStories } from "@/content/index";
import { PageHeader } from "@/components/ui/PageHeader";
import { StoryCard } from "@/components/journal/StoryCard";
import { SectionDivider } from "@/components/typography/primitives";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Guides and field notes from the GitzTech team on web performance, WordPress, CRM automation and product design.",
};

export default function JournalPage() {
  const stories = getStories();
  const [feature, ...rest] = stories;

  return (
    <>
      <PageHeader
        kicker="Insights · Guides & field notes"
        title="What we have learned building."
        deck="Practical writing on web performance, WordPress, CRM automation and product design — the thinking behind how we build."
      />

      <div className="container-editorial pb-28">
        {feature ? (
          <>
            <SectionDivider label="Latest" className="mb-12" />
            <StoryCard story={feature} feature index={0} className="mb-20" />
          </>
        ) : null}

        {rest.length ? (
          <>
            <SectionDivider label="More insights" className="mb-12" />
            <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((s, i) => (
                <StoryCard key={s.id} story={s} index={i} />
              ))}
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}
