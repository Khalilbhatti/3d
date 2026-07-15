import type { Story } from "./types";

/** PLACEHOLDER CONTENT — invented essays for demonstration. Long-form journal
 *  entries are authored as structured blocks so they can be edited without
 *  touching the layout. See docs/CONTENT_EDITING.md for the block reference. */
export const stories: Story[] = [
  {
    id: "s-reading-the-paper",
    slug: "reading-the-paper-through-the-paint",
    title: "Reading the Paper Through the Paint",
    dek: "How Isolde Marrow turned a mapmaker's discipline into the founding technique of an entire school.",
    author: "Livia Okonkwo",
    authorRole: "Custodian & conservator",
    date: "2025-03-18",
    displayDate: "18 March 2025",
    readingTime: "8 min read",
    category: "Technique",
    seed: "story-reading",
    palette: { from: "#E8C48A", via: "#C98B4B", to: "#7A3F1E", ink: 0.06 },
    blocks: [
      {
        type: "paragraph",
        lead: true,
        text: "There is a moment, in almost every Marrow panel, where the paint simply stops — where the warm ground of the board is allowed to stand for light itself. Learning to see that moment is learning to read the school.",
      },
      {
        type: "paragraph",
        text: "Marrow trained as a mapmaker's assistant, and it shows. Her panels begin as measured things: a horizon set with a straightedge, a division of the surface into registers as exact as a surveyor's field. What she did next was quietly radical. Instead of building the light up in opaque layers, she thinned her tempera almost to a stain and let the board glow through it.",
      },
      { type: "heading", text: "The ground as a light source" },
      {
        type: "paragraph",
        text: "Conservators describe the effect as 'reading the paper through the paint'. The warm gesso ground is never fully covered; it is rationed. Where Marrow wants the brightest passage — the seam of dawn on wet sand — she uses almost no pigment at all, trusting the ground to do the work.",
      },
      {
        type: "pullquote",
        text: "She did not paint the light. She uncovered it, the way you might wipe condensation from a window.",
        cite: "From the conservation notes",
      },
      {
        type: "image",
        artworkId: "a-tideline",
        caption: "The Tideline (1731). Note how the brightest band carries the least paint.",
        alt: "Detail of a luminous horizontal band in a warm tempera coastal panel.",
      },
      {
        type: "paragraph",
        text: "Under magnification, the technique is unmistakable. The silverpoint underdrawing survives beneath the thinnest passages, and the tempera sits in the tooth of the ground rather than on top of it. It is a method that cannot be rushed and cannot be corrected — each stroke is a decision the board remembers.",
      },
      {
        type: "gallery",
        artworkIds: ["a-saltmeadow-dawn", "a-low-water", "a-first-light"],
      },
      {
        type: "audio",
        label: "Studio note — grinding the ground",
        duration: "3:41",
        caption: "Placeholder audio: a walkthrough of preparing a Marrow-style warm gesso ground.",
      },
      {
        type: "paragraph",
        text: "A century later, Thomas Reyne would take the same trust in the ground and push it until the coastline disappeared. But the principle was Marrow's, set on the flats north of Saltmeadow in the 1730s: the surest way to paint light is to know exactly where to leave the surface alone.",
      },
      {
        type: "footnote",
        id: 1,
        text: "Placeholder citation. Replace with a real bibliographic reference in src/content/stories.ts.",
      },
    ],
    relatedArtworkIds: ["a-tideline", "a-saltmeadow-dawn", "a-first-light"],
    relatedStoryIds: ["s-tide-tables", "s-thirty-glazes"],
  },
  {
    id: "s-tide-tables",
    slug: "the-weather-in-the-margins",
    title: "The Weather in the Margins",
    dek: "Ondine Serré illuminated the driest documents of the Reed Court — and could not stop the coast from getting in.",
    author: "Livia Okonkwo",
    authorRole: "Custodian & conservator",
    date: "2025-01-27",
    displayDate: "27 January 2025",
    readingTime: "6 min read",
    category: "History",
    seed: "story-margins",
    palette: { from: "#EAD9B5", via: "#CFB073", to: "#8F6E33", ink: 0.05 },
    blocks: [
      {
        type: "paragraph",
        lead: true,
        text: "Read the centre of an Ondine Serré page and you learn the tides of a single spring in the year 1762. Read the margins and you learn what she thought about while she copied them out.",
      },
      {
        type: "paragraph",
        text: "Serré was the illuminator to a minor court, and most of her surviving work is functional: charters, tide-tables, marriage contracts. The official hand is exact and impersonal. But around the edges, the coast leaks in — sea-birds, small silver fish, a storm circling a contract like weather around a harbour.",
      },
      {
        type: "pullquote",
        text: "The law is written in the centre. The truth I keep in the margins.",
        cite: "Ondine Serré (attributed)",
      },
      {
        type: "image",
        artworkId: "a-margin-storm",
        caption: "Margin Storm (1769). A tempest confined entirely to the border of a marriage contract.",
        alt: "A vellum page with a swirling storm painted in blue and gold around a block of formal script.",
      },
      {
        type: "paragraph",
        text: "The materials were not cheap. Serré worked in ground lapis, gold leaf and lead-white, and the archive's technical study suggests she occasionally diverted a rare consignment of pigment from official work into her marginalia. The court paid for law; it received, without knowing it, a private cosmology.",
      },
      {
        type: "video",
        label: "Turning the Reed Hours",
        caption: "Placeholder video: a page-turn study of Serré's most ambitious surviving manuscript.",
      },
      {
        type: "paragraph",
        text: "We now study Serré less for the documents she decorated than for the borders she could not leave empty. Her palette set the register for a century of Auren manuscript work — proof that the school's imagination was, from the start, something that happened at the edges.",
      },
      {
        type: "footnote",
        id: 1,
        text: "Placeholder citation. Replace with a real archival reference.",
      },
    ],
    relatedArtworkIds: ["a-tide-charter", "a-margin-storm", "a-reed-hours"],
    relatedStoryIds: ["s-reading-the-paper", "s-seven-dips"],
  },
  {
    id: "s-thirty-glazes",
    slug: "thirty-glazes-of-dark",
    title: "Thirty Glazes of Dark",
    dek: "Caspian Vael spent a year on a single painting of the harbour at night. Conservation reveals why.",
    author: "Livia Okonkwo",
    authorRole: "Custodian & conservator",
    date: "2024-11-09",
    displayDate: "9 November 2024",
    readingTime: "7 min read",
    category: "Conservation",
    seed: "story-glazes",
    palette: { from: "#2E3A57", via: "#1B2338", to: "#0A0D18", ink: 0.2 },
    blocks: [
      {
        type: "paragraph",
        lead: true,
        text: "To the eye, Lantern on the Quay is a single depth of black. To the conservator's lamp, it is more than thirty separate nights, each one cured, judged, and buried beneath the next.",
      },
      {
        type: "paragraph",
        text: "Caspian Vael painted the same stretch of quay for forty years. His method was subtraction by accumulation: dozens of near-black lamp-black glazes, each allowed to cure for days before the next was laid. The darkness that results is never flat. It has weather in it.",
      },
      {
        type: "image",
        artworkId: "a-lantern-quay",
        caption: "Lantern on the Quay (1759). More than thirty glazes cured over a full year.",
        alt: "A dark harbour nocturne with a single warm lantern glowing on a stone quay.",
      },
      {
        type: "pullquote",
        text: "Give me one honest lantern and I will show you the whole night.",
        cite: "Caspian Vael (attributed)",
      },
      {
        type: "paragraph",
        text: "Raking-light photography — the technique behind the Present Tide work Relit — pulls figures out of the deep that the naked eye cannot find. In Harbour Watch, a second figure emerges beside the first: the watch was once a pair, and Vael painted one of them out.",
      },
      {
        type: "gallery",
        artworkIds: ["a-black-tide", "a-harbour-watch", "a-ninth-bell"],
      },
      {
        type: "audio",
        label: "Field recording — the ninth bell",
        duration: "2:12",
        caption: "Placeholder audio: the harbour bell that structured Vael's working nights.",
      },
      {
        type: "paragraph",
        text: "The last nocturne, The Ninth Bell, is so dark it was long assumed to be degraded varnish. It is not. Vael meant it. At the end of forty years he had painted his way almost entirely out of the light, and he knew exactly what he was doing.",
      },
    ],
    relatedArtworkIds: ["a-lantern-quay", "a-harbour-watch", "a-ninth-bell"],
    relatedStoryIds: ["s-reading-the-paper", "s-seven-dips"],
  },
  {
    id: "s-seven-dips",
    slug: "the-count-of-seven",
    title: "The Count of Seven",
    dek: "In the indigo dye-yards, Mireille Ashcombe learned to measure a colour by how many times it had been drowned.",
    author: "Livia Okonkwo",
    authorRole: "Custodian & conservator",
    date: "2024-09-02",
    displayDate: "2 September 2024",
    readingTime: "5 min read",
    category: "Material",
    seed: "story-seven",
    palette: { from: "#3F517A", via: "#283656", to: "#141C34", ink: 0.14 },
    blocks: [
      {
        type: "paragraph",
        lead: true,
        text: "Indigo does not arrive as blue. It arrives, improbably, as green, and turns blue only in the seconds it meets the air. Mireille Ashcombe built an entire body of work on that transformation.",
      },
      {
        type: "paragraph",
        text: "In the dye-yards, cloth is dipped, lifted, oxidised, and dipped again. Each immersion deepens the colour. Ashcombe carried the logic of the yard straight into painting, layering washes until the surface holds a physical sense of depth — and she titled the works by their count of dips.",
      },
      {
        type: "pullquote",
        text: "Blue is not a colour. It is how far away a thing has decided to be.",
        cite: "Mireille Ashcombe (attributed)",
      },
      {
        type: "image",
        artworkId: "a-seventh-dip",
        caption: "The Seventh Dip (1789). The immersion at which blue turns to night.",
        alt: "A large deep-blue field of indigo-dyed cloth with subtle tonal variation.",
      },
      {
        type: "paragraph",
        text: "Her collaborator Aurelio Bann supplied the means. His sample cards — grids of ground pigment made purely to test binding and grind — now hang as artworks in their own right. The two of them treated a single colour as an entire climate, and the archive still uses Bann's cards to identify pigments across the whole school.",
      },
      {
        type: "gallery",
        artworkIds: ["a-indigo-field", "a-resist-tide", "a-sample-card"],
      },
      {
        type: "footnote",
        id: 1,
        text: "Placeholder citation. Replace with a real material-analysis reference.",
      },
    ],
    relatedArtworkIds: ["a-seventh-dip", "a-resist-tide", "a-sample-card"],
    relatedStoryIds: ["s-thirty-glazes", "s-tide-tables"],
  },
];
