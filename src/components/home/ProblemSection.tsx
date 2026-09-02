import Link from "next/link";
import { Kicker } from "@/components/typography/primitives";
import { SplitReveal } from "@/components/typography/SplitReveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";

const PROBLEMS = [
  {
    title: "Orders taken by phone, re-keyed by hand.",
    body: "Orders arriving by phone and WhatsApp, then re-keyed into spreadsheets — the exact gap a custom ordering platform closes.",
  },
  {
    title: "Leads that go cold between the form and the inbox.",
    body: "Enquiries lost between a website form and a sales team's inbox — the reason automated pipelines and follow-up exist.",
  },
  {
    title: "A website nobody on your team can safely update.",
    body: "Page builders stacked on page builders until nobody trusts touching the site — a custom build fixes that permanently.",
  },
  {
    title: "A funnel that quietly loses orders.",
    body: "Manual re-entry, cold leads and disconnected tools — the same pattern shows up across almost every business we've worked with.",
  },
  {
    title: "No visibility into what's actually happening.",
    body: "A deal stalls or a lead goes quiet and nobody notices for days — the reporting dashboards that fix this are already part of a properly wired CRM.",
  },
  {
    title: "Your team doing by hand what software should do for you.",
    body: "Qualifying leads, sending reminders and logging follow-ups one at a time — work a chatbot or workflow already handles for the businesses we've automated.",
  },
];

/** Problem-first positioning: name what's actually slowing the business down
 *  before pitching a solution. Each point is grounded in a real project's
 *  own description (see src/content/artworks.ts prj-food, prj-wholesale),
 *  not a generic pain-point template. */
export function ProblemSection() {
  return (
    <section id="the-problem" className="scroll-mt-[var(--header-h)] container-editorial py-20 md:py-28">
      <Kicker accent>What&rsquo;s actually slowing you down</Kicker>
      <SplitReveal as="h2" type="lines" className="mt-6 max-w-[20ch] font-display text-display-md text-balance text-ink">
        Problem solving, then the right solution.
      </SplitReveal>
      <StaggerGroup as="div" className="mt-14 grid gap-x-12 gap-y-2 md:grid-cols-2">
        {PROBLEMS.map((p) => (
          <StaggerItem as="div" key={p.title} className="border-t border-line/15 py-6">
            <h3 className="font-display text-2xl leading-tight text-ink">{p.title}</h3>
            <p className="mt-3 max-w-md text-pretty leading-relaxed text-ink-soft">{p.body}</p>
          </StaggerItem>
        ))}
      </StaggerGroup>
      <p className="mt-12 max-w-xl text-pretty text-lg leading-relaxed text-ink-soft">
        We identify the bottleneck first — then build the technology around your business, not the other way around.
      </p>
      <Link href="/contact" className="group mt-6 inline-flex items-center gap-2 link-underline text-ink">
        Find my business bottleneck
        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </Link>
    </section>
  );
}
