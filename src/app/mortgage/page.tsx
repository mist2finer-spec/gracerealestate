import { GuidePageLayout } from "@/components/site/guide-page-layout";

export const metadata = {
  title: "Mortgage Guide — Grace Choi Real Estate NY/NJ",
  description: "Mortgage rates, calculators, and pre-approval for NY/NJ buyers.",
};

export default function MortgagePage() {
  return (
    <GuidePageLayout
      data={{
        slug: "mortgage",
        eyebrow: "Mortgage Center",
        title: "Understand your mortgage options.",
        intro:
          "From conventional loans to FHA, VA, and jumbo — here's how to pick the right mortgage for your NY/NJ home purchase and lock the best rate.",
        heroImage:
          "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/3021aa3fd22d.png",
        sections: [
          {
            heading: "Loan types at a glance",
            body: "Each loan type has different down-payment, credit-score, and income requirements. We'll match you to the right one based on your situation — most buyers are surprised by what they qualify for.",
            bullets: [
              "Conventional — 3-5% down, 620+ FICO",
              "FHA — 3.5% down, 580+ FICO, more flexible DTI",
              "VA — 0% down for eligible veterans",
              "Jumbo — for loans above $1.2M in NY/NJ high-cost areas",
              "Co-op loans — NY-specific, board-approval required",
            ],
          },
          {
            heading: "Today's rate environment",
            body: "Mortgage rates move daily based on the 10-year Treasury, Fed policy, and inflation data. We track 12+ lenders in real time and can lock a rate the moment you find your home.",
            bullets: [
              "Rate-lock windows of 30/45/60 days",
              "Float-down options if rates drop after lock",
              "Lender-paid vs borrower-paid PMI comparison",
              "Discount points break-even calculator",
            ],
          },
          {
            heading: "Pre-approval vs pre-qualification",
            body: "Pre-qualification is a soft estimate based on what you tell a lender. Pre-approval is a verified commitment letter based on pulled credit and reviewed documents — and it's what sellers expect with your offer.",
            bullets: [
              "Pre-approval letter typically valid 60-90 days",
              "Soft pull doesn't impact credit score",
              "Verifies income, assets, and employment",
              "Strengthens your offer in competitive markets",
            ],
          },
          {
            heading: "Closing costs in NY/NJ",
            body: "Budget 2-5% of the purchase price for closing costs. NY buyers pay mortgage tax (1.05-1.8% depending on loan size and county); NJ buyers pay 1% mansion tax on homes over $1M. We'll give you a detailed estimate upfront.",
            bullets: [
              "Lender origination fee (~1% of loan)",
              "Title insurance and search",
              "Appraisal and survey",
              "NY mortgage tax or NJ mansion tax",
              "Attorney fees (NY) or title company fees (NJ)",
              "Property tax escrow setup",
            ],
          },
          {
            heading: "First-time buyer programs",
            body: "NY and NJ offer down-payment assistance, reduced mortgage rates, and tax credits for first-time buyers. Many programs are income-capped but not asset-capped — you may qualify even if you think you earn too much.",
            bullets: [
              "NY SONYMA — low-interest loans + DP assistance",
              "NJ HMFA — first-time buyer mortgage + DP grants",
              "FHA First-Time Homebuyer 3.5% down",
              "Federal First-Time Buyer Tax Credit (when available)",
            ],
          },
        ],
        ctaTitle: "Get pre-approved today",
        ctaDescription:
          "Submit your info and we'll connect you with a NY/NJ lender who can deliver a pre-approval letter within 48 hours.",
      }}
    />
  );
}
