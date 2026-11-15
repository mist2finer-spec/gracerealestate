# Grace Choi Real Estate — Bergen County, NJ

Bilingual (Korean / English) website for Grace Choi, a realtor serving
Bergen County, New Jersey. Built with **Next.js 16**, **TypeScript**,
**Tailwind CSS 4**, and **shadcn/ui**.

The site focuses on three things:

1. **Seller guide** (`/sell`) — step-by-step seller guide + NJ seller closing cost calculator
2. **Buyer guide** (`/buy`) — step-by-step buyer guide + NJ buyer cash-to-close calculator
3. **Towns & Schools** (`/towns-and-schools`) — interactive map of all 70 Bergen County
   towns with school, demographic, and transportation data from NJStreet (used with permission)

Visitors can contact Grace through the inquiry form, which emails her directly.

---

## Roadmap

| Phase | Goal | Status |
| ----- | ---- | ------ |
| 1 | Narrow the scope: remove demo listings/agents/insights, empty guide pages, exposed admin password, template branding, and unused dependencies | ✅ done |
| 2 | Make admin edits real: site content in Postgres (Neon) + Prisma, signed admin session cookie, Publish / history / restore | ✅ done |
| 2b | Image upload for the admin (Vercel Blob) | next |
| 3 | Deploy and operate: Vercel project, env vars, SMTP app password, custom domain, inquiry email check | |
| 4 | Expand NJStreet data: link towns from the seller/buyer guides, scheduled refresh, attribution | |

### How content works

```
Postgres (SiteContent row) ──server render──▶ page ──▶ admin edits a draft (live preview)
        ▲                                                     │
        └──────────── PUT /api/admin/content  ◀── "Publish" ──┘
```

- Pages are rendered on the server with the published content and cached; publishing
  refreshes the cache immediately.
- Every publish is also saved to `ContentRevision` (last 20 kept), so an earlier
  version can be restored from **Admin → Publish history**.
- If the database is missing or unreachable, the site falls back to the defaults
  in `src/lib/data.ts`.

---

## Quick start

```bash
bun install                  # or: npm install
cp .env.example .env.local   # then set ADMIN_PASSWORD (and SMTP_* to send email)
bun run dev                  # http://localhost:3000
```

### Admin

Click **Admin** in the footer and enter the password set in `ADMIN_PASSWORD`.
The server checks it and sets a signed, httpOnly session cookie (12 hours). Edit
the content, look at the page behind the panel, then press **Publish**.

The admin editor covers: homepage hero, stats band, "Why Grace" section, CTA
banner, footer (email/phone/legal text), guide button toggles, and the Seller/Buyer
guide pages.

### Inquiry email

`POST /api/inquiry` sends inquiries via SMTP (Gmail app password recommended).
Without SMTP settings it runs in log-only mode and prints the email to the
server console. See `.env.example`.

---

## Environment variables

| Name | Required | Purpose |
| ---- | -------- | ------- |
| `ADMIN_PASSWORD` | yes | Admin sign-in password (server-side only) |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | for email | Inquiry email delivery |
| `INQUIRY_TO_EMAIL`, `INQUIRY_FROM_EMAIL` | optional | Recipient / sender for inquiries |
| `DATABASE_URL` | for publishing | Postgres (pooled) URL — set automatically by the Neon integration |
| `DATABASE_URL_UNPOOLED` | optional | Direct URL for migrations (falls back to `DATABASE_URL`) |

---

## Project structure

```
src/
├── app/
│   ├── page.tsx                     # Homepage
│   ├── sell/ buy/                   # Seller / Buyer guide pages
│   ├── towns-and-schools/           # Town map + /[town] detail pages
│   └── api/
│       ├── inquiry/route.ts         # Inquiry email (SMTP)
│       └── admin/                   # login, logout, session, content (publish), revisions
├── components/site/
│   ├── header.tsx  hero.tsx  guide-tabs.tsx  why-us.tsx  cta-banner.tsx  footer.tsx
│   ├── inquiry-section.tsx          # Inline form + dialog
│   ├── guide-page-layout.tsx        # Shared layout for guide pages
│   ├── closing-cost-calculator.tsx  buyer-closing-cost-calculator.tsx
│   ├── town-map.tsx
│   ├── admin-panel.tsx              # Admin sheet (sign-in + editor)
│   └── content-editor-panel.tsx     # Site content editor
├── components/ui/                   # shadcn/ui primitives
├── data/                            # NJStreet town snapshot (JSON)
├── lib/
│   ├── data.ts                      # Editable content model + default content
│   ├── content-schema.ts            # Validation / normalization of published content
│   ├── content-server.ts            # Read (cached) / publish / restore — server only
│   ├── admin-session.ts             # Signed session cookie helpers
│   └── town-data.ts                 # Town data helpers
└── store/search-store.ts            # Zustand store (content, admin, UI state)
scripts/import-njstreet.py           # NJStreet town data importer
```

## Scripts

```bash
bun run dev         # Dev server on port 3000
bun run build       # prisma generate (+ migrate deploy if DATABASE_URL is Postgres) + next build
bun run db:migrate  # create a new migration after editing prisma/schema.prisma (dev)
bun run start       # Run the standalone production build
bun run lint        # ESLint
bun run typecheck   # tsc --noEmit
```

## Deployment (Vercel + Neon)

1. Import this repository at [vercel.com/new](https://vercel.com/new). Vercel's GitHub
   integration then deploys every push (`main` = production, other branches = previews).
2. In the Vercel project, open **Storage → Create Database → Neon** (free plan is fine
   for testing) and connect it to the project. This sets `DATABASE_URL` and
   `DATABASE_URL_UNPOOLED`.
3. Add `ADMIN_PASSWORD` (and the `SMTP_*` variables for email) under
   **Settings → Environment Variables**.
4. Redeploy. The build runs `prisma migrate deploy`, which creates the tables.

> Vercel's free Hobby plan is for non-commercial use; a live business site needs a
> paid plan or another host. Testing on Hobby is fine.

A `Dockerfile` and `docker-compose.yml` are also included for self-hosting
(set `DATABASE_URL` to a Postgres server).

**Windows note:** building on an exFAT drive fails with
`failed to create junction point` (exFAT has no junctions). Build from an NTFS drive.

---

## Bergen County town data

`/towns-and-schools` uses the [NJStreet town directory](https://www.njstreet.com/towns-and-schools/) as its source, with the site owner's permission. The snapshot includes 70 town records, 295 school rows, 235 bus route links, the original map image, and 70 map boundary paths. The source tables contain historical figures (including 2020 Census and 2021 school budget values); the original school notes appear on each detail page. The source material is not covered by this repository's MIT code license.

- `src/data/bergen-towns.json` stores the town fields, school rows, notes, and links.
- `src/data/town-boundaries.json` stores the original map hotspot geometry.
- `public/maps/bergen-county.png` stores the original map image.
- Source PDF and image documents currently open via their original NJStreet links. Some town pages provide document headings without a file link.

To refresh town data from public pages, install `scripts/requirements-njstreet.txt` and run `python scripts/import-njstreet.py --fetch`. If automated access is challenged, obtain a licensed HTML export from the site owner with `index.html` and each `<source-slug>.html`, then run `python scripts/import-njstreet.py --pages-dir exported-html`. Add `--download-assets` to copy the map and first-party PDF/image documents into `public/` and rewrite those links to local paths. The importer validates all 70 pages before replacing the current JSON. The map hotspot geometry is kept separately because it is generated by the source map widget; update it only from a verified new export when the map changes.

## License

Code: MIT (see `LICENSE`). NJStreet town data and images are not covered by the MIT license.
