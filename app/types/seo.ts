export interface SeoAuditResult {
  results: {
    category: string
    score: number
    feedback: string
    recommendations: string[]
  }[]
  summary?: {
    good: number
    needsImprovement: number
    critical: number
  }
  priorityActions?: {
    high: string[]
    medium: string[]
    low: string[]
  }
  metadata: {
    url: string
    score: number
    date: string
  }
}
