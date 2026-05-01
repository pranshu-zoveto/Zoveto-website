const BULLETS = [
  "Based on 50+ workflow observations",
  "Manufacturing + Trading businesses",
  "Inventory, dispatch, finance, CRM",
] as const;

const TAGS = ["Manufacturing", "Trading", "Warehouse", "Finance"] as const;

export function TrustStrip() {
  return (
    <section className="float-card px-6 py-10 md:px-10 md:py-12">
      <h2 className="max-w-3xl text-2xl font-bold tracking-tight text-foreground md:text-3xl">
        Built from real operational patterns across scaling businesses
      </h2>
      <ul className="mt-6 max-w-2xl space-y-2.5 text-sm text-muted md:text-base">
        {BULLETS.map((line) => (
          <li key={line} className="flex items-start gap-2.5">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue" />
            <span>{line}</span>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-wrap gap-2">
        {TAGS.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </section>
  );
}
