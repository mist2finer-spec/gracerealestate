import {
  SEED_SITE_CONTENT,
  SiteContent,
  GuidePageContent,
  GuideSectionContent,
  cloneContent,
} from "@/lib/data";

/** Everything the admin can publish, stored as one JSON document. */
export interface PublishedContent {
  siteContent: SiteContent;
  guideTabEnabled: Record<string, boolean>;
}

export const GUIDE_TAB_SLUGS = ["sell", "buy", "town-school-info"] as const;

export function defaultContent(): PublishedContent {
  return {
    siteContent: cloneContent(SEED_SITE_CONTENT),
    guideTabEnabled: Object.fromEntries(GUIDE_TAB_SLUGS.map((s) => [s, true])),
  };
}

/** Upper bound on a published document, to keep the DB row sane. */
export const MAX_CONTENT_BYTES = 512 * 1024;
const MAX_TEXT = 20_000;

type Obj = Record<string, unknown>;
const isObj = (v: unknown): v is Obj =>
  typeof v === "object" && v !== null && !Array.isArray(v);

function str(v: unknown, fallback: string): string {
  return typeof v === "string" ? v.slice(0, MAX_TEXT) : fallback;
}

/** Copy only known string fields from `input`, falling back to `seed`. */
function strings<T extends object>(input: unknown, seed: T): T {
  const src = isObj(input) ? input : {};
  const out = { ...seed } as Record<string, unknown>;
  for (const [k, v] of Object.entries(seed)) {
    if (typeof v === "string") out[k] = str(src[k], v);
  }
  return out as T;
}

function section(input: unknown, i: number): GuideSectionContent | null {
  if (!isObj(input)) return null;
  const bullets = Array.isArray(input.bullets)
    ? input.bullets.filter((b): b is string => typeof b === "string").map((b) => b.slice(0, MAX_TEXT))
    : undefined;
  return {
    id: str(input.id, `s_${i}`) || `s_${i}`,
    title: str(input.title, ""),
    body: str(input.body, ""),
    ...(bullets ? { bullets } : {}),
  };
}

function guide(input: unknown, seed: GuidePageContent): GuidePageContent {
  const base = strings(input, { ...seed, sections: undefined } as unknown as GuidePageContent);
  const raw = isObj(input) && Array.isArray(input.sections) ? input.sections : null;
  const sections = raw
    ? raw.map(section).filter((s): s is GuideSectionContent => s !== null)
    : seed.sections;
  return { ...base, sections };
}

/**
 * Turn untrusted JSON (from the DB or an admin request) into a well-formed
 * PublishedContent. Unknown keys are dropped; missing keys fall back to the
 * defaults, so adding a new field later never breaks old rows.
 */
export function normalizeContent(input: unknown): PublishedContent {
  const seed = defaultContent();
  const root = isObj(input) ? input : {};
  const sc = isObj(root.siteContent) ? root.siteContent : {};
  const s = seed.siteContent;

  const stats = Array.isArray(sc.stats)
    ? sc.stats
        .filter(isObj)
        .slice(0, 8)
        .map((x) => ({ value: str(x.value, ""), label: str(x.label, "") }))
    : s.stats;

  const whyUsIn = isObj(sc.whyUs) ? sc.whyUs : {};
  const features = Array.isArray(whyUsIn.features)
    ? whyUsIn.features
        .filter(isObj)
        .slice(0, 8)
        .map((f) => ({ title: str(f.title, ""), description: str(f.description, "") }))
    : s.whyUs.features;

  const guidesIn = isObj(sc.guides) ? sc.guides : {};
  const guides: Record<string, GuidePageContent> = {};
  for (const [slug, g] of Object.entries(s.guides)) {
    guides[slug] = guide(guidesIn[slug], g);
  }

  const tabsIn = isObj(root.guideTabEnabled) ? root.guideTabEnabled : {};
  const guideTabEnabled: Record<string, boolean> = {};
  for (const slug of GUIDE_TAB_SLUGS) {
    guideTabEnabled[slug] = typeof tabsIn[slug] === "boolean" ? (tabsIn[slug] as boolean) : true;
  }

  return {
    siteContent: {
      hero: strings(sc.hero, s.hero),
      stats,
      whyUs: { ...strings(whyUsIn, { ...s.whyUs, features: undefined } as unknown as typeof s.whyUs), features },
      cta: strings(sc.cta, s.cta),
      footer: strings(sc.footer, s.footer),
      guides,
    },
    guideTabEnabled,
  };
}
