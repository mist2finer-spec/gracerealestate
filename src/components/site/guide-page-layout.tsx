"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { AdminPanel } from "@/components/site/admin-panel";
import { ContentEditorPanel } from "@/components/site/content-editor-panel";
import { InquirySection } from "@/components/site/inquiry-section";
import { useSearchStore } from "@/store/search-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export interface GuideSection {
  heading: string;
  body: string;
  bullets?: string[];
}

export interface GuidePageData {
  slug: string;
  title: string;
  eyebrow: string;
  intro: string;
  heroImage: string;
  sections: GuideSection[];
  ctaTitle: string;
  ctaDescription: string;
}

export function GuidePageLayout({ data }: { data: GuidePageData }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-foreground text-background">
          <div className="absolute inset-0 z-0">
            <img
              src={data.heroImage}
              alt={data.title}
              className="h-full w-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/85" />
          </div>
          <div className="relative z-10 mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-full border border-background/20 bg-background/10 px-3 py-1 text-xs font-medium text-background backdrop-blur transition-colors hover:bg-background/20"
            >
              <ArrowLeft className="h-3 w-3" />
              Back to home
            </Link>
            <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground/90">
              {data.eyebrow}
            </p>
            <h1 className="mt-2 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {data.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base text-background/80 sm:text-lg">
              {data.intro}
            </p>
          </div>
        </section>

        {/* Body */}
        <section className="bg-background py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              {data.sections.map((s, idx) => (
                <Card key={idx} className="overflow-hidden">
                  <CardContent className="p-6 sm:p-8">
                    <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                      {s.heading}
                    </h2>
                    <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                      {s.body}
                    </p>
                    {s.bullets && s.bullets.length > 0 && (
                      <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {s.bullets.map((b, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-foreground/80"
                          >
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-10 rounded-2xl bg-primary p-6 text-primary-foreground sm:p-8">
              <h2 className="font-display text-2xl font-bold sm:text-3xl">
                {data.ctaTitle}
              </h2>
              <p className="mt-2 max-w-xl text-primary-foreground/85">
                {data.ctaDescription}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button
                  size="lg"
                  variant="secondary"
                  className="gap-1.5"
                  onClick={() => {
                    useSearchStore.getState().openInquiry(null);
                  }}
                >
                  Send an inquiry
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Link href="/">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                  >
                    Browse listings
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Inline inquiry form */}
        <InquirySection variant="inline" />
      </main>
      <Footer />
      <AdminPanel />
      <ContentEditorPanel />
      <InquirySection variant="dialog" />
    </div>
  );
}
