import { Kicker } from "@/components/typography/primitives";
import { SplitReveal } from "@/components/typography/SplitReveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";

/** Three real statements reused verbatim from src/content/artists.ts —
 *  not generic "we value quality" copy, but the actual team statements
 *  already published on /team/[slug]. */
const STANDARDS = [
  {
    role: "Full-Stack Developers",
    text: "A build is only finished when someone other than the person who wrote it can run it, read it and extend it.",
  },
  {
    role: "QA & Project Managers",
    text: "Builds are tested across browsers, devices and screen sizes before release, with accessibility and performance checks treated as requirements rather than nice-to-haves.",
  },
  {
    role: "Development Department Head",
    text: "You can't inspect quality in at the end. You build the department that produces it by default.",
  },
];

const QA_TAGS = ["Test Planning", "Cross-Browser QA", "Accessibility", "Release Management", "Reporting"];

/** The methodology behind the QA_TAGS/STANDARDS above, named explicitly —
 *  every project goes through these checks before launch. */
const QA_CATEGORIES = [
  {
    name: "Functional Testing",
    body: "Every critical workflow is tested against the agreed requirements before it ships.",
  },
  {
    name: "Responsive Testing",
    body: "Desktop, tablet and mobile layouts are checked across real breakpoints, not just a resized browser window.",
  },
  {
    name: "Browser Testing",
    body: "Builds are verified across modern browsers so the experience doesn't quietly break for part of your audience.",
  },
  {
    name: "Performance Testing",
    body: "Page speed and load times are checked before launch, not discovered after.",
  },
  {
    name: "Integration Testing",
    body: "Third-party APIs, CRMs and payment gateways are tested end-to-end, not just in isolation.",
  },
  {
    name: "User Acceptance Testing",
    body: "You review the build against real workflows before it goes live — feedback gets incorporated, not just logged.",
  },
  {
    name: "Production Verification",
    body: "Critical functionality is rechecked immediately after deployment, so launch day doesn't end at the deploy button.",
  },
];

export function QAStandards() {
  return (
    <section id="quality" className="scroll-mt-[var(--header-h)] container-editorial py-20 md:py-28">
      <Kicker accent>Built. Tested. Ready for production.</Kicker>
      <SplitReveal as="h2" type="lines" className="mt-6 max-w-[22ch] font-display text-display-md text-balance text-ink">
        Quality assurance, not an afterthought.
      </SplitReveal>
      <StaggerGroup as="div" className="mt-14 grid gap-x-10 gap-y-10 md:grid-cols-3">
        {STANDARDS.map((s) => (
          <StaggerItem as="div" key={s.role} className="border-t border-line/15 pt-6">
            <span className="label text-accent">{s.role}</span>
            <p className="mt-3 text-pretty font-display text-lg leading-snug text-ink">&ldquo;{s.text}&rdquo;</p>
          </StaggerItem>
        ))}
      </StaggerGroup>
      <div className="mt-14 grid gap-x-10 gap-y-8 border-t border-line/15 pt-10 sm:grid-cols-2 lg:grid-cols-4">
        {QA_CATEGORIES.map((c) => (
          <div key={c.name}>
            <h3 className="font-display text-lg leading-tight text-ink">{c.name}</h3>
            <p className="mt-2 text-pretty text-sm leading-relaxed text-ink-soft">{c.body}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-line/15 pt-6">
        {QA_TAGS.map((t) => (
          <span key={t} className="label text-ink-soft">
            {t}
          </span>
        ))}
      </div>
    </section>
  );
}
