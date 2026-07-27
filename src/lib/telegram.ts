import { siteConfig } from "./config";
import type { ContactChannel } from "./db";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
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

  const lines = [
    "<b>Клік по контакту на сайті</b>",
    "",
    `<b>Кнопка:</b> ${escapeHtml(channelLabels[input.channel])}`,
    `<b>Мова:</b> ${escapeHtml(input.locale)}`,
    `<b>Сторінка:</b> ${escapeHtml(input.path || "/")}`,
    input.referrer ? `<b>Звідки:</b> ${escapeHtml(input.referrer)}` : "",
    input.userAgent ? `<b>Пристрій:</b> ${escapeHtml(input.userAgent.slice(0, 180))}` : "",
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
