import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest, isSameOrigin } from "@/lib/admin-session";
import { hasDatabase } from "@/lib/db";
import { publishContent } from "@/lib/content-server";
import { MAX_CONTENT_BYTES } from "@/lib/content-schema";

/**
 * PUT /api/admin/content  { siteContent, guideTabEnabled }
 * Publishes the admin's edited content: it becomes visible to all visitors.
 */
export async function PUT(req: NextRequest) {
  if (!isSameOrigin(req) || !isAdminRequest(req)) {
    return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });
  }
  if (!hasDatabase()) {
    return NextResponse.json(
      { ok: false, error: "Database is not configured (DATABASE_URL)." },
      { status: 503 }
    );
  }

  const raw = await req.text();
  if (Buffer.byteLength(raw, "utf8") > MAX_CONTENT_BYTES) {
    return NextResponse.json({ ok: false, error: "Content is too large." }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  try {
    const content = await publishContent(body);
    return NextResponse.json({ ok: true, content, publishedAt: new Date().toISOString() });
  } catch (err) {
    console.error("[content] publish failed:", err);
    return NextResponse.json({ ok: false, error: "Could not save to the database." }, { status: 500 });
  }
}
