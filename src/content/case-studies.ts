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
  {
    id: "cs-parko",
    slug: "parko",
    artworkId: "prj-parko",
    title: "Parko",
    tagline: "One Connected Flow, From Search to Parked",
    eyebrow: "UI/UX Case Study — 2026",
    year: "2026",
    heroImages: [
      "/portfolio/parko-cs-onboarding.jpg",
      "/portfolio/parko-cs-login-home.jpg",
      "/portfolio/parko-cs-detail.jpg",
      "/portfolio/parko-cs-navigation.jpg",
      "/portfolio/parko-cs-select-space.jpg",
      "/portfolio/parko-cs-booking-active.jpg",
      "/portfolio/parko-cs-booking-cancelled.jpg",
    ],
    heroAspect: 1122 / 1402,

    projectDetails: [
      { label: "Product", value: "Parko — Smart Parking Mobile App" },
      { label: "Role", value: "UI/UX Design" },
      { label: "Platform", value: "iOS-style Mobile App" },
      { label: "Category", value: "Smart Parking / Mobility" },
      { label: "Theme", value: "Dark + Orange" },
      {
        label: "Core Modules",
        value: "Onboarding, Authentication, Home Discovery, Detail Pages, Navigation, Slot Selection, Ticketing, Booking Management",
      },
    ],

    overview: {
      heading: "A Single Digital Touchpoint for Parking, Start to Finish",
      body: [
        "Parko is a smart parking mobile application designed to help drivers discover nearby parking areas, review parking details, navigate to the selected location, reserve a slot, and manage bookings in one connected flow.",
        "The application focuses on reducing parking stress through a dark premium interface, strong visual clarity, and task-oriented user journeys.",
        "The Parko experience was designed to solve an everyday urban problem: parking friction. Drivers often lose time searching for an available space, comparing options manually, confirming trust, and navigating through unfamiliar areas. Parko brings these disconnected tasks together in a unified mobile experience — from quick access to parking information through to a digital QR ticket and confident, integrated navigation to the destination.",
      ],
    },

    context: {
      heading: "Turning a High-Friction Real-World Task Into One Digital Touchpoint",
      body: [
        "Parking is a high-friction real-world task. In busy commercial and urban areas, drivers commonly face uncertainty related to space availability, pricing, safety, location access, and booking confirmation — made worse when information is scattered across multiple channels or the user must physically explore several locations before deciding.",
        "Parking providers need a digital way to present availability and facilities. Drivers need confidence before committing to a booking, immediate and understandable navigation to the selected space, and booking records that remain accessible after purchase for review, cancellation, or re-use.",
        "The product vision: a reliable, easy-to-understand, and visually premium mobile parking experience that helps users move from discovery to confirmed booking with minimal cognitive effort.",
      ],
      keywords: ["Discover", "Evaluate", "Reserve", "Navigate", "Validate", "Manage"],
    },

    problem: {
      heading: "Trust and Clarity, Without Slowing the Driver Down",
      feelWords: ["Premium", "Focused", "Confident", "Immediate", "Trustworthy"],
      remainWords: ["Fast", "Clear", "Accessible", "Uncluttered", "Reliable"],
      coreQuestion:
        "How might we make a premium, dark-themed parking experience feel immediate and trustworthy without slowing a driver down?",
    },

    objectives: [
      { number: "01", title: "Fast Nearby Discovery", body: "Help users find nearby parking spaces quickly." },
      { number: "02", title: "Confident Decisions", body: "Provide enough information for users to make confident decisions." },
      { number: "03", title: "Smooth Reservation", body: "Enable smooth slot reservation and booking confirmation." },
      { number: "04", title: "Seamless Navigation", body: "Support a seamless navigation experience to the chosen parking area." },
      { number: "05", title: "Central Booking Control", body: "Allow users to review and manage booking status from a central dashboard." },
    ],

    userGoals: [
      "Know which parking place is worth choosing",
      "See transparent pricing and visible position/slot details",
      "Navigate easily from current location to the destination",
      "Verify access clearly after booking",
      "Monitor and manage booking states",
    ],

    audiences: [
      {
        name: "Commuters",
        body: "Commuters looking for quick parking near offices or transit points.",
        needs: ["Transparent pricing", "Easy navigation", "Fast decisions"],
      },
      {
        name: "Shoppers",
        body: "Shoppers visiting malls and commercial areas.",
        needs: ["Trustworthy facility details", "Clear position/slot information"],
      },
      {
        name: "Event Attendees",
        body: "Event attendees seeking structured access to nearby parking.",
        needs: ["Structured booking", "Reliable confirmation"],
      },
      {
        name: "Drivers in Unfamiliar Areas",
        body: "Drivers in unfamiliar areas who require reliable guidance.",
        needs: ["Clear navigation", "Route confidence"],
      },
      {
        name: "Convenience-Focused Drivers",
        body: "Users who value time savings, safety, and convenience.",
        needs: ["Booking status control", "Minimal friction"],
      },
    ],

    personas: [
      {
        name: "Busy City Driver",
        goal: "Search nearby options, compare them quickly, and secure a spot without spending extra time on manual parking discovery.",
        motivation: "Save time and reduce stress",
        painPoint: "Uncertainty about availability and safety",
        needs: ["Fast booking", "Reliable navigation"],
      },
      {
        name: "Mall or Event Visitor",
        goal: "Evaluate parking options based on distance, price, and convenience before arriving.",
        motivation: "Convenience and trust",
        painPoint: "Confusing parking layouts and crowded destinations",
        needs: ["Clear reviews", "Facilities", "Confirmation details"],
      },
    ],

    painPoints: [
      { problem: "Difficulty finding available parking nearby.", solution: "A home discovery screen built around current location, quick search, and transportation-based entry points." },
      { problem: "Lack of trust before selecting a parking location.", solution: "A detail page with facilities, description, pricing, and trust signals — 24/7, CCTV, security, emergency services." },
      { problem: "Unclear visibility of facility features and service quality.", solution: "A dedicated Review tab with rating filters and visible user reviews." },
      { problem: "No connected system for booking, ticketing, and navigation.", solution: "A digital QR ticket whose Start Navigation CTA connects booking directly to movement." },
      { problem: "Weak visibility over active, upcoming, or cancelled bookings.", solution: "A My Booking dashboard with All / Active / Cancelled state filtering." },
    ],

    uxStrategy: {
      stages: [
        { name: "Discover", body: "Search nearby areas and explore transportation-based entry points from the home screen." },
        { name: "Evaluate", body: "Review facility details, pricing, ratings, and reviews before committing." },
        { name: "Reserve", body: "Select floor, sector, and slot, then confirm the booking." },
        { name: "Navigate", body: "Follow a simplified route to the reserved parking space." },
        { name: "Validate", body: "Scan the digital QR ticket on arrival for entry." },
        { name: "Manage", body: "Track active, upcoming, and cancelled bookings from a central dashboard." },
      ],
    },

    sitemap: [
      { label: "Splash" },
      { label: "Onboarding" },
      { label: "Authentication" },
      { label: "Home / Discovery" },
      { label: "Parking Detail", children: [{ label: "About" }, { label: "Review" }] },
      { label: "Navigation" },
      { label: "Select Space", children: [{ label: "Floor" }, { label: "Sector" }, { label: "Slot" }] },
      { label: "Digital Ticket" },
      { label: "My Booking", children: [{ label: "All Booking" }, { label: "Active" }, { label: "Cancelled" }] },
      { label: "Profile" },
    ],

    userFlows: [
      {
        title: "End-to-End Journey",
        steps: [
          "Launch the app",
          "View splash and onboarding",
          "Sign in or create an account",
          "Review home and search nearby areas",
          "Choose a transportation category",
          "Open a parking location detail page",
          "Read About and Review tabs",
          "Start booking the chosen place",
          "Select floor, sector, and slot",
          "Confirm booking and receive digital ticket",
          "Navigate to the parking space",
          "Manage bookings in My Booking",
        ],
      },
    ],

    contentArchitecture: [
      { section: "Splash", question: "What does this brand feel like?" },
      { section: "Onboarding", question: "Why should I care?" },
      { section: "Login", question: "How do I get in quickly?" },
      { section: "Home", question: "Where do I start?" },
      { section: "Parking Detail", question: "Can I trust this space?" },
      { section: "Navigation", question: "How do I get there?" },
      { section: "Select Space", question: "Which slot is mine?" },
      { section: "Digital Ticket", question: "How do I get in?" },
      { section: "My Booking", question: "What's the status of my bookings?" },
    ],

    researchDirection: {
      questions: [
        "What information is essential before a user trusts a parking place?",
        "How much context should be visible on the detail screen before booking?",
        "How can navigation feel immediate without overwhelming the user?",
        "Which booking states matter most after confirmation?",
        "How can a dark premium visual style remain readable and accessible?",
      ],
      findings: [
        "Users need clear distance and pricing information immediately.",
        "Trust signals such as facilities, reviews, and safety indicators matter before booking.",
        "Navigation must emphasize route clarity over map complexity.",
        "After booking, users want simple access to status, time, and slot details.",
        "Strong visual hierarchy is critical in a dark interface.",
      ],
    },

    competitiveThinking:
      "Products in mapping, mobility, and booking categories commonly succeed when they minimize friction and present fast decision support. Parko adopts this principle by combining location-driven discovery, clear component states, and action-oriented CTAs. The design intentionally keeps the interface premium but practical.",

    visualDirection: {
      heading: "A Dark, Premium Interface Built Around One Accent Color",
      body: "The interface uses a dark theme to support premium perception and focus, with orange as the primary action and attention color. White and gray values carry readability and information hierarchy, key actions are given strong button hierarchy, and every screen is kept to a single dominant purpose to avoid clutter.",
      traits: ["Dark", "Premium", "High-Contrast", "Focused", "Warm Accent", "Uncluttered"],
    },

    colorPalette: [
      { name: "Brand 50", hex: "#FCEEE3", usage: "Primary actions, highlights, selected states" },
      { name: "Brand 100", hex: "#FBEADC", usage: "Primary actions, highlights, selected states" },
      { name: "Brand 200", hex: "#FAE5D3", usage: "Primary actions, highlights, selected states" },
      { name: "Brand 300", hex: "#F9DFC8", usage: "Primary actions, highlights, selected states" },
      { name: "Brand 400", hex: "#F7D7BA", usage: "Primary actions, highlights, selected states" },
      { name: "Brand 500", hex: "#F5CDA9", usage: "Primary actions, highlights, selected states" },
      { name: "Brand 600", hex: "#F3C194", usage: "Primary actions, highlights, selected states" },
      { name: "Brand 700", hex: "#F0B279", usage: "Primary actions, highlights, selected states" },
      { name: "Brand 800", hex: "#EC9F58", usage: "Primary actions, highlights, selected states" },
      { name: "Brand 900", hex: "#E7872E", usage: "Primary actions, highlights, selected states" },
      { name: "Brand 950", hex: "#E57B1A", usage: "Primary actions, highlights, selected states" },
      { name: "Gray 50", hex: "#FAFAFA", usage: "Text, surfaces, contrast, neutral UI structure" },
      { name: "Gray 100", hex: "#EFEFEF", usage: "Text, surfaces, contrast, neutral UI structure" },
      { name: "Gray 200", hex: "#DCDCDC", usage: "Text, surfaces, contrast, neutral UI structure" },
      { name: "Gray 300", hex: "#BDBDBD", usage: "Text, surfaces, contrast, neutral UI structure" },
      { name: "Gray 400", hex: "#989898", usage: "Text, surfaces, contrast, neutral UI structure" },
      { name: "Gray 500", hex: "#7C7C7C", usage: "Text, surfaces, contrast, neutral UI structure" },
      { name: "Gray 600", hex: "#656565", usage: "Text, surfaces, contrast, neutral UI structure" },
      { name: "Gray 700", hex: "#525252", usage: "Text, surfaces, contrast, neutral UI structure" },
      { name: "Gray 800", hex: "#383838", usage: "Text, surfaces, contrast, neutral UI structure" },
      { name: "Gray 900", hex: "#161616", usage: "Text, surfaces, contrast, neutral UI structure" },
      { name: "Gray 950", hex: "#000000", usage: "Text, surfaces, contrast, neutral UI structure" },
      { name: "Error 50", hex: "#FDE4E4", usage: "Warnings, destructive states, cancelled state" },
      { name: "Error 100", hex: "#FDDDDD", usage: "Warnings, destructive states, cancelled state" },
      { name: "Error 200", hex: "#FDD4D4", usage: "Warnings, destructive states, cancelled state" },
      { name: "Error 300", hex: "#FDC9C9", usage: "Warnings, destructive states, cancelled state" },
      { name: "Error 400", hex: "#FCBCBC", usage: "Warnings, destructive states, cancelled state" },
      { name: "Error 500", hex: "#FBABAB", usage: "Warnings, destructive states, cancelled state" },
      { name: "Error 600", hex: "#FA9696", usage: "Warnings, destructive states, cancelled state" },
      { name: "Error 700", hex: "#F97C7C", usage: "Warnings, destructive states, cancelled state" },
      { name: "Error 800", hex: "#F75B5B", usage: "Warnings, destructive states, cancelled state" },
      { name: "Error 900", hex: "#F53232", usage: "Warnings, destructive states, cancelled state" },
      { name: "Error 950", hex: "#F41F1F", usage: "Warnings, destructive states, cancelled state" },
    ],

    typography: {
      display: { name: "Titillium Web", uses: ["Hero moments", "Welcome screens", "Major headlines", "Screen emphasis"] },
      interface: {
        name: "Titillium Web",
        uses: ["Primary section titles", "Sub-sections", "Cards and structured headings", "Primary paragraph text", "Supportive information", "Meta and helper text", "Labels, tiny metadata"],
      },
      scale: [
        { name: "Display XL", sizes: "60px", weight: "Light / Regular / Semi-bold / Bold" },
        { name: "Display LG", sizes: "48px", weight: "Light / Regular / Semi-bold / Bold" },
        { name: "H1", sizes: "36px", weight: "Light / Regular / Semi-bold / Bold" },
        { name: "H2", sizes: "30px", weight: "Light / Regular / Semi-bold / Bold" },
        { name: "H3", sizes: "24px", weight: "Light / Regular / Semi-bold / Bold" },
        { name: "H4", sizes: "20px", weight: "Light / Regular / Semi-bold / Bold" },
        { name: "H5", sizes: "18px", weight: "Light / Regular / Semi-bold / Bold" },
        { name: "Body 1", sizes: "16px", weight: "Light / Regular / Semi-bold / Bold" },
        { name: "Body 2", sizes: "14px", weight: "Light / Regular / Semi-bold / Bold" },
        { name: "Body 3", sizes: "12px", weight: "Light / Regular / Semi-bold / Bold" },
        { name: "Micro", sizes: "10px", weight: "Light / Regular / Semi-bold / Bold" },
      ],
    },

    iconography: [
      "Search", "Location Pin", "Notification Bell", "Home", "Navigate", "Ticket", "Car", "History",
      "Profile", "Settings", "Back Arrow", "Chevron", "Checkmark", "Close", "Star Rating", "Bookmark",
      "Calendar", "Lock", "Eye / Visibility Toggle", "Mail", "Phone", "Camera", "Shield", "Refresh", "More Options", "Add",
    ],

    buttonSystem: {
      primary: "Solid orange fill, high contrast — e.g. Get Started, Book Now, Continue",
      secondary: "Outline, tertiary, and ghost variants for supporting actions — e.g. Cancel Booking",
      textLink: "Minimal icon and text buttons for tertiary actions",
      principles: [
        "Primary actions should be the most visually dominant.",
        "Destructive or error states should use the red system.",
        "Inputs should remain clean, high-contrast, and easy to scan.",
        "Tabs should support quick filtering and state changes.",
        "Cards should group decision-critical information compactly.",
      ],
    },

    componentSystem: {
      core: [
        "Primary buttons", "Secondary and tertiary buttons", "Outline buttons", "Icon buttons", "Input fields",
        "Search bars", "Tabs", "Status bars", "Navbar", "OTP inputs", "Switches", "Radio buttons", "Checkboxes",
        "Cards", "Ticket and booking modules",
      ],
      states: ["Default", "Focused", "Filled", "Error", "Disabled", "Pressed", "Available", "Active", "Cancelled"],
    },

    processSteps: [
      { number: "01", title: "Choose Floor", body: "Navigate between floors to find available space." },
      { number: "02", title: "Select Sector", body: "Choose the sector from a dropdown list." },
      { number: "03", title: "Pick Slot", body: "Real-time slot status supports a quick decision." },
      { number: "04", title: "Continue", body: "A clear, prominent CTA advances the task." },
      { number: "05", title: "Receive Ticket", body: "A scannable digital ticket confirms the booking." },
    ],

    interactionDesign: {
      microInteractions: [
        "Segmented tabs support fast state switching",
        "Orange CTAs drive attention to high-priority actions",
        "Search inputs are prominent and easy to reuse",
        "Bottom navigation ensures consistent wayfinding",
        "Cards are used as compact, repeatable information containers",
        "Selected tabs highlight active context",
        "Action buttons change hierarchy based on importance",
        "Booking state colors reduce ambiguity",
        "QR ticket layout communicates machine-readiness visually",
      ],
      principle: "Clear, immediate feedback on every state change builds confidence without slowing the driver down.",
    },

    accessibility: [
      "High contrast between text and dark surfaces improves readability",
      "Large touch targets meet minimum touch-target standards",
      "Typography hierarchy and ample spacing support fast, easy reading",
      "Color is supported by structure and spacing, not used alone",
      "Buttons and segmented controls show clear selected and unselected states",
      "Status changes such as cancelled vs active are visually distinct",
      "States, colors, and indicators communicate system status instantly",
    ],

    conversionStrategy: {
      primary:
        "Booking is the one dominant conversion action across the app — Get Started, Book Now, Booking, and Continue recur as the primary CTA at every key decision point.",
      supporting: ["Get Direction", "Start Navigation", "Cancel Booking"],
    },

    decisions: [
      {
        number: "01",
        title: "Why a Dark Theme?",
        body: "Matches a premium, technology-forward brand tone, helps the orange accent stand out clearly, and supports a focused, immersive mobile experience.",
      },
      {
        number: "02",
        title: "Why Orange as the Accent?",
        body: "Warm, energetic, and highly visible — supports strong CTA emphasis and works well with mobility and navigation metaphors.",
      },
      {
        number: "03",
        title: "Why Large Cards and Rounded Components?",
        body: "Improves touch comfort on mobile, makes clustered information easier to digest, and creates a friendlier, more modern interface.",
      },
    ],

    challenges: [
      { challenge: "Too much information before booking", response: "Separated detail into About and Review tabs.", outcome: "Cleaner decision-making flow" },
      { challenge: "Navigation can become visually cluttered", response: "Used simplified route emphasis and limited overlays.", outcome: "Better clarity while moving" },
      { challenge: "Parking slot selection can be confusing", response: "Created floor/sector/slot hierarchy.", outcome: "Faster and clearer reservation flow" },
      { challenge: "Users need trust before booking", response: "Added facilities, reviews, pricing, and clear visuals.", outcome: "Higher confidence" },
      { challenge: "Post-booking management is often weak", response: "Created filtered booking states and ticket module.", outcome: "Stronger end-to-end experience" },
    ],

    outcome: [
      "Faster parking discovery",
      "More confident booking decisions",
      "Reduced stress during travel",
      "Simpler access at the destination",
      "Better post-booking control",
      "Improved booking conversion",
      "Higher perceived trust and professionalism",
      "Stronger retention through booking management utility",
      "Better overall product coherence",
    ],

    skills: [
      "UI Design", "UX Design", "Mobile App Design", "Information Architecture", "User Journey Mapping",
      "Interaction Design", "Visual Design", "Typography", "Color Systems", "Design Systems",
      "Component Design", "Accessibility", "Wireframing", "Prototyping",
    ],

    reflection: {
      heading: "Clarity, Trust, and Speed",
      body: [
        "Parko is a complete smart parking concept built around clarity, trust, and speed. The design system, task flows, and screen architecture work together to create a smooth user journey from brand entry to post-booking management.",
        "By combining strong visual identity with practical mobility-oriented UX thinking, the product delivers a premium yet usable parking experience.",
      ],
    },

    keyLearnings: [
      "Trust in mobility products depends on clarity as much as utility.",
      "Users make faster decisions when information is grouped and prioritized well.",
      "A strong component system speeds design consistency and reduces confusion.",
      "Navigation experiences work best when the route is visually dominant.",
      "Booking management should be treated as an active product area, not an afterthought.",
    ],

    futureImprovements: [
      "Real-time availability sync",
      "Live ETA and parking occupancy updates",
      "Saved favorites and recently used places",
      "In-app payment history",
      "Push reminders before arrival or expiry",
      "Advanced review filtering and sorting",
      "Accessibility settings such as larger text or alternate contrast modes",
      "Multi-language support",
    ],

    mockupGuide: [
      "Mockup 01: Splash + Onboarding",
      "Mockup 02: Login + Home",
      "Mockup 03: Parking Detail About + Parking Detail Review",
      "Mockup 04: Navigation states",
      "Mockup 05: Select Space + Digital Ticket",
      "Mockup 06: My Booking overview + Active booking",
      "Mockup 07: Active booking + Cancelled booking",
    ],

    screenBreakdown: [
      {
        number: "15.1",
        title: "Splash Screen",
        body: "The splash screen introduces the Parko identity and creates an immediate branded first impression. The minimal composition keeps the user focused on the app mark while a progress indicator suggests transition and system readiness.",
        bullets: ["Purpose: Brand entry point", "UX Role: Set tone and reduce perceived wait time", "Visual Direction: Dark background with subtle orange glow"],
      },
      {
        number: "15.2",
        title: "Onboarding Screen",
        body: "The onboarding screen introduces the core value proposition: quick and easy parking and payment. The illustration-driven layout makes the concept instantly understandable while keeping the CTA obvious.",
        bullets: ["Primary Message: Book and pay parking quickly", "CTA: Get Started", "Design Rationale: Focused, minimal, and motivational"],
      },
      {
        number: "15.3",
        title: "Authentication / Login",
        body: "The login screen balances brand personality with practical account access. The layout gives strong emphasis to the welcome headline and the Continue CTA while also providing Google and Apple alternatives.",
        bullets: ["Trust Element: Clear structure and familiar social sign-in", "Usability Element: Remember Me and Forgot Password are easy to locate", "Visual Element: Orange field outline highlights active attention"],
      },
      {
        number: "15.4",
        title: "Home / Discovery",
        body: "The home screen acts as the central discovery dashboard. It prioritizes three things: current location, quick search, and transportation-based entry points. Recent places further reduce effort by presenting previously relevant destinations in a card carousel.",
        bullets: ["Top Value: Start finding parking immediately", "Navigation Support: Bottom navigation keeps primary modules visible", "Decision Support: Recent place cards mix location context and pricing"],
      },
      {
        number: "15.5",
        title: "Parking Detail — About",
        body: "The About tab is focused on clarity and reassurance. A large visual preview helps the user understand the environment, while facilities, supporting description, and pricing explain why the parking place is worth choosing.",
        bullets: ["Trust Signals: 24/7, CCTV, security, emergency services", "Action Support: Pricing and Booking CTA remain visible", "Design Benefit: Reduces uncertainty before decision-making"],
      },
      {
        number: "15.6",
        title: "Parking Detail — Review",
        body: "The Review tab provides social proof. Ratings filters and visible user reviews help the user validate expectations through real feedback.",
        bullets: ["Confidence Builder: Review summaries and user voices", "Decision Support: Helps compare quality beyond price alone", "UX Benefit: Makes the booking decision feel safer"],
      },
      {
        number: "15.7",
        title: "Navigation",
        body: "The navigation module uses a simplified visual map so the user can focus on route clarity rather than geographic detail overload. Orange path emphasis keeps the route unmistakable. Booking cards remain available as contextual overlays without breaking orientation.",
        bullets: ["Current location remains visible", "Route emphasis uses the brand accent color", "Parking markers reinforce destination awareness", "Contextual cards allow direct action while navigating"],
      },
      {
        number: "15.8",
        title: "Select Space",
        body: "The slot selection screen transforms a potentially confusing real-world process into a structured interface. Floor, sector, and slot states are made explicit so users can move from choice to confirmation quickly.",
        bullets: ["Controls: Floor navigation, sector dropdown", "Visual Logic: Distinct available / unavailable states", "Action Path: Continue CTA clearly advances the task"],
      },
      {
        number: "15.9",
        title: "Digital Ticket",
        body: "The digital ticket screen acts as a compact post-booking confirmation asset. It combines scannable access with structured trip and booking data.",
        bullets: ["Key Contents: QR code, booking ID, vehicle number, parking slot, arrival/departure time", "Operational Role: Helps on-site validation", "Extended Benefit: Start Navigation CTA connects booking to movement"],
      },
      {
        number: "15.10",
        title: "My Booking — Overview / Active / Cancelled",
        body: "The My Booking section gives the user operational control after reservation. Booking cards present time, pricing, position, and status in a compact format. State filtering through All Booking, Active, and Cancelled tabs improves clarity and reduces information overload.",
        bullets: ["Overview: Central place to monitor all bookings", "Active: Encourages direct action through Get Direction", "Cancelled: Uses red destructive color for immediate recognition"],
      },
    ],
  },
];
