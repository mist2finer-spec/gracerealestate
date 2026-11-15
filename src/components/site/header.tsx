"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Building2, Mail, Menu, Phone, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSearchStore } from "@/store/search-store";

const NAV_LINKS = [
  { label: "Seller Guide", href: "/sell" },
  { label: "Buyer Guide", href: "/buy" },
  { label: "Towns & Schools", href: "/towns-and-schools" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const setMobileNavOpen = useSearchStore((s) => s.setMobileNavOpen);
  const mobileNavOpen = useSearchStore((s) => s.mobileNavOpen);
  const setAdminOpen = useSearchStore((s) => s.setAdminOpen);
  const openInquiry = useSearchStore((s) => s.openInquiry);
  const isAdmin = useSearchStore((s) => s.isAdmin);
  const phone = useSearchStore((s) => s.siteContent.footer.phone);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const telHref = `tel:${phone.replace(/[^0-9+]/g, "")}`;

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur shadow-sm border-b border-border"
          : "bg-white/90 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground">
            <Building2 className="h-5 w-5" />
          </div>
          <span className="font-display text-2xl font-bold tracking-tight text-foreground">
            Grace Choi
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          <a
            href={telHref}
            className="hidden md:inline-flex items-center text-sm font-medium px-3 py-2 rounded-md hover:bg-secondary transition-colors"
          >
            <Phone className="mr-1.5 h-4 w-4" />
            {phone}
          </a>

          <Button size="sm" className="hidden md:inline-flex gap-1.5" onClick={() => openInquiry()}>
            <Mail className="h-4 w-4" />
            Contact Grace
          </Button>

          {/* Admin button — only visible when signed in as admin */}
          {isAdmin && (
            <Button
              variant="ghost"
              size="sm"
              className="hidden md:inline-flex gap-1.5 border border-primary/30 text-primary"
              onClick={() => setAdminOpen(true)}
            >
              <ShieldCheck className="h-4 w-4" />
              Admin
            </Button>
          )}

          {/* Mobile menu */}
          <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] sm:w-[380px]">
              <SheetHeader>
                <SheetTitle className="text-left">
                  <div className="flex items-center gap-2">
                    <div className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground">
                      <Building2 className="h-4 w-4" />
                    </div>
                    <span className="font-display text-xl font-bold">Grace Choi</span>
                  </div>
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-1 px-4">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileNavOpen(false)}
                    className="rounded-md px-3 py-3 text-base font-medium text-foreground/90 transition-colors hover:bg-secondary"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-6 flex flex-col gap-2 px-4">
                <Button
                  className="w-full gap-1.5"
                  onClick={() => {
                    setMobileNavOpen(false);
                    openInquiry();
                  }}
                >
                  <Mail className="h-4 w-4" />
                  Contact Grace
                </Button>
                <Button asChild variant="outline" className="w-full gap-1.5">
                  <a href={telHref}>
                    <Phone className="h-4 w-4" />
                    {phone}
                  </a>
                </Button>
                {isAdmin && (
                  <Button
                    variant="outline"
                    className="w-full justify-start border-primary/30 text-primary"
                    onClick={() => {
                      setMobileNavOpen(false);
                      setAdminOpen(true);
                    }}
                  >
                    <ShieldCheck className="mr-2 h-4 w-4" />
                    Admin Dashboard
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
