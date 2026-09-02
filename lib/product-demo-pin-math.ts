/** Video boxes smaller than this are treated as not laid out yet. */
export const MIN_DEMO_BOX_PX = 80;
/** Full pin range as a multiple of viewport height (zoom in, hold, zoom out). */
export const DEMO_PIN_VH = 1.8;
/** Floor so ScrollTrigger never gets a near-zero range on short viewports. */
export const DEMO_PIN_MIN_PX = 720;
export const DEMO_ZOOM_WIDTH_VW = 0.96;
export const DEMO_ZOOM_HEIGHT_VH = 0.92;
export const DEMO_ASPECT = 16 / 9;

/** Pinned product-demo zoom length. Bounded so ScrollTrigger never gets a ~0 range. */
export function demoPinDistancePx(innerHeight: number): number {
  const h = Number.isFinite(innerHeight) && innerHeight > 0 ? innerHeight : 800;
  return Math.max(DEMO_PIN_MIN_PX, Math.round(h * DEMO_PIN_VH));
}

/**
 * Scale that grows a laid-out 16:9 video frame toward min(96vw, 92vh),
 * never overflowing the viewport. Returns null when the source has not laid out.
 */
export function demoZoomScale(
  sourceWidth: number,
  viewportWidth: number,
  viewportHeight: number,
): number | null {
  if (!Number.isFinite(sourceWidth) || sourceWidth < MIN_DEMO_BOX_PX) return null;
  if (!Number.isFinite(viewportWidth) || viewportWidth <= 0) return null;
  if (!Number.isFinite(viewportHeight) || viewportHeight <= 0) return null;

  const maxW = viewportWidth * DEMO_ZOOM_WIDTH_VW;
  const maxH = viewportHeight * DEMO_ZOOM_HEIGHT_VH;

  let targetW = maxW;
  let targetH = targetW / DEMO_ASPECT;
  if (targetH > maxH) {
    targetH = maxH;
    targetW = targetH * DEMO_ASPECT;
  }
  targetW = Math.min(targetW, viewportWidth);

  const scale = targetW / sourceWidth;
  if (!Number.isFinite(scale)) return null;
  return Math.max(1, scale);
}
