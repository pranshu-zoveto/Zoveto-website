"use client";

import { useState } from "react";
import { AlertsDashboardData } from "../types";
import { saveAlertRule, markAlertRead, saveNotificationTarget, deleteNotificationTarget } from "../actions";
import { Bell, ShieldAlert, Activity, CheckCircle2, Settings, Send, Trash2, Webhook } from "lucide-react";

export default function AlertsClient({ data }: { data: AlertsDashboardData }) {
  const [activeTab, setActiveTab] = useState<"history" | "rules" | "targets">("history");

  async function handleMarkRead(id: string) {
    await markAlertRead(id);
  }

  async function handleToggleRule(ruleId: string, currentState: boolean) {
    const fd = new FormData();
    fd.append("id", ruleId);
    fd.append("enabled", (!currentState).toString());
    // We fetch full rule from state to pass remaining props since action expects them,
    // or rely on action partial update. The action requires type and cooldown.
    const rule = data.rules.find(r => r.id === ruleId);
    if (rule) {
      fd.append("type", rule.type);
      fd.append("cooldownMinutes", rule.cooldownMinutes.toString());
      if (rule.threshold) fd.append("threshold", JSON.stringify(rule.threshold));
      await saveAlertRule(fd);
    }
  }

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex border-b border-zinc-800">
        <button
          onClick={() => setActiveTab("history")}
          className={`px-4 py-2 font-medium text-sm transition-colors ${
            activeTab === "history" ? "border-b-2 border-blue-500 text-blue-400" : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          History
        </button>
        <button
          onClick={() => setActiveTab("rules")}
          className={`px-4 py-2 font-medium text-sm transition-colors ${
            activeTab === "rules" ? "border-b-2 border-blue-500 text-blue-400" : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          Rules
        </button>
        <button
          onClick={() => setActiveTab("targets")}
          className={`px-4 py-2 font-medium text-sm transition-colors ${
            activeTab === "targets" ? "border-b-2 border-blue-500 text-blue-400" : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          Destinations
        </button>
      </div>

      {activeTab === "history" && (
        <div className="space-y-4">
          {data.history.length === 0 ? (
            <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/20 p-12 text-center">
              <CheckCircle2 className="mx-auto h-8 w-8 text-zinc-600 mb-3" />
              <p className="text-zinc-400">No alerts triggered yet. You're all good!</p>
            </div>
          ) : (
            data.history.map((alert) => (
              <div
                key={alert.id}
                className={`flex items-start justify-between rounded-lg border p-4 ${
                  alert.status === "UNREAD" ? "border-blue-900/30 bg-blue-950/10" : "border-zinc-800 bg-zinc-900/30"
                }`}
              >
                <div className="flex gap-4">
                  <div className="mt-1">
                    {alert.severity === "HIGH" ? (
                      <ShieldAlert className="h-5 w-5 text-red-500" />
                    ) : alert.severity === "MEDIUM" ? (
                      <Bell className="h-5 w-5 text-yellow-500" />
                    ) : (
                      <Activity className="h-5 w-5 text-blue-500" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-zinc-200">{alert.source}</span>
                      <span className="text-[10px] uppercase tracking-wider text-zinc-500">
                        {alert.severity}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-zinc-400">{alert.message}</p>
                    <p className="mt-2 text-xs text-zinc-600" suppressHydrationWarning>
                      {new Date(alert.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                {alert.status === "UNREAD" && (
                  <button
                    onClick={() => handleMarkRead(alert.id)}
                    className="text-xs font-medium text-blue-400 hover:text-blue-300"
                  >
                    Mark Read
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === "rules" && (
        <div className="grid gap-4 md:grid-cols-2">
          {data.rules.map((rule) => (
            <div key={rule.id} className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-zinc-200">{rule.type.replace("_", " ").toUpperCase()}</h3>
                  <p className="mt-1 text-xs text-zinc-500">Cooldown: {rule.cooldownMinutes}m</p>
                </div>
                <button
                  onClick={() => handleToggleRule(rule.id, rule.enabled)}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors ${
                    rule.enabled ? "bg-blue-600" : "bg-zinc-700"
                  }`}
                >
                  <span
                    className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                      rule.enabled ? "translate-x-1.5" : "-translate-x-1.5"
                    }`}
                  />
                </button>
              </div>
            </div>
          ))}

          {/* Add pre-defined disabled rules if none exist to let users turn them on */}
          {data.rules.length === 0 && (
             <div className="col-span-full rounded-xl border border-zinc-800/50 bg-zinc-900/20 p-12 text-center text-zinc-500 text-sm">
                No rules configured yet. The system will seed default rules shortly.
             </div>
          )}
        </div>
      )}

      {activeTab === "targets" && (
        <div className="space-y-4">
          {data.targets.map((target) => (
            <div key={target.id} className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
               <div className="flex items-center gap-3">
                 <Webhook className="h-5 w-5 text-zinc-500" />
                 <div>
                    <p className="text-sm font-medium text-zinc-200 uppercase">{target.type}</p>
                    <p className="text-xs text-zinc-500">{target.destination}</p>
                 </div>
               </div>
               <div className="flex items-center gap-3">
                 <button
                   onClick={() => deleteNotificationTarget(target.id)}
                   className="text-zinc-500 hover:text-red-400 transition-colors"
                 >
                   <Trash2 className="h-4 w-4" />
                 </button>
               </div>
            </div>
          ))}
          
          <form action={saveNotificationTarget} className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
             <h4 className="mb-4 text-sm font-medium text-zinc-300">Add New Destination</h4>
             <div className="flex gap-3">
               <select name="type" className="rounded bg-zinc-900 border border-zinc-800 text-sm text-zinc-300 px-3 py-2 outline-none">
                 <option value="slack">Slack Webhook</option>
                 <option value="email">Email Address</option>
                 <option value="telegram">Telegram Webhook</option>
               </select>
               <input 
                 type="text" 
                 name="destination"
                 required
                 placeholder="https://hooks.slack.com/... or email@..." 
                 className="flex-1 rounded bg-zinc-900 border border-zinc-800 text-sm text-zinc-300 px-3 py-2 outline-none"
               />
               <input type="hidden" name="enabled" value="true" />
               <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
                 Add Target
               </button>
             </div>
          </form>
        </div>
      )}
    </div>
  );
}
