"use client";

import { ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useSearchStore } from "@/store/search-store";
import { toast } from "sonner";

const CATEGORY_COLORS: Record<string, string> = {
  "Market Trends": "bg-primary/10 text-primary",
  "Buyer Tips": "bg-emerald-600/10 text-emerald-700",
  "Seller Tips": "bg-amber-500/10 text-amber-700",
  Financing: "bg-violet-600/10 text-violet-700",
};

export function Insights() {
  const insights = useSearchStore((s) => s.siteContent.insights);
  const handleClick = (title: string) => {
    toast("Opening article", { description: title });
  };

  return (
    <section id="insights" className="bg-secondary/30 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              {insights.eyebrow}
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {insights.title}
            </h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              {insights.description}
            </p>
          </div>
          <Button
            variant="outline"
            className="shrink-0"
            onClick={() => toast("Browse all articles", { description: "200+ guides available." })}
          >
            {insights.allArticlesButton}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {insights.articles.map((post) => (
            <Card
              key={post.id}
              className="group cursor-pointer overflow-hidden p-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              onClick={() => handleClick(post.title)}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute left-3 top-3">
                  <Badge className={`${CATEGORY_COLORS[post.category]} hover:opacity-90`}>
                    {post.category}
                  </Badge>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{post.date}</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </span>
                </div>
                <h3 className="mt-2 font-display text-lg font-bold leading-snug transition-colors group-hover:text-primary">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                  {post.excerpt}
                </p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Read article
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
