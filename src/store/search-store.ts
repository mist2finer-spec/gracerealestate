"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  SEED_PROPERTIES,
  SEED_SITE_CONTENT,
  PropertyListing,
  SupportedState,
  SiteContent,
  Agent,
  isValidState,
  cloneContent,
} from "@/lib/data";

export type SearchTab = "for-sale" | "for-rent";
export type ListingFilter = "all" | "for-sale" | "for-rent" | "new";

// Admin auth — for demo only. In production, replace with NextAuth + DB.
const ADMIN_PASSWORD = "estata-admin-2024";
const ADMIN_SESSION_KEY = "estata-admin-session";

interface SearchState {
  // ============ Public site state ============
  searchTab: SearchTab;
  location: string;
  propertyType: string;
  priceRange: string;
  listingFilter: ListingFilter;

  // Property catalog — starts with SEED, can be edited by admin
  properties: PropertyListing[];

  // Site content — all editable text + images on the public site
  siteContent: SiteContent;

  // ============ Inquiry form state ============
  inquiryOpen: boolean;
  inquiryPropertyId: string | null;
  setInquiryOpen: (open: boolean) => void;
  openInquiry: (propertyId?: string | null) => void;

  // Favorites
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;

  // Selected property for modal
  selectedPropertyId: string | null;
  setSelectedProperty: (id: string | null) => void;

  // Mobile nav
  mobileNavOpen: boolean;
  setMobileNavOpen: (open: boolean) => void;

  // Admin view state
  adminOpen: boolean;
  setAdminOpen: (open: boolean) => void;
  // Which admin panel tab is active: "listings" or "content"
  adminTab: "listings" | "content";
  setAdminTab: (t: "listings" | "content") => void;

  // ============ Admin auth ============
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;

  // ============ Property CRUD (admin) ============
  addProperty: (p: Omit<PropertyListing, "id">) => string;
  updateProperty: (id: string, patch: Partial<PropertyListing>) => void;
  deleteProperty: (id: string) => void;
  resetToSeed: () => void;

  // ============ Site content editing (admin) ============
  updateSiteContent: (patch: Partial<SiteContent>) => void;
  updateHero: (patch: Partial<SiteContent["hero"]>) => void;
  updateStats: (stats: SiteContent["stats"]) => void;
  updateCategories: (categories: SiteContent["categories"]) => void;
  updateWhyUs: (patch: Partial<SiteContent["whyUs"]>) => void;
  updateWhyUsFeature: (
    index: number,
    patch: Partial<SiteContent["whyUs"]["features"][0]>
  ) => void;
  updateAgentSection: (patch: Partial<SiteContent["agentSection"]>) => void;
  updateInsights: (patch: Partial<SiteContent["insights"]>) => void;
  updateInsightArticle: (
    id: string,
    patch: Partial<SiteContent["insights"]["articles"][0]>
  ) => void;
  updateCta: (patch: Partial<SiteContent["cta"]>) => void;
  updateFooter: (patch: Partial<SiteContent["footer"]>) => void;
  // Agent editing (text/image/contact)
  updateAgent: (id: string, patch: Partial<Agent>) => void;
  resetContentToSeed: () => void;

  // ============ Search actions ============
  setSearchTab: (t: SearchTab) => void;
  setLocation: (v: string) => void;
  setPropertyType: (v: string) => void;
  setPriceRange: (v: string) => void;
  setListingFilter: (f: ListingFilter) => void;
  applySearch: () => void;
  resetFilters: () => void;
}

