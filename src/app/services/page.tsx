import type { Metadata } from "next";
import { getCollections } from "@/content/index";
import { brand } from "@/config/theme";
import { PageHeader } from "@/components/ui/PageHeader";
import { HorizontalCollections } from "@/components/collections/HorizontalCollections";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web & app development, digital marketing, WordPress, GoHighLevel CRM, graphic design and UI/UX — the six disciplines GitzTech delivers.",
};

export default function CollectionsPage() {
  const collections = getCollections();

  return (
    <>
      <PageHeader
        kicker="What we do · Services"
        title="Solutions for every stage of growth."
        deck="From idea to launch and beyond — six disciplines, one connected team. Scroll sideways to move through every service we deliver."
      >
        <div className="flex flex-wrap gap-x-10 gap-y-3">
          <span className="label">{collections.length} collections</span>
          <span className="label">100+ projects delivered</span>
          <span className="label">{brand.founded} – present</span>
        </div>
      </PageHeader>

      <HorizontalCollections />
    </>
  );
}
