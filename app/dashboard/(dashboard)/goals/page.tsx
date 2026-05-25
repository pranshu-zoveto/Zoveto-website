import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { fetchGoalReport } from "@/lib/goals-data";
import { GoalsClient } from "./components/GoalsClient";
import type { GoalRange } from "./types";

export const dynamic = "force-dynamic";

export default async function GoalsDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/dashboard/login");
  }

  const { range: rawRange } = await searchParams;
  const validRanges: GoalRange[] = ["today", "7d", "30d", "90d"];
  const range = validRanges.includes(rawRange as GoalRange) ? (rawRange as GoalRange) : "30d";

  const report = await fetchGoalReport(range);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">
          Goal / Conversion Tracker
        </h1>
        <p className="mt-2 text-zinc-400">
          Track meaningful actions across the website to see which pages, channels, and campaigns convert best.
        </p>
      </div>

      <GoalsClient report={report} />
    </div>
  );
}
