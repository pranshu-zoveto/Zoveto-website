import assert from "node:assert/strict";
import test from "node:test";
import {
  DEMO_ASPECT,
  DEMO_PIN_MIN_PX,
  DEMO_PIN_VH,
  DEMO_ZOOM_HEIGHT_VH,
  MIN_DEMO_BOX_PX,
  demoPinDistancePx,
  demoZoomScale,
} from "./product-demo-pin-math";

test("demoZoomScale returns null when the source has not laid out", () => {
  assert.equal(demoZoomScale(MIN_DEMO_BOX_PX - 1, 1440, 900), null);
  assert.equal(demoZoomScale(0, 1440, 900), null);
  assert.equal(demoZoomScale(1104, 0, 900), null);
  assert.equal(demoZoomScale(1104, 1440, -1), null);
});

test("demoZoomScale never shrinks a laid-out frame", () => {
  const scale = demoZoomScale(2000, 1440, 900);
  assert.equal(scale, 1);
});

test("demoZoomScale keeps zoomed height within the 92vh cap on short laptops", () => {
  for (const [vw, vh] of [
    [1024, 768],
    [1280, 720],
    [1440, 900],
    [1920, 1080],
  ] as const) {
    const sourceW = Math.min(1104, vw - 48);
    const scale = demoZoomScale(sourceW, vw, vh);
    assert.ok(scale);
    const zoomedW = sourceW * scale;
    const zoomedH = zoomedW / DEMO_ASPECT;
    assert.ok(
      zoomedH <= vh * DEMO_ZOOM_HEIGHT_VH + 0.5,
      `zoomed height ${zoomedH} exceeds 92vh (${vh * DEMO_ZOOM_HEIGHT_VH}) at ${vw}x${vh}`,
    );
    assert.ok(zoomedW <= vw + 0.5, `zoomed width exceeds viewport at ${vw}x${vh}`);
  }
});

test("demoPinDistancePx never returns a near-zero range", () => {
  assert.ok(demoPinDistancePx(0) >= DEMO_PIN_MIN_PX);
  assert.ok(demoPinDistancePx(-10) >= DEMO_PIN_MIN_PX);
  assert.equal(demoPinDistancePx(800), Math.round(800 * DEMO_PIN_VH));
  assert.equal(demoPinDistancePx(400), DEMO_PIN_MIN_PX);
});
