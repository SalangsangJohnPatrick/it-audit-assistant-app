import { Component, computed, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReportService } from '../../core/services/report.service';

@Component({
  selector: 'history-panel',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './history-panel.component.html',
  styleUrl: './history-panel.component.css'
})
export class HistoryPanelComponent {
  private readonly svc = inject(ReportService);
  history = computed(() => this.svc.state().history);
}
