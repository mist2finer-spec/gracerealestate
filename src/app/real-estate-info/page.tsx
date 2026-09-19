import { GuidePageLayout } from "@/components/site/guide-page-layout";

export const metadata = {
  title: "Real Estate Info — Grace Choi Real Estate NY/NJ",
  description: "Market trends, laws, and regulations for NY/NJ real estate.",
};

export default function RealEstateInfoPage() {
  return (
    <GuidePageLayout
      useStoreContent
      data={{
        slug: "real-estate-info",
        eyebrow: "Real Estate Info · 부동산 정보",
        title: "The NY/NJ real estate landscape, decoded.",
        intro:
          "Market trends, transfer taxes, attorney requirements, rent stabilization — the rules vary county by county. Here's a clear overview to help you make informed decisions.",
        heroImage:
          "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/d4a79604eb37.jpg",
        sections: [],
        ctaTitle: "Have a specific question?",
        ctaDescription:
          "Real estate laws change. Reach out and a Grace Choi agent will get you the most current answer for your situation.",
      }}
    />
  );
}
