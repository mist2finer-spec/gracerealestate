import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest, isSameOrigin } from "@/lib/admin-session";
import { hasDatabase } from "@/lib/db";
import { listRevisions, restoreRevision } from "@/lib/content-server";

/** GET /api/admin/revisions — recent published versions (newest first). */
export async function GET(req: NextRequest) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  if (!hasDatabase()) return NextResponse.json({ ok: true, revisions: [] });
  try {
    return NextResponse.json(
      { ok: true, revisions: await listRevisions() },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    console.error("[content] list revisions failed:", err);
    return NextResponse.json({ ok: false, error: "Could not read history." }, { status: 500 });
  }
}

/** POST /api/admin/revisions  { id } — publish an older version again. */
export async function POST(req: NextRequest) {
  if (!isSameOrigin(req) || !isAdminRequest(req)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  if (!hasDatabase()) {
    return NextResponse.json({ ok: false, error: "Database is not configured." }, { status: 503 });
  }
  let id = NaN;
  try {
    id = Number(((await req.json()) as { id?: unknown }).id);
  } catch {
    /* handled below */
  }
  if (!Number.isInteger(id)) {
    return NextResponse.json({ ok: false, error: "Invalid revision id." }, { status: 400 });
  }
  try {
    const content = await restoreRevision(id);
    if (!content) {
      return NextResponse.json({ ok: false, error: "Revision not found." }, { status: 404 });
    }
    return NextResponse.json({ ok: true, content, publishedAt: new Date().toISOString() });
  } catch (err) {
    console.error("[content] restore failed:", err);
    return NextResponse.json({ ok: false, error: "Could not restore." }, { status: 500 });
  }
}
