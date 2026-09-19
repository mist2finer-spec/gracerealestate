import { GuidePageLayout } from "@/components/site/guide-page-layout";

export const metadata = {
  title: "Mortgage Guide — Grace Choi Real Estate NY/NJ",
  description: "Mortgage rates, calculators, and pre-approval for NY/NJ buyers.",
};

export default function MortgagePage() {
  return (
    <GuidePageLayout
      useStoreContent
      data={{
        slug: "mortgage",
        eyebrow: "Mortgage Center · 모기지 센터",
        title: "Understand your mortgage options.",
        intro:
          "From conventional loans to FHA, VA, and jumbo — here's how to pick the right mortgage for your NY/NJ home purchase and lock the best rate.",
        heroImage:
          "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/3021aa3fd22d.png",
        sections: [],
        ctaTitle: "Get pre-approved today",
        ctaDescription:
          "Submit your info and we'll connect you with a NY/NJ lender who can deliver a pre-approval letter within 48 hours.",
      }}
    />
  );
}
