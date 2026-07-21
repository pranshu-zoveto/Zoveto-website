# CURSOR PROMPT — Website: Webhook → Backend Billing Sync (Access Gating)

## Context

This is the Zoveto website (Next.js 14 App Router, Prisma, TypeScript).

The Razorpay webhook handler at `app/api/razorpay/webhook/route.ts` already:
- Verifies HMAC-SHA256 signature using `RAZORPAY_WEBHOOK_SECRET` with `crypto.timingSafeEqual`
- Updates `BillingSubscription.status` in the Prisma (website) database
- Records payment events for `subscription.charged`

**THE CRITICAL MISSING PIECE:** When Razorpay fires `subscription.halted` or `subscription.cancelled` (billing fails after trial), the webhook only updates the local Prisma DB. It does NOT call the Zoveto backend (NestJS, `COS_API_BASE_URL`) to suspend access. So users whose payment failed can still access the Zoveto app because the NestJS `SubscriptionGuard` reads from its own TypeORM DB — which never got the halt signal.

Similarly, when `subscription.charged` fires (payment succeeds after a halt), the backend is never notified to re-activate.

## What to Build

### Step 1 — Add `POST /api/internal/sync-billing-status` call in the webhook

In `app/api/razorpay/webhook/route.ts`, after updating `BillingSubscription.status`, call the NestJS backend's new internal endpoint (to be built in the backend prompt) for these events:

| Razorpay event | Action to call on backend |
|---|---|
| `subscription.halted` | Suspend company access |
| `subscription.cancelled` | Suspend company access |
| `subscription.completed` | Suspend company access (no more billing) |
| `subscription.charged` | Re-activate if previously suspended |
| `subscription.activated` | Re-activate |
| `subscription.resumed` | Re-activate |

**How to call the backend:**

```typescript
const COS_API_BASE_URL = process.env.COS_API_BASE_URL;
const COS_INTERNAL_SECRET = process.env.COS_INTERNAL_SECRET;

if (COS_API_BASE_URL && COS_INTERNAL_SECRET && sub.zovetoCompanyId) {
  const action = shouldSuspend ? 'suspend' : 'activate';
  const syncRes = await fetch(`${COS_API_BASE_URL}/api/internal/sync-billing-status`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-internal-secret': COS_INTERNAL_SECRET,
    },
    body: JSON.stringify({
      razorpaySubscriptionId: razorpaySubId,
      zovetoCompanyId: sub.zovetoCompanyId,
      action,          // 'suspend' | 'activate'
      razorpayEvent: eventType,
    }),
  });
  if (!syncRes.ok) {
    const errText = await syncRes.text();
    console.error(`[webhook] Backend billing sync failed (${action}): ${errText}`);
    // Non-blocking — log and continue. Do NOT throw. Razorpay needs a 200.
  } else {
    console.log(`[webhook] Backend billing sync OK: ${action} for company ${sub.zovetoCompanyId}`);
  }
}
```

- **Non-blocking**: wrap in try/catch, log errors, never throw. Razorpay re-sends webhooks on non-200, so the local status update must still return 200.
- Only call when `sub.zovetoCompanyId` is set (provisioned companies only). Unprovisioned subscriptions have no company to suspend.
- The `BillingSubscription` model already has `zovetoCompanyId String?` — use it.

### Step 2 — Determine suspend vs activate logic

```typescript
const SUSPEND_EVENTS = new Set([
  'subscription.halted',
  'subscription.cancelled',
  'subscription.completed',
]);

const ACTIVATE_EVENTS = new Set([
  'subscription.charged',
  'subscription.activated',
  'subscription.resumed',
]);

const shouldSuspend = SUSPEND_EVENTS.has(eventType);
const shouldActivate = ACTIVATE_EVENTS.has(eventType);

// Only sync if it's a status-changing event we care about
if ((shouldSuspend || shouldActivate) && sub.zovetoCompanyId) {
  // make the backend call above
}
```

### Step 3 — Environment variable

The following env var must be set in Vercel (website):
```
COS_INTERNAL_SECRET=<same value as the backend's COS_INTERNAL_SECRET>
```
This is already used in `app/api/razorpay/confirm/route.ts` — no new var needed, just verify it's present.

## Exact File to Edit

`/app/api/razorpay/webhook/route.ts`

The file structure is:
1. `POST` handler — reads raw body, verifies signature, parses JSON, calls `handleWebhookEvent()`
2. `handleWebhookEvent()` — extracts `razorpaySubId`, updates `BillingSubscription.status`, records payment

Add the backend sync call INSIDE `handleWebhookEvent()`, AFTER `await prisma.billingSubscription.update(...)`, before the final `console.log`.

## CRITICAL Rules

1. **NEVER throw inside the webhook** — Razorpay expects 200. Errors in the backend sync call must be caught and logged, not propagated.
2. **NEVER log the `COS_INTERNAL_SECRET`** in console output.
3. **Use `sub.zovetoCompanyId` guard** — only call backend if it's a provisioned company.
4. **No new npm packages** — use native `fetch` (Node 18+, already available in Next.js 14).
5. **Idempotency** — the backend `sync-billing-status` endpoint must be safe to call multiple times (Razorpay may re-send webhooks).

## Acceptance Criteria

- [ ] When Razorpay fires `subscription.halted`, the NestJS backend suspends the company (users get 402 on module-gated routes)
- [ ] When Razorpay fires `subscription.charged` after a halt, the NestJS backend re-activates the company
- [ ] Webhook always returns 200 even if the backend sync call fails
- [ ] No unhandled promise rejections
- [ ] Existing `subscription.charged` payment recording logic is untouched
