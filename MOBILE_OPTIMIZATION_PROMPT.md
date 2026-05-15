# Zoveto Website — Full Mobile Optimization Implementation Prompt

## Context & Goal
This is a Next.js 16 (App Router) + Tailwind CSS + Framer Motion + GSAP + Three.js website for Zoveto ERP (zoveto.com). The site looks excellent on desktop but has significant layout, overflow, readability, and spacing issues on mobile viewports (320px–430px). The goal is a **flawless, pixel-perfect mobile experience** that feels like a billion-dollar product — matching the quality of the desktop version.

**Non-negotiable constraints:**
- Typography system (font family, type scale, CSS variables) must remain 100% intact
- All existing animations must be preserved — only disable/simplify on mobile if absolutely necessary for performance
- No visual regressions on desktop (1024px+)
- Zero horizontal overflow / scroll anywhere
- Zero layout breakage at 320px, 375px, 390px, 430px viewport widths
- All touch targets ≥ 44px (iOS HIG standard)
- Safe area insets (notch/home indicator) handled everywhere

---

## File Map (all paths relative to project root)

- `app/globals.css` — Design tokens + base styles
- `app/layout.tsx` — Root layout, viewport config
- `app/page.tsx` — Home page
- `components/layout/Navbar.tsx` — Header + mobile menu
- `components/layout/Footer.tsx` — Footer grid
- `components/sections/Hero.tsx` — Hero section with 3D canvas
- `components/sections/HowItWorksLandingSection.tsx` — How it works
- `components/sections/SystemModulesStripSection.tsx` — Module strip / carousel
- `components/sections/PricingSection.tsx` — Pricing grid
- `components/sections/ComparisonSection.tsx` — Feature comparison table
- `components/sections/FAQSection.tsx` — FAQ accordions
- `components/sections/FinalCTASection.tsx` — Final CTA
- `components/sections/OSNetworkSection.tsx` — System architecture viz
- `components/sections/LogoMarquee.tsx` — Client logo strip
- `components/ui/Button.tsx` — Button component
- `tailwind.config.ts` — Tailwind config

---

## TASK 1 — Navbar (`components/layout/Navbar.tsx`)

### Issues
1. Hamburger button uses `position: "fixed", left: "min(330px, calc(100vw - 60px))"` inline style — on 320px viewport this places the button at 260px which causes overflow
2. Logo `max-w-[13rem]` (208px) is nearly full-width on small phones leaving no room for the menu button
3. Mobile menu overlay has no `safe-area-inset` padding on sides for Face ID notch devices
4. Module dropdown `w-[36rem]` can bleed off narrow screens if accidentally triggered

### Fixes Required

**A. Remove the inline fixed positioning on the hamburger button.** Replace with a right-aligned flex approach:
```tsx
// Change the mobile nav button container from any inline style positioning to:
<div className="flex items-center lg:hidden ml-auto">
  {/* hamburger button */}
</div>
```

**B. Logo width on mobile:**
```tsx
// Change: max-w-[13rem]
// To:     max-w-[9rem] sm:max-w-[11rem] lg:max-w-[13rem]
```

**C. Mobile menu overlay safe area padding:**
```tsx
// Add to the mobile overlay container:
className="... px-5 pt-[calc(1.25rem+env(safe-area-inset-top,0px))] pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))] pl-[calc(1.25rem+env(safe-area-inset-left,0px))] pr-[calc(1.25rem+env(safe-area-inset-right,0px))]"
```

**D. Guard the desktop dropdown:**
```tsx
// Ensure the desktop modules dropdown has: overflow-hidden max-w-[min(36rem,calc(100vw-2rem))]
```

**E. Navbar container — prevent overflow:**
```tsx
// Ensure root nav element has: overflow-hidden or overflow-x-clip
```

---

## TASK 2 — Hero Section (`components/sections/Hero.tsx`)

### Issues
1. Body text hardcoded at `text-[18px]` with no mobile size reduction — too large at 320px
2. Trust/feature badge pills use `px-[18px]` and `text-[11px]` — at 320px viewport, multiple badges wrap incorrectly and look broken
3. Badge row may overflow if badges total width exceeds viewport
4. 3D HeroBrain canvas is always rendered — on low-end mobile devices this causes jank
5. CTA button group may need tighter spacing on 320px screens
6. Hero section min-height `min-h-[100dvh]` can feel cramped if content is tall

### Fixes Required

