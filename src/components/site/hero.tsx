"use client";

import Link from "next/link";
import { ArrowRight, Home, MapPin, Search } from "lucide-react";
import { useSearchStore } from "@/store/search-store";

const ENTRY_POINTS = [
  {
    href: "/sell",
    icon: Home,
    title: "I'm selling",
    subtitle: "집을 팔려고 해요",
    description: "Seller guide + NJ closing cost calculator",
  },
  {
    href: "/buy",
    icon: Search,
    title: "I'm buying",
    subtitle: "집을 사려고 해요",
    description: "Buyer guide + cash-to-close calculator",
  },
  {
    href: "/towns-and-schools",
    icon: MapPin,
    title: "Towns & Schools",
    subtitle: "타운·학군 정보",
    description: "70 Bergen County towns on an interactive map",
  },
];

export function Hero() {
  const hero = useSearchStore((s) => s.siteContent.hero);

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={hero.backgroundImage}
          alt=""
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/75" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-12 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pb-20 lg:pt-28">
        <div className="max-w-3xl text-white">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">
            <MapPin className="h-3.5 w-3.5" />
            {hero.badge}
          </div>
          <h1 className="whitespace-pre-line font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {hero.headline}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/85 sm:text-lg">
            {hero.subline}
          </p>
        </div>

        {/* Entry points — the three things visitors come here for */}
        <div className="mt-8 grid grid-cols-1 gap-3 sm:mt-10 sm:grid-cols-3">
          {ENTRY_POINTS.map((e) => (
            <Link
              key={e.href}
              href={e.href}
              className="group flex items-start gap-3 rounded-xl bg-white p-4 shadow-2xl transition-transform hover:-translate-y-0.5"
            >
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <e.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-display text-base font-semibold text-foreground">
                  {e.title}
                </div>
                <div className="text-xs font-medium text-primary">{e.subtitle}</div>
                <p className="mt-1 text-xs text-muted-foreground">{e.description}</p>
              </div>
              <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
