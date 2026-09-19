// Centralized mock data for the Grace Choi real estate site
// Coverage area: New York (NY) & New Jersey (NJ) only
// All images are hosted on a stable CDN

export const IMAGES = {
  hero: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/98695e19f9f5.jpg",
  heroAlt1: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/8e30e66b1b0c.jpg",
  heroAlt2: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/b2668cfa601b.jpg",
  kitchen1: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/3021aa3fd22d.png",
  kitchen2: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/4b0af0ce13af.jpg",
};

export const CATEGORY_IMAGES = {
  homes: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/4bfabf251d6f.jpg",
  condos: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/defaed2b5b75.jpg",
  land: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/277feec00017.jpeg",
  commercial: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/1ba97698b57c.jpg",
};

export const AGENT_IMAGES = [
  "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/a48728d28489.jpg",
  "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/7158f8974b8c.jpg",
  "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/86f745a3253a.jpg",
  "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/0fe5acc47b8d.jpg",
];

export const INSIGHTS_IMAGES = [
  "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/d4a79604eb37.jpg",
  "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/26dddc9c4dae.png",
  "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/7fb95a35f51d.png",
];

// ============================================================
// Region: NY & NJ ONLY
// ============================================================
export const SUPPORTED_STATES = ["NY", "NJ"] as const;
export type SupportedState = (typeof SUPPORTED_STATES)[number];

export const STATE_LABELS: Record<SupportedState, string> = {
  NY: "New York",
  NJ: "New Jersey",
};

// Popular cities for autocomplete — NY & NJ only
export const POPULAR_CITIES = [
  // New York
  "Manhattan, NY",
  "Brooklyn, NY",
  "Queens, NY",
  "Bronx, NY",
  "Staten Island, NY",
  "Long Island City, NY",
  "Astoria, NY",
  "Yonkers, NY",
  "Buffalo, NY",
  "Rochester, NY",
  "Hoboken, NY",
  "White Plains, NY",
  // New Jersey
  "Jersey City, NJ",
  "Hoboken, NJ",
  "Newark, NJ",
  "Princeton, NJ",
  "Edison, NJ",
  "Trenton, NJ",
  "Atlantic City, NJ",
  "Hoboken, NJ",
  "Camden, NJ",
  "Paterson, NJ",
  "Cherry Hill, NJ",
  "Morristown, NJ",
];

export type ListingStatus = "for-sale" | "for-rent";
export type ListingType = "house" | "condo" | "land" | "commercial";

export interface PropertyListing {
  id: string;
  title: string;
  address: string;
  city: string;
  state: SupportedState;
  zip: string;
  price: number;
  status: ListingStatus;
  type: ListingType;
  beds: number;
  baths: number;
  sqft: number;
  lotSize?: string;
  yearBuilt: number;
  image: string;
  gallery: string[];
  featured?: boolean;
  isNew?: boolean;
  agentId: string;
  description: string;
  amenities: string[];
}

