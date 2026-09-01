import type { MetadataRoute } from "next";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gitztech.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // Explicitly allow the major AI crawlers/answer engines — the site
      // publishes long-form AI/automation content specifically to be
      // discoverable there, not just in classic search.
      { userAgent: ["GPTBot", "Google-Extended", "PerplexityBot", "ClaudeBot", "anthropic-ai"], allow: "/" },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
