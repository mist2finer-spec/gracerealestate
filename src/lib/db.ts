import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/** True when DATABASE_URL points at a Postgres server we can use. */
export function hasDatabase(): boolean {
  const url = process.env.DATABASE_URL ?? "";
  return url.startsWith("postgres://") || url.startsWith("postgresql://");
}

/** Lazily create one Prisma client per process (reused across hot reloads). */
export function getDb(): PrismaClient {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
    });
  }
  return globalForPrisma.prisma;
}
