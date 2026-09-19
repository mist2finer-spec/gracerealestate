"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, MousePointerClick } from "lucide-react";
import { toast } from "sonner";

// ============================================================
// NJ Bergen County — Interactive Town Map
// Each town is a clickable SVG polygon button with hover animation.
// Clicking a town navigates to /towns-and-schools/[town-slug].
// ============================================================

interface TownMarker {
  slug: string;
  label: string;
  labelKo?: string;
  // Position on a 800×600 viewport (percentage-based, 0-100)
  x: number;
  y: number;
  // Optional: polygon points for a custom shape (simplified map)
  polygon?: string;
  region: "north" | "central" | "south" | "east" | "west";
}

// Simplified town positions for Bergen County, NJ.
// Real geographic positions approximated on a 1000×700 SVG viewport.
const TOWNS: TownMarker[] = [
  // Northern tier
  { slug: "mahwah", label: "Mahwah", x: 180, y: 80, region: "north" },
  { slug: "montvale", label: "Montvale", x: 320, y: 70, region: "north" },
  { slug: "park-ridge", label: "Park Ridge", x: 360, y: 80, region: "north" },
  { slug: "woodcliff-lake", label: "Woodcliff Lake", x: 390, y: 95, region: "north" },
  { slug: "hillsdale", label: "Hillsdale", x: 410, y: 115, region: "north" },
  { slug: "river-vale", label: "River Vale", x: 460, y: 75, region: "north" },
  { slug: "old-tappan", label: "Old Tappan", x: 490, y: 85, region: "north" },
  { slug: "norwood", label: "Norwood", x: 510, y: 100, region: "north" },
  { slug: "northvale", label: "Northvale", x: 530, y: 80, region: "north" },
  { slug: "alpine", label: "Alpine", x: 560, y: 110, region: "north" },
  { slug: "rockleigh", label: "Rockleigh", x: 410, y: 55, region: "north" },
  // Upper central
  { slug: "ramsey", label: "Ramsey", x: 280, y: 110, region: "north" },
  { slug: "upper-saddle-river", label: "Upper Saddle River", x: 380, y: 115, region: "north" },
  { slug: "saddle-river", label: "Saddle River", x: 360, y: 140, region: "north" },
  { slug: "allendale", label: "Allendale", x: 310, y: 130, region: "north" },
  { slug: "waldwick", label: "Waldwick", x: 280, y: 150, region: "central" },
  { slug: "ho-ho-kus", label: "Ho-Ho-Kus", x: 290, y: 170, region: "central" },
  { slug: "midland-park", label: "Midland Park", x: 250, y: 170, region: "central" },
  { slug: "wyckoff", label: "Wyckoff", x: 240, y: 140, region: "central" },
  { slug: "franklin-lakes", label: "Franklin Lakes", x: 200, y: 120, region: "west" },
  { slug: "oakland", label: "Oakland", x: 180, y: 150, region: "west" },
  // Central
  { slug: "ridgewood", label: "Ridgewood", x: 290, y: 195, region: "central" },
  { slug: "glen-rock", label: "Glen Rock", x: 280, y: 220, region: "central" },
  { slug: "fair-lawn", label: "Fair Lawn", x: 320, y: 220, region: "central" },
  { slug: "paramus", label: "Paramus", x: 320, y: 195, region: "central" },
  { slug: "maywood", label: "Maywood", x: 370, y: 220, region: "central" },
  { slug: "lodi", label: "Lodi", x: 380, y: 250, region: "central" },
  { slug: "saddle-brook", label: "Saddle Brook", x: 350, y: 200, region: "central" },
  { slug: "elmwood-park", label: "Elmwood Park", x: 330, y: 250, region: "central" },
  { slug: "garfield", label: "Garfield", x: 370, y: 270, region: "central" },
  // Eastern (Hudson River border)
  { slug: "westwood", label: "Westwood", x: 430, y: 130, region: "east" },
  { slug: "washington-twp", label: "Washington Twp", x: 460, y: 140, region: "east" },
  { slug: "emerson", label: "Emerson", x: 450, y: 160, region: "east" },
  { slug: "harrington-park", label: "Harrington Park", x: 470, y: 115, region: "east" },
  { slug: "haworth", label: "Haworth", x: 500, y: 130, region: "east" },
  { slug: "closter", label: "Closter", x: 510, y: 145, region: "east" },
  { slug: "demarest", label: "Demarest", x: 525, y: 165, region: "east" },
  { slug: "dumont", label: "Dumont", x: 490, y: 175, region: "east" },
  { slug: "bergenfield", label: "Bergenfield", x: 510, y: 200, region: "east" },
  { slug: "new-milford", label: "New Milford", x: 480, y: 200, region: "east" },
  { slug: "teaneck", label: "Teaneck", x: 510, y: 240, region: "east" },
  { slug: "tenafly", label: "Tenafly", x: 540, y: 195, region: "east" },
  { slug: "englewood", label: "Englewood", x: 530, y: 225, region: "east" },
  { slug: "leonia", label: "Leonia", x: 520, y: 265, region: "east" },
  { slug: "edgewater", label: "Edgewater", x: 560, y: 240, region: "east" },
  { slug: "fort-lee", label: "Fort Lee", x: 560, y: 220, region: "east" },
  { slug: "palisades-park", label: "Palisades Park", x: 490, y: 270, region: "east" },
  { slug: "ridgefield-park", label: "Ridgefield Park", x: 510, y: 290, region: "east" },
  { slug: "cliffside-park", label: "Cliffside Park", x: 540, y: 280, region: "east" },
  { slug: "fairview", label: "Fairview", x: 520, y: 305, region: "east" },
  // Southern tier
  { slug: "hackensack", label: "Hackensack", x: 440, y: 250, region: "south" },
  { slug: "river-edge", label: "River Edge", x: 410, y: 250, region: "south" },
  { slug: "oradell", label: "Oradell", x: 390, y: 270, region: "south" },
  { slug: "little-ferry", label: "Little Ferry", x: 460, y: 290, region: "south" },
  { slug: "moonachie", label: "Moonachie", x: 440, y: 305, region: "south" },
  { slug: "carlstadt", label: "Carlstadt", x: 420, y: 320, region: "south" },
  { slug: "ridgefield", label: "Ridgefield", x: 490, y: 325, region: "south" },
  { slug: "south-hackensack", label: "South Hackensack", x: 440, y: 335, region: "south" },
  { slug: "teterboro", label: "Teterboro", x: 430, y: 350, region: "south" },
  { slug: "hasbrouck-heights", label: "Hasbrouck Heights", x: 410, y: 360, region: "south" },
  { slug: "rutherford", label: "Rutherford", x: 470, y: 350, region: "south" },
  { slug: "lyndhurst", label: "Lyndhurst", x: 490, y: 375, region: "south" },
  { slug: "north-arlington", label: "North Arlington", x: 420, y: 390, region: "south" },
  { slug: "wallington", label: "Wallington", x: 450, y: 330, region: "south" },
  { slug: "east-rutherford", label: "East Rutherford", x: 470, y: 325, region: "south" },
  { slug: "wood-ridge", label: "Wood-Ridge", x: 450, y: 310, region: "south" },
];

