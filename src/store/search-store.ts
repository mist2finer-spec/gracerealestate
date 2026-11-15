"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  SEED_SITE_CONTENT,
  SiteContent,
  GuidePageContent,
  GuideSectionContent,
  cloneContent,
} from "@/lib/data";

// NOTE (phase 1): site content edits are persisted to this browser's
// localStorage only. Visitors still see SEED_SITE_CONTENT until the
// database-backed content API (phase 2) replaces this.
const ADMIN_SESSION_KEY = "grace-admin-session";

export const GUIDE_TAB_SLUGS = ["sell", "buy", "town-school-info"] as const;

interface SiteState {
  // Site content — all editable text + images on the public site
  siteContent: SiteContent;

  // Guide tab enable/disable state (admin toggle)
  guideTabEnabled: Record<string, boolean>;
  toggleGuideTab: (slug: string) => void;

  // ============ Inquiry form state ============
  inquiryOpen: boolean;
  setInquiryOpen: (open: boolean) => void;
  openInquiry: () => void;

  // Mobile nav
  mobileNavOpen: boolean;
  setMobileNavOpen: (open: boolean) => void;

  // Admin panel
  adminOpen: boolean;
  setAdminOpen: (open: boolean) => void;

  // ============ Admin auth ============
  // The password is verified server-side by /api/admin/login.
  isAdmin: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;

  // ============ Site content editing (admin) ============
  updateHero: (patch: Partial<SiteContent["hero"]>) => void;
  updateStats: (stats: SiteContent["stats"]) => void;
  updateWhyUs: (patch: Partial<SiteContent["whyUs"]>) => void;
  updateWhyUsFeature: (
    index: number,
    patch: Partial<SiteContent["whyUs"]["features"][0]>
  ) => void;
  updateCta: (patch: Partial<SiteContent["cta"]>) => void;
  updateFooter: (patch: Partial<SiteContent["footer"]>) => void;
  updateGuide: (slug: string, patch: Partial<GuidePageContent>) => void;
  updateGuideSection: (
    slug: string,
    sectionId: string,
    patch: Partial<GuideSectionContent>
  ) => void;
  addGuideSection: (slug: string, section: Omit<GuideSectionContent, "id">) => void;
  deleteGuideSection: (slug: string, sectionId: string) => void;
  resetContentToSeed: () => void;
}

function genId(prefix: string) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
}

export const useSearchStore = create<SiteState>()(
  persist(
    (set) => ({
      siteContent: cloneContent(SEED_SITE_CONTENT),

      guideTabEnabled: Object.fromEntries(GUIDE_TAB_SLUGS.map((s) => [s, true])),
      toggleGuideTab: (slug) =>
        set((state) => ({
          guideTabEnabled: {
            ...state.guideTabEnabled,
            [slug]: !(state.guideTabEnabled[slug] !== false),
          },
        })),

      inquiryOpen: false,
      setInquiryOpen: (open) => set({ inquiryOpen: open }),
      openInquiry: () => set({ inquiryOpen: true }),

      mobileNavOpen: false,
      setMobileNavOpen: (open) => set({ mobileNavOpen: open }),

      adminOpen: false,
      setAdminOpen: (open) => set({ adminOpen: open }),

      // ============ Admin auth ============
      isAdmin:
        typeof window !== "undefined" &&
        sessionStorage.getItem(ADMIN_SESSION_KEY) === "1",

      login: async (password) => {
        try {
          const res = await fetch("/api/admin/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password }),
          });
          if (!res.ok) return false;
          sessionStorage.setItem(ADMIN_SESSION_KEY, "1");
          set({ isAdmin: true });
          return true;
        } catch {
          return false;
        }
      },

      logout: () => {
        if (typeof window !== "undefined") {
          sessionStorage.removeItem(ADMIN_SESSION_KEY);
        }
        set({ isAdmin: false, adminOpen: false });
      },

      // ============ Site content editing ============
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

      // ============ Guide page editing ============
      updateGuide: (slug, patch) =>
        set((state) => ({
          siteContent: {
            ...state.siteContent,
            guides: {
              ...state.siteContent.guides,
              [slug]: { ...state.siteContent.guides[slug], ...patch },
            },
          },
        })),

      updateGuideSection: (slug, sectionId, patch) =>
        set((state) => {
          const guide = state.siteContent.guides[slug];
          if (!guide) return state;
          const sections = guide.sections.map((s) =>
            s.id === sectionId ? { ...s, ...patch } : s
          );
          return {
            siteContent: {
              ...state.siteContent,
              guides: { ...state.siteContent.guides, [slug]: { ...guide, sections } },
            },
          };
        }),

      addGuideSection: (slug, section) =>
        set((state) => {
          const guide = state.siteContent.guides[slug];
          if (!guide) return state;
          const newSection: GuideSectionContent = { ...section, id: genId("s") };
          return {
            siteContent: {
              ...state.siteContent,
              guides: {
                ...state.siteContent.guides,
                [slug]: { ...guide, sections: [...guide.sections, newSection] },
              },
            },
          };
        }),

      deleteGuideSection: (slug, sectionId) =>
        set((state) => {
          const guide = state.siteContent.guides[slug];
          if (!guide) return state;
          return {
            siteContent: {
              ...state.siteContent,
              guides: {
                ...state.siteContent.guides,
                [slug]: {
                  ...guide,
                  sections: guide.sections.filter((s) => s.id !== sectionId),
                },
              },
            },
          };
        }),

      resetContentToSeed: () =>
        set({ siteContent: cloneContent(SEED_SITE_CONTENT) }),
    }),
    {
      // v5: content model trimmed (listings, agents, insights, categories
      // removed). A new key discards the old v4 cache so stale demo content
      // does not come back.
      name: "grace-choi-storage-v5",
      partialize: (state) => ({
        siteContent: state.siteContent,
        guideTabEnabled: state.guideTabEnabled,
      }),
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<SiteState>;
        const seed = current.siteContent;
        const saved = p.siteContent;
        // Merge section by section so newly added fields always exist.
        const siteContent: SiteContent = saved
          ? {
              hero: { ...seed.hero, ...saved.hero },
              stats: saved.stats ?? seed.stats,
              whyUs: { ...seed.whyUs, ...saved.whyUs },
              cta: { ...seed.cta, ...saved.cta },
              footer: { ...seed.footer, ...saved.footer },
              guides: { ...seed.guides, ...saved.guides },
            }
          : seed;
        return {
          ...current,
          guideTabEnabled: { ...current.guideTabEnabled, ...p.guideTabEnabled },
          siteContent,
        };
      },
    }
  )
);

export type { SiteContent, GuidePageContent, GuideSectionContent };
