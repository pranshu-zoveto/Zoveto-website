# Zoveto — Mobile UI Deep Fix Prompt
# Goal: Make every section feel like a billion-dollar product on phones

## Stack: Next.js 16 · Tailwind CSS 3.4 · Framer Motion · GSAP · CSS Custom Properties
## Target viewports: 375px (iPhone SE/8), 390px (iPhone 14), 430px (iPhone 14 Plus), 360px (Android)
## Non-negotiables: Do NOT change fonts, font-weights, color palette, or any desktop layout (1024px+)

---

## WHY IT LOOKS BAD RIGHT NOW (Root causes)

1. **Hero badge pills are 4-across in a single flex row** — they overflow at 375px, wrap clumsily, look like a bug
2. **Label/eyebrow text at 10px** — unreadable on phone, destroys the premium feel
3. **Section vertical rhythm is inconsistent** — some sections feel cramped, others feel too sparse
4. **Cards use `p-8` (32px) padding everywhere** — on 375px this eats content space
5. **Footer 2-column grid with `gap-x-6`** leaves ~164px per column — text wraps every 2 words
6. **No visual hierarchy signal between sections** — every section looks the same weight
7. **CTA headings too small on mobile** — main headline loses punch at the minimum clamp value
8. **3D canvas always renders on mobile** — causes jank and slow load
9. **Comparison table is a multi-column grid** — horizontal overflow or crushed columns on 375px
10. **Module strip tabs don't scroll** — pill tabs overflow the screen

---

## IMPLEMENTATION RULES (Follow strictly)
- All changes are mobile-first: add `sm:`, `md:`, `lg:` prefixes to restore desktop
- Preserve ALL existing desktop classes — only add mobile overrides
- Every touch target must be ≥ 44px height
- Minimum readable text: 13px (0.8125rem). Captions: 12px minimum
- Use 8px grid: spacing values must be multiples of 2 (Tailwind: 2=8px, 3=12px, 4=16px, 5=20px, 6=24px, 8=32px)
- Add `overflow-x-clip` to any section that bleeds full-width

---

## FILE 1 — `app/globals.css`

Add this entire block at the very END of the file, after all existing styles:

```css
/* ============================================================
   MOBILE UI DEEP FIX — add at bottom of globals.css
   ============================================================ */

/* 1. Global overflow guard — belt + suspenders */
html, body {
  overflow-x: clip !important;
  max-width: 100vw;
}
*, *::before, *::after {
  min-width: 0;  /* Fixes flexbox/grid children overflowing parent */
}

/* 2. Prevent iOS Safari input zoom (must be 16px+) */
@media (max-width: 768px) {
  input, select, textarea {
    font-size: 16px !important;
  }
}

/* 3. Mobile section spacing — tighter rhythm */
@media (max-width: 639px) {
  :root {
    --spacing-section-mobile: 3rem;      /* was 3.5rem — tighten slightly */
    --text-display-xl: 2.6rem;           /* hero headline cap for tiny screens */
    --text-display-lg: 2.2rem;
    --text-display-md: 1.9rem;
    --text-display-sm: 1.55rem;
  }
}

/* 4. Utility: horizontally scrollable strip with hidden scrollbar */
.scroll-x-snap {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
  gap: 0.5rem;
  padding-bottom: 4px;        /* prevents scroll shadow clipping */
}
.scroll-x-snap::-webkit-scrollbar { display: none; }
.scroll-x-snap > * {
  scroll-snap-align: start;
  flex-shrink: 0;
}

/* 5. Mobile card — consistent surface treatment */
@media (max-width: 639px) {
  .float-card {
    border-radius: 16px;
    padding: 1.25rem;          /* 20px — was 32px on mobile */
  }
}

/* 6. Section dividers — subtle visual separation between sections on mobile */
@media (max-width: 639px) {
  section + section {
    border-top: 1px solid var(--border);
  }
}

/* 7. Fix any stray image overflow */
img, video, canvas, svg {
  max-width: 100%;
  height: auto;
}
```

---

## FILE 2 — `components/layout/Navbar.tsx`

