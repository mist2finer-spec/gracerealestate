import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import type { NextRequest, NextResponse } from "next/server";

// Signed, httpOnly admin session cookie.
// Value: "<expiresAtMs>.<hmac>". The HMAC key is derived from ADMIN_PASSWORD,
// so changing the password signs everyone out — no extra secret to manage.

export const SESSION_COOKIE = "grace_admin";
const SESSION_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

function sha256(s: string): Buffer {
  return createHash("sha256").update(s, "utf8").digest();
}

function signingKey(): Buffer | null {
  const pw = process.env.ADMIN_PASSWORD;
  return pw ? sha256(`grace-admin-session:${pw}`) : null;
}

function sign(payload: string, key: Buffer): string {
  return createHmac("sha256", key).update(payload).digest("base64url");
}

export function adminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

/** Constant-time password check. */
export function passwordMatches(candidate: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return timingSafeEqual(sha256(candidate), sha256(expected));
}

export function setSessionCookie(res: NextResponse): void {
  const key = signingKey();
  if (!key) return;
  const exp = String(Date.now() + SESSION_TTL_MS);
  res.cookies.set(SESSION_COOKIE, `${exp}.${sign(exp, key)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  });
}

export function clearSessionCookie(res: NextResponse): void {
  res.cookies.set(SESSION_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
}

export function isAdminRequest(req: NextRequest): boolean {
  const key = signingKey();
  const value = req.cookies.get(SESSION_COOKIE)?.value;
  if (!key || !value) return false;
  const dot = value.indexOf(".");
  if (dot <= 0) return false;
  const exp = value.slice(0, dot);
  const sig = Buffer.from(value.slice(dot + 1));
  const expected = Buffer.from(sign(exp, key));
  if (sig.length !== expected.length || !timingSafeEqual(sig, expected)) return false;
  return Number(exp) > Date.now();
}

/**
 * Reject cross-site state-changing requests. SameSite=Lax already keeps the
 * cookie off cross-site POSTs; this is a second check on the Origin header.
 */
export function isSameOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true; // same-origin fetch from older browsers / curl
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}
