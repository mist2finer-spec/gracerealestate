"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Building2,
  Heart,
  Menu,
  Phone,
  Search,
  ShieldCheck,
  User,
  X,
  Lock,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useSearchStore } from "@/store/search-store";
import { toast } from "sonner";

const NAV_LINKS = [
  { label: "Buy", href: "#listings" },
  { label: "Rent", href: "#listings" },
  { label: "Sell", href: "#inquiry" },
  { label: "Guides", href: "/towns-and-schools" },
  { label: "Commercial", href: "#categories" },
  { label: "Insights", href: "#insights" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [pw, setPw] = useState("");
  const favorites = useSearchStore((s) => s.favorites);
  const setMobileNavOpen = useSearchStore((s) => s.setMobileNavOpen);
  const mobileNavOpen = useSearchStore((s) => s.mobileNavOpen);
  const setAdminOpen = useSearchStore((s) => s.setAdminOpen);
  const isAdmin = useSearchStore((s) => s.isAdmin);
  const login = useSearchStore((s) => s.login);
  const logout = useSearchStore((s) => s.logout);
  const phone = useSearchStore((s) => s.siteContent.footer.phone);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    // External routes (starting with /) should navigate normally
    if (href.startsWith("/")) {
      setMobileNavOpen(false);
      return; // let the default <a> navigation happen
    }
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
            Grace Choi
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

          {/* Sign In / Sign Up — visible to everyone.
              Sign In opens a login dialog; entering the admin password
              activates admin mode (Admin button appears). */}
          <Button
            variant="outline"
            size="sm"
            className="hidden md:inline-flex"
            onClick={() => setSignInOpen(true)}
          >
            <User className="mr-1.5 h-4 w-4" />
            {isAdmin ? "Account" : "Sign In"}
          </Button>

          {!isAdmin && (
            <Button
              size="sm"
              className="hidden md:inline-flex"
              onClick={() => setSignInOpen(true)}
            >
              Sign Up
            </Button>
          )}

          {/* Admin button — only visible when logged in as admin */}
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
                    <span className="font-display text-xl font-bold">Grace Choi</span>
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
                    setSignInOpen(true);
                  }}
                >
                  <User className="mr-2 h-4 w-4" />
                  {isAdmin ? "Account" : "Sign In"}
                </Button>
                {!isAdmin && (
                  <Button
                    className="w-full"
                    onClick={() => {
                      setMobileNavOpen(false);
                      setSignInOpen(true);
                    }}
                  >
                    Sign Up
                  </Button>
                )}
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
                <div className="mt-4 flex items-center gap-2 px-3 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  {phone}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Sign In / Sign Up dialog */}
      <Dialog open={signInOpen} onOpenChange={setSignInOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {isAdmin ? "Your account" : "Sign in to Grace Choi"}
            </DialogTitle>
            <DialogDescription>
              {isAdmin
                ? "You are currently signed in as an admin."
                : "Enter your credentials. Admins get access to the dashboard."}
            </DialogDescription>
          </DialogHeader>

          {isAdmin ? (
            <div className="space-y-3 py-2">
              <div className="rounded-md border border-primary/30 bg-primary/5 p-3 text-sm">
                <div className="flex items-center gap-2 font-semibold text-primary">
                  <ShieldCheck className="h-4 w-4" />
                  Admin mode active
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  The Admin button is now visible in the header. Use it to
                  manage listings, agents, and site content.
                </p>
              </div>
              <Button
                className="w-full"
                onClick={() => {
                  setSignInOpen(false);
                  setAdminOpen(true);
                }}
              >
                Open Admin Dashboard
              </Button>
              <Button
                variant="outline"
                className="w-full gap-1.5"
                onClick={() => {
                  logout();
                  setSignInOpen(false);
                  toast("Signed out", { description: "Admin session ended." });
                }}
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </Button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (login(pw)) {
                  toast.success("Signed in as admin", {
                    description: "Admin button is now visible in the header.",
                  });
                  setSignInOpen(false);
                  setPw("");
                } else {
                  toast.error("Sign in failed", {
                    description: "Incorrect password. Please try again.",
                  });
                }
              }}
              className="space-y-3 py-2"
            >
              <div>
                <Label htmlFor="signin-email" className="text-xs">
                  Email
                </Label>
                <Input
                  id="signin-email"
                  type="email"
                  placeholder="you@example.com"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="signin-pw" className="text-xs">
                  Password
                </Label>
                <Input
                  id="signin-pw"
                  type="password"
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                  placeholder="Enter password"
                  className="mt-1"
                  autoFocus
                />
              </div>
              <Button type="submit" className="w-full gap-1.5">
                <Lock className="h-4 w-4" />
                Sign In
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  className="font-medium text-primary hover:underline"
                  onClick={() =>
                    toast("Sign Up coming soon", {
                      description: "Self-serve registration is not yet enabled.",
                    })
                  }
                >
                  Sign up
                </button>
              </p>
              <div className="rounded-md border border-border bg-secondary/50 p-2 text-xs text-muted-foreground">
                <p className="font-semibold text-foreground">Admin demo</p>
                <p className="mt-0.5">
                  Password:{" "}
                  <code className="rounded bg-background px-1 py-0.5">
                    estata-admin-2024
                  </code>
                </p>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </header>
  );
}
