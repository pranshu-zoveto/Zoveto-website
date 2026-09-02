import { cn } from "@/lib/utils";

type MockupRow = {
  label: string;
  value: string;
  status?: string;
  tone?: "blue" | "green" | "amber" | "muted";
};

type ModuleScreenshotMockupProps = {
  moduleSlug: string;
  moduleName: string;
  className?: string;
};

const MOCKUPS: Record<string, { title: string; subtitle: string; rows: MockupRow[] }> = {
  wms: {
    title: "Warehouse 1 — pick wave",
    subtitle: "Scan-first dispatch board",
    rows: [
      { label: "Pick task", value: "WAVE-204", status: "In progress", tone: "blue" },
      { label: "SKU", value: "SKU-4821", status: "Bin A-14", tone: "muted" },
      { label: "Order", value: "SO-1187", status: "Packed", tone: "green" },
    ],
  },
  procurement: {
    title: "Purchase queue",
    subtitle: "Requests awaiting approval",
    rows: [
      { label: "PO", value: "PO-1042", status: "Pending approval", tone: "amber" },
      { label: "Vendor", value: "Vendor A", status: "Quoted", tone: "muted" },
      { label: "GRN", value: "GRN-331", status: "Expected Fri", tone: "blue" },
    ],
  },
  finance: {
    title: "GST billing desk",
    subtitle: "Posted vouchers today",
    rows: [
      { label: "Invoice", value: "INV-9021", status: "Posted", tone: "green" },
      { label: "Customer", value: "Customer A", status: "Net 15", tone: "muted" },
      { label: "GSTR-1", value: "Apr 2026", status: "Ready", tone: "blue" },
    ],
  },
  export: {
    title: "Export order tracker",
    subtitle: "Documentation and dispatch",
    rows: [
      { label: "Export", value: "EXP-220", status: "Docs pending", tone: "amber" },
      { label: "Destination", value: "UAE", status: "Dispatch Tue", tone: "blue" },
      { label: "Customer", value: "Customer A", status: "Updated", tone: "green" },
    ],
  },
  crm: {
    title: "Sales pipeline",
    subtitle: "Deals needing follow-up",
    rows: [
      { label: "Lead", value: "LD-441", status: "Quote sent", tone: "blue" },
      { label: "Customer", value: "Customer A", status: "Hot", tone: "amber" },
      { label: "Order", value: "SO-1187", status: "Won", tone: "green" },
    ],
  },
  hrms: {
    title: "Payroll run",
    subtitle: "Attendance and deductions",
    rows: [
      { label: "Run", value: "APR-2026", status: "Draft", tone: "blue" },
      { label: "Staff", value: "48 active", status: "Verified", tone: "green" },
      { label: "PF / ESI", value: "Filed", status: "On track", tone: "muted" },
    ],
  },
  mro: {
    title: "Maintenance board",
    subtitle: "Open jobs and spares",
    rows: [
      { label: "Job", value: "MNT-088", status: "Assigned", tone: "blue" },
      { label: "Asset", value: "Line 2", status: "Downtime 2h", tone: "amber" },
      { label: "Spare", value: "SKU-4821", status: "Consumed", tone: "muted" },
    ],
  },
};

const toneClass: Record<NonNullable<MockupRow["tone"]>, string> = {
  blue: "bg-blue-dim text-blue",
  green: "bg-green-100 text-green-800",
  amber: "bg-amber-100 text-amber-900",
  muted: "bg-surface-2 text-muted",
};

/** Static UI mockup for module pages — generic sample data only. */
export function ModuleScreenshotMockup({ moduleSlug, moduleName, className }: ModuleScreenshotMockupProps) {
  const mockup = MOCKUPS[moduleSlug];
  if (!mockup) return null;

  return (
    <figure
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-card shadow-elevated",
        className,
      )}
      aria-label={`${moduleName} product mockup`}
    >
      <div className="border-b border-border bg-[#f5f5f7] px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" aria-hidden />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" aria-hidden />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" aria-hidden />
          <span className="ml-2 text-xs font-medium text-muted">Zoveto — {moduleName}</span>
        </div>
      </div>
      <figcaption className="border-b border-border px-4 py-4 sm:px-5">
        <p className="text-sm font-semibold text-foreground">{mockup.title}</p>
        <p className="mt-0.5 text-xs text-muted">{mockup.subtitle}</p>
      </figcaption>
      <div className="space-y-2 p-4 sm:p-5">
        {mockup.rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between gap-3 rounded-xl border border-border bg-white px-3 py-2.5"
          >
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-cap text-muted-2">{row.label}</p>
              <p className="truncate text-sm font-semibold text-foreground">{row.value}</p>
            </div>
            {row.status ? (
              <span
                className={cn(
                  "shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold",
                  toneClass[row.tone ?? "muted"],
                )}
              >
                {row.status}
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </figure>
  );
}

export const MODULE_SCREENSHOT_SLUGS = Object.keys(MOCKUPS);
