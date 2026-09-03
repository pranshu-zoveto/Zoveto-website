# Homepage Pass 1 — Cursor Implementation Prompts

How to use this file: paste **Prompt 0** into Cursor's chat once at the start of your session (or keep it pinned as context/rules if Cursor supports a rules file). Then paste **one numbered prompt at a time**, in order. Review the diff it produces, run the site locally, and only then move to the next prompt. Do not paste two prompts back to back — that's the whole-site-redesign mistake we're trying to avoid this time.

Every prompt below already bakes in the guardrails, so you shouldn't need to repeat yourself, but if Cursor ever starts touching files outside the list a prompt names, stop it and paste this reminder:

> Stop. You just touched a file outside the scope I gave you. Revert that file and stay inside the file list in my last prompt.

---

## Prompt 0 — Paste first (project context, keep pinned)

```
You are working on the Zoveto marketing website (Next.js 16 App Router, React 18, TypeScript, Tailwind CSS 3.4, GSAP + ScrollTrigger for the homepage hero, Framer Motion elsewhere). Dev server runs at http://localhost:3002.

PROJECT RULES — these apply to every prompt I give you in this session, not just this one:

1. We are redesigning ONE PAGE AT A TIME. Right now that page is the homepage only: app/(marketing)/page.tsx and the components it imports. Do NOT modify any other route (pricing, compare, ODI score, system flow, blog, about, industries, security, implementation, modules, or any other page under app/(marketing)/ besides page.tsx itself).

2. The homepage hero animation is LOCKED. It lives in components/sections/dashboard-scroll-desktop.tsx (desktop, GSAP ScrollTrigger, pinned for 650vh, scrubbing through 9 module tiles with 5 deep-dive content panels), components/sections/dashboard-scroll-mobile.tsx (mobile module strip), and components/sections/home/{HomeHeroLcpShell,HomeHeroAboveFold,StaticDashboardHero,DashboardDesktopLoadingFallback}.tsx. Do NOT change: the module tile arrangement, the zoom/scroll interaction, the zoom math in lib/dashboard-scroll-math.ts, the central ZOVETO wordmark, the content panel copy, or the overall animation concept. I will tell you explicitly, in a specific prompt, on the rare occasion a locked file needs a surgical fix — and even then, only touch the exact lines that prompt describes.

3. Work incrementally. For each prompt: read the relevant files first, tell me in one short paragraph what you're about to change and why, make ONLY that change, run `npm run typecheck` and `npm run lint`, then stop and show me a summary of every file you touched and a diff. Do not proceed to unrelated cleanup, do not "improve while you're in there," do not touch a file I didn't name.

4. No new npm dependencies. No new UI library. No large refactors. No renaming files or moving directories unless the prompt explicitly asks for it. Prefer the smallest diff that fixes the described problem.

5. Do not rewrite marketing copy. If a prompt touches a file that contains customer-facing copy, preserve the copy exactly unless the prompt explicitly gives you new copy to use.

6. Never use `overflow: hidden` (or `overflow-x: hidden` as a page/section-level band-aid) to hide a layout problem. Fix the actual overflow cause (a fixed width, an unclamped font-size, a missing min-width: 0 on a flex child, etc.).

7. Do not commit or push. I review and commit myself. When you're done with a prompt, just tell me what changed and stop.

Reply "understood" and wait for the first task.
```

---

## Prompt 1 — Fix hero loading-fallback copy mismatch

