import { Injectable, signal, computed } from '@angular/core';
import { ApiService } from './api.service';
import { ReportState } from '../../models/audit-report.model';
import { ToastService } from '../../shared/components/toast/toast.service';

@Injectable({ providedIn: 'root' })
export class ReportService {
  readonly state = signal<ReportState>({
    bulletPoints: '',
    loading: false,
    report: null,
    error: null,
    history: []
  });

  constructor(
    private api: ApiService,
    public readonly toast: ToastService
  ) { }

  currentReport() { return this.state().report; }

  hasInputOrOutput = computed(() => {
    const { bulletPoints, report } = this.state();
    return !!bulletPoints?.trim() || !!report;
  });

  setBulletPoints(v: string): void {
    this.state.update(s => ({ ...s, bulletPoints: v }));
  }

  async generate(): Promise<void> {
    const { bulletPoints } = this.state();
    this.state.update(s => ({ ...s, loading: true, error: null }));
    try {
      const res = await this.api.generateReport({ bulletPoints }).toPromise();
      if (!res) throw new Error('No response');
      if (res.ok) {
        const report = res.report;
        this.state.update(s => ({
          ...s,
          report,
          loading: false,
          history: [{ timestamp: Date.now(), input: bulletPoints, output: report }, ...s.history].slice(0, 20)
        }));
        this.toast.success('Generated finding successfully');
      } else {
        throw new Error(res.error ?? 'Failed to generate');
      }
    } catch (err: any) {
      const msg = err?.message ?? 'Unexpected error';
      this.state.update(s => ({ ...s, error: msg, loading: false }));
      this.toast.error(msg);
      console.error(err);
    }
  }

  clear(): void {
    this.state.update(s => ({ ...s, bulletPoints: '', report: null, error: null }));
  }

  formatCurrentForClipboard(): string | null {
    const r = this.state().report;
    if (!r) return null;
    return [
      `Issue:\n${r.issue}`,
      `Risk:\n${r.risk}`,
      `Recommendation:\n${r.risk}`,
      `Root Cause:\n${r.root_cause}`
    ].join('\n\n');
  }
}

