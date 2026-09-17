"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CATEGORIES } from "@/lib/data";
import { useSearchStore } from "@/store/search-store";
import { toast } from "sonner";

export function Categories() {
  const setPropertyType = useSearchStore((s) => s.setPropertyType);
  const applySearch = useSearchStore((s) => s.applySearch);

  const handleClick = (key: string, label: string) => {
    setPropertyType(key);
    applySearch();
    const el = document.querySelector("#listings");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    toast.success(`Browsing ${label}`, {
      description: "Filtered listings below.",
    });
  };

  return (
    <section id="categories" className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Browse by category
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              What are you looking for?
            </h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              From single-family homes to commercial spaces, find the right property
              type for your needs — all in one place.
            </p>
          </div>
          <Button
            variant="outline"
            className="shrink-0"
            onClick={() => {
              const el = document.querySelector("#listings");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            View all listings
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((cat) => (
            <Card
              key={cat.key}
              className="group relative cursor-pointer overflow-hidden p-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              onClick={() => handleClick(cat.key, cat.label)}
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <div className="text-xs font-medium uppercase tracking-wider text-white/80">
                    {cat.count}
                  </div>
                  <h3 className="mt-1 font-display text-lg font-bold leading-tight">
                    {cat.label}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-xs text-white/80">
                    {cat.description}
                  </p>
                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold backdrop-blur-sm transition-colors group-hover:bg-primary">
                    Browse
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
