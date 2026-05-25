/**
 * app/dashboard/(dashboard)/goals/types.ts
 */

export type GoalRange = "today" | "7d" | "30d" | "90d";

export interface GoalMetric {
  name: string;
  total: number;
  unique: number;
  conversionRate: number; // 0-100
}

export interface DimensionMetric {
  label: string;
  value: number;
}

export interface GoalTrendData {
  date: string; // YYYY-MM-DD
  events: Record<string, number>;
}

export interface GoalReport {
  range: GoalRange;
  totalEvents: number;
  totalUniqueVisitors: number;
  goals: GoalMetric[];
  trend: GoalTrendData[];
  byPage: DimensionMetric[];
  bySource: DimensionMetric[];
  byDevice: DimensionMetric[];
}
