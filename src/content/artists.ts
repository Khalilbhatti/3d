import type { Artist } from "./types";

/**
 * PLACEHOLDER CONTENT — every name, date and biography below is invented for
 * demonstration. Replace with real contributor records. See CONTENT_EDITING.md.
 */
export const artists: Artist[] = [
  {
    id: "marrow",
    slug: "isolde-marrow",
    name: "Isolde Marrow",
    role: "Founding luminist",
    lifespan: "c. 1698 – 1761",
    origin: "Saltmeadow, Auren Coast",
    activePeriod: "1719 – 1760",
    mediums: ["Egg tempera", "Ground earth", "Silverpoint"],
    summary:
      "The painter credited with turning the Auren horizon into a subject in its own right.",
    bio: [
      "Isolde Marrow trained as a mapmaker's assistant before abandoning the drafting table for the tidal flats north of Saltmeadow. Working almost entirely at first and last light, she developed a method of laying thin, luminous tempera over a warm ground — a technique later students called 'reading the paper through the paint'.",
      "Marrow kept no studio of note and exhibited rarely. What survives is a body of roughly two hundred small panels, most no larger than a folded letter, in which weather, water and distance are treated with a patience that borders on devotion.",
    ],
    statement:
      "I do not paint the sea. I paint the hour that the sea happens to be wearing.",
    seed: "marrow-portrait",
    palette: { from: "#E8C48A", via: "#C98B4B", to: "#7A3F1E", ink: 0.08 },
    relatedArtworkIds: ["a-tideline", "a-saltmeadow-dawn", "a-low-water", "a-first-light"],
  },
  {
    id: "vael",
    slug: "caspian-vael",
    name: "Caspian Vael",
    role: "Nocturne painter",
    lifespan: "1722 – 1790",
    origin: "Harbour Wing, Old Customs House",
    activePeriod: "1748 – 1789",
    mediums: ["Oil on prepared linen", "Lamp-black glaze"],
    summary:
      "Master of the harbour at night — lantern, tide and the long dark between them.",
    bio: [
      "Where Marrow chased the dawn, Caspian Vael waited for the town to go dark. He is thought to have worked from a shuttered room above the customs house, painting the same stretch of quay across four decades and every season of weather.",
      "Vael's nocturnes are built from dozens of near-black glazes, each allowed to cure for days. The result is a darkness that is never empty: hold a lantern to the canvas and figures, ropes and reflected fire emerge from the deep.",
    ],
    statement: "Give me one honest lantern and I will show you the whole night.",
    seed: "vael-portrait",
    palette: { from: "#2A3550", via: "#1A2136", to: "#0C0F1C", ink: 0.2 },
    relatedArtworkIds: ["a-lantern-quay", "a-black-tide", "a-harbour-watch", "a-ninth-bell"],
  },
  {
    id: "serre",
    slug: "ondine-serre",
    name: "Ondine Serré",
    role: "Court illuminator",
    lifespan: "c. 1735 – 1799",
    origin: "The Reed Court, Auren Coast",
    activePeriod: "1755 – 1798",
    mediums: ["Gold leaf", "Gouache on vellum", "Ground lapis"],
    summary:
      "Illuminator to the Reed Court, whose margins hold entire weather systems.",
    bio: [
      "Ondine Serré illuminated charters, tide-tables and marriage contracts for the minor court at Reed. Her official work is exacting; her marginalia is where the Auren imagination runs loose — storms, sea-birds and small silver fish threaded between the lines of law.",
      "Serré is now studied less for the documents she decorated than for the borders she could not help but fill. Her palette of lapis, gold and lead-white set the register for a century of Auren manuscript work.",
    ],
    statement: "The law is written in the centre. The truth I keep in the margins.",
    seed: "serre-portrait",
    palette: { from: "#EAD9B5", via: "#D2B77E", to: "#9A7A3E", ink: 0.06 },
    relatedArtworkIds: ["a-tide-charter", "a-margin-storm", "a-silver-fish", "a-reed-hours"],
  },
  {
    id: "reyne",
    slug: "thomas-reyne",
    name: "Thomas Reyne",
    role: "Cartographer-painter",
    lifespan: "1760 – 1828",
    origin: "Saltmeadow, Auren Coast",
    activePeriod: "1782 – 1827",
    mediums: ["Watercolour", "Ink wash", "Bodycolour"],
    summary:
      "Surveyed the coast by day and painted its dissolving edges by evening.",
    bio: [
      "Thomas Reyne inherited Marrow's tidal flats and a surveyor's discipline. His coastal studies begin as measured drawings and end as something looser — a record of exactly where the land agreed to stop being land.",
      "Reyne's late watercolours abandon the coastline almost entirely, becoming studies of haze, salt and reflected sky. They form the bridge between the founding luminists and the modern archive.",
    ],
    statement: "Every survey is a lie the tide agrees to for a single afternoon.",
    seed: "reyne-portrait",
    palette: { from: "#B9C1A0", via: "#8E9B72", to: "#4E5637", ink: 0.05 },
    relatedArtworkIds: ["a-survey-haze", "a-sand-index", "a-estuary", "a-first-light"],
  },
  {
    id: "ashcombe",
    slug: "mireille-ashcombe",
    name: "Mireille Ashcombe",
    role: "Indigo dyer & painter",
    lifespan: "c. 1755 – 1820",
    origin: "The Dye Yards, Auren Coast",
    activePeriod: "1778 – 1819",
    mediums: ["Indigo", "Resist-dye on cloth", "Watercolour"],
    summary: "Turned the dye-yard trade of indigo into a language of depth.",
    bio: [
      "Mireille Ashcombe worked among the indigo dye-yards, where cloth is dipped, oxidised and dipped again until blue becomes almost black. She carried that logic of repeated immersion into painting, layering washes until the surface holds a physical sense of depth.",
      "Her collaboration with the colourist Aurelio Bann produced the pigments that define the Indigo Series — a body of work that treats a single colour as an entire climate.",
    ],
    statement: "Blue is not a colour. It is how far away a thing has decided to be.",
    seed: "ashcombe-portrait",
    palette: { from: "#3A4A6B", via: "#26324E", to: "#12172A", ink: 0.14 },
    relatedArtworkIds: ["a-seventh-dip", "a-indigo-field", "a-resist-tide", "a-night-cloth"],
  },
  {
    id: "bann",
    slug: "aurelio-bann",
    name: "Aurelio Bann",
    role: "Pigment chemist & colourist",
    lifespan: "1740 – 1811",
    origin: "Old Customs House, Auren Coast",
    activePeriod: "1766 – 1810",
    mediums: ["Pigment", "Ground mineral", "Oil"],
    summary:
      "The chemist whose ground pigments gave the school its unmistakable warmth.",
    bio: [
      "Aurelio Bann was less a painter than a maker of the means to paint. His notebooks catalogue hundreds of trials in grinding, washing and binding earth pigments drawn from the cliffs and dye-yards of the coast.",
      "Bann supplied Marrow, Vael and Ashcombe alike. The archive holds his sample cards as artworks in their own right — grids of colour that read, two centuries on, as quiet abstractions.",
    ],
    statement: "A colour is a promise about light that the ground has to keep.",
    seed: "bann-portrait",
    palette: { from: "#D98B5F", via: "#B15A32", to: "#6E2E15", ink: 0.07 },
    relatedArtworkIds: ["a-sample-card", "a-earth-index", "a-seventh-dip"],
  },
  {
    id: "okonkwo",
    slug: "livia-okonkwo",
    name: "Livia Okonkwo",
    role: "Custodian & conservator",
    lifespan: "b. 1981",
    origin: "Present day",
    activePeriod: "2009 – present",
    mediums: ["Conservation", "Photography", "Written study"],
    summary:
      "The archive's present-day custodian, restoring the school and answering it.",
    bio: [
      "Livia Okonkwo directs the conservation of the Auren holdings and is the author of most of the modern catalogue. Her practice sits between restoration and response — stabilising fragile panels while making new photographic studies of the same light the founders chased.",
      "The Present Tide collection gathers her work: not imitations of the school, but a contemporary attempt to keep looking at the coast with the same attention.",
    ],
    statement:
      "Conservation is just the slowest possible way of paying attention.",
    seed: "okonkwo-portrait",
    palette: { from: "#9FC0B1", via: "#5E8C7C", to: "#2E4A40", ink: 0.05 },
    relatedArtworkIds: ["a-present-tide", "a-relit", "a-same-quay"],
  },
];
