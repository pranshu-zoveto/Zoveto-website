import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { fetchHealthData } from "@/lib/health-data";
import { HealthClient } from "./components/HealthClient";

export const dynamic = "force-dynamic";

export default async function SiteHealthPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/dashboard/login");
  }

  const report = await fetchHealthData();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">
          Site Health Monitor
        </h1>
        <p className="mt-2 text-zinc-400">
          Real-time visibility into site uptime, performance, errors, and technical regressions.
        </p>
      </div>

      <HealthClient initialReport={report} />
    </div>
  );
}
