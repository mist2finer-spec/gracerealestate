# 🏠 Estata — NY/NJ Real Estate Website

A modern real estate website built with **Next.js 16**, **TypeScript**, **Tailwind CSS 4**, and **shadcn/ui**. Browse homes, condos, land, and commercial properties across **New York** and **New Jersey**, with a built-in admin dashboard for managing listings.

Inspired by RE/MAX, but fully original branding and code.

---

## ✨ Features

### Public site (`/`)
- **Hero search bar** with Buy/Rent tabs, city autocomplete, property-type select, and price range filter
- **Browse by category** — Homes, Condos, Land, Commercial
- **Featured listings grid** with filter tabs (All / For Sale / For Rent / New), favorites, and contact buttons
- **Property detail modal** with specs, description, amenities, and agent info
- **Find an Agent** section with rating, specialties, and call/email actions
- **Market Insights** blog teaser with category badges
- **CTA banner** + comprehensive footer with newsletter signup
- **Favorites** persist via localStorage (Zustand store)
- **Mobile-first responsive** with mobile sheet menu
- **Toast notifications** for user feedback (Sonner)

### Admin dashboard (click "Admin" in the header)
- 🔒 Password-protected login (`estata-admin-2024` by default)
- 📊 Stats overview (total / for-sale / for-rent / featured counts)
- 📋 Property table with search, edit, delete, preview actions
- ➕ Add new property form with all fields (image preview, amenities, agent assignment)
- ✏️ Edit existing listings
- 🗑️ Delete with confirmation
- 🔄 Reset to seed data
- 🛡️ **State validation**: only NY and NJ listings are accepted

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- **Node.js 18+** (recommend 20+)
- **bun** (preferred) or **npm** / **yarn** / **pnpm**

### Steps

```bash
# 1. Clone the repo
git clone https://github.com/your-username/estata.git
cd estata

# 2. Install dependencies (using bun — fastest)
bun install
# OR: npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local if needed (defaults work for local dev)

# 4. (Optional) Initialize the Prisma database
bun run db:push
# OR: npx prisma db push

# 5. Start the dev server
bun run dev
# OR: npm run dev

# 6. Open http://localhost:3000
```

### Admin access
Click **"Admin"** in the header, then enter the password:
```
estata-admin-2024
```

---

## 📦 Production Deployment

This project is configured for **standalone output** — it can be deployed to **Vercel**, **Netlify**, **Docker**, or any Node host.

### Option A: Vercel (recommended — easiest)

1. Push your code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo
3. Vercel auto-detects Next.js — keep the defaults
4. Add environment variables (from `.env.example`) in the Vercel dashboard:
   - `DATABASE_URL` — use Vercel Postgres or external Postgres URL
   - `NEXTAUTH_SECRET` — generate with `openssl rand -base64 32`
   - `NEXTAUTH_URL` — your Vercel URL (e.g. `https://estata.vercel.app`)
   - `ESTATA_ADMIN_PASSWORD` — set a strong custom admin password
5. Click **Deploy** — Vercel will build and ship

### Option B: Docker (self-host)

```dockerfile
# Dockerfile (create at project root)
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json bun.lock* ./
RUN npm install --frozen-lockfile

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

Then:
```bash
docker build -t estata .
docker run -p 3000:3000 --env-file .env.local estata
```

### Option C: Static / Node host (Render, Railway, Fly.io)

1. Build: `npm run build` (produces `.next/standalone/`)
2. Run: `node .next/standalone/server.js`
3. Make sure environment variables are set in your host's dashboard

---

## 🗂️ Project Structure

```
estata/
├── prisma/
│   └── schema.prisma              # Database schema (for production)
├── public/                         # Static assets (logo, robots.txt)
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout, fonts, metadata
│   │   ├── page.tsx                # Home page (composes all sections)
│   │   ├── globals.css             # Tailwind + theme tokens
│   │   └── api/
│   │       └── route.ts            # Health check endpoint
│   ├── components/
│   │   ├── ui/                     # shadcn/ui primitives
│   │   └── site/                   # App-specific components
│   │       ├── header.tsx
│   │       ├── hero.tsx
│   │       ├── categories.tsx
│   │       ├── featured-listings.tsx
│   │       ├── property-card.tsx
│   │       ├── property-detail-dialog.tsx
│   │       ├── why-us.tsx
│   │       ├── find-agent.tsx
│   │       ├── insights.tsx
│   │       ├── cta-banner.tsx
│   │       ├── footer.tsx
│   │       └── admin-panel.tsx     # Admin dashboard
│   ├── lib/
│   │   ├── data.ts                 # Mock data + types (NY/NJ only)
│   │   ├── db.ts                   # Prisma client
│   │   └── utils.ts                # shadcn helpers
│   ├── store/
│   │   └── search-store.ts         # Zustand store (search, favorites, CRUD)
│   └── hooks/
│       └── use-mobile.ts
├── .env.example                    # Template env vars
├── .gitignore
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## 🛠️ NPM Scripts

