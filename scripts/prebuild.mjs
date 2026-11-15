// Runs before `next build`:
//   1. prisma generate (always)
//   2. prisma migrate deploy (only when DATABASE_URL is a Postgres URL)
// so a fresh Neon database gets its tables on the first Vercel deploy, while
// CI / local builds without a database still succeed.
import { execSync } from "node:child_process";

const env = { ...process.env };
const url = env.DATABASE_URL ?? "";
const isPostgres = url.startsWith("postgres://") || url.startsWith("postgresql://");

// Migrations need a direct (non-pooled) connection. The Neon integration
// provides DATABASE_URL_UNPOOLED; fall back to DATABASE_URL otherwise.
if (!env.DATABASE_URL_UNPOOLED) env.DATABASE_URL_UNPOOLED = url;

const run = (cmd) => execSync(cmd, { stdio: "inherit", env });

run("prisma generate");

if (isPostgres) {
  console.log("[prebuild] Postgres detected — applying migrations");
  run("prisma migrate deploy");
} else {
  console.log("[prebuild] No Postgres DATABASE_URL — skipping migrations (site uses default content)");
}
