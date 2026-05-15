# Zoveto — Mobile Declutter Prompt

# Strategy: HIDE on mobile. ZERO changes to desktop. ZERO redesigning.

## Core Rule

Every change in this prompt follows one of two patterns only:

- Add `hidden sm:block` or `hidden lg:block` → hides the element on mobile, shows on desktop  
- Add `block sm:hidden` or `block lg:hidden` → shows on mobile only (for simple replacements)

**DO NOT change padding, margin, font-size, colors, grid layout, or any other property.** **Desktop (≥1024px) must look 100% identical after these changes.**

---

## Why the phone looks messy (Root cause analysis)

After a full code audit, here is exactly what is showing on mobile that should not be:

1. **Hero**: Three huge decorative gradient blobs render and create visual noise behind text  
2. **Hero**: The "Operating Pulse" dashboard preview card (showing orders/stock risk/dispatch/receivables metrics) is a desktop showpiece that crowds mobile below the CTA buttons  
3. **Hero**: Trust badge pills (4 across) force-wrap into an awkward 2-line mess  
4. **HowItWorks**: Section eyebrow badge label above the heading adds clutter  
5. **SystemModulesStrip**: Shows a full complex tile grid — on mobile each tile is cramped with icon \+ badge \+ title \+ body \+ stats all squeezed in  
6. **OSNetwork**: The 3D network canvas still renders on mobile (at low DPR) — it's a complex animation in a tiny box that looks broken, not premium  
7. **ComparisonSection**: Comparison header spans full width with 2 column headers, looks unbalanced  
8. **ProblemSection**: Background gradient layers add visual noise (though the complex SVG animation is already hidden correctly)  
9. **Footer**: 4 sections of links, newsletter, legal, wordmark — too much at once with narrow columns  
10. **Various sections**: Decorative absolute-positioned blur circles and gradient overlays render on mobile adding noise

---

## FILE 1 — `components/sections/Hero.tsx`

### Change 1: Hide the three decorative gradient background blobs on mobile

These are purely decorative and make the background look cluttered on a small screen.

Find the three blur div elements inside the Hero section (they look like this):

\<div className="absolute ... blur-\[100px\] ... opacity-..." /\>

\<div className="absolute ... blur-\[90px\] ... opacity-..." /\>

\<div className="absolute ... blur-\[80px\] ... opacity-..." /\>

Add `hidden sm:block` to each one:

\<div className="hidden sm:block absolute ... blur-\[100px\] ..." /\>

\<div className="hidden sm:block absolute ... blur-\[90px\] ..." /\>

\<div className="hidden sm:block absolute ... blur-\[80px\] ..." /\>

### Change 2: Hide the dashboard preview card ("Operating Pulse") on mobile

This is the card section below the CTA buttons showing "42 open orders", "7 SKUs", "DISPATCH", "RECEIVABLES" metrics. It is a desktop showpiece and the \#1 source of clutter on mobile.

Find the card/div that contains the Operating Pulse dashboard preview. It will be below the CTA button group. Add `hidden sm:block` to its outermost wrapper:

// Find: the dashboard preview card wrapper — likely: \<div className="mt-12 ..."\> or \<div className="relative mt-10 ..."\>

// Change to:

\<div className="hidden sm:block mt-12 ..."\>

### Change 3: Hide the trust badge pills row on mobile entirely

The 4 badge pills (Execution Clarity, Unified Business System, Qualified Onboarding, Compliance-Ready) are a desktop feature. On mobile they wrap awkwardly.

Find the badges container — it wraps multiple `<span>` or `<div>` badge elements with border and rounded-full styling:

// Find: \<div className="flex flex-wrap ... gap-2 ..."\> containing badge pills

// Change to: \<div className="hidden sm:flex flex-wrap ... gap-2 ..."\>

### Change 4: Hide decorative label above the main headline on mobile

The small eyebrow text ("EXECUTION CLARITY" or similar label) above the wordmark adds clutter on mobile. The headline alone is enough.

// Find: the label/eyebrow element above the main ZOVETO wordmark — likely has text-\[10px\] or text-\[11px\] uppercase tracking-wide

