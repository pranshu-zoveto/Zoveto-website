import assert from "node:assert/strict";
import test from "node:test";
import {
  dashboardScrollDistancePx,
  getTileZoomParams,
  heroPanelRailPx,
  MIN_TILE_PX,
} from "./dashboard-scroll-math";

function rect(x: number, y: number, w: number, h: number): DOMRect {
  return { x, y, width: w, height: h, top: y, left: x, right: x + w, bottom: y + h, toJSON: () => ({}) };
}

test("getTileZoomParams returns null when rects are not laid out", () => {
  const tiny = rect(0, 0, MIN_TILE_PX - 1, 100);
  const dash = rect(0, 0, 800, 600);
  assert.equal(getTileZoomParams(tiny, dash, 1200, 800), null);
  assert.equal(getTileZoomParams(rect(0, 0, 200, 200), rect(0, 0, 10, 10), 1200, 800), null);
});

test("getTileZoomParams returns finite scale and translation for valid rects", () => {
  const tile = rect(100, 200, 160, 120);
  const dash = rect(40, 80, 1000, 700);
  const p = getTileZoomParams(tile, dash, 1200, 800);
  assert.ok(p);
  assert.ok(Number.isFinite(p!.scale));
  assert.ok(Number.isFinite(p!.x));
  assert.ok(Number.isFinite(p!.y));
});

test("getTileZoomParams shifts x when focusCenterX is not the viewport midpoint", () => {
  const tile = rect(100, 200, 160, 120);
  const dash = rect(40, 80, 1000, 700);
  const centered = getTileZoomParams(tile, dash, 1200, 800);
  const railed = getTileZoomParams(tile, dash, 1200, 800, 400);
  assert.ok(centered && railed);
  assert.equal(centered!.scale, railed!.scale);
  assert.equal(centered!.y, railed!.y);
  assert.notEqual(centered!.x, railed!.x);
});

test("heroPanelRailPx leaves more than half the viewport for the dashboard", () => {
  for (const width of [1024, 1280, 1440, 1920]) {
    const rail = heroPanelRailPx(width);
    assert.ok(rail < width / 2);
    assert.ok(width - rail > 500);
  }
});

test("dashboardScrollDistancePx never returns zero for bad innerHeight", () => {
  assert.ok(dashboardScrollDistancePx(0) > 1000);
  assert.ok(dashboardScrollDistancePx(-10) > 1000);
  assert.equal(dashboardScrollDistancePx(800), 800 * 6.5);
});
