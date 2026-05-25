import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { fetchAIInsights } from "@/lib/ai-insights-data";
import { InsightsClient } from "./components/InsightsClient";

export const dynamic = "force-dynamic";

export default async function AIInsightsPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/dashboard/login");
  }

  const report = await fetchAIInsights();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">
          AI Insights
        </h1>
        <p className="mt-2 text-zinc-400">
          Actionable recommendations, anomaly detection, and summaries generated from your site data.
        </p>
      </div>

      <InsightsClient report={report} />
    </div>
  );
}
