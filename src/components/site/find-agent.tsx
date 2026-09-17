"use client";

import { Phone, Mail, Star, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AGENTS } from "@/lib/data";
import { toast } from "sonner";

export function FindAgent() {
  const handleContact = (name: string, method: "call" | "email") => {
    toast(
      method === "call" ? "Connecting your call" : "Opening your email",
      { description: `Reaching ${name} · ${method === "call" ? "via phone" : "via email"}.` }
    );
  };

  return (
    <section id="agents" className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Meet the team
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Find an agent who knows your market
            </h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Top-rated, vetted, and reviewed. Connect with a local expert who
              understands your neighborhood, your goals, and your timeline.
            </p>
          </div>
          <Button variant="outline" className="shrink-0">
            Browse all 1,200 agents
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {AGENTS.map((agent) => (
            <Card key={agent.id} className="group overflow-hidden p-0 transition-shadow hover:shadow-lg">
              <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                <img
                  src={agent.image}
                  alt={agent.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 top-0 flex justify-end p-2">
                  <Badge className="gap-1 bg-white/95 text-foreground hover:bg-white">
                    <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                    {agent.rating}
                  </Badge>
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-3 pt-10">
                  <h3 className="font-display text-lg font-bold text-white">
                    {agent.name}
                  </h3>
                  <p className="text-xs text-white/85">{agent.title}</p>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  {agent.office}
                  <span className="mx-1">·</span>
                  {agent.sales} sales
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {agent.specialties.map((s) => (
                    <Badge key={s} variant="secondary" className="text-xs">
                      {s}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex items-center gap-2 border-t border-border bg-secondary/30 p-3">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleContact(agent.name, "call")}
                >
                  <Phone className="mr-1.5 h-3.5 w-3.5" />
                  Call
                </Button>
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={() => handleContact(agent.name, "email")}
                >
                  <Mail className="mr-1.5 h-3.5 w-3.5" />
                  Email
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