### Issue A: Brand lockup too wide on tiny screens
Find:
```tsx
className="inline-flex max-w-[10rem] items-center gap-2.5 overflow-hidden text-foreground whitespace-nowrap xs:max-w-[11rem] sm:mr-4 sm:max-w-none"
```
Replace with:
```tsx
className="inline-flex max-w-[8.5rem] items-center gap-2 overflow-hidden text-foreground whitespace-nowrap xs:max-w-[10rem] sm:mr-4 sm:max-w-none sm:gap-2.5"
```

### Issue B: Hamburger button negative margin causes cramped tap area
Find the mobile menu button — look for `-mr-1` or `-mr-2` on the button element.
Remove any negative right margin on mobile:
```tsx
// Change: className="... -mr-1 sm:-mr-2 ..."
// To:     className="... mr-0 sm:-mr-2 ..."
```

### Issue C: Mobile menu padding — add proper inset for notched iPhones
Find the mobile menu overlay container (the `fixed inset-0` div):
```tsx
// Find: className="... p-5 ..."  or  pl-5 pr-5
// Replace padding with:
className="... px-5 pt-[max(1.25rem,env(safe-area-inset-top,0px))] pb-[max(5rem,env(safe-area-inset-bottom,0px))]"
```

### Issue D: Mobile menu links — increase font size and spacing for readability
In the mobile menu, find nav link items. Change:
```tsx
// Find: text-sm or text-base on mobile nav links
// Replace: text-[1.05rem] font-medium py-3 (gives 44px min tap height with border)
```

### Issue E: CTA buttons in mobile menu — full width, proper height
Find the two CTA buttons inside the mobile menu (Book demo + See path):
```tsx
// Ensure both are: w-full min-h-[50px] text-base font-semibold rounded-xl
// And the container is: flex flex-col gap-3 mt-auto pt-6
```

---

## FILE 3 — `components/sections/Hero.tsx`

### Issue A: Badge/pill row — 4 badges in a row overflows at 375px
Find the trust badge container. It likely looks like:
```tsx
className="flex flex-wrap items-center gap-2 ..."
// OR
className="flex items-center gap-2 ..."
```

Replace with a 2×2 grid on mobile:
```tsx
className="grid grid-cols-2 gap-2 xs:flex xs:flex-wrap xs:items-center xs:gap-2 sm:flex sm:gap-3"
```
And each individual badge — reduce mobile padding:
```tsx
// Find: px-[18px] py-2.5 sm:... or px-3 py-2
// Replace: px-3 py-2 text-[11px] sm:px-[18px] sm:py-2.5 sm:text-[11px]
```

### Issue B: Hero eyebrow label — 10px is unreadable
Find the label above the main headline. It will have `text-[10px]` or `text-[11px]`:
```tsx
// Find: className="... text-[10px] ... tracking-[0.28em] ..."
// Replace: className="... text-[12px] tracking-[0.2em] sm:text-[11px] sm:tracking-[0.28em] ..."
```

### Issue C: Hero headline — needs more punch on mobile
Find `BrandHeroWordmark` or the main H1 element. Ensure the container has no max-width restriction that squeezes it:
```tsx
// Find: max-w-[min(92vw,720px)] or similar
// Replace: w-full max-w-[min(96vw,720px)]
```

### Issue D: Hero body text — scale down for mobile
Find the paragraph/subheading below the headline:
```tsx
// Find: text-[18px] or text-lg fixed size
// Replace: text-[15px] leading-relaxed sm:text-[17px] md:text-[18px]
```

### Issue E: CTA button group — vertical stack on mobile
Find the button row (Book Demo + See Setup Path):
```tsx
// Find: className="flex gap-3 ..." or similar
// Replace: className="flex flex-col gap-3 w-full sm:flex-row sm:w-auto"
// Each button: className="w-full min-h-[52px] text-[15px] font-semibold rounded-xl sm:w-auto"
```

### Issue F: 3D canvas — disable on mobile for performance
Wrap the Three.js canvas component:
```tsx
// Add at top of Hero.tsx component:
const [isMobile, setIsMobile] = useState(true)
useEffect(() => {
  setIsMobile(window.innerWidth < 768)
}, [])

// Then wrap the 3D canvas:
{!isMobile && <HeroBrain />}
// On mobile show a static image instead:
{isMobile && (
  <div className="relative w-full aspect-square max-w-[320px] mx-auto opacity-60">
    <Image src="/path-to-hero-static.webp" alt="" fill className="object-contain" />
  </div>
)}
```

