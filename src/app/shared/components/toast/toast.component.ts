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
import {
  trigger,
  transition,
  style,
  animate
} from '@angular/animations';

@Component({
  selector: 'toast-container',
  standalone: true,
  animations: [
    trigger('toastAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(100%)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateX(100%)' }))
      ])
    ])
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
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
