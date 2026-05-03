// types/index.ts

export interface Metric {
  label: string;
  value: string;
  context?: string;
}

export interface Step {
  step: string;
  description: string;
}

export interface KeyFeature {
  title: string;
  description: string;
}

export interface Module {
  slug: string;
  name: string;
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  problem: string;
  howItWorks: Step[];
  keyFeatures: KeyFeature[];
  integrations: string[];
  metrics: Metric[];
  targetRoles: string[];
}

export interface PainPoint {
  title: string;
  description: string;
}

export interface WorkflowStage {
  stage: string;
  before: string;
  after: string;
}

/** Zoveto area playbooks shown on industry landings (Command Center → Finance). */
export interface IndustryModulePlaybook {
  id: string;
  title: string;
  body: string;
  /** Internal link to a module or product surface */
  href: string;
}

export interface IndustrySystemFlowStep {
  title: string;
  detail: string;
}

export interface IndustryFaqItem {
  q: string;
  a: string;
}

export interface Industry {
  slug: string;
  name: string;
  /** Phrase inserted in the fixed hero H1 after “entire …” (e.g. “manufacturing”, “spare parts trading”). */
  h1IndustryPhrase: string;
  /** Legacy short hook; optional eyebrow or secondary line where useful */
  headline: string;
  heroSub: string;
  /** Two-line AEO answer under hero (use `\\n` for line break). */
  directAnswer: string;
  /** Min 5; must match FAQPage JSON-LD on the industry route. */
  faqs: IndustryFaqItem[];
  metaTitle: string;
  metaDescription: string;
  painPoints: PainPoint[];
  workflow: WorkflowStage[];
  relevantModules: string[];
  moduleRelevance: Record<string, string>;
  modulePlaybooks: IndustryModulePlaybook[];
  systemFlowSteps: IndustrySystemFlowStep[];
  outcomes: string[];
  proofPoints: string[];
  /** Short tags for homepage industry cards */
  homepageFeatures: string[];
}

/** Product-area labels for “Inside Zoveto” operating-pattern flows */
export type OperationalProofModuleChip = "ERP" | "CRM" | "WMS" | "HRMS";

export interface OperationalProofFlowStep {
  label: string;
  detail?: string;
}

export interface OperationalProofInsideZoveto {
  module: OperationalProofModuleChip;
  note: string;
}

export interface OperationalProofImpact {
  metric: string;
  context: string;
}

export interface OperationalProof {
  slug: string;
  industryTag: string;
  title: string;
  before: string[];
  after: string[];
  systemActions: string[];
  outcomeMetrics: string[];
  ctaLabel: string;
  problemSummary: string;
  metaTitle: string;
  metaDescription: string;
  currentRealitySteps: OperationalProofFlowStep[];
  redesignSteps: OperationalProofFlowStep[];
  insideZoveto: OperationalProofInsideZoveto[];
  impactMetrics: OperationalProofImpact[];
}
