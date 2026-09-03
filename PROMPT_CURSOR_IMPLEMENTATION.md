# Cursor Implementation Prompt — Zoveto Website Fixes

**Read this entire file before writing any code.** This prompt tells you how to execute the findings in `AUDIT_ZOVETO_WEBSITE.md`, which already exists at the root of this repo. That audit is read-only — nothing in it has been implemented yet. Your job now is to implement it, but in the exact staged order below, not all at once.

---

## 0. Why this document exists (read this first)

A previous attempt to redesign this site from one large instruction caused the AI tooling to essentially replace the whole website instead of improving it. That must not happen again. The fix is process, not caution alone: **you work in numbered stages, one stage per session, you commit after each stage, and you stop and wait for human review before starting the next stage.** Do not chain stages together automatically. Do not "get ahead" and start Stage 4 while finishing Stage 3.

If anything in this prompt conflicts with something you observe in the actual code, the actual code and `AUDIT_ZOVETO_WEBSITE.md` win — this prompt is a sequencing/execution wrapper around that audit's findings, not a replacement for reading them.

---

## 1. Non-negotiable ground rules (apply to every stage below)

1. **Create a new git branch before Stage 1** (e.g. `fix/audit-implementation`) and commit after each stage completes, with a message naming the stage (e.g. `fix: stage 1 - radius and hero color bugs`). Never squash multiple stages into one commit.
2. **Never touch the hero animation, its layout, or its module arrangement.** The locked files are `HomeHeroLcpShell.tsx`, `HomeHeroAboveFold.tsx`, `StaticDashboardHero.tsx`, `DashboardDesktopLoadingFallback.tsx`, `dashboard/DashboardLight.tsx`, `ContentPanel.tsx`, `3d/HeroBrain.tsx`, `3d/OSNetworkCanvas.tsx`. Stage 1 makes exactly one narrow exception (color-token values only, see below) — everything else in these files is off-limits at every stage.
3. **Never remove or dilute the brand vocabulary** — "operating system," "Command Center," "execution clarity," "one system." These are deliberate, not filler. Do not touch them during any copy-adjacent stage unless a stage explicitly says so.
4. **Never rebuild the dynamic-route template architecture** (`/compare/[slug]`, `/industries/[slug]`, `/modules/[slug]`, `/operational-proof/[slug]`). The one-template-per-family pattern is correct. Where a stage says to fix content, edit the data file (`lib/*.ts`) for that instance — never the shared template component — unless the stage explicitly names the template file.
5. **Do not touch any page listed under "Not yet inspected" in Part 11 of the audit** (About, Team, Careers, Company Facts, Blog, SEO-landing pages, Directory, Owner Dependency Score, Reorder Point Calculator, Implementation, Contact, Signup, System, Product) unless a future stage explicitly names one of them. They were not audited — changing them now would be working blind.
6. **Do not invent new sections, new pages, or new visual concepts.** Every fix below references a specific finding in `AUDIT_ZOVETO_WEBSITE.md` — implement that finding, not your own idea of what would look better.
7. **After each stage, take a screenshot (or run `scripts/mobile-screenshots.mjs` if the stage touches layout) of every page the stage touched, at both mobile and desktop width, before committing.** Confirm nothing broke visually before moving on.
8. **If a stage's instructions are ambiguous about a specific file you find while working, stop and ask rather than guessing** — do not silently make a judgment call on anything structural.
9. **Grep before you assume a value is unused.** Several audit findings (dead spacing tokens, dead radius tokens, dead font files) were confirmed via grep returning zero matches — re-confirm this yourself before deleting anything, since the codebase may have changed since the audit was written.

---

## 2. Relationship to the earlier homepage prompt document

`PROMPT_HOMEPAGE_DESIGN_SYSTEM.md` also exists at the repo root, from before this audit. It is **partially executed already**:
- Its Prompt 1 (global color token swap: `--background`, `--foreground`, `--blue:#4338ca`, `--border`, `--muted`, `--red`) — **already done, confirmed live.**
- Its Prompts 2–9 (spacing-token rollout and de-boxing Problem/Comparison/HeardThisBefore/ZeroClientTrust/Pricing/Features on the homepage) — **not yet done.**

Stage 6 below picks up exactly where that document left off. Do not re-run its Prompt 1. Read Prompts 2–9 in that file when you reach Stage 6 — they contain the exact per-component instructions; this document doesn't repeat them.

---

## STAGE 1 — Fix the two live bugs (P0, do this first, smallest possible diff)

Source: Audit Part 4, rows 2–4; Part 12 step 1.

