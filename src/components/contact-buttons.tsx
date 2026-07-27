"use client";

import { PhoneCall } from "lucide-react";
import { FaTelegramPlane, FaViber, FaWhatsapp } from "react-icons/fa";
import type { Channel } from "@/lib/content";

type ContactButton = {
  channel: Channel;
  label: string;
  href: string;
  disabled?: boolean;
  primary?: boolean;
};

const icons = {
  phone: PhoneCall,
  whatsapp: FaWhatsapp,
  telegram: FaTelegramPlane,
  viber: FaViber,
};

export function ContactButtons({
  buttons,
  locale,
  compact = false,
  grid = false,
}: {
  buttons: ContactButton[];
  locale: string;
  compact?: boolean;
  grid?: boolean;
}) {
  function track(channel: Channel) {
    const payload = JSON.stringify({
      channel,
      locale,
      path: window.location.pathname,
    });

    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/track", new Blob([payload], { type: "application/json" }));
      return;
    }

    void fetch("/api/track", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: payload,
      keepalive: true,
    });
  }

  return (
    <div
      className={
        grid
          ? "grid grid-cols-2 gap-2"
          : compact
            ? "flex flex-wrap gap-2"
            : "flex flex-col gap-3 sm:flex-row sm:flex-wrap"
      }
    >
      {buttons.map((button) => {
        const Icon = icons[button.channel];
        const classes = button.primary
          ? "border-yellow-400 bg-yellow-400 text-black hover:bg-yellow-300"
          : "border-zinc-200 bg-white text-zinc-950 hover:border-yellow-400 hover:bg-yellow-50";

        if (button.disabled) {
          return (
            <span
              key={button.channel}
              className={`inline-flex h-12 items-center justify-center gap-2 rounded-md border border-zinc-200 bg-zinc-100 px-4 text-sm font-semibold text-zinc-400 ${compact ? "h-10" : ""}`}
              title="Telegram link is not configured yet"
            >
              <Icon className="size-4" />
              {button.label}
            </span>
          );
        }

        return (
          <a
            key={button.channel}
            href={button.href}
            onClick={() => track(button.channel)}
            className={`inline-flex h-12 items-center justify-center gap-2 rounded-md border px-4 text-sm font-semibold transition ${classes} ${compact ? "h-10" : ""}`}
            target={button.channel === "phone" ? undefined : "_blank"}
            rel={button.channel === "phone" ? undefined : "noopener noreferrer"}
          >
            <Icon className="size-4" />
            {button.label}
          </a>
        );
      })}
    </div>
  );
}
