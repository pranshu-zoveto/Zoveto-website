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

test("signup route and screen remain waitlist-only", () => {
  const route = readFileSync(join(process.cwd(), "app/api/signup/route.ts"), "utf8");
  const screen = readFileSync(join(process.cwd(), "app/signup/_SignupClient.tsx"), "utf8");

  assert.match(route, /\/leads/);
  assert.doesNotMatch(route, /onboarding\/provision|adminPassword|temporaryPassword/);
  assert.doesNotMatch(screen, /accessToken|temporaryPassword|Create My System|Start Your 14-Day Free Trial/);
  assert.match(screen, /No workspace has been\s+created yet/);
});
