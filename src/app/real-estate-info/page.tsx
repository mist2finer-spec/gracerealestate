import { GuidePageLayout } from "@/components/site/guide-page-layout";

export const metadata = {
  title: "Real Estate Info — Grace Choi Real Estate NY/NJ",
  description: "Market trends, laws, and regulations for NY/NJ real estate.",
};

export default function RealEstateInfoPage() {
  return (
    <GuidePageLayout
      data={{
        slug: "real-estate-info",
        eyebrow: "Real Estate Info",
        title: "The NY/NJ real estate landscape, decoded.",
        intro:
          "Market trends, transfer taxes, attorney requirements, rent stabilization — the rules vary county by county. Here's a clear overview to help you make informed decisions.",
        heroImage:
          "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/d4a79604eb37.jpg",
        sections: [
          {
            heading: "NY vs NJ — key differences",
            body: "New York requires an attorney for every real estate transaction. New Jersey is title-driven — closings happen at a title company without attorneys required (though recommended). Transfer taxes, mortgage taxes, and mansion taxes differ significantly between the states.",
            bullets: [
              "NY: attorney-required for buyer AND seller",
              "NJ: title-company closing, attorney optional",
              "NY transfer tax: 0.4%-2.075% (depending on price + county)",
              "NJ transfer tax: progressive, 0.5%-1.0% sliding scale",
              "NY mansion tax: 1% on $1M+ residential",
              "NJ mansion tax: 1% on $1M+ residential",
            ],
          },
          {
            heading: "Closing cost breakdown",
            body: "Buyers typically pay 2-5% of purchase price in closing costs; sellers pay 6-10% (mostly commission + transfer taxes). NYC sellers pay combined transfer taxes of 1.4%-2.075% + a state transfer tax of 0.4%.",
            bullets: [
              "Buyer costs: lender, title, appraisal, attorney (NY)",
              "Seller costs: commission, transfer tax, attorney (NY)",
              "Co-op flip tax: 1-3% of sale price (varies by building)",
              "Mansion tax: 1% on $1M+ (paid by buyer)",
            ],
          },
          {
            heading: "NYC rent stabilization",
            body: "About 1 million NYC apartments are rent-stabilized — meaning annual increases are set by the Rent Guidelines Board and tenants have lease renewal rights. Stabilized units are typically below market rate, making them highly sought-after.",
            bullets: [
              "Eligibility based on building size (6+ units built before 1974)",
              "Annual rent increases set by RGB (typically 1-3%)",
              "Mandatory lease renewal offered to tenant",
              "Succession rights for family members",
            ],
          },
          {
            heading: "Property tax basics",
            body: "NJ has the highest property taxes in the US (avg $9,500/yr). NY varies widely — NYC's effective rate is ~0.9%, while Long Island and Westchester average 2.2-2.5%. Factor taxes into your monthly affordability calculation.",
            bullets: [
              "NJ average: ~$9,500/year (highest in US)",
              "NYC average: ~$9,000/year (lower rate, higher values)",
              "Long Island / Westchester: 2.2-2.5% effective rate",
              "STAR exemption for primary residences (NY)",
              "Senior freeze and veteran exemptions available",
            ],
          },
          {
            heading: "Fair housing and disclosure laws",
            body: "Both NY and NJ follow the federal Fair Housing Act plus state-specific protections. NY's Human Rights Law adds protections for source of income, age, and sexual orientation. NJ's Law Against Discrimination is among the broadest in the US.",
            bullets: [
              "Federal protected classes: race, color, religion, national origin, sex, familial status, disability",
              "NY adds: source of income, age, sexual orientation, gender identity",
              "NJ adds: marital status, domestic partnership, ancestry, military service",
              "Seller disclosure requirements vary by state",
              "Lead-paint disclosure required for homes built before 1978",
            ],
          },
        ],
        ctaTitle: "Have a specific question?",
        ctaDescription:
          "Real estate laws change. Reach out and a Grace Choi agent will get you the most current answer for your situation.",
      }}
    />
  );
}
