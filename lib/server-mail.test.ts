import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";
import {
  buildSmtpMissingConfigWarning,
  isSmtpConfigured,
  missingSmtpEnvKeys,
  readSmtpConfig,
} from "@/lib/server-mail";

const completeEnv = {
  NODE_ENV: "test",
  SMTP_HOST: "smtp.gmail.com",
  SMTP_PORT: "587",
  SMTP_USER: "info@zoveto.com",
  SMTP_PASS: "xxxxxxxxxxxxxxxx",
  MAIL_FROM: "Zoveto <info@zoveto.com>",
  SMTP_SECURE: "false",
} as unknown as NodeJS.ProcessEnv;

describe("SMTP config detection", () => {
  it("returns null and lists missing keys when SMTP is unset", () => {
    const empty = {} as unknown as NodeJS.ProcessEnv;
    assert.equal(readSmtpConfig(empty), null);
    assert.equal(isSmtpConfigured(empty), false);
    assert.deepEqual(missingSmtpEnvKeys(empty), [
      "SMTP_HOST",
      "SMTP_PORT",
      "SMTP_USER",
      "SMTP_PASS",
      "MAIL_FROM",
    ]);
    const warning = buildSmtpMissingConfigWarning(empty);
    assert.ok(warning);
    assert.match(warning!, /SMTP IS NOT CONFIGURED/);
    assert.match(warning!, /info@zoveto\.com will not send/);
    assert.match(warning!, /Missing or invalid: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM/);
    assert.doesNotMatch(warning!, /xxxxxxxxxxxxxxxx/);
  });

  it("returns config when every required var is set", () => {
    const cfg = readSmtpConfig(completeEnv);
    assert.ok(cfg);
    assert.equal(cfg!.host, "smtp.gmail.com");
    assert.equal(cfg!.port, 587);
    assert.equal(cfg!.secure, false);
    assert.equal(isSmtpConfigured(completeEnv), true);
    assert.equal(buildSmtpMissingConfigWarning(completeEnv), null);
  });

  it("treats a non-numeric SMTP_PORT as unconfigured", () => {
    const env = { ...completeEnv, SMTP_PORT: "not-a-port" };
    assert.equal(readSmtpConfig(env), null);
    assert.ok(missingSmtpEnvKeys(env).includes("SMTP_PORT"));
    assert.match(buildSmtpMissingConfigWarning(env) ?? "", /SMTP_PORT/);
  });
});

describe("SMTP startup warning wiring", () => {
  const read = (rel: string) => fs.readFileSync(path.join(process.cwd(), rel), "utf8");

  it("warns from instrumentation register on the Node runtime, not only the request handler", () => {
    const instrumentation = read("instrumentation.ts");
    assert.match(instrumentation, /NEXT_RUNTIME === "nodejs"/);
    assert.match(instrumentation, /warnIfSmtpUnconfigured/);
    assert.match(instrumentation, /lib\/server-mail/);
  });

  it("documents Google Workspace SMTP in .env.example without committing a password", () => {
    const example = read(".env.example");
    assert.match(example, /SMTP_HOST=smtp\.gmail\.com/);
    assert.match(example, /SMTP_PORT=587/);
    assert.match(example, /SMTP_SECURE=false/);
    assert.match(example, /MAIL_FROM=Zoveto <info@zoveto\.com>/);
    assert.doesNotMatch(example, /SMTP_PASS=[^\s#\n]{8,}/);
  });
});
