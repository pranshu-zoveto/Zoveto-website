import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  FEATURES_POINTER_HIGHLIGHT_REPLAY_MS,
  FEATURES_SECTION_CLOSING,
  featuresSectionClosingPlainText,
} from "@/lib/features-section-closing-copy";

describe("features section closing copy", () => {
  it("matches expected headline for outcomes section", () => {
    assert.equal(
      featuresSectionClosingPlainText(),
      "When your systems stop fighting, everything aligns.",
    );
  });

  it("keeps highlight segment non-empty for PointerHighlight", () => {
    assert.ok(FEATURES_SECTION_CLOSING.highlight.length > 0);
  });

  it("keeps pointer-highlight replay in the 2–3s product band", () => {
    assert.ok(FEATURES_POINTER_HIGHLIGHT_REPLAY_MS >= 2000);
    assert.ok(FEATURES_POINTER_HIGHLIGHT_REPLAY_MS <= 3000);
  });
});