```
Bug: while the GSAP hero chunk for the desktop homepage hero is downloading, users briefly see components/sections/home/DashboardDesktopLoadingFallback.tsx. That file hardcodes its own subheading text:

  "Your business doesn't need more tools. It needs one system that runs everything."

But the real hero (rendered a moment later, in components/sections/dashboard-scroll-desktop.tsx via SectionIntro) uses HOME_HERO_SUBHEADING from lib/home-hero-copy.ts, which is:

  "Zoveto replaces WhatsApp chaos, Excel tracking, and disconnected tools with one operating system for Indian businesses."

The comment on HOME_HERO_VALUE_PROP in lib/home-hero-copy.ts literally says "keep in sync across mobile, desktop SSR, and GSAP intro" — this file broke that.

Task: edit ONLY components/sections/home/DashboardDesktopLoadingFallback.tsx. Import HOME_HERO_SUBHEADING (and HOME_HERO_VALUE_PROP if it makes sense for the wordmark's accessible text) from lib/home-hero-copy.ts and replace the hardcoded paragraph text with it, so the fallback and the real hero always show identical copy. Do not change the pills array, the layout, the styling, or anything else in this file. Do not touch dashboard-scroll-desktop.tsx, HomeHeroAboveFold.tsx, or StaticDashboardHero.tsx in this prompt.

Verify: load http://localhost:3002 with network throttled (Chrome DevTools > Network > Slow 3G) so you can actually see the fallback render, confirm the subheading text now matches what appears after the real hero mounts.
```

---

## Prompt 2 — Snap homepage-only spacing values to the approved scale (no visual change)

```
Context: we're standardizing on an 8px-based spacing scale with 4px increments: 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 120 (px). Tailwind's default spacing scale already maps to most of these (p-1=4px, p-2=8px, p-3=12px, p-4=16px, p-6=24px, p-8=32px, p-10=40px, p-12=48px, p-16=64px, p-20=80px, p-24=96px; 120px has no default Tailwind class, use an arbitrary value p-[120px] or a one-off token only if a homepage component genuinely needs it).

IMPORTANT — scope: app/globals.css defines shared CSS custom properties (--spacing-xs through --spacing-4xl, values 8/11/16/20/30/44/62/128px) that are used across the ENTIRE site, not just the homepage. Do NOT change any value in app/globals.css in this prompt — that would affect pages we are not allowed to touch yet. Instead, first run:

  grep -rn "spacing-xs\|spacing-sm\|spacing-md\|spacing-lg\|spacing-xl\|spacing-2xl\|spacing-3xl\|spacing-4xl" --include="*.tsx" --include="*.css" .

and show me the list of files that reference these tokens before changing anything, so I can see whether any homepage-only component depends on them.

Task, scoped to these homepage-only files:
- app/(marketing)/page.tsx
- components/sections/home/*.tsx
- components/sections/dashboard-scroll-desktop.tsx (spacing/layout values ONLY — do not touch animation timing, zoom math, or module data)
- components/sections/dashboard-scroll-mobile.tsx
- components/sections/LogoStrip.tsx, ProblemSection.tsx, SystemShiftSection.tsx, ComparisonSection.tsx, HeardThisBeforeSection.tsx, HowItWorksLandingSection.tsx, ZeroClientTrustSection.tsx, PricingSection.tsx (as used on the homepage), LandingFAQSection.tsx, FinalCTASection.tsx, FeaturesSection.tsx
- components/layout/FluidMarketingSection.tsx

Find hardcoded pixel spacing (inline style padding/margin/gap values, and Tailwind arbitrary values like p-[28px], gap-[14px], mb-[62px]) in these files only. For each one that is NOT already one of 4/8/12/16/24/32/40/48/64/80/96/120, snap it to the nearest value on that scale. List every value you changed, old → new, file by file, before you finish. If a value is ambiguous (e.g. exactly between two scale steps), don't guess — list it separately and ask me which way to round.

This should be a visual no-op or near-no-op (differences of a few px at most) — not a redesign. If any single change would shift a layout by more than ~8px, flag it to me instead of applying it automatically.
```

---

## Prompt 3 — Fix the hero-to-next-section exit transition seam (locked-file exception)