### Issue G: "Operating Pulse" / Dashboard card — fix mobile padding
Find the dashboard preview card in the hero (the card showing "42 open orders" etc.):
```tsx
// Ensure the card container: p-4 sm:p-6 rounded-2xl
// Card title: text-sm font-semibold tracking-wide text-muted
// Metric values: text-[1.4rem] sm:text-2xl font-bold
// Grid inside: grid grid-cols-2 gap-3 sm:gap-4
```

---

## FILE 4 — `components/sections/HowItWorksLandingSection.tsx`

### Issue A: Section heading — scale properly on mobile
Find the main section heading (h2):
```tsx
// Find: text-3xl sm:text-4xl md:text-5xl
// Replace: text-[1.65rem] leading-tight sm:text-3xl md:text-5xl
// Add: max-w-[16ch] mx-auto text-center (limits line length for better wrapping)
```

### Issue B: Step cards — reduce padding on mobile
Find each step card element:
```tsx
// Find: p-8 or p-6
// Replace: p-5 sm:p-6 md:p-8
```

### Issue C: Stats row inside cards (40% / 3× / Zero) — better mobile layout
Find the 3-column stats grid inside each card:
```tsx
// Find: grid grid-cols-3 gap-4 or flex gap-6
// Replace: grid grid-cols-3 gap-2 sm:gap-4 mt-3 pt-3 border-t border-border/50
// Each stat value: text-[1.1rem] font-bold text-blue sm:text-lg
// Each stat label: text-[10px] text-muted uppercase tracking-wide sm:text-[11px]
```

### Issue D: Module icon — slightly smaller on mobile
Find the icon container:
```tsx
// Find: w-12 h-12 or w-10 h-10
// Replace: w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl
```

### Issue E: Card description text — comfortable reading size
Find the card body text (paragraph inside card):
```tsx
// Find: text-sm or text-[15px]
// Replace: text-[13.5px] leading-relaxed text-muted sm:text-sm
```

---

## FILE 5 — `components/sections/SystemModulesStripSection.tsx`

### Issue A: Module category tabs — must be horizontally scrollable on mobile
Find the tab row (the pill buttons to switch between module types — Operations, Purchase, Sales, etc.):
```tsx
// Replace the tab container with:
<div className="scroll-x-snap -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center">
  {/* Each tab button: flex-shrink-0 scroll-snap-align-start */}
</div>
```
Each tab button:
```tsx
// Ensure: min-h-[36px] px-4 py-2 text-sm rounded-full flex-shrink-0
// Active: bg-foreground text-background
// Inactive: border border-border text-muted
```

### Issue B: Full-bleed grid — protect against overflow
Find the `left-1/2 w-screen -translate-x-1/2` container:
```tsx
// Add: overflow-x-clip to the className
className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-x-clip"
```

### Issue C: Strip panel internal padding — reduce on mobile
Find the padding inside each module panel (StripPanel or similar):
```tsx
// Find: px-8 pb-10 pt-8 or px-6 pb-8 pt-7
// Replace: px-5 pb-7 pt-5 sm:px-6 sm:pb-8 sm:pt-7 md:px-8 md:pb-10 md:pt-8
```

### Issue D: Panel headline size — increase minimum on mobile
Find the heading clamp inside each panel:
```tsx
// Find: fontSize: "clamp(1.2rem, 1.3vw + 0.9rem, 1.95rem)"
// Replace: fontSize: "clamp(1.35rem, 1.3vw + 0.9rem, 1.95rem)"
```

### Issue E: Allow natural card height on mobile (no forced min-height)
```tsx
// Find: min-h-[270px] sm:min-h-[290px] lg:min-h-[320px]
// Replace: sm:min-h-[270px] lg:min-h-[320px]
// (Remove the mobile min-height — let content breathe naturally)
```

---

## FILE 6 — `components/sections/PricingSection.tsx`

### Issue A: Pricing card grid — 1 column on mobile, max 2 on tablet
Find the pricing card container grid:
```tsx
// Find: grid-cols-3 or grid-cols-2 without mobile fallback
// Replace: grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3
```

### Issue B: Billing toggle — keep centered, prevent overflow
Find the monthly/annual toggle row:
```tsx
// Container: flex items-center justify-center gap-3 flex-wrap text-sm
// Toggle switch: min-w-[44px] (adequate touch target)
```

