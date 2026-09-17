"use client";

import { Bath, Bed, Heart, MapPin, Maximize, Eye, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useSearchStore } from "@/store/search-store";
import {
  formatPrice,
  formatPriceFull,
  PropertyListing,
} from "@/lib/data";
import { toast } from "sonner";

interface PropertyCardProps {
  property: PropertyListing;
  onOpen?: (id: string) => void;
}

export function PropertyCard({ property, onOpen }: PropertyCardProps) {
  const toggleFavorite = useSearchStore((s) => s.toggleFavorite);
  const isFavorite = useSearchStore((s) => s.favorites.includes(property.id));
  const setSelectedProperty = useSearchStore((s) => s.setSelectedProperty);

  const handleFav = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(property.id);
    toast(
      isFavorite ? "Removed from favorites" : "Saved to favorites",
      { description: property.title }
    );
  };

  const handleOpen = () => {
    if (onOpen) onOpen(property.id);
    else setSelectedProperty(property.id);
  };

  return (
    <Card
      className="group overflow-hidden p-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
      onClick={handleOpen}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          <div className="flex flex-wrap gap-1.5">
            <Badge
              variant={property.status === "for-sale" ? "default" : "secondary"}
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
            {property.featured && !property.isNew && (
              <Badge className="bg-emerald-600 text-white hover:bg-emerald-600">Featured</Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleFav}
            className="h-9 w-9 rounded-full bg-white/90 text-foreground shadow-sm backdrop-blur hover:bg-white"
            aria-label={isFavorite ? "Remove from favorites" : "Save to favorites"}
          >
            <Heart
              className={`h-4 w-4 transition-colors ${
                isFavorite ? "fill-primary text-primary" : "text-foreground/70"
              }`}
            />
          </Button>
        </div>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-10">
          <div className="text-2xl font-bold text-white">
            {formatPrice(property.price, property.status)}
          </div>
        </div>
      </div>

      {/* Content */}
      <CardContent className="p-4">
        <h3 className="line-clamp-1 font-semibold text-foreground">{property.title}</h3>
        <p className="mt-1 flex items-start gap-1 text-sm text-muted-foreground">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span className="line-clamp-1">
            {property.address}, {property.city}, {property.state}
          </span>
        </p>

        {/* Specs */}
        <div className="mt-3 flex items-center gap-3 text-sm text-foreground/80">
          {property.beds > 0 && (
            <span className="inline-flex items-center gap-1">
              <Bed className="h-4 w-4 text-muted-foreground" />
              {property.beds} bd
            </span>
          )}
          {property.baths > 0 && (
            <span className="inline-flex items-center gap-1">
              <Bath className="h-4 w-4 text-muted-foreground" />
              {property.baths} ba
            </span>
          )}
          <span className="inline-flex items-center gap-1">
            <Maximize className="h-4 w-4 text-muted-foreground" />
            {property.sqft.toLocaleString("en-US")} sqft
          </span>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t border-border bg-secondary/30 p-3">
        <span className="text-xs text-muted-foreground">
          Built {property.yearBuilt || "—"}
        </span>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-xs"
            onClick={(e) => {
              e.stopPropagation();
              handleOpen();
            }}
          >
            <Eye className="mr-1 h-3.5 w-3.5" />
            Details
          </Button>
          <Button
            size="sm"
            className="h-8 px-3 text-xs"
            onClick={(e) => {
              e.stopPropagation();
              useSearchStore.getState().openInquiry(property.id);
            }}
          >
            <Phone className="mr-1 h-3.5 w-3.5" />
            Contact
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export function PropertyCardSkeleton() {
  return (
    <Card className="overflow-hidden p-0">
      <div className="aspect-[4/3] animate-pulse bg-secondary" />
      <CardContent className="space-y-3 p-4">
        <div className="h-5 w-3/4 animate-pulse rounded bg-secondary" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-secondary" />
        <div className="flex gap-3">
          <div className="h-4 w-12 animate-pulse rounded bg-secondary" />
          <div className="h-4 w-12 animate-pulse rounded bg-secondary" />
          <div className="h-4 w-20 animate-pulse rounded bg-secondary" />
        </div>
      </CardContent>
    </Card>
  );
}

// Re-export for type-only imports elsewhere
export type { PropertyListing };
export { formatPriceFull };
