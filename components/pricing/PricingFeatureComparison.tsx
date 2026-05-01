"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/utils";

type PlanValue = "✔" | "—" | string;

type ComparisonRow = {
  feature: string;
  starter: PlanValue;
  growth: PlanValue;
  enterprise: PlanValue;
};

type ComparisonGroup = {
  id: string;
  title: string;
  rows: ComparisonRow[];
};

const COMPARISON_GROUPS: ComparisonGroup[] = [
  {
    id: "core-operations",
    title: "Core operations",
    rows: [
      { feature: "Users included", starter: "10", growth: "15", enterprise: "Unlimited" },
      { feature: "Inventory & orders", starter: "✔", growth: "✔", enterprise: "✔" },
      { feature: "Dispatch workflows", starter: "✔", growth: "✔", enterprise: "✔" },
    ],
  },
  {
    id: "supply-chain",
    title: "Supply chain",
    rows: [
      { feature: "Purchase management", starter: "✔", growth: "✔", enterprise: "✔" },
      { feature: "Vendor tracking", starter: "✔", growth: "✔", enterprise: "✔" },
    ],
  },
  {
    id: "finance-billing",
    title: "Finance & billing",
    rows: [
      { feature: "GST compliance", starter: "✔", growth: "✔", enterprise: "✔" },
      { feature: "Accounting", starter: "✔", growth: "✔", enterprise: "✔" },
      { feature: "Invoicing", starter: "✔", growth: "✔", enterprise: "✔" },
    ],
  },
  {
    id: "crm-sales",
    title: "CRM & sales",
    rows: [
      { feature: "Leads management", starter: "✔", growth: "✔", enterprise: "✔" },
      { feature: "Pipeline tracking", starter: "✔", growth: "✔", enterprise: "✔" },
    ],
  },
  {
    id: "ai-automation",
    title: "AI & automation",
    rows: [
      { feature: "AI agent runs / month", starter: "500", growth: "2,000", enterprise: "Custom" },
      { feature: "Workflow automation", starter: "Basic", growth: "Advanced", enterprise: "Custom" },
    ],
  },
  {
    id: "reporting-analytics",
    title: "Reporting & analytics",
    rows: [
      { feature: "Dashboards", starter: "✔", growth: "✔", enterprise: "✔" },
      { feature: "Custom reports", starter: "—", growth: "✔", enterprise: "✔" },
    ],
  },
  {
    id: "integrations",
    title: "Integrations",
    rows: [
      { feature: "API access", starter: "—", growth: "✔", enterprise: "✔" },
      { feature: "Third-party integrations", starter: "Basic", growth: "Advanced", enterprise: "Custom" },
    ],
  },
];

type GroupPanelProps = {
  group: ComparisonGroup;
  open: boolean;
  rendered: boolean;
  onToggle: () => void;
};

function GroupPanel({ group, open, rendered, onToggle }: GroupPanelProps) {
  const panelId = `${group.id}-panel`;
  const triggerId = `${group.id}-trigger`;

  return (
    <article className="rounded-xl border border-[#EAEAEA] bg-card/70">
      <h3>
        <button
          id={triggerId}
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6 md:py-5"
        >
          <span className="text-sm font-semibold uppercase tracking-wide text-foreground">{group.title}</span>
          <ChevronDown
            className={cn("h-4 w-4 shrink-0 text-muted-2 transition-transform duration-300 ease-in-out", open && "rotate-180")}
            aria-hidden
          />
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          open ? "max-h-[1400px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        {rendered ? (
          <div className="border-t border-[#EAEAEA] px-3 pb-4 pt-2 md:px-4 md:pb-5">
            <div className="hidden overflow-hidden rounded-lg md:block">
              <table className="w-full table-fixed text-left">
                <thead>
                  <tr className="border-b border-[#EAEAEA] text-xs font-semibold uppercase tracking-wide text-muted-2">
                    <th className="w-[40%] px-3 py-3">Capability</th>
                    <th className="w-[20%] px-3 py-3">Starter</th>
                    <th className="w-[20%] bg-blue-light/60 px-3 py-3 text-blue">Growth</th>
                    <th className="w-[20%] px-3 py-3">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {group.rows.map((row) => (
                    <tr key={row.feature} className="border-b border-[#EAEAEA] last:border-b-0">
                      <td className="px-3 py-4 text-sm font-medium text-foreground">{row.feature}</td>
                      <td className="px-3 py-4 text-sm text-muted">{row.starter}</td>
                      <td className="bg-blue-light/45 px-3 py-4 text-sm font-semibold text-blue">{row.growth}</td>
                      <td className="px-3 py-4 text-sm text-muted">{row.enterprise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="space-y-2 md:hidden">
              {group.rows.map((row) => (
                <div key={row.feature} className="rounded-lg border border-[#EAEAEA] bg-card px-4 py-4">
                  <p className="mb-3 text-sm font-medium text-foreground">{row.feature}</p>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="rounded-md bg-surface px-2 py-2">
                      <p className="mb-1 font-semibold uppercase tracking-wide text-muted-2">Starter</p>
                      <p className="text-sm text-muted">{row.starter}</p>
                    </div>
                    <div className="rounded-md border border-blue/20 bg-blue-light/65 px-2 py-2">
                      <p className="mb-1 font-semibold uppercase tracking-wide text-blue">Growth</p>
                      <p className="text-sm font-semibold text-blue">{row.growth}</p>
                    </div>
                    <div className="rounded-md bg-surface px-2 py-2">
                      <p className="mb-1 font-semibold uppercase tracking-wide text-muted-2">Enterprise</p>
                      <p className="text-sm text-muted">{row.enterprise}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </article>
  );
}

export function PricingFeatureComparison() {
  const [openGroup, setOpenGroup] = useState(COMPARISON_GROUPS[0]?.id ?? "");
  const [renderedGroups, setRenderedGroups] = useState<Record<string, boolean>>({
    [COMPARISON_GROUPS[0]?.id ?? ""]: true,
  });

  const groups = useMemo(() => COMPARISON_GROUPS, []);

  const handleToggle = (groupId: string) => {
    setOpenGroup((current) => (current === groupId ? "" : groupId));
    setRenderedGroups((current) => (current[groupId] ? current : { ...current, [groupId]: true }));
  };

  return (
    <section className="mb-16 mt-16 rounded-2xl border border-[#EAEAEA] bg-gradient-to-b from-[#FAFAFA] to-card p-6 md:mb-20 md:mt-20 md:p-8">
      <header className="mb-6 space-y-2 px-1">
        <Text variant="heading-1" as="h2" className="text-xl text-foreground">
          Feature comparison
        </Text>
        <p className="text-sm text-muted-2">Explore capabilities across plans</p>
      </header>

      <div className="space-y-3">
        {groups.map((group) => (
          <GroupPanel
            key={group.id}
            group={group}
            open={openGroup === group.id}
            rendered={Boolean(renderedGroups[group.id])}
            onToggle={() => handleToggle(group.id)}
          />
        ))}
      </div>
    </section>
  );
}
