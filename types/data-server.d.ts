// Add missing types from @idea2app/work-counter for @idea2app/data-server compatibility
declare module '@idea2app/work-counter' {
  export type DevelopmentScope = string;
  export interface UnitPrice {
    amount: number;
    currency: string;
  }
  export interface RequirementMeta {
    title: string;
    description?: string;
    files?: string[];
    models?: string[];
    scopes?: DevelopmentScope[];
    developerCount?: number;
    factor?: number;
    price?: UnitPrice;
  }
  export interface EvaluationResult {
    designerCount: number;
    workload: number;
    monthPeriod: number;
    budget: number;
  }
}