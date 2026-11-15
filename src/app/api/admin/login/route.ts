import { NextRequest, NextResponse } from "next/server";
import { createHash, timingSafeEqual } from "node:crypto";

/**
 * POST /api/admin/login
 * Verifies the admin password against the ADMIN_PASSWORD environment
 * variable, so the password never ships in the client bundle.
 *
 * Phase 1 scope: this only gates the admin editor UI. Real sessions
 * (signed cookies) arrive with the database-backed content API in phase 2.
 */
function sha256(s: string) {
  return createHash("sha256").update(s, "utf8").digest();
}

export async function POST(req: NextRequest) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
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

  // Compare fixed-length digests so the check runs in constant time.
  const ok = timingSafeEqual(sha256(password), sha256(expected));
  return NextResponse.json({ ok }, { status: ok ? 200 : 401 });
}
