import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportService } from '../../core/services/report.service';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCircleExclamation, 
  faTriangleExclamation
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'report-view',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  templateUrl: './report-view.component.html',
  styleUrl: './report-view.component.css'
})
export class ReportViewComponent {
  private readonly svc = inject(ReportService);

  report = computed(() => this.svc.state().report);
  error = computed(() => this.svc.state().error);
  message = computed(() => this.svc.state().error_message)
  loading = computed(() => this.svc.state().loading);

  protected readonly isArray = (value: unknown): value is string[] => Array.isArray(value);

  constructor(private iconLibrary: FaIconLibrary) {
    this.iconLibrary.addIcons(
      faCircleExclamation,
      faTriangleExclamation
    )
  }
}
