import { NextRequest, NextResponse } from "next/server";
import { setAdminCookie } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const password = String(formData.get("password") || "");
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected || password !== expected) {
    return NextResponse.redirect(new URL("/admin?error=1", request.url), { status: 303 });
  }

  await setAdminCookie();
  return NextResponse.redirect(new URL("/admin", request.url), { status: 303 });
}
