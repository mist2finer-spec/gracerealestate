import townsJson from "@/data/bergen-towns.json";
import boundariesJson from "@/data/town-boundaries.json";

export interface TownLink {
  label: string;
  url: string | null;
}

export interface TownSection {
  title: string;
  links: { label: string; url: string }[];
}

export interface TownRecord {
  slug: string;
  name: string;
  sourceUrl: string;
  overview: (TownLink & { value: string })[];
  schoolColumns: string[];
  schools: string[][];
  sections: TownSection[];
  notes: string[];
}

export interface TownBoundary {
  slug: string;
  name: string;
  d: string;
}

export const towns = townsJson as TownRecord[];
export const boundaries = boundariesJson as TownBoundary[];
export const townsBySlug: Record<string, TownRecord> = Object.fromEntries(
  towns.map((town) => [town.slug, town]),
);

export function townValue(town: TownRecord, label: string): string | undefined {
  return town.overview.find((item) => item.label === label)?.value;
}

export function townNumber(town: TownRecord, label: string): number | null {
  const value = townValue(town, label);
  if (!value) return null;
  const match = value.replace(/,/g, "").match(/\$?([\d.]+)/);
  return match ? Number(match[1]) : null;
}

export function meanSchoolRating(town: TownRecord): number | null {
  const values = town.schools
    .map((row) => Number(row[2]))
    .filter((value) => Number.isFinite(value) && value > 0);
  return values.length
    ? values.reduce((total, value) => total + value, 0) / values.length
    : null;
}

export function averageSat(town: TownRecord): number | null {
  const values = town.schools
    .map((row) => Number(row[6]))
    .filter((value) => Number.isFinite(value) && value > 0);
  return values.length
    ? values.reduce((total, value) => total + value, 0) / values.length
    : null;
}

export function distanceToGwb(town: TownRecord): number | null {
  const value = townValue(town, "Distance to GWB / Lincoln Tunnel");
  const match = value?.match(/(\d+)\s*(?:min|minutes)/i);
  return match ? Number(match[1]) : null;
}

export function townSections(town: TownRecord, kind: string): TownSection[] {
  return town.sections.filter((section) =>
    section.title.toLowerCase().includes(kind.toLowerCase()),
  );
}
