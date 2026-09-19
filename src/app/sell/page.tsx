import { GuidePageLayout } from "@/components/site/guide-page-layout";
import { ClosingCostCalculator } from "@/components/site/closing-cost-calculator";

export const metadata = {
  title: "Seller Guide — Grace Choi Real Estate NY/NJ",
  description: "Sell your home fast and at the best price. Korean and English guide for NY/NJ sellers.",
};

const SELLER_SECTIONS = [
  {
    heading: "부동산 매매를 신속하고 최고가로 하기 원하시나요?",
    body: "Want to sell your property quickly and at the highest price? The best way to achieve this is by hiring a real estate professional. A great agent brings great results.",
    bullets: [
      "신속하고 최고가 매매를 위한 전문가 고용",
      "좋은 에이전트는 좋은 결과를 가져옵니다",
      "Grace Choi의 NY/NJ 로컬 전문 지식 활용",
    ],
  },
  {
    heading: "Prepare Your Home for Sale",
    body: "집을 부동산 시장에 내놓기 전, 집의 시장성을 최대로 확보하는 것이 중요합니다. 예컨대 누수로 인한 손상이나 주택 기반에 관한 문제가 있다면 이를 수리하여 고객님의 부동산의 가치를 높이는 것을 고려해 보실 수 있습니다. 구식 전등을 교체하거나 집에 페인트 칠을 새로 하는 등 약간의 외관 변화라도 바이어 눈에는 큰 영향을 미칠 수 있습니다. 고객님의 주택의 가치를 상승시키는 데 도움이 될 수 있는 업그레이드 및 수리를 찾으실 수 있도록 부동산 에이전트가 도와 드립니다.",
    bullets: [
      "Before listing, maximize your home's market appeal",
      "Repair leaks, foundation issues, or structural damage",
      "Replace outdated light fixtures, apply fresh paint",
      "Small exterior changes make a big impression on buyers",
      "Your agent helps identify upgrades that add the most value",
    ],
  },
  {
    heading: "Determine Your Home's Value",
    body: "주택의 적정 매매가를 결정하는 것은 판매 과정의 가장 중요 요소 중 하나입니다. 온라인 견적부터 시작하는 것도 한 가지 방법이나, 리스팅 에이전트로부터 지역적 동향, 주택의 사이즈 및 컨디션, 해당 지역의 유사 주택들, 그리고 기타 다양한 데이터를 기반으로 더욱 정확한 견적을 받으시는 게 좋습니다. 부동산 시장에 관한 오랜 경험과 지식을 갖춘 에이전트의 선택이 부동산 매매의 첫 걸음입니다. 좋은 에이전트는 고객님 주택의 적정가를 결정하는 데 많은 도움이 될 것입니다.",
    bullets: [
      "Pricing is the single most important factor in selling",
      "Online estimates are a starting point, but not definitive",
      "A listing agent provides a CMA based on local trends, size, condition, and comps",
      "Choose an agent with deep market experience — that's the first step",
    ],
  },
  {
    heading: "Factors Grace Uses to Recommend Listing Price",
    body: "Grace Choi 에이전트는 다음 요소들을 종합적으로 분석하여 최적의 리스팅 가격을 제안합니다.",
    bullets: [
      "최근 동일 지역에서 거래된 유사 주택의 평균 매매가 (Recent comparable sales in your area)",
      "현재 시장에 나와 있는 유사 주택들의 판매 가격 (Active comparable listings)",
      "집의 위치 (Location)",
      "집과 대지 사이즈 (Home and lot size)",
      "집 구성 — 레이아웃, 침실 개수, 욕실 개수, 지하 꾸밈 여부, 수영장, 외벽, 주차, 뒤뜰, 조망 등 (Layout, beds, baths, basement, pool, siding, parking, backyard, view)",
      "집 컨디션 (Condition of the home)",
      "재산세 금액 (Property tax amount)",
    ],
  },
  {
    heading: "Grace's Comprehensive Service",
    body: "Grace Choi의 종합 서비스는 정확한 시장 분석부터 클로징까지 전 과정을 커버합니다.",
    bullets: [
      "정확한 시장 분석을 통해 Seller가 가장 높은 판매가를 결정할 수 있도록 지원 (Accurate market analysis to help sellers set the best sale price)",
      "로컬 지역 외 미국 전역, 한국 및 중국 Buyer에게 적극적인 마케팅 진행 (Active marketing to local, national, Korean, and Chinese buyers)",
      "Seller에게 가장 유리한 조건으로 매매될 수 있도록 협상 진행 (Negotiation to secure the best terms for the seller)",
      "리스팅 계약 체결 순간부터 클로징까지 전 과정 철저 관리·감독 (Full process management from listing to closing)",
      "성공적인 클로징을 위해 변호사, 에이전트, 타이틀 회사, 모기지 회사, 인스펙션 회사, 타운 관계자와 긴밀 협력 (Coordination with attorneys, title, mortgage, inspection companies, and town officials)",
      "필요 시 판매 후 다음 집 구매 또는 이사 관련 서비스 제공 (Post-sale assistance with next home purchase or relocation)",
    ],
  },
  {
    heading: "Online Marketing",
    body: "리스팅 된 집은 대부분의 주요 온라인 플랫폼에서 높은 검색율로 홍보됩니다. — NJMLS, GSMLS, Hudson MLS, Zillow, Trulia, Realtor.com, Homes.com, Google search, Redfin 등. 온라인 부동산 매매 리스팅은 각 부동산과 주변 지역에 특성화된 정보가 포함되어 있으며 전문 사진 기자가 촬영한 부동산 이미지도 포함됩니다.",
    bullets: [
      "Your listing appears on NJMLS, GSMLS, Hudson MLS, Zillow, Trulia, Realtor.com, Homes.com, Google, Redfin",
      "Listings include property-specific and neighborhood information",
      "Professional photography — instant preview for buyers, saves time, drives interest",
      "High-resolution images are a critical marketing tool",
    ],
  },
  {
    heading: "Mobile Marketing",
    body: "잠재적 구입자는 이동 중에도 편리한 검색 기능을 이용할 수 있습니다. 주택 검색 앱은 iOS 및 Android 기기 모두에서 사용 가능하므로, 고객님의 주택을 언제 어디서나 잠재 구입자들에게 보여줄 수 있는 기회가 높아집니다.",
    bullets: [
      "Buyers can search on the go via our mobile portal",
      "iOS and Android apps supported",
      "Your property is visible to buyers 24/7 wherever they are",
    ],
  },
  {
    heading: "Advanced Marketing",
    body: "리스팅을 더 많은 잠재 고객이 보도록 트래픽을 증가시킬 수 있는 고급 마케팅 및 디지털 전략을 제공합니다. 또한 미국에서 가장 큰 네트워크 중 하나를 통해 입소문, 온라인 마케팅 및 기타 광고 기회를 통하여 고객님의 부동산에 대한 소문이 퍼지도록 합니다.",
    bullets: [
      "Advanced digital strategies to drive listing traffic",
      "One of the largest agent networks in the US",
      "Word-of-mouth, online marketing, and paid advertising",
      "Targeted social-media campaigns (Meta, Instagram)",
    ],
  },
  {
    heading: "International Marketing",
    body: "더 큰 시장을 공략하기 위해 미국뿐만 아니라 한국 및 중국의 모든 Buyer를 대상으로 광고와 마케팅을 진행합니다. 특히, 한국과 중국 각 지역에 있는 부동산 협력업체를 통해 모든 리스팅 집들이 특별 소개됩니다.",
    bullets: [
      "Marketing to buyers in the US, Korea, and China",
      "Partner agencies in Korea and China feature your listing",
      "Bilingual marketing materials (English, Korean, Chinese)",
      "Cultural expertise for international buyer negotiations",
    ],
  },
];

export default function SellGuidePage() {
  return (
    <>
      <GuidePageLayout
        data={{
          slug: "sell",
          eyebrow: "Seller Guide · 셀러 가이드",
          title: "Sell smarter, close faster.",
          intro:
            "From pricing strategy to closing day, here's everything you need to list your NY/NJ property with confidence and net the best possible price. 부동산 매매를 신속하고 최고가로 — Grace Choi가 함께합니다.",
          heroImage:
            "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/86de6931631a.jpg",
          sections: SELLER_SECTIONS,
          ctaTitle: "Ready to list your home?",
          ctaDescription:
            "Get a free, no-obligation valuation from a Grace Choi agent. Most valuations are delivered within 24 hours.",
        }}
      />
      <ClosingCostCalculator />
    </>
  );
}
