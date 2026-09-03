# Homepage De-AI-ify Pass — Cursor Implementation Prompts

I went through the live homepage top to bottom (localhost:3002, post Pass-1 and post product-video changes) looking specifically for anything that reads as "AI-generated landing page" rather than "built by a senior product design team." Here's exactly what I found, in the order it appears on the page:

1. **Three near-identical giant centered statements, back to back**, each followed by supporting text and a lot of whitespace, making basically the same point three times in a row: "One operating system for warehouse, finance, and CRM" (SystemShiftSection — this was supposed to already be trimmed from an earlier prompt, but it's still there at full size), "Zoveto replaces all of them - one operating record your teams can trust." (a big statement inside FeaturesSection, right before its own "What actually changes when you run on Zoveto" sub-header), and "When your systems stop fighting, everything aligns." (another one, later in the same stretch). This rhythm — giant rhetorical line, pause, giant rhetorical line, pause — is the single strongest "AI landing page" tell on the page.

2. **Five separate three/four-column card grids stacked down the page**, all using the same visual language (white card, thin border, rounded corners, a small icon in a light-blue rounded box top-left, a heading, a paragraph) regardless of what each one is actually communicating: `HeardThisBeforeSection` (3 founder-quote cards), `FeaturesSection` (a 2x2 grid of before/after cards), `ComparisonSection` (an old-way/new-way two-column checklist), `HowItWorksLandingSection` (3 numbered step cards), `ZeroClientTrustSection` (4 numbered trust-check cards). Five grids in a row that all look the same, independent of content, is exactly the "layout should vary by information, not decoration" problem from the original audit.

3. **A generic corporate stock photo** — a handshake image — sitting in the FAQ section (`LandingFAQSection`/`FAQSection`). Out of everything on the page, this is the most dated, most template-feeling element. A senior team wouldn't ship a stock handshake photo on a technical B2B product's FAQ section.

4. **Real product screenshots exist but aren't used anywhere except the one video reel.** I pulled four clean, caption-free still frames from your product video and cropped them for reuse:
   - `public/screenshots/command-center.jpg` — Command Center overview
   - `public/screenshots/sales-quotations.jpg` — Sales Quotations list
   - `public/screenshots/warehouse-pick-list.jpg` — Operations Pick List
   - `public/screenshots/finance-invoices.jpg` — Finance Sales Invoices register

   These are real, already-in-the-repo assets — use them, don't invent new ones. The most text-heavy section on the page (`FeaturesSection`'s before/after grid) is making claims like "Orders go out right. Every time." and "Month-end stops being a fire drill" with zero visual next to them — a real screenshot next to each claim would do far more than another paragraph.

Paste these into Cursor one at a time, same discipline as before: read first, one change at a time, show me the diff, stop.

---

## Prompt 0 — Paste first if this is a new Cursor session

```
You are working on the Zoveto marketing website (Next.js 16 App Router, React 18, TypeScript, Tailwind CSS 3.4, GSAP for the homepage hero). Dev server runs at http://localhost:3002.

RULES for this session:
1. Homepage only: app/(marketing)/page.tsx and the components it imports. Do not touch any other route.
2. The hero (components/sections/dashboard-scroll-desktop.tsx, dashboard-scroll-mobile.tsx, and components/sections/home/*) is LOCKED — do not modify it in this session.
3. Work one prompt at a time. Read relevant files first, explain what you're about to do in one paragraph, make only that change, run `npm run typecheck` and `npm run lint`, then stop and show me the diff and every file touched.
4. No new npm dependencies. No large refactors.
5. When a prompt asks you to cut or consolidate copy, keep the strongest existing line(s) verbatim rather than inventing new marketing copy — pick, don't rewrite, unless the prompt explicitly says otherwise.
6. Do not commit or push.

Reply "understood" and wait for the first task.
```

---

## Prompt 1 — Consolidate the three giant centered statements into one

```
Run these to locate all three exactly:
  grep -rn "One operating system for warehouse, finance, and CRM" components/
  grep -rn "Zoveto replaces all of them" components/
  grep -rn "When your systems stop fighting" components/

Read the full component file(s) each one lives in, plus enough surrounding context in app/(marketing)/page.tsx to see the order they render in.

Task: keep only ONE of these three statements — pick whichever currently has the tightest supporting copy around it (probably "One operating system for warehouse, finance, and CRM" in SystemShiftSection, since it's the most specific to what Zoveto actually does, but read all three and use your judgment; tell me which you kept and why). Remove the other two giant-statement blocks entirely from wherever they render, along with their standalone whitespace-heavy wrapper sections — don't just hide the text and leave an empty full-height section behind.

For the one you keep: compress it into a slim, single-line transitional moment (not a full-height centered hero-style block) — this is the same treatment an earlier prompt already asked for on SystemShiftSection specifically, so if that trim never landed, do it now as part of this prompt.

Show me before/after for all three locations and confirm no orphaned empty sections or broken spacing remain where you removed content.
```

