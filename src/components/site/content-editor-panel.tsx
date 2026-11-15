"use client";

import { useState } from "react";
import {
  RotateCcw,
  Type,
  Layout,
  Phone,
  Eye,
  Sparkles,
  Plus,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useSearchStore } from "@/store/search-store";
import { toast } from "sonner";

/**
 * ContentEditorPanel — page-level mount.
 * Renders nothing visually; the actual editor is shown inline inside the
 * AdminPanel sheet when adminTab === "content". This component exists so
 * page.tsx can mount it without conditional logic.
 */
export function ContentEditorPanel() {
  return null;
}

/** Sub-section accordion — user-friendly collapsible sections */
function Section({
  title,
  icon: Icon,
  description,
  children,
  defaultOpen = false,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-background">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-3 p-4 text-left transition-colors hover:bg-secondary/40"
      >
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-md bg-primary/10 text-primary">
            <Icon className="h-4 w-4" />
          </div>
          <div>
            <div className="font-semibold text-foreground">{title}</div>
            {description && (
              <div className="text-xs text-muted-foreground">{description}</div>
            )}
          </div>
        </div>
        <Badge variant="outline" className="text-xs">
          {open ? "Collapse" : "Expand"}
        </Badge>
      </button>
      {open && (
        <div className="border-t border-border bg-secondary/10 p-4">{children}</div>
      )}
    </div>
  );
}

function Field({
  label,
  children,
  full,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <Label className="text-xs">{label}</Label>
      <div className="mt-1">{children}</div>
    </div>
  );
}

function ImageField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className={label ? "" : ""}>
      {label && <Label className="text-xs">{label}</Label>}
      <div className="mt-1 flex gap-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://..."
          className="flex-1"
        />
        {value && (
          <img
            src={value}
            alt="Preview"
            className="h-9 w-12 shrink-0 rounded border border-border object-cover"
          />
        )}
      </div>
    </div>
  );
}

