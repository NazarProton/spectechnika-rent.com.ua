import { NextRequest, NextResponse } from "next/server";
import { contactChannelSchema, recordContactClick } from "@/lib/db";
import { sendContactClickToTelegram } from "@/lib/telegram";

export async function POST(request: NextRequest) {
  const payload = await request.json().catch(() => ({}));
  const channel = contactChannelSchema.safeParse(payload.channel);

  if (!channel.success) {
    return NextResponse.json({ ok: false, error: "Invalid channel" }, { status: 400 });
  }

  const input = {
    channel: channel.data,
    locale: typeof payload.locale === "string" ? payload.locale : "uk",
    path: typeof payload.path === "string" ? payload.path : "/",
    referrer: request.headers.get("referer"),
    userAgent: request.headers.get("user-agent"),
  };

  const [dbResult, telegramResult] = await Promise.all([
    recordContactClick(input),
    sendContactClickToTelegram(input),
  ]);

  return NextResponse.json({ ok: true, ...dbResult, ...telegramResult });
}
