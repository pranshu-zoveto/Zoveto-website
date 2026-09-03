# Zoveto Website — Full Forensic Design/Code Audit

**Scope:** entire site, code + rendered (localhost:3002), read-only. No files were edited. Nothing described below has been implemented.

**Method note (read this before the findings):** the site has ~70 public marketing routes across static pages and four data-driven route families (compare, industries, modules, operational-proof), plus a large legal-page set. A literal page-by-page audit of every one of the ~70 routes at all 10 requested viewport widths was not attempted — that would be several hundred discrete checks. Instead: (1) two focused code-audits covered the *entire* codebase (every component, every route family, every data file) for systemic patterns — fonts, spacing, color, radius, shadows, cards, animation, component duplication, copy; (2) the four dynamic-route families were each audited by reading the shared template plus 2-3 real data instances, which is the correct way to catch "templated/mad-libs" content, and did catch it in one family; (3) live rendering was checked at desktop width (~1456px) on the homepage, Pricing, one compare page, one module page, Security, and FAQ, plus a computed-style check in the browser console for the two most suspicious code findings (both confirmed real, see P0 below). True multi-viewport (320–1920px) rendered screenshots were **not** captured live in this session — an earlier pass in this project found the available browser tool's window-resize does not reliably change the rendered viewport, so mobile/tablet claims below come from reading each component's responsive Tailwind classes (`sm:`/`md:`/`lg:`), not from a screenshot. **Recommendation: before the responsive-fix phase, run the repo's own `scripts/mobile-screenshots.mjs` (Playwright) across the 10 requested widths for an authoritative pass** — that script exists in the repo already and será real rendered screenshots where this audit only has code inference.

Every finding below is sourced to a real file, line, or a live console check — not impression. Where something couldn't be verified, that's stated rather than guessed, per your instruction.

---

## PART 1 — EXECUTIVE SUMMARY

**Does the site currently look AI-generated?** Not from the copy — that's the first thing worth saying clearly, because it's not what most people expect. A full phrase-frequency sweep for the classic AI-marketing tells ("seamlessly," "supercharge," "unlock," "transform your," "reimagine," "the future of," "stop doing X, start doing Y," "operational intelligence," "built for modern") came back **empty** for every one of those except a handful of low-volume, defensible stock phrases (9 instances of a "not just X, Y" construction, 3 of "single source of truth"). The repeated terms that do show up — "operating system" (119×), "Command Center" (15×), "execution clarity" (4×) — are deliberate, consistent brand vocabulary, not filler. Whoever wrote this copy was disciplined.

The "looks AI/templated" feeling is real, but it's coming from three other places: (1) a **visual pattern** — one card shape (icon-in-a-rounded-box, white surface, thin border) reinvented independently in 50+ files across every part of the site, never as one shared component; (2) **two confirmed live bugs** that make the page look broken/unfinished right now, independent of any design opinion; (3) **a handful of genuinely templated ("mad-libs") page instances** sitting right next to well-written ones in the same route family, so quality visibly swings page to page.

**Strongest AI/template fingerprints, in order of severity:**
1. Two CSS bugs are live on the site right now (see P0 below) — a broken `--radius` variable renders `rounded-lg`/`rounded-md` as square corners on real buttons and icon chips, confirmed by inspecting computed styles in the browser; and the homepage's two most prominent buttons (navbar CTA vs. hero CTA) render in **two different accent colors** because the hero components hardcode old hex values instead of reading the site's color token.
2. The icon-in-rounded-box card is the single most repeated visual atom in the codebase — Problem, Comparison, Heard-This-Before, Zero-Client-Trust, Pricing, and the same shape independently re-authored inside Industries, Modules, Compare, Operational-Proof, Security, About, FAQ, Team, and every form component. No shared `<IconCard>` primitive exists; each file reinvents the same `h-9/10/11 w-N rounded-{lg,xl,full} border bg-{surface,blue-light}` shape.
3. 3 of 8 Compare pages (Vyapar, Freshsales, GoHighLevel) are literally generated from one function that splices 4 short strings into fixed sentence templates — same sentences, competitor name swapped — sitting on the same URL structure as 5 other Compare pages that are genuinely, distinctly written.
4. 3 of 9 Module pages (Procurement, Export, MRO) fall through to a hardcoded generic hero/mockup ("Accountable execution, without the manual chase.") that could belong to any SaaS product, and render one fewer section than the other 6 modules.
5. A fully-specified, well-thought-out type scale and two spacing systems exist in the codebase and are **almost entirely unused** — 0% adoption on the type scale specifically — so every heading size on the site was hand-tuned per component instead (78 distinct arbitrary text sizes, 17 unique `clamp()` expressions).
6. CTA labeling is fragmented: 10-12 near-synonymous phrases ("Request early access," "Request Setup," "Request demo," "Book implementation demo," "Start free trial," "Start 15-day free trial"...) for what are functionally 2 actions, and one Compare page shows **4 separate CTA buttons** in the first screen.

