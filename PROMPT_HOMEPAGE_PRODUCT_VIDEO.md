# Homepage Product Video — Cursor Implementation Prompts

Update: the video is in. I've already compressed it and placed both files in your repo, so the "prepare the asset" step is done — these prompts now go straight to building the component and wiring it in.

**Files already in your repo:**
- `public/videos/product-demo.mp4` — 1920x1080, h264, no audio (stripped — this is a silent loop), 5.7MB, ~30 seconds. (Compressed down from your 28MB original.)
- `public/videos/product-demo-poster.jpg` — a still frame from the Command Center screen, used as the poster/first-paint image.

I dropped the webm fallback from the original plan — vp9 encoding is extremely slow and h264 mp4 alone is fully supported by every browser we care about here (Chrome, Safari/iOS, Firefox, Edge), so a second format isn't buying us anything. One `<source>` is fine.

**What's actually in the recording**, so the component's accessible description and any on-page copy are accurate rather than placeholder text:

It's a produced ~30s reel, not a raw unedited screen capture: it opens on a title card ("For distributors who run on chats — WhatsApp. Excel. Tally. — four systems for one working day."), then cuts through real screen recordings of four Zoveto modules in sequence, each with a caption baked into the footage:
1. **Command Center** — "today's work. one screen." (the Owner overview: connected surfaces, ops desk priorities, client ROI board)
2. **Sales & CRM** — "lead to quote to order." (Sales Quotations list — real quote records, statuses, amounts)
3. **Operations** — "pick. scan. ship." (Warehouse Pick List — ready orders, units to pick, blocked orders, scan-to-pick workflow)
4. **Finance** — "GST from the same order." (Sales Invoices register — GST/e-way-bill status, invoice totals)

...then closes on a branded end card ("one operating system." zoveto.com). Because it opens and closes on branded cards, it already loops cleanly — no further trimming needed.

Paste these into Cursor one at a time. Prompt 0 is the same session context as before — skip it if you already pasted it earlier in this Cursor session.

---

## Prompt 0 — Paste first if this is a new Cursor session

```
You are working on the Zoveto marketing website (Next.js 16 App Router, React 18, TypeScript, Tailwind CSS 3.4, GSAP for the homepage hero). Dev server runs at http://localhost:3002.

RULES for this session:
1. Homepage only: app/(marketing)/page.tsx and the components it imports. Do not touch any other route.
2. The hero (components/sections/dashboard-scroll-desktop.tsx, dashboard-scroll-mobile.tsx, and components/sections/home/*) is LOCKED — do not modify it in this session at all.
3. Work one prompt at a time. Read relevant files first, explain what you're about to do in one paragraph, make only that change, run `npm run typecheck` and `npm run lint`, then stop and show me the diff and every file touched.
4. No new npm dependencies (native HTML5 <video> only, nothing else needed here).
5. Do not commit or push.
6. Do not rewrite existing marketing copy anywhere outside the one section a prompt names.

Reply "understood" and wait for the first task.
```

---

## Prompt 1 — Build the ProductDemoReel component

```
Two files already exist at public/videos/product-demo.mp4 (h264, no audio, ~5.7MB, ~30s, 1920x1080) and public/videos/product-demo-poster.jpg (poster frame). Do not re-encode or touch these files.

Create a new component: components/sections/home/ProductDemoReel.tsx

Requirements:
- Renders a single <video> element: src="/videos/product-demo.mp4" (a single <source> tag or a direct src attribute is fine — there's only one format), poster="/videos/product-demo-poster.jpg".
- muted, loop, playsInline, preload="metadata" attributes. Do NOT set `controls` (no native scrubber — this is an ambient reel, not a media player).
- Respect prefers-reduced-motion: if the user has reduced motion enabled, do not autoplay — show the poster frame as a static image instead, with the pause/play button below still available so they can opt in manually.
- Only play the video once it's actually scrolled into view (IntersectionObserver — follow the existing reveal-on-scroll pattern already used in components/sections/dashboard-scroll-mobile.tsx's MobileCard component rather than inventing a new one). Pause it when scrolled out of view.
- Accessibility requirement (WCAG 2.2.2): this autoplays and runs longer than 5 seconds, so it needs a visible pause/stop control. Add a small, unobtrusive pause/play toggle button overlaid on a corner of the video — check components/layout/WhatsAppFloatButton.tsx for the icon-button styling convention already used on this site, and match that weight/style rather than introducing a new button pattern. Toggling it should pause/resume playback and update its own icon + aria-label.
- Add a visually-hidden (sr-only) description of the actual content: "Screen recording of the Zoveto product: the Command Center overview, a Sales & CRM quotation-to-order list, the Operations warehouse pick list, and the Finance sales-invoice register with GST status, shown in sequence."
- Wrap the video in a clean, restrained frame: a single rounded-lg container (use the existing border-radius token, not a new one) with a 1px border (border-border token), sitting directly on the section's own background — no glassmorphism, no gradient border, no floating drop-shadow stack. This should read as "this is the actual software," not a marketing graphic.
- Constrain width using the existing max-w-content token (tailwind.config.ts), matching how other homepage sections are contained. Since the source is 1920x1080 (16:9), maintain that aspect ratio at every width rather than letterboxing or cropping — use aspect-video (Tailwind's built-in 16/9 utility) on the wrapping element.

Do not wire this into the homepage yet — that's the next prompt. Just build and export the component, and confirm it renders correctly (video loads, poster shows before play, plays/loops once scrolled into view, pause button works) before moving on.
```

