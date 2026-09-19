import { GuidePageLayout } from "@/components/site/guide-page-layout";

export const metadata = {
  title: "Rent Guide — Grace Choi Real Estate NY/NJ",
  description: "Everything renters need to know about leasing in NY and NJ.",
};

export default function RentGuidePage() {
  return (
    <GuidePageLayout
      useStoreContent
      data={{
        slug: "rent",
        eyebrow: "Rent Guide · 렌트 가이드",
        title: "Rent smarter in NY & NJ.",
        intro:
          "From apartment hunting to lease signing, here's how to find a rental you'll love — without getting burned by hidden fees or shady landlords.",
        heroImage:
          "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/97ce4879fca1.jpg",
        sections: [],
        ctaTitle: "Looking for a rental?",
        ctaDescription:
          "Send your criteria and budget — a Grace Choi agent will send you a curated list of matching rentals within 24 hours.",
      }}
    />
  );
}
