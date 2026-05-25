"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Calculator, Download, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { trackMarketingEvent } from "@/lib/tracking";

function parseNumber(value: string): number {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

export function ReorderPointCalculatorClient() {
  const [dailySales, setDailySales] = useState("20");
  const [leadTime, setLeadTime] = useState("7");
  const [safetyStock, setSafetyStock] = useState("50");
  const [touched, setTouched] = useState(false);

  const result = useMemo(() => {
    const avg = parseNumber(dailySales);
    const days = parseNumber(leadTime);
    const safety = parseNumber(safetyStock);
    return {
      avg,
      days,
      safety,
      reorderPoint: Math.ceil(avg * days + safety),
      demandDuringLeadTime: Math.ceil(avg * days),
    };
  }, [dailySales, leadTime, safetyStock]);

  function markUsed(source: string) {
    if (!touched) {
      trackMarketingEvent("calculator_used", {
        calculator: "reorder_point",
        source,
        average_daily_sales: result.avg,
        lead_time_days: result.days,
        safety_stock: result.safety,
        reorder_point: result.reorderPoint,
      });
      setTouched(true);
    }
  }

  function handleExportIntent() {
    trackMarketingEvent("calculator_export_request", {
      calculator: "reorder_point",
      average_daily_sales: result.avg,
      lead_time_days: result.days,
      safety_stock: result.safety,
      reorder_point: result.reorderPoint,
    });
  }

  function reset() {
    setDailySales("20");
    setLeadTime("7");
    setSafetyStock("50");
    setTouched(false);
  }

  const inputClass =
    "min-h-[52px] w-full rounded-xl border border-border bg-card px-4 text-base text-foreground outline-none transition focus:border-blue focus:ring-2 focus:ring-blue/15";

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
      <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6 md:p-8" aria-labelledby="calculator-heading">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue/20 bg-blue-light text-blue">
            <Calculator className="h-5 w-5" aria-hidden />
          </div>
          <div>
            <Text as="h2" variant="heading-1" id="calculator-heading" className="text-xl text-foreground">
              Calculate reorder point
            </Text>
            <p className="mt-1 text-sm text-muted">Formula: daily demand x lead time + safety stock.</p>
          </div>
        </div>

        <div className="grid gap-5">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-foreground">Average daily sales</span>
            <input
              type="number"
              min="0"
              inputMode="decimal"
              value={dailySales}
              onFocus={() => markUsed("daily_sales_focus")}
              onChange={(e) => {
                setDailySales(e.target.value);
                markUsed("daily_sales_change");
              }}
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-foreground">Supplier lead time in days</span>
            <input
              type="number"
              min="0"
              inputMode="decimal"
              value={leadTime}
              onFocus={() => markUsed("lead_time_focus")}
              onChange={(e) => {
                setLeadTime(e.target.value);
                markUsed("lead_time_change");
              }}
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-foreground">Safety stock</span>
            <input
              type="number"
              min="0"
              inputMode="decimal"
              value={safetyStock}
              onFocus={() => markUsed("safety_stock_focus")}
              onChange={(e) => {
                setSafetyStock(e.target.value);
                markUsed("safety_stock_change");
              }}
              className={inputClass}
            />
          </label>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button type="button" variant="outline" size="lg" className="gap-2" onClick={reset}>
            <RotateCcw className="h-4 w-4" aria-hidden />
            Reset
          </Button>
          <Link href="/contact#demo" onClick={handleExportIntent}>
            <Button type="button" variant="primary" size="lg" className="w-full gap-2 sm:w-auto">
              <Download className="h-4 w-4" aria-hidden />
              Review this SKU plan
            </Button>
          </Link>
        </div>
      </section>

      <aside className="rounded-2xl border border-blue/20 bg-blue/[0.06] p-6 md:p-8" aria-label="Reorder point result">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue">Recommended reorder point</p>
        <p className="mt-3 text-5xl font-bold tracking-tight text-foreground">{result.reorderPoint}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Reorder when stock reaches about <strong className="text-foreground">{result.reorderPoint}</strong> units.
          This covers <strong className="text-foreground">{result.demandDuringLeadTime}</strong> units of expected
          demand during lead time plus <strong className="text-foreground">{result.safety}</strong> units of safety stock.
        </p>
        <div className="mt-6 space-y-3 rounded-xl border border-border bg-card p-4 text-sm text-muted">
          <p>
            If stockouts still happen at this point, review lead time variance, supplier reliability, and seasonal demand.
          </p>
          <p>
            Zoveto can turn this rule into live inventory alerts when SKU movement, purchase orders, and warehouse stock
            sit in the same operating system.
          </p>
        </div>
        <div className="mt-6 flex flex-col gap-3">
          <Link href="/inventory-management-software-india" className="font-medium text-blue underline-offset-4 hover:underline">
            Read the inventory software guide
          </Link>
          <Link href="/warehouse-management-system-india" className="font-medium text-blue underline-offset-4 hover:underline">
            Compare warehouse workflows
          </Link>
        </div>
      </aside>
    </div>
  );
}

export default ReorderPointCalculatorClient;
