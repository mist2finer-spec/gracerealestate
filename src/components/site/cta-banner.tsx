"use client";

import { ArrowRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function CTABanner() {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-foreground px-6 py-12 text-background sm:px-12 sm:py-16">
          {/* Decorative gradient */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />

          <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-[2fr_1fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-background/20 bg-background/10 px-3 py-1 text-xs font-medium backdrop-blur">
                <Home className="h-3.5 w-3.5" />
                List with Estata
              </div>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                Ready to sell or rent out your property?
              </h2>
              <p className="mt-3 max-w-xl text-background/80">
                Reach 12M+ qualified buyers and tenants in days, not months. Get a
                free, no-obligation valuation from a local Estata agent — typically
                in under 24 hours.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  size="lg"
                  onClick={() =>
                    toast("Valuation request sent", {
                      description: "An agent will reach out within 24 hours.",
                    })
                  }
                >
                  Get a free valuation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-background/30 bg-transparent text-background hover:bg-background/10 hover:text-background"
                  onClick={() =>
                    toast("Pricing guide ready", {
                      description: "Check your downloads.",
                    })
                  }
                >
                  See pricing
                </Button>
              </div>
            </div>

            {/* Right-side stat card */}
            <div className="rounded-xl border border-background/15 bg-background/5 p-6 backdrop-blur-sm">
              <div className="font-display text-4xl font-bold text-background">
                12M+
              </div>
              <div className="text-sm text-background/70">
                Monthly buyers searching Estata
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-background/15 pt-4 text-sm">
                <div>
                  <div className="font-semibold text-background">3.2%</div>
                  <div className="text-xs text-background/60">Avg. days on market</div>
                </div>
                <div>
                  <div className="font-semibold text-background">98%</div>
                  <div className="text-xs text-background/60">Client satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
