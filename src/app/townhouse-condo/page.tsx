import { GuidePageLayout } from "@/components/site/guide-page-layout";

export const metadata = {
  title: "Townhouse & Condo Guide — Grace Choi Real Estate NY/NJ",
  description: "Townhomes, condos, and co-ops explained for NY/NJ buyers.",
};

export default function TownhouseCondoPage() {
  return (
    <GuidePageLayout
      useStoreContent
      data={{
        slug: "townhouse-condo",
        eyebrow: "Property Types · 주택 유형",
        title: "Townhouse, condo, or co-op — what's right for you?",
        intro:
          "Each property type has different ownership rights, costs, and approval processes. Here's how to choose the right one in the NY/NJ market.",
        heroImage:
          "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/48df8199c960.jpg",
        sections: [],
        ctaTitle: "Considering a townhouse or condo?",
        ctaDescription:
          "Tell us your preferences and a Grace Choi agent will curate options that match your lifestyle and budget.",
      }}
    />
  );
}