// Add: hidden sm:block to it

\<p className="hidden sm:block ... text-\[10px\] uppercase tracking-widest ..."\>

---

## FILE 2 — `components/sections/OSNetworkSection.tsx`

### Change 5: Hide the entire OSNetwork section on mobile

The 3D canvas network visualization in a 320px-tall box on mobile looks like a broken animation, not a premium product showcase. The section still renders and adds page weight with zero benefit on phones.

Open `components/sections/OSNetworkSection.tsx` and find the root section element (the outermost `<section>` or `<div>` tag):

// Find: \<section className="bg-background border-y border-border py-section-mobile md:py-section ..."\>

// Change to: \<section className="hidden md:block bg-background border-y border-border py-section-mobile md:py-section ..."\>

This hides the entire section on mobile and tablet, shows it only on ≥768px screens where the canvas actually looks good.

---

## FILE 3 — `app/page.tsx`

### Change 6: Hide SystemModulesStripSection on mobile, show a minimal version instead

The module strip section has a complex grid with icon \+ badge \+ category pill \+ title \+ body \+ 3 metrics per tile — crammed into 375px it looks like a wall of tiny text.

**Step A:** Find where `<SystemModulesStripSection />` is rendered in page.tsx. Wrap it:

// Change from:

\<SystemModulesStripSection /\>

// Change to:

\<div className="hidden sm:block"\>

  \<SystemModulesStripSection /\>

\</div\>

{/\* Mobile replacement — simple list of module names \*/}

\<div className="block sm:hidden py-14 px-4"\>

  \<p className="text-\[11px\] uppercase tracking-\[0.2em\] text-muted text-center mb-3"\>MODULES\</p\>

  \<h2 className="text-\[1.65rem\] font-bold text-center leading-tight mb-8"\>

    One system.\<br /\>Every function.

  \</h2\>

  \<div className="grid grid-cols-2 gap-3"\>

    {\[

      { name: "Operations", sub: "WMS · Inventory · Dispatch" },

      { name: "Purchase", sub: "Procurement · Suppliers" },

      { name: "Sales", sub: "Orders · CRM · Invoicing" },

      { name: "Finance", sub: "Accounts · GST · P\&L" },

      { name: "HR & Payroll", sub: "People · Attendance · Pay" },

      { name: "Intelligence", sub: "Reports · Alerts · BI" },

    \].map((m) \=\> (

      \<div key={m.name} className="rounded-xl border border-border bg-white p-4"\>

        \<p className="text-\[14px\] font-semibold text-foreground"\>{m.name}\</p\>

        \<p className="text-\[11px\] text-muted mt-0.5 leading-snug"\>{m.sub}\</p\>

      \</div\>

    ))}

  \</div\>

\</div\>

### Change 7: Verify HowItWorksLandingSection is not overloaded on mobile

In page.tsx, find `<HowItWorksLandingSection />`. No change needed to the component itself — but verify it is the correct mobile version (`HowItWorksLandingSection` not `HowItWorksSection` which may be desktop-only).

---

## FILE 4 — `components/sections/HowItWorksLandingSection.tsx`

### Change 8: Hide section eyebrow badge on mobile

The badge above the "One operating record" heading (e.g., "HOW IT WORKS" chip) adds visual overhead without adding information. Hide it on mobile — the heading is self-explanatory.

// Find: the eyebrow badge/chip/label above the main heading — likely a \<span\> or \<Badge\> with "HOW IT WORKS" or similar text

// Add: className="hidden sm:block ..." to it

### Change 9: On mobile, show only 2 cards instead of all 3

The third card ("Purchase" or similar) is less critical for first impression. On mobile, hide the last card to reduce visual weight.

Find the grid containing the 3 article cards. Add `hidden sm:block` to the **last** article/card only:

// The grid has 3 \<article\> or \<div\> children

// Find the third one and add: className="hidden sm:block float-card reveal-item ..."

// (The first two remain visible on mobile)

---

## FILE 5 — `components/sections/ComparisonSection.tsx`

### Change 10: Hide the comparison section entirely on mobile

