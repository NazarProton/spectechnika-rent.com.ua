import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getExportRows } from "@/lib/db";

function csvEscape(value: unknown) {
  const text = value == null ? "" : String(value);
  return `"${text.replaceAll('"', '""')}"`;
}

export async function GET(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const kind = request.nextUrl.searchParams.get("kind") === "leads" ? "leads" : "clicks";
  const rows = await getExportRows(kind);
  const headers = rows[0] ? Object.keys(rows[0]) : kind === "leads" ? ["id", "name", "phone", "message", "locale", "path", "created_at"] : ["id", "channel", "locale", "path", "referrer", "user_agent", "created_at"];
  const csv = [headers.join(","), ...rows.map((row) => headers.map((header) => csvEscape((row as Record<string, unknown>)[header])).join(","))].join("\n");

  return new NextResponse(csv, {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="spectehnika-${kind}.csv"`,
    },
  });
}