**What already looks genuinely good — do not touch:**
- The hero concept (locked) is distinctive and the one thing on this site that couldn't have come from a template.
- Copy discipline overall — see above, it's cleaner than almost any SaaS site this size.
- The Security page: plain table, real numbers, no cards, no icons. This is what "senior and restrained" looks like elsewhere on the site.
- Navigation: the Modules mega-menu is organized by actual product surfaces (Inventory, WMS, CRM, Finance, Analytics, HRMS), not generic marketing categories like "Solutions" — genuinely product-led.
- Industries and Operational-Proof page families: real, differentiated, domain-specific writing per instance (manufacturing BOM variance vs. warehousing pick-path detail) — no template shortcut detected in either.
- The dynamic-route architecture itself (one template component + one data file per route family) is the *correct* engineering pattern for programmatic pages — the problem is a few thin data instances riding on good architecture, not the architecture.

**What must not be changed:** the hero animation/concept and its module arrangement; the "operating system" / "Command Center" brand vocabulary; the single-template-per-family architecture for Compare/Industries/Modules/Operational-Proof (fix the thin instances' *content*, never rebuild the template).

**The senior-designer test — "if you removed the logo, would this still look like a generic AI SaaS site?"** Partially yes, and it's fixable without touching anything structural: the card-shape repetition and the two live bugs are what would give it away; the copy and the information architecture would not.

**10 highest-impact fixes** (detail for each is in the parts below):
1. Fix the broken `--radius` CSS variable (P0, pure bug, five-minute fix, currently squaring off corners sitewide).
2. Fix the hero's hardcoded hex colors so its CTA button matches the rest of the site (P0, narrow, doesn't touch the animation/layout).
3. Reconcile Pricing's container width (`max-w-[min(100%,80rem)]`, 1280px) against the rest of the site's `max-w-content` (1152px) — pick one.
4. Build one shared `IconCard`/`TrustItem` primitive and migrate the highest-repeat instances onto it, starting with the ones already flagged for the homepage.
5. Rewrite the 3 mad-libbed Compare pages (Vyapar, Freshsales, GoHighLevel) with real, differentiated copy matching the other 5.
6. Give the 3 thin Module pages (Procurement, Export, MRO) a real hero/visual instead of the generic fallback, and their missing section.
7. Adopt the existing (currently 0%-used) type scale, or delete it and formally document the arbitrary scale that's actually in use — don't leave two truths in the codebase.
8. Consolidate the CTA label set to 2-3 phrases and remove the redundant-button stacking on Compare pages.
9. Delete dead code: the unused legacy 8-value spacing block, the unused Geist font files, the unused `--radius-lg/xl/full/pill` tokens, the 2 duplicate FAQ-accordion implementations.
10. Wire the 4 orphaned legal pages (`acceptable-use`, `cookie-policy`, `dpa`, `subprocessors`) into the footer — they currently have zero links from primary navigation.

---

## PART 2 — COMPLETE ROUTE INVENTORY

**Static marketing pages (38):** `/`, `/about`, `/acceptable-use`, `/ai-business-automation-india`, `/blog`, `/careers`, `/company-facts`, `/company-operating-system-india`, `/compare`, `/contact`, `/cookie-policy`, `/crm-software-india`, `/directory`, `/dpa`, `/erp-software-distributors-india`, `/erp-software-small-business-india`, `/faq`, `/gst-billing-software-india`, `/hr-payroll-software-india`, `/implementation`, `/inventory-management-software-india`, `/migrate-from-excel`, `/migrate-from-tally`, `/migrate-from-zoho`, `/msa`, `/operational-proof`, `/owner-dependency-score`, `/pricing`, `/privacy`, `/product`, `/reorder-point-calculator`, `/security`, `/signup`, `/sla`, `/subprocessors`, `/system`, `/tally-alternative-india`, `/team`, `/terms`, `/warehouse-management-system-india`.

