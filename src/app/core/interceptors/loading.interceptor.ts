import { HttpErrorResponse, HttpEvent, HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { inject, signal } from '@angular/core';
import { ToastService } from '../../shared/components/toast/toast.service';

const active = signal(0);

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  active.update(n => n + 1);
  const toast = inject(ToastService);
  return next(req).pipe({
    next: (event: HttpEvent<any>) => {
      if (event.type === HttpEventType.Response) {
        active.update(n => Math.max(0, n - 1));
      }
      return event;
    },
    error: (err: HttpErrorResponse) => {
      active.update(n => Math.max(0, n - 1));
      return err;
    },
    complete: () => {
      active.update(n => Math.max(0, n - 1));
    }
  } as any);
};
