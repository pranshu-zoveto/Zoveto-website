import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { runAlertEngine } from "@/lib/alert-engine";
import AlertsClient from "./components/AlertsClient";

export const metadata = {
  title: "Alerts & Notifications",
};

export default async function AlertsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  // Lazily trigger the alert engine when dashboard is viewed
  // Note: in a high-traffic production app, this would be decoupled into a CRON job.
  await runAlertEngine();

  const [rules, history, targets] = await Promise.all([
    prisma.alertRule.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.alertHistory.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
      include: { rule: true }
    }),
    prisma.notificationTarget.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Alerts & Notifications</h1>
        <p className="mt-2 text-zinc-400">
          Configure automated rules and see system-wide events here.
        </p>
      </div>

      <AlertsClient data={{ rules, history, targets }} />
    </div>
  );
}
