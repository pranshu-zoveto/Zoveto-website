# Master A-to-Z Implementation Prompt — Zoveto Website → Babaclick-Level Polish

**Read this whole file before writing any code.** This is the single master execution plan. It supersedes the *sequencing* of four earlier prompt documents in this repo (`PROMPT_CURSOR_IMPLEMENTATION.md`, `PROMPT_PRODUCT_DEMO_SCROLL_ZOOM.md`, `PROMPT_FONT_SWAP_PLEX.md`, `PROMPT_BABACLICK_BENCHMARK_REFINEMENTS.md`) and adds full coverage of every page on the site, including 12 pages no prior pass had actually read. Where this document repeats something from those files, follow this document's version. Where it says "see X for detail," that earlier file still has the exact instructions — this document won't re-paste pages of detail that already exist correctly elsewhere.

**The goal, stated plainly:** the founder pointed at babaclick.com as an example of a site that reads as clean, confident, and professional, and asked for Zoveto to reach that same level, covering the entire site, not just the homepage. This document is organized so that goal is achieved incrementally and safely — never as one giant rewrite.

---

## 0. Ground rules (apply to every part below, no exceptions)

1. **New git branch, commit after each numbered stage**, message naming the stage. Never combine unrelated stages in one commit.
2. **The hero animation is permanently locked**: its concept, layout, module sequence, and GSAP mechanics never change. `HomeHeroLcpShell.tsx`, `HomeHeroAboveFold.tsx`, `StaticDashboardHero.tsx`, `DashboardDesktopLoadingFallback.tsx`, `dashboard-scroll-desktop.tsx`, `dashboard-scroll-mobile.tsx`, `lib/dashboard-scroll-math.ts`, `dashboard/DashboardLight.tsx`, `ContentPanel.tsx`, `3d/HeroBrain.tsx`, `3d/OSNetworkCanvas.tsx` are off-limits except for the one narrow, already-scoped exception in Part 1, Stage 1 (color-token values only) and the hero-text hierarchy work in Part 1, Stage 6 (text sizing only, nothing structural).
3. **Never remove or dilute the brand vocabulary** ("operating system," "Command Center," "execution clarity," "one system") — it's deliberate, confirmed by a full sitewide copy audit to be free of actual AI-generic filler.
4. **Never rebuild a working dynamic-route template** (`/compare/[slug]`, `/industries/[slug]`, `/modules/[slug]`, `/operational-proof/[slug]`) or the SEO-landing shared template (`components/seo/SeoLandingLayout.tsx`) — fix data/content, not the template, unless a step explicitly names the template file.
5. **Do not copy babaclick.com's actual copy, colors, illustrations, or brand assets.** Every instruction below extracts a design *principle* (scale, spacing, restraint) observed on that site, applied using Zoveto's own content and brand system. Nowhere in this document does "match Babaclick" mean "look like Babaclick's brand" — it means "match their level of structural discipline."
6. **Screenshot before/after every stage** at desktop and mobile width, and confirm no console errors, before committing.
7. **If a stage's scope is ambiguous once you're in the actual file, stop and ask** rather than guessing on anything structural.

---

## 1. PART 1 — Sitewide systemic fixes (do these first, in order)

This is `PROMPT_CURSOR_IMPLEMENTATION.md`'s Stage 1-5 plan, with two amendments from the Babaclick comparison folded in as Stage 1b and a new Stage 6. Follow that document for the exact per-stage detail; the summary and amendments below are what changed.

**Stage 1 — Fix the two live P0 bugs**: the broken `--radius` CSS variable (renders `rounded-lg`/`rounded-md` as 0px corners, confirmed live) and the homepage hero-vs-navbar CTA color fork (`#0071e3` hardcoded vs. the current `#4338ca` token). Exactly as scoped in `PROMPT_CURSOR_IMPLEMENTATION.md` Stage 1. Also fix `ProofCard.tsx:17`'s invalid `p-5.5`/`p-6.5` padding values in this same stage.

