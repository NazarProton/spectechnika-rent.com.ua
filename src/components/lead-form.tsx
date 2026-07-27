"use client";

import { type FormEvent, useState } from "react";
import { Send } from "lucide-react";

export function LeadForm({
  locale,
  labels,
}: {
  locale: string;
  labels: {
    name: string;
    phone: string;
    message: string;
    submit: string;
    success: string;
    error: string;
  };
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || ""),
      phone: String(formData.get("phone") || ""),
      message: String(formData.get("message") || ""),
      locale,
      path: window.location.pathname,
    };

    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => null);

    if (!response?.ok) {
      setStatus("error");
      return;
    }

    const result = (await response.json().catch(() => ({ stored: false, notified: false }))) as {
      stored?: boolean;
      notified?: boolean;
    };
    if (result.stored || result.notified) {
      setStatus("sent");
      form.reset();
      return;
    }

    setStatus("error");
  }

  return (
    <form onSubmit={submit} autoComplete="on" className="grid gap-3">
      <input
        name="name"
        type="text"
        autoComplete="name"
        autoCapitalize="words"
        placeholder={labels.name}
        className="h-12 rounded-md border border-zinc-200 bg-white px-4 text-sm outline-none ring-yellow-400 transition focus:ring-2"
      />
      <input
        name="phone"
        type="tel"
        required
        autoComplete="tel"
        inputMode="tel"
        placeholder={labels.phone}
        className="h-12 rounded-md border border-zinc-200 bg-white px-4 text-sm outline-none ring-yellow-400 transition focus:ring-2"
      />
      <textarea
        name="message"
        required
        autoComplete="off"
        placeholder={labels.message}
        className="min-h-32 rounded-md border border-zinc-200 bg-white px-4 py-3 text-sm outline-none ring-yellow-400 transition focus:ring-2"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-yellow-400 px-5 text-sm font-bold text-black transition hover:bg-yellow-300 disabled:cursor-wait disabled:opacity-70"
      >
        <Send className="size-4" />
        {status === "sending" ? "..." : labels.submit}
      </button>
      {status === "sent" && <p className="text-sm font-medium text-green-700">{labels.success}</p>}
      {status === "error" && <p className="text-sm font-medium text-red-700">{labels.error}</p>}
    </form>
  );
}
