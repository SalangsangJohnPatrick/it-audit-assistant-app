import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportService } from '../../core/services/report.service';

@Component({
  selector: 'report-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './report-view.component.html',
  styleUrl: './report-view.component.css'
})
export class ReportViewComponent {
  private readonly svc = inject(ReportService);

  report = computed(() => this.svc.state().report);
  error = computed(() => this.svc.state().error);
  loading = computed(() => this.svc.state().loading);

  protected readonly isArray = (value: unknown): value is string[] => Array.isArray(value);
}