### Issue C: Plan name + price on each card
Find price display inside cards:
```tsx
// Price number: text-[2rem] font-bold sm:text-[2.5rem] leading-none
// Currency symbol: text-lg align-top mt-1 sm:text-xl
// /month label: text-sm text-muted font-normal
```

### Issue D: Feature list inside pricing cards
```tsx
// Each feature row: flex items-start gap-2.5 py-2 border-b border-border/40
// Feature icon: w-4 h-4 flex-shrink-0 text-blue mt-0.5
// Feature text: text-[13.5px] sm:text-sm text-muted leading-snug
```

### Issue E: Card CTA button — full width, tall enough
```tsx
// className="w-full min-h-[48px] rounded-xl text-[15px] font-semibold mt-6"
```

### Issue F: Card itself — mobile-friendly padding
```tsx
// Card container: p-5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-2xl
```

---

## FILE 7 — `components/sections/ComparisonSection.tsx`

### Issue A: Comparison table MUST scroll horizontally on mobile — this is the #1 critical fix
Wrap the entire comparison table in a scroll container:
```tsx
<div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 pb-2">
  <div className="min-w-[560px]">    {/* Force minimum width for table content */}
    {/* existing table content */}
  </div>
</div>
```

Add a subtle hint that it's scrollable:
```tsx
{/* Above the scroll container on mobile only: */}
<p className="text-xs text-muted text-center mb-2 sm:hidden">
  ← Scroll to compare →
</p>
```

### Issue B: Comparison header labels — readable size
```tsx
// Column headers: text-xs sm:text-sm font-semibold uppercase tracking-wide
// Zoveto column header: text-blue font-bold
```

### Issue C: Feature rows — clear yes/no visual signals
```tsx
// Check icon (Zoveto): text-blue w-5 h-5 (visible, prominent)
// X icon (competitors): text-muted/50 w-4 h-4 (subtle, not alarming)
// Feature name cell: text-[13px] sm:text-sm font-medium
// Row: py-3 px-4 border-b border-border/30
```

---

## FILE 8 — `components/sections/FAQSection.tsx`

### Issue A: FAQ heading — size + max-width on mobile
Find the section heading:
```tsx
// Find: text-3xl sm:text-4xl md:text-5xl or similar
// Replace: text-[1.7rem] leading-tight sm:text-3xl md:text-4xl
// Add: max-w-[20ch] mx-auto text-center
```

### Issue B: Accordion items — increase padding and font size
Find each FAQ accordion row:
```tsx
// Question button: py-4 px-4 sm:px-6 text-[15px] sm:text-base font-medium text-left w-full
// Minimum height: min-h-[56px]  (comfortable tap target for accordion)
// Arrow/chevron icon: w-5 h-5 flex-shrink-0
```

Find the answer/body:
```tsx
// Answer text: text-[14px] sm:text-[15px] leading-relaxed text-muted px-4 sm:px-6 pb-5
```

### Issue C: Section container — tighten padding on mobile
```tsx
// Section: py-section-mobile sm:py-section px-4 sm:px-6
```

---

## FILE 9 — `components/sections/FinalCTASection.tsx`

### Issue A: Headline — bigger punch on mobile (it's the last thing they see)
Find the main CTA heading:
```tsx
// Find: clamp(1.7rem, 5vw, 3.9rem) or text-[clamp(...)]
// Replace: fontSize: "clamp(1.95rem, 5.2vw, 3.9rem)"
// OR className: "text-[clamp(1.95rem,5.2vw,3.9rem)] font-bold leading-[1.1] text-center"
```

### Issue B: Sub-copy under the heading
```tsx
// text-[14px] sm:text-[16px] leading-relaxed text-muted text-center max-w-[30ch] mx-auto
```

### Issue C: CTA buttons — stacked, full-width, prominent
```tsx
// Container: flex flex-col items-stretch gap-3 w-full max-w-xs mx-auto sm:flex-row sm:max-w-none sm:w-auto sm:items-center
// Primary button: w-full min-h-[54px] text-[15px] font-bold rounded-xl sm:w-auto
// Secondary button: w-full min-h-[54px] text-[15px] font-medium rounded-xl border-2 sm:w-auto
```

