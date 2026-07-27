import type { MetadataRoute } from "next";
import { localizedUrl, siteConfig } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  return siteConfig.locales.map((locale) => ({
    url: localizedUrl(locale),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: locale === siteConfig.defaultLocale ? 1 : 0.9,
    alternates: {
      languages: Object.fromEntries(siteConfig.locales.map((item) => [item, localizedUrl(item)])),
    },
  }));
}
