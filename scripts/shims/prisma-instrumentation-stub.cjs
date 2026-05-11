/**
 * Webpack resolves this instead of `@prisma/instrumentation` (see `next.config.mjs`).
 * This marketing app does not use Prisma; `@sentry/node` still static-imports Prisma tracing,
 * which pulls OpenTelemetry code and triggers webpack "Critical dependency" warnings plus extra compile work.
 * If you add Prisma to this repo, remove the alias and use real `@prisma/instrumentation`.
 */
"use strict";

class PrismaInstrumentation {
  constructor() {}
  enable() {}
  disable() {}
}

module.exports = { PrismaInstrumentation };
