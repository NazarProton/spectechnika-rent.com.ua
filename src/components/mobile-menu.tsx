"use client";

import Link from "next/link";
import { Languages, Menu, X } from "lucide-react";
import { useState } from "react";
import { FaTelegramPlane, FaViber, FaWhatsapp } from "react-icons/fa";
import { PhoneCall } from "lucide-react";
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

export function MobileMenu({
  nav,
  anchors,
  buttons,
  otherLocale,
  currentLocaleLabel,
}: {
  nav: string[];
  anchors: string[];
  buttons: ContactButton[];
  otherLocale: string;
  currentLocaleLabel: string;
}) {
  const [open, setOpen] = useState(false);

  function track(channel: Channel) {
    const payload = JSON.stringify({
      channel,
      locale: document.documentElement.lang || "uk",
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
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex size-11 items-center justify-center rounded-md border border-zinc-200 bg-white text-zinc-950 transition hover:bg-zinc-50"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      <div
        className={`fixed inset-x-0 top-16 z-50 origin-top border-b border-zinc-200 bg-white shadow-xl transition duration-200 ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0"
        }`}
      >
        <div className="mx-auto grid max-w-7xl gap-5 px-4 py-5">
          <nav className="grid gap-2">
            {nav.map((item, index) => (
              <a
                key={item}
                href={`#${anchors[index]}`}
                onClick={() => setOpen(false)}
                className="rounded-md border border-zinc-200 px-4 py-3 text-base font-black text-zinc-950 transition hover:border-yellow-400 hover:bg-yellow-50"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="grid grid-cols-2 gap-2">
            {buttons.map((button) => {
              const Icon = icons[button.channel];
              const classes = button.primary
                ? "border-yellow-400 bg-yellow-400 text-black hover:bg-yellow-300"
                : "border-zinc-200 bg-white text-zinc-950 hover:border-yellow-400 hover:bg-yellow-50";

              return (
                <a
                  key={button.channel}
                  href={button.href}
                  onClick={() => {
                    track(button.channel);
                    setOpen(false);
                  }}
                  className={`inline-flex h-10 items-center justify-center gap-2 rounded-md border px-4 text-sm font-bold transition ${classes}`}
                  target={button.channel === "phone" ? undefined : "_blank"}
                  rel={button.channel === "phone" ? undefined : "noopener noreferrer"}
                >
                  <Icon className="size-4" />
                  {button.label}
                </a>
              );
            })}
            <Link
              href={`/${otherLocale}`}
              onClick={() => setOpen(false)}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-zinc-200 bg-white px-4 text-sm font-bold text-zinc-900 hover:bg-zinc-50"
            >
              <Languages className="size-4" />
              {currentLocaleLabel}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
