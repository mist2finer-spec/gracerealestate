"use client";

import { create } from "zustand";
import {
  SiteContent,
  GuidePageContent,
  GuideSectionContent,
  SEED_SITE_CONTENT,
  cloneContent,
} from "@/lib/data";
import {
  PublishedContent,
  GUIDE_TAB_SLUGS,
  defaultContent,
} from "@/lib/content-schema";

// Site content flow:
//   server (DB) --hydrate()--> store --admin edits--> draft (dirty)
//   --publish()--> PUT /api/admin/content --> DB --> all visitors.
// The public site renders `siteContent` / `guideTabEnabled`, so while an
// admin is editing they see a live preview of the unpublished draft.

export { GUIDE_TAB_SLUGS };

type Result = { ok: true } | { ok: false; error: string };

interface SiteState {
  // ============ Content (draft shown on screen) ============
  siteContent: SiteContent;
  guideTabEnabled: Record<string, boolean>;
  /** Last content known to be published on the server. */
  published: PublishedContent;
  hydrated: boolean;
  dirty: boolean;
  saving: boolean;
  lastPublishedAt: string | null;
  hydrate: (content: PublishedContent) => void;
  publish: () => Promise<Result>;
  discardChanges: () => void;
  restoreRevision: (id: number) => Promise<Result>;

  // ============ UI ============
  inquiryOpen: boolean;
  setInquiryOpen: (open: boolean) => void;
  openInquiry: () => void;
  mobileNavOpen: boolean;
  setMobileNavOpen: (open: boolean) => void;
  adminOpen: boolean;
  setAdminOpen: (open: boolean) => void;

  // ============ Admin auth (httpOnly cookie, checked by the server) ============
  isAdmin: boolean;
  databaseConfigured: boolean;
  checkSession: () => Promise<void>;
  login: (password: string) => Promise<boolean>;
  logout: () => Promise<void>;

  // ============ Content editing (admin) ============
  toggleGuideTab: (slug: string) => void;
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

const initial = defaultContent();

export const useSearchStore = create<SiteState>()((set, get) => {
  /** Apply an edit to the draft content and mark it unpublished. */
  const edit = (fn: (c: SiteContent) => SiteContent) =>
    set((state) => ({ siteContent: fn(state.siteContent), dirty: true }));

  const editGuide = (slug: string, fn: (g: GuidePageContent) => GuidePageContent) =>
    edit((c) => {
      const g = c.guides[slug];
      return g ? { ...c, guides: { ...c.guides, [slug]: fn(g) } } : c;
    });

  const applyPublished = (content: PublishedContent, publishedAt: string) =>
    set({
      siteContent: cloneContent(content.siteContent),
      guideTabEnabled: { ...content.guideTabEnabled },
      published: content,
      dirty: false,
      lastPublishedAt: publishedAt,
    });

  return {
    siteContent: initial.siteContent,
    guideTabEnabled: initial.guideTabEnabled,
    published: initial,
    hydrated: false,
    dirty: false,
    saving: false,
    lastPublishedAt: null,

    hydrate: (content) =>
      set({
        siteContent: cloneContent(content.siteContent),
        guideTabEnabled: { ...content.guideTabEnabled },
        published: content,
        hydrated: true,
        dirty: false,
      }),

    publish: async () => {
      const { siteContent, guideTabEnabled } = get();
      set({ saving: true });
      try {
        const res = await fetch("/api/admin/content", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ siteContent, guideTabEnabled }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data.ok) {
          if (res.status === 401) set({ isAdmin: false });
          return { ok: false, error: data.error ?? `Save failed (${res.status})` };
        }
        applyPublished(data.content, data.publishedAt);
        return { ok: true };
      } catch {
        return { ok: false, error: "Network error — check your connection." };
      } finally {
        set({ saving: false });
      }
    },

    discardChanges: () => {
      const { published } = get();
      set({
        siteContent: cloneContent(published.siteContent),
        guideTabEnabled: { ...published.guideTabEnabled },
        dirty: false,
      });
    },

    restoreRevision: async (id) => {
      set({ saving: true });
      try {
        const res = await fetch("/api/admin/revisions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data.ok) {
          return { ok: false, error: data.error ?? `Restore failed (${res.status})` };
        }
        applyPublished(data.content, data.publishedAt);
        return { ok: true };
      } catch {
        return { ok: false, error: "Network error — check your connection." };
      } finally {
        set({ saving: false });
      }
    },

    // ============ UI ============
    inquiryOpen: false,
    setInquiryOpen: (open) => set({ inquiryOpen: open }),
    openInquiry: () => set({ inquiryOpen: true }),
    mobileNavOpen: false,
    setMobileNavOpen: (open) => set({ mobileNavOpen: open }),
    adminOpen: false,
    setAdminOpen: (open) => set({ adminOpen: open }),

    // ============ Admin auth ============
    isAdmin: false,
    databaseConfigured: true,

    checkSession: async () => {
      try {
        const res = await fetch("/api/admin/session", { cache: "no-store" });
        const data = await res.json();
        set({ isAdmin: Boolean(data.isAdmin), databaseConfigured: Boolean(data.databaseConfigured) });
      } catch {
        /* offline — keep current state */
      }
    },

    login: async (password) => {
      try {
        const res = await fetch("/api/admin/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        });
        if (!res.ok) return false;
        set({ isAdmin: true });
        await get().checkSession();
        return true;
      } catch {
        return false;
      }
    },

    logout: async () => {
      try {
        await fetch("/api/admin/logout", { method: "POST" });
      } finally {
        get().discardChanges();
        set({ isAdmin: false, adminOpen: false });
      }
    },

    // ============ Content editing ============
    toggleGuideTab: (slug) =>
      set((state) => ({
        guideTabEnabled: {
          ...state.guideTabEnabled,
          [slug]: !(state.guideTabEnabled[slug] !== false),
        },
        dirty: true,
      })),

    updateHero: (patch) => edit((c) => ({ ...c, hero: { ...c.hero, ...patch } })),
    updateStats: (stats) => edit((c) => ({ ...c, stats })),
    updateWhyUs: (patch) => edit((c) => ({ ...c, whyUs: { ...c.whyUs, ...patch } })),
    updateWhyUsFeature: (index, patch) =>
      edit((c) => {
        const features = [...c.whyUs.features];
        if (features[index]) features[index] = { ...features[index], ...patch };
        return { ...c, whyUs: { ...c.whyUs, features } };
      }),
    updateCta: (patch) => edit((c) => ({ ...c, cta: { ...c.cta, ...patch } })),
    updateFooter: (patch) => edit((c) => ({ ...c, footer: { ...c.footer, ...patch } })),

    updateGuide: (slug, patch) => editGuide(slug, (g) => ({ ...g, ...patch })),
    updateGuideSection: (slug, sectionId, patch) =>
      editGuide(slug, (g) => ({
        ...g,
        sections: g.sections.map((s) => (s.id === sectionId ? { ...s, ...patch } : s)),
      })),
    addGuideSection: (slug, section) =>
      editGuide(slug, (g) => ({
        ...g,
        sections: [...g.sections, { ...section, id: genId("s") }],
      })),
    deleteGuideSection: (slug, sectionId) =>
      editGuide(slug, (g) => ({
        ...g,
        sections: g.sections.filter((s) => s.id !== sectionId),
      })),

    resetContentToSeed: () => edit(() => cloneContent(SEED_SITE_CONTENT)),
  };
});

export type { SiteContent, GuidePageContent, GuideSectionContent, PublishedContent };
