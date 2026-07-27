import { neon } from "@neondatabase/serverless";
import { z } from "zod";

export const contactChannelSchema = z.enum(["phone", "whatsapp", "telegram", "viber"]);

export type ContactChannel = z.infer<typeof contactChannelSchema>;

type Sql = ReturnType<typeof neon>;

let sqlClient: Sql | null = null;
let schemaReady = false;

function asRows<T>(query: ReturnType<Sql>) {
  return query as unknown as Promise<T[]>;
}

export function hasDatabase() {
  return Boolean(process.env.DATABASE_URL);
}

export function getSql() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured");
  }

  if (!sqlClient) {
    sqlClient = neon(process.env.DATABASE_URL);
  }

  return sqlClient;
}

export async function ensureSchema() {
  if (schemaReady || !hasDatabase()) return;

  const sql = getSql();
  await sql`
    CREATE TABLE IF NOT EXISTS contact_clicks (
      id BIGSERIAL PRIMARY KEY,
      channel TEXT NOT NULL,
      locale TEXT NOT NULL,
      path TEXT NOT NULL,
      referrer TEXT,
      user_agent TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS leads (
      id BIGSERIAL PRIMARY KEY,
      name TEXT,
      phone TEXT NOT NULL,
      message TEXT NOT NULL,
      locale TEXT NOT NULL,
      path TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS contact_clicks_created_idx ON contact_clicks (created_at DESC)`;
  await sql`CREATE INDEX IF NOT EXISTS leads_created_idx ON leads (created_at DESC)`;
  schemaReady = true;
}

export async function recordContactClick(input: {
  channel: ContactChannel;
  locale: string;
  path: string;
  referrer?: string | null;
  userAgent?: string | null;
}) {
  if (!hasDatabase()) return { stored: false };

  await ensureSchema();
  const sql = getSql();
  await sql`
    INSERT INTO contact_clicks (channel, locale, path, referrer, user_agent)
    VALUES (${input.channel}, ${input.locale}, ${input.path}, ${input.referrer || null}, ${input.userAgent || null})
  `;

  return { stored: true };
}

export async function createLead(input: {
  name?: string | null;
  phone: string;
  message: string;
  locale: string;
  path?: string | null;
}) {
  if (!hasDatabase()) return { stored: false };

  await ensureSchema();
  const sql = getSql();
  await sql`
    INSERT INTO leads (name, phone, message, locale, path)
    VALUES (${input.name || null}, ${input.phone}, ${input.message}, ${input.locale}, ${input.path || null})
  `;

  return { stored: true };
}

export async function getAdminStats() {
  if (!hasDatabase()) {
    return {
      configured: false,
      totals: { clicks: 0, leads: 0 },
      byChannel: [] as { channel: string; count: number }[],
      recentClicks: [] as { channel: string; locale: string; path: string; created_at: string }[],
      recentLeads: [] as { name: string | null; phone: string; message: string; locale: string; created_at: string }[],
    };
  }

  await ensureSchema();
  const sql = getSql();
  const [clickTotals, leadTotals, byChannel, recentClicks, recentLeads] = await Promise.all([
    asRows<{ count: number }>(sql`SELECT COUNT(*)::int AS count FROM contact_clicks`),
    asRows<{ count: number }>(sql`SELECT COUNT(*)::int AS count FROM leads`),
    asRows<{ channel: string; count: number }>(sql`SELECT channel, COUNT(*)::int AS count FROM contact_clicks GROUP BY channel ORDER BY count DESC`),
    asRows<{ channel: string; locale: string; path: string; created_at: string }>(sql`SELECT channel, locale, path, created_at FROM contact_clicks ORDER BY created_at DESC LIMIT 25`),
    asRows<{ name: string | null; phone: string; message: string; locale: string; created_at: string }>(sql`SELECT name, phone, message, locale, created_at FROM leads ORDER BY created_at DESC LIMIT 25`),
  ]);

  return {
    configured: true,
    totals: { clicks: Number(clickTotals[0]?.count || 0), leads: Number(leadTotals[0]?.count || 0) },
    byChannel: byChannel as { channel: string; count: number }[],
    recentClicks: recentClicks as { channel: string; locale: string; path: string; created_at: string }[],
    recentLeads: recentLeads as { name: string | null; phone: string; message: string; locale: string; created_at: string }[],
  };
}

export async function getExportRows(kind: "clicks" | "leads"): Promise<Record<string, unknown>[]> {
  if (!hasDatabase()) return [];

  await ensureSchema();
  const sql = getSql();

  if (kind === "leads") {
    return asRows<Record<string, unknown>>(sql`SELECT id, name, phone, message, locale, path, created_at FROM leads ORDER BY created_at DESC`);
  }

  return asRows<Record<string, unknown>>(sql`SELECT id, channel, locale, path, referrer, user_agent, created_at FROM contact_clicks ORDER BY created_at DESC`);
}