// Default seed listings — all in NY & NJ
export const SEED_PROPERTIES: PropertyListing[] = [
  {
    id: "p1",
    title: "Tribeca Luxury Loft with Skyline Views",
    address: "142 Duane St",
    city: "Manhattan",
    state: "NY",
    zip: "10013",
    price: 2_850_000,
    status: "for-sale",
    type: "condo",
    beds: 2,
    baths: 2,
    sqft: 1850,
    yearBuilt: 2019,
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/98695e19f9f5.jpg",
    gallery: [
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/98695e19f9f5.jpg",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/3021aa3fd22d.png",
    ],
    featured: true,
    isNew: true,
    agentId: "a1",
    description:
      "Tribeca loft with floor-to-ceiling windows framing downtown Manhattan. Open chef's kitchen with Sub-Zero and Wolf appliances. Building features 24/7 concierge, fitness center, and rooftop terrace.",
    amenities: ["Skyline View", "Concierge", "Gym", "Roof Deck", "Doorman"],
  },
  {
    id: "p2",
    title: "Park Slope Brownstone Family Home",
    address: "275 Garfield Pl",
    city: "Brooklyn",
    state: "NY",
    zip: "11215",
    price: 1_985_000,
    status: "for-sale",
    type: "house",
    beds: 4,
    baths: 3,
    sqft: 2980,
    lotSize: "0.18 ac",
    yearBuilt: 1910,
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/4bfabf251d6f.jpg",
    gallery: [
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/4bfabf251d6f.jpg",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/3021aa3fd22d.png",
    ],
    featured: true,
    agentId: "a3",
    description:
      "Classic Park Slope brownstone on a tree-lined block steps from Prospect Park. Original woodwork, restored stained glass, and a renovated chef's kitchen. Garden-level apartment for rental income.",
    amenities: ["Garden Apartment", "Original Woodwork", "Fireplace", "Renovated Kitchen", "Backyard"],
  },
  {
    id: "p3",
    title: "Jersey City Waterfront Penthouse",
    address: "800 Harbor Blvd #PH2",
    city: "Jersey City",
    state: "NJ",
    zip: "07310",
    price: 1_450_000,
    status: "for-sale",
    type: "condo",
    beds: 2,
    baths: 2,
    sqft: 1620,
    yearBuilt: 2020,
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/defaed2b5b75.jpg",
    gallery: [
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/defaed2b5b75.jpg",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/4b0af0ce13af.jpg",
    ],
    featured: true,
    isNew: true,
    agentId: "a2",
    description:
      "Penthouse-level condo with unobstructed Manhattan skyline views across the Hudson. Floor-to-ceiling windows, private terrace, and designer finishes. Building offers pool, gym, and 24-hr concierge.",
    amenities: ["Skyline View", "Terrace", "Pool", "Gym", "Concierge"],
  },
  {
    id: "p4",
    title: "Hoboken Modern Studio Apartment",
    address: "14 Washington St #5F",
    city: "Hoboken",
    state: "NJ",
    zip: "07030",
    price: 2_900,
    status: "for-rent",
    type: "condo",
    beds: 1,
    baths: 1,
    sqft: 680,
    yearBuilt: 2018,
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/97ce4879fca1.jpg",
    gallery: ["https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/97ce4879fca1.jpg"],
    featured: true,
    isNew: true,
    agentId: "a3",
    description:
      "Stylish one-bedroom steps from the PATH train and Hoboken waterfront. In-unit laundry, hardwood floors, and a private balcony. Pet-friendly building with roof deck.",
    amenities: ["Balcony", "In-Unit Laundry", "Roof Deck", "Pet Friendly", "Doorman"],
  },
  {
    id: "p5",
    title: "Williamsburg Industrial Loft",
    address: "55 Wythe Ave #4F",
    city: "Brooklyn",
    state: "NY",
    zip: "11249",
    price: 5_800,
    status: "for-rent",
    type: "condo",
    beds: 2,
    baths: 2,
    sqft: 1240,
    yearBuilt: 2015,
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/511ca9a7b809.jpeg",
    gallery: [
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/511ca9a7b809.jpeg",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/4b0af0ce13af.jpg",
    ],
    agentId: "a3",
    description:
      "Converted warehouse loft with exposed brick, 12-ft ceilings, and oversized windows. Modern kitchen with stainless appliances. Steps from restaurants, galleries, and the East River park.",
    amenities: ["Exposed Brick", "High Ceilings", "Doorman", "Gym", "Roof Deck"],
  },
  {
    id: "p6",
    title: "Hamptons Waterfront Estate",
    address: "120 Dune Rd",
    city: "Southampton",
    state: "NY",
    zip: "11968",
    price: 8_950_000,
    status: "for-sale",
    type: "house",
    beds: 6,
    baths: 7,
    sqft: 6500,
    lotSize: "1.2 ac",
    yearBuilt: 2021,
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/d54395ad66df.jpg",
    gallery: [
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/d54395ad66df.jpg",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/3021aa3fd22d.png",
    ],
    featured: true,
    isNew: true,
    agentId: "a4",
    description:
      "Direct oceanfront estate with private beach access. Walls of glass open to an infinity pool overlooking the Atlantic. Designer finishes throughout, plus a private gym, spa, and media room.",
    amenities: ["Beach Access", "Infinity Pool", "Gym", "Spa", "Media Room", "Smart Home"],
  },
  {
    id: "p7",
    title: "Princeton Estate on Acreage",
    address: "88 Cherry Hill Rd",
    city: "Princeton",
    state: "NJ",
    zip: "08540",
    price: 2_450_000,
    status: "for-sale",
    type: "house",
    beds: 5,
    baths: 4,
    sqft: 5100,
    lotSize: "2.5 ac",
    yearBuilt: 1998,
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/86de6931631a.jpg",
    gallery: [
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/86de6931631a.jpg",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/3021aa3fd22d.png",
    ],
    featured: true,
    agentId: "a1",
    description:
      "Stately colonial on 2.5 landscaped acres in Princeton. Gourmet kitchen, sun-filled family room, and primary suite with sitting area. Three-car garage and finished basement.",
    amenities: ["2.5 Acres", "3-Car Garage", "Finished Basement", "Gourmet Kitchen", "Fireplace"],
  },
  {
    id: "p8",
    title: "Long Island City High-Rise Condo",
    address: "42-12 27th St #2201",
    city: "Long Island City",
    state: "NY",
    zip: "11101",
    price: 985_000,
    status: "for-sale",
    type: "condo",
    beds: 1,
    baths: 1,
    sqft: 820,
    yearBuilt: 2019,
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/b69595dd363d.jpg",
    gallery: [
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/b69595dd363d.jpg",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/4b0af0ce13af.jpg",
    ],
    isNew: true,
    agentId: "a3",
    description:
      "22nd-floor condo with sweeping Manhattan skyline views. Floor-to-ceiling windows, designer kitchen, and a private balcony. Building amenities include pool, gym, and rooftop lounge.",
    amenities: ["Skyline View", "Balcony", "Pool", "Gym", "Rooftop Lounge"],
  },
  {
    id: "p9",
    title: "Hudson Valley Building Lot",
    address: "Lot 7 Eagle Ridge Rd",
    city: "Woodstock",
    state: "NY",
    zip: "12498",
    price: 285_000,
    status: "for-sale",
    type: "land",
    sqft: 87_120,
    lotSize: "2.0 ac",
    yearBuilt: 0,
    beds: 0,
    baths: 0,
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/277feec00017.jpeg",
    gallery: ["https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/277feec00017.jpeg"],
    agentId: "a1",
    description:
      "Buildable 2-acre lot in the Catskills with sweeping mountain views. Utilities at the street, approved perc test, and gentle slope ideal for a custom build. Easy access to Woodstock and Kingston.",
    amenities: ["Mountain View", "Utilities Available", "Perc Approved", "2.0 ac"],
  },
  {
    id: "p10",
    title: "Midtown Manhattan Office Suite",
    address: "1 Penn Plaza, Suite 1500",
    city: "Manhattan",
    state: "NY",
    zip: "10119",
    price: 14_500,
    status: "for-rent",
    type: "commercial",
    sqft: 3200,
    yearBuilt: 1972,
    beds: 0,
    baths: 2,
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/1ba97698b57c.jpg",
    gallery: ["https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/1ba97698b57c.jpg"],
    isNew: true,
    agentId: "a2",
    description:
      "Class A office suite on the 15th floor of 1 Penn Plaza. Pre-built with 8 private offices, conference room, and open workstations. 24/7 building access, on-site parking, and direct subway access.",
    amenities: ["Penn Station Access", "Parking", "Conference Room", "24/7 Access", "Café"],
  },
  {
    id: "p11",
    title: "Astoria Family Home with Yard",
    address: "418 31st St",
    city: "Astoria",
    state: "NY",
    zip: "11103",
    price: 1_295_000,
    status: "for-sale",
    type: "house",
    beds: 3,
    baths: 2,
    sqft: 1640,
    lotSize: "0.12 ac",
    yearBuilt: 1998,
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/28522449d8e8.jpg",
    gallery: ["https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/28522449d8e8.jpg"],
    agentId: "a3",
    description:
      "Charming detached home in Astoria with private driveway and backyard. Renovated kitchen with shaker cabinets and quartz counters. Finished basement and roof deck with Manhattan views.",
    amenities: ["Backyard", "Driveway", "Roof Deck", "Renovated Kitchen", "Finished Basement"],
  },
  {
    id: "p12",
    title: "Newark Commercial Retail Space",
    address: "550 Broad St",
    city: "Newark",
    state: "NJ",
    zip: "07102",
    price: 6_800,
    status: "for-rent",
    type: "commercial",
    sqft: 2400,
    yearBuilt: 2010,
    beds: 0,
    baths: 1,
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/1ba97698b57c.jpg",
    gallery: ["https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/1ba97698b57c.jpg"],
    agentId: "a2",
    description:
      "Ground-floor retail space on busy Broad Street in downtown Newark. High foot traffic, excellent visibility, and large storefront windows. Adjacent to NJ Transit and universities.",
    amenities: ["High Foot Traffic", "Storefront Windows", "NJ Transit Access", "Parking Nearby"],
  },
];

