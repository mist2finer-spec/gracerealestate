import { GuidePageLayout } from "@/components/site/guide-page-layout";

export const metadata = {
  title: "Rent Guide — Grace Choi Real Estate NY/NJ",
  description: "Everything renters need to know about leasing in NY and NJ.",
};

export default function RentGuidePage() {
  return (
    <GuidePageLayout
      data={{
        slug: "rent",
        eyebrow: "Rent Guide",
        title: "Rent smarter in NY & NJ.",
        intro:
          "From apartment hunting to lease signing, here's how to find a rental you'll love — without getting burned by hidden fees or shady landlords.",
        heroImage:
          "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/97ce4879fca1.jpg",
        sections: [
          {
            heading: "1. Set your budget and criteria",
            body: "Most NY/NJ landlords require gross monthly income of 40x the monthly rent (NYC standard) or 3x monthly rent (NJ). Use our rental affordability calculator before you start touring.",
            bullets: [
              "Income-to-rent ratio calculator",
              "Guarantor / co-signer requirements",
              "Pet policies and breed restrictions",
              "Move-in cost estimate (1st month + deposit + fees)",
            ],
          },
          {
            heading: "2. Gather your documents",
            body: "Having these ready before you tour lets you submit an application on the spot — and in competitive markets, that's the difference between getting the place and losing it.",
            bullets: [
              "Government photo ID",
              "Last 2 pay stubs / offer letter",
              "Most recent tax return",
              "Bank statement (if self-employed)",
              "Reference letter from previous landlord",
            ],
          },
          {
            heading: "3. Tour apartments and submit applications",
            body: "We'll tour with you, point out red flags (water damage, sketchy repairs, noise), and submit applications the same day. Most NYC rentals go within 24-48 hours of listing.",
            bullets: [
              "Same-day tour scheduling",
              "Red-flag checklist (mold, leaks, pests)",
              "Application submission on your behalf",
              "Negotiation on rent and concessions",
            ],
          },
          {
            heading: "4. Sign the lease",
            body: "Read every clause. Pay attention to escalation caps, sublet rules, early-termination fees, and what counts as 'normal wear and tear.' We'll review the lease with you before you sign.",
            bullets: [
              "Lease-term and renewal clause review",
              "Rent-stabilized vs market-rate check (NYC)",
              "Pet addendum and rider review",
              "Move-in / move-out condition report",
            ],
          },
          {
            heading: "5. Move in and settle",
            body: "Document everything with photos on day one. Set up utilities, register your vehicle, update your address, and meet your neighbors. We'll check in at 30 days to make sure everything's working.",
            bullets: [
              "Photo documentation of unit condition",
              "Utility setup checklist (gas, electric, internet)",
              "Renter's insurance (often required)",
              "30-day post-move check-in from us",
            ],
          },
        ],
        ctaTitle: "Looking for a rental?",
        ctaDescription:
          "Send your criteria and budget — a Grace Choi agent will send you a curated list of matching rentals within 24 hours.",
      }}
    />
  );
}
