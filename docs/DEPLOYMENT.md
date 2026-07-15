# Deployment guide (Vercel)

The Auren Archive is a standard Next.js App Router project and deploys to
[Vercel](https://vercel.com) with zero configuration. It also runs on any Node host
that supports Next.js 14 (Netlify, Render, a Docker container, etc.).

## 1. Push to a Git repository

```bash
git init
git add .
git commit -m "The Auren Archive"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

## 2. Import into Vercel

1. **New Project → Import** your repository.
2. Vercel auto-detects **Next.js** — no build settings to change.
   - Build command: `next build`
   - Output: `.next` (managed automatically)
   - Install command: `npm install`
3. Add environment variables (Project → Settings → Environment Variables):

   | Variable                       | Example                        | Purpose                                  |
   | ------------------------------ | ------------------------------ | ---------------------------------------- |
   | `NEXT_PUBLIC_SITE_URL`         | `https://auren-archive.com`    | Absolute metadata, OpenGraph, sitemap    |
   | `NEXT_PUBLIC_CONTACT_ENDPOINT` | `https://formspree.io/f/xxxx`  | Contact form POST target (optional)      |

4. **Deploy.** Subsequent pushes to `main` deploy automatically; pull requests get
   preview URLs.

## 3. Custom domain

Project → Settings → **Domains** → add your domain and follow the DNS instructions.
Update `NEXT_PUBLIC_SITE_URL` to match so `sitemap.xml`, `robots.txt` and social
metadata use absolute URLs.

## 4. Wire up the contact form

The form in `src/components/contact/ContactForm.tsx` works two ways:

- **No endpoint set** → it opens the visitor's mail client with a prefilled message
  to `brand.email` (zero backend). Good enough for a demo.
- **`NEXT_PUBLIC_CONTACT_ENDPOINT` set** → it `POST`s JSON
  (`{ name, email, subject, message }`) to that URL. Works with:
  - **Formspree** — create a form, use its endpoint URL.
  - **Resend / your API** — add a route handler at `app/api/contact/route.ts` and
    point the env var at `/api/contact`.

## 5. Remote images

If you serve real artwork from a CDN, whitelist the host in `next.config.mjs`
(`images.remotePatterns`) before deploying — see
[ASSET_REPLACEMENT.md](./ASSET_REPLACEMENT.md).

## 6. Pre-flight checklist

```bash
npm run lint
npm run typecheck
npm run build        # verify a clean production build locally
```

- [ ] Replaced placeholder content in `src/content/*` (or intentionally kept it).
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the production domain.
- [ ] Added `app/icon.png` and `app/opengraph-image.png`.
- [ ] Whitelisted any remote image hosts.
- [ ] Checked the site with reduced-motion enabled and via keyboard.

## Performance notes

- The single WebGL scene loads only on the home hero, is code-split
  (`next/dynamic`, `ssr:false`), skips reduced-motion / mobile / no-WebGL clients,
  and unmounts when scrolled offscreen.
- Fonts are self-hosted through `next/font` (no runtime requests, no CLS).
- All artwork uses `next/image` with per-component `sizes`; the placeholder system
  ships no binary assets, so first paint is immediate.
- Every route is statically rendered where possible; dynamic detail routes use
  `generateStaticParams` for full static generation.