export interface Agent {
  id: string;
  name: string;
  title: string;
  phone: string;
  email: string;
  image: string;
  sales: number;
  rating: number;
  specialties: string[];
  office: string;
}

export const AGENTS: Agent[] = [
  {
    id: "a1",
    name: "Sarah Mitchell",
    title: "Senior Listing Agent · NY",
    phone: "(212) 555-0184",
    email: "sarah.mitchell@estata.com",
    image: AGENT_IMAGES[0],
    sales: 248,
    rating: 4.9,
    specialties: ["Luxury Homes", "Manhattan", "Hamptons"],
    office: "Manhattan, NY",
  },
  {
    id: "a2",
    name: "James Okonkwo",
    title: "Commercial Specialist · NJ",
    phone: "(973) 555-0199",
    email: "james.okonkwo@estata.com",
    image: AGENT_IMAGES[1],
    sales: 187,
    rating: 4.8,
    specialties: ["Commercial", "Investment", "Newark"],
    office: "Jersey City, NJ",
  },
  {
    id: "a3",
    name: "Elena Rossi",
    title: "Urban Properties Expert · Brooklyn",
    phone: "(718) 555-0142",
    email: "elena.rossi@estata.com",
    image: AGENT_IMAGES[2],
    sales: 312,
    rating: 5.0,
    specialties: ["Condos", "Lofts", "Rentals"],
    office: "Brooklyn, NY",
  },
  {
    id: "a4",
    name: "Marcus Chen",
    title: "Luxury & Waterfront · Hamptons",
    phone: "(631) 555-0167",
    email: "marcus.chen@estata.com",
    image: AGENT_IMAGES[3],
    sales: 156,
    rating: 4.9,
    specialties: ["Waterfront", "Luxury", "Hamptons"],
    office: "Southampton, NY",
  },
];

