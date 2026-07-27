"use client";

import Link from "next/link";
import { Languages, Menu, PhoneCall, X } from "lucide-react";
import { useState } from "react";
import { ContactButtons } from "./contact-buttons";
import type { Channel } from "@/lib/content";

type ContactButton = {
  channel: Channel;
  label: string;
  href: string;
  disabled?: boolean;
  primary?: boolean;
};

export function MobileMenu({
  nav,
  anchors,
  buttons,
  locale,
  otherLocale,
  currentLocaleLabel,
  phoneDisplay,
}: {
  nav: string[];
  anchors: string[];
  buttons: ContactButton[];
  locale: string;
  otherLocale: string;
  currentLocaleLabel: string;
  phoneDisplay: string;
}) {
  const [open, setOpen] = useState(false);

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
            <Link
              href={`/${otherLocale}`}
              onClick={() => setOpen(false)}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-zinc-200 bg-white px-4 text-sm font-bold text-zinc-900 hover:bg-zinc-50"
            >
              <Languages className="size-4" />
              {currentLocaleLabel}
            </Link>
            <a
              href={buttons[0]?.href || "#"}
              onClick={() => setOpen(false)}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-yellow-400 px-4 text-sm font-black text-black hover:bg-yellow-300"
            >
              <PhoneCall className="size-4" />
              {phoneDisplay}
            </a>
          </div>

          <ContactButtons buttons={buttons} locale={locale} compact grid />
        </div>
      </div>
    </div>
  );
}
