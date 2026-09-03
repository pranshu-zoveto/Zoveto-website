# Cursor Implementation Prompt — Scroll-Driven Zoom for the "See it running" Product Video

**Scope:** one new interaction, on one section of the homepage — the "See it running" product video (`components/sections/home/ProductDemoReel.tsx`, rendered from `app/(marketing)/page.tsx`). This is a standalone feature request, independent of `AUDIT_ZOVETO_WEBSITE.md` and `PROMPT_CURSOR_IMPLEMENTATION.md` — it does not need to wait for those stages, and none of those stages touch this component.

**Do not treat this as a hero change.** The homepage's hero (`components/sections/dashboard-scroll-desktop.tsx`, `HomeHeroLcpShell.tsx`, `StaticDashboardHero.tsx`, `dashboard-scroll-mobile.tsx`, `lib/dashboard-scroll-math.ts`) already has its own pinned scroll-zoom sequence, and it is locked — do not open, import from, or modify any of those files as part of this work. This prompt is for a **new, separate, much simpler pin/zoom effect** on the video section that comes after the hero. You may look at those files for reference on how GSAP ScrollTrigger is already used in this codebase (see Section 2 below), but the new behavior must live in its own component.

---

## 1. The behavior being built

Today, `ProductDemoReel` is a plain inline video: it sits in normal document flow at `max-w-content` (1152px), autoplays muted/looped when scrolled into view, and pauses when scrolled out. Nothing zooms.

The new behavior:
1. As the user scrolls down and this section approaches the center of the viewport, the video **pins in place and zooms in** — growing from its current inline size toward filling most of the viewport (large enough to comfortably watch, not necessarily literally 100vw/100vh — see sizing guidance below).
2. While pinned and zoomed, the video keeps playing (using the existing autoplay/loop logic already in the component — do not replace that logic, build around it).
3. If the user keeps scrolling in the same direction, the video **zooms back out** to its normal inline size, unpins, and the page continues scrolling normally into the next section (`LogoStrip`, immediately below it in `page.tsx`).
4. If the user scrolls back up at any point during the zoomed-in state, the effect **reverses smoothly** — zooming back out the way it came — rather than jumping. This reversibility is the core UX requirement ("if he doesn't want, he can scroll down and it zooms out"): the whole effect must be scroll-position-driven, not a one-shot animation that plays once and can't be undone by scrolling back.

This is a scroll-scrubbed animation, not a triggered/one-shot animation — the zoom level at any moment is a direct, continuous function of scroll position within the section's pinned range, in both directions.

---

## 2. Technical approach (reuse what's already in this codebase)

