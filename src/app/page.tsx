"use client";

import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { Categories } from "@/components/site/categories";
import { FeaturedListings } from "@/components/site/featured-listings";
import { WhyUs } from "@/components/site/why-us";
import { FindAgent } from "@/components/site/find-agent";
import { Insights } from "@/components/site/insights";
import { CTABanner } from "@/components/site/cta-banner";
import { Footer } from "@/components/site/footer";
import { AdminPanel } from "@/components/site/admin-panel";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <Categories />
        <FeaturedListings />
        <WhyUs />
        <FindAgent />
        <Insights />
        <CTABanner />
      </main>
      <Footer />
      <AdminPanel />
    </div>
  );
}
