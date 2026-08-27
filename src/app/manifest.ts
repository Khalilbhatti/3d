import type { MetadataRoute } from "next";
import { brand, palette } from "@/config/theme";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: brand.full,
    short_name: brand.name,
    description: brand.description,
    start_url: "/",
    display: "standalone",
    background_color: palette.paper,
    theme_color: palette.paper,
    icons: [{ src: "/icon.png", sizes: "256x256", type: "image/png" }],
  };
}
