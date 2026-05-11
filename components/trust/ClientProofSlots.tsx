type ProofItem = {
  label: string;
  value?: string;
  quote?: string;
};

type ClientProofSlotsProps = {
  logos?: readonly ProofItem[];
  testimonials?: readonly ProofItem[];
  metrics?: readonly ProofItem[];
};

export function ClientProofSlots({ logos = [], testimonials = [], metrics = [] }: ClientProofSlotsProps) {
  const hasProof = logos.length > 0 || testimonials.length > 0 || metrics.length > 0;
  if (!hasProof) return null;

  return (
    <section aria-label="Verified customer proof" className="grid gap-4 md:grid-cols-3">
      {metrics.map((item) => (
        <article key={`metric-${item.label}`} className="rounded-xl border border-border bg-card p-4">
          <p className="text-2xl font-bold text-foreground">{item.value}</p>
          <p className="mt-1 text-sm text-muted">{item.label}</p>
        </article>
      ))}
      {logos.map((item) => (
        <article key={`logo-${item.label}`} className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm font-semibold text-foreground">{item.label}</p>
        </article>
      ))}
      {testimonials.map((item) => (
        <figure key={`testimonial-${item.label}`} className="rounded-xl border border-border bg-card p-4">
          <blockquote className="text-sm leading-relaxed text-muted">{item.quote}</blockquote>
          <figcaption className="mt-3 text-sm font-semibold text-foreground">{item.label}</figcaption>
        </figure>
      ))}
    </section>
  );
}

export default ClientProofSlots;
