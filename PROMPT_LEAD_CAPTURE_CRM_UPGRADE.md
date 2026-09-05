# PROMPT — Lead Capture + CRM Upgrade for Paid Ads Launch

## Context

We are about to spend real ad budget (Google Search, India) driving cold traffic to
the "Request early access" demo-booking form on the homepage/pricing page
(`components/forms/DemoBookingForm.tsx`). Every submission needs to:

1. Land in the internal Leads CRM at `/dashboard/leads` so the founder can see who
   filled the form, in real time.
2. Trigger an email to `info@zoveto.com` with the same details, so nothing is missed
   even if nobody is watching the dashboard.
3. Capture enough qualification data that a lead can be prioritized and called back
   without having to re-ask basic questions.

**Do not build a new system.** The pipeline already exists end-to-end:
`DemoBookingForm.tsx` → `POST /api/demo` → `prisma.lead.create()` → shows up on
`/dashboard/leads` (full CRM: funnel metrics, status pipeline NEW→CONTACTED→
QUALIFIED→WON→LOST, lead scoring, UTM attribution, CSV export, per-lead drawer).
This task is about closing two real gaps in that existing pipeline, not
re-implementing it.

## Gap 1 (blocking, fix first) — email notifications are silently not sending

`lib/server-mail.ts` only sends mail if `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`,
`SMTP_PASS`, and `MAIL_FROM` are all set. Right now **none of these are set** in
`.env` or `.env.local` — only `.env.example` documents them. When they're missing,
`sendFormNotificationEmail()` silently returns `{ sent: false }`, the API route
swallows that (`catch { console.warn(...) }`), and the form still tells the visitor
"success." The lead **is** saved to the CRM, but `info@zoveto.com` never gets the
email, and nobody is alerted that it failed.

Action:
- Get real SMTP credentials for sending as `info@zoveto.com` (Zoho Mail SMTP if
  that's the mailbox provider, or a transactional service like Resend/SendGrid with
  a verified `zoveto.com` sender — either works with the existing `nodemailer`
  transport in `lib/server-mail.ts`, no code change needed for the transport itself).
- Set `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM`
  in the real `.env` (production) — these are secrets, don't commit them.
- Add a startup/log warning (not just `console.warn` buried in a request handler) if
  `readSmtpConfig()` returns `null`, so a missing SMTP config is loud in server logs,
  not silent.
- Send one real test submission after deploying and confirm the email actually
  arrives at `info@zoveto.com`.

## Gap 2 — qualification fields aren't structured, so the CRM can't filter/sort on them

`app/api/demo/route.ts` currently takes `companyType` and `employeeBand` from the
form and jams them into the free-text `intent` string
(`Company type: ${data.industry}` / `Employees: ${data.companySize}`). They render
fine in the lead drawer's notes blob, but they're invisible to filters, the funnel
bar, CSV columns, and lead scoring — they're just text.

### Field analysis (why these two, and why nothing else)

The form already asks: full name*, work email*, company*, company type*
(Manufacturing/Trading/Distribution/.../Other), employee band*, phone (optional),
preferred date (optional), preferred time (optional), notes (optional), plus the
consent checkbox just added. That's already a well-balanced length for a B2B demo
form — don't add more free-text fields, since every extra field on a paid-search
landing page costs conversion rate.

The two fields worth adding are both single-click dropdowns (near-zero added
friction) and are the two highest-signal qualifiers a sales team actually uses to
prioritize a callback queue:

- **Role** — "Owner/Founder", "Operations Manager", "Finance/Accounts", "IT/Tech",
  "Sales/Warehouse Staff", "Other". Tells you immediately whether you're talking to
  a decision-maker or someone doing research for their boss — this is the single
  biggest lead-scoring signal missing today.
- **Timeline** — "Ready to start this month", "Exploring, 1–3 months",
  "Just researching". Tells you who to call back today versus who to nurture. This
  is the second-biggest signal, and it directly answers "who do I call first" when
  ten leads come in overnight from the ad campaign.

