import { Component, computed, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReportService } from '../../core/services/report.service';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faTriangleExclamation
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'history-panel',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    FontAwesomeModule
  ],
  templateUrl: './history-panel.component.html',
  styleUrl: './history-panel.component.css'
})
export class HistoryPanelComponent {
  private readonly svc = inject(ReportService);
  history = computed(() => this.svc.state().history);

  constructor(private iconLibrary: FaIconLibrary) {
    this.iconLibrary.addIcons(
      faTriangleExclamation
    )
  }
}
