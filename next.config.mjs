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
};

export default nextConfig;