1. **`--radius` variable bug**: `tailwind.config.ts`'s `borderRadius.lg/md/sm` reference `var(--radius)`, which is never declared anywhere in `app/globals.css` or elsewhere. This makes `rounded-lg`/`rounded-md` compute to `0px` on real elements right now. Fix by declaring `--radius` in `app/globals.css` at a sensible value (check what radius the site's other `rounded-xl`/`rounded-2xl` elements use nearby, e.g. 12–16px, and pick a value consistent with those) — do not invent an arbitrary number. Alternative: if you determine the shadcn-style remap itself is unwanted, remove it from `tailwind.config.ts` and let `rounded-lg/md/sm` fall back to Tailwind's built-in defaults. Pick whichever produces visual consistency with the site's existing `rounded-xl`/`rounded-2xl`/`rounded-full` elements — verify with `getComputedStyle` in devtools, not just by reading the CSS.
2. **Hero button color-fork bug**: the hero's "Request early access" button renders `#0071e3` (old hardcoded hex) while the navbar's same-label button renders `#4338ca` (the current `--blue` token). Find the hardcoded hex values in the locked hero files listed in ground rule #2 and replace them with `var(--blue)` (or the Tailwind class that resolves to it). This is a value substitution only — do not touch layout, animation, or any other property in these files.
3. **`ProofCard.tsx:17` padding bug**: `p-5.5 sm:p-6 md:p-6.5` — `5.5` and `6.5` are not valid Tailwind spacing keys and are not in the config, so they likely no-op. Fix to real scale values, e.g. `p-5 sm:p-6 md:p-7` (or add `5.5`/`6.5` to `tailwind.config.ts`'s spacing scale if the exact in-between value is load-bearing for this card's layout — check visually before deciding).

**Stop here.** Commit as Stage 1. Screenshot the homepage (hero + navbar CTA side by side) and the operational-proof page at desktop and mobile width to confirm the fixes. Wait for review before Stage 2.

---

## STAGE 2 — Global typography cleanup

Source: Audit Part 5; Part 12 step 2.

1. Delete the two unused font files: `app/fonts/GeistVF.woff`, `app/fonts/GeistMonoVF.woff`. Grep first to reconfirm zero references before deleting.
2. **Do not add a second typeface.** Inter stays as the only loaded font — this was a deliberate audit recommendation, not an open question.
3. Decide (or ask, if genuinely unclear from the code) whether the 4 `font-light` and 1 `font-extrabold` instances sitewide are worth keeping — they request weights (300/800) that were never downloaded for Inter, so the browser is synthesizing or substituting them. Either add those weights to the `next/font/google` config in `app/layout.tsx`, or change those 5 instances to one of the 4 already-loaded weights (400/500/600/700). Do not do both — pick one approach and apply it consistently.
4. Do not attempt to fix the 27 arbitrary `tracking-[...]` values or the type-scale adoption in this stage — those are Stage 2's sibling concerns but belong to Stage 2b/Stage 4 scope only if a later stage explicitly revisits them. This stage is font-loading hygiene only.

**Stop here.** Commit as Stage 2. Confirm visually that no text changed rendering. Wait for review before Stage 3.

---

## STAGE 3 — Global container/grid width

Source: Audit Part 4 row 5, Part 7; Part 12 step 3.