**Dynamic route families (26 detail pages + 4 index/hub pages):**
- `/compare/[slug]` — 8 real entries: `zoho-vs-zoveto`, `tally-vs-zoveto`, `odoo-vs-zoveto`, `quickbooks-vs-zoveto`, `sap-vs-zoveto`, `vyapar-vs-zoveto`, `freshsales-vs-zoveto`, `gohighlevel-vs-zoveto`. (Two values that looked like slugs in a naive read of the source — "gap" and "strength" — are actually an internal enum for bullet types, not routes; corrected here.)
- `/industries/[slug]` — 4 entries: `manufacturing`, `distribution`, `spare-parts-trading`, `warehousing`.
- `/modules/[slug]` — 9 entries: `inventory`, `crm`, `wms`, `finance`, `hrms`, `analytics`, `procurement`, `export`, `mro`.
- `/operational-proof/[slug]` — 3 entries: `inventory-chaos`, `manual-orders`, `excel-tally-unified`.
- `/blog/[slug]` — post count not exhaustively enumerated this pass; posts live in `app/(marketing)/blog/_posts`.

**Not audited this pass, flagged for a follow-up:** `/blog/[slug]` individual posts, `/about`, `/team`, `/careers`, `/company-facts`, the SEO-landing pages (`ai-business-automation-india`, `crm-software-india`, `erp-software-*-india`, `gst-billing-software-india`, `hr-payroll-software-india`, `inventory-management-software-india`, `warehouse-management-system-india`, `tally-alternative-india`, `company-operating-system-india`, `migrate-from-*`), `/directory`, `/owner-dependency-score`, `/reorder-point-calculator`, `/implementation`, `/contact`, `/signup`, `/system`, `/product`. These weren't read in this pass; treat PART 11 as covering only the families and pages that were actually inspected.

**Out of scope, not audited (internal, not customer-facing):** `app/dashboard/(dashboard)/*` — an internal analytics/admin panel (leads, revenue, SEO, alerts, etc.), reached via `/dashboard/login`. This is not part of the public marketing site and this audit did not touch it.

**API routes (not pages, listed for completeness only):** `/api/auth/*`, `/api/contact`, `/api/dashboard/ga4/*`, `/api/demo`, `/api/integrations/google/*`, `/api/leads`, `/api/razorpay/*`, `/api/signup`, `/api/track`, `/api/v1/*`, `/llms.txt`.

---

## PART 3 — AI COPY AUDIT

| Page | Section | Current wording/pattern | Why it feels AI/generic | Severity | Recommendation |
|---|---|---|---|---|---|
| `/compare/vyapar-vs-zoveto`, `/compare/freshsales-vs-zoveto`, `/compare/gohighlevel-vs-zoveto` | Every section (generated by `makeStandardComparePage()`, `lib/compare-pages.ts:96`) | Hero subtext identical word-for-word on all 3: *"Compare features, workflows, and operational capabilities, not just checklists."* Table row "Core positioning" is the same sentence shape with only the trailing noun swapped: *"Vyapar is usually evaluated for simple billing, GST invoices, and lightweight stock control..."* vs *"Freshsales is usually evaluated for CRM-first sales teams..."* vs *"GoHighLevel is usually evaluated for agency-led marketing automation..."*. "Who should use Zoveto" bullet #2 and 2 full FAQ answers are byte-for-byte identical across all 3. | This is the actual mad-libs pattern the brief is worried about — not a stylistic echo, a function that generates the sentences. | **P1** | Rewrite these 3 pages' data entries with the same care given to Odoo/QuickBooks/SAP (hand-written, competitor-specific mechanics, not the shared template function). Keep the page *structure* — only the content generation method needs to change. |
| Various blog posts + `lib/seo-landings.ts:773` + `ModuleClient.tsx:146` | Body copy | 9 instances of a "**X, not just Y**" contrast construction | Recognizable AI/SaaS rhetorical tic even at low volume — reads as reaching for cleverness rather than saying the thing plainly. | P3 | Not urgent at this volume (9 instances across a whole site). Worth a copy pass eventually, not a priority fix. |
| `components/sections/OSSchematic.tsx:29`, `lib/brand-products.ts:29`, `lib/operational-proof.ts:47` | 3 places | "**single source of truth**" | Stock SaaS-marketing phrase; low volume (3×) but each instance is skippable — the surrounding copy usually already says the more specific, more Zoveto-specific thing. | P3 | Consider replacing each instance with the concrete claim it's standing in for. |
| `/modules/procurement`, `/modules/export`, `/modules/mro` | Page hero + `defaultShowcase` fallback | *"Accountable execution, without the manual chase."* / mockup rows `ACT-104 "Pending action"`, `EXC-218 "Exception raised"`, `SYN-009 "Cross-module sync"` | Generic enough to be any SaaS product's placeholder copy — it's not *wrong*, it's *interchangeable*, which is the definition of the thing you're trying to eliminate. Notably, the underlying feature data for these 3 modules (`problem`/`howItWorks`/`keyFeatures` in `lib/modules.ts`) is actually well-written and specific (MRO's "Report → Assign → Consume → Review" 4-step, export's "Capture → Prepare → Dispatch → Close") — the generic copy is only in the page-level hero/visual layer, not the underlying data. | **P1** | Write bespoke hero copy + mockup content for these 3 modules using the same domain specificity already present in their `lib/modules.ts` entries — the raw material already exists, it's just not surfaced on the page. |
| Sitewide | Core terminology | "operating system" (119×), "one system" (32×), "Command Center" (15×, a real product feature name), "execution clarity" (4×, homepage tagline) | Repeated, but functioning as **consistent brand vocabulary** the way "Move fast" is Meta's or "Just walk out" is Amazon's — not filler. | Not flagged | Keep. Do not remove or dilute this on the theory that repetition = AI. |
| Sitewide | Everything else checked | "seamlessly," "supercharge," "unlock," "transform your," "reimagine," "the future of," "stop doing X / start doing Y," "operational intelligence," "built for modern," "intelligent," "isn't just... it's," "from chaos to" | **Zero occurrences of any of these**, confirmed by direct grep across every marketing page, section component, and data file. | Not flagged | This is a genuine strength — call it out to whoever wrote the copy. Nothing to fix. |