The comparison (Zoveto vs Tally, Excel, etc.) is a convincing desktop section but at 375px even in single-column mode, showing two product names side-by-side with feature rows is confusing. The decision to buy is not made on mobile at this stage.

Find the root element of ComparisonSection and add `hidden md:block`:

// Find: \<section className="relative overflow-hidden ..."\>

// Change to: \<section className="hidden md:block relative overflow-hidden ..."\>

This hides it on mobile and small tablets, shows on ≥768px.

---

## FILE 6 — `components/sections/ProblemSection.tsx`

### Change 11: Hide decorative background gradient layers on mobile

The section already correctly hides its complex SVG flow diagram on mobile (using `hidden lg:...`). But the decorative background gradient divs still render and add noise.

Find absolute-positioned gradient div(s) near the top of ProblemSection:

// Find: \<div className="absolute inset-0 bg-gradient-to-b ..."\> or similar decorative gradients

// Add: hidden sm:block to any purely decorative absolute divs

### Change 12: Hide the mobile chip scroll row on very small screens

The horizontal scroll chip row (`lg:hidden` section with overflow-x-auto chips for "Inbox", "Sheets", "Tools" etc.) is still complex on mobile. On 375px these tiny chips don't add much value.

Find the `flex gap-2 overflow-x-auto pb-1 lg:hidden` container:

// Change: className="flex gap-2 overflow-x-auto pb-1 lg:hidden"

// To:     className="hidden sm:flex gap-2 overflow-x-auto pb-1 lg:hidden"

---

## FILE 7 — `components/layout/Footer.tsx`

### Change 13: Hide the newsletter signup section on mobile

The footer already has logo, links, legal, and wordmark. The newsletter input adds another interactive element that clutters mobile. Email capture happens better elsewhere.

Find the newsletter section inside the footer — it will contain an `<input>` with email placeholder and a submit button:

// Find the container wrapping the newsletter heading \+ input \+ button

// Add: className="hidden sm:block ..." to that container

### Change 14: On mobile, collapse to 1-column footer links

The 2-column footer link grid (4 columns on desktop, 2 on mobile) still shows 8+ links in 2 narrow columns. On mobile, switch to a simple 1-column list.

Find:

className="grid min-w-0 grid-cols-2 gap-x-6 gap-y-8 sm:gap-x-10 sm:gap-y-10 md:grid-cols-4 ..."

Change to:

className="grid min-w-0 grid-cols-1 gap-y-6 xs:grid-cols-2 xs:gap-x-6 xs:gap-y-8 sm:gap-x-10 sm:gap-y-10 md:grid-cols-4 ..."

### Change 15: Hide footer social icons row on mobile (if present)

If there is a row of social media icon buttons in the footer, hide on mobile:

// Find: \<div className="flex gap-3 ..."\> containing social icon links

// Add: hidden sm:flex to it

---

## FILE 8 — `components/layout/Navbar.tsx`

### Change 16: The mobile menu already works correctly — ONE fix only

The mobile menu is already well-implemented (`lg:hidden` overlay, hamburger etc.). Only one fix:

The "Book a 20-min demo" button visible on tablet (640px–1023px) is hidden on mobile (`hidden sm:block lg:hidden`). This is correct — leave it.

**One actual change:** If there is a secondary/ghost "See setup path" button inside the mobile menu overlay, hide it to reduce clutter:

// Inside the mobile menu panel (the lg:hidden overlay)

// Find the secondary/ghost CTA button ("See setup path" or similar)

// Add: hidden xs:block to it — show only on slightly larger phones

---

## FILE 9 — `app/globals.css`

### Change 17: Add one rule to prevent ALL decorative absolute elements from overflowing

Add this at the bottom of globals.css:

/\* Mobile: clip any absolute decorative overflow \*/

@media (max-width: 639px) {

  section {

    overflow-x: clip;

  }

}

This single rule prevents any decorative blob/gradient/absolute element from causing horizontal scroll on mobile — without touching any desktop styling.

---

## COMPLETE SUMMARY — Every change in this prompt

