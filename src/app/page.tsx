"use client";

import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { GuideTabs } from "@/components/site/guide-tabs";
import { InquirySection } from "@/components/site/inquiry-section";
import { WhyUs } from "@/components/site/why-us";
import { CTABanner } from "@/components/site/cta-banner";
import { Footer } from "@/components/site/footer";
import { AdminPanel } from "@/components/site/admin-panel";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <GuideTabs />
        <WhyUs />
        <CTABanner />
        <InquirySection variant="inline" />
      </main>
      <Footer />
      <AdminPanel />
      {/* Inquiry dialog overlay — any "Contact" button opens it via openInquiry(). */}
      <InquirySection variant="dialog" />
    </div>
  );
}
