import { siteConfig } from "./config";
import type { ContactChannel } from "./db";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function cleanReferrer(value?: string | null) {
  if (!value) return null;

  try {
    const url = new URL(value);
    const trackingParams = [
      "fbclid",
      "gclid",
      "msclkid",
      "yclid",
      "ttclid",
      "igshid",
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content",
      "utm_term",
    ];
    trackingParams.forEach((param) => url.searchParams.delete(param));
    url.hash = "";

    const query = url.searchParams.toString();
    return `${url.origin}${url.pathname}${query ? `?${query}` : ""}`;
  } catch {
    return value.length > 120 ? `${value.slice(0, 120)}...` : value;
  }
}

function formatTrafficSource(value?: string | null) {
  if (!value) return "Прямий перехід";

  try {
    const url = new URL(value);
    const source = url.searchParams.get("utm_source")?.toLowerCase();
    const host = url.hostname.toLowerCase();

    if (source?.includes("facebook") || source?.includes("fb") || url.searchParams.has("fbclid")) {
      return "Facebook / Instagram";
    }

    if (source?.includes("instagram")) return "Instagram";
    if (source?.includes("google") || url.searchParams.has("gclid")) return "Google";
    if (source?.includes("tiktok") || url.searchParams.has("ttclid")) return "TikTok";
    if (source?.includes("telegram") || host.includes("t.me") || host.includes("telegram")) return "Telegram";
    if (source) return source;

    if (host.includes("facebook.com") || host.includes("instagram.com")) return "Facebook / Instagram";
    if (host.includes("google.")) return "Google";

    return host.replace(/^www\./, "");
  } catch {
    return "Невідомо";
  }
}

function formatDevice(userAgent?: string | null) {
  if (!userAgent) return null;

  const device = /iPhone/i.test(userAgent)
    ? "iPhone"
    : /iPad/i.test(userAgent)
      ? "iPad"
      : /Android/i.test(userAgent)
        ? "Android"
        : /Windows/i.test(userAgent)
          ? "Windows"
          : /Mac OS X|Macintosh/i.test(userAgent)
            ? "Mac"
            : "Unknown";

  const browser = /CriOS|Chrome/i.test(userAgent)
    ? "Chrome"
    : /FxiOS|Firefox/i.test(userAgent)
      ? "Firefox"
      : /Edg/i.test(userAgent)
        ? "Edge"
        : /Safari/i.test(userAgent)
          ? "Safari"
          : "Browser";

  return `${device} / ${browser}`;
}

function formatLocale(locale: string) {
  return locale === "uk" ? "Українська" : locale === "en" ? "English" : locale;
}

export function hasTelegramLeadNotifications() {
  return Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID);
}

export async function sendLeadToTelegram(input: {
  name?: string | null;
  phone: string;
  message: string;
  locale: string;
  path?: string | null;
}) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) return { notified: false };

  const lines = [
    "<b>Нова заявка з сайту Спецтехніка Рент</b>",
    "",
    `<b>Ім'я:</b> ${escapeHtml(input.name || "Не вказано")}`,
    `<b>Телефон:</b> ${escapeHtml(input.phone)}`,
    `<b>Задача:</b> ${escapeHtml(input.message)}`,
    `<b>Мова:</b> ${escapeHtml(input.locale)}`,
    `<b>Сторінка:</b> ${escapeHtml(input.path || "/")}`,
    "",
    `<b>Контакт:</b> ${escapeHtml(siteConfig.contact.phoneDisplay)}`,
  ];

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      chat_id: chatId,
      text: lines.join("\n"),
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });

  if (!response.ok) {
    console.error("Telegram lead notification failed", await response.text());
    return { notified: false };
  }

  return { notified: true };
}

const channelLabels: Record<ContactChannel, string> = {
  phone: "Подзвонити",
  whatsapp: "WhatsApp",
  telegram: "Telegram",
  viber: "Viber",
};

export async function sendContactClickToTelegram(input: {
  channel: ContactChannel;
  locale: string;
  path: string;
  referrer?: string | null;
  userAgent?: string | null;
}) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) return { notified: false };

  const referrer = cleanReferrer(input.referrer);
  const source = formatTrafficSource(input.referrer);
  const device = formatDevice(input.userAgent);
  const lines = [
    "<b>Клік по контакту</b>",
    "",
    `<b>Кнопка:</b> ${escapeHtml(channelLabels[input.channel])}`,
    `<b>Мова:</b> ${escapeHtml(formatLocale(input.locale))}`,
    `<b>Сторінка:</b> ${escapeHtml(input.path || "/")}`,
    `<b>Джерело:</b> ${escapeHtml(source)}`,
    referrer ? `<b>Звідки:</b> ${escapeHtml(referrer)}` : "",
    device ? `<b>Пристрій:</b> ${escapeHtml(device)}` : "",
  ].filter(Boolean);

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      chat_id: chatId,
      text: lines.join("\n"),
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });

  if (!response.ok) {
    console.error("Telegram contact click notification failed", await response.text());
    return { notified: false };
  }

  return { notified: true };
}
