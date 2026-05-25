import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { fetchSeoAuditReport } from "@/lib/seo-audit-data";
import { SeoClient } from "./components/SeoClient";

export const dynamic = "force-dynamic";

export default async function SeoPerformanceCenterPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/dashboard/login");
  }

  const report = await fetchSeoAuditReport();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">
          SEO Performance Center
        </h1>
        <p className="mt-2 text-zinc-400">
          Manage indexing, crawl health, metadata quality, and search performance.
        </p>
      </div>

      <SeoClient report={report} />
    </div>
  );
}
