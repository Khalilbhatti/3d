import type { Chapter } from "./types";

/**
 * The home page is a long-form, scroll-driven narrative broken into chapters.
 * Each chapter drives a scene: background colour, imagery, typography.
 * These are the GitzTech home sections — about, approach, talent, process,
 * proof and services. The scroll system reads this array in order; the
 * animated services showcase (<ExploreCollection>) is inserted between
 * chapters 2 and 3 by <HomeStory>, in the slot "Our Services" used to occupy;
 * that chapter now closes the sequence instead.
 */
export const chapters: Chapter[] = [
  {
    id: "ch-about",
    index: "01",
    kicker: "About Us",
    title: "Where innovation meets business success.",
    lede:
      "We grow businesses with technology — cutting-edge tools and innovative solutions that streamline operations, enhance customer experiences, and drive growth.",
    body:
      "GitzTech is a Lahore-based digital agency built on a simple promise: every byte in excellence. Over four years we've delivered 200+ projects and earned the trust of 2,000+ customers across the globe — bringing together developers, designers, marketers and CRM specialists who share one mindset.",
    quote: {
      text: "We don't just complete projects; we partner with businesses to streamline operations, elevate brands, and fuel sustainable growth.",
      cite: "GitzTech",
    },
    date: "4 Years",
    location: "Years of experience",
    artworkIds: ["prj-food", "prj-crafting"],
    palette: { from: "#2E5C99", via: "#1B3A63", to: "#0B1F3D", ink: 0.18 },
  },
  {
    id: "ch-approach",
    index: "02",
    kicker: "Our Approach",
    title: "Problem solving, then the right solution.",
    lede:
      "We identify and resolve challenges within your business efficiently — with the right technology, not the loudest one.",
    body:
      "Every engagement starts by understanding what's actually slowing you down: manual re-entry, leads going cold, a site nobody can update, a checkout that quietly loses orders. Only then do we choose the technology. The result is a technology-driven solution that streamlines operations and drives sustainable growth, rather than a tool you now have to manage.",
    date: "200+",
    location: "Completed projects",
    artworkIds: ["prj-wholesale", "prj-mindway"],
    palette: { from: "#FFB347", via: "#C97A1A", to: "#2E1B05", ink: 0.18 },
  },
  {
    id: "ch-talent",
    index: "03",
    kicker: "Hire Talent",
    title: "Empower your vision — hire top developers today.",
    lede:
      "At GitzTech, we connect businesses with top developers to transform ideas into reality. Find the perfect tech partner today.",
    body:
      "Regardless of your business size, we have the expertise to create a custom plan tailored to your goals. Choose a plan, describe your vision, and our team gets to work — keeping you informed every step of the way with full transparency. Flexible payment options to suit your needs, with clear pricing and no hidden fees.",
    quote: {
      text: "Pick a plan, tell us the goal, and we start planning your solution within 48 hours.",
      cite: "How it works",
    },
    date: "48h",
    location: "To a working plan",
    artworkIds: ["prj-stitcher"],
    palette: { from: "#6B8FC4", via: "#33547F", to: "#101F33", ink: 0.16 },
  },
  {
    id: "ch-process",
    index: "04",
    kicker: "Work Process",
    title: "Our development process.",
    lede:
      "We use a structured development process to deliver high-quality products and services. Here's the short version.",
    body:
      "First we generate ideas — mapping the problem and the support your business actually needs. Then design and prototyping, the critical phase that makes sure the final product meets expectations before it's built. Finally the solution itself: a comprehensive approach that carries an idea through to flawless delivery.",
    date: "3 Steps",
    location: "Idea → design → delivery",
    artworkIds: ["prj-food"],
    palette: { from: "#FF9807", via: "#B35F00", to: "#2A1500", ink: 0.16 },
  },
  {
    id: "ch-why",
    index: "05",
    kicker: "Why Choose Us",
    title: "Choose us for quality and exceptional service.",
    lede:
      "We provide custom software solutions for any industry — creating high-value software and technology that drives real business results.",
    body:
      "Four years, 200+ completed projects, 2,000+ happy customers and 5+ awards. We sweat the smallest details, holding every line of code, pixel and campaign to a standard we'd proudly put our own name on — and we work as a transparent extension of your team from kickoff to long after launch.",
    quote: {
      text: "Great communication, great skills, project finished way ahead of schedule. I would be glad to work again with him.",
      cite: "malik_khurram · Fiverr",
    },
    date: "2k+",
    location: "Happy customers",
    artworkIds: ["prj-ngo", "prj-wholesale"],
    palette: { from: "#FFA733", via: "#B36B12", to: "#2E1A05", ink: 0.16 },
  },
  {
    id: "ch-services",
    index: "06",
    kicker: "Our Services",
    title: "We deliver exceptional services.",
    lede:
      "A dedicated team focused on quality, innovation, and measurable results — across every discipline your business needs.",
    body:
      "Web and app development, digital marketing, WordPress, GoHighLevel CRM, graphic design and UI/UX — six disciplines, one connected team. From idea to launch and beyond, it's end-to-end digital services built to grow your business, all under one roof.",
    date: "6",
    location: "Core disciplines",
    artworkIds: ["prj-beauty", "prj-ngo"],
    palette: { from: "#4A78B8", via: "#2A4A73", to: "#0D1E33", ink: 0.16 },
  },
];
