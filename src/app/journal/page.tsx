import type { Metadata } from "next";
import { getStories } from "@/content/index";
import { PageHeader } from "@/components/ui/PageHeader";
import { StoryCard } from "@/components/journal/StoryCard";
import { SectionDivider } from "@/components/typography/primitives";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Essays and field notes from the Auren Archive — technique, history, conservation and material studies of the invented school.",
};

export default function JournalPage() {
  const stories = getStories();
  const [feature, ...rest] = stories;

  return (
    <>
      <PageHeader
        kicker="Journal · Essays & field notes"
        title="Reading the archive slowly."
        deck="Long-form writing on the techniques, histories and materials of the Auren School — the thinking behind the looking."
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
            <SectionDivider label="More from the journal" className="mb-12" />
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
