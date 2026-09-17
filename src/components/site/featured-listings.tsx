"use client";

import { useMemo } from "react";
import { Heart, Filter, X, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PropertyCard } from "./property-card";
import { PropertyDetailDialog } from "./property-detail-dialog";
import { useSearchStore, ListingFilter } from "@/store/search-store";

const FILTERS: { value: ListingFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "for-sale", label: "For Sale" },
  { value: "for-rent", label: "For Rent" },
  { value: "new", label: "New" },
];

export function FeaturedListings() {
  const {
    listingFilter,
    setListingFilter,
    location,
    propertyType,
    priceRange,
    resetFilters,
    selectedPropertyId,
    setSelectedProperty,
    favorites,
    properties,
  } = useSearchStore();

  const filtered = useMemo(() => {
    let list = [...properties];

    // Listing filter
    if (listingFilter === "for-sale") list = list.filter((p) => p.status === "for-sale");
    else if (listingFilter === "for-rent") list = list.filter((p) => p.status === "for-rent");
    else if (listingFilter === "new") list = list.filter((p) => p.isNew);
    // Property type from hero search
    if (propertyType && propertyType !== "any") {
      list = list.filter((p) => p.type === propertyType);
    }

    // Location
    if (location.trim()) {
      const q = location.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.city.toLowerCase().includes(q) ||
          p.state.toLowerCase().includes(q) ||
          p.address.toLowerCase().includes(q) ||
          `${p.city}, ${p.state}`.toLowerCase().includes(q)
      );
    }

    // Price range
    if (priceRange && priceRange !== "any") {
      list = list.filter((p) => {
        if (priceRange === "0-500k") return p.price < 500_000;
        if (priceRange === "500k-1m") return p.price >= 500_000 && p.price < 1_000_000;
        if (priceRange === "1m-2m") return p.price >= 1_000_000 && p.price < 2_000_000;
        if (priceRange === "2m+") return p.price >= 2_000_000;
        if (priceRange === "0-2k") return p.price < 2_000;
        if (priceRange === "2k-4k") return p.price >= 2_000 && p.price < 4_000;
        if (priceRange === "4k-8k") return p.price >= 4_000 && p.price < 8_000;
        if (priceRange === "8k+") return p.price >= 8_000;
        return true;
      });
    }

    return list;
  }, [properties, listingFilter, propertyType, location, priceRange]);

  const hasActiveFilters =
    listingFilter !== "all" ||
    !!location ||
    propertyType !== "any" ||
    priceRange !== "any";

  return (
    <section id="listings" className="bg-secondary/30 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              {hasActiveFilters ? "Search results" : "Featured listings"}
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {hasActiveFilters
                ? `${filtered.length} matching ${filtered.length === 1 ? "property" : "properties"}`
                : "Handpicked homes just for you"}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {hasActiveFilters && location
                ? `Showing results near ${location}.`
                : "Updated daily from our trusted agent network."}
            </p>
          </div>

          {favorites.length > 0 && (
            <Badge
              variant="outline"
              className="self-start gap-1.5 border-primary/30 text-primary"
            >
              <Heart className="h-3.5 w-3.5 fill-primary" />
              {favorites.length} saved
            </Badge>
          )}
        </div>

        {/* Inquiry CTA — appears when search results are visible */}
        {hasActiveFilters && filtered.length > 0 && (
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <div className="font-semibold text-foreground">
                  Interested in any of these properties?
                </div>
                <div className="text-xs text-muted-foreground">
                  Send an inquiry and the listing agent will respond within 24 hours.
                </div>
              </div>
            </div>
            <Button
              onClick={() => useSearchStore.getState().openInquiry(null)}
              className="gap-1.5"
            >
              <Mail className="h-4 w-4" />
              Send inquiry
            </Button>
          </div>
        )}

        {/* Filter bar */}
        <div className="mb-8 flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded-lg border border-border bg-background p-1">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setListingFilter(f.value)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  listingFilter === f.value
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/70 hover:bg-secondary"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="gap-1.5 text-muted-foreground"
            >
              <X className="h-3.5 w-3.5" />
              Clear filters
            </Button>
          )}

          <div className="ml-auto hidden items-center gap-2 text-xs text-muted-foreground sm:flex">
            <Filter className="h-3.5 w-3.5" />
            Sorted by: <span className="font-medium text-foreground">Newest first</span>
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-background py-16 text-center">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-secondary">
              <Filter className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold">No matches found</h3>
            <p className="mt-1 max-w-md text-sm text-muted-foreground">
              Try widening your search — clear filters or change the price range.
            </p>
            <Button onClick={resetFilters} className="mt-4">
              Reset filters
            </Button>
          </div>
        )}

        {/* Load more */}
        {filtered.length > 0 && (
          <div className="mt-10 flex justify-center">
            <Button size="lg" variant="outline">
              Load more listings
            </Button>
          </div>
        )}
      </div>

      {/* Detail dialog */}
      <PropertyDetailDialog
        propertyId={selectedPropertyId}
        onClose={() => setSelectedProperty(null)}
      />
    </section>
  );
}
