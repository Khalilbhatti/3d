import type { Artwork } from "./types";

/**
 * =============================================================================
 *  PORTFOLIO PROJECTS  (rendered through the Artwork model)
 * =============================================================================
 *  End-to-end builds — from complete UI design systems to custom full-stack
 *  development and cloud deployment. Each project generates a deterministic
 *  visual from `seed` + `palette` until a real `image` is supplied.
 *  See docs/ASSET_REPLACEMENT.md.
 *
 *  Field mapping for this site:
 *    medium      → stack / deliverables (first token drives the "stack" filter)
 *    dimensions  → project scope
 *    location    → industry · city (text before "·" drives the industry filter)
 *    period      → engagement type
 */

export const artworks: Artwork[] = [
  {
    id: "prj-mindway",
    slug: "mindway-eap",
    title: "Mindway EAP",
    artistId: "team-fullstack",
    year: "2025",
    medium: "React, React Native, Node.js, Cloud",
    dimensions: "Web platform · iOS & Android apps · admin dashboard",
    location: "Employee Wellness · Australia",
    collectionId: "svc-web",
    period: "Platform Build",
    description:
      "A modern digital Employee Assistance Program for an Australian provider — confidential counselling, a personalised wellbeing app, mindfulness and sleep programs, and leadership training, unified across web and native mobile.",
    historicalContext:
      "Traditional EAPs suffer from low engagement, long waits and dated access, so the support goes unused. We built Mindway as one platform: on-demand booking with Australian counsellors, a React Native app for Android and iOS, wellbeing and mindfulness content, an employer admin dashboard, and secure authentication — so help is easy to reach and people actually use it.",
    orientation: "landscape",
    seed: "prj-mindway-07",
    palette: { from: "#7BA3D6", via: "#3A5F8F", to: "#0D1E33", ink: 0.16 },
    image: "/portfolio/mindway.png",
    imageAspect: "4 / 3",
    imageFit: "contain",
    images: [
      "/portfolio/mindway.png",
      "/portfolio/mindway-services.png",
      "/portfolio/mindway-industries.png",
      "/portfolio/mindway-about.png",
      "/portfolio/mindway-pricing.png",
    ],
    alt: "Mindway EAP — an Australian Employee Assistance Program platform by GitzTech, spanning a web experience and native iOS and Android apps for confidential counselling and workplace wellbeing.",
    liveUrl: "https://mindwayeap.com.au/",
    appUrl: "https://play.google.com/store/apps/details?id=com.appmindway.mindway&hl=en",
    relatedArtworkIds: ["prj-food", "prj-ngo"],
    featured: true,
  },
  {
    id: "prj-beauty",
    slug: "beauty-salon",
    title: "Beauty Salon",
    artistId: "team-wordpress",
    year: "2025",
    medium: "WordPress, WooCommerce, Custom Theme",
    dimensions: "9 pages · online booking · 5 weeks",
    location: "Beauty & Wellness · Lahore",
    collectionId: "svc-wordpress",
    period: "Website Build",
    description:
      "A booking-first website for a multi-branch salon: treatment menus, stylist profiles, and an appointment flow that fills quiet hours instead of leaving the phone ringing.",
    historicalContext:
      "The old site was a page-builder template that took eleven seconds to load on mobile. We rebuilt it as a custom theme with a native booking flow — pages now load in under two seconds and online bookings became the salon's largest source of new clients.",
    orientation: "landscape",
    seed: "prj-beauty-01",
    palette: { from: "#FFAE6B", via: "#B3591A", to: "#2E1505", ink: 0.16 },
    image: "/portfolio/beauty-salon.jpg",
    alt: "Beauty Salon website project by GitzTech — a booking-first WordPress build for a beauty and wellness brand.",
    relatedArtworkIds: ["prj-stitcher", "prj-crafting"],
    featured: true,
  },
  {
    id: "prj-crafting",
    slug: "crafting-studio",
    title: "Crafting Studio",
    artistId: "team-marketers",
    year: "2025",
    medium: "SEO, Paid Social, Email Automation",
    dimensions: "6-month growth programme · 4 channels",
    location: "Arts & Crafts E-Commerce · Lahore",
    collectionId: "svc-marketing",
    period: "Growth Campaign",
    description:
      "A full-funnel growth programme for an arts and crafts store — search, paid social, and lifecycle email working as one system rather than three disconnected budgets.",
    historicalContext:
      "We rebuilt the campaign around contribution margin instead of raw traffic: tightened targeting, rewrote the landing pages, and added abandoned-cart and post-purchase flows. Cost per acquisition fell while repeat-order revenue grew.",
    orientation: "landscape",
    seed: "prj-crafting-02",
    palette: { from: "#FF9807", via: "#B35F00", to: "#2A1500", ink: 0.16 },
    image: "/portfolio/crafting-studio.jpg",
    alt: "Crafting Studio project by GitzTech — a full-funnel digital marketing programme for an arts and crafts e-commerce brand.",
    relatedArtworkIds: ["prj-beauty", "prj-wholesale"],
    featured: true,
  },
  {
    id: "prj-food",
    slug: "food-supply-co",
    title: "Food Supply Co.",
    artistId: "team-fullstack",
    year: "2025",
    medium: "Next.js, Node.js, PostgreSQL",
    dimensions: "Web app + admin portal · 12 weeks",
    location: "Food Supply Chain · Lahore",
    collectionId: "svc-web",
    period: "Custom Platform",
    description:
      "A custom ordering and logistics platform for a food distributor: live inventory, route-aware delivery windows, and an admin portal the operations team runs the day from.",
    historicalContext:
      "Orders were arriving by phone and WhatsApp and being re-keyed into spreadsheets. We replaced that with a single system — role-based accounts, real-time stock, and automated order confirmations — removing the manual re-entry step entirely.",
    orientation: "landscape",
    seed: "prj-food-03",
    palette: { from: "#2E5C99", via: "#1B3A63", to: "#0B1F3D", ink: 0.18 },
    image: "/portfolio/food-supply-co.jpg",
    alt: "Food Supply Co. project by GitzTech — a custom full-stack ordering and logistics platform for a food supply chain business.",
    relatedArtworkIds: ["prj-wholesale", "prj-ngo"],
    featured: true,
  },
  {
    id: "prj-ngo",
    slug: "ngo-foundation",
    title: "NGO Foundation",
    artistId: "team-uiux",
    year: "2024",
    medium: "UI/UX Research, Design System, Prototyping",
    dimensions: "Donation journey · 3 rounds of testing",
    location: "Non-Profit · Lahore",
    collectionId: "svc-uiux",
    period: "Product Design",
    description:
      "A research-led redesign of a foundation's donation and programme pages — built around how first-time donors actually decide, not around the internal org chart.",
    historicalContext:
      "Testing showed donors abandoning at the amount-selection step because the impact of each tier was unclear. Re-sequencing the journey and making impact concrete at the point of choice lifted completion on the donation flow.",
    orientation: "landscape",
    seed: "prj-ngo-04",
    palette: { from: "#FFC157", via: "#D98A1F", to: "#331F05", ink: 0.16 },
    image: "/portfolio/ngo-foundation.jpg",
    alt: "NGO Foundation project by GitzTech — a research-led UI/UX redesign of a non-profit's donation journey.",
    relatedArtworkIds: ["prj-stitcher", "prj-food"],
    featured: true,
  },
  {
    id: "prj-stitcher",
    slug: "stitcher",
    title: "Stitcher",
    artistId: "team-uiux",
    year: "2024",
    medium: "Brand Identity, Logo System, Social Creative",
    dimensions: "Full identity · print + digital kit",
    location: "Fashion & Tailoring · Lahore",
    collectionId: "svc-graphic",
    period: "Brand Identity",
    description:
      "A complete brand identity for a bespoke tailoring house — a mark, type system and creative kit that reads as precise and made-to-measure across every touchpoint.",
    historicalContext:
      "The business had grown through word of mouth with no consistent visual language. We built the identity from its positioning — craft and precision — and delivered templates the team runs themselves for social, packaging and print.",
    orientation: "landscape",
    seed: "prj-stitcher-05",
    palette: { from: "#8FA9D6", via: "#3D5580", to: "#101B30", ink: 0.16 },
    image: "/portfolio/stitcher.jpg",
    alt: "Stitcher project by GitzTech — a complete brand identity and creative system for a fashion and tailoring house.",
    relatedArtworkIds: ["prj-beauty", "prj-ngo"],
    featured: true,
  },
  {
    id: "prj-wholesale",
    slug: "wholesale-hub",
    title: "Wholesale Hub",
    artistId: "team-ghl",
    year: "2025",
    medium: "GoHighLevel, WhatsApp API, SMS Automation",
    dimensions: "8 funnels · full automation suite",
    location: "Wholesale & B2B · Lahore",
    collectionId: "svc-ghl",
    period: "CRM & Automation",
    description:
      "A GoHighLevel build for a B2B wholesaler: pipelines that match how their reps actually sell, plus WhatsApp and SMS automation that works every lead the moment it lands.",
    historicalContext:
      "Enquiries were being lost between the website form and the sales team's inboxes. We wired a single pipeline with automated follow-up, appointment booking and a WhatsApp chatbot that qualifies leads around the clock — no enquiry now goes unanswered.",
    orientation: "landscape",
    seed: "prj-wholesale-06",
    palette: { from: "#FFB347", via: "#C97A1A", to: "#2E1B05", ink: 0.18 },
    image: "/portfolio/wholesale-hub.jpg",
    alt: "Wholesale Hub project by GitzTech — a GoHighLevel CRM, funnel and WhatsApp automation build for a wholesale B2B business.",
    relatedArtworkIds: ["prj-food", "prj-crafting"],
    featured: true,
  },
];
