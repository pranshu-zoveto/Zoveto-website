import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Zap, Users, FileText, Settings, LogOut, Target, Activity, DollarSign, Sparkles, Bell } from "lucide-react";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/dashboard/login");
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-zinc-950 text-zinc-300">
      <aside className="flex w-64 flex-col border-r border-zinc-800 bg-black p-6">
        <div className="mb-8 text-xl font-bold tracking-tight text-zinc-100">
          Zoveto Admin
        </div>
        <nav className="flex-1 space-y-2">
          <Link href="/dashboard" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-zinc-900 hover:text-zinc-100">
            <Zap className="h-4 w-4" />
            Command Center
          </Link>
          <Link href="/dashboard/leads" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-zinc-900 hover:text-zinc-100">
            <Users className="h-4 w-4" />
            Leads CRM
          </Link>
          <Link href="/dashboard/traffic" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-zinc-900 hover:text-zinc-100">
            <Zap className="h-4 w-4 text-blue-400" />
            Traffic & Intelligence
          </Link>
          <Link href="/dashboard/goals" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-zinc-900 hover:text-zinc-100">
            <Target className="h-4 w-4 text-red-400" />
            Goal Tracker
          </Link>
          <Link href="/dashboard/revenue" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-zinc-900 hover:text-zinc-100">
            <DollarSign className="h-4 w-4 text-purple-400" />
            Revenue
          </Link>
          <Link href="/dashboard/health" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-zinc-900 hover:text-zinc-100">
            <Activity className="h-4 w-4 text-emerald-400" />
            Site Health
          </Link>
          <Link href="/dashboard/alerts" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-zinc-900 hover:text-zinc-100">
            <Bell className="h-4 w-4 text-orange-400" />
            Alerts
          </Link>
          <Link href="/dashboard/ai-insights" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-zinc-900 hover:text-zinc-100">
            <Sparkles className="h-4 w-4 text-blue-400" />
            AI Insights
          </Link>
          <Link href="/dashboard/seo" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-zinc-900 hover:text-zinc-100">
            <Zap className="h-4 w-4 text-green-400" />
            SEO Center
          </Link>
          <Link href="/dashboard/content" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-zinc-900 hover:text-zinc-100">
            <FileText className="h-4 w-4 text-yellow-400" />
            Content Performance
          </Link>
          <Link href="/dashboard/blog" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-zinc-900 hover:text-zinc-100">
            <FileText className="h-4 w-4" />
            Blog Engine
          </Link>
          <Link href="/dashboard/settings" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-zinc-900 hover:text-zinc-100">
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </nav>
        <div className="mt-auto">
          <Link href="/api/auth/signout" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-zinc-500 transition-colors hover:bg-zinc-900 hover:text-zinc-100">
            <LogOut className="h-4 w-4" />
            Sign out
          </Link>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}
