/** Two-line AEO lead under H1; use `\\n` in `text` for a line break. */
export function DirectAnswerLead({ text }: { text: string }) {
  return (
    <p
      className="mb-6 max-w-3xl whitespace-pre-line text-pretty text-base font-medium leading-relaxed text-foreground md:text-lg"
      role="doc-subtitle"
    >
      {text}
    </p>
  );
}
