import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createLead } from "@/lib/db";
import { sendLeadToTelegram } from "@/lib/telegram";

const leadSchema = z.object({
  name: z.string().trim().max(120).optional(),
  phone: z.string().trim().min(7).max(40),
  message: z.string().trim().min(5).max(1500),
  locale: z.string().trim().max(8).default("uk"),
  path: z.string().trim().max(240).optional(),
});

export async function POST(request: NextRequest) {
  const payload = await request.json().catch(() => null);
  const parsed = leadSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid lead payload" }, { status: 400 });
  }

  const [dbResult, telegramResult] = await Promise.all([
    createLead(parsed.data),
    sendLeadToTelegram(parsed.data),
  ]);

  return NextResponse.json({ ok: true, ...dbResult, ...telegramResult });
}
