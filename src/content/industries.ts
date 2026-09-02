import type { Industry } from "./types";

/**
 * =============================================================================
 *  INDUSTRIES
 * =============================================================================
 *  Six verticals GitzTech has shipped real work for. Each entry's evidence
 *  links to an actual delivered project (src/content/artworks.ts) — this page
 *  exists to show pattern-matched proof, not to claim coverage of every
 *  industry in general.
 */
export const industries: Industry[] = [
  {
    id: "healthcare",
    name: "Healthcare",
    summary: "Patient-focused funnels and CRM automation for clinics, dentists and medical practices.",
    body: "Patient acquisition funnels built around service information, team presentation and straightforward appointment booking — delivered for general medical practices and dental clinics specifically, not adapted from an unrelated template.",
    evidenceArtworkIds: ["prj-medical-funnel", "prj-dentist-funnel"],
    relatedServiceSlugs: ["gohighlevel-crm"],
  },
  {
    id: "real-estate",
    name: "Real Estate",
    summary: "Property-led lead generation and viewing-booking funnels for agents and brokerages.",
    body: "A property showcase and appointment funnel built for agents, brokerages, property managers and investors — combining listing presentation with lead capture and viewing bookings in one flow.",
    evidenceArtworkIds: ["prj-realestate-funnel"],
    relatedServiceSlugs: ["gohighlevel-crm"],
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    summary: "Custom storefronts, marketplaces and ordering platforms built to convert.",
    body: "From a multi-vendor marketplace with dedicated customer, vendor and admin experiences (Makflip) to a custom ordering and logistics platform that replaced phone-and-WhatsApp order-taking with a single system (Food Supply Co.).",
    evidenceArtworkIds: ["prj-makflip", "prj-food"],
    relatedServiceSlugs: ["web-app-development"],
  },
  {
    id: "professional-services",
    name: "Professional Services",
    summary: "Trust-first funnels for financial advisors, contractors and specialist trades.",
    body: "Credibility-led lead generation for businesses that sell expertise and trust as much as a service — financial advisors, contractors, electricians and salons — each funnel built around that trade's actual buying questions, not a generic template.",
    evidenceArtworkIds: [
      "prj-financial-advisor-funnel",
      "prj-construction-funnel",
      "prj-electrician-funnel",
      "prj-salon-funnel",
    ],
    relatedServiceSlugs: ["gohighlevel-crm"],
  },
  {
    id: "b2b",
    name: "B2B",
    summary: "Outbound engines and wholesale automation that keep every enquiry answered.",
    body: "A GoHighLevel pipeline with automated follow-up and a WhatsApp chatbot that stopped enquiries going unanswered between a website form and a sales inbox (Wholesale Hub), plus a six-workflow AI outbound engine spanning sourcing, enrichment, personalized email and CRM logging (AI B2B Lead Generation).",
    evidenceArtworkIds: ["prj-wholesale", "prj-b2b-leadgen"],
    relatedServiceSlugs: ["web-app-development", "gohighlevel-crm"],
  },
  {
    id: "startups",
    name: "Startups & SaaS",
    summary: "Product-marketing funnels and custom builds for early-stage technology teams.",
    body: "A conversion-focused funnel for SaaS, software and B2B technology products — introducing the product, presenting its capability areas, and repeatedly guiding visitors toward a demo, trial or consultation.",
    evidenceArtworkIds: ["prj-saas-funnel"],
    relatedServiceSlugs: ["web-app-development", "gohighlevel-crm"],
  },
];
