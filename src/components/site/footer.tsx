"use client";

import Link from "next/link";
import { Building2, Mail, Phone } from "lucide-react";
import { useSearchStore } from "@/store/search-store";

const GUIDE_LINKS = [
  { label: "Seller Guide · 셀러 가이드", href: "/sell" },
  { label: "Buyer Guide · 바이어 가이드", href: "/buy" },
  { label: "Towns & Schools · 타운/학교", href: "/towns-and-schools" },
];

export function Footer() {
  const footer = useSearchStore((s) => s.siteContent.footer);
  const openInquiry = useSearchStore((s) => s.openInquiry);
  const setAdminOpen = useSearchStore((s) => s.setAdminOpen);

  return (
    <footer id="footer" className="mt-auto bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
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
          </div>

          <div>
            <h5 className="text-sm font-semibold text-background">Guides</h5>
            <ul className="mt-3 space-y-2">
              {GUIDE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-background/70 transition-colors hover:text-background"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-sm font-semibold text-background">Contact</h5>
            <ul className="mt-3 space-y-2 text-sm text-background/70">
              <li>
                <a
                  href={`tel:${footer.phone.replace(/[^0-9+]/g, "")}`}
                  className="inline-flex items-center gap-2 hover:text-background"
                >
                  <Phone className="h-4 w-4" />
                  {footer.phone}
                </a>
              </li>
              {footer.email && (
                <li>
                  <a
                    href={`mailto:${footer.email}`}
                    className="inline-flex items-center gap-2 hover:text-background"
                  >
                    <Mail className="h-4 w-4" />
                    {footer.email}
                  </a>
                </li>
              )}
              <li>
                <button
                  type="button"
                  onClick={() => openInquiry()}
                  className="text-left underline-offset-4 hover:text-background hover:underline"
                >
                  Send an inquiry →
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-background/10 pt-6 text-xs text-background/60 sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} Grace Choi Real Estate</span>
          <button
            type="button"
            onClick={() => setAdminOpen(true)}
            className="text-background/40 hover:text-background"
          >
            Admin
          </button>
        </div>

        <div className="mt-4 text-xs text-background/40">{footer.legalText}</div>
      </div>
    </footer>
  );
}
