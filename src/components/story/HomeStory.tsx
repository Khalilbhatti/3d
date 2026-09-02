import { FloatingGalleryHero } from "@/components/home/FloatingGalleryHero";
import { StatsStrip } from "@/components/home/StatsStrip";
import { ProblemSection } from "@/components/home/ProblemSection";
import { SolutionsGrid } from "@/components/home/SolutionsGrid";
import { WhyUs } from "@/components/home/WhyUs";
import { CaseStudiesPreview } from "@/components/home/CaseStudiesPreview";
import { ProcessSection } from "@/components/home/ProcessSection";
import { QAStandards } from "@/components/home/QAStandards";
import { IndustriesGrid } from "@/components/home/IndustriesGrid";
import { TechStackStrip } from "@/components/home/TechStackStrip";
import { TestimonialSection } from "@/components/home/TestimonialSection";
import { ContactChapter } from "./ContactChapter";

/**
 * Orchestrates the homepage: the immersive WebGL/fallback hero, followed by
 * a conventional flowing sequence of conversion sections (trust, problem,
 * solutions, why us, case studies, process, QA, industries, tech stack,
 * testimonial), closing with the working Contact section. No scroll-pinning
 * or crossfade — every section lives in normal document flow, the same
 * pattern already used on /about and /services.
 */
export function HomeStory() {
  return (
    <div>
      <FloatingGalleryHero />
      <StatsStrip />
      <ProblemSection />
      <SolutionsGrid />
      <WhyUs />
      <CaseStudiesPreview />
      <ProcessSection />
      <QAStandards />
      <IndustriesGrid />
      <TechStackStrip />
      <TestimonialSection />
      <ContactChapter />
    </div>
  );
}