Do not add: budget range (too sensitive/early for a first touch, and Zoveto is
usage-priced not fixed-quote), a second free-text field (redundant with Notes),
or a country/market field — market is already recoverable from the phone number's
dial code (`components/forms/PhoneInputWithCountry.tsx` stores the dial code
inline in `phone`) and from `utmCampaign` once India and UAE campaigns are named
distinctly (e.g. `india-search-*` vs `uae-outreach-*`) — a redundant field would
just be one more thing to fill in for no new information.

### Implementation

1. **`prisma/schema.prisma`** — add four nullable columns to `model Lead`:
   ```prisma
   companyType    String?   // Manufacturing | Trading | Distribution | Retail | Pharma | Cosmetics | FMCG / consumer goods | Services | Other
   employeeBand   String?   // 1–10 | 11–50 | 51–200 | 201–500 | 501–1000 | 1000+
   role           String?   // Owner/Founder | Operations Manager | Finance/Accounts | IT/Tech | Sales/Warehouse Staff | Other
   timeline       String?   // this_month | 1_3_months | researching
   ```
   Run a migration (`npx prisma migrate dev --name add_lead_qualification_fields`).
   Leave `intent` as-is for the free-text preferred date/time/notes summary — don't
   remove it, just stop overloading it with data that now has its own column.

2. **`components/forms/DemoBookingForm.tsx`** — add two required `<select>` fields
   (same pattern as the existing `companyType`/`employeeBand` selects) for
   **Role** and **Timeline**, with state hooks `role`/`setRole` and
   `timeline`/`setTimeline`, and pass them into the `bookDemo()` payload.

3. **`lib/api.ts`** (`DemoPayload` type + `bookDemo()`) — add `role` and `timeline`
   to the payload type and forward them in the request body alongside the existing
   fields.

4. **`app/api/demo/route.ts`** — read `role` and `timeline` from the parsed body and
   pass `companyType`, `employeeBand`, `role`, `timeline` as their own columns in
   `prisma.lead.create({ data: { ... } })`, instead of only folding them into
   `intent`. Keep `intent` for date/time/message context. Also include all four in
   the `sendFormNotificationEmail` text body so the email has the full picture.

5. **`app/dashboard/(dashboard)/leads/types.ts`** — add `companyType`,
   `employeeBand`, `role`, `timeline` (all `string | null`) to `LeadRow`.

6. **`app/dashboard/(dashboard)/leads/components/LeadsCrmClient.tsx`** — add
   `companyType`/`role`/`timeline` as columns the table can show and as filter
   options (same pattern as the existing `sourceFilter` dropdown built from
   `utmSource`), and add them to the `toCSV()` header/row so exports include them.

7. **`app/dashboard/(dashboard)/leads/components/LeadDrawer.tsx`** — add `Row`
   entries for Company Type, Employees, Role, and Timeline in the lead detail panel
   (same `<Row label=... value=... />` pattern already used for phone/company/etc).

8. Wherever the server component that loads leads for the dashboard maps Prisma
   rows to `LeadRow` (the page/data-loading file that currently selects the
   existing columns) — add the four new columns to that select/mapping so they
   actually flow through to the client.

## Guardrails

- Don't touch `components/forms/LeadForm.tsx` or `POST /api/leads` — that's a
  separate lead-capture path (general contact/footer form, wired to a different
  "COS" system per the comment in `lib/lead-intake-mail.ts`) and is out of scope.
- Don't add a payment/checkout step anywhere in this flow — "Request early access"
  stays a lead-capture form, consistent with the pilot-stage UAE framing and the
  fact Zoveto isn't charging India ad-driven leads at signup either.
- Keep the consent checkbox already added to `DemoBookingForm.tsx` (required,
  linked to `/privacy`) — don't remove or bypass it.
- Don't rename or remove the existing `intent`/`notes` fields — only add new
  structured columns alongside them.

## Test before merging

- Submit the form with every field filled → confirm the lead appears on
  `/dashboard/leads` with Company Type, Employees, Role, and Timeline visible in
  the drawer (not just buried in Notes) and filterable in the list.
- Confirm the email actually lands in `info@zoveto.com` with all fields, not just
  name/email/company.