export interface Insight {
  id: string;
  title: string;
  excerpt: string;
  category: "Market Trends" | "Buyer Tips" | "Seller Tips" | "Financing";
  date: string;
  readTime: string;
  image: string;
}

export const INSIGHTS: Insight[] = [
  {
    id: "i1",
    title: "NYC & NJ Housing Market 2024: What Buyers Should Expect",
    excerpt:
      "Mortgage rates are stabilizing and inventory is climbing across the NY/NJ metro. Here's how the rest of the year is shaping up — and what it means for your next move in Manhattan, Brooklyn, or Jersey City.",
    category: "Market Trends",
    date: "Sep 12, 2024",
    readTime: "6 min read",
    image: INSIGHTS_IMAGES[0],
  },
  {
    id: "i2",
    title: "5 First-Time Buyer Mistakes in the NY/NJ Market",
    excerpt:
      "From skipping pre-approval to underestimating closing costs, first-time buyers in NYC and NJ often stumble on the same hurdles. Use this checklist to side-step the most common pitfalls.",
    category: "Buyer Tips",
    date: "Aug 28, 2024",
    readTime: "4 min read",
    image: INSIGHTS_IMAGES[1],
  },
  {
    id: "i3",
    title: "How to Price Your Home in a Shifting NY/NJ Market",
    excerpt:
      "Pricing strategy can make or break your sale in Brooklyn, Hoboken, or Long Island. Learn how local comps, days-on-market trends, and condition adjustments should inform your list price.",
    category: "Seller Tips",
    date: "Aug 14, 2024",
    readTime: "5 min read",
    image: INSIGHTS_IMAGES[2],
  },
];

