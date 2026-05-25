/**
 * lib/alert-engine.ts
 *
 * Checks database metrics against configured AlertRules and generates AlertHistory entries.
 * Can be triggered via a cron endpoint or lazily upon dashboard visit.
 */

import prisma from "@/lib/db";
import { fetchHealthData } from "@/lib/health-data";

export async function runAlertEngine() {
  const rules = await prisma.alertRule.findMany({ where: { enabled: true } });
  if (rules.length === 0) return;

  const now = new Date();
  const alertsToCreate: any[] = [];
  const rulesToUpdate: string[] = [];

  // Helper to check cooldown
  const canTrigger = (rule: any) => {
    if (!rule.lastTriggeredAt) return true;
    const diffMins = (now.getTime() - new Date(rule.lastTriggeredAt).getTime()) / 60000;
    return diffMins >= rule.cooldownMinutes;
  };

  for (const rule of rules) {
    if (!canTrigger(rule)) continue;

    let triggered = false;
    let severity = "LOW";
    let message = "";
    let source = "system";

    const threshold = rule.threshold as Record<string, any> || {};

    try {
      if (rule.type === "traffic_drop") {
        // Simple 7 day comparison
        const recent = await prisma.trackingEvent.count({
          where: { createdAt: { gte: new Date(now.getTime() - 7 * 24 * 3600000) } }
        });
        const prev = await prisma.trackingEvent.count({
          where: {
            createdAt: {
              gte: new Date(now.getTime() - 14 * 24 * 3600000),
              lt: new Date(now.getTime() - 7 * 24 * 3600000)
            }
          }
        });

        const percentDrop = threshold.percentDrop || 30;
        if (prev > 50 && recent < prev * (1 - percentDrop / 100)) {
          triggered = true;
          severity = "HIGH";
          message = `Traffic dropped by >${percentDrop}% in the last 7 days. (${recent} vs ${prev})`;
          source = "traffic";
        }
      } else if (rule.type === "error_spike") {
        const recentErrors = await prisma.trackingEvent.count({
          where: {
            eventName: { in: ["404_error", "form_submit_error"] },
            createdAt: { gte: new Date(now.getTime() - 24 * 3600000) }
          }
        });

        const maxErrors = threshold.maxErrors || 10;
        if (recentErrors >= maxErrors) {
          triggered = true;
          severity = "HIGH";
          message = `Detected ${recentErrors} errors (404/form) in the last 24 hours.`;
          source = "health";
        }
      } else if (rule.type === "slow_page_speed") {
        const health = await fetchHealthData();
        if (health.uptime.responseTimeMs > (threshold.maxLatencyMs || 1000)) {
          triggered = true;
          severity = "MEDIUM";
          message = `API Latency is very high: ${health.uptime.responseTimeMs}ms`;
          source = "health";
        }
      } else if (rule.type === "lead_spike") {
         const recentLeads = await prisma.lead.count({
           where: { createdAt: { gte: new Date(now.getTime() - 24 * 3600000) } }
         });
         const minLeads = threshold.minLeads || 20;
         if (recentLeads >= minLeads) {
           triggered = true;
           severity = "LOW";
           message = `Lead spike! ${recentLeads} new leads in the last 24 hours.`;
           source = "traffic";
         }
      }
    } catch (e) {
      console.error(`Error processing rule ${rule.type}:`, e);
    }

    if (triggered) {
      alertsToCreate.push({
        ruleId: rule.id,
        severity,
        message,
        source,
        status: "UNREAD"
      });
      rulesToUpdate.push(rule.id);
    }
  }

  // Persist alerts
  if (alertsToCreate.length > 0) {
    await prisma.alertHistory.createMany({ data: alertsToCreate });
    await prisma.alertRule.updateMany({
      where: { id: { in: rulesToUpdate } },
      data: { lastTriggeredAt: now }
    });

    // TODO: Trigger Notification targets (Slack, Email) via webhooks here.
  }
}