**A. Body text responsive sizing:**
```tsx
// Change: text-[18px]
// To:     text-[15px] sm:text-[17px] md:text-[18px]
```

**B. Badge/pill tags — make them wrap cleanly:**
```tsx
// Badge container: add flex-wrap justify-center gap-2
// Each badge: change px-[18px] to px-[12px] sm:px-[18px]
// Each badge: change text-[11px] to text-[10px] sm:text-[11px]
```

**C. 3D Canvas — conditional rendering for mobile:**
```tsx
// Wrap the HeroBrain / 3D canvas component:
import { useMediaQuery } from '@/hooks/useMediaQuery' // or use useState + useEffect
const isMobile = useMediaQuery('(max-width: 768px)')

// Then:
{!isMobile && <HeroBrain />}
// On mobile, replace with a high-quality static PNG/WebP fallback image
// OR a lightweight CSS/SVG illustration
```

**D. CTA buttons — ensure clean stacking on 320px:**
```tsx
// Button group container:
className="flex flex-col gap-3 w-full sm:flex-row sm:w-auto sm:gap-4"
// Each button:
className="w-full sm:w-auto min-h-[48px]"
```

**E. Hero container — tighter top padding on mobile:**
```tsx
// Hero outer: pt-[calc(var(--navbar-h)+1.5rem)] sm:pt-[calc(var(--navbar-h)+2.5rem)]
// so content doesn't sit right under the navbar
```

---

## TASK 3 — Footer (`components/layout/Footer.tsx`)

### Issues
1. `grid-cols-2 gap-x-10` — on 320px, each column is only ~140px wide after the 40px gap, making nav links unreadable
2. The enormous wordmark `clamp(2.9rem, 13.5vw, 10.25rem)` can push past container bounds on landscape small phones
3. Newsletter input row may not stack correctly on 320px

### Fixes Required

**A. Footer link columns grid:**
```tsx
// Change: grid-cols-2 gap-x-10 gap-y-10 md:grid-cols-4
// To:     grid-cols-2 gap-x-6 gap-y-8 sm:gap-x-10 sm:gap-y-10 md:grid-cols-4
```

**B. Wordmark fluid size — add a safer lower bound:**
```tsx
// Change: clamp(2.9rem, 13.5vw, 10.25rem)
// To:     clamp(2.2rem, 13.5vw, 10.25rem)
// This prevents the text from overflowing at 320px landscape
```

**C. Newsletter / email input — ensure full-width stacking:**
```tsx
// Input + button row:
className="flex flex-col gap-2 w-full sm:flex-row sm:gap-0"
// Input: className="w-full rounded-lg sm:rounded-r-none ..."
// Button: className="w-full sm:w-auto rounded-lg sm:rounded-l-none ..."
```

**D. Footer top section padding:**
```tsx
// Reduce section padding on mobile:
className="py-section-mobile lg:py-section" // ensure py-section-mobile is ≤ 3.5rem
```

---

## TASK 4 — How It Works Section (`components/sections/HowItWorksLandingSection.tsx`)

### Issues
1. Cards use `p-8` (32px) padding on all screens — on 320px this leaves only 256px content area
2. Section heading `text-3xl sm:text-4xl md:text-5xl` — 1.875rem base is large for 320px phones
3. Stats row (40% / 3× / Zero) inside each card — the 3-column stat grid may overflow on very narrow phones

### Fixes Required

**A. Card padding responsive:**
```tsx
// Change: p-8
// To:     p-5 sm:p-6 md:p-8
```

**B. Section heading responsive:**
```tsx
// Change: text-3xl sm:text-4xl md:text-5xl
// To:     text-2xl sm:text-3xl md:text-5xl
```

**C. Stats row inside cards:**
```tsx
// Stat grid:
className="grid grid-cols-3 gap-2 sm:gap-4 mt-4"
// Each stat value: text-[clamp(1.1rem,3vw,1.5rem)] font-bold text-blue
// Each stat label: text-[10px] sm:text-xs text-muted
```

**D. Module icon container:**
```tsx
// Icon box: w-10 h-10 sm:w-12 sm:h-12 (slightly smaller on mobile)
```

---

## TASK 5 — System Modules Strip (`components/sections/SystemModulesStripSection.tsx`)

### Issues
1. Full-bleed section uses `left-1/2 w-screen -translate-x-1/2` — verify `overflow-x: clip` on body is protecting this
2. On mobile, module cards may have padding that is too generous
3. Horizontal tab/pill selectors for module categories may overflow

### Fixes Required

