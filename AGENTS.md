# Agent handoff — Grace Choi Real Estate

Read `README.md` first (roadmap, content flow, env vars, deploy steps).

## Current state (2026-11-15)
- Branch `feature/phase2-db-content` is stacked on `cleanup/phase1-scope`. Both are pushed and **not merged into `main`**.
- Phase 1 (scope cleanup) and Phase 2 (admin content stored in Postgres/Neon, Publish, history and Restore) are done.
- Phase 2 was e2e-tested against a local Postgres: 20/20 passed.
- **The admin UI has not been clicked through in a real browser yet.**
- Not deployed anywhere yet. The owner will import the repo into Vercel (Hobby, free), connect Neon (free) via Storage, and set `ADMIN_PASSWORD`.

## Next tasks, in order
1. After deploy: verify the live site and admin flow (login → edit → Publish → visible to visitors → Restore).
2. Merge the phase branches into `main` (via PRs).
3. Phase 2b: image upload for admin (Vercel Blob). Replace the hotlinked hero images (`z-cdn.chatglm.cn`) with self-hosted ones.
4. Phase 3: SMTP app password, custom domain, inquiry email check.
5. Phase 4: NJStreet data expansion (permission granted by the owner).
6. Open question: `LICENSE` still says "Copyright Estata". Ask the owner.

## Rules
- The end user (Grace) is non-technical. Every editable thing must work from the Admin panel, with no code or Git needed.
- Admin auth is server-side only: `ADMIN_PASSWORD` plus an HMAC-signed httpOnly cookie, with a same-origin check on mutations. Never put secrets in client code or `NEXT_PUBLIC_*`.
- Content shape lives in `src/lib/data.ts`. If you change it, keep `normalizeContent` in `src/lib/content-schema.ts` compatible with already-published rows.
- Next 16: `revalidateTag(tag, { expire: 0 })` needs the second argument.

## Local environment gotchas
- The checkout is on `G:` (exFAT). `next build` fails there with "failed to create junction point". Copy to an NTFS drive (e.g. a temp dir on C:) to build. `dev`, `lint` and `typecheck` work on G:.
- Git on G: may need `git config --global --add safe.directory G:/gracerealestate`.
- There is no local Postgres. For DB tests use `embedded-postgres` in a temp dir, or Docker (`docker-compose.yml`).
