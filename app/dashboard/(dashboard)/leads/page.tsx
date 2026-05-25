import prisma from "@/lib/db";
import { LeadsCrmClient } from "./components/LeadsCrmClient";
import type { LeadRow, LeadForDrawer, FunnelMetrics, LeadStatusEventRow } from "./types";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  // Bypass Prisma Client cache completely using raw SQL
  const rawLeads: any[] = await prisma.$queryRaw`SELECT * FROM "Lead" ORDER BY "createdAt" DESC`;
  const rawHistory: any[] = await prisma.$queryRaw`SELECT * FROM "LeadStatusEvent" ORDER BY "createdAt" DESC`;

  // Attach history to leads manually
  const dbLeads = rawLeads.map(lead => ({
    ...lead,
    statusHistory: rawHistory.filter(h => h.leadId === lead.id),
  }));

  const totalLeads = dbLeads.length;
  const byStatus: Record<string, number> = {};
  let totalScore = 0;
  let scoredCount = 0;
  let totalResponseTimeMs = 0;
  let respondedCount = 0;

  // Map to serializable plain objects and calculate metrics
  const leads: LeadRow[] = dbLeads.map((lead: any) => {
    // Metrics
    byStatus[lead.status] = (byStatus[lead.status] || 0) + 1;
    if (lead.score > 0) {
      totalScore += lead.score;
      scoredCount++;
    }
    if (lead.respondedAt) {
      totalResponseTimeMs += lead.respondedAt.getTime() - lead.createdAt.getTime();
      respondedCount++;
    }

    // Sort history newest first
    const sortedHistory = [...lead.statusHistory].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    // Map history
    const history: LeadStatusEventRow[] = sortedHistory.map((h) => ({
      id: h.id,
      fromStatus: h.fromStatus,
      toStatus: h.toStatus,
      note: h.note,
      createdAt: h.createdAt.toISOString(),
    }));

    return {
      id: lead.id,
      name: lead.name,
      email: lead.email,
      company: lead.company,
      phone: lead.phone,
      intent: lead.intent,
      notes: lead.notes,
      status: lead.status,
      score: lead.score,
      utmSource: lead.utmSource,
      utmMedium: lead.utmMedium,
      utmCampaign: lead.utmCampaign,
      utmTerm: lead.utmTerm,
      utmContent: lead.utmContent,
      referrer: lead.referrer,
      sourceUrl: lead.sourceUrl,
      respondedAt: lead.respondedAt?.toISOString() ?? null,
      createdAt: lead.createdAt.toISOString(),
      updatedAt: lead.updatedAt.toISOString(),
      statusHistory: history,
    } as LeadForDrawer;
  });

  // Sort leads newest first
  leads.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const metrics: FunnelMetrics = {
    totalLeads,
    byStatus,
    avgResponseTimeMinutes:
      respondedCount > 0 ? Math.round(totalResponseTimeMs / respondedCount / 60000) : null,
    avgScore: scoredCount > 0 ? totalScore / scoredCount : 0,
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Leads CRM</h1>
        <p className="mt-2 text-zinc-400">Manage inbound leads, track funnel metrics, and edit status.</p>
      </div>

      <LeadsCrmClient leads={leads} metrics={metrics} />
    </div>
  );
}
