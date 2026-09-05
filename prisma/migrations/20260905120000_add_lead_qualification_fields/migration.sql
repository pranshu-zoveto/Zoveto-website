-- Qualification fields for demo-booking leads (filterable in CRM, used for scoring).
ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "companyType" TEXT;
ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "employeeBand" TEXT;
ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "role" TEXT;
ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "timeline" TEXT;