---

## Prompt 2 — Put real product screenshots into FeaturesSection

```
Four real, cropped product screenshots already exist in the repo — do not generate, invent, or re-crop new ones:
  public/screenshots/command-center.jpg
  public/screenshots/sales-quotations.jpg
  public/screenshots/warehouse-pick-list.jpg
  public/screenshots/finance-invoices.jpg

Read components/sections/FeaturesSection.tsx in full — it currently renders a 2x2 (or similar) grid of before/after text-only cards with headings like "You stop guessing. You start knowing.", "Orders go out right. Every time.", "Month-end stops being a fire drill", "Work happens without chasing people" (confirm the exact current headings by reading the file — copy above is from memory of the live page, not the source).

Task: match each card to the most relevant screenshot by subject and add it to that card using Next.js <Image> (check whether next/image is already used elsewhere in this component tree, e.g. in LogoStrip.tsx or similar, and follow that existing pattern):
  - The card about orders/dispatch/fulfillment → public/screenshots/warehouse-pick-list.jpg
  - The card about invoices/month-end/reconciliation/tax → public/screenshots/finance-invoices.jpg
  - The card about live numbers/knowing/visibility across teams → public/screenshots/command-center.jpg
  - Any remaining sales/pipeline/order-related card → public/screenshots/sales-quotations.jpg

Keep the existing before/after bullet copy — you're adding a screenshot to each card, not rewriting the text. Size the image sensibly within the card (a bordered, rounded-lg frame consistent with how ProductDemoReel.tsx frames its video — reuse that same border/radius treatment rather than inventing a new one), and make sure the grid still reads fine responsively (cards may need to grow taller or the grid may need to go to a single column below a certain width — check and adjust if it breaks).

If any one of the four cards genuinely has no good screenshot match, leave that one card text-only rather than forcing a mismatched image, and tell me which card that was.
```

---

## Prompt 3 — Remove the stock handshake photo from the FAQ section

```
Find the FAQ section on the homepage (check components/sections/LandingFAQSection.tsx and components/sections/FAQSection.tsx — the homepage uses LandingFAQSection per app/(marketing)/page.tsx, confirm which file actually renders the image) and locate the handshake stock photo currently sitting next to the "Answers for operators, founders, and IT" heading.

Task: remove that image entirely and let the FAQ heading/intro copy and accordion take the full width instead (or redistribute the layout so it doesn't leave an awkward empty column — use your judgment on the exact grid adjustment, but don't leave a big blank gap where the image used to be). Do not replace it with a different stock photo or a generated illustration — this section doesn't need imagery at all; it's stronger as clean text + the FAQ accordion.

Show me the before/after layout at 1440px and 768px widths and confirm nothing looks unbalanced without the image.
```

---

## Prompt 4 — Vary the remaining repeated card-grid sections

```
Read components/sections/HeardThisBeforeSection.tsx, components/sections/HowItWorksLandingSection.tsx, and components/sections/ZeroClientTrustSection.tsx.

Right now these three (plus ComparisonSection, which Prompt 1/2 may have already changed) all use the same visual pattern: white bordered card, icon in a light rounded box, heading, paragraph, repeated 3-4 times in a grid. Reducing every section to that same shape regardless of content is a big part of why this page can read as template-generated.

Task: pick ONE of these three sections and give it a genuinely different layout from the other two (don't touch the other two in this prompt — one at a time). Good options, pick whichever fits the actual content best:
- A horizontal, single-row list with dividers between items instead of separate boxed cards (removes the "card" feeling entirely)
- A single wide card containing all the items as an internal list/table, rather than N separate cards
- Left-aligned instead of centered, with the numbering/icon integrated into the heading line rather than boxed above it

Keep all existing copy exactly as-is — this is a layout change only, not a content rewrite. Tell me which section you changed and which alternative layout you used, then stop so I can look at it before you touch the next one.
```

---

## Prompt 5 — Final self-audit read-through

```
Scroll through the entire homepage yourself (or read through every section component it renders, in order, via app/(marketing)/page.tsx) with this specific question in mind: "does anything here still look like a generic AI-generated SaaS landing page rather than something a senior product design team built?"

Look specifically for: any remaining icon-in-a-circle/rounded-box pattern repeated more than twice on the page, any other giant centered statement we didn't already catch, any generic stock photography or abstract decorative graphic, any section that's still pure text with a real product screenshot available in public/screenshots/ or the video that could replace or support it, and excessive empty vertical space between sections.

Do not fix anything automatically. Give me a short, specific list — section by section — of anything you find, so I can decide what's worth another prompt.
```
