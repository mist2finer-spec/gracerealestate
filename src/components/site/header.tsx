"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Building2, Heart, Menu, Phone, Search, ShieldCheck, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSearchStore } from "@/store/search-store";

const NAV_LINKS = [
  { label: "Buy", href: "#listings" },
  { label: "Rent", href: "#listings" },
  { label: "Sell", href: "#agents" },
  { label: "Find an Agent", href: "#agents" },
  { label: "Commercial", href: "#categories" },
  { label: "Insights", href: "#insights" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const favorites = useSearchStore((s) => s.favorites);
  const setMobileNavOpen = useSearchStore((s) => s.setMobileNavOpen);
  const mobileNavOpen = useSearchStore((s) => s.mobileNavOpen);
  const setAdminOpen = useSearchStore((s) => s.setAdminOpen);
  const phone = useSearchStore((s) => s.siteContent.footer.phone);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileNavOpen(false);
  };

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
            Estata
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:inline-flex"
            aria-label="Search"
            onClick={() => {
              const el = document.querySelector("#hero-search");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <Search className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="relative hidden sm:inline-flex"
            aria-label="Saved favorites"
            onClick={() => {
              const el = document.querySelector("#listings");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <Heart className="h-5 w-5" />
            {favorites.length > 0 && (
              <Badge className="absolute -right-1 -top-1 h-5 min-w-5 px-1 text-[10px]">
                {favorites.length}
              </Badge>
            )}
          </Button>

          <Button
            variant="ghost"
            className="hidden md:inline-flex text-sm"
            onClick={() => {
              const el = document.querySelector("#footer");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <Phone className="mr-1.5 h-4 w-4" />
            {phone}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="hidden md:inline-flex gap-1.5"
            onClick={() => setAdminOpen(true)}
          >
            <ShieldCheck className="h-4 w-4" />
            Admin
          </Button>

          <Button variant="outline" size="sm" className="hidden md:inline-flex">
            <User className="mr-1.5 h-4 w-4" />
            Sign In
          </Button>

          <Button size="sm" className="hidden md:inline-flex">
            Join Estata
          </Button>

          {/* Mobile menu */}
          <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="Open menu"
              >
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
                    <span className="font-display text-xl font-bold">Estata</span>
                  </div>
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-1 px-4">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="rounded-md px-3 py-3 text-base font-medium text-foreground/90 transition-colors hover:bg-secondary"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <div className="mt-6 flex flex-col gap-2 px-4">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    setMobileNavOpen(false);
                    setAdminOpen(true);
                  }}
                >
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  Admin
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <User className="mr-2 h-4 w-4" />
                  Sign In
                </Button>
                <Button className="w-full">Join Estata</Button>
                <div className="mt-4 flex items-center gap-2 px-3 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  {phone}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
