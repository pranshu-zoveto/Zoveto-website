/**
 * app/dashboard/(dashboard)/ai-insights/types.ts
 */

export interface WeeklySummary {
  text: string;
  metrics: {
    leads: { current: number; previous: number };
    revenue: { current: number; previous: number };
    traffic: { current: number; previous: number };
  };
}

export interface AnomalyAlert {
  id: string;
  type: "traffic_drop" | "error_spike" | "form_failure" | "lead_spike" | "seo_drop";
  title: string;
  description: string;
  severity: "high" | "medium" | "low";
}

export interface InsightRecommendation {
  id: string;
  actionType: "update_content" | "fix_broken_page" | "follow_up_lead" | "improve_cta" | "review_traffic";
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
}

export interface AIInsightsReport {
  generatedAt: string;
  summary: WeeklySummary;
  anomalies: AnomalyAlert[];
  recommendations: InsightRecommendation[];
}