// Stats focused on NY/NJ coverage
export const STATS = [
  { value: "48K+", label: "NY/NJ Listings" },
  { value: "2.1M", label: "Homes Sold" },
  { value: "1,200", label: "Local Agents" },
  { value: "62", label: "NY + NJ Cities" },
];

export const CATEGORIES = [
  {
    key: "house" as ListingType,
    label: "Homes for Sale",
    count: "18,420 listings",
    image: CATEGORY_IMAGES.homes,
    description: "Single-family houses, townhomes, and brownstones",
  },
  {
    key: "condo" as ListingType,
    label: "Condos & Apartments",
    count: "22,540 listings",
    image: CATEGORY_IMAGES.condos,
    description: "Modern condos, lofts, and co-ops",
  },
  {
    key: "land" as ListingType,
    label: "Land & Lots",
    count: "3,880 listings",
    image: CATEGORY_IMAGES.land,
    description: "Buildable lots and acreage in NY/NJ",
  },
  {
    key: "commercial" as ListingType,
    label: "Commercial",
    count: "4,420 listings",
    image: CATEGORY_IMAGES.commercial,
    description: "Office, retail, and mixed-use space",
  },
];

export function formatPrice(price: number, status?: ListingStatus): string {
  if (status === "for-rent") {
    return `$${price.toLocaleString("en-US")}/mo`;
  }
  if (price >= 1_000_000) {
    return `$${(price / 1_000_000).toFixed(2)}M`;
  }
  if (price >= 1_000) {
    return `$${(price / 1_000).toFixed(0)}K`;
  }
  return `$${price.toLocaleString("en-US")}`;
}

export function formatPriceFull(price: number, status?: ListingStatus): string {
  const suffix = status === "for-rent" ? "/mo" : "";
  return `$${price.toLocaleString("en-US")}${suffix}`;
}

// Validation helper — enforce NY/NJ only
export function isValidState(state: string): state is SupportedState {
  return (SUPPORTED_STATES as readonly string[]).includes(state.toUpperCase());
}

// ============================================================
// Editable Site Content Model
// All text + images on the public site can be edited from admin.
// ============================================================

