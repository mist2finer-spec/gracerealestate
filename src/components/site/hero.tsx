"use client";

import { useState } from "react";
import {
  Search,
  MapPin,
  Home,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchStore, SearchTab } from "@/store/search-store";
import { POPULAR_CITIES } from "@/lib/data";
import { toast } from "sonner";

const TABS: { value: SearchTab; label: string }[] = [
  { value: "for-sale", label: "Buy" },
  { value: "for-rent", label: "Rent" },
];

const PROPERTY_TYPES = [
  { value: "any", label: "Any Type" },
  { value: "house", label: "House" },
  { value: "condo", label: "Condo / Apartment" },
  { value: "land", label: "Land" },
  { value: "commercial", label: "Commercial" },
];

const PRICE_RANGES_SALE = [
  { value: "any", label: "Any Price" },
  { value: "0-500k", label: "Up to $500K" },
  { value: "500k-1m", label: "$500K – $1M" },
  { value: "1m-2m", label: "$1M – $2M" },
  { value: "2m+", label: "$2M+" },
];

const PRICE_RANGES_RENT = [
  { value: "any", label: "Any Price" },
  { value: "0-2k", label: "Up to $2K/mo" },
  { value: "2k-4k", label: "$2K – $4K/mo" },
  { value: "4k-8k", label: "$4K – $8K/mo" },
  { value: "8k+", label: "$8K+/mo" },
];

export function Hero() {
  const {
    searchTab,
    setSearchTab,
    location,
    setLocation,
    propertyType,
    setPropertyType,
    priceRange,
    setPriceRange,
    applySearch,
  } = useSearchStore();
  const hero = useSearchStore((s) => s.siteContent.hero);
  const stats = useSearchStore((s) => s.siteContent.stats);

  const [locationOpen, setLocationOpen] = useState(false);

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    applySearch();
    const el = document.querySelector("#listings");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    toast.success("Search updated", {
      description: `Showing ${searchTab === "for-sale" ? "for-sale" : "rental"} listings${
        location ? ` near ${location}` : ""
      }.`,
    });
  };

  const priceOptions =
    searchTab === "for-sale" ? PRICE_RANGES_SALE : PRICE_RANGES_RENT;

  return (
    <section className="relative isolate overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <img
          src={hero.backgroundImage}
          alt="Luxury modern home exterior at dusk"
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/75" />
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-12 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pb-20 lg:pt-28">
        {/* Headline */}
        <div className="max-w-3xl text-white">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">
            <TrendingUp className="h-3.5 w-3.5" />
            {hero.badge}
          </div>
          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {hero.headline}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/85 sm:text-lg">
            {hero.subline}
          </p>
        </div>

        {/* Search card */}
        <form
          onSubmit={handleSearch}
          className="mt-8 rounded-xl bg-white p-2 shadow-2xl sm:mt-10"
          id="hero-search"
        >
          {/* Buy / Rent tabs */}
          <div className="flex items-center gap-1 border-b border-border p-1 pb-2 sm:gap-2">
            {TABS.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setSearchTab(t.value)}
                className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
                  searchTab === t.value
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/70 hover:bg-secondary"
                }`}
              >
                {t.label}
              </button>
            ))}
            <div className="ml-auto hidden text-xs text-muted-foreground sm:block pr-2">
              {searchTab === "for-sale" ? "Buying" : "Renting"} · Estata Network
            </div>
          </div>

          {/* Inputs */}
          <div className="grid grid-cols-1 gap-2 p-2 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_auto]">
            {/* Location */}
            <div className="relative">
              <MapPin className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onFocus={() => setLocationOpen(true)}
                onBlur={() => setTimeout(() => setLocationOpen(false), 150)}
                placeholder="City, neighborhood, or ZIP (NY / NJ only)"
                className="border-0 pl-9 shadow-none focus-visible:ring-0"
              />
              {locationOpen && (
                <div className="absolute left-0 right-0 top-full z-20 mt-1 max-h-72 overflow-auto rounded-md border border-border bg-white shadow-lg">
                  <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    Popular cities · NY & NJ
                  </div>
                  {POPULAR_CITIES.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        setLocation(c);
                        setLocationOpen(false);
                      }}
                      className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-secondary"
                    >
                      <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Property type */}
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger className="border-0 shadow-none focus:ring-0">
                <Home className="mr-1 h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="Property type" />
              </SelectTrigger>
              <SelectContent>
                {PROPERTY_TYPES.map((p) => (
                  <SelectItem key={p.value} value={p.value}>
                    {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Price */}
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="border-0 shadow-none focus:ring-0">
                <DollarSign className="mr-1 h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="Price range" />
              </SelectTrigger>
              <SelectContent>
                {priceOptions.map((p) => (
                  <SelectItem key={p.value} value={p.value}>
                    {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button type="submit" size="lg" className="gap-2">
              <Search className="h-4 w-4" />
              Search
            </Button>
          </div>
        </form>

        {/* Quick stats bar */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-lg border border-white/15 bg-white/10 p-3 text-white backdrop-blur-sm sm:p-4"
            >
              <div className="text-2xl font-bold sm:text-3xl">{s.value}</div>
              <div className="text-xs text-white/80 sm:text-sm">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Trust signals */}
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/70 sm:text-sm">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4" /> {hero.trustBadge1}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Users className="h-4 w-4" /> {hero.trustBadge2}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <TrendingUp className="h-4 w-4" /> {hero.trustBadge3}
          </span>
        </div>
      </div>
    </section>
  );
}
