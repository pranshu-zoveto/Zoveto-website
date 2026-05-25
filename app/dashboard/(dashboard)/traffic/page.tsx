import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prismaAnalyticsProvider } from "@/lib/analytics/providers/prisma-provider";
import { ga4AnalyticsProvider } from "@/lib/analytics/providers/ga4-provider";
import { TrafficClient } from "./components/TrafficClient";
import type { TrafficRange } from "@/lib/analytics/types";

export const dynamic = "force-dynamic";

export default async function TrafficIntelligencePage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/dashboard/login");
  }

  const { range: rawRange } = await searchParams;
  
  // Validate range
  const validRanges: TrafficRange[] = ["today", "7d", "30d", "90d"];
  const range = validRanges.includes(rawRange as TrafficRange) 
    ? (rawRange as TrafficRange) 
    : "30d";

  let provider: any = prismaAnalyticsProvider;
  if (ga4AnalyticsProvider.isAvailable()) {
    provider = ga4AnalyticsProvider;
  }
  
  let report = await provider.fetchReport(range);

  // If GA4 failed despite having credentials, gracefully fallback to Prisma
  if (report.provider.status === "unavailable" && provider.key === "ga4") {
    report = await prismaAnalyticsProvider.fetchReport(range);
    report.provider.note = "GA4 API failed. Showing database proxy fallback.";
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">
          Traffic & Visitor Intelligence
        </h1>
        <p className="mt-2 text-zinc-400">
          Analyze visitor behavior, acquisition channels, device metrics, and page performance.
        </p>
      </div>

      <TrafficClient report={report} selectedRange={range} />
    </div>
  );
}
