"use client";

import { Bath, Bed, Maximize, MapPin, Heart, Phone, Share2, Calendar, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useSearchStore } from "@/store/search-store";
import { AGENTS, formatPriceFull } from "@/lib/data";
import { toast } from "sonner";

interface PropertyDetailDialogProps {
  propertyId: string | null;
  onClose: () => void;
}

export function PropertyDetailDialog({ propertyId, onClose }: PropertyDetailDialogProps) {
  const toggleFavorite = useSearchStore((s) => s.toggleFavorite);
  const favorites = useSearchStore((s) => s.favorites);
  const properties = useSearchStore((s) => s.properties);

  const property = propertyId ? properties.find((p) => p.id === propertyId) : null;
  const agent = property ? AGENTS.find((a) => a.id === property.agentId) : null;
  const isFav = property ? favorites.includes(property.id) : false;

  const handleOpenChange = (open: boolean) => {
    if (!open) onClose();
  };

  const handleContact = () => {
    toast("Inquiry sent", {
      description: `${agent?.name ?? "An agent"} will contact you about "${property?.title ?? "this property"}".`,
    });
    onClose();
  };

  if (!property) return null;

  return (
    <Dialog open={!!propertyId} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto p-0 sm:rounded-xl">
        {/* Image gallery hero */}
        <div className="relative aspect-[16/9] w-full overflow-hidden sm:rounded-t-xl">
          <img
            src={property.image}
            alt={property.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
            <div className="flex flex-wrap gap-1.5">
              <Badge
                className={
                  property.status === "for-sale"
                    ? "bg-primary text-primary-foreground"
                    : "bg-white text-foreground"
                }
              >
                {property.status === "for-sale" ? "For Sale" : "For Rent"}
              </Badge>
              {property.isNew && (
                <Badge className="bg-amber-500 text-white hover:bg-amber-500">New</Badge>
              )}
              {property.featured && (
                <Badge className="bg-emerald-600 text-white hover:bg-emerald-600">Featured</Badge>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full bg-white/90 text-foreground shadow-sm backdrop-blur hover:bg-white"
              onClick={() => {
                toggleFavorite(property.id);
                toast(isFav ? "Removed from favorites" : "Saved to favorites", {
                  description: property.title,
                });
              }}
            >
              <Heart
                className={`h-4 w-4 ${isFav ? "fill-primary text-primary" : ""}`}
              />
            </Button>
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-12">
            <div className="text-3xl font-bold text-white">
              {formatPriceFull(property.price, property.status)}
            </div>
          </div>
        </div>

        <div className="space-y-6 p-5 sm:p-6">
          {/* Title & location */}
          <div>
            <DialogHeader className="space-y-1">
              <DialogTitle className="font-display text-2xl font-bold leading-tight">
                {property.title}
              </DialogTitle>
            </DialogHeader>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {property.address}, {property.city}, {property.state}
            </p>
          </div>

          {/* Specs */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {property.beds > 0 && (
              <div className="rounded-lg border border-border bg-secondary/30 p-3 text-center">
                <Bed className="mx-auto h-5 w-5 text-primary" />
                <div className="mt-1 text-lg font-bold">{property.beds}</div>
                <div className="text-xs text-muted-foreground">Bedrooms</div>
              </div>
            )}
            {property.baths > 0 && (
              <div className="rounded-lg border border-border bg-secondary/30 p-3 text-center">
                <Bath className="mx-auto h-5 w-5 text-primary" />
                <div className="mt-1 text-lg font-bold">{property.baths}</div>
                <div className="text-xs text-muted-foreground">Bathrooms</div>
              </div>
            )}
            <div className="rounded-lg border border-border bg-secondary/30 p-3 text-center">
              <Maximize className="mx-auto h-5 w-5 text-primary" />
              <div className="mt-1 text-lg font-bold">
                {property.sqft.toLocaleString("en-US")}
              </div>
              <div className="text-xs text-muted-foreground">Sq Ft</div>
            </div>
            <div className="rounded-lg border border-border bg-secondary/30 p-3 text-center">
              <Calendar className="mx-auto h-5 w-5 text-primary" />
              <div className="mt-1 text-lg font-bold">
                {property.yearBuilt || "—"}
              </div>
              <div className="text-xs text-muted-foreground">Year Built</div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-display text-lg font-semibold">About this property</h4>
            <p className="mt-2 text-sm leading-relaxed text-foreground/80">
              {property.description}
            </p>
          </div>

          {/* Amenities */}
          {property.amenities.length > 0 && (
            <div>
              <h4 className="font-display text-lg font-semibold">Amenities & Features</h4>
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {property.amenities.map((a) => (
                  <div
                    key={a}
                    className="flex items-center gap-2 text-sm text-foreground/80"
                  >
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    {a}
                  </div>
                ))}
              </div>
            </div>
          )}

          <Separator />

          {/* Agent */}
          {agent && (
            <div className="flex items-center gap-4 rounded-lg border border-border bg-secondary/30 p-4">
              <img
                src={agent.image}
                alt={agent.name}
                className="h-16 w-16 rounded-full object-cover"
              />
              <div className="min-w-0 flex-1">
                <div className="font-semibold">{agent.name}</div>
                <div className="text-sm text-muted-foreground">{agent.title}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">
                  {agent.office} · {agent.sales} sales · ⭐ {agent.rating}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Button size="sm" onClick={handleContact} className="gap-1.5">
                  <Phone className="h-3.5 w-3.5" />
                  Contact
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toast("Link copied", { description: "Share with your network." })}
                  className="gap-1.5"
                >
                  <Share2 className="h-3.5 w-3.5" />
                  Share
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
