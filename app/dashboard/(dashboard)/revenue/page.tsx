import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { fetchRevenueReport } from "@/lib/revenue-data";
import { RevenueClient } from "./components/RevenueClient";

export const dynamic = "force-dynamic";

export default async function RevenueDashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/dashboard/login");
  }

  // Currently we use a fixed 30 day range for simplicity. Could add query param handling later.
  const report = await fetchRevenueReport(30);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">
          Revenue / Business Metrics
        </h1>
        <p className="mt-2 text-zinc-400">
          Track business impact, pipeline value, deal conversions, and revenue attribution.
        </p>
      </div>

      <RevenueClient report={report} />
    </div>
  );
}