**Stage 1b — NEW, treat as equally urgent — fix the homepage module-grid overlap.** This was found by directly comparing Zoveto's live module-selector section against babaclick.com and is a real layout collision, not a judgment call: the floating module-detail panel visually covers roughly 3 of the 8 module tiles behind it at normal viewport width (confirmed live: labels reading "Pr...", "...RM", "...s" where content is obscured). Find the component rendering this pattern (likely in or near `dashboard-scroll-mobile.tsx` or a related module-grid-plus-detail-panel component — confirm which before editing) and ensure the grid and the floating panel never occupy overlapping screen space at any supported width. Either give the panel its own dedicated column/space, or show fewer tiles at a time. Screenshot at 1024/1280/1440/1920 and confirm zero visual collision at each.

**Stage 2 — Typography, resolved decision: switch to Geist Sans + Geist Mono, not Inter and not IBM Plex Sans.** `PROMPT_FONT_SWAP_PLEX.md` proposed IBM Plex Sans as Inter's replacement before babaclick.com was in hand as a direct reference. Babaclick's own computed styles show it runs on **Geist** (confirmed via devtools: `font-family: Geist, Arial, sans-serif`, hero H1 at weight 600). Given the founder explicitly pointed at that site as the target, and given the Zoveto repo already has two dead, unreferenced files (`app/fonts/GeistVF.woff`, `GeistMonoVF.woff`) sitting in it right now — this is the decisive pick. Do **not** run `PROMPT_FONT_SWAP_PLEX.md` — use this instead:
1. Delete the old static `.woff` files regardless (they're an unlicensed/unverified stray copy, not something to resurrect) — grep for `Geist` first to reconfirm zero references, same as the audit did.
2. Load Geist fresh via `next/font/google`'s `Geist` and `Geist_Mono` exports in `app/layout.tsx`, replacing the `Inter` import, following the exact same structural pattern `PROMPT_FONT_SWAP_PLEX.md` Section 2 lays out for Plex (two loaders, two CSS variables — rename `--font-inter` to `--font-sans` and add `--font-mono-geist`, `weight: ["400","500","600","700"]`, `display: "swap"`, `adjustFontFallback: true`, a real fallback stack).
3. Update `tailwind.config.ts`'s `fontFamily.sans`/`.display` to `var(--font-sans)`, and add a `fontFamily.mono`-equivalent key pointing to `var(--font-mono-geist)`.
4. Update `app/globals.css`'s font-family declaration the same way.
5. Optional, recommended same-commit follow-up (same reasoning as the Plex prompt's Section 4): migrate the 23 existing plain `font-mono` usages (tabular/numeric UI — pricing figures, order numbers, ledger displays) onto the new Geist Mono utility class instead, so numbers are deliberately typeset rather than falling back to the browser's default monospace.
6. Follow `PROMPT_FONT_SWAP_PLEX.md` Section 5's verification steps exactly (visual check across pricing/security/faq/a compare page/a module page, layout-shift check, production build check) — same rigor, just for Geist instead of Plex.

**Stage 3 — Container/grid width**: reconcile `PricingSection.tsx`'s `max-w-[min(100%,80rem)]` (1280px) against the sitewide `max-w-content` (1152px) convention — standardize on `max-w-content`. Same stage, same detail as `PROMPT_CURSOR_IMPLEMENTATION.md` Stage 3. **While in this stage, also fix the two smaller container-naming inconsistencies found in this pass**: `/signup`'s page wrapper uses `max-w-6xl` and `/blog`'s index page uses `max-w-[min(100%,72rem)]` — both are numerically identical to `max-w-content` (1152px) already, so these are same-value, different-class-name inconsistencies, not visual bugs. Change both to the named `max-w-content` token for consistency's sake while you're already touching container widths sitewide.

**Stage 4 — Spacing scale**: delete the fully-dead legacy `--spacing-xs` through `--spacing-4xl` block in `globals.css` (zero consumers anywhere, re-confirm via grep), and formalize the `4/8/12/16/24/32/40/48/64/80/96/120` scale in `tailwind.config.ts`, additive to the existing `section`/`section-mobile`/`section-tight` tokens. **Babaclick amendment**: once the scale exists, use its larger values (`80`/`96`/`120`) more often between major homepage sections than the current `40-88px` mostly in use — Babaclick's biggest structural advantage over Zoveto is generous, deliberate whitespace between ideas, not tighter component-level spacing. Do not force every existing arbitrary spacing value onto the new scale in this stage — that's still Stage 6+ work, done incrementally as pages are touched for other reasons.

**Stage 5 — Shared card/icon primitive**: build the one `IconCard`/list-row component that the icon-in-rounded-box shape (repeated in 50+ files) should have been using all along. **Babaclick amendment, two decisions for whoever builds this component**: (a) give it a deliberately considered border-radius — not necessarily Babaclick's exact oversized asymmetric values, but something more intentional than the default `rounded-lg` the radius-bug fix in Stage 1 will produce; (b) design it so call sites are encouraged to show fewer, larger instances per screen rather than defaulting to dense small grids — the actual "looks templated" feeling on Zoveto comes as much from card density and collision as from the shape itself. Build the component in isolation this stage; do not migrate the 50+ call sites yet (that happens incrementally in later stages/pages, per the original document).

**Stage 6 — NEW — hero headline hierarchy.** Babaclick's hero H1 renders at 80px/weight 600/-4.8px tracking; Zoveto's live hero H1 renders at only 44px, and is further diluted by 4 separate pill badges ("Execution clarity," "Unified business system," "Qualified onboarding," "Compliance-ready"), an all-caps "MASTER BRAND" eyebrow, and a large separate wordmark treatment, all stacked above the one sentence that actually says what the product does. This is a text-sizing-and-hierarchy change to the hero's copy layer only — **not** a change to the hero's animation, layout, dashboard visual, or module sequence (those stay locked per Ground Rule 2). Before touching anything: identify exactly which hero text elements are content (safe to resize/reduce) versus intentional locked brand furniture (the pill badges and "MASTER BRAND" label may be a deliberate decision from an earlier pass, not an oversight) — if it's unclear which is which, stop and ask rather than guessing. Once clear, increase the actual headline sentence's scale substantially (a `64-80px` desktop range is a reasonable target, adjusted to what the hero's layout can actually support) and reduce how much competes with it above the fold.

---

## 2. PART 2 — Homepage finish

Once Part 1 is done: finish the already-scoped homepage de-boxing work (`PROMPT_HOMEPAGE_DESIGN_SYSTEM.md` Prompts 2-9 — spacing rollout + de-boxing Problem/Comparison/HeardThisBefore/ZeroClientTrust/Pricing/Features), now built using the Stage 5 shared primitive instead of one-off markup, exactly as `PROMPT_CURSOR_IMPLEMENTATION.md` Stage 6 describes.

The scroll-driven zoom effect on the "See it running" product video (`PROMPT_PRODUCT_DEMO_SCROLL_ZOOM.md`) is an independent, optional enhancement — build it whenever, it doesn't block or get blocked by anything else in this document.

---

## 3. PART 3 — Pages already covered by the original full-site audit

These already have specific findings and priorities in `AUDIT_ZOVETO_WEBSITE.md` Part 11 and `PROMPT_CURSOR_IMPLEMENTATION.md` Stages 7-9 — follow those documents for: Pricing page container/card fixes, the 3 mad-libbed Compare pages (Vyapar/Freshsales/GoHighLevel) needing real rewrites, the 3 thin Module pages (Procurement/Export/MRO) needing real hero copy and real screenshots, the 4 orphaned legal pages needing footer links, CTA-label consolidation, and the real Playwright responsive QA pass. Nothing new to add here from the Babaclick comparison beyond what Part 1 already amended sitewide (container naming, card primitive, whitespace).

---

## 4. PART 4 — Pages newly audited for this document (previously untouched by any prior pass)

Twelve pages were read for the first time to make this an actual A-to-Z plan rather than a homepage-only one. Findings and fixes, ranked most to least urgent:

**`/signup` — highest priority; this is the site's actual conversion page.**
- The hero H1 here is the weakest on the entire site: a bespoke `text-3xl sm:text-4xl` (30-36px) versus 44-77px everywhere else audited. Increase it to match the site's `display-1`/`display-2` scale used elsewhere — there's no reason the highest-intent page has the smallest heading.
- The actual form `<input>`/`<select>` fields are styled with only `rounded-lg border border-border bg-card px-3.5 py-3 text-sm` — no focus ring, no minimum touch-target height, no placeholder styling — while the shared `DemoBookingForm` component used on `/contact` already has the correct treatment (`min-h-[48px]`, `rounded-xl`, `focus:ring-2 focus:ring-blue/15`, styled success/error states). Bring `/signup`'s form inputs up to that same standard — either reuse the shared input styling `DemoBookingForm` already has, or apply the same classes directly, whichever fits how this form is built.
- Container already uses `max-w-6xl` — fixed under Stage 3 above.

**`/system` — structural bug, not a style opinion.**
- Every one of the 4 scroll-story panels renders its own `<h1>` (`SystemScrollStory.tsx`) — four H1 elements on one page. Change to one H1 (the first panel) and H2 for the remaining three. This is a real heading-hierarchy/accessibility/SEO defect, independent of anything else in this document — fix it regardless of what else gets prioritized.

**`/careers` — content gap, not a code fix.**
- The page is a single eyebrow + H1 + one paragraph + one CTA — no listed roles, culture content, or process information. The typography and spacing are already fine (this isn't a styling problem). Flag back to the founder that this page needs actual content before it's doing its job — don't invent placeholder roles/culture copy yourselves.

**`/implementation` — component-consistency fix.**
- Its FAQ section is a bespoke `<dl>` list instead of the shared `FaqAccordion` component already used on `/owner-dependency-score`, `/reorder-point-calculator`, and elsewhere. Consolidate onto the shared component (this is the same category of fix as the 3-duplicate-FAQ-accordion finding already in `AUDIT_ZOVETO_WEBSITE.md` Part 9 — this is a 4th instance of the same underlying issue, not a new category).

**`/about` — minor duplication.**
- Hand-rolls its own team-member cards instead of reusing the shared `TeamCard`/`TeamSection` components that already exist and are used correctly on `/team`. Same underlying data (`lib/team.ts`), different bespoke markup. Consolidate onto the shared component so the two pages can't visually drift apart over time.

**`/team` — undersized for a standalone page.**
- Currently reuses the shared `TeamSection` component correctly (good), but that component's heading only reaches `md:text-5xl` (48px) even when `primaryPage` is set — it reads more like an embedded homepage section than a standalone page. Consider a slightly larger heading treatment specifically for the standalone-page context, without changing how the same component renders when embedded elsewhere.

**`/directory` — thin copy, not a code fix.**
- Structurally fine (clean hierarchy, no card-collision risk, correct container), but the copy itself is the most generic/templated of everything audited in this pass ("Browse all Zoveto modules, supported industries, and system comparisons"). Lower priority than the above — flag for a copy pass if/when time allows, not urgent.

**`/product` — reinforces, doesn't add to, the sitewide card-density finding.**
- Uses the icon-in-rounded-box pattern twice (architecture-layer cards, industry-icon grid). No collision, but this is more instances of the same pattern Stage 5's shared primitive is meant to fix — migrate this page onto that primitive when doing the broader sitewide migration, nothing unique to fix here first.

**`/company-facts`, `/owner-dependency-score`, `/reorder-point-calculator`, `/contact` — already in good shape.**
- All four have confident headings, no card-collision risk, good component reuse (shared `FaqAccordion`, `Button`, `DemoBookingForm`), and specific, non-generic copy. No action needed beyond whatever sitewide changes Part 1 brings to them automatically (font, spacing scale, container naming).

---

## 5. PART 5 — SEO landing pages and blog

**The 12 SEO landing pages** (`/ai-business-automation-india`, `/crm-software-india`, `/erp-software-distributors-india`, `/erp-software-small-business-india`, `/gst-billing-software-india`, `/hr-payroll-software-india`, `/inventory-management-software-india`, `/warehouse-management-system-india`, `/tally-alternative-india`, `/company-operating-system-india`, `/migrate-from-excel`, `/migrate-from-tally`, `/migrate-from-zoho`) all render through one shared component, `components/seo/SeoLandingLayout.tsx`, fed by data in `lib/seo-landings.ts`. That shared template was checked and is in good shape: correct `max-w-content` container, appropriately modest heading for a reference/informational page type, no icon-box cards, no collision risk. No template-level fix needed — only the sitewide sweeps from Part 1 (font, spacing scale) touch these pages, automatically, through the shared component.

**`/blog`** (index page): structurally sound; the only finding is the `max-w-[min(100%,72rem)]` container-naming inconsistency already folded into Stage 3 above.

**Individual blog posts** (6 posts under `app/(marketing)/blog/_posts`): **not inspected in this pass or any prior pass** — be honest about this rather than assuming they're fine. If/when this becomes a priority, audit them with the same lens as everything else in this document (heading hierarchy, card density, container consistency, copy quality) before making changes.

---

## 6. PART 6 — Final "would this pass at Babaclick's level" checklist

Run this checklist against every page touched by this document before considering the work done, not just the homepage:

1. **One confident H1 per page**, sized in proportion to the page's importance (a conversion page like `/signup` should not have a smaller heading than a reference page like `/company-facts`), with nothing more than a single small eyebrow label competing with it.
2. **Zero visual collisions** — no element overlapping or cutting off another at any of the standard widths (1024/1280/1440/1920 desktop, plus the mobile breakpoints already scoped in the responsive-QA stage).
3. **One named container convention** (`max-w-content`) used everywhere, no numerically-identical-but-differently-named alternatives left in the codebase.
4. **Generous, deliberate whitespace** between major sections — err toward the larger end of the new spacing scale rather than the smaller end, the way Babaclick does.
5. **Shared components reused, not duplicated** — any FAQ, card grid, or form should point at one canonical implementation, not a bespoke per-page reimplementation of the same idea.
6. **The icon-box card pattern, where it still exists, is deliberate** — considered radius, reasonable count per screen, never colliding with anything else.
7. **One typeface, applied consistently** — Geist Sans/Mono everywhere, no lingering Inter references, no font-loading console warnings.

---

## 7. Suggested master execution order

1. Part 1, Stage 1 + 1b (bugs + overlap) — most urgent, smallest risk.
2. Part 1, Stage 2 (font swap to Geist).
3. Part 1, Stage 3 (container width + naming).
4. Part 1, Stage 4 (spacing scale).
5. Part 1, Stage 5 (shared card primitive, built not yet migrated).
6. Part 1, Stage 6 (hero headline hierarchy) — confirm scope with the founder first.
7. Part 2 (finish homepage de-boxing using the new primitive).
8. Part 4's highest-priority items (`/signup` form + heading, `/system`'s multi-H1 bug) — these are worth doing before the lower-priority Part 3 items even though Part 3 was scoped earlier, since a broken signup form and a duplicate-H1 SEO bug outrank cosmetic Compare-page rewrites.
9. Part 3 (Compare rewrites, Module rebuilds, legal-footer links, CTA consolidation, responsive QA) and the rest of Part 4 (`/careers` content flag, `/implementation` FAQ consolidation, `/about`/`/team` component fixes).
10. Part 5 (spot-check the SEO/blog pages after the sitewide sweeps land, confirm nothing regressed).
11. Part 6 checklist, run against the whole site as a final pass.

Do not skip ahead. Commit and verify after each numbered stage.
