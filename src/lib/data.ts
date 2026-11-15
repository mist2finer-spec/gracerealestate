// Editable site content for Grace Choi Real Estate (Bergen County, NJ).
// Everything here is the default ("seed") content. The admin editor can
// override it; see src/store/search-store.ts.

// ============================================================
// Editable Site Content Model
// ============================================================

export interface HeroContent {
  badge: string;
  headline: string;
  subline: string;
  backgroundImage: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface WhyUsContent {
  eyebrow: string;
  title: string;
  description: string;
  features: { title: string; description: string }[];
}

export interface CtaContent {
  badge: string;
  title: string;
  description: string;
  primaryButton: string;
  secondaryButton: string;
}

export interface FooterContent {
  brandDescription: string;
  email: string;
  phone: string;
  legalText: string;
}

export interface GuideSectionContent {
  id: string;
  title: string;
  body: string;
  bullets?: string[];
}

export interface GuidePageContent {
  eyebrow: string;
  title: string;
  intro: string;
  heroImage: string;
  ctaTitle: string;
  ctaDescription: string;
  sections: GuideSectionContent[];
}

export interface SiteContent {
  hero: HeroContent;
  stats: StatItem[];
  whyUs: WhyUsContent;
  cta: CtaContent;
  footer: FooterContent;
  // Guide pages (seller, buyer)
  guides: Record<string, GuidePageContent>;
}

// Default copy is intentionally plain and factual. Grace should replace it
// with her own wording (license info, experience, etc.) from the admin editor.
export const SEED_SITE_CONTENT: SiteContent = {
  hero: {
    badge: "Bergen County, NJ · 한국어 / English",
    headline: "GRACE will lead you home.\nHappy closing with GRACE.",
    subline:
      "Buying or selling in Bergen County? Get clear, bilingual guidance on pricing, closing costs, towns, and schools — from first question to closing day.",
    backgroundImage:
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/98695e19f9f5.jpg",
  },
  stats: [
    { value: "70", label: "Bergen County towns in our guide" },
    { value: "2", label: "Languages · 한국어 / English" },
    { value: "Sell", label: "Seller guide + closing cost calculator" },
    { value: "Buy", label: "Buyer guide + closing cost calculator" },
  ],
  whyUs: {
    eyebrow: "Why Grace Choi",
    title: "Local, bilingual, and with you through closing",
    description:
      "Real estate decisions are big. Grace explains each step in Korean or English so you always know what comes next.",
    features: [
      {
        title: "Bilingual guidance",
        description:
          "Contracts, inspections, attorney review, and closing explained in Korean or English — whichever you are more comfortable with.",
      },
      {
        title: "Local town knowledge",
        description:
          "Town and school information for all 70 Bergen County municipalities, so you can compare neighborhoods with real data.",
      },
      {
        title: "Clear cost estimates",
        description:
          "Seller and buyer closing cost calculators built around New Jersey fees and transfer taxes.",
      },
      {
        title: "Direct contact",
        description:
          "Your inquiry goes straight to Grace — no call center, no hand-off.",
      },
    ],
  },
  cta: {
    badge: "Talk with Grace",
    title: "Thinking about buying or selling?",
    description:
      "Send a short note about your plans and timeline. Grace will get back to you personally.",
    primaryButton: "Send an inquiry",
    secondaryButton: "Explore towns & schools",
  },
  footer: {
    brandDescription:
      "Grace Choi Real Estate — bilingual (Korean / English) real estate guidance for buyers and sellers in Bergen County, New Jersey.",
    email: "gracechoihappy@gmail.com",
    phone: "201.282.8640",
    legalText:
      "Town and school data courtesy of NJStreet (njstreet.com), used with permission. Figures are historical and may not reflect current conditions.",
  },
  guides: {
    sell: {
      eyebrow: "Seller Guide · 셀러 가이드",
      title: "Sell smarter, close faster.",
      intro:
        "From pricing strategy to closing day, here's everything you need to list your NY/NJ property with confidence and net the best possible price. 부동산 매매를 신속하고 최고가로 — Grace Choi가 함께합니다.",
      heroImage:
        "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/86de6931631a.jpg",
      ctaTitle: "Ready to list your home?",
      ctaDescription:
        "Get a free, no-obligation valuation from a Grace Choi agent. Most valuations are delivered within 24 hours.",
      sections: [
        {
          id: "intro",
          title: "부동산 매매를 신속하고 최고가로 하기 원하시나요?",
          body: "Want to sell your property quickly and at the highest price? The best way to achieve this is by hiring a real estate professional. A great agent brings great results.",
          bullets: [
            "신속하고 최고가 매매를 위한 전문가 고용",
            "좋은 에이전트는 좋은 결과를 가져옵니다",
            "Grace Choi의 NY/NJ 로컬 전문 지식 활용",
          ],
        },
        {
          id: "prepare",
          title: "Prepare Your Home for Sale",
          body: "집을 부동산 시장에 내놓기 전, 집의 시장성을 최대로 확보하는 것이 중요합니다. 예컨대 누수로 인한 손상이나 주택 기반에 관한 문제가 있다면 이를 수리하여 고객님의 부동산의 가치를 높이는 것을 고려해 보실 수 있습니다. 구식 전등을 교체하거나 집에 페인트 칠을 새로 하는 등 약간의 외관 변화라도 바이어 눈에는 큰 영향을 미칠 수 있습니다.",
          bullets: [
            "Before listing, maximize your home's market appeal",
            "Repair leaks, foundation issues, or structural damage",
            "Replace outdated light fixtures, apply fresh paint",
            "Small exterior changes make a big impression on buyers",
          ],
        },
        {
          id: "value",
          title: "Determine Your Home's Value",
          body: "주택의 적정 매매가를 결정하는 것은 판매 과정의 가장 중요 요소 중 하나입니다. 온라인 견적부터 시작하는 것도 한 가지 방법이나, 리스팅 에이전트로부터 지역적 동향, 주택의 사이즈 및 컨디션, 해당 지역의 유사 주택들, 그리고 기타 다양한 데이터를 기반으로 더욱 정확한 견적을 받으시는 게 좋습니다.",
          bullets: [
            "Pricing is the single most important factor in selling",
            "Online estimates are a starting point, but not definitive",
            "A listing agent provides a CMA based on local trends, size, condition, and comps",
          ],
        },
        {
          id: "factors",
          title: "Factors Grace Uses to Recommend Listing Price",
          body: "Grace Choi 에이전트는 다음 요소들을 종합적으로 분석하여 최적의 리스팅 가격을 제안합니다.",
          bullets: [
            "최근 동일 지역에서 거래된 유사 주택의 평균 매매가 (Recent comparable sales)",
            "현재 시장에 나와 있는 유사 주택들의 판매 가격 (Active comparable listings)",
            "집의 위치 (Location)",
            "집과 대지 사이즈 (Home and lot size)",
            "집 구성 — 레이아웃, 침실, 욕실, 지하, 수영장, 외벽, 주차, 뒤뜰, 조망 등",
            "집 컨디션 (Condition of the home)",
            "재산세 금액 (Property tax amount)",
          ],
        },
        {
          id: "service",
          title: "Grace's Comprehensive Service",
          body: "Grace Choi의 종합 서비스는 정확한 시장 분석부터 클로징까지 전 과정을 커버합니다.",
          bullets: [
            "정확한 시장 분석을 통해 Seller가 가장 높은 판매가를 결정할 수 있도록 지원",
            "로컬 지역 외 미국 전역, 한국 및 중국 Buyer에게 적극적인 마케팅 진행",
            "Seller에게 가장 유리한 조건으로 매매될 수 있도록 협상 진행",
            "리스팅 계약 체결 순간부터 클로징까지 전 과정 철저 관리·감독",
            "성공적인 클로징을 위해 변호사, 에이전트, 타이틀, 모기지, 인스펙션, 타운 관계자와 긴밀 협력",
            "필요 시 판매 후 다음 집 구매 또는 이사 관련 서비스 제공",
          ],
        },
        {
          id: "online",
          title: "Online Marketing",
          body: "리스팅 된 집은 대부분의 주요 온라인 플랫폼에서 높은 검색율로 홍보됩니다. — NJMLS, GSMLS, Hudson MLS, Zillow, Trulia, Realtor.com, Homes.com, Google search, Redfin 등. 전문 사진 기자가 촬영한 부동산 이미지도 포함됩니다.",
          bullets: [
            "Your listing appears on NJMLS, GSMLS, Hudson MLS, Zillow, Trulia, Realtor.com, Homes.com, Google, Redfin",
            "Listings include property-specific and neighborhood information",
            "Professional photography — instant preview for buyers",
          ],
        },
        {
          id: "mobile",
          title: "Mobile Marketing",
          body: "잠재적 구입자는 이동 중에도 편리한 검색 기능을 이용할 수 있습니다. iOS 및 Android 기기 모두에서 사용 가능한 주택 검색 앱을 통해 언제 어디서나 잠재 구입자들에게 노출됩니다.",
          bullets: [
            "Buyers can search on the go via our mobile portal",
            "iOS and Android apps supported",
            "Your property is visible to buyers 24/7",
          ],
        },
        {
          id: "advanced",
          title: "Advanced Marketing",
          body: "리스팅을 더 많은 잠재 고객이 보도록 트래픽을 증가시킬 수 있는 고급 마케팅 및 디지털 전략을 제공합니다. 미국에서 가장 큰 네트워크 중 하나를 통해 입소문, 온라인 마케팅 및 기타 광고 기회를 통하여 고객님의 부동산에 대한 소문이 퍼지도록 합니다.",
          bullets: [
            "Advanced digital strategies to drive listing traffic",
            "One of the largest agent networks in the US",
            "Word-of-mouth, online marketing, and paid advertising",
            "Targeted social-media campaigns (Meta, Instagram)",
          ],
        },
        {
          id: "international",
          title: "International Marketing",
          body: "더 큰 시장을 공략하기 위해 미국뿐만 아니라 한국 및 중국의 모든 Buyer를 대상으로 광고와 마케팅을 진행합니다. 한국과 중국 각 지역에 있는 부동산 협력업체를 통해 모든 리스팅 집들이 특별 소개됩니다.",
          bullets: [
            "Marketing to buyers in the US, Korea, and China",
            "Partner agencies in Korea and China feature your listing",
            "Bilingual marketing materials (English, Korean, Chinese)",
            "Cultural expertise for international buyer negotiations",
          ],
        },
      ],
    },
    buy: {
      eyebrow: "Buyer Guide · 바이어 가이드",
      title: "Buy with confidence, close with clarity.",
      intro:
        "위치 좋은 부동산을 좋은 가격에 구매하기 원하시나요? 이를 위한 최선의 방법은 부동산 전문가를 고용하시는 것입니다. 좋은 에이전트는 좋은 결과를 가져옵니다. — Grace Choi가 함께합니다.",
      heroImage:
        "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/4bfabf251d6f.jpg",
      ctaTitle: "Start your home search today",
      ctaDescription:
        "Tell us what you're looking for and a Grace Choi agent will set up a custom search within 24 hours.",
      sections: [
        {
          id: "intro",
          title: "위치 좋은 부동산을 좋은 가격에 구매하기 원하세요?",
          body: "Want to buy a well-located property at a good price? The best way to achieve this is by hiring a real estate professional. A great agent brings great results — and protects you from costly mistakes.",
          bullets: [
            "위치 좋은 부동산을 좋은 가격에 구매하기 위한 전문가 고용 (Hire a pro to buy the right property at the right price)",
            "좋은 에이전트는 좋은 결과를 가져옵니다 (A great agent brings great results)",
            "Grace Choi의 NY/NJ 로컬 전문 지식 활용 (Leverage Grace Choi's local expertise)",
          ],
        },
        {
          id: "domestic",
          title: "내국인 부동산 구매 · Buying as a US Resident",
          body: "집을 구입한다는 것은 고객님 생에 있어 가장 기대되는 경험 중 하나일 것입니다. 올바른 지원 시스템과 신뢰할 수 있는 부동산 전문가의 도움으로 고객님은 가장 현명한 결정을 내리실 수 있습니다. 에이전트가 제공하는 가이드는 주택구입과정을 세분화하여 안내하므로 고객님은 자신감을 가지고 준비된 상태로 시작할 수 있습니다. 예산 책정에서부터 계약서에 최종 서명을 하는 클로징까지 도움이 되는 유용한 정보가 포함되어 있습니다. 좋은 에이전트의 선택은 새 집에 입주하시는 그 순간까지 고객님의 모든 발걸음을 돕고 있을 것입니다.",
          bullets: [
            "Buying a home is one of the most exciting experiences of your life (주택 구매는 인생에서 가장 기대되는 경험 중 하나)",
            "A great agent guides you through every step, from budgeting to closing (좋은 에이전트는 예산 설정부터 클로징까지 모든 단계를 안내)",
            "Enter the process prepared and confident with expert support (전문가 지원으로 자신감 있게 준비된 상태로 시작)",
          ],
        },
        {
          id: "foreign",
          title: "외국인 부동산 구매 · Buying as a Foreign National",
          body: "미국 국민이 아닌 한국이나 중국에 거주하는 분들도 미국 부동산을 구매하실 수 있습니다. 보통 미국 부동산 구매 계약서와 변호사 은행 에스크로 계좌 증빙 서류만 있으면 송금이 가능합니다. 하지만, 한국/중국 지역 및 은행마다 서로 규정과 방침이 달라 외국 거주 구매자는 거래하는 은행에 문의하시는 것이 좋습니다.",
          bullets: [
            "Foreign nationals residing in Korea or China can purchase US real estate (한국/중국 거주자도 미국 부동산 구매 가능)",
            "Wire transfer is possible with the purchase contract and attorney escrow account proof (구매 계약서 + 변호사 에스크로 계좌 증빙 서류로 송금 가능)",
            "Each Korean/Chinese bank has different rules — check with your bank in advance (은행마다 규정이 다르므로 사전 문의 필수)",
            "Grace Choi provides bilingual support for KR/CN buyers (Grace Choi의 다국어 서비스 지원)",
          ],
        },
        {
          id: "process-intro",
          title: "Buying Process · 구매 프로세스 개요",
          body: "뉴저지 부동산 매입은 Offer 제출부터 클로징까지 평균 2개월가량 소요됩니다. 아래 10단계는 Buyer가 거치게 되는 표준 프로세스이며, Grace Choi 에이전트가 각 단계마다 안내해 드립니다.",
          bullets: [
            "Average timeline from offer to closing: ~2 months (오퍼 제출부터 클로징까지 평균 2개월 소요)",
            "10-step process from Offer to Closing (10단계 표준 프로세스)",
            "Grace Choi guides you through every step (각 단계마다 Grace Choi가 안내)",
          ],
        },
        {
          id: "step-1-offer",
          title: "1. Offer and Contract · 오퍼 및 계약",
          body: "Offer란 Buyer가 Seller에게 부동산 매입 의사를 전달하는 과정입니다. 13 페이지 분량의 부동산 표준 매매 계약서와 은행 잔고증명 혹은 모기지 Pre-Approval를 Seller 측에 전달해야 공식 Offer로 인정됩니다. Seller가 Offer를 받은 후 평균 1-3일 내로 ACCEPT / DENY / COUNTER OFFER / HIGHEST AND BEST 중 1가지를 선택하게 됩니다.",
          bullets: [
            "Offer = Buyer's formal expression of intent to purchase (Offer란 Buyer가 Seller에게 매입 의사를 전달하는 과정)",
            "13-page standard NJ purchase contract + bank balance proof or mortgage pre-approval required (13페이지 표준 계약서 + 잔고증명/Pre-Approval 필요)",
            "Key terms: purchase price, payment method (cash/mortgage), closing date, contingencies (주요 조건: 구매 금액, 구매 방식, 클로징 날짜, 구매 조건)",
            "Seller responds within 1-3 days with: ACCEPT, DENY, COUNTER OFFER, or HIGHEST AND BEST (1-3일 내 응답: ACCEPT/DENY/COUNTER/HIGHEST AND BEST)",
            "HIGHEST AND BEST = seller requests all buyers submit their best offer by a deadline; usually no counter allowed (여러 오퍼 시 최고가 요청, 보통 카운터 불가)",
          ],
        },
        {
          id: "step-2-attorney",
          title: "2. Attorney Review · 변호사 검토",
          body: "부동산 계약 체결, 즉 Seller가 계약서에 서명한 후 Buyer에게 전달하는 순간부터 Attorney Review가 자동적으로 시작됩니다. 부동산 계약서의 법적인 부분을 검토하며 클로징 전까지 계약 관계를 관리합니다. Attorney Review는 평균 3~5일 소요되며, Buyer는 부동산 계약과 관련해서 변호사와 직접 커뮤니케이션합니다.",
          bullets: [
            "Begins automatically when Seller signs and delivers the contract to Buyer (Seller 서명 후 Buyer 전달 시 자동 시작)",
            "Attorney reviews legal terms and manages the contract through closing (법적 부분 검토 + 클로징 전까지 계약 관리)",
            "Average duration: 3-5 days (평균 3-5일 소요)",
            "Buyer communicates directly with their attorney about the contract (Buyer가 변호사와 직접 커뮤니케이션)",
          ],
        },
        {
          id: "step-3-downpayment",
          title: "3. Down Payment · 계약금",
          body: "모기지 구매일 경우 평균 20% Down Payment가 적절하나 필요 시 5%~15%도 가능합니다. FHA 모기지는 3.5%부터 가능하나, 콘도는 FHA Approved 되어 있는지 사전 확인이 필요합니다. Down Payment는 2번에 나누어 납부합니다 — 1차 10%는 Attorney Review 이후 10일 이내에 납부하고 잔금은 클로징 시 납부합니다. Down Payment가 20% 미만일 경우엔 1차 때 총 다운페이의 50% 납부하고 나머지는 클로징 때 납부합니다.",
          bullets: [
            "Standard down payment: 20% (5-15% possible if needed) (표준 20%, 필요시 5-15% 가능)",
            "FHA: as low as 3.5% — verify condo is FHA Approved first (FHA는 3.5%부터, 콘도는 FHA Approved 사전 확인)",
            "Down payment paid in 2 installments: 10% within 10 days of attorney review + balance at closing (2회 분할: 1차 10%는 Attorney Review 후 10일 이내, 잔금은 클로징 시)",
            "If down payment < 20%: pay 50% at first installment, balance at closing (20% 미만 시 1차에 50%, 나머지 클로징 시)",
            "Funds sent to Seller's attorney — verify wire instructions with your attorney (송금은 Seller 변호사, 방법은 Buyer 변호사와 이중 확인)",
            "Wire fraud is common — ALWAYS double-check wire details with your attorney (송금 사기 주의 — 변호사와 이중 확인 필수)",
          ],
        },
        {
          id: "step-4-inspection",
          title: "4. Home Inspection · 주택 검사",
          body: "Attorney Review가 끝나면 10일 이내로 홈 인스펙션을 진행합니다. 인스펙션을 통해 부동산에 하자가 발견될 경우 Seller와 합의(Repair or Credit)합니다. 인스펙션 합의는 상식선에서 진행하되, 부동산 연식에 따른 Wear and Tear는 합의 대상이 아닙니다.",
          bullets: [
            "Conducted within 10 days after Attorney Review ends (Attorney Review 종료 후 10일 이내 진행)",
            "If defects found → negotiate Repair or Credit with Seller (하자 발견 시 Seller와 Repair 또는 Credit 합의)",
            "Negotiation based on common sense — wear and tear from age is NOT negotiable (상식선 합의, 연식에 따른 Wear and Tear는 제외)",
            "Basic inspections: Home, Radon, Termite (기본 검사: Home, Radon, Termite)",
            "Additional inspections (if needed): Oil Tank, Lead Paint, Sewer, Septic System (추가 검사: Oil Tank, Lead Paint, Sewer, Septic — 필요시에만)",
            "Check town records for Oil Tank history if needed (필요시 타운에 Oil Tank 관련 기록 확인)",
          ],
        },
        {
          id: "step-5-mortgage",
          title: "5. Mortgage Process · 모기지 진행",
          body: "Attorney Review가 끝나면 모기지 회사에 모기지 진행 요청 및 관련 서류를 제출합니다. 모기지 회사에서 제3회사를 통해 부동산 감정(Appraisal)을 실시하며, 감정가에 문제가 없고 제출서류 심사가 완료되면 융자 승인서(Mortgage Commitment Letter)를 받습니다. 모기지 회사 요청 시 Survey(대지 경계선)를 진행하며 추가 비용이 발생합니다. 보통 클로징 전 30일 이내에 모기지 이자율을 확정(Lock)할 수 있습니다.",
          bullets: [
            "Submit mortgage request + documents after Attorney Review (Attorney Review 후 모기지 회사에 진행 요청 + 서류 제출)",
            "Lender orders Appraisal via third-party (모기지 회사에서 제3회사 통해 감정 Appraisal 진행)",
            "Receive Mortgage Commitment Letter once appraisal & docs approved (감정 OK + 서류 심사 완료 시 융자 승인서 발급)",
            "Survey (property boundary) may be required by lender — extra cost (모기지 회사 요청 시 Survey 진행, 추가 비용)",
            "Lock mortgage rate within 30 days before closing (클로징 전 30일 이내 금리 Lock 가능)",
          ],
        },
        {
          id: "step-6-title",
          title: "6. Title Search · 타이틀 서치",
          body: "Title Search란 부동산 구매에 장애를 주는 사항이 있는지를 조사하는 과정입니다 — 소유권(Title), 유치권(Lien), 세금 문제(Tax Lien), 규제 및 제한(Restriction), 압류기록(Foreclosure History), 부채(Liability), 불법 및 미완성 공사 여부(Open Permit), 그 외 제약 사항들(Encumbrances). 모기지 확정서를 받은 후 Buyer 변호사가 타이틀 회사를 선정해서 Title Search를 진행합니다. Title에 문제가 있을 경우 Seller가 해결해야 하며, Buyer는 클로징 전까지 Clean Title을 받아야 합니다.",
          bullets: [
            "Investigates: Title, Lien, Tax Lien, Restriction, Foreclosure History, Liability, Open Permits, Encumbrances (조사 항목: 소유권, 유치권, 세금, 규제, 압류, 부채, 불법 공사, 기타 제약)",
            "Buyer's attorney selects title company after mortgage commitment (모기지 확정 후 Buyer 변호사가 타이틀 회사 선정)",
            "Title issues → Seller must resolve; Buyer must receive Clean Title before closing (문제 시 Seller 해결, Buyer는 Clean Title 수령)",
            "Title Insurance — optional but usually required by lender (타이틀 보험 — 선택이지만 모기지 회사가 보통 강제 요청)",
            "Clear to Close = title confirmed clean, ready to close (Clear to Close = 타이틀 확인 완료, 클로징 준비 끝)",
          ],
        },
        {
          id: "step-7-cco",
          title: "7. Certificate of Occupancy (CO or CCO) · 거주 확인증",
          body: "CO = 새로 건축한 집, CCO = 이미 거주하고 있는 집입니다. 뉴저지에서는 집이 매매될 때마다 타운정부에 의무 보고를 해야 하며, 타운정부에서는 거래되는 매물에 대한 안전 점검을 진행합니다. 점검 조항은 타운마다 조금씩 다르나 평균 체크사항은 — 10 Year Sealed Battery Smoke and Carbon Monoxide Detector, 2A-10BC Fire Extinguisher 및 안전 문제 관련 사항입니다. 콘도일 경우 각 가정문이 자동적으로 닫혀야 합니다. 타운으로부터 Certificate of Occupancy를 받아야 클로징할 수 있습니다.",
          bullets: [
            "CO = new construction; CCO = existing home (CO = 신축, CCO = 기존 주택)",
            "NJ requires town report + safety inspection for every sale (뉴저지는 매매 시 타운 보고 + 안전 점검 의무)",
            "Common requirements: 10-yr sealed battery smoke/CO detector, 2A-10BC fire extinguisher (공통 요구: 10년형 밀봉 배터리 연기/일산화탄소 감지기, 2A-10BC 소화기)",
            "Condo: self-closing doors required (콘도는 자동 닫힘 문 필수)",
            "CO/CCO required before closing — usually Seller's responsibility (클로징 전 CO/CCO 필수, 보통 Seller 책임)",
            "Bank-owned or short sale: Buyer may be required to obtain CO (은행 소유/숏세일: Buyer가 CO 받는 조건일 수 있음)",
          ],
        },
        {
          id: "step-8-cd",
          title: "8. Closing Disclosure (CD, ALTA) · 정산 내역",
          body: "Buyer는 클로징 전에 모기지 회사 혹은 타이틀 회사로부터 Closing Disclosure(매매 정산 내역)를 받아 검토합니다. 정산 내역이 최종적으로 결정되면 클로징 전날까지 타이틀 회사의 Escrow Account로 다운페이 잔금을 송금합니다. 최근 송금 Fraud가 성행하므로 송금 전 반드시 Buyer 변호사와 송금 계좌 및 방법을 다시 확인해야 합니다.",
          bullets: [
            "Buyer receives Closing Disclosure before closing — review all line items (클로징 전 CD 수령, 모든 항목 검토)",
            "Once finalized, wire down payment balance to title company's escrow account (최종 확정 시 타이틀 회사 에스크로 계좌로 잔금 송금)",
            "Wire by the day before closing (클로징 전날까지 송금 완료)",
            "Escrow fraud warning — ALWAYS verify wire account & method with your attorney (에스크로 사기 주의 — 송금 계좌/방법 변호사와 이중 확인 필수)",
          ],
        },
        {
          id: "step-9-walkthrough",
          title: "9. Final Walk Through · 최종 점검",
          body: "클로징 바로 전에 Buyer가 최종적으로 집을 다시 점검합니다. 인스펙션부터 클로징까지의 집 상태를 점검하는 것이 주 목적입니다.",
          bullets: [
            "Buyer inspects the property right before closing (클로징 직전 최종 점검)",
            "Main purpose: verify property condition is same as inspection day (인스펙션 당시와 동일한 상태인지 확인)",
            "Check repairs agreed during inspection negotiation were completed (인스펙션 합의 수리 사항 완료 여부 확인)",
          ],
        },
        {
          id: "step-10-closing",
          title: "10. Closing · 클로징",
          body: "클로징이란 Buyer 및 Seller뿐만 아니라 부동산 계약과 관련된 변호사, 부동산 중개인, 그리고 Title 회사가 모여서 매매를 마무리하는 마지막 단계입니다. 클로징은 보통 Buyer 변호사 사무실에서 Title 회사가 진행합니다. Buyer는 클로징 30분 전에 도착해서 모기지 서류에 서명하며, 평균 100페이지 정도입니다. Seller는 집 열쇠, 차고 잠금장치 및 비밀번호를 Buyer에게 전달합니다. 계약 시작하는 순간부터 클로징 단계까지 평균 2개월가량 소요됩니다.",
          bullets: [
            "Final step — Buyer, Seller, attorneys, agents, and title company meet (마지막 단계 — Buyer/Seller/변호사/에이전트/타이틀 회사 모임)",
            "Usually held at Buyer's attorney office, conducted by title company (보통 Buyer 변호사 사무실에서 타이틀 회사가 진행)",
            "Buyer arrives 30 min early to sign ~100 pages of mortgage documents (Buyer는 30분 전 도착, 약 100페이지 모기지 서류 서명)",
            "Seller hands over house keys, garage openers, and codes (Seller가 집 열쇠, 차고 리모컨, 비밀번호 전달)",
            "Total process from offer to closing: ~2 months (오퍼부터 클로징까지 평균 2개월 소요)",
          ],
        },
        {
          id: "closing-cost",
          title: "Understand Your Closing Costs · 부대 비용 안내",
          body: "뉴저지에서 부동산 매입 시 구매자가 납부해야 할 부대 비용 내역을 아래 계산기로 확인하세요. 매입가, 다운페이먼트 비율, 매물 종류(Single Family vs Condo)에 따라 비용이 달라집니다. 아래 Buyer's Closing Cost Calculator에서 숫자를 조정해 보세요. Title Insurance는 매입가에 따라 자동 계산되며, $1,000,000 이상 매입 시 Mansion Tax(1%)가 추가됩니다.",
          bullets: [
            "Buyers typically pay 2-5% of purchase price in closing costs (구매자 부대 비용은 매입가의 2-5%)",
            "NJ buyers pay 1% mansion tax on homes over $1M (NJ는 $1M 이상 시 저택세 1%)",
            "Condo buyers pay additional HOA/Capital Contribution fees (콘도는 HOA/자본금 추가)",
            "Title insurance is auto-calculated based on purchase price (타이틀 보험은 매입가 기준 자동 계산)",
            "Use the calculator below to estimate your total cash needed (아래 계산기로 총 필요 자금 확인)",
          ],
        },
      ],
    },
  },
};

// Deep clone helper so consumers can mutate freely without affecting seed
export function cloneContent(c: SiteContent): SiteContent {
  return JSON.parse(JSON.stringify(c));
}
