import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Spectehnika Rent",
    short_name: "Spectehnika Rent",
    description: "Mini excavator rental and special equipment services in Lviv oblast.",
    start_url: "/uk",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#facc15",
    icons: [
      {
        src: "/brand/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/brand/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
