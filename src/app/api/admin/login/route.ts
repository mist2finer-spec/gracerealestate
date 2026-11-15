import { NextRequest, NextResponse } from "next/server";
import {
  adminConfigured,
  isSameOrigin,
  passwordMatches,
  setSessionCookie,
} from "@/lib/admin-session";

/**
 * POST /api/admin/login  { password }
 * Checks the password against ADMIN_PASSWORD and sets the signed session cookie.
 */
export async function POST(req: NextRequest) {
  if (!isSameOrigin(req)) {
    return NextResponse.json({ ok: false }, { status: 403 });
  }
  if (!adminConfigured()) {
    return NextResponse.json(
      { ok: false, error: "ADMIN_PASSWORD is not configured on the server." },
      { status: 503 }
    );
  }

  let password = "";
  try {
    const body = (await req.json()) as { password?: unknown };
    password = typeof body.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (!passwordMatches(password)) {
    // Small fixed delay to slow down password guessing.
    await new Promise((r) => setTimeout(r, 800));
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  setSessionCookie(res);
  return res;
}
