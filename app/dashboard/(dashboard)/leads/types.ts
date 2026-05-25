/**
 * app/dashboard/(dashboard)/leads/types.ts
 *
 * Shared type definitions for the Leads CRM module.
 * Only plain serializable types — no Prisma or server-only imports.
 */

export const LEAD_STATUSES = ["NEW", "CONTACTED", "QUALIFIED", "WON", "LOST"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export interface LeadRow {
  id: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  intent: string | null;
  notes: string | null;
  status: string;
  score: number;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmTerm: string | null;
  utmContent: string | null;
  referrer: string | null;
  sourceUrl: string | null;
  respondedAt: string | null;   // ISO string
  createdAt: string;             // ISO string
  updatedAt: string;             // ISO string
}

export interface LeadStatusEventRow {
  id: string;
  fromStatus: string;
  toStatus: string;
  note: string | null;
  createdAt: string;             // ISO string
}

export interface LeadForDrawer extends LeadRow {
  statusHistory: LeadStatusEventRow[];
}

export interface FunnelMetrics {
  totalLeads: number;
  byStatus: Record<string, number>;
  avgResponseTimeMinutes: number | null;
  avgScore: number;
}
