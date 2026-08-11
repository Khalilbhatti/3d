import type { Story } from "./types";

/**
 * =============================================================================
 *  INSIGHTS  (rendered through the Story model)
 * =============================================================================
 *  Guides and field notes from the GitzTech team. Authored as structured blocks
 *  so they can be edited without touching the layout.
 *  See docs/CONTENT_EDITING.md for the block reference.
 */
export const stories: Story[] = [
  {
    id: "story-web-performance",
    slug: "why-fast-sites-convert-better",
    title: "Why fast sites convert better",
    dek: "What results can you expect from fast site development? Usually more of the traffic you're already paying for.",
    author: "GitzTech",
    authorRole: "Full-Stack Team",
    date: "2026-05-18",
    displayDate: "18 May 2026",
    readingTime: "5 min read",
    category: "Web & Apps",
    seed: "story-perf-01",
    palette: { from: "#2E5C99", via: "#1B3A63", to: "#0B1F3D", ink: 0.18 },
    blocks: [
      {
        type: "paragraph",
        lead: true,
        text: "Most businesses try to fix a conversion problem by buying more traffic. Very often the cheaper fix is already sitting in the build: a homepage that takes eight seconds to become usable on a mid-range phone.",
      },
      {
        type: "paragraph",
        text: "Speed is not a vanity metric. Every second of delay costs you a share of the visitors you already paid to acquire — and it compounds, because slow pages also rank lower, which means you pay for even more of your traffic.",
      },
      { type: "heading", text: "Where the seconds actually go" },
      {
        type: "paragraph",
        text: "In the sites we're asked to rescue, the causes are consistent: page builders stacking layers of markup, unoptimised hero images, a dozen third-party scripts loading before anything renders, and fonts that block the first paint.",
      },
      {
        type: "pullquote",
        text: "Most slow sites aren't a hosting problem. They're a build problem.",
        cite: "GitzTech engineering",
      },
      {
        type: "paragraph",
        text: "That's why we build custom rather than stacking plugins: fewer moving parts, cleaner markup, and a performance budget agreed before development starts, so speed is a requirement rather than a cleanup task.",
      },
      { type: "image", artworkId: "prj-food", alt: "The Food Supply Co. platform built by GitzTech." },
      { type: "heading", text: "What to measure" },
      {
        type: "paragraph",
        text: "Track Core Web Vitals on real devices, not just a lab score, and pair them with the number that matters: completed actions. Enquiries, bookings, orders. If the speed work doesn't move those, it wasn't the bottleneck — and we'll say so.",
      },
    ],
    relatedArtworkIds: ["prj-food", "prj-crafting"],
    relatedStoryIds: ["story-wordpress-benefits"],
  },
  {
    id: "story-wordpress-benefits",
    slug: "benefits-of-a-professional-wordpress-build",
    title: "The benefits of a professional WordPress build",
    dek: "Who benefits from a WordPress design service, how long a build takes, and what separates a custom theme from a template.",
    author: "GitzTech",
    authorRole: "WordPress Team",
    date: "2026-04-27",
    displayDate: "27 April 2026",
    readingTime: "6 min read",
    category: "WordPress",
    seed: "story-wp-02",
    palette: { from: "#4A78B8", via: "#2A4A73", to: "#0D1E33", ink: 0.16 },
    blocks: [
      {
        type: "paragraph",
        lead: true,
        text: "WordPress powers a large share of the web, which is exactly why the quality gap between builds is so wide. The platform isn't the differentiator — how it's built is.",
      },
      { type: "heading", text: "Who it's for" },
      {
        type: "paragraph",
        text: "WordPress suits businesses that publish regularly, need their own team to edit content without a developer, or run a catalogue through WooCommerce. If your site is a product with complex state and logged-in users, we'll usually recommend a custom application instead — and tell you that up front.",
      },
      { type: "heading", text: "Custom theme vs template" },
      {
        type: "paragraph",
        text: "A template plus a page builder gets you live quickly and slow forever. A custom theme takes longer to start and produces a faster, cleaner site your team can edit without breaking the layout — plus plugins written only where functionality genuinely doesn't exist.",
      },
      {
        type: "pullquote",
        text: "A site your team can update without fear is worth more than a site that merely looked good on launch day.",
        cite: "GitzTech",
      },
      { type: "heading", text: "How long does it take?" },
      {
        type: "paragraph",
        text: "A focused marketing site typically runs four to six weeks from kickoff to launch; WooCommerce builds take longer depending on catalogue size, payment and shipping rules. We agree the scope, rounds of revisions and launch date before starting, so the timeline isn't a surprise.",
      },
    ],
    relatedArtworkIds: [],
    relatedStoryIds: ["story-web-performance"],
  },
  {
    id: "story-ghl-automation",
    slug: "automating-follow-up-with-gohighlevel",
    title: "Automating follow-up with GoHighLevel",
    dek: "Most businesses don't have a lead problem. They have a follow-up problem — and it's fixable in a fortnight.",
    author: "GitzTech",
    authorRole: "GoHighLevel & CRM Specialists",
    date: "2026-03-30",
    displayDate: "30 March 2026",
    readingTime: "6 min read",
    category: "CRM & Automation",
    seed: "story-ghl-03",
    palette: { from: "#FFB347", via: "#C97A1A", to: "#2E1B05", ink: 0.18 },
    blocks: [
      {
        type: "paragraph",
        lead: true,
        text: "Ask a business where their leads go and you'll often get an honest shrug: a form emails someone, someone forwards it, and whoever is least busy replies — eventually.",
      },
      {
        type: "paragraph",
        text: "GoHighLevel fixes that by making follow-up a system rather than an intention. One pipeline, stages that reflect how you actually sell, and automation that works every lead the moment it lands.",
      },
      { type: "heading", text: "What we set up" },
      {
        type: "paragraph",
        text: "Account and pipeline configuration, high-converting funnels, email and SMS sequences, appointment booking flows with reminders, WhatsApp Business API integration, and chatbots that qualify leads around the clock.",
      },
      {
        type: "pullquote",
        text: "Speed to first response is the single cheapest conversion lever most businesses are ignoring.",
        cite: "GitzTech CRM team",
      },
      { type: "image", artworkId: "prj-wholesale", alt: "The Wholesale Hub GoHighLevel build by GitzTech." },
      { type: "heading", text: "Then measure it" },
      {
        type: "paragraph",
        text: "We finish with dashboards you can read at a glance: leads by source, time to first contact, stage conversion and revenue. Automation without reporting just hides the problem more efficiently.",
      },
    ],
    relatedArtworkIds: ["prj-wholesale"],
    relatedStoryIds: ["story-web-performance"],
  },
  {
    id: "story-design-systems",
    slug: "designing-interfaces-people-trust",
    title: "Designing interfaces people trust",
    dek: "Research-led UI/UX turns user insight into interfaces people move through without thinking about them.",
    author: "GitzTech",
    authorRole: "UI/UX Designers",
    date: "2026-02-16",
    displayDate: "16 February 2026",
    readingTime: "5 min read",
    category: "Product Design",
    seed: "story-ux-04",
    palette: { from: "#FFC157", via: "#D98A1F", to: "#331F05", ink: 0.16 },
    blocks: [
      {
        type: "paragraph",
        lead: true,
        text: "Good interface design is mostly invisible. Users don't praise a checkout that worked; they simply finish it. The work shows up in the numbers, not the compliments.",
      },
      { type: "heading", text: "Start with evidence" },
      {
        type: "paragraph",
        text: "We begin with user flows, competitor teardowns and real session behaviour. That way design decisions can be argued from insight rather than taste — and disagreements get resolved by testing instead of seniority.",
      },
      {
        type: "image",
        artworkId: "prj-parko",
        alt: "The Parko smart parking mobile app designed by GitzTech.",
      },
      {
        type: "pullquote",
        text: "If a user has to be taught how to use the screen, the screen is the thing that needs changing.",
        cite: "GitzTech design team",
      },
      { type: "heading", text: "Ship a system, not screens" },
      {
        type: "paragraph",
        text: "Final interfaces are delivered as a documented design system — components, states, spacing and accessibility rules — so the build matches the design and stays consistent as the product grows.",
      },
      { type: "gallery", artworkIds: ["prj-parko", "prj-stitcher"] },
    ],
    relatedArtworkIds: ["prj-parko", "prj-stitcher"],
    relatedStoryIds: ["story-wordpress-benefits"],
  },
];
