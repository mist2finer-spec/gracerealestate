import { GuidePageLayout } from "@/components/site/guide-page-layout";
import { ClosingCostCalculator } from "@/components/site/closing-cost-calculator";

export const metadata = {
  title: "Seller Guide — Grace Choi Real Estate NY/NJ",
  description: "Sell your home fast and at the best price. Korean and English guide for NY/NJ sellers.",
};

export default function SellGuidePage() {
  return (
    <GuidePageLayout
      useStoreContent
      data={{
        slug: "sell",
        eyebrow: "Seller Guide · 셀러 가이드",
        title: "Sell smarter, close faster.",
        intro:
          "From pricing strategy to closing day, here's everything you need to list your NY/NJ property with confidence and net the best possible price. 부동산 매매를 신속하고 최고가로 — Grace Choi가 함께합니다.",
        heroImage:
          "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/86de6931631a.jpg",
        sections: [],
        ctaTitle: "Ready to list your home?",
        ctaDescription:
          "Get a free, no-obligation valuation from a Grace Choi agent. Most valuations are delivered within 24 hours.",
      }}
      extraContent={<ClosingCostCalculator />}
    />
  );
}
