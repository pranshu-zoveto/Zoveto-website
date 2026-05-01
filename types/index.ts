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

export interface Industry {
  slug: string;
  name: string;
  headline: string;
  metaTitle: string;
  metaDescription: string;
  painPoints: PainPoint[];
  workflow: WorkflowStage[];
  relevantModules: string[];
  moduleRelevance: Record<string, string>; // Mapping slug -> industry-specific relevance
  metrics: Metric[];
  testimonialQuote: string;
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
