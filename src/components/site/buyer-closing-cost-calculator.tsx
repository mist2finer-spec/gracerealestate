"use client";

import { useState, useMemo } from "react";
import { Calculator, RotateCcw, Info, TrendingUp, Building2, Home } from "lucide-react";
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
// New Jersey Title Insurance rates (approximate, based on sale price)
// Standard NJ title insurance premium schedule
// ============================================================

interface TitleTier {
  upto: number;
  rate: number; // per $1,000 of coverage
}

// NJ title insurance tiers (approximate, based on common rate cards)
const TITLE_TIERS: TitleTier[] = [
  { upto: 100_000, rate: 4.50 },
  { upto: 500_000, rate: 3.75 },
  { upto: 1_000_000, rate: 3.25 },
  { upto: 5_000_000, rate: 2.75 },
  { upto: Infinity, rate: 2.50 },
];

function calcTitleInsurance(salePrice: number): { fee: number; breakdown: { range: string; rate: number; amount: number }[] } {
  if (salePrice <= 0) return { fee: 0, breakdown: [] };

  let remaining = salePrice;
  let prevBound = 0;
  let totalFee = 0;
  const breakdown: { range: string; rate: number; amount: number }[] = [];

  for (const tier of TITLE_TIERS) {
    if (remaining <= 0) break;
    const tierAmount = Math.min(remaining, tier.upto - prevBound);
    const fee = (tierAmount * tier.rate) / 1000;
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
  /** Whether this fee only applies to condo/townhouse */
  condoOnly?: boolean;
  /** Whether this fee only applies to single family */
  singleFamilyOnly?: boolean;
}

const COST_INPUTS: CostInput[] = [
  {
    key: "salePrice",
    label: "Purchase Price",
    labelKo: "매입가",
    type: "currency",
    default: 850_000,
    help: "Total agreed purchase price of the property",
  },
  {
    key: "downPaymentPct",
    label: "Down Payment (%)",
    labelKo: "계약금 (%)",
    type: "percent",
    default: 20,
    help: "Typically 3.5%-20% depending on loan type",
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
    key: "inspection",
    label: "Inspection",
    labelKo: "주택 검사",
    type: "currency",
    default: 700,
    help: "Home, Termite, Radon — Single Family $500-$900; Condo $300-$600",
  },
  {
    key: "appraisal",
    label: "Appraisal",
    labelKo: "감정서",
    type: "currency",
    default: 600,
    help: "Typically $450–$800 — required by lender",
  },
  {
    key: "recording",
    label: "Recording",
    labelKo: "등기비",
    type: "currency",
    default: 400,
    help: "~$150 new owner + ~$250 mortgage",
  },
  {
    key: "survey",
    label: "Survey",
    labelKo: "측량비",
    type: "currency",
    default: 850,
    help: "$700–$1,000 — requested by lender (Single Family only)",
    singleFamilyOnly: true,
  },
  {
    key: "titleSearch",
    label: "Title Search",
    labelKo: "타이틀 서치",
    type: "currency",
    default: 1_200,
    help: "Single Family $1,000-$1,600; Condo ~$950 or $1,200-$1,600",
  },
  {
    key: "mortgageFees",
    label: "Mortgage Fees",
    labelKo: "모기지 수수료",
    type: "currency",
    default: 1_500,
    help: "Application, Underwriter, PMI, Points, Prepaid Interest",
  },
  {
    key: "propertyTax",
    label: "Property Tax (Prepaid)",
    labelKo: "재산세 (선납)",
    type: "currency",
    default: 3_000,
    help: "Pro-rate current quarter + 3 months prepay + 2-3 month escrow",
  },
  {
    key: "homeInsurance",
    label: "Home Insurance (1yr)",
    labelKo: "주택 보험 (1년)",
    type: "currency",
    default: 1_500,
    help: "1-year policy prepaid at closing",
  },
  {
    key: "condoFees",
    label: "Condo Fees (Capital + Move-in)",
    labelKo: "콘도 부대비용",
    type: "currency",
    default: 1_500,
    help: "Capital contribution (2-4 mo HOA) + move-in $300-$600 + package $150-$450 + deposit $500-$1,000",
    condoOnly: true,
  },
  {
    key: "otherFees",
    label: "Other Fees",
    labelKo: "기타 비용",
    type: "currency",
    default: 200,
    help: "FedEx, POA, Wire Transfer, etc.",
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

type PropertyType = "single-family" | "condo";

export function BuyerClosingCostCalculator() {
  const [values, setValues] = useState<Record<string, number>>({ ...DEFAULTS });
  const [propertyType, setPropertyType] = useState<PropertyType>("single-family");

  const salePrice = values.salePrice || 0;
  const downPaymentPct = values.downPaymentPct || 0;
  const downPaymentDollar = (salePrice * downPaymentPct) / 100;
  const loanAmount = salePrice - downPaymentDollar;

  // Title insurance — based on sale price (computed automatically)
  const { fee: titleInsurance, breakdown: titleBreakdown } = useMemo(
    () => calcTitleInsurance(salePrice),
    [salePrice]
  );

  // NJ Mansion Tax: 1% on sales $1,000,000+ (buyer pays)
  const mansionTax = salePrice >= 1_000_000 ? (salePrice * 1) / 100 : 0;

  // Sum all closing costs
  const visibleInputs = COST_INPUTS.filter((inp) => {
    if (inp.condoOnly && propertyType !== "condo") return false;
    if (inp.singleFamilyOnly && propertyType !== "single-family") return false;
    return true;
  });

  const lineItemsTotal =
    (values.attorneyFee || 0) +
    (values.inspection || 0) +
    (values.appraisal || 0) +
    (values.recording || 0) +
    (propertyType === "single-family" ? values.survey || 0 : 0) +
    (values.titleSearch || 0) +
    titleInsurance +
    (values.mortgageFees || 0) +
    (values.propertyTax || 0) +
    (values.homeInsurance || 0) +
    (propertyType === "condo" ? values.condoFees || 0 : 0) +
    (values.otherFees || 0) +
    mansionTax;

  const totalCashNeeded = downPaymentDollar + lineItemsTotal;

  const handleReset = () => {
    setValues({ ...DEFAULTS });
    setPropertyType("single-family");
    toast("Calculator reset", {
      description: "All values restored to defaults.",
    });
  };

  const handleValueChange = (key: string, raw: string) => {
    const num = parseFloat(raw.replace(/[^0-9.]/g, ""));
    setValues((prev) => ({ ...prev, [key]: isNaN(num) ? 0 : num }));
  };

  return (
    <section id="buyer-closing-cost-calculator" className="bg-secondary/30 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
            <Calculator className="h-3.5 w-3.5" />
            Interactive Calculator
          </div>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Buyer&apos;s Closing Cost Calculator
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            뉴저지에서 부동산 매입 시 구매자가 납부해야 할 부대 비용 내역 · NJ buyer closing costs breakdown
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
              {/* Purchase price — highlighted */}
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

              {/* Property type toggle */}
              <div>
                <Label className="text-xs">Property Type · 매물 종류</Label>
                <div className="mt-1 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPropertyType("single-family")}
                    className={`flex items-center justify-center gap-1.5 rounded-md border px-3 py-2 text-sm font-medium transition-colors ${
                      propertyType === "single-family"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:bg-secondary"
                    }`}
                  >
                    <Home className="h-4 w-4" />
                    Single Family
                  </button>
                  <button
                    type="button"
                    onClick={() => setPropertyType("condo")}
                    className={`flex items-center justify-center gap-1.5 rounded-md border px-3 py-2 text-sm font-medium transition-colors ${
                      propertyType === "condo"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:bg-secondary"
                    }`}
                  >
                    <Building2 className="h-4 w-4" />
                    Condo / Townhouse
                  </button>
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  Different fees apply — survey (single family) vs condo fees
                </p>
              </div>

              {/* Other inputs in a grid */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {COST_INPUTS.slice(1).map((inp) => {
                  const isHidden =
                    (inp.condoOnly && propertyType !== "condo") ||
                    (inp.singleFamilyOnly && propertyType !== "single-family");
                  if (isHidden) return null;
                  return (
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
                  );
                })}
              </div>

              {/* Threshold notice */}
              <div
                className={`rounded-md border p-2.5 text-xs ${
                  salePrice >= 1_000_000
                    ? "border-amber-500/30 bg-amber-500/5 text-amber-700"
                    : "border-emerald-600/30 bg-emerald-600/5 text-emerald-700"
                }`}
              >
                <Info className="inline h-3 w-3" />{" "}
                {salePrice >= 1_000_000 ? (
                  <>
                    Purchase price is <strong>$1,000,000+</strong> — NJ Mansion
                    Tax (1%) applies!
                  </>
                ) : (
                  <>
                    Purchase price is <strong>under $1,000,000</strong> — no
                    Mansion Tax.
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* ============ RESULTS ============ */}
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5 text-primary" />
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
                    label="Inspection"
                    labelKo="주택 검사"
                    amount={values.inspection || 0}
                  />
                  <CostRow
                    label="Appraisal"
                    labelKo="감정서"
                    amount={values.appraisal || 0}
                  />
                  <CostRow
                    label="Recording"
                    labelKo="등기비"
                    amount={values.recording || 0}
                  />
                  {propertyType === "single-family" && (
                    <CostRow
                      label="Survey"
                      labelKo="측량비"
                      amount={values.survey || 0}
                    />
                  )}
                  <CostRow
                    label="Title Search"
                    labelKo="타이틀 서치"
                    amount={values.titleSearch || 0}
                  />
                  <CostRow
                    label="Title Insurance"
                    labelKo="타이틀 보험"
                    amount={titleInsurance}
                    badge="auto-calc"
                    expandable={titleBreakdown}
                  />
                  <CostRow
                    label="Mortgage Fees"
                    labelKo="모기지 수수료"
                    amount={values.mortgageFees || 0}
                  />
                  <CostRow
                    label="Property Tax (Prepaid)"
                    labelKo="재산세 (선납)"
                    amount={values.propertyTax || 0}
                  />
                  <CostRow
                    label="Home Insurance (1yr)"
                    labelKo="주택 보험 (1년)"
                    amount={values.homeInsurance || 0}
                  />
                  {propertyType === "condo" && (
                    <CostRow
                      label="Condo Fees (Capital + Move-in)"
                      labelKo="콘도 부대비용"
                      amount={values.condoFees || 0}
                    />
                  )}
                  {mansionTax > 0 && (
                    <CostRow
                      label="Mansion Tax (1%)"
                      labelKo="저택세"
                      amount={mansionTax}
                    />
                  )}
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
                      Down Payment ({downPaymentPct}%)
                    </div>
                    <div className="text-xs text-muted-foreground">
                      계약금 · {fmt(loanAmount)} loan
                    </div>
                  </div>
                  <div className="text-xl font-bold text-foreground">
                    {fmt(downPaymentDollar)}
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-secondary/60 px-4 py-2.5">
                  <div>
                    <div className="text-sm font-semibold text-foreground">
                      Closing Costs
                    </div>
                    <div className="text-xs text-muted-foreground">부대 비용</div>
                  </div>
                  <div className="text-xl font-bold text-destructive">
                    −{fmt(lineItemsTotal)}
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-lg border-2 border-primary/30 bg-primary/5 px-4 py-3">
                  <div>
                    <div className="text-sm font-semibold text-primary">
                      Total Cash Needed
                    </div>
                    <div className="text-xs text-muted-foreground">
                      총 필요 자금 · Down Payment + Closing Costs
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-primary">
                    {fmt(totalCashNeeded)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reference table */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-base">
              NJ Buyer Closing Costs — Reference
              <span className="ml-2 text-xs font-normal text-muted-foreground">
                Typical ranges for Single Family vs Condo
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Category</TableHead>
                    <TableHead className="text-xs">Single Family / 2-4 Family</TableHead>
                    <TableHead className="text-xs">Condo / Townhouse</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <RefRow cat="Attorney Fee" sf="$1,000 – $1,500" condo="$1,000 – $1,500" />
                  <RefRow cat="Inspection" sf="$500 – $900 (Home, Termite, Radon) + $250-$300 (Oil Tank Sweep) + $250-$300 (Sewer)" condo="$300 – $600 (Home)" />
                  <RefRow cat="Appraisal" sf="$450 – $800" condo="$450 – $800" />
                  <RefRow cat="Recording" sf="~$150 (New Owner) + ~$250 (Mortgage)" condo="~$150 + ~$250" />
                  <RefRow cat="Survey" sf="$700 – $1,000 (lender request)" condo="N/A" />
                  <RefRow cat="Condo Fees" sf="N/A" condo="Capital Contribution (2-4 mo HOA) + Move-in $300-$600 + Deposit $500-$1,000 + Package $150-$450" />
                  <RefRow cat="Title Search" sf="$1,000 – $1,600" condo="~$950 or $1,200 – $1,600" />
                  <RefRow cat="Title Insurance" sf="Based on sale price (auto-calculated above)" condo="Based on sale price (auto-calculated above)" />
                  <RefRow cat="Mortgage Fees" sf="Application + Underwriter + PMI + Points + Prepaid Interest" condo="Same" />
                  <RefRow cat="Property Tax" sf="Pro-rate current Qtr + 3 mo prepay + 2-3 mo escrow" condo="Same" />
                  <RefRow cat="Home Insurance" sf="Home Insurance (1 year prepaid)" condo="Condo Insurance / Master Insurance" />
                  <RefRow cat="Mansion Tax" sf="1% on $1M+" condo="1% on $1M+" />
                  <RefRow cat="Other Fees" sf="FedEx, POA, Wire Transfer, etc." condo="Same" />
                </TableBody>
              </Table>
            </div>

            <div className="mt-4 rounded-md border border-border bg-secondary/40 p-3 text-xs text-muted-foreground">
              <p className="font-semibold text-foreground">Notes:</p>
              <ul className="mt-1 list-inside list-disc space-y-0.5">
                <li>Title insurance is calculated automatically based on the purchase price (NJ tiered rates).</li>
                <li>NY buyers also pay Mortgage Tax (1.05%-1.8% depending on county) — not included here.</li>
                <li>NJ Mansion Tax (1%) applies to sales of $1,000,000 or more.</li>
                <li>Condo buyers pay additional HOA / Capital Contribution fees at closing.</li>
                <li>Single Family buyers typically pay for Survey (lender-required).</li>
              </ul>
              <p className="mt-2">
                <strong>Disclaimer:</strong> This calculator provides estimates only.
                Actual closing costs may vary by lender, town, and transaction.
                Consult a licensed NJ real estate attorney for exact figures.
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
                    {b.range} @ ${b.rate}/$1,000
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

function RefRow({
  cat,
  sf,
  condo,
}: {
  cat: string;
  sf: string;
  condo: string;
}) {
  return (
    <TableRow>
      <TableCell className="text-xs font-medium">{cat}</TableCell>
      <TableCell className="text-xs">{sf}</TableCell>
      <TableCell className="text-xs">{condo}</TableCell>
    </TableRow>
  );
}
