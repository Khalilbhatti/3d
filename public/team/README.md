# Team photos

Drop a headshot in this folder and it replaces the generated placeholder on that
team member's card and detail page automatically — no code change needed.

## Filenames

The filename must match the team member's slug. Any of `.jpg`, `.jpeg`, `.png`
or `.webp` works:

| File                             | Card                     |
| -------------------------------- | ------------------------ |
| `full-stack-developers.jpg`      | Full-Stack Developers    |
| `ui-ux-designers.jpg`            | UI/UX Designers          |
| `digital-marketers.jpg`          | Digital Marketers        |
| `wordpress-developers.jpg`       | WordPress Developers     |
| `gohighlevel-specialists.jpg`    | GoHighLevel Specialists  |
| `qa-project-managers.jpg`        | QA & Project Managers    |

## Image guidance

- **Aspect ratio 4:5** (portrait). Other ratios are centre-cropped from the top,
  so faces stay in frame — but 4:5 gives the cleanest result.
- **~800×1000px** is plenty. Larger files are fine; Next.js generates responsive
  AVIF/WebP variants at build time.
- Photos are cropped `object-top`, so leave a little headroom above the head.

The lookup happens at build time in
`src/components/artists/ArtistPortrait.tsx`. A missing file falls back to the
generated placeholder, so the site never ships a broken image.
