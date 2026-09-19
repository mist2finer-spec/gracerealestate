import { GuidePageLayout } from "@/components/site/guide-page-layout";

export const metadata = {
  title: "Townhouse & Condo Guide — Grace Choi Real Estate NY/NJ",
  description: "Townhomes, condos, and co-ops explained for NY/NJ buyers.",
};

export default function TownhouseCondoPage() {
  return (
    <GuidePageLayout
      data={{
        slug: "townhouse-condo",
        eyebrow: "Property Types",
        title: "Townhouse, condo, or co-op — what's right for you?",
        intro:
          "Each property type has different ownership rights, costs, and approval processes. Here's how to choose the right one in the NY/NJ market.",
        heroImage:
          "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/48df8199c960.jpg",
        sections: [
          {
            heading: "What's the difference?",
            body: "A condo is a unit you own outright (walls-in) plus a share of common areas. A townhouse is a single-family attached home — you own the structure and the land it sits on. A co-op (NYC specialty) means you own shares in a corporation that owns the building, not the unit itself.",
            bullets: [
              "Condo — fee-simple ownership of unit + common areas",
              "Townhouse — fee-simple ownership of structure + lot",
              "Co-op — share ownership in a corporation",
              "Cond-op — condo by deed, co-op by operation (NYC hybrid)",
            ],
          },
          {
            heading: "Approval processes",
            body: "Condos and townhouses typically require only a simple application and right-of-first-refusal from the HOA/board. Co-ops require full board approval — financial review, reference letters, and often an in-person interview. We'll prep you for whatever process applies.",
            bullets: [
              "Condo: 5-10 day board waiver",
              "Townhouse: usually no board approval",
              "Co-op: 30-45 day board approval + interview",
              "Board-package preparation included with our service",
            ],
          },
          {
            heading: "Monthly costs and fees",
            body: "Common charges and HOA fees vary widely. NYC condo common charges average $1.50-$2.50/sqft/month; co-op maintenance is higher but typically includes property taxes. NJ HOAs range $300-$800/month for townhomes.",
            bullets: [
              "Condo: common charges + separate property tax",
              "Co-op: maintenance (includes tax) + assessment risk",
              "Townhouse HOA: $200-$800/month typical",
              "Special assessment history (ask before buying)",
            ],
          },
          {
            heading: "Subletting and rental restrictions",
            body: "Planning to rent the unit out later? Co-ops often restrict subletting (2-3 years max out of every 5). Condos are usually more permissive. Read the bylaws before you commit — your future flexibility depends on it.",
            bullets: [
              "Co-op sublet caps and flip taxes",
              "Condo rental-by-owner rules",
              "Townhouse rental — usually unrestricted",
              "Short-term rental (Airbnb) restrictions",
            ],
          },
          {
            heading: "Financing differences",
            body: "Condos and townhouses qualify for conventional financing. Co-ops require a co-op loan (different underwriting) and some buildings aren't financeable at all. We'll tell you upfront which buildings work with your financing.",
            bullets: [
              "Condo/townhouse: conventional, FHA, VA, jumbo",
              "Co-op: co-op proprietary-lease financing",
              "FHA-approved condo list check",
              "Investor-purchase percentage cap ( condos)",
            ],
          },
        ],
        ctaTitle: "Considering a townhouse or condo?",
        ctaDescription:
          "Tell us your preferences and a Grace Choi agent will curate options across condos, townhomes, and co-ops that match your lifestyle and budget.",
      }}
    />
  );
}