---

## PART 4 — AI VISUAL AUDIT

| Page/Component | Problem | Why it feels AI/template | Severity | Recommendation |
|---|---|---|---|---|
| Sitewide, 50+ files (`ProblemSection.tsx`, `ComparisonSection.tsx`, `HeardThisBeforeSection.tsx`, `ZeroClientTrustSection.tsx`, `PricingSection.tsx`, `IndustryClient.tsx`, `ModuleClient.tsx`, `SystemFlowPage.tsx`, `CompareDetailPage.tsx`/`CompareIndexHub.tsx`, `AboutNarrativeClient.tsx`, `FaqHubClient.tsx`, `PricingClient.tsx`/`PricingFAQSection.tsx`, `PricingPlanCard.tsx`/`PricingModuleCard.tsx`/`PricingFeatureComparison.tsx`, `security/page.tsx`, `company-facts/page.tsx`, `directory/page.tsx`, `ContactClient.tsx`, `implementation/page.tsx`, `OwnerDependencyScoreClient.tsx`, `ReorderPointCalculatorClient.tsx`, `BlogCard.tsx`, `TeamCard.tsx`/`TeamModal.tsx`, `ClientProofSlots.tsx`, `FaqAccordion.tsx`/`MetricCard.tsx`/`FormToast.tsx`, `DemoBookingModal.tsx`, `LeadForm.tsx`, `CookieConsentBar.tsx`, `Navbar.tsx`/`StickyDemoCTA.tsx`/`FooterNewsletter.tsx`, `InventoryLedgerPreview.tsx`, `ModuleScreenshotMockup.tsx`, `SystemVisualCanvas.tsx`, `HowItWorksSection.tsx`, `IndustriesSection.tsx`, `ModuleBento.tsx`, `OSNetworkSection.tsx`, `OSSchematic.tsx`, `SocialProofSection.tsx`, `SolutionSection.tsx`, `SystemModuleCard.tsx`) | The `rounded-{lg,xl,full} border` icon-in-a-box shape is reinvented independently in every one of these, never via a shared component | This is *the* single strongest visual AI-fingerprint on the site — the same decorative atom, unrelated to what each section is actually communicating, repeated across nearly every page type | **P1** | Build one shared card/icon primitive; migrate high-repeat instances first (already scoped for the homepage in a prior pass) |
| Live console check, sitewide | `var(--radius)` is referenced by `tailwind.config.ts`'s `borderRadius.lg/md/sm` but `--radius` is **never declared anywhere in the codebase**. Confirmed live: a real `rounded-lg` button and a real `rounded-md` icon span both compute `border-radius: 0px` in the browser right now. | Buttons/chips that are supposed to be rounded render with square corners, inconsistent with neighboring elements using `rounded-xl`/`rounded-2xl`/`rounded-full` (Tailwind's own built-in values, unaffected by the bug) — this alone produces exactly the "mismatched, inconsistent corners" look flagged in the original complaint | **P0** | Define `--radius` in `app/globals.css` (or remove the shadcn-style remap and let `rounded-lg/md/sm` fall back to Tailwind's defaults) |
| Homepage hero (locked files: `HomeHeroLcpShell.tsx`, `HomeHeroAboveFold.tsx`, `StaticDashboardHero.tsx`, `DashboardDesktopLoadingFallback.tsx`) + `dashboard/DashboardLight.tsx`, `ContentPanel.tsx`, `3d/HeroBrain.tsx`, `3d/OSNetworkCanvas.tsx` | ~40 distinct hardcoded hex colors bypass the CSS variable system, most concentrated in these files. Live-confirmed effect: the navbar's "Request early access" button renders indigo (`#4338ca`, the current token value) while the hero's own "Request early access" button — same label, same page, same viewport — renders the *old* bright blue (`#0071e3`, hardcoded), because the hero reads a literal hex value instead of `var(--blue)`. | Two different accent colors on the two most prominent buttons on the homepage, confirmed by zooming into both live | **P0** | Narrow, surgical fix only: swap the hardcoded hex values in these files for the CSS variable they should have been reading. Does not touch the hero's animation, layout, or concept — this is a color-token fix, not a redesign. |
| `components/operational-proof/ProofCard.tsx:17` | `p-5.5 sm:p-6 md:p-6.5` — `5.5` and `6.5` are not standard Tailwind spacing keys and aren't added to `tailwind.config.ts`'s spacing scale | Likely compiles to a no-op (no padding applied) at those two breakpoints — an authored bug, not a style choice | **P0** | Fix to a real scale value (e.g. `p-5 sm:p-6 md:p-7`, or add `5.5`/`6.5` to the config if the exact value matters) |
| `PricingSection.tsx` vs. every other homepage section | Pricing's container is `max-w-[min(100%,80rem)]` (1280px); every other homepage section uses `max-w-content` (1152px, `tailwind.config.ts`) via the shared `FluidMarketingSection` wrapper | A visitor scrolling from Comparison into Pricing hits a real edge-alignment shift — the left/right margins visibly change width | **P0** | Standardize on one container width; recommend keeping `max-w-content` (1152px) since it's the value used by every other section, and Pricing is the outlier |
| `/compare/vyapar-vs-zoveto` (representative of the standard compare template) | 4 separate CTA buttons visible in the first screen: 2× "Request early access" (one solid, one outline, side by side), "See Zoveto in Action," "Request Setup" | Redundant, competing calls-to-action right at the point of highest attention — a classic "every generator added its own CTA" symptom | **P1** | Consolidate to one primary + at most one secondary CTA per screen |
| Sitewide | 30+ one-off hand-tuned `shadow-[<rgba>]` values coexist with 4 proper shadow tokens (`--shadow-card/elevated/hover/float`) and plain Tailwind `shadow-sm/md/lg` | No shared vocabulary for "how much elevation does this get" — every component guesses its own | **P2** | Consolidate onto the 4 existing tokens; delete one-off values |
| `components/operational-proof/ProofCard.tsx:16-17` | Stacks a token shadow (`float-card`) + `border` + a gradient background + a *second*, different shadow on hover, all on one card | "Trying too hard" — multiple elevation/depth effects layered on a single element | P2 | Pick one effect (border *or* shadow *or* gradient), not three |
| `tailwind.config.ts` + `app/globals.css` | `--radius-md` (18px) is defined larger than `--radius-lg` (16px) — a direct naming inversion | Confusing token system, though low visual impact since neither is referenced via `var()` outside `globals.css` itself | P3 | Rename or renumber so `md < lg` as the names imply |

---

## PART 5 — TYPOGRAPHY AUDIT

**Current fonts loaded:** exactly one — **Inter**, via `next/font/google` (`app/layout.tsx`), weights 400/500/600/700, CSS variable `--font-inter`. `tailwind.config.ts`'s `fontFamily.sans` and `fontFamily.display` both point to the same variable — "display" is an alias, not a second face. This part of the brief's concern is unfounded: the site is not loading multiple competing webfonts.

**What is inconsistent:**
- **Dead font files ship in the repo**: `app/fonts/GeistVF.woff` and `GeistMonoVF.woff` exist on disk, referenced nowhere. Pure waste, should be deleted.
- **`font-mono` (Tailwind's system mono stack) is used 23 times** across homepage sections, footer, and elsewhere — a second, visually distinct family (no letterforms in common with Inter) is rendered sitewide for numerals/labels, even though only Inter is "loaded." Not necessarily wrong (mono for tabular figures is a legitimate, even good, choice — the new homepage color/spacing pass leans into this deliberately) but worth being intentional about rather than incidental.
- **Weight sprawl beyond what's loaded**: `font-semibold`(449)/`font-medium`(288)/`font-bold`(107)/`font-normal`(8)/`font-light`(4)/`font-extrabold`(1) — 6 distinct weights requested, but Inter is only loaded at 400/500/600/700. The 4 `font-light`(300) and 1 `font-extrabold`(800) instances ask for weights that were never downloaded, so the browser synthesizes or silently substitutes them — a subtle rendering-fidelity bug, not just a style choice.
- **Letter-spacing sprawl**: standard `tracking-wide/wider/widest` classes (99 combined) plus **27 distinct arbitrary bracket values** (`tracking-[0.12em]`, `[0.14em]`, `[0.2em]`, `[0.16em]`, `[-0.035em]`... down to singleton one-offs), spread across 77 files. `tailwind.config.ts` already defines a canonical `letterSpacing.ui: 0.01em` token that is essentially unused.

**Recommendation: keep Inter as the single sitewide typeface.** It's the right choice for this product, not a default-because-nobody-decided choice: excellent tabular/numeral rendering (important for a pricing table and finance-heavy product), high x-height for dense UI text, a mature weight range, strong Latin+Indic-adjacent character support, and it's already the established brand face — replacing it would solve nothing the current inconsistencies don't already solve on their own. **Do not introduce a second typeface.** The real fix is adopting one type scale and one weight set consistently (Part 6 immediately below), not changing which font is loaded.

---

## PART 6 — TYPE SCALE AND SPACING AUDIT

**Type scale:** `tailwind.config.ts` already defines a complete, deliberate scale — `body-xs/sm/base/md/lg/xl`, `heading-xs/sm/md/lg/xl/2xl`, `display-sm/md/lg/xl` — each with baked-in line-height, letter-spacing, and weight, mirrored again as raw CSS variables in `globals.css`. **It is used by zero components** (`grep` for `text-body-`/`text-heading-`/`text-display-` across the entire codebase returns nothing). Instead, every component hand-picks from raw Tailwind steps plus **78 distinct arbitrary bracket sizes** (`text-[11px]`, `text-[1.65rem]`, `text-[2.6rem]`...) and **17 unique `clamp()` fluid-size expressions**, no two sharing the same breakpoints. This is the most concrete evidence in the whole audit that "a system was designed, then bypassed everywhere" — arguably a bigger contributor to the "inconsistent" feeling than anything visual.

**Recommendation:** either (a) migrate components onto the existing `heading-*`/`body-*`/`display-*` scale — it's already well-designed, just unused — or (b) if that scale no longer matches what's actually needed, formally redesign and document a new one and delete the old. Either path is fine; **leaving both a designed-and-ignored scale and 78 arbitrary sizes in place is the one option that should not continue.**

**Spacing:** two systems coexist, and one is fully dead. The legacy `--spacing-xs`(8px)`/-sm`(11px)`/-md`(16px)`/-lg`(20px)`/-xl`(30px)`/-2xl`(44px)`/-3xl`(62px)`/-4xl`(128px) block in `globals.css` is referenced **nowhere in the entire repository, including inside `globals.css` itself** — 8 custom properties, zero consumers. The newer `section`(88px)`/section-mobile`(56px)`/section-tight`(40px)`/section-tight-mobile`(32px) tokens (added in a prior homepage-only pass) are the ones in active use. Beyond these, arbitrary spacing brackets are scattered (`mt-[60px]`, `gap-[56px]`, `px-[18px]`, `pl-[4.5rem]`...) plus the confirmed `p-5.5`/`p-6.5` bug noted in Part 4.

**Recommendation:** delete the dead legacy block entirely. Adopt a real numeric scale sitewide — your own suggestion of `4/8/12/16/24/32/40/48/64/80/96/120` is sound and matches the spirit of the `section`/`section-mobile` tokens already in use; formalize it in `tailwind.config.ts` rather than leaving it as convention-only.

---

## PART 7 — ALIGNMENT AUDIT

- **Global container:** `max-w-content` = 72rem (1152px), defined in `tailwind.config.ts`, applied consistently across the homepage via the shared `FluidMarketingSection` wrapper (confirmed in a prior pass of this project). **Confirmed exception: `PricingSection.tsx` uses `max-w-[min(100%,80rem)]`** (1280px) instead — a real, visible edge-alignment shift between Pricing and every section around it.
- **Mobile gutter:** `px-4 sm:px-6` is the consistent pattern seen across every homepage section read in this and prior passes (16px mobile / 24px at `sm`+). No inconsistency found here.
- **Grid/column gap:** not independently re-audited this pass beyond what Part 4/6 already cover (container width, card shape). No sitewide column-gap inconsistency was specifically identified beyond the container-width issue.
- **CTA alignment:** covered under Part 4's compare-page finding (4 competing CTAs in one viewport) — a hierarchy problem more than a pixel-alignment one.
- **Image/screenshot alignment:** the homepage's real product screenshots (from the prior pass) are framed consistently with a shared border/radius treatment; this wasn't independently re-verified against Module-page and Industry-page imagery in this pass — flagged as not yet checked.

---

## PART 8 — RESPONSIVE AUDIT

**Honest disclosure, repeating the method note at the top:** true rendered checks at 320/375/390/430/768/834/1024/1280/1440/1920 were not performed in this session. What follows is what live desktop rendering (~1456px) actually showed, plus code-level inference from responsive Tailwind classes — labeled as such.

**Confirmed live, desktop (~1456px), not a viewport issue:**
- The two P0 bugs from Part 4 (broken `--radius`, hero color fork) are visible at this width and would be visible at every width, since they're not responsive-conditional.
- `/modules/procurement`'s "Accountable execution, without the manual chase." card rendered at very low visual contrast/opacity in one screenshot — this is very likely an unfired scroll-reveal animation (the element's `initial={{opacity:0}}` state caught before its `whileInView` trigger fired) rather than a genuine contrast bug, but this was **not conclusively confirmed** — worth a 10-second manual check by scrolling that page slowly.

**Not verified this pass, code-inferred only (state this to the team as unconfirmed):**
- Most section components carry `sm:`/`md:`/`lg:` variants for grid columns, padding, and font size (confirmed by both code audits reading className strings), which is a good sign against outright breakage, but does not rule out awkward wrapping, cramped text, or overlap at specific widths — only a real rendered pass catches that.
- No `overflow-x`-suppressing classes were flagged as suspicious in the code audit (i.e., no obvious "someone used `overflow-hidden` to paper over a layout bug" pattern was found), but this is a static-analysis inference, not a rendered confirmation.

**Recommendation:** run `scripts/mobile-screenshots.mjs` across all 10 requested widths on the homepage plus one representative page from each of the 4 dynamic-route families before starting the responsive-fix phase, and treat this section as a placeholder for that data, not as a completed responsive audit.

---

## PART 9 — COMPONENT AUDIT

**Duplicates:**
- **3 separate FAQ-accordion implementations** doing the same expand/collapse job: `components/ui/FaqAccordion.tsx` (92 lines, genuinely shared, used by `LandingFAQSection.tsx` via `faq-sections.tsx`), plus `components/faq/FaqHubClient.tsx` (286 lines, powers `/faq`) and `app/(marketing)/pricing/PricingFAQSection.tsx` (132 lines) each reimplementing their own accordion logic instead of reusing the shared one.
- `components/sections/FAQSection.tsx` and `components/sections/LogoMarquee.tsx` are 1-line re-exports (not duplicates — just aliases; harmless, but worth knowing they exist).

**Unnecessarily complex / doing too much:**
- `app/(marketing)/modules/[slug]/ModuleClient.tsx` — 705 lines, the single component powering all 9 module pages (hero, mockup panel, flow sequence, capabilities grid, control points, proofs all inlined in one file).
- `components/compare/CompareDetailPage.tsx` — 597 lines, same pattern for all 8 compare pages.
- Neither is duplication (they're correctly the *one* template for their route family) but both are candidates for splitting into subcomponents for maintainability.

**Missing shared components (highest-leverage finding in this section):** no shared icon-in-a-box card primitive exists despite the shape appearing in 50+ files (see Part 4). This single component, built once and adopted broadly, would resolve most of the "visual AI fingerprint" finding across the entire site, not just the homepage.

**Unused/dead code found incidentally during this audit** (belongs here as much as anywhere): the legacy 8-value spacing block, the type-scale Tailwind classes/CSS vars, the `--radius-lg/-xl/-full/-pill` tokens (defined, essentially never consumed via `var()` outside `globals.css` itself), and the two Geist font files.

---

## PART 10 — PRODUCT PRESENTATION AUDIT

Where the real Zoveto product should replace generic visual elements:

- **Module pages (`/modules/[slug]`), all 9, but especially the 3 thin ones (Procurement/Export/MRO):** every module's "command surface" mockup panel is hand-illustrated fake UI with invented data rows (e.g. `RM-2048 Printed cartons... Reorder in 3 days`), not real product screenshots. The homepage already solved exactly this problem in a prior pass by extracting real stills from an actual screen-recording — the same treatment should extend here if matching module screens exist in that recording (Command Center, Sales/CRM, Warehouse, Finance stills already exist; Procurement/Export/MRO/Analytics/HR stills likely don't yet and would need a new capture).
- **Compare pages:** currently text/table-only (reasonable for this page type — a feature-comparison table is legitimately a table, not a place that needs a screenshot), no finding here.
- **Homepage:** already fixed in the prior pass (1 real video + 4 real screenshots) — no further action needed here, just noting it as the model to follow elsewhere.

---

## PART 11 — PAGE-BY-PAGE PRIORITY

Given the route count, this is organized by page/family rather than all ~70 routes individually — stated explicitly per the scoping note at the top.

**Homepage (`/`)**
- KEEP: hero (locked), copy, section order/content, real screenshots+video.
- CHANGE: the two P0 bugs (radius, hero button color) — narrow token fixes only.
- (Separately, already-scoped and not repeated here: the card-de-boxing pass from the prior prompt document, Prompts 2-9, still pending execution.)
- DO NOT TOUCH: hero animation/concept.

**Pricing (`/pricing`)**
- CHANGE: container width (align to 1152px), the 5-card icon-box grid (same fix as the homepage's Pricing section, already scoped in the prior prompt doc — this route reuses the same `PricingModuleGrid` component).
- KEEP: real prices, taglines, feature lists.

**Compare family**
- KEEP as-is: Odoo, Zoho, Tally, QuickBooks, SAP (5 of 8 — genuinely differentiated).
- REWRITE: Vyapar, Freshsales, GoHighLevel (3 of 8 — mad-libbed, needs real competitor-specific copy).
- CHANGE: CTA button count/hierarchy on the standard template (4 → 1-2).

**Industries family**
- KEEP: all 4 — genuinely well-differentiated, no template-shortcut detected.
- CHANGE (minor, shared with sitewide fix): card-shape consistency once the shared primitive exists.

**Modules family**
- KEEP: Inventory, CRM, WMS, Finance, HRMS, Analytics (6 of 9 — bespoke, well-written).
- REWRITE + REBUILD (visual): Procurement, Export, MRO (3 of 9 — generic fallback copy and mockup, missing a section the other 6 have). Underlying feature data is already good; only the page-level hero/visual layer needs work.

**Operational-Proof family**
- KEEP: all 3 — real, specific writing throughout.

**Security, FAQ**
- KEEP: both are genuinely restrained and well-built (Security especially — a good model for the rest of the site).
- CHANGE (sitewide, not page-specific): FAQ has one of the 3 duplicate accordion implementations; consolidate onto the shared one.

**Footer/Navigation (sitewide)**
- CHANGE: wire `/acceptable-use`, `/cookie-policy`, `/dpa`, `/subprocessors` into the footer's Trust column (currently orphaned — zero links from primary nav); consolidate CTA labels to 2-3 core phrases; decide whether the Modules dropdown/footer should surface all 9 modules or intentionally only the "flagship" 6.

**Not yet inspected this pass — do not assume KEEP or CHANGE:** About, Team, Careers, Company Facts, Blog index/posts, all SEO-landing pages, Directory, Owner Dependency Score, Reorder Point Calculator, Implementation, Contact, Signup, System, Product.

---

## PART 12 — MASTER FIX ORDER

1. **Fix the two live bugs first** (`--radius` variable, hero hardcoded colors) — these are objectively broken right now, not judgment calls, and fixing them costs almost nothing.
2. **Global typography** — decide: adopt the existing type scale, or formally replace it; delete the dead Geist files either way.
3. **Global container/grid** — reconcile Pricing's 1280px against the site's 1152px; pick one.
4. **Global spacing** — delete the dead legacy block; formalize the numeric scale.
5. **Shared card primitive** — build the one `IconCard`/list-row component that the homepage de-boxing pass already established a pattern for; this is the highest-leverage single piece of work in the whole audit.
6. **Homepage** — finish executing the already-scoped de-boxing prompts (Prompts 2-9 from the prior pass), now using the shared primitive from step 5 instead of one-off markup.
7. **Product presentation** — real module screenshots where they exist, starting with the 3 thin modules.
8. **Other pages** — rewrite the 3 mad-libbed Compare pages; rebuild the 3 thin Module pages' hero/visual; wire orphaned legal pages into the footer; consolidate CTA labels sitewide.
9. **Responsive QA** — the real Playwright multi-viewport pass this audit couldn't do live.
10. **Final senior-design read-through** — re-run the "remove the logo" test once 1-9 are done.

---

**This is the complete audit. Nothing was changed. Waiting for direction on what to act on and in what order.**
