// Centralized mock data for the Estata real estate site
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
