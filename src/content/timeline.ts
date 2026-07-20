import type { TimelineEntry } from "./types";

/**
 * =============================================================================
 *  OUR DEVELOPMENT PROCESS  (rendered through the TimelineEntry model)
 * =============================================================================
 *  The structured process we use to deliver high-quality products and services,
 *  from first idea through launch and ongoing growth.
 */
export const timeline: TimelineEntry[] = [
  {
    id: "tl-ideas",
    year: "Step 01",
    title: "Generate ideas",
    body:
      "We map the problem before proposing anything. Discovery covers your goals, the users you serve, the systems you already run and the support your business actually needs — including comprehensive IT support and management considerations such as network and infrastructure monitoring.",
    location: "Discovery & scoping",
  },
  {
    id: "tl-design",
    year: "Step 02",
    title: "Design & prototyping",
    body:
      "Design and prototyping are critical phases in our development process, ensuring the final product meets expectations. Wireframes and clickable prototypes get reviewed and tested before a line of production code is written.",
    location: "Design & validation",
    collectionId: "svc-uiux",
  },
  {
    id: "tl-build",
    year: "Step 03",
    title: "Build & integrate",
    body:
      "Engineering begins against an agreed spec: the data model, the integrations, and the performance budget the product has to hit. You get progress you can see, not a black box that reappears at the deadline.",
    location: "Development",
    collectionId: "svc-web",
  },
  {
    id: "tl-final",
    year: "Step 04",
    title: "Final solution",
    body:
      "Creating a new IT product requires a comprehensive approach that encompasses idea generation and flawless delivery. Everything is tested across browsers and devices, checked for speed, SEO and accessibility, then signed off with you.",
    location: "Testing & sign-off",
  },
  {
    id: "tl-launch",
    year: "Step 05",
    title: "Launch & handover",
    body:
      "We deploy, wire up analytics, and hand over full ownership — repository, accounts and documentation — plus a walkthrough so your team can run the thing confidently from day one.",
    location: "Deployment & training",
  },
  {
    id: "tl-support",
    year: "Step 06",
    title: "Support & growth",
    body:
      "Launch is the start, not the finish. We stay on as a transparent extension of your team — monitoring, iterating and scaling the build as the business grows.",
    location: "Ongoing partnership",
    collectionId: "svc-marketing",
  },
];
