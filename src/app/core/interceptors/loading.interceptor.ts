import { HttpErrorResponse, HttpEvent, HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { inject, signal } from '@angular/core';
import { ToastService } from '../../shared/components/toast/toast.service';
import { tap, finalize } from 'rxjs/operators';

const active = signal(0);

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  active.update(n => n + 1);
  const toast = inject(ToastService);
  
  return next(req).pipe(
    tap({
      next: (event: HttpEvent<any>) => {
        if (event.type === HttpEventType.Response) {
          active.update(n => Math.max(0, n - 1));
        }
      },
      error: (err: HttpErrorResponse) => {
        active.update(n => Math.max(0, n - 1));
        toast.error(err.message); // optional: display error here too
      }
    }),
    finalize(() => {
      // safety net: ensure counter decrements no matter what
      active.update(n => Math.max(0, n - 1));
    })
  );
};