```bash
bun run dev        # Start dev server on port 3000
bun run build      # Production build
bun run start      # Run production build
bun run lint       # ESLint check
bun run db:push    # Push Prisma schema to DB
bun run db:generate # Generate Prisma client
bun run db:migrate # Run Prisma migrations
bun run db:reset   # Reset DB (dev only)
```

---

## 🎨 Tech Stack

| Layer            | Choice                                          |
| ---------------- | ----------------------------------------------- |
| Framework        | Next.js 16 (App Router, Turbopack)              |
| Language         | TypeScript 5                                    |
| Styling          | Tailwind CSS 4                                  |
| UI Components    | shadcn/ui (New York) + lucide-react icons       |
| State            | Zustand (with persist middleware)               |
| Notifications    | Sonner                                          |
| Database         | Prisma ORM (SQLite dev / Postgres prod)         |
| Auth (optional)  | NextAuth.js v4                                  |
| Fonts            | Inter (body) + Playfair Display (headings)      |

---

## 🔒 Security Notes (Read Before Production)

This demo uses a **plaintext admin password** stored in the client bundle. Before deploying to production:

1. **Move auth server-side** — replace the client-side `login()` in `src/store/search-store.ts` with a NextAuth.js session or a server action
2. **Hash the password** — use `bcrypt` or `argon2` and verify against a DB record
3. **Move CRUD to server actions** — replace the in-memory Zustand `addProperty` / `updateProperty` / `deleteProperty` with Prisma-backed server actions
4. **Set up a real database** — switch `DATABASE_URL` from SQLite to Postgres
5. **Add rate limiting** — protect the admin login endpoint
6. **Set strong `NEXTAUTH_SECRET`** — at least 32 random bytes

A starter Prisma schema is already in `prisma/schema.prisma` — extend it with `Property` and `User` models, then run `bun run db:push`.

---

## 📝 Customization

### Add a new property type
1. Edit `ListingType` in `src/lib/data.ts` (add the new type)
2. Add it to the `PROPERTY_TYPES` array in `src/components/site/admin-panel.tsx`
3. Add a category card in `CATEGORIES` (data.ts) if you want it on the homepage

### Change the theme color
Edit the CSS variables in `src/app/globals.css`:
```css
:root {
  --primary: oklch(0.55 0.22 27);        /* crimson red */
  --accent: oklch(0.96 0.008 27);
}
```

### Expand to other states
1. Add state codes to `SUPPORTED_STATES` in `src/lib/data.ts`
2. Update `STATE_LABELS`
3. Add cities to `POPULAR_CITIES`
4. The state validation in `search-store.ts` will automatically accept the new states

---

## 📄 License

MIT — free to use, modify, and deploy. Attribution appreciated but not required.

### Bergen County town data

`/towns-and-schools` uses the licensed [NJStreet town directory](https://www.njstreet.com/towns-and-schools/) as its source. The snapshot includes 70 town records, 295 school rows, 235 bus route links, the original map image, and 70 map boundary paths. The source tables contain historical figures (including 2020 Census and 2021 school budget values); the original school notes appear on each detail page. The source material is not covered by this repository's MIT code license.

- `src/data/bergen-towns.json` stores the town fields, school rows, notes, and links.
- `src/data/town-boundaries.json` stores the original map hotspot geometry.
- `public/maps/bergen-county.png` stores the original map image.
- Source PDF and image documents currently open via their original NJStreet links. Some town pages provide document headings without a file link.

To refresh town data from public pages, install `scripts/requirements-njstreet.txt` and run `python scripts/import-njstreet.py --fetch`. If automated access is challenged, obtain a licensed HTML export from the site owner with `index.html` and each `<source-slug>.html`, then run `python scripts/import-njstreet.py --pages-dir exported-html`. Add `--download-assets` to copy the map and first-party PDF/image documents into `public/` and rewrite those links to local paths. The importer validates all 70 pages before replacing the current JSON. The map hotspot geometry is kept separately because it is generated by the source map widget; update it only from a verified new export when the map changes.

## 🙏 Acknowledgements

- Real estate listing photos via [Z.AI image search](https://chatglm.cn)
- UI components by [shadcn/ui](https://ui.shadcn.com)
- Icons by [Lucide](https://lucide.dev)
- Fonts by [Google Fonts](https://fonts.google.com) (Inter + Playfair Display)
