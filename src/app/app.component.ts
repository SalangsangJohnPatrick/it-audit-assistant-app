import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReportFormComponent } from './features/report-form/report-form.component';
import { ReportViewComponent } from './features/report-view/report-view.component';
import { HistoryPanelComponent } from './features/history-panel/history-panel.component';
import { ToastComponent } from './shared/components/toast/toast.component';
import { ReportService } from './core/services/report.service';
import { copyToClipboard } from './core/utils/copy.utils';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReportFormComponent,
    ReportViewComponent,
    HistoryPanelComponent,
    ToastComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // Simple UI state via signals
  readonly hasReport = computed(() => !!this.reportSvc.currentReport());
  constructor(public readonly reportSvc: ReportService) { }

  copyAll(): void {
    const text = this.reportSvc.formatCurrentForClipboard();
    if (!text) return;
    copyToClipboard(text);
    this.reportSvc.toast.success('Copied generated finding to clipboard');
  }

  clearAll(): void {
    this.reportSvc.clear();
    this.reportSvc.toast.info('Cleared input and output');
  }
}