### Issue D: Trust micro-copy (features list under buttons)
Find the small features/trust list (e.g., "No setup fee · Cancel anytime · 7-day trial"):
```tsx
// Container: flex flex-wrap items-center justify-center gap-x-4 gap-y-1 pt-4
// Each item: text-[12px] text-muted flex items-center gap-1
// Dot separator: hidden on mobile if using gap-x-4 instead
```

### Issue E: Background decorative elements — clip overflow
```tsx
// Section outer: overflow-hidden relative (must clip absolutely-positioned blobs)
```

---

## FILE 10 — `components/sections/OSNetworkSection.tsx`

### Issue A: Canvas height on mobile — reduce to prevent overly tall sections
```tsx
// Find: min-h-[320px] md:min-h-[420px]
// Replace: min-h-[260px] sm:min-h-[300px] md:min-h-[420px]
```

### Issue B: Canvas pixel ratio on mobile — improve performance
Inside the Three.js/canvas setup code, find `renderer.setPixelRatio`:
```tsx
// Find: renderer.setPixelRatio(window.devicePixelRatio)
// Replace:
const isMobile = window.innerWidth < 768
renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2))
```

### Issue C: Section layout — text above canvas on mobile
Find the grid container:
```tsx
// Find: grid lg:grid-cols-2 gap-12 lg:gap-16 items-center
// Replace: grid gap-8 lg:grid-cols-2 lg:gap-16 items-center
```

### Issue D: Section text on mobile — tighten spacing
Find the heading and body text next to the canvas:
```tsx
// Heading: text-[1.7rem] sm:text-2xl md:text-3xl lg:text-4xl leading-tight font-bold
// Body: text-[14px] sm:text-[15px] leading-relaxed text-muted mt-3
// CTA link below text: mt-5 text-blue font-medium text-[14px] sm:text-[15px]
```

---

## FILE 11 — `components/sections/LogoStrip.tsx`

### Issue A: Marquee logo size — reduce on mobile
Find each logo in the marquee:
```tsx
// Logo image: h-5 sm:h-6 md:h-7 w-auto (reduce from h-8 or h-10)
// Logo container: px-5 sm:px-8 (reduce gap between logos on mobile)
```

### Issue B: "Trusted by" heading above logos
```tsx
// text-[11px] uppercase tracking-widest text-muted text-center mb-4 sm:mb-6
```

### Issue C: Trust points grid below logos
Find the 4-column trust points grid:
```tsx
// Find: sm:grid-cols-2 lg:grid-cols-4
// Replace: grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4
// Each point card: p-4 sm:p-5 rounded-xl border border-border/60 bg-surface
// Point title: text-[13px] font-semibold sm:text-sm
// Point body: text-[12px] sm:text-[13px] text-muted leading-snug mt-1
```

---

## FILE 12 — `components/layout/Footer.tsx`

### Issue A: Footer link columns — the biggest visual mess on mobile
Find:
```tsx
className="grid min-w-0 grid-cols-2 gap-x-6 gap-y-8 sm:gap-x-10 sm:gap-y-10 md:grid-cols-4 md:gap-x-12 lg:gap-x-14"
```
Replace with:
```tsx
className="grid min-w-0 grid-cols-2 gap-x-5 gap-y-6 sm:gap-x-10 sm:gap-y-10 md:grid-cols-4 md:gap-x-12 lg:gap-x-14"
```

### Issue B: Footer column headings — clear label style
```tsx
// Each column heading: text-[11px] uppercase tracking-[0.12em] font-semibold text-foreground mb-3 sm:mb-4
```

### Issue C: Footer nav links — comfortable tap targets
```tsx
// Each link: text-[13.5px] sm:text-sm text-muted py-1.5 block hover:text-foreground transition-colors
// (py-1.5 = 6px top+bottom, giving total ~33px — acceptable for footer links)
```

### Issue D: Newsletter section — fix input + button layout
Find the newsletter input area:
```tsx
// Container: flex flex-col gap-2 sm:flex-row sm:gap-0
// Input: w-full min-h-[46px] rounded-xl sm:rounded-r-none text-[15px] px-4
// Button: w-full min-h-[46px] rounded-xl sm:rounded-l-none text-[14px] font-semibold sm:w-auto sm:px-5
```

