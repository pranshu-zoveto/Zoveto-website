import { getProofsForModuleSlug } from "@/lib/operational-proof";
import { cn } from "@/lib/utils";
import { ProofCard } from "./ProofCard";

export function ModuleOperationalProofs({ moduleSlug }: { moduleSlug: string }) {
  const proofs = getProofsForModuleSlug(moduleSlug);
  if (!proofs.length) return null;

  const single = proofs.length === 1;

  return (
    <section
      className="rounded-[1.5rem] border border-border/90 bg-gradient-to-b from-card via-card to-surface-2/30 py-10 shadow-[0_12px_40px_rgba(15,23,42,0.06)] md:py-14"
      aria-labelledby="module-operational-proof-heading"
    >
      <div
        className={cn(
          "mx-auto w-full px-4 sm:px-6",
          single ? "max-w-2xl" : "max-w-5xl",
        )}
      >
        <header className={cn(single && "text-center sm:text-left")}>
          <h2
            id="module-operational-proof-heading"
            className="text-balance text-xl font-bold tracking-tight text-foreground md:text-2xl"
          >
            Operating patterns tied to this module
          </h2>
          <p
            className={cn(
              "mt-2.5 max-w-prose text-pretty text-sm leading-relaxed text-muted md:text-[15px]",
              single && "mx-auto sm:mx-0",
            )}
          >
            Observed workflow failures and the cleaner record path Zoveto replaces them with.
          </p>
        </header>

        <div
          className={cn(
            "mt-8",
            single ? "flex flex-col" : "grid grid-cols-1 gap-6 md:grid-cols-2 md:items-stretch md:gap-8",
          )}
        >
          {proofs.map((proof) => (
            <ProofCard key={proof.slug} proof={proof} variant="compact" />
          ))}
        </div>
      </div>
    </section>
  );
}
