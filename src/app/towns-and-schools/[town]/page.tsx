"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  List,
  School,
  Users,
  Bus,
  TreePine,
  ShoppingBag,
  Building,
  MapPin,
  Home,
} from "lucide-react";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { WhyUs } from "@/components/site/why-us";
import { AdminPanel } from "@/components/site/admin-panel";
import { ContentEditorPanel } from "@/components/site/content-editor-panel";
import { InquirySection } from "@/components/site/inquiry-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSearchStore } from "@/store/search-store";

// ============================================================
// Per-town data (sample for Bergen County, NJ)
// In production this would come from a DB; here it's hard-coded
// for the most popular towns and a generic fallback.
// ============================================================

interface TownData {
  slug: string;
  name: string;
  county: string;
  state: string;
  population: string;
  area: string;
  medianHome: string;
  medianRent: string;
  schoolDistrict: string;
  schools: string;
  avgSat: string;
  gradRate: string;
  commute: string;
  highlights: string[];
}

const TOWN_DATA: Record<string, TownData> = {
  "fort-lee": {
    slug: "fort-lee",
    name: "Fort Lee",
    county: "Bergen County",
    state: "NJ",
    population: "39,701",
    area: "2.87 sq mi",
    medianHome: "$425,000",
    medianRent: "$2,200/mo",
    schoolDistrict: "Fort Lee Public School District",
    schools: "4 schools (2 elem, 1 middle, 1 high)",
    avgSat: "1,210",
    gradRate: "94%",
    commute: "30 min to NYC (bus / George Washington Bridge)",
    highlights: [
      "Quick NYC access via GW Bridge",
      "Large Korean-American community",
      "High-rise condos with Hudson River views",
      "Fort Lee Historic Park",
    ],
  },
  "englewood": {
    slug: "englewood",
    name: "Englewood",
    county: "Bergen County",
    state: "NJ",
    population: "29,221",
    area: "4.91 sq mi",
    medianHome: "$510,000",
    medianRent: "$2,100/mo",
    schoolDistrict: "Englewood Public School District",
    schools: "5 schools (3 elem, 1 middle, 1 high)",
    avgSat: "1,150",
    gradRate: "90%",
    commute: "35 min to NYC (bus)",
    highlights: [
      "Diverse community with thriving arts scene",
      "BergenPAC performing arts center",
      "Englewood Hospital & Medical Center",
      "Downtown shopping and dining district",
    ],
  },
  ridgewood: {
    slug: "ridgewood",
    name: "Ridgewood",
    county: "Bergen County",
    state: "NJ",
    population: "25,979",
    area: "5.84 sq mi",
    medianHome: "$695,000",
    medianRent: "$2,500/mo",
    schoolDistrict: "Ridgewood Public School District",
    schools: "9 schools (6 elem, 2 middle, 1 high)",
    avgSat: "1,290",
    gradRate: "97%",
    commute: "45 min to NYC (train + bus)",
    highlights: [
      "Top-rated school district in NJ",
      "Charming downtown with boutiques & restaurants",
      "Tree-lined residential streets",
      "Family-friendly community events",
    ],
  },
  paramus: {
    slug: "paramus",
    name: "Paramus",
    county: "Bergen County",
    state: "NJ",
    population: "26,342",
    area: "10.49 sq mi",
    medianHome: "$550,000",
    medianRent: "$2,300/mo",
    schoolDistrict: "Paramus Public School District",
    schools: "8 schools (5 elem, 2 middle, 1 high)",
    avgSat: "1,200",
    gradRate: "94%",
    commute: "40 min to NYC (bus)",
    highlights: [
      "Major shopping destination (Garden State Plaza)",
      "Paramus Park Mall & Bergen Town Center",
      "Excellent parks and recreation",
      "Blue Ribbon schools",
    ],
  },
  "teaneck": {
    slug: "teaneck",
    name: "Teaneck",
    county: "Bergen County",
    state: "NJ",
    population: "41,246",
    area: "6.03 sq mi",
    medianHome: "$465,000",
    medianRent: "$2,000/mo",
    schoolDistrict: "Teaneck Public School District",
    schools: "8 schools (4 elem, 2 middle, 1 high, 1 alt)",
    avgSat: "1,130",
    gradRate: "91%",
    commute: "30 min to NYC (bus)",
    highlights: [
      "Diverse, multicultural community",
      "Fairleigh Dickinson University campus",
      "Historic architecture",
      "Strong arts and cultural programs",
    ],
  },
};

