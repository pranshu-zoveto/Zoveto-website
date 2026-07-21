import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import {
  buildEarlyAccessLeadPayload,
  hasRequiredEarlyAccessFields,
  normalizeEarlyAccessSignup,
} from "./early-access";

test("normalizes early access signup input without provisioning fields", () => {
  const input = normalizeEarlyAccessSignup({
    fullName: "  Pranshu Singh  ",
    email: "  pranshu@zoveto.com  ",
    companyName: "  Zoveto  ",
    role: "Founder",
    teamSize: "1-10",
    useCase: "Inventory control",
    accessToken: "must-not-pass-through",
    adminPassword: "must-not-pass-through",
  });

  assert.deepEqual(input, {
    fullName: "Pranshu Singh",
    email: "pranshu@zoveto.com",
    companyName: "Zoveto",
    role: "Founder",
    teamSize: "1-10",
    useCase: "Inventory control",
    phone: undefined,
  });
});

test("requires qualification fields before entering the early access pipeline", () => {
  assert.equal(
    hasRequiredEarlyAccessFields({
      fullName: "Pranshu Singh",
      email: "pranshu@zoveto.com",
      companyName: "Zoveto",
      role: "Founder",
      teamSize: "",
      useCase: "Inventory control",
    }),
    false,
  );
});

test("builds a founder-review lead payload for COS storage and email follow-up", () => {
  const payload = buildEarlyAccessLeadPayload({
    fullName: "Pranshu Singh",
    email: "pranshu@zoveto.com",
    companyName: "Zoveto",
    role: "Founder",
    teamSize: "1-10",
    useCase: "Inventory control",
    phone: "+91 99999 99999",
  });

  assert.match(payload.painPoint, /Source: early_access_waitlist/);
  assert.equal(payload.organization, "Zoveto");
  assert.equal(payload.phone, "+91 99999 99999");
  assert.match(payload.painPoint, /Status: waitlist_pending/);
  assert.match(payload.painPoint, /Founder approval required/);
  assert.doesNotMatch(JSON.stringify(payload), /accessToken|adminPassword|onboarding\/provision/);
  assert.doesNotMatch(JSON.stringify(payload), /notificationEmail|notifyEmail|\"source\"/);
});

test("signup screen maps early access to Razorpay trial checkout", () => {
  const screen = readFileSync(join(process.cwd(), "app/(marketing)/signup/_SignupClient.tsx"), "utf8");
  const page = readFileSync(join(process.cwd(), "app/(marketing)/signup/page.tsx"), "utf8");

  assert.match(screen, /Early access/);
  assert.match(screen, /Request early access to Zoveto/);
  assert.match(screen, /create-subscription|razorpay/i);
  assert.match(screen, /trial_started/);
  assert.doesNotMatch(screen, /accessToken|temporaryPassword|Create My System/);
  assert.match(page, /Request early access/);
});
