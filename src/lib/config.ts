export const siteConfig = {
  name: "Spectehnika Rent",
  legalName: "Spectehnika Rent",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://spectehnika-rent.com.ua",
  defaultLocale: "uk",
  locales: ["uk", "en"] as const,
  region: "Lviv, Lviv oblast",
  contact: {
    person: process.env.CONTACT_PERSON || "Igor",
    phone: process.env.CONTACT_PHONE || "+380936246205",
    phoneDisplay: process.env.CONTACT_PHONE_DISPLAY || "+380 93 624 62 05",
    whatsappPhone: process.env.WHATSAPP_PHONE || "380936246205",
    viberPhone: process.env.VIBER_PHONE || "380936246205",
    telegramUrl: process.env.TELEGRAM_URL || "https://t.me/ihormamchur",
  },
};

export type Locale = (typeof siteConfig.locales)[number];

export function isLocale(value: string): value is Locale {
  return siteConfig.locales.includes(value as Locale);
}

export function localizedUrl(locale: Locale, path = "") {
  return `${siteConfig.url}/${locale}${path}`;
}

export function contactHref(channel: "phone" | "whatsapp" | "viber" | "telegram") {
  const { phone, whatsappPhone, viberPhone, telegramUrl } = siteConfig.contact;

  if (channel === "phone") return `tel:${phone}`;
  if (channel === "whatsapp") return `https://wa.me/${whatsappPhone}`;
  if (channel === "viber") return `viber://chat?number=%2B${viberPhone}`;
  return telegramUrl;
}
