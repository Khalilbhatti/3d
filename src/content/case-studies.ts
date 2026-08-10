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
