# Cursor Implementation Prompt — Replace Inter with IBM Plex Sans + IBM Plex Mono

**Scope:** one change — the sitewide typeface. Independent of `AUDIT_ZOVETO_WEBSITE.md`, `PROMPT_CURSOR_IMPLEMENTATION.md`, and `PROMPT_PRODUCT_DEMO_SCROLL_ZOOM.md`. Do this whenever, it doesn't block or get blocked by those.

**Why:** Inter is currently the single most recognizable signature of an AI-generated/templated site — multiple 2026 design-trend sources call it out by name as the top "AI slop" tell, precisely because it's the default every AI tool and template reaches for. The commonly suggested escapes (Space Grotesk, Plus Jakarta Sans, DM Sans) are themselves becoming the next "safe pick" and are called out in the same sources. IBM Plex Sans + IBM Plex Mono is the replacement: genuinely distinct letterforms from Inter, designed by IBM specifically for enterprise/technical software (a legitimate fit for an ERP/ops product, not a decorative choice), free via Google Fonts (same `next/font/google` pattern already used), and it comes with a real monospace companion for tabular/numeric data — which also fixes a separate, already-documented problem (see Section 4).

This reverses one specific line in `AUDIT_ZOVETO_WEBSITE.md` Part 5, which recommended keeping Inter — that recommendation is superseded for this one decision by explicit direction; nothing else in that audit changes.

---

## 1. Ground rules

1. This is a font-identity change only. **Do not touch spacing, colors, layout, component structure, or copy while doing this** — if you notice something else that looks wrong while you're in a file for this change, do not fix it in the same commit; note it and move on.
2. This is inherently a single, atomic, sitewide change (a font is loaded once in `app/layout.tsx` and consumed everywhere via a CSS variable) — it cannot be meaningfully staged into smaller diffs the way the other prompt documents are, because a half-migrated state would show two different typefaces on the same page. Do the swap in one commit, verify thoroughly (Section 5), then commit.
3. Confirmed via grep before writing this prompt: the current font variable (`--font-inter`) is referenced in exactly 3 real source files — `app/layout.tsx`, `app/globals.css`, `tailwind.config.ts`. Re-confirm this yourself before starting (the codebase may have changed) — if you find more than 3, that's fine, just update all of them consistently.

---

## 2. The swap itself

**`app/layout.tsx`** currently has:
```ts
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700"],
  adjustFontFallback: true,
  fallback: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
});
```

Replace with two `next/font/google` loaders — one for IBM Plex Sans, one for IBM Plex Mono — each exposing its own CSS variable:

```ts
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
  weight: ["300", "400", "500", "600", "700"],
  adjustFontFallback: true,
  fallback: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono-plex",
  display: "swap",
  preload: false,
  weight: ["400", "500", "600"],
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
});
```

Notes:
- **Rename the CSS variable from `--font-inter` to `--font-sans`** — don't keep calling it `--font-inter` when it no longer loads Inter; that would be exactly the kind of confusing, misleading-name leftover this whole project is trying to clean up. Update every reference (see Section 1, point 3).
- Apply both font variables' classNames to the `<html>` or `<body>` tag wherever `inter.variable` is currently applied — you'll now need `` `${plexSans.variable} ${plexMono.variable}` ``.
- `weight: ["300", "400", "500", "600", "700"]` intentionally includes 300 — the audit found 4 existing `font-light` (300-weight) instances sitewide that were requesting a weight Inter never loaded; Plex Sans genuinely has a 300 cut, so loading it here actually fixes that finding instead of working around it. Do **not** add "800" — Plex Sans's heaviest cut is 700 (Bold); find the audit's 1 `font-extrabold` instance and change it to `font-bold` (700) instead, since no 800 exists to load.