```
This touches a file that is otherwise LOCKED (components/sections/dashboard-scroll-desktop.tsx), so be surgical: only touch the exit/unpin behavior described below. Do not change tile positions, zoom params, module order, content panel copy, or anything before timeline position 6.1.

Observed bug: scroll down the homepage hero at normal-to-fast trackpad/wheel speed (past all 9 module tiles, through the "warehouse, finance, and CRM" module deep-dives, to the end of the pinned section). At the moment the section un-pins into the next static section (SystemShiftSection, headline "One operating system for warehouse, finance, and CRM"), the module tile grid is still visible on screen — not yet faded to opacity 0 — directly overlapping the next section's real, already-scrolled-into-place content underneath it. For a brief moment you see both layers double-exposed.

Root cause candidate: the GSAP timeline (in the useLayoutEffect of DashboardScrollDesktop) uses `scrub: 1.2` on the ScrollTrigger, meaning the animation state eases toward the actual scroll position with up to ~1.2s of lag. The exit fade is only scheduled very late:

  tl.to(dashRef.current, { scale: 1, x: 0, y: 0, duration: 0.7, ease: "power3.inOut" }, 6.1);
  tl.to(stickyRef.current, { opacity: 0, duration: 0.35 }, 6.5);

On a fast scroll, the user can reach and pass the pin's release point before the scrubbed opacity has actually caught up to 0, so the still-opaque pinned layer visually overlaps the next section for a frame or two.

Task: investigate and fix this seam using ONE of these approaches (pick whichever is least invasive once you've read the code, and tell me which you chose and why):
(a) Start the stickyRef opacity fade earlier in the timeline (e.g. move it from position 6.5 to something like 5.8–6.0) and/or lengthen its duration slightly, so it reliably reaches 0 well before the ScrollTrigger's "end" is reached even with scrub lag.
(b) Reduce scrub specifically for this final fade segment (a separate faster-scrub or non-scrubbed tween for just the exit), while leaving scrub: 1.2 for the rest of the tile-zoom timeline untouched.
(c) Add an explicit z-index / pointer-events guard so that even if the pinned layer is still fractionally visible during the handoff, it can never render above the incoming section (confirm current z-index stacking between .sticky (stickyRef) and the sections rendered via FluidMarketingSection in app/(marketing)/page.tsx first).

Do not use opacity: 0 !important or overflow: hidden as a band-aid — the fix should make the actual crossfade timing correct.

Verify by scrolling through the full hero at three speeds: slow (many small scroll ticks), normal, and a single fast flick-scroll past the whole section, at both 1440px and 375px-equivalent widths (though the pinned desktop hero only renders at lg: and above — confirm the mobile module strip in dashboard-scroll-mobile.tsx doesn't have an analogous seam against the section after it, and tell me if it does, but don't fix that in this prompt without telling me first).

Report exactly which lines you changed and paste the before/after of the modified tween(s).
```

---

## Prompt 4 — Container-width consistency audit (no value change yet)

```
Context: tailwind.config.ts defines maxWidth.content = "72rem" (1152px), used as max-w-content across the site. This is already a single, consistently-defined token — we are NOT changing its value in this prompt (that's a site-wide decision I'll make separately, since it affects every page, not just the homepage).

Task: audit ONLY the homepage's section components (everything imported by app/(marketing)/page.tsx, plus components/layout/FluidMarketingSection.tsx and components/layout/Navbar.tsx/Footer.tsx's outer container) for container-width consistency. For each section, tell me:
- Does it use max-w-content, or does it hardcode its own max-width (max-w-4xl, max-w-5xl, max-w-6xl, max-w-7xl, a px value, etc.)?
- If it hardcodes something different, what's the actual rendered width difference vs 1152px at a 1440px and 1920px viewport?

Give me a simple table: section/component name → current max-width → matches max-w-content (yes/no). Do not change any code in this prompt — this is a report only. Once I see the table I'll tell you which sections (if any) should be snapped to max-w-content.
```

---

## Prompt 5 — Navbar ↔ hero spacing relationship

