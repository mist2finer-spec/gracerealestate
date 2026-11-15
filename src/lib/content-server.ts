import { unstable_cache, revalidateTag } from "next/cache";
import type { Prisma } from "@prisma/client";
import { getDb, hasDatabase } from "@/lib/db";
import {
  PublishedContent,
  defaultContent,
  normalizeContent,
} from "@/lib/content-schema";

// Server-only helpers for reading / publishing site content.

export const CONTENT_TAG = "site-content";
const ROW_ID = "main";
const KEEP_REVISIONS = 20;

// Throws on DB errors so failures are NOT cached; the caller falls back.
const readFromDb = unstable_cache(
  async (): Promise<PublishedContent | null> => {
    const row = await getDb().siteContent.findUnique({ where: { id: ROW_ID } });
    return row ? normalizeContent(row.data) : null;
  },
  ["site-content-v1"],
  { tags: [CONTENT_TAG], revalidate: 3600 }
);

/** Published content for rendering. Never throws: falls back to defaults. */
export async function getPublishedContent(): Promise<PublishedContent> {
  if (!hasDatabase()) return defaultContent();
  try {
    return (await readFromDb()) ?? defaultContent();
  } catch (err) {
    console.error("[content] failed to read from database:", err);
    return defaultContent();
  }
}

/** Save content as the live version and keep a revision for undo. */
export async function publishContent(input: unknown): Promise<PublishedContent> {
  const content = normalizeContent(input);
  const data = content as unknown as Prisma.InputJsonValue;
  const db = getDb();

  await db.$transaction(async (tx) => {
    await tx.siteContent.upsert({
      where: { id: ROW_ID },
      create: { id: ROW_ID, data },
      update: { data },
    });
    await tx.contentRevision.create({ data: { data } });
    const stale = await tx.contentRevision.findMany({
      orderBy: { id: "desc" },
      skip: KEEP_REVISIONS,
      select: { id: true },
    });
    if (stale.length > 0) {
      await tx.contentRevision.deleteMany({
        where: { id: { in: stale.map((r) => r.id) } },
      });
    }
  });

  revalidateTag(CONTENT_TAG, { expire: 0 });
  return content;
}

export async function listRevisions(): Promise<{ id: number; createdAt: string }[]> {
  const rows = await getDb().contentRevision.findMany({
    orderBy: { id: "desc" },
    take: KEEP_REVISIONS,
    select: { id: true, createdAt: true },
  });
  return rows.map((r) => ({ id: r.id, createdAt: r.createdAt.toISOString() }));
}

/** Publish an older revision again (it becomes the newest revision). */
export async function restoreRevision(id: number): Promise<PublishedContent | null> {
  const row = await getDb().contentRevision.findUnique({ where: { id } });
  if (!row) return null;
  return publishContent(row.data);
}
