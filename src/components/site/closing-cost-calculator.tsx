"use client";

import { useState, useMemo } from "react";
import { Calculator, RotateCcw, Info, TrendingDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

// ============================================================
// New Jersey Realty Transfer Fee (RTF) — tiered structure
// Effective August 1, 2024
// ============================================================

interface RTFTier {
  upto: number; // upper bound of this tier ($)
  rate: number; // percentage (e.g., 0.56 = 0.56%)
}

// General Seller — consideration > $350,000
const RTF_GENERAL_OVER_350K: RTFTier[] = [
  { upto: 150_000, rate: 0.56 },
  { upto: 200_000, rate: 0.85 },
  { upto: 550_000, rate: 0.96 },
  { upto: 850_000, rate: 1.06 },
  { upto: 1_000_000, rate: 1.16 },
  { upto: Infinity, rate: 1.21 },
];

// Senior (62+) / Blind / Disabled — consideration > $350,000
const RTF_SENIOR_OVER_350K: RTFTier[] = [
  { upto: 150_000, rate: 0.28 },
  { upto: 200_000, rate: 0.43 },
  { upto: 550_000, rate: 0.43 },
  { upto: 850_000, rate: 0.53 },
  { upto: 1_000_000, rate: 0.63 },
  { upto: Infinity, rate: 0.68 },
];

// General Seller — consideration ≤ $350,000
const RTF_GENERAL_UNDER_350K: RTFTier[] = [
  { upto: 150_000, rate: 0.40 },
  { upto: 350_000, rate: 0.67 },
];

// Senior (62+) / Blind / Disabled — consideration ≤ $350,000
const RTF_SENIOR_UNDER_350K: RTFTier[] = [
  { upto: 150_000, rate: 0.10 },
  { upto: 350_000, rate: 0.25 },
];

function calcRTF(salePrice: number, isSenior: boolean): { fee: number; breakdown: { range: string; rate: number; amount: number }[] } {
  if (salePrice <= 0) return { fee: 0, breakdown: [] };

  const tiers =
    salePrice > 350_000
      ? isSenior
        ? RTF_SENIOR_OVER_350K
        : RTF_GENERAL_OVER_350K
      : isSenior
        ? RTF_SENIOR_UNDER_350K
        : RTF_GENERAL_UNDER_350K;

  let remaining = salePrice;
  let prevBound = 0;
  let totalFee = 0;
  const breakdown: { range: string; rate: number; amount: number }[] = [];

  for (const tier of tiers) {
    if (remaining <= 0) break;
    const tierAmount = Math.min(remaining, tier.upto - prevBound);
    const fee = (tierAmount * tier.rate) / 100;
    totalFee += fee;
    breakdown.push({
      range:
        tier.upto === Infinity
          ? `Over $${prevBound.toLocaleString()}`
          : `$${prevBound.toLocaleString()} – $${tier.upto.toLocaleString()}`,
      rate: tier.rate,
      amount: fee,
    });
    remaining -= tierAmount;
    prevBound = tier.upto;
  }

  return { fee: totalFee, breakdown };
}

// ============================================================
// Main component
// ============================================================

interface CostInput {
  key: string;
  label: string;
  labelKo: string;
  type: "currency" | "percent";
  default: number;
  help?: string;
}

const COST_INPUTS: CostInput[] = [
  {
    key: "salePrice",
    label: "Sale Price",
    labelKo: "매매가",
    type: "currency",
    default: 850_000,
    help: "Total agreed sale price of the property",
  },
  {
    key: "attorneyFee",
    label: "Attorney Fee",
    labelKo: "변호사 비용",
    type: "currency",
    default: 1_200,
    help: "Typically $1,000–$1,500 in NJ",
  },
  {
    key: "brokerFeePct",
    label: "Broker Fee (%)",
    labelKo: "중개 수수료 (%)",
    type: "percent",
    default: 5,
    help: "Typically 4%–6% of sale price (split between buyer & seller agents)",
  },
  {
    key: "titleFee",
    label: "Title Related Fee",
    labelKo: "타이틀 관련 비용",
    type: "currency",
    default: 200,
    help: "Typically $100–$300",
  },
  {
    key: "ccoFee",
    label: "CCO Fee",
    labelKo: "CCO 비용",
    type: "currency",
    default: 100,
    help: "Certificate of Continued Occupancy — varies by town ($50–$150)",
  },
  {
    key: "sellerCredit",
    label: "Seller's Credit",
    labelKo: "셀러 크레딧",
    type: "currency",
    default: 0,
    help: "Credit to buyer based on inspection findings",
  },
  {
    key: "sellerConcession",
    label: "Seller's Concession",
    labelKo: "셀러 양보금",
    type: "currency",
    default: 0,
    help: "Seller's contribution to buyer's closing costs (up to ~5%)",
  },
  {
    key: "adjustments",
    label: "Adjustments",
    labelKo: "조정 항목",
    type: "currency",
    default: 0,
    help: "Property tax, insurance, HOA fee prorations",
  },
  {
    key: "otherFees",
    label: "Other Fees",
    labelKo: "기타 비용",
    type: "currency",
    default: 100,
    help: "FedEx, wire transfer, power of attorney, etc.",
  },
];

const DEFAULTS: Record<string, number> = COST_INPUTS.reduce(
  (acc, inp) => ({ ...acc, [inp.key]: inp.default }),
  {}
);

function fmt(n: number): string {
  if (isNaN(n)) return "$0";
  return `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

export function ClosingCostCalculator() {
  const [values, setValues] = useState<Record<string, number>>({ ...DEFAULTS });
  const [isSenior, setIsSenior] = useState(false);

  const salePrice = values.salePrice || 0;
  const brokerFeeDollar = (salePrice * (values.brokerFeePct || 0)) / 100;
  const { fee: rtfFee, breakdown: rtfBreakdown } = useMemo(
    () => calcRTF(salePrice, isSenior),
    [salePrice, isSenior]
  );
  // Mansion Tax: 1% on sales $1,000,000+
  const mansionTax = salePrice >= 1_000_000 ? (salePrice * 1) / 100 : 0;

  const totalCosts =
    (values.attorneyFee || 0) +
    brokerFeeDollar +
    (values.titleFee || 0) +
    (values.ccoFee || 0) +
    (values.sellerCredit || 0) +
    (values.sellerConcession || 0) +
    (values.adjustments || 0) +
    (values.otherFees || 0) +
    rtfFee +
    mansionTax;

  const netProceeds = salePrice - totalCosts;

  const handleReset = () => {
    setValues({ ...DEFAULTS });
    setIsSenior(false);
    toast("Calculator reset", {
      description: "All values restored to defaults.",
    });
  };

  const handleValueChange = (key: string, raw: string) => {
    const num = parseFloat(raw.replace(/[^0-9.]/g, ""));
    setValues((prev) => ({ ...prev, [key]: isNaN(num) ? 0 : num }));
  };

  const overThreshold = salePrice > 350_000;

  return (
    <section id="closing-cost-calculator" className="bg-secondary/30 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
            <Calculator className="h-3.5 w-3.5" />
            Interactive Calculator
          </div>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Seller&apos;s Closing Cost Calculator
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            뉴저지에서 부동산 매매 시 발생하는 비용과 부채 내역 · NJ closing costs breakdown
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Adjust any value below — totals update instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.2fr]">
          {/* ============ INPUTS ============ */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Input Values</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleReset}
                  className="gap-1.5 text-xs text-muted-foreground"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Sale price — highlighted */}
              <div className="rounded-lg border-2 border-primary/30 bg-primary/5 p-3">
                <Label className="text-xs font-semibold text-primary">
                  {COST_INPUTS[0].label} · {COST_INPUTS[0].labelKo}
                </Label>
                <Input
                  type="text"
                  inputMode="decimal"
                  value={values.salePrice ? values.salePrice.toLocaleString("en-US") : ""}
                  onChange={(e) => handleValueChange("salePrice", e.target.value)}
                  placeholder="850,000"
                  className="mt-1 border-0 bg-background text-lg font-bold text-primary"
                />
                <p className="mt-1 text-[11px] text-muted-foreground">
                  {COST_INPUTS[0].help}
                </p>
              </div>

              {/* Other inputs in a grid */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {COST_INPUTS.slice(1).map((inp) => (
                  <div key={inp.key}>
                    <Label className="text-xs">
                      {inp.label}
                      <span className="ml-1 text-muted-foreground">· {inp.labelKo}</span>
                    </Label>
                    <div className="relative mt-1">
                      {inp.type === "currency" && (
                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                          $
                        </span>
                      )}
                      <Input
                        type="text"
                        inputMode="decimal"
                        value={
                          values[inp.key]
                            ? inp.type === "percent"
                              ? String(values[inp.key])
                              : values[inp.key].toLocaleString("en-US")
                            : ""
                        }
                        onChange={(e) => handleValueChange(inp.key, e.target.value)}
                        placeholder={String(inp.default)}
                        className={inp.type === "currency" ? "pl-7" : "pr-7"}
                      />
                      {inp.type === "percent" && (
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                          %
                        </span>
                      )}
                    </div>
                    {inp.help && (
                      <p className="mt-0.5 text-[11px] text-muted-foreground">{inp.help}</p>
                    )}
                  </div>
                ))}
              </div>

              {/* Senior / disabled toggle */}
              <div className="flex items-center gap-3 rounded-lg border border-border p-3">
                <input
                  type="checkbox"
                  id="senior-toggle"
                  checked={isSenior}
                  onChange={(e) => setIsSenior(e.target.checked)}
                  className="h-4 w-4 rounded border-input accent-primary"
                />
                <div>
                  <Label htmlFor="senior-toggle" className="text-sm font-medium cursor-pointer">
                    Senior (62+) / Blind / Disabled
                  </Label>
                  <p className="text-[11px] text-muted-foreground">
                    Reduced RTF rate for qualifying seller (1-unit owner-occupied, 1+ year)
                  </p>
                </div>
              </div>

              {/* Threshold notice */}
              <div
                className={`rounded-md border p-2.5 text-xs ${
                  overThreshold
                    ? "border-amber-500/30 bg-amber-500/5 text-amber-700"
                    : "border-emerald-600/30 bg-emerald-600/5 text-emerald-700"
                }`}
              >
                <Info className="inline h-3 w-3" /> Sale price is{" "}
                <strong>{overThreshold ? "over $350,000" : "$350,000 or less"}</strong> — using{" "}
                {overThreshold ? "higher-tier" : "lower-tier"} RTF rates.
                {salePrice >= 1_000_000 && (
                  <span className="ml-1 font-semibold">
                    · Mansion Tax (1%) applies!
                  </span>
                )}
              </div>
            </CardContent>
          </Card>

          {/* ============ RESULTS ============ */}
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingDown className="h-5 w-5 text-primary" />
                Cost Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Category</TableHead>
                    <TableHead className="text-right text-xs">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <CostRow
                    label="Attorney Fee"
                    labelKo="변호사 비용"
                    amount={values.attorneyFee || 0}
                  />
                  <CostRow
                    label={`Broker Fee (${values.brokerFeePct || 0}%)`}
                    labelKo="중개 수수료"
                    amount={brokerFeeDollar}
                  />
                  <CostRow
                    label="Title Related Fee"
                    labelKo="타이틀 비용"
                    amount={values.titleFee || 0}
                  />
                  <CostRow
                    label="CCO Fee"
                    labelKo="CCO 비용"
                    amount={values.ccoFee || 0}
                  />
                  <CostRow
                    label="Realty Transfer Fee"
                    labelKo="부동산 이전 수수료"
                    amount={rtfFee}
                    badge={isSenior ? "Senior" : "General"}
                    expandable={rtfBreakdown}
                  />
                  {mansionTax > 0 && (
                    <CostRow
                      label="Mansion Tax (1%)"
                      labelKo="저택세"
                      amount={mansionTax}
                    />
                  )}
                  <CostRow
                    label="Seller's Credit"
                    labelKo="셀러 크레딧"
                    amount={values.sellerCredit || 0}
                  />
                  <CostRow
                    label="Seller's Concession"
                    labelKo="셀러 양보금"
                    amount={values.sellerConcession || 0}
                  />
                  <CostRow
                    label="Adjustments"
                    labelKo="조정 항목"
                    amount={values.adjustments || 0}
                  />
                  <CostRow
                    label="Other Fees"
                    labelKo="기타 비용"
                    amount={values.otherFees || 0}
                  />
                </TableBody>
              </Table>

              <Separator className="my-4" />

              {/* Totals */}
              <div className="space-y-2">
                <div className="flex items-center justify-between rounded-lg bg-secondary/60 px-4 py-2.5">
                  <div>
                    <div className="text-sm font-semibold text-foreground">
                      Total Closing Costs
                    </div>
                    <div className="text-xs text-muted-foreground">총 비용</div>
                  </div>
                  <div className="text-xl font-bold text-destructive">
                    −{fmt(totalCosts)}
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-secondary/60 px-4 py-2.5">
                  <div>
                    <div className="text-sm font-semibold text-foreground">
                      Sale Price
                    </div>
                    <div className="text-xs text-muted-foreground">매매가</div>
                  </div>
                  <div className="text-xl font-bold text-foreground">
                    {fmt(salePrice)}
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-lg border-2 border-primary/30 bg-primary/5 px-4 py-3">
                  <div>
                    <div className="text-sm font-semibold text-primary">
                      Net Proceeds
                    </div>
                    <div className="text-xs text-muted-foreground">
                      실수령액 · Sale Price − Closing Costs
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-primary">
                    {fmt(netProceeds)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RTF rate reference table */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-base">
              Realty Transfer Fee Rate Reference
              <span className="ml-2 text-xs font-normal text-muted-foreground">
                NJ Division of Taxation · Effective Aug 1, 2024
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Over $350K */}
              <div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Sale Price &gt; $350,000
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs">Consideration Range</TableHead>
                      <TableHead className="text-right text-xs">General</TableHead>
                      <TableHead className="text-right text-xs">Senior</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <RTFRow range="$0 – $150,000" general="0.56%" senior="0.28%" />
                    <RTFRow range="$150,001 – $200,000" general="0.85%" senior="0.43%" />
                    <RTFRow range="$200,001 – $550,000" general="0.96%" senior="0.43%" />
                    <RTFRow range="$550,001 – $850,000" general="1.06%" senior="0.53%" />
                    <RTFRow range="$850,001 – $1,000,000" general="1.16%" senior="0.63%" />
                    <RTFRow range="Over $1,000,000" general="1.21%" senior="0.68%" />
                  </TableBody>
                </Table>
              </div>
              {/* $350K or less */}
              <div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Sale Price ≤ $350,000
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs">Consideration Range</TableHead>
                      <TableHead className="text-right text-xs">General</TableHead>
                      <TableHead className="text-right text-xs">Senior</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <RTFRow range="$0 – $150,000" general="0.40%" senior="0.10%" />
                    <RTFRow range="$150,001 – $350,000" general="0.67%" senior="0.25%" />
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="mt-4 rounded-md border border-border bg-secondary/40 p-3 text-xs text-muted-foreground">
              <p className="font-semibold text-foreground">RTF Exemptions:</p>
              <ol className="mt-1 list-inside list-decimal space-y-0.5">
                <li>Government property transactions</li>
                <li>Transfers between husband and wife, or parent and child</li>
                <li>Converting all co-op units to condo</li>
                <li>Correction on a previously recorded deed</li>
              </ol>
              <p className="mt-2">
                <strong>Mansion Tax:</strong> Additional 1% on sales of $1,000,000 or more
                (separate from RTF).
              </p>
              <p className="mt-1">
                <strong>Disclaimer:</strong> This calculator provides estimates only.
                Actual closing costs may vary. Consult a licensed NJ real estate
                attorney for exact figures.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

// ============ Sub-components ============

function CostRow({
  label,
  labelKo,
  amount,
  badge,
  expandable,
}: {
  label: string;
  labelKo: string;
  amount: number;
  badge?: string;
  expandable?: { range: string; rate: number; amount: number }[];
}) {
  return (
    <>
      <TableRow>
        <TableCell>
          <div className="font-medium text-foreground">{label}</div>
          <div className="text-[11px] text-muted-foreground">{labelKo}</div>
          {badge && (
            <Badge variant="secondary" className="mt-1 text-[10px]">
              {badge}
            </Badge>
          )}
        </TableCell>
        <TableCell className="text-right font-mono text-sm tabular-nums">
          {fmt(amount)}
        </TableCell>
      </TableRow>
      {expandable && expandable.length > 0 && (
        <TableRow className="bg-secondary/30">
          <TableCell colSpan={2} className="py-2">
            <div className="space-y-0.5 pl-3 text-[11px] text-muted-foreground">
              {expandable.map((b, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span>
                    {b.range} @ {b.rate}%
                  </span>
                  <span className="font-mono">{fmt(b.amount)}</span>
                </div>
              ))}
            </div>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

function RTFRow({
  range,
  general,
  senior,
}: {
  range: string;
  general: string;
  senior: string;
}) {
  return (
    <TableRow>
      <TableCell className="text-xs">{range}</TableCell>
      <TableCell className="text-right text-xs font-mono">{general}</TableCell>
      <TableCell className="text-right text-xs font-mono">{senior}</TableCell>
    </TableRow>
  );
}
