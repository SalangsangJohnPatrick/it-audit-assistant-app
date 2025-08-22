import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faWandMagicSparkles, faBroom } from '@fortawesome/free-solid-svg-icons';
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

  faGen = faWandMagicSparkles;
  faClear = faBroom;

  form = this.fb.nonNullable.group({
    bulletPoints: [
      `- Default passwords remain enabled on admin accounts
- MFA disabled for VPN users
- Password policy exception for privileged roles
- No periodic access review for terminated employees
- Shared service account without logging`,
      [Validators.required, Validators.minLength(5)]
    ]
  });

  loading = signal(false);

  async generate(): Promise<void> {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    const bp = this.form.controls.bulletPoints.value.trim();
    this.reportSvc.setBulletPoints(bp);
    this.loading.set(true);
    await this.reportSvc.generate();
    this.loading.set(false);
  }

  clear(): void {
    this.form.reset({ bulletPoints: '' });
    this.reportSvc.clear();
  }
}

