/**
 * app/dashboard/(dashboard)/revenue/types.ts
 */

export interface RevenueMetrics {
  monthlyRevenue: number;
  pipelineValue: number;
  avgDealSize: number;
  leadToCloseRate: number;
  closedWonCount: number;
  closedLostCount: number;
}

export interface FunnelMetrics {
  visitors: number;
  leads: number;
  deals: number;
  wins: number;
}

export interface RevenueTrend {
  date: string;
  revenue: number;
}

export interface AttributionMetric {
  label: string;
  revenue: number;
}

export interface DealItem {
  id: string;
  name: string;
  value: number;
  status: "OPEN" | "WON" | "LOST";
  leadName?: string;
  createdAt: string;
}

export interface RevenueReport {
  metrics: RevenueMetrics;
  funnel: FunnelMetrics;
  trend: RevenueTrend[];
  bySource: AttributionMetric[];
  byPage: AttributionMetric[];
  recentDeals: DealItem[];
}