const FALLBACK_TOWN: TownData = {
  slug: "default",
  name: "This Town",
  county: "Bergen County",
  state: "NJ",
  population: "—",
  area: "—",
  medianHome: "—",
  medianRent: "—",
  schoolDistrict: "Bergen County Public Schools",
  schools: "—",
  avgSat: "—",
  gradRate: "—",
  commute: "—",
  highlights: [
    "Located in Bergen County, NJ",
    "Easy access to major highways",
    "Family-friendly suburban community",
    "Contact Grace Choi for detailed town info",
  ],
};

// Sections shown on each town page
const TOWN_SECTIONS_META = [
  { id: "overview", icon: MapPin, title: "Overview" },
  { id: "schools", icon: School, title: "Schools" },
  { id: "demographics", icon: Users, title: "Demographics" },
  { id: "transportation", icon: Bus, title: "Transportation" },
  { id: "realestate", icon: Home, title: "Real Estate Market" },
  { id: "highlights", icon: Building, title: "Community Highlights" },
];

export default function TownDetailPage() {
  const params = useParams();
  const townSlug = (params?.town as string) || "";
  const townData = TOWN_DATA[townSlug] || {
    ...FALLBACK_TOWN,
    slug: townSlug,
    name: townSlug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" "),
  };

  const [activeSection, setActiveSection] = useState(0);
  const [showTopButton, setShowTopButton] = useState(false);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const offset = 120;
      let current = 0;
      for (let i = 0; i < TOWN_SECTIONS_META.length; i++) {
        const el = sectionRefs.current[i];
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top - offset <= 0) {
            current = i;
          }
        }
      }
      setActiveSection(current);
      setShowTopButton(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (idx: number) => {
    const el = sectionRefs.current[idx];
    if (el) {
      const headerOffset = 100;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-foreground text-background">
          <div className="absolute inset-0 z-0">
            <img
              src="https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/4bfabf251d6f.jpg"
              alt={townData.name}
              className="h-full w-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/85" />
          </div>
          <div className="relative z-10 mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            <Link
              href="/towns-and-schools"
              className="inline-flex items-center gap-1.5 rounded-full border border-background/20 bg-background/10 px-3 py-1 text-xs font-medium text-background backdrop-blur transition-colors hover:bg-background/20"
            >
              <ArrowLeft className="h-3 w-3" />
              Back to map
            </Link>
            <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground/90">
              {townData.county} · {townData.state}
            </p>
            <h1 className="mt-2 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {townData.name}
            </h1>
            <p className="mt-4 max-w-2xl text-base text-background/80 sm:text-lg">
              Population {townData.population} · {townData.commute}.
              {` ${townData.name}의 학교, 인구 통계, 교통, 부동산 시장 정보를 확인하세요.`}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                size="lg"
                variant="secondary"
                className="gap-1.5"
                onClick={() => useSearchStore.getState().openInquiry(null)}
              >
                Ask about homes here
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Link href="/#listings">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-background/30 bg-transparent text-background hover:bg-background/10 hover:text-background"
                >
                  Browse listings
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Body with sticky sidebar */}
        <section className="bg-background py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex gap-8">
              {/* Sidebar nav */}
              <aside className="hidden lg:block w-64 shrink-0">
                <div className="sticky top-24">
                  <div className="rounded-lg border border-border bg-secondary/30 p-3">
                    <div className="px-2 pb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      On this page
                    </div>
                    <nav className="space-y-0.5">
                      {TOWN_SECTIONS_META.map((s, i) => {
                        const Icon = s.icon;
                        const isActive = activeSection === i;
                        return (
                          <button
                            key={s.id}
                            onClick={() => scrollToSection(i)}
                            className={`flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-left text-xs transition-colors ${
                              isActive
                                ? "bg-primary/10 font-semibold text-primary"
                                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                            }`}
                          >
                            <Icon className="h-3.5 w-3.5" />
                            {s.title}
                          </button>
                        );
                      })}
                    </nav>
                    <Link
                      href="/towns-and-schools"
                      className="mt-3 block rounded-md border border-border bg-background px-3 py-2 text-center text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    >
                      ← All Towns
                    </Link>
                  </div>
                </div>
              </aside>

              {/* Main content */}
              <div className="min-w-0 flex-1">
                <div className="space-y-8">
                  {/* Overview */}
                  <div
                    ref={(el) => {
                      sectionRefs.current[0] = el;
                    }}
                    className="scroll-mt-24"
                  >
                    <Card>
                      <CardContent className="p-6 sm:p-8">
                        <div className="flex items-start gap-3">
                          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                            <MapPin className="h-5 w-5" />
                          </div>
                          <div>
                            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                              {townData.name} · Overview
                            </h2>
                            <p className="mt-3 text-muted-foreground">
                              {townData.name} is located in {townData.county},{" "}
                              {townData.state}. With a population of{" "}
                              {townData.population} and an area of{" "}
                              {townData.area}, this town is a popular
                              suburban community in Bergen County.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Schools */}
                  <div
                    ref={(el) => {
                      sectionRefs.current[1] = el;
                    }}
                    className="scroll-mt-24"
                  >
                    <Card>
                      <CardContent className="p-6 sm:p-8">
                        <div className="flex items-start gap-3">
                          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                            <School className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                              Schools · 학교 정보
                            </h2>
                            <p className="mt-3 text-muted-foreground">
                              {townData.name} is served by the{" "}
                              {townData.schoolDistrict}.
                            </p>
                            <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                              <DataRow
                                label="School District"
                                value={townData.schoolDistrict}
                              />
                              <DataRow
                                label="Schools"
                                value={townData.schools}
                              />
                              <DataRow
                                label="Average SAT"
                                value={townData.avgSat}
                              />
                              <DataRow
                                label="Graduation Rate"
                                value={townData.gradRate}
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Demographics */}
                  <div
                    ref={(el) => {
                      sectionRefs.current[2] = el;
                    }}
                    className="scroll-mt-24"
                  >
                    <Card>
                      <CardContent className="p-6 sm:p-8">
                        <div className="flex items-start gap-3">
                          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                            <Users className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                              Demographics · 인구 통계
                            </h2>
                            <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                              <DataRow
                                label="Population"
                                value={townData.population}
                              />
                              <DataRow label="Area" value={townData.area} />
                              <DataRow
                                label="Median Home Value"
                                value={townData.medianHome}
                              />
                              <DataRow
                                label="Median Rent"
                                value={townData.medianRent}
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Transportation */}
                  <div
                    ref={(el) => {
                      sectionRefs.current[3] = el;
                    }}
                    className="scroll-mt-24"
                  >
                    <Card>
                      <CardContent className="p-6 sm:p-8">
                        <div className="flex items-start gap-3">
                          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                            <Bus className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                              Transportation · 교통
                            </h2>
                            <p className="mt-3 text-muted-foreground">
                              {townData.commute}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Real Estate */}
                  <div
                    ref={(el) => {
                      sectionRefs.current[4] = el;
                    }}
                    className="scroll-mt-24"
                  >
                    <Card>
                      <CardContent className="p-6 sm:p-8">
                        <div className="flex items-start gap-3">
                          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                            <Home className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                              Real Estate Market · 부동산 시장
                            </h2>
                            <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                              <DataRow
                                label="Median Home Value"
                                value={townData.medianHome}
                              />
                              <DataRow
                                label="Median Rent"
                                value={townData.medianRent}
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Highlights */}
                  <div
                    ref={(el) => {
                      sectionRefs.current[5] = el;
                    }}
                    className="scroll-mt-24"
                  >
                    <Card>
                      <CardContent className="p-6 sm:p-8">
                        <div className="flex items-start gap-3">
                          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                            <Building className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                              Community Highlights · 커뮤니티 특징
                            </h2>
                            <ul className="mt-5 grid grid-cols-1 gap-2">
                              {townData.highlights.map((h, i) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-2 text-sm text-foreground/80"
                                >
                                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                  {h}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-10 rounded-2xl bg-primary p-6 text-primary-foreground sm:p-8">
                  <h2 className="font-display text-2xl font-bold sm:text-3xl">
                    Interested in {townData.name}?
                  </h2>
                  <p className="mt-2 max-w-xl text-primary-foreground/85">
                    {townData.name}의 집을 찾고 계신가요? Grace Choi 에이전트가
                    학군, 가격, 커뮤니티 정보를 바탕으로 맞춤형 매물을
                    추천해 드립니다.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Button
                      size="lg"
                      variant="secondary"
                      className="gap-1.5"
                      onClick={() => useSearchStore.getState().openInquiry(null)}
                    >
                      Send an inquiry
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                    <Link href="/#listings">
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

        {/* WhyUs stats band */}
        <WhyUs />

        {/* Inline inquiry form */}
        <InquirySection variant="inline" />
      </main>

      {/* Back-to-top floating button */}
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

function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-2 rounded-md border border-border bg-secondary/30 px-3 py-2 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-medium text-foreground">{value}</span>
    </div>
  );
}
