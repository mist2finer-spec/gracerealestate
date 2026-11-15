import { NextResponse } from "next/server";
import { clearSessionCookie } from "@/lib/admin-session";

/** POST /api/admin/logout — clears the admin session cookie. */
export async function POST() {
  const res = NextResponse.json({ ok: true });
  clearSessionCookie(res);
  return res;
}
