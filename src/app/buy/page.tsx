import { GuidePageLayout } from "@/components/site/guide-page-layout";

export const metadata = {
  title: "Buyer Guide — Grace Choi Real Estate NY/NJ",
  description: "A step-by-step guide to buying a home in New York or New Jersey.",
};

export default function BuyGuidePage() {
  return (
    <GuidePageLayout
      data={{
        slug: "buy",
        eyebrow: "Buyer Guide",
        title: "Buy with confidence, close with clarity.",
        intro:
          "Whether you're a first-time buyer or upgrading, here's the full NY/NJ buying process — from pre-approval to keys in hand.",
        heroImage:
          "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/4bfabf251d6f.jpg",
        sections: [
          {
            heading: "1. Get pre-approved for a mortgage",
            body: "A pre-approval letter shows sellers you're serious and tells you exactly how much house you can afford. We work with 12+ lenders across NY/NJ and can usually get you a pre-approval letter within 48 hours.",
            bullets: [
              "Soft credit pull (no impact to score)",
              "Rate-lock options up to 90 days",
              "First-time buyer program eligibility check",
              "DTI and reserve requirements explained",
            ],
          },
          {
            heading: "2. Define your search criteria",
            body: "Tell us your must-haves and nice-to-haves: neighborhoods, beds/baths, budget, school districts, commute time, pet policies. We'll set up auto-alerts so you see new listings within minutes of them going live.",
            bullets: [
              "Saved-search auto-alerts",
              "School-district and crime reports",
              "Commute-time filter to your office",
              "Walk-score and transit access",
            ],
          },
          {
            heading: "3. Tour homes and submit offers",
            body: "We schedule showings on your schedule, provide honest feedback on each property, and help you submit a competitive offer fast. In hot NY/NJ markets, speed matters — we average 1.4 days from showing to offer.",
            bullets: [
              "Same-day showing requests",
              "Comparable-sales analysis on each property",
              "Offer-letter drafting (with personal touch if helpful)",
              "Escalation-clause strategy",
            ],
          },
          {
            heading: "4. Inspections and due diligence",
            body: "Once your offer is accepted, hire a licensed home inspector (we have a vetted network). We'll review the report, negotiate repairs or credits, and make sure you're covered by contract contingencies.",
            bullets: [
              "Vetted inspector network (NY/NJ licensed)",
              "Termite, radon, mold, and lead checks",
              "Repair-credit negotiation",
              "Contract-contingency timeline management",
            ],
          },
          {
            heading: "5. Close and move in",
            body: "Final walk-through, signing, funding, keys. In NY you'll work with an attorney; in NJ a title company handles closing. We coordinate everything so closing day is the easiest part of your journey.",
            bullets: [
              "Final walk-through coordination",
              "Closing-cost estimate (no surprises)",
              "Utility transfer checklist",
              "Change-of-address and HOA registration",
            ],
          },
        ],
        ctaTitle: "Start your home search today",
        ctaDescription:
          "Tell us what you're looking for and a Grace Choi agent will set up a custom search within 24 hours.",
      }}
    />
  );
}
