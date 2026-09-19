import { GuidePageLayout } from "@/components/site/guide-page-layout";
import { BuyerClosingCostCalculator } from "@/components/site/buyer-closing-cost-calculator";

export const metadata = {
  title: "Buyer Guide — Grace Choi Real Estate NY/NJ",
  description: "Buy a home with confidence. Korean and English buyer guide for NY/NJ.",
};

export default function BuyGuidePage() {
  return (
    <GuidePageLayout
      useStoreContent
      data={{
        slug: "buy",
        eyebrow: "Buyer Guide · 바이어 가이드",
        title: "Buy with confidence, close with clarity.",
        intro:
          "Whether you're a first-time buyer or upgrading, here's the full NY/NJ buying process — from pre-approval to keys in hand. 뉴저지 부동산 매입 시 구매자가 납부해야 할 부대 비용 내역과 계산기까지 — Grace Choi가 함께합니다.",
        heroImage:
          "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/4bfabf251d6f.jpg",
        sections: [],
        ctaTitle: "Start your home search today",
        ctaDescription:
          "Tell us what you're looking for and a Grace Choi agent will set up a custom search within 24 hours.",
      }}
      extraContent={<BuyerClosingCostCalculator />}
    />
  );
}
