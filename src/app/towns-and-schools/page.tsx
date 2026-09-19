"use client";

import Link from "next/link";
import { ArrowLeft, MapPin, School, BarChart3, Building2 } from "lucide-react";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { WhyUs } from "@/components/site/why-us";
import { AdminPanel } from "@/components/site/admin-panel";
import { ContentEditorPanel } from "@/components/site/content-editor-panel";
import { InquirySection } from "@/components/site/inquiry-section";
import { TownMap } from "@/components/site/town-map";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSearchStore } from "@/store/search-store";

export default function TownsAndSchoolsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-foreground text-background">
          <div className="absolute inset-0 z-0">
            <img
              src="https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/86de6931631a.jpg"
              alt="New Jersey towns and schools"
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
              Towns & Schools · 타운 및 학교 정보
            </p>
            <h1 className="mt-2 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              NJ Towns &amp; Schools
            </h1>
            <p className="mt-4 max-w-2xl text-base text-background/80 sm:text-lg">
              Explore Bergen County towns on the interactive map below.
              Hover over a town to see its name, click to view detailed
              school, demographic, transportation, and town records.
              버겐 카운티 타운 지도 — 마우스를 올려보고, 클릭하여 상세
              정보를 확인하세요.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                size="lg"
                variant="secondary"
                className="gap-1.5"
                onClick={() => {
                  useSearchStore.getState().openInquiry(null);
                }}
              >
                Ask about a town
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

        {/* Interactive Town Map */}
        <TownMap />

        {/* How it works */}
        <section className="bg-background py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                How to Use
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Find your town in 3 steps
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <h3 className="mt-3 font-display text-base font-semibold">
                    1. Browse the Map
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    마우스를 움직여 버겐 카운티의 70개 타운을 둘러보세요.
                    Hover to highlight towns.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
                    <School className="h-6 w-6" />
                  </div>
                  <h3 className="mt-3 font-display text-base font-semibold">
                    2. Click a Town
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    타운을 클릭하면 학교, 인구 통계, 교통, 타운 문서가
                    표시됩니다.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <h3 className="mt-3 font-display text-base font-semibold">
                    3. Browse Listings
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    해당 타운의 매물을 Grace Choi 에이전트에게 문의하세요.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* WhyUs stats band */}
        <WhyUs />

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
