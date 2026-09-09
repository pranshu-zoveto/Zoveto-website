type RectLike = Pick<DOMRect, "left" | "top" | "width" | "height">;

function asDomRect(x: number, y: number, w: number, h: number): DOMRect {
  return {
    x,
    y,
    width: w,
    height: h,
    top: y,
    left: x,
    right: x + w,
    bottom: y + h,
    toJSON: () => ({}),
  } as DOMRect;
}

/**
 * Convert viewport rects into pinned-hero space (dashboard at 0,0).
 * Required when the animation is not at scrollY=0: getBoundingClientRect is
 * viewport-relative, so using raw tops from below the fold throws the zoom
 * translation off-screen.
 */
export function toPinnedSpaceRects(tileRect: RectLike, dashRect: RectLike): { tile: DOMRect; dash: DOMRect } {
  return {
    tile: asDomRect(
      tileRect.left - dashRect.left,
      tileRect.top - dashRect.top,
      tileRect.width,
      tileRect.height,
    ),
    dash: asDomRect(0, 0, dashRect.width, dashRect.height),
  };
}

/** Tile / dashboard rects smaller than this are treated as not laid out yet. */
export const MIN_TILE_PX = 24;
export const MAX_ZOOM_SCALE = 4;
export const TARGET_FOCUS_WIDTH_PX = 300;

/** Dedicated module-detail rail. Keep in sync with `--hero-panel-*` on the desktop sticky hero. */
export const HERO_PANEL_WIDTH_MIN_PX = 280;
export const HERO_PANEL_WIDTH_MAX_PX = 400;
export const HERO_PANEL_WIDTH_VW = 0.32;
export const HERO_PANEL_GAP_PX = 20;
export const HERO_PANEL_INSET_PX = 16;

export function heroPanelWidthPx(viewportWidth: number): number {
  const w = Number.isFinite(viewportWidth) && viewportWidth > 0 ? viewportWidth : 1440;
  return Math.min(HERO_PANEL_WIDTH_MAX_PX, Math.max(HERO_PANEL_WIDTH_MIN_PX, w * HERO_PANEL_WIDTH_VW));
}

/** Panel width + gap + inset. Dashboard zoom and clip use this so tiles never sit under the panel. */
export function heroPanelRailPx(viewportWidth: number): number {
  return heroPanelWidthPx(viewportWidth) + HERO_PANEL_GAP_PX + HERO_PANEL_INSET_PX;
}

/**
 * GSAP zoom focal point. Must never divide by ~0 tile width (happens before first layout /
 * font paint) or the whole dashboard scales to viewport-sized “grey slabs”.
 */
export function getTileZoomParams(
  tileRect: DOMRect,
  dashRect: DOMRect,
  viewportWidth: number,
  viewportHeight: number,
  focusCenterX?: number,
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
  const vpCX = Number.isFinite(focusCenterX) ? (focusCenterX as number) : viewportWidth / 2;
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

/** Pinned dashboard zoom segment length - bounded so ScrollTrigger never gets a near-zero range. */
export function dashboardScrollDistancePx(innerHeight: number): number {
  const h = Number.isFinite(innerHeight) && innerHeight > 0 ? innerHeight : 800;
  return Math.max(320, h) * 6.5;
}