### Issue E: Footer top section — reduce massive gap on mobile
Find the top footer section container:
```tsx
// Find: gap-12 lg:grid-cols-[...]
// Replace: gap-8 lg:gap-12 lg:grid-cols-[...]
```

### Issue F: Big wordmark at footer bottom — safe minimum size
Find the large `ZOVETO` wordmark:
```tsx
// Find: fontSize: "clamp(2.2rem, 13.5vw, 10.25rem)"
// Replace: fontSize: "clamp(2.5rem, 14vw, 10.25rem)"
// (slightly larger minimum so it feels intentional, not accidentally small)
```

### Issue G: Footer bottom bar — stack on mobile
Find the copyright row:
```tsx
// Find: flex items-center justify-between
// Replace: flex flex-col-reverse gap-3 items-center text-center sm:flex-row sm:justify-between sm:text-left
// Text size: text-[12px] text-muted
```

---

## FILE 13 — `components/sections/ProblemSection.tsx`

### Issue A: Section headline — reduce clamp minimum on mobile (it's currently too large)
Find:
```tsx
// Find: text-[clamp(2.6rem,5.5vw,4.2rem)] or similar
// Replace: text-[clamp(2rem,5.5vw,4.2rem)]
// (Reduces from 41.6px to 32px on 375px — still impactful but doesn't eat vertical space)
```

### Issue B: Pain point cards — mobile-first accordion feel
Find the mobile card stack (the problem cards):
```tsx
// Card outer: rounded-xl border border-border bg-surface overflow-hidden
// Card header: flex items-center gap-3 px-4 py-4 min-h-[56px]
// Card icon: w-8 h-8 rounded-lg flex-shrink-0
// Card title: text-[14px] font-semibold sm:text-[15px]
// Expanded body: px-4 pb-4 text-[13px] leading-relaxed text-muted
```

---

## FILE 14 — `components/sections/ZeroClientTrustSection.tsx` (if exists)

### Check and apply:
```tsx
// Section heading: text-[1.65rem] sm:text-2xl md:text-3xl
// Description: text-[14px] sm:text-[15px] text-muted leading-relaxed
// Any 2-column grid: make grid-cols-1 sm:grid-cols-2
// Any stat/metric cards: p-4 sm:p-5 rounded-xl
```

---

## FILE 15 — `components/sections/HeardThisBeforeSection.tsx` (if exists)

### Check and apply:
```tsx
// Quote cards: p-5 sm:p-6 rounded-xl
// Quote text: text-[14px] sm:text-[15px] leading-relaxed italic
// Attribution: text-[12px] text-muted mt-3 font-medium
// Grid: grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3
```

---

## FILE 16 — `app/page.tsx` (Home page assembly)

### Issue A: Section spacing between stacked sections
Between each major section, ensure consistent gap:
```tsx
// Each section separator: py-section-mobile sm:py-section
// Remove any double-padding caused by section having both top+bottom padding AND a container with margin
```