const REGION_COLORS: Record<string, string> = {
  north: "#fbbf24", // amber
  central: "#34d399", // emerald
  south: "#60a5fa", // blue
  east: "#f472b6", // pink
  west: "#a78bfa", // purple
};

const REGION_LABELS: Record<string, string> = {
  north: "Northern Bergen",
  central: "Central Bergen",
  south: "Southern Bergen",
  east: "Eastern (Hudson River)",
  west: "Western Bergen",
};

export function TownMap() {
  const [hoveredTown, setHoveredTown] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | "all">("all");

  const filteredTowns =
    selectedRegion === "all"
      ? TOWNS
      : TOWNS.filter((t) => t.region === selectedRegion);

  return (
    <section className="bg-background py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
            <MapPin className="h-3.5 w-3.5" />
            Interactive Town Map
          </div>
          <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            New Jersey · Bergen County Towns
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground mx-auto">
            버겐 카운티 타운 지도 — 마우스를 올려 타운을 살펴보고, 클릭하면
            해당 타운의 상세 정보(학교, 인구, 교통, 부동산)로 이동합니다.
          </p>
        </div>

        {/* Region filter */}
        <div className="mb-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setSelectedRegion("all")}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              selectedRegion === "all"
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background hover:bg-secondary"
            }`}
          >
            All ({TOWNS.length})
          </button>
          {Object.entries(REGION_LABELS).map(([key, label]) => {
            const count = TOWNS.filter((t) => t.region === key).length;
            return (
              <button
                key={key}
                onClick={() => setSelectedRegion(key)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  selectedRegion === key
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background hover:bg-secondary"
                }`}
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: REGION_COLORS[key] }}
                />
                {label} ({count})
              </button>
            );
          })}
        </div>

        {/* Map + sidebar layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">
          {/* SVG Map */}
          <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-sky-50 via-blue-50 to-emerald-50 p-4 shadow-sm">
            {/* Map title overlay */}
            <div className="absolute left-4 top-4 z-10 rounded-lg bg-white/90 px-3 py-1.5 text-xs font-semibold text-foreground shadow backdrop-blur">
              🗺️ Bergen County, NJ
            </div>
            {/* Hudson River label (east edge) */}
            <div className="absolute right-2 top-1/2 z-0 -translate-y-1/2 rotate-90 text-[10px] font-medium text-blue-400/60">
              Hudson River →
            </div>

            <svg
              viewBox="0 0 700 480"
              className="h-auto w-full"
              role="img"
              aria-label="Interactive map of Bergen County, NJ towns"
            >
              {/* Background — county shape (simplified) */}
              <path
                d="M 100 40 L 600 40 L 620 100 L 620 250 L 600 420 L 500 430 L 400 440 L 300 440 L 200 430 L 100 420 L 80 300 L 80 150 Z"
                fill="#dbeafe"
                stroke="#3b82f6"
                strokeWidth="2"
                opacity="0.4"
              />
              {/* Hudson River (east edge) */}
              <path
                d="M 620 100 L 660 100 L 660 420 L 600 420 L 620 250 Z"
                fill="#bfdbfe"
                opacity="0.6"
              />

              {/* Town markers */}
              {filteredTowns.map((town) => {
                const isHovered = hoveredTown === town.slug;
                const color = REGION_COLORS[town.region];
                return (
                  <g
                    key={town.slug}
                    onMouseEnter={() => setHoveredTown(town.slug)}
                    onMouseLeave={() => setHoveredTown(null)}
                    onClick={() => {
                      toast(`Opening ${town.label}…`, {
                        description: "Loading town info",
                      });
                    }}
                    className="cursor-pointer"
                    style={{ transition: "transform 0.2s ease" }}
                  >
                    {/* Town circle */}
                    <circle
                      cx={town.x * 0.7}
                      cy={town.y * 0.7}
                      r={isHovered ? 9 : 6}
                      fill={color}
                      stroke="white"
                      strokeWidth={isHovered ? 3 : 2}
                      style={{
                        transition: "r 0.2s ease, stroke-width 0.2s ease",
                        filter: isHovered
                          ? "drop-shadow(0 0 8px rgba(0,0,0,0.3))"
                          : "none",
                      }}
                    />
                    {/* Town label */}
                    <text
                      x={town.x * 0.7}
                      y={town.y * 0.7 - (isHovered ? 14 : 12)}
                      textAnchor="middle"
                      fontSize={isHovered ? "11" : "9"}
                      fontWeight={isHovered ? "700" : "500"}
                      fill={isHovered ? "#111" : "#374151"}
                      style={{ transition: "font-size 0.2s ease, font-weight 0.2s ease" }}
                      pointerEvents="none"
                    >
                      {town.label}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Hint */}
            <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <MousePointerClick className="h-3.5 w-3.5" />
              Hover over a town to see its name · Click to view details
            </div>
          </div>

          {/* Sidebar — town list */}
          <div className="rounded-xl border border-border bg-secondary/30 p-4">
            <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {selectedRegion === "all"
                ? "All Towns"
                : REGION_LABELS[selectedRegion]}{" "}
              ({filteredTowns.length})
            </div>
            <div className="max-h-[500px] space-y-1 overflow-y-auto pr-1">
              {filteredTowns.map((town) => {
                const isHovered = hoveredTown === town.slug;
                return (
                  <Link
                    key={town.slug}
                    href={`/towns-and-schools/${town.slug}`}
                    onMouseEnter={() => setHoveredTown(town.slug)}
                    onMouseLeave={() => setHoveredTown(null)}
                    className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-all ${
                      isHovered
                        ? "scale-105 bg-primary text-primary-foreground shadow-md"
                        : "bg-background hover:bg-secondary"
                    }`}
                  >
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: REGION_COLORS[town.region] }}
                    />
                    <span className="font-medium">{town.label}</span>
                    <MapPin className="ml-auto h-3.5 w-3.5 opacity-60" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
          {Object.entries(REGION_LABELS).map(([key, label]) => (
            <div key={key} className="flex items-center gap-1.5">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: REGION_COLORS[key] }}
              />
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
