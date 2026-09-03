# Cursor Implementation Prompt — Refinements Benchmarked Against babaclick.com

**Scope:** this is a set of specific, evidence-based refinements to the homepage, derived from directly comparing the live `zoveto.com` production site against `babaclick.com` (a site the founder pointed to as looking clean and professional). This is **not** a new redesign and it does not replace `AUDIT_ZOVETO_WEBSITE.md` or `PROMPT_CURSOR_IMPLEMENTATION.md` — it sharpens and adds evidence to findings already in that audit, and adds two new findings that audit didn't cover (hero headline scale, section whitespace rhythm). Read this alongside those documents, not instead of them.

**Important instruction, non-negotiable:** do not copy babaclick.com's actual copy, illustrations, brand colors, wordmark, or any literal content — it's a real, separate company. Everything below extracts *design principles* (scale, spacing, restraint, hierarchy) from what was observed on their live site, to apply using Zoveto's own content, copy, and brand system. Nothing here is "make it look like Babaclick" — it's "here's what a professional-reading site actually does structurally, now apply that discipline to Zoveto's own material."

---

## 1. What was actually compared, and how

Live `babaclick.com` was inspected directly (rendered page + computed CSS values, not guessed), and compared against the **live production `zoveto.com`** — not the local dev instance, which already has some unreleased redesign work on it from a separate pass. Where this document says "Zoveto currently," it means what's actually deployed at zoveto.com right now; check whether local dev has already fixed a given point before treating it as still-open work.

---

## 2. Finding 1 — Hero headline has no confidence or scale

**Babaclick:** hero H1 renders at `80px`, weight `600`, letter-spacing `-4.8px` (computed via devtools) — one big, tightly-tracked, confident sentence, with minimal supporting decoration around it.

**Zoveto (live, zoveto.com):** hero H1 renders at only `44px`, weight `700`, letter-spacing `-1.32px` — roughly half the visual scale — and it's boxed in by 4 separate pill-shaped tag badges ("Execution clarity," "Unified business system," "Qualified onboarding," "Compliance-ready"), an all-caps "MASTER BRAND" eyebrow, and a large separate wordmark treatment above it, all competing for attention before the reader even reaches the one sentence that says what the product does.

**Recommendation:** increase the hero headline's scale substantially on desktop (something in the `64-80px` range is a reasonable target, not an exact copy of Babaclick's number) and reduce what competes with it. This is about the *locked hero's* text layer only — the animation, the dashboard visual, the module sequence, and the overall concept stay exactly as they are (see the standing rule in `PROMPT_CURSOR_IMPLEMENTATION.md` and `PROMPT_PRODUCT_DEMO_SCROLL_ZOOM.md`: never touch the hero's animation/layout/concept). This is a typography-and-hierarchy adjustment to the hero's text content, not a rebuild — check with the user which specific hero text elements are safe to resize before changing anything, since some of what's rendering there (the tag pills, "MASTER BRAND" eyebrow) may be intentional brand furniture rather than accidental clutter. Flag this back rather than guessing if it's unclear which parts are content vs. locked branding.

---

## 3. Finding 2 — Section whitespace is tight; too many ideas compete per screen

**Babaclick:** each major section is visually one idea, with generous vertical breathing room before and after — the page reads like a slow, deliberate walk through a small number of confident statements, not a dense wall of content.

**Zoveto (live, zoveto.com):** measured section `padding-top`/`padding-bottom` values sitewide currently range from `40px` to `128px`, and — more importantly — the module-grid section on the homepage crams 8 small icon-in-box tiles into a tight grid *while simultaneously overlapping a large floating detail card on top of them*, so that at normal viewport width three of the eight tiles are visibly cut off behind the floating card (confirmed via live screenshot: labels reading "Pr...", "...RM", "...s" where content is obscured). This is the exact "messy, boxes and lines, overlapping" feeling that's been the core complaint driving this whole project — it isn't a matter of taste, it's a real layout collision.