**A. Verify and enforce overflow protection:**
```tsx
// Wrap the full-bleed section in a div:
<div className="overflow-x-clip w-full">
  {/* full-bleed content */}
</div>
```

**B. Module category tab strip — make horizontally scrollable on mobile:**
```tsx
// Tab container:
className="flex gap-2 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center"
// Each tab:
className="flex-shrink-0 snap-start ..."
```

**C. Card content padding on mobile:**
```tsx
// StripPanel inner padding:
className="p-5 sm:p-6 lg:p-8" // reduce from p-8 to p-5 on mobile
```

**D. Card min-height — allow natural height on mobile:**
```tsx
// Change: min-h-[270px] sm:min-h-[290px] lg:min-h-[320px]
// To:     min-h-0 sm:min-h-[270px] lg:min-h-[320px]
// Let content determine height naturally on mobile
```

---

## TASK 6 — Pricing Section (`components/sections/PricingSection.tsx`)

### Issues
1. Pricing card grid — if using `grid-cols-3` or similar without mobile fallback, cards will be crushed
2. Billing toggle row may overflow on 320px
3. Feature comparison rows inside each card may be too dense

### Fixes Required

**A. Pricing card grid:**
```tsx
// Ensure the pricing grid is:
className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
// On mobile: 1 card per row, full width
```

**B. Billing toggle:**
```tsx
// Toggle container: flex items-center justify-center gap-2 flex-wrap
// Text labels: text-sm (not smaller)
```

**C. Feature list inside cards:**
```tsx
// Feature row: text-[13px] sm:text-sm gap-2
// Icon: w-4 h-4 flex-shrink-0
```

**D. Price display:**
```tsx
// Price number: text-[2rem] sm:text-[2.5rem] font-bold
// Currency symbol: text-lg sm:text-xl align top
```

**E. CTA button in pricing card:**
```tsx
// Button: w-full min-h-[44px] mt-6
```

---

## TASK 7 — Comparison Table (`components/sections/ComparisonSection.tsx`)

### Issues
1. Comparison tables are notoriously bad on mobile — a multi-column table with 4+ columns will cause horizontal scroll or crushed content
2. Feature labels may be truncated

### Fixes Required

**A. Mobile-first comparison layout — replace table with card-per-competitor:**
```tsx
// On mobile (< md), hide the full table and show a tab-based or accordion comparison:
<div className="block md:hidden">
  {/* Mobile: tabs for each competitor, rows showing feature comparison */}
  <div className="flex gap-2 overflow-x-auto pb-2">
    {competitors.map(c => <button key={c} className="flex-shrink-0 ...">Zoveto vs {c}</button>)}
  </div>
  {/* Active competitor comparison */}
  <div className="mt-4 space-y-2">
    {features.map(f => (
      <div key={f} className="flex items-center justify-between p-3 rounded-lg bg-white border">
        <span className="text-sm font-medium">{f.name}</span>
        <div className="flex gap-4">
          <span className="text-green-600 text-sm">✓ Zoveto</span>
          <span className="text-red-400 text-sm">{f.competitor ? '✓' : '✗'} {activeCompetitor}</span>
        </div>
      </div>
    ))}
  </div>
</div>
<div className="hidden md:block">
  {/* Original full table */}
</div>
```

**B. If keeping the table on mobile — enable horizontal scroll:**
```tsx
<div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
  <table className="min-w-[640px] w-full">
    {/* table content */}
  </table>
</div>
```

---

## TASK 8 — OS Network / Architecture Section (`components/sections/OSNetworkSection.tsx`)

### Issues
1. Three.js canvas rendering on mobile is performance-heavy
2. Network visualization nodes/labels may be unreadable at small sizes

### Fixes Required

**A. Conditional Three.js rendering:**
```tsx
const isMobile = useMediaQuery('(max-width: 768px)')

// On mobile, show a static SVG/image representation of the architecture
{isMobile ? (
  <Image src="/assets/os-network-static.png" alt="System Architecture" ... />
) : (
  <OSNetworkCanvas />
)}
```

**B. If keeping canvas on mobile — reduce canvas pixel ratio:**
```tsx
renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 2))
```

---

## TASK 9 — Logo Marquee (`components/sections/LogoMarquee.tsx`)

### Issues
1. Logos may be too large or too small on mobile
2. Marquee speed may feel wrong on mobile

### Fixes Required

**A. Logo sizing in marquee:**
```tsx
// Each logo image: h-6 sm:h-8 (reduce from whatever current size)
// Logo container: px-6 sm:px-10 (reduce gap between logos on mobile)
```

