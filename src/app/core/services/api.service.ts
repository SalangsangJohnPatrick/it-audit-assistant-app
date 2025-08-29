import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/api.model';
import { AuditReport, GeneratePayload } from '../../models/audit-report.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);

  generateReport(payload: GeneratePayload): Observable<ApiResponse<AuditReport>> {
    return this.http.post<ApiResponse<AuditReport>>(`/generate-report`, payload);
  }
}
