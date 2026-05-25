import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import SettingsClient from "./components/SettingsClient";
import { SettingsDashboardData } from "./types";

export const metadata = {
  title: "Admin Settings",
};

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const [rawSettings, auditLogs] = await Promise.all([
    prisma.systemSetting.findMany(),
    prisma.auditLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
    }),
  ]);

  // Mask secrets before sending to client
  const safeSettings = rawSettings.map(setting => {
    if (setting.isSecret) {
      return { ...setting, value: "********" }; // Masked
    }
    return setting;
  });

  // Check which ENV vars exist so UI can show them as read-only overrides
  const envConfigs = {
    hasGoogleAnalytics: !!process.env.NEXT_PUBLIC_GA_ID,
    hasSentry: !!process.env.NEXT_PUBLIC_SENTRY_DSN,
    hasPostHog: !!process.env.NEXT_PUBLIC_POSTHOG_KEY,
  };

  const data: SettingsDashboardData = {
    settings: safeSettings,
    auditLogs,
    envConfigs,
  };

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Control Center</h1>
        <p className="mt-2 text-zinc-400">
          Manage global site settings, integrations, and review system audit logs.
        </p>
      </div>

      <SettingsClient data={data} />
    </div>
  );
}
