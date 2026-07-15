import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { brand, palette } from "@/config/theme";
import { ThemeStyle } from "@/components/providers/ThemeStyle";
import { GlobalFluidBackground } from "@/components/fluid-background/GlobalFluidBackground";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { SkipLink } from "@/components/site/SkipLink";
import { SiteChrome } from "@/components/site/SiteChrome";
import { Preloader } from "@/components/site/Preloader";
import { Footer } from "@/components/site/Footer";

/* Optimised, self-hosted fonts via next/font — no layout shift, no external
   requests at runtime. Swap the families here to re-typeset the whole site. */
const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  style: ["normal", "italic"],
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://auren-archive.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${brand.full} — ${brand.tagline}`,
    template: `%s · ${brand.name}`,
  },
  description: brand.description,
  applicationName: brand.full,
  authors: [{ name: brand.full }],
  keywords: [
    "art archive",
    "museum",
    "heritage",
    "painting",
    "editorial",
    "scroll storytelling",
    brand.name,
  ],
  openGraph: {
    type: "website",
    siteName: brand.full,
    title: brand.full,
    description: brand.description,
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: brand.full,
    description: brand.tagline,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: palette.paper,
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="grain min-h-screen bg-paper font-sans text-ink-soft antialiased">
        <ThemeStyle />
        <GlobalFluidBackground />
        <Preloader />
        <SkipLink />
        <SmoothScrollProvider>
          <SiteChrome />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