| \# | File | What you're hiding on mobile | Class change |
| :---- | :---- | :---- | :---- |
| 1 | Hero.tsx | 3 decorative gradient blobs | Add `hidden sm:block` |
| 2 | Hero.tsx | Operating Pulse dashboard card | Add `hidden sm:block` |
| 3 | Hero.tsx | Trust badge pills row | Add `hidden sm:flex` (change `flex` → `hidden sm:flex`) |
| 4 | Hero.tsx | Eyebrow label above wordmark | Add `hidden sm:block` |
| 5 | OSNetworkSection.tsx | Entire 3D network canvas section | Add `hidden md:block` to root `<section>` |
| 6 | page.tsx | SystemModulesStrip (complex) | Wrap in `hidden sm:block`, add simple 2-col mobile grid |
| 7 | page.tsx | Verify HowItWorks is correct component | No change if correct |
| 8 | HowItWorksLandingSection.tsx | Eyebrow badge above heading | Add `hidden sm:block` |
| 9 | HowItWorksLandingSection.tsx | Third module card | Add `hidden sm:block` to 3rd card only |
| 10 | ComparisonSection.tsx | Entire comparison section | Add `hidden md:block` to root `<section>` |
| 11 | ProblemSection.tsx | Decorative background gradients | Add `hidden sm:block` |
| 12 | ProblemSection.tsx | Horizontal chip scroll row | Change `flex` → `hidden sm:flex` |
| 13 | Footer.tsx | Newsletter signup block | Add `hidden sm:block` |
| 14 | Footer.tsx | 2-col link grid → 1-col on mobile | Change `grid-cols-2` → `grid-cols-1 xs:grid-cols-2` |
| 15 | Footer.tsx | Social icons row | Add `hidden sm:flex` |
| 16 | Navbar.tsx | Secondary CTA in mobile menu | Add `hidden xs:block` |
| 17 | globals.css | Overflow clip for all sections | Add media query rule |

---

## WHAT THE PHONE WILL LOOK LIKE AFTER THESE CHANGES

**Hero (375px):** → Clean background (no gradient noise) · Brand wordmark large and centered · One primary CTA button (full width) · Nothing below it to distract

**How It Works:** → 2 cards stacked vertically · Icon \+ title \+ description \+ stats · Clean, enough whitespace between them

**Modules:** → Simple 2×3 grid of module name cards · Name \+ sub-label · Clean and scannable in 5 seconds

**Problem Section:** → Headline \+ copy \+ expandable accordion cards · No chip row clutter · Focused

**Pricing:** → 1 card per row stacked vertically · No changes needed, already clean

**FAQ:** → Accordions stack cleanly · No changes needed

**CTA Section:** → Big headline \+ 2 full-width buttons · Clean, focused

**Footer:** → Logo \+ 1-column link list \+ copyright · No newsletter, no social clutter

---

## DESKTOP IMPACT: ZERO

Every change uses either:

- `hidden sm:block` — element is hidden only below 640px  
- `hidden md:block` — element is hidden only below 768px  
- `xs:grid-cols-2` — only applies from 375px, overrides nothing on desktop

Desktop (1024px+) sees 100% the same layout as today. Not a single pixel changes on desktop.

---

## IMPLEMENTATION ORDER

1. `app/globals.css` — Change 17 (1 min, global safety net)  
2. `components/sections/Hero.tsx` — Changes 1–4 (15 min, biggest impact)  
3. `components/sections/OSNetworkSection.tsx` — Change 5 (2 min)  
4. `components/sections/ComparisonSection.tsx` — Change 10 (2 min)  
5. `app/page.tsx` — Change 6 (20 min, needs mobile replacement JSX)  
6. `components/sections/HowItWorksLandingSection.tsx` — Changes 8–9 (5 min)  
7. `components/sections/ProblemSection.tsx` — Changes 11–12 (5 min)  
8. `components/layout/Footer.tsx` — Changes 13–15 (10 min)  
9. `components/layout/Navbar.tsx` — Change 16 (2 min)

**Total: \~60 minutes. Desktop: unchanged. Mobile: clean.**  
