import { HOME_CONTAINER } from "@/lib/home-layout";

const MODULES = [
  { name: "Operations", sub: "WMS · Inventory · Dispatch" },
  { name: "Purchase", sub: "Procurement · Suppliers" },
  { name: "Sales", sub: "Orders · CRM · Invoicing" },
  { name: "Finance", sub: "Accounts · GST · P&L" },
  { name: "HR & Payroll", sub: "People · Attendance · Pay" },
  { name: "Intelligence", sub: "Reports · Alerts · BI" },
] as const;

/** Phone-only module map. Desktop keeps the existing GSAP zoom; tablet keeps DashboardMobileModules. */
export function HomeSystemMobileGrid() {
  return (
    <div className="block pb-14 sm:hidden">
      <div className={HOME_CONTAINER}>
        <div className="mx-auto grid max-w-lg grid-cols-2 gap-3">
          {MODULES.map((module) => (
            <div key={module.name} className="rounded-xl border border-border bg-white p-4">
              <p className="text-[14px] font-semibold text-foreground">{module.name}</p>
              <p className="mt-0.5 text-[11px] leading-snug text-muted">{module.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
