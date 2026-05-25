"use client";

import type { AIInsightsReport } from "../types";
import { Sparkles, AlertTriangle, ArrowUpRight, ArrowDownRight, Clock, Target, AlertCircle } from "lucide-react";

export function InsightsClient({ report }: { report: AIInsightsReport }) {
  
  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) return <ArrowUpRight className="h-4 w-4 text-green-400" />;
    if (current < previous) return <ArrowDownRight className="h-4 w-4 text-red-400" />;
    return <span className="text-zinc-500">—</span>;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-500/10 text-red-400 border-red-500/20";
      case "medium": return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      case "low": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      default: return "bg-zinc-800 text-zinc-400 border-zinc-700";
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Weekly Briefing */}
      <div className="rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-black p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-10">
           <Sparkles className="h-24 w-24 text-blue-400" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-blue-400" />
            <h2 className="text-lg font-semibold text-zinc-100">Weekly Briefing</h2>
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed max-w-3xl mb-6">
            {report.summary.text}
          </p>
          
          <div className="grid grid-cols-3 gap-4 max-w-2xl">
             <div className="flex flex-col p-3 rounded-lg bg-zinc-950/50 border border-zinc-800/50">
               <span className="text-xs text-zinc-500 mb-1">Traffic (vs last wk)</span>
               <div className="flex items-center gap-2 text-lg font-bold text-zinc-200">
                 {report.summary.metrics.traffic.current}
                 {getTrendIcon(report.summary.metrics.traffic.current, report.summary.metrics.traffic.previous)}
               </div>
             </div>
             <div className="flex flex-col p-3 rounded-lg bg-zinc-950/50 border border-zinc-800/50">
               <span className="text-xs text-zinc-500 mb-1">Leads (vs last wk)</span>
               <div className="flex items-center gap-2 text-lg font-bold text-zinc-200">
                 {report.summary.metrics.leads.current}
                 {getTrendIcon(report.summary.metrics.leads.current, report.summary.metrics.leads.previous)}
               </div>
             </div>
             <div className="flex flex-col p-3 rounded-lg bg-zinc-950/50 border border-zinc-800/50">
               <span className="text-xs text-zinc-500 mb-1">Revenue (vs last wk)</span>
               <div className="flex items-center gap-2 text-lg font-bold text-zinc-200">
                 ${report.summary.metrics.revenue.current}
                 {getTrendIcon(report.summary.metrics.revenue.current, report.summary.metrics.revenue.previous)}
               </div>
             </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        
        {/* Anomalies */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            <h3 className="text-sm font-semibold text-zinc-200">Detected Anomalies</h3>
          </div>
          <div className="flex-1 space-y-3">
             {report.anomalies.length === 0 ? (
               <div className="flex flex-col items-center justify-center h-32 text-center">
                 <span className="text-2xl mb-2">✨</span>
                 <p className="text-xs text-zinc-500">No anomalies detected this week.<br/>Everything is running smoothly.</p>
               </div>
             ) : (
               report.anomalies.map(anom => (
                 <div key={anom.id} className="rounded-lg border border-red-900/30 bg-red-950/20 p-4">
                   <div className="flex items-start justify-between mb-1">
                     <h4 className="text-sm font-medium text-red-400">{anom.title}</h4>
                     <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${
                       anom.severity === 'high' ? 'bg-red-500/20 text-red-300 border-red-500/30' : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                     }`}>
                       {anom.severity}
                     </span>
                   </div>
                   <p className="text-xs text-zinc-400">{anom.description}</p>
                 </div>
               ))
             )}
          </div>
        </div>

        {/* Actionable Recommendations */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <Target className="h-5 w-5 text-emerald-400" />
            <h3 className="text-sm font-semibold text-zinc-200">Recommended Actions</h3>
          </div>
          <div className="flex-1 space-y-3">
             {report.recommendations.length === 0 ? (
               <div className="flex flex-col items-center justify-center h-32 text-center">
                 <p className="text-xs text-zinc-500">No pending recommendations.</p>
               </div>
             ) : (
               report.recommendations.map(rec => (
                 <div key={rec.id} className="rounded-lg border border-zinc-800 bg-zinc-950/50 p-4 hover:border-zinc-700 transition-colors">
                   <div className="flex items-start justify-between mb-1">
                     <h4 className="text-sm font-medium text-zinc-200 flex items-center gap-2">
                       {rec.actionType === 'update_content' && <Clock className="h-4 w-4 text-zinc-500" />}
                       {rec.actionType === 'fix_broken_page' && <AlertCircle className="h-4 w-4 text-red-400" />}
                       {rec.actionType === 'follow_up_lead' && <Sparkles className="h-4 w-4 text-blue-400" />}
                       {rec.title}
                     </h4>
                     <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${getPriorityColor(rec.priority)}`}>
                       {rec.priority}
                     </span>
                   </div>
                   <p className="text-xs text-zinc-400 mt-2">{rec.description}</p>
                 </div>
               ))
             )}
          </div>
        </div>

      </div>
    </div>
  );
}
