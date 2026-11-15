import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-session";
import { hasDatabase } from "@/lib/db";

/** GET /api/admin/session — is the current browser signed in as admin? */
export async function GET(req: NextRequest) {
  return NextResponse.json(
    { isAdmin: isAdminRequest(req), databaseConfigured: hasDatabase() },
    { headers: { "Cache-Control": "no-store" } }
  );
}
