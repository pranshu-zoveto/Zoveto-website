/** Tile / dashboard rects smaller than this are treated as not laid out yet. */
export const MIN_TILE_PX = 24;
export const MAX_ZOOM_SCALE = 4;
export const TARGET_FOCUS_WIDTH_PX = 300;

/**
 * GSAP zoom focal point. Must never divide by ~0 tile width (happens before first layout /
 * font paint) or the whole dashboard scales to viewport-sized “grey slabs”.
 */
export function getTileZoomParams(
  tileRect: DOMRect,
  dashRect: DOMRect,
  viewportWidth: number,
  viewportHeight: number,
): { scale: number; x: number; y: number } | null {
  if (
    tileRect.width < MIN_TILE_PX ||
    tileRect.height < MIN_TILE_PX ||
    dashRect.width < MIN_TILE_PX ||
    dashRect.height < MIN_TILE_PX
  ) {
    return null;
  }
  const rawScale = TARGET_FOCUS_WIDTH_PX / tileRect.width;
  const scale = Math.min(MAX_ZOOM_SCALE, Math.max(0.35, rawScale));
  if (!Number.isFinite(scale)) return null;

  const tileCenterX = tileRect.left + tileRect.width / 2;
  const tileCenterY = tileRect.top + tileRect.height / 2;
  const vpCX = viewportWidth / 2;
  const vpCY = viewportHeight / 2;
  const dashCX = dashRect.left + dashRect.width / 2;
  const dashCY = dashRect.top + dashRect.height / 2;
  const scaledTileCX = dashCX + (tileCenterX - dashCX) * scale;
  const scaledTileCY = dashCY + (tileCenterY - dashCY) * scale;
  const x = vpCX - scaledTileCX;
  const y = vpCY - scaledTileCY;
  if (!Number.isFinite(x) || !Number.isFinite(y)) return null;

  return { scale, x, y };
}

/** Pinned dashboard zoom segment length — bounded so ScrollTrigger never gets a near-zero range. */
export function dashboardScrollDistancePx(innerHeight: number): number {
  const h = Number.isFinite(innerHeight) && innerHeight > 0 ? innerHeight : 800;
  return Math.max(320, h) * 6.5;
}
