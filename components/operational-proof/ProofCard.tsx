import Link from "next/link";
import type { OperationalProof } from "@/types";
import { cn } from "@/lib/utils";

type ProofCardProps = {
  proof: OperationalProof;
  /** Listing grid vs module strip — same structure, slightly tighter when compact */
  variant?: "listing" | "compact";
};

export function ProofCard({ proof, variant = "listing" }: ProofCardProps) {
  const dense = variant === "compact";
  return (
    <article
      className={cn(
        "float-card flex h-full flex-col rounded-2xl border border-border/70 bg-gradient-to-b from-card to-white transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-border hover:shadow-[var(--shadow-hover)]",
        dense ? "p-5" : "p-5.5 sm:p-6 md:p-6.5"
      )}
    >
      <span className="inline-flex w-fit rounded-full border border-border bg-surface px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-2">
        {proof.industryTag}
      </span>
      <h3 className={`mt-3 font-semibold tracking-tight text-foreground ${dense ? "text-lg leading-snug" : "text-[1.06rem] leading-snug md:text-[1.15rem]"}`}>
        {proof.title}
      </h3>

      <div className={`mt-5 grid gap-4 ${dense ? "sm:grid-cols-1" : "sm:grid-cols-2"}`}>
        <div>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-2">Before</p>
          <ul className="space-y-1.5 text-sm text-muted">
            {proof.before.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-foreground/45" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-2">After</p>
          <ul className="space-y-1.5 text-sm text-muted">
            {proof.after.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-blue" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4 h-px bg-border/60" aria-hidden />

      <div className="mt-4">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-2">System actions</p>
        <ul className="space-y-1.5 text-sm text-muted">
          {proof.systemActions.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-foreground/35" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 h-px bg-border/60" aria-hidden />

      <div className="mt-4">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-2">Outcome</p>
        <ul className="space-y-1.5 text-sm font-semibold text-foreground">
          {proof.outcomeMetrics.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-blue/90" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex flex-1 flex-col justify-end pt-2">
        <Link
          href={`/operational-proof/${proof.slug}`}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-foreground/15 bg-foreground px-4 py-3 text-center text-sm font-semibold text-background transition-colors hover:bg-foreground/90"
        >
          {proof.ctaLabel}
        </Link>
      </div>
    </article>
  );
}