---

## Prompt 2 — Insert the new section into the homepage

```
Task: in app/(marketing)/page.tsx, add a new section immediately after <MarketingHeroFeather /> and before the existing LogoStrip section — i.e. it's the very first thing a visitor sees after the hero, ahead of everything currently there.

Wrap it in the same FluidMarketingSection pattern the rest of the page uses (check the bandIndexForSection sequence currently in page.tsx and renumber the subsequent calls by one so the alternating band pattern stays consistent — tell me exactly what you changed).

Above the video, add a short eyebrow label and a single-line heading — nothing more (no paragraph, no CTA button under it, the video and its own baked-in captions do the explaining). Use copy along these lines, adjust wording slightly if it reads awkwardly in place, but keep it this short:
  Eyebrow: "THE PRODUCT"
  Heading: "See it running."

Import and render <ProductDemoReel /> from components/sections/home/ProductDemoReel.tsx below that heading, loaded lazily via next/dynamic (matching how every other below-the-fold section on this homepage is already lazy-loaded in page.tsx), since it isn't needed for the initial hero LCP.

Do not reorder or modify any other existing section in this prompt. Run the dev server, scroll to this new section, and confirm: the video autoplays muted and loops once scrolled into view; the poster shows correctly before that; the pause/play button works; the aspect ratio holds at a few different widths; and nothing above or below it visually broke.
```

---

## Prompt 3 — Trim the SystemShiftSection giant statement

```
Context: components/sections/SystemShiftSection.tsx currently renders (desktop only, hidden on mobile per app/(marketing)/page.tsx's `hidden sm:block` wrapper) a "LIVE PLATFORM" eyebrow tag followed by a large two-line centered statement ("One operating system for warehouse, finance, and CRM") and four short checklist items, with a lot of empty vertical space around it.

Now that the homepage shows the real product on video right after the hero, this section is redundant text making the same point with no visual of its own — trim it rather than keep it at full size.

Task: read the full file, then reduce this section's visual weight substantially — do NOT delete it outright without showing me first. Options, in order of preference:
(a) Compress it into a short, single-line transitional statement with much less surrounding whitespace (a slim divider-style line, not a full-height block of its own), keeping the four checklist items as an inline row if they still add value, or
(b) If once compressed it adds nothing beyond what the video and the next section already say, remove the component's usage from page.tsx entirely (leave the component file itself in place, unused, rather than deleting it) and tell me exactly what you removed and why.

Show me both the before and after and tell me which option you went with and why, before finalizing. Don't touch FeaturesSection, ComparisonSection, or anything below it in this prompt.
```

---

## Prompt 4 — Mobile + performance check for the new section

```
Task: verify the new "See it running" section (ProductDemoReel + its wrapping section from Prompts 1-2) at these widths: 375, 390, 768, 1024, 1440. Specifically check:

1. Does the video element hold its 16:9 aspect ratio correctly at every width with no overflow or broken cropping?
2. On the two mobile widths, does autoplay actually work? (iOS Safari has stricter autoplay rules — confirm muted + playsInline is enough, or whether it falls back to the poster image, which is an acceptable degraded state. Do NOT try to force autoplay via user-gesture workarounds.)
3. Confirm the 5.7MB video is not downloaded until the section scrolls into view (check the Network tab on a fresh load).
4. Confirm the pause/play button has a large enough tap target on mobile (minimum ~44x44px, matching the convention already used elsewhere, e.g. the mobile menu button in Navbar.tsx).

Report findings only for issues 1-4. If you find something broken, fix only that specific issue and tell me what you changed — don't do a broader responsive pass across the rest of the page in this prompt.
```
