"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Facebook,
  Instagram,
  Linkedin,
  Send,
  Twitter,
  Youtube,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchStore } from "@/store/search-store";
import { toast } from "sonner";

const COLUMNS: { title: string; links: string[] }[] = [
  {
    title: "Buy",
    links: ["Homes for Sale", "Condos & Apartments", "Land & Lots", "Commercial", "New Construction", "Open Houses"],
  },
  {
    title: "Rent",
    links: ["Houses for Rent", "Apartments for Rent", "Pet-Friendly Rentals", "Short-Term Leases", "Student Housing", "Corporate Housing"],
  },
  {
    title: "Sell",
    links: ["List Your Property", "Free Valuation", "Pricing Guide", "Seller Tools", "Find an Agent", "For Sale By Owner"],
  },
  {
    title: "Company",
    links: ["About Grace Choi", "Careers", "Press Room", "Investor Relations", "Sustainability", "Contact Us"],
  },
];

const SOCIALS = [
  { icon: Facebook, label: "Facebook" },
  { icon: Twitter, label: "Twitter" },
  { icon: Instagram, label: "Instagram" },
  { icon: Linkedin, label: "LinkedIn" },
  { icon: Youtube, label: "YouTube" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const footer = useSearchStore((s) => s.siteContent.footer);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast("Enter your email", { description: "We need an address to subscribe you." });
      return;
    }
    toast("Subscribed!", {
      description: `Market insights will arrive at ${email}.`,
    });
    setEmail("");
  };

  return (
    <footer id="footer" className="mt-auto bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Top: brand + newsletter */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground">
                <Building2 className="h-5 w-5" />
              </div>
              <span className="font-display text-2xl font-bold tracking-tight">
                Grace Choi
              </span>
            </Link>
            <p className="mt-3 max-w-md text-sm text-background/70">
              {footer.brandDescription}
            </p>

            <div className="mt-6">
              <h4 className="text-sm font-semibold text-background">
                {footer.newsletterTitle}
              </h4>
              <form onSubmit={handleSubscribe} className="mt-2 flex gap-2 max-w-md">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="border-background/20 bg-background/5 text-background placeholder:text-background/40 focus-visible:border-primary focus-visible:ring-primary/30"
                />
                <Button type="submit" size="icon" className="shrink-0">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
              <p className="mt-2 text-xs text-background/50">
                {footer.newsletterSubtitle}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:gap-4">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h5 className="text-sm font-semibold text-background">
                  {col.title}
                </h5>
                <ul className="mt-3 space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <button
                        type="button"
                        onClick={() =>
                          toast("Coming soon", { description: link })
                        }
                        className="text-left text-xs text-background/70 transition-colors hover:text-background"
                      >
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-background/10 pt-6 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-background/60">
            <span>© {new Date().getFullYear()} Grace Choi Real Estate</span>
            <span className="hidden sm:inline">·</span>
            <button
              onClick={() => toast("Privacy policy", { description: "Opening in a new tab." })}
              className="hover:text-background"
            >
              Privacy
            </button>
            <button
              onClick={() => toast("Terms", { description: "Opening in a new tab." })}
              className="hover:text-background"
            >
              Terms
            </button>
            <button
              onClick={() => toast("Fair Housing", { description: "We follow all fair housing laws." })}
              className="hover:text-background"
            >
              Fair Housing
            </button>
            <button
              onClick={() => toast("Accessibility", { description: "We are WCAG 2.1 AA compliant." })}
              className="hover:text-background"
            >
              Accessibility
            </button>
          </div>

          <div className="flex items-center gap-1">
            {SOCIALS.map((s) => (
              <Button
                key={s.label}
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-background/70 hover:bg-background/10 hover:text-background"
                aria-label={s.label}
                onClick={() => toast(`Follow on ${s.label}`, { description: "Opening social profile." })}
              >
                <s.icon className="h-4 w-4" />
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-6 text-xs text-background/40">
          {footer.legalText}
        </div>
      </div>
    </footer>
  );
}
