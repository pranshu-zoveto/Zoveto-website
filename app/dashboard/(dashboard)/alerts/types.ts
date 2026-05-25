import { AlertRule, AlertHistory, NotificationTarget } from "@/generated/client";

export type { AlertRule, AlertHistory, NotificationTarget };

export type AlertSeverity = "HIGH" | "MEDIUM" | "LOW";
export type AlertStatus = "UNREAD" | "READ" | "MUTED";

export interface AlertsDashboardData {
  rules: AlertRule[];
  history: AlertHistory[];
  targets: NotificationTarget[];
}
