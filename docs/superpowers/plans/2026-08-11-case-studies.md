# Case Studies Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a new "Case Studies" section — a listing page and a full, animated Thornton & Co. detail page — to the GitzTech site, additive to the existing `/portfolio` section.

**Architecture:** A new fixed-shape `CaseStudy` content type (mirroring how `Artwork`/`Collection` already work) holds the entire 53-section Thornton & Co. document as typed data. A new `src/components/case-study/` directory holds ~15 small, focused, reusable section components built entirely from the site's existing Framer Motion primitives (`MReveal`/`Stagger`/`StaggerItem`, `Kicker`, `SectionDivider`, `MetaList`) plus one bespoke React Three Fiber hero (reusing existing `@react-three/fiber`/`three`/`@react-three/drei` dependencies, with the same WebGL→flat-fallback safety pattern `FloatingGalleryHero` already uses). Two new routes (`/case-studies`, `/case-studies/[slug]`) render it; a nav entry and a cross-link from the existing portfolio entry connect it to the rest of the site.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion, React Three Fiber / Three.js / drei (all already dependencies). No new npm packages.

## Global Constraints

- No changes to `/portfolio`, its filters, or the Featured-work selector — this section is additive only.
- Zero new npm dependencies — no Lottie, no new component library.
- No fabricated imagery — screenshot sections use only the 5 real files already in `public/portfolio/` (`thornton-co.png`, `thornton-co-home.png`, `thornton-co-services.png`, `thornton-co-measurements.png`, `thornton-co-booking.png`). Sections the source document describes as needing photography/wireframes/Figma screenshots we don't have render as structured text/diagrams instead.
- The detail page URL is `/case-studies/thornton-co` — same slug as the existing `/portfolio/thornton-co`.
- The WebGL hero must read `matchMedia`/WebGL support directly inside its effect on every invocation — never behind a `resolvedOnceRef`-style "resolved once" gate. (A gated flag caused a real production crash earlier in this project — see the comment in `src/components/home/FloatingGalleryHero.tsx:44-53` — because React Strict Mode's second effect invocation reads a stale closure through the gate. Every invocation must independently compute the current answer.)
- No unit test framework exists in this project. Verification is `npx tsc --noEmit` after every task, plus a dedicated final real-browser check via `gstack:browse` (Task 8).
- `MReveal`/`Stagger`/`StaggerItem` (`src/components/motion/reveal.tsx`) do **not** forward a `style` prop — anything needing a dynamic inline style (e.g. a color swatch's background color) must put that style on a plain child element inside the reveal wrapper, never on the reveal component itself. Anything needing a fixed aspect ratio must use a Tailwind class (`aspect-[4/3]`), not an inline `style={{aspectRatio}}` for the same reason.
- The type scale only defines `text-display-xl`, `text-display-lg`, `text-display-md` (`tailwind.config.ts:32-36`) — there is no `text-display-sm`. Sub-headings within case-study sections use `font-display text-3xl md:text-4xl` instead.

---

### Task 1: `CaseStudy` content type, Thornton & Co. data, and getters

**Files:**
- Modify: `src/content/types.ts` (append the `CaseStudy` interface)
- Create: `src/content/case-studies.ts`
- Modify: `src/content/index.ts` (import, re-export, add `getCaseStudies`/`getCaseStudyBySlug`)

**Interfaces:**
- Produces: `CaseStudy` type, `caseStudies: CaseStudy[]`, `getCaseStudies(): CaseStudy[]`, `getCaseStudyBySlug(slug: string): CaseStudy | undefined` — every later task consumes these exact names.

- [ ] **Step 1: Append the `CaseStudy` interface to `src/content/types.ts`**

Add this at the end of the file:

```ts
/**
 * A long-form case study — richer and more structured than an Artwork
 * catalogue record. One record per deep-dive project write-up. See
 * docs/superpowers/specs/2026-08-11-case-studies-design.md.
 */
export interface CaseStudy {
  id: string;
  slug: string;
  /** References Artwork.id — links back to the matching /portfolio entry. */
  artworkId: string;
  title: string;
  tagline: string;
  eyebrow: string;
  year: string;
  /** Real screenshot paths, reused for both the hero and the full gallery. */
  heroImages: string[];
  liveUrl: string;

  projectDetails: { label: string; value: string }[];

  overview: { heading: string; body: string[] };
  context: { heading: string; body: string[]; keywords: string[] };
  problem: {
    heading: string;
    feelWords: string[];
    remainWords: string[];
    coreQuestion: string;
  };
  objectives: { number: string; title: string; body: string }[];
  userGoals: string[];
  audiences: { name: string; body: string; needs: string[] }[];
  personas: {
    name: string;
    role: string;
    age: string;
    goal: string;
    priorities: string;
    concern: string;
    needs: string[];
  }[];
  painPoints: { problem: string; solution: string }[];
  uxStrategy: { stages: { name: string; body: string }[] };
  sitemap: { label: string; children?: { label: string; children?: { label: string }[] }[] }[];
  userFlows: { title: string; steps: string[] }[];
  contentArchitecture: { section: string; question: string }[];
  visualDirection: { heading: string; body: string; traits: string[] };
  colorPalette: { name: string; hex: string; usage: string }[];
  typography: {
    display: { name: string; uses: string[] };
    interface: { name: string; uses: string[] };
    scale: { name: string; sizes: string }[];
  };
  grid: { device: string; spec: string[] }[];
  spacing: { base: string; scale: number[] };
  imageDirection: {
    categories: { name: string; items: string[] }[];
    treatment: string[];
    ratios: { use: string; ratio: string }[];
  };
  iconography: string[];
  buttonSystem: { primary: string; secondary: string; textLink: string; principles: string[] };
  componentSystem: { core: string[]; states: string[] };
  homepageSections: { title: string; question: string; body: string }[];
  processSteps: { number: string; title: string; body: string }[];
  personalization: { options: string[]; note: string };
  lookbookCategories: string[];
  bookingOptions: { title: string; body: string }[];
  formFlow: string[];
  responsive: { device: string; spec: string[] }[];
  interactionDesign: { microInteractions: string[]; principle: string };
  accessibility: string[];
  conversionStrategy: { primary: string; supporting: string[] };
  conversionPaths: { name: string; steps: string[] }[];
  uxWriting: { focus: string[]; body: string };
  designTokens: { group: string; tokens: string[] }[];
  validation: string[];
  decisions: { number: string; title: string; body: string }[];
  challenges: { challenge: string; response: string }[];
  outcome: string[];
  delivered: { ux: string[]; ui: string[]; prototyping: string[] };
  skills: string[];
  reflection: { heading: string; body: string[] };
}
```

- [ ] **Step 2: Create `src/content/case-studies.ts` with the complete Thornton & Co. record**

```ts
import type { CaseStudy } from "./types";

export const caseStudies: CaseStudy[] = [
  {
    id: "cs-thornton",
    slug: "thornton-co",
    artworkId: "prj-thornton",
    title: "Thornton & Co.",
    tagline: "Tailored for Every Story",
    eyebrow: "UI/UX Case Study — 2026",
    year: "2026",
    heroImages: [
      "/portfolio/thornton-co.png",
      "/portfolio/thornton-co-home.png",
      "/portfolio/thornton-co-services.png",
      "/portfolio/thornton-co-measurements.png",
      "/portfolio/thornton-co-booking.png",
    ],
    liveUrl: "https://stitcher.gitztech.com/",

    projectDetails: [
      { label: "Industry", value: "Luxury Fashion / Bespoke Tailoring" },
      { label: "Project Type", value: "Website UI/UX" },
      { label: "Platform", value: "Responsive Web" },
      { label: "Design Tool", value: "Figma" },
      { label: "Prototype", value: "Figma Sites" },
      { label: "Role", value: "UI/UX Designer" },
      {
        label: "Focus",
        value: "UX Strategy, Information Architecture, Visual Design, Interaction Design, Responsive Design & Conversion UX",
      },
    ],

    overview: {
      heading: "Designing a Digital Experience as Personal as Bespoke Tailoring",
      body: [
        "Thornton & Co. is a premium bespoke tailoring website designed around a simple principle: every garment begins with the individual.",
        "Unlike conventional fashion e-commerce, bespoke tailoring involves consultation, measurements, craftsmanship, fabric selection, fittings, personalization, and a significant level of trust between the client and tailor.",
        "The website needed to do more than showcase beautiful clothing — it needed to explain the service, communicate craftsmanship, establish credibility, help customers understand their options, support both men's and women's tailoring, and guide prospective clients toward booking a fitting. The result is a multi-page experience combining luxury editorial storytelling with practical service-oriented UX.",
      ],
    },

    context: {
      heading: "Translating Traditional Craftsmanship Into a Modern Interface",
      body: [
        "Bespoke tailoring is built around details that cannot be fully communicated through a conventional product catalogue. A client isn't simply choosing a garment — they're choosing a tailor, a fabric, a silhouette, a fit, construction details, buttons, lining, lapels, collars, cuffs, pockets, monograms, and finishing.",
        "The digital product therefore needed to represent the process and experience behind the garment, not just the finished clothing. This became the foundation of the UX strategy.",
      ],
      keywords: ["Precision", "Craftsmanship", "Individuality", "Service"],
    },

    problem: {
      heading: "Luxury Without Complexity",
      feelWords: ["Premium", "Exclusive", "Editorial", "Sophisticated", "Timeless"],
      remainWords: ["Clear", "Accessible", "Informative", "Easy to navigate", "Easy to book"],
      coreQuestion:
        "How might we create a premium tailoring experience that feels exclusive without making the service difficult to understand or access?",
    },

    objectives: [
      { number: "01", title: "Establish Premium Positioning", body: "Create a visual identity capable of positioning Thornton & Co. as a high-end bespoke tailoring house." },
      { number: "02", title: "Generate Fitting Enquiries", body: "Make appointment booking the primary conversion action throughout the website." },
      { number: "03", title: "Communicate the Full Service Range", body: "Present menswear, womenswear, wedding tailoring, formalwear, shirts, and alterations clearly." },
      { number: "04", title: "Educate Potential Clients", body: "Explain measurements, fabrics, customization, fittings, and the bespoke process." },
      { number: "05", title: "Build Trust Before Contact", body: "Use craftsmanship, specialist expertise, process transparency, previous work, and testimonials to reduce uncertainty." },
      { number: "06", title: "Support Long-Term Brand Growth", body: "Develop a scalable design structure that could accommodate additional services, lookbooks, fabrics, FAQs, editorial content, and future functionality." },
    ],

    userGoals: [
      "What does Thornton & Co. offer?",
      "Do they tailor for someone like me?",
      "Do they work with both men and women?",
      "How does bespoke tailoring work?",
      "What can I customize?",
      "Which fabrics are available?",
      "How are measurements taken?",
      "Can I see previous work?",
      "How experienced are the tailors?",
      "How long is the process?",
      "Where is the studio?",
      "Can I speak to someone remotely?",
      "How do I book a fitting?",
    ],

    audiences: [
      { name: "Business Professionals", body: "People looking for premium suits, blazers, shirts, dresses, and professional wardrobes that fit precisely.", needs: ["Professional appearance", "Quality", "Efficient service", "Long-term garments"] },
      { name: "Wedding Clients", body: "Grooms, wedding parties, brides, and clients attending formal occasions.", needs: ["Confidence", "Styling support", "Timeline clarity", "Personalization", "Exceptional fit"] },
      { name: "Women Seeking Specialist Tailoring", body: "Clients looking for fitted blazers, trouser suits, evening gowns, dresses, bridal pieces, outerwear, or alterations.", needs: ["Specialist expertise", "Inclusive service", "Precise fitting", "Clear womenswear representation"] },
      { name: "Luxury Fashion Clients", body: "People who value materials, craft, exclusivity, individuality, and long-term quality.", needs: ["Premium experience", "Material transparency", "Personalization", "Craftsmanship"] },
      { name: "Alteration Clients", body: "People who already own quality garments and need professional resizing, restyling, or alterations.", needs: ["Trust", "Expertise", "Clear service information", "Simple appointment access"] },
    ],

    personas: [
      { name: "James — The Groom", role: "Wedding-day client", age: "34", goal: "Commission a wedding suit", priorities: "Fit, confidence, styling guidance", concern: "Unsure how bespoke tailoring works", needs: ["A clear process", "Wedding-specific services", "Fabric guidance", "Previous work", "Easy fitting booking"] },
      { name: "Amelia — The Professional", role: "Specialist womenswear client", age: "39", goal: "Commission a tailored trouser suit and blazer", priorities: "Precise fit, quality, specialist womenswear expertise", concern: "Many traditional tailoring brands appear heavily male-oriented", needs: ["Prominent women's tailoring", "Relevant imagery", "Clear garment options", "Specialist expertise", "A straightforward consultation route"] },
      { name: "Daniel — The Returning Client", role: "Repeat alterations & shirts client", age: "46", goal: "Alter an existing garment and commission new shirts", priorities: "Convenience, quality, trust", concern: "Wants quick access to the correct service", needs: ["Scannable services", "Direct appointment access", "Clear location information", "Minimal friction"] },
    ],

    painPoints: [
      { problem: "I don't know where to start.", solution: "A simple consultation-first journey." },
      { problem: "I don't understand bespoke tailoring.", solution: "A dedicated four-step process." },
      { problem: "What exactly can I customize?", solution: "A visual personalization section." },
      { problem: "Do you tailor for women?", solution: "Dedicated women's services and prominent homepage representation." },
      { problem: "Can I trust the quality?", solution: "Craftsmanship storytelling, expertise indicators, detailed process, lookbook, and testimonials." },
      { problem: "I want to see the work first.", solution: "Dedicated lookbook and portfolio categories." },
      { problem: "I just want to make an appointment.", solution: "Persistent and repeated Book a Fitting CTA." },
    ],

    uxStrategy: {
      stages: [
        { name: "Discover", body: "Introduce Thornton & Co. and establish its premium positioning." },
        { name: "Understand", body: "Explain services and who they are designed for." },
        { name: "Explore", body: "Allow users to investigate fabrics, customization, previous work, and measurements." },
        { name: "Trust", body: "Reinforce craftsmanship, expertise, process transparency, and client experiences." },
        { name: "Book", body: "Move the visitor toward consultation and fitting." },
      ],
    },

    sitemap: [
      { label: "Home" },
      { label: "Services", children: [{ label: "Bespoke Suits" }, { label: "Wedding & Groom" }, { label: "Shirt Tailoring" }, { label: "Women's Suits & Blazers" }, { label: "Dresses & Formalwear" }, { label: "Alterations" }] },
      { label: "Our Process", children: [{ label: "Consultation" }, { label: "Measurements" }, { label: "Fabric & Style" }, { label: "Fitting & Delivery" }] },
      { label: "Fabrics", children: [{ label: "Fabric Collection" }, { label: "Material Choices" }, { label: "Personalization Options" }] },
      { label: "Lookbook", children: [{ label: "Bespoke Menswear" }, { label: "Women's Tailoring" }, { label: "Wedding Suits" }, { label: "Women's Formalwear" }, { label: "Atelier" }, { label: "Women's Blazers" }] },
      { label: "Measurements", children: [{ label: "Measurement Guide" }, { label: "Fitting Information" }] },
      { label: "About", children: [{ label: "Brand Story" }, { label: "Tailoring Philosophy" }, { label: "Tailoring Specialists" }, { label: "Expertise" }] },
      { label: "Contact", children: [{ label: "Studio Details" }, { label: "Opening Hours" }, { label: "Contact Information" }] },
      { label: "Book a Fitting", children: [{ label: "Fitting Type" }, { label: "Appointment" }, { label: "Client Details" }, { label: "Confirmation" }] },
    ],

    userFlows: [
      { title: "Primary User Flow — Booking a Bespoke Garment", steps: ["Entry", "Homepage", "Explore Services", "Choose Relevant Service", "Understand Tailoring Process", "Explore Fabrics & Customization", "Review Lookbook", "Book a Fitting", "Choose Consultation Type", "Provide Details", "Appointment Confirmation"] },
      { title: "Fast Conversion Flow", steps: ["Homepage", "Book a Fitting", "Select Appointment", "Provide Details", "Confirmation"] },
    ],

    contentArchitecture: [
      { section: "Hero", question: "Who are you?" },
      { section: "Services", question: "What can you make for me?" },
      { section: "Women's Tailoring", question: "Do you specialize in womenswear?" },
      { section: "Craft", question: "Why should I trust your work?" },
      { section: "Process", question: "How does this work?" },
      { section: "Personalization", question: "How much control do I have?" },
      { section: "Lookbook", question: "What does your work look like?" },
      { section: "Testimonial", question: "What was another client's experience?" },
      { section: "Final CTA", question: "How do I begin?" },
    ],

    visualDirection: {
      heading: "Modern British Tailoring Meets Editorial Luxury",
      body: "The visual identity was built around the language of traditional tailoring while avoiding an overly old-fashioned interface. The interface uses restrained color, strong typography, generous negative space, carefully controlled imagery, and clear hierarchy.",
      traits: ["Timeless", "Precise", "Understated", "Editorial", "Warm", "Confident", "Sophisticated", "Human"],
    },

    colorPalette: [
      { name: "Ink", hex: "#191917", usage: "Primary text, dark sections, navigation, premium contrast" },
      { name: "Tailor Charcoal", hex: "#2C2B28", usage: "Secondary dark surfaces, cards, hover states, dark imagery overlays" },
      { name: "Warm Ivory", hex: "#F5F1E9", usage: "Primary background, large content sections, editorial layouts" },
      { name: "Parchment", hex: "#DED5C8", usage: "Secondary surfaces, cards, borders, background variation" },
      { name: "Heritage Brass", hex: "#A18763", usage: "Premium accent, small labels, dividers, selected states, detail highlights" },
      { name: "Muted Stone", hex: "#777168", usage: "Secondary body text, metadata, supporting information" },
      { name: "Pure White", hex: "#FFFFFF", usage: "High contrast, cards, text on dark surfaces" },
    ],

    typography: {
      display: { name: "Cormorant Garamond", uses: ["Hero headlines", "Large section titles", "Editorial statements", "Quotes", "Brand storytelling"] },
      interface: { name: "Inter", uses: ["Navigation", "Buttons", "Body copy", "Labels", "Forms", "Metadata", "Statistics"] },
      scale: [
        { name: "Display XL", sizes: "72–88px desktop · 48–56px tablet · 40–48px mobile" },
        { name: "Display L", sizes: "56–64px desktop · 40–48px tablet · 34–40px mobile" },
        { name: "H1", sizes: "48–56px" },
        { name: "H2", sizes: "36–44px" },
        { name: "H3", sizes: "26–32px" },
        { name: "Body Large", sizes: "18–20px" },
        { name: "Body", sizes: "16–18px" },
        { name: "Label / Eyebrow", sizes: "12–14px, uppercase" },
      ],
    },

    grid: [
      { device: "Desktop", spec: ["1440px canvas", "12-column grid", "80px outer margins", "24px gutters"] },
      { device: "Tablet", spec: ["768–1024px", "8-column grid", "32px margins", "20px gutters"] },
      { device: "Mobile", spec: ["375–430px", "4-column grid", "20px margins", "16px gutters"] },
    ],

    spacing: { base: "8px", scale: [4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 120, 160] },

    imageDirection: {
      categories: [
        { name: "Craft", items: ["Hands sewing", "Chalk marking", "Fabric cutting", "Buttons", "Stitching", "Needles", "Patterns"] },
        { name: "Fitting", items: ["Measurements", "Mirror fitting", "Pinning", "Tailor-client interaction"] },
        { name: "Product", items: ["Finished suits", "Women's blazers", "Dresses", "Formalwear", "Shirts", "Outerwear"] },
        { name: "Material", items: ["Wool", "Linen", "Silk", "Lining", "Buttons", "Fabric swatches"] },
        { name: "Atelier", items: ["Worktables", "Garment racks", "Tools", "Interior details"] },
        { name: "Editorial", items: ["Full-body client portraits", "Lifestyle images", "Wedding tailoring", "Professional styling"] },
      ],
      treatment: ["Neutral tonal grading", "Controlled contrast", "Natural skin tones", "Warm highlights", "Muted backgrounds", "Minimal visual clutter", "Fine-grain editorial feeling"],
      ratios: [
        { use: "Hero", ratio: "16:9 / 3:2" },
        { use: "Portrait editorial", ratio: "4:5" },
        { use: "Service cards", ratio: "3:4" },
        { use: "Lookbook", ratio: "4:5 + landscape" },
        { use: "Detail photography", ratio: "1:1" },
      ],
    },

    iconography: ["Location", "Calendar", "Measurement", "Fabric", "Consultation", "Delivery", "Video call", "Arrow", "Check", "Phone", "Email"],

    buttonSystem: {
      primary: "Dark background, light text — e.g. Book a Fitting",
      secondary: "Transparent or light background, dark border/text — e.g. View Our Craft",
      textLink: "Text + directional arrow — e.g. Learn More →",
      principles: ["Minimum 44–48px touch height.", "Clear hover state.", "Visible keyboard focus.", "Consistent corner treatment.", "One primary action should dominate each section."],
    },

    componentSystem: {
      core: ["Navigation", "Mobile menu", "Primary CTA", "Secondary CTA", "Text link", "Service card", "Category tag", "Statistic block", "Editorial title", "Section eyebrow", "Image card", "Testimonial card", "Process step", "Fabric card", "Filter tab", "Accordion", "Form input", "Select field", "Appointment card", "Footer column", "Newsletter field"],
      states: ["Default", "Hover", "Active", "Focus", "Disabled", "Selected", "Error", "Success"],
    },

    homepageSections: [
      { title: "Hero", question: "Who are you?", body: "The opening message immediately explains that Thornton & Co. creates bespoke suits, dresses, blazers and made-to-measure garments for both women and men. Primary CTA: Book a Fitting. Secondary CTA: View Our Craft. Additional discovery paths: For Him, For Her." },
      { title: "Trust Indicators", question: "Can I trust you quickly?", body: "20+ Years of Expertise, 4-Step Fitting Process, 5,000+ Garments Tailored, Men & Women Both Expertly Served — numerical proof that builds confidence without requiring long paragraphs." },
      { title: "Service Discovery", question: "What can you make for me?", body: "Crafted for Every Occasion & Body: For Him (Bespoke Suits, Wedding & Groom, Shirt Tailoring) and For Her (Women's Suits & Blazers, Dresses & Formalwear, Alterations), each service card showing category, name, short description and a Learn More action." },
      { title: "Women's Tailoring", question: "Do you specialize in womenswear?", body: "Women's Tailoring, Done Properly — its own substantial section rather than a footnote to menswear, covering blazers & trouser suits, evening dresses & gowns, coats & outerwear, bridal & occasion tailoring, and alterations & restyling." },
      { title: "Craftsmanship", question: "Why should I trust your work?", body: "Precision by Hand. For Every Client. — hand-finished details, 18 precise measurements, women's & men's specialists, and personal fittings, shifting the page from commercial pitch into brand storytelling." },
      { title: "The Process", question: "How does this work?", body: "From Consultation to Final Fitting, reduced to four understandable stages: Consultation, Measurements, Fabric & Style, and Fitting & Delivery." },
      { title: "Personalization", question: "How much control do I have?", body: "Thousands of Choices. One Garment, Entirely Yours. — lapel style, button selection, lining colour, collar shape, cuff detail, fit profile, monogram & initials and pocket style, backed by 200+ fabric choices." },
      { title: "Lookbook", question: "What does your work look like?", body: "Garments for Her, Garments for Him — Bespoke Menswear, Women's Tailoring, Wedding Suits, Women's Formalwear, The Atelier, and Women's Blazers, acting as both inspiration and portfolio proof." },
      { title: "Social Proof", question: "What was another client's experience?", body: "Words From Our Clients — introduced late in the journey, after services, craftsmanship, process and previous work have already been communicated, so the testimonial reinforces trust immediately before conversion." },
      { title: "Booking Experience", question: "How do I begin?", body: "Ready for a Better Fit? — the final CTA presents three ways to begin: In-Studio Fitting, Online Consultation, and Pickup & Delivery, reducing practical friction without diluting the premium positioning." },
    ],

    processSteps: [
      { number: "01", title: "Consultation", body: "Understand lifestyle, occasion, preferences, and intended garment." },
      { number: "02", title: "Measurements", body: "Take a detailed set of measurements manually." },
      { number: "03", title: "Fabric & Style", body: "Select materials and define styling details." },
      { number: "04", title: "Fitting & Delivery", body: "Refine the garment through fitting before final delivery." },
    ],

    personalization: {
      options: ["Lapel Style", "Button Selection", "Lining Colour", "Collar Shape", "Cuff Detail", "Fit Profile", "Monogram & Initials", "Pocket Style"],
      note: "Combined with 200+ Fabric Choices, the interface communicates that every garment can be individually configured.",
    },

    lookbookCategories: ["Bespoke Menswear", "Women's Tailoring", "Wedding Suits", "Women's Formalwear", "The Atelier", "Women's Blazers"],

    bookingOptions: [
      { title: "In-Studio Fitting", body: "For clients wanting the complete atelier experience." },
      { title: "Online Consultation", body: "For remote or initial consultations." },
      { title: "Pickup & Delivery", body: "For qualifying London customers." },
    ],

    formFlow: ["Choose service", "Choose consultation type", "Choose date and time", "Contact information", "Additional notes", "Review", "Confirmation"],

    responsive: [
      { device: "Desktop", spec: ["Large editorial typography", "Wide image compositions", "Multi-column layouts", "Generous whitespace"] },
      { device: "Tablet", spec: ["Reduced headline size", "Adjusted margins", "2-column cards", "Simplified compositions"] },
      { device: "Mobile", spec: ["Single-column flow", "Touch-optimized controls", "Stacked cards", "Reduced decorative complexity", "Persistent clarity around booking"] },
    ],

    interactionDesign: {
      microInteractions: ["Soft image reveals on scroll", "Subtle text fade-up", "Underline animation on links", "Smooth button hover", "Image scale ~1.02–1.04", "Category transitions", "Navigation background transition", "Fabric card hover", "Accordion expansion", "Form validation states", "Page transitions where appropriate"],
      principle: "Slow enough to feel refined. Fast enough to remain responsive.",
    },

    accessibility: ["Readable text sizes", "Adequate color contrast", "Visible keyboard focus", "Logical heading hierarchy", "Minimum touch-target sizes", "Meaningful button labels", "Descriptive image alternative text", "Forms with persistent labels", "Error messages that do not depend on color alone", "Reduced-motion support", "Keyboard-accessible navigation", "Consistent page structure", "Accessible accordion behavior"],

    conversionStrategy: {
      primary: "Book a Fitting is the one dominant conversion goal throughout the website.",
      supporting: ["Learn More", "Explore Fabrics", "View Lookbook", "Women's Services", "Our Story", "See the Process"],
    },

    conversionPaths: [
      { name: "Direct", steps: ["Homepage", "Book a Fitting"] },
      { name: "Service Led", steps: ["Homepage", "Services", "Relevant Service", "Book a Fitting"] },
      { name: "Inspiration Led", steps: ["Homepage", "Lookbook", "Service", "Book a Fitting"] },
      { name: "Education Led", steps: ["Homepage", "Process", "Fabrics", "Measurements", "Book a Fitting"] },
    ],

    uxWriting: {
      focus: ["Craftsmanship", "Precision", "Choice", "Personal service", "Individuality", "Confidence", "Fit", "Occasion"],
      body: "The content strategy avoids unnecessary tailoring terminology where it could create confusion. The copy aims to feel premium without becoming distant or overly formal.",
    },

    designTokens: [
      { group: "Color", tokens: ["color/background/primary", "color/background/dark", "color/text/primary", "color/text/secondary", "color/text/inverse", "color/accent/heritage", "color/border/subtle"] },
      { group: "Spacing", tokens: ["space/04", "space/08", "space/12", "space/16", "space/24", "space/32", "space/48", "space/64", "space/80", "space/96", "space/120"] },
      { group: "Typography", tokens: ["display/xl", "display/lg", "heading/h1", "heading/h2", "heading/h3", "body/lg", "body/md", "body/sm", "label/md"] },
    ],

    validation: ["Navigation clarity", "CTA visibility", "Content hierarchy", "Service discoverability", "Gender-inclusive content structure", "Mobile readability", "Touch target sizing", "Form simplicity", "Typography consistency", "Color contrast", "Repeated component behavior", "Responsive section stacking", "Image cropping", "Visual rhythm", "Booking accessibility"],

    decisions: [
      { number: "01", title: "One dominant conversion", body: "Book a Fitting remains the primary action." },
      { number: "02", title: "Women's tailoring receives dedicated visibility", body: "Womenswear is treated as a core service category." },
      { number: "03", title: "Education happens before conversion", body: "Users can understand process, measurement, fabrics, and options before booking." },
      { number: "04", title: "Luxury is expressed through restraint", body: "Whitespace, type, composition, and photography carry the premium feeling rather than excessive decoration." },
      { number: "05", title: "Craftsmanship is made tangible", body: "Measurements, fabrics, customization details, specialist expertise, and process steps convert an abstract promise of quality into understandable information." },
    ],

    challenges: [
      { challenge: "Balancing luxury visuals with practical usability.", response: "Used strong editorial typography and imagery while maintaining conventional navigation and clear CTA patterns." },
      { challenge: "Serving multiple customer segments.", response: "Created clear service categorization and dedicated women's tailoring content." },
      { challenge: "Explaining a complex bespoke process.", response: "Reduced the journey into four simple, sequential stages." },
      { challenge: "Communicating personalization without overwhelming visitors.", response: "Grouped customization into understandable visual categories." },
      { challenge: "Maintaining visual consistency across a multi-page experience.", response: "Built reusable foundations, components, layout patterns, and interaction rules." },
    ],

    outcome: ["Clear luxury positioning", "Structured service discovery", "Men's and women's tailoring journeys", "Visible tailoring expertise", "Process transparency", "Fabric exploration", "Personalization storytelling", "Lookbook inspiration", "Measurement education", "Strong appointment pathways", "Responsive layouts", "Reusable UI components", "Consistent visual language"],

    delivered: {
      ux: ["UX strategy", "Information architecture", "Sitemap", "User journey", "Conversion architecture", "Content hierarchy", "Service organization", "Responsive behavior", "Form experience"],
      ui: ["Art direction", "Color system", "Typography", "Layout system", "Grid", "Spacing", "Components", "Cards", "Forms", "Buttons", "Lookbook presentation", "Responsive screens"],
      prototyping: ["Navigation", "Page flows", "Interactions", "Booking journey", "Responsive behavior", "Published Figma Site"],
    },

    skills: ["UI Design", "UX Design", "Responsive Web Design", "Information Architecture", "User Journey Mapping", "Wireframing", "Interaction Design", "Visual Design", "Typography", "Color Systems", "Design Systems", "Component Design", "Accessibility", "Conversion UX", "Luxury Branding", "Editorial Web Design", "Figma", "Prototyping"],

    reflection: {
      heading: "Designing Luxury Is an Exercise in Restraint",
      body: [
        "The most important lesson from Thornton & Co. was that a premium experience does not require making every element decorative.",
        "Luxury is communicated through precision. It exists in spacing, typography, photography, hierarchy, motion, language — and the confidence to remove anything unnecessary.",
      ],
    },
  },
];
```

- [ ] **Step 3: Add getters to `src/content/index.ts`**

`src/content/index.ts` currently starts:

```ts
import { artworks } from "./artworks";
import { collections } from "./collections";
import { artists } from "./artists";
import { stories } from "./stories";
import { timeline } from "./timeline";
import { chapters } from "./chapters";
import type { Artwork, Artist, Collection, Story, TimelineEntry } from "./types";

export { artworks, collections, artists, stories, timeline, chapters };
export type { Artwork, Artist, Collection, Story, TimelineEntry };
```

Replace it with:

```ts
import { artworks } from "./artworks";
import { collections } from "./collections";
import { artists } from "./artists";
import { stories } from "./stories";
import { timeline } from "./timeline";
import { chapters } from "./chapters";
import { caseStudies } from "./case-studies";
import type { Artwork, Artist, Collection, Story, TimelineEntry, CaseStudy } from "./types";

export { artworks, collections, artists, stories, timeline, chapters, caseStudies };
export type { Artwork, Artist, Collection, Story, TimelineEntry, CaseStudy };
```

Then, immediately after the existing `/* -------------------------------- Chapters -------------------------------- */` block (the one-liner `export const getChapters = () => chapters;`), add a new block:

```ts
/* ------------------------------ Case Studies ------------------------------ */
export const getCaseStudies = (): CaseStudy[] => caseStudies;
export const getCaseStudyBySlug = (slug: string) =>
  caseStudies.find((c) => c.slug === slug);
```

- [ ] **Step 4: Typecheck**

Run: `npm run typecheck`
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/content/types.ts src/content/case-studies.ts src/content/index.ts
git commit -m "content: add CaseStudy type and the Thornton & Co. case study record"
```

---

### Task 2: Shared list/card section primitives

**Files:**
- Create: `src/components/case-study/primitives.tsx`

**Interfaces:**
- Consumes: `MReveal`, `Stagger`, `StaggerItem` from `src/components/motion/reveal.tsx`; `Kicker` from `src/components/typography/primitives.tsx`; `cn` from `src/lib/utils`.
- Produces: `ProseSection`, `ChipList`, `SpecGrid`, `FlowDiagram`, `ObjectiveList`, `DecisionList`, `AudienceGrid`, `PainPointList` — named exports, consumed by Task 6.

- [ ] **Step 1: Write the file**

```tsx
"use client";

import { MReveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Kicker } from "@/components/typography/primitives";
import { cn } from "@/lib/utils";

/** Eyebrow + heading + one or more paragraphs — the workhorse narrative block. */
export function ProseSection({
  eyebrow,
  heading,
  body,
  className,
}: {
  eyebrow?: string;
  heading?: string;
  body: string[];
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow ? <Kicker accent>{eyebrow}</Kicker> : null}
      {heading ? (
        <MReveal
          as="h2"
          variant="up"
          className={cn("font-display text-3xl leading-tight text-ink text-balance md:text-4xl", eyebrow && "mt-5")}
        >
          {heading}
        </MReveal>
      ) : null}
      {body.map((p, i) => (
        <MReveal
          key={p}
          as="p"
          variant="up"
          delay={0.08 + i * 0.06}
          className="mt-5 text-pretty text-lg leading-relaxed text-ink-soft"
        >
          {p}
        </MReveal>
      ))}
    </div>
  );
}

/** Static `.chip`-styled tag list — reuses the filter-chip visual language, non-interactive. */
export function ChipList({ heading, items }: { heading?: string; items: string[] }) {
  return (
    <div>
      {heading ? <Kicker>{heading}</Kicker> : null}
      <Stagger className={cn("flex flex-wrap gap-2", heading && "mt-4")}>
        {items.map((item) => (
          <StaggerItem key={item} as="span" variant="scale" duration={0.4} className="chip">
            {item}
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}

/** Device/spec cards — grid system and responsive-design breakpoints. */
export function SpecGrid({ items }: { items: { device: string; spec: string[] }[] }) {
  return (
    <Stagger className="grid gap-6 sm:grid-cols-3">
      {items.map((item) => (
        <StaggerItem key={item.device} as="div" variant="up" className="border-t border-line/15 pt-5">
          <h3 className="font-display text-lg text-ink">{item.device}</h3>
          <ul className="mt-3 space-y-1.5">
            {item.spec.map((line) => (
              <li key={line} className="text-sm text-ink-soft">
                {line}
              </li>
            ))}
          </ul>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/** Linear numbered step flow with arrows — user flows, form flow, conversion paths. */
export function FlowDiagram({ title, steps }: { title?: string; steps: string[] }) {
  return (
    <div>
      {title ? <p className="label mb-4">{title}</p> : null}
      <Stagger className="flex flex-wrap items-center gap-3">
        {steps.map((step, i) => (
          <StaggerItem key={step} as="div" variant="fade" className="flex items-center gap-3">
            <span className="border border-line/25 px-4 py-2 font-mono text-xs uppercase tracking-label text-ink">
              {step}
            </span>
            {i < steps.length - 1 ? (
              <span aria-hidden className="text-ink-soft">
                →
              </span>
            ) : null}
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}

/** Numbered/titled cards — business objectives, the homepage section breakdown. */
export function ObjectiveList({ items }: { items: { number: string; title: string; body: string }[] }) {
  return (
    <Stagger className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
      {items.map((item) => (
        <StaggerItem key={item.number + item.title} as="div" variant="up" className="border-t border-line/15 pt-5">
          <span className="label text-accent">{item.number}</span>
          <h3 className="mt-2 font-display text-xl text-ink">{item.title}</h3>
          <p className="mt-2 text-pretty text-[0.95rem] leading-relaxed text-ink-soft">{item.body}</p>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/** Titled cards with a short body — key decisions, challenges/responses, booking options. */
export function DecisionList({ items }: { items: { number?: string; title: string; body: string }[] }) {
  return (
    <Stagger className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
      {items.map((item) => (
        <StaggerItem key={item.title} as="div" variant="left" className="border-t border-line/15 pt-5">
          {item.number ? <span className="label text-accent">{item.number}</span> : null}
          <h3 className={cn("font-display text-lg text-ink", item.number && "mt-2")}>{item.title}</h3>
          <p className="mt-2 text-pretty text-sm leading-relaxed text-ink-soft">{item.body}</p>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/** Segment cards with a bullet list of needs — target audience. */
export function AudienceGrid({ items }: { items: { name: string; body: string; needs: string[] }[] }) {
  return (
    <Stagger className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
      {items.map((item) => (
        <StaggerItem key={item.name} as="div" variant="up" className="border-t border-line/15 pt-5">
          <h3 className="font-display text-lg text-ink">{item.name}</h3>
          <p className="mt-2 text-pretty text-sm leading-relaxed text-ink-soft">{item.body}</p>
          <p className="label mt-4">Needs</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {item.needs.map((n) => (
              <li key={n} className="chip">
                {n}
              </li>
            ))}
          </ul>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/** Problem → Solution pairs, alternating slide-in — key user pain points. */
export function PainPointList({ items }: { items: { problem: string; solution: string }[] }) {
  return (
    <ol className="divide-y divide-line/15 border-t border-line/15">
      {items.map((item, i) => (
        <MReveal
          key={item.problem}
          as="li"
          variant={i % 2 === 0 ? "left" : "right"}
          className="grid gap-2 py-6 sm:grid-cols-2 sm:gap-8"
        >
          <p className="font-display text-lg italic text-ink">&ldquo;{item.problem}&rdquo;</p>
          <p className="text-pretty text-[0.95rem] leading-relaxed text-ink-soft">{item.solution}</p>
        </MReveal>
      ))}
    </ol>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npm run typecheck`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/case-study/primitives.tsx
git commit -m "feat(case-study): add shared list/card section primitives"
```

---

### Task 3: Bespoke visual section components

**Files:**
- Create: `src/components/case-study/visuals.tsx`

**Interfaces:**
- Consumes: `MReveal`, `Stagger`, `StaggerItem` from `src/components/motion/reveal.tsx`; `Image` from `next/image`; `cn` from `src/lib/utils`.
- Produces: `PersonaGrid`, `SitemapTree`, `ColorPaletteBoard`, `TypographySpecimen`, `ScreenGallery`, `StageFlow` — named exports, consumed by Task 6.

- [ ] **Step 1: Write the file**

```tsx
"use client";

import Image from "next/image";
import { MReveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/** Three persona cards — age, goal, priorities, concern, needs. */
export function PersonaGrid({
  items,
}: {
  items: {
    name: string;
    role: string;
    age: string;
    goal: string;
    priorities: string;
    concern: string;
    needs: string[];
  }[];
}) {
  return (
    <Stagger className="grid gap-8 md:grid-cols-3">
      {items.map((p) => (
        <StaggerItem key={p.name} as="article" variant="up" className="border border-line/15 p-6">
          <p className="label text-accent">{p.role}</p>
          <h3 className="mt-2 font-display text-2xl italic text-ink">{p.name}</h3>
          <dl className="mt-5 space-y-3 text-sm">
            <div>
              <dt className="label">Age</dt>
              <dd className="mt-1 text-ink-soft">{p.age}</dd>
            </div>
            <div>
              <dt className="label">Goal</dt>
              <dd className="mt-1 text-ink-soft">{p.goal}</dd>
            </div>
            <div>
              <dt className="label">Priorities</dt>
              <dd className="mt-1 text-ink-soft">{p.priorities}</dd>
            </div>
            <div>
              <dt className="label">Concern</dt>
              <dd className="mt-1 text-ink-soft">{p.concern}</dd>
            </div>
          </dl>
          <p className="label mt-5">Needs</p>
          <ul className="mt-2 space-y-1">
            {p.needs.map((n) => (
              <li key={n} className="text-sm text-ink-soft">
                — {n}
              </li>
            ))}
          </ul>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/** Nested tree diagram (CSS only) — the sitemap. */
export function SitemapTree({
  items,
}: {
  items: { label: string; children?: { label: string; children?: { label: string }[] }[] }[];
}) {
  return (
    <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((branch) => (
        <MReveal key={branch.label} as="li" variant="up" className="border-t border-line/25 pt-4">
          <p className="font-display text-lg text-ink">{branch.label}</p>
          {branch.children ? (
            <ul className="mt-3 space-y-2 border-l border-line/15 pl-4">
              {branch.children.map((child) => (
                <li key={child.label} className="text-sm text-ink-soft">
                  {child.label}
                  {child.children ? (
                    <ul className="mt-1 space-y-1 pl-3">
                      {child.children.map((leaf) => (
                        <li key={leaf.label} className="text-xs text-muted">
                          · {leaf.label}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : null}
        </MReveal>
      ))}
    </ul>
  );
}

/** Tall color swatches — name, real hex, usage. Dynamic background color goes on
 *  a plain inner div, never on the StaggerItem itself (it doesn't forward `style`). */
export function ColorPaletteBoard({ items }: { items: { name: string; hex: string; usage: string }[] }) {
  return (
    <Stagger className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
      {items.map((c) => (
        <StaggerItem key={c.hex} as="div" variant="up" className="flex flex-col">
          <div className="aspect-[3/4] w-full" style={{ backgroundColor: c.hex }} aria-hidden />
          <p className="mt-3 text-sm text-ink">{c.name}</p>
          <p className="font-mono text-xs uppercase text-muted">{c.hex}</p>
          <p className="mt-1 text-xs leading-snug text-ink-soft">{c.usage}</p>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/** Display + interface typeface specimen and the type scale table. */
export function TypographySpecimen({
  display,
  interfaceFont,
  scale,
}: {
  display: { name: string; uses: string[] };
  interfaceFont: { name: string; uses: string[] };
  scale: { name: string; sizes: string }[];
}) {
  return (
    <div>
      <div className="grid gap-10 sm:grid-cols-2">
        <MReveal as="div" variant="up">
          <p className="font-display text-6xl text-ink">Aa</p>
          <p className="mt-2 font-display text-lg italic text-ink">{display.name}</p>
          <p className="mt-2 text-sm text-ink-soft">{display.uses.join(" · ")}</p>
        </MReveal>
        <MReveal as="div" variant="up" delay={0.1}>
          <p className="font-sans text-6xl text-ink">Aa</p>
          <p className="mt-2 font-sans text-lg text-ink">{interfaceFont.name}</p>
          <p className="mt-2 text-sm text-ink-soft">{interfaceFont.uses.join(" · ")}</p>
        </MReveal>
      </div>
      <dl className="mt-10 divide-y divide-line/15 border-t border-line/15">
        {scale.map((s) => (
          <div key={s.name} className="flex items-center justify-between gap-6 py-3">
            <dt className="label">{s.name}</dt>
            <dd className="text-right text-sm text-ink-soft">{s.sizes}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** Real-screenshot showcase. Fixed aspect ratio uses a Tailwind class, not an
 *  inline style (StaggerItem doesn't forward `style`). */
export function ScreenGallery({ images, alt }: { images: string[]; alt: string }) {
  return (
    <Stagger className="grid gap-6 sm:grid-cols-2">
      {images.map((src, i) => (
        <StaggerItem
          key={src}
          as="div"
          variant="scale"
          className="relative aspect-[4/3] overflow-hidden bg-paper-deep"
        >
          <Image src={src} alt={`${alt} — screen ${i + 1}`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/** Horizontal numbered stage flow with arrows — the UX strategy stages, the 4-step process. */
export function StageFlow({ stages }: { stages: { name: string; body: string; number?: string }[] }) {
  return (
    <Stagger className="grid gap-6 sm:grid-cols-2 lg:flex lg:items-start lg:gap-0">
      {stages.map((s, i) => (
        <StaggerItem key={s.name} as="div" variant="up" className="flex flex-1 items-start gap-4 lg:flex-col">
          <div className="flex flex-1 flex-col lg:border-t lg:border-line/25 lg:pt-5">
            {s.number ? <span className="label text-accent">{s.number}</span> : null}
            <h3 className={cn("font-display text-xl text-ink", s.number && "mt-2")}>{s.name}</h3>
            <p className="mt-2 text-pretty text-sm leading-relaxed text-ink-soft">{s.body}</p>
          </div>
          {i < stages.length - 1 ? (
            <span aria-hidden className="hidden shrink-0 self-center px-2 text-ink-soft lg:block">
              →
            </span>
          ) : null}
        </StaggerItem>
      ))}
    </Stagger>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npm run typecheck`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/case-study/visuals.tsx
git commit -m "feat(case-study): add bespoke visual section components"
```

---

### Task 4: WebGL hero with graceful fallback

**Files:**
- Create: `src/components/case-study/CaseStudyHero3D.tsx`
- Create: `src/components/case-study/CaseStudyHero.tsx`

**Interfaces:**
- Consumes: `CaseStudy` type from `src/content/types.ts`; `MReveal` from `src/components/motion/reveal.tsx`; `Kicker` from `src/components/typography/primitives.tsx`; `MetaList` from `src/components/ui/MetaList.tsx`; `@react-three/fiber`, `@react-three/drei`, `three` (already dependencies).
- Produces: `CaseStudyHero({ caseStudy: CaseStudy })` — the only export Task 6 uses; `CaseStudyHero3D` is an internal implementation detail loaded dynamically.

- [ ] **Step 1: Write the WebGL scene — `src/components/case-study/CaseStudyHero3D.tsx`**

```tsx
"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

/** One textured plane that tilts toward the pointer and idles with a slow bob. */
function TiltedPlane({
  src,
  position,
  size,
}: {
  src: string;
  position: [number, number, number];
  size: [number, number];
}) {
  const texture = useTexture(src);
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const m = mesh.current;
    if (!m) return;
    const t = state.clock.elapsedTime;
    const targetX = state.pointer.x * 0.18;
    const targetY = state.pointer.y * -0.12;
    m.rotation.y += (targetX - m.rotation.y) * 0.04;
    m.rotation.x += (targetY - m.rotation.x) * 0.04;
    m.position.y = position[1] + Math.sin(t * 0.6) * 0.08;
  });

  return (
    <mesh ref={mesh} position={position}>
      <planeGeometry args={size} />
      <meshBasicMaterial map={texture} toneMapped={false} transparent />
    </mesh>
  );
}

/**
 * Bespoke single-project hero: 1–2 layered planes of the real Thornton
 * screenshots, tilting toward the pointer with a slow idle float. Deliberately
 * simpler than the homepage's multi-card `FloatingGallery` (that component is
 * shaped for orbiting many artworks, not showcasing one hero image).
 */
export function CaseStudyHero3D({ images }: { images: string[] }) {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 35 }} dpr={[1, 1.75]} gl={{ antialias: true, alpha: true }}>
      <Suspense fallback={null}>
        <TiltedPlane src={images[0]} position={[0, 0, 0]} size={[3.6, 2.4]} />
        {images[1] ? <TiltedPlane src={images[1]} position={[1.7, -0.5, 0.7]} size={[1.7, 1.1]} /> : null}
      </Suspense>
    </Canvas>
  );
}
```

- [ ] **Step 2: Write the wrapper with fallback — `src/components/case-study/CaseStudyHero.tsx`**

```tsx
"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { MReveal } from "@/components/motion/reveal";
import { Kicker } from "@/components/typography/primitives";
import { MetaList } from "@/components/ui/MetaList";
import { type CaseStudy } from "@/content/types";

const CaseStudyHero3D = dynamic(
  () => import("./CaseStudyHero3D").then((m) => m.CaseStudyHero3D),
  { ssr: false }
);

/**
 * Cover section: eyebrow, title, tagline, project-details metadata, and a
 * WebGL hero on capable desktops (a flat animated image everywhere else —
 * mobile, reduced-motion, no-WebGL). Reads matchMedia/WebGL support directly
 * inside the effect on every invocation — see Global Constraints in the plan
 * for why a "resolved once" gated flag is not safe here.
 */
export function CaseStudyHero({ caseStudy }: { caseStudy: CaseStudy }) {
  const [useWebGL, setUseWebGL] = useState(false);

  useEffect(() => {
    let supported = false;
    try {
      const c = document.createElement("canvas");
      supported = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      supported = false;
    }
    const reducedNow = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobileNow = window.matchMedia("(max-width: 767px)").matches;
    setUseWebGL(supported && !reducedNow && !mobileNow);
  }, []);

  return (
    <header className="relative min-h-[85vh] overflow-hidden bg-paper pb-16 pt-[calc(var(--header-h)+3rem)]">
      {useWebGL ? (
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <CaseStudyHero3D images={caseStudy.heroImages} />
        </div>
      ) : null}
      <div className="container-editorial relative">
        <Kicker accent>{caseStudy.eyebrow}</Kicker>
        <MReveal as="h1" variant="blur" className="mt-6 max-w-[16ch] font-display text-display-lg text-balance text-ink">
          {caseStudy.title}
        </MReveal>
        <MReveal as="p" variant="up" delay={0.15} className="mt-4 max-w-md font-display text-2xl italic text-ink-soft">
          {caseStudy.tagline}
        </MReveal>
        <div className="mt-14 max-w-2xl">
          <MetaList items={caseStudy.projectDetails.map((d) => ({ label: d.label, value: d.value }))} columns={2} />
        </div>
        {!useWebGL ? (
          <MReveal
            variant="scale"
            delay={0.2}
            className="relative mt-12 aspect-[16/9] w-full overflow-hidden bg-paper-deep"
          >
            <Image src={caseStudy.heroImages[0]} alt={caseStudy.title} fill sizes="100vw" className="object-cover" priority />
          </MReveal>
        ) : null}
      </div>
    </header>
  );
}
```

- [ ] **Step 3: Typecheck**

Run: `npm run typecheck`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/case-study/CaseStudyHero3D.tsx src/components/case-study/CaseStudyHero.tsx
git commit -m "feat(case-study): add WebGL hero with flat-hero fallback"
```

---

### Task 5: `/case-studies` listing page

**Files:**
- Create: `src/app/case-studies/page.tsx`

**Interfaces:**
- Consumes: `getCaseStudies`, `getArtworkById` from `src/content/index.ts` (Task 1; `getArtworkById` already exists); `PageHeader` from `src/components/ui/PageHeader.tsx`; `MReveal` from `src/components/motion/reveal.tsx`.

- [ ] **Step 1: Write the page**

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getCaseStudies, getArtworkById } from "@/content/index";
import { PageHeader } from "@/components/ui/PageHeader";
import { MReveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Full case studies behind our work — the strategy, design system, and decisions, not just the finished screens.",
};

export default function CaseStudiesPage() {
  const caseStudies = getCaseStudies();

  return (
    <>
      <PageHeader
        kicker="Our work · Case Studies"
        title="How we actually build it."
        deck="Full walkthroughs of the strategy, design system, and decisions behind our work — not just the finished screens."
      />
      <div className="container-editorial pb-24">
        <div className="grid gap-10 border-t border-line/15 pt-10">
          {caseStudies.map((cs) => {
            const artwork = getArtworkById(cs.artworkId);
            const tags = artwork ? artwork.medium.split(",").map((t) => t.trim()) : [];
            return (
              <MReveal as="article" variant="up" key={cs.id}>
                <div className="grid gap-8 md:grid-cols-2 md:items-center">
                  <div className="relative aspect-[4/3] overflow-hidden bg-paper-deep">
                    <Image
                      src={cs.heroImages[0]}
                      alt={cs.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="label text-accent">{tags[0] ?? "UI/UX Design"}</p>
                    <h2 className="mt-3 font-display text-3xl text-ink md:text-4xl">{cs.title}</h2>
                    <p className="mt-4 max-w-lg text-pretty text-lg leading-relaxed text-ink-soft">
                      {cs.overview.body[0]}
                    </p>
                    {tags.length ? (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <span key={tag} className="chip">
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}
                    <Link
                      href={`/case-studies/${cs.slug}`}
                      className="group mt-8 inline-flex items-center gap-3 border border-line/25 px-5 py-3.5 font-mono text-xs uppercase tracking-label text-ink transition-colors hover:border-accent hover:text-accent"
                    >
                      Case Study
                      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </MReveal>
            );
          })}
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npm run typecheck`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/case-studies/page.tsx
git commit -m "feat(case-study): add /case-studies listing page"
```

---

### Task 6: `/case-studies/[slug]` detail page

**Files:**
- Create: `src/app/case-studies/[slug]/page.tsx`

**Interfaces:**
- Consumes: `getCaseStudies`, `getCaseStudyBySlug`, `getArtworkById` from `src/content/index.ts` (Task 1); every component from Task 2 (`ProseSection`, `ChipList`, `SpecGrid`, `FlowDiagram`, `ObjectiveList`, `DecisionList`, `AudienceGrid`, `PainPointList`), Task 3 (`PersonaGrid`, `SitemapTree`, `ColorPaletteBoard`, `TypographySpecimen`, `ScreenGallery`, `StageFlow`), and Task 4 (`CaseStudyHero`); `SectionDivider` from `src/components/typography/primitives.tsx`.

- [ ] **Step 1: Write the page**

```tsx
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
          <div className="grid gap-10 md:grid-cols-2">
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
```

- [ ] **Step 2: Typecheck**

Run: `npm run typecheck`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/case-studies/[slug]/page.tsx
git commit -m "feat(case-study): add /case-studies/[slug] detail page"
```

---

### Task 7: Nav entry and portfolio cross-link

**Files:**
- Modify: `src/config/theme.ts:89-97`
- Modify: `src/app/portfolio/[slug]/page.tsx`

**Interfaces:**
- Consumes: `getCaseStudyBySlug` from `src/content/index.ts` (Task 1).

- [ ] **Step 1: Add the nav entry**

`src/config/theme.ts` currently has:

```ts
export const primaryNav: NavItem[] = [
  { label: "Home", href: "/", note: "Smart solutions for your business" },
  { label: "Services", href: "/services", note: "What we build & deliver", sectionId: "our-services" },
  { label: "Portfolio", href: "/portfolio", note: "Every project we've shipped" },
  { label: "Our Team", href: "/team", note: "The people behind your project" },
  { label: "Insights", href: "/insights", note: "Guides & field notes" },
  { label: "About", href: "/about", note: "Who we are & how we work", sectionId: "ch-about" },
  { label: "Contact", href: "/contact", note: "Get a quote & book a call", sectionId: "our-contact" },
];
```

Replace with:

```ts
export const primaryNav: NavItem[] = [
  { label: "Home", href: "/", note: "Smart solutions for your business" },
  { label: "Services", href: "/services", note: "What we build & deliver", sectionId: "our-services" },
  { label: "Portfolio", href: "/portfolio", note: "Every project we've shipped" },
  { label: "Case Studies", href: "/case-studies", note: "Deep dives into how we work" },
  { label: "Our Team", href: "/team", note: "The people behind your project" },
  { label: "Insights", href: "/insights", note: "Guides & field notes" },
  { label: "About", href: "/about", note: "Who we are & how we work", sectionId: "ch-about" },
  { label: "Contact", href: "/contact", note: "Get a quote & book a call", sectionId: "our-contact" },
];
```

- [ ] **Step 2: Add the cross-link**

`src/app/portfolio/[slug]/page.tsx:5-12` currently imports:

```ts
import {
  artworks,
  getArtworkBySlug,
  getArtistById,
  getCollectionById,
  getRelatedArtworks,
  getNextArtwork,
} from "@/content/index";
```

Replace with:

```ts
import {
  artworks,
  getArtworkBySlug,
  getArtistById,
  getCollectionById,
  getRelatedArtworks,
  getNextArtwork,
  getCaseStudyBySlug,
} from "@/content/index";
```

Then, inside `ArtworkDetailPage` (`src/app/portfolio/[slug]/page.tsx:37-46`), the function body currently reads:

```ts
export default function ArtworkDetailPage({ params }: { params: { slug: string } }) {
  const artwork = getArtworkBySlug(params.slug);
  if (!artwork) notFound();

  const artist = getArtistById(artwork.artistId);
  const collection = getCollectionById(artwork.collectionId);
  const related = getRelatedArtworks(artwork);
  const next = getNextArtwork(artwork.id);
  const viewerIds = [artwork.id, ...related.map((r) => r.id)];
  const gallery = (artwork.images ?? []).filter((src) => src !== artwork.image);
```

Add one line after `const gallery = ...`:

```ts
  const caseStudy = getCaseStudyBySlug(artwork.slug);
```

Finally, `src/app/portfolio/[slug]/page.tsx:136-161` currently reads:

```tsx
          {artwork.liveUrl || artwork.appUrl ? (
            <div className="mt-8 flex flex-col gap-3">
              {artwork.liveUrl ? (
                <a
                  href={artwork.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center justify-between gap-3 border border-line/25 px-5 py-3.5 font-mono text-xs uppercase tracking-label text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  Visit website
                  <span aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                </a>
              ) : null}
              {artwork.appUrl ? (
                <a
                  href={artwork.appUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center justify-between gap-3 border border-line/25 px-5 py-3.5 font-mono text-xs uppercase tracking-label text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  Get the app
                  <span aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                </a>
              ) : null}
            </div>
          ) : null}
```

Replace with (adds the case-study link inside the same wrapping block, right after "Get the app"):

```tsx
          {artwork.liveUrl || artwork.appUrl || caseStudy ? (
            <div className="mt-8 flex flex-col gap-3">
              {artwork.liveUrl ? (
                <a
                  href={artwork.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center justify-between gap-3 border border-line/25 px-5 py-3.5 font-mono text-xs uppercase tracking-label text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  Visit website
                  <span aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                </a>
              ) : null}
              {artwork.appUrl ? (
                <a
                  href={artwork.appUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center justify-between gap-3 border border-line/25 px-5 py-3.5 font-mono text-xs uppercase tracking-label text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  Get the app
                  <span aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                </a>
              ) : null}
              {caseStudy ? (
                <Link
                  href={`/case-studies/${caseStudy.slug}`}
                  className="group inline-flex items-center justify-between gap-3 border border-accent/40 bg-accent/5 px-5 py-3.5 font-mono text-xs uppercase tracking-label text-accent transition-colors hover:border-accent hover:bg-accent/10"
                >
                  Full Case Study
                  <span aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                </Link>
              ) : null}
            </div>
          ) : null}
```

`Link` is already imported in this file (`src/app/portfolio/[slug]/page.tsx:4`) — no new import needed for it.

- [ ] **Step 3: Typecheck**

Run: `npm run typecheck`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/config/theme.ts src/app/portfolio/[slug]/page.tsx
git commit -m "feat(case-study): add nav entry and portfolio cross-link"
```

---

### Task 8: Real-browser verification

**Files:** none (verification only, no code changes)

No unit test framework exists in this project. This is the established verification method for UI work in this codebase.

- [ ] **Step 1: Start the dev server**

```bash
npm run dev
```

Run in the background; wait for the "Ready" line before proceeding, reading the actual port from its own output.

- [ ] **Step 2: Verify the nav and listing page**

Using `gstack:browse`, navigate to `/`. Confirm "Case Studies" appears in the header nav between "Portfolio" and "Our Team", and clicking it routes to `/case-studies`. On `/case-studies`, confirm the Thornton & Co. card renders (image, title, Stack tags, description) and its "Case Study →" button links to `/case-studies/thornton-co`.

- [ ] **Step 3: Verify the detail page renders every section, desktop width**

Navigate to `/case-studies/thornton-co`. Confirm: the hero renders (title "Thornton & Co.", tagline "Tailored for Every Story", project details); scroll through the full page and confirm every section listed in Task 6 renders with real content (no empty sections, no "undefined" text); check the console for errors (`browse console --errors`) — expect none.

- [ ] **Step 4: Verify the WebGL hero and its fallback**

At desktop width, confirm the hero shows the WebGL canvas (not the flat fallback image) and that moving the pointer across it visibly tilts the planes. Reload the page 2–3 times to exercise React Strict Mode's double-invoke in dev and confirm no `removeChild`-style crash and no blank/torn-down hero (the specific failure mode `FloatingGalleryHero` hit previously). Then set the viewport to 375px width (`browse viewport 375x812`) and confirm the page falls back to the flat animated hero image instead of attempting WebGL.

- [ ] **Step 5: Verify the portfolio cross-link**

Navigate to `/portfolio/thornton-co`. Confirm a "Full Case Study →" link now appears alongside "Visit website", and that it correctly routes to `/case-studies/thornton-co`.

- [ ] **Step 6: Confirm nothing else regressed**

Navigate to `/portfolio` and confirm the grid, Stack filters, and Featured-work selector are all unchanged and still function (click one Stack chip, confirm it still filters correctly, then clear).

- [ ] **Step 7: Stop the dev server**

Stop the `gstack:browse` daemon and kill the dev server process; confirm port 3000 (or whichever port was used) is free afterward.

- [ ] **Step 8: Record results**

No commit for this task (no code changes). Report pass/fail for Steps 2–6 with what was actually observed.

---

## Self-Review

**Spec coverage:** Every field in the spec's `CaseStudy` interface is populated with real content in Task 1 and rendered by a named component in Task 6's component-mapping table — cross-checked field by field while drafting (`projectDetails`/`contentArchitecture` → `MetaList`/inline `dl`; `personalization`/`lookbookCategories`/`iconography`/`skills`/`accessibility`/`componentSystem`/`interactionDesign.microInteractions`/`designTokens`/`validation`/`delivered` → `ChipList`; `imageDirection.ratios`/`grid`/`responsive` → `SpecGrid`; `buttonSystem.principles`/`interactionDesign.principle`/`conversionStrategy.primary`/`personalization.note`/`uxWriting.body` → `ProseSection` or inline paragraphs; `formFlow` → `FlowDiagram`). The additive-only constraint, the WebGL fallback safety pattern, the "no fabricated imagery" rule, and the nav/cross-link requirements each have a dedicated task or step. No spec requirement is without a task.

**Placeholder scan:** No TBD/TODO markers. Every step has complete, copy-pasteable code or an exact command with an expected result. All case-study prose is transcribed from the user's actual source document — the one place the source document itself trails off mid-sentence (the final line of section 53, cut off after "...bespoke tailoring itself:"), the plan's `reflection.body` stops at the last complete sentence rather than inventing a closing line.

**Type consistency:** `CaseStudy` (Task 1) is the single source of truth every later task's props are typed against — verified field-by-field against every component's prop signature in Tasks 2–4 and every usage site in Task 6 while drafting (e.g. `DecisionList`'s optional `number` covers both `decisions` (has numbers) and `bookingOptions`/mapped `challenges` (don't); `StageFlow`'s optional `number` covers both `uxStrategy.stages` (no numbers) and mapped `processSteps` (has numbers); `TypographySpecimen`'s `interfaceFont` prop name is used consistently in both the component definition and its call site, avoiding the reserved-word ambiguity of naming it `interface`). `getCaseStudies`/`getCaseStudyBySlug`/`getArtworkById` names match between Task 1's definitions and every later task's imports.

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-08-11-case-studies.md`. Proceeding with **Subagent-Driven execution**, consistent with every other feature this session — dispatching a fresh implementer subagent for Task 1 now.
