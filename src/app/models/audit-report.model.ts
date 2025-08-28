export interface AuditReport {
  issue: string;
  risk: string;
  recommendation: string;
  root_cause: string;
}

export interface GeneratePayload {
  bulletPoints: string;
}

export interface ReportState {
  bulletPoints: string;
  loading: boolean;
  report: AuditReport | null;
  error: string | null;
  history: {
    timestamp: number;
    input: string;
    output: AuditReport | null
  }[];
}
