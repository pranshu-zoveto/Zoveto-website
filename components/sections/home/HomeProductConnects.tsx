import { HOME_CONTAINER } from "@/lib/home-layout";

const FLOW = ["Sales", "Inventory", "Warehouse", "Finance"] as const;

export function HomeProductConnects() {
  return (
    <section aria-labelledby="product-connects-heading" className="pb-12 md:pb-16">
      <div className={HOME_CONTAINER}>
        <h2
          id="product-connects-heading"
          className="text-xl font-semibold leading-snug tracking-tight text-foreground sm:text-2xl"
        >
          What the product connects
        </h2>
        <p className="mt-3 max-w-[62ch] text-pretty text-sm leading-relaxed text-muted sm:text-base">
          A sales order reserves inventory. Warehouse picks against that reservation. Finance posts the invoice from
          the same record.
        </p>
        <ol className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-2 text-base font-semibold tracking-tight text-foreground sm:mt-10 sm:gap-x-4 sm:text-lg">
          {FLOW.map((name, index) => (
            <li key={name} className="flex items-baseline gap-3 sm:gap-4">
              {index > 0 ? (
                <span className="font-normal text-muted-2" aria-hidden>
                  →
                </span>
              ) : null}
              <span>{name}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
