"use client";

import { Award, Headset, SearchCheck, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { STATS } from "@/lib/data";

const FEATURES = [
  {
    icon: SearchCheck,
    title: "Verified listings",
    description:
      "Every listing is checked for accuracy by our quality team before going live. No stale inventory, no fake photos, no surprises at the showing.",
  },
  {
    icon: Award,
    title: "Top-rated agents",
    description:
      "Work with the top 5% of local agents — vetted, reviewed, and rated by real buyers and sellers in your market. We match you based on your goals.",
  },
  {
    icon: ShieldCheck,
    title: "Secure transactions",
    description:
      "From offer to closing, your data and documents are protected with bank-grade encryption and a transparent audit trail.",
  },
  {
    icon: Headset,
    title: "Support 7 days a week",
    description:
      "Real humans on live chat, email, and phone from 7am to 9pm — plus a self-serve help center with 200+ articles.",
  },
];

export function WhyUs() {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Stats band */}
        <div className="grid grid-cols-2 gap-4 rounded-2xl bg-foreground p-6 text-background sm:p-8 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
                {s.value}
              </div>
              <div className="mt-1 text-xs text-background/70 sm:text-sm">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="mt-16 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Why Estata
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            The trusted name in NY & NJ real estate
          </h2>
          <p className="mt-3 text-muted-foreground">
            We&apos;ve helped thousands of families across New York and New
            Jersey find their next home. Here&apos;s what makes the Estata
            experience different.
          </p>
        </div>

        {/* Feature grid */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <Card key={f.title} className="h-full transition-shadow hover:shadow-md">
              <CardContent className="p-6">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-primary">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {f.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
