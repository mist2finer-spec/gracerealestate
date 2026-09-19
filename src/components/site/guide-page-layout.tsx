"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, List, X, Calculator, ArrowUp } from "lucide-react";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { WhyUs } from "@/components/site/why-us";
import { AdminPanel } from "@/components/site/admin-panel";
import { ContentEditorPanel } from "@/components/site/content-editor-panel";
import { InquirySection } from "@/components/site/inquiry-section";
import { useSearchStore } from "@/store/search-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

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
  /** Optional extra content rendered between the sections and the CTA
   * (e.g. the closing cost calculator on /sell). */
  extraContent?: React.ReactNode;
}

export function GuidePageLayout({
  data,
  useStoreContent = false,
  extraContent,
}: {
  data: GuidePageData;
  useStoreContent?: boolean;
  extraContent?: React.ReactNode;
}) {
  // If useStoreContent is true, read the editable guide from the store.
  // Safe-access: if guides is undefined (old localStorage), fall back to the
  // static data passed via props.
  const storeGuide = useSearchStore((s) => {
    if (!useStoreContent) return null;
    const guides = s.siteContent?.guides;
    if (!guides) return null;
    return guides[data.slug] ?? null;
  });

  // Merge: store content takes precedence if it has meaningful data.
  // Fall back to static props.data for any field that's empty/missing.
  // This prevents blank pages when old localStorage has stale guide data
  // (e.g., empty sections from a previous version).
  const merged = storeGuide
    ? {
        ...data,
        title: storeGuide.title?.trim() || data.title,
        eyebrow: storeGuide.eyebrow?.trim() || data.eyebrow,
        intro: storeGuide.intro?.trim() || data.intro,
        heroImage: storeGuide.heroImage?.trim() || data.heroImage,
        ctaTitle: storeGuide.ctaTitle?.trim() || data.ctaTitle,
        ctaDescription: storeGuide.ctaDescription?.trim() || data.ctaDescription,
        sections:
          storeGuide.sections && storeGuide.sections.length > 0
            ? storeGuide.sections.map((s) => ({
                heading: s.title,
                body: s.body,
                bullets: s.bullets,
              }))
            : data.sections,
      }
    : data;

  // Sidebar nav — track which section is active based on scroll position
  const [activeSection, setActiveSection] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const offset = 120; // header offset
      let current = 0;
      for (let i = 0; i < merged.sections.length; i++) {
        const el = sectionRefs.current[i];
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top - offset <= 0) {
            current = i;
          }
        }
      }
      setActiveSection(current);
      // Show "back to top" button after scrolling past the hero
      setShowTopButton(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [merged.sections.length]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (idx: number) => {
    const el = sectionRefs.current[idx];
    if (el) {
      const headerOffset = 100;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
    setSidebarOpen(false);
  };

  // Sidebar items — include hero, sections, and calculator/extra
  const navItems: { label: string; idx: number | null }[] = [
    { label: "Overview", idx: -1 }, // scroll to top
    ...merged.sections.map((s, i) => ({
      label: s.heading.length > 40 ? s.heading.slice(0, 37) + "…" : s.heading,
      idx: i,
    })),
  ];
  if (extraContent) {
    navItems.push({ label: "Calculator", idx: -2 });
  }

  const handleNavClick = (item: { label: string; idx: number | null }) => {
    if (item.idx === -1) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (item.idx === -2) {
      const calcEl = document.getElementById("closing-cost-calculator");
      if (calcEl) {
        const top = calcEl.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }
    } else if (item.idx !== null) {
      scrollToSection(item.idx);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-foreground text-background">
          <div className="absolute inset-0 z-0">
            <img
              src={merged.heroImage}
              alt={merged.title}
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
              {merged.eyebrow}
            </p>
            <h1 className="mt-2 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {merged.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base text-background/80 sm:text-lg">
              {merged.intro}
            </p>
          </div>
        </section>

        {/* Body with sticky sidebar */}
        <section className="bg-background py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Mobile sidebar toggle */}
            <div className="lg:hidden mb-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="gap-1.5"
              >
                <List className="h-4 w-4" />
                {sidebarOpen ? "Close" : "Sections"}
              </Button>
              {sidebarOpen && (
                <div className="mt-3 rounded-lg border border-border bg-secondary/30 p-2">
                  {navItems.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => handleNavClick(item)}
                      className={`block w-full rounded px-3 py-2 text-left text-sm transition-colors ${
                        activeSection === item.idx ||
                        (item.idx === -1 && activeSection === 0)
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-secondary"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                  {extraContent && (
                    <button
                      onClick={() => handleNavClick({ label: "Calculator", idx: -2 })}
                      className="mt-2 flex w-full items-center gap-2 rounded border border-primary/30 bg-primary/5 px-3 py-2 text-left text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
                    >
                      <Calculator className="h-4 w-4" />
                      Calculator
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="flex gap-8">
              {/* Sidebar nav — desktop sticky on the right */}
              <aside className="hidden lg:block w-64 shrink-0">
                <div className="sticky top-24">
                  <div className="rounded-lg border border-border bg-secondary/30 p-3">
                    <div className="px-2 pb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      On this page
                    </div>
                    <nav className="space-y-0.5">
                      {navItems.map((item, i) => {
                        const isActive =
                          (item.idx === -1 && activeSection === 0) ||
                          item.idx === activeSection;
                        return (
                          <button
                            key={i}
                            onClick={() => handleNavClick(item)}
                            className={`block w-full rounded-md px-3 py-1.5 text-left text-xs transition-colors ${
                              isActive
                                ? "bg-primary/10 font-semibold text-primary"
                                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                            }`}
                          >
                            {item.label}
                          </button>
                        );
                      })}
                    </nav>
                    {/* Calculator button — highlighted, below the section list */}
                    {extraContent && (
                      <button
                        onClick={() => handleNavClick({ label: "Calculator", idx: -2 })}
                        className="mt-3 flex w-full items-center gap-2 rounded-md border border-primary/30 bg-primary/5 px-3 py-2 text-left text-xs font-semibold text-primary transition-colors hover:bg-primary/10"
                      >
                        <Calculator className="h-4 w-4" />
                        Calculator
                      </button>
                    )}
                  </div>
                </div>
              </aside>

              {/* Main content */}
              <div className="min-w-0 flex-1">
                <div className="space-y-8">
                  {merged.sections.map((s, idx) => (
                    <div
                      key={idx}
                      ref={(el) => {
                        sectionRefs.current[idx] = el;
                      }}
                      className="scroll-mt-24"
                    >
                      <Card className="overflow-hidden">
                        <CardContent className="p-6 sm:p-8">
                          <div className="flex items-start gap-3">
                            <Badge className="mt-1 shrink-0 bg-primary/10 text-primary hover:bg-primary/10">
                              {idx + 1}
                            </Badge>
                            <div className="min-w-0 flex-1">
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
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>

                {/* Extra content (calculator, etc.) */}
                {extraContent}

                {/* CTA */}
                <div className="mt-10 rounded-2xl bg-primary p-6 text-primary-foreground sm:p-8">
                  <h2 className="font-display text-2xl font-bold sm:text-3xl">
                    {merged.ctaTitle}
                  </h2>
                  <p className="mt-2 max-w-xl text-primary-foreground/85">
                    {merged.ctaDescription}
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
            </div>
          </div>
        </section>

        {/* WhyUs stats band — dark section, always at bottom of every page */}
        <WhyUs />

        {/* Inline inquiry form */}
        <InquirySection variant="inline" />
      </main>

      {/* Back-to-top floating button — appears after scrolling past hero */}
      {showTopButton && (
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-40 grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl active:scale-95"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}

      <Footer />
      <AdminPanel />
      <ContentEditorPanel />
      <InquirySection variant="dialog" />
    </div>
  );
}