function genId() {
  return `p_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
}

export const useSearchStore = create<SearchState>()(
  persist(
    (set, get) => ({
      // ============ Public state ============
      searchTab: "for-sale",
      location: "",
      propertyType: "any",
      priceRange: "any",
      listingFilter: "all",

      // Seed with NY/NJ demo properties
      properties: SEED_PROPERTIES,

      // Seed with default editable content
      siteContent: cloneContent(SEED_SITE_CONTENT),

      // Inquiry form
      inquiryOpen: false,
      inquiryPropertyId: null,
      setInquiryOpen: (open) => set({ inquiryOpen: open }),
      openInquiry: (propertyId = null) =>
        set({ inquiryOpen: true, inquiryPropertyId: propertyId }),

      favorites: [],
      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((f) => f !== id)
            : [...state.favorites, id],
        })),
      isFavorite: (id) => get().favorites.includes(id),

      selectedPropertyId: null,
      setSelectedProperty: (id) => set({ selectedPropertyId: id }),

      mobileNavOpen: false,
      setMobileNavOpen: (open) => set({ mobileNavOpen: open }),

      adminOpen: false,
      setAdminOpen: (open) => set({ adminOpen: open }),
      adminTab: "listings",
      setAdminTab: (t) => set({ adminTab: t }),

      // ============ Admin auth ============
      isAdmin:
        typeof window !== "undefined" &&
        sessionStorage.getItem(ADMIN_SESSION_KEY) === "1",

      login: (password) => {
        if (password === ADMIN_PASSWORD) {
          if (typeof window !== "undefined") {
            sessionStorage.setItem(ADMIN_SESSION_KEY, "1");
          }
          set({ isAdmin: true });
          return true;
        }
        return false;
      },

      logout: () => {
        if (typeof window !== "undefined") {
          sessionStorage.removeItem(ADMIN_SESSION_KEY);
        }
        set({ isAdmin: false, adminOpen: false });
      },

      // ============ CRUD ============
      addProperty: (p) => {
        if (!isValidState(p.state)) {
          throw new Error(
            `Invalid state "${p.state}". Estata only supports NY and NJ.`
          );
        }
        const id = genId();
        const newProp: PropertyListing = { ...p, id };
        set((state) => ({ properties: [newProp, ...state.properties] }));
        return id;
      },

      updateProperty: (id, patch) => {
        if (patch.state && !isValidState(patch.state)) {
          throw new Error(
            `Invalid state "${patch.state}". Estata only supports NY and NJ.`
          );
        }
        set((state) => ({
          properties: state.properties.map((p) =>
            p.id === id ? { ...p, ...patch } : p
          ),
        }));
      },

      deleteProperty: (id) => {
        set((state) => ({
          properties: state.properties.filter((p) => p.id !== id),
          favorites: state.favorites.filter((f) => f !== id),
          selectedPropertyId:
            state.selectedPropertyId === id ? null : state.selectedPropertyId,
        }));
      },

      resetToSeed: () => set({ properties: SEED_PROPERTIES }),

      // ============ Site content editing ============
      updateSiteContent: (patch) =>
        set((state) => ({
          siteContent: { ...state.siteContent, ...patch },
        })),

      updateHero: (patch) =>
        set((state) => ({
          siteContent: {
            ...state.siteContent,
            hero: { ...state.siteContent.hero, ...patch },
          },
        })),

      updateStats: (stats) =>
        set((state) => ({
          siteContent: { ...state.siteContent, stats },
        })),

      updateCategories: (categories) =>
        set((state) => ({
          siteContent: { ...state.siteContent, categories },
        })),

      updateWhyUs: (patch) =>
        set((state) => ({
          siteContent: {
            ...state.siteContent,
            whyUs: { ...state.siteContent.whyUs, ...patch },
          },
        })),

      updateWhyUsFeature: (index, patch) =>
        set((state) => {
          const features = [...state.siteContent.whyUs.features];
          if (features[index]) {
            features[index] = { ...features[index], ...patch };
          }
          return {
            siteContent: {
              ...state.siteContent,
              whyUs: { ...state.siteContent.whyUs, features },
            },
          };
        }),

      updateAgentSection: (patch) =>
        set((state) => ({
          siteContent: {
            ...state.siteContent,
            agentSection: { ...state.siteContent.agentSection, ...patch },
          },
        })),

      updateInsights: (patch) =>
        set((state) => ({
          siteContent: {
            ...state.siteContent,
            insights: { ...state.siteContent.insights, ...patch },
          },
        })),

      updateInsightArticle: (id, patch) =>
        set((state) => {
          const articles = state.siteContent.insights.articles.map((a) =>
            a.id === id ? { ...a, ...patch } : a
          );
          return {
            siteContent: {
              ...state.siteContent,
              insights: { ...state.siteContent.insights, articles },
            },
          };
        }),

      updateCta: (patch) =>
        set((state) => ({
          siteContent: {
            ...state.siteContent,
            cta: { ...state.siteContent.cta, ...patch },
          },
        })),

      updateFooter: (patch) =>
        set((state) => ({
          siteContent: {
            ...state.siteContent,
            footer: { ...state.siteContent.footer, ...patch },
          },
        })),

      updateAgent: (id, patch) =>
        set((state) => {
          const agents = state.siteContent.agents.map((a) =>
            a.id === id ? { ...a, ...patch } : a
          );
          return {
            siteContent: { ...state.siteContent, agents },
          };
        }),

      resetContentToSeed: () =>
        set({ siteContent: cloneContent(SEED_SITE_CONTENT) }),

      // ============ Search actions ============
      setSearchTab: (t) => set({ searchTab: t }),
      setLocation: (v) => set({ location: v }),
      setPropertyType: (v) => set({ propertyType: v }),
      setPriceRange: (v) => set({ priceRange: v }),
      setListingFilter: (f) => set({ listingFilter: f }),

      applySearch: () => {
        const { searchTab } = get();
        set({ listingFilter: searchTab });
      },

      resetFilters: () =>
        set({
          listingFilter: "all",
          location: "",
          propertyType: "any",
          priceRange: "any",
        }),
    }),
    {
      name: "estata-storage",
      // Persist favorites + properties + siteContent so admin edits survive reloads.
      partialize: (state) => ({
        favorites: state.favorites,
        properties: state.properties,
        siteContent: state.siteContent,
      }),
    }
  )
);

// Re-export for convenience
export type { PropertyListing, SupportedState, SiteContent, Agent };
