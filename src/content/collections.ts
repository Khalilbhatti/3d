import type { Collection } from "./types";

/**
 * =============================================================================
 *  SERVICES  (rendered through the Collection model)
 * =============================================================================
 *  The six disciplines GitzTech delivers. Each service links to the projects
 *  that showcase it, the team that runs it, and the guides that explain it.
 */
export const collections: Collection[] = [
  {
    id: "svc-web",
    slug: "web-app-development",
    title: "Web & App Development",
    subtitle: "Custom builds engineered for speed, scale and conversions",
    period: "Web & Apps",
    curator: "Full-Stack Team",
    summary:
      "Custom websites and mobile apps engineered for speed, scale, and conversions — built around your exact business goals.",
    intro:
      "Our web and app development services create innovative, user-friendly solutions tailored to meet your business needs and drive engagement. From the first architecture call to production launch, we own every layer of the stack.",
    statement: [
      "We start with your business goals, not a template. Every build begins with a technical discovery — user journeys, integrations, data model, and the performance budget the site has to hit before we write a line of code.",
      "The stack is chosen to fit the job: modern frameworks for interactive products, server-rendered pages where SEO and speed matter, and clean, documented APIs so your team is never locked in.",
      "Everything ships responsive, accessible, SEO-optimised and speed-optimised, with analytics wired in from day one so you can see exactly what the build is doing for the business.",
    ],
    seed: "svc-web-01",
    palette: { from: "#2E5C99", via: "#1B3A63", to: "#0B1F3D", ink: 0.18 },
    image: "/portfolio/mindway.png",
    featuredArtistIds: ["team-fullstack", "team-qa"],
    artworkIds: [
      "prj-mindway",
      "prj-makflip",
      "prj-maximalt",
      "prj-food",
      "prj-b2b-leadgen",
      "prj-website-rag",
      "prj-social-content-engine",
      "prj-ecommerce-assistant",
      "prj-recruitment-screening",
      "prj-whatsapp-assistant",
      "prj-voice-receptionist",
      "prj-video-content-factory",
    ],
    relatedStoryIds: ["story-web-performance"],
    timelineIds: ["tl-ideas", "tl-design", "tl-final"],
    credits: [
      { role: "Discipline lead", name: "Full-Stack Developers" },
      { role: "Quality assurance", name: "QA & Project Managers" },
    ],
  },
  {
    id: "svc-marketing",
    slug: "digital-marketing",
    title: "Digital Marketing",
    subtitle: "Data-driven campaigns that grow traffic, leads and revenue",
    period: "Growth",
    curator: "Growth Team",
    summary:
      "Data-driven SEO, paid ads, social and email campaigns that grow your traffic, leads and revenue — measurably.",
    intro:
      "Our digital marketing services boost brand visibility and drive engagement through strategic online campaigns tailored to your target audience — with every rupee tracked back to pipeline.",
    statement: [
      "We build campaigns around a single question: what does a customer cost, and what are they worth? Channel mix, creative and budget all follow from that answer.",
      "SEO, paid search and social, email sequences and landing pages are run as one system, so traffic lands somewhere designed to convert rather than on a generic homepage.",
      "You get transparent reporting — spend, leads, cost per acquisition and revenue attribution — reviewed with you, not buried in a dashboard nobody opens.",
    ],
    seed: "svc-mkt-02",
    palette: { from: "#FF9807", via: "#B35F00", to: "#2A1500", ink: 0.16 },
    image: "/services/digital-marketing.jpg",
    featuredArtistIds: ["team-marketers"],
    artworkIds: ["prj-crafting"],
    relatedStoryIds: ["story-web-performance"],
    timelineIds: ["tl-ideas", "tl-final"],
    credits: [{ role: "Discipline lead", name: "Digital Marketers" }],
  },
  {
    id: "svc-wordpress",
    slug: "wordpress-development",
    title: "WordPress Development",
    subtitle: "Custom themes, plugins and WooCommerce stores",
    period: "WordPress",
    curator: "WordPress Team",
    summary:
      "Custom WordPress websites, themes, plugins and WooCommerce stores — built fast, ranked higher and easy for your team to manage.",
    intro:
      "Our WordPress development services build customizable, responsive websites that enhance user experience and drive business growth — without the bloat that makes most WordPress sites slow.",
    statement: [
      "We build custom themes rather than stacking page builders on top of each other. That means faster pages, cleaner markup and a site your team can actually edit without breaking the layout.",
      "Where you need functionality that doesn't exist, we write the plugin — properly scoped, documented, and maintained so it survives the next core release.",
      "WooCommerce stores are built for the full journey: catalogue, checkout, payments, shipping rules, and the analytics to see where orders are being lost.",
    ],
    seed: "svc-wp-03",
    palette: { from: "#4A78B8", via: "#2A4A73", to: "#0D1E33", ink: 0.16 },
    image: "/services/wordpress-development.jpg",
    featuredArtistIds: ["team-wordpress"],
    artworkIds: [],
    relatedStoryIds: ["story-wordpress-benefits"],
    timelineIds: ["tl-design", "tl-final"],
    credits: [{ role: "Discipline lead", name: "WordPress Developers" }],
  },
  {
    id: "svc-ghl",
    slug: "gohighlevel-crm",
    title: "GoHighLevel CRM",
    subtitle: "Funnels, automation, WhatsApp API and SMS marketing",
    period: "CRM & Automation",
    curator: "CRM Team",
    summary:
      "Expert GoHighLevel setup, funnels, automation, WhatsApp API and SMS marketing to streamline and scale your business.",
    intro:
      "Transform your business with our expert GoHighLevel CRM setup and management. Streamline your marketing, automate workflows, and grow your revenue — with follow-up that never gets forgotten.",
    statement: [
      "We set up and manage your GoHighLevel account with proven, battle-tested workflows: pipelines that match how you actually sell, and stages that tell you where a deal really is.",
      "High-converting funnels feed automated nurture — email campaigns, SMS sequences, appointment booking flows and reminders — so leads are worked the moment they arrive.",
      "We integrate the WhatsApp Business API and deploy chatbots that qualify leads 24/7, connect third-party tools and APIs, and hand you reporting dashboards you can read at a glance.",
    ],
    seed: "svc-ghl-04",
    palette: { from: "#FFB347", via: "#C97A1A", to: "#2E1B05", ink: 0.18 },
    image: "/services/gohighlevel-crm.jpg",
    featuredArtistIds: ["team-ghl"],
    artworkIds: [
      "prj-wholesale",
      "prj-saas-funnel",
      "prj-realestate-funnel",
      "prj-travel-funnel",
      "prj-financial-advisor-funnel",
      "prj-medical-funnel",
      "prj-dentist-funnel",
      "prj-construction-funnel",
      "prj-electrician-funnel",
      "prj-salon-funnel",
    ],
    relatedStoryIds: ["story-ghl-automation"],
    timelineIds: ["tl-ideas", "tl-design", "tl-final"],
    credits: [{ role: "Discipline lead", name: "GoHighLevel & CRM Specialists" }],
  },
  {
    id: "svc-graphic",
    slug: "graphic-designing",
    title: "Graphic Designing",
    subtitle: "Brand identities, logos and marketing collateral",
    period: "Brand & Design",
    curator: "Design Team",
    summary:
      "Brand identities, logos, social creatives, and marketing collateral designed to make your brand impossible to ignore.",
    intro:
      "Our graphic design services create visually compelling and innovative designs that effectively communicate your brand's message — consistently, across every place your customers meet you.",
    statement: [
      "Identity work starts with positioning: who you're for and why you're different. The logo, palette and type system come after that, so the brand means something rather than just looking current.",
      "You get a usable system, not a single file — logo variants, colour and type rules, and templates your team can run with for social, ads and print.",
      "Every asset is delivered production-ready: correct formats, print-ready files, and social creatives sized per platform.",
    ],
    seed: "svc-gfx-05",
    palette: { from: "#6B8FC4", via: "#33547F", to: "#101F33", ink: 0.16 },
    image: "/services/graphic-designing.jpg",
    featuredArtistIds: ["team-uiux"],
    artworkIds: [],
    relatedStoryIds: ["story-design-systems"],
    timelineIds: ["tl-design"],
    credits: [{ role: "Discipline lead", name: "UI/UX Designers" }],
  },
  {
    id: "svc-uiux",
    slug: "ui-ux-designing",
    title: "UI/UX Designing",
    subtitle: "Research-led interfaces people love to use",
    period: "Product Design",
    curator: "Product Design Team",
    summary:
      "Research-led UI/UX design that turns user insight into intuitive, accessible interfaces people love to use.",
    intro:
      "Our UI/UX designing services focus on creating intuitive and engaging interfaces that enhance user satisfaction and drive seamless interactions — grounded in how your users actually behave.",
    statement: [
      "We design from evidence: user flows, competitor teardowns and real session behaviour, so decisions are argued from insight rather than taste.",
      "Wireframes and prototypes get tested before anything is built. Fixing a flow in a prototype costs hours; fixing it after launch costs weeks.",
      "Final interfaces ship as a documented design system — components, states, spacing and accessibility rules — so the build matches the design and stays consistent as you grow.",
    ],
    seed: "svc-ux-06",
    palette: { from: "#FFC157", via: "#D98A1F", to: "#331F05", ink: 0.16 },
    image: "/services/ui-ux-designing.jpg",
    featuredArtistIds: ["team-uiux", "team-qa"],
    artworkIds: ["prj-chayah", "prj-thornton", "prj-parko", "prj-mockups"],
    relatedStoryIds: ["story-design-systems"],
    timelineIds: ["tl-design", "tl-final"],
    credits: [
      { role: "Discipline lead", name: "UI/UX Designers" },
      { role: "Testing", name: "QA & Project Managers" },
    ],
  },
];
