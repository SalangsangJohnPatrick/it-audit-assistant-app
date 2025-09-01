import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReportService } from '../../core/services/report.service';

@Component({
  selector: 'report-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './report-form.component.html',
  styleUrl: './report-form.component.css'
})
export class ReportFormComponent {  
  private fb = inject(FormBuilder);
  readonly reportSvc = inject(ReportService);

  form = this.fb.nonNullable.group({
    bulletPoints: [
      '', [Validators.required, Validators.minLength(5)]
    ]
  });

  loading = signal(false);

  async generate(): Promise<void> {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      this.reportSvc.toast.warn('Please enter bullet points first.');
      return;
    };
    const bp = this.form.controls.bulletPoints.value.trim();
    this.reportSvc.setFinding(bp);
    this.loading.set(true);
    await this.reportSvc.generate();
    this.loading.set(false);
  }

  clear(): void {
    this.form.reset({ bulletPoints: '' });
    this.reportSvc.clear();
  }
}