**Recommendation:**
1. Fix the overlap first — this is closer to a bug than a design opinion. The module grid and the floating detail panel must not visually collide at any supported viewport width. Either give the floating panel its own dedicated space (not overlapping the grid), or reduce the grid to fewer visible tiles at a time (e.g. a carousel/tab pattern showing one module's detail without obscuring the others), whichever fits the existing component's intent — check `components/sections/dashboard-scroll-mobile.tsx` and whatever renders this specific module-grid-plus-detail-panel pattern before choosing an approach, since this may already be mid-build or may be the mobile fallback specifically.
2. Once the collision is fixed, increase inter-section vertical rhythm generally — this overlaps with, and should be implemented through, the spacing-scale work already scoped in `PROMPT_CURSOR_IMPLEMENTATION.md` Stage 4 (the `4/8/12/16/24/32/40/48/64/80/96/120` scale). Use the larger end of that scale (`80`/`96`/`120`) more often between major homepage sections than the current `40-88px` range mostly in use.

---

## 4. Finding 3 — The icon-in-box card pattern itself isn't the problem; density and collision are

This refines, rather than contradicts, the audit's Part 4 finding about the icon-in-rounded-box card being overused sitewide. Babaclick uses a very similar underlying idea (rounded card, icon, label) — the difference is execution discipline, not the presence of cards:

- Babaclick's cards are large (roughly 300-500px), few per screen (3 at a time), generously spaced, and use a deliberately oversized, asymmetric border-radius (measured: `120px 120px 80px 80px` on one card family, `104px 104px 56px 56px` on another) — a shape clearly chosen on purpose, not the generic `8-12px` "rounded-lg" every template uses.
- Zoveto's module grid uses small cards (roughly 150-200px), 8 at a time in a tight grid, generic small radius, and — per Finding 2 — some are actively obscured by another element.

**Recommendation:** when building the shared `IconCard` primitive already scoped in `PROMPT_CURSOR_IMPLEMENTATION.md` Stage 5, this is useful supporting evidence for two decisions that document left open: (a) don't just fix the shape, also reduce how many appear on screen at once where reasonably possible — fewer, bigger, more spaced-out instances read as more considered than many small ones; (b) consider a deliberately distinctive border-radius value for the new shared primitive (not necessarily Babaclick's exact numbers, but something more considered than the current default `rounded-lg`/`rounded-xl`) as part of that component's design, rather than defaulting to whatever radius token Stage 1's bug fix produces. This is a design decision for whoever builds that component, not a mandate to use Babaclick's exact radius values.

---

## 5. Finding 4 — Font choice: this reference site uses Geist, and Zoveto already has it sitting unused

Babaclick's computed body/heading font is **Geist** (Vercel's typeface), at weight 600 for headlines.

This directly affects the separate, already-delivered `PROMPT_FONT_SWAP_PLEX.md`, which recommended IBM Plex Sans as Inter's replacement. That recommendation was made without this specific reference in hand. Now that the founder has pointed to a site that specifically uses Geist — and given `app/fonts/GeistVF.woff` / `GeistMonoVF.woff` are **already sitting dead, unreferenced, in the Zoveto repo right now** (flagged for deletion in the audit) — switching to Geist instead of Plex Sans is worth serious consideration: it's a smaller lift (the font files may already exist locally rather than needing a fresh Google Fonts load, though re-verify their license/version before use — don't assume a stray `.woff` file found in the repo is production-ready without checking), and it directly matches the exact reference the founder is benchmarking against.

**Recommendation:** treat this as an open decision, not a silent override — the two options are:
- **(a) Geist Sans + Geist Mono** — matches this specific reference exactly; Vercel's font, free, has a real mono companion (same benefit Plex Mono was chosen for); already has (unverified, unlicensed-status) files in the repo that would need auditing rather than blind reuse, or can be loaded fresh via `next/font/google` (Geist is available there) instead of the stray local files.
- **(b) IBM Plex Sans + IBM Plex Mono** — the earlier recommendation, chosen for its "designed for enterprise/technical software" heritage; still a valid, distinct-from-Inter choice.

If picking Geist, use `next/font/google`'s `Geist` and `Geist_Mono` exports the same way `PROMPT_FONT_SWAP_PLEX.md` sets up `IBM_Plex_Sans`/`IBM_Plex_Mono` (same CSS variable pattern, same weight/fallback structure) rather than resurrecting the old static `.woff` files — delete those regardless, per the audit, since a fresh `next/font/google` load is verified/licensed/maintained in a way a stray local file isn't. Do not implement both font prompts — pick one before starting.

---

## 6. What NOT to take from this comparison

- Babaclick's dark, saturated rainbow-gradient hero text is a one-time brand moment for a different company's identity — it does not fit Zoveto's already-chosen restrained black/white/indigo palette (established earlier in this project), and should not be copied.
- Babaclick's numbered eyebrow labels ("001 ● WHAT WE DO," "002 ● WHY IT MATTERS"...) are a nice wayfinding device but are their own brand's system — do not literally add "001/002/003" numbering to Zoveto sections just because it was seen here; if section eyebrows are worth revisiting, that's a separate, smaller decision, not implied by this document.
- Do not use Babaclick's actual page copy, statistics, client-logo strip, or illustrations anywhere. This applies to test/placeholder content too — never paste real competitor content into Zoveto's codebase even temporarily.

---

## 7. Suggested sequencing

This slots into the existing `PROMPT_CURSOR_IMPLEMENTATION.md` plan rather than running as its own separate track:
- Finding 2's overlap fix (Section 3, point 1) is urgent enough to treat like the P0 bugs in that document's Stage 1 — a real layout collision, not a judgment call.
- Finding 2's whitespace increase folds into Stage 4 (spacing scale).
- Finding 3's card discipline folds into Stage 5 (shared card primitive).
- Finding 1 (hero headline scale) is its own small, separate piece of work — confirm with the founder which hero text elements are safe to resize before touching anything in the locked hero files.
- Finding 4 (font choice) replaces `PROMPT_FONT_SWAP_PLEX.md` if Geist is chosen instead of Plex — do not run both.