**B. Marquee animation speed — slightly slower on mobile:**
```tsx
// If using CSS animation: animation-duration: 25s sm:20s (or Framer Motion variants)
```

---

## TASK 10 — Global CSS Fixes (`app/globals.css`)

### Additions Required

Add the following to `globals.css` after the existing mobile media queries:

```css
/* ─── Mobile Typography Adjustments ─────────────────────── */
@media (max-width: 640px) {
  :root {
    --text-display-xl: 2.8rem;   /* was 4.5rem — too large on phone */
    --text-display-lg: 2.4rem;
    --text-display-md: 2rem;
    --text-display-sm: 1.65rem;
    --spacing-4xl: 4rem;         /* was 8rem — too much vertical space on mobile */
    --spacing-3xl: 3rem;
  }
}

/* ─── Section Padding Mobile ─────────────────────────────── */
@media (max-width: 640px) {
  .section-padding {
    padding-top: var(--spacing-3xl);
    padding-bottom: var(--spacing-3xl);
  }
}

/* ─── Prevent any stray overflow ─────────────────────────── */
* {
  max-width: 100%;
}
img, video, canvas, svg {
  max-width: 100%;
  height: auto;
}

/* ─── Scrollbar hide utility (for horizontal scroll strips) ─ */
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
```

---

## TASK 11 — Tailwind Config (`tailwind.config.ts`)

### Additions Required

Ensure `screens` config includes a `xs` breakpoint for 375px+ targeting:

```ts
theme: {
  extend: {
    screens: {
      xs: '375px',  // ADD THIS if not present
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    spacing: {
      'section': '5.5rem',
      'section-mobile': '3rem',  // Reduce from 3.5rem to 3rem
    }
  }
}
```

---

## TASK 12 — Create `useMediaQuery` Hook (if not existing)

Create `/hooks/useMediaQuery.ts`:

```ts
'use client'
import { useState, useEffect } from 'react'

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia(query)
    setMatches(mql.matches)
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [query])

  return matches
}
```

---

## TASK 13 — FAQ Section (`components/sections/FAQSection.tsx`)

### Fixes Required

**A. Accordion question text sizing:**
```tsx
// Question: text-[15px] sm:text-base (not text-lg or text-xl on mobile)
// Answer body: text-sm sm:text-[15px] leading-relaxed
```

**B. Accordion container padding:**
```tsx
// Each row: py-4 px-4 sm:px-6 (reduce horizontal padding)
```

**C. Section heading:**
```tsx
// text-2xl sm:text-3xl md:text-4xl (scale down)
```

---

## TASK 14 — Final CTA Section (`components/sections/FinalCTASection.tsx`)

### Fixes Required

**A. Heading:**
```tsx
// Mobile: text-[1.7rem] sm:text-3xl md:text-4xl
// Use clamp: text-[clamp(1.7rem,5vw,3rem)]
```

**B. Button row:**
```tsx
// flex flex-col gap-3 w-full max-w-xs mx-auto sm:flex-row sm:max-w-none sm:mx-0 sm:w-auto
```

**C. Background treatment — ensure no overflow of decorative elements:**
```tsx
// Any absolute/fixed decorative blobs: overflow-hidden on the section wrapper
```

---

## TASK 15 — WhatsApp Float Button (`components/layout/WhatsAppFloatButton.tsx`)

### Fixes Required

```tsx
// Position: bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))] right-4 sm:right-6
// Size: w-12 h-12 sm:w-14 sm:h-14
// Ensure z-index doesn't conflict with mobile menu (menu should be higher z-index)
```

---

## TASK 16 — Sticky Demo CTA Bar (`components/layout/StickyDemoCTA.tsx`)

If a sticky bottom CTA bar exists on mobile:

```tsx
// Container: fixed bottom-0 left-0 right-0 z-40
// Padding: px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))]
// Button: w-full min-h-[48px] text-base font-semibold
```

---

## TASK 17 — Contact/Demo Page (`app/contact/page.tsx`)

### Fixes Required

**A. Form field layout:**
```tsx
// Name + company row: flex flex-col gap-4 sm:flex-row
// All inputs: min-h-[48px] text-base (prevents iOS zoom on focus)
// Textarea: min-h-[120px]
```

**B. Form container:**
```tsx
// max-w-[min(100%,44rem)] mx-auto px-4 sm:px-6
```