### Issue B: Mobile-specific section order
Verify these sections are hidden on mobile (they're desktop-only scroll animations):
```tsx
// Dashboard scroll desktop: className="hidden lg:block ..."  ✓ check this exists
// OS network canvas: ensure it has a mobile-friendly fallback (see FILE 10)
```

---

## FILE 17 — `app/pricing/page.tsx`

### Issue A: Page hero on pricing page
```tsx
// H1: text-[1.8rem] sm:text-3xl md:text-4xl leading-tight font-bold text-center
// Sub-copy: text-[14px] sm:text-[15px] text-muted text-center max-w-[32ch] mx-auto mt-3
```

### Issue B: FAQ section on pricing page — same fixes as FILE 8

### Issue C: Enterprise CTA section
```tsx
// Container: p-6 sm:p-8 rounded-2xl
// CTA buttons: flex flex-col gap-3 sm:flex-row
```

---

## FILE 18 — `tailwind.config.ts`

### Add `xs` breakpoint if not already present:
```ts
theme: {
  extend: {
    screens: {
      xs: '375px',   // iPhone SE — ADD IF MISSING
      // sm, md, lg, xl, 2xl already exist
    },
    spacing: {
      'section': '5.5rem',
      'section-mobile': '3rem',    // Reduce from 3.5rem → 3rem
    }
  }
}
```

---

## FILE 19 — `components/ui/Button.tsx`

### Ensure all button variants have proper mobile sizing:
```tsx
// In the base/default variants, ensure:
// min-height: 44px on all sizes
// text-sm (14px) minimum on mobile
// px-5 minimum horizontal padding

// Size variants:
// sm:  min-h-[36px] px-4  text-[13px] rounded-lg
// md:  min-h-[44px] px-5  text-[14px] rounded-xl   ← default
// lg:  min-h-[52px] px-7  text-[15px] rounded-xl
// xl:  min-h-[58px] px-8  text-[16px] rounded-2xl
```

---

## WHAT "BILLION DOLLAR" MOBILE FEELS LIKE — DESIGN PRINCIPLES TO VERIFY

After implementing the code changes above, do a visual pass and check each of these:

1. **Hero**: When you first open the site on phone — headline is the BIGGEST thing on screen, clear and bold. Badge pills sit cleanly in 2 rows. One clear primary action button is full width. Nothing overflows.

2. **Section transitions**: Scrolling through, each section has a clear start and end. You never feel "where am I?". There's visual breathing room between sections (not tight, not wasteful).

3. **Cards**: Every card has consistent rounded corners (16px / rounded-2xl), subtle border, enough internal padding that text never feels suffocated. Statistics and metrics stand out in blue.

4. **Typography hierarchy per section**:
   - Section eyebrow label: 11-12px, muted, uppercase, spaced
   - Section headline: 26-32px, bold, dark, 1.1-1.15 line height
   - Section body: 14-15px, muted, 1.6 line height
   - Card headline: 16-18px, semibold
   - Card body: 13-14px, muted, 1.5 line height

5. **Navigation**: Open the mobile menu — it should feel native, not like a web page. Full screen, large links (min 48px height), two clear CTAs at the bottom.

6. **Footer**: Clean two-column link grid where text DOES NOT wrap. Each link on one line. Large wordmark at bottom feels intentional.

7. **No element wider than the screen**: Zero horizontal scroll at any point on any page.

8. **Buttons**: Every interactive element has a visible pressed state. Primary buttons are blue, secondary are outlined. Consistent border-radius throughout.

---

## TESTING CHECKLIST

Run through this on Chrome DevTools (iPhone 12 Pro preset = 390px):

- [ ] Hero: no horizontal overflow, badges in 2 rows, headline prominent, button full-width
- [ ] Navbar: hamburger visible, tap area ≥ 44px, opens/closes cleanly
- [ ] Mobile menu: full-screen, large links, two CTAs at bottom
- [ ] How It Works: cards stack 1-per-row, stats readable, icon not too large
- [ ] Module strip: tab pills scroll horizontally, panel content not clipped
- [ ] Pricing: 1 card per row, price big and clear, features readable
- [ ] Comparison: horizontal scroll works, "scroll to compare" hint visible
- [ ] FAQ: accordion opens/closes, question text 15px, answer 14px
- [ ] CTA section: headline big and punchy, buttons stacked, trust text readable
- [ ] Footer: link columns not cramped, newsletter stacked, wordmark intentional
- [ ] Zero horizontal scroll on any page at any scroll position
- [ ] All inputs: 16px font (no iOS zoom)
- [ ] No text below 12px anywhere

---

## IMPLEMENTATION ORDER (do in this sequence)

1. `app/globals.css` — adds the safety net (10 min)
2. `tailwind.config.ts` — xs breakpoint (2 min)
3. `components/layout/Navbar.tsx` — mobile menu is the first thing users touch (20 min)
4. `components/sections/Hero.tsx` — first impression (30 min)
5. `components/layout/Footer.tsx` — most visually broken section (20 min)
6. `components/sections/ComparisonSection.tsx` — critical overflow fix (20 min)
7. `components/sections/PricingSection.tsx` — high-intent page (20 min)
8. `components/sections/HowItWorksLandingSection.tsx` (15 min)
9. `components/sections/SystemModulesStripSection.tsx` (15 min)
10. `components/sections/FAQSection.tsx` (10 min)
11. `components/sections/FinalCTASection.tsx` (10 min)
12. `components/sections/OSNetworkSection.tsx` (10 min)
13. `components/sections/LogoStrip.tsx` (10 min)
14. `components/ui/Button.tsx` (10 min)
15. All remaining section files — apply the card/text pattern (20 min)

**Total: ~3.5 hours for a complete, polished mobile experience**
