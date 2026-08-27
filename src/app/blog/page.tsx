import type { Metadata } from "next";
import { getBlogPosts } from "@/content/index";
import { PageHeader } from "@/components/ui/PageHeader";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { SectionDivider } from "@/components/typography/primitives";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Strategy, marketing and product thinking from the GitzTech team — on funnels, conversion and when to build custom software.",
};

export default function BlogPage() {
  const posts = getBlogPosts();
  const [feature, ...rest] = posts;

  return (
    <>
      <PageHeader
        kicker="Blog · Strategy & product notes"
        title="Ideas worth building on."
        deck="Marketing, CRM strategy and product thinking from the GitzTech team — the reasoning behind how we advise clients."
      />

      <div className="container-editorial pb-28">
        {feature ? (
          <>
            <SectionDivider label="Latest" className="mb-12" />
            <BlogPostCard post={feature} feature index={0} className="mb-20" />
          </>
        ) : null}

        {rest.length ? (
          <>
            <SectionDivider label="More from the blog" className="mb-12" />
            <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((p, i) => (
                <BlogPostCard key={p.id} post={p} index={i} />
              ))}
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}