export function ContentEditorInline() {
  const siteContent = useSearchStore((s) => s.siteContent);
  const updateHero = useSearchStore((s) => s.updateHero);
  const updateStats = useSearchStore((s) => s.updateStats);
  const updateWhyUs = useSearchStore((s) => s.updateWhyUs);
  const updateWhyUsFeature = useSearchStore((s) => s.updateWhyUsFeature);
  const updateCta = useSearchStore((s) => s.updateCta);
  const updateFooter = useSearchStore((s) => s.updateFooter);
  const resetContentToSeed = useSearchStore((s) => s.resetContentToSeed);

  const handleReset = () => {
    if (
      confirm(
        "Reset ALL site content (hero, stats, why-us, CTA, footer, guides) back to defaults?"
      )
    ) {
      resetContentToSeed();
      toast("Content reset", {
        description: "All text and images restored to defaults.",
      });
    }
  };

  return (
    <div className="flex flex-col gap-4 p-6">
      {/* Top action bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-primary/20 bg-primary/5 p-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <div>
            <div className="text-sm font-semibold">
              Edit your website content
            </div>
            <div className="text-xs text-muted-foreground">
              Changes save automatically, but for now they are stored only in
              this browser. Visitors will not see them until the database
              (phase 2) is connected.
            </div>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleReset}
          className="gap-1.5"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset all content
        </Button>
      </div>

      {/* ============ HERO SECTION ============ */}
      <Section
        title="Hero Section (top of homepage)"
        icon={Type}
        description="Headline, subtext, and background image"
        defaultOpen
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label="Trust badge (top-left pill)" full>
            <Input
              value={siteContent.hero.badge}
              onChange={(e) => updateHero({ badge: e.target.value })}
            />
          </Field>
          <Field label="Main headline (H1)" full>
            <Textarea
              value={siteContent.hero.headline}
              onChange={(e) => updateHero({ headline: e.target.value })}
              rows={2}
            />
          </Field>
          <Field label="Subtext paragraph" full>
            <Textarea
              value={siteContent.hero.subline}
              onChange={(e) => updateHero({ subline: e.target.value })}
              rows={3}
            />
          </Field>
          <Field label="Background image URL" full>
            <ImageField
              label=""
              value={siteContent.hero.backgroundImage}
              onChange={(v) => updateHero({ backgroundImage: v })}
            />
          </Field>
        </div>
      </Section>

      {/* ============ STATS ============ */}
      <Section
        title="Stats Bar (4 numbers under hero)"
        icon={Layout}
        description="The 4 stat cards shown in hero + why-us section"
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {siteContent.stats.map((s, i) => (
            <div
              key={i}
              className="grid grid-cols-2 gap-2 rounded-md border border-border p-3"
            >
              <div>
                <Label className="text-xs">Value (e.g. 48K+)</Label>
                <Input
                  value={s.value}
                  onChange={(e) => {
                    const next = [...siteContent.stats];
                    next[i] = { ...next[i], value: e.target.value };
                    updateStats(next);
                  }}
                />
              </div>
              <div>
                <Label className="text-xs">Label</Label>
                <Input
                  value={s.label}
                  onChange={(e) => {
                    const next = [...siteContent.stats];
                    next[i] = { ...next[i], label: e.target.value };
                    updateStats(next);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ============ WHY US ============ */}
      <Section
        title="Why Choose Grace Choi (features grid)"
        icon={Sparkles}
        description="Section heading + 4 feature cards"
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label="Eyebrow (small label above title)">
            <Input
              value={siteContent.whyUs.eyebrow}
              onChange={(e) => updateWhyUs({ eyebrow: e.target.value })}
            />
          </Field>
          <Field label="Section title (H2)">
            <Input
              value={siteContent.whyUs.title}
              onChange={(e) => updateWhyUs({ title: e.target.value })}
            />
          </Field>
          <Field label="Section description" full>
            <Textarea
              value={siteContent.whyUs.description}
              onChange={(e) => updateWhyUs({ description: e.target.value })}
              rows={2}
            />
          </Field>
        </div>
        <Separator className="my-3" />
        <div className="space-y-3">
          {siteContent.whyUs.features.map((f, i) => (
            <div
              key={i}
              className="grid grid-cols-1 gap-2 rounded-md border border-border p-3 sm:grid-cols-2"
            >
              <div className="sm:col-span-2">
                <Label className="text-xs">Feature {i + 1} — Title</Label>
                <Input
                  value={f.title}
                  onChange={(e) =>
                    updateWhyUsFeature(i, { title: e.target.value })
                  }
                />
              </div>
              <div className="sm:col-span-2">
                <Label className="text-xs">Feature {i + 1} — Description</Label>
                <Textarea
                  value={f.description}
                  onChange={(e) =>
                    updateWhyUsFeature(i, { description: e.target.value })
                  }
                  rows={3}
                />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ============ CTA BANNER ============ */}
      <Section
        title="CTA Banner (Ready to sell?)"
        icon={Sparkles}
        description="The red call-to-action banner near the bottom"
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label="Badge text">
            <Input
              value={siteContent.cta.badge}
              onChange={(e) => updateCta({ badge: e.target.value })}
            />
          </Field>
          <Field label="Primary button label">
            <Input
              value={siteContent.cta.primaryButton}
              onChange={(e) => updateCta({ primaryButton: e.target.value })}
            />
          </Field>
          <Field label="Secondary button label">
            <Input
              value={siteContent.cta.secondaryButton}
              onChange={(e) => updateCta({ secondaryButton: e.target.value })}
            />
          </Field>
          <Field label="Section title (H2)" full>
            <Textarea
              value={siteContent.cta.title}
              onChange={(e) => updateCta({ title: e.target.value })}
              rows={2}
            />
          </Field>
          <Field label="Description" full>
            <Textarea
              value={siteContent.cta.description}
              onChange={(e) => updateCta({ description: e.target.value })}
              rows={3}
            />
          </Field>
        </div>
      </Section>

      {/* ============ FOOTER ============ */}
      <Section
        title="Footer"
        icon={Type}
        description="Brand description, email, phone, legal text"
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label="Brand description" full>
            <Textarea
              value={siteContent.footer.brandDescription}
              onChange={(e) => updateFooter({ brandDescription: e.target.value })}
              rows={3}
            />
          </Field>
          <Field label="Email (shown in footer)">
            <Input
              value={siteContent.footer.email}
              onChange={(e) => updateFooter({ email: e.target.value })}
            />
          </Field>
          <Field label="Phone number (shown in header + footer)">
            <Input
              value={siteContent.footer.phone}
              onChange={(e) => updateFooter({ phone: e.target.value })}
            />
          </Field>
          <Field label="Legal / disclaimer text" full>
            <Textarea
              value={siteContent.footer.legalText}
              onChange={(e) => updateFooter({ legalText: e.target.value })}
              rows={2}
            />
          </Field>
        </div>
      </Section>

      {/* ============ GUIDE TAB TOGGLES ============ */}
      <Section
        title="Guide Button Toggles"
        icon={Layout}
        description="Enable/disable guide buttons on the homepage. Disabled buttons show 'Under renovation'."
        defaultOpen
      >
        <GuideTabToggles />
      </Section>

      {/* ============ GUIDE PAGES ============ */}
      <Section
        title="Guide Pages (Seller / Buyer)"
        icon={Type}
        description="Edit content of the Seller and Buyer guide pages"
        defaultOpen
      >
        <GuidePagesEditor />
      </Section>

      <div className="flex items-center gap-2 rounded-lg border border-emerald-600/20 bg-emerald-600/5 p-3 text-sm">
        <Eye className="h-4 w-4 text-emerald-600" />
        <div>
          <strong>Saved in this browser only.</strong>{" "}
          Edits are kept across reloads on this device, but are not yet
          published to visitors.
        </div>
      </div>
    </div>
  );
}

// ============ Guide Pages Editor ============
const GUIDE_SLUGS = [
  { slug: "sell", label: "Seller Guide (/sell)" },
  { slug: "buy", label: "Buyer Guide (/buy)" },
];

function GuidePagesEditor() {
  const guides = useSearchStore((s) => s.siteContent.guides);
  const updateGuide = useSearchStore((s) => s.updateGuide);
  const updateGuideSection = useSearchStore((s) => s.updateGuideSection);
  const addGuideSection = useSearchStore((s) => s.addGuideSection);
  const deleteGuideSection = useSearchStore((s) => s.deleteGuideSection);
  const [activeSlug, setActiveSlug] = useState<string>("sell");

  const guide = guides[activeSlug];

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-xs">Select guide page to edit</Label>
        <Select value={activeSlug} onValueChange={setActiveSlug}>
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {GUIDE_SLUGS.map((g) => (
              <SelectItem key={g.slug} value={g.slug}>
                {g.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {guide && (
        <>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 rounded-md border border-border p-3 bg-background">
            <div className="sm:col-span-2">
              <Label className="text-xs">Eyebrow (small label above title)</Label>
              <Input
                value={guide.eyebrow}
                onChange={(e) =>
                  updateGuide(activeSlug, { eyebrow: e.target.value })
                }
              />
            </div>
            <div className="sm:col-span-2">
              <Label className="text-xs">Page title (H1)</Label>
              <Input
                value={guide.title}
                onChange={(e) =>
                  updateGuide(activeSlug, { title: e.target.value })
                }
              />
            </div>
            <div className="sm:col-span-2">
              <Label className="text-xs">Intro paragraph</Label>
              <Textarea
                value={guide.intro}
                onChange={(e) =>
                  updateGuide(activeSlug, { intro: e.target.value })
                }
                rows={3}
              />
            </div>
            <div className="sm:col-span-2">
              <Label className="text-xs">Hero image URL</Label>
              <div className="mt-1 flex gap-2">
                <Input
                  value={guide.heroImage}
                  onChange={(e) =>
                    updateGuide(activeSlug, { heroImage: e.target.value })
                  }
                  placeholder="https://..."
                  className="flex-1"
                />
                {guide.heroImage && (
                  <img
                    src={guide.heroImage}
                    alt="Preview"
                    className="h-9 w-12 shrink-0 rounded border border-border object-cover"
                  />
                )}
              </div>
            </div>
            <div>
              <Label className="text-xs">CTA title</Label>
              <Input
                value={guide.ctaTitle}
                onChange={(e) =>
                  updateGuide(activeSlug, { ctaTitle: e.target.value })
                }
              />
            </div>
            <div>
              <Label className="text-xs">CTA description</Label>
              <Input
                value={guide.ctaDescription}
                onChange={(e) =>
                  updateGuide(activeSlug, { ctaDescription: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-xs font-semibold">
                Sections ({guide.sections.length})
              </Label>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  addGuideSection(activeSlug, {
                    title: "New Section",
                    body: "Section content...",
                    bullets: [],
                  });
                  toast.success("Section added");
                }}
              >
                <Plus className="mr-1 h-3 w-3" />
                Add Section
              </Button>
            </div>
            {guide.sections.length === 0 ? (
              <div className="rounded-md border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
                No sections yet. Add one above — these will appear on the
                guide page as numbered cards.
              </div>
            ) : (
              <div className="space-y-3">
                {guide.sections.map((section) => (
                  <div
                    key={section.id}
                    className="rounded-md border border-border p-3 bg-background space-y-2"
                  >
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-[10px]">
                        ID: {section.id}
                      </Badge>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="ml-auto h-6 w-6 p-0 text-destructive hover:bg-destructive/10"
                        onClick={() => {
                          deleteGuideSection(activeSlug, section.id);
                          toast.success("Section deleted");
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                    <div>
                      <Label className="text-xs">Section title</Label>
                      <Input
                        value={section.title}
                        onChange={(e) =>
                          updateGuideSection(activeSlug, section.id, {
                            title: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Body</Label>
                      <Textarea
                        value={section.body}
                        onChange={(e) =>
                          updateGuideSection(activeSlug, section.id, {
                            body: e.target.value,
                          })
                        }
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label className="text-xs">
                        Bullets (one per line)
                      </Label>
                      <Textarea
                        value={(section.bullets || []).join("\n")}
                        onChange={(e) =>
                          updateGuideSection(activeSlug, section.id, {
                            bullets: e.target.value
                              .split("\n")
                              .map((s) => s.trim())
                              .filter(Boolean),
                          })
                        }
                        rows={4}
                        placeholder="One bullet per line"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

// ============ Guide Tab Toggle Component ============
function GuideTabToggles() {
  const guideTabEnabled = useSearchStore((s) => s.guideTabEnabled);
  const toggleGuideTab = useSearchStore((s) => s.toggleGuideTab);

  const tabs = [
    { slug: "sell", label: "Seller Guide" },
    { slug: "buy", label: "Buyer Guide" },
    { slug: "town-school-info", label: "Town/School Info" },
  ];

  return (
    <div className="space-y-2">
      <p className="text-xs text-muted-foreground mb-3">
        Toggle each guide button on/off. When disabled, the button is grayed out
        with a red &quot;Under renovation&quot; label on the homepage.
      </p>
      {tabs.map((tab) => {
        const enabled = guideTabEnabled[tab.slug] !== false;
        return (
          <div
            key={tab.slug}
            className="flex items-center justify-between rounded-md border border-border bg-background px-3 py-2"
          >
            <span className={`text-sm font-medium ${enabled ? "text-foreground" : "text-muted-foreground"}`}>
              {tab.label}
            </span>
            <button
              type="button"
              onClick={() => {
                toggleGuideTab(tab.slug);
                toast(
                  enabled ? "Button disabled — shows 'Under renovation'" : "Button enabled",
                  { description: tab.label }
                );
              }}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                enabled ? "bg-primary" : "bg-muted"
              }`}
              aria-label={`Toggle ${tab.label}`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  enabled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        );
      })}
    </div>
  );
}