- **Use GSAP + ScrollTrigger.** It's already a dependency (`gsap ^3.15.0`) and already used for the hero. Reuse the library, don't introduce a second animation library (no new Framer Motion scroll-linked logic, no custom `IntersectionObserver`-based hand-rolled zoom math) — GSAP's `ScrollTrigger` with `scrub: true` is built exactly for this "tie animation progress directly to scroll position, reversible" behavior and is the right tool already proven in this repo.
- **Desktop-only, same breakpoint convention as the hero.** `page.tsx` currently loads the hero's GSAP/ScrollTrigger code only for `lg:` (≥1024px) and renders a lighter, non-GSAP mobile/tablet version below that. Follow the same split here: the pin/zoom effect (and the `ScrollTrigger` import) should only load and run at `≥1024px`. On mobile/tablet, `ProductDemoReel` should render exactly as it does today — no pin, no zoom, no GSAP import in that bundle path. Do not attempt a pinned zoom on mobile; mobile scroll-jacking/pinning is a common source of jank and address-bar-resize bugs, and the existing codebase already avoids GSAP on mobile for this reason.
- **Look at, but do not import from, `lib/dashboard-scroll-math.ts` and `dashboard-scroll-desktop.tsx` for conventions worth repeating**, specifically:
  - Bounding the pinned scroll distance so `ScrollTrigger` never gets a near-zero range (`dashboardScrollDistancePx` guards against this for the hero — apply the same kind of guard here, sized appropriately for this much smaller effect, e.g. a fixed 150-250vh scroll distance rather than the hero's much longer multi-tile sequence).
  - Guarding zoom-target math against elements that haven't laid out yet (near-zero width/height), the same way `getTileZoomParams` refuses to compute a scale against a tile smaller than `MIN_TILE_PX`.
  - The codebase note in `FluidMarketingSection.tsx` — *"do not use negative margins (ScrollTrigger safe)"* — applies here too. Do not use negative margins to fake overlap around this section; if you need the pinned video to visually cover more of the viewport, do it by scaling the element itself, not by pulling neighboring sections over it with negative margin.
- **New, isolated component.** Do not rewrite `ProductDemoReel.tsx`'s internals (the video ref, the `IntersectionObserver` autoplay/pause logic, the `prefers-reduced-motion` handling, the `restartIfNeeded` logic) — all of that already works correctly and is unrelated to this feature. Instead, wrap it: create a new component, e.g. `components/sections/home/ProductDemoReelPinned.tsx`, that on desktop renders a pinned/zooming container around the existing `ProductDemoReel`, and on mobile/below 1024px (or if `prefers-reduced-motion: reduce` is set) simply renders `ProductDemoReel` unchanged with no wrapper behavior at all. Update `app/(marketing)/page.tsx`'s dynamic import to point at the new wrapper component instead of `ProductDemoReel` directly (keep the same `dynamic(...)` loading-skeleton pattern already there).

---

## 3. Sizing and layout guidance

- **Normal (unpinned) state**: exactly what exists today — `max-w-content` (1152px), `aspect-video`, `rounded-lg`, `border border-border`, inside the section's existing padding.
- **Pinned/zoomed state**: grow the video container's width toward something like `min(96vw, <some larger cap>)` and let height follow from `aspect-video` — do not stretch or distort the video's aspect ratio at any point in the timeline. Cap the zoomed height at roughly `92vh` so it never overflows the viewport top/bottom on short laptop screens; if the width-driven height would exceed that cap, constrain by height instead and center horizontally. Keep the same `rounded-lg`/border treatment through the zoom, or fade the border/radius out as it approaches full-bleed — either is fine, but make a deliberate, single choice rather than an inconsistent one.
- **Where it pins**: center the zoomed video in the viewport (both axes) — this is a "grows in place toward center" zoom, not a slide.
- **Scroll space**: pinning takes up real scroll distance. Confirm after building that the section doesn't eat an excessive, disorienting amount of scroll — a good target is roughly 1.5–2x viewport height total for the full pin range (zoom in, brief hold, zoom out), not 6x+ like the hero's multi-tile sequence. This is a single-subject zoom, not a multi-scene sequence — keep the scroll cost proportionate.
- **Do not add new caption/overlay text as part of this task.** The hero has its own module-caption treatment; this is a separate, plainer effect — just the video growing and shrinking. If a caption overlay is wanted later, that's a follow-up decision, not part of this build.

---

## 4. Required robustness (this is the "bug-free and professional" part — do not skip any of these)

1. **Both directions must work.** Test scrolling down through the whole section, then scrolling back up through it, at multiple speeds (slow drag, fast flick). The zoom level must track scroll position continuously in both directions — no snapping forward only, no getting stuck mid-zoom.
2. **Clean up on unmount and on navigation.** This is a Next.js App Router site with client-side navigation — any `ScrollTrigger` instance created by this component must be killed in the `useLayoutEffect`/`useEffect` cleanup function when the component unmounts (navigating away from the homepage). A leaked `ScrollTrigger` from a previous page mount is a real, easy-to-introduce bug in this exact pattern — verify by navigating home → another page → back to home several times and confirming no duplicate/stuck scroll behavior and no console warnings.
3. **Call `ScrollTrigger.refresh()` after the video's dimensions are known**, not just on mount — if the pin/zoom math is computed before the video element has its final layout size (e.g., before `loadedmetadata` fires, or before web fonts finish loading and shift layout above this section), the pinned range will be wrong until the next resize. Recompute/refresh once the underlying layout is stable, and on window resize.
4. **Respect `prefers-reduced-motion: reduce`.** `ProductDemoReel` already checks this for video playback — extend the same check to skip the pin/zoom wrapper entirely when it's set, falling back to the plain unpinned rendering. Do not create a "smaller" zoom for reduced-motion users — skip the zoom effect entirely, matching how the existing component already skips autoplay for this preference.
5. **Do not interfere with the existing autoplay/pause-on-visibility logic.** The video should keep playing continuously through the pin/zoom (no restart-from-zero when zoom begins or ends) and should still correctly pause if the user navigates away or the tab loses visibility, exactly as it does today. If you find yourself needing to change `ProductDemoReel.tsx`'s internal play/pause logic to make the zoom work, that's a sign the wrapper is coupled too tightly — the zoom should be a pure visual/layout transform on a container, independent of the video element's own play state.
6. **No layout shift or jump at the pin boundaries.** The transition into the pinned state and out of it must be visually continuous — no visible jump in size or position at the exact moment pinning engages or releases. Test this specifically frame-by-frame if needed (slow-motion screen recording) since this is the most common visible bug in pin-based effects.
7. **Accessibility**: the pin/zoom is a purely decorative visual transform. Do not reparent, hide, or reorder the `<video>` element or its `sr-only` description for the zoom to work — screen reader and keyboard navigation order through this section must be unaffected. Do not trap scroll/keyboard focus during the pinned state.
8. **Short-viewport guard**: on smaller desktop/laptop heights (check at least 1024×768 and 1280×720 in addition to larger screens), confirm the pinned zoom still has enough scroll range to feel intentional rather than instant/jarring, and that the zoomed video never exceeds the viewport bounds at these shorter heights (this is what the `92vh` cap in Section 3 is for — verify it actually holds at these sizes, don't just assume the cap value is correct).
9. **No new console errors or warnings** at any point in the scroll-down/scroll-up test, including in dev mode with React StrictMode's double-invoke behavior (which will mount/unmount effects twice — a common source of "GSAP context already exists" or duplicate-ScrollTrigger bugs if cleanup isn't correct).

---

## 5. Build and verification order

1. Build the new `ProductDemoReelPinned.tsx` wrapper with the pin/zoom behavior, desktop-only, wrapping the untouched `ProductDemoReel`.
2. Wire it into `app/(marketing)/page.tsx` in place of the direct `ProductDemoReel` import.
3. Manually verify on desktop widths (1024, 1280, 1440, 1920): scroll down slowly through the section, confirm smooth zoom-in, hold, zoom-out, then confirm smooth reverse scrolling back up.
4. Confirm mobile/tablet (<1024px) rendering is pixel-identical to what it was before this change — no pin, no zoom, same plain inline video.
5. Confirm the homepage hero above this section is completely unaffected — scroll from the very top of the page through the hero and into this new effect, confirming no interaction or visual conflict between the two pinned sequences.
6. Confirm `prefers-reduced-motion: reduce` (toggle it in devtools) falls back to the plain unpinned video with no pin/zoom at all.
7. Check the browser console for errors/warnings throughout steps 3–6.
8. Commit as one self-contained change once all of the above pass. Do not combine this with any other unrelated change in the same commit.

Stop after building and verifying this — do not proceed to add caption overlays, additional scenes, or any further embellishment beyond what's described above unless asked.
