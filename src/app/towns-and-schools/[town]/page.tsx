"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Bus, FileText, School, Users, MapPin } from "lucide-react";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { WhyUs } from "@/components/site/why-us";
import { AdminPanel } from "@/components/site/admin-panel";
import { ContentEditorPanel } from "@/components/site/content-editor-panel";
import { InquirySection } from "@/components/site/inquiry-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSearchStore } from "@/store/search-store";
import { townSections, towns, townsBySlug, townValue, type TownRecord } from "@/lib/town-data";

const linkClass = "font-medium text-primary underline-offset-2 hover:underline";

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <Card id={id} className="scroll-mt-24">
      <CardContent className="p-5 sm:p-8">
        <h2 className="mb-5 font-display text-xl font-bold sm:text-2xl">{title}</h2>
        {children}
      </CardContent>
    </Card>
  );
}

function TownDetails({ town }: { town: TownRecord }) {
  const index = towns.findIndex((item) => item.slug === town.slug);
  const previous = towns[index - 1], next = towns[index + 1];
  const transport = town.overview.filter((item) => item.label.startsWith("Transportation") || item.label.startsWith("Distance to"));
  const demographic = town.overview.filter((item) => /Population|Household|Occupancy|Languages|Census/i.test(item.label));
  const busSections = townSections(town, "Bus Route");
  const documents = town.sections.filter((item) => /Zoning Map|CCO Application/i.test(item.title));

  return (
    <>
      <section className="bg-foreground py-12 text-background sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link href="/towns-and-schools" className="inline-flex items-center gap-1.5 text-sm text-background/80 hover:text-background">
            <ArrowLeft className="h-4 w-4" /> All towns &amp; schools
          </Link>
          <p className="mt-8 text-xs font-semibold uppercase tracking-widest text-background/70">Bergen County, New Jersey</p>
          <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">{town.name}</h1>
          <p className="mt-3 text-sm text-background/80">Population {townValue(town, "Population") ?? "—"} · {town.schools.length} school records</p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <nav className="mb-8 flex flex-wrap gap-2 text-sm" aria-label="Town sections">
          {[["overview", "Overview"], ["schools", "Schools"], ["demographics", "Demographics"],
            ["transportation", "Transportation"], ["documents", "Documents"]].map(([id, label]) => (
            <a key={id} href={`#${id}`} className="rounded-full border border-border bg-background px-3 py-1.5 hover:bg-secondary">{label}</a>
          ))}
        </nav>

        <div className="space-y-6">
          <Section id="overview" title={`${town.name} · Town information`}>
            <div className="grid gap-3 sm:grid-cols-2">
              {town.overview.map((item, i) => (
                <div key={`${item.label}-${i}`} className="rounded-lg border border-border bg-secondary/20 p-3">
                  <dt className="text-xs text-muted-foreground">{item.label}</dt>
                  <dd className="mt-1 text-sm font-medium">
                    {item.url ? <a href={item.url} target="_blank" rel="noopener noreferrer" className={linkClass}>{item.value}</a> : item.value}
                  </dd>
                </div>
              ))}
            </div>
          </Section>

          <Section id="schools" title={`${town.name} Schools · 학교 정보`}>
            <p className="mb-4 flex items-center gap-2 text-sm text-muted-foreground"><School className="h-4 w-4" /> {town.schools.length} schools listed by the source</p>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full min-w-[900px] text-left text-sm">
                <thead className="bg-secondary/70">
                  <tr>{town.schoolColumns.map((column) => <th key={column} scope="col" className="border-b border-border p-3 font-semibold">{column}</th>)}</tr>
                </thead>
                <tbody>
                  {town.schools.map((row, index) => (
                    <tr key={`${row[0]}-${index}`} className="border-b border-border last:border-b-0 even:bg-secondary/20">
                      {town.schoolColumns.map((column, cellIndex) => (
                        <td key={column} className="p-3 align-top">{row[cellIndex] || "—"}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {town.notes.length > 0 && (
              <ul className="mt-4 space-y-1 text-xs text-muted-foreground">
                {town.notes.map((note, index) => <li key={index}>{note}</li>)}
              </ul>
            )}
          </Section>

          <div className="grid gap-6 md:grid-cols-2">
            <Section id="demographics" title="Demographics · 인구 통계">
              <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground"><Users className="h-4 w-4" /> Source figures and definitions</div>
              <dl className="space-y-3">{demographic.map((item) => (
                <div key={item.label} className="border-b border-border pb-2 text-sm">
                  <dt className="text-muted-foreground">{item.label}</dt><dd className="mt-1 font-medium">{item.value}</dd>
                </div>
              ))}</dl>
            </Section>
            <Section id="transportation" title="Transportation · 교통">
              <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground"><Bus className="h-4 w-4" /> Bus and train information</div>
              <dl className="space-y-3">{transport.map((item) => (
                <div key={item.label} className="border-b border-border pb-2 text-sm">
                  <dt className="text-muted-foreground">{item.label}</dt><dd className="mt-1 font-medium">{item.value}</dd>
                </div>
              ))}</dl>
              {busSections.flatMap((section) => section.links).length > 0 && (
                <div className="mt-6">
                  <h3 className="mb-2 font-semibold">Bus routes</h3>
                  <ul className="space-y-2 text-sm">{busSections.flatMap((section) => section.links).map((link, index) => (
                    <li key={`${link.url}-${index}`}><a href={link.url} target="_blank" rel="noopener noreferrer" className={linkClass}>{link.label} ↗</a></li>
                  ))}</ul>
                </div>
              )}
            </Section>
          </div>

          <Section id="documents" title="Town documents · 타운 문서">
            <div className="grid gap-3 sm:grid-cols-2">
              {documents.flatMap((section) => section.links.map((link) => ({ ...link, title: section.title }))).map((link, index) => (
                <a key={`${link.url}-${index}`} href={link.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg border border-border p-4 text-sm font-medium transition-colors hover:bg-secondary">
                  <FileText className="h-5 w-5 shrink-0 text-primary" /> {link.title} <ArrowRight className="ml-auto h-4 w-4" />
                </a>
              ))}
              {documents.every((section) => section.links.length === 0) && <p className="text-sm text-muted-foreground">No document link provided by the source.</p>}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">Document links open the original NJStreet files.</p>
          </Section>

          <div className="rounded-xl border border-border bg-secondary/20 p-5 text-sm text-muted-foreground">
            <p className="flex items-center gap-2 font-semibold text-foreground"><MapPin className="h-4 w-4" /> Data source</p>
            <p className="mt-2">Historical town and school tables reproduced with permission from NJStreet. Figures may not reflect current conditions; check the original dates and school notes before relying on them.</p>
            <a href={town.sourceUrl} target="_blank" rel="noopener noreferrer" className={`${linkClass} mt-2 inline-block`}>View original {town.name} page ↗</a>
          </div>

          <div className="flex flex-wrap justify-between gap-4 border-t border-border pt-6 text-sm">
            {previous ? <Link href={`/towns-and-schools/${previous.slug}`} className={linkClass}>← {previous.name}</Link> : <span />}
            {next && <Link href={`/towns-and-schools/${next.slug}`} className={linkClass}>{next.name} →</Link>}
          </div>
          <div className="rounded-2xl bg-primary p-6 text-primary-foreground sm:p-8">
            <h2 className="font-display text-2xl font-bold">Interested in {town.name}?</h2>
            <p className="mt-2 text-sm text-primary-foreground/85">매물이나 지역 정보가 궁금하다면 Grace Choi 에이전트에게 문의하세요.</p>
            <Button size="lg" variant="secondary" className="mt-5" onClick={() => useSearchStore.getState().openInquiry(null)}>Send an inquiry</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default function TownDetailPage() {
  const params = useParams();
  const town = townsBySlug[String(params?.town ?? "")];
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {town ? <TownDetails town={town} /> : (
          <div className="mx-auto max-w-4xl px-4 py-24 text-center">
            <h1 className="font-display text-3xl font-bold">Town not found</h1>
            <p className="mt-3 text-muted-foreground">Select one of the 70 towns in the Bergen County directory.</p>
            <Link href="/towns-and-schools" className={`${linkClass} mt-5 inline-block`}>Back to all towns</Link>
          </div>
        )}
        <WhyUs />
        <InquirySection variant="inline" />
      </main>
      <Footer />
      <AdminPanel />
      <ContentEditorPanel />
      <InquirySection variant="dialog" />
    </div>
  );
}
