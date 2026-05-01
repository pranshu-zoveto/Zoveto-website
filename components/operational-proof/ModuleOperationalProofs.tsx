import { getProofsForModuleSlug } from "@/lib/operational-proof";
import { ProofCard } from "./ProofCard";

export function ModuleOperationalProofs({ moduleSlug }: { moduleSlug: string }) {
  const proofs = getProofsForModuleSlug(moduleSlug);
  if (!proofs.length) return null;

  return (
    <section className="space-y-6" aria-labelledby="module-operational-proof-heading">
      <div>
        <h2 id="module-operational-proof-heading" className="text-lg font-bold tracking-tight text-foreground md:text-xl">
          Operating patterns tied to this module
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Observed workflow failures and the cleaner record path Zoveto replaces them with.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {proofs.map((proof) => (
          <ProofCard key={proof.slug} proof={proof} variant="compact" />
        ))}
      </div>
    </section>
  );
}
