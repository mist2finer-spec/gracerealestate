"use client";

import Link from "next/link";
import { ArrowRight, Home, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearchStore } from "@/store/search-store";

export function CTABanner() {
  const cta = useSearchStore((s) => s.siteContent.cta);
  const footer = useSearchStore((s) => s.siteContent.footer);
  const openInquiry = useSearchStore((s) => s.openInquiry);

  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-foreground px-6 py-12 text-background sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />

          <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-[2fr_1fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-background/20 bg-background/10 px-3 py-1 text-xs font-medium backdrop-blur">
                <Home className="h-3.5 w-3.5" />
                {cta.badge}
              </div>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                {cta.title}
              </h2>
              <p className="mt-3 max-w-xl text-background/80">{cta.description}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button size="lg" onClick={() => openInquiry()}>
                  {cta.primaryButton}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-background/30 bg-transparent text-background hover:bg-background/10 hover:text-background"
                >
                  <Link href="/towns-and-schools">{cta.secondaryButton}</Link>
                </Button>
              </div>
            </div>

            {/* Direct contact card */}
            <div className="space-y-3 rounded-xl border border-background/15 bg-background/5 p-6 backdrop-blur-sm">
              <div className="font-display text-2xl font-bold">Grace Choi</div>
              <a
                href={`tel:${footer.phone.replace(/[^0-9+]/g, "")}`}
                className="flex items-center gap-2 text-sm text-background/80 hover:text-background"
              >
                <Phone className="h-4 w-4" />
                {footer.phone}
              </a>
              {footer.email && (
                <a
                  href={`mailto:${footer.email}`}
                  className="flex items-center gap-2 break-all text-sm text-background/80 hover:text-background"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  {footer.email}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
