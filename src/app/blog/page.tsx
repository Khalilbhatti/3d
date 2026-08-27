import type { Metadata } from "next";
import { getStories } from "@/content/index";
import { PageHeader } from "@/components/ui/PageHeader";
import { StoryCard } from "@/components/journal/StoryCard";
import { BlogCategoryShowcase } from "@/components/journal/BlogCategoryShowcase";
import { SectionDivider } from "@/components/typography/primitives";

const description =
  "Strategy and field notes from the GitzTech team on AI automation, web performance, WordPress and CRM.";

export const metadata: Metadata = {
  title: "Blog",
  description,
  alternates: { canonical: "/blog" },
  openGraph: { title: "Blog", description },
  twitter: { title: "Blog", description },
};

export default function BlogPage() {
  const stories = getStories();
  const [feature, ...rest] = stories;
  const hasMultipleCategories = new Set(stories.map((s) => s.category)).size > 1;

  return (
    <>
      <PageHeader
        kicker="Blog · Strategy & field notes"
        title="What we have learned building."
        deck="Practical writing on AI automation, web performance, WordPress and CRM — the thinking behind how we build."
      />

      <div className="container-editorial pb-28">
        {hasMultipleCategories ? (
          <>
            <SectionDivider label="Browse by category" className="mb-8" />
            <BlogCategoryShowcase />
          </>
        ) : null}

        {feature ? (
          <>
            <SectionDivider label="Latest" className={hasMultipleCategories ? "mb-12 mt-20" : "mb-12"} />
            <StoryCard story={feature} feature index={0} className="mb-20" />
          </>
        ) : null}

        {rest.length ? (
          <>
            <SectionDivider label="More from the blog" className="mb-12" />
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
