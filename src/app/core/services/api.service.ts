import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/api.model';
import { AuditReport, GeneratePayload } from '../../models/audit-report.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly base = environment.apiBaseUrl;

  generateReport(payload: GeneratePayload): Observable<ApiResponse<AuditReport>> {
    return this.http.post<ApiResponse<AuditReport>>(`${this.base}/generate-report`, payload);
  }
}
