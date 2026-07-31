/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // The demo ships with a self-contained generated placeholder system, so no
    // remote hosts are required. When you swap in real artwork hosted on a CDN,
    // whitelist it here. See docs/ASSET_REPLACEMENT.md.
    remotePatterns: [
      // { protocol: "https", hostname: "images.your-cdn.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  transpilePackages: ["three"],
  // The portfolio/services/team/insights routes were previously named
  // archive/collections/artists/journal. Permanently redirect the old paths
  // so any indexed or bookmarked links keep working.
  async redirects() {
    return [
      { source: "/archive", destination: "/portfolio", permanent: true },
      { source: "/archive/:slug", destination: "/portfolio/:slug", permanent: true },
      { source: "/collections", destination: "/services", permanent: true },
      { source: "/collections/:slug", destination: "/services/:slug", permanent: true },
      { source: "/artists", destination: "/team", permanent: true },
      { source: "/artists/:slug", destination: "/team/:slug", permanent: true },
      { source: "/journal", destination: "/insights", permanent: true },
      { source: "/journal/:slug", destination: "/insights/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
