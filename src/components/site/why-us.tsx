"use client";

import { Award, Headset, SearchCheck, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useSearchStore } from "@/store/search-store";

const FEATURE_ICONS = [SearchCheck, Award, ShieldCheck, Headset];

export function WhyUs() {
  const stats = useSearchStore((s) => s.siteContent.stats);
  const whyUs = useSearchStore((s) => s.siteContent.whyUs);

  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Stats band */}
        <div className="grid grid-cols-2 gap-4 rounded-2xl bg-foreground p-6 text-background sm:p-8 lg:grid-cols-4">
          {stats.map((s) => (
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
            {whyUs.eyebrow}
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {whyUs.title}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {whyUs.description}
          </p>
        </div>

        {/* Feature grid */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {whyUs.features.map((f, idx) => {
            const Icon = FEATURE_ICONS[idx % FEATURE_ICONS.length];
            return (
              <Card key={idx} className="h-full transition-shadow hover:shadow-md">
                <CardContent className="p-6">
                  <div className="grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {f.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