**`tailwind.config.ts`**: update `fontFamily.sans` and `fontFamily.display` from `var(--font-inter)` to `var(--font-sans)`. Add a new `fontFamily.mono` (or `fontFamily["mono-plex"]` if `mono` is already used elsewhere for something unrelated — check first) pointing to `var(--font-mono-plex)` with a monospace fallback stack, so components can opt into the real Plex Mono via a Tailwind class instead of the generic `font-mono` utility (which currently just falls back to the browser default monospace stack — see Section 4).

**`app/globals.css`**: update whatever references `--font-inter` (likely a `font-family` declaration on `body` or `:root`) to `var(--font-sans)`.

---

## 3. Dead file cleanup (do this now if `PROMPT_CURSOR_IMPLEMENTATION.md` Stage 2 hasn't run yet)

`app/fonts/GeistVF.woff` and `app/fonts/GeistMonoVF.woff` are confirmed unreferenced anywhere in the codebase (re-verify with a grep for `Geist` before deleting, same as the audit did). If the other prompt document's Stage 2 already deleted these, skip this — don't fight over the same two files in two different branches/sessions.

---

## 4. Optional, second half of this task: give the existing `font-mono` usages the real Plex Mono

23 places in the codebase currently use Tailwind's plain `font-mono` utility (system monospace stack — Menlo/Consolas/etc, whatever the browser defaults to) for tabular/numeric UI: pricing figures, order numbers, ledger-style displays, footer bits. This was flagged in the audit as "not necessarily wrong, but incidental rather than intentional."

Now that Plex Mono is loaded anyway (Section 2), this is close to free to finish properly: find those 23 instances and change `font-mono` to whichever Tailwind class you added in Section 2 for `var(--font-mono-plex)` (e.g. `font-mono-plex`, matching whatever key you chose in `tailwind.config.ts`). This turns "some numbers render in whatever monospace the OS has" into "numbers render in the same designed type family as everything else, deliberately." Also add `font-variant-numeric: tabular-nums` wherever these are columns of numbers meant to align vertically (pricing tables, order/invoice lists) if it isn't already set — check first, some may already have it.

This part is optional relative to Section 2 (the core swap works without it) but is the natural, low-cost completion of the same idea — recommended to do in the same commit since you're already touching font configuration, not as a separate pass.

---

## 5. Verification (do not skip)

1. Run the dev server, load the homepage, and visually confirm every text element renders in Plex Sans, not Inter and not a fallback system font (check via devtools computed styles on a heading and on body copy — confirm `font-family` resolves to the Plex Sans variable, not silently falling back).
2. Check at least one heavily-copy page (`/pricing`, `/security`, `/faq`) and one dynamic-route page (a Compare or Module page) to confirm the swap is truly sitewide, not homepage-only.
3. Confirm no layout shift/reflow regression: Plex Sans has different metrics than Inter (different average character width, different line-height needs) — headings and body copy may wrap slightly differently. This is expected and fine; what's not fine is visible content overflow, clipped text, or broken card heights. Screenshot 2-3 representative pages before and after and compare.
4. Confirm the `adjustFontFallback: true` + explicit `fallback` array is actually preventing a visible layout jump between first paint (system font) and web font load (Plex Sans) — throttle network in devtools and watch for flash-of-unstyled-text-then-reflow; if it's jarring, double check `display: "swap"` and the fallback stack are both correctly set.
5. If you did Section 4: confirm the 23 migrated instances render Plex Mono correctly and that any tabular numeric columns (pricing, order lists) still align — the whole point of tabular figures is that digits are equal-width; verify visually that a column of prices lines up.
6. Confirm the two dead Geist font files are actually gone (or already gone via the other prompt document) and that deleting them didn't break any import (re-run the grep from Section 3 after deleting, expect zero results, and confirm the site still builds).
7. Run a production build (`next build`) at the end, not just dev mode — font-loading behavior via `next/font/google` can differ between dev and a real build; confirm it completes without errors and without new console warnings about missing fonts.

Commit once all of the above pass. This is one commit, not staged across multiple.