1. `PricingSection.tsx` uses `max-w-[min(100%,80rem)]` (1280px) while every other homepage section uses `max-w-content` (1152px, defined in `tailwind.config.ts`) via the shared `FluidMarketingSection` wrapper. Change `PricingSection.tsx` to use the same `max-w-content` container as its neighbors (1152px is the recommendation — it's what everything else already uses, not an arbitrary pick).
2. Also fix `/pricing` (the standalone route, not just the homepage's pricing section) if it independently sets a wider container — check `app/(marketing)/pricing/` files for the same `80rem`/`1280px` pattern before assuming only the homepage section needs this.
3. Do not touch any other container width sitewide unless you find a third instance of this same 1280px-vs-1152px mismatch — if you do, note it and ask before changing it, since the audit only confirmed this one.

**Stop here.** Commit as Stage 3. Screenshot the homepage scrolling from Comparison into Pricing, and the standalone `/pricing` page, to confirm the edge alignment now matches. Wait for review before Stage 4.

---

## STAGE 4 — Global spacing scale

Source: Audit Part 6; Part 12 step 4.

1. Delete the fully-dead legacy spacing block in `app/globals.css` (`--spacing-xs` through `--spacing-4xl`, 8 values). Grep the whole repo first — including inside `globals.css` itself — to reconfirm zero consumers before deleting.
2. Formalize a real numeric spacing scale in `tailwind.config.ts`: `4/8/12/16/24/32/40/48/64/80/96/120`. This is additive — add it as named or default spacing entries; do not remove the existing `section`/`section-mobile`/`section-tight`/`section-tight-mobile` tokens, which are already correctly in active use and match the spirit of this scale.
3. **Do not force every existing arbitrary spacing value (`mt-[60px]`, `gap-[56px]`, `px-[18px]`, etc.) onto this scale in this stage.** Adding the scale to the config is the deliverable here. Migrating existing arbitrary values onto it page-by-page is Stage 6+ work (as those pages get touched for other reasons) — doing a sitewide spacing find-and-replace right now is exactly the kind of broad, uncontained change this document exists to prevent.

**Stop here.** Commit as Stage 4. No visual change is expected from this stage alone (it's additive config) — confirm the site still builds and renders identically. Wait for review before Stage 5.

---

## STAGE 5 — Shared card/icon primitive

Source: Audit Part 4 row 1, Part 9; Part 12 step 5. **This is the highest-leverage stage in the whole plan** — it's the fix for the single strongest "looks AI" fingerprint (the icon-in-a-rounded-box shape reinvented independently in 50+ files).

1. Build one shared component (e.g. `components/ui/IconCard.tsx` or a list-row equivalent, matching whatever pattern the already-executed homepage de-boxing pass established — check `ProblemSection.tsx`/`ComparisonSection.tsx` if Stage 6 has already run, otherwise design it fresh using the site's current tokens: border, radius from Stage 1's fix, spacing from Stage 4's scale).
2. **In this stage, only build the component and do NOT migrate every one of the 50+ files onto it.** Migration happens incrementally as each page/family is touched in later stages (Stage 6 for homepage, Stage 8 for the mad-libbed Compare/Module pages, etc.). Building it in isolation first, then adopting it stage-by-stage, is what keeps each later diff small and reviewable.
3. Name the component clearly and document its props (icon, label, description, variant if both "card" and "list row" styles are needed — Pricing already needs a `variant` prop per the earlier homepage prompt document's Prompt 7).

**Stop here.** Commit as Stage 5 (new component, unused/only used in a test spot if you want to sanity-check it renders correctly). Wait for review before Stage 6.

---

## STAGE 6 — Homepage: finish the de-boxing pass

Source: `PROMPT_HOMEPAGE_DESIGN_SYSTEM.md` Prompts 2–9 (already-scoped, not yet executed); Part 12 step 6.

1. Read `PROMPT_HOMEPAGE_DESIGN_SYSTEM.md` now — its Prompts 2 through 9 contain the exact per-component instructions for: the spacing-token rollout across 8 named files, and de-boxing `ProblemSection.tsx`, `ComparisonSection.tsx`, `HeardThisBeforeSection.tsx`, `ZeroClientTrustSection.tsx`, `PricingSection.tsx`/`PricingModuleGrid`, and `FeaturesSection.tsx`.
2. Execute those prompts now, but **use the shared `IconCard`/list-row primitive from Stage 5 instead of the one-off list markup those prompts originally specified**, wherever the two overlap (Prompts 3–7 in that document each describe converting a card grid into a rule-divided list — build that list using Stage 5's component rather than new bespoke markup).
3. Everything those prompts already say about what to keep unchanged (copy, icons/SVGs, chips, the hero itself) still applies.
4. This also covers `/pricing`'s standalone `PricingModuleGrid` reuse, per Part 11's note that the route shares the component with the homepage section.

**Stop here.** Commit as Stage 6. Screenshot the full homepage and `/pricing` at desktop and mobile width. Wait for review before Stage 7.

---

## STAGE 7 — Product presentation: real module screenshots

Source: Audit Part 10; Part 12 step 7.

1. For the 3 thin module pages (`procurement`, `export`, `mro`), replace the hand-illustrated fake mockup UI with real product screenshots, the same way the homepage was already fixed in a prior pass (1 real video + 4 real screenshots).
2. If real screen-recording stills exist for these 3 modules already (check wherever the homepage's Command Center/Sales/Warehouse/Finance stills came from), extract and use them the same way. **If stills do not exist for Procurement/Export/MRO, do not fabricate placeholder UI to replace the current placeholder UI — flag this back to the user instead of inventing fake data rows, since the whole point of this stage is replacing fake mockups with real product, not swapping one fake mockup for another.**
3. Do not touch the Compare pages' product presentation — the audit found no issue there (a comparison table is the correct format, not a place needing a screenshot).

**Stop here.** Commit as Stage 7 (or stop without committing and report back if real stills don't exist for these 3 modules — see point 2). Wait for review before Stage 8.

---

## STAGE 8 — Other pages: copy, thin modules, orphaned legal pages, CTA labels

Source: Audit Part 3, Part 4 row 6, Part 11; Part 12 step 8. This stage has four independent parts — do them as four separate commits within the stage, not one combined diff, so each is separately reviewable.

**8a. Rewrite the 3 mad-libbed Compare pages.** `vyapar-vs-zoveto`, `freshsales-vs-zoveto`, `gohighlevel-vs-zoveto` currently share one generator function, `makeStandardComparePage()` in `lib/compare-pages.ts:96`. Write real, competitor-specific data entries for these 3 the same way the other 5 (`zoho`, `tally`, `odoo`, `quickbooks`, `sap`) are already hand-written — same page structure/template, different data. Do not modify `CompareDetailPage.tsx` (the shared template) or `makeStandardComparePage()` itself unless the other 5 real entries also go through it (check first) — the fix is content, not the generator function's existence.

**8b. Rebuild the 3 thin Module pages' hero/visual layer.** `procurement`, `export`, `mro` currently fall through to a hardcoded `defaultShowcase` in `ModuleClient.tsx`/`lib/modules.ts`, with generic hero copy ("Accountable execution, without the manual chase.") and invented mockup rows (`ACT-104`, `EXC-218`, `SYN-009`). Write bespoke hero copy for these 3 using the domain specificity that already exists in the same file's `problem`/`howItWorks`/`keyFeatures` fields (MRO's own "Report → Assign → Consume → Review" 4-step sequence and export's "Capture → Prepare → Dispatch → Close" sequence are already well-written — pull from that existing material rather than writing new claims from scratch). Also add the `controlPoints` section these 3 are currently missing, matching the shape of the 6 modules that already have it. If Stage 7 already replaced their visuals with real screenshots, this stage is copy-only.

**8c. Wire the 4 orphaned legal pages into the footer.** `/acceptable-use`, `/cookie-policy`, `/dpa`, `/subprocessors` currently have zero links from the footer or navbar. Add them to the footer's Trust/Legal column in `components/layout/Footer.tsx`.

**8d. Consolidate CTA labels.** 10–12 near-synonymous CTA phrases exist for what are functionally 2 actions (book a demo / start using the product). Pick 2–3 canonical phrases and standardize on them sitewide. Also fix the specific compare-page template issue: the standard compare template currently shows 4 CTA buttons in the first screen (2× "Request early access," "See Zoveto in Action," "Request Setup") — reduce to one primary + at most one secondary CTA in `CompareDetailPage.tsx`.

**Stop here after each of 8a/8b/8c/8d**, or at minimum after all four, and commit separately. Screenshot the 3 rewritten Compare pages, the 3 rebuilt Module pages, the footer, and one Compare page's hero (to confirm the CTA count). Wait for review before Stage 9.

---

## STAGE 9 — Responsive QA (real, rendered — not code-inferred)

Source: Audit Part 8; Part 12 step 9.

1. Run the repo's own `scripts/mobile-screenshots.mjs` (Playwright) across 320/375/390/430/768/834/1024/1280/1440/1920 on: the homepage, `/pricing`, one Compare page, one Module page (ideally one of the 3 just rebuilt), Security, and FAQ.
2. Manually scroll `/modules/procurement` slowly and confirm whether its card content renders at low contrast because of an unfired scroll-reveal animation (the audit flagged this as likely but unconfirmed) — if so, this is a stray finding, not something this document scoped a fix for; report it rather than silently fixing it, since a fix here should be scoped and reviewed like everything else.
3. Fix only clear breakage found by this real rendered pass (overlap, cramped text, overflow) — categorize each as CRITICAL/HIGH/MEDIUM per the audit's own framing, and if the list is long, stop and report it rather than fixing dozens of items in one pass.

**Stop here.** Commit as Stage 9 (or stop and report findings first if the list is large enough to need its own review/prioritization before fixing). Wait for review before Stage 10.

---

## STAGE 10 — Final senior-design read-through

Source: Part 12 step 10.

1. Re-run the audit's own "remove the logo — does this still look like generic AI SaaS?" test across the pages touched in Stages 1–9.
2. Report back: what changed, what's left, and whether anything drifted from the audit's "what already looks good, do not touch" list (hero concept, brand vocabulary, Security page, Navigation, Industries/Operational-Proof families, the dynamic-route architecture itself).
3. Do not make further changes in this stage — it's a verification/report-back stage only.

---

## Summary of stage order

1. Fix 2 live bugs (radius, hero color) + 1 padding bug
2. Typography hygiene (delete dead fonts, fix weight sprawl)
3. Container width (Pricing → 1152px)
4. Spacing scale (delete dead legacy block, add real numeric scale)
5. Build shared card/icon primitive (don't migrate yet)
6. Finish homepage de-boxing (Prompts 2-9 from the other doc, using the new primitive)
7. Real module screenshots (procurement/export/mro)
8. Other pages: 3 Compare rewrites, 3 Module rebuilds, orphaned legal links, CTA consolidation
9. Real rendered responsive QA
10. Final read-through and report

Do not skip ahead. Do not combine stages. Commit and stop after each one.
