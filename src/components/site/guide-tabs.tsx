"use client";

import Link from "next/link";
import {
  Home,
  Search,
  Key,
  Landmark,
  Building2,
  BookOpen,
  ArrowRight,
} from "lucide-react";

interface GuideTab {
  slug: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const GUIDE_TABS: GuideTab[] = [
  {
    slug: "sell",
    label: "Seller Guide",
    href: "/sell",
    icon: Home,
    description: "List your property, price it right, and close faster.",
  },
  {
    slug: "buy",
    label: "Buyer Guide",
    href: "/buy",
    icon: Search,
    description: "From pre-approval to closing — step-by-step guidance.",
  },
  {
    slug: "rent",
    label: "Rent Guide",
    href: "/rent",
    icon: Key,
    description: "Find rentals, understand leases, and move in smoothly.",
  },
  {
    slug: "mortgage",
    label: "Mortgage",
    href: "/mortgage",
    icon: Landmark,
    description: "Rates, calculators, and pre-approval in under 24 hours.",
  },
  {
    slug: "townhouse-condo",
    label: "Townhouse / Condo",
    href: "/townhouse-condo",
    icon: Building2,
    description: "Browse townhomes, condos, co-ops, and HOA details.",
  },
  {
    slug: "real-estate-info",
    label: "Real Estate Info",
    href: "/real-estate-info",
    icon: BookOpen,
    description: "Market trends, laws, and NJ/NY-specific regulations.",
  },
];

export function GuideTabs() {
  return (
    <section id="guides" className="bg-background py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Guides & Resources
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Everything you need to buy, sell, rent, or invest
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground mx-auto">
            Pick a topic to dive into detailed guides, calculators, and
            local market insights for New York and New Jersey.
          </p>
        </div>

        {/* Tabs bar — horizontally scrollable on mobile */}
        <div className="no-scrollbar -mx-4 mb-6 flex gap-1 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
          {GUIDE_TABS.map((tab) => (
            <Link
              key={tab.slug}
              href={tab.href}
              className="group flex shrink-0 items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground/80 transition-all hover:border-primary hover:bg-primary/5 hover:text-primary"
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
              <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          ))}
        </div>

        {/* Cards — short descriptions per tab */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GUIDE_TABS.map((tab) => (
            <Link
              key={tab.slug}
              href={tab.href}
              className="group rounded-xl border border-border bg-background p-5 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
            >
              <div className="flex items-start gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <tab.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-base font-semibold leading-tight text-foreground">
                    {tab.label}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {tab.description}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