**C. Prevent iOS input zoom (critical):**
```css
/* In globals.css */
@media (max-width: 768px) {
  input, select, textarea {
    font-size: 16px !important; /* Prevents iOS auto-zoom */
  }
}
```

---

## TASK 18 — Module Detail Pages (`app/modules/[slug]/page.tsx`)

### Fixes Required

**A. Hero text on module pages:**
```tsx
// H1: text-[clamp(1.8rem,5vw,3.5rem)] (ensure clamp has a mobile-appropriate minimum)
```

**B. Feature grid:**
```tsx
// grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3
```

**C. Screenshot / mockup images:**
```tsx
// Wrap in overflow-hidden rounded-xl
// Image: w-full h-auto (no fixed heights that crop content)
```

---

## TASK 19 — Blog Page (`app/blog/page.tsx`)

### Fixes Required

**A. Blog card grid:**
```tsx
// grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3
```

**B. Blog post body (prose):**
```tsx
// Ensure .blog-prose has: max-w-[min(100%,72ch)] mx-auto px-4 sm:px-0
// Code blocks: overflow-x-auto with scrollbar-hide class
// Tables: overflow-x-auto wrapper
```

---

## TESTING CHECKLIST (Run After All Changes)

Test each viewport using Chrome DevTools device emulator, in both portrait and landscape:

### Viewports to Test
- [ ] iPhone SE (375×667) — portrait
- [ ] iPhone 14 Pro (393×852) — portrait
- [ ] iPhone 14 Pro Max (430×932) — portrait  
- [ ] Galaxy S8 (360×740) — portrait
- [ ] Small Android (320×568) — portrait (edge case)
- [ ] iPhone SE — landscape (667×375)
- [ ] iPad Mini (768×1024) — portrait

### Checks Per Viewport
- [ ] Zero horizontal scroll at any scroll position
- [ ] Navbar shows correctly — logo + hamburger visible, no overflow
- [ ] Mobile menu opens/closes correctly — covers full screen, no overflow
- [ ] All text is readable without zooming (minimum 14px effective size)
- [ ] All buttons/links have ≥ 44px touch target
- [ ] Hero section fits viewport with proper hierarchy
- [ ] Badge/pill tags wrap cleanly in hero
- [ ] How It Works cards don't overflow their grid column
- [ ] Module strip is scrollable or wraps cleanly
- [ ] Pricing cards stack vertically, one per row
- [ ] Footer links are readable, not crushed
- [ ] FAQ opens/closes correctly
- [ ] Forms have 16px font on inputs (no iOS zoom)
- [ ] WhatsApp button is above home indicator
- [ ] No elements with fixed widths leak outside viewport
- [ ] All images load and don't cause layout shift
- [ ] 3D canvas (if kept on mobile) doesn't freeze the page
- [ ] Animations don't cause jank (test on CPU throttle 4x in DevTools)

### Automated Checks
```bash
# Run Lighthouse mobile audit
npx lighthouse https://zoveto.com --preset=mobile --output=html --output-path=./lighthouse-mobile.html

# Check for horizontal overflow with CSS
# Add temporarily to globals.css for debugging:
# * { outline: 1px solid red !important; }
```

---

## IMPLEMENTATION ORDER (Priority)

1. **TASK 10** — globals.css global overflow guards (5 min, highest risk prevention)
2. **TASK 1** — Navbar hamburger positioning fix (15 min, most visible bug)
3. **TASK 3** — Footer grid fix (10 min, widely visible)
4. **TASK 17** — iOS input zoom prevention (5 min, critical UX)
5. **TASK 2** — Hero section fixes (30 min)
6. **TASK 4** — How It Works cards (15 min)
7. **TASK 6** — Pricing section (20 min)
8. **TASK 7** — Comparison table (30 min — most complex)
9. **TASK 5** — Modules strip (20 min)
10. **TASK 8** — 3D canvas mobile fallback (45 min)
11. **TASKS 9, 11–16** — Remaining polish (60 min total)

**Total estimated implementation time: ~4–5 hours**

---

## DO NOT CHANGE
- Font families (maintain existing font stack 100%)
- Font weight hierarchy (light/regular/medium/semibold/bold usage)
- CSS variable names in `:root`
- Color palette and design tokens
- Tailwind theme extension structure
- Any desktop layout (1024px+) unless explicitly noted above
- Animation easing curves and durations
- Existing accessible markup (ARIA labels, roles, focus management)
- SEO metadata, schema markup, or any content text
