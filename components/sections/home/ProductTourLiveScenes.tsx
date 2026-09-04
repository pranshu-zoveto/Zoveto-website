"use client";

import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { Bell, ChevronDown, RefreshCw, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export type TourSceneId = "command-center" | "sales-crm" | "warehouse" | "finance";

export type TourPlayState = {
  ccTab: "overview" | "ops" | "weekly" | "priorities" | "mis";
  viewAs: "Owner" | "Sales" | "Warehouse" | "Finance";
  roiFocus: "revenue" | "cost" | "time" | "leads" | null;
  salesLane: "ship" | "rework" | "approval" | "task" | null;
  salesQuery: string;
  salesRow: number | null;
  composerOpen: boolean;
  orderOpen: boolean;
  selectedOrderId: string;
  pickMarked: number;
  blockedCleared: boolean;
  whStat: "ready" | "units" | "picking" | "packing" | "dispatch" | "blocked" | null;
  finFilter: "all" | "posted" | "draft";
  finQuery: string;
  financeRow: number | null;
  invoiceOpen: boolean;
};

export const TOUR_REST: TourPlayState = {
  ccTab: "overview",
  viewAs: "Owner",
  roiFocus: null,
  salesLane: null,
  salesQuery: "",
  salesRow: null,
  composerOpen: false,
  orderOpen: false,
  selectedOrderId: "DEMO-SO-T-2026-0314",
  pickMarked: 0,
  blockedCleared: false,
  whStat: null,
  finFilter: "all",
  finQuery: "",
  financeRow: null,
  invoiceOpen: false,
};

type Quote = {
  id: string;
  customer: string;
  date: string;
  valid: string;
  amount: string;
  health: "HEALTHY" | "CRITICAL";
  status: "CONVERTED" | "DRAFT" | "PENDING";
  so: string;
  lane: "ship" | "rework" | "approval" | "task";
};

type Invoice = {
  id: string;
  customer: string;
  taxable: string;
  total: string;
  status: "Posted" | "Draft";
  gst: string;
  date: string;
};

const QUOTES: Quote[] = [
  {
    id: "DEMOZOVETO/26-27/QT/00006",
    customer: "Faridabad Counter Sales Pvt Ltd",
    date: "01/08/2026",
    valid: "31/08/2026",
    amount: "₹32,086.56",
    health: "HEALTHY",
    status: "CONVERTED",
    so: "DEMOZOVETO/26-27/SO/00003",
    lane: "ship",
  },
  {
    id: "DEMOZOVETO/26-27/QT/00005",
    customer: "A5 Isolation A 0c6e01ee",
    date: "22/07/2026",
    valid: "21/08/2026",
    amount: "₹11,800.00",
    health: "CRITICAL",
    status: "DRAFT",
    so: "-",
    lane: "rework",
  },
  {
    id: "DEMOZOVETO/26-27/QT/00004",
    customer: "Indore Central Trade",
    date: "18/07/2026",
    valid: "17/08/2026",
    amount: "₹1,12,050.00",
    health: "HEALTHY",
    status: "PENDING",
    so: "-",
    lane: "approval",
  },
  {
    id: "DEMOZOVETO/26-27/QT/00003",
    customer: "Jaipur Spare Parts Co",
    date: "12/07/2026",
    amount: "₹48,320.00",
    valid: "11/08/2026",
    health: "HEALTHY",
    status: "DRAFT",
    so: "-",
    lane: "task",
  },
  {
    id: "DEMOZOVETO/26-27/QT/00002",
    customer: "Faridabad Counter Sales Pvt Ltd",
    date: "04/07/2026",
    valid: "03/08/2026",
    amount: "₹86,400.00",
    health: "HEALTHY",
    status: "CONVERTED",
    so: "DEMOZOVETO/26-27/SO/00001",
    lane: "ship",
  },
];

const INVOICES: Invoice[] = [
  {
    id: "DEMOZOVETO/26-27/INV/00002",
    customer: "Faridabad Counter Sales Pvt Ltd",
    taxable: "₹27,069.00",
    total: "₹32,086.56",
    status: "Draft",
    gst: "EWB not required",
    date: "22 Aug 2026",
  },
  {
    id: "A5A-OV-0c6e01ee-9",
    customer: "A5 Isolation A 0c6e01ee",
    taxable: "₹10,000.00",
    total: "₹11,800.00",
    status: "Posted",
    gst: "EWB not required",
    date: "01 Apr 2026",
  },
  {
    id: "DEMOZOVETO/26-27/INV/00001",
    customer: "Indore Central Trade",
    taxable: "₹94,958.00",
    total: "₹1,12,050.00",
    status: "Posted",
    gst: "EWB generated",
    date: "18 Jul 2026",
  },
  {
    id: "DEMOZOVETO/26-27/INV/00003",
    customer: "Jaipur Spare Parts Co",
    taxable: "₹40,949.00",
    total: "₹48,320.00",
    status: "Posted",
    gst: "EWB not required",
    date: "12 Jul 2026",
  },
];

const PICK_LINES = [
  { sku: "AXLE-HUB-09", loc: "A-12-04", qty: 2 },
  { sku: "BRAKE-SHOE-L", loc: "B-03-11", qty: 4 },
] as const;

const WH_ORDERS = [
  { id: "DEMO-SO-T-2026-0314", status: "PICKING", lines: 2 },
  { id: "DEMO-SO-T-2026-0311", status: "PACKING", lines: 4 },
  { id: "DEMO-SO-T-2026-0298", status: "READY", lines: 1 },
] as const;

const CC_TABS = [
  { id: "overview", label: "Overview", tour: "cc-overview" },
  { id: "ops", label: "Ops standup", tour: "cc-ops" },
  { id: "weekly", label: "Weekly review", tour: "cc-weekly" },
  { id: "priorities", label: "Priorities", tour: "cc-priorities" },
  { id: "mis", label: "MIS & KPIs", tour: "cc-mis" },
] as const;

const VIEWS = ["Owner", "Sales", "Warehouse", "Finance"] as const;

type Interact = (patch: Partial<TourPlayState>) => void;

function Badge({
  tone,
  children,
}: {
  tone: "green" | "red" | "gray" | "amber" | "blue";
  children: ReactNode;
}) {
  const map = {
    green: "bg-[var(--success-dim)] text-green",
    red: "bg-[var(--danger-dim)] text-red",
    gray: "bg-surface text-muted",
    amber: "bg-[var(--warning-dim)] text-foreground",
    blue: "bg-blue-light text-blue",
  } as const;
  return (
    <span className={cn("inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide", map[tone])}>
      {children}
    </span>
  );
}

function SideLink({
  active,
  children,
  onClick,
}: {
  active?: boolean;
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "block w-full rounded-md px-2 py-1 text-left text-[11px] leading-snug",
        active ? "bg-blue-light font-medium text-blue" : "text-muted hover:bg-surface hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

function AppChrome({
  module,
  sidebar,
  children,
  onSearch,
}: {
  module: string;
  sidebar: ReactNode;
  children: ReactNode;
  onSearch?: () => void;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-surface text-[12px] text-foreground">
      <header className="flex h-11 shrink-0 items-center gap-2 border-b border-border bg-background px-3">
        <p className="hidden shrink-0 leading-tight sm:block">
          <span className="block text-[11px] font-semibold">Autobahn Trucking</span>
          <span className="block text-[9px] font-medium uppercase tracking-[0.14em] text-muted-2">{module}</span>
        </p>
        <button
          type="button"
          data-tour="chrome-search"
          onClick={onSearch}
          className="flex min-w-0 flex-1 items-center gap-2 rounded-md border border-border bg-surface px-2.5 py-1.5 text-left text-muted"
        >
          <Search className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
          <span className="truncate">Search workspace</span>
          <span className="ml-auto hidden rounded border border-border px-1 text-[10px] text-muted-2 sm:inline">Ctrl K</span>
        </button>
        <span className="hidden rounded-full bg-blue-light px-2 py-0.5 text-[10px] font-medium text-blue md:inline">48 days left</span>
        <span className="hidden max-w-[140px] truncate text-[10px] text-muted lg:inline">DEMO-WH-CTL-IND</span>
        <span className="hidden text-[10px] text-muted xl:inline">CCY INR</span>
        <span className="relative shrink-0">
          <Bell className="h-3.5 w-3.5 text-muted" strokeWidth={1.75} />
          <span className="absolute -right-1 -top-1 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-red px-0.5 text-[8px] font-semibold text-white">
            15
          </span>
        </span>
        <span className="hidden items-center gap-1.5 sm:flex">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-light text-[9px] font-semibold text-blue">
            DA
          </span>
          <span className="text-[11px] font-medium">Demo Ops Admin</span>
        </span>
      </header>
      <div className="flex min-h-0 flex-1">
        <aside className="hidden w-[168px] shrink-0 overflow-y-auto border-r border-border bg-background px-2 py-2.5 md:block">
          {sidebar}
        </aside>
        <div className="min-w-0 flex-1 overflow-y-auto bg-background p-3 sm:p-4">{children}</div>
      </div>
    </div>
  );
}

function CommandCenterScene({ play, onInteract }: { play: TourPlayState; onInteract: Interact }) {
  const viewCopy: Record<(typeof VIEWS)[number], string> = {
    Owner: "Cash, risk, and cross-module attention.",
    Sales: "Quote ageing, approvals, and unacknowledged tasks.",
    Warehouse: "Pick pressure, blocked orders, and dock risk.",
    Finance: "Posted invoices, GST, and collections lag.",
  };

  return (
    <AppChrome
      module="COMMAND CENTER"
      sidebar={
        <>
          <p className="px-2 pb-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-2">Overview</p>
          <SideLink active={play.ccTab === "overview"} onClick={() => onInteract({ ccTab: "overview" })}>
            Ops standup
          </SideLink>
          <SideLink active={play.ccTab === "weekly"} onClick={() => onInteract({ ccTab: "weekly" })}>
            Weekly review
          </SideLink>
          <SideLink active={play.ccTab === "priorities"} onClick={() => onInteract({ ccTab: "priorities" })}>
            Priorities
          </SideLink>
          <SideLink active={play.ccTab === "mis"} onClick={() => onInteract({ ccTab: "mis" })}>
            MIS & KPIs
          </SideLink>
        </>
      }
    >
      <div className="flex min-h-0 flex-col gap-3">
        <div className="flex items-start justify-between gap-3 rounded-md border border-blue-light bg-blue-dim px-3 py-2 text-[11px] text-foreground">
          <p>Command Center: your attention queue and governed recommendations, not a generic dashboard or chat.</p>
          <span className="shrink-0 font-medium text-blue">Got it</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {CC_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              data-tour={tab.tour}
              onClick={() => onInteract({ ccTab: tab.id })}
              className={cn(
                "rounded-full border px-2.5 py-1 text-[11px] font-medium",
                play.ccTab === tab.id ? "border-blue bg-blue text-white" : "border-border bg-background text-foreground",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <p className="text-[11px] text-muted">Your operating picture: what needs attention right now.</p>
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
          {[
            ["Priorities", "Decisions"],
            ["MIS & KPIs", "Inventory & margin"],
            ["Growth", "Safe automation"],
            ["Insights", "Impact & health"],
          ].map(([title, sub]) => (
            <button
              key={title}
              type="button"
              onClick={() => onInteract({ ccTab: title === "MIS & KPIs" ? "mis" : "priorities" })}
              className="rounded-lg border border-border bg-surface px-3 py-2 text-left"
            >
              <p className="text-[12px] font-semibold">{title}</p>
              <p className="text-[10px] text-muted">{sub}</p>
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-2">Ops desk</p>
            <h3 className="text-base font-semibold tracking-tight">Command center</h3>
            <p className="max-w-[58ch] text-[11px] leading-snug text-muted">
              Approvals waiting, recent agent outcomes with evidence, and cash risk. Open any row to the underlying record.
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <button type="button" className="rounded-md border border-border px-2 py-1 text-[11px]">
              Refresh
            </button>
            <button type="button" className="rounded-md border border-border px-2 py-1 text-[11px]">
              CRM Pipeline
            </button>
            <button
              type="button"
              data-tour="cc-start-demo"
              onClick={() => onInteract({ roiFocus: "cost" })}
              className="rounded-md bg-blue px-2.5 py-1 text-[11px] font-semibold text-white"
            >
              Start Demo
            </button>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-2">View as</span>
          {VIEWS.map((view) => (
            <button
              key={view}
              type="button"
              data-tour={`cc-view-${view.toLowerCase()}`}
              onClick={() => onInteract({ viewAs: view })}
              className={cn(
                "rounded-full border px-2.5 py-1 text-[11px] font-medium",
                play.viewAs === view ? "border-blue bg-blue text-white" : "border-border bg-background",
              )}
            >
              {view}
            </button>
          ))}
          <span className="text-[11px] text-muted">{viewCopy[play.viewAs]}</span>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-2">Why clients stay</p>
          <h4 className="text-[13px] font-semibold">Client ROI board</h4>
          <p className="mb-2 text-[11px] text-muted">
            Revenue recovered, cost saved, time saved, and leads processed from executed intents and SQL, not model estimates.
          </p>
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
            {(
              [
                ["revenue", "Revenue recovered", "₹0", "Attributed from settled / measured intent"],
                ["cost", "Cost saved", "₹750", "Attributed recovery + labor substitution"],
                ["time", "Time saved", "3h", "12 min + each executed agent action"],
                ["leads", "Leads processed", "0", "15 tasks completed - 30d"],
              ] as const
            ).map(([key, label, value, hint]) => (
              <button
                key={key}
                type="button"
                data-tour={`cc-roi-${key}`}
                onClick={() => onInteract({ roiFocus: key })}
                className={cn(
                  "rounded-lg border px-3 py-2.5 text-left",
                  play.roiFocus === key ? "border-blue bg-blue-light" : "border-border bg-surface",
                )}
              >
                <p className="text-[10px] font-medium uppercase tracking-wide text-muted-2">{label}</p>
                <p className="mt-1 font-mono text-lg font-semibold tabular-nums tracking-tight">{value}</p>
                <p className="mt-1 text-[10px] leading-snug text-muted">{hint}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </AppChrome>
  );
}

function SalesScene({ play, onInteract }: { play: TourPlayState; onInteract: Interact }) {
  const [drafts, setDrafts] = useState<Quote[]>([]);
  const [form, setForm] = useState({ customer: "", amount: "" });
  const rows = [...drafts, ...QUOTES];
  const filtered = rows.filter((row) => {
    const q = play.salesQuery.trim().toLowerCase();
    const matchesQuery =
      !q || row.id.toLowerCase().includes(q) || row.customer.toLowerCase().includes(q) || row.status.toLowerCase().includes(q);
    const matchesLane = !play.salesLane || row.lane === play.salesLane;
    return matchesQuery && matchesLane;
  });

  const lanes = [
    { id: "ship" as const, n: "18", label: "Ship ready packs", tag: "Operations" },
    { id: "rework" as const, n: "3", label: "Resolve aged rework", tag: "Operations" },
    { id: "approval" as const, n: "1", label: "Clear pending approvals", tag: "Approvals" },
    { id: "task" as const, n: "1", label: "Tasks nobody has acknowledged", tag: "Tasks" },
  ];

  const addDraft = (event: FormEvent) => {
    event.preventDefault();
    if (!form.customer.trim() || !form.amount.trim()) return;
    const next: Quote = {
      id: `DEMOZOVETO/26-27/QT/${String(900 + drafts.length).padStart(5, "0")}`,
      customer: form.customer.trim(),
      date: "04/09/2026",
      valid: "04/10/2026",
      amount: form.amount.trim().startsWith("₹") ? form.amount.trim() : `₹${form.amount.trim()}`,
      health: "HEALTHY",
      status: "DRAFT",
      so: "-",
      lane: "task",
    };
    setDrafts((current) => [next, ...current]);
    setForm({ customer: "", amount: "" });
    onInteract({ composerOpen: false, salesRow: 0, salesLane: null, salesQuery: "" });
  };

  return (
    <AppChrome
      module="SALES & CRM"
      sidebar={
        <>
          <p className="px-2 pb-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-2">Deal management</p>
          <SideLink active>Quotations</SideLink>
          <SideLink>Orders</SideLink>
          <SideLink>Tax invoices</SideLink>
        </>
      }
    >
      <div className="relative flex min-h-0 flex-col gap-3">
        <div className="rounded-md border border-blue-light bg-blue-dim px-3 py-1.5 text-[11px]">
          Pulse: Legacy name. Priorities now live under Command Center, Priorities.
        </div>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] text-muted">Sales &gt; Quotation</p>
            <h3 className="text-base font-semibold tracking-tight">Sales Quotations</h3>
            <p className="text-[11px] text-muted">Draft → Issue → Sent → Negotiate → Accept → Order.</p>
          </div>
          <div className="flex gap-1.5">
            <button type="button" className="rounded-md border border-border px-2.5 py-1 text-[11px]">
              Export CSV
            </button>
            <button
              type="button"
              data-tour="sales-create"
              onClick={() => onInteract({ composerOpen: true })}
              className="rounded-md bg-blue px-2.5 py-1 text-[11px] font-semibold text-white"
            >
              Create New
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-3 lg:flex-row lg:items-start">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-2">Command lane</p>
            <p className="text-[13px] font-semibold">Quotation to order execution</p>
            <p className="mt-1 max-w-[52ch] text-[11px] leading-snug text-muted">
              Work from blocked decisions first, then drill into quotation records on the same register.
            </p>
          </div>
          <div className="grid w-full grid-cols-2 gap-2 lg:w-[340px] lg:grid-cols-1">
            {lanes.map((lane) => (
              <button
                key={lane.id}
                type="button"
                data-tour={`sales-lane-${lane.id}`}
                onClick={() =>
                  onInteract({
                    salesLane: play.salesLane === lane.id ? null : lane.id,
                    salesRow: null,
                  })
                }
                className={cn(
                  "flex items-center justify-between gap-3 rounded-lg border px-2.5 py-2 text-left",
                  play.salesLane === lane.id ? "border-blue bg-blue-light" : "border-border bg-background",
                )}
              >
                <span>
                  <span className="block text-[11px] leading-snug text-foreground">{lane.label}</span>
                  <span className="text-[10px] text-muted-2">{lane.tag}</span>
                </span>
                <span className={cn("font-mono text-lg font-semibold tabular-nums", lane.id === "ship" ? "text-[var(--warning)]" : "")}>
                  {lane.n}
                </span>
              </button>
            ))}
          </div>
        </div>
        <label className="block">
          <span className="sr-only">Search quotations</span>
          <input
            data-tour="sales-search"
            value={play.salesQuery}
            onChange={(event) => onInteract({ salesQuery: event.target.value, salesRow: null })}
            placeholder="Search quotations..."
            className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-[12px] outline-none focus:border-blue"
          />
        </label>
        <div className="min-h-0 flex-1 overflow-auto rounded-lg border border-border">
          <table className="w-full min-w-[640px] text-left text-[11px]">
            <thead className="bg-surface text-[10px] uppercase tracking-wide text-muted-2">
              <tr>
                <th className="px-2.5 py-1.5 font-medium">Quotation #</th>
                <th className="px-2.5 py-1.5 font-medium">Quoted for</th>
                <th className="hidden px-2.5 py-1.5 font-medium md:table-cell">Amount</th>
                <th className="px-2.5 py-1.5 font-medium">Price health</th>
                <th className="px-2.5 py-1.5 font-medium">Status</th>
                <th className="hidden px-2.5 py-1.5 font-medium lg:table-cell">Sales order</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, index) => (
                <tr
                  key={row.id}
                  data-tour={
                    row.id.endsWith("QT/00005")
                      ? "sales-row-critical"
                      : row.id.endsWith("QT/00006")
                        ? "sales-row-0"
                        : undefined
                  }
                  onClick={() => onInteract({ salesRow: index, composerOpen: false })}
                  className={cn(
                    "cursor-pointer border-t border-border",
                    play.salesRow === index ? "bg-blue-light" : "bg-background hover:bg-surface",
                  )}
                >
                  <td className="px-2.5 py-1.5 font-medium text-blue">{row.id}</td>
                  <td className="truncate px-2.5 py-1.5">{row.customer}</td>
                  <td className="hidden px-2.5 py-1.5 font-mono tabular-nums md:table-cell">{row.amount}</td>
                  <td className="px-2.5 py-1.5">
                    <Badge tone={row.health === "HEALTHY" ? "green" : "red"}>{row.health}</Badge>
                  </td>
                  <td className="px-2.5 py-1.5">
                    <Badge tone={row.status === "CONVERTED" ? "gray" : row.status === "PENDING" ? "blue" : "amber"}>
                      {row.status}
                    </Badge>
                  </td>
                  <td className="hidden truncate px-2.5 py-1.5 text-muted lg:table-cell">{row.so}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 ? (
            <p className="px-3 py-6 text-center text-[12px] text-muted">No quotations match this lane or search.</p>
          ) : null}
        </div>
        {play.composerOpen ? (
          <form
            data-tour="sales-composer"
            onSubmit={addDraft}
            className="absolute right-0 top-10 z-[1] w-[min(100%,320px)] rounded-lg border border-border bg-background p-3 shadow-elevated"
          >
            <p className="text-[13px] font-semibold">New quotation</p>
            <label className="mt-2 block text-[11px] text-muted">
              Quoted for
              <input
                value={form.customer}
                onChange={(event) => setForm((current) => ({ ...current, customer: event.target.value }))}
                className="mt-1 w-full rounded-md border border-border px-2 py-1.5 text-[12px] text-foreground outline-none focus:border-blue"
                placeholder="Customer name"
              />
            </label>
            <label className="mt-2 block text-[11px] text-muted">
              Amount
              <input
                value={form.amount}
                onChange={(event) => setForm((current) => ({ ...current, amount: event.target.value }))}
                className="mt-1 w-full rounded-md border border-border px-2 py-1.5 text-[12px] text-foreground outline-none focus:border-blue"
                placeholder="₹0.00"
              />
            </label>
            <div className="mt-3 flex justify-end gap-1.5">
              <button
                type="button"
                onClick={() => onInteract({ composerOpen: false })}
                className="rounded-md border border-border px-2.5 py-1 text-[11px]"
              >
                Cancel
              </button>
              <button type="submit" className="rounded-md bg-blue px-2.5 py-1 text-[11px] font-semibold text-white">
                Save draft
              </button>
            </div>
          </form>
        ) : null}
      </div>
    </AppChrome>
  );
}

function WarehouseScene({ play, onInteract }: { play: TourPlayState; onInteract: Interact }) {
  const [scan, setScan] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const selected = WH_ORDERS.find((order) => order.id === play.selectedOrderId) ?? WH_ORDERS[0];
  const marked = Math.min(play.pickMarked, PICK_LINES.length);
  const stats = [
    { id: "ready" as const, tour: "wh-ready", label: "Ready orders", value: "53" },
    { id: "units" as const, tour: "wh-units", label: "Units to pick", value: "317" },
    { id: "picking" as const, tour: "wh-picking", label: "Picking", value: "20" },
    { id: "packing" as const, tour: "wh-packing", label: "Packing", value: "13" },
    { id: "dispatch" as const, tour: "wh-dispatch", label: "Ready to dispatch", value: "33" },
    { id: "blocked" as const, tour: "wh-blocked-stat", label: "Blocked", value: play.blockedCleared ? "0" : "1" },
  ];

  const submitScan = (event: FormEvent) => {
    event.preventDefault();
    const nextLine = PICK_LINES[marked];
    if (!nextLine) {
      setToast("Both lines are already marked.");
      return;
    }
    const token = scan.trim().toUpperCase();
    if (token && token !== nextLine.sku && token !== nextLine.loc) {
      setToast(`No match for ${scan.trim()}. Scan ${nextLine.sku} or ${nextLine.loc}.`);
      return;
    }
    onInteract({ pickMarked: marked + 1, orderOpen: false });
    setScan("");
    setToast(`Marked ${nextLine.sku} at ${nextLine.loc}.`);
  };

  return (
    <AppChrome
      module="OPERATIONS"
      sidebar={
        <>
          <p className="px-2 pb-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-2">Outbound</p>
          <SideLink active>Pick list</SideLink>
          <SideLink>Pack desk</SideLink>
          <SideLink>Dispatch</SideLink>
        </>
      }
    >
      <div className="flex min-h-0 flex-col gap-3">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h3 className="text-base font-semibold tracking-tight">Pick List</h3>
            <p className="max-w-[62ch] text-[11px] leading-snug text-muted">
              Create a pick task against existing inbound lots, scan the rack location, then scan the lot or inbound pack label.
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5 text-[11px]">
            <span className="text-muted">Updated just now</span>
            <button type="button" className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1">
              <RefreshCw className="h-3 w-3" strokeWidth={1.75} />
              Refresh
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 lg:grid-cols-6">
          {stats.map((stat) => (
            <button
              key={stat.id}
              type="button"
              data-tour={stat.tour}
              onClick={() => onInteract({ whStat: play.whStat === stat.id ? null : stat.id, orderOpen: false })}
              className={cn(
                "rounded-lg border px-2 py-2 text-left",
                play.whStat === stat.id ? "border-blue bg-blue-light" : "border-border bg-surface",
              )}
            >
              <p className="text-[10px] uppercase tracking-wide text-muted-2">{stat.label}</p>
              <p className="font-mono text-lg font-semibold tabular-nums">{stat.value}</p>
            </button>
          ))}
        </div>
        <div className="relative">
          <p className="text-[11px] font-medium">Order to pick</p>
          <button
            type="button"
            data-tour="wh-order"
            onClick={() => onInteract({ orderOpen: !play.orderOpen })}
            className="mt-1 flex w-full items-center justify-between rounded-md border border-border bg-background px-2.5 py-2 text-left text-[12px]"
          >
            <span>
              {selected.id} · {selected.status} · {selected.lines} line(s)
            </span>
            <ChevronDown className="h-3.5 w-3.5 text-muted" strokeWidth={1.75} />
          </button>
          {play.orderOpen ? (
            <div className="absolute left-0 right-0 z-[1] mt-1 overflow-hidden rounded-md border border-border bg-background shadow-elevated">
              {WH_ORDERS.map((order) => (
                <button
                  key={order.id}
                  type="button"
                  data-tour={order.id === "DEMO-SO-T-2026-0314" ? "wh-order-option" : undefined}
                  onClick={() => onInteract({ selectedOrderId: order.id, orderOpen: false, pickMarked: 0 })}
                  className={cn(
                    "block w-full px-2.5 py-2 text-left text-[12px] hover:bg-surface",
                    order.id === play.selectedOrderId ? "bg-blue-light text-blue" : "",
                  )}
                >
                  {order.id} · {order.status} · {order.lines} line(s)
                </button>
              ))}
            </div>
          ) : null}
        </div>
        <div className="rounded-lg border border-border bg-surface px-3 py-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-[12px] font-medium">
              {selected.id} <Badge tone="blue">{selected.status}</Badge>
            </p>
            <p className="text-[11px] text-muted">
              {marked} of {PICK_LINES.length} lines marked
            </p>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-border">
            <div
              className="h-full bg-blue"
              style={{ width: `${(marked / PICK_LINES.length) * 100}%` }}
            />
          </div>
          <ul className="mt-2 divide-y divide-border text-[11px]">
            {PICK_LINES.map((line, index) => (
              <li key={line.sku} className="flex items-center justify-between py-1.5">
                <span className={index < marked ? "text-muted line-through" : ""}>
                  {line.sku} · {line.loc} · qty {line.qty}
                </span>
                <span className="text-muted-2">{index < marked ? "Picked" : "Open"}</span>
              </li>
            ))}
          </ul>
          <form data-tour="wh-scan" onSubmit={submitScan} className="mt-2 flex gap-1.5">
            <input
              value={scan}
              onChange={(event) => setScan(event.target.value)}
              placeholder="Scan pick"
              className="min-w-0 flex-1 rounded-md border border-border bg-background px-2.5 py-1.5 text-[12px] outline-none focus:border-blue"
            />
            <button type="submit" className="rounded-md bg-blue px-2.5 py-1.5 text-[11px] font-semibold text-white">
              Mark line
            </button>
          </form>
          {toast ? <p className="mt-1.5 text-[11px] text-muted">{toast}</p> : null}
        </div>
        {play.blockedCleared ? (
          <p className="rounded-lg border border-border bg-surface px-3 py-2.5 text-[12px] text-muted">
            No blocked orders. Shortage on DEMOZOVETO/26-27/SO/00004 is cleared.
          </p>
        ) : (
          <div
            data-tour="wh-blocked"
            className={cn(
              "rounded-lg border px-3 py-2.5",
              play.whStat === "blocked" ? "border-blue bg-blue-light" : "border-border bg-surface",
            )}
          >
            <p className="text-[12px] font-medium">Blocked, not pickable</p>
            <p className="mt-1 text-[11px] text-muted">
              These orders have no allocatable stock. Resolve stock in Inventory, then refresh.
            </p>
            <p className="mt-2 text-[12px]">DEMOZOVETO/26-27/SO/00004 · CONFIRMED · 1 shortage line · 0 qty to pick</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <button type="button" className="rounded-md border border-border px-2 py-1 text-[11px]">
                View shortages
              </button>
              <button type="button" className="rounded-md border border-border px-2 py-1 text-[11px]">
                Open order
              </button>
              <button
                type="button"
                onClick={() => onInteract({ blockedCleared: true, whStat: null })}
                className="rounded-md bg-red px-2 py-1 text-[11px] font-medium text-white"
              >
                Cancel order
              </button>
            </div>
          </div>
        )}
      </div>
    </AppChrome>
  );
}

function FinanceScene({ play, onInteract }: { play: TourPlayState; onInteract: Interact }) {
  const [localInvoices, setLocalInvoices] = useState<Invoice[]>(INVOICES);
  const extra = localInvoices.length - INVOICES.length;
  const posted = 96;
  const draft = 3 + extra;
  const total = 100 + extra;
  const filtered = useMemo(() => {
    return localInvoices.filter((row) => {
      const q = play.finQuery.trim().toLowerCase();
      const matchesQuery =
        !q || row.id.toLowerCase().includes(q) || row.customer.toLowerCase().includes(q) || row.status.toLowerCase().includes(q);
      const matchesFilter =
        play.finFilter === "all" ||
        (play.finFilter === "posted" && row.status === "Posted") ||
        (play.finFilter === "draft" && row.status === "Draft");
      return matchesQuery && matchesFilter;
    });
  }, [localInvoices, play.finFilter, play.finQuery]);
  const openRow = play.financeRow != null ? filtered[play.financeRow] ?? null : null;

  const addInvoice = () => {
    const next: Invoice = {
      id: `DEMOZOVETO/26-27/INV/${String(900 + localInvoices.length).padStart(5, "0")}`,
      customer: "Counter walk-in",
      taxable: "₹10,000.00",
      total: "₹11,800.00",
      status: "Draft",
      gst: "GST pending",
      date: "04 Sep 2026",
    };
    setLocalInvoices((current) => [next, ...current]);
    onInteract({ finFilter: "draft", financeRow: 0, invoiceOpen: true });
  };

  return (
    <AppChrome
      module="FINANCE"
      sidebar={
        <>
          <p className="px-2 pb-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-2">Sales & collections</p>
          <SideLink active>Sales invoices</SideLink>
          <SideLink>Collections</SideLink>
        </>
      }
    >
      <div className="relative flex min-h-0 flex-col gap-3">
        <div className="rounded-md border border-blue-light bg-blue-dim px-3 py-1.5 text-[11px]">
          BOOKS FY26-27 · Finance control: posted-document revisions and audit trail, not day-to-day cashbook entry.
        </div>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] text-muted">Finance & accounting &gt; Sales invoices</p>
            <h3 className="text-base font-semibold tracking-tight">Sales invoices</h3>
            <p className="text-[11px] text-muted">INV series only. Service Center bills live on their own register.</p>
          </div>
          <button
            type="button"
            data-tour="fin-new"
            onClick={addInvoice}
            className="rounded-md bg-blue px-2.5 py-1 text-[11px] font-semibold text-white"
          >
            New invoice
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px]">
          <button type="button" data-tour="fin-total" onClick={() => onInteract({ finFilter: "all", financeRow: null })}>
            <span className="font-mono font-semibold tabular-nums">{total}</span> invoices
          </button>
          <button
            type="button"
            data-tour="fin-posted"
            onClick={() => onInteract({ finFilter: play.finFilter === "posted" ? "all" : "posted", financeRow: null })}
            className={play.finFilter === "posted" ? "text-blue" : ""}
          >
            <span className="font-mono font-semibold tabular-nums">{posted}</span> posted
          </button>
          <button
            type="button"
            data-tour="fin-draft"
            onClick={() => onInteract({ finFilter: play.finFilter === "draft" ? "all" : "draft", financeRow: null })}
            className={play.finFilter === "draft" ? "text-blue" : ""}
          >
            <span className="font-mono font-semibold tabular-nums">{draft}</span> draft
          </button>
          <span className="text-muted">Taxable ₹1,05,91,983.00</span>
          <span className="text-muted">Total ₹1,27,22,630.08</span>
        </div>
        <label className="block">
          <span className="sr-only">Search invoices</span>
          <input
            value={play.finQuery}
            onChange={(event) => onInteract({ finQuery: event.target.value, financeRow: null, invoiceOpen: false })}
            placeholder="Invoice #, customer, status..."
            className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-[12px] outline-none focus:border-blue"
          />
        </label>
        <div className="min-h-0 flex-1 overflow-auto rounded-lg border border-border">
          <table className="w-full min-w-[720px] text-left text-[11px]">
            <thead className="bg-surface text-[10px] uppercase tracking-wide text-muted-2">
              <tr>
                <th className="px-2.5 py-1.5 font-medium">Invoice #</th>
                <th className="px-2.5 py-1.5 font-medium">Customer</th>
                <th className="hidden px-2.5 py-1.5 font-medium md:table-cell">Taxable</th>
                <th className="hidden px-2.5 py-1.5 font-medium md:table-cell">Grand total</th>
                <th className="px-2.5 py-1.5 font-medium">Status</th>
                <th className="px-2.5 py-1.5 font-medium">GST / EWB</th>
                <th className="px-2.5 py-1.5 font-medium"> </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, index) => (
                <tr
                  key={row.id}
                  data-tour={index === 0 ? "fin-row-0" : undefined}
                  className={cn(
                    "border-t border-border",
                    play.financeRow === index ? "bg-blue-light" : "bg-background hover:bg-surface",
                  )}
                >
                  <td className="px-2.5 py-1.5 font-medium text-blue">{row.id}</td>
                  <td className="truncate px-2.5 py-1.5">{row.customer}</td>
                  <td className="hidden px-2.5 py-1.5 font-mono tabular-nums md:table-cell">{row.taxable}</td>
                  <td className="hidden px-2.5 py-1.5 font-mono tabular-nums md:table-cell">{row.total}</td>
                  <td className="px-2.5 py-1.5">
                    <Badge tone={row.status === "Posted" ? "blue" : "gray"}>{row.status}</Badge>
                  </td>
                  <td className="px-2.5 py-1.5 text-muted">{row.gst}</td>
                  <td className="px-2.5 py-1.5">
                    <button
                      type="button"
                      onClick={() => onInteract({ financeRow: index, invoiceOpen: true })}
                      className="font-medium text-blue"
                    >
                      Open
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {play.invoiceOpen && openRow ? (
          <div
            data-tour="fin-drawer"
            className="absolute right-0 top-8 z-[1] w-[min(100%,300px)] rounded-lg border border-border bg-background p-3 shadow-elevated"
          >
            <p className="text-[13px] font-semibold">{openRow.id}</p>
            <p className="mt-1 text-[12px]">{openRow.customer}</p>
            <p className="mt-2 text-[11px] text-muted">
              {openRow.status} · {openRow.gst} · {openRow.date}
            </p>
            <p className="mt-2 font-mono text-[12px] tabular-nums">
              {openRow.taxable} taxable · {openRow.total} total
            </p>
            <button
              type="button"
              onClick={() => onInteract({ invoiceOpen: false })}
              className="mt-3 rounded-md border border-border px-2.5 py-1 text-[11px]"
            >
              Close
            </button>
          </div>
        ) : null}
      </div>
    </AppChrome>
  );
}

export function ProductTourScene({
  scene,
  play,
  onInteract,
}: {
  scene: TourSceneId;
  play: TourPlayState;
  onInteract: Interact;
}) {
  if (scene === "sales-crm") return <SalesScene play={play} onInteract={onInteract} />;
  if (scene === "warehouse") return <WarehouseScene play={play} onInteract={onInteract} />;
  if (scene === "finance") return <FinanceScene play={play} onInteract={onInteract} />;
  return <CommandCenterScene play={play} onInteract={onInteract} />;
}
