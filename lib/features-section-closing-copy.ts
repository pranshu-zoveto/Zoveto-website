/** Loop interval for PointerHighlight on the outcomes closing line (ms). */
export const FEATURES_POINTER_HIGHLIGHT_REPLAY_MS = 2600;

/** Closing line under Features outcomes (PointerHighlight wraps `highlight`). */
export const FEATURES_SECTION_CLOSING = {
  before: "When your systems stop fighting, ",
  highlight: "everything aligns",
  after: ".",
} as const;

export function featuresSectionClosingPlainText(): string {
  const { before, highlight, after } = FEATURES_SECTION_CLOSING;
  return `${before}${highlight}${after}`;
}
