import type { Artist } from "./types";

/**
 * =============================================================================
 *  THE TEAM  (rendered through the Artist model)
 * =============================================================================
 *  The people behind your project. GitzTech works as one connected unit —
 *  developers, designers, marketers and CRM specialists sharing one mindset.
 *
 *  Field mapping for this site:
 *    name        → discipline / team name
 *    role        → what they own
 *    lifespan    → experience line shown under the name
 *    mediums     → core skills and tools
 */
export const artists: Artist[] = [
  {
    id: "lead-developer",
    slug: "lead-developer",
    name: "Lead Developer",
    role: "Sets the technical direction",
    lifespan: "10+ years · architecture & code quality",
    origin: "GHS Lahore, Pakistan",
    activePeriod: "Leads every build",
    mediums: ["System Architecture", "Code Review", "Next.js", "APIs", "Performance"],
    summary:
      "Owns the technical direction of every project — the architecture, the code standard, and the calls that keep a build fast and maintainable.",
    bio: [
      "Every project's architecture crosses this desk first: the data model, the integrations, and the performance budget the product has to hit before a line of code is written.",
      "Sets and enforces the code standard through review, so what ships is documented, tested, and something the next engineer can pick up without a handover.",
      "Stays hands-on — the hardest parts of a build are where the lead is, not in a meeting about them.",
    ],
    statement:
      "The job of a lead isn't to write the most code. It's to make sure the code that ships is code we'd sign our name to.",
    seed: "lead-developer-01",
    palette: { from: "#5B6EE8", via: "#2E3A8C", to: "#0D1230", ink: 0.18 },
    relatedArtworkIds: ["prj-food"],
  },
  {
    id: "team-lead",
    slug: "team-lead",
    name: "Team Lead",
    role: "Keeps delivery on track",
    lifespan: "7+ years · coordination & delivery",
    origin: "GHS Lahore, Pakistan",
    activePeriod: "Runs day-to-day delivery",
    mediums: ["Sprint Planning", "Client Communication", "Estimation", "QA Coordination", "Delivery"],
    summary:
      "Runs the day-to-day: turns scope into a plan, keeps the team unblocked, and makes sure what was promised is what gets delivered — on time.",
    bio: [
      "Translates a signed scope into a working plan — milestones, owners and realistic dates — then keeps the team moving against it.",
      "Sits between you and the build: one point of contact who knows exactly what stage the project is at and what's needed to keep it moving.",
      "When something slips, you hear it early with a recovery plan, not a surprise at the deadline.",
    ],
    statement:
      "A deadline nobody flagged as at-risk isn't a deadline — it's a surprise waiting to happen.",
    seed: "team-lead-02",
    palette: { from: "#2E7BE8", via: "#1A4A9C", to: "#08172E", ink: 0.18 },
    relatedArtworkIds: ["prj-ngo"],
  },
  {
    id: "dev-department-head",
    slug: "development-department-head",
    name: "Development Department Head",
    role: "Runs engineering, end to end",
    lifespan: "12+ years · engineering leadership",
    origin: "GHS Lahore, Pakistan",
    activePeriod: "Heads the development department",
    mediums: ["Engineering Strategy", "Hiring & Mentoring", "Tech Standards", "Delivery", "Architecture"],
    summary:
      "Heads the whole development department — the standards, the stack decisions, and the people — so every team ships to the same bar.",
    bio: [
      "Owns how the department builds: the stack it standardises on, the review culture, and the practices that keep quality consistent across every team.",
      "Makes the build-versus-buy and technology calls that outlast any single project, and keeps the team's skills current as the tooling moves.",
      "Accountable for delivery across the department — not just that projects ship, but that they ship maintainable.",
    ],
    statement:
      "You can't inspect quality in at the end. You build the department that produces it by default.",
    seed: "dev-department-head-03",
    palette: { from: "#2FA6BF", via: "#145E70", to: "#05212A", ink: 0.16 },
    relatedArtworkIds: ["prj-food", "prj-beauty"],
  },
  {
    id: "automation-crm-head",
    slug: "automation-crm-department-head",
    name: "Automation & CRM Department Head",
    role: "Heads automation & CRM",
    lifespan: "9+ years · funnels, pipelines & AI",
    origin: "GHS Lahore, Pakistan",
    activePeriod: "Heads the automation & CRM department",
    mediums: ["GoHighLevel", "Marketing Automation", "CRM Architecture", "WhatsApp API", "Integrations"],
    summary:
      "Leads the automation and CRM department — the funnels, pipelines and integrations that turn a lead into a booked, followed-up, closed customer.",
    bio: [
      "Owns how clients' sales and marketing operations get automated: CRM structure, pipeline design, and the nurture sequences that work every lead the moment it lands.",
      "Sets the department's playbooks for GoHighLevel, WhatsApp API and third-party integrations, so what's built for one client is repeatable for the next.",
      "Measures the department on outcomes clients feel — faster follow-up, higher conversion, fewer leads going cold.",
    ],
    statement:
      "Most businesses don't have a lead problem. They have a follow-up problem — and that's an automation problem we can fix.",
    seed: "automation-crm-head-04",
    palette: { from: "#4AA0E8", via: "#235C9C", to: "#071A2E", ink: 0.18 },
    relatedArtworkIds: ["prj-wholesale"],
  },
  {
    id: "team-fullstack",
    slug: "full-stack-developers",
    name: "Full-Stack Developers",
    role: "Engineering & architecture",
    lifespan: "6+ years · 200+ projects delivered",
    origin: "GHS Lahore, Pakistan",
    activePeriod: "Available for new projects",
    mediums: ["Next.js", "React", "Node.js", "PostgreSQL", "Cloud Deployment"],
    summary:
      "They engineer fast, scalable, and secure web and mobile applications tailored precisely to your business needs.",
    bio: [
      "Our full-stack engineers own the whole build — data model, API, interface and deployment — so nothing falls between front end and back end.",
      "Every project starts with a technical discovery: the integrations you need, the load you expect, and the performance budget the product has to hit. Architecture decisions follow from that, not from whichever framework is trending.",
      "Code ships documented and tested, on infrastructure your team can actually operate. You keep full ownership of the repository and the accounts it runs on.",
    ],
    statement:
      "A build is only finished when someone other than the person who wrote it can run it, read it and extend it.",
    seed: "team-fullstack-01",
    palette: { from: "#3E6BE8", via: "#24408F", to: "#0E1633", ink: 0.18 },
    relatedArtworkIds: ["prj-food"],
  },
  {
    id: "team-uiux",
    slug: "ui-ux-designers",
    name: "UI/UX Designers",
    role: "Research, interface & brand",
    lifespan: "5+ years · research-led practice",
    origin: "GHS Lahore, Pakistan",
    activePeriod: "Available for new projects",
    mediums: ["User Research", "Wireframing", "Prototyping", "Design Systems", "Brand Identity"],
    summary:
      "They craft intuitive, beautiful interfaces that delight users and turn first-time visitors into loyal customers.",
    bio: [
      "Design here starts with evidence — user flows, competitor teardowns and real session behaviour — so interface decisions can be argued from insight rather than taste.",
      "Wireframes and prototypes are tested before anything is built. Fixing a flow in a prototype costs hours; fixing it after launch costs weeks.",
      "The team also handles brand work: identities, logo systems and creative kits, delivered as documented systems your team can run without breaking consistency.",
    ],
    statement:
      "If a user has to be taught how to use the screen, the screen is the thing that needs changing.",
    seed: "team-uiux-02",
    palette: { from: "#34D399", via: "#146848", to: "#052117", ink: 0.16 },
    relatedArtworkIds: ["prj-ngo", "prj-stitcher"],
  },
  {
    id: "team-marketers",
    slug: "digital-marketers",
    name: "Digital Marketers",
    role: "Demand & growth",
    lifespan: "8+ years · full-funnel campaigns",
    origin: "GHS Lahore, Pakistan",
    activePeriod: "Available for new projects",
    mediums: ["SEO", "Paid Ads", "Social", "Email Automation", "Analytics"],
    summary:
      "They build data-driven campaigns that grow brand visibility, drive engagement, and deliver measurable ROI.",
    bio: [
      "Campaigns are built around unit economics: what a customer costs to acquire and what they're worth once they arrive. Channel mix and budget follow from that answer.",
      "Search, paid social, email and landing pages are run as one system, so traffic lands somewhere designed to convert instead of on a generic homepage.",
      "Reporting is plain: spend, leads, cost per acquisition and revenue attribution — reviewed with you rather than buried in a dashboard nobody opens.",
    ],
    statement:
      "Traffic that doesn't convert isn't marketing — it's just an expensive way to be visited.",
    seed: "team-marketers-03",
    palette: { from: "#F0913A", via: "#9C4E17", to: "#2A1305", ink: 0.16 },
    relatedArtworkIds: ["prj-crafting"],
  },
  {
    id: "team-wordpress",
    slug: "wordpress-developers",
    name: "WordPress Developers",
    role: "Themes, plugins & WooCommerce",
    lifespan: "11+ years · custom builds, no bloat",
    origin: "GHS Lahore, Pakistan",
    activePeriod: "Available for new projects",
    mediums: ["Custom Themes", "Plugin Development", "WooCommerce", "Core Web Vitals", "SEO"],
    summary:
      "They build customizable, responsive WordPress sites with the speed, SEO, and flexibility your business demands.",
    bio: [
      "We build custom themes rather than stacking page builders on top of each other — which is why our WordPress sites load fast and stay editable.",
      "Where the functionality doesn't exist, the team writes the plugin: properly scoped, documented, and maintained so it survives the next core release.",
      "WooCommerce work covers the full journey — catalogue, checkout, payments, shipping rules — plus the analytics to show where orders are being lost.",
    ],
    statement:
      "Most slow WordPress sites aren't a hosting problem. They're a build problem.",
    seed: "team-wordpress-04",
    palette: { from: "#2FBFA8", via: "#146458", to: "#04211C", ink: 0.16 },
    relatedArtworkIds: ["prj-beauty"],
  },
  {
    id: "team-ghl",
    slug: "gohighlevel-specialists",
    name: "GoHighLevel & CRM Specialists",
    role: "Funnels, pipelines & automation",
    lifespan: "3+ years · battle-tested workflows",
    origin: "GHS Lahore, Pakistan",
    activePeriod: "Available for new projects",
    mediums: ["GoHighLevel", "Sales Funnels", "WhatsApp API", "SMS Marketing", "API Integration"],
    summary:
      "They set up funnels, automations, and pipelines that streamline client management and accelerate your growth.",
    bio: [
      "The team configures GoHighLevel around how you actually sell — pipelines and stages that tell you where a deal really is, not a generic template.",
      "High-converting funnels feed automated nurture: email campaigns, SMS sequences, appointment booking and reminders, so every lead is worked the moment it arrives.",
      "They integrate the WhatsApp Business API and deploy chatbots that qualify leads 24/7, connect third-party tools, and build reporting dashboards you can read at a glance.",
    ],
    statement:
      "A pipeline that can't tell you where a deal stands isn't a CRM — it's a spreadsheet with better colours.",
    seed: "team-ghl-05",
    palette: { from: "#8B5CF6", via: "#4A278C", to: "#150B2B", ink: 0.18 },
    relatedArtworkIds: ["prj-wholesale"],
  },
  {
    id: "team-qa",
    slug: "qa-project-managers",
    name: "QA & Project Managers",
    role: "Delivery & quality",
    lifespan: "4+ years · on-time, tested delivery",
    origin: "GHS Lahore, Pakistan",
    activePeriod: "Available for new projects",
    mediums: ["Test Planning", "Cross-Browser QA", "Accessibility", "Release Management", "Reporting"],
    summary:
      "They keep every project on track and rigorously tested, ensuring flawless delivery and a smooth experience start to finish.",
    bio: [
      "Every project has a named manager. You always know what stage you're at, what's next, and what we need from you to keep moving.",
      "Builds are tested across browsers, devices and screen sizes before release, with accessibility and performance checks treated as requirements rather than nice-to-haves.",
      "Clear timelines and honest communication are the standard — if something slips, you hear it from us early, with the plan to recover it.",
    ],
    statement:
      "Clear timelines and honest communication, so you always know exactly where your project stands.",
    seed: "team-qa-06",
    palette: { from: "#D6A24A", via: "#8A5F1C", to: "#241705", ink: 0.16 },
    relatedArtworkIds: ["prj-food", "prj-ngo"],
  },
];