```
Context: components/layout/Navbar.tsx renders at a compact height of 54px (mobile) / 58px (desktop, lg:) once scrolled (isCompact true, scrollY >= 40), and 56px / 60px at the top of the page (scrollY 0, not yet compact). It's transparent/non-glass at scroll 0.

The hero shell components use a hardcoded 4.5rem (72px) offset in several places to account for navbar height:
- components/sections/home/HomeHeroLcpShell.tsx: min-h-[calc(100dvh-4.5rem)]
- components/sections/home/StaticDashboardHero.tsx: min-h-[calc(100dvh-3.5rem-env(safe-area-inset-top,0px))] on mobile, sm:min-h-[calc(100dvh-4.5rem)]
- app/(marketing)/layout.tsx: <main> has scroll-mt-[4.5rem]

Task: read all three files above plus Navbar.tsx, and tell me — at scroll position 0, on both mobile (<640px) and desktop (>=1024px) — whether the actual rendered navbar height matches the 4.5rem (72px) / 3.5rem (56px) buffers used by the hero, or whether there's a mismatch (e.g. navbar is actually 56-60px tall at scroll 0, not 72px, which would leave the hero calculating ~12-16px more clearance than it needs, or too little).

If you find a real mismatch, fix ONLY the spacing constant(s) involved (the calc() values / scroll-mt value) so the hero's top clearance visually matches the navbar's actual height at scroll 0, on both breakpoints. Do not change the navbar's own compact/expanded logic, its scroll listener, or its glass effect. Do not change anything about the pinned hero animation itself — this is about the static space between the fixed navbar and where the hero content starts, before any scrolling/pinning begins.

Show me a before/after screenshot description (or take one if you have browser tooling) at 1440px and 390px widths, scroll position 0.
```

---

## Prompt 6 — Responsive breakpoint QA pass (report only, no fixes)

```
This repo already has a Playwright-based screenshot script: scripts/mobile-screenshots.mjs (npm run screenshot:mobile). Read that script first and tell me which breakpoints it currently captures.

Task: run it (or a modified version, if you need to adjust the breakpoint list — tell me what you changed) against the homepage only (http://localhost:3002/) at exactly these widths: 320, 375, 390, 430, 768, 1024, 1280, 1440, 1920. Capture full-page screenshots at each width, plus specifically the hero section (scroll position 0) and the hero's mid-scroll module-grid state on the widths where the desktop pinned hero is active (>=1024).

Do NOT fix anything in this prompt. Just produce a written report, section by section down the page, listing anything you observe at any of these widths that looks like:
- horizontal overflow / a visible horizontal scrollbar
- text clipping or a button/CTA getting cut off
- an image or module tile bleeding outside its container
- two elements colliding/overlapping that shouldn't
- a section with clearly excessive empty space or a section that looks broken/blank

For each issue, tell me the exact breakpoint(s), the component file responsible, and a one-line description. I will review this report and give you a follow-up prompt to fix only the specific issues we agree on.
```

---

## Prompt 7 — Fix the specific issues from the Prompt 6 report (fill in after review)

```
Using the QA report from the previous prompt, fix ONLY the following specific issues (I'm listing them after reviewing your report — do not fix anything not listed here):

1. [issue — breakpoint — file]
2. [issue — breakpoint — file]
3. [issue — breakpoint — file]

For each fix: use a real layout solution appropriate to the cause (clamp() for fluid type, min-width: 0 on a flex/grid child that's overflowing, flex-wrap, a narrower breakpoint-specific max-width, adjusting a fixed px value to a responsive one, etc.) — never overflow: hidden as a band-aid. After each fix, re-screenshot that specific breakpoint and confirm the issue is resolved and nothing else regressed at the adjacent breakpoints (one step up and one step down in the list: 320/375/390/430/768/1024/1280/1440/1920).

Report file-by-file what changed and why.
```
