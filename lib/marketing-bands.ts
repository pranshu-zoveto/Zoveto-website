export type MarketingBand = 0 | 1 | 2 | 3;

/** Cycle band index for sequential marketing sections (0=white, 1=muted, 2=white, 3=tint). */
export function bandIndexForSection(index: number): MarketingBand {
  const n = ((index % 4) + 4) % 4;
  return n as MarketingBand;
}
