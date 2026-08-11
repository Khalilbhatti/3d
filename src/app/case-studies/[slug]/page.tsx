import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCaseStudies, getCaseStudyBySlug, getArtworkById } from "@/content/index";
import { CaseStudyHero } from "@/components/case-study/CaseStudyHero";
import {
  ProseSection,
  ChipList,
  SpecGrid,
  FlowDiagram,
  ObjectiveList,
  DecisionList,
  AudienceGrid,
  PainPointList,
} from "@/components/case-study/primitives";
import {
  PersonaGrid,
  SitemapTree,
  ColorPaletteBoard,
  TypographySpecimen,
  ScreenGallery,
  StageFlow,
} from "@/components/case-study/visuals";
import { SectionDivider } from "@/components/typography/primitives";

export function generateStaticParams() {
  return getCaseStudies().map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const cs = getCaseStudyBySlug(params.slug);
  if (!cs) return { title: "Case study not found" };
  return {
    title: `${cs.title} — Case Study`,
    description: cs.overview.body[0],
    openGraph: { title: cs.title, description: cs.overview.body[0] },
  };
}

export default function CaseStudyDetailPage({ params }: { params: { slug: string } }) {
  const cs = getCaseStudyBySlug(params.slug);
  if (!cs) notFound();

  const artwork = getArtworkById(cs.artworkId);
  const portfolioHref = artwork ? `/portfolio/${artwork.slug}` : "/portfolio";

  return (
    <article>
      <CaseStudyHero caseStudy={cs} />

      <div className="container-editorial space-y-24 py-20 md:space-y-32 md:py-28">
        <section>
          <SectionDivider label="Overview" className="mb-10" />
          <ProseSection heading={cs.overview.heading} body={cs.overview.body} />
        </section>

        <section>
          <SectionDivider label="The Context" className="mb-10" />
          <ProseSection heading={cs.context.heading} body={cs.context.body} />
          <ChipList items={cs.context.keywords} />
        </section>

        <section>
          <SectionDivider label="The Problem" className="mb-10" />
          <p className="max-w-2xl font-display text-3xl leading-tight text-ink text-balance md:text-4xl">
            {cs.problem.heading}
          </p>
          <div className="mt-8 grid gap-10 md:grid-cols-2">
            <div>
              <p className="label">The website had to feel</p>
              <div className="mt-4">
                <ChipList items={cs.problem.feelWords} />
              </div>
            </div>
            <div>
              <p className="label">But it also had to remain</p>
              <div className="mt-4">
                <ChipList items={cs.problem.remainWords} />
              </div>
            </div>
          </div>
          <p className="mt-10 max-w-2xl font-display text-2xl italic leading-snug text-ink md:text-3xl">
            {cs.problem.coreQuestion}
          </p>
        </section>

        <section>
          <SectionDivider label="Business Objectives" className="mb-10" />
          <ObjectiveList items={cs.objectives} />
        </section>

        <section>
          <SectionDivider label="User Goals" className="mb-10" />
          <ul className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
            {cs.userGoals.map((q) => (
              <li key={q} className="border-t border-line/15 pt-3 text-ink-soft">
                {q}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <SectionDivider label="Target Audience" className="mb-10" />
          <AudienceGrid items={cs.audiences} />
        </section>

        <section>
          <SectionDivider label="Proto-Personas" className="mb-10" />
          <PersonaGrid items={cs.personas} />
        </section>

        <section>
          <SectionDivider label="Key User Pain Points" className="mb-10" />
          <PainPointList items={cs.painPoints} />
        </section>

        <section>
          <SectionDivider label="UX Strategy" className="mb-10" />
          <StageFlow stages={cs.uxStrategy.stages} />
        </section>

        <section>
          <SectionDivider label="Information Architecture" className="mb-10" />
          <SitemapTree items={cs.sitemap} />
        </section>

        <section className="space-y-12">
          <SectionDivider label="User Flows" className="mb-2" />
          {cs.userFlows.map((flow) => (
            <FlowDiagram key={flow.title} title={flow.title} steps={flow.steps} />
          ))}
        </section>

        <section>
          <SectionDivider label="Content Architecture" className="mb-10" />
          <dl className="grid gap-x-10 gap-y-1 sm:grid-cols-2">
            {cs.contentArchitecture.map((c) => (
              <div key={c.section} className="flex items-baseline justify-between gap-6 border-t border-line/15 py-3.5">
                <dt className="label">{c.section}</dt>
                <dd className="text-right text-ink-soft">{c.question}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <SectionDivider label="Visual Direction" className="mb-10" />
          <ProseSection heading={cs.visualDirection.heading} body={[cs.visualDirection.body]} />
          <div className="mt-6">
            <ChipList items={cs.visualDirection.traits} />
          </div>
        </section>

        <section>
          <SectionDivider label="Color Palette" className="mb-10" />
          <ColorPaletteBoard items={cs.colorPalette} />
        </section>

        <section>
          <SectionDivider label="Typography" className="mb-10" />
          <TypographySpecimen display={cs.typography.display} interfaceFont={cs.typography.interface} scale={cs.typography.scale} />
        </section>

        <section>
          <SectionDivider label="Layout System" className="mb-10" />
          <SpecGrid items={cs.grid} />
          <p className="label mt-10">Spacing base — {cs.spacing.base}</p>
          <div className="mt-4">
            <ChipList items={cs.spacing.scale.map((n) => `${n}px`)} />
          </div>
        </section>

        <section>
          <SectionDivider label="Image Direction" className="mb-10" />
          {cs.imageDirection.categories.map((cat) => (
            <div key={cat.name} className="mt-6 first:mt-0">
              <p className="label">{cat.name}</p>
              <div className="mt-3">
                <ChipList items={cat.items} />
              </div>
            </div>
          ))}
          <p className="label mt-8">Treatment</p>
          <div className="mt-3">
            <ChipList items={cs.imageDirection.treatment} />
          </div>
          <p className="label mt-8">Ratios</p>
          <dl className="mt-3 grid gap-x-10 gap-y-1 sm:grid-cols-2">
            {cs.imageDirection.ratios.map((r) => (
              <div key={r.use} className="flex items-baseline justify-between gap-6 border-t border-line/15 py-3.5">
                <dt className="label">{r.use}</dt>
                <dd className="text-right text-ink-soft">{r.ratio}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <SectionDivider label="Component System" className="mb-10" />
          <p className="label">Iconography</p>
          <div className="mt-3">
            <ChipList items={cs.iconography} />
          </div>
          <p className="label mt-8">Core components</p>
          <div className="mt-3">
            <ChipList items={cs.componentSystem.core} />
          </div>
          <p className="label mt-8">States</p>
          <div className="mt-3">
            <ChipList items={cs.componentSystem.states} />
          </div>
          <dl className="mt-8 grid gap-x-10 gap-y-4 sm:grid-cols-3">
            <div className="border-t border-line/15 pt-3.5">
              <dt className="label">Primary button</dt>
              <dd className="mt-1 text-sm text-ink-soft">{cs.buttonSystem.primary}</dd>
            </div>
            <div className="border-t border-line/15 pt-3.5">
              <dt className="label">Secondary button</dt>
              <dd className="mt-1 text-sm text-ink-soft">{cs.buttonSystem.secondary}</dd>
            </div>
            <div className="border-t border-line/15 pt-3.5">
              <dt className="label">Text link</dt>
              <dd className="mt-1 text-sm text-ink-soft">{cs.buttonSystem.textLink}</dd>
            </div>
          </dl>
          <ProseSection body={cs.buttonSystem.principles} className="mt-10" />
        </section>

        <section>
          <SectionDivider label="Homepage, Section by Section" className="mb-10" />
          <ObjectiveList
            items={cs.homepageSections.map((s, i) => ({
              number: String(i + 1).padStart(2, "0"),
              title: `${s.title} — ${s.question}`,
              body: s.body,
            }))}
          />
        </section>

        <section>
          <SectionDivider label="The Process" className="mb-10" />
          <StageFlow stages={cs.processSteps.map((p) => ({ number: p.number, name: p.title, body: p.body }))} />
        </section>

        <section>
          <SectionDivider label="Personalization" className="mb-10" />
          <ChipList items={cs.personalization.options} />
          <p className="mt-6 max-w-2xl text-pretty text-lg text-ink-soft">{cs.personalization.note}</p>
        </section>

        <section>
          <SectionDivider label="Lookbook" className="mb-10" />
          <ChipList items={cs.lookbookCategories} />
        </section>

        <section>
          <SectionDivider label="Booking Experience" className="mb-10" />
          <DecisionList items={cs.bookingOptions} />
        </section>

        <section>
          <SectionDivider label="Booking Flow" className="mb-10" />
          <FlowDiagram steps={cs.formFlow} />
        </section>

        <section>
          <SectionDivider label="Responsive Design" className="mb-10" />
          <SpecGrid items={cs.responsive} />
        </section>

        <section>
          <SectionDivider label="Interaction Design" className="mb-10" />
          <ChipList items={cs.interactionDesign.microInteractions} />
          <p className="mt-6 max-w-xl font-display text-xl italic text-ink">{cs.interactionDesign.principle}</p>
        </section>

        <section>
          <SectionDivider label="Accessibility" className="mb-10" />
          <ChipList items={cs.accessibility} />
        </section>

        <section>
          <SectionDivider label="Conversion Strategy" className="mb-10" />
          <p className="max-w-2xl font-display text-2xl text-ink">{cs.conversionStrategy.primary}</p>
          <div className="mt-6">
            <ChipList items={cs.conversionStrategy.supporting} />
          </div>
        </section>

        <section className="space-y-8">
          <SectionDivider label="Conversion Paths" className="mb-2" />
          {cs.conversionPaths.map((p) => (
            <FlowDiagram key={p.name} title={p.name} steps={p.steps} />
          ))}
        </section>

        <section>
          <SectionDivider label="UX Writing" className="mb-10" />
          <ChipList items={cs.uxWriting.focus} />
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink-soft">{cs.uxWriting.body}</p>
        </section>

        <section>
          <SectionDivider label="Design Tokens" className="mb-10" />
          {cs.designTokens.map((g) => (
            <div key={g.group} className="mt-6 first:mt-0">
              <p className="label">{g.group}</p>
              <div className="mt-3">
                <ChipList items={g.tokens} />
              </div>
            </div>
          ))}
        </section>

        <section>
          <SectionDivider label="Design Validation" className="mb-10" />
          <ChipList items={cs.validation} />
        </section>

        <section>
          <SectionDivider label="Key Design Decisions" className="mb-10" />
          <DecisionList items={cs.decisions} />
        </section>

        <section>
          <SectionDivider label="The Full Site" className="mb-10" />
          <ScreenGallery images={cs.heroImages} alt={cs.title} />
        </section>

        <section>
          <SectionDivider label="Challenges" className="mb-10" />
          <DecisionList items={cs.challenges.map((c) => ({ title: c.challenge, body: c.response }))} />
        </section>

        <section>
          <SectionDivider label="Project Outcome" className="mb-10" />
          <ChipList items={cs.outcome} />
        </section>

        <section>
          <SectionDivider label="What We Delivered" className="mb-10" />
          <p className="label">UX</p>
          <div className="mt-3">
            <ChipList items={cs.delivered.ux} />
          </div>
          <p className="label mt-8">UI</p>
          <div className="mt-3">
            <ChipList items={cs.delivered.ui} />
          </div>
          <p className="label mt-8">Prototyping</p>
          <div className="mt-3">
            <ChipList items={cs.delivered.prototyping} />
          </div>
        </section>

        <section>
          <SectionDivider label="Skills Demonstrated" className="mb-10" />
          <ChipList items={cs.skills} />
        </section>

        <section>
          <SectionDivider label="Final Reflection" className="mb-10" />
          <ProseSection heading={cs.reflection.heading} body={cs.reflection.body} />
        </section>

        <section className="flex flex-wrap items-center justify-between gap-6 border-t border-line/15 pt-10">
          <Link href={portfolioHref} className="link-underline text-ink">
            ← Back to the portfolio entry
          </Link>
          <a
            href={cs.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 border border-line/25 px-5 py-3.5 font-mono text-xs uppercase tracking-label text-ink transition-colors hover:border-accent hover:text-accent"
          >
            Visit website
            <span aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
              ↗
            </span>
          </a>
        </section>
      </div>
    </article>
  );
}