- Submit again leaving Role/Timeline at their default — confirm the required
  validation blocks submission (don't let the two new selects be skippable, or the
  scoring signal they exist for is lost).
- Export CSV from the dashboard and confirm the four new columns are present.


## Exact steps to get SMTP credentials for info@zoveto.com

DNS lookup on zoveto.com confirms mail is hosted on **Google Workspace**
(MX records point to aspmx.l.google.com, SPF includes _spf.google.com). Two ways
to get working SMTP credentials, fastest first:

### Option A — Gmail App Password (fastest, no new signup)
1. Sign in to the info@zoveto.com Google account (or have whoever administers it do this).
2. Turn on 2-Step Verification if it isn't already on: myaccount.google.com/security.
3. Go to myaccount.google.com/apppasswords, create a new app password named
   something like "Zoveto website SMTP", and copy the 16-character password shown
   (shown once only).
4. Set these in the real production environment (Vercel → Project → Settings →
   Environment Variables, per this repo's README — changes need a redeploy):
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=info@zoveto.com
   SMTP_PASS=<the 16-character app password, no spaces>
   MAIL_FROM=Zoveto <info@zoveto.com>
   ```
5. Redeploy, submit a real test demo request, confirm the email lands in
   info@zoveto.com.

Caveat: if this Workspace is centrally managed and an admin has disabled app
passwords org-wide (common on security-hardened Workspace accounts), Option A's
"App passwords" page won't be available — ask the Workspace admin to allow it for
this account, or use Option B instead. Gmail SMTP also caps at ~500 sends/day per
account, which is not a real limit at this lead volume.

### Option B — Resend (more robust, ~15 min setup, better for automated/transactional mail)
Gmail SMTP is built for a human sending mail, not an app — some providers throttle
or flag automated SMTP traffic from it over time. Resend (or SendGrid/Postmark) is
built for exactly this and is worth switching to once volume grows:
1. Sign up at resend.com, verify the `zoveto.com` domain by adding the DKIM/SPF TXT
   records it gives you to your DNS.
2. Create an API key.
3. Resend exposes an SMTP endpoint too (`smtp.resend.com`, port 587, user
   `resend`, password = the API key) — so it drops into the exact same
   `SMTP_HOST`/`SMTP_USER`/`SMTP_PASS` shape `lib/server-mail.ts` already expects,
   no code change needed either way.
   ```
   SMTP_HOST=smtp.resend.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=resend
   SMTP_PASS=<Resend API key>
   MAIL_FROM=Zoveto <info@zoveto.com>
   ```

Either option works with the existing code as-is — pick A to unblock today's launch,
switch to B later if Gmail SMTP ever gets flaky.

## Email notification template

Update the `sendFormNotificationEmail` call in `app/api/demo/route.ts` to send this
shape once the structured fields from Gap 2 exist. Subject line surfaces the
timeline so urgent leads are visible without opening the email:

**Subject:**
```
[Website] Demo request — {company} ({timelineLabel})
```
where `timelineLabel` is "Ready this month" / "1–3 months" / "Researching" —
omit the parenthetical entirely if timeline wasn't provided.

**Body (plain text):**
```
New demo request from the website

Timeline: {timelineLabel or "Not specified"}
Role: {roleLabel or "Not specified"}

Name: {fullName}
Work email: {email}
Phone: {phone or "-"}
Company: {company}
Company type: {companyType or "-"}
Team size: {employeeBand or "-"}

Preferred date: {preferredDate or "No preference given"}
Preferred time: {preferredTime or "No preference given"}

Notes:
{message or "(none)"}

---
Source: {utmSource or "direct"} / {utmCampaign or "-"}
Submitted: {createdAt, formatted in IST}
Reply directly to this email to respond to {fullName} — replyTo is already set to their address.
```

Keep it plain text (matches the existing `sendFormNotificationEmail` usage) — no
HTML needed for an internal notification inbox. Reuse the existing `replyTo:
email` behavior already in `app/api/demo/route.ts` so hitting Reply in Gmail goes
straight to the lead, not back to the website.
