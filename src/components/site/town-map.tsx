"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MapPin, Search } from "lucide-react";
import {
  averageSat, boundaries, distanceToGwb, meanSchoolRating,
  townNumber, towns, townsBySlug, townValue, type TownRecord,
} from "@/lib/town-data";

type SortKey = "name" | "population" | "income" | "rating" | "sat" | "distance" | "cost";
const numericSorts: Record<Exclude<SortKey, "name">, (town: TownRecord) => number | null> = {
  population: (town) => townNumber(town, "Population"),
  income: (town) => townNumber(town, "Median Household Income"),
  rating: meanSchoolRating,
  sat: averageSat,
  distance: distanceToGwb,
  cost: (town) => {
    const value = town.overview.find((item) => item.label.includes("Education Cost Per Student"))?.value;
    const match = value?.replace(/,/g, "").match(/\$?([\d.]+)/);
    return match ? Number(match[1]) : null;
  },
};

export function TownMap() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("name");
  const [hovered, setHovered] = useState<string | null>(null);
  const visible = useMemo(() => towns
    .filter((town) => town.name.toLowerCase().includes(query.trim().toLowerCase()))
    .sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      const av = numericSorts[sort](a), bv = numericSorts[sort](b);
      if (av === null) return bv === null ? a.name.localeCompare(b.name) : 1;
      if (bv === null) return -1;
      return (sort === "distance" ? av - bv : bv - av) || a.name.localeCompare(b.name);
    }), [query, sort]);
  const visibleSlugs = new Set(visible.map((town) => town.slug));

  return (
    <section className="bg-background py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-7 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
            <MapPin className="h-3.5 w-3.5" /> Bergen County
          </div>
          <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">Towns &amp; Schools</h2>
          <p className="mt-2 text-sm text-muted-foreground">지도에서 타운 경계를 클릭하거나 목록에서 검색해 상세 정보를 확인하세요.</p>
        </div>

        <div className="mb-5 flex flex-col gap-3 sm:flex-row">
          <label className="relative flex-1">
            <span className="sr-only">Search towns</span>
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input value={query} onChange={(event) => setQuery(event.target.value)}
              placeholder="Search a town · 타운 검색"
              className="h-11 w-full rounded-lg border border-border bg-background pl-10 pr-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary" />
          </label>
          <label className="flex items-center gap-2 text-sm">
            <span className="shrink-0 text-muted-foreground">Sort by</span>
            <select value={sort} onChange={(event) => setSort(event.target.value as SortKey)}
              className="h-11 rounded-lg border border-border bg-background px-3 text-sm focus-visible:ring-2 focus-visible:ring-primary">
              <option value="name">Name A–Z</option>
              <option value="population">Population: high to low</option>
              <option value="income">Median income: high to low</option>
              <option value="rating">School rating: high to low</option>
              <option value="sat">SAT: high to low</option>
              <option value="distance">GWB distance: near to far</option>
              <option value="cost">Cost per student: high to low</option>
            </select>
          </label>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
            <svg viewBox="0 0 1100 1377" className="h-auto w-full" role="img"
              aria-label="Map of 70 Bergen County towns; each boundary opens town details">
              <image href="/maps/bergen-county.png" x="0" y="0" width="1100" height="1377" preserveAspectRatio="none" />
              {boundaries.map((boundary) => {
                const town = townsBySlug[boundary.slug];
                const active = hovered === boundary.slug;
                // Pre-compute the title string once so SSR and client render
                // produce identical text content (avoids hydration mismatch
                // caused by template literal whitespace differences).
                const popValue = town ? townValue(town, "Population") : null;
                const ariaLabel = popValue
                  ? `View ${boundary.name} town details · Population ${popValue}`
                  : `View ${boundary.name} town details`;
                return (
                  <a
                    key={boundary.slug}
                    href={`/towns-and-schools/${boundary.slug}`}
                    aria-label={ariaLabel}
                    onMouseEnter={() => setHovered(boundary.slug)}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => setHovered(boundary.slug)}
                    onBlur={() => setHovered(null)}
                    className="cursor-pointer outline-none"
                  >
                    {/* Plain string child (no template literal) — prevents
                        hydration mismatch from whitespace differences. */}
                    <title>{boundary.name}</title>
                    <path
                      d={boundary.d}
                      fill="#2563eb"
                      pointerEvents="all"
                      fillOpacity={
                        active ? 0.38 : visibleSlugs.has(boundary.slug) && query ? 0.13 : 0
                      }
                      stroke={active ? "#1d4ed8" : "transparent"}
                      strokeWidth={active ? 3 : 0}
                    />
                  </a>
                );
              })}
            </svg>
            <p className="px-4 py-3 text-xs text-muted-foreground">Original Bergen map and town boundaries reproduced with permission from NJStreet.</p>
          </div>
          <aside className="self-start rounded-xl border border-border bg-secondary/30 p-4 lg:sticky lg:top-24">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{visible.length} of {towns.length} towns</p>
            <div className="max-h-[660px] space-y-1 overflow-y-auto pr-1">
              {visible.map((town) => (
                <Link key={town.slug} href={`/towns-and-schools/${town.slug}`}
                  onMouseEnter={() => setHovered(town.slug)} onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(town.slug)} onBlur={() => setHovered(null)}
                  className={`block rounded-lg px-3 py-2 text-sm transition-colors ${hovered === town.slug ? "bg-primary text-primary-foreground" : "bg-background hover:bg-secondary"}`}>
                  <span className="font-medium">{town.name}</span>
                  <span className={`block text-xs ${hovered === town.slug ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                    Population {townValue(town, "Population") ?? "—"} · {town.schools.length} schools
                  </span>
                </Link>
              ))}
              {visible.length === 0 && <p className="p-3 text-sm text-muted-foreground">No matching town.</p>}
            </div>
          </aside>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">Figures are reproduced from NJStreet historical source tables. Missing values are excluded from numeric rankings.</p>
      </div>
    </section>
  );
}
