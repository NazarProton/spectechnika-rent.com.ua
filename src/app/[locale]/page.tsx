import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SitePage } from "@/components/site-page";
import { content } from "@/lib/content";
import { isLocale, localizedUrl, type Locale, siteConfig } from "@/lib/config";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return siteConfig.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) return {};

  const locale = rawLocale;
  const copy = content[locale];
  const alternates = Object.fromEntries(
    siteConfig.locales.map((item) => [item, localizedUrl(item)])
  );

  return {
    title: copy.seo.title,
    description: copy.seo.description,
    keywords: copy.seo.keywords,
    alternates: {
      canonical: localizedUrl(locale),
      languages: {
        ...alternates,
        "x-default": localizedUrl(siteConfig.defaultLocale as Locale),
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "uk" ? "uk_UA" : "en_US",
      url: localizedUrl(locale),
      siteName: siteConfig.name,
      title: copy.seo.title,
      description: copy.seo.description,
      images: [
        {
          url: "/brand/og-image.png",
          width: 1200,
          height: 630,
          alt: copy.hero.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.seo.title,
      description: copy.seo.description,
      images: ["/brand/og-image.png"],
    },
  };
}

export default async function LocalePage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();

  return <SitePage locale={rawLocale} />;
}
