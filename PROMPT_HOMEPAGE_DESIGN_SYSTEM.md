# Homepage Design System Pass — Cursor Implementation Prompts

This is the pass that fixes the "boxes and lines, mismatched, AI-generated" feedback. Reference mockup (approved direction): https://claude.ai/code/artifact/593ade68-4809-4892-8a6b-c36737601fb8 — every section kept, same copy, same order. What changes:

1. **One color system, not the current Apple-blue-on-cool-gray.** True near-black ink (`#0a0a0c`) on true white, with a single deep indigo-violet accent (`#4338ca`) replacing the current sky blue (`#0071e3`) everywhere. This lives in `app/globals.css` CSS variables, which are shared site-wide — not just the homepage. That's a deliberate, flagged exception to the "homepage only" rule for this session, because a two-tone brand (indigo homepage, blue everywhere else) would look broken. Prompt 1 handles this carefully with a grep-first, screenshot-other-pages-after discipline.
2. **Two spacing rhythms instead of eleven ad hoc ones**, and a real bug fix (`ProblemSection`'s padding currently shrinks at the desktop breakpoint).
3. **No more repeated bordered-card language.** Problem, Comparison, Heard This Before, Zero Client Trust, and Pricing all independently invented the same white-card-rounded-corner-icon-box shape. All five switch to a shared rule-divided list pattern (hairline dividers, mono numbering/figures where there's real data) instead. Features keeps its real screenshots exactly as they are — those keep their border frame, since that's the one thing on the page that should look "framed."

Nothing is removed. Paste these one at a time, same discipline as every pass before this: read first, explain, change only that one thing, run `npm run typecheck` and `npm run lint`, show the diff, stop.

---

## Prompt 0 — Paste first if this is a new Cursor session

```
You are working on the Zoveto marketing website (Next.js 16 App Router, React 18, TypeScript, Tailwind CSS 3.4, GSAP for the homepage hero). Dev server runs at http://localhost:3002.

RULES for this session:
1. Homepage sections only: app/(marketing)/page.tsx and the components it imports. Do not touch any other route's page.tsx or route-specific content.
2. EXCEPTION, scoped and deliberate: Prompt 1 in this pass changes color CSS variables in app/globals.css. Those variables are shared site-wide by design — that prompt includes its own extra verification steps (grep every usage, screenshot two other pages) precisely because it is the one prompt that isn't homepage-scoped. Do not extend that exception to anything else.
3. The hero (components/sections/dashboard-scroll-desktop.tsx, dashboard-scroll-mobile.tsx, and components/sections/home/*) is LOCKED — do not modify it in this session, including its colors. If a locked file only reads a CSS variable (e.g. bg-background) rather than hardcoding a color, that's fine and expected — you are not editing the locked file itself.
4. components/sections/ZeroClientTrustSection.tsx and components/pricing/PricingModuleGrid.tsx are shared with other routes (pricing/contact pages). Any structural/layout change to them must be gated so it applies to the homepage only (via the existing `context` prop on ZeroClientTrustSection, and a new `variant` prop you'll add to PricingModuleGrid) — never change their default rendering for other routes.
5. Work one prompt at a time. Read relevant files first, explain what you're about to do in one paragraph, make only that change, run `npm run typecheck` and `npm run lint`, then stop and show me the diff and every file touched.
6. No new npm dependencies. No large refactors. Do not rewrite existing marketing copy — every word of copy stays exactly as it is; only spacing, color tokens, and container/border markup change.
7. Do not commit or push.

Reply "understood" and wait for the first task.
```

---

## Prompt 1 — Color tokens: replace the blue-on-cool-gray system with near-black/white + one indigo accent

```
Open app/globals.css and find the :root block (it starts around line 8, with --spacing-xs etc., then the color tokens a bit further down — --background, --foreground, --blue and its variants, --teal, --surface, --border, --muted).

First, grep every one of these token names across the codebase so you know the blast radius before touching anything:
  grep -rn "var(--blue\|var(--teal\|var(--background)\|var(--foreground)\|var(--surface\|var(--border\|var(--muted" --include="*.tsx" --include="*.ts" --include="*.css" . | wc -l

Then make exactly these value changes inside the :root block in app/globals.css. Do not rename any variable, do not touch --success, --warning, --danger, --green, or --amber (those are semantic feedback tokens, unrelated to this brand pass, and must stay as they are). Do not touch anything in components/sections/dashboard-scroll-desktop.tsx, dashboard-scroll-mobile.tsx, or components/sections/home/* even if they reference these variables — the hero stays locked, it will simply pick up the new token values automatically, which is expected and fine.

  --background:        #f5f5f7   ->  #ffffff
  --foreground:        #1d1d1f  ->  #0a0a0c
  --card-foreground:   #1d1d1f  ->  #0a0a0c
  --blue:              #0071e3  ->  #4338ca
  --blue-hover:        #0077ed  ->  #4f46e5
  --blue-active:       #006edb  ->  #372da3
  --blue-light:        #fbfbfd  ->  #eef0fd
  --blue-dim:          rgba(0, 113, 227, 0.08)  -> rgba(67, 56, 202, 0.08)
  --blue-dim-hover:    rgba(0, 113, 227, 0.13)  -> rgba(67, 56, 202, 0.13)
  --blue-border:       rgba(0, 113, 227, 0.25)  -> rgba(67, 56, 202, 0.25)
  --blue-shadow:       rgba(0, 113, 227, 0.26)  -> rgba(67, 56, 202, 0.26)
  --blue-shadow-hover: rgba(0, 113, 227, 0.36)  -> rgba(67, 56, 202, 0.36)
  --blue-glow:         rgba(0, 113, 227, 0.2)   -> rgba(67, 56, 202, 0.2)
  --teal:              #0077ed  ->  #4338ca
  --teal-dim:          rgba(0, 119, 237, 0.08)  -> rgba(67, 56, 202, 0.08)
  --teal-glow:         rgba(0, 119, 237, 0.25)  -> rgba(67, 56, 202, 0.25)
  --surface:           #f5f5f7  ->  #f6f6f7
  --surface-2:         #fbfbfd  ->  #fbfbfc
  --border:            #d2d2d7  ->  #e4e4e7
  --border-2:          #d2d2d7  ->  #e4e4e7
  --border-strong:     #b8b8be  ->  #cfcfd4
  --muted:              #6e6e73  ->  #6b6b70
  --muted-2:            #86868b  ->  #97979c
  --surface-hover:      #ebebed  ->  #efeff1
  --red:                #ff3b30  ->  #b3261e

(--red is the one used decoratively for copy like "Your business is bleeding" and the Comparison section's X-icons — it becomes a muted brick tone, not alarm red. --danger stays untouched because it's a different token used for real system/error states, not brand copy.)

After changing the values, start the dev server and screenshot these three pages at 1440px, not just the homepage, since these variables are global: localhost:3002/, localhost:3002/pricing, localhost:3002/compare. Confirm nothing looks broken (unreadable text, invisible borders, a button that's now the same color as its background) on the other two pages, then show me all three screenshots plus the diff.
```

---

## Prompt 2 — Collapse the spacing system to two rhythms, fix the ProblemSection padding bug

```
The codebase already has two clean spacing tokens in tailwind.config.ts: `section` (5.5rem / 88px) and `section-mobile` (3.5rem / 56px), used correctly by FeaturesSection, HowItWorksLandingSection, ZeroClientTrustSection, and PricingSection via `py-section-mobile md:py-section`. Seven other homepage sections each hardcode their own one-off padding instead, which is why the page's vertical rhythm resets every time you scroll past one.

First, add one new pair of tokens to the `spacing` block in tailwind.config.ts, next to the existing `section` / `section-mobile` entries:
  "section-tight": "2.5rem",        // 40px — for thin utility bands only
  "section-tight-mobile": "2rem",   // 32px

Then change these files to use the token classes instead of their hardcoded padding, changing nothing else in each file (not the content, not other classNames):

1. app/(marketing)/page.tsx — the inline `<section aria-labelledby="product-demo-heading" className="py-16 md:py-20">` wrapping ProductDemoReel becomes `className="py-section-mobile md:py-section"`.
2. components/sections/LogoStrip.tsx — `py-6 md:py-8` on the root `<motion.section>` becomes `py-section-tight-mobile md:py-section-tight`.
3. components/sections/ProblemSection.tsx — `py-20 md:py-24 lg:py-10` on the root `<motion.section>` becomes `py-section-mobile md:py-section`. (This is the actual bug fix: the current lg:py-10 makes desktop padding shrink to 40px right between two sections that both use 88px — removing it entirely and using the shared token fixes that.)
4. components/sections/SystemShiftSection.tsx — `py-8 md:py-10` becomes `py-section-tight-mobile md:py-section-tight`.
5. components/sections/ComparisonSection.tsx — `py-20 md:py-28 lg:py-32` becomes `py-section-mobile md:py-section`.
6. components/sections/HeardThisBeforeSection.tsx — `py-12 md:py-16` becomes `py-section-mobile md:py-section`.
7. components/sections/LandingFAQSection.tsx — `py-16 md:py-24 lg:py-28` becomes `py-section-mobile md:py-section`.
8. components/sections/FinalCTASection.tsx — `py-16 text-center md:py-28 lg:py-36` becomes `py-section-mobile text-center md:py-section` (this also fixes the oversized empty whitespace in that section).

Run the dev server, scroll the full homepage at 1440px and 390px, and confirm the vertical rhythm now reads as consistent rather than jumping around. Show me the diff.
```

---

## Prompt 3 — De-box ProblemSection: pain cards become a numbered, rule-divided list

```
Read components/sections/ProblemSection.tsx in full before changing anything.

Keep exactly as they are: the "Your business is bleeding" heading and copy, the interactive flow-state chips (Inbox/Sheets/Tools/Disconnected/Chaos) and all their hover/click/auto-cycle behavior, the connecting SVG path animation, and the closing "Your spreadsheet is your assistant..." line. None of that is a card and none of it is in scope for this prompt.

What changes is only the four PAINS entries (both the desktop grid at lines ~255-287 and the mobile accordion at lines ~290-339): replace the bordered-card treatment (`rounded-xl border bg-white p-4`, the icon-in-a-box at the top of each card) with a rule-divided list — no border, no rounded box, no icon chip. Each item becomes: a two-digit index in a monospace font and muted color (01, 02, 03, 04), the heading, the "whatHappens" paragraph, and the "whyItHurts" line as a small arrow-prefixed line in the new indigo accent color (`text-blue`, which now resolves to the new tone from Prompt 1) — separated from the next item by a single top border (`border-t border-border`), not a box around each one. Keep the existing active/inactive opacity and scale states tied to `activeStep`, just apply them to the new markup instead of the card.

Do this for both the desktop version (lines ~255-287) and the mobile accordion version (lines ~290-339) so they use the same visual language. Show me before/after screenshots at 1440px and 390px, and the diff.
```

---

## Prompt 4 — De-box ComparisonSection: old-way/new-way becomes a two-column rule-divided list

```
Read components/sections/ComparisonSection.tsx in full before changing anything.

Keep exactly as they are: the "Excel is your assistant..." heading, the AnimatedTextCycle line, the "Evaluating named vendors?" link, and all five COMPARISON rows' copy.

Replace the current boxed two-panel table (the bordered/divided grid with a circular X icon on the left and a circular check icon on the right, repeated for all 5 rows) with two plain columns separated by a single vertical rule (`border-l border-border` on the second column, no border around either column as a whole): a small uppercase label per feature (Records, Visibility, Tax & Compliance, Scale, Accountability), the description text below it, and a top hairline (`border-t border-border`) between each row instead of the current padding-only spacing. Drop the X/check circle icons entirely — the column position (old vs. new) and the color/weight difference between the two columns already carries that meaning without needing an icon repeated ten times.

For the "Missing 30% operational data" / "Zero revenue leakage architecture" stat line below the table: render both as a small label with the number set in a monospace font in the new indigo accent color, side by side, no card/box around either.

Show me before/after screenshots at 1440px and 768px, and the diff.
```

---

## Prompt 5 — De-box HeardThisBeforeSection: quote cards become a rule-divided list, proof strip loses its box

```
Read components/sections/HeardThisBeforeSection.tsx in full before changing anything.

Keep exactly as they are: the "Every founder we talk to says this" heading/intro, and all three quotes plus their proof lines, and the three PROOF_STRIP_METRICS values and labels.

Replace the three `float-card` quote cards with a simple rule-divided list: each quote as a line of text with its proof stat beside it (set the stat in a monospace font, indigo accent color, right-aligned or beside the quote depending on width), separated by a top hairline between rows — no card border, no box.

Replace the bordered/shadowed proof-strip container (the one with divide-x/divide-y between the three metrics) with the same rule-divided idea: three columns, each with a vertical hairline between them on desktop (no outer box, no shadow), the number set in mono/indigo and the label in the existing muted color.

Show me before/after screenshots at 1440px and 390px, and the diff.
```

---

## Prompt 6 — De-box ZeroClientTrustSection, homepage only (shared component — gate by context)

```
Read components/sections/ZeroClientTrustSection.tsx in full before changing anything. This component is also used on /pricing and /contact via the `context` prop ("pricing" / "contact") — do not change its rendering for those contexts in this prompt. Every change below must be conditional on `context === "home"`.

Keep exactly as they are, for all contexts: the eyebrow/title/body copy per context, the two CTA buttons, and the TRUST_ITEMS copy (Founder-led setup, Role-based access, Audit trails, Data export, and their descriptions).

For context === "home" only: remove the outer bordered/gradient panel (`rounded-xl border border-border/80 bg-[linear-gradient(...)] shadow-[var(--shadow-float)]`) so the section sits directly on the page background like every other section now does. Replace the four `float-card` trust items (each with its own icon-in-a-box and a circular numbered badge) with a rule-divided list matching the pattern used in Prompts 3-5: the existing 01/02/03/04 numbering (it already uses tabular-nums, so just restyle it, don't rebuild the numbering logic) in a monospace font, heading, description, separated by a top hairline. Drop the icon entirely for the home context — the numbering already does the job the icon was doing.

For context === "pricing" and context === "contact", make no visual changes at all — verify by screenshotting /pricing and /contact before and after and confirming they're pixel-identical (aside from the global color-token shift from Prompt 1, which is expected everywhere).

Show me before/after screenshots of the homepage section at 1440px, plus confirmation screenshots of /pricing and /contact, and the diff.
```

---

## Prompt 7 — De-box Pricing: five module cards become a rule-divided price list, homepage only

```
Read components/pricing/PricingModuleGrid.tsx and components/pricing/PricingModuleCard.tsx in full before changing anything. The code comment in PricingModuleGrid.tsx says this grid is "shared by homepage pricing and /pricing" — confirm that by checking where else PricingModuleGrid is imported before making any change.

Add a `variant?: "cards" | "list"` prop to PricingModuleGrid, defaulting to `"cards"` (today's behavior, unchanged everywhere it's used without the prop). Then in components/sections/PricingSection.tsx (the homepage-only usage), pass `variant="list"`.

When variant is `"list"`, render the five modules as a single-column, full-width rule-divided list instead of the current grid of icon-box cards — one row per module, each row separated by a top hairline (no card border, no rounded box, no icon): the module name and tagline on the left (e.g. "WMS" bold, "Warehouse Management" muted beneath it), 2-3 of its real feature bullets as a single muted line, the monthly price set in a bold monospace font on the right with "/mo excl. GST" beneath it in a smaller regular weight, and the "Start 15-day free trial" link at the far right. Keep every module's real name, tagline, price, and feature list exactly as they are in lib/pricing-modules.ts — this is a layout change only.

When variant is `"cards"` (the default, used by /pricing), render exactly what exists today — do not change PricingModuleCard.tsx itself, only add the new list-rendering path alongside it in PricingModuleGrid.tsx.

Show me before/after screenshots of the homepage pricing section at 1440px and 390px, plus a confirmation screenshot of /pricing showing it's unchanged, and the diff.
```

---

## Prompt 8 — FeaturesSection: drop the card border around each transformation block, keep the screenshots framed

```
Read components/sections/FeaturesSection.tsx in full before changing anything.

Keep exactly as they are: all four TransformationBlock instances' copy (headings, before/after bullets, bottom-line footer text), and every screenshot exactly as currently framed (the `OutcomeScreenshotFrame` component's `rounded-lg border border-border` treatment) — screenshots keep their border, they're the one thing on the page that should look like a distinct, framed object.

What changes: the outer `float-card` class on each `<article>` in the `TransformationBlock` component (the `className={cn("float-card", className)}` on the article) gets removed, so each of the four blocks no longer has its own card border/shadow around the whole block. Instead, add a top hairline (`border-t border-border pt-8` or similar, using existing spacing tokens) between blocks, except the first one, so they're separated the same way as every other section in this pass rather than boxed individually. Leave the "Bottom line:" line's own existing `border-t border-border pt-6` as is, that's a different, smaller divider inside each block and is fine as-is.

Show me before/after screenshots at 1440px and 768px, and the diff.
```

---

## Prompt 9 — Final cross-page and responsive check (report only, no code changes unless something's actually broken)

```
This pass touched a shared, global file (app/globals.css) and two shared components (ZeroClientTrustSection.tsx, PricingModuleGrid.tsx), so verify the blast radius before calling this done.

1. Screenshot /, /pricing, /compare, /contact, and one blog post at 1440px and 390px. Confirm the color tokens read correctly everywhere (no invisible borders, no text that's now low-contrast against its background, no button that blends into its own background).
2. Scroll the full homepage at 1440, 1024, 768, 390 and confirm the vertical spacing rhythm is now consistent (only two paddings should appear anywhere: the section rhythm and the tight rhythm from Prompt 2 — nothing else).
3. Confirm every section from Prompts 3-8 still has all its original interactive behavior working: ProblemSection's chip cycling/hover/click, ComparisonSection's AnimatedTextCycle, any reveal-on-scroll animations.
4. Confirm /pricing and /contact are visually unchanged versus before this pass, apart from the global color shift.

Report only what you find, section by section. Do not fix anything automatically — if something's actually broken (not just a judgment call), tell me and I'll say go ahead on that one specific fix.
```
