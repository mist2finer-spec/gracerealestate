"use client";

import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { Categories } from "@/components/site/categories";
import { FeaturedListings } from "@/components/site/featured-listings";
import { InquirySection } from "@/components/site/inquiry-section";
import { WhyUs } from "@/components/site/why-us";
import { Insights } from "@/components/site/insights";
import { CTABanner } from "@/components/site/cta-banner";
import { Footer } from "@/components/site/footer";
import { AdminPanel } from "@/components/site/admin-panel";
import { ContentEditorPanel } from "@/components/site/content-editor-panel";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <Categories />
        <FeaturedListings />
        <InquirySection variant="inline" />
        <WhyUs />
        <Insights />
        <CTABanner />
      </main>
      <Footer />
      <AdminPanel />
      <ContentEditorPanel />
      {/* Inquiry dialog overlay — always rendered so any "Contact" button
          can pop it up via openInquiry() in the store. */}
      <InquirySection variant="dialog" />
    </div>
  );
}
