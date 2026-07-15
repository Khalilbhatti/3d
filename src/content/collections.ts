import type { Collection } from "./types";

/** PLACEHOLDER CONTENT — invented collections for demonstration. */
export const collections: Collection[] = [
  {
    id: "luminist",
    slug: "luminist-landscapes",
    title: "Luminist Landscapes",
    subtitle: "The founding light",
    period: "1719 – 1828",
    curator: "Livia Okonkwo",
    summary:
      "The panels and washes that made the Auren horizon a subject in its own right.",
    intro:
      "Everything the Auren School would become begins here, on the tidal flats north of Saltmeadow, where Isolde Marrow learned to read the paper through the paint and Thomas Reyne, a century later, let the coastline dissolve entirely.",
    statement: [
      "Luminist Landscapes gathers the school's founding preoccupation: not the sea, not the land, but the negotiated seam of light between them. The works are small, often no larger than a folded letter, and they reward the same patience they were made with.",
      "Read in sequence, the collection traces a single idea loosening its grip — from Marrow's exact dawns to Reyne's late estuaries, where measurement gives way to memory and the horizon finally lets go.",
    ],
    seed: "col-luminist",
    palette: { from: "#E8C48A", via: "#C98B4B", to: "#7A3F1E", ink: 0.06 },
    featuredArtistIds: ["marrow", "reyne"],
    artworkIds: [
      "a-tideline",
      "a-saltmeadow-dawn",
      "a-low-water",
      "a-first-light",
      "a-survey-haze",
      "a-sand-index",
      "a-estuary",
    ],
    relatedStoryIds: ["s-reading-the-paper", "s-tide-tables"],
    timelineIds: ["t-1719", "t-1731", "t-1804", "t-1819"],
    credits: [
      { role: "Curation", name: "Livia Okonkwo" },
      { role: "Conservation", name: "Auren Conservation Studio" },
      { role: "Photography", name: "Field Study Unit" },
    ],
  },
  {
    id: "nocturnes",
    slug: "coastal-nocturnes",
    title: "Coastal Nocturnes",
    subtitle: "The long dark",
    period: "1748 – 1789",
    curator: "Livia Okonkwo",
    summary:
      "Caspian Vael's forty-year vigil over a single stretch of quay after nightfall.",
    intro:
      "For four decades Caspian Vael painted the same harbour in the dark. The Nocturnes are the result: a darkness that is never empty, built glaze by glaze until a lantern, a rope, a keeping figure surface from the deep.",
    statement: [
      "Coastal Nocturnes is the school's most concentrated body of work — one painter, one view, one condition of light explored to exhaustion. Vael cured each lamp-black glaze for days, and the collection asks to be seen slowly, in low light, the way it was made.",
      "Hung today beside Mireille Ashcombe's deepest indigos, the Nocturnes reveal two entirely different routes to the same darkness: one through oil and patience, the other through dye and repetition.",
    ],
    seed: "col-nocturnes",
    palette: { from: "#2E3A57", via: "#1B2338", to: "#0A0D18", ink: 0.22 },
    featuredArtistIds: ["vael"],
    artworkIds: ["a-lantern-quay", "a-black-tide", "a-harbour-watch", "a-ninth-bell"],
    relatedStoryIds: ["s-thirty-glazes"],
    timelineIds: ["t-1759", "t-1783"],
    credits: [
      { role: "Curation", name: "Livia Okonkwo" },
      { role: "Technical study", name: "Auren Conservation Studio" },
    ],
  },
  {
    id: "manuscripts",
    slug: "court-manuscripts",
    title: "Court Manuscripts",
    subtitle: "Weather in the margins",
    period: "1755 – 1799",
    curator: "Livia Okonkwo",
    summary:
      "Ondine Serré's illuminated charters, where entire storms circle the letter of the law.",
    intro:
      "Ondine Serré illuminated the dry business of the Reed Court — tide-tables, charters, contracts — and could not help filling their margins with the living coast. The documents survive because of their function; we keep them for everything she added beyond it.",
    statement: [
      "Court Manuscripts sets the register for a century of Auren decorative work: lapis, gold and lead-white deployed with a precision that never quite contains the imagination behind it.",
      "The collection is best read twice — once for the centred, official text, and once for the marginal weather that comments on it, argues with it, and finally outlasts it.",
    ],
    seed: "col-manuscripts",
    palette: { from: "#EAD9B5", via: "#CFB073", to: "#8F6E33", ink: 0.05 },
    featuredArtistIds: ["serre"],
    artworkIds: ["a-tide-charter", "a-margin-storm", "a-silver-fish", "a-reed-hours"],
    relatedStoryIds: ["s-tide-tables"],
    timelineIds: ["t-1762", "t-1781"],
    credits: [
      { role: "Curation", name: "Livia Okonkwo" },
      { role: "Vellum conservation", name: "Reed Court Trust" },
    ],
  },
  {
    id: "indigo",
    slug: "the-indigo-series",
    title: "The Indigo Series",
    subtitle: "One colour as a climate",
    period: "1778 – 1820",
    curator: "Livia Okonkwo",
    summary:
      "Mireille Ashcombe and Aurelio Bann treat a single blue as an entire weather system.",
    intro:
      "Out of the dye-yards, where cloth is dipped and oxidised until blue becomes almost black, Mireille Ashcombe built a body of work that treats one colour as an entire climate — while the chemist Aurelio Bann gave the whole school its pigments.",
    statement: [
      "The Indigo Series counts its works by immersions. The Seventh Dip is where blue turns to night; Night Cloth is where it disappears. Between them lies a study of depth as a physical, accumulated fact.",
      "Bann's sample cards, never meant as art, close the collection — grids of ground pigment that read, two centuries on, as the school's earliest abstractions and its Rosetta stone.",
    ],
    seed: "col-indigo",
    palette: { from: "#3F517A", via: "#283656", to: "#141C34", ink: 0.14 },
    featuredArtistIds: ["ashcombe", "bann"],
    artworkIds: [
      "a-seventh-dip",
      "a-indigo-field",
      "a-resist-tide",
      "a-night-cloth",
      "a-sample-card",
      "a-earth-index",
    ],
    relatedStoryIds: ["s-seven-dips"],
    timelineIds: ["t-1789", "t-1796"],
    credits: [
      { role: "Curation", name: "Livia Okonkwo" },
      { role: "Textile conservation", name: "Dye Yards Cooperative" },
      { role: "Pigment analysis", name: "Bann Laboratory (est. 1766)" },
    ],
  },
  {
    id: "present-tide",
    slug: "present-tide",
    title: "Present Tide",
    subtitle: "The school, answered",
    period: "2009 – present",
    curator: "Livia Okonkwo",
    summary:
      "A contemporary response — not imitation, but the same coast seen with the same attention.",
    intro:
      "Present Tide gathers the archive's living practice: Livia Okonkwo's rephotography and conservation, made at the same flats and the same hours the founders worked, three centuries later.",
    statement: [
      "This collection is not a pastiche of the school. It is an attempt to keep looking — to measure how much the Auren light has changed by returning to it with modern tools and the founding patience.",
      "Set against Marrow's dawns and Vael's nights, Okonkwo's work closes the archive's loop and holds it open: the coast is still there, and it is still worth the attention.",
    ],
    seed: "col-present",
    palette: { from: "#A6C0B2", via: "#67907E", to: "#33564A", ink: 0.05 },
    featuredArtistIds: ["okonkwo"],
    artworkIds: ["a-present-tide", "a-relit", "a-same-quay"],
    relatedStoryIds: ["s-reading-the-paper", "s-thirty-glazes"],
    timelineIds: ["t-2009", "t-2023"],
    credits: [
      { role: "Photography & conservation", name: "Livia Okonkwo" },
      { role: "Archive direction", name: "The Auren Archive" },
    ],
  },
];
