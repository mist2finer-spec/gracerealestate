"use client";

import { useState } from "react";
import {
  Image as ImageIcon,
  RotateCcw,
  Save,
  Type,
  Layout,
  Phone,
  Mail,
  Star,
  Calendar,
  Clock,
  Eye,
  Sparkles,
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
  const updateCategories = useSearchStore((s) => s.updateCategories);
  const updateWhyUs = useSearchStore((s) => s.updateWhyUs);
  const updateWhyUsFeature = useSearchStore((s) => s.updateWhyUsFeature);
  const updateAgentSection = useSearchStore((s) => s.updateAgentSection);
  const updateAgent = useSearchStore((s) => s.updateAgent);
  const updateInsights = useSearchStore((s) => s.updateInsights);
  const updateInsightArticle = useSearchStore((s) => s.updateInsightArticle);
  const updateCta = useSearchStore((s) => s.updateCta);
  const updateFooter = useSearchStore((s) => s.updateFooter);
  const resetContentToSeed = useSearchStore((s) => s.resetContentToSeed);

  const handleReset = () => {
    if (
      confirm(
        "Reset ALL site content (hero, stats, categories, agents, insights, CTA, footer) back to defaults? Your custom listings will be preserved."
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
              All changes save automatically and appear instantly on the live
              site. Edits persist in your browser.
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
        description="Headline, subtext, background image, and trust badges"
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
          <Field label="Trust badge 1 (with checkmark icon)">
            <Input
              value={siteContent.hero.trustBadge1}
              onChange={(e) => updateHero({ trustBadge1: e.target.value })}
            />
          </Field>
          <Field label="Trust badge 2 (with users icon)">
            <Input
              value={siteContent.hero.trustBadge2}
              onChange={(e) => updateHero({ trustBadge2: e.target.value })}
            />
          </Field>
          <Field label="Trust badge 3 (with chart icon)">
            <Input
              value={siteContent.hero.trustBadge3}
              onChange={(e) => updateHero({ trustBadge3: e.target.value })}
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

      {/* ============ CATEGORIES ============ */}
      <Section
        title="Browse by Category (4 cards)"
        icon={Layout}
        description="Labels, counts, descriptions, and images for each category"
      >
        <div className="space-y-3">
          {siteContent.categories.map((cat, i) => (
            <div
              key={cat.key}
              className="grid grid-cols-1 gap-2 rounded-md border border-border p-3 sm:grid-cols-2"
            >
              <div>
                <Label className="text-xs">Label</Label>
                <Input
                  value={cat.label}
                  onChange={(e) => {
                    const next = [...siteContent.categories];
                    next[i] = { ...next[i], label: e.target.value };
                    updateCategories(next);
                  }}
                />
              </div>
              <div>
                <Label className="text-xs">Count text</Label>
                <Input
                  value={cat.count}
                  onChange={(e) => {
                    const next = [...siteContent.categories];
                    next[i] = { ...next[i], count: e.target.value };
                    updateCategories(next);
                  }}
                />
              </div>
              <div className="sm:col-span-2">
                <Label className="text-xs">Description</Label>
                <Input
                  value={cat.description}
                  onChange={(e) => {
                    const next = [...siteContent.categories];
                    next[i] = { ...next[i], description: e.target.value };
                    updateCategories(next);
                  }}
                />
              </div>
              <div className="sm:col-span-2">
                <ImageField
                  label="Category image URL"
                  value={cat.image}
                  onChange={(v) => {
                    const next = [...siteContent.categories];
                    next[i] = { ...next[i], image: v };
                    updateCategories(next);
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

      {/* ============ AGENTS ============ */}
      <Section
        title="Agents (4 agent cards)"
        icon={Star}
        description="Names, titles, phones, emails, photos, specialties"
      >
        <div className="space-y-3">
          {siteContent.agents.map((agent) => (
            <div
              key={agent.id}
              className="grid grid-cols-1 gap-2 rounded-md border border-border p-3 sm:grid-cols-2"
            >
              <div className="flex items-center gap-2 sm:col-span-2">
                <img
                  src={agent.image}
                  alt={agent.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="font-semibold">{agent.name}</div>
              </div>
              <div>
                <Label className="text-xs">Name</Label>
                <Input
                  value={agent.name}
                  onChange={(e) =>
                    updateAgent(agent.id, { name: e.target.value })
                  }
                />
              </div>
              <div>
                <Label className="text-xs">Title</Label>
                <Input
                  value={agent.title}
                  onChange={(e) =>
                    updateAgent(agent.id, { title: e.target.value })
                  }
                />
              </div>
              <div>
                <Label className="text-xs">
                  <Phone className="inline h-3 w-3" /> Phone
                </Label>
                <Input
                  value={agent.phone}
                  onChange={(e) =>
                    updateAgent(agent.id, { phone: e.target.value })
                  }
                />
              </div>
              <div>
                <Label className="text-xs">
                  <Mail className="inline h-3 w-3" /> Email
                </Label>
                <Input
                  value={agent.email}
                  onChange={(e) =>
                    updateAgent(agent.id, { email: e.target.value })
                  }
                />
              </div>
              <div>
                <Label className="text-xs">Office location</Label>
                <Input
                  value={agent.office}
                  onChange={(e) =>
                    updateAgent(agent.id, { office: e.target.value })
                  }
                />
              </div>
              <div>
                <Label className="text-xs">Rating (1-5)</Label>
                <Input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={agent.rating}
                  onChange={(e) =>
                    updateAgent(agent.id, { rating: Number(e.target.value) })
                  }
                />
              </div>
              <div>
                <Label className="text-xs">Sales count</Label>
                <Input
                  type="number"
                  min="0"
                  value={agent.sales}
                  onChange={(e) =>
                    updateAgent(agent.id, { sales: Number(e.target.value) })
                  }
                />
              </div>
              <div className="sm:col-span-2">
                <Label className="text-xs">
                  Specialties (comma-separated)
                </Label>
                <Input
                  value={agent.specialties.join(", ")}
                  onChange={(e) =>
                    updateAgent(agent.id, {
                      specialties: e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                />
              </div>
              <div className="sm:col-span-2">
                <ImageField
                  label="Agent photo URL"
                  value={agent.image}
                  onChange={(v) => updateAgent(agent.id, { image: v })}
                />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ============ AGENT SECTION HEADER ============ */}
      <Section
        title="Find an Agent — section header"
        icon={Type}
        description="The heading above the agent cards"
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label="Eyebrow">
            <Input
              value={siteContent.agentSection.eyebrow}
              onChange={(e) =>
                updateAgentSection({ eyebrow: e.target.value })
              }
            />
          </Field>
          <Field label="Browse-all button label">
            <Input
              value={siteContent.agentSection.browseAllButton}
              onChange={(e) =>
                updateAgentSection({ browseAllButton: e.target.value })
              }
            />
          </Field>
          <Field label="Section title" full>
            <Input
              value={siteContent.agentSection.title}
              onChange={(e) =>
                updateAgentSection({ title: e.target.value })
              }
            />
          </Field>
          <Field label="Section description" full>
            <Textarea
              value={siteContent.agentSection.description}
              onChange={(e) =>
                updateAgentSection({ description: e.target.value })
              }
              rows={2}
            />
          </Field>
        </div>
      </Section>

      {/* ============ INSIGHTS ============ */}
      <Section
        title="Market Insights (3 article cards)"
        icon={Calendar}
        description="Section header + 3 article cards"
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label="Eyebrow">
            <Input
              value={siteContent.insights.eyebrow}
              onChange={(e) => updateInsights({ eyebrow: e.target.value })}
            />
          </Field>
          <Field label="All articles button">
            <Input
              value={siteContent.insights.allArticlesButton}
              onChange={(e) =>
                updateInsights({ allArticlesButton: e.target.value })
              }
            />
          </Field>
          <Field label="Section title" full>
            <Input
              value={siteContent.insights.title}
              onChange={(e) => updateInsights({ title: e.target.value })}
            />
          </Field>
          <Field label="Section description" full>
            <Textarea
              value={siteContent.insights.description}
              onChange={(e) =>
                updateInsights({ description: e.target.value })
              }
              rows={2}
            />
          </Field>
        </div>
        <Separator className="my-3" />
        <div className="space-y-3">
          {siteContent.insights.articles.map((article) => (
            <div
              key={article.id}
              className="grid grid-cols-1 gap-2 rounded-md border border-border p-3 sm:grid-cols-2"
            >
              <div className="sm:col-span-2 flex items-center gap-2">
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-10 w-14 rounded object-cover"
                />
                <Badge variant="outline" className="text-xs">
                  {article.category}
                </Badge>
              </div>
              <div className="sm:col-span-2">
                <Label className="text-xs">Title</Label>
                <Input
                  value={article.title}
                  onChange={(e) =>
                    updateInsightArticle(article.id, {
                      title: e.target.value,
                    })
                  }
                />
              </div>
              <div className="sm:col-span-2">
                <Label className="text-xs">Excerpt</Label>
                <Textarea
                  value={article.excerpt}
                  onChange={(e) =>
                    updateInsightArticle(article.id, {
                      excerpt: e.target.value,
                    })
                  }
                  rows={2}
                />
              </div>
              <div>
                <Label className="text-xs">
                  <Calendar className="inline h-3 w-3" /> Date
                </Label>
                <Input
                  value={article.date}
                  onChange={(e) =>
                    updateInsightArticle(article.id, { date: e.target.value })
                  }
                />
              </div>
              <div>
                <Label className="text-xs">
                  <Clock className="inline h-3 w-3" /> Read time
                </Label>
                <Input
                  value={article.readTime}
                  onChange={(e) =>
                    updateInsightArticle(article.id, {
                      readTime: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label className="text-xs">Category</Label>
                <Select
                  value={article.category}
                  onValueChange={(v) =>
                    updateInsightArticle(article.id, {
                      category: v as
                        | "Market Trends"
                        | "Buyer Tips"
                        | "Seller Tips"
                        | "Financing",
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Market Trends">Market Trends</SelectItem>
                    <SelectItem value="Buyer Tips">Buyer Tips</SelectItem>
                    <SelectItem value="Seller Tips">Seller Tips</SelectItem>
                    <SelectItem value="Financing">Financing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="sm:col-span-2">
                <ImageField
                  label="Article image URL"
                  value={article.image}
                  onChange={(v) =>
                    updateInsightArticle(article.id, { image: v })
                  }
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
          <Separator className="my-2 sm:col-span-2" />
          <Field label="Big stat — Value">
            <Input
              value={siteContent.cta.statValue}
              onChange={(e) => updateCta({ statValue: e.target.value })}
            />
          </Field>
          <Field label="Big stat — Label">
            <Input
              value={siteContent.cta.statLabel}
              onChange={(e) => updateCta({ statLabel: e.target.value })}
            />
          </Field>
          <Field label="Sub-stat 1 — Value">
            <Input
              value={siteContent.cta.subStat1Value}
              onChange={(e) => updateCta({ subStat1Value: e.target.value })}
            />
          </Field>
          <Field label="Sub-stat 1 — Label">
            <Input
              value={siteContent.cta.subStat1Label}
              onChange={(e) => updateCta({ subStat1Label: e.target.value })}
            />
          </Field>
          <Field label="Sub-stat 2 — Value">
            <Input
              value={siteContent.cta.subStat2Value}
              onChange={(e) => updateCta({ subStat2Value: e.target.value })}
            />
          </Field>
          <Field label="Sub-stat 2 — Label">
            <Input
              value={siteContent.cta.subStat2Label}
              onChange={(e) => updateCta({ subStat2Label: e.target.value })}
            />
          </Field>
        </div>
      </Section>

      {/* ============ FOOTER ============ */}
      <Section
        title="Footer"
        icon={Type}
        description="Brand description, newsletter text, phone, legal text"
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label="Brand description" full>
            <Textarea
              value={siteContent.footer.brandDescription}
              onChange={(e) => updateFooter({ brandDescription: e.target.value })}
              rows={3}
            />
          </Field>
          <Field label="Newsletter title">
            <Input
              value={siteContent.footer.newsletterTitle}
              onChange={(e) =>
                updateFooter({ newsletterTitle: e.target.value })
              }
            />
          </Field>
          <Field label="Newsletter subtitle">
            <Input
              value={siteContent.footer.newsletterSubtitle}
              onChange={(e) =>
                updateFooter({ newsletterSubtitle: e.target.value })
              }
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

      <div className="flex items-center gap-2 rounded-lg border border-emerald-600/20 bg-emerald-600/5 p-3 text-sm">
        <Eye className="h-4 w-4 text-emerald-600" />
        <div>
          <strong>All changes are saved automatically.</strong>{" "}
          Close this panel to view the live site. Edits persist across reloads
          (stored in your browser).
        </div>
      </div>
    </div>
  );
}
