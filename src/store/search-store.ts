"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  SEED_PROPERTIES,
  PropertyListing,
  SupportedState,
  isValidState,
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

  // ============ Admin auth ============
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;

  // ============ Property CRUD (admin) ============
  addProperty: (p: Omit<PropertyListing, "id">) => string;
  updateProperty: (id: string, patch: Partial<PropertyListing>) => void;
  deleteProperty: (id: string) => void;
  resetToSeed: () => void;

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

      // ============ Admin auth ============
      // Read once from sessionStorage so reloads keep the session,
      // but new browser sessions require fresh login.
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
        // Enforce NY/NJ only
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
      // Only persist favorites + properties + adminOpen. Skip isAdmin (use sessionStorage).
      partialize: (state) => ({
        favorites: state.favorites,
        properties: state.properties,
      }),
    }
  )
);

// Re-export for convenience
export type { PropertyListing, SupportedState };
