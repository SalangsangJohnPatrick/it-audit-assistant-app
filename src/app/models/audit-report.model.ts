export interface AuditReport {
  title: string;
  issues: string;
  risks: string;
  recommendations: string;
  root_causes: string;
}

export interface GeneratePayload {
  finding: string;
}

export interface ReportState {
  finding: string;
  loading: boolean;
  report: AuditReport | null;
  error: string | null;
  error_message: string | null
  history: {
    open: boolean;
    timestamp: number;
    input: string;
    output: AuditReport | null
  }[];
}
