import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { fetchContentPerformance } from "@/lib/content-performance-data";
import { ContentClient } from "./components/ContentClient";

export const dynamic = "force-dynamic";

export default async function ContentPerformanceDashboard() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/dashboard/login");
  }

  const report = await fetchContentPerformance();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">
          Content Performance Dashboard
        </h1>
        <p className="mt-2 text-zinc-400">
          Measure leads, engagement, conversion rates, and track content decay across CMS and static blog posts.
        </p>
      </div>

      <ContentClient report={report} />
    </div>
  );
}
