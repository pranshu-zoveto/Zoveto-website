import React from "react";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: string;
  icon?: LucideIcon;
}

export const MetricCard = ({ label, value, icon: Icon }: MetricCardProps) => (
  <div className="p-6 md:p-8 rounded-2xl bg-card border border-border hover:shadow-md transition-shadow flex flex-col items-center text-center space-y-3 group">
    {Icon && (
      <Icon
        className="text-blue opacity-70 group-hover:opacity-100 transition-opacity"
        size={20}
      />
    )}
    <div className="text-2xl md:text-3xl font-bold text-foreground tracking-tight tabular-nums">
      {value}
    </div>
    <div className="text-xs font-medium text-muted-2 uppercase tracking-wide">{label}</div>
  </div>
);
