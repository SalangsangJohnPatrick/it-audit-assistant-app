import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from './toast.service';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCircleCheck,
  faCircleExclamation,
  faCircleInfo,
  faTriangleExclamation
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'toast-container',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  templateUrl: './toast.component.html'
})
export class ToastComponent {
  private readonly service = inject(ToastService);
  toasts = computed(() => this.service.toasts());

  constructor(private iconLibrary: FaIconLibrary) {
    this.iconLibrary.addIcons(
      faCircleCheck,
      faCircleExclamation,
      faCircleInfo,
      faTriangleExclamation
    )
  }
}
