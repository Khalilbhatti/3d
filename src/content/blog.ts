import type { BlogPost } from "./types";

/**
 * =============================================================================
 *  BLOG  (rendered through the BlogPost model)
 * =============================================================================
 *  General-audience posts — strategy, marketing and product thinking — kept
 *  separate from `stories.ts` (Insights), which covers technical field notes.
 *  Authored as structured blocks; see docs/CONTENT_EDITING.md for the block
 *  reference (the same `StoryBlock` types apply here).
 */
export const blogPosts: BlogPost[] = [
  {
    id: "blog-crm-funnel-fit",
    slug: "choosing-the-right-crm-funnel-for-a-local-service-business",
    title: "Choosing the right CRM funnel for a local service business",
    dek: "Electricians, salons and dentists don't need the same funnel. Here's how the job itself should shape the booking journey.",
    author: "GitzTech",
    authorRole: "CRM Team",
    date: "2026-07-14",
    displayDate: "14 July 2026",
    readingTime: "5 min read",
    category: "CRM & Automation",
    seed: "blog-crm-01",
    palette: { from: "#F2C230", via: "#1B3A6E", to: "#050B14", ink: 0.18 },
    blocks: [
      {
        type: "paragraph",
        lead: true,
        text: "Every local-service business wants the same outcome — more booked jobs — but the funnel that gets them there looks different depending on what's being sold. An emergency electrician and a hair salon are both \"local services,\" and almost nothing else about their funnels should match.",
      },
      {
        type: "paragraph",
        text: "The mistake we see most often is a template applied without asking what decision the visitor is actually making. That decision changes the whole structure: what goes above the fold, how much trust content is needed before the CTA, and whether the funnel should push toward a phone call, a booking form or a quote request.",
      },
      { type: "heading", text: "Urgency-driven services want a phone number, not a form" },
      {
        type: "paragraph",
        text: "For electricians, plumbers and other emergency trades, the visitor is often mid-crisis. The funnel's job is to prove availability and reliability in seconds — 24/7 emergency service, response time, service area — and get a phone number in front of them before they bounce to the next search result.",
      },
      {
        type: "image",
        artworkId: "prj-electrician-funnel",
        alt: "The Electrician Services Funnel built by GitzTech, leading with 24/7 availability and a reserve-appointment CTA.",
      },
      { type: "heading", text: "Visual, appearance-driven services want proof before pricing" },
      {
        type: "paragraph",
        text: "A salon or spa is selling a transformation. Visitors are browsing, not panicking, so the funnel earns the booking with portfolio and before/after content, team credibility and testimonials — pricing and the appointment CTA come after the visitor is already sold on the outcome.",
      },
      {
        type: "pullquote",
        text: "The funnel should mirror the buying decision, not the industry template.",
        cite: "GitzTech CRM team",
      },
      { type: "heading", text: "Trust-first services want credentials front and center" },
      {
        type: "paragraph",
        text: "Dentists, clinics and financial advisors are selling ongoing trust, not a one-off transaction. These funnels lean on team profiles, qualifications, patient or client testimonials and a low-friction consultation booking — the ask is smaller, but the trust bar is higher.",
      },
      {
        type: "paragraph",
        text: "Before picking a template, write down the one sentence a visitor needs to believe before they'll act. That sentence tells you what the funnel should lead with — and it's rarely the same sentence twice.",
      },
    ],
    relatedArtworkIds: ["prj-electrician-funnel", "prj-salon-funnel", "prj-dentist-funnel"],
    relatedPostIds: ["blog-landing-page-checklist"],
  },
  {
    id: "blog-landing-page-checklist",
    slug: "landing-page-conversion-checklist",
    title: "A landing page conversion checklist we actually use",
    dek: "The dozen checks we run on every landing page before it ships — not a theory list, the one taped to the wall.",
    author: "GitzTech",
    authorRole: "Growth & Design Team",
    date: "2026-06-22",
    displayDate: "22 June 2026",
    readingTime: "6 min read",
    category: "Marketing & Growth",
    seed: "blog-lp-02",
    palette: { from: "#E86A4A", via: "#7A2E1F", to: "#1C0A06", ink: 0.16 },
    blocks: [
      {
        type: "paragraph",
        lead: true,
        text: "A landing page has one job. Most of the pages that underperform aren't badly designed — they're just doing three or four jobs at once, and the visitor can't tell which one matters.",
      },
      {
        type: "paragraph",
        text: "Before a page ships, we run it against the same short list every time. None of these are clever. All of them get skipped often enough that they're worth writing down.",
      },
      { type: "heading", text: "Above the fold" },
      {
        type: "paragraph",
        text: "Can a visitor tell what you do, who it's for, and what to do next — without scrolling? If the headline could describe three different businesses, it isn't specific enough yet. The primary CTA should be visible without any interaction.",
      },
      { type: "heading", text: "One primary action" },
      {
        type: "paragraph",
        text: "Every additional competing CTA measurably lowers conversion on the one that matters. Secondary links (case studies, pricing, social proof) can exist, but they should visually defer to the primary action, not compete with it.",
      },
      {
        type: "pullquote",
        text: "If you can't say what the page's one job is in a sentence, neither can the visitor.",
      },
      { type: "heading", text: "Proof before the ask" },
      {
        type: "paragraph",
        text: "Testimonials, logos, numbers, before/afters — whatever your proof is, it should appear before you ask for anything that costs the visitor effort (a form, a call, a card). Reverse that order and you're asking for trust you haven't earned yet on the page.",
      },
      { type: "heading", text: "Mobile is the real test" },
      {
        type: "paragraph",
        text: "Check the page on a mid-range phone with a throttled connection, not just a resized browser window. Tap targets, form field sizing and how much scrolling it takes to reach the CTA all behave differently than they do on desktop.",
      },
      {
        type: "paragraph",
        text: "Run the list, fix what fails, and ship. The pages that convert well are rarely clever — they're just clear about the one thing they're asking the visitor to do.",
      },
    ],
    relatedArtworkIds: ["prj-financial-advisor-funnel", "prj-electrician-funnel"],
    relatedPostIds: ["blog-crm-funnel-fit", "blog-custom-app-signals"],
  },
  {
    id: "blog-custom-app-signals",
    slug: "signs-your-business-is-ready-for-a-custom-built-app",
    title: "5 signs your business is ready for a custom-built app",
    dek: "Off-the-shelf software gets most teams surprisingly far. Here's how to tell when it's actually holding you back.",
    author: "GitzTech",
    authorRole: "Full-Stack Team",
    date: "2026-08-03",
    displayDate: "3 August 2026",
    readingTime: "5 min read",
    category: "Product Strategy",
    seed: "blog-custom-app-03",
    palette: { from: "#7BA3D6", via: "#3A5F8F", to: "#0D1E33", ink: 0.16 },
    blocks: [
      {
        type: "paragraph",
        lead: true,
        text: "\"Should we build this ourselves?\" is a question worth asking rarely, and answering carefully — a custom build is a real commitment, and most businesses are better served by existing software for longer than they expect.",
      },
      {
        type: "paragraph",
        text: "That said, there's a point where off-the-shelf tools start costing more in workarounds than a custom build would cost outright. These are the signals that tend to show up right before that point.",
      },
      { type: "heading", text: "1. Your team maintains a spreadsheet that should be a database" },
      {
        type: "paragraph",
        text: "If a spreadsheet has become a shared source of truth that multiple people edit, reconcile and copy between tools, you already have the data model for an application — you're just running it manually, with all the version-conflict risk that implies.",
      },
      { type: "heading", text: "2. You're stitching three tools together with Zapier and hope" },
      {
        type: "paragraph",
        text: "A couple of integrations are normal. A brittle chain of automations that breaks every time one vendor changes their API is a sign the workflow has outgrown general-purpose tools and needs something built for exactly what you do.",
      },
      {
        type: "image",
        artworkId: "prj-makflip",
        alt: "Makflip, a multi-vendor marketplace platform built by GitzTech for a business that had outgrown off-the-shelf e-commerce tools.",
      },
      { type: "heading", text: "3. Your product IS the software" },
      {
        type: "paragraph",
        text: "If what you're selling is the platform itself — a marketplace, a booking experience, a member app — then the software isn't back-office tooling, it's the product. That's a strong argument for owning it outright rather than renting someone else's roadmap.",
      },
      { type: "heading", text: "4. You're paying for features you don't use to get the two you need" },
      {
        type: "paragraph",
        text: "SaaS pricing scales with the whole feature set, not your usage of it. When a growing seat count is mostly paying for capability you'll never touch, the economics start to favour a build sized to what you actually do.",
      },
      { type: "heading", text: "5. \"Can the software do X?\" is now a business constraint" },
      {
        type: "pullquote",
        text: "The clearest signal isn't cost. It's when the roadmap of a tool you don't control starts setting the roadmap for your business.",
        cite: "GitzTech engineering",
      },
      {
        type: "paragraph",
        text: "One or two of these on their own aren't a verdict — most businesses live with some of this permanently, and that's fine. It's when several stack up together that it's worth scoping what a purpose-built platform would actually cost, and comparing that to what the workarounds are already costing you.",
      },
    ],
    relatedArtworkIds: ["prj-makflip", "prj-mindway"],
    relatedPostIds: ["blog-crm-funnel-fit"],
  },
];