export interface HeroContent {
  badge: string;
  headline: string;
  subline: string;
  backgroundImage: string;
  trustBadge1: string;
  trustBadge2: string;
  trustBadge3: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface CategoryItem {
  key: ListingType;
  label: string;
  count: string;
  image: string;
  description: string;
}

export interface WhyUsContent {
  eyebrow: string;
  title: string;
  description: string;
  features: { title: string; description: string }[];
}

export interface AgentSectionContent {
  eyebrow: string;
  title: string;
  description: string;
  browseAllButton: string;
}

export interface InsightItem {
  id: string;
  title: string;
  excerpt: string;
  category: "Market Trends" | "Buyer Tips" | "Seller Tips" | "Financing";
  date: string;
  readTime: string;
  image: string;
}

export interface InsightsContent {
  eyebrow: string;
  title: string;
  description: string;
  allArticlesButton: string;
  articles: InsightItem[];
}

export interface CtaContent {
  badge: string;
  title: string;
  description: string;
  primaryButton: string;
  secondaryButton: string;
  statValue: string;
  statLabel: string;
  subStat1Value: string;
  subStat1Label: string;
  subStat2Value: string;
  subStat2Label: string;
}

export interface FooterContent {
  brandDescription: string;
  newsletterTitle: string;
  newsletterSubtitle: string;
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
  categories: CategoryItem[];
  whyUs: WhyUsContent;
  agentSection: AgentSectionContent;
  insights: InsightsContent;
  cta: CtaContent;
  footer: FooterContent;
  // Agents are also editable (text + image + contact)
  agents: Agent[];
  // Guide pages (seller, buyer, rent, mortgage, townhouse-condo, real-estate-info)
  guides: Record<string, GuidePageContent>;
}

export const SEED_SITE_CONTENT: SiteContent = {
  hero: {
    badge: "Trusted by 2.1M+ NY/NJ homeowners",
    headline: "GRACE will lead you home.\nHappy closing with GRACE.",
    subline:
      "Browse thousands of homes, condos, land, and commercial properties across New York and New Jersey — backed by 1,200+ trusted local agents.",
    backgroundImage:
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/98695e19f9f5.jpg",
    trustBadge1: "Verified listings only",
    trustBadge2: "1,200+ vetted NY/NJ agents",
    trustBadge3: "Updated every 15 min",
  },
  stats: [
    { value: "48K+", label: "NY/NJ Listings" },
    { value: "2.1M", label: "Homes Sold" },
    { value: "1,200", label: "Local Agents" },
    { value: "62", label: "NY + NJ Cities" },
  ],
  categories: [
    {
      key: "house",
      label: "Homes for Sale",
      count: "18,420 listings",
      image: CATEGORY_IMAGES.homes,
      description: "Single-family houses, townhomes, and brownstones",
    },
    {
      key: "condo",
      label: "Condos & Apartments",
      count: "22,540 listings",
      image: CATEGORY_IMAGES.condos,
      description: "Modern condos, lofts, and co-ops",
    },
    {
      key: "land",
      label: "Land & Lots",
      count: "3,880 listings",
      image: CATEGORY_IMAGES.land,
      description: "Buildable lots and acreage in NY/NJ",
    },
    {
      key: "commercial",
      label: "Commercial",
      count: "4,420 listings",
      image: CATEGORY_IMAGES.commercial,
      description: "Office, retail, and mixed-use space",
    },
  ],
  whyUs: {
    eyebrow: "Why Grace Choi",
    title: "The trusted name in NY & NJ real estate",
    description:
      "We've helped thousands of families across New York and New Jersey find their next home. Here's what makes the Grace Choi experience different.",
    features: [
      {
        title: "Verified listings",
        description:
          "Every listing is checked for accuracy by our quality team before going live. No stale inventory, no fake photos, no surprises at the showing.",
      },
      {
        title: "Top-rated agents",
        description:
          "Work with the top 5% of local agents — vetted, reviewed, and rated by real buyers and sellers in your market. We match you based on your goals.",
      },
      {
        title: "Secure transactions",
        description:
          "From offer to closing, your data and documents are protected with bank-grade encryption and a transparent audit trail.",
      },
      {
        title: "Support 7 days a week",
        description:
          "Real humans on live chat, email, and phone from 7am to 9pm — plus a self-serve help center with 200+ articles.",
      },
    ],
  },
  agentSection: {
    eyebrow: "Meet the team",
    title: "Find an agent who knows your market",
    description:
      "Top-rated, vetted, and reviewed. Connect with a local expert who understands your neighborhood, your goals, and your timeline.",
    browseAllButton: "Browse all 1,200 agents",
  },
  insights: {
    eyebrow: "Grace Choi Insights",
    title: "Market trends, buyer tips & more",
    description:
      "Make smarter decisions with data-driven market analysis, expert perspectives, and practical guides — written by our agents and research team.",
    allArticlesButton: "All articles",
    articles: INSIGHTS,
  },
  cta: {
    badge: "List with Grace Choi",
    title: "Ready to sell or rent out your property?",
    description:
      "Reach 12M+ qualified buyers and tenants in days, not months. Get a free, no-obligation valuation from a local Grace Choi agent — typically in under 24 hours.",
    primaryButton: "Get a free valuation",
    secondaryButton: "See pricing",
    statValue: "12M+",
    statLabel: "Monthly buyers searching Grace Choi",
    subStat1Value: "3.2%",
    subStat1Label: "Avg. days on market",
    subStat2Value: "98%",
    subStat2Label: "Client satisfaction",
  },
  footer: {
    brandDescription:
      "The trusted name in NY/NJ real estate. Browse thousands of listings across New York and New Jersey, work with 1,200+ vetted agents, and find a place you'll love to call home.",
    newsletterTitle: "Get market insights weekly",
    newsletterSubtitle: "No spam. Unsubscribe anytime.",
    phone: "201.282.8640",
    legalText:
      "Grace Choi Real Estate — serving New York and New Jersey with care and expertise.",
  },
  agents: AGENTS,
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
    rent: {
      eyebrow: "Rent Guide · 렌트 가이드",
      title: "Rent smarter in NY & NJ.",
      intro:
        "From apartment hunting to lease signing, here's how to find a rental you'll love — without getting burned by hidden fees or shady landlords.",
      heroImage:
        "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/97ce4879fca1.jpg",
      ctaTitle: "Looking for a rental?",
      ctaDescription:
        "Send your criteria and budget — a Grace Choi agent will send you a curated list of matching rentals within 24 hours.",
      sections: [],
    },
    mortgage: {
      eyebrow: "Mortgage Center · 모기지 센터",
      title: "Understand your mortgage options.",
      intro:
        "From conventional loans to FHA, VA, and jumbo — here's how to pick the right mortgage for your NY/NJ home purchase and lock the best rate.",
      heroImage:
        "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/3021aa3fd22d.png",
      ctaTitle: "Get pre-approved today",
      ctaDescription:
        "Submit your info and we'll connect you with a NY/NJ lender who can deliver a pre-approval letter within 48 hours.",
      sections: [],
    },
    "townhouse-condo": {
      eyebrow: "Property Types · 주택 유형",
      title: "Townhouse, condo, or co-op — what's right for you?",
      intro:
        "Each property type has different ownership rights, costs, and approval processes. Here's how to choose the right one in the NY/NJ market.",
      heroImage:
        "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/48df8199c960.jpg",
      ctaTitle: "Considering a townhouse or condo?",
      ctaDescription:
        "Tell us your preferences and a Grace Choi agent will curate options that match your lifestyle and budget.",
      sections: [],
    },
    "real-estate-info": {
      eyebrow: "Real Estate Info · 부동산 정보",
      title: "The NY/NJ real estate landscape, decoded.",
      intro:
        "Market trends, transfer taxes, attorney requirements, rent stabilization — the rules vary county by county. Here's a clear overview to help you make informed decisions.",
      heroImage:
        "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/d4a79604eb37.jpg",
      ctaTitle: "Have a specific question?",
      ctaDescription:
        "Real estate laws change. Reach out and a Grace Choi agent will get you the most current answer for your situation.",
      sections: [],
    },
  },
};

// Deep clone helper so consumers can mutate freely without affecting seed
export function cloneContent(c: SiteContent): SiteContent {
  return JSON.parse(JSON.stringify(c));
}

