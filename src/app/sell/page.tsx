import { GuidePageLayout } from "@/components/site/guide-page-layout";

export const metadata = {
  title: "Seller Guide — Grace Choi Real Estate NY/NJ",
  description: "Step-by-step guide to selling your home in New York or New Jersey.",
};

export default function SellGuidePage() {
  return (
    <GuidePageLayout
      data={{
        slug: "sell",
        eyebrow: "Seller Guide",
        title: "Sell smarter, close faster.",
        intro:
          "From pricing strategy to closing day, here's everything you need to list your NY/NJ property with confidence and net the best possible price.",
        heroImage:
          "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/86de6931631a.jpg",
        sections: [
          {
            heading: "1. Get a free home valuation",
            body: "Our agents pull comparable sales within a 0.5-mile radius of your property, adjust for condition and upgrades, and deliver a defensible list-price recommendation within 24 hours. No cost, no obligation.",
            bullets: [
              "Local comparables from the last 90 days",
              "Adjustments for condition, upgrades, and lot",
              "Net-sheet estimate after closing costs",
              "Printable PDF you can keep",
            ],
          },
          {
            heading: "2. Prepare your home for market",
            body: "Small fixes yield big returns. We provide a pre-listing checklist, coordinate staging and photography, and recommend targeted improvements that have been shown to add 5-15% to the final sale price.",
            bullets: [
              "Pre-listing inspection (optional but recommended)",
              "Professional photography + 3D tour",
              "Staging consultation",
              "Decluttering and curb-landscape checklist",
            ],
          },
          {
            heading: "3. List, market, and show",
            body: "Your listing goes live on GraceChoi.com, Zillow, Realtor.com, and our 12M-buyer network within hours. We handle showings, open houses, and agent inquiries so you don't have to field calls.",
            bullets: [
              "Syndication to 50+ portals within 24 hours",
              "Weekly showing-feedback reports",
              "Targeted social-media ads (Meta, Instagram)",
              "Broker open houses",
            ],
          },
          {
            heading: "4. Review offers and negotiate",
            body: "We present every offer in plain English — price, financing strength, contingencies, and timeline. You decide; we negotiate. Our average seller receives 1.8 offers and closes within 3.2% of list price.",
            bullets: [
              "Side-by-side offer comparison",
              "Pre-approval verification on every buyer",
              "Counter-offer drafting",
              "Inspection and appraisal management",
            ],
          },
          {
            heading: "5. Close and hand over the keys",
            body: "Once you accept an offer, we coordinate with the buyer's lender, title company, and attorney (NY requires attorneys; NJ is title-driven). You'll know exactly what to sign and when. Most closings happen 30-45 days after contract.",
            bullets: [
              "Attorney/title coordination",
              "Final walk-through scheduling",
              "Closing-statement review",
              "Keys handoff and post-close support",
            ],
          },
        ],
        ctaTitle: "Ready to list your home?",
        ctaDescription:
          "Get a free, no-obligation valuation from a Grace Choi agent. Most valuations are delivered within 24 hours.",
      }}
    />
  );
}
