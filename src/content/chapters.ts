import type { Chapter } from "./types";

/**
 * The home page is a long-form, scroll-driven narrative broken into chapters.
 * Each chapter drives a pinned scene: background colour, imagery, typography.
 * PLACEHOLDER CONTENT — rewrite freely; the scroll system reads this array.
 */
export const chapters: Chapter[] = [
  {
    id: "ch-origin",
    index: "01",
    kicker: "Historical origin",
    title: "It began on the flats north of Saltmeadow.",
    lede: "A mapmaker's assistant put down her straightedge and started painting the hour, not the place.",
    body: "Isolde Marrow worked at first and last light, laying tempera so thin the board glowed through it. She kept no studio of note and exhibited rarely. What survives is two hundred small panels in which weather, water and distance are treated with a patience that borders on devotion.",
    quote: {
      text: "I do not paint the sea. I paint the hour that the sea happens to be wearing.",
      cite: "Isolde Marrow, c. 1731",
    },
    date: "1719",
    location: "Saltmeadow, Auren Coast",
    artworkIds: ["a-tideline", "a-saltmeadow-dawn", "a-first-light"],
    palette: { from: "#E8C48A", via: "#C98B4B", to: "#7A3F1E", ink: 0.06 },
  },
  {
    id: "ch-development",
    index: "02",
    kicker: "Artistic development",
    title: "A discipline of leaving the surface alone.",
    lede: "The founding technique passed from hand to hand: trust the ground, ration the paint.",
    body: "Where Marrow chased the dawn, her successors widened the idea. Thomas Reyne brought a surveyor's grid and then let it dissolve into salt haze. The school learned that the surest way to paint light is to know exactly where to stop.",
    quote: {
      text: "Every survey is a lie the tide agrees to for a single afternoon.",
      cite: "Thomas Reyne, 1804",
    },
    date: "1782",
    location: "Map Room",
    artworkIds: ["a-survey-haze", "a-sand-index", "a-estuary"],
    palette: { from: "#B9C1A0", via: "#8E9B72", to: "#4E5637", ink: 0.05 },
  },
  {
    id: "ch-works",
    index: "03",
    kicker: "Important works",
    title: "Then Caspian Vael turned out the lights.",
    lede: "Forty years, one stretch of quay, a darkness built glaze by glaze until it was never empty.",
    body: "Vael waited for the town to go dark and painted what was left. His nocturnes are dozens of near-black glazes, each cured for days. Hold a lantern to the canvas and figures, ropes and reflected fire emerge from the deep.",
    quote: {
      text: "Give me one honest lantern and I will show you the whole night.",
      cite: "Caspian Vael, c. 1759",
    },
    date: "1759",
    location: "Old Customs House",
    artworkIds: ["a-lantern-quay", "a-harbour-watch", "a-ninth-bell"],
    palette: { from: "#2E3A57", via: "#1B2338", to: "#0A0D18", ink: 0.24 },
  },
  {
    id: "ch-context",
    index: "04",
    kicker: "Cultural context",
    title: "Weather crept into the margins of the law.",
    lede: "Ondine Serré illuminated charters and contracts, and could not keep the coast out of the borders.",
    body: "The official hand is exact; the marginalia runs loose with storms, sea-birds and small silver fish. Serré's lapis-and-gold register set the standard for a century of Auren manuscript work — the imagination always happening at the edges.",
    quote: {
      text: "The law is written in the centre. The truth I keep in the margins.",
      cite: "Ondine Serré, c. 1762",
    },
    date: "1762",
    location: "The Reed Court",
    artworkIds: ["a-tide-charter", "a-margin-storm", "a-reed-hours"],
    palette: { from: "#EAD9B5", via: "#CFB073", to: "#8F6E33", ink: 0.05 },
  },
  {
    id: "ch-indigo",
    index: "05",
    kicker: "One colour as a climate",
    title: "In the dye-yards, blue became a distance.",
    lede: "Mireille Ashcombe measured a colour by how many times it had been drowned.",
    body: "Cloth is dipped, oxidised, and dipped again until blue becomes almost black. Ashcombe carried that logic into painting and titled the works by their count of dips. The Seventh Dip is where blue turns to night; Night Cloth is where it disappears.",
    quote: {
      text: "Blue is not a colour. It is how far away a thing has decided to be.",
      cite: "Mireille Ashcombe, c. 1789",
    },
    date: "1789",
    location: "The Dye Yards",
    artworkIds: ["a-seventh-dip", "a-resist-tide", "a-night-cloth"],
    palette: { from: "#3F517A", via: "#283656", to: "#141C34", ink: 0.14 },
  },
  {
    id: "ch-present",
    index: "06",
    kicker: "Present-day relevance",
    title: "The coast is still there. Still worth the attention.",
    lede: "Three centuries on, the archive returns to the same flats at the same hours.",
    body: "Livia Okonkwo's Present Tide is not a pastiche of the school but an attempt to keep looking — rephotographing Marrow's dawns, relighting Vael's nights, measuring how much the Auren light has changed by paying it the founding patience.",
    quote: {
      text: "Conservation is just the slowest possible way of paying attention.",
      cite: "Livia Okonkwo, 2019",
    },
    date: "2009",
    location: "The Auren Archive",
    artworkIds: ["a-present-tide", "a-relit", "a-same-quay"],
    palette: { from: "#A6C0B2", via: "#67907E", to: "#33564A", ink: 0.05 },
  },
];
